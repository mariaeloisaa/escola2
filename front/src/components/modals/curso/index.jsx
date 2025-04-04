import React, {useEffect, useState} from "react";
import './styles.css'
import axios from "axios";

const ModalCursos = ({
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
    const [tipo_curso, setTipo_curso] = useState(cursoSelecionado?.tipo_curso || '')
    const [horas_aula, setHoras_aula] = useState(cursoSelecionado?.horas_aula || '')
    const [sigla, setSigla] = useState(cursoSelecionado?.sigla || '')
    const [tipoCursoOptions, setTipoCursoOptions] = useState([]);
    const token = localStorage.getItem('token')

    useEffect(() => {
        async function fetchTipoCursoOptions() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/tipo_curso_choices", 
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
    
                setTipoCursoOptions(response.data); // Aqui recebe a lista corretamente
    
            } catch (error) {
                console.error("Erro ao buscar opções de tipo de curso:", error);
            }
        }
    
        fetchTipoCursoOptions();
    }, []);
    

    const handleSubmit = (e)=>{
        e.preventDefault()
        const novoCurso = {codigo, curso, tipo_curso, horas_aula, sigla}
        if(cursoSelecionado){
            atualizar({...cursoSelecionado, ...novoCurso})
        }else{
            console.log("Teste novo professor: ", novoCurso)
            criar(novoCurso)
        }
    }

    const newCurso = async() =>{
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
            setSeta(!seta)
            onClose(true)
        } catch (error) {
            
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
                                className="codigo-modal"
                                value={codigo}
                                placeholder="codigo"
                                onChange={(e)=>setCodigo(e.target.value)}
                            />
                            <input
                                className="curso-modal"
                                value={curso}
                                placeholder="curso"
                                onChange={(e)=>setCurso(e.target.value)}
                            />
                            <select
                                className="tipo_curso-modal"
                                value={tipo_curso}
                                onChange={(e) => setTipo_curso(e.target.value)}
                            >
                                <option value="">Selecione o tipo</option>
                                {tipoCursoOptions.length > 0 ? (
                                    tipoCursoOptions.map((option) => (
                                        <option key={option[0]} value={option[0]}>
                                            {option[1]}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Carregando...</option>
                                )}
                            </select>
                            <input
                                className="horas_aula-modal"
                                value={horas_aula}
                                placeholder="horas_aula"
                                onChange={(e)=>setHoras_aula(e.target.value)}
                            />
                            <input
                                className="sigla-modal"
                                value={sigla}
                                placeholder="sigla"
                                onChange={(e)=>setSigla(e.target.value)}
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
                        onClick={cursoSelecionado? editCurso : newCurso}>
                        {cursoSelecionado ? "Atualizar" : "Salvar"}</button> 
                </div>
            </div>
        </div>
    )
}


export default ModalCursos
