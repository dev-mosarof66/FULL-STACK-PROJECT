import React, { useEffect, useState } from "react";
import axiosInstance from "../hooks/axiosInstance";
const Profile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get("/profile", {
          withCredentials: true,
        });
        console.log(res);
        setUser(res.data.user);
      } catch (error) {
        console.log(error.response);
      }
    };
    getUser();
  }, []);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center space-y-3">
      {user ? (
        <div className="w-[60%] h-[200px] flex flex-col items-center  border border-white/20">
          <h1 className="w-fit pt-2 text-xl font-semibold border-b border-white text-center">
            Profile
          </h1>
          <div className="w-full h-full flex items-center justify-around">
            <div className="w-[30%] h-full flex items-center justify-center">
              <div className="size-20 rounded-full bg-gray-500"></div>
            </div>
            <div className="w-[65%] h-full  py-2 space-y-1">
              <h1 className="text-xl font-semibold">Md. Mosarof Hossain</h1>
              <p className="text-lg">Content Writter</p>
              <p className="text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolores fugit eos necessitatibus fugiat fuga quas, autem unde
                repellendus! Nobis veniam ipsum
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[60%] h-[200px] flex flex-col items-center  border border-white/20">
          <h1 className="w-fit pt-2 text-xl font-semibold border-b border-white text-center">
            Profile
          </h1>
          <div className="w-full h-full animate-pulse flex items-center justify-around">
            <div className="w-[30%] h-full flex items-center justify-center">
              <div className="size-20 rounded-full bg-gray-500 border border-green-700" />
            </div>
            <div className="w-[65%] h-full  py-3 space-y-2">
              <h1 className="text-xl font-semibold h-8 rounded-lg w-[90%] bg-gray-600" />

              <p className="text-xl font-semibold h-7 rounded-lg w-[90%] bg-gray-600" />
              <p className="text-xl font-semibold h-16 rounded-lg w-[90%] bg-gray-600" />
            </div>
          </div>
        </div>
      )}
      {/* skeleton  */}
    </div>
  );
};

export default Profile;
