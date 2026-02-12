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

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("userEmail", res.data.email);

      navigate("/");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login failed. Check email/password."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
        flex items-center justify-center min-h-screen
        bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a]
        text-white
    ">

      <div className="
          backdrop-blur-xl
          bg-white/5
          border border-white/10
          shadow-2xl
          p-10
          rounded-2xl
          w-96
      ">

        <h2 className="text-3xl font-bold mb-2 text-center text-blue-500">
          PrepSense
        </h2>

        <p className="text-center text-gray-400 mb-6">
          Welcome back 👋
        </p>

        <input
          placeholder="Email"
          className="
            w-full p-3 mb-4
            rounded-xl
            bg-white/10
            border border-white/10
            text-white
            placeholder-gray-400
            focus:ring-2 focus:ring-blue-500
            outline-none
          "
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="
            w-full p-3 mb-6
            rounded-xl
            bg-white/10
            border border-white/10
            text-white
            placeholder-gray-400
            focus:ring-2 focus:ring-blue-500
            outline-none
          "
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={loginUser}
          disabled={loading}
          className="
            w-full
            bg-blue-600
            py-3
            rounded-xl
            font-semibold
            hover:bg-blue-700
            transition
            disabled:opacity-50
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm mt-5 text-center text-gray-400">
          New user?{" "}
          <Link to="/register" className="text-blue-500 font-semibold hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
