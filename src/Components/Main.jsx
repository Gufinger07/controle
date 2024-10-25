import React, { useState, useEffect } from "react";


import Axios from "axios";
import '.././App.css';



    function Main () {
        const [lista, setLista] = useState([]);
        
        useEffect(() => {
            Axios.get("http://localhost:3008/api/get")
              .then((response) => {
                // Extrair todas as matérias do response
                const materias = response.data.map(item => item.materia);
                setLista(materias);  // Atualizar o estado com a lista de matérias
              })
              .catch((error) => {
                console.error("Erro ao buscar dados da API:", error);
              });
              
          }, []);
        
        return (
            <div className="container">
            
            <label className="label" for="cars">Escolha a matéria:</label>
            <select className="select" name="materia" id="materia">
                
                {lista.map((val) => {
                    return(
                        <option value="volvo">{val}</option>
                    )
                    
                })}
        </select>
            
            </div>
            
        )
        
    }
    


export default Main

