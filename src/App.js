import React from 'react'
import {BrowserRouter as Router ,Link ,Routes ,Route} from 'react-router-dom'
import Auth from './layouts/auth'
import Home from './views/Posts/home'

import './assets/fontawesome/css/all.css'


function App() {
  return (
      <React.Fragment>
          {/* <Home/> */}

        <Router>

            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route path="/auth/*" element= {<Auth/>}/>
            </Routes>
            
        </Router>
      </React.Fragment>
  );
}

export default App;
