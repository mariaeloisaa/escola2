import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './styles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import ModalAmbientes from "../../components/modals/ambiente";


export default function Ambiente() {
    const [dados, setDados] = useState([])
    const token = localStorage.getItem('token')
    const [seta, setSeta] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [ambienteSelecionado, setAmienteSelecionado] = useState(null)

    useEffect(() => {
        if (!token) return;
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/ambientes',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [seta])

    const apagar = async (id) => {
        if (window.confirm("Tem certeza? ")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/ambiente/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(dados.filter((ambiente) => { ambiente.id !== id }))
                setSeta(!seta)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const criar = async(novoAmbiente)=>{
        console.log("Novo ambiente: ", novoAmbiente)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/ambientes',
                {
                    codigo: novoAmbiente.codigo,
                    sala: novoAmbiente.sala,
                    capacidade: novoAmbiente.capacidade,
                    responsavel: novoAmbiente.responsavel,
                    periodo: novoAmbiente.periodo
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados([...dados, novoAmbiente])
            setModalOpen(false)
        } catch (error) {
            console.error(error)
        }

    }


    const atualizar = async (ambiente)=>{
        setAmienteSelecionado(ambiente)
        setModalOpen(true)

    }

    return (
        <div>
            <Header />
            
            <div className="container_home">
                <div className="lista">
                    <table>
                        <thead>
                            <tr className="icons">
                                <div className="col1"></div>
                                <div className="col2"></div>
                                <div className="col3"><th>ID</th></div>
                                <div className="col4"><th>CODIGO</th></div>
                                <div className="col5"><th>SALA</th></div>
                                <div className="col6"><th>CAPACIDADE</th></div>
                                <div className="col7"><th>RESPONSAVEL</th></div>
                                <div className="col8"><th>PERIODO</th></div>
                            </tr>
                        </thead>
                        <tbody> 
                            {dados.map((ambiente) => (
                                <tr key={ambiente.id} className="campos">
                                    <td className="icons">
                                        <div className="col1">
                                            <FaEdit className="edit" onClick={() => atualizar(ambiente)}/>
                                        </div>
                                        <div className="col2">
                                            <FaTrash className="delete" onClick={() => apagar(ambiente.id)} />
                                        </div>

                                    </td>
                                    <div className="col3"><td>{ambiente.id}</td></div>
                                    <div className="col4"><td>{ambiente.codigo}</td></div>
                                    <div className="col5"><td>{ambiente.sala}</td></div>
                                    <div className="col6"><td>{ambiente.capacidade}</td></div>
                                    <div className="col7"><td>{ambiente.responsavel}</td></div>
                                    <div className="col8"><td>{ambiente.periodo}</td></div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus className="adicionar" onClick={()=>{setModalOpen(true), setAmienteSelecionado(null)}}/>
                    </div>
                    <div className="id">
                        <input placeholder="id" />
                    </div>
                    <div className="sala">
                        <input placeholder="sala do ambiente" />
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                    </div>
                </div>
                <ModalAmbientes
                    isOpen={modalOpen}
                    onClose={()=>setModalOpen(false)}
                    ambienteSelecionado={ambienteSelecionado}
                    setSeta = {setSeta}
                    seta = {seta}
                />
            </div>
            <Footer />
        </div>
    )
}
