(function(){

  var invetigateButton = document.querySelector('button');
  var result = document.querySelector('h3');

  invetigateButton.onclick = function (event){

    // your code goes here

    $.get('/FBI/API/case',function(data){
      var caseDetail = data;
      console.log('case details:',data);
    },'json');

    result.textContent = 'he or she still being unknown  :('
  };

})();
