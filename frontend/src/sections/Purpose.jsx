

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Purpose = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    // Section animation
    gsap.fromTo(
      el,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );

    // Stagger list items
    gsap.fromTo(
      el.querySelectorAll(".fade-item"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <div className="w-full flex flex-col p-4 md:p-8">
      <div
        ref={sectionRef}
        className="bg-[#0B1422] text-white px-5 md:px-10 py-8 rounded-3xl"
      >
        {/* Mission */}
        <div className="border-b pb-8">
          <h1 className=" text-3xl md:text-5xl lg:text-6xl font-medium mb-6 text-orange-400 uppercase fade-item">
            Our Mission
          </h1>

          <div className="w-full md:w-[70%]">
            <ul className="space-y-3 list-disc pl-5">
              {[
                "Drive sustainable growth and meaningful impact",
                "Deliver high-quality engineering solutions",
                "Focus on user-centric design and innovation",
                "Ensure excellence in every detail we create",
                "Empower businesses with cutting-edge digital products",
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-base md:text-lg lg:text-xl fade-item"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vision */}
        <div className="mt-10 flex flex-col md:items-end">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium mb-6 text-orange-400 uppercase fade-item">
            Our Vision
          </h1>

          <div className="w-full md:w-[70%] md:text-left flex flex-col items-end">
            <ul className="space-y-3 list-disc md:pr-5 p-2">
              {[
                "Set new standards in technology and design",
                "Lead innovation across industries",
                "Become a global benchmark in digital transformation",
                "Create intuitive and seamless tech experiences",
                "Help every client achieve success through technology",
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-base md:text-lg lg:text-xl fade-item "
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purpose;