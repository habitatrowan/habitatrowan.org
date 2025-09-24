import React, { useEffect, useRef, useState } from 'react';
import { Target, Eye, Mail, Phone } from 'lucide-react';
import { fetchJson } from '../utils/fetchJson'; // adjust path if needed

/** --- tiny in-file scroll reveal helper (no deps) --- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('reveal-in');
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// theme tokens
const NEUTRAL_TEXT = 'text-neutral-900 dark:text-neutral-50';
const NEUTRAL_MUTED = 'text-neutral-600 dark:text-neutral-300';
const NEUTRAL_CARD = 'bg-white dark:bg-neutral-900';
const NEUTRAL_BORDER = 'border border-neutral-200 dark:border-neutral-700';
const CARD_BASE =
  `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)]
   transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)]
   hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:ring-2
   ring-neutral-300 dark:ring-neutral-700`;

type Staff = {
  name: string;
  title: string;
  email?: string;
  phone?: string; // defaults to main office if not provided
  ext?: string;
  description?: string;
};

type HistoryMilestone = { year: string; event: string };

const MAIN_PHONE = '(704) 642-1222';

/** ===== Defaults used as graceful fallback if JSON is missing/malformed ===== */
const DEFAULT_STAFF: Staff[] = [
  {
    name: 'Coleman Emerson',
    title: 'Executive Director',
    email: 'habitat@habitatrowan.org',
    phone: MAIN_PHONE,
    description:
      `Coleman is nearly a lifelong resident of Rowan County. His family owned and operated a furniture store in Salisbury. After graduating from Catawba College he worked as a manufacturers representative for Bassett Furniture Industries. Later he settled down, got married, and purchased his families’ interest in their furniture store. Seeking to experience first hand the value of a job focused on service he closed his store and began working for Habitat in 1998. He considers his work with Habitat to be a blessing, saying that it has allowed him to participate with some very fine people in a very fine cause.`
  },
  {
    name: 'Jane Hartness',
    title: 'Volunteer Coordinator and Family Intake Specialist',
    email: 'volunteer@habitatrowan.org',
    phone: MAIN_PHONE,
    description:
      `With the exception of her college years, Jane has lived in Salisbury all her life, and has been involved in church, school and community activities most of that time. She loves to work with volunteers! She has coordinated volunteer services as a profession for 25 years, and enjoys getting to know people who give their time and abilities to help a cause in which they believe. Habitat for Humanity provides a wonderful opportunity for people to help others through various activities and events. She is pleased that Rowan County has the services of Habitat and that she can be a part of this great organization.`
  },
  {
    name: 'Elizabeth Brady',
    title: 'Director of ReStore Operations',
    email: 'store@habitatrowan.org',
    phone: MAIN_PHONE,
    description:
      `Elizabeth has lived in Salisbury for most of her life. After graduating from Salisbury High School in 1988 and Western Carolina University in 1992, she went to work as a buyer/merchandiser for JCPenney for seven years. She spent the next 8 years raising her family and volunteering at Habitat for Humanity, the N.C. Transportation Museum, Overton Elementary School, and Milford Hills United Methodist Church. Looking to go back to work in a field that would utilize her business training but also be spiritually fulfilling, she says she “found the perfect fit with Habitat.” She has been ReStore Director since 2006.`
  },
  {
    name: 'Nate Wrights',
    title: 'ReStore Donations Manager',
    email: 'donations@habitatrowan.org',
    phone: MAIN_PHONE,
    description:
      `Nate joined Habitat for Humanity in 2010 as our Donations Manager. Nate holds a BA in Sociology and a minor in Economics from Catawba College. Nate began his service with Habitat for Humanity of Rowan County as a volunteer in 2006 while attending Catawba College.`
  },
  {
    name: 'Clem Berger',
    title: 'ReStore Donations Supervisor',
    email: 'clem@habitatrowan.org',
    phone: MAIN_PHONE,
    description:
      `Clem joined Habitat for Humanity in 2019. He holds a degree in Criminal Justice from Livingstone College. He is also a certified personal trainer. Clem loves all things football!`
  },
  {
    name: 'Tyrone Rankin',
    title: 'ReStore Receiving Associate',
    phone: MAIN_PHONE,
    description:
      `Tyrone began his journey with Habitat for Humanity ReStore as a volunteer while he was attending Salisbury High School. After he graduated he continued to volunteer. As our store grew he was offered a paid position as receiving associate. Tyrone accompanies Nate and Clem to pickup donated items from homes and businesses.`
  },
  {
    name: 'Clinton Jones',
    title: 'ReStore Receiving Supervisor',
    email: 'clinton@habitatrowan.org',
    phone: MAIN_PHONE
  },
  {
    name: 'Sue Gajewski',
    title: 'ReStore Customer Service Supervisor',
    email: 'rowanrestore@gmail.com',
    phone: MAIN_PHONE
  },
  {
    name: 'David Rowh',
    title: 'Construction Supervisor',
    email: 'build@habitatrowan.org',
    phone: MAIN_PHONE,
    description:
      `A native of Virginia, David first worked with Habitat for Humanity as a volunteer in Florida after Hurricane Andrew in 1992. He came to Salisbury while serving in the AmeriCorps program. He has been our Construction Supervisor since 1998.`
  }
];

