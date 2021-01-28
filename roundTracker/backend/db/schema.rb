# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_26_203501) do

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.integer "par"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "hole_rounds", force: :cascade do |t|
    t.integer "score"
    t.string "result"
    t.integer "hole_id", null: false
    t.integer "round_id", null: false
    t.integer "user_id", null: false
    t.integer "course_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_id"], name: "index_hole_rounds_on_course_id"
    t.index ["hole_id"], name: "index_hole_rounds_on_hole_id"
    t.index ["round_id"], name: "index_hole_rounds_on_round_id"
    t.index ["user_id"], name: "index_hole_rounds_on_user_id"
  end

  create_table "holes", force: :cascade do |t|
    t.integer "par"
    t.integer "distance"
    t.string "image"
    t.integer "course_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_id"], name: "index_holes_on_course_id"
  end

  create_table "rounds", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "name"
    t.integer "length"
    t.integer "course_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_id"], name: "index_rounds_on_course_id"
    t.index ["user_id"], name: "index_rounds_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "hole_rounds", "courses"
  add_foreign_key "hole_rounds", "holes"
  add_foreign_key "hole_rounds", "rounds"
  add_foreign_key "hole_rounds", "users"
  add_foreign_key "holes", "courses"
  add_foreign_key "rounds", "courses"
  add_foreign_key "rounds", "users"
end
