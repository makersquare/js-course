# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

quiz1 = Quiz.create(title: "Your Favorites")

quiz1.questions.build(
  question_type: "multiple",
  question: "What's your favorite color?",
  choices: "blue;pink;green;red",
  answer: "blue"
).save

quiz1.questions.build(
  question_type: "multiple",
  question: "What's your favorite animal?",
  choices: "tiger;lion;pigeon;cat;dog",
  answer: "tiger"
).save

quiz2 = Quiz.create(title: "About You")

quiz2.questions.build(
  question_type: "multiple",
  question: "What month were you born in?",
  choices: "January;February;March;other",
  answer: "other"
).save

quiz2.questions.build(
  question_type: "multiple",
  question: "What school do you go to?",
  choices: "Harvard;Stanford;MIT;MakerSquare",
  answer: "MakerSquare"
).save