import { useState, useEffect } from "react";

const defaultQuotes = [
  { text: "Elevate Your Brand in the Digital World", highlight: "Live Digit" },
  { text: "Smarter Marketing. Better Results. Every Time.", highlight: "Better Results" },
  { text: "Your Growth is Our Mission.", highlight: "Our Mission" },
  { text: "Digital Solutions Tailored Just for You.", highlight: "Tailored Just for You" },
  { text: "Connect. Compare. Choose the Best Quote.", highlight: "Best Quote" },
];

export default function QuoteSlider({ quotes = defaultQuotes, interval = 3000 }) {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setVisible(true);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [quotes, interval]);

  const { text, highlight } = quotes[currentQuote];
  const parts = text.split(highlight);

  return (
    <div
      className="text-[#c7c5cc] text-4xl font-bold font-sans  text-center transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <p>
        "{parts[0]}
        <span className="font-bold text-amber-500">{highlight}</span>
        "
      </p>
    </div>
  );
}