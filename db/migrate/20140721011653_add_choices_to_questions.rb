class AddChoicesToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :choices, :string
  end
end
