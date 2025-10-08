import { useNavigate } from "react-router-dom";
import herobg from "../assets/herobg.svg";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="relative h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 flex justify-center items-center p-4 overflow-hidden">
            <img
                src={herobg}
                alt="Python Logo"
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[80vh] opacity-50 pointer-events-none animate-spin"
                style={{ animationDuration: "6s" }}
            />

            <div className="relative max-w-2xl p-8 rounded-xl z-10 text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                    Welcome to Python Quiz
                </h1>
                <p className="text-white text-lg sm:text-xl mb-2">
                    Test your knowledge of the Python programming language.
                </p>
                <p className="text-white text-lg sm:text-xl mb-8">
                    You will be given <span className="font-semibold text-yellow-300">30 questions</span> in{" "}
                    <span className="font-semibold text-yellow-300">15 minutes</span>. Each question has{" "}
                    <span className="font-semibold text-yellow-300">30 seconds</span> to answer.
                </p>
                <button
                    onClick={() => navigate("/register")}
                    className="bg-[#fdd332] text-gray-700 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-400 transition"
                >
                    Take the Quiz
                </button>
            </div>
        </div>
    );
};

export default Home;