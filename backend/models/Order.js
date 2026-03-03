import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
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
        default: '',
    },
    category: {
        type: String,
        default: 'Uncategorized',
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
    },
});

const orderSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        orderNumber: {
            type: String,
            required: true,
            unique: true,
        },
        orderItems: [orderItemSchema],
        shippingAddress: {
            fullName: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
            notes: { type: String, default: '' },
        },
        subtotal: {
            type: Number,
            required: true,
            default: 0,
        },
        tax: {
            type: Number,
            required: true,
            default: 0,
        },
        shippingCost: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        paymentMethod: {
            type: String,
            default: 'Cash on Delivery',
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed', 'refunded'],
            default: 'pending',
        },
        paidAt: {
            type: Date,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
        statusHistory: [
            {
                status: String,
                timestamp: { type: Date, default: Date.now },
                note: String,
            },
        ],
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

// Generate order number before saving
orderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        // Generate unique order number: NC-YYYYMMDD-XXXXX
        const date = new Date();
        const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
        const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
        this.orderNumber = `NC-${dateStr}-${randomStr}`;
    }
    next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
