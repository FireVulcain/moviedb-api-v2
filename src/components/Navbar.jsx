import React, {useState} from 'react'
import { NavLink } from "react-router-dom";

import { FaSearch } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

import Logo from "./../assets/images/logo.png"
import { SearchBar } from './SearchBar';

export const Navbar = ({currentPath}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header>
                <nav className="container">
                    <div className="nav-left">
                        <NavLink activeClassName="active-link" to="/"><img src={Logo} className="Logo" alt="Logo" /></NavLink>
                        <NavLink activeClassName="active-link" to="/movie">Movies</NavLink>
                        <NavLink activeClassName="active-link" to="/tv">Tv Shows</NavLink>
                        <NavLink activeClassName="active-link" to="/person">People</NavLink>
                    </div>
                    <div className="nav-right">
                        <NavLink activeClassName="active-link" to="/trending">Trending</NavLink>
                        <NavLink activeClassName="active-link" to="/discover">Discover</NavLink>
                        {!open ? <FaSearch onClick={() => setOpen(true)}/> : <FaTimes onClick={() => setOpen(false)} />}
                        
                    </div>
                </nav>
            </header>
            <SearchBar open={open} setOpen={setOpen} currentPath={currentPath} />
        </>
    )
}
