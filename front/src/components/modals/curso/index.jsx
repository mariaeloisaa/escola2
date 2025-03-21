import React, {useEffect, useState} from "react";
import './styles.css'
import axios from "axios";

const ModalCurso = ({
    isOpen,
    onClose,
    cursoSelecionado,
    setSeta,
    seta 

})=>{
    if(!isOpen) return null

    const [id, setId] = useState(cursoSelecionado?.id || '')
    const [codigo, setCodigo] = useState(cursoSelecionado?.codigo || '')
    const [curso, setCurso] = useState(cursoSelecionado?.curso || '')
    const [tipo_curso, setTipoCurso] = useState(cursoSelecionado?.tipo_curso || '')
    const [horas_aula, setHorasAula] = useState(cursoSelecionado?.horas_aula || '')
    const [sigla, setSigla] = useState(cursoSelecionado?.sigla || '')
    const token = localStorage.getItem('token')

    const handleSubmit = (e)=>{
        e.preventDefault()
        const novoCurso = {codigo, curso, tipo_curso, horas_aula, sigla}
        if(cursoSelecionado){
            editCurso
        }else{
            console.log("Teste novo curso: ", novoCurso)
            newCurso
        }
    }

    const newCurso = async() =>{
        console.log([codigo, curso, tipo_curso, horas_aula, sigla])
        try {
            await axios.post('http://127.0.0.1:8000/api/cursos', 
                {   codigo: codigo,
                    curso: curso,
                    tipo_curso: tipo_curso,
                    horas_aula: horas_aula,
                    sigla: sigla
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            console.log("curso inserido sucefful")
            setSeta(!seta);
            onClose(true)
        } catch (error) {
            console.log(error)
        }
    }

    const editCurso = async() =>{

        try {
            await axios.put(`http://127.0.0.1:8000/api/curso/${cursoSelecionado.id}`, 
                {   codigo: codigo,
                    curso: curso,
                    tipo_curso: tipo_curso,
                    horas_aula: horas_aula,
                    sigla: sigla
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
                <h2>{cursoSelecionado ? `Editar | ${cursoSelecionado.id}` : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="caixa1">
                            <input
                                className="curso-modal"
                                value={curso}
                                placeholder="curso"
                                onChange={(e)=>setCodigo(e.target.value)}
                            />
                            <input
                                className="codigo-modal"
                                value={codigo}
                                placeholder="codigo"
                                onChange={(e)=>setCurso(e.target.value)}
                            />
                            <input
                                className="cargaHora-modal"
                                value={cargaHora}
                                placeholder="cargaHora"
                                onChange={(e)=>setCargaHora(e.target.value)}
                            />
                        </div>
                        <div className="caixa2">
                            
                        </div>
                    </form>
                </div>
                <div className="footer-modal">
                    <button 
                        className= "button-save" 
                         
                        onClick={cursoSelecionado? editCurso : newCurso}>
                        {cursoSelecionado ? "Atualizar" : "Salvar"}</button> 
                </div>
            </div>
        </div>
    )
}


export default Modalcurso
