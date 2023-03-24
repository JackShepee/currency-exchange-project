import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

axios.defaults.baseURL = 'https://api.apilayer.com/exchangerates_data';
axios.defaults.headers.common.apikey = 'BibwYjcwf3yKCRXQFklZsneC4C96kuIV';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
