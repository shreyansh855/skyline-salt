const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 5 China Clay products from Shyam Clay
const chinaClayProducts = [
  {
    id: "prod_clay_lumps",
    name: "China Clay Lumps (High Grade Kaolinite Lumps)",
    slug: "china-clay-lumps",
    categoryId: "cat_china_clay",
    categorySlug: "china-clay",
    subcategoryId: "sub_clay_lumps",
    isFeatured: true,
    isActive: true,
    shortDescription: "Selected high-purity natural white China Clay Lumps from captive Kutch mines with 35-38% Al2O3 for ceramic tiles and sanitaryware (Reference: Shyam Clay).",
    description: "Skyline China Clay Lumps are mined directly from captive open-cast deposits in the mineral-rich Kutch basin. Hand-selected for exceptional geological purity, these natural kaolinite lumps offer high plasticity, an optimal silica-to-alumina ratio (Al2O3 35-38%), and brilliant firing whiteness at 1200°C. They serve as an essential primary raw material for ceramic floor and wall tile bodies, sanitaryware casting slips, electrical porcelain insulators, and refractory cement formulations.",
    images: ["/uploads/shyam-china-clay-lumps.webp", "/uploads/shyam-china-clay-noodles.webp"],
    grades: ["Super White Ceramic Lump Grade", "Export Grade Semi-Washed Lumps", "Refractory Raw Lump Grade"],
    packaging: ["50 kg HDPE woven sacks", "1000 kg and 1250 kg Jumbo bulk bags with lifting loops", "Open-top tipper trucks direct from mine head"],
    specifications: [
      { parameter: "Alumina (Al2O3)", value: "35.0% - 38.0% Min", testMethod: "XRF / Chemical Wet Analysis" },
      { parameter: "Silica (SiO2)", value: "46.0% - 49.0%", testMethod: "XRF" },
      { parameter: "Iron Oxide (Fe2O3)", value: "< 0.65% Max", testMethod: "AAS" },
      { parameter: "Titanium Dioxide (TiO2)", value: "< 0.85% Max", testMethod: "Spectrophotometer" },
      { parameter: "Loss on Ignition (LOI)", value: "12.5% - 13.8%", testMethod: "Gravimetric at 1000°C" },
      { parameter: "Moisture Content", value: "8.0% - 12.0% Max", testMethod: "Gravimetric" },
      { parameter: "Fired Color @ 1200°C", value: "High White / Cream", testMethod: "Optical Pyrometry" }
    ],
    applications: [
      "Ceramic vitrified and porcelain floor/wall tiles",
      "Vitreous china sanitaryware bodies and casting slips",
      "High-voltage electrical porcelain insulators",
      "Refractory fire clay bricks and high-alumina mortars",
      "Tableware, stoneware, and fine chinaware pottery"
    ],
    features: [
      "Selected directly from captive mines with consistent mineral vein quality",
      "Superior plastic workability during hydraulic press molding",
      "Low iron content prevents dark specks and discoloration after firing",
      "Year-round bulk supply with massive pit-head buffer stock"
    ],
    industries: ["Ceramic Tiles", "Sanitaryware", "Refractory Manufacturing", "Electrical Insulators", "Tableware & Potteries"],
    seoTitle: "China Clay Lumps Manufacturer in Gujarat | Skyline Salt and Minerals",
    seoDescription: "Leading China Clay Lumps manufacturer in Gujarat. 35-38% Al2O3 natural white kaolin lumps from captive Kutch mines for ceramic tiles and sanitaryware.",
    seoKeywords: "china clay lumps manufacturer gujarat, raw kaolin lumps kutch, ceramic china clay lumps, shyam clay reference"
  },
  {
    id: "prod_clay_powder",
    name: "China Clay Powder (Micro-Pulverized 300 - 500 Mesh)",
    slug: "china-clay-powder",
    categoryId: "cat_china_clay",
    categorySlug: "china-clay",
    subcategoryId: "sub_clay_powder",
    isFeatured: true,
    isActive: true,
    shortDescription: "Finely micronized, air-classified hydrated aluminum silicate powder (300-500 mesh) for paints, rubber, paper, and ceramics (Reference: Shyam Clay).",
    description: "Skyline China Clay Powder is produced by pulverizing beneficiated kaolinite in high-speed micro-pulverizers and dynamic air classifiers. Possessing a lamellar hexagonal platelet crystal structure, this ultra-fine white powder provides excellent dispersion, opacity, suspension stability, and chemical inertness. It is widely utilized as a reinforcing functional filler and extender in emulsion paints, automotive rubber components, adhesives, and ceramic glazes.",
    images: ["/uploads/shyam-china-clay-powder.webp", "/uploads/shyam-levigated-clay.webp"],
    grades: ["500 Mesh Micro-Fine Paint Grade", "300 Mesh Industrial Ceramic Grade", "Rubber & Polymer Reinforcing Grade"],
    packaging: ["25 kg and 50 kg multi-wall craft paper / HDPE laminated bags", "1000 kg Jumbo bulk bags on pallets with shrink wrap"],
    specifications: [
      { parameter: "Fineness (Residue on 300 Mesh / 53µm)", value: "< 0.5% (99.5% Passing)", testMethod: "Wet Sieve Method" },
      { parameter: "Whiteness Index (ISO Brightness)", value: "> 85.0%", testMethod: "ISO 2470" },
      { parameter: "Alumina (Al2O3)", value: "36.0% - 38.5%", testMethod: "XRF" },
      { parameter: "Silica (SiO2)", value: "46.5% - 48.5%", testMethod: "XRF" },
      { parameter: "Iron (Fe2O3)", value: "< 0.50% Max", testMethod: "AAS" },
      { parameter: "Oil Absorption", value: "38 - 44 g / 100g", testMethod: "Gardner-Coleman Method" },
      { parameter: "pH Value (10% aqueous suspension)", value: "6.5 - 7.5 (Neutral)", testMethod: "pH Meter" }
    ],
    applications: [
      "Interior and exterior decorative emulsion paints (anti-settling & opacity extender)",
      "Automotive rubber hoses, belts, and molded rubber compounding",
      "Ceramic body glazes, engobes, and sanitaryware slips",
      "Pesticides, bio-fertilizers, and dry chemical powder formulations",
      "Paper manufacturing filler and coated paper board"
    ],
    features: [
      "Tight particle size distribution ensures smooth brush drag and zero grittiness in paints",
      "High natural aspect ratio imparts mechanical reinforcement in rubber polymers",
      "Chemically inert and compatible with organic and inorganic solvent systems",
      "De-dusted packaging prevents transit loss and airborne dusting"
    ],
    industries: ["Paints & Coatings", "Rubber & Polymers", "Ceramic Glazes", "Paper Manufacturing", "Agrochemicals"],
    seoTitle: "China Clay Powder Manufacturer in Gujarat | Micro Pulverized Kaolin Skyline",
    seoDescription: "Leading China Clay Powder manufacturer in Gujarat. 300-500 mesh micro-pulverized kaolin powder for paints, rubber, ceramic glazes, and paper. Gandhidham facility.",
    seoKeywords: "china clay powder manufacturer gujarat, 300 mesh china clay, 500 mesh kaolin powder, paint extender clay, shyam clay reference"
  },
  {
    id: "prod_clay_noodles",
    name: "China Clay Noodles (Extruded Levigated Noodles)",
    slug: "china-clay-noodles",
    categoryId: "cat_china_clay",
    categorySlug: "china-clay",
    subcategoryId: "sub_clay_noodles",
    isFeatured: true,
    isActive: true,
    shortDescription: "Levigated extruded noodles with 36-39% Al2O3, low grit, and superior plasticity for automated sanitaryware and tile plants (Reference: Shyam Clay).",
    description: "Skyline China Clay Noodles are manufactured by blunging raw kaolin, removing free silica grit in hydro-cyclone spirals, filter pressing into cakes, and vacuum extruding into cylindrical noodles. This noodle form offers outstanding advantages: it eliminates dusting during shipping, facilitates rapid automated slurry blunging, and guarantees near-zero free silica grit. It is the gold standard raw material for automated sanitaryware casting lines in Morbi and international export markets.",
    images: ["/uploads/shyam-china-clay-noodles.webp", "/uploads/shyam-crude-china-clay.webp"],
    grades: ["Grade A Sanitaryware Noodle Grade (Al2O3 > 37%)", "Grade B Vitrified Tile Noodle Grade", "Export Low-Moisture Noodle Grade"],
    packaging: ["50 kg HDPE bags with inner poly liner", "1000 kg and 1250 kg Jumbo bulk bags with bottom discharge spout"],
    specifications: [
      { parameter: "Alumina (Al2O3)", value: "36.5% - 39.0% Min", testMethod: "Chemical Analysis" },
      { parameter: "Silica (SiO2)", value: "46.0% - 48.0%", testMethod: "XRF" },
      { parameter: "Grit Content (Residue on 300 Mesh)", value: "< 0.05% Max", testMethod: "IS: 2840" },
      { parameter: "Iron (Fe2O3)", value: "< 0.55% Max", testMethod: "AAS" },
      { parameter: "Fired Whiteness @ 1250°C", value: "> 88.0%", testMethod: "Spectrophotometer" },
      { parameter: "Dry Modulus of Rupture (MOR)", value: "> 2.8 MPa", testMethod: "3-point Bending" },
      { parameter: "Moisture Content", value: "8.0% - 12.0% Max", testMethod: "Gravimetric" }
    ],
    applications: [
      "Vitreous china sanitaryware automated pressure casting (washbasins, water closets)",
      "High-end porcelain and vitrified tile body formulations",
      "Bone china and fine porcelain tableware",
      "High-voltage electrical insulators and ceramic bushings",
      "Glaze preparation and engobe slips"
    ],
    features: [
      "Vacuum-extruded noodle shape completely eliminates transit powder loss and dusting",
      "Dissolves in blungers 50% faster than hard rock lumps, reducing energy consumption",
      "Near-zero silica grit prevents casting pinholes, nozzle wear, and mold erosion",
      "High green casting strength enables rapid mold release and handling"
    ],
    industries: ["Sanitaryware (Morbi Hub)", "Ceramic Tiles", "Tableware & Chinaware", "Electrical Porcelain", "Export Ceramics"],
    seoTitle: "China Clay Noodles Manufacturer in Gujarat | Extruded Kaolin Skyline",
    seoDescription: "Premier China Clay Noodles manufacturer in Gujarat. 36-39% Al2O3 levigated extruded noodles with <0.05% grit for automated sanitaryware and tile slip casting.",
    seoKeywords: "china clay noodles manufacturer gujarat, extruded kaolin noodles, sanitaryware china clay morbi, shyam clay reference"
  },
  {
    id: "prod_crude_china_clay",
    name: "Crude China Clay (Direct Mine Run Kaolin)",
    slug: "crude-china-clay",
    categoryId: "cat_china_clay",
    categorySlug: "china-clay",
    subcategoryId: "sub_crude_clay",
    isFeatured: false,
    isActive: true,
    shortDescription: "Direct mine-run crude kaolin lumps boasting high natural plasticity and refractoriness for washing plants and heavy clay industries (Reference: Shyam Clay).",
    description: "Skyline Crude China Clay is raw, unbeneficiated natural kaolin clay extracted directly from our prime mining concessions in Kutch. Characterized by high natural plasticity, moderate quartz sand content, and excellent thermal refractoriness, it is the ideal feedstock for large ceramic corporations operating their own captive wet-beneficiation plants, as well as terracotta and heavy clay manufacturing units.",
    images: ["/uploads/shyam-crude-china-clay.webp", "/uploads/shyam-china-clay-lumps.webp"],
    grades: ["Standard Mine Run Crude", "Selected High Alumina Crude (>32% Al2O3)", "Terracotta & Heavy Clay Grade"],
    packaging: ["Loose bulk tipper truckloads", "1000 kg Jumbo bulk bags for rail and container transport"],
    specifications: [
      { parameter: "Alumina (Al2O3)", value: "30.0% - 34.0%", testMethod: "XRF" },
      { parameter: "Silica (SiO2)", value: "50.0% - 55.0%", testMethod: "XRF" },
      { parameter: "Moisture Content", value: "10.0% - 15.0%", testMethod: "Gravimetric" },
      { parameter: "Natural Beneficiation Recovery", value: "> 55% Yield", testMethod: "Lab Washing Assay" },
      { parameter: "Fusion Point", value: "> 1650°C", testMethod: "Pyrometric Cone" }
    ],
    applications: [
      "Feedstock for commercial clay washing and levigation plants",
      "Terracotta roof tiles, decorative bricks, and structural clay products",
      "Cement raw meal additive for alumina correction",
      "Low-cost foundry sand and molding mixtures"
    ],
    features: [
      "Direct mine-mouth pricing providing maximum cost efficiency",
      "Consistent geological layer grading with minimal overburden mixing",
      "High plastic workability ideal for extrusion and hand-throwing",
      "Enormous volume availability for large industrial contracts"
    ],
    industries: ["Clay Washing Plants", "Terracotta & Bricks", "Cement Manufacturing", "Heavy Clay Ceramics"],
    seoTitle: "Crude China Clay Manufacturer in Gujarat | Mine Run Kaolin Skyline",
    seoDescription: "Leading Crude China Clay supplier in Gujarat. Direct mine-run raw kaolin from Kutch mines for clay washing plants, terracotta, and cement factories.",
    seoKeywords: "crude china clay manufacturer gujarat, raw kaolin kutch, mine run china clay, shyam clay reference"
  },
  {
    id: "prod_levigated_china_clay",
    name: "Levigated China Clay (Hydro-Washed Beneficiated Clay)",
    slug: "levigated-china-clay",
    categoryId: "cat_china_clay",
    categorySlug: "china-clay",
    subcategoryId: "sub_levigated_clay",
    isFeatured: true,
    isActive: true,
    shortDescription: "Hydro-cyclone washed beneficiated kaolin cleansed of quartz, mica, and iron grit with exceptional casting slip stability (Reference: Shyam Clay).",
    description: "Skyline Levigated China Clay is produced in our modern hydro-beneficiation facility. Raw kaolin is dispersed in clean water, passed through hydro-cyclones to drop heavy silica sand, sent through hydro-separators to strip abrasive mica flakes, and de-watered via high-pressure recessed chamber filter presses. The resulting filter cakes possess high chemical purity (Al2O3 > 37%), ultra-low grit, and consistent thixotropic deflocculation response, making them indispensable for high-grade sanitaryware, porcelain, and paper filling.",
    images: ["/uploads/shyam-levigated-clay.webp", "/uploads/shyam-china-clay-powder.webp"],
    grades: ["Double Levigated Filter Cake Grade", "Dry Levigated Lump Grade", "High Whiteness Paper & Glaze Grade"],
    packaging: ["50 kg HDPE bags with moisture-proof liner", "1000 kg Jumbo bulk bags with palletization"],
    specifications: [
      { parameter: "Alumina (Al2O3)", value: "37.0% - 39.0% Min", testMethod: "XRF" },
      { parameter: "Silica (SiO2)", value: "45.5% - 47.5%", testMethod: "XRF" },
      { parameter: "Iron (Fe2O3)", value: "< 0.45% Max", testMethod: "AAS" },
      { parameter: "Free Silica / Grit (> 300 Mesh)", value: "< 0.03% Max", testMethod: "IS: 2840" },
      { parameter: "Water Soluble Salts", value: "< 0.10% Max", testMethod: "Conductivity Meter" },
      { parameter: "Whiteness Index", value: "> 86.5%", testMethod: "Spectrophotometer" },
      { parameter: "Slip Viscosity (65% solids)", value: "250 - 450 mPa·s", testMethod: "Brookfield Viscometer" }
    ],
    applications: [
      "Vitreous sanitaryware pressure and gravity casting slips",
      "Fine ceramic floor and wall tiles",
      "Paints, rubber compounds, and industrial adhesives",
      "Paper wet-end filling and coating pigment",
      "High-tension electrical porcelain insulators"
    ],
    features: [
      "Thorough multi-stage hydro-washing strips abrasive silica and mica flakes",
      "Predictable sodium silicate deflocculation curves with high slip solids (65-68%)",
      "Low fired shrinkage and uniform thermal expansion",
      "Guaranteed batch-to-batch physical and chemical uniformity"
    ],
    industries: ["Sanitaryware Casting", "Ceramic Tiles", "Paints & Adhesives", "Paper Mills", "Electrical Ceramics"],
    seoTitle: "Levigated China Clay Manufacturer in Gujarat | Washed Kaolin Skyline",
    seoDescription: "Leading Levigated China Clay manufacturer in Gujarat. Water-washed beneficiated kaolin (37%+ Al2O3) with <0.03% grit for sanitaryware casting slips and paints.",
    seoKeywords: "levigated china clay manufacturer gujarat, washed kaolin clay, deflocculated ceramic clay, shyam clay reference"
  }
];

