import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from '../pages/Home';
import Animation from '../pages/Animation';
import Register from './Auth/Register';
import NotFound from '../pages/NotFound';
import Post from '../pages/Post';
import Vacation from '../pages/Vacation';

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Animation />}/>
        </Routes>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/Register" element={<Register />}/>
          <Route path='/post' element={<Post/>} />
          <Route path='/vacation' element={<Vacation />}/>
          <Route element={<NotFound />}/>
        </Routes>
      </Router>
    </>
  )
}

export default AppRouter;