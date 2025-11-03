import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ExperienceTimeline() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Fill height of the timeline (0% → 100%)
    const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
        {
            title: "Web Developer Intern",
            company: "Mobisoft Technologies",
            year: "2022 – 2023",
            description:
                "Worked on real-world client projects to enhance web performance and user experience. Improved skills in front-end design, back-end integration, and responsive UI development using modern frameworks.",
        },
        {
            title: "Graduate Engineer",
            company: "HCL Technologies",
            year: "2024 – 2025",
            description:
                "Built frontend interfaces for GenAI-powered enterprise applications using Next.js and TypeScript. Collaborated with global teams to design scalable solutions for automated data and report processing systems.",
        },
    ];

    const cardVariants = {
        hidden: (isAbove) => ({
            opacity: 0,
            y: isAbove ? 100 : -100,
            scale: 0.95,
        }),
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section
            id="experience"
            ref={ref}
            className="relative bg-black text-white py-32 px-4 sm:px-8 overflow-hidden"
        >
            <h2 className="text-5xl font-bold text-center mb-24">Experience</h2>

            <div className="relative w-full max-w-3xl mx-auto">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[4px] h-full bg-gray-700 rounded-full">
                    <motion.div
                        className="absolute left-0 top-0 w-full bg-gradient-to-b from-indigo-500 to-pink-500 rounded-full"
                        style={{ height: fillHeight }}
                    />
                </div>

                <div className="flex flex-col space-y-24">
                    {experiences.map((exp, i) => {
                        const isLeft = i % 2 === 0;
                        return (
                            <motion.div
                                key={i}
                                className={`relative flex ${isLeft ? "justify-start" : "justify-end"
                                    } items-center w-full`}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                custom={isLeft}
                                variants={cardVariants}
                            >
                                {/* Card */}
                                <div
                                    className={`w-[90%] sm:w-[45%] bg-[#0b0e17] border border-gray-800 rounded-2xl p-6 shadow-2xl hover:scale-105 transition-transform duration-500 ${isLeft ? "text-left" : "text-right"
                                        }`}
                                >
                                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                                    <p className="text-gray-400 text-sm mt-1">
                                        {exp.company} | {exp.year}
                                    </p>
                                    <p className="mt-3 text-gray-300 text-sm leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>

                                {/* Dot Connector */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-gray-800 rounded-full z-10" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
