# QuizzyNet - Rails API

This is a pared down Rails-based API with which you can integrate your Quizzy single page application. Its database uses quizzes, questions, and scores.

## Installation

Clone this repository, then in Vagrant, run:

```
bundle exec rake db:create
bundle exec rake db:migrate
rails s
```

You should now have the server running and accessible at http://localhost:3000/.

## The API

