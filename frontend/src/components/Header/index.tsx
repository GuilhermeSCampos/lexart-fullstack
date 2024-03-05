import brasilIcon from "../../assets/br.png";
import usaIcon from "../../assets/en.webp";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AppContext";

const Header = () => {
  const {
    i18n: { changeLanguage },
  } = useTranslation();

  const { setLanguageChange, language, setLanguage } = useAuth();

  const handleLanguageChange = (language: "en" | "pt") => {
    setLanguageChange(true);

    setTimeout(() => {
      setLanguageChange(false);
      setLanguage(language);
      changeLanguage(language);
    }, 500);
  };

  return (
    <div className="w-full flex gap-4 lg:justify-end justify-around lg:px-5 lg:my-5 my-2 absolute">
      <img
        className={`lg:w-[40px] w-[50px] cursor-pointer rounded ${
          language === "pt"
            ? "border-2 border-green-200"
            : "grayscale hover:grayscale-[60%] transition duration-700 ease-in-out"
        }`}
        src={brasilIcon}
        onClick={() => handleLanguageChange("pt")}
      />
      <img
        className={`lg:w-[40px] w-[50px] cursor-pointer rounded ${
          language === "en"
            ? "border-2 border-red-200"
            : "grayscale hover:grayscale-[20%] transition duration-400 ease-in-out"
        }`}
        src={usaIcon}
        onClick={() => handleLanguageChange("en")}
      />
    </div>
  );
};

export default Header;
