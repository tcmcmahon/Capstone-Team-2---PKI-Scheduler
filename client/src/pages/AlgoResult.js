import axios from 'axios';

let response
let result
let algoResult = [];

response = await axios.get("http://localhost:3001/Algo")
result = response.data
algoResult.push(JSON.stringify(result, null, 2));

export default function AlgoResult(){
    return <div>
                <h1>Algorithm Results</h1>
                <body><pre>{algoResult}</pre></body>
            </div>
}