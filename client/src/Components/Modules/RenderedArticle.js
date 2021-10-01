import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextSelector from 'text-selection-react';

import AddNoteDialog from '../Dialogs/AddNoteDialog';
import ExportIcon from '../../Images/external-link-alt-solid.svg';
import { addNote, deleteArticle, getRenderedArticle } from '../../redux/actions';

function RenderedArticle({ readState, setReadState }) {
  const dispatch = useDispatch();
  const tagList = useSelector((state)=>state.tagList);
  const notesList = useSelector((state)=>state.notesList);
  const renderedArticle = useSelector((state)=>state.renderedArticle);
  const articleList = useSelector((state) => state.articleList);
  
  const [openAddNote, setOpenAddNote] = useState(false);
  const textSelectorTags = 
    tagList.map((tag)=>{
      return {
        text: `${tag.name}`,
        handler: (text) => {
          handleNoteAdd(text, `${tag.name}`)
        }
      }
    })

  function clickDeleteButton() {
    const filteredArr = articleList.filter((article)=>article.id !== renderedArticle.id)
    
    dispatch(deleteArticle(renderedArticle.id));
    dispatch(getRenderedArticle(filteredArr[0]))
    // fetch(`/articles/${renderedArticle.id}`,{
    //   method: 'DELETE'
    // })
    // setArticleList((articleList)=>{
    //   const filteredList = articleList.filter((article)=>article.id !== renderedArticle.id);
    //   dispatch(getRenderedArticle(filteredList[0]))
    //   return filteredList
    // })
  }

  async function clickReadButton() {
    const response = await fetch(`/articles/${renderedArticle.id}`,{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        is_read: !renderedArticle.is_read
      })
    })
    if (response.ok) {
      response.json()
      .then((data)=>{
        renderedArticle.is_read = data.is_read
        setReadState(!readState)
      })
    }
  }

  function handleNoteAdd(text, tagName) {
    const noteForm = {
      "content": text.innerHTML
    }

    dispatch(addNote(renderedArticle.id, noteForm, tagName))

    // const response = await fetch(`/articles/${renderedArticle.id}`, {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(noteForm)
    // })
    // if (response.ok) {
    //   response.json()
    //   .then(data=>{
    //     fetch(`/note_tags`, {
    //       method: 'POST',
    //       headers: {'Content-Type': 'application/json'},
    //       body: JSON.stringify({
    //         "note_id": data.id,
    //         "tag": tagName
    //       })
    //     })
        
    //     setRenderedArticle((renderedArticle)=>({
    //       ...renderedArticle,
    //       notes: [
    //         ...renderedArticle.notes,
    //         data
    //       ]
    //     }))

    //     setNotesList((notesList)=>({
    //       data,
    //       ...notesList
    //     }))
    //   })
    // } else {
    //   response.json()
    //   .then(data=> alert("Your note couldn't be added."))
    // }
  }

  function clickAddNote() {
    setOpenAddNote(true)
  }
    
  return(
    <>
    {renderedArticle.notes && notesList && tagList &&
    <div>
      {openAddNote && <AddNoteDialog
        setOpenAddNote={setOpenAddNote}
      />}

      <TextSelector
        events={textSelectorTags}
        // color={'yellow'}
        colorText={false}
      />

      <div className="article-container">
        <div className="article-image-container">
          <img 
            src={renderedArticle.image_url} 
            alt={renderedArticle.title}
          />
        </div>

        <div className="article-content-container">
          <h1 
            className="article-h1"
          >
            {renderedArticle.title}
            <a 
              href={renderedArticle.link} 
              target="_blank" 
              rel="noreferrer"
              className="article-content-link"
            >
              <img 
                src={ExportIcon}
                alt="export icon"
                className="article-content-link-icon"
              />
            </a>
          </h1>

          {renderedArticle.notes.map((note)=>{
            return <p 
              key={note.id}
              className="article-note-item"
            >
              {note.content}
            </p>
          })}

          <p className="article-p">{renderedArticle.content}</p>
        </div>

        <div className="controls-container">
          <button 
            className="control-button-filled"
            onClick={clickAddNote}
          >
            Add Note
          </button>
          
          <button 
            className="control-button-filled"
            onClick={clickReadButton}  
          >{readState ? "Mark as Unread" : "Mark as Read"}
          </button>

          <button 
            className="control-button-filled"
            onClick={clickDeleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    }
    </>
  )
}

export default RenderedArticle;