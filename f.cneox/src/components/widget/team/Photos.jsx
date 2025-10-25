import { Link } from "react-router-dom";

import { FaDownload } from "react-icons/fa";

const Photos = ({ img }) => {
  return Array.from({ length: 17 }, (_, i) => i + 1).map((idx) => (
    <li
      className="relative jos rounded-[20px] bg-colorLinenRuffle p-[25px]"
      data-jos_animation="flip"
      data-jos_delay="0.1"
    >
      <div className=" xl:h[300px] w-full overflow-hidden rounded-[20px] xxl:h-[400px]">
        <img src={img} />

        <Link to="/media">
          <img
            src={
              idx === 25
                ? `https://crownbankers.com/home/public/photos/${idx}.jpeg`
                : `https://crownbankers.com/home/public/photos/${idx}.png`
            }
            alt="team-member-img-1"
            width={376}
            height={400}
            className="h-full w-full object-cover"
          />
        </Link>
        <a
          href={
            idx === 25
              ? `https://crownbankers.com/home/public/photos/${idx}.jpeg`
              : `https://crownbankers.com/home/public/photos/${idx}.png`
          }
          download
          className="absolute bottom-4 right-6 h-12 w-12  p-2 rounded-full cursor-pointer"
          style={{ width: "20px", height: "20px", zIndex: "10" }}
        >
          <FaDownload />
        </a>
      </div>
    </li>
  ));
};

export default Photos;
