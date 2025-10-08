import React, { useEffect, useState } from "react";
import { Clock4 } from 'lucide-react';

const Timer = ({ totalTime, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(totalTime);

    useEffect(() => {
        setTimeLeft(totalTime);
    }, [totalTime]);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, onTimeUp]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex  items-center gap-2 bg-gray-900/50 text-yellow-400 font-mono text-lg sm:text-xl font-bold px-5 py-2.5 rounded-full shadow-lg" >
            <div><Clock4 size={20} /> </div>
            <div>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
        </div >
    );
};

export default Timer;