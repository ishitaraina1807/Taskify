import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Todo from './components/Todo';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AuthProvider, { AuthContext } from './AuthProvider';  
import { ThemeProvider } from './ThemeContext'; 

function App() {
  return (
    <div>
      <div className='app'>
      <ThemeProvider>
        <AuthProvider> 
          <Routes>
            <Route path="/todo-list" element={<Todo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </AuthProvider>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
