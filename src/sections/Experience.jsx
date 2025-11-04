import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ExperienceTimeline() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Smooth fill animation for timeline line
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
        exit: {
            opacity: 0,
            y: -60,
            scale: 0.9,
            transition: { duration: 0.4, ease: "easeIn" },
        },
    };

    return (
        <section
            id="experience"
            ref={ref}
            className="relative bg-black text-white py-24 px-4 sm:px-8 overflow-hidden"
        >
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-24">
                Experience
            </h2>

            <div className="relative w-full max-w-6xl mx-auto">
                {/* Timeline Line */}
                <div className="absolute left-6 sm:left-1/2 transform sm:-translate-x-1/2 top-0 w-[4px] h-full bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className="absolute left-0 top-0 w-full bg-gradient-to-b from-indigo-500 to-pink-500 rounded-full"
                        style={{ height: fillHeight }}
                    />
                </div>

                {/* Experience Cards */}
                <div className="flex flex-col space-y-24 relative">
                    {experiences.map((exp, i) => {
                        const isMobile =
                            typeof window !== "undefined" && window.innerWidth < 640;
                        const isLeft = i % 2 === 0;

                        return (
                            <motion.div
                                key={i}
                                className={`relative flex flex-col sm:flex-row 
                ${isLeft
                                        ? "sm:justify-start sm:text-right"
                                        : "sm:justify-end sm:text-left"} 
                items-start sm:items-center`}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: false, amount: 0.4 }}
                                variants={cardVariants}
                                custom={isMobile}
                            >
                                {/* Connector Dot */}
                                <div className="absolute left-6 sm:left-1/2 transform sm:-translate-x-1/2 w-6 h-6 bg-white border-4 border-gray-800 rounded-full z-10" />

                                {/* Card */}
                                <div
                                    className={`relative bg-[#0b0e17] border border-gray-800 rounded-2xl p-6 shadow-xl transition-all duration-500 hover:scale-105
                    w-[85%] sm:w-[45%] md:w-[40%] lg:w-[38%]
                    ${isMobile ? "ml-12" : ""}
                    ${isLeft
                                            ? "sm:ml-auto sm:mr-20 lg:mr-32" // 🧩 More distance for large screens
                                            : "sm:mr-auto sm:ml-20 lg:ml-32"
                                        }`}
                                >
                                    <h3 className="text-lg sm:text-xl font-semibold">
                                        {exp.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-1">
                                        {exp.company} | {exp.year}
                                    </p>
                                    <p className="mt-3 text-gray-300 text-sm leading-relaxed">
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
