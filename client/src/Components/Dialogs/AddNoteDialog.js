import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CloseX from '../../Images/times-solid.png';
import { addNote } from '../../redux/actions';

function AddNoteDialog({ setOpenAddNote }){
  const tagList = useSelector((state)=>state.tagList);
  const renderedArticle = useSelector((state)=>state.renderedArticle);
  const dispatch = useDispatch();
  
  const [noteFormData, setNoteFormData] = useState({
    content: ""
  });

  function onChangeNote(e) {
    setNoteFormData({
      [e.target.name]: e.target.value
    })
  }

  async function submitNoteForm(e) {
    e.preventDefault()

    dispatch(addNote(renderedArticle.id, noteFormData, e.target.name.tag))
    setOpenAddNote(false)
  }

  function clickCloseX() {
    setOpenAddNote(false)
  };
  
  return(
    <div className="dialog-container">
      <div className="dialog-note-form-container">
        <div className="dialog-section-container">
          <div className="dialog-header-container">
            <h2 className="dialog-header">Add a note</h2>
            <button 
              className="dialog-x-button"
              onClick={clickCloseX}
            >
              <img 
                src={CloseX} className="dialog-x" 
                alt="close x"
              />
            </button>
          </div>
          <form
            onSubmit={submitNoteForm}
          >
            <label className="form-label">Your note</label>
            <textarea 
              type="text"
              name="content"
              value={noteFormData.content}
              required
              className="textarea-note-add"
              onChange={onChangeNote}
            />

            <select
              name="selected_tag"
              className="tags-dropdown"
            >
              {tagList.map((tag)=>{
                return <option
                  key={tag.id}
                  tag={tag.id}
                  value={tag.id}
                >
                  {tag.name}
                </option>
              })}
            </select>

            <input
              type="submit"
              className="dialog-button"
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNoteDialog;