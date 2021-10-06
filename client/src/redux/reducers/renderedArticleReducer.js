const initialRenderedArticle = {
  title: "Getting started with 🗞️  Activity.News ↴",
  image_url: "https://deathtostock.imgix.net/000/003/651/original/RCC_-_DTS_HOME_65.jpg?w=630&h=420&fit=clip&dpr=1&auto=compress&q=75&ixlib=js-2.3.1&s=10512746dc0b3cd4c81b733e1aac00a1",
  content: "1. Find a site you want to keep tabs on while you're browsing? Easy! Just copy the URL.TKTK2. Head over to Activity.News and add your link.TKTK3. Your links will be parsed and saved in your main feed.TKTKT4. As you finish reading your list, mark articles or delete them from your feed. TKTK5. Add notes as you go. Simply highlight the text to save it or click Add Note to write something new.TKTK6. That's it! Have fun! 🙂TKTK-- Activity.News team",
  link: "#",
  is_read: false
}

export function renderedArticleReducer (state= initialRenderedArticle, action) {
  switch (action.type) {
    case "GET_RENDERED_ARTICLE": {
      return action.payload
    } 
    case "ADD_NOTE_RENDERED_ARTICLE": {
      return {
        ...state,
        notes: [
          ...state.notes,
          action.payload
        ]
      }
    }
    case "NOTE_UPDATE_ARTICLE": {
      return {
        ...state,
        notes: state.notes.map((info) =>
          info.id === action.payload.id ? {...info, content: action.payload.content}
          : info
        )
      }
    }
    case "MARK_RENDERED_ARTICLE_AS_READ": {
      return {
        ...state,
        is_read: true
      }
    }
    case "DELETE_NOTE_FROM_ARTICLE": {
      return{
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload)
      }
    }
    default:
      return state;
  }
};