import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import ShopProductCard from './ShopProductCard';

// Product categories with icons
const CATEGORIES = [
    { id: 'all', name: 'All Products', emoji: '✨' },
    { id: 'plushies', name: 'Plushies', emoji: '🧸' },
    { id: 'bags', name: 'Bags', emoji: '👜' },
    { id: 'toys', name: 'Toys', emoji: '🎀' },
    { id: 'accessories', name: 'Accessories', emoji: '💎' },
    { id: 'animals', name: 'Animals', emoji: '🐰' },
    { id: 'wearables', name: 'Wearables', emoji: '🧣' },
    { id: 'home-decor', name: 'Home Decor', emoji: '🏠' },
    { id: 'clothes', name: 'Clothes', emoji: '👗' },
];

// Sample products data - simulated store inventory with crochet/yarn products
const PRODUCTS = [
    // Plushies - Amigurumi crochet toys
    {
        id: 'plush-001',
        name: 'Cozy Cloud Bear',
        category: 'Plushies',
        categoryId: 'plushies',
        basePrice: 35,
        description: 'A soft and cuddly bear plushie perfect for hugging. Handcrafted with love.',
        image: 'https://images.pexels.com/photos/6850747/pexels-photo-6850747.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'plush-002',
        name: 'Dreamy Bunny',
        category: 'Plushies',
        categoryId: 'plushies',
        basePrice: 32,
        description: 'Adorable bunny with floppy ears. Made with premium soft yarn.',
        image: 'https://images.pexels.com/photos/6850760/pexels-photo-6850760.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'plush-003',
        name: 'Sleepy Elephant',
        category: 'Plushies',
        categoryId: 'plushies',
        basePrice: 40,
        description: 'Gentle elephant plushie with adorable trunk. Perfect nursery companion.',
        image: 'https://images.pexels.com/photos/6850763/pexels-photo-6850763.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    // Bags - Crochet bags and purses
    {
        id: 'bag-001',
        name: 'Boho Market Tote',
        category: 'Bags',
        categoryId: 'bags',
        basePrice: 55,
        description: 'Spacious handwoven tote bag perfect for farmers markets and beach days.',
        image: 'https://images.pexels.com/photos/6621329/pexels-photo-6621329.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'bag-002',
        name: 'Mini Crossbody Purse',
        category: 'Bags',
        categoryId: 'bags',
        basePrice: 42,
        description: 'Cute crossbody purse with adjustable strap. Perfect for essentials.',
        image: 'https://images.pexels.com/photos/6621472/pexels-photo-6621472.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'bag-003',
        name: 'Beach Day Clutch',
        category: 'Bags',
        categoryId: 'bags',
        basePrice: 38,
        description: 'Summer vibes clutch bag with tassel details. Handcrafted perfection.',
        image: 'https://images.pexels.com/photos/6621491/pexels-photo-6621491.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    // Toys - Crochet baby toys
    {
        id: 'toy-001',
        name: 'Rainbow Stacking Rings',
        category: 'Toys',
        categoryId: 'toys',
        basePrice: 28,
        description: 'Colorful stacking rings toy for babies. Safe and machine washable.',
        image: 'https://images.pexels.com/photos/6621356/pexels-photo-6621356.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'toy-002',
        name: 'Sensory Play Ball Set',
        category: 'Toys',
        categoryId: 'toys',
        basePrice: 25,
        description: 'Set of 3 textured balls for sensory development. Vibrant colors.',
        image: 'https://images.pexels.com/photos/3933250/pexels-photo-3933250.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'toy-003',
        name: 'Rattle Teether Combo',
        category: 'Toys',
        categoryId: 'toys',
        basePrice: 22,
        description: 'Safe crocheted rattle with natural wood teether ring.',
        image: 'https://images.pexels.com/photos/6621342/pexels-photo-6621342.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    // Accessories - Crochet hair accessories
    {
        id: 'acc-001',
        name: 'Boho Headband Set',
        category: 'Accessories',
        categoryId: 'accessories',
        basePrice: 18,
        description: 'Set of 3 trendy crochet headbands in earthy tones.',
        image: 'https://images.pexels.com/photos/6621468/pexels-photo-6621468.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'acc-002',
        name: 'Scrunchie Collection',
        category: 'Accessories',
        categoryId: 'accessories',
        basePrice: 15,
        description: 'Pack of 5 soft crochet scrunchies in pastel colors.',
        image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'acc-003',
        name: 'Flower Hair Clips',
        category: 'Accessories',
        categoryId: 'accessories',
        basePrice: 12,
        description: 'Delicate flower hair clips. Perfect for any occasion.',
        image: 'https://images.pexels.com/photos/3933258/pexels-photo-3933258.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    // Animals - Amigurumi crochet animals
    {
        id: 'animal-001',
        name: 'Forest Fox',
        category: 'Animals',
        categoryId: 'animals',
        basePrice: 38,
        description: 'Charming woodland fox with fluffy tail. Hand-stitched details.',
        image: 'https://images.pexels.com/photos/6850753/pexels-photo-6850753.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'animal-002',
        name: 'Ocean Whale',
        category: 'Animals',
        categoryId: 'animals',
        basePrice: 45,
        description: 'Majestic blue whale in soft cotton yarn. Ocean nursery essential.',
        image: 'https://images.pexels.com/photos/6850745/pexels-photo-6850745.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'animal-003',
        name: 'Garden Butterfly',
        category: 'Animals',
        categoryId: 'animals',
        basePrice: 24,
        description: 'Delicate butterfly with colorful wings. Wall decor or toy.',
        image: 'https://images.pexels.com/photos/6850768/pexels-photo-6850768.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    // Wearables - Crochet wearables
    {
        id: 'wear-001',
        name: 'Cozy Winter Beanie',
        category: 'Wearables',
        categoryId: 'wearables',
        basePrice: 28,
        description: 'Warm and stylish beanie with pom-pom. Fits all head sizes.',
        image: 'https://images.pexels.com/photos/6621335/pexels-photo-6621335.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'wear-002',
        name: 'Chunky Infinity Scarf',
        category: 'Wearables',
        categoryId: 'wearables',
        basePrice: 48,
        description: 'Luxuriously soft infinity scarf in neutral tones.',
        image: 'https://images.pexels.com/photos/6621484/pexels-photo-6621484.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'wear-003',
        name: 'Fingerless Gloves',
        category: 'Wearables',
        categoryId: 'wearables',
        basePrice: 22,
        description: 'Practical and stylish fingerless gloves for typing and texting.',
        image: 'https://images.pexels.com/photos/6621339/pexels-photo-6621339.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    // Home Decor - Crochet home items
    {
        id: 'home-001',
        name: 'Macrame Wall Hanging',
        category: 'Home Decor',
        categoryId: 'home-decor',
        basePrice: 65,
        description: 'Stunning bohemian wall art piece. Statement maker for any room.',
        image: 'https://images.pexels.com/photos/4992630/pexels-photo-4992630.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'home-002',
        name: 'Coaster Set (6 pcs)',
        category: 'Home Decor',
        categoryId: 'home-decor',
        basePrice: 24,
        description: 'Set of 6 elegant crochet coasters. Protects surfaces in style.',
        image: 'https://images.pexels.com/photos/6621365/pexels-photo-6621365.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'home-003',
        name: 'Throw Pillow Cover',
        category: 'Home Decor',
        categoryId: 'home-decor',
        basePrice: 42,
        description: 'Textured pillow cover with modern geometric pattern.',
        image: 'https://images.pexels.com/photos/6621348/pexels-photo-6621348.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    // Clothes - Crochet clothing
    {
        id: 'cloth-001',
        name: 'Summer Crop Top',
        category: 'Clothes',
        categoryId: 'clothes',
        basePrice: 55,
        description: 'Breezy crochet crop top perfect for summer festivals.',
        image: 'https://images.pexels.com/photos/6621478/pexels-photo-6621478.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'cloth-002',
        name: 'Baby Cardigan',
        category: 'Clothes',
        categoryId: 'clothes',
        basePrice: 38,
        description: 'Adorable baby cardigan with wooden buttons. Sizes 0-24 months.',
        image: 'https://images.pexels.com/photos/6621494/pexels-photo-6621494.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
    {
        id: 'cloth-003',
        name: 'Granny Square Vest',
        category: 'Clothes',
        categoryId: 'clothes',
        basePrice: 62,
        description: 'Retro-inspired granny square vest. Timeless fashion piece.',
        image: 'https://images.pexels.com/photos/3933264/pexels-photo-3933264.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    },
];

const ProductGrid = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
    const [showFilters, setShowFilters] = useState(false);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...PRODUCTS];

        // Category filter
        if (activeCategory !== 'all') {
            result = result.filter((p) => p.categoryId === activeCategory);
        }

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query)
            );
        }

        // Price range filter
        result = result.filter(
            (p) => p.basePrice >= priceRange.min && p.basePrice <= priceRange.max
        );

        // Sorting
        if (sortBy === 'price-asc') {
            result.sort((a, b) => a.basePrice - b.basePrice);
        } else if (sortBy === 'price-desc') {
            result.sort((a, b) => b.basePrice - a.basePrice);
        } else if (sortBy === 'name-asc') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'name-desc') {
            result.sort((a, b) => b.name.localeCompare(a.name));
        }

        return result;
    }, [activeCategory, searchQuery, sortBy, priceRange]);

    const clearFilters = () => {
        setActiveCategory('all');
        setSearchQuery('');
        setSortBy('');
        setPriceRange({ min: 0, max: 200 });
    };

    const hasActiveFilters = activeCategory !== 'all' || searchQuery || sortBy || priceRange.min > 0 || priceRange.max < 200;

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-beige/30 pt-24 pb-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block bg-gold/20 text-gold px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                        Handcrafted with Love
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-darkBrown mb-4">
                        Our <span className="text-gold">Collection</span>
                    </h1>
                    <p className="text-darkBrown/70 text-lg max-w-2xl mx-auto">
                        Discover unique handmade crochet pieces, each crafted with premium yarns and endless love
                    </p>
                </motion.div>

                {/* Search & Filter Bar */}
                <motion.div
                    className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-darkBrown/40" size={20} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-cream/50 border border-beige rounded-xl focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-darkBrown placeholder:text-darkBrown/40"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-darkBrown/40 hover:text-darkBrown"
                                >
                                    <FiX size={18} />
                                </button>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative min-w-[200px]">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full appearance-none pl-4 pr-10 py-3.5 bg-cream/50 border border-beige rounded-xl focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-darkBrown cursor-pointer"
                            >
                                <option value="">Sort by</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name-asc">Name: A to Z</option>
                                <option value="name-desc">Name: Z to A</option>
                            </select>
                            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-darkBrown/40 pointer-events-none" />
                        </div>

                        {/* Filter Toggle (Mobile) */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden flex items-center justify-center gap-2 px-4 py-3.5 bg-gold text-white rounded-xl font-medium"
                        >
                            <FiFilter size={18} />
                            Filters
                        </button>
                    </div>

                    {/* Price Range Filter */}
                    <AnimatePresence>
                        {(showFilters || window.innerWidth >= 1024) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 border-t border-beige mt-4">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <span className="text-sm font-medium text-darkBrown/70">Price Range:</span>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                value={priceRange.min || ''}
                                                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) || 0 })}
                                                className="w-24 px-3 py-2 bg-cream/50 border border-beige rounded-lg text-sm focus:outline-none focus:border-gold"
                                            />
                                            <span className="text-darkBrown/40">—</span>
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                value={priceRange.max === 200 ? '' : priceRange.max}
                                                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) || 200 })}
                                                className="w-24 px-3 py-2 bg-cream/50 border border-beige rounded-lg text-sm focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        {hasActiveFilters && (
                                            <button
                                                onClick={clearFilters}
                                                className="text-sm text-gold hover:text-darkBrown transition-colors flex items-center gap-1"
                                            >
                                                <FiX size={14} />
                                                Clear all
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Category Pills */}
                <motion.div
                    className="mb-8 overflow-x-auto pb-2 scrollbar-hide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex gap-3 min-w-max">
                        {CATEGORIES.map((category) => (
                            <motion.button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap ${activeCategory === category.id
                                    ? 'bg-gold text-white shadow-lg shadow-gold/25'
                                    : 'bg-white text-darkBrown hover:bg-beige/50 border border-beige'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>{category.emoji}</span>
                                <span>{category.name}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Results Count */}
                <motion.div
                    className="mb-6 flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <p className="text-darkBrown/70">
                        Showing <span className="font-semibold text-darkBrown">{filteredProducts.length}</span> products
                    </p>
                </motion.div>

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="text-6xl mb-4">🧶</div>
                        <h3 className="text-2xl font-serif font-bold text-darkBrown mb-2">
                            No products found
                        </h3>
                        <p className="text-darkBrown/60 mb-6">
                            Try adjusting your filters or search terms
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 bg-gold text-white rounded-xl font-medium hover:bg-darkBrown transition-colors"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                        layout
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product, index) => (
                                <ShopProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ProductGrid;
