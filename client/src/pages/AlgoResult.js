import axios from 'axios';
import img from '../resources/O-UNO_Type_Color_White.png';
import img2 from '../resources/photo-1606761568499-6d2451b23c66.avif';

let response
let result
let algoResult = [];

response = await axios.get("http://localhost:3001/Algo");
result = response.data;
algoResult.push(JSON.stringify(result, null, 2));

export default function AlgoResult(){
    return <div>
               <body style={{backgroundImage: `url(${img2})`, backgroundSize: "contain", backgroundRepeat: "repeat-y", bacbackgroundPosition: "top"}}>
                <h1 style={{backgroundImage: `url(${img})`, backgroundSize: "cover", height: "110px", backgroundColor: "black"}}></h1>
                <h2 style={{backgroundColor: "black", color: "white", width: "15%", margin: "auto", textAlign: "center"}}>Algorithm Results</h2>
                <h3 style={{textAlign: "left", margin: "auto", backgroundColor: "black", color: "white", width: "70%"}}><pre>{algoResult}</pre></h3>
                </body>
            </div>
}