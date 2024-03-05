import { Pencil, Trash } from "@phosphor-icons/react";
import { Phone } from "../../../types/phone";
import { useAuth } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";

type PhoneInfoProps = {
  phone: Phone;
  updatePhones: () => void;
  setLoading: (value: boolean) => void;
};

const PhoneInfo = ({ phone, updatePhones, setLoading }: PhoneInfoProps) => {
  const { removePhone } = useAuth();
  const navigate = useNavigate();

  const handleRemove = async () => {
    setLoading(true);
    await removePhone(phone.id);
    await updatePhones();
    setLoading(false);
  };

  return (
    <tr className="border border-gray-300 text-center">
      <td className="border border-gray-300 py-2 px-4 break-words">
        {phone.name}
      </td>
      <td className="border border-gray-300 py-2 px-4 break-words">
        {phone.brand}
      </td>
      <td className="border border-gray-300 py-2 px-4 break-words">
        {phone.model}
      </td>
      <td className="border border-gray-300 py-2 px-4 break-words">
        {Number(phone.price).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </td>
      <td className="border border-gray-300 py-2 px-4 break-words">
        {phone.color}
      </td>
      <td className="border border-gray-300 py-2 lg:px-4 px-8">
        <Pencil
          size={20}
          className="mx-auto cursor-pointer"
          onClick={() => navigate(`/dashboard/edit/${phone.id}`)}
          color="#e47200"
        />
      </td>
      <td className="border border-gray-300 py-2 lg:px-4 px-8 cursor-pointer">
        <Trash
          size={20}
          color="red"
          className="mx-auto"
          onClick={() => handleRemove()}
        />
      </td>
    </tr>
  );
};

export default PhoneInfo;
