import Navbar from "./Navbar"
import Home from "./pages/Home"
import Upload from "./pages/Upload"
import Calendar from "./pages/Calendar"
import { Route, Routes } from "react-router-dom"

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/calendar" element={<Calendar />} />
                </Routes>
            </div>
        </>
    )
}

export default App