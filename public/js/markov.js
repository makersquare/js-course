// Adapted from https://github.com/BrianHicks/Markov-Generator/blob/master/markov.js
var Markov = (function($) {
    var markov = function(input, matchType, saveCorpus) {
      var reg;
      var setMatchType = function(matchType) {
        switch (matchType) {
          case 'l':
            reg = /./g;
            break;
          case 'll':
            reg = /../g;
            break;
          case 'w':
            reg = /[.,?"();\-!':—^\w]+ /g;
            break;
          case 'ww':
            reg = /([.,?"();\-!':—^\w]+ ){2}/g;
            break;
          default:
            throw new Error('Must pass l, ll, w, or ww to matchType');
        }
      }
      setMatchType(matchType);
      this.updateMatchType = setMatchType;

      var data = {};
      // I use underscore to indicate a property I think you 
      // shouldn't use
      this._data = data;

      var load = function(input) {
        if (typeof saveCorpus === 'undefined') {
          saveCorpus = true;
        }
        var s = input.match(reg);
        for (var i = 0; i < s.length-1; i++) {
          if(s[i] in data) {
            if (s[i+1] in data[s[i]]) {
              data[s[i]][s[i+1]]++;
            } else {
              data[s[i]][s[i+1]] = 1;
            }
          } else {
            data[s[i]] = new Object();
            data[s[i]][s[i+1]] = 1;
          }
        }
        // Save corpus
        $.ajax({
          url: '/corpus',
          type: 'POST',
          data: {
            input: input
          },
          success: function(data) {
            console.log(data);
          }
        });
      };
      if (input) load(input, matchType);

      
      var gen = function(l) {
        var sanitycheck = false;
        var out = new Array();
        while (sanitycheck == false) {
          sanitycheck = true;
          var rProperty = findRandomProperty(data);
          var rList = expand(rProperty);
          var l1 = rList.length;
          out[0] = rList[Math.round(Math.random() * l1)];
          if (typeof out[0] == "undefined") { sanitycheck = false; }
          if (sanitycheck) {
            for (var i = 0; i < l-1; i++) {
              var usableLength = expand(data[out[i]]).length-1;
              var randomInt = Math.round(Math.random() * usableLength);
              var nextLetter = expand(data[out[i]])[randomInt];
              out.push(nextLetter);
            }
          }
        }
        return out.join("");
      }
      this.gen = gen;
      
      var findRandomProperty = function(o) {
        l1 = 0;
        for (i in o) {
          l1++;
        }
        var r1 = Math.round(Math.random() * l1);
        l2 = 0;
        for (i in o) {
          l2++;
          if (l2 == r1) {
            return o[i];
          }
        }
      }
      
      var expand = function(obj) {
        oArray = new Array();
        for (var prop in obj) {
          for (var i = 0; i < obj[prop]; i++) {
            oArray.push(prop);
          }
        }
        return oArray;
      }
    }

    return markov;
})(jQuery);