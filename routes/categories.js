const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Product = require('../models/product');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new category
router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a category
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (req.body.name) category.name = req.body.name;
        if (req.body.description) category.description = req.body.description;
        if (req.body.image) category.image = req.body.image;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a category
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Delete all products in this category first
        await Product.deleteMany({ category: req.params.id });
        await category.remove();
        
        res.json({ message: 'Category and associated products deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;