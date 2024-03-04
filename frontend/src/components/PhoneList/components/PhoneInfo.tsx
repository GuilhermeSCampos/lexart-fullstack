import { Pencil, Trash } from "@phosphor-icons/react";
import { Phone } from "../../../types/phone";
import { useAuth } from "../../../context/AppContext";

type PhoneInfoProps = {
  phone: Phone;
  updatePhones: () => void;
};

const PhoneInfo = ({ phone, updatePhones }: PhoneInfoProps) => {
  const { removePhone } = useAuth();

  const handleRemove = async () => {
    await removePhone(phone.id);
    updatePhones();
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
        ${phone.price}
      </td>
      <td className="border border-gray-300 py-2 px-4 break-words">
        {phone.color}
      </td>
      <td className="border border-gray-300 py-2 px-4">
        <Pencil size={20} className="mx-auto cursor-pointer" />
      </td>
      <td className="border border-gray-300 py-2 px-4 cursor-pointer">
        <Trash size={20} className="mx-auto" onClick={() => handleRemove()} />
      </td>
    </tr>
  );
};

export default PhoneInfo;
