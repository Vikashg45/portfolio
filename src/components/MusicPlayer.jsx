import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { FaSpotify, FaForward, FaBackward } from "react-icons/fa";
import { FiChevronUp } from "react-icons/fi";

export default function MusicPlayer() {
    const playlist = [
        {
            title: "Jhoom Sharabi",
            artist: "Yo Yo Honey Singh",
            image:
                "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02d779fbe3f949261c32100ba7",
            embedUrl:
                "https://open.spotify.com/embed/track/0jP7XLpEweluxyRWpEqAY6?utm_source=generator",
        },
        {
            title: "Honey Singh Album",
            artist: "Yo Yo Honey Singh",
            image:
                "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02d779fbe3f949261c32100ba7",
            embedUrl:
                "https://open.spotify.com/embed/album/2iPimv2hsVBJZU1fvBfwkB?utm_source=generator",
        },
    ];

    const [isExpanded, setIsExpanded] = useState(false);
    const [showList, setShowList] = useState(false);
    const [index, setIndex] = useState(0);

    const current = playlist[index];

    const nextTrack = () =>
        setIndex((prev) => (prev + 1) % playlist.length);

    const prevTrack = () =>
        setIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));

    // ✅ Render in <body> so it’s truly fixed to screen
    return createPortal(
        <div
            className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end pointer-events-auto"
            style={{
                position: "fixed",
                bottom: "16px",
                right: "16px",
            }}
        >
            {/* Compact Toggle Button */}
            <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full
          bg-gradient-to-r from-green-500 via-emerald-600 to-green-700
          text-white font-medium shadow-lg shadow-green-500/30
          hover:shadow-green-400/50 transition-all duration-300"
            >
                <FaSpotify className="text-xl" />
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    <FiChevronUp className="text-xl" />
                </motion.div>
            </motion.button>

            {/* Expandable Player */}
            <motion.div
                animate={{
                    opacity: isExpanded ? 1 : 0,
                    scale: isExpanded ? 1 : 0.95,
                    y: isExpanded ? 0 : 20,
                    pointerEvents: isExpanded ? "auto" : "none",
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="mt-3 w-[320px] bg-black/90 backdrop-blur-xl border border-gray-700 
          rounded-2xl overflow-hidden shadow-2xl shadow-green-500/20"
            >
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-r from-green-600/40 to-emerald-700/40 border-b border-gray-700">
                    <div>
                        <h4 className="font-semibold text-xs text-white truncate">
                            {current.title}
                        </h4>
                        <p className="text-[10px] text-gray-400 truncate">
                            {current.artist}
                        </p>
                    </div>
                    <motion.button
                        onClick={() => setShowList(!showList)}
                        animate={{ rotate: showList ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="text-gray-300 hover:text-white transition text-lg"
                    >
                        <FiChevronUp />
                    </motion.button>
                </div>

                {/* Spotify Embed (Always Mounted) */}
                <motion.div
                    key={current.embedUrl}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="px-1 py-1 rounded-xl"
                >
                    <iframe
                        style={{ borderRadius: "10px" }}
                        src={current.embedUrl}
                        width="100%"
                        height="100"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-lg"
                        title={current.title}
                    ></iframe>
                </motion.div>

                {/* Song List */}
                <motion.div
                    animate={{
                        height: showList ? "auto" : "0px",
                        opacity: showList ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="border-t border-gray-800 bg-black/80 overflow-hidden"
                >
                    {playlist.map((song, i) => (
                        <motion.div
                            key={song.title}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                                setIndex(i);
                                setShowList(false);
                            }}
                            className={`flex items-center justify-between gap-2 p-2 rounded-md cursor-pointer transition-all mb-1 ${index === i
                                    ? "bg-white/10 border border-green-500/30 shadow-md shadow-green-500/10"
                                    : "hover:bg-white/5"
                                }`}
                        >
                            <div className="flex flex-col overflow-hidden">
                                <span
                                    className={`text-[13px] font-semibold truncate ${index === i ? "text-white" : "text-gray-200"
                                        }`}
                                >
                                    {song.title}
                                </span>
                                <span className="text-[11px] text-gray-400 truncate">
                                    {song.artist}
                                </span>
                            </div>
                            <motion.img
                                src={song.image}
                                alt={song.title}
                                className="w-10 h-10 rounded-md object-cover"
                                whileHover={{ scale: 1.08 }}
                                transition={{ type: "spring", stiffness: 150 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Controls */}
                <motion.div
                    className="flex items-center justify-center gap-6 px-4 py-4 bg-black/40 border-t border-gray-800 backdrop-blur-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <motion.button
                        onClick={prevTrack}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 
              bg-gradient-to-b from-gray-900 to-gray-800 text-gray-400 
              hover:border-green-500 hover:text-green-400 
              shadow-md shadow-black/40 hover:shadow-green-500/30 transition-all duration-300"
                    >
                        <FaBackward className="text-md group-hover:translate-x-[-1px] transition-transform" />
                    </motion.button>

                    <motion.button
                        onClick={nextTrack}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 
              bg-gradient-to-b from-gray-900 to-gray-800 text-gray-400 
              hover:border-green-500 hover:text-green-400 
              shadow-md shadow-black/40 hover:shadow-green-500/30 transition-all duration-300"
                    >
                        <FaForward className="text-md group-hover:translate-x-[1px] transition-transform" />
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>,
        document.body
    );
}
