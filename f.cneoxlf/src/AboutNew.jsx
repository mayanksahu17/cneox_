import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18next from "i18next";

export default function AboutNew() {
  const { i18n, t } = useTranslation(["About"]);

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div>
      <select
        value={localStorage.getItem("i18nextLng")}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="jp">Japanese</option>
      </select>
      <h1>{t("heading")}</h1>
      <p>{t("message")}</p>
    </div>
  );
}
