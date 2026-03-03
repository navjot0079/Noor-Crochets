import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 bg-cream flex items-center justify-center z-50">
            <div className="text-center">
                {/* Yarn Spinning Animation */}
                <motion.div
                    className="w-24 h-24 mx-auto mb-6 relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                    <div className="absolute inset-0 border-8 border-blush rounded-full border-t-gold"></div>
                    <div className="absolute inset-2 border-8 border-sage rounded-full border-b-gold"></div>
                    <div className="absolute inset-4 border-8 border-lavender rounded-full border-l-gold"></div>
                </motion.div>

                {/* Brand Name */}
                <motion.h1
                    className="text-4xl font-serif font-bold text-darkBrown mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Noor <span className="text-gold">Crochets</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    className="text-darkBrown/70 font-sans italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Handcrafted with Love, Stitched with Care
                </motion.p>

                {/* Loading Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 bg-gold rounded-full"
                            animate={{
                                y: [-10, 10, -10],
                                opacity: [1, 0.5, 1],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
