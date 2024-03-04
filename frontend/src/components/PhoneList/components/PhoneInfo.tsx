import { Pencil, Trash } from "@phosphor-icons/react";
import { Phone } from "../../../types/phone";

type PhoneInfoProps = {
  phone: Phone;
};

const PhoneInfo = ({ phone }: PhoneInfoProps) => {
  return (
    <tr className="border border-gray-300 text-center">
      <td className="border border-gray-300 py-2 px-4">{phone.name}</td>
      <td className="border border-gray-300 py-2 px-4">{phone.brand}</td>
      <td className="border border-gray-300 py-2 px-4">{phone.model}</td>
      <td className="border border-gray-300 py-2 px-4">{phone.price}</td>
      <td className="border border-gray-300 py-2 px-4">{phone.color}</td>
      <td className="border border-gray-300 py-2 px-4">
        <Pencil size={20} className="mx-auto cursor-pointer" />
      </td>
      <td className="border border-gray-300 py-2 px-4 cursor-pointer">
        <Trash size={20} className="mx-auto" />
      </td>
    </tr>
  );
};

export default PhoneInfo;
