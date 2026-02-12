import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function AddProgress() {

  const navigate = useNavigate();

  const [category, setCategory] = useState("DSA");
  const [topic, setTopic] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [confidence, setConfidence] = useState(3);

  const saveProgress = async () => {
    if (!topic || !timeSpent) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("/add-progress", {
        category,
        topic: topic.trim().toLowerCase(),
        time_spent: Number(timeSpent),
        confidence: Number(confidence),
      });

      localStorage.setItem("refreshDashboard", "true");
      navigate("/");

    } catch (err) {
      alert("Error saving progress");
    }
  };

  return (
    <div className="max-w-xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-8">

      <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        Add Daily Progress
      </h1>

      <p className="text-gray-500 dark:text-gray-300 mb-6">
        Track what you studied today
      </p>

      <div className="space-y-5">

        <select
          className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>DSA</option>
          <option>Core</option>
          <option>Aptitude</option>
        </select>

        <input
          placeholder="Topic"
          className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <input
          type="number"
          placeholder="Time Spent (minutes)"
          className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
          value={timeSpent}
          onChange={(e) => setTimeSpent(e.target.value)}
        />

        <select
          className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
          value={confidence}
          onChange={(e) => setConfidence(e.target.value)}
        >
          <option value={1}>1 – Very Weak</option>
          <option value={2}>2 – Weak</option>
          <option value={3}>3 – Average</option>
          <option value={4}>4 – Good</option>
          <option value={5}>5 – Strong</option>
        </select>

        <button
          onClick={saveProgress}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Save Progress
        </button>

      </div>
    </div>
  );
}
