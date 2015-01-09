class AddQuizRefToScores < ActiveRecord::Migration
  def change
    add_reference :scores, :quiz, index: true
  end
end
