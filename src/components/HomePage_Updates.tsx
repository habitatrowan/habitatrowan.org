import React, { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import { fetchJson } from "../utils/fetchJson";

type UpdateItem = { title: string; body: string; time: string };

const DEFAULT_UPDATES: UpdateItem[] = [
    { title: "Weather Closure", body: "We are closed today due to severe weather. Stay safe — we'll post when we reopen.", time: "Mar 12, 2025 • 8:05 AM" },
    { title: "Milestone!", body: "We just finished our 155th home. Huge thanks to every volunteer and partner who swung a hammer.", time: "Mar 8, 2025 • 4:20 PM" },
    { title: "ReStore Donation Day", body: "Extra hands needed this Saturday for a big donation intake. Stop by if you can lend an hour.", time: "Mar 6, 2025 • 9:10 AM" },
    { title: "Info Session Reminder", body: "Homeownership info session this Saturday at 10:00 AM at our office. No registration required.", time: "Mar 1, 2025 • 2:00 PM" },
];

const NEUTRAL_MUTED = "text-neutral-600 dark:text-neutral-300";
const NEUTRAL_CARD = "bg-white dark:bg-neutral-900";
const NEUTRAL_BORDER = "border border-neutral-200 dark:border-neutral-700";
const CARD_BASE = `${NEUTRAL_CARD} ${NEUTRAL_BORDER} rounded-xl shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.18)] hover:ring-2 ring-neutral-300 dark:ring-neutral-700`;

function useReveal<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) {
                    el.classList.add("reveal-in");
                    obs.unobserve(el);
                }
            }),
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return ref;
}

type Props = {
    dataUrl?: string;
    id?: string;
    className?: string;
    heading?: React.ReactNode;
};

const Updates: React.FC<Props> = ({
    dataUrl = "/data/home_updates.json",
    id = "updates",
    className = "",
    heading = (
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-10">
            <span className="text-[#005596]">Latest</span> <span className="text-[#54B948]">Updates</span>
        </h2>
    ),
}) => {
    const [items, setItems] = useState<UpdateItem[]>(DEFAULT_UPDATES);
    const sectionRef = useReveal<HTMLDivElement>();

    useEffect(() => {
        (async () => {
            try {
                const updates = await fetchJson<UpdateItem[]>(dataUrl);
                if (Array.isArray(updates) && updates.every((u) => u?.title && u?.body && u?.time)) {
                    setItems(updates);
                }
            } catch {}
        })();
    }, [dataUrl]);

    return (
        <section id={id} className={`py-12 sm:py-16 scroll-mt-28 ${className}`}>
            <div ref={sectionRef} className="max-w-6xl mx-auto px-4 reveal">
                {heading}

                <div
                    className="updates-scrollbar flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory px-1 py-1"
                    style={{ scrollBehavior: "smooth" }}
                >
                    {items.map((t, i) => (
                        <article
                            key={i}
                            className={`${CARD_BASE} min-w-[85%] xs:min-w-[70%] sm:min-w-[360px] max-w-[480px] snap-start p-5 sm:p-6`}
                        >
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: "linear-gradient(90deg, #005596 0%, #54B948 100%)" }}
                                />
                                <span>Update</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">
                                <span className="text-[#005596]">{t.title.split(" ")[0]}</span>{" "}
                                <span className="text-[#005596]">{t.title.split(" ").slice(1).join(" ")}</span>
                            </h3>
                            <p className={`${NEUTRAL_MUTED} text-sm sm:text-base mb-3`}>{t.body}</p>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                                <Clock className="w-4 h-4" />
                                <time>{t.time}</time>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <style>{`
                .reveal { opacity: 0; transform: translateY(24px); }
                .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1); }

                .updates-scrollbar::-webkit-scrollbar {
                    height: 8px;
                }
                .updates-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .updates-scrollbar::-webkit-scrollbar-thumb {
                    background: transparent;
                    border-radius: 8px;
                }
                .updates-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: rgba(163,163,163,0.6);
                }
                .dark .updates-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: rgba(64,64,64,0.6);
                }

                .updates-scrollbar {
                    scrollbar-width: none;
                }
                .updates-scrollbar:hover {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(163,163,163,0.6) transparent;
                }
                .dark .updates-scrollbar:hover {
                    scrollbar-color: rgba(64,64,64,0.6) transparent;
                }
            `}</style>
        </section>
    );
};

export default Updates;
