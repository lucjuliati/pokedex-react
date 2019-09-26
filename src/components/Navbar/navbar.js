import React, { Component } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'


export class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar">
                    <Link to="/">
                    Pokedex
                    </Link>
                </nav>
            </div>
        )
    }
}

export default Navbar
