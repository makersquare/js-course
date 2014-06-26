require 'spec_helper'

describe Jokes::Joke do
  describe 'initialize' do
    it "should create a joke with question and answer" do
      joke = Jokes::Joke.new 5, "hello", "goodbye"
      expect(joke.id).to eq(5)
      expect(joke.question).to eq("hello")
      expect(joke.answer).to eq("goodbye")
    end
  end
end