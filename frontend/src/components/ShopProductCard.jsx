import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiCheck, FiLogIn } from 'react-icons/fi';
import { useCart, calculatePrice, SIZE_MULTIPLIERS, YARN_MULTIPLIERS } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/helpers';
import toast from 'react-hot-toast';

/**
 * ShopProductCard - Enhanced product card with size and yarn type selection
 * Features dynamic pricing based on selected options
 */
const ShopProductCard = ({ product, index = 0 }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [selectedSize, setSelectedSize] = useState('Medium');
    const [selectedYarn, setSelectedYarn] = useState('Cotton');
    const [isAdded, setIsAdded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const sizes = Object.keys(SIZE_MULTIPLIERS);
    const yarnTypes = Object.keys(YARN_MULTIPLIERS);

    // Calculate current price based on selections
    const currentPrice = calculatePrice(product.basePrice, selectedSize, selectedYarn);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Check if user is logged in
        if (!user) {
            toast.error('Please login to add items to cart');
            navigate('/login', { state: { from: '/shop' } });
            return;
        }

        addToCart(product, 1, selectedSize, selectedYarn);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                delay: index * 0.05,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ y: -8 }}
            className="group"
        >
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-beige/50">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-cream to-beige">
                    <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="bg-gold/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            {product.category}
                        </span>
                    </div>

                    {/* Like Button */}
                    <motion.button
                        onClick={handleLike}
                        className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg transition-all duration-300 ${isLiked
                            ? 'bg-blush text-red-500'
                            : 'bg-white/90 backdrop-blur-sm text-darkBrown hover:bg-blush/50'
                            }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FiHeart className={isLiked ? 'fill-current' : ''} size={18} />
                    </motion.button>

                    {/* Quick View Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    />
                </div>

                {/* Product Info */}
                <div className="p-5">
                    {/* Name & Description */}
                    <h3 className="text-lg font-serif font-bold text-darkBrown mb-1 line-clamp-1 group-hover:text-gold transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-sm text-darkBrown/60 mb-4 line-clamp-2 min-h-[40px]">
                        {product.description}
                    </p>

                    {/* Size Selection */}
                    <div className="mb-3">
                        <p className="text-xs font-medium text-darkBrown/70 mb-2">Size</p>
                        <div className="flex gap-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedSize(size);
                                    }}
                                    className={`flex-1 py-2 px-3 text-xs font-medium rounded-xl transition-all duration-300 ${selectedSize === size
                                        ? 'bg-gold text-white shadow-md'
                                        : 'bg-beige/50 text-darkBrown hover:bg-beige'
                                        }`}
                                >
                                    {size.charAt(0)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Yarn Type Selection */}
                    <div className="mb-4">
                        <p className="text-xs font-medium text-darkBrown/70 mb-2">Yarn Type</p>
                        <div className="flex gap-2">
                            {yarnTypes.map((yarn) => (
                                <button
                                    key={yarn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedYarn(yarn);
                                    }}
                                    className={`flex-1 py-2 px-2 text-xs font-medium rounded-xl transition-all duration-300 ${selectedYarn === yarn
                                        ? 'bg-sage text-darkBrown shadow-md'
                                        : 'bg-beige/50 text-darkBrown hover:bg-beige'
                                        }`}
                                >
                                    {yarn === 'Premium Blend' ? 'Premium' : yarn}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <motion.span
                                key={currentPrice}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-2xl font-bold text-darkBrown"
                            >
                                {formatCurrency(currentPrice)}
                            </motion.span>
                            <p className="text-xs text-darkBrown/50">Base: {formatCurrency(product.basePrice)}</p>
                        </div>

                        <motion.button
                            onClick={handleAddToCart}
                            disabled={isAdded}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${isAdded
                                ? 'bg-sage text-darkBrown'
                                : !user
                                    ? 'bg-darkBrown/70 text-white hover:bg-darkBrown shadow-lg hover:shadow-xl'
                                    : 'bg-gold text-white hover:bg-darkBrown shadow-lg hover:shadow-xl'
                                }`}
                            whileHover={{ scale: isAdded ? 1 : 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isAdded ? (
                                <>
                                    <FiCheck size={18} />
                                    Added
                                </>
                            ) : !user ? (
                                <>
                                    <FiLogIn size={18} />
                                    Login
                                </>
                            ) : (
                                <>
                                    <FiShoppingCart size={18} />
                                    Add
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ShopProductCard;
