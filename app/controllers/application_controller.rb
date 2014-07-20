class ApplicationController < ActionController::Base
  # protect_from_forgery with: :null_session

  # Skipping this for our learning application.
  skip_before_filter :verify_authenticity_token
end
