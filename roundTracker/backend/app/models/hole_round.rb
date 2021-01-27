class HoleRound < ApplicationRecord
    belongs_to :hole
    belongs_to :round
    #belongs_to :user

    # def result
    #     r = self.score - self.hole.par
    #     case r
    #     when -1
    #        self.result = "Birdie"
        
    #     end
    # end
end
