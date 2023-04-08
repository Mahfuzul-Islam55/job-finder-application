import { changeJob } from "@/redux/JobSlice";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { useRouter } from "next/router";
import React, { useState } from "react";

const editJob = () => {
  const { editJob } = useAppSelector((state) => state.job);
  const [job, setJob] = useState({
    title: editJob?.title,
    type: editJob?.type,
    salary: editJob?.salary,
    deadline: editJob?.deadline,
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setJob({ ...job, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(changeJob({ id: editJob?.id as number, data: job }));
    router.push("/");
  };
  return (
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8">
      <div className="lg:pl-[14rem] mt-[5.8125rem]">
        <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
          <h1 className="mb-10 text-center lws-section-title">Edit Job</h1>

          <div className="max-w-3xl mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="fieldContainer">
                <label
                  htmlFor="lws-JobTitle"
                  className="text-sm font-medium text-slate-300"
                >
                  Job Title
                </label>
                <select
                  id="lws-JobTitle"
                  name="title"
                  required
                  onChange={handleChange}
                  value={job.title}
                >
                  {/* <option hidden>Select Job</option> */}
                  <option>Software Engineer</option>
                  <option>Software Developer</option>
                  <option>Full Stack Developer</option>
                  <option>MERN Stack Developer</option>
                  <option>DevOps Engineer</option>
                  <option>QA Engineer</option>
                  <option>Product Manager</option>
                  <option>Social Media Manager</option>
                  <option>Senior Executive</option>
                  <option>Junior Executive</option>
                  <option>Android App Developer</option>
                  <option>IOS App Developer</option>
                  <option>Frontend Developer</option>
                  <option>Frontend Engineer</option>
                </select>
              </div>

              <div className="fieldContainer">
                <label htmlFor="lws-JobType">Job Type</label>
                <select
                  id="lws-JobType"
                  name="type"
                  required
                  onChange={handleChange}
                  value={job.type}
                >
                  {/* <option value={job.type} hidden selected>
                    Select Job Type
                  </option> */}
                  <option>Full Time</option>
                  <option>Internship</option>
                  <option>Remote</option>
                </select>
              </div>

              <div className="fieldContainer">
                <label htmlFor="lws-JobSalary">Salary</label>
                <div className="flex border rounded-md shadow-sm border-slate-600">
                  <span className="input-tag">BDT</span>
                  <input
                    type="number"
                    name="salary"
                    id="lws-JobSalary"
                    required
                    className="!rounded-l-none !border-0"
                    placeholder="20,00,000"
                    onChange={handleChange}
                    value={job.salary}
                  />
                </div>
              </div>

              <div className="fieldContainer">
                <label htmlFor="lws-JobDeadline">Deadline</label>
                {job.deadline !== "" ? (
                  <input
                    type="date"
                    name="deadline"
                    id="lws-JobDeadline"
                    required
                    onChange={handleChange}
                    value={job.deadline}
                    defaultValue={job.deadline}
                  />
                ) : (
                  <input
                    type="date"
                    name="deadline"
                    id="lws-JobDeadline"
                    required
                    onChange={handleChange}
                    value={job.deadline}
                  />
                )}
                {/* <input
                  type="date"
                  name="deadline"
                  id="lws-JobDeadline"
                  required
                  onChange={handleChange}
                  value={job.deadline}
                  
                /> */}
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  id="lws-submit"
                  className="cursor-pointer btn btn-primary w-fit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
export default editJob;
