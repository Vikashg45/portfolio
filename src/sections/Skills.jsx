import { SiPostman, SiSwagger, SiTypescript, SiTailwindcss, SiMongodb, SiAngular, SiNextdotjs, SiDocker } from "react-icons/si";
import { FaJava, FaReact } from "react-icons/fa";
import { DiPostgresql, DiNodejsSmall } from "react-icons/di";
import { motion, useMotionValue } from "framer-motion";

import { useEffect, useRef, useState } from "react";

export default function Skills() {

    const skills = [
        { icon: <FaJava />, name: "Java" },
        { icon: <FaReact />, name: "React" },
        { icon: <SiNextdotjs />, name: "Next.js" },
        { icon: <SiTypescript />, name: "TypeScript" },
        { icon: <SiTailwindcss />, name: "Tailwind CSS" },
        { icon: <SiSwagger />, name: "Swagger" },
        { icon: <DiPostgresql />, name: "PostgreSQL" },
        { icon: <SiPostman />, name: "Postman" },
        { icon: <SiDocker />, name: "Docker" },
        { icon: <DiNodejsSmall />, name: "Node.js" },
        { icon: <SiMongodb />, name: "MongoDB" },
        { icon: <SiAngular />, name: "Angular" },
    ];

    const repeated = [...skills, ...skills];

    const [dir, setDir] = useState(-1);
    const [active, setActive] = useState(false);
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const touchY = useRef(null);
    const x = useMotionValue(0);


    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver((
            [entry]) => {
            setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
        }, { threshold: [0.1] });
        io.observe(el);
        return () => io.disconnect();

    }, [])


    useEffect(() => {
        if (!active) return;
        const onWheel = (e) => setDir(e.deltaY > 0 ? 1 : -1);
        const onTouchStart = (e) => { touchY.current = e.touches[0].clientY };
        const onTouchMove = (e) => {
            if (touchY.current === null) return;
            const deltaY = e.touches[0].clientY - touchY.current;
            setDir(deltaY > 0 ? 1 : -1);
            touchY.current = e.touches[0].clientY;
        };
        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });

        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
        }

    }, [active]);

    useEffect(() => {
        let id;
        let last = performance.now();
        const speed = 80;

        const tick = (now) => {
            const dt = (now - last) / 1000;
            last = now;
            let next = x.get() + dir * dt * speed;
            const loop = trackRef.current?.scrollWidth / 2 || 0;
            if (loop) {
                if (next <= -loop) next += loop;
                if (next >= 0) next -= loop;
            }
            x.set(next);
            id = requestAnimationFrame(tick); // ✅ keep looping
        };

        id = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(id);
    }, [dir, x]);

    return (
        <section id="skills" ref={sectionRef} className="h-1/2 w-full pb-8 flex flex-col  items-center justify-center relative bg-black text-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse" />
            </div>



            <motion.h2 className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}>
                My Skills
            </motion.h2>

            <motion.p className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10"
                initial={{ y: -10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}>
                Modern Applications | Modern Technologies
            </motion.p>

            <div className="relative w-full overflow-hidden">
                <motion.div ref={trackRef} className="flex gap-10 text-6xl text-[#1cd8d2]"
                    style={{ x, whiteSpace: "nowrap", willChange: "transform" }}>
                    {repeated.map((skill, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center gap-2 min-w-[120px]" aria-label={skill.name} title={skill.name}
                        >
                            <span className="hover:scale-125 transition-transform duration-300">{skill.icon}</span>
                            <p className="text-sm">{skill.name}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section >
    )
}