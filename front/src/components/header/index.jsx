import React from "react";
import './styles.css'
import { Link, Navigate } from "react-router-dom";
import {ImExit} from "react-icons/im"

export default function Header() {

    const logout = ()=>{
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
    }

    return (
        <div className="container_header">
            <div className="nav_bar">
                <Link to={'/home'}><h3>senai</h3></Link>
            </div>
            <section className="body_header">
                <div className="title">
                    <h1>HEADER</h1>
                </div>
                <div className="nav">
                    <span>CREATE</span>
                    <span>READ</span>
                    <span>UPDATE</span>
                    <span>DELETE</span>
                </div>
                <div className="exit">
                    <ImExit onClick={logout}/>
                </div>
            </section>
        </div>
    )
}