import React from "react";
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar(){
    const links = [
        {
            id: 1,
            path: "/",
            text: "HomePage"
        },
        {
            id: 2,
            path: "/Contact",
            text: "Contact"
        },
        {
            id: 3,
            path: "/Projects",
            text: "projects"
        }
        
      
    ]
    return(
        <nav className={styles.navbar}>
            <ul className="menuNav">
                {links.map(link => {return (
                    <li key={link.id}>
                        <NavLink to={link.path}>
                            {link.text}
                        </NavLink>
                    </li>
                )})}
            </ul>
        </nav>
    )
}
export default NavBar;