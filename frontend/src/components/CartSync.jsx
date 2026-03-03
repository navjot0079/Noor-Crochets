import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

/**
 * CartSync - Synchronizes cart with server when user authentication changes
 * This component should be rendered inside both AuthProvider and CartProvider
 */
const CartSync = () => {
    const { user, onLogin } = useAuth();
    const { syncCartWithServer, loadCart } = useCart();

    // Register cart sync callback when component mounts
    useEffect(() => {
        // Register callback to sync cart after login
        const unsubscribe = onLogin(async () => {
            await syncCartWithServer();
        });

        return unsubscribe;
    }, [onLogin, syncCartWithServer]);

    // Reload cart when user changes (logout)
    useEffect(() => {
        if (!user) {
            // User logged out, reload cart from localStorage
            loadCart();
        }
    }, [user, loadCart]);

    // This component doesn't render anything
    return null;
};

export default CartSync;
