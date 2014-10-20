class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.string :person
      t.integer :cost

      t.timestamps
    end
  end
end
