import React, { useState } from "react";
import { LuPackageSearch } from "react-icons/lu";

import { useDispatch } from "react-redux";
import { resetStore } from "../features/storeSlice";

import {
  changeLocation,
  filterByCritical,
  filterByPm,
  resetSearch,
  search,
  skipDecrement,
  skipIncrement,
} from "../features/NavSlice";

export default function StoreLink({
  handleFetchSearchData,
  location,
  skip,
  total,
  searchData,
  searchCount,
  filterCritical,
  filterPm,
  fetchSearchData,
  handleFetchStoreData,
}) {
  const dispatch = useDispatch();
  const [searchItem, setSearchItem] = useState("");
  const [pmSch, setPmSch] = useState(false);
  const [critical, setCritical] = useState(false);
  const [msg, setMsg] = useState("");

  const setStore = async (x) => {
    setSearchItem("");
    setMsg("");
    dispatch(resetSearch());
    dispatch(resetStore());

    dispatch(changeLocation(x));
    handleFetchStoreData();
  };
  const next = () => {
    dispatch(resetStore());
    dispatch(skipIncrement());
    handleFetchStoreData();
  };
  const byPm = () => {
    dispatch(resetStore());

    dispatch(filterByPm());
    handleFetchSearchData();
  };
  const bycritical = () => {
    dispatch(resetStore());

    dispatch(filterByCritical());
    handleFetchSearchData();
  };
  const prev = () => {
    dispatch(resetStore());
    dispatch(skipDecrement(total));
    handleFetchStoreData();
  };

  const searchStore = (e) => {
    e.preventDefault();

    if (!searchItem.length) return setMsg("Invalid search");

    dispatch(search(searchItem.toUpperCase()));
    handleFetchSearchData();
    setSearchItem("");
    setMsg("");
  };

  return (
    <div className="min-w-full h-20 px-4 py-6 flex justify-between items-center my-20">
      {/* store link start */}
      <div className=" flex flex-col gap-2 mb-4 ml-2">
        <ul className="flex gap-4  font-medium text-xl text-gray-900 justify-center items-center">
          <li
            onClick={() => (location !== "all" ? setStore("all") : undefined)}
            className=" cursor-pointer hover:text-gray-500 "
          >
            Entire store
          </li>
          <li
            onClick={() => (location !== "s1" ? setStore("s1") : undefined)}
            className=" cursor-pointer hover:text-gray-500 "
          >
            Store 1
          </li>
          <li
            onClick={() => (location !== "s2" ? setStore("s2") : undefined)}
            className=" cursor-pointer hover:text-gray-500 "
          >
            Store 2
          </li>
        </ul>
        <div className="flex justify-center items-center gap-2 px-3 bg-slate-400 rounded-lg">
          <input
            type="text"
            className="py-2 px-4 bg-transparent outline-none text-slate-200 placeholder:text-slate-200"
            value={searchItem}
            placeholder="serach here..."
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <button className="animate-bounce">
            <LuPackageSearch className="cursor-pointer" onClick={searchStore} />
          </button>
        </div>
      </div>

      {/* store link ends */}
      <div className="mt-4 flex flex-col gap-2 font-mono uppercase  items-end">
        <div className="my-2 flex gap-2 justify-center items-center ">
          {searchData === null && (
            <span
              className="cursor-pointer hover:scale-105  px-2 py-1 border shadow-emerald-100 shadow-md"
              onClick={skip > 9 && prev}
            >
              prev{" "}
            </span>
          )}
          <span className="lowercase font-bold  bg-slate-50 px-2">
            {searchData === null || critical || pmSch ? (
              <>
                {skip === 0 ? 10 : skip > total - 10 ? total : skip + 10} of{" "}
                {total}
              </>
            ) : (
              <>{searchCount} search found</>
            )}
          </span>
          {searchData === null && (
            <span
              onClick={skip < total - 9 ? next : ""}
              className="cursor-pointer hover:scale-105  px-2 py-1 border shadow-emerald-100 shadow-md"
            >
              next
            </span>
          )}
        </div>

        <div className="flex gap-3 justify-center items-center ">
          <span>filter by</span>
          <ul className="flex gap-4 ">
            <li>
              <button
                className="hover:scale-105  px-2 py-1 border shadow-emerald-100 shadow-md"
                onClick={byPm}
              >
                pm scheduled
              </button>
            </li>
            <li>
              <button
                className="hover:scale-105 px-2 py-1 border shadow-emerald-100 shadow-md"
                onClick={bycritical}
              >
                critical
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
