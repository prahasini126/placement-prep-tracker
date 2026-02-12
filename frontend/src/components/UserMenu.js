import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const name = localStorage.getItem("name") || "User";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="relative">

      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-3 py-2 rounded-xl transition"
      >
        <img
          src={`https://ui-avatars.com/api/?name=${name}&background=2563eb&color=fff`}
          alt="profile"
          className="w-10 h-10 rounded-full shadow-md"
        />

        <span className="text-sm font-semibold text-gray-200">
          {name}
        </span>
      </div>

      {open && (
        <div className="
            absolute right-0 top-14
            w-52
            backdrop-blur-xl
            bg-[#020617]
            border border-white/10
            rounded-xl
            shadow-2xl
            z-[9999]
        ">

          <button
            onClick={() => navigate("/")}
            className="block w-full text-left px-5 py-3 hover:bg-white/10 rounded-t-xl"
          >
            Dashboard
          </button>

          <button
            onClick={logout}
            className="block w-full text-left px-5 py-3 hover:bg-white/10 text-red-400 rounded-b-xl"
          >
            Logout
          </button>

        </div>
      )}

    </div>
  );
}
