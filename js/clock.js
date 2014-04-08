(function () {

  // Expose a global variable for other code to use
  window.clock = {
    totalTickCount: 0,
    tick: function () {
      this.totalTickCount += 1;
      clock.trigger('tick', this.totalTickCount);
    }
  };

  // Make the clock observable
  Robin.extend(clock, Robin.events);

  // When we start the clock, make it tick 108 beats per minute
  clock.start = function () {

    // If timeout is truthy, then the clock is already running
    if (this.timeout) {
      return;
    }

    // Make the clock tick immediately for instant gratification
    this.tick();

    this.timeout = setInterval(function () {
      // We need to call it like this so that clock is the object calling the tick function
      clock.tick();
    }, 555);
  };

  // Stopping the clock means stopping the interval
  clock.stop = function () {
    clearInterval(this.timeout);
    delete this.timeout;
  };

})();
