/**
 * @file Handles configuration of the Navigation bar functionality
 * @author Joshua Shadbolt
 * @namespace Navbar
 */

import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the Navbar.css file for styling

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                PKI Class Scheduler
            </Link>
            <ul className="navbar-nav">
                <NavItem to="/upload">Upload</NavItem>
                <NavItem to="/calendar">Calendar</NavItem>
                <NavItem to="/algorithm">Algorithm Results</NavItem>
            </ul>
        </nav>
    );
}

function NavItem({ to, children }) {
    return (
        <li className="nav-item">
            <Link to={to} className="nav-link">
                {children}
            </Link>
        </li>
    );
}

