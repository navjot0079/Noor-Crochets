import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { formatCurrency, getImageUrl } from '../utils/helpers';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, index = 0 }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
        >
            <Link to={`/product/${product._id}`}>
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                        <motion.img
                            src={getImageUrl(product.images?.[0])}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                        />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {product.isFeatured && (
                                <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Featured
                                </span>
                            )}
                            {product.isBestSeller && (
                                <span className="bg-blush text-darkBrown text-xs font-bold px-3 py-1 rounded-full">
                                    Bestseller
                                </span>
                            )}
                            {product.stock === 0 && (
                                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Sold Out
                                </span>
                            )}
                        </div>

                        {/* Hover Actions */}
                        <motion.div
                            className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                        >
                            <motion.button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="bg-white text-darkBrown p-3 rounded-full hover:bg-gold hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-ripple"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FiShoppingCart size={20} />
                            </motion.button>
                            <motion.button
                                className="bg-white text-darkBrown p-3 rounded-full hover:bg-blush transition-colors"
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FiHeart size={20} />
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                        <p className="text-xs uppercase tracking-wider text-gold font-medium mb-1">
                            {product.category}
                        </p>
                        <h3 className="text-lg font-serif font-bold text-darkBrown mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                            {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-darkBrown">
                                {formatCurrency(product.price)}
                            </span>
                            {product.rating > 0 && (
                                <div className="flex items-center gap-1">
                                    <span className="text-gold">★</span>
                                    <span className="text-sm text-darkBrown/70">
                                        {product.rating.toFixed(1)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
