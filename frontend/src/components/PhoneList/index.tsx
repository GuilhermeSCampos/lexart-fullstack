import { useEffect, useState } from "react";
import { useAuth } from "../../context/AppContext";
import { Phone } from "../../types/phone";
import PhoneInfo from "./components/PhoneInfo";
import ReactLoading from "react-loading";
import "./style.css";
import { useTranslation } from "react-i18next";
import {
  ArrowDown,
  ArrowUp,
  MagnifyingGlass,
  Minus,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

const BASE_URL = import.meta.env.VITE_API_URL;

const PhoneList = () => {
  const { fetchPhones, validateToken } = useAuth();
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [filtering, setFiltering] = useState("");

  const getPhones = async () => {
    setLoading(true);

    const data = await fetchPhones();
    const sorted = data.sort((a: Phone, b: Phone) => a.id - b.id);
    setPhones(sorted);

    setLoading(false);
  };

  const searchPhones = async () => {
    await validateToken();
    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString) : "";

    setLoading(true);
    const response = await fetch(`${BASE_URL}/phones/search?query=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    const sorted = data.sort((a: Phone, b: Phone) => a.id - b.id);
    setPhones(sorted);

    setLoading(false);
  };

  const handleSearchChange = () => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const newTimeout = setTimeout(() => {
      searchPhones();
    }, 500);

    setSearchTimeout(newTimeout);
  };

  const filterPhonesByPrice = () => {
    if (filtering === "asc") {
      setPhones((prev) => [...prev.sort((a, b) => a.price - b.price)]);
    }
    if (filtering === "desc") {
      setPhones((prev) => [...prev.sort((a, b) => b.price - a.price)]);
    }

    if (filtering === "") {
      setPhones((prev) => [...prev.sort((a, b) => a.id - b.id)]);
    }
  };

  const handleFilterOnText = () => {
    if (filtering === "asc") {
      setFiltering("desc");
    }
    if (filtering === "desc") {
      setFiltering("");
    }
    if (filtering === "") {
      setFiltering("asc");
    }
  };

  useEffect(() => {
    handleSearchChange();
  }, [search]);

  useEffect(() => {
    filterPhonesByPrice();
  }, [filtering]);

  return (
    <div className="w-full animate-[fadeIn_1s_ease-in-out] flex flex-col items-center gap-10">
      <h1 className="lg:text-5xl text-3xl text-center">{t("listing")}</h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.3,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="lg:w-3/12 flex flex-col items-center"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border-2 border-gray-500 rounded-md transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300 h-10 pr-14"
        />
        <MagnifyingGlass
          size={24}
          className="flex self-end a absolute mt-2 mr-3 z-10"
        />
      </motion.div>
      {loading ? (
        <div className="w-full animate-[fadeIn_1s_ease-in-out] flex flex-col items-center justify-center mt-10">
          <ReactLoading type="spin" color="#000" width={70} />
        </div>
      ) : phones.length === 0 ? (
        <h3 className="lg:text-4xl text-xl mt-10 lg:mt-10 flex flex-col items-center justify-center self-center h-[40%]">
          {t("productsNotFound")}
        </h3>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className=" lg:max-h-[80%] max-h-[50%] overflow-y-auto w-11/12 mx-auto rounded-xl border-4 border-stone-300"
        >
          <table className="border-collapse border border-gray-300 w-full mx-auto lg:table-fixed">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 py-2 w-2/12">
                  {t("name")}
                </th>
                <th className="border border-gray-300 py-2 w-2/12">
                  {t("brand")}
                </th>
                <th className="border border-gray-300 py-2 w-2/12">
                  {t("model")}
                </th>
                <th className="border border-gray-300 py-2 w-2/12">
                  <div className="w-full flex items-center justify-center gap-1">
                    <p
                      className="cursor-pointer"
                      onClick={() => handleFilterOnText()}
                    >
                      {t("price")}
                    </p>
                    {filtering === "" && (
                      <Minus
                        className="cursor-pointer mt-1"
                        size={20}
                        onClick={() => setFiltering("asc")}
                      />
                    )}

                    {filtering === "asc" && (
                      <ArrowUp
                        className="cursor-pointer"
                        size={20}
                        onClick={() => setFiltering("desc")}
                      />
                    )}

                    {filtering === "desc" && (
                      <ArrowDown
                        className="cursor-pointer"
                        size={20}
                        onClick={() => setFiltering("")}
                      />
                    )}
                  </div>
                </th>
                <th className="border border-gray-300 py-2 w-2/12">
                  {t("color")}
                </th>
                <th className="border border-gray-300 py-2 w-1/12">
                  {t("edit")}
                </th>
                <th className="border border-gray-300 py-2 w-1/12">
                  {t("remove")}
                </th>
              </tr>
            </thead>
            <tbody>
              {phones.map((phone) => (
                <PhoneInfo
                  key={phone.id}
                  phone={phone}
                  updatePhones={getPhones}
                  setLoading={setLoading}
                />
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default PhoneList;
