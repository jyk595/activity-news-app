class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :full_name, :email, :profile_img, :password_digest
end
