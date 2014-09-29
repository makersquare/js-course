# QuizzyNet - Rails API

This is a pared down Rails-based API with which you can integrate your Quizzy single page application. Its database uses quizzes, questions, and scores.

## Installation

Navigate to where you want your folder created, then run these commands:

```bash
git clone https://github.com/makersquare/js-course.git quizzy-rails-api -b quizzy-rails-api
cd quizzy-rails-api
bundle install
bundle exec rake db:create
bundle exec rake db:migrate
rails s
```

Additionally, feel free to run `bundle exec rake db:seed` to populate it with 2 mock quizzes.

You should now have the server running and accessible at http://localhost:3000/. You can make AJAX requests to the API freely.

Note that this API has NO users and NO authentication! It's not fit to be used on a live, production server!

# The API

## Quizzes

### Get all quizzes

```
GET /quizzes
```

**Response**

```json
[
    {
        "id": 2,
        "title": "new title!!",
        "created_at": "2014-07-21T00:27:16.044Z",
        "updated_at": "2014-07-21T00:43:48.892Z"
    },
    {
        "id": 3,
        "title": "my second quiz",
        "created_at": "2014-07-21T00:36:43.628Z",
        "updated_at": "2014-07-21T00:36:43.628Z"
    }
]
```

### Get a single quiz

```
GET /quizzes/:id
```

```json
{
    "id": 2,
    "title": "new title!!",
    "created_at": "2014-07-21T00:27:16.044Z",
    "updated_at": "2014-07-21T00:43:48.892Z"
}
```

### Create a quiz

```
POST /quizzes
```

**Input**

| Name        | Type   | Description             |
| ----------- | ------ | ----------------------- |
| quiz[title] | string | The title for the quiz. |

```json
{
	"quiz[title]": "my friendly quiz"
}
```

**Response**

```json
{
    "status": "created",
    "entity": {
        "id": 3,
        "title": "my friendly quiz",
        "created_at": "2014-07-21T00:36:43.628Z",
        "updated_at": "2014-07-21T00:36:43.628Z"
    }
}
```

### Update a quiz

```
PATCH/PUT /quizzes/:id
```

**Input**

| Name        | Type   | Description             |
| ----------- | ------ | ----------------------- |
| quiz[title] | string | The title for the quiz. |

```json
{
	"quiz[title]": "new title!!"
}
```

**Response**

```json
{
    "status": 200,
    "entity": {
        "id": 2,
        "title": "new title!!",
        "created_at": "2014-07-21T00:27:16.044Z",
        "updated_at": "2014-07-21T00:43:48.892Z"
    }
}
```

## Questions

### Get all questions for a quiz

```
GET /quizzes/:id/questions
```

**Response**

```json
[
    {
        "id": 3,
        "question": "What is the capitol of Texas?",
        "answer": "Austin",
        "times_answered": 0,
        "correct_answers": 0,
        "quiz_id": null,
        "created_at": "2014-07-21T01:42:40.712Z",
        "updated_at": "2014-07-21T01:42:40.712Z",
        "choices": "Austin;Banana;Germany"
    },
    {
        "id": 4,
        "question": "Where in the world is Carmen San Diego?",
        "answer": "San Diego",
        "times_answered": 0,
        "correct_answers": 0,
        "quiz_id": null,
        "created_at": "2014-07-21T01:44:15.930Z",
        "updated_at": "2014-07-21T01:44:15.930Z",
        "choices": ""
    }
]
```

### Get a single question

```
GET /quizzes/:id/questions/:id
```

***Response***

```json
{
    "id": 4,
    "question": "Where in the world is Carmen San Diego?",
    "answer": "San Diego",
    "times_answered": 0,
    "correct_answers": 0,
    "quiz_id": null,
    "created_at": "2014-07-21T01:44:15.930Z",
    "updated_at": "2014-07-21T01:44:15.930Z",
    "choices": ""
}
```

### Create a question

```
POST /quizzes/:id/questions
```

**Input**

All fields are required when first creating a question.

| Name               | Type   | Description |
| ------------------ | ------ | ----------- |
| question[question] | string | The question being asked. |
| question[answer]   | string | The question's answer. Should be `true` or `false` if the type is `boolean`, one of the choices in the semicolon-delimited string if it's a `multiple`, and anything if the type is `blank`. |
| question[type]     | string | The type of question. `blank`, `boolean`, or `multiple`. |
| question[choices]  | string | If applicable, the available choices as a semicolon-delimited string. |

