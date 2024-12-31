import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (!token) {
      console.log("Token is null");
      navigate("/captain-login");
    }
  }, [token]);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.log(error);
      localStorage.removeItem("token");
      navigate("/captain-login");
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};

export default CaptainProtectWrapper;
