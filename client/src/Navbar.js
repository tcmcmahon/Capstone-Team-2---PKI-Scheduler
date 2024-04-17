/**
 * @file Handles configuration of the Navigation bar functionality
 * @author Joshua Shadbolt
 * @namespace Navbar
 */

import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the Navbar.css file for styling


/**
 * Function for configuring the Navigation Bar
 * @returns {html} Functional Navigation Bar for all pages
 * @memberof Navbar
 */
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
/**
 * Function for setting up a custom link in the Navigation Bar
 * @param param0 input for configuring a Nav Item for the Navigation Bar
 * @returns {html} new custom link for Navigation Bar
 * @memberof Navbar
 */
function NavItem({ to, children }) {
    return (
        <li className="nav-item">
            <Link to={to} className="nav-link">
                {children}
            </Link>
        </li>
    );
}

