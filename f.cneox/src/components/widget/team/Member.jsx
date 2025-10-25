import { Link } from "react-router-dom";
import Team_Social from "./Member_Social";

// eslint-disable-next-line react/prop-types
const Member = ({
  img,
  name,
  info,
  facebook,
  twitter,
  linkedin,
  instagram,
  whatsapp,
}) => {
  return (
    <li
      className="jos flex flex-col md:flex-row items-center justify-center rounded-[20px] bg-colorLinenRuffle p-[20px] w-full"
      data-jos_animation="flip"
      data-jos_delay="0.1"
    >
      <div className="xl:h[300px] w-full overflow-hidden rounded-[20px] xxl:h-[400px]">
        <img
          src={img}
          alt="team-member-img-1"
          width={376}
          height={400}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-5 text-center text-black">
        <Link
          // to="/team-details"
          className="font-dmSans text-[26px] leading-[1.33] hover:text-colorOrangyRed xxl:text-[30px]"
        >
          {name}
        </Link>
        <div className="mt-3 flex flex-col justify-center gap-3 items-center">
          <span className="text-center text-[21px]">{info}</span>
          {
            <Team_Social
              facebook={facebook}
              whatsapp={whatsapp}
              // twitter={twitter}
              // linkedin={linkedin}
              // instagram={instagram}
            />
          }
        </div>
        <div className="max-w-full">
          Adrian Cadiz is the dynamic CEO of Crown Bankers, leading the company
          with a strong vision and strategic expertise. A native of the UK,
          Adrian's leadership will drive our operations over the next three
          years, with the option to renew based on his continued commitment.
          Under his guidance, Crown Bankers is poised to excel in the financial
          and technological landscapes, shaping a bright future for the company
          and its stakeholders.
        </div>
      </div>
    </li>
  );
};

export default Member;
