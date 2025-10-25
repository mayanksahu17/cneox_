import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer_05";
import Hero from "../../components/sections/home_05/Hero";
import SolarEnergycards from "../../components/sections/home_05/Card";
import BannerLayout5 from "../../components/sections/home_05/Section";
import BankingInvestmentSection from "../../components/sections/home_05/Section2";
import BankingHeroSection from "../../components/sections/home_05/Section3";
import CryptoCard from "../../components/sections/home_05/Section4";
import QuoteRequestSection from "../../components/sections/home_05/Section5";
import ReviewSection from "../../components/sections/home_05/Section6";
import SimpleAppSection from "../../components/sections/home_05/Section8";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const bannerRef = useRef(null);
  const bankingInvestRef = useRef(null);
  const bankingHeroRef = useRef(null);
  const cryptoRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    // Common animation settings for smoothness
    const defaults = {
      ease: "power3.out", // Smoother easing
      duration: 1.5, // Slightly longer duration for fluidity
    };

    // Hero fade-in on load (no scroll trigger for initial load)
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    // SolarEnergycards staggered fade-in
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          stagger: 1, // Slightly increased stagger
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%", // Trigger a bit earlier
            end: "bottom 30%",
            scrub: 1, // Smoother scrub
          },
        }
      );
    }

    // BannerLayout5 parallax effect
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: "10%", // Slightly more pronounced parallax
        ease: "none",
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 30%",
          end: "bottom top",
          scrub: 1, // Smoother parallax
        },
      });
    }

    // BankingInvestmentSection fade-in
    if (bankingInvestRef.current) {
      gsap.fromTo(
        bankingInvestRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          scrollTrigger: {
            trigger: bankingInvestRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // BankingHeroSection fade-in
    if (bankingHeroRef.current) {
      gsap.fromTo(
        bankingHeroRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          scrollTrigger: {
            trigger: bankingHeroRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // CryptoCard staggered fade-in
    if (cryptoRef.current) {
      gsap.fromTo(
        cryptoRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          stagger: 0.25,
          scrollTrigger: {
            trigger: cryptoRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // QuoteRequestSection fade-in
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ...defaults,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.5,
          },
        }
      );
    }

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-white">
      <Navbar />
      <div ref={heroRef}>
        <Hero />
      </div>
      <div ref={cardsRef}>
          <SimpleAppSection />
      </div>

      <div ref={cardsRef}>
        <SolarEnergycards />
      </div>
      <div ref={bannerRef}>
        <BannerLayout5 />
      </div>
      <div ref={bankingInvestRef}>
        <BankingInvestmentSection />
      </div>
      <div ref={bankingHeroRef}>
        <BankingHeroSection />
      </div>
      <div ref={cryptoRef}>
        <CryptoCard />
      </div>
      <div ref={quoteRef}>
        <QuoteRequestSection />
      </div>
      <div ref={quoteRef}>
        <ReviewSection />
      </div>
      
      <Footer />
    </div>
  );
}

export default Home;
