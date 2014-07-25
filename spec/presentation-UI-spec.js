var setUpHTMLFixture = function() {
   setFixtures('<div class="row main">'
      +'<div class="large-8 large-centered columns">'
        +'<div class="panel">'
          +'<label>Pick a Number from 1-100:</label>'
          +'<label id="response"></label>'
        +'</div>'
        +'<br />'
        +'<input id="user-input" type="text" placeholder="Put your guess here!" />'
        +'<input class="button small" id="submit-button" type="button" value="Guess" />'
        +'<input class="button small" id="start-game" type="button" value="Start Game" />'
        +'<input class="button small" id="end-game" type="button" value="End Game" />'
        +'<input class="button small" id="clear-input" type="button" value="Clear Input and Response" />'
      +'</div>'
    +'</div>'); 
   window.presentationUISpec = presentationUI;
   presentationUISpec();
};


describe('UI Presentation testing ............', function() {

  describe('#start-game button behavior', function() {
    
    describe('when the game is over and needs to be started', function() {
      var spyEvent;
      beforeEach(function() {
        setUpHTMLFixture();
        bl.gameOver = true;
      });

      it('should invoke the #start-game click event', function(){
        spyEvent = spyOnEvent('#start-game', 'click');
        $('#start-game').trigger( "click" );
        
        expect('click').toHaveBeenTriggeredOn('#start-game');
        expect(spyEvent).toHaveBeenTriggered();
      });

      it('should set gameOver to false', function(){
        $('#start-game').trigger( "click" );
        expect(bl.gameOver).toEqual(false);
      });

      it('should generate a new ramdon number', function(){
        $('#start-game').trigger( "click" );
        expect(bl.secretNumber).not.toEqual(undefined);
        expect(typeof bl.secretNumber).toEqual("number");
      });

      it('populate response box with "A New Game has begun! Guess a number."', function(){
        $('#start-game').trigger( "click" );
        expect( $('#response') ).toHaveText('A New Game has begun! Guess a number.');
      });
      
    }); 

  });
});