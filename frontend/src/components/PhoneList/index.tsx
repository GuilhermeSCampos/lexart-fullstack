import { useEffect, useState } from "react";
import { useAuth } from "../../context/AppContext";
import { Phone } from "../../types/phone";
import PhoneInfo from "./components/PhoneInfo";
import ReactLoading from "react-loading";
import "./style.css";
import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowUp, MagnifyingGlass } from "@phosphor-icons/react";

const BASE_URL = import.meta.env.VITE_API_URL;

const PhoneList = () => {
  const { fetchPhones } = useAuth();
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [filtering, setFiltering] = useState("");
  console.log(filtering);
  const getPhones = async () => {
    setLoading(true);

    const data = await fetchPhones();
    setPhones(data);

    setLoading(false);
  };

  const searchPhones = async () => {
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
    setPhones(data);

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
    } else if (filtering === "desc") {
      setPhones((prev) => [...prev.sort((a, b) => b.price - a.price)]);
    }
  };

  const handleFilterOnText = () => {
    if (filtering === "asc" || filtering === "") {
      setFiltering("desc");
    } else if (filtering === "desc") {
      setFiltering("asc");
    }
  };

  useEffect(() => {
    getPhones();
  }, []);

  useEffect(() => {
    if (search === "") {
      getPhones();
    } else {
      handleSearchChange();
    }
  }, [search]);

  useEffect(() => {
    filterPhonesByPrice();
  }, [filtering]);

  return loading ? (
    <div className="w-full animate-[fadeIn_1s_ease-in-out] flex flex-col items-center justify-center ">
      <ReactLoading type="spin" color="#000" width={70} />
    </div>
  ) : (
    <div className="w-full animate-[fadeIn_1s_ease-in-out] flex flex-col items-center gap-10">
      <h1 className="text-5xl text-center">{t("listing")}</h1>
      <div className="w-3/12 flex flex-col items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md transition duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-300 h-10 pr-14"
        />
        <MagnifyingGlass
          size={24}
          className="flex self-end a absolute mt-2 mr-3 cursor-pointer z-10"
          onClick={() => searchPhones()}
        />
      </div>

      {phones.length === 0 ? (
        <h3 className="text-4xl flex flex-col items-center justify-center self-center h-[80%]">
          {t("noRegisteredProducts")}
        </h3>
      ) : (
        <div className=" max-h-[80%] overflow-y-auto w-11/12 mx-auto">
          <table className="border-collapse border border-gray-300 w-full mx-auto table-fixed">
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

                    {(filtering === "asc" || filtering === "") && (
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
                        onClick={() => setFiltering("asc")}
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
        </div>
      )}
    </div>
  );
};

export default PhoneList;
