# required gem includes
require 'sinatra'
require "sinatra/json"

# require file includes
require_relative 'lib/myapp.rb'

set :bind, '0.0.0.0' # Vagrant fix
set :port, 9494


#-------- JSON API routes -----------

# more info sinatra json: http://www.sinatrarb.com/contrib/json.html
get '/api/jokes' do
  @jokes = Jokes.orm.get_all_jokes
  json @jokes
end