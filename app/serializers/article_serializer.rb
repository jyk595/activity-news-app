class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :image_url, :content, :link, :is_read
  has_one :user
end
