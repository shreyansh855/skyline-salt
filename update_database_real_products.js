const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'server', 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

const categories = [
  {
    id: "cat_industrial_salt",
    name: "Industrial Salt",
    slug: "industrial-salt",
    order: 1,
    isActive: true,
    description: "High-purity sodium chloride refined for Chlor-Alkali, chemical synthesis, water softening, textile dyeing, and oilfield completion fluids, sourced from Kutch salt pans (Reference: SKC Salt).",
    bannerImage: "/uploads/skc-salt-farm.jpg",
    subcategories: [
      { id: "sub_refined_ind_salt", name: "Refined Industrial Salt", slug: "refined-industrial-salt", description: "Fine chemical grade salt (99.2%+ NaCl) for Chlor-Alkali and textiles" },
      { id: "sub_pdv_salt", name: "Pure Dried Vacuum (PDV) Salt", slug: "pdv-salt", description: "Ultra-pure 99.85% vacuum crystallized salt with zero insolubles" },
      { id: "sub_water_softener", name: "Tablet Salt (Water Softener)", slug: "water-softener-salt", description: "High-density compressed tablets for ion-exchange resin regeneration" },
      { id: "sub_raw_solar_salt", name: "Raw Solar Sea Salt", slug: "raw-solar-salt", description: "Sun-dried natural coarse sea salt harvested from Kutch tidal pans" },
      { id: "sub_deicing_salt", name: "De-Icing Highway Road Salt", slug: "de-icing-salt", description: "Coarse crystalline solar salt formulated for rapid winter road thawing" }
    ]
  },
  {
    id: "cat_edible_salt",
    name: "Edible Salt",
    slug: "edible-salt",
    order: 2,
    isActive: true,
    description: "Premium food grade table salt and refined iodized salts processed under strict hygienic standards for culinary and food processing industries (Reference: SKC Salt).",
    bannerImage: "/uploads/skc-iodized-salt.png",
    subcategories: [
      { id: "sub_free_flow_iodized", name: "Refined Free Flow Iodized Salt", slug: "refined-iodized-salt", description: "Micro-granulated kitchen and table salt fortified with potassium iodate" },
      { id: "sub_pdv_food_salt", name: "PDV Food Grade Vacuum Salt", slug: "pdv-food-salt", description: "Ultra-clean vacuum salt for snacks, seasonings, and dairy processing" },
      { id: "sub_crystal_food_salt", name: "Natural Crystal Sea Salt", slug: "crystal-food-salt", description: "Clean sea crystals for pickles, brining, and artisanal food preparations" }
    ]
  },
  {
    id: "cat_bentonite",
    name: "Bentonite",
    slug: "bentonite",
    order: 3,
    isActive: true,
    description: "High-grade natural sodium and calcium bentonite clay from Kutch mineral basin, processed for drilling, foundries, civil engineering, and clarifiers (Reference: Kutch Bentoclay).",
    bannerImage: "/uploads/kbc-drilling-bentonite.png",
    subcategories: [
      { id: "sub_api_drilling", name: "API 13A Section 9 & 11 Drilling Bentonite", slug: "drilling-bentonite", description: "High-yield bentonite complying with API 13A Section 9/11 and OCMA DFCP-4" },
      { id: "sub_foundry_bentonite", name: "Foundry Grade Bentonite", slug: "foundry-bentonite", description: "High thermal stability sodium bentonite binder for green sand casting" },
      { id: "sub_civil_bentonite", name: "Piling & Civil Engineering Bentonite", slug: "civil-engineering-bentonite", description: "Thixotropic slurry clay for bored piles, diaphragm walls, and micro-tunneling" },
      { id: "sub_cat_litter", name: "Cat Litter Bentonite Granules", slug: "cat-litter-bentonite", description: "Fast-clumping natural sodium bentonite granules with instant moisture lock" },
      { id: "sub_earthing_bentonite", name: "Electrical Earthing Bentonite", slug: "electrical-earthing-bentonite", description: "Low-resistivity backfill compound for electrical grounding pits and telecom towers" },
      { id: "sub_fertilizer_bentonite", name: "Agriculture & Fertilizer Bentonite", slug: "fertilizer-bentonite", description: "Natural binder, soil conditioner, and nutrient carrier for granular fertilizers" },
      { id: "sub_iron_ore_bentonite", name: "Iron Ore Pelletization Bentonite", slug: "iron-ore-bentonite", description: "High bonding strength clay for metallurgical iron ore pellet plants" },
      { id: "sub_pond_lining", name: "Pond Lining & Geosynthetic Bentonite", slug: "pond-lining-bentonite", description: "Impermeable sodium bentonite barrier for canals, reservoirs, and landfill liners" },
      { id: "sub_paper_bentonite", name: "Paper Industry Bentonite", slug: "paper-bentonite", description: "Filler, retention aid, and pitch-control clay for paper mills" },
      { id: "sub_paints_bentonite", name: "Paints & Coatings Bentonite", slug: "paints-bentonite", description: "Rheological anti-settling suspension modifier for paints and coatings" },
      { id: "sub_ceramics_bentonite", name: "Ceramics Grade Bentonite", slug: "ceramics-bentonite", description: "Plasticizer and binder imparting high dry strength and thermal stability to ceramic bodies" }
    ]
  },
  {
    id: "cat_china_clay",
    name: "China Clay",
    slug: "china-clay",
    order: 4,
    isActive: true,
    description: "Premium levigated, washed, and extruded China Clay (Kaolinite) boasting high plasticity, low iron, and exceptional firing whiteness (Reference: Shyam Clay).",
    bannerImage: "/uploads/shyam-china-clay-noodles.webp",
    subcategories: [
      { id: "sub_clay_noodles", name: "China Clay Noodles (Extruded)", slug: "china-clay-noodles", description: "Levigated extruded noodles with 34-38% Al2O3 for ceramic sanitaryware and tiles" },
      { id: "sub_washed_clay_powder", name: "Washed / Levigated China Clay Powder", slug: "washed-china-clay-powder", description: "Hydrated aluminum silicate powder (300-500 mesh) for paints, rubber, and ceramics" },
      { id: "sub_crude_clay_lumps", name: "Crude China Clay Lumps", slug: "crude-china-clay-lumps", description: "Selected high-purity raw clay lumps direct from captive Kutch mining reserves" },
      { id: "sub_levigated_clay", name: "Levigated China Clay Lumps", slug: "levigated-china-clay", description: "Water-washed beneficiated kaolin cleansed of quartz, mica, and iron grit" }
    ]
  },
  {
    id: "cat_kaolin",
    name: "Kaolin",
    slug: "kaolin",
    order: 5,
    isActive: true,
    description: "Engineered calcined, hydrous, and micronized kaolin pigments delivering superior opacity, brightness (90-93% GE), dielectric performance, and TiO2 extension (Reference: Shyam Clay).",
    bannerImage: "/uploads/shyam-calcined-kaolin.webp",
    subcategories: [
      { id: "sub_calcined_kaolin", name: "Calcined Kaolin Powder", slug: "calcined-kaolin", description: "High-brightness dehydroxylated anhydrous kaolin (90-93% GE) for paints and paper" },
      { id: "sub_hydrous_kaolin", name: "Hydrous Kaolin Powder", slug: "hydrous-kaolin", description: "Water-washed ultra-fine plate-like kaolin for paper coating, inks, and adhesives" },
      { id: "sub_reactive_metakaolin", name: "Highly Reactive Metakaolin", slug: "reactive-metakaolin", description: "Engineered pozzolanic supplementary cementitious mineral for high-strength concrete" }
    ]
  },
  {
    id: "cat_other_minerals",
    name: "Other Relevant Minerals",
    slug: "other-minerals",
    order: 6,
    isActive: true,
    description: "High-performance industrial and refractory minerals processed for metallurgical, glass, cement, and construction industries (Excluding Silica Sand & Silica Quartz Powder as requested).",
    bannerImage: "/uploads/shyam-refractory-clay.webp",
    subcategories: [
      { id: "sub_ramming_mass", name: "Silica Ramming Mass / Refractory Clay", slug: "silica-ramming-mass", description: "Pre-mixed acidic refractory lining material for coreless induction furnaces" },
      { id: "sub_gypsum", name: "Industrial Gypsum Granules", slug: "industrial-gypsum", description: "High purity natural calcium sulfate dihydrate for cement retardation and plaster" },
      { id: "sub_feldspar", name: "Potassium & Sodium Feldspar", slug: "feldspar", description: "Lump and powder flux mineral for ceramic vitrification and glass container batching" }
    ]
  }
];

