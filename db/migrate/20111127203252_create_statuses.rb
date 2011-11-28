class CreateStatuses < ActiveRecord::Migration
  def self.up
    create_table :statuses do |t|
      t.string :provider, :null => false
      t.integer :uid, :null => false
      t.string :offon

      t.timestamps
    end
    add_index :statuses, [:provider, :uid]
  end

  def self.down
    drop_table :statuses
  end
end
