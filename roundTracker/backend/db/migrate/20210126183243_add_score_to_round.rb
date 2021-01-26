class AddScoreToRound < ActiveRecord::Migration[6.1]
  def change
    add_column :rounds, :score, :integer 
  end
end
