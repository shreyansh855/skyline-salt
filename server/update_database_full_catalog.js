const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Import verify_salt_products items
const { industrialProducts, edibleProducts } = require('./verify_salt_products.js');

// Filter existing non-salt products (bentonite, china clay, kaolin, other minerals)
const nonSaltProducts = db.products.filter(p => 
  p.categoryId !== 'cat_industrial_salt' && p.categoryId !== 'cat_edible_salt'
);

console.log(`Preserving ${nonSaltProducts.length} mineral products (Bentonite, China Clay, Kaolin, Other Minerals).`);

// Combine all products: 10 Industrial + 12 Edible + 17 Minerals = 39 products total!
const allProducts = [
  ...industrialProducts,
  ...edibleProducts,
  ...nonSaltProducts
];

// Update subcategories in categories
const updatedCategories = db.categories.map(cat => {
  if (cat.id === 'cat_industrial_salt') {
    return {
      ...cat,
      description: "High-purity sodium chloride refined for Chlor-Alkali electrolysis, water softening, fine chemicals, textiles, and drilling brines (Reference: SKC Salt).",
      subcategories: [
        { id: "sub_ind_sodium_chloride", name: "Sodium Chloride", slug: "sodium-chloride", description: "High-purity industrial sodium chloride (99.5%+ NaCl) for Chlor-Alkali and chemicals" },
        { id: "sub_ind_fine_salt", name: "Fine Salt", slug: "fine-salt", description: "Precision micro-granulated industrial fine salt (99.8% NaCl)" },
        { id: "sub_ind_pdv_salt", name: "PDV Salt (Pure dried vacuum)", slug: "pdv-salt", description: "Vacuum crystallized ultra-pure salt (99.85%+ NaCl) with zero insolubles" },
        { id: "sub_ind_salt_tablets", name: "Salt Tablets", slug: "salt-tablets", description: "High-density compacted tablets for water softener resin regeneration" },
        { id: "sub_ind_coarse_salt", name: "Coarse Salt", slug: "coarse-salt", description: "Natural large crystalline solar salt for leather tanning and oilfields" },
        { id: "sub_ind_mesh_salt", name: "Mesh Salt", slug: "mesh-salt", description: "Calibrated multi-mesh sodium chloride for detergents and chemical blends" },
        { id: "sub_ind_non_iodized_salt", name: "Non Iodized Salt", slug: "non-iodized-salt", description: "Pure unfortified sodium chloride with zero iodine and zero additives" },
        { id: "sub_ind_low_hardness_salt", name: "Low Hardness Salt", slug: "low-hardness-salt", description: "Ultra-low calcium and magnesium (<30 ppm) for membrane Chlor-Alkali cells" },
        { id: "sub_ind_washery_salt", name: "Washery Salt", slug: "washery-salt", description: "Mechanically washed coastal solar salt (98.5%+) for soda ash and chemicals" },
        { id: "sub_ind_water_softener_salt", name: "Water Softener Salt", slug: "water-softener-salt", description: "Granular and crystalline salt for boiler feedwater and water treatment" }
      ]
    };
  }

  if (cat.id === 'cat_edible_salt') {
    return {
      ...cat,
      description: "Premium food grade table salt and refined iodized salts processed under strict FSSAI and ISO hygienic standards (Reference: SKC Salt).",
      subcategories: [
        { id: "sub_edible_raw_salt", name: "Raw Salt", slug: "raw-salt", description: "100% natural solar evaporated sea salt rich in ocean electrolytes" },
        { id: "sub_edible_refined_salt", name: "Refined Salt", slug: "refined-salt", description: "Pure white food-grade refined salt (99.2%+ NaCl) for commercial food processing" },
        { id: "sub_edible_marine_salt", name: "Marine Salt", slug: "marine-salt", description: "Authentic coastal marine sea salt capturing genuine ocean minerals" },
        { id: "sub_edible_pure_salt", name: "Pure Salt", slug: "pure-salt", description: "Ultra-pure edible salt (99.7%+ NaCl) for infant formula and beverages" },
        { id: "sub_edible_crystal_salt", name: "Crystal Salt", slug: "crystal-salt", description: "Natural sea salt crystals (2.0-5.0mm) for salt grinders and pickling" },
        { id: "sub_edible_free_flow_salt", name: "Free Flow Salt", slug: "free-flow-salt", description: "Non-iodized free-flowing food salt for snack dusting and dry blends" },
        { id: "sub_edible_free_flow_iodized_salt", name: "Free Flow Iodized Salt", slug: "free-flow-iodized-salt", description: "Household table salt enriched with iodine (15-30 ppm) for daily cooking" },
        { id: "sub_edible_iodized_salt", name: "Iodized Salt", slug: "iodized-salt", description: "Traditional granular sea salt fortified with potassium iodate" },
        { id: "sub_edible_iodized_refined_salt", name: "Iodized Refined Salt", slug: "iodized-refined-salt", description: "Triple-washed refined salt with stable micro-encapsulated iodine" },
        { id: "sub_edible_double_refined_salt", name: "Double Refined Salt", slug: "double-refined-salt", description: "Dual-refined salt with ultra-low magnesium for bakeries and confectionery" },
        { id: "sub_edible_triple_refined_salt", name: "Triple Refined Salt", slug: "triple-refined-salt", description: "Pinnacle of culinary salt purity (99.8%+ NaCl) with >96% whiteness" },
        { id: "sub_edible_table_salt", name: "Table Salt", slug: "table-salt", description: "Dispenser-ready non-caking table salt for restaurant dining shakers" }
      ]
    };
  }

  return cat;
});

// Update database object
db.products = allProducts;
db.categories = updatedCategories;

// Save to database.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Database updated successfully! Total products: ${allProducts.length}`);
console.log(`- Industrial Salt products: ${allProducts.filter(p => p.categorySlug === 'industrial-salt').length}`);
console.log(`- Edible Salt products: ${allProducts.filter(p => p.categorySlug === 'edible-salt').length}`);
console.log(`- Bentonite products: ${allProducts.filter(p => p.categorySlug === 'bentonite').length}`);
console.log(`- China Clay products: ${allProducts.filter(p => p.categorySlug === 'china-clay').length}`);
console.log(`- Kaolin products: ${allProducts.filter(p => p.categorySlug === 'kaolin').length}`);
console.log(`- Other Minerals: ${allProducts.filter(p => p.categorySlug === 'other-minerals').length}`);

