class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def new

    end

    def create
        user = User.create(username: params[:username])
        render json: user 
    end

    def login
        user = User.find_by(username: params[:username])
        if user 
            render json: user
        else
            error = {message: "Not a valid username, to create one press signup instead of login."} 
            render json: error 
        end
    end

    def error
        error = {message: "Not a valid username, to create one press signup instead of login."} 
        render json: error 
    end

    def analytics 
        
    end
  
    
end
