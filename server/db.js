const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');
const BACKUP_FILE = path.join(DATA_DIR, 'database.backup.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory state
let dbData = null;

function getInitialData() {
  const seed = require('./data/seedData');
  return seed.getInitialSeedData();
}

function loadDatabase() {
  if (dbData) return dbData;
  
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      dbData = JSON.parse(raw);
      // Validate structure
      if (!dbData.products || !dbData.categories || !dbData.settings) {
        throw new Error('Database schema invalid, re-initializing with seed');
      }
      return dbData;
    } catch (err) {
      console.error('Error reading database file, loading seed:', err.message);
      // Try backup if exists
      if (fs.existsSync(BACKUP_FILE)) {
        try {
          dbData = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf8'));
          return dbData;
        } catch (e) {}
      }
    }
  }

  // Initialize with seed
  dbData = getInitialData();
  saveDatabase();
  return dbData;
}

function saveDatabase() {
  if (!dbData) return;
  try {
    const jsonStr = JSON.stringify(dbData, null, 2);
    // Write atomic
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, jsonStr, 'utf8');
    if (fs.existsSync(DB_FILE)) {
      try {
        fs.copyFileSync(DB_FILE, BACKUP_FILE);
      } catch (e) {}
    }
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Failed to save database:', err);
  }
}

