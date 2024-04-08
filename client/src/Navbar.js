/**
 * @file Handles configuration of the Navigation bar functionality
 * @author Joshua Shadbolt
 * @namespace Navbar
 */

import { useImperativeHandle } from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"

/**
 * Function for configuring the Navigation Bar
 * @returns {html} Functional Navigation Bar for all pages
 * @memberof Navbar
 */
export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                PKI Class Scheduler
            </Link>
            <ul>
                <CustomLink to="/upload">Upload</CustomLink>
                <CustomLink to="/calendar">Calendar</CustomLink>
                <CustomLink to="/algorithm">Algorithm Results</CustomLink>
            </ul>
        </nav>
    )
}

/**
 * Function for setting up a custom link in the Navigation Bar
 * @param param0 input for configuring a custom link for the Navigation Bar
 * @returns {html} new custom link for Navigation Bar
 * @memberof Navbar
 */
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end:true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}