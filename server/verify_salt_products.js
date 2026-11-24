const fs = require('fs');
const path = require('path');

// 10 Industrial Salt Products exactly from SKC Salt
const industrialProducts = [
  {
    id: "prod_ind_sodium_chloride",
    name: "Industrial Sodium Chloride (NaCl 99.5%+)",
    slug: "industrial-sodium-chloride",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_ind_sodium_chloride",
    isFeatured: true,
    isActive: true,
    shortDescription: "High-purity industrial sodium chloride with 99.5%+ NaCl content for Chlor-Alkali manufacturing, chemical synthesis, glass, and textile dyeing (SKC Salt reference).",
    description: "Skyline Industrial Sodium Chloride is manufactured to the highest industrial specifications from high-grade solar sea salt harvested from the Gulf of Kutch coastline. Our multi-stage mechanical hydro-washing, centrifugal drying, and fluidized bed processing eliminate magnesium, calcium, and water-insoluble matter. As a foundational raw material, our sodium chloride ensures maximum current efficiency and membrane longevity in Chlor-Alkali caustic soda/chlorine production, uniform dye fixation in textile wet processing, and minimal brine sludge in chemical manufacturing.",
    images: [
      "/uploads/skc-textile-salt.jpg",
      "/uploads/skc-salt-crystals.jpg",
      "/uploads/skc-jumbo-bag-1mt.png"
    ],
    grades: [
      "Grade A (99.5% NaCl)",
      "Grade B (99.2% NaCl)",
      "Low-Sulfate Chlor-Alkali Grade"
    ],
    packaging: [
      "25 kg HDPE / PP laminated woven bags with LDPE liner",
      "50 kg HDPE bags with moisture-proof liner",
      "1000 kg (1 MT) and 1250 kg Jumbo bulk bags with lifting loops",
      "Bulk container liner loading for export via Kandla & Mundra ports"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, on dry basis)", value: "99.50% Min", testMethod: "IS: 797-1982" },
      { parameter: "Moisture Content", value: "0.15% - 0.25% Max", testMethod: "Gravimetric at 110°C" },
      { parameter: "Water Insoluble Matter", value: "0.03% Max", testMethod: "Gravimetric" },
      { parameter: "Calcium (as Ca)", value: "0.08% Max", testMethod: "EDTA Titration" },
      { parameter: "Magnesium (as Mg)", value: "0.04% Max", testMethod: "Atomic Absorption" },
      { parameter: "Sulfate (as SO4)", value: "0.15% Max", testMethod: "Barium Gravimetric" },
      { parameter: "pH of 10% Aqueous Solution", value: "6.5 - 8.0", testMethod: "pH Meter" },
      { parameter: "Particle Sieve Analysis", value: "18, 22 and 26 mesh (85% passing)", testMethod: "Sieve Shaker" }
    ],
    applications: [
      "Chlor-Alkali manufacturing (Membrane cell caustic soda & chlorine)",
      "Textile dyeing and reactive dye exhaustion (fixing agent)",
      "Detergent, soap powder, and sodium silicate manufacturing",
      "Oil drilling brine and wellbore completion fluids",
      "Chemical, glass, and sodium bicarbonate synthesis"
    ],
    features: [
      "Exceptional 99.5%+ chemical purity minimizing brine cell sludge",
      "Ultra-low divalent calcium and magnesium ions protecting Nafion membranes",
      "Evenly distributed crystals preventing caking in bulk silos",
      "ISO 9001:2015, SGS inspected, and Halal certified manufacturing"
    ],
    industries: ["Chlor-Alkali & Chemicals", "Textiles & Dyeing", "Soaps & Detergents", "Oil & Gas", "Glass & Metallurgy"],
    seoTitle: "Sodium Chloride Manufacturer in Gujarat | Skyline Salt Gandhidham",
    seoDescription: "Leading Sodium Chloride manufacturer in Gujarat, India. High-purity 99.5%+ NaCl for chlor-alkali, textiles, glass, and chemicals. 50kg and 1MT jumbo bags.",
    seoKeywords: "sodium chloride manufacturer gujarat, industrial salt, chlor alkali salt, nacl supplier gandhidham, skc salt reference"
  },
  {
    id: "prod_ind_fine_salt",
    name: "Industrial Fine Salt",
    slug: "fine-salt",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_ind_fine_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "Precision micro-granulated industrial fine salt with 99.8% NaCl purity for pharmaceutical processing, textile finishing, and chemical blending (SKC Salt reference).",
    description: "Skyline Industrial Fine Salt is engineered for precision processes where instantaneous solubility and homogeneous crystal dispersal are paramount. Sourced from the refined crystallizers of our Gandhidham facility, this fine salt undergoes mechanical milling, air classification, and optical grading to guarantee a tight granulometry. It delivers consistent salinity without coarse un-dissolved specks, making it indispensable for pharmaceutical compounding, synthetic resin processing, and fine chemical reactions.",
    images: [
      "/uploads/skc-fine-salt.jpg",
      "/uploads/skc-textile-salt.jpg",
      "/uploads/skc-loose-packing.png"
    ],
    grades: [
      "Ultra-Fine Grade (100% pass 40 mesh)",
      "Standard Fine Industrial Grade (99.8% NaCl)",
      "Pharma Precursor Non-Additive Grade"
    ],
    packaging: [
      "25 kg multi-wall paper bags with PE moisture barrier",
      "50 kg HDPE bags with inner poly liner",
      "1000 kg Jumbo bulk bags with palletization and shrink-wrap"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, dry basis)", value: "99.80% Min", testMethod: "IS: 797" },
      { parameter: "Appearance", value: "Fine Free-Flowing White Powder/Crystals", testMethod: "Visual" },
      { parameter: "Moisture Content", value: "0.10% Max", testMethod: "Oven Drying" },
      { parameter: "Water Insoluble Matter", value: "0.02% Max", testMethod: "Gravimetric" },
      { parameter: "Calcium (as Ca)", value: "0.03% Max", testMethod: "AAS" },
      { parameter: "Magnesium (as Mg)", value: "0.01% Max", testMethod: "AAS" },
      { parameter: "Sulfate (as SO4)", value: "0.05% Max", testMethod: "Turbidimetric" },
      { parameter: "Particle Size", value: "100% pass through 30 mesh (0.6 mm)", testMethod: "Sieve Analysis" }
    ],
    applications: [
      "Pharmaceutical formulations and saline dialysate precursors",
      "Textile wet processing, sizing, and reactive dye leveling",
      "Fine chemical compounding and dry powder blending",
      "Leather tanning, bating, and pelt pickling",
      "Adhesives, sealants, and polymer emulsion coagulants"
    ],
    features: [
      "Rapid, instantaneous dissolution profile in cold or warm process water",
      "Near-zero insolubles preventing nozzle and filter clogging",
      "Strictly non-caking with tight particle classification",
      "Export grade packaging tested for oceanic freight"
    ],
    industries: ["Pharmaceutical Precursors", "Textiles", "Chemical Blending", "Leather Tanning", "Polymers"],
    seoTitle: "Fine Salt Manufacturer in Gujarat | Skyline Salt Gandhidham",
    seoDescription: "Premier manufacturer of industrial Fine Salt in Gujarat. 99.8% purity fine crystals for pharma, textiles, and chemicals. High dissolution rate.",
    seoKeywords: "fine salt manufacturer gujarat, industrial fine salt, fine crystal salt, textile fine salt, gandhidham salt"
  },
  {
    id: "prod_ind_pdv_salt",
    name: "PDV Salt (Pure Dried Vacuum)",
    slug: "pdv-salt",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_ind_pdv_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "Ultra-pure vacuum crystallized salt (99.85%+ NaCl) with uniform cubic crystals and zero insoluble matter for membrane electrolysis and high-precision industries (SKC Salt reference).",
    description: "Skyline Pure Dried Vacuum (PDV) Salt represents the highest tier of salt engineering. Produced by vacuum evaporation of purified saturated brine inside multi-effect titanium evaporators, our PDV salt achieves exceptional chemical purity of 99.85%+ NaCl. Each crystal is uniformly cubic, creating superior dissolution kinetics and zero insolubles. It is the premier choice for chlor-alkali membrane electrolysis plants, high-purity electroplating, dye synthesis, and sensitive industrial applications across the globe.",
    images: [
      "/uploads/skc-pure-vacuum-salt.jpg",
      "/uploads/skc-salt-processing.jpg",
      "/uploads/skc-jumbo-bag-1mt.png"
    ],
    grades: [
      "Electrochemical Chlor-Alkali Grade (99.90% NaCl)",
      "Standard Industrial PDV Grade (99.85% NaCl)",
      "High Purity Chemical Reagent Grade"
    ],
    packaging: [
      "25 kg poly-lined laminated woven bags",
      "50 kg moisture-proof HDPE sacks",
      "1000 kg and 1250 kg export certified FIBC big bags"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, on dry basis)", value: "99.85% - 99.92% Min", testMethod: "IS: 797-1982" },
      { parameter: "Moisture Content", value: "0.05% - 0.08% Max", testMethod: "Gravimetric at 110°C" },
      { parameter: "Water Insoluble Matter", value: "0.01% Max (100 ppm)", testMethod: "Gravimetric" },
      { parameter: "Calcium (as Ca)", value: "0.02% Max (200 ppm)", testMethod: "EDTA Titration" },
      { parameter: "Magnesium (as Mg)", value: "0.01% Max (100 ppm)", testMethod: "AAS" },
      { parameter: "Sulfate (as SO4)", value: "0.08% Max (800 ppm)", testMethod: "Turbidimetric" },
      { parameter: "Iron (as Fe)", value: "1.0 ppm Max", testMethod: "Colorimetric" },
      { parameter: "Particle Sieve Distribution", value: "0.20 mm - 0.85 mm uniform cubic crystals", testMethod: "Laser Diffraction" }
    ],
    applications: [
      "Membrane-cell chlor-alkali chlorine & caustic soda electrolysis",
      "Precision electroplating and metal surface finishing baths",
      "Synthetic dye synthesis and specialty chemical manufacturing",
      "Textile reactive dyeing where calcium precipitation ruins shade consistency",
      "Brine regeneration for ultra-pure demineralization resins"
    ],
    features: [
      "Vacuum-crystallized cubic geometry guaranteeing uniform dissolution rate",
      "Near-zero calcium, magnesium, and sulfate preserving expensive electrolysis membranes",
      "Exceptionally low iron and heavy metal impurities below 1 ppm",
      "Manufactured under ISO 9001:2015 and ISO 14001:2015 certified environment"
    ],
    industries: ["Chlor-Alkali Electrolysis", "Electroplating", "Specialty Chemicals", "Textile Dyeing", "Water Demineralization"],
    seoTitle: "PDV Salt Manufacturer in Gujarat | Pure Dried Vacuum Salt Skyline",
    seoDescription: "Leading PDV Salt (Pure Dried Vacuum) manufacturer in Gujarat. 99.85%+ NaCl cubic crystals for Chlor-Alkali membrane cells, electroplating, and chemical synthesis.",
    seoKeywords: "pdv salt manufacturer gujarat, pure dried vacuum salt, vacuum salt gandhidham, membrane cell salt, skc salt"
  },
  {
    id: "prod_ind_salt_tablets",
    name: "Salt Tablets (Water Softener Tablets)",
    slug: "salt-tablets",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_ind_salt_tablets",
    isFeatured: true,
    isActive: true,
    shortDescription: "High-density cylindrical compacted salt tablets pressed from 99.8% pure vacuum salt for non-bridging, residue-free ion-exchange water softener regeneration (SKC Salt reference).",
    description: "Skyline Salt Tablets are manufactured specifically for water softening and ion-exchange resin bed regeneration. Compacted under high mechanical pressure of over 100 metric tons from ultra-pure 99.8% vacuum salt, these cylindrical tablets possess extraordinary structural integrity. They dissolve slowly and evenly in brine tanks without mushing, caking, bridging, or leaving insolubles at the tank bottom, ensuring trouble-free automated water softening in commercial and industrial boiler plants.",
    images: [
      "/uploads/skc-tablet-salt.png",
      "/uploads/skc-loose-packing.png",
      "/uploads/skc-salt-processing.jpg"
    ],
    grades: [
      "Commercial Softener Grade (25mm x 12mm)",
      "Industrial Heavy Duty Compacted Grade (25mm x 15mm)",
      "Pillow Compacted Briquette Grade"
    ],
    packaging: [
      "25 kg heavy-duty virgin LDPE bags with easy-pour handle",
      "50 kg HDPE bags with inner moisture barrier",
      "1000 kg pallets with UV-resistant stretch wrapping for outdoor storage"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, dry basis)", value: "99.80% Min", testMethod: "IS: 797" },
      { parameter: "Tablet Dimensions", value: "Diameter: 25 mm, Thickness: 10 - 15 mm", testMethod: "Vernier Caliper" },
      { parameter: "Hardness / Crushing Resistance", value: "> 85 kg/cm²", testMethod: "Compression Tester" },
      { parameter: "Moisture Content", value: "0.05% Max", testMethod: "Gravimetric" },
      { parameter: "Water Insoluble Matter", value: "< 0.02% (200 ppm Max)", testMethod: "Gravimetric" },
      { parameter: "Calcium & Magnesium", value: "< 0.03% Combined", testMethod: "EDTA Titration" },
      { parameter: "Residue in Brine Tank", value: "Nil (Dissolves cleanly without sludge)", testMethod: "Standard Dissolution Test" }
    ],
    applications: [
      "Industrial boiler feedwater softening and RO pre-treatment",
      "Cooling towers, chiller circuits, and heat exchangers",
      "Commercial laundries, hotels, and hospital central sterilizers",
      "Textile processing water softening plants",
      "Domestic and residential water softening systems"
    ],
    features: [
      "High mechanical compression prevents mushing, bridging, and channel channeling in brine tanks",
      "Slow, uniform dissolution rate ensures 100% saturated brine for optimal resin regeneration",
      "Ultra-low hardness content prevents premature resin fouling",
      "Leaves zero residue or sediment in brine tanks, reducing maintenance shutdowns"
    ],
    industries: ["Water Treatment & RO Plants", "Boiler & Power Plants", "Hospitality & Laundries", "Textile Processing", "Hospitals"],
    seoTitle: "Salt Tablets Manufacturer in Gujarat | Water Softener Salt Tablets Skyline",
    seoDescription: "Leading Salt Tablets manufacturer in Gujarat. 99.8% pure compacted water softener salt tablets. Non-bridging, residue-free regeneration for industrial boilers & RO.",
    seoKeywords: "salt tablets manufacturer gujarat, water softener salt tablets, compacted salt tablets, boiler salt tablets gandhidham, skc salt"
  },
  {
    id: "prod_ind_coarse_salt",
    name: "Industrial Coarse Salt",
    slug: "coarse-salt",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_ind_coarse_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "Natural large crystalline solar sea salt (98.8% - 99.2% NaCl) with slow-dissolving grain size for leather curing, oilfield completion brines, and road de-icing (SKC Salt reference).",
    description: "Skyline Industrial Coarse Salt is harvested from our extensive coastal solar evaporation crystallizers in Kutch. Featuring naturally grown, durable macro-crystals ranging from 2.0 mm to 6.0 mm in size, this coarse salt provides controlled, slow dissolution kinetics. It is thoroughly washed to strip surface silt while preserving the crystal lattice, making it the preferred choice for raw hide curing in tanneries, heavy oilfield weighting brines, and highway snow thawing.",
    images: [
      "/uploads/skc-coarse-salt-scoop.jpg",
      "/uploads/skc-salt-farm.jpg",
      "/uploads/skc-drilling-salt.jpg"
    ],
    grades: [
      "Coarse Grade 1 (2.0 mm - 4.0 mm)",
      "Coarse Grade 2 (4.0 mm - 6.5 mm)",
      "Unhydrated Tannery Preservation Grade"
    ],
    packaging: [
      "50 kg woven polypropylene sacks with inner liner",
      "1000 kg and 1250 kg Jumbo bulk bags with bottom discharge spout",
      "Loose bulk tipping / break-bulk vessel shipments from Kandla & Mundra"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, on dry basis)", value: "98.80% - 99.20% Min", testMethod: "IS: 797" },
      { parameter: "Crystal Grain Size", value: "2.0 mm - 6.0 mm (90% retention)", testMethod: "Sieve Shaker" },
      { parameter: "Moisture Content", value: "0.50% - 1.20% Max", testMethod: "Gravimetric" },
      { parameter: "Water Insoluble Matter", value: "0.08% Max", testMethod: "Gravimetric" },
      { parameter: "Calcium (as Ca)", value: "0.15% Max", testMethod: "EDTA Titration" },
      { parameter: "Magnesium (as Mg)", value: "0.10% Max", testMethod: "AAS" },
      { parameter: "Sulfate (as SO4)", value: "0.30% Max", testMethod: "Gravimetric" }
    ],
    applications: [
      "Hide preservation, green salting, and raw pelt curing in tanneries",
      "High-density workover brines and oilfield completion fluids",
      "Highway de-icing and snow melting for international cold climates",
      "Dye exhaustion in heavy fabric and canvas manufacturing",
      "Industrial refrigeration brine and chilling circuits"
    ],
    features: [
      "Robust macro-crystalline structure with prolonged dissolution profile",
      "Optimal grain hardness resisting breakage during transit and mechanical handling",
      "Cost-effective bulk supply directly from coastal salt pan operations",
      "Tested and verified under international export standards"
    ],
    industries: ["Leather & Tanneries", "Oil & Gas Drilling", "Winter Highway Maintenance", "Textile Dyeing", "Refrigeration"],
    seoTitle: "Coarse Salt Manufacturer in Gujarat | Industrial Coarse Salt Skyline",
    seoDescription: "Leading Coarse Salt manufacturer in Gujarat. 2.0-6.0mm crystalline solar salt for leather tanning, oil well drilling, and de-icing. Bulk 50kg and 1MT jumbo bags.",
    seoKeywords: "coarse salt manufacturer gujarat, industrial coarse salt, tannery salt, oilfield coarse salt, de icing coarse salt gandhidham"
  },
  {
    id: "prod_ind_mesh_salt",
    name: "Mesh Salt (Graded Mesh Industrial Salt)",
    slug: "mesh-salt",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_ind_mesh_salt",
    isFeatured: false,
    isActive: true,
    shortDescription: "Calibrated multi-sieved sodium chloride classified into tight mesh specifications (20-40, 40-60, 60-80 mesh) for custom chemical and detergent blending (SKC Salt reference).",
    description: "Skyline Mesh Salt is produced using multi-deck vibratory screening and air separation systems to segregate high-purity industrial sodium chloride into precise particle size bands. By ensuring that more than 95% of grains fall within strict mesh boundaries, our mesh salt prevents density stratification, crystal segregation, and uneven dissolution in blended dry goods such as synthetic detergent powders, metal fluxing blends, and agricultural premixes.",
    images: [
      "/uploads/skc-fine-salt.jpg",
      "/uploads/skc-salt-crystals.jpg",
      "/uploads/skc-loose-packing.png"
    ],
    grades: [
      "Coarse Mesh (20 - 40 Mesh / 425 - 850 microns)",
      "Medium Mesh (40 - 60 Mesh / 250 - 425 microns)",
      "Fine Mesh (60 - 80 Mesh / 180 - 250 microns)"
    ],
    packaging: [
      "25 kg and 50 kg moisture-proof HDPE woven bags",
      "1000 kg Jumbo bulk bags with discharge chute and palletizing"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, dry basis)", value: "99.40% Min", testMethod: "IS: 797" },
      { parameter: "Mesh Retention", value: "> 95% within designated mesh band", testMethod: "Rotap Sieve Shaker" },
      { parameter: "Moisture Content", value: "0.15% Max", testMethod: "Gravimetric at 110°C" },
      { parameter: "Water Insoluble Matter", value: "0.03% Max", testMethod: "Gravimetric" },
      { parameter: "Calcium (as Ca)", value: "0.06% Max", testMethod: "EDTA" },
      { parameter: "Magnesium (as Mg)", value: "0.03% Max", testMethod: "AAS" },
      { parameter: "Free Flow Rating", value: "Excellent (anti-segregating)", testMethod: "Angle of Repose" }
    ],
    applications: [
      "Synthetic detergent powders, dishwashing tablets, and scouring powders",
      "Oilfield fracturing brines and specialty drilling fluids",
      "Metallurgical flux formulations and molten metal degassing",
      "Chemical compounding and dry additive blending",
      "Glass batch fluxing and ceramic body glaze formulations"
    ],
    features: [
      "Tight, uniform granulometry prevents mixture segregation during transport",
      "Consistent bulk density across every batch (1.15 - 1.25 g/cm³)",
      "Low moisture content guarantees free flow during pneumatic conveying",
      "Custom sieve sizes available upon contract specification"
    ],
    industries: ["Detergents & Soaps", "Chemical Compounding", "Oilfield Chemicals", "Metallurgy", "Ceramics & Glass"],
    seoTitle: "Mesh Salt Manufacturer in Gujarat | Graded Mesh Salt Skyline",
    seoDescription: "Leading Mesh Salt manufacturer in Gujarat. Calibrated 20-40, 40-60, and 60-80 mesh industrial sodium chloride for detergents, chemical blends, and oilfields.",
    seoKeywords: "mesh salt manufacturer gujarat, graded mesh salt, 30 mesh salt, detergent grade salt, skc salt"
  },
  {
    id: "prod_ind_non_iodized_salt",
    name: "Non Iodized Salt (Industrial Pure Sodium Chloride)",
    slug: "non-iodized-salt",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_ind_non_iodized_salt",
    isFeatured: false,
    isActive: true,
    shortDescription: "Pure unfortified sodium chloride completely free from potassium iodate and chemical additives for reaction-sensitive industrial synthesis (SKC Salt reference).",
    description: "Skyline Non-Iodized Salt is engineered specifically for chemical and manufacturing processes where the presence of iodine, potassium iodate, or anti-caking compounds would catalyze unwanted side reactions, poison sensitive catalysts, or alter product pigmentation. Harvested from dedicated crystallizers and processed with mechanical drying alone, it provides pure unadulterated sodium chloride with zero iodine content.",
    images: [
      "/uploads/skc-textile-salt.jpg",
      "/uploads/skc-loose-packing.png",
      "/uploads/skc-salt-farm.jpg"
    ],
    grades: [
      "High-Purity Chemical Non-Iodized (99.5% NaCl)",
      "Standard Industrial Non-Iodized (99.2% NaCl)",
      "Additive-Free Animal Nutrition Grade"
    ],
    packaging: [
      "25 kg and 50 kg HDPE bags with sealed poly-liner",
      "1000 kg Jumbo bulk bags with moisture-proof construction"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, dry basis)", value: "99.50% Min", testMethod: "IS: 797" },
      { parameter: "Iodine Content (as I)", value: "0.00 ppm (Completely Absent)", testMethod: "Iodometric Titration" },
      { parameter: "Chemical Additives / Anti-caking", value: "Nil (100% Additive Free)", testMethod: "Lab Analysis" },
      { parameter: "Moisture Content", value: "0.15% Max", testMethod: "Gravimetric" },
      { parameter: "Water Insoluble Matter", value: "0.03% Max", testMethod: "Gravimetric" },
      { parameter: "Sulfate (as SO4)", value: "0.15% Max", testMethod: "Barium Gravimetric" }
    ],
    applications: [
      "Chemical reactors, chlorination plants, and catalyst-sensitive processes",
      "Saponification in soap manufacturing and surfactant production",
      "Leather tanning, pickling, and preservation",
      "Animal feed mineral premixes and cattle lick block manufacturing",
      "Industrial effluent treatment and brine precipitation plants"
    ],
    features: [
      "Guaranteed 0.00 ppm iodine content preventing catalyst deactivation",
      "100% free of anti-caking agents like yellow prussiate of soda (YPS)",
      "High chemical purity minimizing by-product generation",
      "Available year-round with steady bulk rail and container shipments"
    ],
    industries: ["Chemical Processing", "Soap & Surfactants", "Animal Nutrition", "Leather & Tanneries", "Water Treatment"],
    seoTitle: "Non Iodized Salt Manufacturer in Gujarat | Skyline Salt Gandhidham",
    seoDescription: "High-purity Non Iodized Salt manufacturer in Gujarat. Zero iodine, zero chemical additives for chemical reactions, soap making, and animal feed. 50kg & 1MT bags.",
    seoKeywords: "non iodized salt manufacturer gujarat, additive free salt, pure industrial nacl, un-iodized salt supplier gandhidham"
  },
  {
    id: "prod_ind_low_hardness_salt",
    name: "Low Hardness Salt (Ultra-Low Ca/Mg Industrial Salt)",
    slug: "low-hardness-salt",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_ind_low_hardness_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "Ultra-low hardness sodium chloride with total divalent Calcium and Magnesium under 30 ppm to protect Chlor-Alkali ion membranes and precision plating baths (SKC Salt reference).",
    description: "Skyline Low Hardness Salt is processed with hydro-cyclone chemical extraction to drastically reduce divalent alkaline earth ions (Ca²⁺ and Mg²⁺). In state-of-the-art Chlor-Alkali membrane cells, divalent hardness precipitates inside the polymer membrane structure, causing irreversible voltage rise and membrane failure. Skyline Low Hardness Salt delivers saturated brine with total hardness below 30 ppm, drastically extending membrane lifespan, reducing primary brine purification chemical consumption, and maximizing current efficiency.",
    images: [
      "/uploads/skc-salt-processing.jpg",
      "/uploads/skc-jumbo-bag-1mt.png",
      "/uploads/skc-textile-salt.jpg"
    ],
    grades: [
      "Ultra-Low Hardness Membrane Grade (Total Ca+Mg < 30 ppm)",
      "Low Hardness Chemical Grade (Total Ca+Mg < 60 ppm)",
      "Electroplating Bath Grade"
    ],
    packaging: [
      "50 kg virgin HDPE bags with ultrasonic heat-sealed poly liners",
      "1000 kg and 1200 kg heavy-duty export Jumbo bags with inner liner"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, on dry basis)", value: "99.60% Min", testMethod: "IS: 797-1982" },
      { parameter: "Total Hardness (as CaCO3 equivalent)", value: "< 30 ppm Max", testMethod: "Complexometric Titration" },
      { parameter: "Calcium (as Ca)", value: "< 15 ppm Max", testMethod: "Atomic Absorption" },
      { parameter: "Magnesium (as Mg)", value: "< 5 ppm Max", testMethod: "Atomic Absorption" },
      { parameter: "Sulfate (as SO4)", value: "< 0.08% (800 ppm Max)", testMethod: "Turbidimetric" },
      { parameter: "Water Insoluble Matter", value: "< 0.02% (200 ppm Max)", testMethod: "Gravimetric" },
      { parameter: "Heavy Metals (Pb, As, Cd, Hg)", value: "Undetected (< 0.1 ppm)", testMethod: "ICP-MS" }
    ],
    applications: [
      "Modern Chlor-Alkali membrane electrolysis plants (Nafion membrane protection)",
      "High-precision electroplating and electro-galvanizing electrolytes",
      "High-grade reactive dyeing where trace calcium causes uneven strike rate",
      "Electronic component manufacturing and specialized etching solutions",
      "Demineralized boiler makeup and ultra-pure water systems"
    ],
    features: [
      "Total divalent hardness under 30 ppm prevents membrane fouling and cell downtime",
      "Substantially reduces barium, caustic, and soda ash dosage in primary brine treatment",
      "Ultra-clean cubic crystal structure guarantees fast dissolution into saturated brine",
      "Full batch COA provided with ICP-MS and AAS elemental quantification"
    ],
    industries: ["Chlor-Alkali Membrane Plants", "Electroplating & Electronics", "High-End Textile Dyeing", "Power Plant Boilers"],
    seoTitle: "Low Hardness Salt Manufacturer in Gujarat | Skyline Salt Gandhidham",
    seoDescription: "Leading Low Hardness Salt manufacturer in Gujarat. Total Ca+Mg under 30 ppm for membrane cell chlor-alkali, electroplating, and textile dyeing. Gandhidham facility.",
    seoKeywords: "low hardness salt manufacturer gujarat, membrane cell salt, ultra low calcium magnesium salt, chlor alkali brine salt"
  },
  {
    id: "prod_ind_washery_salt",
    name: "Washery Salt (Mechanically Washed Coastal Salt)",
    slug: "washery-salt",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_ind_washery_salt",
    isFeatured: false,
    isActive: true,
    shortDescription: "Economical mechanically washed coastal solar salt (98.5% - 99.0% NaCl) processed through hydro-cyclones for bulk chemical, soda ash, and dye plant supply (SKC Salt reference).",
    description: "Skyline Washery Salt provides the optimal balance of high chemical purity and bulk economical pricing. Harvested raw coastal salt is introduced into mechanical wash plants featuring counter-current brine wash columns, hydro-cyclone separators, and high-speed dewatering centrifuges. This process strips surface bitterns, insoluble clay silt, and soluble sulfates, yielding a clean crystalline salt suitable for large-scale industrial consumers including soda ash plants, dye houses, and bulk chemical synthesizers.",
    images: [
      "/uploads/skc-drilling-salt.jpg",
      "/uploads/skc-salt-farm.jpg",
      "/uploads/skc-jumbo-bag-1mt.png"
    ],
    grades: [
      "Double Washed Grade (98.8% - 99.0% NaCl)",
      "Single Washed Standard Grade (98.5% NaCl)",
      "Soda Ash / Chemical Bulk Grade"
    ],
    packaging: [
      "50 kg HDPE woven sacks",
      "1000 kg and 1250 kg Jumbo bulk bags",
      "Bulk container liner bags and open-top tipper trucks direct from factory"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, dry basis)", value: "98.50% - 99.00% Min", testMethod: "IS: 797" },
      { parameter: "Moisture Content", value: "1.50% - 2.50% Max", testMethod: "Gravimetric at 110°C" },
      { parameter: "Water Insoluble Matter", value: "0.10% Max", testMethod: "Gravimetric" },
      { parameter: "Calcium (as Ca)", value: "0.18% Max", testMethod: "EDTA Titration" },
      { parameter: "Magnesium (as Mg)", value: "0.12% Max", testMethod: "AAS" },
      { parameter: "Sulfate (as SO4)", value: "0.35% Max", testMethod: "Gravimetric" }
    ],
    applications: [
      "Solvay process soda ash manufacturing (sodium carbonate production)",
      "Bulk textile dye house brine preparation",
      "Industrial effluent treatment plants (ETP) and reverse osmosis reject management",
      "Bulk chemical synthesis and chlorine production in diaphragm cells",
      "Highway de-icing and industrial snow clearance"
    ],
    features: [
      "Multi-stage hydro-washing removes clay, mud silt, and magnesium bitterns",
      "Highly cost-effective pricing for high-volume commercial contracts",
      "Convenient bulk loading facility close to Kandla and Mundra deep-water ports",
      "Supplied in loose bulk or bagged configurations to match client unloading setups"
    ],
    industries: ["Soda Ash Manufacturing", "Bulk Chemical Plants", "Textile Dye Houses", "Effluent Treatment (ETP)", "Highway Snow Thawing"],
    seoTitle: "Washery Salt Manufacturer in Gujarat | Mechanically Washed Salt Skyline",
    seoDescription: "Leading Washery Salt manufacturer in Gujarat. Mechanically washed coastal solar salt (98.5%+ NaCl) for soda ash, bulk chemicals, and dye plants. Gandhidham plant.",
    seoKeywords: "washery salt manufacturer gujarat, washed solar salt, bulk industrial salt, soda ash salt supplier gandhidham"
  },
  {
    id: "prod_ind_water_softener_salt",
    name: "Water Softener Salt (Granular & Crystal Grade)",
    slug: "water-softener-salt",
    categoryId: "cat_industrial_salt",
    categorySlug: "industrial-salt",
    subcategoryId: "sub_ind_water_softener_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "High-purity coarse crystalline and granular salt (99.5% NaCl) designed for clean, rapid brine generation in commercial and industrial water softening plants (SKC Salt reference).",
    description: "Skyline Water Softener Salt is specially processed for water treatment facilities, industrial boiler feedwater loops, and commercial ion-exchange softeners. Sourced from high-purity washed crystals and dried to prevent agglomeration, it dissolves uniformly into 100% saturated brine without channeling or forming hard salt bridges. With ultra-low insoluble residue and minimal calcium/magnesium contamination, it protects ion-exchange resins and ensures maximum softened water throughput per regeneration cycle.",
    images: [
      "/uploads/skc-tablet-salt.png",
      "/uploads/skc-pure-vacuum-salt.jpg",
      "/uploads/skc-coarse-salt-scoop.jpg"
    ],
    grades: [
      "Solar Softener Crystals Grade (99.5% NaCl)",
      "Granular Softener Grade (1 - 3 mm)",
      "Resin Guard Low-Insoluble Grade"
    ],
    packaging: [
      "25 kg heavy-duty LDPE bags with moisture barrier",
      "50 kg HDPE bags with PE liner",
      "1000 kg Jumbo bulk bags on wooden pallets"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, on dry basis)", value: "99.50% Min", testMethod: "IS: 797" },
      { parameter: "Appearance", value: "White Crystals / Granules", testMethod: "Visual" },
      { parameter: "Moisture Content", value: "0.10% Max", testMethod: "Gravimetric" },
      { parameter: "Water Insoluble Matter", value: "< 0.02% (200 ppm Max)", testMethod: "Gravimetric" },
      { parameter: "Calcium (as Ca)", value: "< 0.05% Max", testMethod: "EDTA Titration" },
      { parameter: "Magnesium (as Mg)", value: "< 0.02% Max", testMethod: "AAS" },
      { parameter: "Resin Bridging Potential", value: "Zero (Free dissolution)", testMethod: "Lab Simulation" }
    ],
    applications: [
      "Industrial boiler feedwater conditioning and RO pre-treatment",
      "Commercial laundries, hotels, and institutional HVAC cooling systems",
      "Municipal drinking water softening and de-alkalization plants",
      "Hospital central sterile supply departments (CSSD) and autoclaves",
      "Food and beverage processing equipment sanitization and wash-down"
    ],
    features: [
      "Clean, residue-free dissolution prevents brine valve clogging and tank sediment",
      "Ultra-pure sodium chloride rejuvenates sodium ion exchange capacity quickly",
      "Free of binders, caking additives, or synthetic glues",
      "Complies with European and American water treatment standards"
    ],
    industries: ["Water Treatment & RO Plants", "Boiler Feedwater", "Hospitality & Laundries", "Food & Beverage", "HVAC Cooling Towers"],
    seoTitle: "Water Softener Salt Manufacturer in Gujarat | Skyline Salt Gandhidham",
    seoDescription: "Premier Water Softener Salt manufacturer in Gujarat. 99.5% high-purity crystals & granules for boiler plants, commercial laundries, and RO pre-treatment.",
    seoKeywords: "water softener salt manufacturer gujarat, softening salt crystals, boiler water softener salt, gandhidham salt"
  }
];

