import React, { useState } from "react";
import { db } from "../db/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: "",
        register_number: "",
        year: "1",
        section: "A",
        department: "CSE",
        score: 0,
        timeTaken: 0,
        isTakenTest: false
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Regex validation for register_number
        const registerPattern = /^(22|23|24|25)BECS\d{3}$/;

        if (!registerPattern.test(form.register_number)) {
            setError("Register number must follow the format: (e.g., 22BECS080).");
            setIsLoading(false);
            return;
        }

        try {
            const q = query(
                collection(db, "users"),
                where("register_number", "==", form.register_number)
            );
            const existingUserSnapshot = await getDocs(q);

            if (!existingUserSnapshot.empty) {
                const userData = existingUserSnapshot.docs[0].data();

                if (userData.isTakenTest) {
                    setError("This register number has already been used to complete the quiz.");
                    setIsLoading(false);
                    return;
                } else {
                    navigate("/quiz", { state: { register_number: form.register_number } });
                }
            } else {
                await addDoc(collection(db, "users"), { ...form });
                navigate("/quiz", { state: { register_number: form.register_number } });
            }
        } catch (err) {
            console.error("Error registering user:", err);
            setError("An error occurred. Please try again.");
        } finally {
            if (isLoading) {
                setIsLoading(false);
            }
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 p-4">
            <form onSubmit={handleSubmit} className="bg-[#1c1c1c]/50 p-8 rounded-xl shadow-xl w-full max-w-lg flex flex-col gap-6">
                <h2 className="text-3xl font-bold text-white text-center mb-4">
                    Register to Start Quiz
                </h2>
                {/* Inputs and Selects remain the same */}
                <input name="name" placeholder="Enter your name..." onChange={handleChange} required className="p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" />
                <input name="register_number" type="text" placeholder="Roll Number : 22BECS080" onChange={handleChange} required className="p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" />
                <div className="flex sm:flex-row flex-col gap-4 md:gap-3">
                    <select name="year" value={form.year} onChange={handleChange} className="flex-1 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" >
                        <option value="1">First Year</option>
                        <option value="2">Second Year</option>
                    </select>
                    <select name="section" value={form.section} onChange={handleChange} className="flex-1 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-black" >
                        <option value="A">A Section</option>
                        <option value="B">B Section</option>
                        <option value="C">C Section</option>
                    </select>
                </div>
                <input name="department" value="CSE" disabled className="p-3 rounded-md bg-white text-black cursor-not-allowed" />

                {/* Display error message if it exists */}
                {error && (
                    <p className="text-red-500 text-center font-semibold ">
                        {error}
                    </p>
                )}

                <button type="submit" disabled={isLoading} className="mt-4 bg-yellow-400 text-black font-bold py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition disabled:bg-gray-400">
                    {isLoading ? "Verifying..." : "Register & Start Quiz"}
                </button>
            </form>
        </div>
    );
};

export default Register;