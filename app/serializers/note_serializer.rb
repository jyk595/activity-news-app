class NoteSerializer < ActiveModel::Serializer
  attributes :id, :content
  has_one :article
  has_many :tags
end
