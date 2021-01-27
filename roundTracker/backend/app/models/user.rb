class User < ApplicationRecord
    has_many :rounds
    has_many :courses, through: :rounds
    has_many :holes, through: :courses
    has_many :hole_rounds, through: :holes

    def best_round
       self.rounds.max_by { |x| x.round_score}
    end

    def worst_round
        self.rounds.min_by { |x| x.round_score}
     end
   
    def best_hole
        self.hole_rounds.min_by { |x| x.result_number}
    end


end
