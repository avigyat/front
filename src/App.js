import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Chitty from './pages/Chitty';


export default function App() {
  return (

    <div>
      <Router>
      <Routes>
            <Route path="/login" element={<Signin />}/>
            <Route path='/register' element={<Signup />}/>
            <Route path='/' element={<Chitty />}/>
        </Routes>
      </Router>
    </div>
  )
}
