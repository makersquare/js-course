require 'sinatra'
require 'json'
require 'wikiwhat'
require 'nokogiri'
require 'sanitize'
require 'cgi'

# Comment this out if you're not using Vagrant.
set :bind, '10.10.10.10'

get '/' do
	erb :index
end

# Return the text of a Wikipedia page
get '/wiki/:title' do
	page = Wikiwhat::Page.new(params[:title])
	html = page.paragraphs(params[:paragraphs].to_i).join('')
	html = Nokogiri::HTML(html).text
end

# Return the text of any website
get '/text' do
	url = CGI.unescapeHTML(params[:url])
	uri = URI(url)
	html = Net::HTTP.get(uri)
	html = Nokogiri::HTML(html)
	blacklist = ['title', 'script', 'style']
	nodeset   = html.search('//text()')
	blacklist.each do |tag|
		nodeset -= html.search('//' + tag + '/text()')
	end
	string = ""
	nodeset.each do |node|
		string += " " + node.text
	end
	string
end

# Gets the corpus of this server
get '/corpus/?' do
	File.read("corpus.txt")
end

# Makes a request to a specific IP for their corpus
get '/corpus/:ip' do
	uri = URI('http://' + params[:ip] + ':4567/corpus')
	html = Net::HTTP.get(uri)
end

# Add some text to our corpus file
post '/corpus' do
	text = params[:input]
	File.open("corpus.txt", 'a') do |f|
		f.write(text)
	end
	200
end