import { useEffect, useState, useRef } from "react";

const QuestionTimer = ({ duration, totalDuration, onTimeUp, resetId }) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const onTimeUpRef = useRef(onTimeUp);

    useEffect(() => {
        onTimeUpRef.current = onTimeUp;
    }, [onTimeUp]);

    useEffect(() => {
        setTimeLeft(duration);

        if (duration <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeUpRef.current();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [duration, resetId]);

    useEffect(() => {
        if (duration === 0) {
            const timeout = setTimeout(() => onTimeUpRef.current(), 0);
            return () => clearTimeout(timeout);
        }
    }, [duration]);

    const widthPercentage = (timeLeft / totalDuration) * 100;

    return (
        <div className="w-full max-w-sm">
            <div className="text-center text-gray-300 mb-2">{timeLeft}s remaining</div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                    className="bg-yellow-400 h-2.5 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${widthPercentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default QuestionTimer;
