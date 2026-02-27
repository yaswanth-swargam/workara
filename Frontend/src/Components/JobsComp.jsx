import { useState, useEffect } from "react";
import api from "../api/axios";
import JobCard from "./JobCard";

function JobComp() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setError("");
        const res = await api.get("/jobs");
        setJobs(res.data.jobs);             
      } catch (e) {
        setError(e.response?.data?.message || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Jobs</h2>

      {loading && <p>Loading jobs...</p>}
      {error && <h4 className="text-red-500">{error}</h4>}

      {!loading && !error && jobs.length === 0 && (
        <p>No jobs found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default JobComp;