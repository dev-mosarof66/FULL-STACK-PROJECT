import React, { useState } from "react";
import axiosInstance from "../axio.js";

const Protected = () => {
  const [message, setMessage] = useState("");

  const verifyAccess = async () => {
    try {
      const response = await axiosInstance.get("/protected");
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Access denied");
    }
  };

  return (
    <div>
      <h2>Protected Route</h2>
      <button onClick={verifyAccess}>Verify Access</button>
      <p>{message}</p>
    </div>
  );
};

export default Protected;
