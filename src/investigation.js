(function(){

  var invetigateButton = document.querySelector('button');
  var result = document.querySelector('h3');

  invetigateButton.onclick = function (event){

    // your code goes here
    $.get('/FBI/API/case',function(data){

      var caseDetail = data;

      // defining auxiliar variables
      var examinationsResults = [];

      // defining callback function to get suspect list
      var getSuspectLists = function(){
        for(var i in examinationsResults){
          var requestData = {
            caseId : caseDetail.id,
            characteristics : examinationsResults[i].conclusion
          };
          $.get('/FBI/API/suspectsList',requestData,function(data){
            console.log('suspects',data);
          },'json');
        };
      };

      for(var i in caseDetail.evidences){
        switch(caseDetail.evidences[i].evidenceType) {
          case 'witness' :
            var requestData = {
              caseId : caseDetail.id,
              who : caseDetail.evidences[i].evidenceDescription
            };

            $.post('/FBI/API/interview',requestData,function(data){
              examinationsResults.push(data);
              if(examinationsResults.length === 7){
                getSuspectLists();
              }
            },'json');
            break;

          case 'items' :
            var requestData = {
              caseId : caseDetail.id,
              what : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/itemLaboratory',requestData,function(data){
              examinationsResults.push(data);
              if(examinationsResults.length === 7){
                getSuspectLists();
              }
            },'json');
            break;

          case 'injuries' :
            var requestData = {
              caseId : caseDetail.id,
              what : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/medicalAnalysis',requestData,function(data){
              examinationsResults.push(data);
              if(examinationsResults.length === 7){
                getSuspectLists();
              }
            },'json');
            break;

          case 'media' :
            var requestData = {
              caseId : caseDetail.id,
              what : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/mediaLaboratory',requestData,function(data){
              examinationsResults.push(data);
              if(examinationsResults.length === 7){
                getSuspectLists();
              }
            },'json');
            break;
          default :
            break;
        };
      };


    },'json');

    result.textContent = 'he or she still being unknown  :('
  };

})();
