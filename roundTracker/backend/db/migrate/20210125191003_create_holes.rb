class CreateHoles < ActiveRecord::Migration[6.1]
  def change
    create_table :holes do |t|
      t.integer :par
      t.integer :distance
      t.references :course, null: false, foreign_key: true
      t.timestamps
    end
  end
end
