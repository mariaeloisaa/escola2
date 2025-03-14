import React, {useEffect, useState} from "react";
import './styles.css'
import axios from "axios";

const ModalDisciplina = ({
    isOpen,
    onClose,
    disciplinaSelecionada,
    setSeta,
    seta 

})=>{
    if(!isOpen) return null

    const [id, setId] = useState(disciplinaSelecionada?.id || '')
    const [disciplina, setDisciplina] = useState(disciplinaSelecionada?.disciplina || '')
    const [codigo, setCodigo] = useState(disciplinaSelecionada?.codigo || '')
    const [cargaHora, setCargaHora] = useState(disciplinaSelecionada?.cargaHora || '')
    const token = localStorage.getItem('token')

    const handleSubmit = (e)=>{
        e.preventDefault()
        const novaDisciplina = {disciplina, codigo, cargaHora}
        if(disciplinaSelecionada){
            atualizar({...disciplinaSelecionada, ...novaDisciplina})
        }else{
            console.log("Teste nova disciplina: ", novaDisciplina)
            criar(novaDisciplina)
        }
    }

    const newDisci = async() =>{
        try {
            await axios.post('http://127.0.0.1:8000/api/disciplinas', 
                {   disciplina: disciplina,
                    codigo: codigo,
                    cargaHora: cargaHora,
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            console.log("disci inserido sucefful")
            setSeta(!seta)
            onClose(true)
        } catch (error) {
            
        }
    }

    const editDisci = async() =>{
        try {
            await axios.put(`http://127.0.0.1:8000/api/disciplina/${disciplinaSelecionada.id}`, 
                {   disciplina: disciplina,
                    codigo: codigo,
                    cargaHora: cargaHora,
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            setSeta(!seta)
            onClose(true)
        } catch (error) {
            
        }
    }


    return(
        <div className="modal-modal">
            <div className="container-modal">
                <div className="head-modal">
                <button className="close-button" onClick={onClose}>X</button>
                </div>
                <h2>{disciplinaSelecionada ? `Editar | ${disciplinaSelecionada.codigo}` : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="caixa1">
                            <input
                                className="disciplina-modal"
                                value={disciplina}
                                placeholder="disciplina"
                                onChange={(e)=>setDisciplina(e.target.value)}
                            />
                            <input
                                className="codigo-modal"
                                value={codigo}
                                placeholder="codigo"
                                onChange={(e)=>setCodigo(e.target.value)}
                            />
                            <input
                                className="cargaHora-modal"
                                value={cargaHora}
                                placeholder="cargaHora"
                                onChange={(e)=>setCargaHora(e.target.value)}
                            />
                            <input
                                className="tel-modal"
                                value={tel}
                                placeholder="tel"
                                onChange={(e)=>setTel(e.target.value)}
                            />
                            <input
                                className="ocupacao-modal"
                                value={ocupacao}
                                placeholder="ocupacao"
                                onChange={(e)=>setOcupacao(e.target.value)}
                            />
                        </div>
                        <div className="caixa2">
                            
                        </div>
                    </form>
                </div>
                <div className="footer-modal">
                    <button 
                        className= "button-save" 
                        type="submit" 
                        onClick={disciplinaSelecionada? editTeacher : newTeacher}>
                        {disciplinaSelecionada ? "Atualizar" : "Salvar"}</button> 
                </div>
            </div>
        </div>
    )
}


export default ModalDisciplina
