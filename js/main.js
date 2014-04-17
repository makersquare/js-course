

// var itemTemplate = $('#templates .item').html();

// console.log('The template html:', itemTemplate);


// var newHtml = Robin.render(itemTemplate,{ name: 'Dewberry', price: 0.15 })
// console.log(newHtml);
// $('#store').append(newHtml);


var items = [
  { name: 'strawberry', price: 2.99 },
  { name: 'orange', price: 3.99 },
  { name: 'coconut', price: 4.99}
];

// above is an array with objects at each index


var itemTemplate = $('#templates .item').html();

for (var i =0; i <items.length;i++) {
  var newHtml = Robin.render(itemTemplate,items[i])
  $('#store').append(newHtml);
}
