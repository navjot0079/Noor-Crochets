import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const { category, featured, bestSeller, search, sort } = req.query;

        let query = {};

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter featured
        if (featured === 'true') {
            query.isFeatured = true;
        }

        // Filter best sellers
        if (bestSeller === 'true') {
            query.isBestSeller = true;
        }

        // Search
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        // Sort
        let sortQuery = {};
        if (sort === 'price-asc') {
            sortQuery.price = 1;
        } else if (sort === 'price-desc') {
            sortQuery.price = -1;
        } else if (sort === 'rating') {
            sortQuery.rating = -1;
        } else {
            sortQuery.createdAt = -1;
        }

        const products = await Product.find(query).sort(sortQuery);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            images: req.body.images || [],
            stock: req.body.stock || 0,
            colors: req.body.colors || [],
            sizes: req.body.sizes || [],
            isFeatured: req.body.isFeatured || false,
            isBestSeller: req.body.isBestSeller || false,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = req.body.name || product.name;
            product.description = req.body.description || product.description;
            product.price = req.body.price || product.price;
            product.category = req.body.category || product.category;
            product.images = req.body.images || product.images;
            product.stock = req.body.stock ?? product.stock;
            product.colors = req.body.colors || product.colors;
            product.sizes = req.body.sizes || product.sizes;
            product.isFeatured = req.body.isFeatured ?? product.isFeatured;
            product.isBestSeller = req.body.isBestSeller ?? product.isBestSeller;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get product categories
// @route   GET /api/products/categories/all
// @access  Public
export const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
