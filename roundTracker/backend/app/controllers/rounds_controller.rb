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
        hole_rounds = params[:hole_rounds]
        p hole_rounds
        round = Round.create(name: params[:name], length: params[:length], user_id: user.id, course_id: params[:course][:id])
        hole_rounds.each{|hole|
            HoleRound.create(score: hole[:score], hole_id: hole[:hole_id], round_id: round[:id], user_id: user[:id], course_id: hole[:course_id])
        }
        render json: round, include: [:hole_rounds, :course]
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
