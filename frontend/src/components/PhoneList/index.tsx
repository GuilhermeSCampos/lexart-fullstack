import { useEffect, useState } from "react";
import { useAuth } from "../../context/AppContext";
import { Phone } from "../../types/phone";
import PhoneInfo from "./components/PhoneInfo";
import ReactLoading from "react-loading";
import "./style.css";

const PhoneList = () => {
  const { fetchPhones } = useAuth();
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  const getPhones = async () => {
    setLoading(true);

    const data = await fetchPhones();
    setPhones(data);

    setLoading(false);
  };

  useEffect(() => {
    getPhones();
  }, []);

  return loading ? (
    <div className="w-full animate-[fadeIn_1s_ease-in-out] flex flex-col items-center justify-center ">
      <ReactLoading type="spin" color="#000" width={70} />
    </div>
  ) : (
    <div className="w-full animate-[fadeIn_1s_ease-in-out]">
      <h1 className="text-4xl text-center">Listing</h1>

      {phones.length === 0 ? (
        <h3 className="text-4xl flex flex-col items-center justify-center self-center h-[80%]">
          There are no Registered Phones!
        </h3>
      ) : (
        <div className="mt-8 max-h-[80%] overflow-y-auto w-11/12 mx-auto">
          <table className="border-collapse border border-gray-300 w-full mx-auto table-fixed">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 py-2 w-2/12">Name</th>
                <th className="border border-gray-300 py-2 w-2/12">Brand</th>
                <th className="border border-gray-300 py-2 w-2/12">Model</th>
                <th className="border border-gray-300 py-2 w-2/12">Price</th>
                <th className="border border-gray-300 py-2 w-2/12">Color</th>
                <th className="border border-gray-300 py-2 w-1/12">Edit</th>
                <th className="border border-gray-300 py-2 w-1/12">Remove</th>
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
