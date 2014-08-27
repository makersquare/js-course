require 'sinatra'
require 'json'

# Comment this out if you're not using Vagrant.
set :bind, '10.10.10.10'

string = "<h2>Messy Room by Shel Silverstein</h2>"\
		"Whosever room this is should be ashamed!\n"\
		"His underwear is hanging on the lamp.\n"\
		"His raincoat is there in the overstuffed chair,\n"\
		"And the chair is becoming quite mucky and damp.\n"\
		"His workbook is wedged in the window,\n"\
		"His sweater's been thrown on the floor.\n"\
		"His scarf and one ski are beneath the TV,\n"\
		"And his pants have been carelessly hung on the door.\n"\
		"His books are all jammed in the closet,\n"\
		"His vest has been left in the hall.\n"\
		"A lizard named Ed is asleep in his bed,\n"\
		"And his smelly old sock has been stuck to the wall.\n"\
		"Whosever room this is should be ashamed!\n"\
		"Donald or Robert or Willie or--\n"\
		"Huh? You say it's mine? Oh, dear,\n"\
		"I knew it looked familiar!"

string_sections_per_id = 3
string_section_len = 3

get '/' do
	erb :index
end

# Return a set of objects
get '/:id' do
	payload = {}

	id = params[:id].to_i
	puts 'id: ' + id.to_s
	# Set the section we start returning at
	section_offset = id * string_sections_per_id
	# The string offset
	string_offset = id * string_section_len

	string_sections_per_id.times do |index|
		segment = string[(string_offset + index) * string_section_len, string_section_len]
		if segment
			payload[index] = segment
		end
	end

	payload.to_json
end