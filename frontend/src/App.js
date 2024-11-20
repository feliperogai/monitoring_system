import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Tickets from './components/Tickets';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota para Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rota para Registro */}
        <Route path="/register" element={<Register />} />
        
        {/* Rota para Tickets */}
        <Route path="/tickets" element={<Tickets />} />
        
        {/* Rota para o caminho raiz "/", redirecionando para /login */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;