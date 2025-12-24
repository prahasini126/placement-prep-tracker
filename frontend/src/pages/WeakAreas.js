import { useEffect, useState } from "react";
import axios from "axios";

export default function WeakAreas() {
  const [weakAreas, setWeakAreas] = useState([]);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchWeakAreas();
  }, []);

  const fetchWeakAreas = async () => {
    const res = await axios.post(
      "http://127.0.0.1:5000/weak-areas",
      { email }
    );
    setWeakAreas(res.data);
  };

  const getBorderColor = (category) => {
    if (category === "DSA") return "border-red-500";
    if (category === "Core") return "border-blue-500";
    if (category === "Aptitude") return "border-yellow-500";
    return "border-gray-300";
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Weak Areas</h1>
      <p className="text-sm text-gray-500 mb-6">
        Topics that currently need your attention
      </p>

      {weakAreas.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-green-600 font-medium">
            🎉 No weak areas right now. Keep going!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {weakAreas.map((w, i) => (
            <div
              key={i}
              className={`bg-white p-4 rounded-xl shadow-sm border-l-4 ${getBorderColor(
                w.category
              )}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">
                    {w.topic}
                  </p>
                  <p className="text-sm text-gray-500">
                    {w.category}
                  </p>
                </div>

                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                  Confidence {w.confidence}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
