import React, { useState } from "react";
import axiosInstance from '../hooks/axiosInstance'

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [response, setResponse] = useState({});

  //handle login

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const { username, password } = input;
      if (!username || !password) return alert("Please fill all the fields");
      const res = await axiosInstance.get("/login", {
        params: {
          username,
          password,
        },
      });
      setResponse(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setInput({ username: "", password: "" });
    }
  };
  console.log(response);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[60%] bg-base-200 shadow-lg shadow-black/50 border border-white/20 px-4 py-6 space-y-4">
        <div className="w-full flex items-center">
          <input
            onChange={(e) => setInput({ ...input, username: e.target.value })}
            className="w-full outline-none"
            type="text"
            placeholder="username"
          />
        </div>
        <div className="w-full flex items-center">
          <input
            onChange={(e) => setInput({ ...input, password: e.target.value })}
            className="w-full outline-none"
            type="password"
            placeholder="password"
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <button onClick={handleLogin} className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
      <div>
        {response && (
          <div>
            <h1>{response.message}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
