import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    basePrice: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        enum: ['Small', 'Medium', 'Large'],
        required: true,
        default: 'Medium',
    },
    yarnType: {
        type: String,
        enum: ['Cotton', 'Wool', 'Premium Blend'],
        required: true,
        default: 'Cotton',
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
});

const cartSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            unique: true,
        },
        items: [cartItemSchema],
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Calculate total price
cartSchema.methods.getTotal = function () {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Calculate total item count
cartSchema.methods.getItemCount = function () {
    return this.items.reduce((count, item) => count + item.quantity, 0);
};

// Size multipliers
const SIZE_MULTIPLIERS = {
    Small: 1,
    Medium: 1.3,
    Large: 1.6,
};

// Yarn type multipliers
const YARN_MULTIPLIERS = {
    Cotton: 1,
    Wool: 1.2,
    'Premium Blend': 1.5,
};

// Static method to calculate price
cartSchema.statics.calculatePrice = function (basePrice, size, yarnType) {
    const sizeMultiplier = SIZE_MULTIPLIERS[size] || 1;
    const yarnMultiplier = YARN_MULTIPLIERS[yarnType] || 1;
    return Math.round(basePrice * sizeMultiplier * yarnMultiplier * 100) / 100;
};

// Generate unique cart item ID
cartSchema.statics.generateCartItemId = function (productId, size, yarnType) {
    return `${productId}-${size}-${yarnType}`;
};

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
