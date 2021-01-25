Rails.application.routes.draw do
  resources :courses
  resources :holes
  resources :rounds
  resources :users
  
  get '/login', to: 'users#login' 
 
end
