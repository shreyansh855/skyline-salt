const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../auth');

// GET /api/categories
router.get('/', (req, res) => {
  try {
    const categories = db.getCategories();
    const data = db.get();
    res.json({ categories, subcategories: data.subcategories || [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET /api/categories/:slug
router.get('/:slug', (req, res) => {
  try {
    const category = db.getCategoryBySlug(req.params.slug);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const data = db.get();
    const subcategories = (data.subcategories || []).filter(s => s.categoryId === category.id);
    // Also include products for this category
    const products = db.getProducts({ categorySlug: req.params.slug, isActive: true });
    res.json({ category, subcategories, products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// POST /api/categories (Auth)
router.post('/', requireAuth, (req, res) => {
  try {
    const { name, slug, description, bannerImage, subcategories } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name is required' });
    const catSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat = db.addCategory({
      name,
      slug: catSlug,
      description: description || '',
      bannerImage: bannerImage || 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=80',
      isActive: true,
      subcategories: Array.isArray(subcategories) ? subcategories : []
    });
    res.status(201).json({ message: 'Category created', category: newCat });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// PUT /api/categories/:id (Auth)
router.put('/:id', requireAuth, (req, res) => {
  try {
    const updated = db.updateCategory(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category updated', category: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// DELETE /api/categories/:id (Auth)
router.delete('/:id', requireAuth, (req, res) => {
  try {
    db.deleteCategory(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

module.exports = router;

