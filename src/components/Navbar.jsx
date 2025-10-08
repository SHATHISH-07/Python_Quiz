import { Link, useLocation } from "react-router-dom";
import logo from "/logo.svg";

const Navbar = () => {
    const location = useLocation();

    const isQuizActive = location.pathname === '/quiz';

    return (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600">
            {/* Desktop Navbar */}
            <nav className=" z-50 hidden sm:flex justify-between items-center p-5 shadow-md text-white bg-[#000000]/70 ">
                <div className="flex items-center gap-5">
                    <img src={logo} alt="logo" width={40} height={40} />
                    <h1 className="text-3xl font-bold">Python Quiz</h1>
                </div>
                <div className="flex gap-20 text-xl font-semibold">
                    {isQuizActive ? (
                        <span className="text-gray-500 cursor-not-allowed">Dashboard</span>
                    ) : (
                        <Link to="/" className="hover:text-yellow-400 transition-colors">Dashboard</Link>
                    )}

                    {isQuizActive ? (
                        <span className="text-gray-500 cursor-not-allowed">Leaderboard</span>
                    ) : (
                        <Link to="/leaderboard" className="hover:text-yellow-400 transition-colors">Leaderboard</Link>
                    )}
                </div>
            </nav>

            {/* Mobile Navbar */}
            <nav className=" z-50 flex flex-col sm:hidden items-center p-4 shadow-md bg-[#1c1c1c]/70  text-white">
                <div className="flex items-center gap-3 mb-4">
                    <img src={logo} alt="logo" className="w-8 h-8" />
                    <h1 className="text-2xl font-bold">Python Quiz</h1>
                </div>
                <div className="flex gap-10">
                    {isQuizActive ? (
                        <span className="text-lg font-semibold text-gray-500 cursor-not-allowed">Dashboard</span>
                    ) : (
                        <Link to="/" className="text-lg font-semibold hover:text-yellow-400">Dashboard</Link>
                    )}

                    {isQuizActive ? (
                        <span className="text-lg font-semibold text-gray-500 cursor-not-allowed">Leaderboard</span>
                    ) : (
                        <Link to="/leaderboard" className="text-lg font-semibold hover:text-yellow-400">Leaderboard</Link>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;