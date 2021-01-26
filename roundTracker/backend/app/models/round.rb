class Round < ApplicationRecord
  belongs_to :user
  belongs_to :course
  has_many :holes, through: :course
  has_many :hole_rounds 

  def round_score
    self.hole_rounds.sum { |x| x.score}
  end

end
