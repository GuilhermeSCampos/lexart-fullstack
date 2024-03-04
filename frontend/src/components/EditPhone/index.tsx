import { useEffect, useState } from "react";
import { useAuth } from "../../context/AppContext";
import Form from "../Form";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";

const BASE_URL = import.meta.env.VITE_API_URL;

const EditPhone = () => {
  const { editPhone } = useAuth();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [invalidId, setInvalidId] = useState(false);

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
    setLoading(false);
  };

  useEffect(() => {
    const fetchPhoneDetails = async () => {
      setLoadingDetails(true);
      try {
        const tokenString = localStorage.getItem("token");
        const token = tokenString ? JSON.parse(tokenString) : "";

        const response = await fetch(`${BASE_URL}/phones/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setInvalidId(true);
          setLoadingDetails(false);
          return;
        }

        const data = await response.json();

        if (!data) {
          setInvalidId(true);
          setLoadingDetails(false);
          return;
        }

        setName(data.name);
        setBrand(data.brand);
        setModel(data.model);
        setPrice(data.price.toString());
        setColor(data.color);
        setLoadingDetails(false);
      } catch (error) {
        console.error("Erro ao obter os detalhes do telefone:", error);
      }
    };

    fetchPhoneDetails();
  }, []);

  return (
    <div className="w-full flex flex-col gap-16 animate-[fadeIn_1s_ease-in-out]">
      <h1 className="text-4xl text-center animate-[fadeIn_1s_ease-in-out]">
        Editing
      </h1>
      {invalidId ? (
        <h1 className="text-4xl text-center animate-[fadeIn_1s_ease-in-out]">
          There is no phone with this id
        </h1>
      ) : loadingDetails ? (
        <div className="w-full animate-[fadeIn_1s_ease-in-out] flex flex-col items-center justify-center ">
          <ReactLoading type="spin" color="#000" width={50} />
        </div>
      ) : (
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
      )}
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
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default EditPhone;
