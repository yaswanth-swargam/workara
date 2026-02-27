import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import {login} from './store/authSlice.js'


const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

if (token && user) {
  store.dispatch(
    login({
      token,
      user: JSON.parse(user)
    })
  );
}

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
)
