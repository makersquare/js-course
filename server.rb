# required gem includes
require 'sinatra'
require "sinatra/json"

set :bind, '0.0.0.0' # Vagrant fix
set :port, 9494

# partial
# layouts

get '/' do
  erb :index
end

get '/about' do
  erb :about
end

get "/signup" do
  erb :signup_box, layout: :signup_layout
end