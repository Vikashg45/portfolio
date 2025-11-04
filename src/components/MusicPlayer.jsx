import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpotify, FaForward, FaBackward, FaPlay, FaPause } from "react-icons/fa";

export default function MusicPlayer() {
    const playlist = [
        {
            title: "Jhoom Sharabi",
            artist: "Yo Yo Honey Singh",
            embedUrl:
                "https://open.spotify.com/embed/track/0jP7XLpEweluxyRWpEqAY6?utm_source=generator",
            type: "Track",
        },
        {
            title: "Honey Singh Album",
            artist: "Yo Yo Honey Singh",
            embedUrl:
                "https://open.spotify.com/embed/album/2iPimv2hsVBJZU1fvBfwkB?utm_source=generator",
            type: "Album",
        },
    ];

    const [isExpanded, setIsExpanded] = useState(false);
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const current = playlist[index];

    const nextTrack = (e) => {
        e.stopPropagation();
        setIndex((prev) => (prev + 1) % playlist.length);
    };

    const prevTrack = (e) => {
        e.stopPropagation();
        setIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
    };

    const togglePlay = (e) => {
        e.stopPropagation();
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-50"
        >
            {/* Compact Button */}
            <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full 
                   bg-gradient-to-r from-green-500 via-emerald-600 to-green-700
                   text-white font-medium shadow-lg shadow-green-500/30 
                   hover:shadow-green-400/50 transition-all duration-300"
            >
                <FaSpotify className="text-xl" />
                <span>Music</span>
            </motion.button>

            {/* Expandable Player */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        key={current.embedUrl}
                        initial={{ opacity: 0, scale: 0.85, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
                        className="absolute bottom-14 right-0 w-[280px] 
                       bg-black/90 backdrop-blur-xl border border-gray-700 
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
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="text-gray-400 hover:text-white transition text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Spotify Embed */}
                        <motion.div
                            key={current.embedUrl}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="px-1 py-1"
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

                        {/* Control Section */}
                        <motion.div
                            className="flex items-center justify-center gap-6 px-4 py-4 bg-black/40 border-t border-gray-800 backdrop-blur-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            {/* Previous Button */}
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

                            {/* Play / Pause */}
                            <motion.button
                                onClick={togglePlay}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative flex items-center justify-center w-14 h-14 rounded-full 
               bg-gradient-to-br from-green-500 to-emerald-600 text-white 
               shadow-lg shadow-green-700/40 hover:shadow-green-400/60 
               transition-all duration-300"
                            >
                                {isPlaying ? (
                                    <FaPause className="text-xl group-hover:scale-110 transition-transform" />
                                ) : (
                                    <FaPlay className="text-xl translate-x-[1px] group-hover:scale-110 transition-transform" />
                                )}
                            </motion.button>

                            {/* Next Button */}
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
                )}
            </AnimatePresence>
        </motion.div>
    );
}
