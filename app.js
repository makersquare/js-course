var layers = [
  {
    level: 0,
    name: 'president',
    moneyGiven: 0,
    moneyStolen: 0
  },
];

var totalDonated = 0;

var addLayer = function(layer) {
  var element =
  $("<div class='layer'> \
    <h3>" + layer.name + "</h3>\
    <h4>We have given $<span class='given'>0</span> to charity</h4>\
    <p>We've taken $<span class='stolen'>0<span></p>\
    <form class='donate-money'>\
      <input type='number' class='amount'>\
      <input type='submit'></button>\
    </form>\
  </div><hr>\
  ");

  $('.layers').append(element);

  $(element).find('.donate-money').submit(function(e) {
    e.preventDefault();
    var amount = $(this).find('.amount').val();
    $(document).trigger('donate', [layer, amount]);
  })
};

$(document).on('donate', function(e, layer, amount) {
  if (layer.name == 'president') {
    layer.moneyGiven += amount / 2;
    layer.moneyStolen += amount / 2;  
  } else {
    layer.moneyGiven += amount / 4;
    layer.moneyStolen += amount / 4;
    $(document).trigger('donate', [layers[layer.level - 1], amount / 2]);
  }
  var layerHTML = $($('.layer')[layer.level]);
  layerHTML.find('.given').html(layer.moneyGiven);
  layerHTML.find('.stolen').html(layer.moneyStolen);
})

$(document).on('add-layer', function(e, layer) {
  addLayer(layer);
});

$(document).on('add-layer', function(e) {
  $('.layer-count').html(layers.length);
});

$(document).on('donate', function(e, layer, amount) {
  totalDonated += Number(amount);
  $('.total-donated').html(totalDonated);
})

$(document).ready(function() {
  addLayer(layers[0]);

  $('.add-layer').submit(function(e){
    e.preventDefault();
    var layerName = $('.layerName').val();
    var newLayer = {
      level: layers.length,
      name: layerName,
      moneyGiven: 0,
      moneyStolen: 0
    };
    layers.push(newLayer);
    $(document).trigger('add-layer', newLayer);
  });
})