const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../auth');

// GET /api/products - list products
router.get('/', (req, res) => {
  try {
    const { category, subcategory, featured, active, search } = req.query;
    const filter = {};
    if (category) filter.categorySlug = category;
    if (subcategory) filter.subcategoryId = subcategory;
    if (featured !== undefined) filter.isFeatured = featured === 'true';
    if (active !== undefined) filter.isActive = active === 'true';
    if (search) filter.search = search;

    const products = db.getProducts(filter);
    res.json({ products, count: products.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:slug - get product by slug
router.get('/:slug', (req, res) => {
  try {
    const product = db.getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/products - create product (Auth)
router.post('/', requireAuth, (req, res) => {
  try {
    const {
      name,
      slug,
      categoryId,
      categorySlug,
      subcategoryId,
      shortDescription,
      description,
      images,
      grades,
      packaging,
      specifications,
      applications,
      features,
      industries,
      isFeatured,
      isActive,
      seoTitle,
      seoDescription,
      seoKeywords
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    const productSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Check duplicate slug
    const existing = db.getProductBySlug(productSlug);
    if (existing) {
      return res.status(400).json({ error: 'A product with this slug already exists' });
    }

    const newProduct = db.addProduct({
      name,
      slug: productSlug,
      categoryId: categoryId || 'cat_industrial_salt',
      categorySlug: categorySlug || 'industrial-salt',
      subcategoryId: subcategoryId || '',
      shortDescription: shortDescription || '',
      description: description || '',
      images: Array.isArray(images) && images.length ? images : ['https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80'],
      grades: Array.isArray(grades) ? grades : [],
      packaging: Array.isArray(packaging) ? packaging : [],
      specifications: Array.isArray(specifications) ? specifications : [],
      applications: Array.isArray(applications) ? applications : [],
      features: Array.isArray(features) ? features : [],
      industries: Array.isArray(industries) ? industries : [],
      isFeatured: Boolean(isFeatured),
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      seoTitle: seoTitle || `${name} Manufacturer & Supplier | Skyline Salt and Minerals`,
      seoDescription: seoDescription || `${name} processed and supplied by Skyline Salt and Minerals from Gandhidham, Gujarat.`,
      seoKeywords: seoKeywords || name.toLowerCase()
    });

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT /api/products/:id - update product (Auth)
router.put('/:id', requireAuth, (req, res) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', product: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE /api/products/:id - delete product (Auth)
router.delete('/:id', requireAuth, (req, res) => {
  try {
    const success = db.deleteProduct(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;

