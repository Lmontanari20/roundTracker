class Round < ApplicationRecord
  belongs_to :user
  belongs_to :course
  has_many :holes, through: :course
end
