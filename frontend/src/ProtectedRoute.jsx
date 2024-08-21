import React, { useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";

import { getApiSession } from "./services/api";
import { useDispatch } from "react-redux";
import { setRights, setUser } from "./features/NavSlice";
import Loading from "./widgets/Loading";

export default function ProtectedRoute({ children }) {
  const [userData, setUserData] = useState("");
  const [userRights, setUserRights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  async function getSession() {
    try {
      const { data } = await getApiSession();

      dispatch(setUser(data.user));
      dispatch(setRights(data.rights));
      setUserData(data.user);
      setUserRights(data.rights);
    } catch (error) {
      setUserData(null);
      setUserRights([]);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getSession();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!userData) {
    return <Navigate to="/" />;
  }

  return children;
}
