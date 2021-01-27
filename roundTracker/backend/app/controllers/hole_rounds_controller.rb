class HoleRoundsController < ApplicationController

    def new_hole_round
        user = User.find_by(username: params[:username])
        hole_round = HoleRound.create(score: params[:score], hole_id: params[:hole_id], user_id: user.id, course_id: params[:course_id])
    end
end
