# required gem includes
require 'sinatra'
require "sinatra/json"
require 'pry-debugger'

# require file includes
require_relative 'jokes_app.rb'

set :bind, '0.0.0.0' # Vagrant fix
set :port, 9494
Pry.config.input = STDIN
  Pry.config.output = STDOUT

#-------- JSON API routes -----------

# more info sinatra json: http://www.sinatrarb.com/contrib/json.html
get '/api/jokes' do
  @jokes = Jokes.orm.get_all_jokes.map {|joke| joke.to_json}
  json @jokes
end

post '/api/joke' do
  joke_info = params[:joke]
  joke = Jokes.orm.add_joke(
    joke_info[:question],
    joke_info[:answer]
    )
  json joke.to_json
end

delete '/api/joke/:id' do
  Jokes.orm.delete_joke(params[:id].to_i)
  json "true"
end