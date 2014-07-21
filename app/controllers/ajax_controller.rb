class AJAXController < ApplicationController
  before_action :require_ajax

  private

  def require_ajax
    unless request.xhr?
      # render :status => :forbidden, :text => "Must be an AJAX request"
    end
  end
end
