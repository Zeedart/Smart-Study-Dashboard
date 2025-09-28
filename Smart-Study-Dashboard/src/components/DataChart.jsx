import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';


export default function DataChart({theme}) {

    const [data, setData] = useState([]);
    useEffect(() => {
        const updateData = () => {
            setData(JSON.parse(localStorage.getItem("sessionHistory")) || []);
        };

        updateData();
        window.addEventListener("storage", updateData);
        return () => window.removeEventListener("storage", updateData);
    }, []);
    //#60e62b


    return (
        <LineChart width={700} height={300} data={data} style={{ margin: "30px 20px"}}> 
            <CartesianGrid stroke={`${theme ? "#aaa": "#e0e0e0ff"}`} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="session" stroke={`${theme ? "#60e62b" : "#b13bfaff"}`} strokeWidth={2} name="Session" />
            <XAxis dataKey="date"/>
            <YAxis label={{ value: 'Minutes', position: 'insideLeft', angle: -90 }} />
            <Legend align="right" />
            <Tooltip />
        </LineChart>

    )
}