Rails.application.routes.draw do
  resources :hole_rounds
  resources :courses
  resources :holes
  resources :rounds
  resources :users
  
  get '/login/:username', to: 'users#login' 
  get '/login', to: 'users#error'
  get '/user_rounds/:username', to: 'rounds#index'
  
end
