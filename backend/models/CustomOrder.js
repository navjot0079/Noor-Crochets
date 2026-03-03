import mongoose from 'mongoose';

const customOrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        productType: {
            type: String,
            required: [true, 'Please specify product type'],
            trim: true,
        },
        colors: [{
            type: String,
            required: true,
        }],
        size: {
            type: String,
            required: [true, 'Please specify size'],
        },
        description: {
            type: String,
            required: [true, 'Please add details about your custom order'],
        },
        referenceImages: [{
            type: String,
        }],
        budget: {
            min: Number,
            max: Number,
        },
        deadline: {
            type: Date,
        },
        status: {
            type: String,
            enum: ['pending', 'reviewing', 'approved', 'in-progress', 'completed', 'rejected'],
            default: 'pending',
        },
        adminNotes: {
            type: String,
        },
        estimatedPrice: {
            type: Number,
        },
        estimatedCompletionDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const CustomOrder = mongoose.model('CustomOrder', customOrderSchema);

export default CustomOrder;
