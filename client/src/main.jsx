import React from 'react'
import axios from "axios"
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// backend URL for all axios requests
const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
axios.defaults.baseURL = backendUrl;

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)

