import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    const getCUrrentActive = (menuitem) =>{
        return window.location.href.includes(menuitem)
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <a className="navbar-brand" href="#">Interview</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link active" to="/">View</Link>
                    <Link className="nav-item nav-link" to="/create-student">Create</Link>
                </div>
            </div>
        </nav>
    )
}
