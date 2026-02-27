import React from "react";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { BiSave } from "react-icons/bi";


export default function JobCard({job}) {
  // const navigate = useNavigate();
  const {job_url,title,company,location}=job;
  const handleApply = () => {
    window.open(job_url, "_blank");
  };

  return (
    <div className="rounded-lg shadow-lg bg-red-200 p-4 flex flex-col gap-4">
      
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-red-500 hover:text-bold shadow-sm">{title}</h3>

        <div className="flex items-center gap-0 text-gray-700 hover:text-blue-500 hover:shadow-sm hover:-translate-y-[1px]
        active:translate-y-0 active:shadow-sm">
          <MdLocationOn />
          <p>{location}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-800 hover:text-bold">{company}</h2>
        <div className="flex items-center gap-0 text-gray-700 hover:text-blue-500 hover:shadow-sm hover:-translate-y-[1px]
        active:translate-y-0 active:shadow-sm">
            <BiSave />
          <p>save</p>
        </div>
        <Button onClick={handleApply}>
          Apply
        </Button>
      </div>

    </div>
  );
}