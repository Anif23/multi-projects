import { useState } from "react";
import api from "../../api/client";
import { useNavigate, useLocation } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from;

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.post("/auth/register", formData);

            if (res.data.success) {
                navigate("/login", {
                    state: { from: redirectTo },
                });
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-indigo-600 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                <h2 className="text-2xl font-bold text-center mb-2">
                    Create Account 📝
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    Register to continue
                </p>

                {error && (
                    <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-center text-gray-500 mt-6">
                    You already have an account?{" "}
                    <a href="/login" className="text-blue-500 cursor-pointer hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}