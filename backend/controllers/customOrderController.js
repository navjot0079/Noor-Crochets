import CustomOrder from '../models/CustomOrder.js';

// @desc    Create custom order request
// @route   POST /api/custom-orders
// @access  Private
export const createCustomOrder = async (req, res) => {
    try {
        const {
            productType,
            colors,
            size,
            description,
            referenceImages,
            budget,
            deadline,
        } = req.body;

        const customOrder = new CustomOrder({
            user: req.user._id,
            productType,
            colors,
            size,
            description,
            referenceImages: referenceImages || [],
            budget,
            deadline,
        });

        const createdCustomOrder = await customOrder.save();
        res.status(201).json(createdCustomOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get custom order by ID
// @route   GET /api/custom-orders/:id
// @access  Private
export const getCustomOrderById = async (req, res) => {
    try {
        const customOrder = await CustomOrder.findById(req.params.id).populate('user', 'name email');

        if (customOrder) {
            // Check if user owns this order or is admin
            if (customOrder.user._id.toString() === req.user._id.toString() || req.user.role === 'admin') {
                res.json(customOrder);
            } else {
                res.status(403).json({ message: 'Not authorized to view this custom order' });
            }
        } else {
            res.status(404).json({ message: 'Custom order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user custom orders
// @route   GET /api/custom-orders/my-orders
// @access  Private
export const getMyCustomOrders = async (req, res) => {
    try {
        const customOrders = await CustomOrder.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(customOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all custom orders
// @route   GET /api/custom-orders
// @access  Private/Admin
export const getAllCustomOrders = async (req, res) => {
    try {
        const customOrders = await CustomOrder.find({})
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.json(customOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update custom order status
// @route   PUT /api/custom-orders/:id
// @access  Private/Admin
export const updateCustomOrder = async (req, res) => {
    try {
        const customOrder = await CustomOrder.findById(req.params.id);

        if (customOrder) {
            customOrder.status = req.body.status || customOrder.status;
            customOrder.adminNotes = req.body.adminNotes || customOrder.adminNotes;
            customOrder.estimatedPrice = req.body.estimatedPrice || customOrder.estimatedPrice;
            customOrder.estimatedCompletionDate = req.body.estimatedCompletionDate || customOrder.estimatedCompletionDate;

            const updatedCustomOrder = await customOrder.save();
            res.json(updatedCustomOrder);
        } else {
            res.status(404).json({ message: 'Custom order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete custom order
// @route   DELETE /api/custom-orders/:id
// @access  Private
export const deleteCustomOrder = async (req, res) => {
    try {
        const customOrder = await CustomOrder.findById(req.params.id);

        if (customOrder) {
            // Check if user owns this order or is admin
            if (customOrder.user.toString() === req.user._id.toString() || req.user.role === 'admin') {
                await customOrder.deleteOne();
                res.json({ message: 'Custom order removed' });
            } else {
                res.status(403).json({ message: 'Not authorized to delete this custom order' });
            }
        } else {
            res.status(404).json({ message: 'Custom order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