const DEFAULT_HISTORY: HistoryMilestone[] = [
  { year: '1985', event: 'Habitat for Humanity of Rowan County was established by a group of dedicated volunteers' },
  { year: '1987', event: 'First home completed on East Council Street in Salisbury' },
  { year: '1992', event: 'Reached milestone of 10 homes built in the community' },
  { year: '1998', event: 'Opened first ReStore location to support our mission' },
  { year: '2005', event: 'Celebrated 50th home dedication with community-wide event' },
  { year: '2010', event: 'Expanded ReStore operations to current location' },
  { year: '2015', event: 'Reached 100 homes built milestone' },
  { year: '2020', event: 'Adapted programs during pandemic to continue serving families safely' },
  { year: '2023', event: 'Celebrated 143rd home completion and continued growth' }
];

const About = () => {
  // state backed by JSON, with graceful fallback to defaults
  const [staffMembers, setStaffMembers] = useState<Staff[]>(DEFAULT_STAFF);
  const [historyMilestones, setHistoryMilestones] = useState<HistoryMilestone[]>(DEFAULT_HISTORY);

  useEffect(() => {
    // Handle hash navigation – align to top so titles aren't hidden by sticky header
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // fetch JSON on mount
  useEffect(() => {
    (async () => {
      const staff = await fetchJson<Staff[]>('/data/about_staff.json');
      if (Array.isArray(staff) && staff.every(s => s.name && s.title)) {
        setStaffMembers(staff);
      }
      const history = await fetchJson<HistoryMilestone[]>('/data/about_history.json');
      if (Array.isArray(history) && history.every(h => h.year && h.event)) {
        setHistoryMilestones(history);
      }
    })();
  }, []);

  // reveal refs
  const headerRef = useReveal<HTMLDivElement>();
  const aboutRef = useReveal<HTMLDivElement>();
  const missionRef = useReveal<HTMLDivElement>();
  const visionRef = useReveal<HTMLDivElement>();
  const presRef = useReveal<HTMLDivElement>();
  const staffRef = useReveal<HTMLDivElement>();
  const historyRef = useReveal<HTMLDivElement>();

  return (
    <div className={`min-h-screen py-16 ${NEUTRAL_TEXT}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 reveal">
          <h1 className="text-4xl font-extrabold mb-4">
            <span className="text-[#005596]">About</span> <span className="text-[#54B948]">Us</span>
          </h1>
          <p className={`text-xl ${NEUTRAL_MUTED} max-w-3xl mx-auto`}>
            Learn about our mission, vision, and the people who make our work possible in Rowan County.
          </p>
        </div>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        {/* About Habitat Section */}
        <section id="about-habitat" className="mb-16 scroll-mt-28">
          <div ref={aboutRef} className="max-w-4xl mx-auto reveal">
            <h2 className="text-3xl font-extrabold mb-8">
              <span className="text-[#005596]">About</span> <span className="text-[#54B948]">Habitat for Humanity of Rowan County</span>
            </h2>

            <div className="prose prose-lg max-w-none prose-invert:prose-invert">
              <p className={`mb-6 ${NEUTRAL_MUTED} leading-relaxed`}>
                Habitat for Humanity of Rowan County is a local affiliate of Habitat for Humanity International,
                dedicated to bringing people together to build homes, communities, and hope. Since 1985, we have
                been working to eliminate poverty housing and homelessness from our community by building and
                renovating decent, affordable housing.
              </p>

              <p className={`mb-6 ${NEUTRAL_MUTED} leading-relaxed`}>
                Our work is made possible through the generous support of volunteers, donors, and community partners.
                Together, we have built 143 homes in Rowan County, providing safe, decent, and affordable housing
                for families in need. We continue to build 6–8 homes annually, with the help of over 500 volunteers
                each year.
              </p>

              <div className={`${CARD_BASE} p-6 mb-8`}>
                <h3 className="text-xl font-bold mb-3">
                  <span className="text-[#005596]">All</span> <span className="text-[#54B948]">Are Welcome</span>
                </h3>
                <p className={`${NEUTRAL_MUTED}`}>
                  Habitat for Humanity of Rowan County welcomes volunteers and supporters from all backgrounds.
                  We do not discriminate based on race, religion, nationality, political affiliation, sexual
                  orientation, or gender identity. All are welcome to join our mission of building homes,
                  communities, and hope.
                </p>
              </div>

              <h3 className="text-2xl font-bold mb-4">
                <span className="text-[#005596]">About</span> <span className="text-[#54B948]">Habitat for Humanity International</span>
              </h3>
              <p className={`${NEUTRAL_MUTED} leading-relaxed`}>
                Habitat for Humanity International is a global nonprofit housing organization working in local
                communities across all 50 states in the U.S. and in more than 70 countries around the world.
                Habitat&apos;s vision is of a world where everyone has a decent place to live. Since 1976, Habitat
                has helped more than 39 million people construct, rehabilitate or preserve homes.
              </p>
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        {/* Mission */}
        <section id="mission" className="mb-16 scroll-mt-28">
          <div ref={missionRef} className="text-center max-w-4xl mx-auto reveal">
            <Target className="w-16 h-16 mx-auto mb-6" style={{ color: '#54B948' }} />
            <h2 className="text-3xl font-extrabold mb-6">
              <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">Mission</span>
            </h2>
            <p className={`text-xl ${NEUTRAL_MUTED} leading-relaxed`}>
              Seeking to put God&apos;s love into action, Habitat for Humanity brings people together to build homes, communities and hope.
            </p>
          </div>
        </section>

        {/* Vision */}
        <section id="vision" className="mb-16 scroll-mt-28">
          <div ref={visionRef} className="text-center max-w-4xl mx-auto reveal">
            <Eye className="w-16 h-16 mx-auto mb-6" style={{ color: '#54B948' }} />
            <h2 className="text-3xl font-extrabold mb-6">
              <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">Vision</span>
            </h2>
            <p className={`text-xl ${NEUTRAL_MUTED} leading-relaxed`}>
              A world where everyone has a decent place to live.
            </p>
          </div>
        </section>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        {/* President */}
        <section id="president" className="mb-16 scroll-mt-28">
          <div ref={presRef} className="max-w-4xl mx-auto reveal">
            <h2 className="text-3xl font-extrabold mb-8 text-center">
              <span className="text-[#005596]">Our</span>{' '}
              <span className="text-[#54B948]">President</span>
            </h2>

            <div className={`${CARD_BASE} p-8`}>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-extrabold mb-2">
                    <span className="text-[#005596]">Jeff</span>{' '}
                    <span className="text-[#54B948]">Wetmore</span>
                  </h2>
                  <h3 className={`text-lg mb-4 ${NEUTRAL_MUTED}`}>President</h3>

                  <p className={`${NEUTRAL_MUTED} leading-relaxed mb-4`}>
                    Jeff Wetmore has been serving as President of Habitat for Humanity of Rowan County since 2015.
                    With over 20 years of experience in nonprofit management and community development, Jeff brings
                    passionate leadership to our mission of building homes, communities, and hope.
                  </p>

                  <p className={`${NEUTRAL_MUTED} leading-relaxed mb-6`}>
                    Under Jeff&apos;s leadership, our affiliate has continued to grow and expand its impact in the community,
                    maintaining our commitment to building quality, affordable housing while fostering strong partnerships
                    with volunteers, donors, and local organizations.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                      <span className={`${NEUTRAL_MUTED}`}>jwetmore@habitatrowan.org</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                      <span className={`${NEUTRAL_MUTED}`}>{MAIN_PHONE} ext. 101</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        {/* Staff */}
        <section id="staff" className="mb-16 scroll-mt-28">
          <div ref={staffRef} className="max-w-6xl mx-auto reveal">
            <h2 className="text-3xl font-extrabold mb-8 text-center">
              <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">Staff</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {staffMembers.map((s) => (
                <article key={s.name} className={`${CARD_BASE} p-8`}>
                  {/* header (name + title) */}
                  <header className="mb-4">
                    <h3 className="text-2xl font-extrabold leading-tight">
                      <span className="text-[#005596]">{s.name.split(' ')[0]}</span>{' '}
                      <span className="text-[#54B948]">{s.name.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    <p className={`${NEUTRAL_MUTED} mt-1`}>{s.title}</p>
                  </header>

                  {/* description */}
                  {s.description && (
                    <p className={`${NEUTRAL_MUTED} leading-relaxed mb-6`}>{s.description}</p>
                  )}

                  {/* contact lines */}
                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    {s.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                        <span className={`${NEUTRAL_MUTED}`}>{s.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                      <span className={`${NEUTRAL_MUTED}`}>
                        {s.phone || MAIN_PHONE}{s.ext ? ` ext. ${s.ext}` : ''}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-16" />

        {/* History */}
        <section id="history" className="mb-16 scroll-mt-28">
          <div ref={historyRef} className="max-w-4xl mx-auto reveal">
            <h2 className="text-3xl font-extrabold mb-8 text-center">
              <span className="text-[#005596]">Our</span> <span className="text-[#54B948]">History</span>
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#54B948]" />
              <div className="space-y-8">
                {historyMilestones.map((m) => (
                  <div key={m.year} className="flex gap-6 items-start">
                    <div
                      className="w-16 h-16 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 relative z-10 shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
                      style={{ background: 'linear-gradient(90deg, #005596 0%, #54B948 100%)' }}
                    >
                      {m.year}
                    </div>
                    <div className={`${CARD_BASE} p-6 flex-1`}>
                      <p className={`${NEUTRAL_MUTED} leading-relaxed`}>{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* final divider */}
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />
      </div>

      {/* local styles for reveal motion */}
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); }
        .reveal-in {
          opacity: 1; transform: translateY(0);
          transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1);
        }
      `}</style>
    </div>
  );
};

export default About;
