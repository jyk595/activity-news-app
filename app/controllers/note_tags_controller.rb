class NoteTagsController < ApplicationController

  def create
    note = Note.find(params[:note_id])
    tag = Tag.find_by(name: params[:tag])
    note_tag = NoteTag.create(note: note, tag: tag)
    render json: note_tag, status: :created
  end

end
