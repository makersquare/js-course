// var buzzer = {
//   press: function () {
//     this.trigger('buzz');
//   }
// };
// // This adds an `on` method!
// Robin.extend(buzzer, Robin.Events);

// // Now we can use it!
// buzzer.on('buzz', function () {
//   alert('The buzzer went off!');
// });

// buzzer.press();
// buzzer.press();

// ===============================================================

// var pizzaCook = {
//   ego: 0,
//   spinDough: function () {
//     this.ego += 1;
//     if (this.ego > 10) {
//       this.trigger('confidence');
//     }
//   }
// };

// // TODO: RIGHT HERE
// Robin.extend(pizzaCook, Robin.Events);

// pizzaCook.on('confidence', function () {
//   alert('I HAVE SOLVED WORLD HUNGER');
// });

// for (var i = 0; i < 11; i += 1) {
//   pizzaCook.spinDough();
// }

// ===============================================================

// var weather = Robin.extend({}, Robin.Events);

// weather.on('snow-storm', function () {
//   alert('Bring your coats');
// });

// weather.on('tornado', function () {
//   alert('Everybahdy panic!');
// });

// // TODO: WRITE TWO LINES HERE
// weather.trigger('snow-storm');
// weather.trigger('tornado');

// ===============================================================

var fireEater = {
  state: 'arrogant',

  eatFire: function () {
    if (this.state === 'choking') {
      this.trigger('choke');
      return;
    }

    var fate = parseInt(Math.random() * 5, 10);
    if (fate === 0) {
      this.trigger('choke');
      this.state = 'choking';
    }
    else {
      this.trigger('pose');
    }
  }
};

// TODO: RIGHT HERE, YES HERE, IN BETWEEN, YES
Robin.extend(fireEater, Robin.Events);

fireEater.on('pose', function () {
  console.log('Audience Applauds');
});
fireEater.on('choke', function () {
  console.log('Audience Gasps');
});

for (var i = 0; i < 10; i += 1) {
  fireEater.eatFire();
}
