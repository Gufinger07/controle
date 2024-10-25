import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Arquivo CSS para os estilos

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar-logo">Controle de Questões</h1>
            <ul className="nav-links">
                <li>
                    <Link to="/" className="nav-link">Adicionar Questões</Link>
                </li>
                <li>
                    <Link to="/relatorio" className="nav-link">Relatório</Link>
                </li>
                <li>
                    <Link to="/gerenciar" className="nav-link">Gerenciar</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
