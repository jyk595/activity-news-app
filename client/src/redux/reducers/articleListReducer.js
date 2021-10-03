const initialArticleList = [{
  title: "Getting started with Activity!",
  image_url: "https://pbs.twimg.com/profile_images/1210618202457292802/lt9KD2lt.jpg",
  content: "Lorem ipsum",
  link: "www.google.com",
  is_read: true
}]

export function articleListReducer(state = initialArticleList, action) {
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