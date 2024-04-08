/**
 * @file Renders the home page of the application
 * @author Joshua Shadbolt, Travis McMahon
 * @namespace Home
 */

import img from '../resources/O-UNO_Type_Color_White.png';
import img2 from '../resources/photo-1606761568499-6d2451b23c66.avif';

/**
 * Function for rendering the home page for the web application
 * @returns {html} Html home page to be displayed on opening of web app
 */
export default function Home(){
    return( 
        <div>
            <body style={{textAlign: 'center', margin: "auto", marginTop: "20px", backgroundImage: `url(${img2})`, height: "85vh", width: "100%", display: "block", margin: "auto"}}>
            <h1 style={{backgroundImage: `url(${img})`, backgroundSize: "cover", height: "110px", backgroundColor: "black"}}></h1>
            <h2 style={{textAlign: 'center', margin: "auto", backgroundColor: "black", color: "white", width: "32%"}}>Welcome to the PKI Class Scheduler!</h2>
            <h3 style={{textAlign: 'center', margin: "auto", backgroundColor: "black", color: "white", width: "50%", marginTop: "10px"}}>This application will help you create a schedule of classes for the PKI building.</h3>
                <h4 style={{margin: "auto", backgroundColor: "black", color: "white", width: "55%", marginTop: "10px"}}>Use the Navigation Bar across the top of each page to move back and forth through the website.</h4>
                <ul style={{display: "inline-block", listStylePosition: "inside", backgroundColor: "black", color: "white", width: "40%", padding: "5px"}}>
                <li style={{textAlign: "left"}}>Upload will allow you to upload a .CSV file to be processed.</li>
                <li style={{textAlign: "left"}}>Calendar will allow you to view a layout of assigned classes for the week.</li>
                <li style={{textAlign: "left"}}>Algorithm Results will show you the schedule created from processing your uploaded .CSV file.</li>
                <li style={{textAlign: "left"}}>Click the title "PKI Class Scheduler" to return to the home page.</li>
                </ul>
            </body>
            <h5 style={{backgroundColor: "black", color: "white", padding: "10px", textAlign: "center"}}>Created by Frederic Shope, Josh Shadbolt, Travis McMahon, Abdoul Latoundji, and Jacob Finley. AKA The Node Ninja React Force</h5>
        </div>
    )
}