import React, { useEffect, useState } from "react";
import "./Share.css";
import { Link } from "react-router-dom";
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
const Whatsapp = () => {
  const isMobile = useIsMobile();

  const [isShare, setisShare] = useState(false);

  return (
    <div
      class="flex fixed justify-end items-end "
      style={
        isShare
          ? { bottom: "2rem", top: "0", left: "0px", zIndex: 1000 }
          : { bottom: "2rem", top: "0", left: "0px", zIndex: 1000 }
      }
      onMouseLeave={() => setisShare(false)}
    >
      <div class="flex flex-col justify-center items-center gap-[0.5em] relative ">
        <Link
          className="whatsapp-btn flex justify-center align-center"
          to="https://api.whatsapp.com/send?phone=447452176974"
          target="_blank"
          style={isMobile ? { left: "140px" } : { left: "120px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            fill="currentColor"
            class="bi bi-whatsapp"
            viewBox="0 0 16 16"
          >
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />{" "}
          </svg>
        </Link>
        {/* Telegram Link */}
        {/* <Link
          className="telegram-btn flex justify-center align-center"
          to="https://t.me/crownbankers_admin"
          target="_blank"
          style={isMobile ? { left: "70px" } : { left: "40px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            fill="currentColor"
            className="bi bi-telegram"
            viewBox="0 0 16 16"
          >
            <path d="M16 3.077a.5.5 0 0 0-.584-.195L.9 7.12c-.162.056-.29.163-.372.304-.08.14-.094.304-.039.458a.552.552 0 0 0 .309.361l3.64 1.293 1.076 3.66c.052.172.177.312.342.384a.566.566 0 0 0 .24.053.533.533 0 0 0 .36-.142l2.1-2.057 3.913 3.675c.21.197.504.197.715 0a.515.515 0 0 0 .13-.22l1.867-10.572a.547.547 0 0 0-.067-.442.538.538 0 0 0-.361-.229zM6.625 8.174L2.85 6.901l10.373-4.096-6.598 5.37zm.651 1.44 1.642 1.417-.868 1.156-.774-2.573z" />
          </svg>
        </Link> */}
      </div>
    </div>
  );
};

export default Whatsapp;
