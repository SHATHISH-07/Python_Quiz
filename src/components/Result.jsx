import { useLocation, Link } from "react-router-dom";

const Result = () => {
    const location = useLocation();

    const { score, total, timeTaken } = location.state || {
        score: 0,
        total: 0,
        timeTaken: 0,
    };

    const percentage = total > 0 ? ((score / total) * 100).toFixed(1) : 0;
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 text-white p-2">
            <div className="bg-black/70 bg-opacity-70 p-5 sm:p-10 rounded-3xl shadow-2xl text-center">
                <h2 className="text-3xl sm:text-5xl font-extrabold mb-6">Quiz Completed!</h2>
                <p className="text-2xl mb-2">Your Score: <span className="text-yellow-400 font-bold">{score} / {total}</span></p>
                <p className="text-2xl mb-4">Percentage: <span className="text-yellow-400 font-bold">{percentage}%</span></p>
                <p className="text-xl mb-6">Time Taken: <span className="font-bold">{minutes}m {seconds}s</span></p>

                {percentage >= 50 ? (
                    <p className="mt-4 text-green-400 font-bold text-2xl animate-pulse"> Congratulations! You passed.</p>
                ) : (
                    <p className="mt-4 text-red-400 font-bold text-2xl animate-pulse">Keep Trying! You can do better.</p>
                )}

                <Link
                    to="/leaderboard"
                    className="mt-8 inline-block bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition"
                >
                    View Leaderboard
                </Link>
            </div>
        </div>
    );
};

export default Result;