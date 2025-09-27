import React, { useEffect, useRef, useState } from "react";
import { Users, Home as HomeIcon, Calendar } from "lucide-react"; // ✅ added Calendar
import { fetchJson } from "../utils/fetchJson";

type ImpactItem = { number: string; label: string; icon: "Home" | "Users" | "Calendar" };

const DEFAULT_IMPACT: ImpactItem[] = [
    { number: "143", label: "Homes Built", icon: "Home" },
    { number: "6-8", label: "Homes Built Annually", icon: "Calendar" }, // ✅ switched to Calendar
    { number: "500+", label: "Volunteers Annually", icon: "Users" },
];

const ICONS = { Home: HomeIcon, Users, Calendar }; // ✅ added Calendar here

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
            entries => entries.forEach(e => { if (e.isIntersecting) { el.classList.add("reveal-in"); obs.unobserve(el); } }),
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

const ImpactGrid: React.FC<Props> = ({
    dataUrl = "/data/home_impact.json",
    id = "impact",
    className = "",
    heading = (
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
            <span className="text-[#005596]">Impact</span> <span className="text-[#54B948]">Stats</span>
        </h2>
    ),
}) => {
    const [items, setItems] = useState<ImpactItem[]>(DEFAULT_IMPACT);
    const sectionRef = useReveal<HTMLDivElement>();

    useEffect(() => {
        (async () => {
            try {
                const impact = await fetchJson<ImpactItem[]>(dataUrl);
                if (Array.isArray(impact) && impact.every(i => i?.number && i?.label && i?.icon && ICONS[i.icon as keyof typeof ICONS])) {
                    setItems(impact);
                }
            } catch {}
        })();
    }, [dataUrl]);

    return (
        <section id={id} className={`py-16 scroll-mt-28 ${className}`}>
            <div ref={sectionRef} className="max-w-6xl mx-auto px-4 reveal">
                {heading}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((stat, index) => {
                        const Icon = ICONS[stat.icon] || HomeIcon;
                        return (
                            <div key={index} className={`${CARD_BASE} text-center p-8`}>
                                <div className="flex justify-center mb-4">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
                                        style={{ background: "linear-gradient(90deg, #005596 0%, #54B948 100%)" }}
                                    >
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">{stat.number}</h3>
                                <p className={`${NEUTRAL_MUTED} text-lg`}>{stat.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                .reveal { opacity: 0; transform: translateY(24px); }
                .reveal-in { opacity: 1; transform: translateY(0); transition: opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1); }
            `}</style>
        </section>
    );
};

export default ImpactGrid;
