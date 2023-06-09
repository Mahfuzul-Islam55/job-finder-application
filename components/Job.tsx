import { editJobAction, removeJob } from "@/redux/JobSlice";
import { IJobType } from "@/redux/JobType";
import { useAppDispatch } from "@/redux/Store";
import Link from "next/link";
import React from "react";

interface props {
  job: IJobType;
}
const Job = ({ job }: props) => {
  const { title, type, salary, deadline, id } = job;
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(removeJob(id));
  };
  const handleEdit = () => {
    dispatch(editJobAction(job));
  };

  let style;
  if (type === "Internship") style = "#FF5757";
  else if (type === "Full Time") style = "#FF8A00";
  else if (type === "Remote") style = "#56E5C4";

  return (
    <div className="jobs-list">
      <div className="lws-single-job">
        <div className="flex-1 min-w-0">
          <h2 className="lws-title">{title}</h2>
          <div className="job-footers">
            <div className="lws-type">
              <i
                className={`fa-solid fa-stop !text-[${style}] text-lg mr-1.5`}
              ></i>
              {type}
            </div>
            <div className="lws-salary">
              <i className="fa-solid fa-bangladeshi-taka-sign text-slate-400 text-lg mr-1.5"></i>
              BDT {salary}
            </div>
            <div className="lws-deadline">
              <i className="fa-regular fa-calendar text-slate-400 text-lg mr-1.5"></i>
              Closing on {deadline}
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="hidden sm:block">
            <Link href={`editJob/${id}`}>
              <button
                type="button"
                className="lws-edit btn btn-primary"
                onClick={handleEdit}
              >
                <i className="fa-solid fa-pen text-gray-300 -ml-1 mr-2"></i>
                Edit
              </button>
            </Link>
          </span>

          <span className="sm:ml-3">
            <button
              type="button"
              className="lws-delete btn btn-danger "
              onClick={handleDelete}
            >
              <i className="fa-solid fa-trash text-gray-300 -ml-1 mr-2"></i>
              Delete
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Job;
