class User < ApplicationRecord
    has_many :rounds
    has_many :courses, through: :rounds
    has_many :holes, through: :courses
    # has_many :hole_rounds, through: :holes

    def best_round
       self.rounds.max_by { |x| x.round_score}
    end

    def worst_round
        self.rounds.min_by { |x| x.round_score}
     end
   
    def pars

    end

    def bogeys

    end

    def birdies

    end

    def eagles

    end


end