const products = [
  // ==================== INDUSTRIAL SALT (SKC Salt References) ====================
  {
    id: "prod_refined_industrial_salt",
    name: "Refined Industrial Salt",
    slug: "refined-industrial-salt",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_refined_ind_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "Ultra-pure dried industrial sodium chloride with 99.2%+ NaCl content, engineered for Chlor-Alkali electrolysis, textile reactive dyeing, and chemical synthesis (SKC Salt reference).",
    description: "Skyline Refined Industrial Salt is manufactured from high-grade coastal solar salt harvested from the Kutch coastline. The raw salt undergoes multi-stage mechanical washing, hydro-cyclone purification, centrifugal drying, and fluidized bed drying to eliminate magnesium, calcium, and water insolubles. With sodium chloride purity exceeding 99.2% and moisture below 0.2%, it guarantees maximum current efficiency in Chlor-Alkali membrane cells, uniform dye exhaustion in textiles, and minimal brine sludge in detergent manufacturing.",
    images: [
      "/uploads/skc-textile-salt.jpg",
      "/uploads/skc-salt-farm.jpg"
    ],
    grades: ["Grade A (99.5% NaCl)", "Grade B (99.2% NaCl)", "Low-Sulfate Chlor-Alkali Grade"],
    packaging: [
      "25 kg HDPE / PP laminated woven bags with LDPE liner",
      "50 kg HDPE bags with moisture-proof liner",
      "1000 kg (1 MT) and 1250 kg Jumbo bulk bags with lifting loops",
      "Bulk container loading for export via Kandla & Mundra ports"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, on dry basis)", value: "99.20% - 99.60% Min", testMethod: "IS: 797-1982" },
      { parameter: "Moisture Content", value: "0.15% - 0.25% Max", testMethod: "Gravimetric at 110°C" },
      { parameter: "Water Insoluble Matter", value: "0.03% - 0.05% Max", testMethod: "Gravimetric" },
      { parameter: "Calcium (as Ca)", value: "0.10% Max", testMethod: "EDTA Titration" },
      { parameter: "Magnesium (as Mg)", value: "0.05% Max", testMethod: "Atomic Absorption" },
      { parameter: "Sulfate (as SO4)", value: "0.20% Max", testMethod: "Barium Gravimetric" },
      { parameter: "pH of 10% Aqueous Solution", value: "6.5 - 8.0", testMethod: "pH Meter" },
      { parameter: "Particle Sieve Analysis", value: "85% passing through 1.0 mm mesh", testMethod: "Sieve Shaker" }
    ],
    applications: [
      "Chlor-Alkali manufacturing (Membrane cell caustic soda & chlorine production)",
      "Textile dyeing and reactive exhaust processing (fixing agent)",
      "Detergent and soap powder formulation",
      "Oil drilling brine and wellbore completion fluids",
      "Chemical and pigment synthesis"
    ],
    features: [
      "Exceptional 99.2%+ chemical purity minimizing brine sludge formation",
      "Ultra-low calcium and magnesium content protecting membrane cells",
      "Free-flowing non-caking crystals with consistent granulo-metric distribution",
      "Zero toxic heavy metals, tested under ISO certified laboratory standards"
    ],
    industries: ["Chemical Manufacturing", "Textiles & Garments", "Soaps & Detergents", "Oil & Gas Drilling", "Water Treatment"],
    seoTitle: "Refined Industrial Salt Manufacturer & Supplier | Skyline Salt Gandhidham",
    seoDescription: "High-purity Refined Industrial Salt (99.2%+ NaCl) for Chlor-Alkali, textiles, and chemicals. Bulk 50kg and 1MT jumbo bags available from Gandhidham factory.",
    seoKeywords: "refined industrial salt, chlor alkali salt, textile salt, sodium chloride manufacturer gujarat, salt supplier gandhidham"
  },
  {
    id: "prod_pure_dried_vacuum_salt",
    name: "Pure Dried Vacuum (PDV) Industrial Salt",
    slug: "pure-dried-vacuum-pdv-salt",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_pdv_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "Ultra-pure vacuum crystallized salt with 99.85%+ purity and microscopic cubic particle consistency for pharmaceuticals, precision chemicals, and water treatment (SKC Salt reference).",
    description: "Skyline Pure Dried Vacuum (PDV) Salt is produced under closed vacuum evaporation systems where purified saturated brine is boiled under reduced pressure. The crystals generated have uniform cubic geometry with nearly zero insolubles, zero trace minerals, and moisture content below 0.05%. Ideal for hemodialysis, pharmaceutical solutions, electroplating baths, and high-precision chemical reactions.",
    images: [
      "/uploads/skc-drilling-salt.jpg",
      "/uploads/skc-textile-salt.jpg"
    ],
    grades: ["Pharma Synthesis Grade", "High-Purity Chemical Grade", "Micro-Fine Powder Grade"],
    packaging: [
      "25 kg hermetically sealed multi-layer paper bags with PE barrier",
      "1000 kg anti-static certified jumbo bags"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl)", value: "99.85% Min", testMethod: "IS: 797-1982" },
      { parameter: "Moisture Content", value: "0.05% Max", testMethod: "Karl Fischer" },
      { parameter: "Insolubles", value: "0.005% Max", testMethod: "Gravimetric" },
      { parameter: "Sulfate (SO4)", value: "0.05% Max", testMethod: "Turbidimetric" },
      { parameter: "Heavy Metals (as Pb)", value: "< 2 ppm", testMethod: "ICP-MS" },
      { parameter: "Arsenic (As)", value: "< 0.5 ppm", testMethod: "ICP-MS" }
    ],
    applications: [
      "Pharmaceutical synthesis and parenteral salt solutions",
      "Precision electroplating and metallurgy electrolytes",
      "High-end dyes and laboratory reagent manufacturing",
      "Optical lens grinding and fluid stabilizer"
    ],
    features: [
      "Extreme chemical purity exceeding 99.85% NaCl",
      "Zero insoluble particulates ensuring crystal-clear solutions",
      "Sterile automated vacuum crystallization packaging line"
    ],
    industries: ["Pharmaceuticals", "Fine Chemicals", "Electroplating & Electronics"],
    seoTitle: "PDV Salt Manufacturer | Pure Dried Vacuum Salt Supplier Gujarat",
    seoDescription: "Ultra-pure Dried Vacuum (PDV) Salt with 99.85% NaCl. Manufactured in vacuum pans for pharmaceuticals, reagents, and fine chemicals.",
    seoKeywords: "pdv salt, pure dried vacuum salt, pharmaceutical grade salt, vacuum salt gandhidham"
  },
  {
    id: "prod_water_softener_tablet_salt",
    name: "Tablet Salt (Water Softener Salt)",
    slug: "water-softener-tablet-salt",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_water_softener",
    isFeatured: true,
    isActive: true,
    shortDescription: "Ultra-compact high-density cylindrical salt tablets engineered for boiler ion-exchange resin regeneration with zero mushing or bridging (SKC Salt reference).",
    description: "Skyline Water Softener Salt Tablets are manufactured under ultra-high hydraulic pressure using pharmaceutical-grade 99.8% pure vacuum salt. The proprietary pillow and cylinder shapes are formulated to dissolve evenly without disintegrating into fine mush, thereby preventing brine tank bridging and clumping. Specifically engineered for municipal water treatment, industrial boiler feed systems, commercial laundry softeners, and residential ion-exchange units.",
    images: [
      "/uploads/skc-tablet-salt.png"
    ],
    grades: ["Pillow Tablet (20 x 20 x 12 mm)", "Cylindrical Tablet (25 mm Dia x 15 mm)", "Commercial Boiler Grade"],
    packaging: [
      "10 kg polybag with carry handle",
      "25 kg multi-wall heavy duty PE bag",
      "1000 kg stretch-wrapped palletized loads"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl)", value: "99.80% Min", testMethod: "IS: 797-1982" },
      { parameter: "Moisture", value: "0.08% Max", testMethod: "Karl Fischer" },
      { parameter: "Insoluble Matter", value: "0.01% Max", testMethod: "Gravimetric" },
      { parameter: "Calcium (Ca)", value: "0.02% Max", testMethod: "Titrimetric" },
      { parameter: "Magnesium (Mg)", value: "0.01% Max", testMethod: "AAS" },
      { parameter: "Tablet Crushing Strength", value: "> 40 kg/cm²", testMethod: "Hardness Tester" },
      { parameter: "Dissolution Rate", value: "Controlled uniform dissolution without residue", testMethod: "Standard Test" }
    ],
    applications: [
      "Industrial water softening and demineralization (DM) plants",
      "Steam boiler feed-water pre-treatment",
      "Hospital and hotel commercial softening systems",
      "Cooling tower water circulation systems",
      "Swimming pool automated chlorinators"
    ],
    features: [
      "High mechanical hardness prevents crushing and dust during transit",
      "Leaves zero residue or insoluble buildup in brine tank reservoirs",
      "Maximizes the exchange capacity and lifespan of cation resins",
      "Consistent dissolution rate guarantees saturated 100% brine generation"
    ],
    industries: ["Water Treatment & Municipal", "Power & Thermal Plants", "Hospitality & Laundries", "Food & Beverage Plants"],
    seoTitle: "Water Softener Tablet Salt Manufacturer | Pure Salt Tablets Gandhidham",
    seoDescription: "High-density tablet salt for water softeners and ion-exchange resin regeneration. 99.8% pure, anti-mushing tablets in 25kg bags from Skyline Salt.",
    seoKeywords: "water softener salt, salt tablets, tablet salt manufacturer, ion exchange salt, boiler softener salt india"
  },
  {
    id: "prod_raw_solar_sea_salt",
    name: "Raw Solar Sea Salt",
    slug: "raw-solar-sea-salt",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_raw_solar_salt",
    isFeatured: false,
    isActive: true,
    shortDescription: "Naturally crystallized coarse sea salt harvested directly from Gujarat's coastal brine pans, washed and graded for bulk industrial use (SKC Salt reference).",
    description: "Skyline Raw Solar Sea Salt is produced along the sun-drenched tidal flats of Kutch, where concentrated Arabian Sea brine is evaporated in open crystallizers by natural sunlight and desert winds. The harvested coarse crystal salt is washed with saturated brine to rinse off surface impurities and drain excess bitterns. Available in loose bulk or bagged formats, it is the most cost-effective sodium chloride source for leather curing, chemicals, and oil drilling.",
    images: [
      "/uploads/skc-raw-salt.png",
      "/uploads/skc-leather-salt.jpg"
    ],
    grades: ["Washed Solar Salt (97.5% NaCl)", "Raw Coarse Crystal (96.5% NaCl)", "Crushed Granular (0-4 mm)"],
    packaging: [
      "50 kg PP bags",
      "1000 kg Jumbo Bags",
      "Bulk vessel / rake consignment loading from Kandla & Mundra ports"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, dry basis)", value: "96.50% - 97.80% Min", testMethod: "IS: 797-1982" },
      { parameter: "Moisture Content", value: "2.5% - 3.5% Max", testMethod: "Oven Drying" },
      { parameter: "Water Insolubles", value: "0.20% Max", testMethod: "Gravimetric" },
      { parameter: "Calcium (as Ca)", value: "0.35% Max", testMethod: "EDTA" },
      { parameter: "Magnesium (as Mg)", value: "0.40% Max", testMethod: "EDTA" },
      { parameter: "Sulfate (as SO4)", value: "0.75% Max", testMethod: "Gravimetric" },
      { parameter: "Crystal Size", value: "2 mm to 10 mm", testMethod: "Sieve Analysis" }
    ],
    applications: [
      "Leather tanning and hide curing",
      "Basic chemical industries and soda ash production",
      "Drilling fluid density weighting",
      "Feed-mill livestock mineral supplements",
      "Raw feed for salt refineries"
    ],
    features: [
      "Direct captive harvesting from Kutch salt works ensures consistent supply",
      "Naturally crystallized with robust hard crystalline structure",
      "Economical solution for bulk industrial users",
      "Convenient road and sea logistics through Gandhidham & Kandla"
    ],
    industries: ["Leather & Tanning", "Basic Chemicals", "Livestock & Agriculture", "Drilling Mud Services"],
    seoTitle: "Raw Solar Sea Salt Manufacturer & Exporter Kutch | Skyline Salt",
    seoDescription: "Bulk raw solar sea salt and washed crystal salt harvested in Kutch, Gujarat. Competitive bulk pricing for tanneries, chemicals, and exports.",
    seoKeywords: "raw solar salt, sea salt supplier kutch, crystal sea salt bulk, leather curing salt gandhidham"
  },
  {
    id: "prod_deicing_road_salt",
    name: "De-Icing Salt (Highway Road Salt)",
    slug: "de-icing-highway-road-salt",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_deicing_salt",
    isFeatured: false,
    isActive: true,
    shortDescription: "Coarse crystalline sodium chloride treated with anti-caking additives for rapid ice and snow clearance on highways, airport runways, and pavements (SKC Salt reference).",
    description: "Skyline De-Icing Salt is specially graded to deliver maximum exothermic thermodynamic melting action on icy surfaces down to -10°C (14°F). The optimal particle size spectrum (containing both fine grit for rapid initial melting and coarse granules for long-lasting penetration) ensures that roads stay navigable without excessive chemical run-off. Treated with food-grade anti-caking agent (YPS) to ensure free-flowing hopper dispersion in freezing climates.",
    images: [
      "/uploads/skc-raw-salt.png"
    ],
    grades: ["Standard Coarse Highway Grade", "Medium Runway Grade", "Pre-wetted / Treated Grade"],
    packaging: [
      "25 kg UV-stabilized heavy duty PE bags",
      "1000 kg and 1250 kg export jumbo bags with moisture barrier liner",
      "Bulk vessel discharge directly from Kandla port"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl)", value: "97.00% Min", testMethod: "ASTM D632" },
      { parameter: "Moisture Content", value: "1.5% - 2.5% Max", testMethod: "Standard Gravimetric" },
      { parameter: "Anti-Caking Agent (YPS)", value: "50 - 100 ppm", testMethod: "Spectrophotometric" },
      { parameter: "Sieve Size > 9.5 mm", value: "0%", testMethod: "ASTM E11" },
      { parameter: "Sieve Size 2.36 mm - 4.75 mm", value: "60% - 80%", testMethod: "ASTM E11" },
      { parameter: "Sieve Size < 0.3 mm", value: "< 5%", testMethod: "ASTM E11" }
    ],
    applications: [
      "State and municipal highway snow melting",
      "Airport tarmac, taxiway, and runway de-icing",
      "Commercial car parks, rail tracks, and logistics loading docks",
      "Residential driveway and walkway clearance"
    ],
    features: [
      "Optimized dual-action particle distribution for rapid bite and deep melt",
      "Treated with anti-caking agent for hassle-free hopper dispensing",
      "High bulk availability for seasonal international winter export tenders"
    ],
    industries: ["Municipal & Highway Maintenance", "Aviation & Airports", "Commercial Facilities"],
    seoTitle: "De-Icing Salt Manufacturer & Exporter | Highway Road Salt",
    seoDescription: "Export-grade De-Icing Road Salt meeting ASTM D632 standards. Fast melting coarse solar salt for highways, roads, and airport runways.",
    seoKeywords: "deicing salt, road salt exporter india, highway salt, rock salt for ice melt"
  },

  // ==================== EDIBLE SALT (SKC Salt References) ====================
  {
    id: "prod_refined_iodized_salt",
    name: "Refined Free Flow Iodized Salt",
    slug: "refined-free-flow-iodized-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_free_flow_iodized",
    isFeatured: true,
    isActive: true,
    shortDescription: "Finely refined triple-washed culinary salt enriched with potassium iodate and permitted anti-caking agents for household and food manufacturing (SKC Salt reference).",
    description: "Skyline Refined Free Flow Iodized Salt is manufactured in our modern automated food-grade processing unit in Gandhidham. Using pure vacuum and recrystallized sea salt, it undergoes multi-stage washings, optical sorting, and uniform dosing of potassium iodate (minimum 30 ppm at manufacture stage) and food-grade INS 551 anti-caking agent. The result is dazzling white, uniform, free-flowing salt that guarantees nutritional iodine and pure taste in every pinch.",
    images: [
      "/uploads/skc-iodized-salt.png"
    ],
    grades: ["Premium Table Grade", "Commercial Kitchen Grade", "Institutional Catering Grade"],
    packaging: [
      "500g and 1kg printed laminated pouches (consumer pack)",
      "25kg and 50kg food-grade HDPE woven sacks with LDPE inner liner",
      "OEM private label packaging available for retail brands"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, dry basis)", value: "99.50% Min", testMethod: "FSSAI Standards" },
      { parameter: "Moisture Content", value: "0.20% Max", testMethod: "Gravimetric" },
      { parameter: "Iodine Content (at manufacturing)", value: "30 ppm Min", testMethod: "Iodometric Titration" },
      { parameter: "Water Insoluble Matter", value: "0.05% Max", testMethod: "FSSAI" },
      { parameter: "Water Soluble Matter other than NaCl", value: "0.50% Max", testMethod: "FSSAI" },
      { parameter: "Anti-Caking Agent (INS 551 / 536)", value: "10 - 20 ppm", testMethod: "Standard Food Test" },
      { parameter: "Whiteness Index", value: "> 94%", testMethod: "Reflectance Meter" }
    ],
    applications: [
      "Household daily culinary use and dining table seasoning",
      "Commercial food restaurants, bakeries, and cloud kitchens",
      "Packaged snack foods, chips, and namkeen manufacturing",
      "Dairy processing, butter, and cheese salting",
      "Canned and ready-to-eat meal formulations"
    ],
    features: [
      "FSSAI compliant, manufactured in ISO 22000 & HACCP certified facility",
      "Consistent free-flow property even in humid weather conditions",
      "Uniform distribution of iodine ensuring micro-nutrient stability",
      "Zero adulterants, stones, or insoluble grit"
    ],
    industries: ["Food & Beverage", "Retail Consumer Goods", "Hospitality & Catering"],
    seoTitle: "Refined Free Flow Iodized Salt Manufacturer | Skyline Salt",
    seoDescription: "Premium refined free flow iodized salt manufactured under strict FSSAI guidelines. 1kg retail packs and 50kg bulk bags from Gandhidham.",
    seoKeywords: "iodized salt, free flow salt manufacturer, edible table salt supplier, food grade salt gandhidham"
  },
  {
    id: "prod_pdv_food_grade_salt",
    name: "PDV Food Grade Salt (Vacuum Salt)",
    slug: "pdv-food-grade-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_pdv_food_salt",
    isFeatured: false,
    isActive: true,
    shortDescription: "Ultra-pure vacuum crystallized food-grade salt with uniform cubic micro-crystals for snacks, dairy, and confectionery seasoning (SKC Salt reference).",
    description: "Skyline Food Grade PDV Salt represents the gold standard in food processing sodium chloride. Produced under closed thermo-compression vacuum evaporators, it boasts over 99.8% purity with zero micro-particulates. Its unique micro-cube morphology adheres with extreme uniformity to potato chips, nuts, extruded snacks, and pretzels, providing burst-in-mouth salinity without falling off or burning during extrusion.",
    images: [
      "/uploads/skc-drilling-salt.jpg",
      "/uploads/skc-iodized-salt.png"
    ],
    grades: ["Fine Flour Grade", "Standard Micro-Cube Snack Grade", "Low-Sodium Blend Base"],
    packaging: ["25 kg food-grade paper bags with moisture liner", "1000 kg food-contact certified jumbo bags"],
    specifications: [
      { parameter: "Sodium Chloride (NaCl)", value: "99.80% Min", testMethod: "FCC / Codex Alimentarius" },
      { parameter: "Moisture", value: "0.08% Max", testMethod: "Oven Dry" },
      { parameter: "Calcium & Magnesium", value: "< 0.02%", testMethod: "AAS" },
      { parameter: "Iron (Fe)", value: "< 2 ppm", testMethod: "Spectrophotometer" },
      { parameter: "Copper (Cu)", value: "< 0.5 ppm", testMethod: "AAS" }
    ],
    applications: [
      "Potato chips, extruded corn curls, and savory snack seasoning",
      "Butter, cheese, and dairy brining",
      "Processed meat, sausage, and ham curing",
      "Bakery dough fermentation control"
    ],
    features: [
      "Exceptional adherence on snack food surfaces reducing salt dusting loss",
      "Ultra-low heavy metal profile conforming to US FDA and European food codes",
      "Instant dissolution rate in food dough and liquid seasonings"
    ],
    industries: ["Snack Foods & Confectionery", "Dairy & Cheese Plants", "Bakery & Biscuits"],
    seoTitle: "PDV Food Grade Salt Manufacturer | Snack Seasoning Salt",
    seoDescription: "Ultra-pure PDV food grade vacuum salt for snacks, dairy, and seasonings. 99.8% purity with uniform cubic crystals.",
    seoKeywords: "pdv food salt, vacuum salt food grade, snack seasoning salt, bakery salt supplier"
  },
  {
    id: "prod_natural_crystal_sea_salt",
    name: "Natural Crystal Sea Salt",
    slug: "natural-crystal-sea-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_crystal_food_salt",
    isFeatured: false,
    isActive: true,
    shortDescription: "Unrefined mineral-rich sea salt crystals harvested naturally from Kutch coastal pans for traditional pickling, food brining, and curing (SKC Salt reference).",
    description: "Harvested by hand and mechanical harvesters from Kutch's pristine coastal crystallizers, our natural sea salt crystals undergo washing in pure saturated brine to maintain natural mineral trace elements while removing extraneous surface dust. Ideal for commercial pickle factories, fish preservation, and bakery fermentations.",
    images: [
      "/uploads/skc-salt-farm.jpg",
      "/uploads/skc-raw-salt.png"
    ],
    grades: ["Grain Size 2-4 mm", "Grain Size 4-8 mm (Coarse Pickle Grade)"],
    packaging: ["25 kg and 50 kg PP food-grade bags", "1 MT jumbo bulk bags"],
    specifications: [
      { parameter: "Sodium Chloride (NaCl)", value: "98.20% Min", testMethod: "IS: 797" },
      { parameter: "Moisture", value: "1.2% Max", testMethod: "Gravimetric" },
      { parameter: "Water Insolubles", value: "0.08% Max", testMethod: "Gravimetric" }
    ],
    applications: ["Pickle and condiment preservation", "Fish curing and brining", "Artisanal bakery and organic food blends"],
    features: ["Natural minerals preserved", "Crisp crystalline grain", "Free from artificial chemicals"],
    industries: ["Food Processing", "Pickles & Preserves", "Seafood Curing"],
    seoTitle: "Natural Crystal Sea Salt Manufacturer | Food Grade Coarse Salt",
    seoDescription: "Natural unrefined sea salt crystals for pickling, food brining, and curing from Kutch coastline.",
    seoKeywords: "crystal sea salt, coarse food salt, pickling salt, sea salt crystals manufacturer"
  },

  // ==================== BENTONITE (Kutch Bentoclay References) ====================
  {
    id: "prod_api_drilling_bentonite",
    name: "API 13A Section 9 & 11 Drilling Bentonite",
    slug: "api-13a-drilling-bentonite",
    categoryId: "cat_bentonite",
    categorySlug: "bentonite",
    subcategoryId: "sub_api_drilling",
    isFeatured: true,
    isActive: true,
    shortDescription: "Premium high-yield sodium bentonite meeting strict American Petroleum Institute (API 13A) specifications for oil, gas, and geothermal drilling (Kutch Bentoclay reference).",
    description: "Skyline API 13A Drilling Bentonite is engineered from select high-grade natural sodium bentonite reserves in Kutch, Gujarat. Processed in our advanced activation and milling facility in Gandhidham, it imparts exceptional rheological properties to water-based drilling muds. It provides high yield point, low filtrate loss, and rapid thixotropic gel formation, guaranteeing superior hole cleaning, borehole stabilization, and drill bit cooling during deep high-pressure well drilling.",
    images: [
      "/uploads/kbc-drilling-bentonite.png"
    ],
    grades: ["API 13A Section 9 (Untreated High Grade)", "API 13A Section 11 (Treated Drilling Grade)", "OCMA DFCP-4 Grade"],
    packaging: [
      "25 kg and 50 kg multi-ply paper or HDPE bags with moisture barrier",
      "1000 kg and 1250 kg UV-treated Jumbo big bags with discharge spout",
      "Export palletized shrink-wrapped sea consignments via Mundra port"
    ],
    specifications: [
      { parameter: "Viscometer Dial Reading @ 600 RPM", value: "30 Min", testMethod: "API RP 13B-1 / Fann 35" },
      { parameter: "Yield Point / Plastic Viscosity Ratio", value: "3.0 Max", testMethod: "API RP 13B-1" },
      { parameter: "Filtrate Loss (Fluid Loss)", value: "15.0 cm³ Max (12.5 cm³ typ.)", testMethod: "API Filter Press @ 100 psi" },
      { parameter: "Moisture Content", value: "10.0% - 12.0% Max", testMethod: "Oven drying @ 105°C" },
      { parameter: "Residue on 75 µm sieve (Wet screen)", value: "2.5% Max", testMethod: "API Wet Sieve" },
      { parameter: "Residue on 150 µm sieve (Dry screen)", value: "0.1% Max", testMethod: "Dry Sieve" },
      { parameter: "Free Swell Volume", value: "> 28 ml / 2g", testMethod: "ASTM D5890" },
      { parameter: "Montmorillonite Content", value: "85% - 90% Min", testMethod: "XRD / CEC" }
    ],
    applications: [
      "Oil and natural gas deep exploration drilling muds",
      "Geothermal energy wellbore circulation",
      "Horizontal Directional Drilling (HDD) trenchless river crossings",
      "Water well drilling and casing lubrication",
      "Mining core sampling boreholes"
    ],
    features: [
      "Strictly tested and verified to comply with API Spec 13A Section 9 & 11 standards",
      "Fast hydration and excellent shear-thinning thixotropy",
      "Forms a thin, impermeable, tough filter cake preventing wall collapse",
      "High cutting carrying capacity ensures clean wellbores even at low pump rates"
    ],
    industries: ["Oil & Gas Exploration", "Geothermal Drilling", "Trenchless HDD Construction", "Mining Exploration"],
    seoTitle: "API 13A Drilling Bentonite Manufacturer Kutch | Skyline Salt",
    seoDescription: "High-yield API 13A Section 9 & 11 Drilling Bentonite powder from Kutch, Gujarat. Superior fluid loss control and viscosity for oilfield drilling muds.",
    seoKeywords: "api bentonite, drilling bentonite manufacturer, api 13a section 9 bentonite, ocma bentonite supplier india, kutch bentonite"
  },
  {
    id: "prod_foundry_grade_bentonite",
    name: "Foundry Grade Sodium Bentonite",
    slug: "foundry-grade-sodium-bentonite",
    categoryId: "cat_bentonite",
    categorySlug: "bentonite",
    subcategoryId: "sub_foundry_bentonite",
    isFeatured: true,
    isActive: true,
    shortDescription: "High thermal durability sodium bentonite binder for green sand molding systems in ductile iron, gray iron, and steel casting foundries (Kutch Bentoclay reference).",
    description: "Skyline Foundry Grade Bentonite is a natural high-swelling montmorillonite clay mined from the renowned volcanic deposits of Kutch. It is specifically formulated to withstand the extreme thermal shock of molten iron and steel up to 1450°C. Possessing high Green Compression Strength (GCS), superior Dry Compression Strength (DCS), and outstanding Wet Tensile Strength (WTS), it guarantees defect-free casting surfaces with minimal sand inclusions, scabbing, or wash defects.",
    images: [
      "/uploads/kbc-foundry-bentonite.png"
    ],
    grades: ["Super Foundry Grade (GCS > 12 N/cm²)", "Standard Ductile Iron Grade", "Steel Casting High Thermal Grade"],
    packaging: [
      "25 kg and 50 kg PP woven bags with liner",
      "1000 kg and 1250 kg Jumbo bulk bags"
    ],
    specifications: [
      { parameter: "Montmorillonite Content", value: "85% Min", testMethod: "Methylene Blue (MBT)" },
      { parameter: "Green Compression Strength (GCS)", value: "10.0 - 13.5 N/cm²", testMethod: "AFS Sand Specimen @ 7% Bentonite" },
      { parameter: "Dry Compression Strength (DCS)", value: "35.0 - 55.0 N/cm²", testMethod: "Dried @ 105°C" },
      { parameter: "Wet Tensile Strength (WTS)", value: "0.22 - 0.32 N/cm²", testMethod: "Condensation Zone Test" },
      { parameter: "Liquid Limit", value: "550% - 650%", testMethod: "Casagrande Cup" },
      { parameter: "Free Swelling Index", value: "28 - 35 ml / 2g", testMethod: "ASTM D5890" },
      { parameter: "Moisture Content", value: "9.0% - 11.5%", testMethod: "Oven Drying" },
      { parameter: "Grit Content (> 75 µm)", value: "1.5% Max", testMethod: "Wet Sieving" }
    ],
    applications: [
      "Automotive ductile iron and cast iron engine blocks and manifolds",
      "Heavy engineering machinery and railway castings",
      "Steel, manganese, and alloy steel sand mold casting",
      "Non-ferrous brass, bronze, and aluminum foundry molding"
    ],
    features: [
      "Superior thermal durability maintains active clay percentage over repeated sand cycles",
      "High wet tensile strength prevents scabbing and expansion defects during pouring",
      "Excellent mold flowability and stripping properties without sand stickiness",
      "Reduces bentonite consumption in sand reclamation systems"
    ],
    industries: ["Automotive Foundries", "Iron & Steel Casting", "Heavy Machinery Manufacturing"],
    seoTitle: "Foundry Grade Bentonite Manufacturer | Green Sand Binder",
    seoDescription: "High-swelling sodium bentonite for green sand metal casting foundries. High GCS and thermal stability from Kutch, Gujarat mines.",
    seoKeywords: "foundry bentonite, green sand binder, sodium bentonite casting, foundry clay manufacturer kutch"
  },
  {
    id: "prod_piling_civil_bentonite",
    name: "Piling & Civil Engineering Bentonite",
    slug: "piling-civil-engineering-bentonite",
    categoryId: "cat_bentonite",
    categorySlug: "bentonite",
    subcategoryId: "sub_civil_bentonite",
    isFeatured: true,
    isActive: true,
    shortDescription: "High-thixotropy slurry clay designed for deep foundation bored piles, diaphragm slurry walls, micro-tunneling, and environmental cut-off barriers (Kutch Bentoclay reference).",
    description: "Skyline Piling Bentonite functions as an exceptional 'liquid scaffolding' during deep geotechnical excavation. When mixed with water, it forms a viscous colloidal suspension that exerts continuous hydrostatic pressure against soil walls. The thixotropic gel structures suspend heavy excavated soils and stones when agitation halts, while rapidly sealing permeable sand formations with an impervious clay barrier, preventing cave-ins and groundwater seepage.",
    images: [
      "/uploads/kbc-piling-bentonite.png"
    ],
    grades: ["Civil Foundation Piling Grade", "Diaphragm Slurry Wall Grade", "Micro-Tunneling Lubrication Grade"],
    packaging: ["50 kg PP bags", "1000 kg Jumbo bags with lifting loops"],
    specifications: [
      { parameter: "Marsh Funnel Viscosity (5% Slurry)", value: "38 - 50 seconds", testMethod: "Marsh Funnel" },
      { parameter: "Apparent Viscosity", value: "15 - 20 cP", testMethod: "Fann Viscometer" },
      { parameter: "Fluid Loss (30 min @ 100 psi)", value: "< 14.0 ml", testMethod: "API Filter Press" },
      { parameter: "Filter Cake Thickness", value: "< 1.5 mm", testMethod: "API Cell" },
      { parameter: "Swelling Index", value: "> 26 ml / 2g", testMethod: "ASTM D5890" },
      { parameter: "Sand Content in Slurry", value: "< 0.5%", testMethod: "Sand Screen Set" },
      { parameter: "pH Value", value: "8.5 - 10.0", testMethod: "pH Meter" }
    ],
    applications: [
      "Bored cast-in-situ concrete piling works for bridges and high-rises",
      "Diaphragm slurry trench walls for metro stations and underground basements",
      "Pipe-jacking, micro-tunneling, and shield tunneling lubrication",
      "Landfill clay liners and environmental impermeable containment cutoffs"
    ],
    features: [
      "Rapid hydration rate minimizing slurry holding tank agitation time",
      "Forms thin, ultra-low permeability filter cake preventing collapse in sandy loose soils",
      "High soil carrying capacity keeps excavated debris in suspension",
      "Easily displaced by poured concrete without leaving structural voids"
    ],
    industries: ["Infrastructure & Metro Construction", "Civil Engineering & Piling", "Environmental Sealing"],
    seoTitle: "Piling Grade Bentonite Slurry Manufacturer | Civil Engineering Clay",
    seoDescription: "High-performance civil engineering and bored piling bentonite. Rapid gel formation and superior trench stability for infrastructure projects.",
    seoKeywords: "piling bentonite, civil engineering clay, diaphragm wall slurry, bored pile bentonite supplier"
  },
  {
    id: "prod_cat_litter_bentonite",
    name: "Cat Litter Bentonite Granules",
    slug: "cat-litter-bentonite-granules",
    categoryId: "cat_bentonite",
    categorySlug: "bentonite",
    subcategoryId: "sub_cat_litter",
    isFeatured: false,
    isActive: true,
    shortDescription: "Ultra-absorbent natural sodium bentonite granules with instant rock-hard clumping, low dust, and natural mineral odor neutralization (Kutch Bentoclay reference).",
    description: "Skyline Cat Litter Bentonite is processed from natural pure sodium bentonite clay that naturally expands up to 15 times its dry volume upon liquid contact. Engineered into dust-free rounded granules through specialized tumbling, screening, and dedusting cycles, it clumps instantly into tight solid scoops within seconds. Available in unscented natural formats as well as customized baby powder, lavender, and activated carbon blends.",
    images: [
      "/uploads/kbc-cat-litter.jpg"
    ],
    grades: ["Fine Granules (0.5 - 2.5 mm)", "Coarse Granules (1.0 - 4.0 mm)", "Carbon Infused Blend"],
    packaging: [
      "5 kg and 10 kg high-quality laminated retail bags with carry handle",
      "25 kg PP bags",
      "1000 kg Jumbo bulk bags for private label repacking"
    ],
    specifications: [
      { parameter: "Water Absorption Capacity", value: "> 350% by weight", testMethod: "Enslin Neff" },
      { parameter: "Clump Strength", value: "Rock solid clump within 5 seconds", testMethod: "Drop Test" },
      { parameter: "Dust Content", value: "< 0.5% (99.5% Dust Free)", testMethod: "Optical Particle Counter" },
      { parameter: "Granule Size (0.5 - 2.5 mm)", value: "98% Min", testMethod: "Sieve Shaker" },
      { parameter: "Moisture Content", value: "8.0% - 10.0%", testMethod: "Oven Dry" }
    ],
    applications: [
      "Commercial and pet retail clumping cat litter packaging",
      "Private label pet care retail brands worldwide",
      "Veterinary hospital animal litter substrates"
    ],
    features: [
      "100% natural sodium bentonite clay with zero chemical synthetic binders",
      "Instant rock-hard clumping prevents sticky tray bottoms",
      "Multi-stage dedusting eliminates respiratory irritants for cats and humans"
    ],
    industries: ["Pet Care & Retail", "Animal Healthcare", "FMCG Exports"],
    seoTitle: "Cat Litter Bentonite Granules Manufacturer | Bulk Pet Litter India",
    seoDescription: "Export-grade natural sodium bentonite cat litter granules. 99.5% dust-free, instant clumping, and high absorption from Gujarat manufacturer.",
    seoKeywords: "cat litter bentonite, clumping bentonite granules, bulk cat litter manufacturer india, pet litter exporter"
  },
  {
    id: "prod_earthing_bentonite",
    name: "Electrical Earthing Bentonite Powder",
    slug: "electrical-earthing-bentonite-powder",
    categoryId: "cat_bentonite",
    categorySlug: "bentonite",
    subcategoryId: "sub_earthing_bentonite",
    isFeatured: false,
    isActive: true,
    shortDescription: "Moisture-retaining, low-resistivity mineral compound for electrical grounding pits, power substations, transmission towers, and lightning arresters (Kutch Bentoclay reference).",
    description: "Skyline Electrical Earthing Bentonite is engineered to provide permanent low electrical resistance for grounding electrodes even in arid, rocky, or sandy terrains. When hydrated in the earthing pit around the electrode pipe or rod, it expands to seal the surrounding void completely. It retains moisture over prolonged dry spells, conducts fault currents rapidly into the earth, and protects grounding rods against soil galvanic corrosion.",
    images: [
      "/uploads/kbc-earthing-bentonite.jpg"
    ],
    grades: ["Standard Earthing Powder", "Electrolyte Enhanced Backfill Compound"],
    packaging: ["25 kg and 50 kg moisture-proof HDPE woven bags"],
    specifications: [
      { parameter: "Specific Soil Resistivity", value: "< 2.5 Ohm-meter", testMethod: "Four-Point Wenner Method" },
      { parameter: "Liquid Limit", value: "> 500%", testMethod: "ASTM D4318" },
      { parameter: "Free Swelling Volume", value: "> 26 ml / 2g", testMethod: "ASTM D5890" },
      { parameter: "pH Value", value: "8.0 - 9.5 (Non-corrosive)", testMethod: "pH Meter" },
      { parameter: "Grain Fineness (-200 mesh)", value: "85% passing", testMethod: "Standard Sieve" }
    ],
    applications: [
      "Electrical transmission and distribution sub-stations",
      "Telecommunication cell towers and microwave antenna grounding",
      "Solar photovoltaic and wind turbine lightning earthing pits",
      "Oil refineries, gas pipelines, and hazardous industrial earthing systems"
    ],
    features: [
      "Maintains stable ultra-low earthing resistance through seasonal droughts",
      "Non-corrosive pH protects copper and galvanized grounding conductors",
      "Environmentally safe natural mineral, does not leach harmful chemicals into groundwater"
    ],
    industries: ["Power Generation & Transmission", "Telecom Infrastructure", "Renewable Solar & Wind"],
    seoTitle: "Electrical Earthing Bentonite Powder Manufacturer | Grounding Compound",
    seoDescription: "Low-resistivity electrical earthing bentonite powder for power substations, solar plants, and telecom towers. Moisture-retaining ground compound.",
    seoKeywords: "earthing bentonite, electrical grounding compound, bentonite powder for earthing pit, low resistance earth chemical"
  },
  {
    id: "prod_fertilizer_bentonite",
    name: "Agriculture & Fertilizer Grade Bentonite Granules",
    slug: "agriculture-fertilizer-grade-bentonite",
    categoryId: "cat_bentonite",
    categorySlug: "bentonite",
    subcategoryId: "sub_fertilizer_bentonite",
    isFeatured: false,
    isActive: true,
    shortDescription: "Natural binder, soil moisture conditioner, and nutrient carrier for granular fertilizers (NPK, DAP, Sulfur blends) and sandy soils (Kutch Bentoclay reference).",
    description: "Processed into uniform, free-flowing spherical granules, our agricultural bentonite serves as an exceptional carrier for micro-nutrients, bio-fertilizers, and sulfur coatings. Its high cation exchange capacity (CEC) retains water and plant nutrients within the root zone, preventing chemical leaching into groundwater.",
    images: [
      "/uploads/kbc-fertilizer-bentonite.jpg"
    ],
    grades: ["Granules 2-4 mm (NPK/DAP Carrier)", "Sulfur-Bentonite Blend (90% S)", "Fine Agricultural Powder"],
    packaging: ["50 kg HDPE bags", "1 MT jumbo bulk bags"],
    specifications: [
      { parameter: "Montmorillonite Purity", value: "> 80%", testMethod: "Methylene Blue" },
      { parameter: "Cation Exchange Capacity (CEC)", value: "75 - 90 meq/100g", testMethod: "Ammonium Acetate" },
      { parameter: "Moisture Content", value: "8% - 10%", testMethod: "Oven Dry" },
      { parameter: "Granule Hardness", value: "> 3.0 kg/granule", testMethod: "Crush Tester" }
    ],
    applications: ["Carrier for sulfur, zinc, and micronutrient fertilizer granules", "Soil conditioner for sandy and arid farmlands", "Pesticide and fungicide inert dispersant"],
    features: ["Boosts soil water retention", "Reduces fertilizer nutrient leaching", "100% organic and non-toxic"],
    industries: ["Fertilizer Manufacturers", "Agrochemicals", "Agriculture & Farming"],
    seoTitle: "Fertilizer Grade Bentonite Granules Manufacturer | Agriculture Clay",
    seoDescription: "High-CEC agricultural bentonite granules for fertilizer coatings, sulfur blends, and soil conditioning.",
    seoKeywords: "fertilizer bentonite, agriculture bentonite granules, sulfur bentonite carrier, soil conditioner clay"
  },
  {
    id: "prod_iron_ore_bentonite",
    name: "Iron Ore Pelletization Bentonite",
    slug: "iron-ore-pelletization-bentonite",
    categoryId: "cat_bentonite",
    categorySlug: "bentonite",
    subcategoryId: "sub_iron_ore_bentonite",
    isFeatured: false,
    isActive: true,
    shortDescription: "High green pellet and fired compressive strength sodium bentonite binder for iron ore concentrate pelletizing plants (Kutch Bentoclay reference).",
    description: "Engineered specifically for steel and iron ore pelletizing plants, this high-swelling sodium bentonite acts as a binding agent that transforms moist iron ore fines into robust green balls. It provides high drop numbers, prevents thermal spalling during grate drying, and produces high crushing strength pellets for blast furnaces and DRI kilns.",
    images: [
      "/uploads/kbc-iron-ore-bentonite.jpg"
    ],
    grades: ["Pelletizing Grade (Drop No > 15)", "High Thermal Stability Pellet Grade"],
    packaging: ["50 kg bags", "1 MT Jumbo bags"],
    specifications: [
      { parameter: "Green Drop Number", value: "> 16 drops (0.5m)", testMethod: "Pellet Drop Test" },
      { parameter: "Dry Compressive Strength", value: "> 5.5 kg/pellet", testMethod: "Pellet Hardness" },
      { parameter: "Free Swelling Volume", value: "> 30 ml / 2g", testMethod: "ASTM D5890" },
      { parameter: "Fineness (-200 mesh)", value: "> 90% passing", testMethod: "Wet Screen" }
    ],
    applications: ["Iron ore green pellet binding", "DRI sponge iron kiln pellets", "Blast furnace feed agglomeration"],
    features: ["Low dosage requirement (0.6 - 0.8%)", "High green and dry ball strength", "Minimizes dust breakdown"],
    industries: ["Steel Rolling Mills", "Iron Ore Agglomeration", "Mining & Metallurgy"],
    seoTitle: "Iron Ore Pelletization Bentonite Manufacturer | Pellet Binder Clay",
    seoDescription: "High-swelling sodium bentonite binder for iron ore pelletization plants with high drop strength.",
    seoKeywords: "iron ore bentonite, pelletizing binder, sodium bentonite for iron ore, pellet plant clay"
  },

  // ==================== CHINA CLAY (Shyam Clay References) ====================
  {
    id: "prod_china_clay_noodles",
    name: "China Clay Noodles (Extruded)",
    slug: "china-clay-noodles-extruded",
    categoryId: "cat_china_clay",
    categorySlug: "china-clay",
    subcategoryId: "sub_clay_noodles",
    isFeatured: true,
    isActive: true,
    shortDescription: "Levigated extruded noodle-shaped kaolinite clay with 35-38% Al2O3, high plasticity, and superior firing whiteness for ceramic tiles and sanitaryware (Shyam Clay reference).",
    description: "Skyline China Clay Noodles are manufactured from selectively mined crude kaolin lumps from Kutch. The raw clay is slurried, levigated through multi-stage hydro-cyclones to remove free silica and mica, dewatered in high-pressure filter presses, and extruded into distinctive noodle shapes before controlled drying. The extruded noodle form ensures rapid blunging and dissolution in ceramic ball mills while generating zero dust during bulk transit.",
    images: [
      "/uploads/shyam-china-clay-noodles.webp"
    ],
    grades: ["Grade A Super White (Al2O3 > 36%)", "Grade B Ceramic Tile Body (Al2O3 > 34%)", "Sanitaryware Plastic Grade"],
    packaging: [
      "50 kg HDPE bags",
      "1000 kg and 1250 kg Jumbo bulk bags",
      "Loose bulk truckloads directly from Gandhidham / Bhuj facility"
    ],
    specifications: [
      { parameter: "Alumina (Al2O3)", value: "35.0% - 38.0%", testMethod: "Wet Chemical / XRF" },
      { parameter: "Silica (SiO2)", value: "46.0% - 49.0%", testMethod: "XRF" },
      { parameter: "Iron Oxide (Fe2O3)", value: "0.50% - 0.90% Max", testMethod: "Spectrophotometric" },
      { parameter: "Titanium Dioxide (TiO2)", value: "0.60% - 1.10% Max", testMethod: "XRF" },
      { parameter: "Loss on Ignition (LOI)", value: "12.5% - 13.8%", testMethod: "Gravimetric @ 1000°C" },
      { parameter: "Fired Whiteness (1220°C)", value: "82% - 88% GE", testMethod: "Colorimeter / Reflectometer" },
      { parameter: "Modulus of Rupture (Dried MOR)", value: "18 - 25 kg/cm²", testMethod: "Three-point Bending" },
      { parameter: "Moisture Content", value: "8.0% - 12.0%", testMethod: "Oven Drying" }
    ],
    applications: [
      "Vitrified and porcelain floor and wall tile bodies",
      "Ceramic sanitaryware (water closets, washbasins, urinals)",
      "Bone china, porcelain tableware, and stoneware pottery",
      "High-voltage electrical porcelain insulators",
      "Refractory bricks and kiln furniture"
    ],
    features: [
      "Extruded noodle format offers excellent blunging kinetics in ceramic slurry prep",
      "High alumina content and low iron oxide guarantee high fired whiteness and strength",
      "Exceptional plastic green strength prevents warping and handling breakage in green ware",
      "Controlled low alkali content ensures broad firing range and vitrification stability"
    ],
    industries: ["Ceramic Tiles & Sanitaryware", "Tableware & Crockery", "Electrical Insulators", "Refractories"],
    seoTitle: "China Clay Noodles Manufacturer Bhuj Kutch | Ceramic Kaolin",
    seoDescription: "High-alumina extruded China Clay Noodles for ceramic tiles, sanitaryware, and tableware. Low iron and high plasticity from Bhuj-Kutch mines.",
    seoKeywords: "china clay noodles, ceramic clay noodles, levigated kaolin noodles, china clay manufacturer kutch, bhuj kaolin"
  },
  {
    id: "prod_washed_china_clay_powder",
    name: "Washed / Levigated China Clay Powder",
    slug: "washed-levigated-china-clay-powder",
    categoryId: "cat_china_clay",
    categorySlug: "china-clay",
    subcategoryId: "sub_washed_clay_powder",
    isFeatured: true,
    isActive: true,
    shortDescription: "Ultra-fine hydrated aluminum silicate powder (300 to 500 mesh) processed for paint extenders, rubber compounding, and paper coatings (Shyam Clay reference).",
    description: "Skyline Washed China Clay Powder is produced by pulverizing and air-classifying pure levigated kaolin clay in our Gandhidham micronizing plant. The fine lamellar, platy crystal morphology acts as an inert reinforcing extender, enhancing rheological flow, opacity, suspension stability, and mechanical strength in paint and polymer formulations. Free from coarse grit and crystalline silica impurities.",
    images: [
      "/uploads/shyam-china-clay-powder.webp",
      "/uploads/shyam-levigated-clay.webp"
    ],
    grades: ["300 Mesh Standard", "400 Mesh Paint Grade", "500 Mesh Super-Fine Grade"],
    packaging: ["25 kg and 50 kg PP laminated bags", "1000 kg Jumbo bulk bags"],
    specifications: [
      { parameter: "Alumina (Al2O3)", value: "36.0% - 38.5%", testMethod: "XRF" },
      { parameter: "Silica (SiO2)", value: "45.0% - 48.0%", testMethod: "XRF" },
      { parameter: "Brightness (ISO / GE)", value: "82.0% - 86.0%", testMethod: "Reflectometer" },
      { parameter: "Residue on 300 Mesh (< 53 µm)", value: "0.2% Max", testMethod: "Wet Screen" },
      { parameter: "Residue on 500 Mesh (< 25 µm)", value: "0.5% Max", testMethod: "Wet Screen" },
      { parameter: "Oil Absorption", value: "35 - 45 g / 100g", testMethod: "ASTM D281" },
      { parameter: "pH Value (10% Slurry)", value: "6.0 - 7.5", testMethod: "pH Meter" },
      { parameter: "Specific Gravity", value: "2.60 g/cm³", testMethod: "Pycnometer" }
    ],
    applications: [
      "Emulsion paints, primers, distempers, and architectural coatings (extender)",
      "Rubber compounding, footwear soles, conveyor belts, and molded profiles",
      "Paper filler and pigment coating",
      "Adhesives, sealants, mastics, and wall putty",
      "Pesticide carrier and wettable dispersible powder formulations"
    ],
    features: [
      "Platy platelet morphology improves film barrier resistance and brushability in paints",
      "Excellent anti-settling properties preventing pigment hard cake settlement",
      "Semi-reinforcing filler that improves modulus and tear resistance in rubber"
    ],
    industries: ["Paints & Coatings", "Rubber & Footwear", "Paper & Packaging", "Adhesives & Putty"],
    seoTitle: "Washed China Clay Powder Manufacturer | 300-500 Mesh Kaolin",
    seoDescription: "High-brightness washed China Clay powder (300 to 500 mesh) for paints, rubber, paper, and ceramics. Supplied in bulk from Gandhidham.",
    seoKeywords: "washed china clay powder, levigated kaolin powder, paint grade china clay, 500 mesh kaolin supplier"
  },
  {
    id: "prod_crude_china_clay_lumps",
    name: "Crude China Clay Lumps",
    slug: "crude-china-clay-lumps",
    categoryId: "cat_china_clay",
    categorySlug: "china-clay",
    subcategoryId: "sub_crude_clay_lumps",
    isFeatured: false,
    isActive: true,
    shortDescription: "Selectively hand-mined raw unrefined kaolin lumps direct from captive Kutch mines, rich in plasticity and natural clay minerals (Shyam Clay reference).",
    description: "Skyline Crude China Clay Lumps are sourced directly from our verified mineral leases in Kutch, Gujarat. Hand-sorted and graded at mine sites, these raw lumps provide a rich source of kaolinite for processing plants, ceramic manufacturers, and refractory producers who operate in-house levigation or grinding facilities. Highly competitive bulk vessel and tipper pricing available.",
    images: [
      "/uploads/shyam-crude-china-clay.webp",
      "/uploads/shyam-china-clay-lumps.webp"
    ],
    grades: ["Select White Lumps (Al2O3 > 32%)", "Industrial Ceramic Lumps (Al2O3 > 28%)"],
    packaging: ["Loose bulk tipper / trailer loads", "50 kg bags", "1000 kg Jumbo bags"],
    specifications: [
      { parameter: "Alumina (Al2O3)", value: "30.0% - 35.0%", testMethod: "XRF" },
      { parameter: "Silica (SiO2)", value: "48.0% - 55.0%", testMethod: "XRF" },
      { parameter: "Iron Oxide (Fe2O3)", value: "1.2% - 1.8%", testMethod: "AAS" },
      { parameter: "Recovery Yield (after levigation)", value: "65% - 75%", testMethod: "Wet Beneficiation" },
      { parameter: "Raw Moisture", value: "12% - 18%", testMethod: "Oven Drying" }
    ],
    applications: [
      "Raw feed for third-party clay washing and levigation plants",
      "Red and white clay brick works and terracotta pottery",
      "Cement manufacture raw meal alumina correction",
      "Cost-effective ceramic floor tile body formulations"
    ],
    features: [
      "Direct captive mine supply guarantees consistent geology and chemistry",
      "Cost-effective bulk mineral solution for high-volume processors",
      "High recovery percentage of purified kaolin upon water washing"
    ],
    industries: ["Mining & Beneficiation Plants", "Cement Manufacturing", "Structural Ceramics"],
    seoTitle: "Crude China Clay Lumps Supplier Kutch Gujarat | Skyline Minerals",
    seoDescription: "Raw crude China Clay lumps sourced directly from Kutch mines. Bulk supply for clay washing units, ceramics, and cement industries.",
    seoKeywords: "crude china clay lumps, raw kaolin lumps, kutch clay mining, unwashed china clay supplier"
  },

  // ==================== KAOLIN (Shyam Clay References) ====================
  {
    id: "prod_calcined_kaolin_powder",
    name: "Calcined Kaolin Powder",
    slug: "calcined-kaolin-powder",
    categoryId: "cat_kaolin",
    categorySlug: "kaolin",
    subcategoryId: "sub_calcined_kaolin",
    isFeatured: true,
    isActive: true,
    shortDescription: "Ultra-bright (90-93% GE) anhydrous calcined kaolin engineered as a high-performance titanium dioxide extender for premium paints and paper (Shyam Clay reference).",
    description: "Skyline Calcined Kaolin is manufactured through high-temperature thermal dehydroxylation (calcination at 950°C-1050°C) of ultra-fine hydrous kaolin. The calcination process alters the crystal lattice, eliminating chemically bound water and creating a structured micro-aggregate particle morphology. With superior whiteness (92+ GE), high opacity, chemical inertness, and exceptional electrical resistivity, it serves as the premier functional pigment for titanium dioxide (TiO2) extension, reducing paint formulation costs without sacrificing hide or scrub resistance.",
    images: [
      "/uploads/shyam-calcined-kaolin.webp"
    ],
    grades: ["Grade CK-92 (Architectural Paint & TiO2 Extender)", "Grade CK-Cable (High Electrical Insulation Cable Compound)", "Grade CK-Paper (Paper Coating Opacifier)"],
    packaging: [
      "25 kg multi-wall Kraft paper bags with PE barrier",
      "500 kg and 1000 kg export certified big bags",
      "Palletized and stretch-wrapped containerized consignments"
    ],
    specifications: [
      { parameter: "Brightness (ISO / GE)", value: "90.0% - 93.0% Min", testMethod: "ISO 2470 / Reflectometer" },
      { parameter: "Alumina (Al2O3)", value: "43.0% - 46.0%", testMethod: "XRF" },
      { parameter: "Silica (SiO2)", value: "51.0% - 54.0%", testMethod: "XRF" },
      { parameter: "Iron Oxide (Fe2O3)", value: "0.40% Max", testMethod: "XRF" },
      { parameter: "Titanium Dioxide (TiO2)", value: "0.60% Max", testMethod: "XRF" },
      { parameter: "Loss on Ignition (LOI)", value: "< 0.50% (Anhydrous)", testMethod: "Gravimetric @ 1000°C" },
      { parameter: "Average Particle Size (d50)", value: "1.2 - 2.0 µm", testMethod: "Laser Diffraction (Malvern)" },
      { parameter: "Oil Absorption", value: "50 - 65 g / 100g", testMethod: "ASTM D281" },
      { parameter: "Residue on 325 Mesh (45 µm)", value: "0.01% Max", testMethod: "Wet Screen" },
      { parameter: "Volume Resistivity @ 20°C", value: "> 1 x 10¹³ Ohm-cm", testMethod: "Dielectric Cell" }
    ],
    applications: [
      "Architectural emulsion paints, automotive primers, and industrial powder coatings",
      "Titanium Dioxide (TiO2) partial substitution (up to 20-30% extender)",
      "Low and medium voltage PVC/EPR power cable insulation compounds",
      "High-brightness magazine and art paper blade coatings",
      "Engineering plastics, masterbatches, and rubber automotive weather-strips"
    ],
    features: [
      "Structured micro-pore particles scatter light efficiently, maximizing dry film opacity and contrast ratio",
      "Enables significant TiO2 savings while enhancing film hardness and scrub resistance",
      "Excellent dispersion kinetics in both solvent-borne and water-borne coating systems",
      "Superior volume resistivity prevents dielectric breakdown in cable insulation"
    ],
    industries: ["Paints & Coatings", "Wire & Cable Polymers", "Paper & Graphic Arts", "Plastics & Masterbatches"],
    seoTitle: "Calcined Kaolin Powder Manufacturer India | 92+ GE Brightness",
    seoDescription: "High-brightness Calcined Kaolin powder (90-93% GE). Premier TiO2 extender for paints, paper coating, and cable insulation from Gandhidham.",
    seoKeywords: "calcined kaolin, calcined clay manufacturer, tio2 extender kaolin, high brightness kaolin powder, cable grade calcined clay"
  },
  {
    id: "prod_hydrous_kaolin_powder",
    name: "Hydrous Kaolin Powder (Water-Washed)",
    slug: "hydrous-kaolin-powder",
    categoryId: "cat_kaolin",
    categorySlug: "kaolin",
    subcategoryId: "sub_hydrous_kaolin",
    isFeatured: false,
    isActive: true,
    shortDescription: "Ultra-fine plate-like hydrous aluminum silicate with high aspect ratio and natural lubricity for paper filling, adhesives, and printing inks (Shyam Clay reference).",
    description: "Skyline Hydrous Kaolin is manufactured by intense wet-attrition scrubbing, hydro-cyclone classification, magnetic separation, and gentle spray drying. The natural hexagonal platy crystal morphology (aspect ratio 15:1 to 20:1) imparts high barrier properties, ink gloss, smooth printability, and rheological leveling. Ideal for paper mill filler applications, printing inks, and water-based adhesives.",
    images: [
      "/uploads/shyam-china-clay-powder.webp",
      "/uploads/shyam-calcined-kaolin.webp"
    ],
    grades: ["Paper Coating Grade (86% GE)", "Industrial Filler Grade (82% GE)"],
    packaging: ["25 kg paper bags", "1000 kg Big Bags"],
    specifications: [
      { parameter: "Brightness (ISO / GE)", value: "84.0% - 87.0%", testMethod: "Reflectometer" },
      { parameter: "Particle Size (< 2 µm)", value: "75% - 85% by weight", testMethod: "Sedigraph" },
      { parameter: "Alumina (Al2O3)", value: "37.5% - 39.0%", testMethod: "XRF" },
      { parameter: "Silica (SiO2)", value: "45.0% - 47.0%", testMethod: "XRF" },
      { parameter: "Loss on Ignition (LOI)", value: "13.2% - 14.0%", testMethod: "Gravimetric @ 1000°C" },
      { parameter: "Brookfield Viscosity (70% solids)", value: "< 400 cP", testMethod: "Brookfield @ 100 rpm" }
    ],
    applications: [
      "Paper filler and high-gloss paper pigment coatings",
      "Flexographic and gravure printing inks",
      "Corrugated box adhesives and starch dextrin glues",
      "Cosmetic and pharmaceutical talc replacement blends"
    ],
    features: [
      "High aspect ratio platelet structure delivers superior sheet smoothness and ink holdout",
      "Excellent high-solids slurry stability with low high-shear viscosity",
      "Chemically inert, safe, and biocompatible"
    ],
    industries: ["Paper Mills", "Printing Inks & Packaging", "Adhesives & Glues"],
    seoTitle: "Hydrous Kaolin Powder Manufacturer | Water Washed Kaolin",
    seoDescription: "High aspect ratio hydrous kaolin powder for paper, inks, and adhesives. Ultra-fine plate-like structure with high brightness from Skyline Minerals.",
    seoKeywords: "hydrous kaolin, water washed kaolin, paper coating clay, platy kaolin manufacturer"
  },
  {
    id: "prod_reactive_metakaolin",
    name: "Highly Reactive Metakaolin (Pozzolan)",
    slug: "highly-reactive-metakaolin-pozzolan",
    categoryId: "cat_kaolin",
    categorySlug: "kaolin",
    subcategoryId: "sub_reactive_metakaolin",
    isFeatured: false,
    isActive: true,
    shortDescription: "Supplementary cementitious mineral pozzolan engineered for ultra-high-strength concrete, shotcrete, and chemical-resistant mortars (ASTM C618 Class N).",
    description: "Skyline Highly Reactive Metakaolin is an amorphous aluminosilicate pozzolan produced by flash calcining purified kaolin clay under precise thermo-activation. In concrete mixtures, it reacts rapidly with the calcium hydroxide (free lime) released during Portland cement hydration, converting it into dense calcium aluminosilicate hydrate (C-A-S-H) gels. This dramatic microstructural refinement significantly increases 28-day compressive strength, eliminates efflorescence, and shields against chloride and sulfate attack.",
    images: [
      "/uploads/shyam-calcined-kaolin.webp"
    ],
    grades: ["Grade HRM-100 (Ultra-Reactive)", "Grade HRM-Standard"],
    packaging: ["25 kg Kraft paper bags", "1000 kg Jumbo bulk bags"],
    specifications: [
      { parameter: "Pozzolanic Activity Index (28 Days)", value: "> 125%", testMethod: "ASTM C311 / C618" },
      { parameter: "SiO2 + Al2O3 + Fe2O3", value: "> 95.0%", testMethod: "ASTM C618 Class N" },
      { parameter: "Specific Surface Area (BET)", value: "15 - 20 m²/g", testMethod: "BET N2 Adsorption" },
      { parameter: "Loss on Ignition (LOI)", value: "< 1.0%", testMethod: "Gravimetric" },
      { parameter: "Particle Size (d50)", value: "1.5 - 2.5 µm", testMethod: "Laser Particle Sizer" }
    ],
    applications: [
      "Ultra-High Performance Concrete (UHPC) and precast architectural elements",
      "Bridge decks, marine piers, and offshore harbor concrete structures",
      "Underground tunneling shotcrete and mine rock stabilization",
      "Self-leveling flooring screeds, non-shrink grouts, and tile adhesives",
      "Geopolymer cements and zero-carbon building binders"
    ],
    features: [
      "Eliminates unsightly calcium hydroxide surface efflorescence on colored concrete",
      "Dramatically reduces chloride ion permeability, preventing rebar corrosion",
      "Enhances flexural and compressive strength by up to 25-40%",
      "Smoother finish and superior pigment dispersion in architectural mortars"
    ],
    industries: ["Precast Concrete & Ready-Mix", "Marine & Infrastructure", "Drymix Mortars & Grouts"],
    seoTitle: "Metakaolin Pozzolan Manufacturer | High Reactive Pozzolan Concrete",
    seoDescription: "High-reactivity Metakaolin conforming to ASTM C618 Class N. Increases concrete strength and durability against marine chloride attack.",
    seoKeywords: "metakaolin, reactive metakaolin, concrete pozzolan, supplementary cementitious material, metakaolin supplier india"
  },

  // ==================== OTHER RELEVANT MINERALS (Shyam Clay Refractory Clay + Industrial Minerals) ====================
  {
    id: "prod_silica_ramming_mass",
    name: "Silica Ramming Mass & Refractory Fire Clay",
    slug: "silica-ramming-mass",
    categoryId: "cat_other_minerals",
    categorySlug: "other-minerals",
    subcategoryId: "sub_ramming_mass",
    isFeatured: true,
    isActive: true,
    shortDescription: "Premixed acidic refractory mass with controlled boric acid binder and high-temperature fire clay for coreless induction furnaces (Shyam Clay reference).",
    description: "Manufactured from high-purity crystalline quartz lumps and refractory fire clay sourced and processed at our Gandhidham facility. Formulated with an optimized grain distribution (from 5 mm down to super-fine flour) and pre-blended with high-purity Boric Acid (H3BO3) binder under precision automated mixers. Delivers 120-160 heat furnace campaigns, thermal shock resistance, and zero metal penetration in steel melting induction furnaces.",
    images: [
      "/uploads/shyam-refractory-clay.webp"
    ],
    grades: ["Premix with 0.8% Boric Acid", "Premix with 1.0% - 1.2% Boric Acid", "Refractory Fire Clay Lump / Powder"],
    packaging: [
      "50 kg moisture-proof HDPE woven bags with heavy duty inner liner",
      "1000 kg Jumbo bulk bags with palletization"
    ],
    specifications: [
      { parameter: "Silica Content (SiO2)", value: "98.80% - 99.20% Min", testMethod: "Gravimetric / XRF" },
      { parameter: "Alumina (Al2O3)", value: "0.40% Max", testMethod: "AAS" },
      { parameter: "Iron Oxide (Fe2O3)", value: "0.08% Max", testMethod: "AAS" },
      { parameter: "Refractoriness (PCE)", value: "> Orton Cone 32 (1710°C)", testMethod: "Pyrometric Cone Equivalent" },
      { parameter: "Bulk Density (Compacted)", value: "2.10 - 2.25 g/cm³", testMethod: "Standard Test" }
    ],
    applications: [
      "Coreless induction furnace monolithic lining for melting mild steel and stainless steel",
      "Cast iron and ductile iron foundry furnace crucibles",
      "Furnace lining patching and refractory mortar compounding"
    ],
    features: [
      "Premixed with boric acid under precision weighing, eliminating on-site manual mixing errors",
      "Triple-layer sintered structure prevents metal breakthrough",
      "Exceptional lining campaign life exceeding 120-160 heats"
    ],
    industries: ["Steel Rolling Mills", "Iron & Steel Melting Foundries", "Refractory Installation"],
    seoTitle: "Silica Ramming Mass Manufacturer Gandhidham | Induction Furnace Lining",
    seoDescription: "Premixed Silica Ramming Mass and refractory fire clay with boric acid binder for coreless induction furnaces from Gandhidham factory.",
    seoKeywords: "silica ramming mass, refractory fire clay, induction furnace lining, premixed ramming mass, ramming mass manufacturer gandhidham"
  },
  {
    id: "prod_industrial_gypsum_granules",
    name: "Industrial Gypsum Granules & Powder",
    slug: "industrial-gypsum-granules-powder",
    categoryId: "cat_other_minerals",
    categorySlug: "other-minerals",
    subcategoryId: "sub_gypsum",
    isFeatured: false,
    isActive: true,
    shortDescription: "High-purity natural calcium sulfate dihydrate (CaSO4·2H2O) processed for Portland cement retarding, plasterboards, and agricultural soil desalinization.",
    description: "Skyline Industrial Gypsum is processed from pure natural marine and mineral gypsum reserves. With calcium sulfate dihydrate content exceeding 92-95%, it serves as an indispensable retarder in Portland cement clinker grinding, regulating initial setting time and heat of hydration. Also widely utilized in agricultural soil conditioning to displace excess sodium ions in saline-alkaline farmlands.",
    images: [
      "/uploads/shyam-china-clay-lumps.webp"
    ],
    grades: ["Cement Clinker Retarder Grade (0-50 mm lumps / granules)", "Agricultural Conditioning Powder (80 mesh)", "Plasterboard Grade"],
    packaging: ["50 kg bags", "1000 kg Jumbo bags", "Loose bulk dumpers and railway wagons"],
    specifications: [
      { parameter: "Purity (CaSO4·2H2O)", value: "92.0% - 95.0% Min", testMethod: "IS: 1288" },
      { parameter: "Calcium Oxide (CaO)", value: "30.5% - 32.0%", testMethod: "EDTA" },
      { parameter: "Sulfate (SO3)", value: "43.5% - 45.0%", testMethod: "Gravimetric" },
      { parameter: "Combined Moisture", value: "19.5% - 20.8%", testMethod: "Calcination" }
    ],
    applications: [
      "Portland and Pozzolana cement manufacturing (setting time retarder)",
      "Gypsum plasterboard, ceiling tiles, and molding plaster",
      "Agricultural soil amendment for alkaline and sodium-affected soils"
    ],
    features: [
      "Consistent SO3 content ensures predictable cement setting time regulation",
      "High calcium availability rehabilitates heavy saline agricultural soils",
      "Available in both crushed granules and fine pulverized formats"
    ],
    industries: ["Cement Manufacturing", "Plaster & Building Materials", "Agriculture & Farming"],
    seoTitle: "Industrial Gypsum Manufacturer & Supplier | Cement Retarder Gypsum",
    seoDescription: "High-purity natural gypsum granules and powder (CaSO4·2H2O) for cement plants, plasterboards, and agricultural soil conditioning.",
    seoKeywords: "industrial gypsum, cement retarder gypsum, natural gypsum lumps, agricultural gypsum powder supplier"
  },
  {
    id: "prod_potassium_sodium_feldspar",
    name: "Potassium & Sodium Feldspar",
    slug: "potassium-sodium-feldspar",
    categoryId: "cat_other_minerals",
    categorySlug: "other-minerals",
    subcategoryId: "sub_feldspar",
    isFeatured: false,
    isActive: true,
    shortDescription: "High-alkali fluxing mineral lumps and pulverized powder (K2O / Na2O) for ceramic vitrification bodies, porcelain glazes, and glass batching.",
    description: "Skyline Potassium (Potash) and Sodium Feldspar are processed from high-grade pegmatite deposits. Hand-dressed to eliminate quartz and iron veins, then pulverized in contamination-free ball mills with alumina lining, our feldspar delivers dependable alkaline fluxing action. It lowers the melting point of ceramic bodies and glass batches, promotes uniform glassification, and imparts crystal clarity and mechanical toughness.",
    images: [
      "/uploads/shyam-crude-china-clay.webp"
    ],
    grades: ["Potash Feldspar Powder (K2O > 11.5%)", "Soda Feldspar Powder (Na2O > 9.5%)", "Hand-Sorted Lump Grade"],
    packaging: ["50 kg PP bags", "1000 kg Jumbo bulk bags"],
    specifications: [
      { parameter: "Potassium Oxide (K2O, Potash Grade)", value: "11.5% - 13.0%", testMethod: "Flame Photometer" },
      { parameter: "Sodium Oxide (Na2O, Soda Grade)", value: "9.0% - 10.5%", testMethod: "Flame Photometer" },
      { parameter: "Silica (SiO2)", value: "65.0% - 68.0%", testMethod: "XRF" },
      { parameter: "Alumina (Al2O3)", value: "17.0% - 19.0%", testMethod: "XRF" },
      { parameter: "Iron Oxide (Fe2O3)", value: "0.08% - 0.12% Max", testMethod: "AAS" }
    ],
    applications: [
      "Ceramic vitrified floor and wall tiles fluxing agent",
      "Porcelain tableware, sanitaryware, and glaze formulations",
      "Container glass and flat glass batching raw material"
    ],
    features: [
      "Ultra-low iron oxide profile guarantees pure transparent vitrification without black specks",
      "High total alkali content lowers kiln energy firing costs"
    ],
    industries: ["Ceramics & Sanitaryware", "Glass Container Manufacturing", "Enamels & Glazes"],
    seoTitle: "Potassium & Sodium Feldspar Manufacturer | Ceramic Flux Mineral",
    seoDescription: "High-grade Potash and Soda Feldspar in lumps and fine powder (200-300 mesh). Low iron and high alkali for ceramics, glazes, and glass.",
    seoKeywords: "potash feldspar, sodium feldspar manufacturer, ceramic feldspar powder, glass grade feldspar supplier"
  }
];

// Read existing DB to preserve enquiries, users, analytics, settings
let currentDb = {};
if (fs.existsSync(DB_FILE)) {
  try {
    currentDb = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (e) {}
}

const updatedDb = {
  ...currentDb,
  categories,
  products
};

fs.writeFileSync(DB_FILE, JSON.stringify(updatedDb, null, 2), 'utf8');
console.log(`Successfully updated database.json with ${products.length} products and ${categories.length} categories.`);
console.log(`All products now reference authentic downloaded images from SKC Salt, Kutch Bentoclay, and Shyam Clay.`);

