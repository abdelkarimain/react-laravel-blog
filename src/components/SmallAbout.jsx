import { Button } from "flowbite-react";
import banner from "../assets/banner.jpg";
import { useTranslation } from "react-i18next";

const SmallAbout = () => {
  const { t } = useTranslation();
  return (
    <div className="flex my-5 flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">{t("callToActionDes")}</h2>
        <p className="text-gray-500 my-2">
          {t("checkoutThis")}
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("chckMyPortfolio")}
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src={banner} />
      </div>
    </div>
  );
};

export default SmallAbout;
