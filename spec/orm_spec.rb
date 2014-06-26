require 'spec_helper'
describe Jokes::ORM do
  before(:all) do
    test_db_adapter = PG.connect(host: 'localhost', dbname: 'jokes-test')
    Jokes.orm.instance_variable_set(:@db_adapter, test_db_adapter)
  end

  before do
    Jokes.orm.reset_tables
  end
  describe '#get_all_jokes and #add_joke' do
    it "returns an empty array" do
      expect(Jokes.orm.get_all_jokes).to be_a(Array)
      expect(Jokes.orm.get_all_jokes).to eq([])
    end

    it "adds a joke" do
      joke = Jokes.orm.add_joke("hey", "there")
      expect(joke).to be_a(Jokes::Joke)
      expect(joke.id).to be_a(Fixnum)
      expect(joke.question).to eq("hey")
      expect(joke.answer).to eq("there")
    end

    it "lists all created jokes" do
      joke = Jokes.orm.add_joke("hey", "there")
      joke2 = Jokes.orm.add_joke("hey2", "there2")
      jokes = Jokes.orm.get_all_jokes
      expect(jokes).to be_a(Array)
      expect(jokes.size).to eq(2)
      expect(jokes[0].question).to eq(joke.question)
      expect(jokes[0].answer).to eq(joke.answer)
      expect(jokes[1].question).to eq(joke2.question)
      expect(jokes[1].answer).to eq(joke2.answer)
    end
  end

  describe "#delete_joke" do
    it "deletes a given joke" do
      joke = Jokes.orm.add_joke("hey", "there")
      Jokes.orm.delete_joke(joke.id)
      expect(Jokes.orm.get_all_jokes).to eq([])
    end

    it "deletes the right joke" do
      joke = Jokes.orm.add_joke("hey", "there")
      joke2 = Jokes.orm.add_joke("hey2", "there2")
      Jokes.orm.delete_joke(joke2.id)
      jokes = Jokes.orm.get_all_jokes
      expect(jokes).to be_a(Array)
      expect(jokes.size).to eq(1)
      expect(jokes[0].question).to eq(joke.question)
      expect(jokes[0].answer).to eq(joke.answer)
    end
  end
end