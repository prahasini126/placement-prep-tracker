import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const registerUser = async () => {

    if(!name || !email || !password){
      alert("Fill all fields");
      return;
    }

    try{

      await axios.post("/register",{
        name,
        email,
        password
      });

      alert("Registered successfully!");
      navigate("/login");

    }catch{
      alert("User already exists");
    }
  };

  return(
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

        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
          Create Account
        </h2>

        <input
          placeholder="Name"
          className="w-full p-3 mb-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={registerUser}
          className="w-full bg-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
