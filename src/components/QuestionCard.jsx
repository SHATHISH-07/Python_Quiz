import { useState, useEffect } from "react";

const QuestionCard = ({ questionData, handleAnswer }) => {
    const [selected, setSelected] = useState("");

    useEffect(() => {
        setSelected("");
    }, [questionData]);

    const handleSelect = (option) => {
        if (selected) return;
        setSelected(option);
        setTimeout(() => handleAnswer(option), 300);
    };

    return (
        <div className="max-w-3xl mx-auto my-6 p-6 sm:p-8 bg-gray-900/60 rounded-2xl shadow-2xl text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">{questionData.question}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questionData.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelect(option)}
                        disabled={!!selected}
                        className={`p-4 rounded-lg font-semibold text-white text-left text-base sm:text-lg border-2 border-transparent transition-all duration-300
                            ${selected
                                ? option === questionData.answer
                                    ? 'bg-green-500/80 border-green-400'
                                    : selected === option
                                        ? 'bg-red-500/80 border-red-400'
                                        : 'bg-gray-700/50'
                                : 'bg-gray-700/50 '
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;