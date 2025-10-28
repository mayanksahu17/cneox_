import { useState, useEffect, useRef } from "react";

const VideoBanner = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowVideo(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <section className="relative bg-black py-16 text-white">
      <div className="container md:mx-24 max-w-fit">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Column - Text Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-yellow-500 leading-tight mb-6 ml-4 md:ml-0">
              "Our Goal Is To Change
              <br />
              The Modern World
              <br />
              Become Nature
              <br />
              Friendly"
            </h2>

            <div className="flex bg-black border border-yellow-500 p-6 rounded-lg shadow-md hover:shadow-yellow-500/30 transition-shadow">
              <div className="w-1 bg-yellow-500 mr-4 flex-shrink-0"></div>
              <div>
                <p className="text-white/80 mb-4">
                  Our goal is to reshape the modern world by embracing
                  nature-friendly practices. We're committed to driving change
                  with sustainable solutions, fostering a greener future, and
                  making eco-conscious choices that benefit both people and the
                  planet. Join us in this vital journey.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Video Section */}
          <div className="lg:w-1/2" ref={videoRef}>
            <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden border border-yellow-500 shadow-lg shadow-yellow-500/20">
              {showVideo ? (
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/EWeTt4RbTVU?autoplay=1&mute=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <div className="animate-pulse text-yellow-500">
                    Loading video...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoBanner;
