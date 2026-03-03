import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CartDrawer from './components/CartDrawer';
import CartSync from './components/CartSync';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collections from './pages/Collections';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CustomOrder from './pages/CustomOrder';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect, useState } from 'react';

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#FFF8F0',
                        color: '#4A4238',
                        border: '1px solid #D4AF37',
                    },
                    success: {
                        iconTheme: {
                            primary: '#D4AF37',
                            secondary: '#FFF8F0',
                        },
                    },
                }}
            />

            <CartSync />
            <Navbar />
            <CartDrawer />

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />

                    {/* Protected Routes */}
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/custom-order"
                        element={
                            <ProtectedRoute>
                                <CustomOrder />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute adminOnly>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
