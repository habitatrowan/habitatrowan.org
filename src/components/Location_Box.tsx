import React from "react";

const Location_Box: React.FC = () => {
  return (
    <section
      className="p-6 md:p-7 rounded-xl text-center shadow-[0_6px_24px_rgba(0,0,0,0.12)]"
      style={{ background: "linear-gradient(90deg, #005596 0%, #54B948 100%)" }}
    >
      <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Have a Question?</h2>
      <a
        href="/contact"
        className="inline-flex items-center justify-center px-10 md:px-12 py-3 rounded-full font-semibold text-white border border-white/30 bg-white/15 hover:bg-white/25 backdrop-blur-md transition-all min-w-[240px]"
      >
        Contact Us
      </a>
    </section>
  );
};

export default Location_Box;
