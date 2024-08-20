import React, { useEffect, useState } from "react";

import StoreLink from "../components/StoreLink";
import Table from "../components/Table";
import { CiLogout } from "react-icons/ci";
import { SiMicrosoftexcel } from "react-icons/si";
import Model from "../widgets/Model";
import StatusContainer from "../components/StatusContainer";
import { useDispatch, useSelector } from "react-redux";
import { addToStore, resetStore } from "../features/storeSlice";
import {
  useGetSearcgItemsQuery,
  useGetStatusQuery,
  useGetStoreByLocQuery,
} from "../services/store";
import { Navigate, redirect } from "react-router-dom";

import { logout } from "../services/api";
import { resetUser, setStatus } from "../features/NavSlice";
import Sidebar from "../components/Sidebar";
import Loading from "../widgets/Loading";

export default function Dashboard() {
  const store = useSelector((state) => state.items);
  const { user, rights, status } = useSelector((state) => state.nav);

  const dispatch = useDispatch();
  // const {
  //   data: session,
  //   error: sessionError,
  //   isLoading: sessionIsLoading,
  // } = useGetApiSessionQuery();

  const { location, skip, search, filterByPm, filterByCritical, toggleState } =
    useSelector((state) => state.nav);
  // const [logout, { isLoading: logoutIsloading, error: logoutError }] =
  //   useLogoutMutation();
  const [fetchStoreData, setFetchStoreData] = useState(false); // New state to control when the query is triggered
  const [fetchSearchData, setFetchSearchData] = useState(false); // New state to control when the query is triggered

  const { data, isLoading, error } = useGetStoreByLocQuery(
    { store: location, skip },
    { skip: !fetchStoreData } // Query will only run when fetchStoreData is true
  );

  const {
    data: searchData,
    isLoading: searchIsLoading,
    error: searchError,
  } = useGetSearcgItemsQuery(
    { search, filterByPm, filterByCritical },
    { skip: !fetchSearchData }
  );
  const {
    data: statusData,
    isLoading: statusIsLoading,
    error: statusError,
  } = useGetStatusQuery();

  const [toggle, settoggle] = useState(false);
  function handleCancel(e) {
    e.preventDefault();
    return settoggle(false);
  }
  function handleToggle(e) {
    e.preventDefault();
    return settoggle(true);
  }
  function handleFetchStoreData() {
    setFetchStoreData(true); // Set to true when you want to trigger the query
  }
  function handleFetchSearchData() {
    setFetchSearchData(true); // Set to true when you want to trigger the query
  }
  async function handleLogout(e) {
    e.preventDefault();
    try {
      // Trigger the logout mutation

      logout();
      dispatch(resetUser());

      <Navigate to="/" />;
    } catch (error) {
      <Navigate to="/" />;
      // console.log(error);
    }
  }

  useEffect(() => {
    // console.log(statusData);
    let status = statusData?.data[0];

    dispatch(setStatus(status));

    if (!search && !filterByPm && !filterByCritical && fetchStoreData) {
      if (data) {
        dispatch(resetStore());
        dispatch(addToStore(data?.data));
      }
    } else if (searchData?.status === "OK") {
      dispatch(resetStore());
      dispatch(addToStore(searchData?.data));
    } else if (error) {
      redirect("/");
    }
  }, [
    data,
    searchData,
    dispatch,
    search,
    error,
    fetchStoreData,
    filterByPm,
    filterByCritical,
    user,
    statusData,
    toggleState,
  ]);
  if (!user) return <Navigate to="/" />;
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <Sidebar
        name={user}
        handleLogout={handleLogout}
        handleToggle={handleToggle}
      />

      <div className="flex-1 p-8">
        <StatusContainer />

        {/* Main Content */}

        <StoreLink
          handleFetchSearchData={handleFetchSearchData}
          location={location}
          skip={skip}
          searchData={search}
          handleFetchStoreData={handleFetchStoreData}
          filterPm={filterByPm}
          filterCritical={filterByCritical}
          total={
            location === "all"
              ? status.total
              : location === "s1"
              ? status.s1
              : location === "s2" && status.s2
          }
          searchCount={searchData?.data.length}
        />
        {store.length ? (
          <Table handleToggle={handleToggle} rights={rights} />
        ) : (
          <Loading />
        )}
        {/* <Table handleToggle={handleToggle} rights={rights} /> */}
        {rights && rights.includes("1110") ? (
          <Model
            toggle={toggle}
            handleCancel={handleCancel}
            settoggle={settoggle}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
