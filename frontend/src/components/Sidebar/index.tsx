import { DeviceMobile, List, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AppContext";
import { useTranslation } from "react-i18next";

type props = {
  step: string;
};

const Sidebar = ({ step }: props) => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="border-r-2 w-[10%] h-full border-stone-500 pt-4 flex flex-col text-wrap transition-all">
      <h2 className="break-words">
        {t("hi")}, {username}
      </h2>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <div
            className={`flex items-center cursor-pointer mt-6 p-2 rounded-lg w-11/12 ${
              step === "list"
                ? "bg-blue-400/80 text-white shadow transition-all ease-in-out duration-300"
                : "hover:bg-blue-400/20 hover:shadow transition-all ease-in-out duration-200"
            }`}
            onClick={() => navigate("/dashboard")}
          >
            <List size={18} />
            <h2 className="text-base px-2 py-1">{t("listing")}</h2>
          </div>
          <div
            className={`flex items-center cursor-pointer p-2 rounded-lg w-11/12 ${
              step === "register"
                ? "bg-blue-400/80 text-white shadow transition-all ease-in-out duration-300"
                : "hover:bg-blue-400/20 hover:shadow transition-all ease-in-out duration-200"
            }`}
            onClick={() => navigate("/dashboard/register")}
          >
            <DeviceMobile size={18} />
            <h2 className="text-base px-2">{t("registerPhone")}</h2>
          </div>
        </div>
        <div
          className={`flex items-center cursor-pointer p-2 rounded text-gray-700 transition-all bg-gray-200 hover:bg-gray-400 active:bg-gray-500 rounded-lg w-11/12 duration-300`}
          onClick={() => logout()}
        >
          <SignOut size={18} />
          <h2 className="text-base p-2">{t("logout")}</h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
