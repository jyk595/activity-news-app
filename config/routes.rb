Rails.application.routes.draw do
  
  # Users Controller
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  patch '/users/:user_id', to: 'users#update'

  # Sessions Controller
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Articles Controller
  post '/add_link/:user_id', to: 'articles#create'
  post '/conventional_add/:user_id', to: 'articles#conventional_add'
  get '/users/:user_id/articles', to: 'articles#article_list'
  patch '/articles/:article_id', to: 'articles#update'
  patch '/users/:user_id/articles', to: 'articles#update_all_to_read'
  delete '/articles/:article_id', to: 'articles#destroy'

  # Notes Controller
  get '/users/:user_id/notes', to: 'notes#show'
  post '/articles/:article_id', to: 'notes#create'
  patch '/notes/:note_id', to: 'notes#update'
  delete '/notes/:note_id', to: 'notes#destroy'
  
  # Tags Controller
  get '/tags', to: 'tags#index'

  # Note Tags Controller
  post '/note_tags', to: 'note_tags#create'

  # Routing logic: fallback requests for React Router.
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
