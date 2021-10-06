import { useSelector, useDispatch } from 'react-redux';
import TextSelector from 'text-selection-react';

import { addNote } from '../../redux/actions';

function ArticleContentMapped() {
  const dispatch = useDispatch();
  const renderedArticle = useSelector((state)=>state.renderedArticle);
  const tagList = useSelector((state)=>state.tagList);
  const textSelectorTags = 
    tagList.map((tag)=>{
      return {
        text: `${tag.name}`,
        handler: (text) => {
          handleNoteAdd(text, `${tag.name}`)
        }
      }
    })
  
  function handleNoteAdd(text, tagName) {
    const noteForm = {
      "content": text.innerHTML
    }

    dispatch(addNote(renderedArticle.id, noteForm, tagName))
  }

  return(
    <div>
      <TextSelector
        events={textSelectorTags}
        // color={'yellow'}
        colorText={false}
      />

      {renderedArticle.notes.map((note)=>{
      return <p 
        key={renderedArticle.id}
        className="article-note-item"
      >
        {note.content}
        {/* <span>{note.tag.name}</span> */}
        </p>
      })}
    </div>
  )
}

export default ArticleContentMapped;