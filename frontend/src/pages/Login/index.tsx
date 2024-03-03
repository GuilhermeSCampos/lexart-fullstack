import "./style.css";

const Login = () => {
  return (
    <div className="bg-[#666666]/50 w-screen h-screen flex flex-col justify-center items-center ">
      <div className="w-full max-w-[600px] h-[500px] space-y-8 border-2 bg-white px-16 py-8 rounded-lg login-container">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">Welcome!</h1>
        </div>
        <div className="w-10/12 mx-auto flex-col flex gap-8">
          <div>
            <h1 className="text-2xl mb-2">Username</h1>
            <input
              placeholder="Type your username here"
              className="border-4 w-full h-10 rounded-md px-2"
            />
          </div>
          <div>
            <h1 className="text-2xl mb-2">Password</h1>
            <input
              id="password"
              required
              placeholder="Type  your password here"
              type="password"
              className="border-4 w-full h-10 rounded-md px-2"
            />
          </div>
          <button className="w-5/12 bg-stone-600 text-white px-6 py-2 text-xl rounded-xl mx-auto">
            Login
          </button>
        </div>
        <div className="text-center text-lg text-black">
          Don't have an account? <span className="underline">Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
