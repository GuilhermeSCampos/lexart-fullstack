import ReactLoading from "react-loading";

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
}: props) => {
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.match(/^\d{1,7}(\.\d{0,2})?$/) || value === "") {
      setPrice(value);
    }
  };

  return (
    <form
      className="w-4/12 mx-auto h-auto flex flex-col items-center gap-8 bg-slate-300 rounded-xl py-8"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        placeholder="Type phone name"
        className="border-4 border-slate-400 p-2 rounded-xl w-3/5 hover:border-slate-500 focus:border-slate-600 focus:outline-none transition duration-300"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type phone brand"
        className="border-4 border-slate-400 p-2 rounded-xl w-3/5 hover:border-slate-500 focus:border-slate-600 focus:outline-none transition duration-300"
        required
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type phone model"
        className="border-4 border-slate-400 p-2 rounded-xl w-3/5 hover:border-slate-500 focus:border-slate-600 focus:outline-none transition duration-300"
        required
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type phone price"
        className="border-4 border-slate-400 p-2 rounded-xl w-3/5 hover:border-slate-500 focus:border-slate-600 focus:outline-none transition duration-300"
        required
        value={price}
        onChange={(e) => onChangePrice(e)}
      />
      <input
        type="text"
        placeholder="Type phone color"
        className="border-4 border-slate-400 p-2 rounded-xl w-3/5 hover:border-slate-500 focus:border-slate-600 focus:outline-none transition duration-300"
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
        ) : type === "register" ? (
          "Register"
        ) : (
          "Edit"
        )}
      </button>
    </form>
  );
};

export default Form;