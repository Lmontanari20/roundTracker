class CreateHoles < ActiveRecord::Migration[6.1]
  def change
    create_table :holes do |t|
      t.integer :par
      t.integer :score
      t.string :result
      t.integer :distance

      t.timestamps
    end
  end
end
