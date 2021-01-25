class SessionController < ApplicationController

    def create
        user = User.find_by(username: params[:username])
        if user 
            session[:user_id] = user.id
            render user
        else
            error = {message: "Not a valid username"} 
            render error 
        end
    end

end
