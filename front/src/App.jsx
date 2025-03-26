import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./pages/login";
import Home from "./pages/home";
import Professor from "./pages/professor";
import Disciplina from "./pages/disciplina";
import Turma from "./pages/turma";
import Curso from "./pages/curso";
import Ambiente from "./pages/ambiente";

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/professor" element={<Professor/>}/>
        <Route path="/disciplina" element={<Disciplina/>}/>
        <Route path="/turma" element={<Turma/>}/>
        <Route path="/curso" element={<Curso/>}/>
        <Route path="/ambiente" element={<Ambiente/>}/>
      </Routes>
    </Router>
  )
}