class RoundsController < ApplicationController

    
    def index 
        user = User.find_by(username: params[:username])
        rounds = Round.where(:user_id => user.id)
        render json: rounds, include: [:course, :hole_rounds]
    end
    
    def analytics

    end

    def new_round
        user = User.find_by(username: params[:username])
        round = Round.create(name: params[:name], length: params[:length], course_id: params[:course_id], user_id: user.id )
        render json: round
    end

    def destroy
        round = Round.find_by(id: params[:id])
        round.destroy() 
    end

    def update
        round = Round.find(params[:id])
        #round.update(name: params[:name], score: params[:score])
        round.update(name: params[:name])
        render json: round
    end

end