// 5 Kaolin Clay products from Shyam Clay
const kaolinProducts = [
  {
    id: "prod_kaolin_noodles",
    name: "Kaolin Clay Noodles (Refined Extruded Kaolin)",
    slug: "kaolin-clay-noodles",
    categoryId: "cat_kaolin",
    categorySlug: "kaolin",
    subcategoryId: "sub_kaolin_noodles",
    isFeatured: true,
    isActive: true,
    shortDescription: "Premium refined extruded kaolin noodles with 37.5%+ Al2O3, low iron, and brilliant fired whiteness for export chinaware and insulators (Reference: Shyam Clay).",
    description: "Skyline Kaolin Clay Noodles are processed by blunging high-grade Kutch kaolinite, eliminating abrasive mica and free quartz, filter-pressing, and vacuum extruding into uniform noodles. Delivering over 37.5% Al2O3 and iron under 0.40%, these noodles provide excellent casting rate, high green strength, and brilliant fired whiteness (>90% at 1280°C). They are exported globally for automated porcelain dinnerware, high-voltage ceramic insulators, and sanitaryware manufacturing.",
    images: ["/uploads/shyam-china-clay-noodles.webp", "/uploads/shyam-hydrous-kaolin-clay.webp"],
    grades: ["Export Premium Noodle Grade (90% Fired Whiteness)", "Automated Pressure Casting Grade", "Tableware Porcelain Grade"],
    packaging: ["50 kg HDPE bags with inner liner", "1000 kg and 1250 kg export FIBC big bags with moisture barrier"],
    specifications: [
      { parameter: "Alumina (Al2O3)", value: "37.5% - 39.5% Min", testMethod: "XRF" },
      { parameter: "Iron Oxide (Fe2O3)", value: "< 0.40% Max", testMethod: "AAS" },
      { parameter: "Titanium Dioxide (TiO2)", value: "< 0.65% Max", testMethod: "Spectrophotometer" },
      { parameter: "Fired Whiteness @ 1280°C", value: "> 90.0%", testMethod: "Spectrophotometer" },
      { parameter: "Residue on 300 Mesh", value: "< 0.02% Max", testMethod: "Wet Screen" },
      { parameter: "Dry Modulus of Rupture (MOR)", value: "> 3.0 MPa", testMethod: "3-point Flexural" },
      { parameter: "Moisture Content", value: "10.0% - 12.0% Max", testMethod: "Gravimetric" }
    ],
    applications: [
      "Fine bone china and porcelain dinnerware tableware",
      "High-voltage electrical porcelain insulators and bushings",
      "Automated pressure casting sanitaryware production",
      "Ceramic body glazes, frit manufacturing, and engobes",
      "High-purity technical ceramics"
    ],
    features: [
      "Extruded noodle format guarantees zero dust emission during port handling and sea freight",
      "Fast dissolution in industrial blungers without lump formation",
      "Ultra-low iron gives pristine white firing color without grey shading",
      "High green strength enables complex thin-wall tableware handling without breakage"
    ],
    industries: ["Fine Chinaware & Tableware", "Electrical Porcelain", "Sanitaryware", "Technical Ceramics", "Export Ceramic Manufacturers"],
    seoTitle: "Kaolin Clay Noodles Manufacturer in India | Skyline Salt and Minerals",
    seoDescription: "Leading Kaolin Clay Noodles manufacturer and exporter in India. High-alumina (37.5%+) extruded kaolin noodles with >90% fired whiteness for chinaware & sanitaryware.",
    seoKeywords: "kaolin clay noodles manufacturers india, extruded kaolin noodles, porcelain clay noodles, shyam clay reference"
  },
  {
    id: "prod_kaolin_powder",
    name: "Kaolin Clay Powder (Superfine Micronized Kaolin)",
    slug: "kaolin-clay-powder",
    categoryId: "cat_kaolin",
    categorySlug: "kaolin",
    subcategoryId: "sub_kaolin_powder",
    isFeatured: true,
    isActive: true,
    shortDescription: "High-brightness micro-pulverized kaolin powder (2-micron average) for paints, rubber, paper coating, and masterbatches (Reference: Shyam Clay).",
    description: "Skyline Kaolin Clay Powder is an engineered mineral pigment manufactured by air-classifying water-washed kaolin to an average particle diameter of 2 microns. Featuring hexagonal platy morphology with high aspect ratio, this superfine powder improves opacity, suspension, film barrier, and scrub resistance in architectural paints. It also serves as an exceptional functional extender in automotive rubber seals, printing inks, and plastics.",
    images: ["/uploads/shyam-china-clay-powder.webp", "/uploads/shyam-calcined-kaolin.webp"],
    grades: ["Paint & Coating Superfine Grade (Hegman > 6)", "Rubber Reinforcing Micro-Grade", "Paper Coating Pigment Grade"],
    packaging: ["25 kg multi-wall craft paper bags with PE liner", "1000 kg palletized big bags with shrink wrapping"],
    specifications: [
      { parameter: "Brightness (ISO 2470)", value: "> 86.5%", testMethod: "ISO Brightness Meter" },
      { parameter: "Particle Size Distribution", value: "80% < 2 microns (d50: 1.2 µm)", testMethod: "Laser Diffraction (Malvern)" },
      { parameter: "Alumina (Al2O3)", value: "38.0% - 39.5%", testMethod: "XRF" },
      { parameter: "Silica (SiO2)", value: "45.5% - 47.0%", testMethod: "XRF" },
      { parameter: "Iron (Fe2O3)", value: "< 0.40% Max", testMethod: "AAS" },
      { parameter: "Oil Absorption", value: "42 - 48 g / 100g", testMethod: "ASTM D281" },
      { parameter: "Residue on 325 Mesh (45µm)", value: "< 0.01% Max", testMethod: "Sieve Shaker" }
    ],
    applications: [
      "Decorative emulsion paints (titanium dioxide extender and anti-settling aid)",
      "Automotive and industrial rubber compounding (improves tensile & tear strength)",
      "Coated paper and paperboard pigment coating",
      "Printing inks, gravure coatings, and functional adhesives",
      "Plastic masterbatches and polymer engineering compounding"
    ],
    features: [
      "Platy crystal structure reinforces polymer chains and improves paint film scrub resistance",
      "High brightness reduces expensive titanium dioxide (TiO2) pigment dosage by 15-20%",
      "Exceptional chemical inertness and resistance to weathering",
      "Free of crystalline silica quartz grit"
    ],
    industries: ["Paints & Coatings", "Rubber Compounding", "Paper Mills", "Printing Inks", "Plastics & Masterbatches"],
    seoTitle: "Kaolin Clay Powder Manufacturers in India | Superfine Kaolin Skyline",
    seoDescription: "Leading Kaolin Clay Powder manufacturer in India. Superfine 2-micron micronized kaolin with >86% brightness for paints, rubber, paper, and polymer masterbatches.",
    seoKeywords: "kaolin clay powder manufacturers india, micronized kaolin powder, paint grade kaolin, rubber filler kaolin, shyam clay reference"
  },
  {
    id: "prod_calcined_kaolin_powder",
    name: "Calcined Kaolin Powder (Anhydrous 90-93% GE Brightness)",
    slug: "calcined-kaolin-powder",
    categoryId: "cat_kaolin",
    categorySlug: "kaolin",
    subcategoryId: "sub_calcined_kaolin",
    isFeatured: true,
    isActive: true,
    shortDescription: "High-brightness dehydroxylated anhydrous kaolin (90-93% GE) engineered at 1050°C for TiO2 extension, paints, and cables (Reference: Shyam Clay).",
    description: "Skyline Calcined Kaolin Powder is produced by high-temperature thermal dehydroxylation of ultra-pure hydrous kaolin inside automated rotary kilns at 1050°C. This thermal restructuring eliminates structural hydroxyls, creating an engineered anhydrous mineral with remarkable light-scattering void structures, superior opacity, and high GE brightness (90-93%). It functions as a premium titanium dioxide (TiO2) extender in premium paints, wire & cable dielectric insulation, and thermal paper coatings.",
    images: ["/uploads/shyam-calcined-kaolin.webp", "/uploads/shyam-china-clay-powder.webp"],
    grades: ["Paint Grade Premium Calcined (92-93% GE)", "Wire & Cable Dielectric Grade", "Thermal Paper Coating Grade"],
    packaging: ["25 kg paper bags with inner PE barrier", "1000 kg Jumbo bulk bags on wooden pallets"],
    specifications: [
      { parameter: "GE Brightness (TAPPI T646)", value: "90.0% - 93.0%", testMethod: "Directional Reflectance" },
      { parameter: "Alumina (Al2O3)", value: "43.0% - 46.0%", testMethod: "XRF" },
      { parameter: "Silica (SiO2)", value: "51.0% - 54.0%", testMethod: "XRF" },
      { parameter: "Residue on 325 Mesh (45 micron)", value: "< 0.01% Max (100 ppm)", testMethod: "Wet Screen" },
      { parameter: "Bulk Density", value: "0.35 - 0.45 g/cm³", testMethod: "Tapped Density" },
      { parameter: "Oil Absorption", value: "52 - 62 g / 100g", testMethod: "Gardner-Coleman" },
      { parameter: "Volume Resistivity @ 25°C", value: "> 1 x 10¹³ Ohm·cm", testMethod: "Dielectric Test" }
    ],
    applications: [
      "Architectural and automotive paints (extends expensive TiO2 up to 25% without loss of opacity)",
      "High-voltage PVC, EPR, and XLPE wire and cable insulation",
      "Thermal paper, carbonless copy paper, and graphic arts coating",
      "Engineering plastics (nylon, polypropylene, polyamides) for flexural modulus enhancement",
      "Electrophoretic primers and anti-corrosive industrial coatings"
    ],
    features: [
      "Engineered porous micro-aggregates provide superior light refraction and opacity",
      "Replaces up to 25% of TiO2 white pigment, substantially reducing formulation costs",
      "High electrical volume resistivity prevents breakdown in submarine and power cables",
      "Low abrasiveness protects high-speed industrial printing and compounding equipment"
    ],
    industries: ["Paints & Coatings", "Wire & Cable Insulation", "Paper & Graphic Arts", "Engineering Plastics", "Industrial Coatings"],
    seoTitle: "Calcined Kaolin Powder Manufacturer in Gujarat | Skyline Salt and Minerals",
    seoDescription: "Leading Calcined Kaolin Powder manufacturer in Gujarat. 90-93% GE brightness anhydrous kaolin for titanium dioxide replacement in paints, paper, and cables.",
    seoKeywords: "calcined kaolin powder manufacturer gujarat, anhydrous kaolin, tio2 extender, wire cable kaolin, shyam clay reference"
  },
  {
    id: "prod_hydrous_kaolin_clay",
    name: "Hydrous Kaolin Clay (Ultra-Fine Water-Washed Kaolin)",
    slug: "hydrous-kaolin-clay",
    categoryId: "cat_kaolin",
    categorySlug: "kaolin",
    subcategoryId: "sub_hydrous_kaolin",
    isFeatured: true,
    isActive: true,
    shortDescription: "Ultra-fine water-washed hydrous kaolin retaining crystalline water for paper coating, flexographic inks, and adhesives (Reference: Shyam Clay).",
    description: "Skyline Hydrous Kaolin Clay is beneficiated via sophisticated wet centrifugation to preserve its natural crystal lattice and stoichiometric water of crystallization (13.5% LOI). Its delicate hexagonal plates deliver exceptional gloss, ink holdout, and high-shear rheological stability. It is the premier choice for blade and air-knife paper coating, high-gloss flexographic inks, and water-borne industrial adhesives.",
    images: ["/uploads/shyam-hydrous-kaolin-clay.webp", "/uploads/shyam-levigated-clay.webp"],
    grades: ["Paper Coating Grade 1 (90% < 2µm)", "Ink & Adhesive Grade", "Standard Hydrous Filler Grade"],
    packaging: ["25 kg laminated paper bags", "1000 kg export big bags with moisture-proof lining"],
    specifications: [
      { parameter: "Alumina (Al2O3)", value: "38.2% - 39.5% Min", testMethod: "Chemical Analysis" },
      { parameter: "Silica (SiO2)", value: "45.0% - 47.0%", testMethod: "XRF" },
      { parameter: "Loss on Ignition (LOI)", value: "13.2% - 13.8%", testMethod: "1000°C Muffle" },
      { parameter: "ISO Brightness", value: "> 87.0%", testMethod: "ISO 2470" },
      { parameter: "Aspect Ratio", value: "> 20:1 (Delaminated morphology)", testMethod: "SEM Analysis" },
      { parameter: "pH Value (10% slurry)", value: "6.5 - 7.5", testMethod: "pH Meter" }
    ],
    applications: [
      "High-speed blade and roll coating for art paper, magazine paper, and packaging board",
      "Flexographic, gravure, and offset printing inks",
      "Pressure-sensitive and water-based packaging adhesives",
      "High-gloss architectural paint finishes",
      "Agricultural fruit protection sprays (kaolin sun barrier film)"
    ],
    features: [
      "Thin, wide hexagonal platelets provide exceptional barrier against moisture and air",
      "Imparts superior print gloss, smoothness, and uniform ink absorption on coated paper",
      "High solids slurry (up to 70%) with low Brookfield viscosity",
      "Certified under ISO 9001:2015 quality manufacturing standards"
    ],
    industries: ["Paper Coating & Board", "Printing Inks", "Packaging Adhesives", "Specialty Paints", "Agrochemical Barriers"],
    seoTitle: "Hydrous Kaolin Clay Manufacturer in India | Water Washed Kaolin Skyline",
    seoDescription: "Leading Hydrous Kaolin Clay manufacturer and exporter in India. Ultra-fine water-washed kaolin with >87% brightness for paper coating, inks, and adhesives.",
    seoKeywords: "hydrous clay manufacturer in india, water washed kaolin, paper coating clay, hydrous kaolin supplier, shyam clay reference"
  },
  {
    id: "prod_reactive_metakaolin",
    name: "Highly Reactive Metakaolin (Engineered Pozzolan)",
    slug: "reactive-metakaolin",
    categoryId: "cat_kaolin",
    categorySlug: "kaolin",
    subcategoryId: "sub_reactive_metakaolin",
    isFeatured: false,
    isActive: true,
    shortDescription: "Engineered amorphous pozzolan for ultra-high performance concrete, GFRC, and marine structures.",
    description: "Skyline Highly Reactive Metakaolin is an engineered amorphous aluminosilicate pozzolan produced by flash calcination of purified kaolin. It reacts vigorously with free calcium hydroxide released during Portland cement hydration, forming additional calcium silicate hydrate (C-S-H) gel that refines pore structure, enhances 28-day compressive strength by up to 35%, and eliminates efflorescence in architectural concrete and marine docks.",
    images: ["/uploads/shyam-calcined-kaolin.webp", "/uploads/shyam-refractory-clay.webp"],
    grades: ["Ultra-High Performance Concrete (UHPC) Grade", "Glass Fiber Reinforced Concrete (GFRC) Grade"],
    packaging: ["25 kg paper bags with poly liner", "1000 kg Big bags"],
    specifications: [
      { parameter: "Sum of Oxides (SiO2 + Al2O3 + Fe2O3)", value: "> 90.0%", testMethod: "ASTM C618 Class N" },
      { parameter: "Strength Activity Index (28 Days)", value: "> 115%", testMethod: "ASTM C311" },
      { parameter: "BET Specific Surface Area", value: "15 - 20 m²/g", testMethod: "BET N2" },
      { parameter: "Loss on Ignition (LOI)", value: "< 1.5%", testMethod: "Gravimetric" }
    ],
    applications: [
      "High-performance concrete (bridges, marine piles, dams, tunnels)",
      "Glass fiber reinforced concrete (GFRC) architectural panels",
      "Self-leveling floor screeds, grouts, and repair mortars"
    ],
    features: [
      "Reacts rapidly to consume free lime, completely eliminating concrete efflorescence",
      "Drastically reduces chloride ion penetration, protecting steel reinforcement from corrosion",
      "Increases early and ultimate compressive and flexural strength",
      "Improves surface finish and pigment dispersion in architectural precast"
    ],
    industries: ["Infrastructure & Ready-Mix Concrete", "Precast & GFRC", "Marine Construction", "Specialty Mortars"],
    seoTitle: "Highly Reactive Metakaolin Manufacturer | Pozzolan Skyline",
    seoDescription: "Engineered Reactive Metakaolin pozzolan for ultra-high-strength concrete, GFRC, and marine durability. ASTM C618 compliant.",
    seoKeywords: "metakaolin manufacturer gujarat, reactive pozzolan, gfrc metakaolin, high strength concrete"
  }
];

