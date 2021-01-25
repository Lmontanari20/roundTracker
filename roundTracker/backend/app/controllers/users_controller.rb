class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def new

    end

    def create
        user = User.create(user_params)
        render json: user 
    end

    def login
        user = User.find_by(username: params[:username])
        if user 
            session[:user_id] = user.id
            render user
        else
            error = {message: "Not a valid username"} 
            render error 
        end
    end
  
    def user_params
        params.require(:user).permit[:username]
    end

end
