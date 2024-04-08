/**
 * @file Renders the page for display of the algorithms output
 * @author Travis McMahon
 * @namespace AlgorithmResults
 */

import axios from 'axios';
import img from '../resources/O-UNO_Type_Color_White.png';
import img2 from '../resources/photo-1606761568499-6d2451b23c66.avif';

let response;//Response from axios GET request to /Algo
let result;//Result of resolved response
let algoResult = [];//Array for resolved data

response = await axios.get("http://localhost:3001/Algo");//Store response from GET request to /Algo
result = response.data;//Resolve data from response into result
algoResult.push(JSON.stringify(result, null, 2));//Push data in string format to algoResult array

/**
 * Function for displaying the raw data output from the algorithm
 * @returns {html} Html page containing the raw output data from the algorithm
 */
export default function AlgoResult(){
    return <div>
               <body style={{backgroundImage: `url(${img2})`, backgroundSize: "contain", backgroundRepeat: "repeat-y", bacbackgroundPosition: "top"}}>
                <h1 style={{backgroundImage: `url(${img})`, backgroundSize: "cover", height: "110px", backgroundColor: "black"}}></h1>
                <h2 style={{backgroundColor: "black", color: "white", width: "15%", margin: "auto", textAlign: "center"}}>Algorithm Results</h2>
                <h3 style={{textAlign: "left", margin: "auto", backgroundColor: "black", color: "white", width: "70%"}}><pre>{algoResult}</pre></h3>
                </body>
            </div>
}