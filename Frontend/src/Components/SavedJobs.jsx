import { useEffect, useState } from "react";
import api from "../api/axios";
import JobCard from "../Components/JobCard.jsx";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setError("");
        const res = await api.get("/saved-jobs"); // 🔒 JWT protected
        setSavedJobs(res.data.savedJobs);
      } catch (e) {
        // backend may return 404 if no saved jobs
        if (e.response?.status === 404) {
          setSavedJobs([]);
        } else {
          setError("Failed to load saved jobs");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []); // 👈 runs ONCE when page loads

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Saved Jobs ❤️</h2>

      {loading && <p>Loading saved jobs...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && savedJobs.length === 0 && (
        <p>You haven’t saved any jobs yet.</p>
      )}

      <div className="grid gap-4">
        {savedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}