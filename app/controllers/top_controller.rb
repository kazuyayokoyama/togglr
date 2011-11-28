class TopController < ApplicationController
  def index
    if current_user
      render :template => 'top/signedin'
      return
    else
      render :template => 'top/index'
      return
    end
  end

end
