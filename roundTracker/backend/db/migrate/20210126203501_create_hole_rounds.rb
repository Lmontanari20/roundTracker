class CreateHoleRounds < ActiveRecord::Migration[6.1]
  def change
    create_table :hole_rounds do |t|
      t.integer :score
      t.references :hole, null: false, foreign_key: true
      t.references :round, null: false, foreign_key: true
      t.timestamps
    end
  end
end
