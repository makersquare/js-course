module Jokes
  class Joke
    attr_reader :question, :answer, :id
    def initialize(id, question, answer)
      @id = id
      @question = question
      @answer = answer
    end
  end
end