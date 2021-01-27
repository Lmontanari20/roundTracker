class Hole < ApplicationRecord
    belongs_to :course
    has_many :hole_rounds 
end
