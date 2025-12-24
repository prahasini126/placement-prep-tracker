import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProgress() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

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
     await axios.post("http://127.0.0.1:5000/add-progress", {
  email,
  category,
  topic: topic.trim().toLowerCase(),
  time_spent: Number(timeSpent),
  confidence: Number(confidence)
});



      // 🔑 THIS LINE MAKES DASHBOARD UPDATE
      localStorage.setItem("refreshDashboard", "true");

      navigate("/"); // go back to dashboard
    } catch (err) {
      alert("Error saving progress");
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-6">
        Add Daily Progress
      </h1>

      <div className="space-y-4">
        <select
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>DSA</option>
          <option>Core</option>
          <option>Aptitude</option>
        </select>

        <input
          placeholder="Topic (e.g. Dynamic Programming)"
          className="w-full border p-2 rounded"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <input
          placeholder="Time Spent (minutes)"
          className="w-full border p-2 rounded"
          value={timeSpent}
          onChange={(e) => setTimeSpent(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={confidence}
          onChange={(e) => setConfidence(e.target.value)}
        >
          <option value={1}>Confidence 1 (Very Weak)</option>
          <option value={2}>Confidence 2 (Weak)</option>
          <option value={3}>Confidence 3 (Average)</option>
          <option value={4}>Confidence 4 (Good)</option>
          <option value={5}>Confidence 5 (Strong)</option>
        </select>

        <button
          onClick={saveProgress}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Progress
        </button>
      </div>
    </div>
  );
}
