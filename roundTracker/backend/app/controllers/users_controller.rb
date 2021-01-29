class UsersController < ApplicationController
    #before_action :current, only: [:login, :analytics]
    
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
        user = User.find_by(username: params[:username])
        results = user.hole_rounds.map { |x| x.result }
        data = {
            pars: results.count("Par"),
            birdies: results.count("Birdie"),
            eagles: results.count("Eagle"),
            bogey: results.count("Bogey"),
            db: results.count("Double Bogey"),
            holes: user.hole_rounds.count
        }
        render json: data
    end
  
    def destroy 
        user = User.find_by(username: params[:id])
        user.destroy
    end

    def rounds 
        user = User.find_by(username: params[:username])
        render json: user.rounds
    end

    def round_analytics 
        user = User.find_by(username: params[:username])
        round = user.rounds.find(params[:id])
        hole_rounds = round.hole_rounds
        results = hole_rounds.map { |x| x.result }
        data = {
            pars: results.count("Par"),
            birdies: results.count("Birdie"),
            eagles: results.count("Eagle"),
            bogey: results.count("Bogey"),
            db: results.count("Double Bogey"),
            holes: round.length
        }
        render json: data
    end

    # def current
    #     user = User.find_by(username: params[:username])
    # end
    
end
