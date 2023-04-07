import {
  fetchAllJob,
  filterDecrement,
  filterIncrement,
  searchAction,
} from "@/redux/JobSlice";
import { useAppDispatch } from "@/redux/Store";
import React, { useState, useEffect } from "react";

const JobListHeader = () => {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [debounced, setDebounce] = useState<string>(search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => setSearch(debounced), 1000);
    return () => clearTimeout(timer);
  }, [debounced]);

  useEffect(() => {
    if (search !== "") {
      dispatch(searchAction(search));
    } else {
      dispatch(fetchAllJob());
    }
  }, [search]);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(searchAction(search));
  };
  const handleFilter = (e: React.FormEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    if (e.currentTarget.value === "Salary (Low to High)")
      dispatch(filterIncrement());
    else if (e.currentTarget.value === "Salary (High to Low)")
      dispatch(filterDecrement());
    else dispatch(fetchAllJob());
  };
  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
      <h1 className="lws-section-title">All Available Jobs</h1>
      <div className="flex gap-4">
        <div className="search-field group flex-1">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search Job"
              className="search-input"
              id="lws-searchJob"
              onChange={handleSearch}
            />
          </form>
        </div>
        <select
          id="lws-sort"
          name="sort"
          autoComplete="sort"
          className="flex-1"
          onChange={handleFilter}
        >
          <option>Default</option>
          <option>Salary (Low to High)</option>
          <option>Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default JobListHeader;
