class CreateRounds < ActiveRecord::Migration[6.1]
  def change
    create_table :rounds do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.integer :length
      t.references :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
