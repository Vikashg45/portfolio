import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Astra from "../assets/astra.png";

export default function ContactSection() {
    const canvasRef = useRef(null);
    const formRef = useRef();
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(null); // null | true | false

    // ⭐ Animated Star Background
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let stars = Array.from({ length: 100 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 2,
            speed: Math.random() * 0.2,
        }));

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();

                star.y += star.speed;
                if (star.y > window.innerHeight) star.y = 0;
            });
            requestAnimationFrame(drawStars);
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawStars();
    }, []);

    // 📤 Handle EmailJS Submission
    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);

        emailjs
            .sendForm(
                "service_f15i1ns",
                "template_2qk4flg",
                formRef.current,
                "zaHEcZtBMXG1rpQyu"
            )
            .then(
                () => {
                    setIsSending(false);
                    setSent(true);
                    formRef.current.reset();
                    setTimeout(() => setSent(null), 3000);
                },
                (error) => {
                    console.error("Email send error:", error);
                    setIsSending(false);
                    setSent(false);
                    setTimeout(() => setSent(null), 3000);
                }
            );
    };

    return (
        <section
            id="contact"
            className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center bg-black text-white overflow-hidden"
        >
            {/* ⭐ Canvas Background */}
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>

            {/* 👨‍🚀 Floating Astronaut */}
            <motion.img
                src={Astra}
                alt="Astronaut"
                className="w-[320px] md:w-[400px] lg:w-[450px] z-10 mb-8 lg:mb-0"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 3, -3, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* 💬 Contact Form */}
            <motion.div
                className="relative z-10 bg-black/60 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 w-[90%] max-w-lg shadow-xl"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                    Let’s Work Together
                </h2>

                <form ref={formRef} onSubmit={sendEmail} className="flex flex-col space-y-5">
                    <div>
                        <label className="text-sm font-medium">Your Name *</label>
                        <input
                            type="text"
                            name="from_name"
                            required
                            placeholder="Your Name"
                            className="w-full mt-2 p-3 rounded-lg bg-black/50 border border-gray-700 text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Your Email *</label>
                        <input
                            type="email"
                            name="from_email"
                            required
                            placeholder="Your Email"
                            className="w-full mt-2 p-3 rounded-lg bg-black/50 border border-gray-700 text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Service Needed *</label>
                        <select
                            name="service"
                            required
                            className="w-full mt-2 p-3 rounded-lg bg-black/50 border border-gray-700 text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        >
                            <option value="Web Development">Web Development</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="App Development">App Development</option>
                            <option value="Something Else">Something Else</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Explain Your Idea *</label>
                        <textarea
                            name="message"
                            required
                            placeholder="Explain your idea..."
                            rows="4"
                            className="w-full mt-2 p-3 rounded-lg bg-black/50 border border-gray-700 text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                        ></textarea>
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={isSending}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
                    >
                        {isSending
                            ? "Sending..."
                            : sent === true
                                ? "✅ Sent!"
                                : sent === false
                                    ? "❌ Failed!"
                                    : "Send Message"}
                    </motion.button>
                </form>
            </motion.div>
        </section>
    );
}
