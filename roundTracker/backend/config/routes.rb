Rails.application.routes.draw do
  resources :courses
  resources :holes
  resources :rounds
  resources :users
  
  get '/login/:username', to: 'users#login' 
  get '/login', to: 'users#error'
end
