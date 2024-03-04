import { DeviceMobile, List, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AppContext";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="border-r-2 w-[10%] h-full border-stone-500 pt-4 flex flex-col text-wrap ">
      <h2 className="break-words">
        {t("hi")}, {username}
      </h2>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <div
            className="flex items-center cursor-pointer mt-6"
            onClick={() => navigate("/dashboard")}
          >
            <List size={18} />
            <h2 className="text-base p-2 ">{t("listing")}</h2>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/dashboard/register")}
          >
            <DeviceMobile size={18} />
            <h2 className="text-base p-2 ">{t("registerPhone")}</h2>
          </div>
        </div>

        <div
          className="flex items-center cursor-pointer"
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
