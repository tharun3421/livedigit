import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    // Split heading
    const splitHeading = new SplitText(headingRef.current, {
      type: "lines",
    });

    // Split paragraph
    const splitText = new SplitText(textRef.current, {
      type: "lines",
    });

    // Wrap lines (important)
    [...splitHeading.lines, ...splitText.lines].forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    // Animate heading first
    gsap.from(splitHeading.lines, {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
      },
    });

    // Then paragraph
    gsap.from(splitText.lines, {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
      },
    });

    return () => {
      splitHeading.revert();
      splitText.revert();
    };
  }, []);

  return (
    <section className=" w-full mt-4  md:px-10 flex flex-col items-center justify-center">
      <div ref={sectionRef} className="max-w-7xl mx-auto p-3">

        <div className="w-full md:w-[70vw] ">
          
          {/* ✅ FIXED HEADING */}
          <h2
            ref={headingRef}
            className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-6 text-orange-400 uppercase max-w-150"
          >
            Driven by Purpose
          </h2>

          <p
            ref={textRef}
            className="text-base md:text-2xl lg:text-3xl leading-relaxed"
          >
            At LiveDigit, we combine innovation with engineering excellence to
            transform ideas into impactful digital experiences. From concept to
            execution, we focus on building scalable, user-centric solutions that
            drive real growth.
          </p>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;