```json
{
	"question[question]": "What is the capitol of Texas?",
	"question[answer]": "Austin",
	"question[choices": "Austin;Banana;Germany",
	"question[type]": "multiple"
}
```

**Response**

```json
{
    "status": "created",
    "entity": {
        "id": 3,
        "question": "What is the capitol of Texas?",
        "answer": "Austin",
        "times_answered": 0,
        "correct_answers": 0,
        "quiz_id": null,
        "created_at": "2014-07-21T01:42:40.712Z",
        "updated_at": "2014-07-21T01:42:40.712Z",
        "choices": "Austin;Banana;Germany"
    }
}
```

### Update a question

```
PATCH/PUT /quizzes/:id/questions/:id
```

**Input**

| Name               | Type   | Description |
| ------------------ | ------ | ----------- |
| question[question] | string | The question being asked. |
| question[answer]   | string | The question's answer. Should be `true` or `false` if the type is `boolean`, one of the choices in the semicolon-delimited string if it's a `multiple`, and anything if the type is `blank`. |
| question[type]     | string | The type of question. `blank`, `boolean`, or `multiple`. |
| question[choices]  | string | If applicable, the available choices as a semicolon-delimited string. |

```json
{
	"question[question]": "What is the capitol of California?",
	"question[answer]": "Sacramento",
	"question[choices": "Austin;Banana;Germany;Sacramento",
	"question[type]": "multiple"
}
```

**Response**

```json
{
    "status": 200,
    "entity": {
        "id": 3,
        "question": "What is the capitol of California?",
        "answer": "Sacramento",
        "times_answered": 0,
        "correct_answers": 0,
        "quiz_id": null,
        "created_at": "2014-07-21T01:42:40.712Z",
        "updated_at": "2014-07-21T02:13:05.362Z",
        "choices": "Austin;Banana;Germany;Sacramento"
    }
}
```

### Check answer against a question

```
GET /quizzes/:id/questions/:id/check?answer=your_answer_here
```

Returns a JSON array with a property `correct` which is `true` or `false` and internally updates the question's `times_answered` and `correct_answers` fields.

**Input**

| Name   | Type   | Description |
| -------| ------ | ----------- |
| answer | string | The answer being provided to this question. |

**Response**

```json
{
	"correct": "true"
}
```

Or...

```json
{
	"correct": "false"
}
```

## Score

### Get all scores

```
GET /quizzes/:id/scores
```

**Response**

```json
[
    {
        "id": 1,
        "score": 1001,
        "user": "Way",
        "created_at": "2014-07-21T02:42:16.728Z",
        "updated_at": "2014-07-21T02:42:56.187Z"
    },
    {
        "id": 2,
        "score": 1500,
        "user": "Nick",
        "created_at": "2014-07-21T02:43:42.927Z",
        "updated_at": "2014-07-21T02:43:42.927Z"
    },
    {
        "id": 3,
        "score": 1200,
        "user": "Way",
        "created_at": "2014-07-21T02:43:51.201Z",
        "updated_at": "2014-07-21T02:43:51.201Z"
    }
]
```

### Get a single score

```
GET /quizzes/:id/scores/:id
```

***Response***

```json
{
    "id": 3,
    "score": 1200,
    "user": "Way",
    "created_at": "2014-07-21T02:43:51.201Z",
    "updated_at": "2014-07-21T02:43:51.201Z"
}
```

### Create a score

```
POST /quizzes/:id/scores/:id
```

**Input**

All fields are required when first creating a score.

| Name               | Type   | Description |
| ------------------ | ------ | ----------- |
| score[user]  | string  | The name of the user whose score is being entered. |
| score[score] | integer | The user's score. |

```json
{
	"score[score]": 1000,
	"score[user]": "Way"
}
```

**Response**

```json
{
    "status": "created",
    "entity": {
        "id": 1,
        "score": 1000,
        "user": "Way",
        "created_at": "2014-07-21T02:42:16.728Z",
        "updated_at": "2014-07-21T02:42:16.728Z"
    }
}
```

### Update a score

```
PATCH/PUT /quizzes/:id/scores/:id
```

**Input**

| Name               | Type   | Description |
| ------------------ | ------ | ----------- |
| score[user]  | string  | The name of the user whose score is being entered. |
| score[score] | integer | The user's score. |

```json
{
	"score[score]": 1001,
	"score[user]": "Way"
}
```

**Response**

```json
{
    "status": 200,
    "entity": {
        "id": 1,
        "score": 1001,
        "user": "Way",
        "created_at": "2014-07-21T02:42:16.728Z",
        "updated_at": "2014-07-21T02:42:56.187Z"
    }
}
```
