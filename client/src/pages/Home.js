/**
 * @file Renders the home page of the application
 * @author Joshua Shadbolt, Travis McMahon
 * @namespace Home
 */

import img from '../resources/O-UNO_Type_Color_White.png';
import img2 from '../resources/photo-1606761568499-6d2451b23c66.avif';
import "./Home.css"; // Import the Home.css file for styling

export default function Home() {
    return( 
        <div className="home-container">
            <header className="home-header" style={{backgroundImage: `url(${img2})`}}>
                <img src={img} alt="Logo" className="home-logo" />
                <h1 className="home-title">Welcome to the <strong>PKI Class Scheduler</strong>!</h1>
                <p className="home-subtitle">This application will help you create a schedule of classes for the PKI building.</p>
            </header>
            <section className="home-content">
                <p>Use the <strong>Navigation Bar</strong> across the top of each page to move back and forth through the website.</p>
                <ul>
                    <li><strong>Upload</strong> will allow you to upload a .CSV file to be processed.</li>
                    <li><strong>Calendar</strong> will allow you to view a layout of assigned classes for the week.</li>
                    <li><strong>Algorithm Results</strong> will show you the schedule created from processing your uploaded .CSV file.</li>
                    <li>Click the title "<strong>PKI Class Scheduler</strong>" to return to the home page.</li>
                </ul>
            </section>
            <footer className="home-footer">Created by Fredric Shope, Josh Shadbolt, Travis McMahon, Abdoul Latoundji, and Jacob Finley. AKA The Node Ninja React Force</footer>
        </div>
    );
}

