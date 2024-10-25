import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import "./Grafico.css"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './Relatorio.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Relatorio = () => {
    // Inicializando com zeros para evitar problemas de renderização
    const [dadosTotais, setDadosTotais] = useState({ total_erros: 0, total_acertos: 0, total: 0 });
    const [total, setTotal] = useState(0) 
    const [totalAcertos, setTotalAcertos] = useState(0) 
    const [totalErros, setTotalErros] = useState(0)   
    const [totalBanca, setTotalBanca] = useState(0) 
    const [totalAcertosBanca, setTotalAcertosBanca] = useState(0) 
    const [totalErrosBanca, setTotalErrosBanca] = useState(0)    
    const [listaBanca, setListaBanca] = useState ([]) 
    const [listaMateria, setListaMateria] = useState([])
    
    useEffect(() => {
        // Requisição para obter os dados do total de acertos e erros
        axios.get("http://localhost:3008/api/get/total")
            .then((response) => {
                setTotal(response.data[0].total); 
                setTotalAcertos(response.data[0].total_acertos)
                setTotalErros(response.data[0].total_erros)
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do relatório:', error);
            });
            axios.get("http://localhost:3008/api/get/totalbanca")
            .then((response) => {
                console.log(response.data)
                setListaBanca(response.data)
                
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do relatório:', error);
            });
            axios.get("http://localhost:3008/api/get/totalmateria")
            .then((response) => {
                console.log(response.data)
                setListaMateria(response.data)
                
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do relatório:', error);
            });
    }, []); // O array vazio [] garante que o useEffect execute apenas uma vez na montagem

    // Configuração do gráfico Total de Acertos e Erros
    const graficoTotalAcertos = {
        labels: ['Total Erros', 'Total Acertos', 'Total'],
        datasets: [
            {
                label: 'Totais de Erros e Acertos',
                data: [totalAcertos, totalErros, total],
                backgroundColor: [
                    'rgb(255, 0, 0)',   // Cor para Total Erros
                                'rgb(0, 200, 0)',   // Cor para Total Acertos
                                'rgb(0, 123, 255)'  // Cor para Total
                ],
                borderColor: [
                   'rgb(255, 0, 0)',   // Cor para Total Erros
                                'rgb(0, 200, 0)',   // Cor para Total Acertos
                                'rgb(0, 123, 255)'
                ],
                borderWidth: 1,
            },
        ],
    };
    

    return (
        <div>
            <h2>Relatório de Acertos</h2>

            <div className="graficos-container">
                {/* Gráfico Total de Acertos e Erros */}
                <div className="grafico">
                    
                    
                    
                    <div className='graficos'>

                    <h3>Total de Acertos e Erros</h3>
                    <Bar width={400} height={300} data={graficoTotalAcertos} />
                    </div>
                    {listaBanca.map((item, index) => {
                // Configuração dinâmica para cada gráfico com base em cada item
                const graficoTotalAcertosBanca = {
                    labels: ['Total Erros', 'Total Acertos', 'Total'],
                    datasets: [
                        {
                            label: `Acertos ${item.banca}`, // Label dinâmico para cada banca
                            data: [item.total_erros, item.total_acertos, item.total], // Dados dinâmicos
                            backgroundColor: [
                                'rgb(255, 0, 0)',   // Cor para Total Erros
                                'rgb(0, 200, 0)',   // Cor para Total Acertos
                                'rgb(0, 123, 255)'       // Cor para Total
                            ],
                            borderColor: [
                                'rgb(255, 0, 0)',   // Cor para Total Erros
                                'rgb(0, 200, 0)',   // Cor para Total Acertos
                                'rgb(0, 123, 255)' 
                            ],
                            borderWidth: 1,
                        },
                    ],
                };

                return (
                    <div className='graficos' key={index}>
                        <h3>Total {item.banca} </h3>
                        {/* Renderizar um gráfico dinamicamente para cada item */}
                        <Bar width={400} height={300} data={graficoTotalAcertosBanca} />
                    </div>
                );
                
            })}
            {listaMateria.map((item, index) => {
                // Configuração dinâmica para cada gráfico com base em cada item
                const graficoTotalAcertosMateria = {
                    labels: ['Total Erros', 'Total Acertos', 'Total'],
                    datasets: [
                        {
                            label: `Acertos ${item.materia}`, // Label dinâmico para cada banca
                            data: [item.total_erros, item.total_acertos, item.total_questoes], // Dados dinâmicos
                            backgroundColor: [
                                'rgb(255, 0, 0)',   // Cor para Total Erros
                                'rgb(0, 200, 0)',   // Cor para Total Acertos
                                'rgb(0, 123, 255)'      // Cor para Total
                            ],
                            borderColor: [
                                'rgb(255, 0, 0)',   // Cor para Total Erros
                                'rgb(0, 200, 0)',   // Cor para Total Acertos
                                'rgb(0, 123, 255)'
                            ],
                            borderWidth: 1,
                        },
                    ],
                };

                return (
                    <div className='graficos' key={index}>
                        <h3>Total {item.materia} </h3>
                        {/* Renderizar um gráfico dinamicamente para cada item */}
                        <Bar width={400} height={300} data={graficoTotalAcertosMateria} />
                    </div>
                );
                
            })}
                    
                </div>
            </div>
        </div>
    );
};

export default Relatorio;
