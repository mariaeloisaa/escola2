import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './styles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import Modalturmaes from "../../components/modals/turma";


export default function Turma() {
    const [dados, setDados] = useState([])
    const token = localStorage.getItem('token')
    const [seta, setSeta] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [turmaSelecionada, setTurmaSelecionada] = useState(null)

    useEffect(() => {
        if (!token) return;
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/turmas',
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
                await axios.delete(`http://127.0.0.1:8000/api/turma/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(dados.filter((turma) => { turma.id !== id }))
                setSeta(!seta)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const criar = async(novaTurma)=>{
        console.log("Novo turma: ", novaTurma)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/turmas',
                {
                    codigo: novaTurma.codigo,
                    turma: novaTurma.turma,
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados([...dados, novaTurma])
            setModalOpen(false)
        } catch (error) {
            console.error(error)
        }

    }


    const atualizar = async (turma)=>{
        setTurmaSelecionada(turma)
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
                                <div className="col4"><th>codigo</th></div>
                                <div className="col5"><th>turma</th></div>
                            </tr>
                        </thead>
                        <tbody> 
                            {dados.map((turma) => (
                                <tr key={turma.id} className="campos">
                                    <td className="icons">
                                        <div className="col1">
                                            <FaEdit className="edit" onClick={() => atualizar(turma)}/>
                                        </div>
                                        <div className="col2">
                                            <FaTrash className="delete" onClick={() => apagar(turma.id)} />
                                        </div>

                                    </td>
                                    <div className="col3"><td>{turma.id}</td></div>
                                    <div className="col4"><td>{turma.codigo}</td></div>
                                    <div className="col5"><td>{turma.turma}</td></div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus className="adicionar" onClick={()=>{setModalOpen(true), setTurmaSelecionada(null)}}/>
                    </div>
                    <div className="id">
                        <input placeholder="id" />
                    </div>
                    <div className="turma">
                        <input placeholder="nome da turma" />
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                    </div>
                </div>
                <Modalturmaes
                    isOpen={modalOpen}
                    onClose={()=>setModalOpen(false)}
                    turmaSelecionada={turmaSelecionada}
                    setSeta = {setSeta}
                    seta = {seta}
                />
            </div>
            <Footer />
        </div>
    )
}
