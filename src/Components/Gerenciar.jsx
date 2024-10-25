import React, { useState, useEffect } from 'react';
import './Gerenciar.css'; // Para os estilos
import Axios from 'axios';
const Gerenciar = () => {
    // Estado para armazenar as provas, matérias e bancas
    const [provas, setProvas] = useState([
       
    ]);

    const [materias, setMaterias] = useState([]);
    const [bancas, setBancas] = useState([]);
   
    const [novaProva, setNovaProva] = useState('');
    const [novaMateria, setNovaMateria] = useState('');
    const [novaBanca, setNovaBanca] = useState('');
    const [listaMateria, setListaMateria] = useState([]);
    const [listaBanca, setListaBanca] = useState([]);
    const [idbanca, setIdBanca] = useState(0)
    const [idMateria, setIdMateria] = useState(0)


   

     

    useEffect(() => {
        Axios.get("http://localhost:3008/api/get/banca")
          .then((response) => {
            // Extrair todas as matérias do response
            const banca = response.data.map(item => item.banca);
           
            setBancas(banca);  // Atualizar o estado com a lista de matérias
          })
          .catch((error) => {
            console.error("Erro ao buscar dados da API:", error);
          });
          Axios.get("http://localhost:3008/api/get/materia")
          .then((response) => {
            // Extrair todas as matérias do response
            const materia = response.data.map(item => ({
                id: item.idMateria,
                nome: item.materia
            }));
            
            setMaterias(materia);  // Atualizar o estado com a lista de matérias
          })
          Axios.get("http://localhost:3008/api/get/prova")
          .then((response) => {
            // Extrair todas as matérias do response
            const prova = response.data.map(item => item.prova);
            setProvas(prova);  // Atualizar o estado com a lista de matérias
          })
          
          
      }, []);

    // Funções para adicionar novos itens
    const adicionarProva = () => {
        if (novaProva.trim()) {
            
            setProvas([...provas, novaProva]);
            
            Axios.post("http://localhost:3008/api/inserirprova", {
                prova: novaProva,
                data: "nulo",
                Banca_idBanca: 1
            });
            setNovaProva('');
            
        }
    };
    

    const adicionarMateria = () => {
        if (novaMateria.trim()) {
            setMaterias([...materias, novaMateria]);
            Axios.post("http://localhost:3008/api/inserirmateria", {
                materia: novaMateria,
                
            });
            setNovaMateria('');
        }
    };

    const adicionarBanca = () => {
        if (novaBanca.trim()) {
            setBancas([...bancas, novaBanca]);
            Axios.post("http://localhost:3008/api/inserirbanca", {
                banca: novaBanca,
                
            });
            setNovaBanca('');
        }
    };

    

    // Funções para remover itens
    const removerProva = (id) => {
        
        setProvas(provas.filter(prova => prova.id !== id))
    };
    const removerMateria = (index, idMateria) => {
        Axios.delete(`http://localhost:3008/api/deletamateria/${idMateria}`)
        .then((response) => {
            console.log('Matéria excluída com sucesso:', response.data);
        })
        .catch((error) => {
            console.error('Erro ao excluir matéria:', error);
        });
        setMaterias(materias.filter((_, i) => i !== index));
    }
        
    const removerBanca = (idBanca) => {
        
        
        setBancas(bancas.filter((_, i) => i !== idBanca))
        
            
        
    };

    return (
        <div className="gerenciar-container">
            <h1>Gerenciar</h1>
            <div className="gerenciar-grid">
                {/* Seção Provas */}
                <div className="gerenciar-section">
                    <h3>Provas</h3>
                    <div className="add-item">
                        <input
                            type="text"
                            placeholder="Nova Prova"
                            value={novaProva}
                            onChange={(e) => setNovaProva(e.target.value)}
                        />
                        <button onClick={adicionarProva}>Adicionar</button>
                    </div>
                    <ul className="lista-itens">
                        {provas.map((prova, index) => (
                            <li key={index}>
                                {prova}
                                <button onClick={() => removerProva(index)}>Remover</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Seção Matérias */}
                <div className="gerenciar-section">
                    <h3>Matérias</h3>
                    <div className="add-item">
                        <input
                            type="text"
                            placeholder="Nova Matéria"
                            value={novaMateria}
                            onChange={(e) => setNovaMateria(e.target.value)}
                        />
                        <button onClick={adicionarMateria}>Adicionar</button>
                    </div>
                    <ul className="lista-itens">
                        {materias.map((item, index) => (
                            <li key={item.id}>
                                {item.nome}
                                <button onClick={() => removerMateria(index,item.id)}>Remover</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Seção Bancas */}
                <div className="gerenciar-section">
                    <h3>Bancas</h3>
                    <div className="add-item">
                        <input
                            type="text"
                            placeholder="Nova Banca"
                            value={novaBanca}
                            onChange={(e) => setNovaBanca(e.target.value)}
                        />
                        <button onClick={adicionarBanca}>Adicionar</button>
                    </div>
                    <ul className="lista-itens">
                        {bancas.map((banca, index) => (
                            <li key={index}>
                                {banca}
                                <button onClick={() => removerBanca(index)}>Remover</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Gerenciar;
