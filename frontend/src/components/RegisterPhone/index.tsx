import { useState } from "react";
import { useAuth } from "../../context/AppContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";

const RegisterPhone = () => {
  const { registerPhone } = useAuth();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const registered = await registerPhone(
      name,
      brand,
      model,
      Number(price),
      color
    );
    if (registered) {
      toast.success("Phone registered successfully!");
    } else {
      toast.error("Error registering phone!");
    }
    setName("");
    setBrand("");
    setModel("");
    setPrice("");
    setColor("");
    setLoading(false);
  };

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.match(/^\d{1,7}(\.\d{0,2})?$/) || value === "") {
      setPrice(value);
    }
  };

  return (
    <div className="w-full flex flex-col gap-16 [fadeIn_1s_ease-in-out]">
      <h1 className="text-4xl text-center [fadeIn_1s_ease-in-out]">Register</h1>
      <form
        className="w-4/12 mx-auto h-auto flex flex-col items-center gap-8 bg-slate-200 rounded-xl py-8 hover:bg-slate-300 transition duration-300"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder="Type phone name"
          className="border-4 border-slate-300 p-2 rounded-xl w-3/5"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type phone brand"
          className="border-4  p-2 rounded-xl border-slate-300 w-3/5"
          required
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type phone model"
          className="border-4 p-2 rounded-xl border-slate-300 w-3/5"
          required
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type phone price"
          className="border-4 p-2 rounded-xl border-slate-300 w-3/5"
          required
          value={price}
          onChange={(e) => onChangePrice(e)}
        />
        <input
          type="text"
          placeholder="Type phone color"
          className="border-4  p-2 rounded-xl  border-slate-300 w-3/5"
          required
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button
          className="bg-slate-500 text-white p-2 rounded-md w-3/12 animate-[fadeIn_1s_ease-in-out] 
          items-center flex-col flex transition duration-300 hover:bg-slate-800 focus:outline-none focus:ring focus:border-slate-800"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <ReactLoading
              type="spin"
              width={"21%"}
              height={"21%"}
              className="animate-[fadeIn_1s_ease-in-out]"
            />
          ) : (
            "Register"
          )}
        </button>
      </form>
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

export default RegisterPhone;
