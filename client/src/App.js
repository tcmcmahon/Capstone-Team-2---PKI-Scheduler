/**
 * @file Handles rendering of the Navigation bar on all pages
 * @author Joshua Shadbolt
 * @namespace RenderNavbar
 */

import Navbar from "./Navbar"
import Home from "./pages/Home"
import Upload from "./pages/Upload"
import Calendar from "./pages/Calendar"
import AlgoResult from "./pages/AlgoResult"
import { Route, Routes } from "react-router-dom"

/**
 * Function for rendering the Navigation bar
 * @returns {html} Navigation bar for all pages
 * @memberof RenderNavbar
 */
function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/algorithm" element={<AlgoResult />} />
                </Routes>
            </div>
        </>
    )
}

export default App