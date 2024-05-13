import React from 'react';
import NoteList from './components/NoteList';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Signup from './components/Signup';
import './App.css'
import SignIn from './components/Signin';


// Middleware
import { PrivateRoutes } from './middleware/PrivateRoutes';
import { GuestRoutes } from './middleware/GuestRoutes';



const App: React.FC = () => {



  return (
    <div className="py-8">
      <h1 className="text-center text-3xl font-bold mb-8">Notes App</h1>
      <BrowserRouter>
        <Routes>
        <Route element={<PrivateRoutes/>}>
              <Route path='/' element={<NoteList/>} />
          </Route>
          <Route element={<GuestRoutes/>}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<SignIn />} /> 
          </Route>
         
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;