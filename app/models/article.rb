class Article < ApplicationRecord
  belongs_to :user

  validates :url,
    presence: true,
    inclusion: {
      in: %w(https::), 
      message: "URL must be secure. Try sending with 'https://' at the front of the link."
    }
end
