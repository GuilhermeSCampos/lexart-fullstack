import "./style.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AppContext";
import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import ReactLoading from "react-loading";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { login, languageChange } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameWarning, setUsernameWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleLogin = async () => {
    if (username.length < 3) {
      setUsernameWarning(true);
      return true;
    } else {
      setUsernameWarning(false);
    }
    if (password.length < 6) {
      setPasswordWarning(true);
      return true;
    }
    if (username.length > 2 && password.length > 5) {
      setUsernameWarning(false);
      setPasswordWarning(false);
      setLoading(true);
      const auth = await login(username, password);
      if (auth) {
        navigate("/dashboard");
      } else {
        toast.error("Invalid username or password!");
      }
    }
    setLoading(false);
    setUsername("");
    setPassword("");
  };

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
          <div className="lg:w-full w-10/12 lg:mx-0 mx-auto lg:max-w-[600px] h-[500px] space-y-8 border-4 bg-white lg:px-16 px-6 py-8 rounded-lg login-container animate-[fadeIn_1s_ease-in-out]">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-black">{t("welcome")}</h1>
            </div>
            <div className="lg:w-10/12  mx-auto flex-col flex gap-8">
              <div>
                <h1 className="text-2xl mb-2">{t("username")}</h1>
                <input
                  placeholder={t("usernamePlaceholder")}
                  className="border-4 border-stone-300 w-full h-12 rounded-md px-2 pr-16"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {usernameWarning && (
                  <span className="text-sm ml-4 text-red-400 animate-[fadeIn_1s_ease-in-out]">
                    {t("usernameWarning")}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl mb-2">{t("password")}</h1>
                <div className="flex flex-col">
                  <input
                    id="password"
                    placeholder={t("passwordPlaceholder")}
                    type={showPassword ? "text" : "password"}
                    className="border-4 border-stone-300 w-full h-12 rounded-md px-2 pr-16"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!showPassword ? (
                    <Eye
                      size={24}
                      className="flex self-end absolute mt-3 mr-3 cursor-pointer z-10"
                      onClick={() => setShowPassword(true)}
                    />
                  ) : (
                    <EyeSlash
                      size={24}
                      className="flex self-end absolute mt-3 mr-3 cursor-pointer z-10"
                      onClick={() => setShowPassword(false)}
                    />
                  )}
                </div>
                {passwordWarning && (
                  <span className="text-sm ml-4 text-red-400 animate-[fadeIn_1s_ease-in-out]">
                    {t("passwordWarning")}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleLogin()}
                className="w-5/12 bg-stone-500 text-white px-6 py-2 text-xl rounded-xl
             mx-auto hover:bg-stone-600 transition duration-300 ease-in-out active:ring active:border-slate-800"
                disabled={loading}
              >
                {loading ? (
                  <ReactLoading
                    type="spin"
                    width={window.innerWidth < 1024 ? "40%" : "25%"}
                    height={"25%"}
                    className="mx-auto animate-[fadeIn_1s_ease-in-out]"
                  />
                ) : (
                  t("login")
                )}
              </button>
            </div>
            <div className="text-center text-lg text-black">
              {t("dontHaveAccount")}{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                {t("signup")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default Login;
