class Course < ApplicationRecord
    has_many :rounds
    has_many :holes
    has_many :users, through: :rounds
    has_many :hole_rounds, through: :holes
end
