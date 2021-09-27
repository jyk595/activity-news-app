import { useState } from 'react';

import AddNoteDialog from '../Dialogs/AddNoteDialog';
import ExportIcon from '../../Images/external-link-alt-solid.svg';

function RenderedArticle({ renderedArticle, setArticleList, setRenderedArticle, readState, setReadState, notesList, setNotesList }) {
  const [openAddNote, setOpenAddNote] = useState(false);

  function clickDeleteButton() {
    fetch(`/articles/${renderedArticle.id}`,{
      method: 'DELETE'
    })
    setArticleList((articleList)=>{
      const filteredList = articleList.filter((article)=>article.id !== renderedArticle.id);
      setRenderedArticle(filteredList[0]);
      return filteredList
    })
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

  function clickAddNote() {
    setOpenAddNote(true)
  }
  
  return(
    <>
    {renderedArticle && notesList &&
    <div>
      {openAddNote && <AddNoteDialog
        setOpenAddNote={setOpenAddNote}
        renderedArticle={renderedArticle}
        setRenderedArticle={setRenderedArticle}
        setNotesList={setNotesList}
      />}

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

          {notesList.map((note)=>{
            return <p>{note.content}</p>
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