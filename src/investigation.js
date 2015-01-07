(function(){

  var invetigateButton = document.querySelector('button');
  var result = document.querySelector('h3');

  invetigateButton.onclick = function (event){

    // your code goes here
    $.get('/FBI/API/case',function(data){

      var caseDetail = data;

      // defining auxiliar variables
      var examinationsResults = [];
      var suspectsHash = {};

      // The last callback, finally
      var getTheCriminal = function(){
        var highestScoreOwner = undefined;

        for(var i in suspectsHash){
          if(highestScoreOwner){
            if( suspectsHash[i].punctuation > suspectsHash[highestScoreOwner].punctuation){
              highestScoreOwner = i;
            }
          } else {
            highestScoreOwner = i;
          }
        };
        // writing result
        result.textContent = suspectsHash[highestScoreOwner].name;
      };

      var procesingEvidences = function(suspectsInfo,punctationCounter){
        for(var i in suspectsInfo.evidences){

          var requestParams = {
            caseId : caseDetail.id,
            rankInput : {
              accuracy : suspectsInfo.evidences[i].accuracy,
              weight : suspectsInfo.evidences[i].weight
            }
          };

          $.post('/FBI/API/calculateScore',requestParams,function(data){
            if(suspectsInfo.punctuation){
              suspectsInfo.punctuation += data.result;
            } else {
              suspectsInfo.punctuation = data.result;
            }
            punctationCounter.countDone++;
            if(punctationCounter.countDone === punctationCounter.countToDo){
              //last function!!!
              getTheCriminal();
            }
          },'json');

        };
      };

      // defining callback to get suspects punctuations
      var getSuspectPunctiation = function(){
        var punctationCounter = {
          countToDo : 0,
          countDone : 0
        };
        for(var i in suspectsHash){
          punctationCounter.countToDo += suspectsHash[i].evidences.length;
          procesingEvidences(suspectsHash[i],punctationCounter);
        };
      };

      // defining auxiliar functions
      var addSuspect = function(suspectsHash,suspect,evidenceData){
        if(suspectsHash[suspect.s_id]){
          suspectsHash[suspect.s_id].count++;
          suspectsHash[suspect.s_id].evidences.push({
            accuracy : evidenceData.accuracy,
            weight : evidenceData.weight
          });
        } else {
          suspectsHash[suspect.s_id] = {
            count : 1,
            name : suspect.name,
            evidences : [{
              accuracy : evidenceData.accuracy,
              weight : evidenceData.weight
            }]
          };

        }
      };

      var requestSuspectsList = function(requestData,evidenceData,countRequests,limitRequests){
        $.get('/FBI/API/suspectsList',requestData,function(data){
          for(var j in data){
            addSuspect(suspectsHash,data[j],evidenceData);
            console.log('hash',suspectsHash);
          };

          countRequests.count++;
          if(countRequests.count === limitRequests){
            getSuspectPunctiation();
          }

        },'json');
      };

      // defining callback function to get suspect list
      var getSuspectLists = function(){

        // defining axiliar counter
        var countRequests = { count : 0};

        for(var i in examinationsResults){
          var requestData = {
            caseId : caseDetail.id,
            characteristics : examinationsResults[i].conclusion
          };
          requestSuspectsList(
            requestData,
            examinationsResults[i],
            countRequests,
            examinationsResults.length
          );
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

    result.textContent = 'Loading...'
  };

})();
