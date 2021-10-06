import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { renderedArticleReducer } from './renderedArticleReducer';
import { articleListReducer } from './articleListReducer';
import { notesListReducer } from './notesListReducer';
import { tagListReducer } from './tagListReducer';
import { readReducer } from './readReducer';
import { loadingReducer } from './loadingReducer';

const rootReducer = combineReducers({
  user: userReducer, 
  renderedArticle: renderedArticleReducer,
  articleList: articleListReducer,
  notesList: notesListReducer,
  tagList: tagListReducer,
  readState: readReducer,
  loading: loadingReducer
});

export default rootReducer;