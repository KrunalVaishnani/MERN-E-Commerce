import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        if (auth?.token) {
          const res = await axios.get("http://localhost:8080/api/v1/auth/admin-auth"
            // headers: {
            //   Authorization: `Bearer ${auth.token}`
            // }
          );
          setIsAdmin(res.data.ok);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin :", error);
        setIsAdmin(false);
      }
    };
    authCheck();
  }, [auth?.token]);

  return isAdmin ? <Outlet /> : <Spinner />;
}
