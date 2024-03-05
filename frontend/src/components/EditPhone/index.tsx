import { useEffect, useState } from "react";
import { useAuth } from "../../context/AppContext";
import Form from "../Form";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { Phone } from "../../types/phone";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_URL;

const EditPhone = () => {
  const { editPhone, validateToken } = useAuth();
  const [phone, setPhone] = useState<Phone>();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [invalidId, setInvalidId] = useState(false);
  const [active, setActive] = useState(false);
  const { t } = useTranslation();

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
      toast.success(t("succesEditProduct"));
    } else {
      toast.error(t("errorEditProduct"));
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchPhoneDetails = async () => {
      setLoadingDetails(true);
      try {
        await validateToken();
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

        setPhone(data);
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

  useEffect(() => {
    if (name !== phone?.name) {
      return setActive(true);
    }
    if (brand !== phone?.brand) {
      return setActive(true);
    }
    if (model !== phone?.model) {
      return setActive(true);
    }
    if (price !== phone?.price.toString()) {
      return setActive(true);
    }
    if (color !== phone?.color) {
      return setActive(true);
    }
    return setActive(false);
  }, [name, brand, model, price, color]);

  return (
    <div className="w-full flex flex-col lg:gap-16 gap-8 animate-[fadeIn_1s_ease-in-out]">
      <h1 className="lg:text-5xl text-2xl text-center animate-[fadeIn_1s_ease-in-out]">
        {t("edit")}
      </h1>
      {invalidId ? (
        <h1 className="text-4xl text-center animate-[fadeIn_1s_ease-in-out]">
          {t("noPhoneId")}
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
          active={active}
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default EditPhone;
