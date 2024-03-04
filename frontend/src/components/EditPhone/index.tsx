import { useState } from "react";
import { useAuth } from "../../context/AppContext";
import Form from "../Form";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPhone = () => {
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
  return (
    <div className="w-full flex flex-col gap-16 animate-[fadeIn_1s_ease-in-out]">
      <h1 className="text-4xl text-center animate-[fadeIn_1s_ease-in-out]">
        Editing
      </h1>

      <Form
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
        color={color}
        setColor={setColor}
        brand={brand}
        setBrand={setBrand}
        setPrice={setPrice}
        price={price}
        model={model}
        setModel={setModel}
        loading={loading}
        type="edit"
      />
    </div>
  );
};

export default EditPhone;
