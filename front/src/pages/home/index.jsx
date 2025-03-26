import axios from "axios";
import React, { useState, useEffect } from "react";
import './styles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import {useNavigate} from 'react-router-dom'



export default function Home() {
    const navigate = useNavigate()
    return (
        <div className="tudo">
            <Header/>
            <div className="container_home">
            <h1>Home</h1>
            <button onClick={() => navigate('/professor')}>Professores</button>
            <button onClick={() => navigate('/disciplina')}>Disciplinas</button>
            <button onClick={() => navigate('/turma')}>Turmas</button>
            <button onClick={() => navigate('/curso')}>Cursos</button>
            <button onClick={() => navigate('/ambiente')}>Ambientes</button>    
        </div>

        </div>
        
    )
}
