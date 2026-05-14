import React from "react";
import { FileText, Car, Truck, Receipt } from "lucide-react";

const steps = [
  { icon: FileText, label: "Provide your info" },
  { icon: Car, label: "Submit your donation" },
  { icon: Truck, label: "Arrange free pickup" },
  { icon: Receipt, label: "Receive tax receipt" },
];

const GetInvolved_Cars: React.FC = () => {
  return (
    <section
      id="cars-for-homes"
      className="space-y-8"
    >
      <header className="text-center">
        <h2 className="text-3xl font-extrabold mb-4">How to donate your vehicle</h2>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          We make it fast and easy to donate a vehicle and you may{" "}
          <a
            href="https://www.habitat.org/support/donate-your-car/tax-benefits"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold text-[#005596] hover:text-[#054a86]"
          >
            qualify for a tax deduction
          </a>
          . Your vehicle donations raised over $72 million in just the last five years!
        </p>
      </header>

      <ol className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        {steps.map(({ icon: Icon, label }, idx) => (
          <li key={label} className="flex flex-col items-center text-center relative flex-1">
            <div className="w-16 h-16 rounded-full bg-white ring-1 ring-neutral-300 flex items-center justify-center shadow-md z-10">
              <Icon className="w-7 h-7 text-[#005596]" />
            </div>
            <p className="mt-2 text-sm font-medium text-neutral-800">{label}</p>
            {idx < steps.length - 1 && (
              <div className="absolute top-8 left-1/2 right-[-50%] h-0.5 bg-neutral-300 hidden md:block z-0" />
            )}
          </li>
        ))}
      </ol>

      <div className="space-y-4 text-neutral-700 max-w-3xl mx-auto">
        <p>
          Since launching the national vehicle donation program <strong>Cars for Homes</strong> in 2005, Habitat has accepted over 160,000 vehicles for reselling or recycling, raising funds for Habitat to partner with local families to build stability and security that a safe, affordable home allows.
        </p>
        <p>
          Start your donation online or call 1-877-277-4344 to donate by phone.
        </p>
      </div>

      <div className="text-center">
        <a
          href="https://www.habitat.org/support/donate-your-car?utm_campaign=cfh+post&utm_medium=social&utm_source=facebook"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-[#005596] to-[#54B948] text-white hover:opacity-90 transition-all"
        >
          Donate Your Vehicle
        </a>
      </div>
    </section>
  );
};

export default GetInvolved_Cars;