// Refractory Clay & other minerals (4 products - with Silica Sand & Quartz Powder excluded)
const otherMineralProducts = [
  {
    id: "prod_refractory_clay",
    name: "Refractory Clay (High Alumina Fire Clay)",
    slug: "refractory-clay",
    categoryId: "cat_other_minerals",
    categorySlug: "other-minerals",
    subcategoryId: "sub_refractory_clay",
    isFeatured: true,
    isActive: true,
    shortDescription: "High-temperature refractory plastic fire clay withstanding up to 1700°C for fire bricks, ladles, and kilns (Reference: Shyam Clay).",
    description: "Skyline Refractory Clay is mined from select high-alumina seams in Kutch. Retaining high plasticity and exceptional refractoriness (PCE Orton Cone 31-33), it withstands extreme service temperatures up to 1700°C without vitrification or slump failure. It is the premier bonding clay for refractory fire brick plants, induction furnace ladles, rotary cement kilns, and glass tank insulation.",
    images: ["/uploads/shyam-refractory-clay.webp", "/uploads/shyam-china-clay-lumps.webp"],
    grades: ["Super Duty Fire Clay (PCE > 32)", "High Alumina Grog Bonding Grade", "Furnace Mortar Grade"],
    packaging: ["50 kg HDPE bags with inner liner", "1000 kg Jumbo bulk bags"],
    specifications: [
      { parameter: "Pyrometric Cone Equivalent (PCE)", value: "Orton Cone 31 - 33 (1680°C - 1730°C)", testMethod: "IS: 1528" },
      { parameter: "Alumina (Al2O3)", value: "38.0% - 42.0% Min", testMethod: "XRF" },
      { parameter: "Silica (SiO2)", value: "50.0% - 54.0%", testMethod: "XRF" },
      { parameter: "Iron Oxide (Fe2O3)", value: "< 1.20% Max", testMethod: "AAS" },
      { parameter: "Loss on Ignition (LOI)", value: "11.5% - 13.0%", testMethod: "Gravimetric at 1000°C" },
      { parameter: "Apparent Porosity (Fired)", value: "18.0% - 22.0%", testMethod: "IS: 1528" }
    ],
    applications: [
      "Manufacturing of dense fire clay refractory bricks and shapes",
      "High-temperature refractory bonding mortars and patching compounds",
      "Blast furnace tap-hole clays and foundry ladle linings",
      "Rotary cement kilns, lime kilns, and petcoke calcining furnaces",
      "Glass tank recuperator and regenerator insulation"
    ],
    features: [
      "Withstands continuous furnace thermal stress exceeding 1680°C without spalling",
      "High plasticity allows deep grog addition without losing workability",
      "Low iron content prevents carbon monoxide disintegration at elevated temperatures",
      "Available in crushed lumps or finely pulverized powder form"
    ],
    industries: ["Refractory Fire Bricks", "Iron & Steel Plants", "Cement & Lime Kilns", "Glass Manufacturing", "Foundries"],
    seoTitle: "Refractory Clay Manufacturer in Gujarat | High Alumina Fire Clay Skyline",
    seoDescription: "Leading Refractory Clay manufacturer in Gujarat. High alumina (38-42%) fire clay withstanding up to 1700°C for refractory bricks, ladles, and kilns. Shyam Clay reference.",
    seoKeywords: "refractory clay manufacturer gujarat, high alumina fire clay, furnace refractory clay, kutch refractory clay, shyam clay reference"
  },
  {
    id: "prod_silica_ramming_mass",
    name: "Silica Ramming Mass & Acidic Refractory Lining",
    slug: "silica-ramming-mass",
    categoryId: "cat_other_minerals",
    categorySlug: "other-minerals",
    subcategoryId: "sub_ramming_mass",
    isFeatured: true,
    isActive: true,
    shortDescription: "Pre-mixed acidic refractory ramming mass with boric acid sintering binder for induction furnaces melting carbon and alloy steel.",
    description: "Skyline Silica Ramming Mass is formulated from high-purity crystalline quartz grains blended with pre-mixed, calibrated boric acid binder. Engineered with dense packing granulometry, it forms a monolithic, non-wetting acidic lining inside coreless induction furnaces, resisting thermal shock, metal penetration, and slag attack during high-temperature steel melting.",
    images: ["/uploads/shyam-refractory-clay.webp", "/uploads/kbc-refractory-bentonite-1.jpg"],
    grades: ["Pre-mixed 0.8% Boric Acid Binder Grade", "Pre-mixed 1.2% Boric Acid Grade", "Dry Premix Stainless Steel Grade"],
    packaging: ["50 kg HDPE bags with moisture-proof liner", "1000 kg Jumbo bulk bags"],
    specifications: [
      { parameter: "Silica (SiO2)", value: "98.80% Min", testMethod: "IS: 1528" },
      { parameter: "Alumina (Al2O3)", value: "< 0.45%", testMethod: "XRF" },
      { parameter: "Iron Oxide (Fe2O3)", value: "< 0.10%", testMethod: "AAS" },
      { parameter: "Operating Service Temperature", value: "Up to 1700°C", testMethod: "Furnace Operation" }
    ],
    applications: [
      "Coreless induction furnace lining for melting plain carbon steel and ductile iron",
      "Stainless steel and alloy steel scrap melting crucibles",
      "Foundry ladle linings"
    ],
    features: [
      "High refractoriness withstanding severe thermal shock and metal turbulence",
      "Pre-mixed with precision-dosed binder for uniform sintering without manual mixing errors",
      "Low thermal conductivity retains heat, reducing electrical energy consumption per heat"
    ],
    industries: ["Steel Induction Furnaces", "Iron Foundries", "Alloy Steel Casting"],
    seoTitle: "Silica Ramming Mass Manufacturer | Refractory Lining Skyline",
    seoDescription: "Pre-mixed Silica Ramming Mass with boric acid binder for coreless induction furnaces melting carbon and stainless steel. Up to 1700°C.",
    seoKeywords: "silica ramming mass, induction furnace lining, acidic refractory, steel casting refractory"
  },
  {
    id: "prod_industrial_gypsum_granules",
    name: "Industrial Gypsum Granules & Powder",
    slug: "industrial-gypsum-granules",
    categoryId: "cat_other_minerals",
    categorySlug: "other-minerals",
    subcategoryId: "sub_gypsum",
    isFeatured: false,
    isActive: true,
    shortDescription: "High-purity natural calcium sulfate dihydrate (CaSO4·2H2O) for cement retardation, plaster, and agriculture.",
    description: "Skyline Industrial Gypsum is processed from high-purity natural mineral deposits. Containing 88-94% calcium sulfate dihydrate, it serves as the essential retarder in Portland cement clinker grinding to control setting time, as well as an optimal agricultural soil conditioner for sodic and alkaline soils.",
    images: ["/uploads/kbc-bentonite-granules-1.png", "/uploads/skc-coarse-salt-scoop.jpg"],
    grades: ["Cement Clinker Retarder Granules (10 - 50 mm)", "Agricultural Gypsum Powder (Passing 100 Mesh)"],
    packaging: ["50 kg HDPE bags", "1000 kg Jumbo bulk bags", "Bulk tipper trucks"],
    specifications: [
      { parameter: "Calcium Sulfate Dihydrate (CaSO4·2H2O)", value: "88.0% - 94.0% Min", testMethod: "IS: 1288" },
      { parameter: "Purity (as CaSO4)", value: "> 70.0%", testMethod: "Chemical Assay" },
      { parameter: "Combined Water", value: "> 18.0%", testMethod: "Gravimetric at 230°C" },
      { parameter: "Free Moisture", value: "< 1.5% Max", testMethod: "Gravimetric at 45°C" }
    ],
    applications: [
      "Portland cement clinker grinding (controls flash set and regulates hydration time)",
      "Agricultural reclamation of sodic soils and calcium/sulfur fertilization",
      "Plaster of Paris (POP) manufacturing and gypsum wallboard production"
    ],
    features: [
      "High natural purity ensuring consistent setting regulation in cement mills",
      "Low moisture prevents jamming in clinker weigh feeders and conveyors",
      "Improves soil flocculation and water infiltration in tight clay soils"
    ],
    industries: ["Cement Plants", "Agriculture & Soil Reclamation", "Construction Plasters"],
    seoTitle: "Industrial Gypsum Manufacturer | Cement Retarder Gypsum Skyline",
    seoDescription: "High-purity natural gypsum granules & powder (88-94% CaSO4·2H2O) for cement clinker retardation and agricultural soil conditioning.",
    seoKeywords: "industrial gypsum manufacturer, cement retarder gypsum, agricultural gypsum powder"
  },
  {
    id: "prod_potassium_sodium_feldspar",
    name: "Potassium & Sodium Feldspar (Lumps & Powder)",
    slug: "potassium-sodium-feldspar",
    categoryId: "cat_other_minerals",
    categorySlug: "other-minerals",
    subcategoryId: "sub_feldspar",
    isFeatured: false,
    isActive: true,
    shortDescription: "High-grade alkali alumina-silicate mineral flux for ceramic tile body vitrification and glass container batching.",
    description: "Skyline Feldspar is mined from high-grade pegmatite deposits and sorted into potash and soda grades. Possessing combined alkali content exceeding 12% with ultra-low iron (<0.15%), it functions as a primary fluxing mineral that lowers firing temperatures, promotes liquid-phase vitrification, and imparts mechanical translucency to ceramic bodies and glass containers.",
    images: ["/uploads/shyam-china-clay-lumps.webp", "/uploads/shyam-china-clay-powder.webp"],
    grades: ["Potassium Feldspar (K2O > 11%)", "Sodium Feldspar (Na2O > 9%)", "200 & 300 Mesh Ceramic Glaze Powder"],
    packaging: ["50 kg HDPE bags", "1000 kg Jumbo bulk bags"],
    specifications: [
      { parameter: "Total Alkali (K2O + Na2O)", value: "> 12.0%", testMethod: "Flame Photometry" },
      { parameter: "Iron Oxide (Fe2O3)", value: "< 0.15% Max", testMethod: "AAS" },
      { parameter: "Silica (SiO2)", value: "66.0% - 68.0%", testMethod: "XRF" },
      { parameter: "Alumina (Al2O3)", value: "17.5% - 19.0%", testMethod: "XRF" }
    ],
    applications: [
      "Ceramic vitrified floor and wall tiles (body flux)",
      "Container glass, float glass, and fiberglass batch compounding",
      "Sanitaryware bodies, glazes, and porcelain tableware"
    ],
    features: [
      "High alkali content drastically lowers thermal melting and firing temperature",
      "Extremely low iron (<0.15%) guarantees optical clarity in glass and white firing in ceramics",
      "Low quartz free-silica residue"
    ],
    industries: ["Ceramic Tiles", "Glass Manufacturing", "Sanitaryware Glazes"],
    seoTitle: "Feldspar Manufacturer in Gujarat | Potassium & Sodium Feldspar Skyline",
    seoDescription: "Leading Potash and Soda Feldspar manufacturer in Gujarat. High alkali (>12%) and low iron (<0.15%) lumps and powder for ceramics and glass batching.",
    seoKeywords: "potash feldspar manufacturer gujarat, sodium feldspar, ceramic fluxing mineral, glass grade feldspar"
  }
];

