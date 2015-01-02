
//....................................
//read this content is cheating >.< !!
//....................................

(function(){

  var validateInterview = function (data){
    if(!data || typeof(data) != "string"){
      return false
    }
    if(data.localeCompare('Truck drivers declarations.') == 0) {
      return "/mocks/interview1.json";
    }
    if(data.localeCompare('A kid was playing close to one of the crime scenes.') == 0) {
      return "/mocks/interview2.json";
    }
    return false;
  };

  var validateIntem = function (data){
    if(!data || typeof(data) != "string"){
      return false
    }
    if(data.localeCompare("flat tires on all the trucks.") == 0) {
      return "/mocks/item1.json";
    }
    if(data.localeCompare("Shoe prints on the ground.") == 0) {
      return "/mocks/item2.json";
    }
    return false;
  };

  var validateMedia = function (data){
    if(!data || typeof(data) != "string"){
      return false
    }
    if(data.localeCompare("Records from truck's security cameras.") == 0) {
      return "/mocks/media1.json";
    }
    if(data.localeCompare("Weird phone calls were made to truck drivers.") == 0) {
      return "/mocks/media2.json";
    }
    return false;
  };

  var validateInjure = function (data){
    if(!data || typeof(data) != "string"){
      return false
    }
    if(data.localeCompare("Some truck drivers got a hit on the head.") == 0) {
      return "/mocks/medical.json";
    }
    return false;
  };



  var validateSuspectsList = function (data){
    if(!data || typeof(data) != "string"){
      return false
    }
    if(data.localeCompare("Vito Corleone") == 0) {
      return "/mocks/vc.json";
    }
    if(data.localeCompare("Just a weird guy") == 0) {
      return "/mocks/wg.json";
    }
    if(data.localeCompare("Old fashion Italan Mafia Style.") == 0) {
      return "/mocks/ms.json";
    }
    if(data.localeCompare("Cowboy's shoe prints.") == 0) {
      return "/mocks/cw.json";
    }
    if(data.localeCompare("Fake Gangsta") == 0) {
      return "/mocks/fg.json";
    }
    if(data.localeCompare("Inexperienced mafia crew.") == 0) {
      return "/mocks/imc.json";
    }
    if(data.localeCompare("Disoriented pizza delivery guy.") == 0) {
      return "/mocks/dpdg.json";
    }
    return false;
  };

  var validateRankInput = function (rankInfo) {
    if(!rankInfo ||
      !rankInfo.accuracy ||
      !rankInfo.weight ||
      !(rankInfo.accuracy < 1 && rankInfo.accuracy > 0) ||
      !(typeof(rankInfo.weight) === 'number')) {
      return false;
    }
    return rankInfo.weight * rankInfo.accuracy;
  }

  $.mockjax(function(settings){

    switch(settings.url){

      case '/FBI/API/case' :
        if(settings.type === 'GET' || settings.type === 'get') {
          return {
            responseTime : 1000,
            proxy: "/mocks/case.json"
          };
        }
        return {
          responseTime : 500,
          responseText : "Invalid request",
          status : 401
        };

      case "/FBI/API/interview" :
        if(settings.data && (settings.type === 'POST' || settings.type === 'post')){
          if(settings.data.caseId == 'case-01'
          && validateInterview(settings.data.who)){
            return {
              responseTime : 1500,
              proxy : validateInterview(settings.data.who)
            };
          }
        }
        return {
          responseTime : 500,
          responseText : "Invalid request",
          status : 401
        };

      case "/FBI/API/itemLaboratory" :
        if(settings.data && (settings.type === 'POST' || settings.type === 'post')){
          if(settings.data.caseId == 'case-01'
          && validateIntem(settings.data.what)){
            return {
              responseTime : 1500,
              proxy : validateIntem(settings.data.what)
            };
          }
        }
        return {
          responseTime : 500,
          responseText : "Invalid request",
          status : 401
        };

      case "/FBI/API/mediaLaboratory" :
        if(settings.data && (settings.type === 'POST' || settings.type === 'post')){
          if(settings.data.caseId == 'case-01'
          && validateMedia(settings.data.what)){
            return {
              responseTime : 1500,
              proxy : validateMedia(settings.data.what)
            };
          }
        }
        return {
          responseTime : 500,
          responseText : "Invalid request",
          status : 401
        };

      case "/FBI/API/medicalAnalysis" :
        if(settings.data && (settings.type === 'POST' || settings.type === 'post')){
          if(settings.data.caseId == 'case-01'
          && validateInjure(settings.data.what)){
            return {
              responseTime : 2000,
              proxy : validateInjure(settings.data.what)
            };
          }
        }
        return {
          responseTime : 500,
          responseText : "Invalid request",
          status : 401
        };

      case "/FBI/API/suspectsList" :
        if(settings.data && settings.type === 'GET' || settings.type === 'get'){
          if(settings.data.caseId == 'case-01'
          && validateSuspectsList(settings.data.characteristics)){
            return {
              responseTime : 1100,
              proxy : validateSuspectsList(settings.data.characteristics)
            };
          }
        }
        return {
          responseTime : 500,
          responseText : "Invalid request :(",
          status : 401
        };

      case "/FBI/API/calculateScore" :
        if(settings.data && (settings.type === 'POST' || settings.type === 'post')){
          if(settings.data.caseId == 'case-01'
          && validateRankInput(settings.data.rankInput)){
            return {
              responseTime : 1100,
              responseText : JSON.stringify(
                {result : validateRankInput(settings.data.rankInput)}
              )
            };
          }
        }
        return {
          responseTime : 500,
          responseText : "Invalid request",
          status : 401
        };

    };
    return {
      responseTime : 500,
      responseText : "Invalid request",
      status : 401
    };
  })

})();