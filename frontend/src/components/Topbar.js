import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";

export default function Topbar() {

  const [theme, setTheme] = useState("light");

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {

    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8">

      <h1 className="text-2xl font-bold text-blue-600">
        PrepSense
      </h1>

      <div className="flex items-center gap-5">

        {/* DARK MODE BUTTON OUTSIDE */}
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>

        <UserMenu />

      </div>

    </div>
  );
}