import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { renderedArticleReducer } from './renderedArticleReducer';
import { articleListReducer } from './articleListReducer';
import { notesListReducer } from './notesListReducer';
import { tagListReducer } from './tagListReducer';

const rootReducer = combineReducers({
  user: userReducer, 
  renderedArticle: renderedArticleReducer,
  articleList: articleListReducer,
  notesList: notesListReducer,
  tagList: tagListReducer
});

export default rootReducer;