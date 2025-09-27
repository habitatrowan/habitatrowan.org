import React from 'react';

const DataUse: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
            Data Use Policy
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Effective Date: September 27, 2025
          </p>
        </header>

        <div className="space-y-8 text-neutral-800 dark:text-neutral-200">
          <section>
            <h2 className="text-lg font-semibold mb-2">Purpose of Data Collection</h2>
            <p>
              We collect and process information to support our operations, deliver services, improve user
              experiences, and ensure compliance with applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Types of Data Collected</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><span className="font-medium">Personal Data:</span> Information you provide directly, such as name, email, phone, or address.</li>
              <li><span className="font-medium">Usage Data:</span> Information about how you interact with our website or services.</li>
              <li><span className="font-medium">Technical Data:</span> Device identifiers, browser information, and IP addresses.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">How Data is Used</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide services, resources, and support.</li>
              <li>To process donations and participation forms.</li>
              <li>To analyze trends and improve site functionality.</li>
              <li>To comply with legal and regulatory requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Retention of Data</h2>
            <p>
              We retain data only as long as necessary to fulfill the purposes outlined in this policy,
              or as required by law. Data that is no longer required is securely deleted or anonymized.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Your Rights</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Request access to your personal data.</li>
              <li>Request correction or deletion of inaccurate or outdated information.</li>
              <li>Withdraw consent for certain processing activities.</li>
            </ul>
          </section>

          <section className="text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              This policy is intended as a general framework. For specific questions or requests related to data use,
              please contact us at <a href="mailto:info@habitatrowan.org" className="underline">info@habitatrowan.org</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DataUse;
