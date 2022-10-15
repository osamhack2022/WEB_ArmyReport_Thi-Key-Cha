import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Register from './Auth/Register';
import Post from '../pages/Post';
import Vacation from '../pages/Vacation';
import ProfilePage from '../pages/ProfilePage'

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Auth />}/>
          <Route path="/@:id" element={<ProfilePage />}/>
        </Routes>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/Register" element={<Register />}/>
          <Route path='/post' element={<Post/>} />
          <Route path='/vacation' element={<Vacation />}/>
        </Routes>
      </Router>
    </>
  )
}

export default AppRouter;