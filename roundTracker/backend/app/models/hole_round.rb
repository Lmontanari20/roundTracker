class HoleRound < ApplicationRecord
    belongs_to :hole
    belongs_to :round
    belongs_to :user
    belongs_to :course

    def result
     r =  self.score - self.hole.par
        case r
        when -1
           self.result = "Birdie"
        when 0
            self.result = "Par"
        when  -2 
            self.result = "Eagle"
        when 1
            self.result = "Bogey"
        when 2
            self.result = "Double Bogey"
        when  3
            self.result = "Triple Bogey"
        when 4 
            self.result = "Four Over"
        when 5
            self.result = "Five Over"
        end
    end

    def result_number
        self.score - self.hole.par
    end

end
