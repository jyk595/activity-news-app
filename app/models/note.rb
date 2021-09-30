class Note < ApplicationRecord
  belongs_to :article

  has_many :note_tags
  has_many :tags, through: :note_tags
end
