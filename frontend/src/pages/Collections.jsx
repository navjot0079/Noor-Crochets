import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../utils/api';
import toast from 'react-hot-toast';

const Collections = () => {
    const [productsByCategory, setProductsByCategory] = useState({});
    const [loading, setLoading] = useState(true);

    const collections = [
        {
            id: 'bags',
            name: 'Bags & Totes',
            description: 'Stylish handcrafted bags perfect for any occasion',
            image: '/src/assets/images/collection-bags.jpg',
            color: 'from-blush to-lavender',
        },
        {
            id: 'plushies',
            name: 'Plushies & Toys',
            description: 'Adorable crochet plushies and amigurumi creations',
            image: '/src/assets/images/collection-plushies.jpg',
            color: 'from-sage to-mint',
        },
        {
            id: 'tops',
            name: 'Tops & Clothing',
            description: 'Trendy crochet tops and wearable fashion pieces',
            image: '/src/assets/images/collection-tops.jpg',
            color: 'from-cream to-beige',
        },
        {
            id: 'blankets',
            name: 'Blankets & Throws',
            description: 'Cozy handmade blankets to keep you warm',
            image: '/src/assets/images/collection-blankets.jpg',
            color: 'from-gold to-blush',
        },
        {
            id: 'accessories',
            name: 'Accessories',
            description: 'Unique crochet accessories to complete your look',
            image: '/src/assets/images/collection-accessories.jpg',
            color: 'from-lavender to-blush',
        },
        {
            id: 'wearables',
            name: 'Wearables',
            description: 'Fashionable crochet wearables for everyday style',
            image: '/src/assets/images/collection-wearables.jpg',
            color: 'from-beige to-sage',
        },
        {
            id: 'home',
            name: 'Home Decor',
            description: 'Beautiful handcrafted pieces for your home',
            image: '/src/assets/images/collection-home.jpg',
            color: 'from-cream to-gold',
        },
    ];

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            const categoriesData = {};

            // Fetch products for each category
            for (const collection of collections) {
                const { data } = await productAPI.getAll({ category: collection.id });
                categoriesData[collection.id] = data.slice(0, 4); // Get first 4 products
            }

            setProductsByCategory(categoriesData);
        } catch (error) {
            toast.error('Failed to load collections');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream pt-24 pb-12">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16">
                <motion.div
                    className="text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="text-gold text-sm uppercase tracking-wider font-medium">
                        ✨ EXPLORE OUR COLLECTIONS ✨
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-darkBrown mt-3 mb-6">
                        Handcrafted <span className="gradient-text">Collections</span>
                    </h1>
                    <p className="text-xl text-darkBrown/70 leading-relaxed">
                        Browse our curated collections of handmade crochet pieces. Each item is crafted with
                        love, care, and premium materials.
                    </p>
                </motion.div>
            </section>

            {/* Collections Grid */}
            <section className="container mx-auto px-4 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collections.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`/shop?category=${collection.id}`}>
                                <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 h-96">
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={collection.image}
                                            alt={collection.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
                                    </div>

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col justify-end p-8">
                                        <motion.div
                                            initial={{ y: 20 }}
                                            whileHover={{ y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-3xl font-serif font-bold text-white mb-2">
                                                {collection.name}
                                            </h3>
                                            <p className="text-white/90 mb-4">{collection.description}</p>
                                            <div className="flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all">
                                                <span>Explore Collection</span>
                                                <FiArrowRight className="text-xl" />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Products by Collection */}
            {!loading && (
                <>
                    {collections.map((collection) => {
                        const products = productsByCategory[collection.id] || [];
                        if (products.length === 0) return null;

                        return (
                            <section key={collection.id} className="container mx-auto px-4 mb-20">
                                {/* Collection Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                    >
                                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-darkBrown">
                                            {collection.name}
                                        </h2>
                                        <p className="text-darkBrown/70 mt-2">{collection.description}</p>
                                    </motion.div>
                                    <Link
                                        to={`/shop?category=${collection.id}`}
                                        className="hidden md:flex items-center gap-2 text-gold hover:text-gold/80 font-medium transition-colors"
                                    >
                                        View All
                                        <FiArrowRight />
                                    </Link>
                                </div>

                                {/* Products Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {products.map((product, index) => (
                                        <ProductCard key={product._id} product={product} index={index} />
                                    ))}
                                </div>

                                {/* Mobile View All Link */}
                                <div className="md:hidden text-center mt-8">
                                    <Link
                                        to={`/shop?category=${collection.id}`}
                                        className="inline-flex items-center gap-2 text-gold hover:text-gold/80 font-medium transition-colors"
                                    >
                                        View All {collection.name}
                                        <FiArrowRight />
                                    </Link>
                                </div>
                            </section>
                        );
                    })}
                </>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-20">
                    <div className="spinner"></div>
                </div>
            )}

            {/* CTA Section */}
            <section className="container mx-auto px-4 mt-20">
                <motion.div
                    className="bg-gradient-to-br from-gold to-blush rounded-3xl p-12 text-center text-white"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                        Can't Find What You're Looking For?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Request a custom piece tailored just for you
                    </p>
                    <Link to="/custom-order">
                        <motion.button
                            className="px-8 py-4 bg-white text-darkBrown rounded-full font-medium hover:bg-cream transition-colors btn-ripple"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Request Custom Order
                        </motion.button>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default Collections;
