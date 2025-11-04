import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6"; // React Icons

export default function Footer() {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" },
        });
    }, [controls]);

    return (
        <footer className="relative flex flex-col items-center justify-center text-center text-white bg-gradient-to-r from-black via-slate-900 to-black py-12 px-4 overflow-hidden">
            {/* ✨ Background Glow Animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-teal-800/20 to-transparent blur-3xl"
            />

            {/* 👤 Name */}
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={controls}
                className="text-4xl md:text-5xl font-bold z-10"
            >
                Vikash Gupta
            </motion.h1>

            {/* 🎨 Underline Animation */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="h-[3px] bg-gradient-to-r from-blue-400 to-green-400 rounded-full mt-2 mb-6 z-10"
            />

            {/* 🌐 Social Icons */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center justify-center space-x-6 text-gray-300 z-10"
            >
                <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition text-2xl"
                >
                    <FaXTwitter />
                </a>
                <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition text-2xl"
                >
                    <FaLinkedin />
                </a>
                <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition text-2xl"
                >
                    <FaGithub />
                </a>
            </motion.div>

            {/* 💬 Quote */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-6 italic text-gray-300 z-10"
            >
                “Success is when preparation meets opportunity.”
            </motion.p>

            {/* © Copyright */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-4 text-sm text-gray-400 z-10"
            >
                © {new Date().getFullYear()} Vikash Gupta. All rights reserved.
            </motion.p>
        </footer>
    );
}
