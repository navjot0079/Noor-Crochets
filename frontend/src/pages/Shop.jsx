import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiSearch } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../utils/api';
import toast from 'react-hot-toast';

const Shop = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        sort: '',
        search: '',
    });

    const categories = ['', 'bags', 'plushies', 'tops', 'blankets', 'accessories', 'wearables', 'home'];
    const sortOptions = [
        { value: '', label: 'Latest' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'rating', label: 'Top Rated' },
    ];

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await productAPI.getAll(filters);
            setProducts(data);
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-darkBrown mb-4">
                        Shop <span className="gradient-text">Collections</span>
                    </h1>
                    <p className="text-darkBrown/70 text-lg">
                        Discover our handcrafted crochet pieces made with love
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-darkBrown/50" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-darkBrown/20 rounded-xl focus:border-gold"
                            />
                        </div>

                        {/* Category Filter */}
                        <select
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            className="px-4 py-3 border border-darkBrown/20 rounded-xl focus:border-gold"
                        >
                            <option value="">All Categories</option>
                            {categories.slice(1).map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>

                        {/* Sort */}
                        <select
                            value={filters.sort}
                            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                            className="px-4 py-3 border border-darkBrown/20 rounded-xl focus:border-gold"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="spinner"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-darkBrown/70">No products found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product, index) => (
                            <ProductCard key={product._id} product={product} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
