const initialRenderedArticle = {
  title: "Getting started with Activity!",
  image_url: "https://pbs.twimg.com/profile_images/1210618202457292802/lt9KD2lt.jpg",
  content: "Lorem ipsum",
  link: "www.google.com",
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
    case "MARK_AS_READ": {
      return {
        ...state,
        is_read: true
      }
    }
    default:
      return state
  }
};