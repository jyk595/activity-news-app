Rails.application.routes.draw do
  
  # Users Controller
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  # Sessions Controller
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Articles Controller
  post '/add_link/:user_id', to: 'articles#create'
  post '/conventional_add/:user_id', to: 'articles#conventional_add'
  get '/users/:user_id/articles', to: 'articles#article_list'
  patch '/articles/:article_id', to: 'articles#update'

  # Routing logic: fallback requests for React Router.
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
