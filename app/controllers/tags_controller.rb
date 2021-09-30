class TagsController < ApplicationController

  def index
    render json: Tag.all, status: :accepted
  end
  
end
