import { useEffect, useState } from "react";
import api from "../api/axios";
import SavedJobsCard from "./SavedJobsCard";
import Toast from './Toast'

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast,setToast]=useState({
    show:false,
    message: "",
    type: "success"
  })

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setError("");
        const res = await api.get("/saved-jobs");
        setSavedJobs(res.data.savedJobs);
      } catch (e) {
        setError(e.response?.data?.message || "Failed to load saved jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleRemoveFromUI = (id) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const showToast=(message,type="success")=>{
    setToast({show:true,message,type});

    setTimeout(()=>{
      setToast({show:false,message:"",type:"success"});
    },1500)
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Saved Jobs</h2>

      {loading && <p>Loading saved jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && savedJobs.length === 0 && (
        <p>You haven’t saved any jobs yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {savedJobs.map((job) => (
          <SavedJobsCard
            key={job.id}
            job={job}
            onRemove={handleRemoveFromUI}
            showToast={showToast}
          />
        ))}
      </div>
      {toast.show && (
  <Toast message={toast.message} type={toast.type} />
)}
    </div>
  );
}