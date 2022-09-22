import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './routes/Home';
import Auth from './routes/Auth';
import Register from './routes/Register';
import MainAnimation from './routes/MainAnimation';

const AppRouter = () => {
  return (
    <>
        <Router>
            <Routes>
                <Route exact path="/" element={<MainAnimation />} />
                <Route path="/Login" element={<Auth />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/:id" element={<Home />} />
            </Routes>
        </Router>
    </>
  )
}

export default AppRouter;