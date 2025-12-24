import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [progress, setProgress] = useState([]);
  const [weakAreas, setWeakAreas] = useState([]);
  const [focusToday, setFocusToday] = useState("");

  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchData();

    const refresh = localStorage.getItem("refreshDashboard");
    if (refresh === "true") {
      fetchData();
      localStorage.removeItem("refreshDashboard");
    }
  }, []);

  const fetchData = async () => {
    try {
      const progressRes = await axios.post(
        "http://127.0.0.1:5000/get-progress",
        { email }
      );

      const weakRes = await axios.post(
        "http://127.0.0.1:5000/weak-areas",
        { email }
      );

      const focusRes = await axios.post(
        "http://127.0.0.1:5000/today-focus",
        { email }
      );

      setProgress(progressRes.data);
      setWeakAreas(weakRes.data);
      setFocusToday(focusRes.data.focus);
    } catch (err) {
      console.log("Error fetching dashboard data");
    }
  };

  // Focus Score
 const strongCount = progress.filter(
  (p) => Number(p.confidence) >= 3
).length;

const focusScore =
  progress.length > 0
    ? Math.round((strongCount / progress.length) * 100)
    : 0;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">
        Based on your recent activity
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Focus Score */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-500">Focus Score</p>
          <h2 className="text-3xl font-bold text-blue-600">
            {focusScore || 0}%
          </h2>
        </div>

        {/* Weak Areas — SHOW ALL */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-500 mb-2">Weak Areas</p>

          {weakAreas.length === 0 ? (
            <p className="text-green-600 font-medium">
              No weak areas 🎉
            </p>
          ) : (
            weakAreas.map((w, i) => (
              <p key={i} className="text-red-600 font-medium">
                {w.category} – {w.topic}
              </p>
            ))
          )}
        </div>

        {/* Today's Focus */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-500 mb-2">Today's Focus</p>

          <p className="text-lg font-semibold text-purple-600">
            {focusToday || "Analyzing your data..."}
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Suggested based on your recent preparation
          </p>
        </div>

        {/* Recommendation */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-500 mb-2">Recommendation</p>

          {weakAreas.length > 0 ? (
            <p className="font-medium">
              Revise{" "}
              <span className="text-red-600">
                {weakAreas[0].topic}
              </span>{" "}
              today
            </p>
          ) : (
            <p className="font-medium">
              Keep going, you're doing great 💪
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
