class UsersController < ApplicationController
  before_action :authorize
	skip_before_action :authorize, only: [:create]
  
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    render json: @user, status: :accepted
  end

  def update
    user = User.find(params[:user_id])
    user.update!(user_params)
    session[:user_id] = user.id
    render json: user, status: :accepted
  end

  private

  def user_params
    params.permit(:username, :full_name, :email, :profile_img, :password, :password_confirmation)
  end
end