// 12 Edible Salt Products exactly from SKC Salt
const edibleProducts = [
  {
    id: "prod_edible_raw_salt",
    name: "Raw Edible Salt (Solar Evaporated Sea Salt)",
    slug: "raw-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_edible_raw_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "100% natural sun-crystallized sea salt harvested from the tidal pans of the Gulf of Kutch, rich in trace ocean electrolytes for pickling and bulk curing (SKC Salt reference).",
    description: "Skyline Raw Edible Salt is harvested through traditional solar evaporation of pristine Arabian Sea waters along the Gulf of Kutch coast. Unadulterated by chemical refining, this natural sea salt retains beneficial trace ocean minerals including magnesium, potassium, and calcium. With clean crystalline texture and authentic maritime salinity, it is prized by commercial pickling factories, traditional fish curers, and artisanal food fermenters across India and export markets.",
    images: [
      "/uploads/skc-raw-salt.png",
      "/uploads/skc-salt-farm.jpg",
      "/uploads/skc-coarse-salt-scoop.jpg"
    ],
    grades: [
      "Natural Coarse Raw Sea Salt",
      "Export Cleaned Raw Food Grade",
      "Pickling & Fermentation Grade"
    ],
    packaging: [
      "25 kg and 50 kg PP bags with inner poly lining",
      "1000 kg Jumbo bulk bags with moisture barrier",
      "Break-bulk container shipments for international food processors"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, on dry basis)", value: "97.00% - 98.50% Min", testMethod: "FSSAI / IS: 797" },
      { parameter: "Natural Mineral Content (Mg, K, Ca)", value: "1.0% - 1.5%", testMethod: "AAS" },
      { parameter: "Moisture Content", value: "3.0% - 4.5% Max", testMethod: "Gravimetric at 110°C" },
      { parameter: "Water Insoluble Matter", value: "0.15% Max", testMethod: "Gravimetric" },
      { parameter: "Color & Appearance", value: "Natural Off-White to White Crystals", testMethod: "Visual" },
      { parameter: "Heavy Metals (Lead, Arsenic, Cadmium)", value: "Within strict FSSAI permissible limits", testMethod: "ICP-MS" }
    ],
    applications: [
      "Traditional mango, lime, and mixed vegetable pickling",
      "Seafood curing, marine fish drying, and meat brining",
      "Artisanal food fermentation (kimchi, sauerkraut, miso)",
      "Bulk agricultural salting and livestock nutrition supplements",
      "Commercial brining solutions for cheese and olive preservation"
    ],
    features: [
      "100% natural, unrefined, sun-harvested sea salt from unpolluted Kutch coastline",
      "Preserves authentic coastal trace ocean minerals providing full-bodied culinary flavor",
      "Chemical-free, zero bleach, zero synthetic preservatives",
      "Certified under FSSAI, ISO 22000, and Halal standards"
    ],
    industries: ["Food Fermentation & Pickles", "Fisheries & Seafood", "Dairy & Cheese", "Artisanal Foods", "Animal Nutrition"],
    seoTitle: "Raw Salt Manufacturer in Gujarat | Natural Raw Edible Salt Skyline",
    seoDescription: "Leading Raw Salt manufacturer in Gujarat. 100% natural solar evaporated sea salt from Kutch for commercial pickling, seafood curing, and food fermentation.",
    seoKeywords: "raw salt manufacturer gujarat, natural sea salt, edible raw salt, pickling salt gandhidham, skc salt"
  },
  {
    id: "prod_edible_refined_salt",
    name: "Refined Edible Salt",
    slug: "refined-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_edible_refined_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "Pure white, hydro-cyclone washed refined edible salt (99.2%+ NaCl) meeting strict FSSAI food safety protocols for commercial bakeries and food processors (SKC Salt reference).",
    description: "Skyline Refined Edible Salt is processed in our state-of-the-art Gandhidham refinery using multi-stage counter-current brine washing, mechanical centrifugation, and fluidized bed hot-air drying. With sodium chloride purity exceeding 99.2% and uniform crystal sizing, this refined salt delivers clean, crisp salinity without bitter magnesium undertones. It complies rigorously with FSSAI regulations, making it the preferred choice for commercial bakeries, savory snack processors, and dairy operations.",
    images: [
      "/uploads/skc-edible-salt-table.jpg",
      "/uploads/skc-edible-pouch-1kg.png",
      "/uploads/skc-salt-crystals.jpg"
    ],
    grades: [
      "Commercial Food Processing Grade (99.2% NaCl)",
      "Bakery & Confectionery Grade",
      "Dairy & Cheese Grade"
    ],
    packaging: [
      "1 kg food-grade consumer pouches (packed in 25 kg master polybags)",
      "25 kg and 50 kg food-safe HDPE bags with LDPE liner",
      "1000 kg bulk totes for commercial food manufacturing plants"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, on dry basis)", value: "99.20% Min", testMethod: "FSSAI Standards" },
      { parameter: "Moisture Content", value: "0.20% Max", testMethod: "Gravimetric at 110°C" },
      { parameter: "Water Insoluble Matter", value: "0.05% Max", testMethod: "Gravimetric" },
      { parameter: "Whiteness Index", value: "> 90%", testMethod: "Spectrophotometer" },
      { parameter: "Calcium (as Ca)", value: "0.08% Max", testMethod: "EDTA Titration" },
      { parameter: "Magnesium (as Mg)", value: "0.04% Max", testMethod: "AAS" },
      { parameter: "Anti-Caking Agent (INS 536/551)", value: "Within FSSAI permissible limits", testMethod: "Standard Assay" }
    ],
    applications: [
      "Commercial bakeries (bread dough conditioning, biscuits, pastries)",
      "Dairy production (salted butter, hard cheeses, paneer brining)",
      "Snack food manufacturing (potato chips, roasted nuts, extruded snacks)",
      "Sauces, ketchup, gravies, and ready-to-eat meal formulations",
      "Meat processing and poultry seasoning"
    ],
    features: [
      "Thoroughly washed to remove all coastal silt and bitter bitterns",
      "Bright snow-white appearance with uniform crystal dispersal",
      "Free of microbiological contaminants, pathogens, and heavy metals",
      "Manufactured in an ISO 22000 (FSMS) and FSSAI certified facility"
    ],
    industries: ["Commercial Baking", "Dairy & Cheese", "Snack Food Processing", "Sauces & Condiments", "Meat Processing"],
    seoTitle: "Refined Salt Manufacturer in Gujarat | Food Grade Refined Salt Skyline",
    seoDescription: "Leading Refined Salt manufacturer in Gujarat. 99.2% pure white food-grade refined salt for bakeries, snacks, dairy, and culinary food processors. FSSAI certified.",
    seoKeywords: "refined salt manufacturer gujarat, food grade refined salt, bakery salt, snack salt supplier gandhidham, skc salt"
  },
  {
    id: "prod_edible_marine_salt",
    name: "Marine Salt (Authentic Ocean Sea Salt)",
    slug: "marine-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_edible_marine_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "Authentic coastal marine sea salt harvested from clean Arabian Sea tides, capturing genuine ocean minerals and delicate balanced flavor for gourmet culinary use (SKC Salt reference).",
    description: "Skyline Marine Salt is the epitome of high-quality ocean salt manufacturing in Gujarat. Sourced through fractional solar crystallization in specially lined pans along the Arabian Sea, our marine salt faithfully replicates the complex, balanced flavor of the ocean. Containing natural marine trace minerals, its soft, crunchy crystals enhance food without overpowering delicate dishes. It is favored by master chefs, artisan seasoning companies, and international export buyers.",
    images: [
      "/uploads/skc-salt-crystals.jpg",
      "/uploads/skc-coarse-salt-scoop.jpg",
      "/uploads/skc-natural-rock-salt.jpg"
    ],
    grades: [
      "Gourmet Marine Flake Grade",
      "Coarse Marine Finishing Salt",
      "Fine Marine Seasoning Grade"
    ],
    packaging: [
      "500g and 1 kg stand-up zipper pouches with clear window",
      "25 kg and 50 kg multi-wall food bags with PE barrier",
      "Palletized export orders with shrink wrapping"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, dry basis)", value: "98.00% - 99.20%", testMethod: "IS: 797" },
      { parameter: "Origin", value: "Gulf of Kutch Coastal Marine Pans", testMethod: "Verification" },
      { parameter: "Appearance", value: "Semi-translucent crystalline sea salt", testMethod: "Visual" },
      { parameter: "Natural Marine Electrolytes", value: "Present (Mg, K, Ca, trace iodine)", testMethod: "ICP-OES" },
      { parameter: "Moisture Content", value: "0.50% Max", testMethod: "Gravimetric" },
      { parameter: "Water Insoluble Matter", value: "0.04% Max", testMethod: "Gravimetric" },
      { parameter: "Particle Size", value: "0.5 mm to 4.0 mm calibrated crystals", testMethod: "Sieve Shaker" }
    ],
    applications: [
      "Gourmet culinary finishing salt for grilled steaks, seafood, and salads",
      "Artisanal spice blends, barbecue dry rubs, and gourmet seasonings",
      "Premium chocolate, caramel, and pastry confections (salted caramel)",
      "High-end restaurant tabletop grinders and mill refill packs",
      "Natural cosmetic bath salts and ocean therapy formulations"
    ],
    features: [
      "Harvested strictly from clean oceanic tidal currents in the Gulf of Kutch",
      "Distinctive mild salinity with complex mineral sweetness and zero chemical sting",
      "Natural crystal structure creates a delightful culinary mouthfeel and crunch",
      "No artificial chemical additives, chemical bleaches, or flow conditioners"
    ],
    industries: ["Gourmet & Fine Dining", "Seasonings & Spice Blends", "Chocolates & Confectionery", "Retail Gourmet Brands", "Cosmetics"],
    seoTitle: "Marine Salt Manufacturer in Gujarat | Ocean Sea Salt Skyline",
    seoDescription: "Top Marine Salt manufacturer in Gujarat. Authentic solar sea salt rich in ocean minerals for gourmet cooking, spice rubs, and culinary finishing. Gandhidham facility.",
    seoKeywords: "marine salt manufacturer gujarat, ocean sea salt, natural marine salt, culinary sea salt gandhidham, skc salt"
  },
  {
    id: "prod_edible_pure_salt",
    name: "Pure Food Salt (High Purity Edible Salt)",
    slug: "pure-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_edible_pure_salt",
    isFeatured: false,
    isActive: true,
    shortDescription: "Ultra-pure edible sodium chloride (99.7%+ NaCl) with undetectable heavy metals and zero impurities for infant formulas, beverages, and sensitive culinary blends (SKC Salt reference).",
    description: "Skyline Pure Food Salt is manufactured for high-specification food and nutritional applications where standard food-grade salt is insufficient. Refined to 99.7%+ purity via vacuum crystallization and micro-filtration, this salt delivers immaculate, pure sodium chloride with zero bitter salts or heavy metals. It dissolves completely into crystal-clear brine, making it the benchmark ingredient for infant nutrition products, functional electrolyte beverages, and sensitive food formulations.",
    images: [
      "/uploads/skc-pure-vacuum-salt.jpg",
      "/uploads/skc-edible-salt-table.jpg",
      "/uploads/skc-fine-salt.jpg"
    ],
    grades: [
      "Infant Formula Grade (Ultra-Low Heavy Metals)",
      "Beverage & Electrolyte Formulation Grade (99.7% NaCl)",
      "Pharma-Food Intermediate Grade"
    ],
    packaging: [
      "25 kg clean-room packed multi-wall paper bags with ultrasonic heat-seal",
      "50 kg food-safe drums or heavy poly-lined bags",
      "1000 kg food-grade big bags with clean-room certificate"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, dry basis)", value: "99.70% Min", testMethod: "FSSAI / FCC" },
      { parameter: "Lead (Pb)", value: "< 0.1 ppm (Undetected)", testMethod: "ICP-MS" },
      { parameter: "Arsenic (As)", value: "< 0.05 ppm (Undetected)", testMethod: "ICP-MS" },
      { parameter: "Cadmium & Mercury", value: "< 0.01 ppm (Undetected)", testMethod: "ICP-MS" },
      { parameter: "Moisture Content", value: "0.10% Max", testMethod: "Gravimetric" },
      { parameter: "Water Insoluble Matter", value: "< 0.02% (200 ppm Max)", testMethod: "Gravimetric" },
      { parameter: "Solution Clarity (20% solution)", value: "Crystal Clear (NTU < 0.5)", testMethod: "Turbidimeter" }
    ],
    applications: [
      "Infant formula milk powder and baby cereal preparations",
      "Isotonic sports drinks, electrolyte powder sachets, and functional beverages",
      "High-clarity broths, consommés, and canned vegetables",
      "Dietary supplements and effervescent nutritional tablets",
      "Specialty seasoning packets requiring absolute purity"
    ],
    features: [
      "Heavy metals strictly below 0.1 ppm complying with FCC and Codex Alimentarius",
      "100% crystal-clear brine solution with zero haze or micro-particulates",
      "Non-GMO, allergen-free, and vegan compliant",
      "Comprehensive Certificate of Analysis (COA) with complete elemental profiling"
    ],
    industries: ["Infant Nutrition", "Functional Beverages", "Dietary Supplements", "Canned Foods", "Nutraceuticals"],
    seoTitle: "Pure Salt Manufacturer in Gujarat | High Purity Edible Salt Skyline",
    seoDescription: "Premier manufacturer of Pure Food Salt in Gujarat. 99.7% purity with zero heavy metals for infant formula, beverages, and sensitive culinary blending. FSSAI certified.",
    seoKeywords: "pure salt manufacturer gujarat, high purity food salt, infant formula salt, electrolyte salt supplier gandhidham"
  },
  {
    id: "prod_edible_crystal_salt",
    name: "Crystal Salt (Natural Sea Salt Crystals)",
    slug: "crystal-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_edible_crystal_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "Translucent natural sea salt crystals (2.0 - 5.0 mm) with crisp texture and slow dissolution for salt mills, pickling, and traditional culinary recipes (SKC Salt reference).",
    description: "Skyline Crystal Salt showcases the beauty of natural sea salt crystallization. Grown slowly under the bright sunshine of coastal Gujarat, these sparkling translucent cubic crystals range from 2.0 mm to 5.0 mm. Unlike artificially compacted pellets, our crystal salt possesses a natural cellular geometry that releases burst-like flavor upon chewing and provides steady brine concentration during long-term pickle and olive curing.",
    images: [
      "/uploads/skc-natural-rock-salt.jpg",
      "/uploads/skc-coarse-salt-scoop.jpg",
      "/uploads/skc-salt-crystals.jpg"
    ],
    grades: [
      "Chef's Grinder Crystal Grade (2.0 mm - 4.5 mm)",
      "Traditional Culinary Crystal Grade (98.5% NaCl)",
      "Pickling & Curing Crystal Grade"
    ],
    packaging: [
      "1 kg food-grade poly bags with handle",
      "25 kg and 50 kg moisture-proof HDPE woven bags",
      "1000 kg Jumbo bulk bags for commercial packaging units"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, dry basis)", value: "98.50% - 99.00% Min", testMethod: "IS: 797" },
      { parameter: "Crystal Grain Size", value: "2.0 mm to 5.0 mm (uniform distribution)", testMethod: "Sieve Shaker" },
      { parameter: "Appearance", value: "Sparkling White Translucent Crystals", testMethod: "Visual" },
      { parameter: "Moisture Content", value: "0.80% - 1.50% Max", testMethod: "Gravimetric" },
      { parameter: "Water Insoluble Matter", value: "0.05% Max", testMethod: "Gravimetric" },
      { parameter: "Natural Trace Ocean Electrolytes", value: "0.8% - 1.2% (K, Mg, Ca)", testMethod: "AAS" }
    ],
    applications: [
      "Refill packs for ceramic and stainless steel culinary salt grinders",
      "Traditional South Indian and regional cooking (sambar, rasam, curd rice)",
      "Pickle manufacturing, brine curing of olives, gherkins, and jalapenos",
      "Crust-baking whole fish and salt-baked poultry recipes",
      "Artisan butcher shops and charcuterie meat curing"
    ],
    features: [
      "Natural crystalline morphology creates satisfying crunch and slow release of salinity",
      "Will not jam or corrode high-end salt mills and tabletop grinder mechanisms",
      "Free of chemical bleaching agents, artificial anti-caking chemicals, and microplastics",
      "Complies fully with FSSAI regulations for edible crystalline salt"
    ],
    industries: ["Table Salt Grinders", "Pickle & Olive Curing", "Regional Indian Cuisine", "Charcuterie & Butchers", "Gourmet Retail"],
    seoTitle: "Crystal Salt Manufacturer in Gujarat | Natural Crystal Sea Salt Skyline",
    seoDescription: "Leading Crystal Salt manufacturer in Gujarat. 2.0-5.0mm sparkling natural sea salt crystals for salt grinders, pickling, and traditional culinary recipes. FSSAI certified.",
    seoKeywords: "crystal salt manufacturer gujarat, sea salt crystals, grinder salt, coarse edible salt gandhidham, skc salt"
  },
  {
    id: "prod_edible_free_flow_salt",
    name: "Free Flow Salt (Non-Iodized Free Flowing Salt)",
    slug: "free-flow-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_edible_free_flow_salt",
    isFeatured: false,
    isActive: true,
    shortDescription: "Ultra-fine vacuum dried food salt with food-grade anti-caking treatment for 100% free-flowing performance in high humidity without added iodine (SKC Salt reference).",
    description: "Skyline Free Flow Salt is designed for commercial food processors who require perpetual free-flowing powder performance without added iodine. Formulated with food-grade anti-caking additives (INS 536/INS 551 within strict FSSAI tolerances), this salt will not lump, cake, or block dispensing nozzles even when stored in humid manufacturing environments. It ensures effortless automated dosing in snack dusting systems, spice mixing lines, and dry soup production.",
    images: [
      "/uploads/skc-fine-salt.jpg",
      "/uploads/skc-edible-pouch-1kg.png",
      "/uploads/skc-loose-packing.png"
    ],
    grades: [
      "Snack Seasoning Dusting Grade",
      "Industrial Dry Blending Grade (99.4% NaCl)",
      "Export Non-Iodized Food Grade"
    ],
    packaging: [
      "25 kg and 50 kg HDPE bags with moisture-barrier liner",
      "1000 kg Jumbo bulk bags with bottom discharge spout"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, on dry basis)", value: "99.40% Min", testMethod: "FSSAI" },
      { parameter: "Iodine Content", value: "0.00 ppm (Non-Iodized)", testMethod: "Titration" },
      { parameter: "Anti-Caking Agent (INS 536 / INS 551)", value: "10 ppm Max (within limits)", testMethod: "Colorimetric" },
      { parameter: "Moisture Content", value: "0.15% Max", testMethod: "Gravimetric at 110°C" },
      { parameter: "Water Insoluble Matter", value: "0.03% Max", testMethod: "Gravimetric" },
      { parameter: "Flowability / Angle of Repose", value: "100% Free Flow (< 32°)", testMethod: "Flow Funnel" }
    ],
    applications: [
      "Industrial snack food dusting (potato wafers, namkeen, extruded crisps)",
      "Dry soup mixes, ramen seasoning packets, and dehydrated food sachets",
      "Spice and masala blending where added iodine might alter color or flavor",
      "Commercial baking premixes and self-rising flour formulations",
      "Instant gravy powders and culinary dry concentrates"
    ],
    features: [
      "Zero caking or lumping even during monsoon seasons and tropical humidity",
      "Micro-fine grain size provides rapid dissolution and uniform surface coverage on snacks",
      "Un-iodized to avoid chemical interactions with natural spices and essential oils",
      "FSSAI, ISO 22000, and Halal certified for food plant safety"
    ],
    industries: ["Snack Food Seasoning", "Spice & Masala Blending", "Instant Foods & Soups", "Baking Premixes", "Institutional Food Packaging"],
    seoTitle: "Free Flow Salt Manufacturer in Gujarat | Non-Iodized Free Flowing Skyline",
    seoDescription: "Leading Free Flow Salt manufacturer in Gujarat. 100% free-flowing non-iodized food grade salt for snack dusting, seasoning blends, and food manufacturing.",
    seoKeywords: "free flow salt manufacturer gujarat, non iodized free flow salt, snack dusting salt, seasoning salt supplier gandhidham"
  },
  {
    id: "prod_edible_free_flow_iodized_salt",
    name: "Free Flow Iodized Salt",
    slug: "free-flow-iodized-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_edible_free_flow_iodized_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "Household staple refined salt enriched with potassium iodate (15-30 ppm) and anti-caking agent for daily cooking and dining table shakers (SKC Salt reference).",
    description: "Skyline Free Flow Iodized Salt is the quintessential kitchen table salt, refined to 99.5% purity and fortified with Potassium Iodate (KIO3) in accordance with government Universal Salt Iodization (USI) mandates. Micro-granulated, vacuum dried, and conditioned with food-grade anti-caking agents, it flows smoothly from tabletop shakers in every climate. It delivers essential dietary iodine to support thyroid health while enhancing every culinary dish with pure, balanced salinity.",
    images: [
      "/uploads/skc-iodized-salt.png",
      "/uploads/skc-edible-pouch-1kg.png",
      "/uploads/skc-edible-salt-table.jpg"
    ],
    grades: [
      "Consumer Retail Pouch Grade (1 kg / 500g)",
      "Hotel & Restaurant Institutional Grade (25 kg / 50 kg)",
      "Export USI Standard Fortified Grade"
    ],
    packaging: [
      "1 kg and 500g laminated BOPP/PE retail pouches (25 pouches per carton/master bag)",
      "25 kg and 50 kg HDPE bags with inner moisture liner",
      "Custom private label retail packaging available on bulk contracts"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, on dry basis)", value: "99.50% Min", testMethod: "FSSAI / IS: 7224" },
      { parameter: "Iodine Content (at manufacturing)", value: ">= 30 ppm", testMethod: "Iodometric Titration" },
      { parameter: "Iodine Content (at consumer level)", value: ">= 15 ppm Min", testMethod: "FSSAI Mandate" },
      { parameter: "Moisture Content", value: "0.15% Max", testMethod: "Gravimetric at 110°C" },
      { parameter: "Water Insoluble Matter", value: "0.03% Max", testMethod: "Gravimetric" },
      { parameter: "Whiteness Index", value: "> 92%", testMethod: "Spectrophotometer" },
      { parameter: "Anti-Caking Agent", value: "< 10 ppm (INS 536/551)", testMethod: "Standard Lab Method" }
    ],
    applications: [
      "Daily household cooking, boiling, frying, and culinary seasoning",
      "Dining table salt shakers in homes, restaurants, and hotels",
      "Institutional kitchens, school mid-day meal programs, and hospital catering",
      "Packaged food and savory consumer product manufacturing",
      "Retail supermarket brand supply and private label contract packaging"
    ],
    features: [
      "Fortified with stable potassium iodate preventing iodine deficiency disorders (IDD)",
      "100% free-flowing non-caking micro-crystals that never jam tabletop shakers",
      "Snow-white purity with immaculate taste and zero bitter residual minerals",
      "Manufactured under stringent FSSAI, ISO 9001, and ISO 22000 quality systems"
    ],
    industries: ["Household Consumer Goods", "Hotels & Restaurants (HORECA)", "Retail Supermarkets", "Institutional Catering", "Food Processing"],
    seoTitle: "Free Flow Iodized Salt Manufacturer in Gujarat | Skyline Salt Gandhidham",
    seoDescription: "Leading Free Flow Iodized Salt manufacturer in Gujarat. 99.5% pure white table salt enriched with iodine (15-30 ppm). 1kg consumer pouches & 50kg bags. FSSAI certified.",
    seoKeywords: "free flow iodized salt manufacturer gujarat, table salt 1kg pouch, iodized salt gandhidham, skc salt reference"
  },
  {
    id: "prod_edible_iodized_salt",
    name: "Iodized Salt (Standard Fortified Food Salt)",
    slug: "iodized-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_edible_iodized_salt",
    isFeatured: false,
    isActive: true,
    shortDescription: "Traditional granular sea salt fortified with essential potassium iodate (15-30 ppm) for daily culinary nutrition and bulk commercial food preparation (SKC Salt reference).",
    description: "Skyline Iodized Salt is produced by enriching clean solar-evaporated granular salt with potassium iodate spray. Maintaining a traditional granular texture preferred in everyday regional cooking, this salt dissolves quickly into curries, dals, and gravies while ensuring the essential daily intake of iodine. It is widely distributed across rural and urban markets, catering to institutional kitchens, local restaurants, and food processors seeking high value and trusted nutrition.",
    images: [
      "/uploads/skc-iodized-salt.png",
      "/uploads/skc-salt-crystals.jpg",
      "/uploads/skc-loose-packing.png"
    ],
    grades: [
      "Traditional Granular Iodized Grade",
      "Institutional Foodservice Grade (50 kg)",
      "Bulk Wholesale Pack Grade"
    ],
    packaging: [
      "1 kg retail poly pouches (packed in 25 kg outer woven sacks)",
      "25 kg and 50 kg HDPE bags with moisture barrier",
      "1000 kg Jumbo bulk bags for repackers"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, dry basis)", value: "98.80% Min", testMethod: "IS: 7224 / FSSAI" },
      { parameter: "Iodine Content (as I)", value: "15 - 30 ppm", testMethod: "Iodometric Titration" },
      { parameter: "Moisture Content", value: "0.50% Max", testMethod: "Gravimetric at 110°C" },
      { parameter: "Water Insoluble Matter", value: "0.08% Max", testMethod: "Gravimetric" },
      { parameter: "Calcium (as Ca)", value: "0.12% Max", testMethod: "EDTA Titration" },
      { parameter: "Magnesium (as Mg)", value: "0.06% Max", testMethod: "AAS" }
    ],
    applications: [
      "Daily cooking in home kitchens, mess halls, and community kitchens",
      "Street food preparation, local restaurants, and catering services",
      "Cottage food industries, namkeen fryers, and local spice grinders",
      "Wholesale distribution across regional grocery supply chains",
      "Food aid and humanitarian nutrition distribution"
    ],
    features: [
      "Reliably fortified with dietary iodine meeting national health standards",
      "Granular texture preferred for sensory salt dosing in authentic cooking",
      "Economical pricing providing maximum accessibility and nutrition",
      "Strict quality control with zero hazardous residues or heavy metals"
    ],
    industries: ["Regional Cooking", "Community Catering", "Local Food Processing", "Wholesale Grocery", "Humanitarian Aid"],
    seoTitle: "Iodized Salt Manufacturer in Gujarat | Fortified Food Salt Skyline",
    seoDescription: "Leading Iodized Salt manufacturer in Gujarat. Granular sea salt fortified with potassium iodate (15-30 ppm) for daily nutrition and food preparation. Gandhidham factory.",
    seoKeywords: "iodized salt manufacturer gujarat, fortified edible salt, iodised cooking salt, gandhidham salt supplier, skc salt"
  },
  {
    id: "prod_edible_iodized_refined_salt",
    name: "Iodized Refined Salt",
    slug: "iodized-refined-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_edible_iodized_refined_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "Triple-washed and hydro-fractionated refined edible salt fortified with stable micro-encapsulated potassium iodate for premium consumer brands (SKC Salt reference).",
    description: "Skyline Iodized Refined Salt is our flagship consumer-grade edible salt. Produced from vacuum-evaporated and hydro-cyclone cleansed crystals, it is enriched with micro-dosed potassium iodate to ensure uniform iodine dispersal across every crystal. The crystals are treated with food-grade anti-caking silica, ensuring pristine snow-white color and perpetual flowability. It serves premium FMCG brands, export retail private labels, and high-end restaurant chains.",
    images: [
      "/uploads/skc-edible-pouch-1kg.png",
      "/uploads/skc-pure-vacuum-salt.jpg",
      "/uploads/skc-fine-salt.jpg"
    ],
    grades: [
      "Premium Consumer Brand Grade (99.4% NaCl)",
      "Export Retail Pack Grade (500g / 1kg)",
      "High-End Hospitality Grade"
    ],
    packaging: [
      "500g and 1 kg premium laminated pouches with high-gloss print",
      "25 kg and 50 kg HDPE bags with ultrasonic seam sealing",
      "Export containers loaded with palletized stretch-wrapped cartons"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, on dry basis)", value: "99.40% Min", testMethod: "FSSAI / IS: 7224" },
      { parameter: "Iodine Content (at manufacturing)", value: "20 - 30 ppm", testMethod: "Titration" },
      { parameter: "Moisture Content", value: "0.12% Max", testMethod: "Gravimetric at 110°C" },
      { parameter: "Water Insoluble Matter", value: "0.03% Max", testMethod: "Gravimetric" },
      { parameter: "Whiteness Index", value: "> 94%", testMethod: "Spectrophotometer" },
      { parameter: "Calcium & Magnesium Combined", value: "< 0.05%", testMethod: "AAS" }
    ],
    applications: [
      "Premium retail consumer salt brands and supermarket private labels",
      "High-end restaurant tables and luxury hotel culinary operations",
      "Packaged gourmet meals, frozen dinners, and export food packs",
      "Hospital patient dietary meals requiring controlled mineral purity",
      "Fine culinary seasoning and table service"
    ],
    features: [
      "Micro-encapsulated iodine prevents iodine loss during heat storage and cooking",
      "Brilliant snow-white color with high light reflectivity (> 94% whiteness)",
      "Instantaneous dissolution without any chalky residue or cloudiness",
      "Certified under FSSAI, BRCGS, ISO 22000, and Halal standards"
    ],
    industries: ["FMCG Retail Brands", "Luxury Hospitality", "Export Supermarkets", "Dietary Nutrition", "Food Processing"],
    seoTitle: "Iodized Refined Salt Manufacturer in Gujarat | Skyline Salt Gandhidham",
    seoDescription: "Leading Iodized Refined Salt manufacturer in Gujarat. 99.4% pure white refined salt with stable iodine (20-30 ppm). Ideal for premium consumer brands and export.",
    seoKeywords: "iodized refined salt manufacturer gujarat, refined iodised table salt, fmcg salt private label, gandhidham salt"
  },
  {
    id: "prod_edible_double_refined_salt",
    name: "Double Refined Salt",
    slug: "double-refined-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_edible_double_refined_salt",
    isFeatured: false,
    isActive: true,
    shortDescription: "Subjected to dual successive refining cycles of washing, recrystallization, and mechanical dewatering for demanding confectioneries and bakeries (SKC Salt reference).",
    description: "Skyline Double Refined Salt undergoes two consecutive refining stages to achieve exceptional purity and clarity. First, the salt is washed counter-currently to eliminate surface bitterns and silt. In the second stage, it is dissolved, hydro-cyclone fractionated, and recrystallized before undergoing fluidized bed drying. This dual purification strips virtually all trace magnesium and calcium chlorides, ensuring zero hygroscopic dampness and zero bitter taste notes.",
    images: [
      "/uploads/skc-fine-salt.jpg",
      "/uploads/skc-salt-processing.jpg",
      "/uploads/skc-edible-pouch-1kg.png"
    ],
    grades: [
      "Confectionery & Bakery Double Refined (99.5% NaCl)",
      "Dairy Processing Double Refined",
      "Export Clean Room Grade"
    ],
    packaging: [
      "25 kg and 50 kg multi-wall laminated bags with heat-sealed poly liner",
      "1000 kg Jumbo bulk bags with moisture-proof barrier"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, on dry basis)", value: "99.50% Min", testMethod: "FSSAI Standards" },
      { parameter: "Moisture Content", value: "0.12% Max", testMethod: "Gravimetric at 110°C" },
      { parameter: "Water Insoluble Matter", value: "< 0.02% (200 ppm Max)", testMethod: "Gravimetric" },
      { parameter: "Calcium (as Ca)", value: "< 0.04% Max", testMethod: "EDTA Titration" },
      { parameter: "Magnesium (as Mg)", value: "< 0.02% Max", testMethod: "AAS" },
      { parameter: "Sulfate (as SO4)", value: "< 0.06% Max", testMethod: "Turbidimetric" },
      { parameter: "Whiteness Index", value: "> 94%", testMethod: "Spectrophotometer" }
    ],
    applications: [
      "Commercial biscuit, cookie, and cracker dough conditioning",
      "Premium chocolates, toffees, and caramel confections",
      "Processed cheese, butter, and infant dairy formulations",
      "Ready-to-eat export meals and retorted pouch foods",
      "Specialty sauces, marinades, and dressing emulsions"
    ],
    features: [
      "Dual refining completely strips magnesium chloride bitterness and dampness",
      "Non-hygroscopic crystals stay bone-dry during storage and pneumatic handling",
      "Consistent clean salt profile without metallic or mineral aftertastes",
      "Guaranteed microbiological cleanliness conforming to international food standards"
    ],
    industries: ["Commercial Confectionery", "Industrial Bakeries", "Dairy Processing", "Retort Foods", "Fine Food Manufacturing"],
    seoTitle: "Double Refined Salt Manufacturer in Gujarat | Skyline Salt Gandhidham",
    seoDescription: "Leading Double Refined Salt manufacturer in Gujarat. 99.5% pure dual-refined salt with ultra-low magnesium for bakeries, confectionery, and dairy processing.",
    seoKeywords: "double refined salt manufacturer gujarat, confectionery salt, double refined food salt gandhidham, skc salt"
  },
  {
    id: "prod_edible_triple_refined_salt",
    name: "Triple Refined Salt",
    slug: "triple-refined-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_edible_triple_refined_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "The pinnacle of culinary salt purification processed through three physical and thermochemical stages, achieving 99.8%+ crystal purity and snow-white clarity (SKC Salt reference).",
    description: "Skyline Triple Refined Salt represents the zenith of edible salt manufacturing. Processed through three rigorous purification stages—multi-hydrocyclone primary wash, chemical brine purification with micro-filtration, and vacuum thermochemical recrystallization—it achieves 99.8%+ sodium chloride purity. With brilliant snow-white color (> 96% whiteness) and total insolubles under 100 ppm, this salt is engineered for multinational food corporations, infant nutrition lines, and luxury culinary export brands.",
    images: [
      "/uploads/skc-pure-vacuum-salt.jpg",
      "/uploads/skc-edible-salt-table.jpg",
      "/uploads/skc-fine-salt.jpg"
    ],
    grades: [
      "Multinational Food Corp Grade (99.8% NaCl)",
      "Export Ultra-Premium Grade",
      "Pharma-Food Intermediate Grade"
    ],
    packaging: [
      "25 kg clean-room packed poly-lined paper sacks",
      "50 kg moisture-proof HDPE bags with tamper-evident seal",
      "1000 kg and 1200 kg export certified FIBC totes"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, on dry basis)", value: "99.80% Min", testMethod: "FCC / FSSAI / IS: 797" },
      { parameter: "Moisture Content", value: "0.08% Max", testMethod: "Gravimetric at 110°C" },
      { parameter: "Water Insoluble Matter", value: "< 0.01% (100 ppm Max)", testMethod: "Gravimetric" },
      { parameter: "Whiteness Index", value: "> 96%", testMethod: "Spectrophotometer" },
      { parameter: "Calcium (as Ca)", value: "< 0.02% Max (200 ppm)", testMethod: "EDTA" },
      { parameter: "Magnesium (as Mg)", value: "< 0.01% Max (100 ppm)", testMethod: "AAS" },
      { parameter: "Heavy Metals (Pb, As, Cd, Hg)", value: "Undetected (< 0.1 ppm)", testMethod: "ICP-MS" }
    ],
    applications: [
      "Export table salt brands and multinational food processor ingredient lists",
      "Infant nutritional formula and clinical dietary formulations",
      "Pharmaceutical-adjacent food processing and nutraceuticals",
      "Ultra-clear liquid food brines, broth concentrates, and gelatins",
      "Luxury restaurant culinary seasoning and molecular gastronomy"
    ],
    features: [
      "Highest chemical purity commercially available in edible salt (99.8%+ NaCl)",
      "Brilliant snow-white appearance with unmatched visual appeal and optical clarity",
      "Near-zero insolubles eliminating nozzle blockage in high-speed automated bottling lines",
      "Strict compliance with FCC, Codex Alimentarius, FSSAI, and Halal specifications"
    ],
    industries: ["Multinational Food Processors", "Infant & Clinical Nutrition", "Export FMCG Brands", "Nutraceuticals", "Fine Dining"],
    seoTitle: "Triple Refined Salt Manufacturer in Gujarat | Ultra Pure Salt Skyline",
    seoDescription: "Leading Triple Refined Salt manufacturer in Gujarat. 99.8% ultra-pure vacuum refined salt with >96% whiteness for multinational food processors and export.",
    seoKeywords: "triple refined salt manufacturer gujarat, ultra pure edible salt, export table salt, vacuum refined salt gandhidham, skc salt"
  },
  {
    id: "prod_edible_table_salt",
    name: "Table Salt (Dispenser-Ready Free Flow Table Salt)",
    slug: "table-salt",
    categoryId: "cat_edible_salt",
    categorySlug: "edible-salt",
    subcategoryId: "sub_edible_table_salt",
    isFeatured: true,
    isActive: true,
    shortDescription: "Micro-sieved dispenser-ready table salt specially formulated for dining shakers and culinary finishing, guaranteed never to cake or clog (SKC Salt reference).",
    description: "Skyline Table Salt is formulated specifically for tabletop salt shakers, hospitality dining service, and direct culinary seasoning. Produced by micro-sieving vacuum-refined food salt to a calibrated 30 to 60 mesh size and conditioning with food-grade silica anti-caking agent, it delivers perpetual, effortless pouring. Even when exposed to atmospheric humidity on restaurant tables or coastal dining environments, it remains dry, crisp, and ready to dispense.",
    images: [
      "/uploads/skc-edible-salt-table.jpg",
      "/uploads/skc-iodized-salt.png",
      "/uploads/skc-edible-pouch-1kg.png"
    ],
    grades: [
      "Hospitality Shaker Grade (30 - 60 Mesh)",
      "Consumer Table Salt Grade (99.6% NaCl)",
      "Single-Serve Condiment Sachet Grade"
    ],
    packaging: [
      "200g and 500g plastic shaker dispensers with sprinkle cap",
      "1 kg retail pouches and 25 kg bags for foodservice bulk refill",
      "1g single-serve paper condiment sachets for airlines and hotel room service"
    ],
    specifications: [
      { parameter: "Sodium Chloride (NaCl, on dry basis)", value: "99.60% Min", testMethod: "FSSAI" },
      { parameter: "Particle Size Calibration", value: "30 - 60 mesh (0.25 - 0.60 mm)", testMethod: "Sieve Shaker" },
      { parameter: "Flowability / Caking Tendency", value: "100% Free Pouring (Zero caking)", testMethod: "Humidity Chamber Test (85% RH)" },
      { parameter: "Moisture Content", value: "0.10% Max", testMethod: "Gravimetric at 110°C" },
      { parameter: "Water Insoluble Matter", value: "< 0.02%", testMethod: "Gravimetric" },
      { parameter: "Whiteness Index", value: "> 94%", testMethod: "Spectrophotometer" }
    ],
    applications: [
      "Dining table salt shakers in restaurants, cafes, hotels, and food courts",
      "Single-serve salt sachets for airline in-flight meals and take-out food delivery",
      "Household kitchen condiment carousels and table shakers",
      "Fast food chains, burger franchises, and french fry finishing stations",
      "Hospitality room service trays and buffet condiment stations"
    ],
    features: [
      "Calibrated particle size ensures uniform sprinkle distribution without dusting or clumping",
      "Engineered to resist humidity, preventing blocked shaker holes in coastal dining spots",
      "Crisp, clean taste that immediately enhances dish flavor without metallic bitterness",
      "Available in bulk refill sacks as well as finished consumer shaker packaging"
    ],
    industries: ["Hotels, Restaurants & Cafes (HORECA)", "Airlines & Catering", "Fast Food Chains", "Household Dining", "Condiment Packaging"],
    seoTitle: "Table Salt Manufacturer in Gujarat | Free Flow Table Salt Skyline",
    seoDescription: "Leading Table Salt manufacturer in Gujarat. 99.6% pure free-flowing table salt formulated for dining shakers and single-serve condiment sachets. FSSAI certified.",
    seoKeywords: "table salt manufacturer gujarat, dining table salt, shaker salt, free flowing table salt gandhidham, skc salt"
  }
];

console.log('Industrial Products Count:', industrialProducts.length);
console.log('Edible Products Count:', edibleProducts.length);

module.exports = { industrialProducts, edibleProducts };