// Existing Industrial & Edible Salt products (22) + Bentonite products (26)
const saltAndBentoniteProducts = db.products.filter(p => 
  p.categoryId === 'cat_industrial_salt' || 
  p.categoryId === 'cat_edible_salt' || 
  p.categoryId === 'cat_bentonite'
);

console.log(`Preserving ${saltAndBentoniteProducts.length} Salt and Bentonite products.`);

// Combine all products: 10 Industrial Salt + 12 Edible Salt + 26 Bentonite + 5 China Clay + 5 Kaolin + 4 Other Minerals = 62 products!
const allProducts = [
  ...saltAndBentoniteProducts,
  ...chinaClayProducts,
  ...kaolinProducts,
  ...otherMineralProducts
];

// Update subcategories in categories
const updatedCategories = db.categories.map(cat => {
  if (cat.id === 'cat_china_clay') {
    return {
      ...cat,
      name: "China Clay",
      slug: "china-clay",
      description: "Premium levigated, washed, and extruded China Clay (Kaolinite) lumps, powder, and noodles (Reference: Shyam Clay).",
      subcategories: [
        { id: "sub_clay_lumps", name: "China Clay Lumps", slug: "china-clay-lumps", description: "Selected high-purity natural white China Clay Lumps (35-38% Al2O3)" },
        { id: "sub_clay_powder", name: "China Clay Powder", slug: "china-clay-powder", description: "Finely micronized air-classified kaolin powder (300-500 mesh)" },
        { id: "sub_clay_noodles", name: "China Clay Noodles", slug: "china-clay-noodles", description: "Levigated extruded noodles with 36-39% Al2O3 and <0.05% grit" },
        { id: "sub_crude_clay", name: "Crude China Clay", slug: "crude-china-clay", description: "Direct mine run raw kaolin with high plasticity" },
        { id: "sub_levigated_clay", name: "Levigated China Clay", slug: "levigated-china-clay", description: "Hydro-washed beneficiated kaolin cleansed of quartz grit" }
      ]
    };
  }

  if (cat.id === 'cat_kaolin') {
    return {
      ...cat,
      name: "Kaolin Clay",
      slug: "kaolin",
      description: "Engineered calcined, hydrous, and micronized kaolin pigments delivering superior brightness (90-93% GE) and opacity (Reference: Shyam Clay).",
      subcategories: [
        { id: "sub_kaolin_noodles", name: "Kaolin Clay Noodles", slug: "kaolin-clay-noodles", description: "Refined extruded kaolin noodles with >90% fired whiteness" },
        { id: "sub_kaolin_powder", name: "Kaolin Clay Powder", slug: "kaolin-clay-powder", description: "Superfine 2-micron kaolin powder for paints and rubber" },
        { id: "sub_calcined_kaolin", name: "Calcined Kaolin Powder", slug: "calcined-kaolin-powder", description: "High-brightness dehydroxylated anhydrous kaolin (90-93% GE)" },
        { id: "sub_hydrous_kaolin", name: "Hydrous Kaolin Clay", slug: "hydrous-kaolin-clay", description: "Ultra-fine water-washed kaolin for paper coating and inks" },
        { id: "sub_reactive_metakaolin", name: "Highly Reactive Metakaolin", slug: "reactive-metakaolin", description: "Engineered pozzolanic mineral for high-strength concrete" }
      ]
    };
  }

  if (cat.id === 'cat_other_minerals') {
    return {
      ...cat,
      name: "Refractory & Industrial Minerals",
      slug: "other-minerals",
      description: "High-temperature refractory clay, silica ramming mass, gypsum, and feldspar (Excluding Silica Sand & Silica Quartz Powder as requested).",
      subcategories: [
        { id: "sub_refractory_clay", name: "Refractory Clay", slug: "refractory-clay", description: "High alumina fire clay withstanding up to 1730°C (Shyam Clay reference)" },
        { id: "sub_ramming_mass", name: "Silica Ramming Mass", slug: "silica-ramming-mass", description: "Pre-mixed acidic refractory lining for induction furnaces" },
        { id: "sub_gypsum", name: "Industrial Gypsum Granules", slug: "industrial-gypsum-granules", description: "Natural calcium sulfate dihydrate for cement retardation" },
        { id: "sub_feldspar", name: "Potassium & Sodium Feldspar", slug: "potassium-sodium-feldspar", description: "Alkali flux mineral for ceramic vitrification and glass" }
      ]
    };
  }

  return cat;
});

db.products = allProducts;
db.categories = updatedCategories;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Database updated! Total products: ${allProducts.length}`);
console.log(`- China Clay products: ${allProducts.filter(p => p.categorySlug === 'china-clay').length}`);
console.log(`- Kaolin products: ${allProducts.filter(p => p.categorySlug === 'kaolin').length}`);
console.log(`- Other Minerals products: ${allProducts.filter(p => p.categorySlug === 'other-minerals').length}`);

// Sync seedData.js
const seedContent = 'module.exports = ' + JSON.stringify(db, null, 2) + ';\n';
fs.writeFileSync(path.join(__dirname, 'data', 'seedData.js'), seedContent, 'utf8');
console.log('Synchronized seedData.js!');

