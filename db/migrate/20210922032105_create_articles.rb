class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.string :image_url
      t.text :content
      t.string :link
      t.boolean :is_read
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
