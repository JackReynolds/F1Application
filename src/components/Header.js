import React from 'react'
import '../css/header.css'


const Header = () => { 
    return (
        <section id="header">
            <header>
            <nav
                className="navbar is-danger"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                <a
                    role="button"
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item" > Compare Drivers </a>
                    <a className="navbar-item" >
                    Driver Standings
                    </a>
                </div>
                </div>
            </nav>
            </header>
        </section>
    )
}

export default Header;
