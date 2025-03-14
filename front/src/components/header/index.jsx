import React from "react";
import './styles.css'

export default function Header() {
    return (
        <div className="container_header">
            <div className="nav_bar">
                <h3>senai</h3>
            </div>
            <section className="body_header">
                <div className="title">
                    <h1>Professores</h1>
                </div>
                <div className="nav">
                    <span>CREATE</span>
                    <span>READ</span>
                    <span>UPDATE</span>
                    <span>DELETE</span>
                </div>
            </section>
        </div>
    )
}