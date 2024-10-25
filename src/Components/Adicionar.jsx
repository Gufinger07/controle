import React, { useState, useEffect } from 'react';
import './Adicionar.css'; 

import Axios from "axios";
const Adicionar = () => {
    
    const [banca, setBanca] = useState('');
    const [idbanca, setIdBanca] = useState(0)
    const [materia, setMateria] = useState('');
    const [idMateria, setIdMateria] = useState(0)
    const [tipo, setTipo] = useState('');
    const [idTipo, setIdTipo] = useState(0)
    const [erros, setErros] = useState(0);
    const [acertos, setAcertos] = useState(0);
    const [quantidadeAcertos, setQuantidadeAcertos] = useState([])
    const [listaTipo, setListaTipo] = useState([]);
    const [listaMateria, setListaMateria] = useState([]);
    const [listaBanca, setListaBanca] = useState([]);
    
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleSelectChange = (event) => {
        const index = event.target.selectedIndex; // Obtém o índice da opção selecionada
        setIdBanca(index);}

        const handleSelectChangeTipo = (event) => {
            const index = event.target.selectedIndex; // Obtém o índice da opção selecionada
            setIdTipo(index);}  
            const handleSelectChangeMateria = (event) => {
                const index = event.target.selectedIndex; // Obtém o índice da opção selecionada
                setIdMateria(index);}  

    useEffect(() => {
        Axios.get("http://localhost:3008/api/get/banca")
          .then((response) => {
            // Extrair todas as matérias do response
            const bancas = response.data.map(item => item.banca);
           
            setListaBanca(bancas);  // Atualizar o estado com a lista de matérias
          })
          .catch((error) => {
            console.error("Erro ao buscar dados da API:", error);
          });
          Axios.get("http://localhost:3008/api/get/materia")
          .then((response) => {
            // Extrair todas as matérias do response
            const materia = response.data.map(item => item.materia);
            setListaMateria(materia);  // Atualizar o estado com a lista de matérias
          })
          .catch((error) => {
            console.error("Erro ao buscar dados da API:", error);
          });
          Axios.get("http://localhost:3008/api/get/tipo")
          .then((response) => {
            // Extrair todas as matérias do response
            const tipo = response.data.map(item => item.tipo);
            setListaTipo(tipo);  // Atualizar o estado com a lista de matérias
          })
          .catch((error) => {
            console.error("Erro ao buscar dados da API:", error);
          });
          
      }, []);



      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Enviar várias requisições para "erros"
            if (erros > 0) {
                for (let i = 0; i < erros; i++) {
                    await Axios.post("http://localhost:3008/api/inserir", {
                        acerto: 0,
                        erro: 1,
                        Materia_idMateria: idMateria,
                        TipoQuestao_idTipoQuestao: idTipo,
                        Banca_idBanca: idbanca
                    });
                    console.log(`Erro ${i + 1} inserido com sucesso`);
                }
            }
    
            // Enviar várias requisições para "acertos"
            if (acertos > 0) {
                for (let i = 0; i < acertos; i++) {
                    await Axios.post("http://localhost:3008/api/inserir", {
                        acerto: 1,
                        erro: 0,
                        Materia_idMateria: idMateria,
                        TipoQuestao_idTipoQuestao: idTipo,
                        Banca_idBanca: idbanca
                    });
                    console.log(`Acerto ${i + 1} inserido com sucesso`);
                }
            }
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
        }
            
            
            
        
        
        console.log({ banca, materia, erros, acertos, idbanca, idTipo, idMateria });

        // Limpar os campos após o envio (opcional)
        setBanca('');
        setMateria('');
        setErros(0);
        setAcertos(0);
       
    };

    return (
        <div className="adicionar-container">
            <h2>Adicionar Questão</h2>
            <form onSubmit={handleSubmit} className="adicionar-form">
                {/* Campo Select para Banca */}
                <div className="form-group">
                    <label htmlFor="banca">Banca:</label>
                    <select
                        id={banca}
                        value={banca}
                        onChange={(e) =>  {setBanca(e.target.value)} }
                        onClick={handleSelectChange}

                        required
                    >
                        <option value="" disabled>Selecione a Banca</option>
                        {listaBanca.map((val) => {
                    return(
                        <option  value={val}>{val}</option>
                    )
                    
                })}
                    </select>
                </div>

               
                <div className="form-group">
                    <label htmlFor="materia">Matéria:</label>
                    <select
                        id="materia"
                        value={materia}
                        onChange={(e) => setMateria(e.target.value)}
                        onClick={handleSelectChangeMateria }
                        required
                    >
                        <option value="" disabled>Selecione a Matéria</option>
                        {listaMateria.map((val) => {
                    return(
                        <option value={val}>{val}</option>
                    )
                    
                })}
                    </select>
                </div>

                {/* Campo Numérico para Erros */}
                <div className="form-group">
                    <label htmlFor="erros">Erros:</label>
                    <input
                        type="number"
                        id="erros"
                        value={erros}
                        onChange={(e) => {{console.log(e.target.value)} {setErros(Number(e.target.value))}}}
                        min="0"
                        required
                    />
                </div>

                {/* Campo Numérico para Acertos */}
                <div className="form-group">
                    <label htmlFor="acertos">Acertos:</label>
                    <input
                        type="number"
                        id="acertos"
                        value={acertos}
                        onChange={(e) => setAcertos(Number(e.target.value))}
                        min="0"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Tipo questão">Tipo questão</label>
                    <select
                        id="tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        onClick={handleSelectChangeTipo }
                        required
                    >
                        <option value="" disabled>Selecione a Tipo</option>
                        {listaTipo.map((val) => {
                    return(
                        <option value={val}>{val}</option>
                    )
                    
                })}
                    </select>
                </div>

                <button type="submit" className="submit-btn">Adicionar Questão</button>
            </form>
        </div>
    );
};

export default Adicionar;
