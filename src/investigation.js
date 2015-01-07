(function(){

  var invetigateButton = document.querySelector('button');
  var result = document.querySelector('h3');

  invetigateButton.onclick = function (event){

    // your code goes here

    $.get('/FBI/API/case',function(data){
      var caseDetail = data;
      console.log('case details:',data);

      for(var i in caseDetail.evidences){
        switch(caseDetail.evidences[i].evidenceType) {
          case 'witness' :
            var requestData = {
              caseId : caseDetail.id,
              who : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/interview',requestData,function(data){
              console.log('interview',data);
            },'json');
            break;
          case 'items' :
            var requestData = {
              caseId : caseDetail.id,
              what : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/itemLaboratory',requestData,function(data){
              console.log('item',data);
            },'json');
            break;
          case 'injuries' :
            var requestData = {
              caseId : caseDetail.id,
              what : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/medicalAnalysis',requestData,function(data){
              console.log('medical',data);
            },'json');
            break;
          case 'media' :
            var requestData = {
              caseId : caseDetail.id,
              what : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/mediaLaboratory',requestData,function(data){
              console.log('media',data);
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
