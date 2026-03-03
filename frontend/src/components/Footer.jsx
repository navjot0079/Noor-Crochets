import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone, FiMapPin,
    FiShoppingBag, FiHeart, FiTruck, FiPackage, FiInfo, FiHelpCircle
} from 'react-icons/fi';
import { GiYarn, GiSewingNeedle } from 'react-icons/gi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        shop: [
            { label: 'Bags', path: '/shop?category=bags', icon: FiShoppingBag },
            { label: 'Plushies', path: '/shop?category=plushies', icon: FiHeart },
            { label: 'Wearables', path: '/shop?category=wearables', icon: GiSewingNeedle },
            { label: 'Best Sellers', path: '/shop?bestSeller=true', icon: FiPackage },
        ],
        company: [
            { label: 'About Us', path: '/about', icon: FiInfo },
            { label: 'Shipping', path: '/shipping', icon: FiTruck },
            { label: 'Custom Orders', path: '/custom-order', icon: GiYarn },
            { label: 'Contact', path: '/contact', icon: FiMail },
        ],
        support: [
            { label: 'FAQ', path: '/faq', icon: FiHelpCircle },
            { label: 'Returns', path: '/returns', icon: FiPackage },
            { label: 'Care Guide', path: '/care-guide', icon: FiHeart },
            { label: 'Privacy Policy', path: '/privacy', icon: FiInfo },
        ],
    };

    const socialLinks = [
        {
            icon: FiInstagram,
            url: 'https://www.instagram.com/noor__crochet2025/',
            label: 'Instagram',
            gradient: 'from-pink-500 to-purple-600'
        },
        {
            icon: FiFacebook,
            url: '#',
            label: 'Facebook',
            gradient: 'from-blue-500 to-blue-700'
        },
        {
            icon: FiTwitter,
            url: '#',
            label: 'Twitter',
            gradient: 'from-blue-400 to-blue-600'
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <footer className="bg-gradient-to-br from-darkBrown via-darkBrown/95 to-darkBrown relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gold/5 blur-3xl"
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-blush/10 blur-3xl"
                    animate={{
                        y: [0, 30, 0],
                        x: [0, -20, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-sage/5 blur-2xl"
                    animate={{
                        y: [0, 20, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
            </div>

            {/* Newsletter Section */}
            <div className="relative border-b border-gold/10">
                <div className="container mx-auto px-6 md:px-8 lg:px-12 py-16">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Animated Icon */}
                        <motion.div
                            className="inline-block mb-6"
                            animate={{
                                rotate: [0, 10, -10, 0],
                                y: [0, -5, 0]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-blush flex items-center justify-center">
                                <FiMail className="text-white text-2xl" />
                            </div>
                        </motion.div>

                        <motion.h3
                            className="text-3xl md:text-4xl font-serif font-bold text-cream mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Join Our Crochet Community ✨
                        </motion.h3>
                        <motion.p
                            className="text-cream/70 mb-8 text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            Get exclusive access to new collections, special offers, and behind-the-scenes magic!
                        </motion.p>
                        <motion.form
                            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-gold/30 text-cream placeholder:text-cream/50 focus:border-gold focus:bg-white/15 outline-none transition-all"
                            />
                            <motion.button
                                type="submit"
                                className="px-8 py-4 bg-gradient-to-r from-gold to-blush text-white rounded-full font-medium shadow-lg btn-ripple relative overflow-hidden group"
                                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.3)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10">Subscribe Now</span>
                                <motion.div
                                    className="absolute inset-0 bg-white/20"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.5 }}
                                />
                            </motion.button>
                        </motion.form>
                    </motion.div>
                </div>
            </div>

            {/* Main Footer Content */}
            <motion.div
                className="container mx-auto px-6 md:px-8 lg:px-12 py-16"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <motion.div variants={itemVariants} className="lg:col-span-1">
                        <Link to="/" className="inline-block mb-6 group">
                            <motion.h2
                                className="text-3xl font-serif font-bold text-cream"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                Noor <span className="text-gold">Crochets</span>
                            </motion.h2>
                        </Link>
                        <p className="text-cream/70 mb-6 leading-relaxed">
                            Handcrafted with love. Every stitch tells a story of artisan craftsmanship and timeless beauty.
                        </p>

                        {/* Animated Yarn Icon */}
                        <motion.div
                            className="inline-block mb-6"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        >
                            <GiYarn className="text-gold text-5xl opacity-50" />
                        </motion.div>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <motion.div
                                className="flex items-center gap-3 text-cream/70 group cursor-pointer"
                                whileHover={{ x: 5 }}
                            >
                                <motion.div
                                    className="text-gold"
                                    whileHover={{ rotate: 15, scale: 1.2 }}
                                >
                                    <FiMail size={18} />
                                </motion.div>
                                <span className="group-hover:text-gold transition-colors">hello@noorcrochets.com</span>
                            </motion.div>
                            <motion.div
                                className="flex items-center gap-3 text-cream/70 group cursor-pointer"
                                whileHover={{ x: 5 }}
                            >
                                <motion.div
                                    className="text-gold"
                                    whileHover={{ rotate: 15, scale: 1.2 }}
                                >
                                    <FiPhone size={18} />
                                </motion.div>
                                <span className="group-hover:text-gold transition-colors">+1 (555) 123-4567</span>
                            </motion.div>
                            <motion.div
                                className="flex items-center gap-3 text-cream/70 group cursor-pointer"
                                whileHover={{ x: 5 }}
                            >
                                <motion.div
                                    className="text-gold"
                                    whileHover={{ rotate: 15, scale: 1.2 }}
                                >
                                    <FiMapPin size={18} />
                                </motion.div>
                                <span className="group-hover:text-gold transition-colors">Worldwide Shipping</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Shop Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-serif font-bold text-gold mb-6 flex items-center gap-2">
                            <FiShoppingBag className="text-xl" />
                            SHOP
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link, index) => (
                                <motion.li
                                    key={link.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        className="text-cream/70 hover:text-gold transition-colors flex items-center gap-2 group"
                                    >
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.2 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <link.icon className="text-gold/50 group-hover:text-gold" size={16} />
                                        </motion.div>
                                        <motion.span whileHover={{ x: 5 }}>
                                            {link.label}
                                        </motion.span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-serif font-bold text-gold mb-6 flex items-center gap-2">
                            <FiInfo className="text-xl" />
                            COMPANY
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <motion.li
                                    key={link.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        className="text-cream/70 hover:text-gold transition-colors flex items-center gap-2 group"
                                    >
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.2 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <link.icon className="text-gold/50 group-hover:text-gold" size={16} />
                                        </motion.div>
                                        <motion.span whileHover={{ x: 5 }}>
                                            {link.label}
                                        </motion.span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Support Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-serif font-bold text-gold mb-6 flex items-center gap-2">
                            <FiHelpCircle className="text-xl" />
                            SUPPORT
                        </h3>
                        <ul className="space-y-3 mb-8">
                            {footerLinks.support.map((link, index) => (
                                <motion.li
                                    key={link.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        className="text-cream/70 hover:text-gold transition-colors flex items-center gap-2 group"
                                    >
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.2 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <link.icon className="text-gold/50 group-hover:text-gold" size={16} />
                                        </motion.div>
                                        <motion.span whileHover={{ x: 5 }}>
                                            {link.label}
                                        </motion.span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Social Links */}
                        <div className="space-y-3">
                            <h4 className="text-cream/90 font-medium mb-4">Follow Our Journey</h4>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative group"
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        aria-label={social.label}
                                    >
                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${social.gradient} flex items-center justify-center shadow-lg`}>
                                            <motion.div
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <social.icon className="text-white" size={22} />
                                            </motion.div>
                                        </div>
                                        {/* Glow effect on hover */}
                                        <motion.div
                                            className={`absolute inset-0 rounded-full bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-50 blur-xl -z-10`}
                                            whileHover={{ scale: 1.5 }}
                                        />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom Bar */}
            <div className="border-t border-gold/10 relative">
                <div className="container mx-auto px-6 md:px-8 lg:px-12 py-6">
                    <motion.div
                        className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream/60"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <motion.p
                            whileHover={{ scale: 1.05 }}
                        >
                            © {currentYear} Noor Crochets. All rights reserved.
                        </motion.p>
                        <motion.p
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                        >
                            Made with love & yarn
                            <motion.span
                                className="text-gold text-lg"
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                🧶
                            </motion.span>
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
