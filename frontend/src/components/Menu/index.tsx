import { DeviceMobile, List, SignOut } from "@phosphor-icons/react";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AppContext";

type props = {
  step: string;
};

const MenuBurguer = ({ step }: props) => {
  const [showMenu, setShowMenu] = useState(false);
  const { logout, username } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Menu
      width={"40%"}
      isOpen={showMenu}
      onStateChange={(state) => setShowMenu(state.isOpen)}
    >
      <div className="flex flex-col gap-10 px-2 ">
        <h2 className="text-xl font-bold">
          {t("hi")}, {username}
        </h2>
        <div
          className={`flex items-center mt-12 p-2 rounded-lg w-11/12 ${
            step === "list"
              ? "bg-blue-400/80 text-white shadow transition-all ease-in-out duration-300"
              : "hover:bg-blue-400/20 hover:shadow transition-all ease-in-out duration-200"
          }`}
          onClick={() => {
            setShowMenu(false);
            navigate("/dashboard");
          }}
        >
          <List size={24} />
          <h2 className="text-base px-2 py-1">{t("listing")}</h2>
        </div>
        <div
          className={`flex items-center  p-2 rounded-lg w-11/12 mt-6 ${
            step === "register"
              ? "bg-blue-400/80 text-white shadow transition-all ease-in-out duration-300"
              : "hover:bg-blue-400/20 hover:shadow transition-all ease-in-out duration-200"
          }`}
          onClick={() => {
            setShowMenu(false);
            navigate("/dashboard/register");
          }}
        >
          <DeviceMobile size={24} />
          <h2 className="text-base px-2">{t("registerPhone")}</h2>
        </div>
      </div>

      <div
        className={`p-2 rounded text-gray-700 transition-all bg-gray-400 hover:bg-gray-600 active:bg-gray-800 rounded-lg w-11/12 duration-300`}
        onClick={() => logout()}
      >
        <div className="flex items-center">
          <SignOut size={18} />
          <h2 className="text-base p-2">{t("logout")}</h2>
        </div>
      </div>
    </Menu>
  );
};

export default MenuBurguer;
