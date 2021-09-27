class User < ApplicationRecord
  has_secure_password

  has_many :articles
  has_many :notes, through: :articles

  validates :username, 
    presence: true, 
    uniqueness: true,
    exclusion: {
      in: %w(login about), 
      message: "'%{value}' is a reserved username."
    }
end
