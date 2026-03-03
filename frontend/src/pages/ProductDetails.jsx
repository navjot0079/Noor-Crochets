import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiArrowLeft } from 'react-icons/fi';
import { productAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import { formatCurrency, getImageUrl } from '../utils/helpers';
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data } = await productAPI.getById(id);
            setProduct(data);
        } catch (error) {
            toast.error('Product not found');
            navigate('/shop');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (product.stock === 0) {
            toast.error('Product is out of stock');
            return;
        }
        addToCart(product, quantity);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="min-h-screen bg-cream pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <motion.button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-darkBrown hover:text-gold transition-colors mb-8"
                    whileHover={{ x: -5 }}
                >
                    <FiArrowLeft /> Back to Shop
                </motion.button>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Images */}
                    <div>
                        {/* Main Image */}
                        <motion.div
                            className="bg-white rounded-3xl overflow-hidden shadow-lg mb-4 aspect-square"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <img
                                src={getImageUrl(product.images[selectedImage])}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Thumbnail Images */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <motion.div
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === index ? 'border-gold' : 'border-transparent'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <img
                                            src={getImageUrl(image)}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {/* Category & Badges */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-gold text-sm uppercase tracking-wider font-medium">
                                    {product.category}
                                </span>
                                {product.isBestSeller && (
                                    <span className="bg-blush text-darkBrown text-xs font-bold px-3 py-1 rounded-full">
                                        Bestseller
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown mb-4">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            {product.rating > 0 && (
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={i < product.rating ? 'text-gold' : 'text-gray-300'}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-darkBrown/70">
                                        ({product.numReviews} reviews)
                                    </span>
                                </div>
                            )}

                            {/* Price */}
                            <div className="text-5xl font-bold text-darkBrown mb-6">
                                {formatCurrency(product.price)}
                            </div>

                            {/* Description */}
                            <p className="text-darkBrown/70 leading-relaxed mb-6">
                                {product.description}
                            </p>

                            {/* Colors */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-serif font-bold text-darkBrown mb-3">Available Colors</h3>
                                    <div className="flex gap-2">
                                        {product.colors.map((color, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-white rounded-full text-sm border border-darkBrown/20"
                                            >
                                                {color}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Sizes */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-serif font-bold text-darkBrown mb-3">Available Sizes</h3>
                                    <div className="flex gap-2">
                                        {product.sizes.map((size, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-white rounded-full text-sm border border-darkBrown/20"
                                            >
                                                {size}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Stock */}
                            <div className="mb-6">
                                <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Quantity */}
                            {product.stock > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-serif font-bold text-darkBrown mb-3">Quantity</h3>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 rounded-full bg-white border border-darkBrown/20 hover:border-gold transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="text-2xl font-bold text-darkBrown w-12 text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="w-10 h-10 rounded-full bg-white border border-darkBrown/20 hover:border-gold transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-4">
                                <motion.button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="flex-1 px-8 py-4 bg-gold text-white rounded-full font-medium hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-ripple flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FiShoppingCart /> Add to Cart
                                </motion.button>
                                <motion.button
                                    className="px-6 py-4 bg-white border-2 border-gold rounded-full hover:bg-blush/20 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FiHeart size={24} className="text-gold" />
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
