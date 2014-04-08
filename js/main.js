(function () {

  clock.on('tick', function (tickCount) {
    console.log('tick!', tickCount);
  });

  $('#clock-control .start').on('click', function (e) {
    clock.start();
  });

  $('#clock-control .stop').on('click', function (e) {
    clock.stop();
  });

})();
