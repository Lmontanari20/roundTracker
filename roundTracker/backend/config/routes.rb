Rails.application.routes.draw do
  resources :hole_rounds
  resources :courses
  resources :holes
  resources :rounds
  resources :users
  
  get '/login/:username', to: 'users#login' 
  get '/login', to: 'users#error'
  get '/user_rounds/:username', to: 'rounds#index'
  get '/courses/:id', to: 'course#show'
  post '/new_round', to: 'rounds#new_round'
  get '/analytics/:username', to: 'users#analytics'
end
