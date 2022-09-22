import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from '../routes/Home';
import Auth from '../routes/Auth';
import Animation from '../routes/Animation';
import Register from '../routes/Register';

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Animation />}/>
        </Routes>
        <Routes>
          <Route exact path="/:id" element={<Home />} />
          <Route path="/Login" element={<Auth />} />
          <Route path="/Register" element={<Register />}/>
        </Routes>
      </Router>
    </>
  )
}

export default AppRouter;