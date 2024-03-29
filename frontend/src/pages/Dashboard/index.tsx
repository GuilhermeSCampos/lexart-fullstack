import { useEffect, useState } from "react";
import { useAuth } from "../../context/AppContext";
import Sidebar from "../../components/Sidebar";
import PhoneList from "../../components/PhoneList";
import RegisterPhone from "../../components/RegisterPhone";
import EditPhone from "../../components/EditPhone";
import Header from "../../components/Header";
import "../../index.css";
import "./style.css";
import MenuBurguer from "../../components/Menu";
import ReactLoading from "react-loading";

type props = {
  step: string;
};

const Dashboard = ({ step }: props) => {
  const { validateToken, languageChange } = useAuth();
  const [validatingToken, setValidatingToken] = useState(true);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Limpando o event listener no desmontar do componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const validateUserToken = async () => {
    console.log("teste");
    await validateToken();
    setValidatingToken(false);
  };

  useEffect(() => {
    validateUserToken();
  }, []);

  return (
    <div
      className={`overflow-y-hidden ${
        languageChange ? "fade-out" : "fade-in"
      } bg-gradient-to-br from-gray-300 to-[#57606f]`}
    >
      <Header />
      {screenWidth <= 1024 && <MenuBurguer step={step} />}

      <div className="bg-[#666666]/50 w-screen h-screen flex flex-col justify-center items-center">
        <div className="max-w-screen-xg w-11/12 lg:h-[800px] h-[80%] mt-4 border-2 bg-white px-4 py-8 rounded-lg animate-[fadeIn_1s_ease-in-out] flex lg:flex-row flex-col">
          {validatingToken ? (
            <ReactLoading type={"spin"} color={"#000"} className="mx-auto" />
          ) : (
            <>
              <Sidebar step={step} />
              {step === "list" ? (
                <PhoneList />
              ) : step === "register" ? (
                <RegisterPhone />
              ) : (
                step === "edit" && <EditPhone />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
