import { useEffect, useState } from "react";
import { useAuth } from "../../context/AppContext";
import Sidebar from "../../components/Sidebar";
import PhoneList from "../../components/PhoneList";
import { Route, Routes } from "react-router-dom";
import RegisterPhone from "../../components/RegisterPhone";

type props = {
  step: string;
};

const Dashboard = ({ step }: props) => {
  const { validateToken } = useAuth();

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <div className="bg-[#666666]/50 w-screen h-screen flex flex-col justify-center items-center">
      <div className="max-w-screen-xg w-11/12 h-[800px]  border-2 bg-white px-8 py-8 rounded-lg animate-[fadeIn_1s_ease-in-out] flex ">
        <Sidebar />
        {step === "list" ? (
          <PhoneList />
        ) : step === "register" ? (
          <RegisterPhone />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
