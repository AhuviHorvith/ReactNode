import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './Store/UserSlice.jsx'
import ListCategories from './Store/ListCategoriesSlice.jsx'
const myStore = configureStore(
  {
    reducer: {
     user: UserSlice,
     categories:ListCategories
    }
  }
)
createRoot(document.getElementById('root')).render(
  
    <Provider store={myStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
)
