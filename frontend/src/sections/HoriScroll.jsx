// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const HoriScroll = () => {
//   const sectionRef = useRef(null);
//   const textRef = useRef(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     const text = textRef.current;

//     const ctx = gsap.context(() => {
//       const scrollDistance = text.scrollWidth - window.innerWidth;

//       gsap.fromTo(
//         text,
//         { x:0}, // start from right
//         {
//           x: -scrollDistance, // move left
//           ease: "none",
//           scrollTrigger: {
//             trigger: section,
//             start: "top top",
//         end: "+=1500",
//             scrub: 1,
//             pin: true,
//             anticipatePin: 1,
//             invalidateOnRefresh: true,
//           },
//         }
//       );
//     }, section);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="w-full h-screen overflow-hidden bg-white flex items-center"
//     >
//       <h1
//         ref={textRef}
//         className="text-[30vw] font-bold whitespace-nowrap"
//       >
//         LiveDigit. 
//       </h1>
//     </section>
//   );
// };

// export default HoriScroll;


import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HoriScroll = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const scrollDistance = text.scrollWidth - window.innerWidth;

      const ctx = gsap.context(() => {
        gsap.fromTo(
  text,
  { x: 0}, // ✅ start from right (outside screen)
  {
    x: -scrollDistance,     // ✅ move fully to left
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=1500",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  }
);
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
  ref={sectionRef}
  className="w-full min-h-[30vh] lg:min-h-screen overflow-hidden bg-white flex items-end lg:items-center px-4"
>
  <h1
    ref={textRef}
    className="font-bold whitespace-nowrap m-0 text-[20vw] sm:text-[20vw] md:text-[15vw] lg:text-[26vw]"
  >
    LiveDigit.
  </h1>
</section>
  );
};

export default HoriScroll;