import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';


export default function DataChart() {

    localStorage.setItem("sessionHistory", JSON.stringify([
  { weekday: "Monday", date: "Sep 15, 2025", time: "09 AM", session: "25 mins" },
  { weekday: "Monday", date: "Sep 15, 2025", time: "04 PM", session: "30 mins" },
  { weekday: "Tuesday", date: "Sep 16, 2025", time: "02 PM", session: "15 mins" },
  { weekday: "Wednesday", date: "Sep 17, 2025", time: "07 PM", session: "40 mins" },
  { weekday: "Thursday", date: "Sep 18, 2025", time: "11 AM", session: "5 mins" },
  { weekday: "Friday", date: "Sep 19, 2025", time: "08 PM", session: "30 mins" },
  { weekday: "Saturday", date: "Sep 20, 2025", time: "10 AM", session: "50 mins" },
  { weekday: "Sunday", date: "Sep 21, 2025", time: "03 PM", session: "20 mins" },
  { weekday: "Monday", date: "Sep 22, 2025", time: "09 AM", session: "35 mins" },
  { weekday: "Tuesday", date: "Sep 23, 2025", time: "01 PM", session: "25 mins" },
  { weekday: "Wednesday", date: "Sep 24, 2025", time: "06 PM", session: "45 mins" },
  { weekday: "Thursday", date: "Sep 25, 2025", time: "10 AM", session: "15 mins" },
  { weekday: "Friday", date: "Sep 26, 2025", time: "08 PM", session: "40 mins" },
  { weekday: "Saturday", date: "Sep 27, 2025", time: "11 AM", session: "30 mins" },
  { weekday: "Sunday", date: "Sep 28, 2025", time: "04 PM", session: "25 mins" },
  { weekday: "Monday", date: "Sep 29, 2025", time: "09 AM", session: "20 mins" },
  { weekday: "Tuesday", date: "Sep 30, 2025", time: "02 PM", session: "30 mins" },
  { weekday: "Wednesday", date: "Oct 1, 2025", time: "07 PM", session: "50 mins" },
  { weekday: "Thursday", date: "Oct 2, 2025", time: "11 AM", session: "10 mins" },
  { weekday: "Friday", date: "Oct 3, 2025", time: "08 PM", session: "35 mins" }
]));

    const [data, setData] = useState([]);
    useEffect(() => {
        const updateData = () => {
            const raw = JSON.parse(localStorage.getItem("sessionHistory")) || [];
            // convert session string → number
            const cleaned = raw.map(d => ({
                ...d,
                session: parseInt(d.session) || 0
            }));
            setData(cleaned);
        };

        updateData();
        window.addEventListener("storage", updateData);
        return () => window.removeEventListener("storage", updateData);
    }, []);


    return (
        <LineChart width={700} height={300} data={data} style={{ margin: "30px 20px"}}>
            <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="session" stroke="#60e62b" strokeWidth={2} name="Session" />
            <XAxis dataKey="date"/>
            <YAxis label={{ value: 'Minutes', position: 'insideLeft', angle: -90 }} />
            <Legend align="right" />
            <Tooltip />
        </LineChart>

    )
}