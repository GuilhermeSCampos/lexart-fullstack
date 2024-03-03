import "./style.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AppContext";
import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import ReactLoading from "react-loading";

const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameWarning, setUsernameWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (username.length < 3) {
      setUsernameWarning(true);
      return true;
    }
    if (password.length < 6) {
      setPasswordWarning(true);
      return true;
    }
    if (username.length > 2 && password.length > 5) {
      setUsernameWarning(false);
      setPasswordWarning(false);
      setLoading(true);
      const auth = await register(username, password);
      if (auth) {
        navigate("/login");
      } else {
        toast.error("Username Already exists!");
      }
    }
    setLoading(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="bg-[#666666]/50 w-screen h-screen flex flex-col justify-center items-center ">
      <div className="w-full max-w-[600px] h-[500px] space-y-8 border-2 bg-white px-16 py-8 rounded-lg login-container animate-[fadeIn_1s_ease-in-out]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">Sign Up</h1>
        </div>
        <div className="w-10/12 mx-auto flex-col flex gap-8">
          <div>
            <h1 className="text-2xl mb-2">Username</h1>
            <input
              placeholder="Type your username here"
              className="border-4 w-full h-14 rounded-md px-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameWarning && (
              <span className="text-sm ml-4 text-red-400 animate-[fadeIn_1s_ease-in-out]">
                Username must have 3 or more characters.
              </span>
            )}
          </div>

          <div>
            <h1 className="text-2xl mb-2">Password</h1>
            <div className="flex flex-col">
              <input
                id="password"
                placeholder="Type  your password here"
                type={showPassword ? "text" : "password"}
                className="border-4 w-full h-12 rounded-md px-2 pr-16"
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
                Password must have 6 or more characters.
              </span>
            )}
          </div>
          <button
            onClick={() => handleRegister()}
            className="w-5/12 bg-stone-600 text-white px-6 py-2 text-xl rounded-xl mx-auto"
          >
            {loading ? (
              <ReactLoading
                type="spin"
                width={"25%"}
                height={"25%"}
                className="mx-auto"
              />
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="text-center text-lg text-black">
            Already have an account?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default SignUp;
