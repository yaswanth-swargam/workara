import React from "react";
import { MdLocationOn } from "react-icons/md";
import Button from "./Button";
import { BiSave } from "react-icons/bi";
import api from "../api/axios";
import Toast from "./Toast";

export default function JobCard({ job ,showToast}) {
  const { id, job_url, title, company, location } = job ?? {};

  const handleApply = () => {
    if (!job_url) return;
    window.open(job_url, "_blank", "noopener,noreferrer");
  };

  const handleSave = async () => {
    try {
      await api.post(`/saved-jobs/${id}`);
      console.log("Saved successfully");
      showToast("Job saved succesfully!")
    } catch (e) {
      console.log(e.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-300 bg-transparent p-5 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-gray-900">
            {title || "Untitled role"}
          </h3>
          <p className="mt-1 truncate text-sm text-gray-600">
            {company || "Company not provided"}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="h-10 w-10 flex items-center justify-center rounded-lg border bg-white hover:bg-gray-50"
        >
          <BiSave className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <MdLocationOn />
          <span>{location || "Location not provided"}</span>
        </div>

        <Button onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
}