class Course < ApplicationRecord
    has_many :rounds
    has_many :holes
    has_many :users, through: :rounds
end
