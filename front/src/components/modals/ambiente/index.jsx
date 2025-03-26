import React, {useEffect, useState} from "react";
import './styles.css'
import axios from "axios";

const ModalAmbientes = ({
    isOpen,
    onClose,
    ambienteSelecionado,
    setSeta,
    seta 

})=>{
    if(!isOpen) return null

    const [id, setId] = useState(ambienteSelecionado?.id || '')
    const [codigo, setCodigo] = useState(ambienteSelecionado?.codigo || '')
    const [sala, setSala] = useState(ambienteSelecionado?.sala || '')
    const [capacidade, setCapacidade] = useState(ambienteSelecionado?.capacidade || '')
    const [responsavel, setResponsavel] = useState(ambienteSelecionado?.responsavel || '')
    const [periodo, setPeriodo] = useState(ambienteSelecionado?.periodo || '')
    const [periodoOptions, setPeriodoOptions] = useState([]);
    const token = localStorage.getItem('token')


    useEffect(() => {
        async function fetchTipoCursoOptions() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/periodo_choices", 
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
    
                setPeriodoOptions(response.data); // Aqui recebe a lista corretamente
    
            } catch (error) {
                console.error("Erro ao buscar opções de tipo de curso:", error);
            }
        }
    
        fetchTipoCursoOptions();
    }, []);

    const handleSubmit = (e)=>{
        e.preventDefault()
        const novoAmbiente = {codigo, sala, capacidade, responsavel, periodo}
        if(ambienteSelecionado){
            atualizar({...ambienteSelecionado, ...novoAmbiente})
        }else{
            console.log("Teste novo ambiente: ", novoAmbiente)
            criar(novoAmbiente)
        }
    }

    const newAmbiente = async() =>{
        try {
            await axios.post('http://127.0.0.1:8000/api/ambientes', 
                {   codigo: codigo,
                    sala: sala,
                    capacidade: capacidade,
                    responsavel: responsavel,
                    periodo: periodo
                },{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            console.log("prof inserido sucefful")
            setSeta(!seta)
            onClose(true)
        } catch (error) {
            
        }
    }

    const editAmbiente = async() =>{
        try {
            await axios.put(`http://127.0.0.1:8000/api/ambiente/${ambienteSelecionado.id}`, 
                {   codigo: codigo,
                    sala: sala,
                    capacidade: capacidade,
                    responsavel: responsavel,
                    periodo: periodo
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
                <h2>{ambienteSelecionado ? `Editar | ${ambienteSelecionado.id}` : "Cadastrar"}</h2>
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
                                className="sala-modal"
                                value={sala}
                                placeholder="sala"
                                onChange={(e)=>setSala(e.target.value)}
                            />
                            <input
                                className="capacidade-modal"
                                value={capacidade}
                                placeholder="capacidade"
                                onChange={(e)=>setCapacidade(e.target.value)}
                            />
                            <input
                                className="responsavel-modal"
                                value={responsavel}
                                placeholder="responsavel"
                                onChange={(e)=>setResponsavel(e.target.value)}
                            />
                            <select
                                className="periodo-modal"
                                value={periodo}
                                onChange={(e) => setPeriodo(e.target.value)}
                            >
                                <option value="">Selecione o tipo</option>
                                {periodoOptions.length > 0 ? (
                                    periodoOptions.map((option) => (
                                        <option key={option[0]} value={option[0]}>
                                            {option[1]}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Carregando...</option>
                                )}
                            </select>
                        </div>
                        <div className="caixa2">
                            
                        </div>
                    </form>
                </div>
                <div className="footer-modal">
                    <button 
                        className= "button-save" 
                        type="submit" 
                        onClick={ambienteSelecionado? editAmbiente : newAmbiente}>
                        {ambienteSelecionado ? "Atualizar" : "Salvar"}</button> 
                </div>
            </div>
        </div>
    )
}


export default ModalAmbientes
