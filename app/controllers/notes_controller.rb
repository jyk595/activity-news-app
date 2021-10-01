class NotesController < ApplicationController

  def show
    user = User.find(params[:user_id])
    notes = user.notes.order("created_at DESC")
    render json: notes, status: :accepted
  end

  def create
    article = Article.find(params[:article_id])
    note = article.notes.create(note_params)
    render json: note, status: :created
  end

  private

  def note_params
    params.permit(:content)
  end

end