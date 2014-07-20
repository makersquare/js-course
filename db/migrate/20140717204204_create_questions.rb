class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.text :question
      t.text :answer
      t.integer :times_answered
      t.integer :correct_answers
      t.references :quiz, index: true

      t.timestamps
    end
  end
end
