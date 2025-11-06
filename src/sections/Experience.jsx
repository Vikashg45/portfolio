import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ExperienceTimeline() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const fillHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    const experiences = [
        {
            title: "Software Developer",
            company: "Sumati.io",
            year: "2023 – Present",
            description:
                "Contributed to enterprise-level projects, building dashboards for tracking letter processing workflows. Designed real-time analytics using Chart.js to visualize processed, failed, and in-progress letters, and implemented automation pipelines to improve operational efficiency.",
        },
        {
            title: "Web Developer",
            company: "Persistent Systems",
            year: "Aug 2023 – Sep 2023",
            description:
                "Completed 20+ hours of structured training on Java, OOP, Linux, and DBMS. Applied programming concepts through 30+ hours of hands-on exercises and built small-scale Java applications implementing OOP principles. Gained practical experience in MySQL and Linux-based development environments.",
        },
    ];

    const cardVariants = {
        hidden: (isMobile) => ({
            opacity: 0,
            x: isMobile ? -80 : 0,
            y: isMobile ? 0 : 80,
            scale: 0.95,
        }),
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section
            id="experience"
            ref={ref}
            className="relative bg-black text-white py-24 px-4 sm:px-8 overflow-hidden"
        >
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-20">
                Experience
            </h2>

            <div className="relative w-full max-w-6xl mx-auto">
                {/* Timeline line */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-[3px] h-full bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className="absolute left-0 top-0 w-full bg-gradient-to-b from-indigo-500 to-pink-500 rounded-full"
                        style={{ height: fillHeight }}
                    />
                </div>

                {/* Timeline Cards */}
                <div className="flex flex-col gap-16 sm:gap-20 md:gap-24 relative">
                    {experiences.map((exp, i) => {
                        const isLeft = i % 2 === 0;

                        return (
                            <motion.div
                                key={i}
                                className={`relative flex flex-col sm:flex-row items-center ${isLeft ? "sm:justify-end" : "sm:justify-start"
                                    }`}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.4 }}
                                variants={cardVariants}
                            >
                                {/* Connector Dot */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white border-4 border-gray-800 rounded-full z-10" />

                                {/* Card */}
                                <div
                                    className={`relative bg-gradient-to-br from-[#111827] via-[#0b0e17] to-[#0f172a]
                  border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-green-500/10
                  transition-all duration-500 hover:scale-[1.02]
                  w-[88%] sm:w-[43%] md:w-[40%] lg:w-[38%]
                  ${isLeft
                                            ? "sm:mr-[calc(50%+1.5rem)] text-right"
                                            : "sm:ml-[calc(50%+1.5rem)] text-left"
                                        }`}
                                >
                                    {/* Title */}
                                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-1">
                                        {exp.title}
                                    </h3>

                                    {/* Company + Year */}
                                    <p className="text-sm text-gray-400 font-medium mb-3">
                                        {exp.company}{" "}
                                        <span className="text-gray-500">| {exp.year}</span>
                                    </p>

                                    {/* Description */}
                                    <p className="text-[15px] text-gray-300 leading-relaxed -tracking-normal text-justify">
                                        {exp.description}
                                    </p>

                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
