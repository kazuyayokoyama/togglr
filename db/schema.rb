# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20111127203252) do

  create_table "statuses", :force => true do |t|
    t.string   "provider",   :null => false
    t.integer  "uid",        :null => false
    t.string   "offon"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "statuses", ["provider", "uid"], :name => "index_statuses_on_provider_and_uid"

  create_table "users", :force => true do |t|
    t.string   "provider",    :null => false
    t.integer  "uid",         :null => false
    t.string   "screen_name", :null => false
    t.string   "name",        :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["provider", "uid"], :name => "index_users_on_provider_and_uid"
  add_index "users", ["screen_name"], :name => "index_users_on_screen_name"

end