// DB Helper methods
const db = {
  get: () => loadDatabase(),
  save: () => saveDatabase(),
  
  // Products
  getProducts: (filter = {}) => {
    const data = loadDatabase();
    let items = data.products || [];
    if (filter.categorySlug) {
      items = items.filter(p => p.categorySlug === filter.categorySlug);
    }
    if (filter.subcategoryId) {
      items = items.filter(p => p.subcategoryId === filter.subcategoryId);
    }
    if (filter.isFeatured !== undefined) {
      items = items.filter(p => p.isFeatured === filter.isFeatured);
    }
    if (filter.isActive !== undefined) {
      items = items.filter(p => p.isActive === filter.isActive);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      items = items.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        (p.applications && p.applications.some(a => a.toLowerCase().includes(q)))
      );
    }
    return items;
  },

  getProductBySlug: (slug) => {
    const data = loadDatabase();
    return (data.products || []).find(p => p.slug === slug);
  },

  getProductById: (id) => {
    const data = loadDatabase();
    return (data.products || []).find(p => p.id === id);
  },

  addProduct: (product) => {
    const data = loadDatabase();
    const newProduct = {
      ...product,
      id: product.id || `prod_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.products.push(newProduct);
    saveDatabase();
    return newProduct;
  },

  updateProduct: (id, updates) => {
    const data = loadDatabase();
    const index = data.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    data.products[index] = {
      ...data.products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveDatabase();
    return data.products[index];
  },

  deleteProduct: (id) => {
    const data = loadDatabase();
    const initialLen = data.products.length;
    data.products = data.products.filter(p => p.id !== id);
    saveDatabase();
    return data.products.length < initialLen;
  },

  // Categories
  getCategories: () => {
    const data = loadDatabase();
    return data.categories || [];
  },

  getCategoryBySlug: (slug) => {
    const data = loadDatabase();
    return (data.categories || []).find(c => c.slug === slug);
  },

  addCategory: (cat) => {
    const data = loadDatabase();
    const newCat = {
      ...cat,
      id: cat.id || `cat_${Date.now()}`,
      subcategories: cat.subcategories || []
    };
    data.categories.push(newCat);
    saveDatabase();
    return newCat;
  },

  updateCategory: (id, updates) => {
    const data = loadDatabase();
    const index = data.categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    data.categories[index] = { ...data.categories[index], ...updates };
    saveDatabase();
    return data.categories[index];
  },

  deleteCategory: (id) => {
    const data = loadDatabase();
    data.categories = data.categories.filter(c => c.id !== id);
    saveDatabase();
    return true;
  },

  // Enquiries
  getEnquiries: (filter = {}) => {
    const data = loadDatabase();
    let items = data.enquiries || [];
    if (filter.status && filter.status !== 'all') {
      items = items.filter(e => e.status === filter.status);
    }
    return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  addEnquiry: (enquiry) => {
    const data = loadDatabase();
    const newEnquiry = {
      ...enquiry,
      id: `enq_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      status: 'new',
      notes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (!data.enquiries) data.enquiries = [];
    data.enquiries.unshift(newEnquiry);
    saveDatabase();
    return newEnquiry;
  },

  updateEnquiryStatus: (id, status, note) => {
    const data = loadDatabase();
    const enq = (data.enquiries || []).find(e => e.id === id);
    if (!enq) return null;
    enq.status = status;
    enq.updatedAt = new Date().toISOString();
    if (note) {
      if (!enq.notes) enq.notes = [];
      enq.notes.push({ note, timestamp: new Date().toISOString() });
    }
    saveDatabase();
    return enq;
  },

  deleteEnquiry: (id) => {
    const data = loadDatabase();
    data.enquiries = (data.enquiries || []).filter(e => e.id !== id);
    saveDatabase();
    return true;
  },

  // Content (Banners, Hero, About, Manufacturing, Why Choose Us)
  getContent: () => {
    const data = loadDatabase();
    return data.content || {};
  },

  updateContent: (section, updates) => {
    const data = loadDatabase();
    if (!data.content) data.content = {};
    data.content[section] = {
      ...data.content[section],
      ...updates
    };
    saveDatabase();
    return data.content[section];
  },

  // Settings
  getSettings: () => {
    const data = loadDatabase();
    return data.settings || {};
  },

  updateSettings: (updates) => {
    const data = loadDatabase();
    data.settings = {
      ...data.settings,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveDatabase();
    return data.settings;
  },

  // Analytics
  logVisit: (visitData) => {
    const data = loadDatabase();
    if (!data.analytics) {
      data.analytics = { visits: [], dailySummary: {} };
    }
    const today = new Date().toISOString().split('T')[0];
    
    // Append to visits log (keep last 5000)
    data.analytics.visits.unshift({
      id: `v_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      ...visitData
    });
    if (data.analytics.visits.length > 5000) {
      data.analytics.visits = data.analytics.visits.slice(0, 5000);
    }

    // Update daily summary
    if (!data.analytics.dailySummary[today]) {
      data.analytics.dailySummary[today] = {
        totalViews: 0,
        pageViews: {},
        productViews: {}
      };
    }
    const day = data.analytics.dailySummary[today];
    day.totalViews += 1;
    if (visitData.path) {
      day.pageViews[visitData.path] = (day.pageViews[visitData.path] || 0) + 1;
    }
    if (visitData.productSlug) {
      day.productViews[visitData.productSlug] = (day.productViews[visitData.productSlug] || 0) + 1;
    }

    // Debounce save or save immediately
    saveDatabase();
  },

  getAnalyticsSummary: () => {
    const data = loadDatabase();
    const analytics = data.analytics || { visits: [], dailySummary: {} };
    const enquiries = data.enquiries || [];
    const products = data.products || [];

    // Calculate metrics
    const totalVisits = analytics.visits.length;
    const totalEnquiries = enquiries.length;
    
    // Group visits by date (last 14 days)
    const dates = Object.keys(analytics.dailySummary).sort().slice(-14);
    const chartData = dates.map(d => ({
      date: d,
      views: analytics.dailySummary[d].totalViews || 0
    }));

    // Top visited products
    const productCountMap = {};
    analytics.visits.forEach(v => {
      if (v.productSlug) {
        productCountMap[v.productSlug] = (productCountMap[v.productSlug] || 0) + 1;
      }
    });

    const topProducts = Object.entries(productCountMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([slug, count]) => {
        const prod = products.find(p => p.slug === slug);
        return {
          slug,
          name: prod ? prod.name : slug,
          views: count
        };
      });

    // Device breakdown
    const devices = { Desktop: 0, Mobile: 0, Tablet: 0 };
    analytics.visits.forEach(v => {
      const dev = v.deviceType || 'Desktop';
      devices[dev] = (devices[dev] || 0) + 1;
    });

    return {
      totalVisits,
      totalEnquiries,
      chartData,
      topProducts,
      devices,
      recentVisits: analytics.visits.slice(0, 15)
    };
  },

  // Users
  getUserByEmail: (email) => {
    const data = loadDatabase();
    return (data.users || []).find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  updateUserPassword: (email, newHash) => {
    const data = loadDatabase();
    const user = (data.users || []).find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return false;
    user.passwordHash = newHash;
    saveDatabase();
    return true;
  },

  // SEO
  getSeoData: () => {
    const data = loadDatabase();
    return data.seo || {};
  },

  updateSeoData: (updates) => {
    const data = loadDatabase();
    data.seo = { ...data.seo, ...updates };
    saveDatabase();
    return data.seo;
  }
};

module.exports = db;

