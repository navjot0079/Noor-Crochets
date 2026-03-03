import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { customOrderAPI } from '../utils/api';
import toast from 'react-hot-toast';

const CustomOrder = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        productType: '',
        colors: [],
        size: '',
        description: '',
        budget: { min: '', max: '' },
        deadline: '',
    });

    const [colorInput, setColorInput] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('budget.')) {
            const field = name.split('.')[1];
            setFormData({
                ...formData,
                budget: { ...formData.budget, [field]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const addColor = () => {
        if (colorInput.trim() && !formData.colors.includes(colorInput.trim())) {
            setFormData({
                ...formData,
                colors: [...formData.colors, colorInput.trim()],
            });
            setColorInput('');
        }
    };

    const removeColor = (color) => {
        setFormData({
            ...formData,
            colors: formData.colors.filter((c) => c !== color),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.colors.length === 0) {
            toast.error('Please add at least one color');
            return;
        }

        setLoading(true);

        try {
            await customOrderAPI.create(formData);
            toast.success('Custom order request submitted successfully!');
            navigate('/profile');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream via-beige to-blush/30 pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        className="bg-white rounded-3xl shadow-2xl p-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown mb-4">
                                Custom Crochet Order
                            </h1>
                            <p className="text-darkBrown/70 leading-relaxed">
                                Tell us about your dream piece and we'll bring it to life with love and care
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Product Type */}
                            <div>
                                <label className="block text-darkBrown font-medium mb-2">
                                    What would you like us to make? *
                                </label>
                                <input
                                    type="text"
                                    name="productType"
                                    value={formData.productType}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Tote Bag, Cardigan, Baby Blanket, Plushie"
                                    className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                />
                            </div>

                            {/* Colors */}
                            <div>
                                <label className="block text-darkBrown font-medium mb-2">
                                    Preferred Colors *
                                </label>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        value={colorInput}
                                        onChange={(e) => setColorInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
                                        placeholder="Enter a color and press Add"
                                        className="flex-1 px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={addColor}
                                        className="px-6 py-3 bg-blush text-darkBrown rounded-xl hover:bg-gold hover:text-white transition-colors font-medium"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.colors.map((color) => (
                                        <span
                                            key={color}
                                            className="px-4 py-2 bg-gold/20 text-darkBrown rounded-full flex items-center gap-2"
                                        >
                                            {color}
                                            <button
                                                type="button"
                                                onClick={() => removeColor(color)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Size */}
                            <div>
                                <label className="block text-darkBrown font-medium mb-2">Size *</label>
                                <input
                                    type="text"
                                    name="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Medium, 50x60 inches, Custom dimensions"
                                    className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-darkBrown font-medium mb-2">
                                    Detailed Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    placeholder="Tell us everything! Pattern style, special details, inspiration, how you'll use it..."
                                    className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors resize-none"
                                ></textarea>
                            </div>

                            {/* Budget */}
                            <div>
                                <label className="block text-darkBrown font-medium mb-2">
                                    Budget Range (Optional)
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="number"
                                        name="budget.min"
                                        value={formData.budget.min}
                                        onChange={handleChange}
                                        placeholder="Min $"
                                        className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                    />
                                    <input
                                        type="number"
                                        name="budget.max"
                                        value={formData.budget.max}
                                        onChange={handleChange}
                                        placeholder="Max $"
                                        className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Deadline */}
                            <div>
                                <label className="block text-darkBrown font-medium mb-2">
                                    Deadline (Optional)
                                </label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                />
                            </div>

                            {/* Info Box */}
                            <div className="bg-blush/20 rounded-2xl p-6">
                                <h3 className="font-serif font-bold text-darkBrown mb-2">What happens next?</h3>
                                <ul className="space-y-2 text-darkBrown/70">
                                    <li>✨ We'll review your request within 24-48 hours</li>
                                    <li>💬 You'll receive an estimated price and timeline</li>
                                    <li>🧶 Once approved, we'll start crafting your piece!</li>
                                    <li>📦 Your custom creation will be shipped with care</li>
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={loading}
                                className="w-full px-8 py-4 bg-gold text-white rounded-full font-medium text-lg hover:bg-gold/90 transition-colors disabled:opacity-50 btn-ripple"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {loading ? 'Submitting...' : 'Submit Custom Order Request'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CustomOrder;
