import ReactLoading from "react-loading";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

type props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  name: string;
  setName: (name: string) => void;
  brand: string;
  setBrand: (brand: string) => void;
  model: string;
  setModel: (model: string) => void;
  price: string;
  setPrice: (price: string) => void;
  color: string;
  setColor: (color: string) => void;
  type: string;
  active?: boolean;
};

const Form = ({
  handleSubmit,
  loading,
  name,
  setName,
  brand,
  setBrand,
  model,
  setModel,
  price,
  setPrice,
  color,
  setColor,
  type,
  active,
}: props) => {
  const { t } = useTranslation();
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.match(/^\d{1,7}(\.\d{0,2})?$/) || value === "") {
      setPrice(value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <form
        className="lg:w-4/12 mx-auto h-full flex flex-col items-center lg:gap-8 gap-4 bg-slate-300 rounded-xl py-8"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder={t("typePhoneName")}
          className="border-4 border-slate-400 p-2 rounded-xl w-3/5 hover:border-slate-500 focus:border-slate-600 focus:outline-none transition duration-300"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder={t("typePhoneBrand")}
          className="border-4 border-slate-400 p-2 rounded-xl w-3/5 hover:border-slate-500 focus:border-slate-600 focus:outline-none transition duration-300"
          required
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder={t("typePhoneModel")}
          className="border-4 border-slate-400 p-2 rounded-xl w-3/5 hover:border-slate-500 focus:border-slate-600 focus:outline-none transition duration-300"
          required
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          type="text"
          placeholder={t("typePhonePrice")}
          className="border-4 border-slate-400 p-2 rounded-xl w-3/5 hover:border-slate-500 focus:border-slate-600 focus:outline-none transition duration-300"
          required
          value={price}
          onChange={(e) => onChangePrice(e)}
        />
        <input
          type="text"
          placeholder={t("typePhoneColor")}
          className="border-4 border-slate-400 p-2 rounded-xl w-3/5 hover:border-slate-500 focus:border-slate-600 focus:outline-none transition duration-300"
          required
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button
          className={`bg-slate-500 ${
            type === "edit" && !active ? "bg-stone-400" : "bg-slate-600"
          } text-white p-2 rounded-md w-3/12 animate-[fadeIn_1s_ease-in-out] 
        items-center flex-col flex transition duration-300 ${
          type === "edit" && !active
            ? "hover:bg-stone-600"
            : "hover:bg-slate-800"
        } focus:outline-none focus:ring focus:border-slate-800 `}
          type="submit"
          disabled={loading ? true : type === "edit" && !active ? true : false}
        >
          {loading ? (
            <ReactLoading
              type="spin"
              width={window.innerWidth <= 1024 ? "31%" : "21%"}
              height={"21%"}
              className="animate-[fadeIn_1s_ease-in-out]"
            />
          ) : type === "register" ? (
            t("register")
          ) : (
            t("edit")
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default Form;
