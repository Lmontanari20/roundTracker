class RoundsController < ApplicationController

    def analytics

    end

    def new_round
        round = Round.create(name: params[:name], )
    end

end
