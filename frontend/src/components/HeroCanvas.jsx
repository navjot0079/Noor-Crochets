import { motion } from 'framer-motion';
import videoSrc from '../assets/images/Flow_delpmaspu_.mp4';

/**
 * HeroCanvas - Premium hero section with video background
 * 
 * Features:
 * - Video background with overlay
 * - Elegant text animations
 * - Responsive design
 */
const HeroCanvas = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Video Background */}
            <video
                className="absolute inset-0 w-full h-full object-cover z-0"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20 z-10" />

            {/* Typography overlay */}
            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center z-20"
                initial={{ opacity: 0, y: 50 }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 1.2,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1]
                }}
            >
                {/* Text container */}
                <div className="text-center px-6">
                    {/* Premium badge */}
                    <motion.div
                        className="inline-block mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 0.6,
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        <span className="inline-block bg-darkBrown/90 backdrop-blur-md text-cream px-6 py-2 rounded-full text-xs tracking-[0.3em] font-sans font-medium">
                            HANDCRAFTED LUXURY
                        </span>
                    </motion.div>

                    {/* Main heading - Playfair Display */}
                    <motion.h1
                        className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.8,
                            duration: 1,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        Noor Crochets
                    </motion.h1>

                    {/* Subtitle - Inter */}
                    <motion.p
                        className="font-sans text-lg md:text-xl text-white/90 max-w-2xl mx-auto tracking-wide leading-relaxed drop-shadow-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: 1.2,
                            duration: 1
                        }}
                    >
                        Where artisan craftsmanship meets timeless elegance.
                        <br />
                        Each piece, a story woven with love.
                    </motion.p>

                    {/* Scroll indicator */}
                    <motion.div
                        className="mt-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6 }}
                    >
                        <div className="w-6 h-10 border-2 border-white/40 rounded-full mx-auto relative">
                            <div className="w-1.5 h-2 bg-white/50 rounded-full absolute left-1/2 top-2 -translate-x-1/2" />
                        </div>
                        <p className="text-white/60 text-xs font-sans tracking-widest mt-3">
                            SCROLL TO EXPLORE
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default HeroCanvas;
