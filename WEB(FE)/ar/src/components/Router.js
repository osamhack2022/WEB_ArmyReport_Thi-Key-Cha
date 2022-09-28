import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from '../pages/Home';
import Login from './Auth/Login';
import Animation from '../pages/Animation';
import Register from './Auth/Register';
import Calender from '../pages/Calender';
import Vacation from '../pages/Vacation';

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Animation />}/>
        </Routes>
        <Routes>
          <Route exact path="/:id" element={<Home />} />
          <Route path="/Register" element={<Register />}/>
          <Route path='/Calender' element={<Calender />}/>
          <Route path='/Vacation' element={<Vacation />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default AppRouter;