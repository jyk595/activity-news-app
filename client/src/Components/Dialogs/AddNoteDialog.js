import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CloseX from '../../Images/times-solid.svg';
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
            <label>Your note</label>
            <input 
              type="text"
              name="content"
              value={noteFormData.content}
              onChange={onChangeNote}
            />
            <input
              type="submit"
            />

            <select
              name="selected_tag"
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNoteDialog;