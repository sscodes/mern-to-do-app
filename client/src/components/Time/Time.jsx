import { useState } from "react";

const Time = () => {
    let time = new Date().toLocaleTimeString();

    const [currentTime, setCurrentTime] = useState(time);

    const updateTime = () => {
        time = new Date().toLocaleTimeString();
        setCurrentTime(time);
    }
    setInterval(updateTime, 1000);

    return (
        <>
            <h1>{time}</h1>
        </>
    );
}

export default Time;