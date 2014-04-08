(function () {

  // On clock tick, update the metronome visually
  clock.on('tick', function (tickCount) {
    // step is a number between 0 and 3
    var step = (tickCount - 1) % 4;

    // Activate the correct box by:
    // 1. Removing the 'active' class from ALL metronome divs
    // 2. Selecting the CORRECT div and adding an 'active' class to THAT
    $('.metronome div')
      .removeClass('active')
      .eq(step)
        .addClass('active')
    ;
  });

})();
