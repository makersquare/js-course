(function () {
  // Global namespace
  window.App = {}

  // PubSub (necessary without a proper framework like Mithril.js)
  App.pubsub = new Events()
})()
