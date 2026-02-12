import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post("/login", {
        email,
        password
      });

      // ✅ STORE EVERYTHING (VERY IMPORTANT)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("userEmail", res.data.email); // ⭐ THIS FIXES YOUR BUG

      navigate("/");

    } catch (err) {

      console.log(err.response?.data || err);

      alert(
        err.response?.data?.message ||
        "Login failed. Check email/password."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-96 border border-white/40">

        <h2 className="text-3xl font-bold mb-2 text-center text-blue-600">
          PrepSense
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Welcome back 👋
        </p>

        <input
          placeholder="Email"
          className="w-full border border-gray-200 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-200 p-3 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={loginUser}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm mt-5 text-center">
          New user?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
