import { useEffect, useState } from "react";
import axios from "../utils/axios";

export default function Dashboard() {

  const [progress, setProgress] = useState([]);
  const [weakAreas, setWeakAreas] = useState([]);
  const [focusToday, setFocusToday] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const progressRes = await axios.get("/get-progress");
      const weakRes = await axios.get("/weak-areas");
      const focusRes = await axios.get("/today-focus");

      setProgress(progressRes.data);
      setWeakAreas(weakRes.data);
      setFocusToday(focusRes.data.focus);

    } catch (err) {
      console.log("Dashboard error:", err.response?.data || err);
    }
  };

  const strongCount = progress.filter(
    (p) => Number(p.confidence) >= 3
  ).length;

  const focusScore =
    progress.length > 0
      ? Math.round((strongCount / progress.length) * 100)
      : 0;

  return (
    <div className="space-y-8">

      {/* Welcome Card */}
      <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Welcome back, {localStorage.getItem("name")}
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mt-1">
          Here is your preparation overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Focus Score */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-6">
          <p className="text-gray-500 dark:text-gray-300">Focus Score</p>
          <h2 className="text-4xl font-bold text-blue-600">
            {focusScore}%
          </h2>
        </div>

        {/* Weak Areas */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-6">
          <p className="text-gray-500 dark:text-gray-300 mb-2">Weak Areas</p>

          {weakAreas.length === 0 ? (
            <p className="text-green-600 font-semibold">
              No weak areas
            </p>
          ) : (
            weakAreas.map((w, i) => (
              <p key={i} className="text-red-600 font-medium capitalize">
                {w.category} – {w.topic}
              </p>
            ))
          )}
        </div>

        {/* Today Focus */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-6">
          <p className="text-gray-500 dark:text-gray-300 mb-2">
            Today's Focus
          </p>

          <p className="text-lg font-bold text-purple-600">
            {focusToday || "You're doing great!"}
          </p>
        </div>

        {/* Recommendation */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-6">
          <p className="text-gray-500 dark:text-gray-300 mb-2">
            Recommendation
          </p>

          {weakAreas.length > 0 ? (
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              Revise{" "}
              <span className="text-red-600">
                {weakAreas[0].topic}
              </span>
            </p>
          ) : (
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              Keep going, you are on track.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
