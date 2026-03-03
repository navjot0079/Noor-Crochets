import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiHeart, FiTruck, FiStar } from 'react-icons/fi';
import { GiSewingNeedle, GiYarn } from 'react-icons/gi';
import ProductCard from '../components/ProductCard';
import HeroCanvas from '../components/HeroCanvas';
import { productAPI } from '../utils/api';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data: featured } = await productAPI.getAll({ featured: 'true' });
                setFeaturedProducts(featured.slice(0, 6));

                const { data: best } = await productAPI.getAll({ bestSeller: 'true' });
                setBestSellers(best.slice(0, 5));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="overflow-x-hidden" style={{ margin: 0, padding: 0 }}>
            {/* Hero Section - Premium Canvas Animation */}
            <div style={{ margin: 0, padding: 0, display: 'block' }}>
                <HeroCanvas />
            </div>

            {/* Featured Collections */}
            <FeaturedCollections products={featuredProducts} />

            {/* About Section */}
            <AboutSection />

            {/* Best Sellers */}
            <BestSellers products={bestSellers} />

            {/* Custom Orders */}
            <CustomOrdersSection />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Instagram Gallery */}
            <InstagramGallery />
        </div>
    );
};

// Featured Collections Section
const FeaturedCollections = ({ products }) => {
    return (
        <section className="py-20 bg-white" style={{ marginTop: 0, paddingTop: '5rem' }}>
            <div className="container mx-auto px-6 md:px-8 lg:px-12">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-gold text-sm uppercase tracking-wider font-medium">
                        ✨ HANDCRAFTED WITH CARE ✨
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown mt-3 mb-4">
                        Featured Collections
                    </h2>
                    <p className="text-darkBrown/70 max-w-2xl mx-auto">
                        Each piece is lovingly made by hand — no two items are exactly alike. That's the
                        beauty of crochet.
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <ProductCard key={product._id} product={product} index={index} />
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <Link to="/collections">
                        <motion.button
                            className="px-8 py-3 bg-gold text-white rounded-full font-medium hover:bg-gold/90 transition-colors btn-ripple"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View All Collections
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

// About Section
const AboutSection = () => {
    const features = [
        {
            icon: GiYarn,
            title: 'Premium Yarn',
            description: 'Only the softest, highest quality yarn for ultimate comfort',
        },
        {
            icon: FiHeart,
            title: 'Hand-Crafted',
            description: 'Every stitch is made with love, care, and attention to detail',
        },
        {
            icon: FiTruck,
            title: 'Made with Love',
            description: 'From cozy blankets to statement bags with thoughtful design',
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-beige to-cream relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                }} />
            </div>

            <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="/src/assets/images/Rabbit.jpg"
                                alt="Crafting"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <motion.div
                                className="absolute bottom-8 left-8 right-8"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="glass p-6 rounded-xl">
                                    <h3 className="text-white text-2xl font-serif font-bold mb-2">
                                        ✨ OUR STORY ✨
                                    </h3>
                                    <p className="text-white/90">Born from a Passion for Craft</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-gold text-sm uppercase tracking-wider font-medium">
                            ✨ OUR STORY ✨
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown mt-3 mb-6">
                            Born from a <span className="gradient-text">Passion</span> for Craft
                        </h2>
                        <p className="text-darkBrown/70 mb-6 leading-relaxed text-lg">
                            Every stitch was born from crochet meetups, cozy mornings, and a deep love for the
                            rhythm of hook and yarn. Every stitch carries warmth, intention, and a little piece
                            of our heart.
                        </p>
                        <p className="text-darkBrown/70 mb-8 leading-relaxed">
                            From cozy blankets to statement bags — each piece is handcrafted with premium yarn,
                            thoughtful design, and genuine care. We believe in slow fashion, mindful making, and
                            the magic of handmade.
                        </p>

                        {/* Features */}
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white transition-all"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                                        <feature.icon className="text-gold text-2xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-bold text-darkBrown mb-1">
                                            {feature.title}
                                        </h4>
                                        <p className="text-darkBrown/70 text-sm">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <Link to="/about">
                            <motion.button
                                className="mt-8 px-8 py-3 bg-gold text-white rounded-full font-medium hover:bg-gold/90 transition-colors btn-ripple"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Read Our Story
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Best Sellers Section
const BestSellers = ({ products }) => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-8 lg:px-12">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-gold text-sm uppercase tracking-wider font-medium">
                        ✨ BEST SELLERS ✨
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown mt-3">
                        Best Sellers
                    </h2>
                </motion.div>

                {/* Horizontal Scroll Container */}
                <div className="overflow-x-auto pb-4 hide-scrollbar">
                    <div className="flex gap-6" style={{ width: 'max-content' }}>
                        {products.map((product, index) => (
                            <div key={product._id} className="w-80">
                                <ProductCard product={product} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </section>
    );
};

// Custom Orders Section
const CustomOrdersSection = () => {
    const steps = [
        {
            number: '1',
            title: 'Choose Your Design',
            description: 'Pick a style from our catalogue or describe your dream piece. Colors, size, pattern — all your choice.',
            icon: '✏️',
        },
        {
            number: '2',
            title: 'Select Your Yarn',
            description: 'Browse our premium yarn options — soft cottons, warm acrylics, and delicate blends in every shade.',
            icon: '🧶',
        },
        {
            number: '3',
            title: 'We Start Crafting',
            description: 'Once confirmed, I begin crocheting your custom piece, keeping you updated every step of the way.',
            icon: '🪡',
        },
        {
            number: '4',
            title: 'Delivered to You',
            description: 'Beautifully packaged and shipped with care. A little handmade magic arrives at your doorstep.',
            icon: '📦',
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-blush/20 to-lavender/20 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-gold text-sm uppercase tracking-wider font-medium">
                        ✨ MAKE IT YOUR OWN ✨
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown mt-3 mb-4">
                        Custom Crochet Orders
                    </h2>
                    <p className="text-darkBrown/70 max-w-2xl mx-auto">
                        Can't find exactly what you're looking for? We create custom pieces tailored to your
                        taste, style, and heart's desire.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                        >
                            {/* Step Number */}
                            <div className="absolute top-4 right-4 text-6xl font-serif font-bold text-gold/10 group-hover:text-gold/20 transition-colors">
                                {step.number}
                            </div>

                            {/* Icon */}
                            <div className="text-5xl mb-4 float">{step.icon}</div>

                            {/* Title */}
                            <h3 className="text-xl font-serif font-bold text-darkBrown mb-3">
                                <span className="text-gold">STEP {step.number}</span>
                                <br />
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-darkBrown/70 leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <Link to="/custom-order">
                        <motion.button
                            className="px-10 py-4 bg-gold text-white rounded-full text-lg font-medium hover:bg-gold/90 transition-colors shadow-lg hover:shadow-2xl btn-ripple"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Request a Custom Order
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

// Testimonials Section
const TestimonialsSection = () => {
    const testimonials = [
        {
            name: 'Olivia Robinson',
            role: '@olivia_style',
            text: 'I ordered a custom tote bag and it was absolutely stunning! The quality and craftsmanship are beyond amazing.',
            rating: 5,
        },
        {
            name: 'Sara Khalid',
            role: '@sara.knits',
            text: 'The crochet top arrived so beautifully packaged! My daughter can\'t stop wearing it. Already ordering 3 more!',
            rating: 5,
        },
        {
            name: 'Luna Richter',
            role: '@luna_handmade',
            text: 'This isn\'t just a product - it\'s wearable art! The attention to detail is beyond anything I\'ve ever seen.',
            rating: 5,
        },
        {
            name: 'Fatima Al-Zahra',
            role: '@fatima_creates',
            text: 'Fast shipping, gorgeous packaging and the most adorable plushie. It feels like a warm hug in every stitch!',
            rating: 5,
        },
        {
            name: 'Nadia Hussein',
            role: '@nadia.designs',
            text: 'The cardigan is pure luxury. Stunning! The attention to detail is extraordinarily meticulous. LOVE!',
            rating: 5,
        },
        {
            name: 'Emma Rossi',
            role: '@emma.handmade',
            text: 'I gifted a blanket to my mom and she nearly cried! It\'s soft, beautiful, and so thoughtfully made. 💗💗',
            rating: 5,
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-8 lg:px-12">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-gold text-sm uppercase tracking-wider font-medium">
                        ✨ WORDS OF LOVE ✨
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown mt-3">
                        What Our Customers Say
                    </h2>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="glass p-6 rounded-2xl hover:shadow-xl transition-all relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            {/* Quote Icon */}
                            <div className="text-6xl text-gold/20 absolute top-4 right-4 font-serif">"</div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FiStar key={i} className="text-gold fill-gold" size={18} />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-darkBrown/80 mb-4 leading-relaxed relative z-10">
                                {testimonial.text}
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-blush flex items-center justify-center text-white font-bold">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-darkBrown">{testimonial.name}</h4>
                                    <p className="text-sm text-darkBrown/60">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Instagram Gallery Section
const InstagramGallery = () => {
    // Placeholder images - replace with actual Instagram feed
    const images = [
        '/src/assets/images/bluebag.jpg',
        '/src/assets/images/bear.jpg',
        '/src/assets/images/bouquet.jpg',
        '/src/assets/images/sunflowercoster.jpg',
        '/src/assets/images/daisy.jpg',
        '/src/assets/images/muffler.jpg',
        '/src/assets/images/smiley.jpg',
        '/src/assets/images/clips.jpg',
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-cream to-beige">
            <div className="container mx-auto px-6 md:px-8 lg:px-12">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-gold text-sm uppercase tracking-wider font-medium">
                        ✨ FOLLOW OUR JOURNEY ✨
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown mt-3 mb-4">
                        Instagram Gallery
                    </h2>
                    <p className="text-darkBrown/70">@noorcrochets.co</p>
                </motion.div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            className="relative overflow-hidden rounded-2xl aspect-square img-zoom group cursor-pointer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <FiHeart className="text-white text-3xl" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <a
                        href="https://www.instagram.com/noor__crochet2025/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <motion.button
                            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium hover:shadow-xl transition-all btn-ripple"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Follow on Instagram
                        </motion.button>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Home;
