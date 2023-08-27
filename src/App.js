import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Todo from './components/Todo';
import AuthProvider from './AuthProvider'; 

function App() {
  return (
    <div>
      <div className='app'>
        <AuthProvider> 
          <Routes>
            <Route path="/" element={<Todo />} />
          </Routes>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
