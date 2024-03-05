import { useEffect } from "react";
import { useAuth } from "../../context/AppContext";
import Sidebar from "../../components/Sidebar";
import PhoneList from "../../components/PhoneList";
import RegisterPhone from "../../components/RegisterPhone";
import EditPhone from "../../components/EditPhone";
import Header from "../../components/Header";
import "../../index.css";

type props = {
  step: string;
};

const Dashboard = ({ step }: props) => {
  const { validateToken, languageChange } = useAuth();

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <div
      className={`${
        languageChange ? "fade-out" : "fade-in"
      } bg-gradient-to-br from-gray-300 to-[#57606f]`}
    >
      <Header />
      <div className="bg-[#666666]/50 w-screen h-screen flex flex-col justify-center items-center">
        <div className="max-w-screen-xg w-11/12 h-[800px]  border-2 bg-white px-4 py-8 rounded-lg animate-[fadeIn_1s_ease-in-out] flex">
          <Sidebar step={step} />
          {step === "list" ? (
            <PhoneList />
          ) : step === "register" ? (
            <RegisterPhone />
          ) : (
            step === "edit" && <EditPhone />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
