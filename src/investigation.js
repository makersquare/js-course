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
      console.log('data',data);
    },function(err){
      console.log('err',err);
    });

    result.textContent = 'he or she still being unknown :('

  };

})();

