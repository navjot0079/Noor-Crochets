import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * HeroCanvas - Premium scroll-driven canvas animation component
 * 
 * Features:
 * - Bidirectional scroll control (forward/reverse)
 * - Frame-by-frame canvas rendering
 * - Sticky canvas during animation range
 * - Smooth scroll-to-frame mapping
 * - Anti-gravity floating effects
 * - Retina-ready rendering
 */
const HeroCanvas = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    // State management
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Animation configuration
    const frameCount = 192; // Total number of frames (ezgif-frame-001.jpg to ezgif-frame-192.jpg)
    const images = useRef([]);
    const frameIndexRef = useRef(0);

    /**
     * Preload all animation frames
     * This ensures smooth playback without loading delays
     */
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = [];
            let loaded = 0;

            // Create array of promises for parallel loading
            const promises = [];

            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                const frameNumber = i.toString().padStart(3, '0');

                const promise = new Promise((resolve, reject) => {
                    img.onload = () => {
                        loaded++;
                        setLoadingProgress(Math.round((loaded / frameCount) * 100));
                        resolve();
                    };
                    img.onerror = reject;
                });

                // Vite handles assets from src/assets
                img.src = new URL(
                    `../assets/images/frame/ezgif-frame-${frameNumber}.jpg`,
                    import.meta.url
                ).href;

                loadedImages[i - 1] = img;
                promises.push(promise);
            }

            try {
                await Promise.all(promises);
                images.current = loadedImages;
                setImagesLoaded(true);
            } catch (error) {
                console.error('Error loading frames:', error);
            }
        };

        loadImages();
    }, []);

    /**
     * Setup canvas with retina support and scroll listener
     */
    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', {
            alpha: true,
            willReadFrequently: false
        });

        if (!context) {
            console.error('Failed to get canvas 2D context');
            return;
        }

        const container = containerRef.current;

        /**
         * Setup canvas dimensions with device pixel ratio for retina displays
         */
        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            context.scale(dpr, dpr);

            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            renderFrame(frameIndexRef.current);
        };

        /**
         * Render a specific frame to canvas
         * Maintains aspect ratio and centers the image
         * Enhanced for maximum image quality
         */
        const renderFrame = (index) => {
            if (!images.current[index]) return;

            const img = images.current[index];
            const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
            const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

            // Calculate dimensions to cover canvas while maintaining aspect ratio
            const imgAspect = img.width / img.height;
            const canvasAspect = canvasWidth / canvasHeight;

            let renderWidth, renderHeight, offsetX, offsetY;

            if (imgAspect > canvasAspect) {
                // Image is wider - fit to height
                renderHeight = canvasHeight;
                renderWidth = renderHeight * imgAspect;
                offsetX = (canvasWidth - renderWidth) / 2;
                offsetY = 0;
            } else {
                // Image is taller - fit to width
                renderWidth = canvasWidth;
                renderHeight = renderWidth / imgAspect;
                offsetX = 0;
                offsetY = (canvasHeight - renderHeight) / 2;
            }

            // Enable high-quality image rendering
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';

            // Clear and draw with maximum quality
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
        };

        /**
         * Handle scroll events
         * Maps scroll position to frame index (bidirectional)
         * 
         * CRITICAL: Accounts for sticky positioning behavior
         * - Sticky elements stay visible for (containerHeight - viewportHeight)
         * - This is the actual scroll range for our animation
         * - Proper calculation prevents blank space at animation end
         * 
         * With 200vh container:
         * - scrollRange = 100vh (one viewport worth of scrolling)
         * - Animation completes at scrollProgress = 1.0
         * - At that exact moment, sticky releases
         * - Canvas naturally scrolls away over the remaining 100vh
         */
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const containerTop = container.offsetTop;
            const containerHeight = container.offsetHeight;
            const windowHeight = window.innerHeight;

            // Calculate scroll within animation range
            // This is the scroll distance while sticky is active
            const scrollRange = containerHeight - windowHeight;
            const scrollWithinRange = scrollTop - containerTop;
            const scrollProgress = scrollWithinRange / scrollRange;

            // Clamp between 0 and 1 with smooth boundaries
            const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

            // Update scroll progress for text fade effect
            setScrollProgress(clampedProgress);

            // Map to frame index with precise rounding for smooth playback
            // Using (frameCount - 1) ensures last frame shows at progress = 1.0
            const frameIndex = Math.min(
                frameCount - 1,
                Math.round(clampedProgress * (frameCount - 1))
            );

            // Only render if frame changed (performance optimization)
            if (frameIndex !== frameIndexRef.current) {
                frameIndexRef.current = frameIndex;
                requestAnimationFrame(() => renderFrame(frameIndex));
            }
        };

        // Initialize
        updateCanvasSize();
        handleScroll(); // Render initial frame

        // Event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', updateCanvasSize);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateCanvasSize);
        };
    }, [imagesLoaded]);

    return (
        <div style={{ margin: 0, padding: 0, display: 'block', width: '100%' }}>
            {/* 
                SCROLL-DRIVEN CANVAS ANIMATION (Optimized)
                
                How it works:
                - Container: 200vh (allows animation to play)
                - Sticky canvas: stays visible during scroll
                - Animation range: 200vh - 100vh = 100vh (smooth playback)
                - All 192 frames play across 100vh of scrolling
                - After animation completes, canvas naturally exits
                - NO visible empty space (canvas scrolls away naturally)
            */}
            <div
                ref={containerRef}
                className="relative w-full"
                style={{
                    height: '200vh',
                    margin: 0,
                    padding: 0,
                }}
            >
                {/* Sticky canvas container - stays visible during animation */}
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cream via-beige to-blush/20 z-0" />

                    {/* Subtle gradient orbs for depth */}
                    <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-lavender/20 blur-3xl z-0" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-sage/20 blur-3xl z-0" />

                    {/* Canvas element - renders animation frames */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full z-10"
                        style={{
                            imageRendering: '-webkit-optimize-contrast',
                        }}
                    />

                    {/* Typography overlay - fades as user scrolls */}
                    {imagesLoaded && (
                        <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 1.2,
                                delay: 0.3,
                                ease: [0.16, 1, 0.3, 1] // Custom spring easing
                            }}
                            style={{
                                opacity: Math.max(0, 1 - scrollProgress * 1.5)
                            }}
                        >
                            {/* Text container - static for clean presentation */}
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
                                    className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-darkBrown mb-6 leading-tight"
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
                                    className="font-sans text-lg md:text-xl text-darkBrown/80 max-w-2xl mx-auto tracking-wide leading-relaxed"
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
                                    <div className="w-6 h-10 border-2 border-darkBrown/30 rounded-full mx-auto relative">
                                        <div className="w-1.5 h-2 bg-darkBrown/40 rounded-full absolute left-1/2 top-2 -translate-x-1/2" />
                                    </div>
                                    <p className="text-darkBrown/50 text-xs font-sans tracking-widest mt-3">
                                        SCROLL TO EXPLORE
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* Loading screen */}
                    {!imagesLoaded && (
                        <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-cream to-beige z-30"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="text-center">
                                {/* Elegant loading spinner */}
                                <motion.div
                                    className="w-16 h-16 border-2 border-darkBrown/20 border-t-darkBrown rounded-full mx-auto mb-6"
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />

                                <h2 className="font-serif text-2xl text-darkBrown mb-3">
                                    Crafting Your Experience
                                </h2>

                                <div className="w-64 h-1 bg-darkBrown/10 rounded-full overflow-hidden mx-auto">
                                    <motion.div
                                        className="h-full bg-darkBrown/40 rounded-full"
                                        style={{ width: `${loadingProgress}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>

                                <p className="text-darkBrown/60 text-sm font-sans mt-3 tracking-wider">
                                    {loadingProgress}%
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeroCanvas;
