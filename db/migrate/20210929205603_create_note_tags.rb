class CreateNoteTags < ActiveRecord::Migration[6.1]
  def change
    create_table :note_tags do |t|
      t.belongs_to :note, null: false, foreign_key: true
      t.belongs_to :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
