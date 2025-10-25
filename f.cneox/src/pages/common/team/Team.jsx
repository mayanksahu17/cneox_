import React, { useEffect, useRef } from "react";
import greenBackground from "../../../assets/images/backgrounds/greenBackground.jpg";
import Footer from "../../../components/footer/Footer_05";
// import Contact from "../../components/contact/Contact"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);


const teamMembers = [
  {
    name: "Adrian Cadiz",
    role: "Chief Executive Officer",
    image:
      "https://res.cloudinary.com/dcqnkr06e/image/upload/v1747138673/C7729T01.JPG_r3xnsb.jpg",
    bio: `With nearly two decades of experience in marketing, business operations, and strategic growth, Adrian Cadiz leads Crown Bankers as CEO. His expertise extends to the renewable energy sector, where he has played a key role in integrating financial solutions with solar and EV projects. Under his leadership, Crown Bankers continues to drive innovation, efficiency, and expansion across all operations.`,
    facebook: "#",
    linkedin: "#",
  },
  {
    name: "Edward Barrington",
    role: "Chief Marketing Officer (CMO)",
    image: "https://res.cloudinary.com/dcqnkr06e/image/upload/v1747139113/vlcsnap-2025-05-08-17h49m49s722_ybycs6.png",
    bio: `As the Chief Marketing Officer, Edward Barrington oversees all marketing initiatives at Crown Bankers. His expertise in brand development and market expansion plays a crucial role in growing the company's global presence.`,
    facebook: "#",
    linkedin: "#",
  },
  {
    name: "Anee Sandrova ",
    role: "Relationship Manager (RM)",
    image: "https://res.cloudinary.com/dcqnkr06e/image/upload/v1747139233/image_nyfo12.png",
    bio: `Anee Sandrova manages relations and operations in the Netherlands, particularly overseeing the Crown Bankers solar plant in Groningen. Her role ensures seamless coordination and development of our renewable energy projects.`,
    facebook: "#",
    linkedin: "#",
  },
  {
    name: "Sophie Taylor",
    role: "Chief Financial Officer (CFO)",
    image: "https://res.cloudinary.com/dcqnkr06e/image/upload/v1747139401/image_1_ngqt9q.png",
    bio: `Sophie Taylor and her team handle the financial strategies at Crown Bankers, making critical decisions on investments and resource allocation. Her expertise ensures sustainable financial growth and stability.`,
    facebook: "#",
    linkedin: "#",
  },
  {
    name: "Joseph Carter ",
    role: "Director of Operations",
    image: "https://res.cloudinary.com/dcqnkr06e/image/upload/v1747139464/vlcsnap-2025-05-08-17h21m08s792_nicu3m.png",
    bio: `Joseph Carter leads the administrative division, handling user inquiries and ensuring smooth internal operations. His dedication to efficiency and customer support enhances the overall experience for Crown Bankers members.`,
    facebook: "#",
    linkedin: "#",
  },
];

// AboutCEO Component
const Team = () => {
  // Refs for animation
  const titleRef = useRef(null);
  const ceoCardRef = useRef(null);
  const ceoImageRef = useRef(null);
  const ceoInfoRef = useRef(null);

  useEffect(() => {
    // Common animation settings for smoothness
    const defaults = {
      ease: "power3.out", // Smoother easing
      duration: 1.2, // Slightly longer duration for fluidity
    };

    // Title fade-in
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }

    // CEO Card fade-in
    if (ceoCardRef.current) {
      gsap.fromTo(
        ceoCardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          delay: 0.2,
        }
      );
    }

    // CEO Image fade-in with slight scale
    if (ceoImageRef.current) {
      gsap.fromTo(
        ceoImageRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          ...defaults,
          delay: 0.4,
        }
      );
    }

    // CEO Info staggered fade-in
    if (ceoInfoRef.current) {
      const infoElements = ceoInfoRef.current.children;
      gsap.fromTo(
        infoElements,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          ...defaults,
          stagger: 0.2,
          delay: 0.6,
        }
      );
    }

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div style={{ backgroundImage: `url(${greenBackground})` }}>
      {" "}
      <section className="py-12">
        {/* Team Members Grid */}
        <div className="max-w-6xl px-4 mx-auto mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#e8f5e9] backdrop-blur-md rounded-lg shadow-2xl p-6 flex flex-col items-center text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full shadow-md mb-4 object-cover"
              />
              <h3 className="text-2xl font-bold text-black mb-1">{member.name}</h3>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">{member.role}</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">{member.bio}</p>
              <div className="flex space-x-4">
                <a href={member.facebook} className="text-green-600 hover:text-green-500">
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href={member.linkedin} className="text-green-600 hover:text-green-500">
                  <i className="fab fa-linkedin-in text-xl"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div></div>
      </section>
      <Footer />
      {/* <Contact /> */}
    </div>
  );
};

export default Team;
