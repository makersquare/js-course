(function () {

  clock.on('tick', function () {
    console.log('tick!', clock.totalTickCount);
  });

  $('#clock-control .start').on('click', function (e) {
    clock.start();
  });

  $('#clock-control .stop').on('click', function (e) {
    clock.stop();
  });

})();
