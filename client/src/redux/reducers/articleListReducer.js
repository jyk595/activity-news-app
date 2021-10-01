export function articleListReducer(state = null, action) {
  switch (action.type) {
    case "GET_ARTICLE_LIST": {
      return action.payload
    } 
    case "ADD_ARTICLE_TO_ARTICLE_LIST": {
      return [
        action.payload,
        ...state
      ]
    }
    case "DELETE_ARTICLE_FROM_ARTICLE_LIST": {
      return state.filter((article)=>article.id !== action.payload)
    }
    default:
      return state
  }
}