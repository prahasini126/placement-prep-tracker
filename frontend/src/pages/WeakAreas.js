import { useEffect, useState } from "react";
import axios from "../utils/axios";

export default function WeakAreas() {

  const [weakAreas, setWeakAreas] = useState([]);

  useEffect(() => {
    fetchWeakAreas();
  }, []);

  const fetchWeakAreas = async () => {
    const res = await axios.get("/weak-areas");
    setWeakAreas(res.data);
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Weak Areas
      </h1>

      {weakAreas.length === 0 ? (

        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-8">
          <p className="text-green-600 font-semibold">
            No weak areas. Great job.
          </p>
        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">
          {weakAreas.map((w, i) => (

            <div
              key={i}
              className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-6"
            >
              <p className="font-bold text-lg capitalize text-gray-800 dark:text-gray-100">
                {w.topic}
              </p>

              <p className="text-gray-500 dark:text-gray-300">
                {w.category}
              </p>

              <span className="inline-block mt-3 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 px-3 py-1 rounded-full text-sm font-semibold">
                Confidence {w.confidence}
              </span>

            </div>

          ))}
        </div>
      )}
    </div>
  );
}
