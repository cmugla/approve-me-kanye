class CreateLyrics < ActiveRecord::Migration[5.0]
  def change
    create_table :lyrics do |t|
      t.string :author
      t.string :content

      t.timestamps
    end
  end
end
