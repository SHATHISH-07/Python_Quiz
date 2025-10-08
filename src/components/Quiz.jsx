import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../db/firebase";
import { collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import QuestionTimer from "../components/QuestionTimer";

const Quiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userRegisterNo = location.state?.register_number;

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [quizStartTime, setQuizStartTime] = useState(() => Date.now());
    const [questionStartTime, setQuestionStartTime] = useState(() => Date.now());

    const totalQuizTime = 15 * 60;
    const elapsedQuizTime = Math.floor((Date.now() - quizStartTime) / 1000);
    const remainingGlobalTime = Math.max(0, totalQuizTime - elapsedQuizTime);

    const questionDuration = 30;
    const elapsedQuestionTime = Math.floor((Date.now() - questionStartTime) / 1000);
    const remainingQuestionTime = Math.max(0, questionDuration - elapsedQuestionTime);

    useEffect(() => {
        if (!userRegisterNo) {
            navigate('/', { replace: true });
        }
    }, [userRegisterNo, navigate]);

    useEffect(() => {
        const fetchAndRestore = async () => {
            try {
                const snapshot = await getDocs(collection(db, "quizzes"));
                const quizData = snapshot.docs.map(doc => doc.data()).slice(0, 30);
                setQuestions(quizData);

                const savedState = localStorage.getItem("quizState");
                if (savedState) {
                    const parsed = JSON.parse(savedState);
                    setCurrentIndex(parsed.currentIndex || 0);
                    setScore(parsed.score || 0);
                    setQuizStartTime(parsed.quizStartTime || Date.now());
                    setQuestionStartTime(parsed.questionStartTime || Date.now());
                }
            } catch (err) {
                console.error("Error fetching questions:", err);
            } finally {
                setLoading(false);
            }
        };
        if (userRegisterNo) {
            fetchAndRestore();
        }
    }, [userRegisterNo]);

    useEffect(() => {
        if (!loading && userRegisterNo) {
            const stateToSave = { currentIndex, score, quizStartTime, questionStartTime };
            localStorage.setItem("quizState", JSON.stringify(stateToSave));
        }
    }, [currentIndex, score, quizStartTime, questionStartTime, loading, userRegisterNo]);

    const handleSubmitQuiz = useCallback(async (finalScore) => {
        const finalTimeTaken = Math.floor((Date.now() - quizStartTime) / 1000);
        try {
            const q = query(collection(db, "users"), where("register_number", "==", userRegisterNo));
            const userSnap = await getDocs(q);
            userSnap.forEach(async (docSnap) => {
                await updateDoc(doc(db, "users", docSnap.id), {
                    score: finalScore,
                    timeTaken: finalTimeTaken,
                    isTakenTest: true,
                });
            });
        } catch (err) {
            console.error("Error submitting quiz:", err);
        }
        localStorage.removeItem("quizState");
        navigate('/result', {
            replace: true,
            state: {
                score: finalScore,
                total: questions.length,
                timeTaken: finalTimeTaken,
            }
        });
    }, [quizStartTime, userRegisterNo, navigate, questions.length]);

    useEffect(() => {
        if (remainingGlobalTime === 0 && !loading) {
            handleSubmitQuiz(score);
        }
    }, [remainingGlobalTime, loading, score, handleSubmitQuiz]);

    const handleAnswer = useCallback((selectedOption) => {
        const isCorrect = selectedOption === questions[currentIndex]?.answer;
        const newScore = isCorrect ? score + 1 : score;
        setScore(newScore);

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(prev => prev + 1);
            setQuestionStartTime(Date.now());
        } else {
            handleSubmitQuiz(newScore);
        }
    }, [currentIndex, questions, score, handleSubmitQuiz]);

    if (loading || !userRegisterNo) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 text-white text-2xl">Loading...</div>;
    if (!questions.length) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-2xl">No questions available.</div>;

    return (
        <div className=" flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 p-4 sm:p-6">
            <div className="w-full max-w-4xl bg-black/70 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <img src="/logo.svg" alt="logo" className="w-8 h-8 sm:w-10 sm:h-10" />
                        <h1 className="text-white text-xl sm:text-3xl font-bold">Python Quiz</h1>
                    </div>
                    <Timer totalTime={remainingGlobalTime} onTimeUp={() => handleSubmitQuiz(score)} />
                </div>

                <QuestionCard questionData={questions[currentIndex]} handleAnswer={handleAnswer} />

                <div className="flex justify-center mt-4">
                    <QuestionTimer
                        questionIndex={currentIndex}
                        key={currentIndex}
                        duration={remainingQuestionTime}
                        totalDuration={questionDuration}
                        onTimeUp={() => handleAnswer("")}
                    />
                </div>

                <div className="text-center mt-4 text-gray-300">
                    Question <span className="text-yellow-400">{currentIndex + 1}</span> of {questions.length}
                </div>
            </div>
        </div>
    );
};

export default Quiz;