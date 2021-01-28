class UsersController < ApplicationController

    before_action :current, only: [:login, :analytics]
    def new

    end

    def index 
        users = User.all 
        render json: users 
    end

    def create
        user = User.create(username: params[:username])
        render json: user 
    end

    def login
       
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
     
        results = user.hole_rounds.map { |x| x.result }
    end
  
    def current
        user = User.find_by(username: params[:username])
    end
    
end
