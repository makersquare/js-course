Open up `index.html` in your browser and take a minute to explore, then answer the following questions.

# Model Questions

Take a look at `src/models.js` and answer the following questions:

1. How many Model methods emit a change event?
2. How many emit no change event? Why wouldn't they?
3. Why do you think this Model wants to keep the `peeps` data encapsulated?

# MVPresenter Questions

Take a look at `src/m-v-presenter.js` and answer the following questions:

1. How many View events does Presenter listen for?
2. How many Model events does Presenter listen for?
3. Where does everything start? In other words, where does the View actually get put on the page?

# MVController Questions

Take a look at `src/m-v-controller.js` and answer the following questions:

1. How many controller actions are defined?
2. How many controller actions does the View bind to itself? Where?
3. How many Model manipulations does the View do on View events? Where?
4. Where does everything start? In other words, where does the View actually get put on the page?
