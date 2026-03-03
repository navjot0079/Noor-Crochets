import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { getCartCount, openCart } = useCart();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/collections', label: 'Collections' },
        { path: '/shop', label: 'Shop' },
        { path: '/about', label: 'About' },
        { path: '/custom-order', label: 'Custom' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group">
                        <motion.h1
                            className="text-2xl md:text-3xl font-serif font-bold text-darkBrown"
                            whileHover={{ scale: 1.05 }}
                        >
                            Noor <span className="text-gold">Crochets</span>
                        </motion.h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative text-darkBrown font-sans font-medium transition-colors hover:text-gold ${isActive(link.path) ? 'text-gold' : ''
                                    }`}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <motion.div
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                                        layoutId="underline"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-4">
                        {/* Cart */}
                        <button onClick={openCart} className="relative">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <FiShoppingCart className="text-2xl text-darkBrown hover:text-gold transition-colors" />
                                {getCartCount() > 0 && (
                                    <motion.span
                                        className="absolute -top-2 -right-2 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring' }}
                                    >
                                        {getCartCount()}
                                    </motion.span>
                                )}
                            </motion.div>
                        </button>

                        {/* User Menu */}
                        {user ? (
                            <div className="hidden md:flex items-center gap-3">
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blush/30 hover:bg-blush/50 transition-colors"
                                >
                                    <FiUser className="text-darkBrown" />
                                    <span className="text-sm font-medium text-darkBrown">{user.name}</span>
                                </Link>
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        className="px-4 py-2 rounded-full bg-gold text-white hover:bg-gold/90 transition-colors text-sm font-medium"
                                    >
                                        Admin
                                    </Link>
                                )}
                                <button
                                    onClick={logout}
                                    className="text-darkBrown hover:text-gold transition-colors text-sm font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="hidden md:block px-6 py-2 rounded-full bg-blush text-darkBrown hover:bg-gold hover:text-white transition-all font-medium btn-ripple"
                            >
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-2xl text-darkBrown"
                        >
                            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="md:hidden bg-white/95 backdrop-blur-md rounded-b-2xl shadow-xl overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-4 py-6 space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block py-2 text-darkBrown font-medium ${isActive(link.path) ? 'text-gold' : ''
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                {user ? (
                                    <>
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block py-2 text-darkBrown font-medium"
                                        >
                                            Profile
                                        </Link>
                                        {user.role === 'admin' && (
                                            <Link
                                                to="/admin"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block py-2 text-gold font-medium"
                                            >
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="block w-full text-left py-2 text-darkBrown font-medium"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block py-2 text-darkBrown font-medium"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
