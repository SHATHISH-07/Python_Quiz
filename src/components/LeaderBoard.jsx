import React, { useEffect, useState } from "react";
import { db } from "../db/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const q = query(
                    collection(db, "users"),
                    where("isTakenTest", "==", true)
                );
                const snapshot = await getDocs(q);

                const userData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                userData.sort((a, b) => {
                    if (b.score !== a.score) return b.score - a.score;
                    return a.timeTaken - b.timeTaken;
                });

                setUsers(userData);
            } catch (err) {
                console.error("Failed to fetch leaderboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const formatTime = (totalSeconds) => {
        if (typeof totalSeconds !== "number" || totalSeconds < 0) return "N/A";
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}m ${seconds}s`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 flex justify-center items-center text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 text-white p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-8">
                    Leaderboard
                </h1>

                {users.length === 0 ? (
                    <div className="text-center p-8 bg-gray-900/80 rounded-xl text-gray-400">
                        No one has completed the quiz yet.
                    </div>
                ) : (
                    <div className="scroll-container bg-black/70 rounded-xl shadow-2xl overflow-x-auto">
                        <table className="w-full text-left min-w-[700px]">
                            <thead className="bg-gray-900/60">
                                <tr>
                                    <th className="p-4 w-16 text-center">Rank</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Register No</th>
                                    <th className="p-4 text-center">Year</th>
                                    <th className="p-4 text-center">Section</th>
                                    <th className="p-4">Department</th>
                                    <th className="p-4 text-center">Score</th>
                                    <th className="p-4 text-center">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                                    >
                                        <td className="p-4 text-center font-bold text-xl">{index + 1}</td>
                                        <td className="p-4 font-semibold whitespace-nowrap">{user.name}</td>
                                        <td className="p-4 font-semibold whitespace-nowrap">{user.register_number}</td>
                                        <td className="p-4 text-center">{user.year}</td>
                                        <td className="p-4 text-center">{user.section}</td>
                                        <td className="p-4">{user.department}</td>
                                        <td className="p-4 text-center text-yellow-400 font-bold">
                                            {user.score} / 30
                                        </td>
                                        <td className="p-4 text-center text-gray-300">
                                            {formatTime(user.timeTaken)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;