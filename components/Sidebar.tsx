import { fetchAllJob } from "@/redux/JobSlice";
import { useAppDispatch } from "@/redux/Store";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleClick = (type?: string) => {
    dispatch(fetchAllJob(type));
  };
  const handleAllJob = () => {
    dispatch(fetchAllJob());
    if (router.route !== "/") router.push("/");
  };
  return (
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <li>
            <p
              onClick={handleAllJob}
              className="main-menu menu-active"
              id="lws-alljobs-menu"
            >
              <i className="fa-solid fa-briefcase"> </i>
              <span> All Available Jobs</span>
            </p>
            <ul className="space-y-6 lg:space-y-2 ">
              <li onClick={() => handleClick("Internship")}>
                <p className="sub-menu" id="lws-internship-menu">
                  <i className="fa-solid fa-stop !text-[#FF5757]"></i>
                  Internship
                </p>
              </li>
              <li onClick={() => handleClick("Full Time")}>
                <p className="sub-menu" id="lws-fulltime-menu">
                  <i className="fa-solid fa-stop !text-[#FF8A00]"> </i>
                  Full Time
                </p>
              </li>
              <li onClick={() => handleClick("Remote")}>
                <p className="sub-menu" id="lws-remote-menu">
                  <i className="fa-solid fa-stop !text-[#56E5C4]"></i>
                  Remote
                </p>
              </li>
            </ul>
          </li>
          <li>
            <Link
              href="/CreateJobPage"
              className="main-menu"
              id="lws-addJob-menu"
            >
              <i className="fa-solid fa-file-circle-plus"></i>
              <span>Add NewJob</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
