class SessionsController < ApplicationController
  def callback
    auth = request.env["omniauth.auth"]
    user = User.find_by_provider_and_uid(auth["provider"], auth["uid"]) || User.create_with_omniauth(auth)
    session[:provider] = auth["provider"]
    session[:user_id] = user.id
    session[:token] = auth['credentials']['token']
    session[:secret] = auth['credentials']['secret']
    #render :text => auth
    redirect_to root_url, :notice => "Signed in!"
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, :notice => "Signed out!"
  end
  
  def failure
    #render :text => 'error!'
    redirect_to root_url
  end
  
  def tweet
    return redirect_to '/404.html' unless request.xhr?
    
    # tweet
    Twitter.configure do |config|
      config.consumer_key       = TWITTER_CONSUMER_KEY
      config.consumer_secret    = TWITTER_CONSUMER_SECRET
      config.oauth_token        = session[:token]
      config.oauth_token_secret = session[:secret]
    end

    twitter_client = Twitter::Client.new
    twitter_client.update(params[:msg])
    
    # db
    status = Status.create_with_uid_and_offon(session[:provider], session[:user_id], params[:toggle])
    
    # partial update
    html_trends = render_to_string :partial => "shared/trends"
    html_your_toggle = render_to_string :partial => "shared/your_toggle"
    render :template => 'top/signedin', :json => {:html_trends => html_trends, :html_your_toggle => html_your_toggle}
  end
end