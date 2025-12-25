const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Product = require('../models/product');

// Admin dashboard
router.get('/', async (req, res) => {
    try {
        const [categoriesCount, productsCount] = await Promise.all([
            Category.countDocuments(),
            Product.countDocuments()
        ]);

        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            stats: {
                categories: categoriesCount,
                products: productsCount
            }
        });
    } catch (error) {
        res.status(500).render('error', { error });
    }
});

// Categories management
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'category',
                    as: 'products'
                }
            },
            {
                $addFields: {
                    productCount: { $size: '$products' }
                }
            }
        ]);

        res.render('admin/categories', {
            title: 'Manage Categories',
            categories
        });
    } catch (error) {
        res.status(500).render('error', { error });
    }
});

// Products management
router.get('/products', async (req, res) => {
    try {
        const [products, categories] = await Promise.all([
            Product.find().populate('category', 'name'),
            Category.find()
        ]);

        res.render('admin/products', {
            title: 'Manage Products',
            products,
            categories
        });
    } catch (error) {
        res.status(500).render('error', { error });
    }
});

// API endpoints for admin operations
router.post('/categories', async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.redirect('/admin/categories');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Delete all products in this category
        await Product.deleteMany({ category: req.params.id });
        await category.remove();
        
        res.json({ message: 'Category and associated products deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/products', async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            features: req.body.features.split('\n').map(f => f.trim()).filter(Boolean)
        });
        await product.save();
        res.redirect('/admin/products');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/products/:id', async (req, res) => {
    try {
        const updates = {
            ...req.body,
            features: req.body.features.split('\n').map(f => f.trim()).filter(Boolean)
        };
        
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;