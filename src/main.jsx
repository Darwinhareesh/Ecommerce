import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import login from './login.jsx'
import App from './App.jsx'   
import Admin from './admin.jsx'
import Button from 'react-bootstrap/Button';
import {AuthContextProvider} from './services/context/AuthContext.jsx';
import { Home } from './home.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
<<<<<<< HEAD
    <App />
=======
    <Home />
>>>>>>> e2738a9ca82da11772fef35ce9375c4874e39e91
    </AuthContextProvider>
  </StrictMode>,
)
