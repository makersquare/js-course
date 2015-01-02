(function(){

  var invetigateButton = document.querySelector('button');
  var result = document.querySelector('h3');

  invetigateButton.onclick = function (event){

    // your code goes here

    // auxiliar variables
    var caseId = undefined;
    var analysisResults = undefined;
    var suspectsHash = undefined;

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

      // filling suxilisr variables
      caseId = data.id;

      var arrayOfPromises = [];

      for(var i in data.evidences){
        arrayOfPromises.push(new Promise(function(resolve,reject){

          var requestUrl = '';
          var requestData = { caseId : caseId};

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

      // filling suxilisr variables
      analysisResults = responses;

      var arrayOfPromises = [];

      for(var i in responses){

        var requestData = {
          caseId : caseId,
          characteristics : responses[i].conclusion
        };

        arrayOfPromises.push(new Promise(function(resolve,reject){
            $.ajax({
              url : '/FBI/API/suspectsList',
              data : requestData,
              type : 'GET',
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
      console.log('first array of promises fails',err);
    }).

    then(function(responses){

      // since for each element in 'analysis Results'
      // we have a corresponding element on
      // the 'responses' array, we can do the following:

      // filling suxilisr variables
      suspectsHash = {};

      for(var i in responses){
        for(var j in responses[i]){
          if(suspectsHash[responses[i][j].s_id]){
            suspectsHash[responses[i][j].s_id].count++;
            suspectsHash[responses[i][j].s_id].evidences.push({
              accuracy : analysisResults[i].accuracy,
              weight : analysisResults[i].weight
            });
          } else {
            suspectsHash[responses[i][j].s_id] = {
              count : 1,
              name : responses[i][j].name,
              evidences : [{
                accuracy : analysisResults[i].accuracy,
                weight : analysisResults[i].weight
              }]
            };
          }
        };
      };

      // creating last array of promises

      var arrayOfPromises = [];

      for(var i in suspectsHash){
        for(var j in suspectsHash[i].evidences){
          arrayOfPromises.push(new Promise(function(resolve,reject){

            var requestData = {
              caseId : caseId,
              rankInput : {
                accuracy : suspectsHash[i].evidences[j].accuracy,
                weight : suspectsHash[i].evidences[j].weight
              }
            };

            $.ajax({
              url : '/FBI/API/calculateScore',
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
      };

      return Promise.all(arrayOfPromises);

    },function(err){
      console.log('second array of promises fails',err);
    }).

    then(function(responses){
      console.log('Get punctuations',responses);
    },function(err){
      console.log('third array of promises fails',err);
    });

    result.textContent = 'he or she still being unknown :('

  };

})();

















