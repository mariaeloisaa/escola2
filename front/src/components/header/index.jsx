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
                    <h1>Header</h1>
                </div>
                <div className="nav">
                    <span>Create</span>
                    <span>Read</span>
                    <span>Update</span>
                    <span>Delete</span>
                </div>
            </section>
        </div>
    )
}