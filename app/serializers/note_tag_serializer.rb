class NoteTagSerializer < ActiveModel::Serializer
  attributes :id
  has_one :note
  has_one :tag
end
