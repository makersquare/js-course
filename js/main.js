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
// Robin.extend(pizzaCook,Robin.Events)

// pizzaCook.on('confidence', function () {
//   alert('I HAVE SOLVED WORLD HUNGER');
// });

// for (var i = 0; i < 11; i += 1) {
//   pizzaCook.spinDough();
// }

// var weather = Robin.extend({}, Robin.Events);

// weather.on('snow-storm',function() {
//   alert('Bring your coats');
// })

// weather.on('tornado',function() {
//   alert('Everybahdy panic!')
// })

// weather.trigger('snow-storm');
// weather.trigger('tornado');

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
Robin.extend(fireEater,Robin.Events);

fireEater.on("pose",function() {
  console.log("audience applause")
})

fireEater.on("choke",function() {
  console.log("audience gasp")
});


// Add two event listeners on fireEater that listen for a pose event and a choke event. When the fire eater poses,
// console log an applause. When the fire eater chokes, console log an audience gasp

for (var i = 0; i < 10; i += 1) {
  fireEater.eatFire();
}
