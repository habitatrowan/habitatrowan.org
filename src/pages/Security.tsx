import React from 'react';

const Security: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
            Security Policy
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Effective Date: September 27, 2025
          </p>
        </header>

        <div className="space-y-8 text-neutral-800 dark:text-neutral-200">
          <section>
            <h2 className="text-lg font-semibold mb-2">Commitment to Security</h2>
            <p>
              We take reasonable measures to protect information from unauthorized access, alteration,
              disclosure, or destruction. Our approach includes administrative, technical, and physical safeguards.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Security Practices</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Encryption of sensitive data in transit and at rest where applicable.</li>
              <li>Restricted access to personal information based on roles and responsibilities.</li>
              <li>Regular system updates and security patches.</li>
              <li>Use of secure connections (HTTPS/TLS) across our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">User Responsibility</h2>
            <p>
              Users are encouraged to take steps to maintain security, including keeping login
              credentials private, using strong passwords, and reporting suspicious activity promptly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Incident Response</h2>
            <p>
              In the event of a security incident, we will investigate promptly and notify affected
              individuals and authorities as required by applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Third-Party Services</h2>
            <p>
              We work with trusted third-party vendors to provide services. These providers are
              contractually required to implement appropriate safeguards to protect information.
            </p>
          </section>

          <section className="text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              While no system can guarantee absolute security, we are committed to ongoing improvements
              to protect the information entrusted to us. Questions? Contact us at <a href="mailto:info@habitatrowan.org" className="underline">info@habitatrowan.org</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Security;
