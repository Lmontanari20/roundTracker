Rails.application.routes.draw do
  resources :courses
  resources :holes
  resources :rounds
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
