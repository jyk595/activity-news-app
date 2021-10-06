import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddNoteDialog from '../Dialogs/AddNoteDialog';
import ArticleContentMapped from '../Modules/ArticleContentMapped';
import ExportIcon from '../../Images/external-link-alt-solid.svg';
import { deleteArticle, getRenderedArticle } from '../../redux/actions';

function RenderedArticle({ readState, setReadState }) {
  const dispatch = useDispatch();
  const tagList = useSelector((state)=>state.tagList);
  const notesList = useSelector((state)=>state.notesList);
  const renderedArticle = useSelector((state)=>state.renderedArticle);
  const articleList = useSelector((state) => state.articleList);
  const [openAddNote, setOpenAddNote] = useState(false);
  const filteredArr = articleList.filter((article)=>article.id !== renderedArticle.id)
  // const renderedImage = <img 
  //   src={renderedArticle.image_url} 
  //   alt={renderedArticle.title}
  // />
    
  function clickDeleteButton() {
    dispatch(deleteArticle(renderedArticle.id));
    dispatch(getRenderedArticle(filteredArr[0]))
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

  const parsedArticleContent = renderedArticle.content.split("TKTK")

  function clickAddNote() {
    setOpenAddNote(true)
  } 
      
  return(
    <>
    {articleList && renderedArticle.notes && notesList && tagList &&
    <div>
      {openAddNote && <AddNoteDialog
        setOpenAddNote={setOpenAddNote}
      />}

      {/* <TextSelector
        events={textSelectorTags}
        // color={'yellow'}
        colorText={false}
      /> */}

      <div className="article-container">
        <div className="article-image-container">
          {/* {renderedImage.src === "success" ? renderedImage : <img src="https://i.ibb.co/VgmSGzJ/no-image.png"/>} */}
          
          <img 
            src={renderedArticle.image_url} 
            alt={renderedArticle.title}
          />
          <img 
            src={renderedArticle.image_url} 
            alt={renderedArticle.title}
          />
          <img 
            src={renderedArticle.image_url} 
            alt={renderedArticle.title}
          />
          <img 
            src={renderedArticle.image_url} 
            alt={renderedArticle.title}
          />
          <img 
            src={renderedArticle.image_url} 
            alt={renderedArticle.title}
          />
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

          <ArticleContentMapped 
          
          />
          {/* {renderedArticle.notes.map((note)=>{
            return <p 
              key={renderedArticle.id}
              className="article-note-item"
            >
              {note.content}
              {/* <span>{note.tag.name}</span> */}
            {/* </p> */}
          {/* })} */} */}

          <p className="article-p">
            {parsedArticleContent.map((splitContent)=>{
              return <p
                key={splitContent.id}
              >
                {splitContent}</p>
            })}
          </p>
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