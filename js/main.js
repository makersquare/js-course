

// var itemTemplate = $('#templates .item').html();

// console.log('The template html:', itemTemplate);


// var newHtml = Robin.render(itemTemplate,{ name: 'Dewberry', price: 0.15 })
// console.log(newHtml);
// $('#store').append(newHtml);


// var items = [
//   { name: 'strawberry', price: 2.99 },
//   { name: 'orange', price: 3.99 },
//   { name: 'coconut', price: 4.99}
// ];

// // above is an array with objects at each index


// var itemTemplate = $('#templates .item').html();

// for (var i =0; i <items.length;i++) {
//   var newHtml = Robin.render(itemTemplate,items[i])
//   $('#store').append(newHtml);
// }

$("form").on("submit",function(e) {
  e.preventDefault();
  // need to save values on submit
  // var items = {};
  var foodname = $(".food").val();
  // items['name'] = foodname
  var priceamount = $(".price").val();
  // items['price'] = priceamount
  console.log(foodname);

  var items = { "name": foodname, "price": priceamount};
  alert(items);
  var itemTemplate = $('#templates .item').html();
  var newHTML = Robin.render(itemTemplate,items)
  $('#store').append(newHTML)
});
