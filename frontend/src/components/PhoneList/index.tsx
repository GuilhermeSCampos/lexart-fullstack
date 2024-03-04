import { useEffect, useState } from "react";
import { useAuth } from "../../context/AppContext";
import { Phone } from "../../types/phone";
import PhoneInfo from "./components/PhoneInfo";

const PhoneList = () => {
  const { fetchPhones } = useAuth();
  const [phones, setPhones] = useState<Phone[]>([]);

  const getPhones = async () => {
    const data = await fetchPhones();
    setPhones(data);
  };

  useEffect(() => {
    getPhones();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-4xl text-center">Listing</h1>
      <div className="py-8">
        <table className="border-collapse border border-gray-300 w-11/12 mx-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-2 px-4">Name</th>
              <th className="border border-gray-300 py-2 px-4">Brand</th>
              <th className="border border-gray-300 py-2 px-4">Model</th>
              <th className="border border-gray-300 py-2 px-4">Price</th>
              <th className="border border-gray-300 py-2 px-4">Color</th>
              <th className="border border-gray-300 py-2 px-4">Edit</th>
              <th className="border border-gray-300 py-2 px-4">Remove</th>
            </tr>
          </thead>
          <tbody>
            {phones.map((phone) => (
              <PhoneInfo key={phone.id} phone={phone} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhoneList;
