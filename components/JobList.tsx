import React, { useEffect } from "react";
import Job from "./Job";
import JobListHeader from "./JobListHeader";
import { useAppDispatch, useAppSelector } from "@/redux/Store";
import { fetchAllJob } from "@/redux/JobSlice";
import { IJobType } from "@/redux/JobType";

const JobList = () => {
  const dispatch = useAppDispatch();
  const { allJob, isLoading, isError, error } = useAppSelector(
    (state) => state.job
  );
  useEffect(() => {
    dispatch(fetchAllJob());
  }, [dispatch]);

  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  else if (!isLoading && isError) content = <p>Something is wrong.</p>;
  else if (!isLoading && !isError && allJob.length === 0)
    content = <p>Job is empty</p>;
  else if (!isLoading && !isError && allJob.length > 0) {
    content = allJob.map((job: IJobType) => {
      return <Job job={job} />;
    });
  }
  return (
    <div className="lg:pl-[14rem]  mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <JobListHeader />
        {content}
      </main>
    </div>
  );
};

export default JobList;
