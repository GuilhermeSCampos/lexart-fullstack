import { DeviceMobile, List, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AppContext";

const Sidebar = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="border-r-2 w-[10%] h-full border-stone-500 pt-4 flex flex-col text-wrap ">
      <h2 className="break-words">Hi, {username}</h2>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <div
            className="flex items-center cursor-pointer mt-6"
            onClick={() => navigate("/dashboard")}
          >
            <List size={18} />
            <h2 className="text-base p-2 ">Listing</h2>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/dashboard/register")}
          >
            <DeviceMobile size={18} />
            <h2 className="text-base p-2 ">Register phone</h2>
          </div>
        </div>

        <div
          className="flex items-center cursor-pointer"
          onClick={() => logout()}
        >
          <SignOut size={18} />
          <h2 className="text-base p-2">Logout</h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
