import React, {useEffect, useState} from "react";
import './styles.css'
import axios from "axios";

const ModalTurmas = ({
    isOpen,
    onClose,
    turmaSelecionada,
    setSeta,
    seta 

})=>{
    if(!isOpen) return null

    const [id, setId] = useState(turmaSelecionada?.id || '')
    const [codigo, setCodigo] = useState(turmaSelecionada?.codigo || '')
    const [turma, setTurma] = useState(turmaSelecionada?.turma || '')
    const token = localStorage.getItem('token')
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        const novaTurma = {codigo, turma}
        if(turmaSelecionada){
            atualizar({...turmaSelecionada, ...novaTurma})
        }else{
            console.log("Teste nova turma: ", novaTurma)
            criar(novaTurma)
        }
    }

    const newTurma = async() =>{
        console.log("Entrioodjs");
        
        try {
            await axios.post('http://127.0.0.1:8000/api/turmas', 
                {   codigo: codigo,
                    turma: turma,
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            console.log("turma inserida sucefful")
            setSeta(!seta)
            onClose(true)
        } catch (error) {
            console.log(error);
            
        }
    }

    const editTurma = async() =>{
        try {
            await axios.put(`http://127.0.0.1:8000/api/turma/${turmaSelecionada.id}`, 
                {   codigo: codigo,
                    turma: turma,
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
                <h2>{turmaSelecionada ? `Editar | ${turmaSelecionada.turma}` : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="caixa1">
                            <input
                                className="codigo-modal"
                                value={codigo}
                                placeholder="codigo"
                                onChange={(e)=>setCodigo(e.target.value)}
                            />
                            <input
                                className="turma-modal"
                                value={turma}
                                placeholder="turma"
                                onChange={(e)=>setTurma(e.target.value)}
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
                        onClick={turmaSelecionada? editTurma : newTurma}>
                        {turmaSelecionada ? "Atualizar" : "Salvar"}</button> 
                </div>
            </div>
        </div>
    )
}


export default ModalTurmas
