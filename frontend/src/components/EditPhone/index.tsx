import { useEffect, useState } from "react";
import { useAuth } from "../../context/AppContext";
import Form from "../Form";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { Phone } from "../../types/phone";

const EditPhone = () => {
  const { editPhone } = useAuth();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const success = await editPhone({
      name,
      brand,
      model,
      price: Number(price),
      color,
      id: Number(id),
    });

    if (success) {
      toast.success("Phone edited successfully!");
    } else {
      toast.error("Error editing phone!");
    }
    setName("");
    setBrand("");
    setModel("");
    setPrice("");
    setColor("");
    setLoading(false);
  };

  useEffect(() => {
    if (phone) {
      setName(phone.name);
      setBrand(phone.brand);
      setModel(phone.model);
      setPrice(phone.price.toString());
      setColor(phone.color);
    }
  }, [phone]);

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
