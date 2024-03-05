import { motion } from "framer-motion";
import Header from "../../components/Header";
import { useAuth } from "../../context/AppContext";
import { Warning } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { languageChange } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={`${languageChange ? "fade-out" : "fade-in"}`}>
      <Header />
      <div className="bg-gradient-to-br from-gray-300 to-[#57606f] w-screen h-screen flex flex-col justify-center items-center ">
        <motion.div
          className="w-full max-w-[600px]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
            scale: {
              type: "spring",
              damping: 10,
              stiffness: 100,
              restDelta: 0.001,
            },
          }}
        >
          <div className="lg:w-full w-10/12 lg:mx-0 mx-auto lg:max-w-[600px] h-[500px] flex flex-col items-center space-y-8 border-4 bg-white lg:px-16 px-6 py-8 rounded-lg login-container animate-[fadeIn_1s_ease-in-out]">
            <Warning size={100} color="red" />
            <div className="flex flex-col items-center w-10/12 gap-8 justify-center">
              <h1 className="text-6xl font-bold">404</h1>
              <h2 className="text-2xl text-center">{t("notFound")}</h2>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                {t("goBack")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
