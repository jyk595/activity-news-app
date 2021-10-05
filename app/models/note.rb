class Note < ApplicationRecord
  belongs_to :article

  has_many :note_tags, dependent: :destroy
  has_many :tags, through: :note_tags, dependent: :destroy
end
