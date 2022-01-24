import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './common/style.css';
import Axios from 'axios';

import Index from './pages'
import About from './pages/about'
import Addlink from './pages/addlink'
import Contact from './pages/contact'
import Login from './pages/login'
import Register from './pages/register'


Axios.defaults.withCredentials = true;

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='/index' element={<Index />} />
          <Route path='/about' element={<About />} />
          <Route path='/addlink' element={<Addlink />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>  
    </BrowserRouter>,
  document.getElementById('root')
);
