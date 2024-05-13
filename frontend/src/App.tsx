import React from 'react';
import NoteList from './components/NoteList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import './App.css'
import SignIn from './components/Signin';

const App: React.FC = () => {

  const token = localStorage.getItem('token');
  const isAuthorized = token ?? false;

  return (
    <div className="py-8">
      <h1 className="text-center text-3xl font-bold mb-8">Notes App</h1>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
