(function(){

  var invetigateButton = document.querySelector('button');
  var result = document.querySelector('h3');

  invetigateButton.onclick = function (event){

    // your code goes here

    var caseDetails = new Promise(function(resolve,reject){
      $.ajax({
        url : '/FBI/API/case',
        type : 'GET',
        dataType : 'json',
        success : function (data){
          resolve(data);
        },
        error : function(err){
          reject(err);
        }
      });
    });

    caseDetails.then(function(data){

      var arrayOfPromises = [];

      for(var i in data.evidences){
        arrayOfPromises.push(new Promise(function(resolve,reject){

          var requestUrl = '';
          var requestData = { caseId : data.id};

          switch (data.evidences[i].evidenceType) {
            case 'witness' :
              requestUrl = '/FBI/API/interview';
              requestData.who = data.evidences[i].evidenceDescription;
              break;
            case 'items' :
              requestUrl = '/FBI/API/itemLaboratory';
              requestData.what = data.evidences[i].evidenceDescription;
              break;
            case 'injuries' :
              requestUrl = '/FBI/API/medicalAnalysis';
              requestData.what = data.evidences[i].evidenceDescription;
              break;
            case 'media' :
              requestUrl = '/FBI/API/mediaLaboratory';
              requestData.what = data.evidences[i].evidenceDescription;
              break;
          };

          $.ajax({
            url : requestUrl,
            data : requestData,
            type : 'POST',
            dataType : 'json',
            success : function (data){
              resolve(data);
            },
            error : function(err){
              reject(err);
            }
          });

        }));
      };

      return Promise.all(arrayOfPromises);

    },function(err){
      console.log('first promise fail',err);
    }).

    then(function(responses){
      console.log('responses',responses);
    },function(err){
      console.log('first array of promises fail',err);
    });

    result.textContent = 'he or she still being unknown :('

  };

})();

