import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from '../pages/Home';
import Animation from '../pages/Animation';
import Register from './Auth/Register';
import Vacation from '../pages/Vacation';
import NotFound from '../pages/NotFound';
import Post from '../pages/Post'

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Animation />}/>
        </Routes>
        <Routes>
          <Route exact path="/:id" element={<Home />} />
          <Route path="/Register" element={<Register />}/>
          <Route path='/Vacation' element={<Vacation />}/>
          <Route path='/Post' element={<Post/>} />
          <Route element={<NotFound />}/>
        </Routes>
      </Router>
    </>
  )
}

export default AppRouter;