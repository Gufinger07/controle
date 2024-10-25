import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Components/Main';
import React from 'react';
import Container from './Components/Container';
import Navbar from './Components/Navbar';
import Adicionar from './Components/Adicionar';
import Gerenciar from './Components/Gerenciar';
import Relatorio from './Components/Relatorio';

function App() {
  return (
    <div>
       <Router>
            <div>
                <Navbar />
                
                <Routes>
                 
                 {/* Definindo as rotas */}
             <Route path="/" element={<Adicionar />} />
             <Route path="/gerenciar" element={<Gerenciar />} />
             <Route path="/relatorio" element={<Relatorio />} />
             {/* Definir uma rota inicial ou redirecionamento, se necessário */}
           
           
         </Routes>
               
                
            </div>
        </Router>
      
</div>
  );
}

export default App;
