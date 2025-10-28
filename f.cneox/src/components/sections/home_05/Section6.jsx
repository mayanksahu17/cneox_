import React from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";

const dummyReviews = [
  {
    id: 1,
    name: "Alex Ross",
    photo:
      "https://res.cloudinary.com/dcqnkr06e/image/upload/v1747136215/320270131_521914926547311_1490109788246131069_160_d2uokq.jpg",
    text: "CNEOX has redefined how I approach energy-backed assets. The platform is reliable, transparent, and future-focused.",
    facebook: "https://www.facebook.com/AlexRoss.M",
    whatsapp: "https://wa.me/17869363977",
    countryFlag:
      "https://imgs.search.brave.com/xusJ7dKYIutUylPh-31Vy1GQ0pP_372wH3tgDFOLpeQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJpdGFubmljYS5j/b20vMzMvNDgzMy0w/NTAtRjZFNDE1RkUv/RmxhZy1Vbml0ZWQt/U3RhdGVzLW9mLUFt/ZXJpY2EuanBn",
  },
  {
    id: 2,
    name: "Chaoxiang Bingwen",
    photo:
      "https://res.cloudinary.com/dcqnkr06e/image/upload/v1747136214/2_uqpl6e.png",
    text: "Outstanding service and expert financial guidance. CNEOX is a trusted partner for all our investment needs!",
    facebook: "https://www.facebook.com/profile.php?id=100095266980352",
    whatsapp: "",
    countryFlag:
      "https://imgs.search.brave.com/IEC7al-JS3ZoBnoniH8mnnhBFjPSn2LRGKW5HkjUWVo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/d29ybGRhdGxhcy5j/b20vci93MTIwMC9p/bWcvZmxhZy9ubC1m/bGFnLmpwZw",
  },
  {
    id: 3,
    name: "Jett Kenney",
    photo:
      "https://res.cloudinary.com/dcqnkr06e/image/upload/v1747136215/3_req3tk.png",
    text: "CNEOX delivers exceptional financial services with professionalism and reliability. Highly recommended for anyone seeking trustworthy banking solutions!",
    facebook: "https://www.facebook.com/profile.php?id=100086681566730",
    whatsapp: "https://wa.me/31637180219",
    countryFlag:
      "https://imgs.search.brave.com/IZeHBd_tzVK_ezF45fq8TNi3qb0Mcz2yzh4W8k8ol2w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJpdGFubmljYS5j/b20vMDcvODAwNy0w/NTAtRDQxNzA4NDMv/RmxhZy1EZW5tYXJr/LmpwZw",
  },
];

const ReviewSection = () => {
  return (
    <section className="bg-black py-16 px-4 sm:px-6 lg:px-20 text-white">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-yellow-500 mb-10">
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {dummyReviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-900 border border-yellow-500 rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-yellow-500/30 hover:scale-[1.02] transition-all duration-300"
          >
            <img
              src={review.photo}
              alt={review.name}
              className="w-20 h-20 rounded-full mb-4 border-2 border-yellow-500 object-cover"
            />

            <div className="flex items-center justify-center space-x-2 mb-3">
              <img
                src={review.countryFlag}
                alt="flag"
                className="w-6 h-4 rounded-sm border border-gray-700"
              />
              <h3 className="text-xl font-semibold text-yellow-500">
                {review.name}
              </h3>
            </div>

            <p className="text-white/80 mb-4 italic">"{review.text}"</p>

            <div className="flex space-x-4">
              {review.facebook && (
                <a
                  href={review.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
                >
                  <FaFacebookF size={18} />
                </a>
              )}
              {review.whatsapp && (
                <a
                  href={review.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
                >
                  <FaWhatsapp size={18} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
