import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (error) {
            // Error is handled by AuthContext
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream via-beige to-blush/30 pt-24 pb-12 flex items-center justify-center">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    <motion.div
                        className="bg-white rounded-3xl shadow-2xl p-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-serif font-bold text-darkBrown mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-darkBrown/70">Sign in to your account</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-darkBrown font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-darkBrown font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-darkBrown/20 focus:border-gold transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={loading}
                                className="w-full px-8 py-4 bg-gold text-white rounded-full font-medium hover:bg-gold/90 transition-colors disabled:opacity-50 btn-ripple"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 text-center text-darkBrown/50">
                            <span>or</span>
                        </div>

                        {/* Register Link */}
                        <div className="text-center">
                            <p className="text-darkBrown/70">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-gold font-medium hover:underline">
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Login;
