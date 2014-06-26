module Jokes
  class ORM
    def initialize
      @db_adapter = PG::connect(host: 'localhost', dbname: 'jokes')
      create_tables
    end

    def create_tables
      command = <<-SQL
        CREATE TABLE IF NOT EXISTS jokes(
          id SERIAL,
          question TEXT,
          answer TEXT);
      SQL
      @db_adapter.exec(command)
    end

    def drop_tables
      command = <<-SQL
        DROP TABLE IF EXISTS jokes;
      SQL
      @db_adapter.exec(command)
    end

    def reset_tables
      drop_tables
      create_tables
    end

    def get_all_jokes
      command = <<-SQL
        SELECT * FROM jokes;
      SQL
      jokes_info = @db_adapter.exec(command)
      jokes_info.map do |joke_info|
        Jokes::Joke.new(joke_info["id"].to_i, joke_info["question"], joke_info["answer"])  
      end
    end

    def add_joke(q, a)
      command = <<-SQL
        INSERT INTO jokes(question, answer)
        VALUES ('#{q}', '#{a}')
        RETURNING *;
      SQL
      joke_info = @db_adapter.exec(command)[0]
      j = Jokes::Joke.new(joke_info["id"].to_i, joke_info["question"], joke_info["answer"])
    end

    def delete_joke(id)
      command = <<-SQL
        DELETE FROM jokes
        WHERE id=#{id};
      SQL
      @db_adapter.exec(command)
    end
  end

  def self.orm
    @__orm_instance ||= Jokes::ORM.new
  end
end