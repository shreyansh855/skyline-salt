const fs = require('fs');
const path = require('path');

const kbcScraped = require('./scraped_kbc_data.json');
const kbcImagesMap = require('./kbc_downloaded_map.json');

// Technical specifications templates tailored for each bentonite application
const bentoniteSpecs = {
  "bentonite-powder": [
    { parameter: "Montmorillonite Content", value: "85% - 90% Min", testMethod: "XRD Analysis" },
    { parameter: "Free Swelling Index", value: "28 - 35 ml/2g", testMethod: "ASTM D5890" },
    { parameter: "Liquid Limit", value: "450% - 600%", testMethod: "IS: 2720 (Part 5)" },
    { parameter: "Moisture Content", value: "10% - 12% Max", testMethod: "IS: 2720" },
    { parameter: "Particle Fineness (Pass 200 Mesh / 75 micron)", value: "90% - 95% Min", testMethod: "Wet Sieve Analysis" },
    { parameter: "pH Value (5% aqueous suspension)", value: "8.5 - 10.5", testMethod: "pH Meter" },
    { parameter: "Cation Exchange Capacity (CEC)", value: "75 - 90 meq/100g", testMethod: "Methylene Blue Method" }
  ],
  "sodium-bentonite": [
    { parameter: "Natural Sodium Exchange Cations", value: "Dominant Na⁺ Exchangeable", testMethod: "AAS / ICP" },
    { parameter: "Swelling Volume", value: "30 - 40 ml/2g", testMethod: "ASTM D5890" },
    { parameter: "Gel Index", value: "70 - 85 ml", testMethod: "Lab Standard" },
    { parameter: "Moisture Content", value: "9% - 12% Max", testMethod: "Gravimetric at 105°C" },
    { parameter: "Fineness (Passing 200 Mesh)", value: "92% Min", testMethod: "Sieve Shaker" },
    { parameter: "Permeability Coefficient", value: "< 1 x 10⁻⁹ cm/sec", testMethod: "Hydraulic Permeameter" }
  ],
  "calcium-bentonite": [
    { parameter: "Exchangeable Cation", value: "Dominant Calcium (Ca²⁺)", testMethod: "Flame Photometry" },
    { parameter: "Swelling Capacity", value: "6 - 12 ml/2g (Low Swelling)", testMethod: "ASTM D5890" },
    { parameter: "Bleaching & Decolorizing Power", value: "High Activated Grade", testMethod: "Spectrophotometric" },
    { parameter: "Specific Surface Area", value: "120 - 180 m²/g", testMethod: "BET N2 Adsorption" },
    { parameter: "Moisture Content", value: "8% - 10% Max", testMethod: "Gravimetric" },
    { parameter: "pH (10% suspension)", value: "6.5 - 7.8 (Neutral)", testMethod: "pH Meter" }
  ],
  "oil-drilling-bentonite": [
    { parameter: "Suspension Properties (API 13A Sec 9)", value: "Compliant", testMethod: "API 13A" },
    { parameter: "Viscometer Dial Reading @ 600 rpm", value: "30 Min", testMethod: "Fann 35 Viscometer" },
    { parameter: "Yield Point / Plastic Viscosity Ratio", value: "< 3.0", testMethod: "API RP 13B-1" },
    { parameter: "Filtrate Loss (API Fluid Loss)", value: "< 15.0 cm³", testMethod: "Standard Filter Press" },
    { parameter: "Residue on 200 Mesh (75 micron)", value: "< 4.0% Max", testMethod: "Wet Screen" },
    { parameter: "Moisture Content", value: "10% Max", testMethod: "API 13A Standard" }
  ],
  "drilling-bentonite": [
    { parameter: "Viscometer Reading @ 600 rpm", value: "30 Min", testMethod: "API 13A" },
    { parameter: "Barrel Yield", value: "90 - 100 Barrels/Ton", testMethod: "API 13A Calculation" },
    { parameter: "Fluid Loss (30 min @ 100 psi)", value: "< 14.5 ml", testMethod: "API Filter Press" },
    { parameter: "Grit Content (Residue > 75 micron)", value: "< 2.5%", testMethod: "ASTM Sieve" },
    { parameter: "Moisture Content", value: "9.0% - 11.0%", testMethod: "Gravimetric" }
  ],
  "piling-bentonite": [
    { parameter: "Liquid Limit", value: "> 450%", testMethod: "IS: 2720 (Part 5)" },
    { parameter: "Plasticity Index", value: "> 350%", testMethod: "IS: 2720" },
    { parameter: "Marsh Funnel Viscosity (6% Slurry)", value: "38 - 45 seconds", testMethod: "Marsh Funnel" },
    { parameter: "Filter Cake Thickness", value: "< 1.5 mm", testMethod: "API Filter Press" },
    { parameter: "Sand Content in Slurry", value: "< 1.0%", testMethod: "Sand Content Kit" },
    { parameter: "Fineness (Passing 200 Mesh)", value: "> 90%", testMethod: "IS: 2720" }
  ],
  "hdd-bentonite": [
    { parameter: "Yield Point", value: "> 25 lbs/100 sq ft", testMethod: "Fann Viscometer" },
    { parameter: "Fluid Loss Control", value: "< 12 ml", testMethod: "API Filter Press" },
    { parameter: "Gel Strength (10 sec / 10 min)", value: "12 / 24 lbs/100 sq ft", testMethod: "Fann 35" },
    { parameter: "Cuttings Carrying Capacity", value: "High (High Yield Thixotropy)", testMethod: "Rheology Evaluation" },
    { parameter: "Marsh Funnel Viscosity", value: "45 - 60 seconds", testMethod: "Marsh Funnel" }
  ],
  "api-bentonite": [
    { parameter: "API 13A Section 9 Standard", value: "Full Compliance", testMethod: "API Spec 13A" },
    { parameter: "600 RPM Dial Reading", value: ">= 30", testMethod: "Direct Indicating Viscometer" },
    { parameter: "YP / PV Ratio", value: "<= 3.0", testMethod: "Calculated" },
    { parameter: "Filtrate Volume", value: "<= 15.0 ml", testMethod: "Standard Low Pressure" },
    { parameter: "Residue on 75 µm sieve", value: "<= 4.0 wt%", testMethod: "Wet Screen" },
    { parameter: "Moisture Content", value: "<= 10.0 wt%", testMethod: "Gravimetric" }
  ],
  "micro-tunnelling-bentonite": [
    { parameter: "Thixotropic Gel Formation", value: "Rapid (< 15 seconds)", testMethod: "Shearometer" },
    { parameter: "Slurry Specific Gravity", value: "1.04 - 1.08 g/cm³", testMethod: "Mud Balance" },
    { parameter: "Lubricating Friction Reduction", value: "> 40% coefficient reduction", testMethod: "Pipe Jacking Rig Test" },
    { parameter: "Face Support Pressure Stability", value: "High Impermeable Membrane", testMethod: "Filter Cake Test" },
    { parameter: "Grit Content", value: "< 1.5%", testMethod: "Wet Sieve" }
  ],
  "foundry-bentonite": [
    { parameter: "Green Compression Strength (GCS)", value: "11.0 - 14.5 N/cm² (16 - 21 psi)", testMethod: "AFS Standard" },
    { parameter: "Dry Compression Strength (DCS)", value: "50 - 75 N/cm²", testMethod: "AFS Standard" },
    { parameter: "Wet Tensile Strength", value: "0.22 - 0.32 N/cm²", testMethod: "George Fischer Tester" },
    { parameter: "Thermal Durability / Active Clay Loss", value: "> 75% retention @ 500°C", testMethod: "Thermal Muffle" },
    { parameter: "Liquid Limit", value: "> 550%", testMethod: "IS: 2720" },
    { parameter: "Moisture Content", value: "9% - 11%", testMethod: "AFS 210-00-S" }
  ],
  "iron-ore-pelletization-bentonite": [
    { parameter: "Wet Pellet Drop Number (from 45 cm)", value: "12 - 18 drops", testMethod: "Pellet Drop Tester" },
    { parameter: "Wet Pellet Compressive Strength", value: "1.2 - 1.8 kg/pellet", testMethod: "Compression Gauge" },
    { parameter: "Dry Pellet Compressive Strength", value: "5.0 - 7.5 kg/pellet", testMethod: "Pellet Strength Tester" },
    { parameter: "Pre-heating Crushing Strength", value: "> 25 kg/pellet", testMethod: "High Temp Furnace" },
    { parameter: "Swelling Index", value: "> 30 ml/2g", testMethod: "ASTM D5890" },
    { parameter: "Moisture Content", value: "8% - 10%", testMethod: "Gravimetric" }
  ],
  "attapulgite-clay": [
    { parameter: "Mineral Identity", value: "Hydrated Magnesium Aluminum Silicate (Palygorskite)", testMethod: "XRD / SEM" },
    { parameter: "Saline & Saltwater Yield", value: "> 100 bbl/ton in Saturated Brine", testMethod: "API 13A Section 11" },
    { parameter: "Apparent Viscosity in Saltwater", value: "> 30 cP", testMethod: "Fann 35" },
    { parameter: "Thermal Stability", value: "Up to 250°C", testMethod: "Oven Aging" },
    { parameter: "Moisture Content", value: "8% - 12%", testMethod: "Gravimetric" }
  ],
  "refractory-bentonite": [
    { parameter: "Pyrometric Cone Equivalent (PCE)", value: "Orton Cone 26 - 28 (1580°C - 1615°C)", testMethod: "IS: 1528" },
    { parameter: "Alumina (Al2O3)", value: "18.0% - 22.0%", testMethod: "XRF" },
    { parameter: "Silica (SiO2)", value: "52.0% - 56.0%", testMethod: "XRF" },
    { parameter: "High-Temperature Plasticity Index", value: "Excellent", testMethod: "Pfefferkorn Apparatus" },
    { parameter: "Bonding Strength @ 1200°C", value: "> 35 MPa", testMethod: "Refractory Modulus of Rupture" }
  ],
  "ceramics-bentonite": [
    { parameter: "Dry Modulus of Rupture (MOR)", value: "4.5 - 6.5 MPa", testMethod: "3-point Bending Test" },
    { parameter: "Iron Content (Fe2O3)", value: "< 1.2% (Low Iron Grade)", testMethod: "XRF" },
    { parameter: "Fired Color / Whiteness @ 1200°C", value: "Creamy White to Buff", testMethod: "Spectrophotometer" },
    { parameter: "Plasticity Water Requirement", value: "28% - 34%", testMethod: "Atterberg Limits" },
    { parameter: "Fineness (Pass 325 Mesh / 45µm)", value: "> 98%", testMethod: "Wet Screen" }
  ],
  "earthing-bentonite": [
    { parameter: "Soil Electrical Resistivity (compacted)", value: "< 2.0 Ohm-meters (typically 1.2 - 1.8 Ω·m)", testMethod: "Wenner 4-Pin Method" },
    { parameter: "Moisture Retention Capacity", value: "> 300% of dry weight", testMethod: "Water Absorption Test" },
    { parameter: "Corrosion Potential on Copper/Steel", value: "Non-corrosive (pH 8.5 - 10.0)", testMethod: "Copper Strip Test" },
    { parameter: "Leaching & Environmental Toxicity", value: "Zero Leaching, Eco-Safe", testMethod: "TCLP Analysis" },
    { parameter: "Setting & Shrinkage Resistance", value: "Non-shrinking dense conductive gel", testMethod: "Drying Chamber" }
  ],
  "fertilizers-bentonite": [
    { parameter: "Granule Size Distribution", value: "2.0 mm - 4.5 mm (95% retention)", testMethod: "Sieve Shaker" },
    { parameter: "Water Dispersibility Rate", value: "Rapid (< 45 seconds)", testMethod: "Standard Disintegration" },
    { parameter: "Binder Strength (Puddle Hardness)", value: "> 3.5 kg/granule", testMethod: "Hardness Tester" },
    { parameter: "Sulfur / Micronutrient Compatibility", value: "100% Inert Carrier", testMethod: "Chemical Assay" },
    { parameter: "Moisture Content", value: "6.0% - 8.0%", testMethod: "Gravimetric" }
  ],
  "animal-feed-bentonite": [
    { parameter: "Aflatoxin B1 Mycotoxin Adsorption", value: "> 95% Binding Efficiency", testMethod: "In Vitro Adsorption Assay" },
    { parameter: "Heavy Metals (Lead, Cadmium, Arsenic)", value: "< 5 ppm Total (Meets EU / Codex limits)", testMethod: "ICP-MS" },
    { parameter: "Pellet Durability Index (PDI)", value: "> 96%", testMethod: "Holmen Pellet Tester" },
    { parameter: "Dioxins & PCBs", value: "Below detectable limits", testMethod: "High-Res GC-MS" },
    { parameter: "Particle Fineness", value: "100% pass 100 mesh", testMethod: "Sieve Analysis" }
  ],
  "paper-bentonite": [
    { parameter: "Microparticle Retention Efficiency", value: "> 88% First-pass retention", testMethod: "Britt Dynamic Drainage Jar" },
    { parameter: "Pitch & Stickies Control Capacity", value: "Superior colloidal adsorption", testMethod: "TOC Analysis" },
    { parameter: "Brightness / ISO Whiteness", value: "> 78%", testMethod: "ISO 2470" },
    { parameter: "Abrasion Index (Einlehner)", value: "< 15 mg/100,000 revs (Low wire wear)", testMethod: "Einlehner AT-1000" },
    { parameter: "Specific Surface Area", value: "> 600 m²/g", testMethod: "EGME Method" }
  ],
  "pond-sealing-bentonite": [
    { parameter: "Hydraulic Permeability (k)", value: "< 1 x 10⁻⁸ to 1 x 10⁻⁹ cm/sec", testMethod: "Flexible Wall Permeameter" },
    { parameter: "Free Swelling Volume", value: "> 26 ml/2g", testMethod: "ASTM D5890" },
    { parameter: "Seal Integrity Against Head Pressure", value: "Withstands up to 50 meters water head", testMethod: "Hydrostatic Cell" },
    { parameter: "Grading / Form", value: "Coarse Granules / Crushed Chips (1 - 5 mm)", testMethod: "Sieve" },
    { parameter: "Non-Toxic to Aquatic Life", value: "100% Fish and Livestock Safe", testMethod: "Bio-assay" }
  ],
  "pharmaceutical-bentonite": [
    { parameter: "Pharmacopoeia Compliance", value: "Meets IP / BP / USP monographs", testMethod: "Compendial Testing" },
    { parameter: "Microbiological Purity (Total Plate Count)", value: "< 100 CFU/g (Pathogen Free)", testMethod: "Microbial Limit Test" },
    { parameter: "Heavy Metals (Arsenic, Lead)", value: "As < 3 ppm, Pb < 10 ppm", testMethod: "ICP-MS" },
    { parameter: "Sedimentation Volume", value: "Passes USP standard", testMethod: "USP <Bentonite>" },
    { parameter: "Gel Formation (6% suspension)", value: "Homogeneous smooth thixotropic gel", testMethod: "USP Assay" }
  ],
  "cosmetics-bentonite": [
    { parameter: "Microbiological Examination", value: "Sterile / Radiation Treated Option", testMethod: "ISO 21149" },
    { parameter: "Heavy Metals", value: "Pb < 2 ppm, As < 1 ppm, Hg < 0.1 ppm", testMethod: "ICP-MS" },
    { parameter: "Oil & Sebum Adsorption Capacity", value: "> 85 g oil / 100 g clay", testMethod: "Gardner-Coleman Method" },
    { parameter: "Skin Feel & Texture", value: "Silky smooth, non-gritty (superfine 325 mesh)", testMethod: "Sensory & Microscopic" },
    { parameter: "pH Value (10% suspension)", value: "7.5 - 8.5 (Gentle on skin)", testMethod: "pH Meter" }
  ],
  "paints-bentonite": [
    { parameter: "Anti-Settling Rheological Efficiency", value: "High Thixotropic Recovery", testMethod: "Brookfield Viscometer" },
    { parameter: "Sag Resistance Index", value: "> 12 mils", testMethod: "Anti-Sag Meter" },
    { parameter: "Dispersion / Hegman Fineness", value: "> 6.5 Hegman", testMethod: "Hegman Gauge" },
    { parameter: "Specific Gravity", value: "2.45 - 2.60 g/cm³", testMethod: "Pycnometer" },
    { parameter: "Compatibility with Emulsions", value: "Acrylic, Styrene-Acrylic, Alkyds", testMethod: "Solvent Stability" }
  ],
  "gcl-bentonite": [
    { parameter: "Swelling Volume", value: ">= 24 ml/2g", testMethod: "ASTM D5890" },
    { parameter: "Fluid Loss", value: "<= 18 ml", testMethod: "ASTM D5891" },
    { parameter: "Granule Size Distribution", value: "0.5 mm - 2.0 mm (Granular Needle-punch Grade)", testMethod: "ASTM C136" },
    { parameter: "Permeability of GCL Component", value: "< 5 x 10⁻⁹ cm/sec", testMethod: "ASTM D5084" },
    { parameter: "Internal Shear Strength", value: "High friction needle-punched bond", testMethod: "Direct Shear" }
  ],
  "bentonite-granules": [
    { parameter: "Granule Particle Size", value: "10-20 Mesh / 16-30 Mesh / 2-4 mm", testMethod: "Rotap Sieve" },
    { parameter: "Bulk Density", value: "0.85 - 0.95 g/cm³", testMethod: "Graduated Cylinder" },
    { parameter: "Absorption Capacity (Water)", value: "> 350%", testMethod: "Gravimetric" },
    { parameter: "Hardness / Attrition Resistance", value: "> 92%", testMethod: "Ro-Tap Attrition Test" },
    { parameter: "Dust Content (< 0.2 mm)", value: "< 0.5% (Virtually Dust-Free)", testMethod: "Air Elutriation" }
  ],
  "desiccant-granules": [
    { parameter: "Moisture Adsorption @ 20% RH", value: "> 11.5%", testMethod: "MIL-D-3464E Standard" },
    { parameter: "Moisture Adsorption @ 40% RH", value: "> 18.0%", testMethod: "MIL-D-3464E Standard" },
    { parameter: "Moisture Adsorption @ 80% RH", value: "> 28.0%", testMethod: "MIL-D-3464E Standard" },
    { parameter: "Regeneration Temperature", value: "120°C - 150°C (Fully Reusable)", testMethod: "Thermal Oven" },
    { parameter: "Dusting & Breakage", value: "Zero dusting, conforms to Class 1 desiccant", testMethod: "MIL-D-3464E" }
  ],
  "cat-litter-bentonite": [
    { parameter: "Clumping Speed", value: "Instant (< 5 seconds)", testMethod: "Liquid Droplet Test" },
    { parameter: "Clump Strength & Integrity", value: "Hard tight clumps (Drop test > 1.5 m unbroken)", testMethod: "Impact Drop" },
    { parameter: "Liquid Absorption Capacity", value: "> 400% of dry weight", testMethod: "Standard Absorption" },
    { parameter: "Dust-Free Percentage", value: "> 99.5% De-dusted", testMethod: "Dust Box Analysis" },
    { parameter: "Natural Odor Control (Ammonia Lock)", value: "> 90% odor capture within 15 min", testMethod: "Gas Chromatography" }
  ]
};

// Applications & Industries map
const bentoniteMetadata = {
  "bentonite-powder": {
    grades: ["Super Fine 300 Mesh", "Industrial Standard 200 Mesh", "High Gel Sodium Bentonite"],
    packaging: ["25 kg / 50 kg HDPE bags with inner liner", "1000 kg / 1250 kg Jumbo bulk bags", "Bulk container shipments"],
    applications: ["Civil piling and slurry diaphragm walls", "Foundry green sand mold binder", "Iron ore pelletization", "Waterproofing and barrier sealing", "Agricultural carrier and animal feed"],
    features: ["Natural sodium bentonite from captive Kutch mines", "Superior swelling and liquid limit", "Free flowing with minimal grit", "Consistent viscosity in every batch"],
    industries: ["Civil Engineering", "Foundries", "Metallurgy", "Agriculture", "Environmental Sealing"]
  },
  "sodium-bentonite": {
    grades: ["Natural Sodium Activated Grade", "High Swelling Index (>35 ml)", "Civil & Pond Grade"],
    packaging: ["25 kg / 50 kg PP bags", "1 MT / 1.25 MT Big bags with discharge spout"],
    applications: ["Landfill liner and lagoon sealing", "Bentonite geosynthetic clay liners (GCL)", "Drilling mud rheology", "Foundry mold bonding", "Electrical grounding backfill"],
    features: ["Natural exchangeable sodium ions providing high colloidal yield", "Permanent impermeable water barrier", "Long-term thermal and chemical stability", "Zero chemical leaching"],
    industries: ["Environmental Engineering", "Drilling", "Foundries", "Grounding", "Agriculture"]
  },
  "calcium-bentonite": {
    grades: ["Activated Bleaching Grade", "Low Swelling Industrial Grade", "Acid Activated Catalyst Grade"],
    packaging: ["25 kg multi-wall craft paper bags", "50 kg HDPE bags", "1 MT bulk totes"],
    applications: ["Edible oil refining, decolorization, and bleaching", "Petroleum fraction clarification", "Industrial wastewater purification", "Pharmaceutical excipients", "Soil amendment for sandy soils"],
    features: ["High specific surface area and micropore structure", "Superior adsorption of pigments, chlorophyll, and impurities", "Acid-activated for maximum bleaching efficiency", "Controlled neutral pH"],
    industries: ["Edible Oil Refining", "Petroleum Refining", "Wastewater Treatment", "Pharmaceuticals", "Agriculture"]
  },
  "oil-drilling-bentonite": {
    grades: ["API 13A Section 9 Compliant", "OCMA DFCP-4 Grade", "High Temperature Stable Grade"],
    packaging: ["50 lb / 25 kg export craft paper bags", "50 kg woven polypropylene bags", "1000 kg / 1200 kg export certified FIBC bags"],
    applications: ["Onshore and offshore oil & gas well drilling", "Deep exploratory drilling fluids", "Wellbore stabilization and shale inhibition", "Cuttings removal and suspension during circulation"],
    features: ["Fully certified to API Spec 13A Section 9", "Instant viscosity buildup and high barrel yield", "Thin, impermeable filter cake prevents lost circulation", "Withstands downhole high temperatures and pressures"],
    industries: ["Oil & Gas Exploration", "Offshore Drilling", "Drilling Fluid Services", "Wellbore Completion"]
  },
  "drilling-bentonite": {
    grades: ["Water Well Drilling Grade", "Exploratory Mineral Coring Grade", "Universal High Yield Grade"],
    packaging: ["25 kg / 50 kg HDPE bags with poly liner", "1000 kg Jumbo bulk bags"],
    applications: ["Water well drilling and boreholes", "Geotechnical core sampling", "Mining exploration drilling", "Geothermal loop drilling"],
    features: ["Rapid hydration in fresh water", "Prevents borehole collapse in loose gravel and sand", "Lubricates drill string and cools drill bits", "Cost effective high yield performance"],
    industries: ["Water Well Drilling", "Geotechnical Exploration", "Mining & Coring", "Geothermal Energy"]
  },
  "piling-bentonite": {
    grades: ["Civil Construction High Slurry Grade", "Diaphragm Wall Grade", "Micro-Piling Grade"],
    packaging: ["50 kg HDPE bags with moisture-proof liner", "1000 kg and 1250 kg Jumbo bulk bags"],
    applications: ["Bored cast-in-situ piles and foundation shafts", "Diaphragm walls and deep basement perimeter retaining", "Metro rail, bridge, and flyover foundation piling", "Cut-off walls for dam seepage control"],
    features: ["Builds high thixotropic hydrostatic wall pressure preventing cave-ins", "Low sand content protects slurry desanding pumps", "Displaces cleanly during tremie pipe concrete pouring", "IS: 2911 and international civil construction compliant"],
    industries: ["Civil Engineering", "Metro Rail & Infrastructure", "Bridge & Highway Foundations", "Dam & Marine Works"]
  },
  "hdd-bentonite": {
    grades: ["Extra High Yield HDD Grade", "Trenchless Borehole Grade", "Rock Reaming Grade"],
    packaging: ["25 kg multi-wall craft bags", "50 kg HDPE bags", "1000 kg Jumbo bags with lifting straps"],
    applications: ["Horizontal directional drilling (HDD) for pipelines & cables", "River and highway crossing boreholes", "Telecommunication optical fiber laying", "Municipal sewer and water pipe rehabilitation"],
    features: ["Ultra-high yield point and gel strength suspend coarse gravel cuttings", "Low filtration rate prevents hydraulic fracture in loose soils", "Minimizes rotational torque and pullback forces on drill rigs", "Rapid batch mixing with minimal shearing time"],
    industries: ["Trenchless Technology (HDD)", "Oil & Gas Crossings", "Telecom Infrastructure", "Municipal Utilities"]
  },
  "api-bentonite": {
    grades: ["API Spec 13A Section 9 (Untreated / Premium)", "API Spec 13A Section 11 (Treated)"],
    packaging: ["25 kg export kraft bags with palletization", "1000 kg / 1250 kg UV-resistant FIBC bags"],
    applications: ["Global oilfield drilling mud systems", "Standardized mud engineering contracts", "High-pressure drilling operations", "Mud plant formulation"],
    features: ["Rigorous adherence to American Petroleum Institute standard 13A", "Verified 600 rpm dial reading >= 30", "Strict filtration volume <= 15 ml", "Traceable batch test certificate provided with every container"],
    industries: ["Global Oilfield Services", "Oil & Gas Operators", "Mud Engineering Contractors"]
  },
  "micro-tunnelling-bentonite": {
    grades: ["Pipe Jacking Premium Lubricant Grade", "Micro-Tunneling Shield Support Grade"],
    packaging: ["25 kg / 50 kg moisture-proof bags", "1000 kg Jumbo bulk bags"],
    applications: ["Microtunneling boring machine (MTBM) drives", "Pipe jacking beneath railways, canals, and highways", "Shield machine annular space lubrication", "Underground utility tunnel drives"],
    features: ["Formulates an ultra-slippery continuous mud jacket reducing jacking force", "Maintains ground stability and prevents surface settlement", "Smooth soil removal through slurry discharge pipelines", "Fast re-gelation prevents grout washout"],
    industries: ["Microtunneling & Pipe Jacking", "Urban Underground Utilities", "Railway & Highway Crossings"]
  },
  "foundry-bentonite": {
    grades: ["High Thermal Durability Sodium Grade", "High Green Strength Foundry Grade", "Semi-Synthetic Foundry Grade"],
    packaging: ["50 kg HDPE bags with inner liner", "1000 kg Jumbo bulk bags with palletization"],
    applications: ["Green sand casting for automotive engine blocks and chassis", "Steel, ductile iron, and non-ferrous foundries", "High-pressure automated molding lines (DISA, Heinrich Wagner)", "Heavy industrial castings"],
    features: ["High wet tensile strength resists sand expansion defects like scabbing", "Exceptional active clay retention across multiple casting recycles", "High thermal durability up to 500°C", "Produces flawless casting surface finish with sharp definition"],
    industries: ["Automotive Foundries", "Iron & Steel Casting", "Heavy Machinery", "Valves & Pumps Casting"]
  },
  "iron-ore-pelletization-bentonite": {
    grades: ["High Drop Number Sodium Bentonite", "Metallurgical Pellet Binder Grade"],
    packaging: ["50 kg HDPE bags", "1000 kg / 1250 kg Jumbo bulk bags", "Bulk rail wagons / tipper trucks"],
    applications: ["Iron ore green pellet balling and binding", "Direct reduced iron (DRI) and blast furnace feed pelletization", "Chromite and manganese ore briquetting"],
    features: ["Delivers high wet drop numbers (14 - 18 drops) avoiding green pellet breakage", "Generates robust dry and fired pellet compressive strength", "Rapid moisture uptake during disc balling", "Low dosage requirement (0.6% - 0.8%) minimizing alumina addition in furnace slag"],
    industries: ["Iron & Steel Plants", "Iron Ore Pelletization Units", "Metallurgical Agglomeration"]
  },
  "attapulgite-clay": {
    grades: ["Saltwater Drilling Grade (API 13A Sec 11)", "Industrial Absorbent Grade"],
    packaging: ["25 kg paper bags", "50 kg HDPE bags", "1000 kg Jumbo bags"],
    applications: ["Offshore drilling in saturated saltwater and offshore brine", "Deep geothermal and high salinity wells", "Industrial oil absorbent and spill cleanup", "Pesticide and fertilizer formulation"],
    features: ["Needle-like palygorskite crystal structure builds viscosity in saturated brine", "Electrolyte-insensitive rheology where ordinary bentonite flocculates", "High thermal endurance up to 250°C", "Certified under API 13A Section 11 specifications"],
    industries: ["Offshore Oil & Gas", "High Salinity Drilling", "Industrial Spill Control", "Agrochemicals"]
  },
  "refractory-bentonite": {
    grades: ["High Alumina Refractory Grade", "Foundry Core Wash Grade"],
    packaging: ["25 kg / 50 kg HDPE bags", "1000 kg Jumbo bulk bags"],
    applications: ["Monolithic refractories, castables, and ramming masses", "Furnace refractory mortar and fire brick bonding", "Refractory coatings and foundry mold washes"],
    features: ["High Pyrometric Cone Equivalent (PCE) withstanding over 1580°C", "High green and fired bond strength", "Uniform thermal expansion without cracking", "Low fluxing alkali oxides"],
    industries: ["Refractory Manufacturing", "Steel & Iron Making", "Cement Kilns", "Glass Furnaces"]
  },
  "ceramics-bentonite": {
    grades: ["Low Iron White Firing Grade", "High Plasticity Tile & Sanitaryware Grade"],
    packaging: ["25 kg craft bags with PE liner", "50 kg HDPE bags", "1000 kg Big bags"],
    applications: ["Ceramic floor and wall tiles (porcelain, vitrified, ceramic)", "Sanitaryware bodies and glazes", "High-voltage electrical porcelain insulators", "Fine tableware and chinaware"],
    features: ["Very low iron content (<1.2% Fe2O3) ensuring clean firing whiteness", "High green and dry modulus of rupture (MOR) prevents handling breakage", "Superfine particle size enhances glaze suspension and anti-settling", "Imparts superior plastic workability during pressing and extrusion"],
    industries: ["Ceramic Tiles", "Sanitaryware", "Electrical Porcelain", "Tableware & Potteries"]
  },
  "earthing-bentonite": {
    grades: ["Low Resistivity Conductive Backfill Grade (<2 Ω·m)", "Telecom & Substation Earthing Grade"],
    packaging: ["25 kg and 50 kg weather-proof sealed bags with carry handles"],
    applications: ["Electrical substation grounding and power transformer pits", "Telecom cellular tower grounding pits", "Lightning protection grounding rods", "Data center and hospital sensitive electrical earthing"],
    features: ["Ultra-low soil resistivity below 2.0 Ohm-meters", "Hydrophilic swelling keeps moisture around electrodes permanently", "Non-corrosive to copper and steel grounding rods (pH 8.5-10.0)", "Maintenance-free grounding for up to 30 years without periodic salting"],
    industries: ["Power Transmission & Sub-Stations", "Telecom Infrastructure", "Solar & Wind Farms", "Data Centers"]
  },
  "fertilizers-bentonite": {
    grades: ["Sulfur Bentonite 90% Binder Grade", "Pesticide Granular Carrier Grade (16-30 Mesh)"],
    packaging: ["25 kg / 50 kg HDPE bags with moisture barrier", "1000 kg bulk bags"],
    applications: ["Agricultural elemental sulfur pastille manufacturing (Bentonite-S 90%)", "Carrier for bio-fertilizers, pesticides, and weedicides", "Soil conditioner for moisture and cation nutrient retention"],
    features: ["Expands rapidly upon contact with soil moisture, breaking sulfur pastilles into micronized particles", "Ideal spherical granules with high mechanical crush resistance", "Improves sandy soil water retention and slows nutrient leaching", "100% natural and certified for organic farming"],
    industries: ["Fertilizer Manufacturing", "Agrochemicals", "Soil Conditioning & Agriculture"]
  },
  "animal-feed-bentonite": {
    grades: ["Feed Grade Aflatoxin Binder", "Feed Pellet Binder & Flow Aid Grade"],
    packaging: ["25 kg multi-wall paper bags with PE liner", "1000 kg clean-room big bags"],
    applications: ["Poultry, dairy cattle, swine, and aquafeed pellet manufacturing", "Broad-spectrum mycotoxin (Aflatoxin B1) binding in digestive tracts", "Anti-caking flow agent for bulk feed silos"],
    features: ["Selective, irreversible adsorption of dietary mycotoxins without binding vitamins", "Heavy metals strictly tested and compliant with EU and FSSAI feed safety limits", "Increases feed pellet durability index (PDI > 96%)", "Slows feed transit rate, improving livestock nutrient absorption"],
    industries: ["Animal Feed & Nutrition", "Poultry Farms", "Dairy & Cattle Farming", "Aquafeed Mills"]
  },
  "paper-bentonite": {
    grades: ["Microparticle Retention Aid Grade", "Pitch & Stickies Control Grade"],
    packaging: ["25 kg / 50 kg moisture-sealed bags", "1000 kg Jumbo bulk bags"],
    applications: ["Papermaking wet end retention and drainage systems (two-component microparticle)", "Colloidal pitch and stickies control in recycled fiber mills", "Coated paper opacity enhancement"],
    features: ["High specific surface area (>600 m²/g) creates micro-flocs for fast wire dewatering", "Significantly increases fine fiber and calcium carbonate filler retention", "Prevents machine downtime caused by sticky pitch deposition on felts", "Low abrasion index minimizes wire and machine wear"],
    industries: ["Paper Mills", "Recycled Paper & Board", "Specialty Papers", "Packaging Board"]
  },
  "pond-sealing-bentonite": {
    grades: ["Natural Sodium Sealing Granules", "Canal & Lagoon Impermeable Grade"],
    packaging: ["50 kg woven polypropylene bags", "1000 kg / 1250 kg Jumbo bulk bags"],
    applications: ["Farm irrigation ponds and agricultural rainwater harvesting reservoirs", "Aquaculture fish and shrimp farming ponds", "Industrial effluent storage lagoons and tailings ponds", "Canal lining and golf course water features"],
    features: ["Natural high-swelling sodium bentonite swells to form an impermeable gel blanket", "Eliminates porous sand or fractured rock seepage without costly synthetic liners", "100% non-toxic and environmentally safe for fish, livestock, and groundwater", "Self-healing barrier: punctures or ground shifts re-seal automatically"],
    industries: ["Agriculture & Farm Ponds", "Aquaculture & Fisheries", "Environmental Water Storage", "Industrial Lagoons"]
  },
  "pharmaceutical-bentonite": {
    grades: ["Pharmacopoeia Grade (IP / BP / USP)", "Ultra-Purified Smectite Grade"],
    packaging: ["25 kg pharma-grade clean-room bags with double poly liners"],
    applications: ["Oral pharmaceutical suspensions and topical calamine lotions", "Tablet disintegrant and binder in solid dosage forms", "Thickener and stabilizer in dermatological creams", "Toxin adsorption pharmaceutical formulations"],
    features: ["Manufactured under strict GMP conditions compliant with IP, BP, and USP", "Microbiologically tested and pathogen-free", "Heavy metals well below compendial threshold limits", "Forms smooth, thixotropic, non-gritty suspensions"],
    industries: ["Pharmaceutical Manufacturing", "Dermatology", "Oral Healthcare", "Nutraceuticals"]
  },
  "cosmetics-bentonite": {
    grades: ["Cosmetic Grade Superfine Clay (325 Mesh)", "Natural Detox Facial Clay"],
    packaging: ["20 kg / 25 kg foil-sealed fiber drums or craft bags with PE liner"],
    applications: ["Deep cleansing facial clay masks and mud packs", "Acne treatment scrubs and purifying body washes", "Dry shampoos, natural deodorants, and cosmetic powders", "Emulsion stabilizer in creams and lotions"],
    features: ["High natural cation exchange extracts impurities, heavy sebum, and toxins from skin", "Superfine 325 mesh particle size provides a silky, non-abrasive skin feel", "Sterilized and free of harmful microbes, mold, and heavy metals", "100% natural, vegan, and cruelty-free mineral"],
    industries: ["Cosmetics & Skincare", "Personal Care Brands", "Spa & Wellness Products", "Natural Beauty Formulations"]
  },
  "paints-bentonite": {
    grades: ["Organoclay & Inorganic Anti-Settling Grade", "Emulsion Paint Rheology Modifier"],
    packaging: ["25 kg multi-wall paper bags with moisture-proof liner"],
    applications: ["Water-based architectural emulsion paints (interior/exterior)", "Industrial primers, undercoats, and texture coatings", "Solvent-borne paints and marine coatings", "Sealants, putties, and automotive underbody coatings"],
    features: ["Imparts shear-thinning thixotropy: flows easily under brush/spray but resists dripping and sagging", "Prevents pigment settling and hard pan caking during extended can storage", "Improves film build, opacity, and brush drag feel", "High compatibility with latex, acrylic, and alkyd resin systems"],
    industries: ["Paints & Coatings", "Automotive Coatings", "Adhesives & Sealants", "Construction Chemicals"]
  },
  "gcl-bentonite": {
    grades: ["Geosynthetic Clay Liner (GCL) Granular Grade", "High Swelling Barrier Grade"],
    packaging: ["1000 kg and 1250 kg Jumbo bulk bags with bottom discharge spout"],
    applications: ["Manufacturing of geosynthetic clay liners (GCLs)", "Landfill base lining and capping systems", "Mining heap leach pads and containment ponds", "Underground structural waterproofing for buildings and tunnels"],
    features: ["Specially graded granules designed for needle-punched geotextile encapsulation", "Consistent granular sizing prevents dust loss during high-speed GCL fabrication", "Achieves hydraulic conductivity < 5 x 10⁻⁹ cm/sec under low confining pressures", "High swelling and chemical resistance against municipal landfill leachates"],
    industries: ["Geosynthetics Manufacturing", "Landfill Construction", "Mining Containment", "Tunnel Waterproofing"]
  },
  "bentonite-granules": {
    grades: ["Raw Natural Crushed Granules (1-3 mm / 2-4 mm)", "De-dusted Calibrated Mesh Granules"],
    packaging: ["25 kg / 50 kg HDPE bags", "1000 kg Jumbo bulk bags"],
    applications: ["Pond sealing and canal embankment waterproofing", "Carrier for agricultural pesticides and micronutrient coating", "Foundry and metallurgical briquette binders", "Foundry core and mold aggregate"],
    features: ["High-density granules sink readily through standing water to seal pond floors", "Free flowing with negligible dusting during pneumatic conveying and bulk handling", "Uniform particle size distribution", "Retains maximum swelling and binding capability upon hydration"],
    industries: ["Waterproofing", "Agriculture", "Chemical Processing", "Metallurgy"]
  },
  "desiccant-granules": {
    grades: ["Active Clay Desiccant Granules (MIL-D-3464E)", "Non-Hazardous Natural Silica-Alumina Desiccant"],
    packaging: ["25 kg sealed moisture-barrier bags", "500 kg / 1000 kg bulk containers"],
    applications: ["Industrial moisture adsorption packets for shipping containers", "Electronics, machinery, and automotive parts packaging", "Leather goods, garments, and export cargo protection", "Military and defense equipment preservation"],
    features: ["100% natural bentonite montmorillonite clay desiccant conforming to MIL-D-3464E", "Superior moisture adsorption compared to silica gel at low and medium humidity", "Non-toxic, chemically inert, non-corrosive, and easily disposable", "Fully regenerable and reusable by low-temperature heating (120°C - 150°C)"],
    industries: ["Export Packaging", "Electronics & Machinery", "Container Shipping Protection", "Leather & Garments"]
  },
  "cat-litter-bentonite": {
    grades: ["Instant Clump Natural Sodium Bentonite Granules", "Scented (Lavender, Baby Powder) & Activated Carbon Blends"],
    packaging: ["5 kg, 10 kg, and 20 kg colorful consumer retail bags with handle", "1000 kg bulk bags for private label packaging plants"],
    applications: ["Domestic household cat litter trays", "Commercial pet care boarding and veterinary facilities", "Private label consumer pet care brands"],
    features: ["Forms hard, tight clumps instantly upon liquid contact for effortless scooping", "99.5% de-dusted formulation protects cat and owner respiratory health", "Natural sodium bentonite locks ammonia and foul odors permanently without heavy chemicals", "Gentle on sensitive paws with natural non-stick texture"],
    industries: ["Pet Care & Pet Foods", "FMCG Retail Packaging", "Veterinary Clinics", "Supermarket Private Labels"]
  }
};

// Generate 26 complete Bentonite products
const bentoniteProducts = kbcScraped.map((item, index) => {
  const meta = bentoniteMetadata[item.slug] || {
    grades: ["Standard Industrial Grade", "High Purity Grade"],
    packaging: ["50 kg HDPE bags", "1000 kg Jumbo bulk bags"],
    applications: ["Industrial manufacturing and engineering applications"],
    features: ["High quality Kutch sodium bentonite", "Consistent batch purity"],
    industries: ["Industrial Manufacturing", "Minerals & Clay"]
  };

  const specs = bentoniteSpecs[item.slug] || [
    { parameter: "Montmorillonite Content", value: "85% Min", testMethod: "XRD Analysis" },
    { parameter: "Swelling Volume", value: "25 - 32 ml/2g", testMethod: "ASTM D5890" },
    { parameter: "Liquid Limit", value: "450% - 550%", testMethod: "IS: 2720" },
    { parameter: "Moisture Content", value: "10% - 12% Max", testMethod: "Gravimetric" },
    { parameter: "Particle Fineness (200 Mesh)", value: "> 90%", testMethod: "Sieve Shaker" },
    { parameter: "pH (5% suspension)", value: "8.5 - 10.0", testMethod: "pH Meter" }
  ];

  const downloadedImages = kbcImagesMap[item.slug] || [];
  const images = downloadedImages.length > 0 ? downloadedImages : ['/uploads/kbc-drilling-bentonite.png'];

  // Clean title & description
  const cleanTitle = item.name;
  const descParagraphs = item.paragraphs.filter(p => !p.includes('Kutch Bentoclay is a Trusted') && p.length > 50);
  const mainDesc = descParagraphs.length > 0 
    ? descParagraphs.join(' ')
    : `Skyline ${item.name} is engineered from the premium natural sodium bentonite reserves of Kutch, Gujarat. Processed with advanced pulverization, classification, and activation, it delivers outstanding swelling, thixotropic gel strength, and impermeability for demanding industrial applications.`;

  const shortDesc = descParagraphs.length > 0
    ? descParagraphs[0].slice(0, 180) + '...'
    : `High-grade ${item.name} processed from Kutch mineral reserves for high-performance industrial applications (Kutch Bentoclay reference).`;

  return {
    id: `prod_bentonite_${item.slug.replace(/-/g, '_')}`,
    name: item.name,
    slug: item.slug,
    categoryId: "cat_bentonite",
    categorySlug: "bentonite",
    subcategoryId: `sub_bento_${item.slug.replace(/-/g, '_')}`,
    isFeatured: index < 6, // First 6 are featured
    isActive: true,
    shortDescription: shortDesc.replace(/Kutch Bentoclay/g, 'Skyline Salt and Minerals').replace(/Kutch Bento Clay/g, 'Skyline Salt and Minerals'),
    description: mainDesc.replace(/Kutch Bentoclay/g, 'Skyline Salt and Minerals').replace(/Kutch Bento Clay/g, 'Skyline Salt and Minerals'),
    images: images,
    grades: meta.grades,
    packaging: meta.packaging,
    specifications: specs,
    applications: meta.applications,
    features: meta.features,
    industries: meta.industries,
    seoTitle: `${item.name} Manufacturer in Gujarat | Skyline Salt and Minerals`,
    seoDescription: `Leading ${item.name} manufacturer and exporter in Gujarat, India. Premium Kutch sodium bentonite clay in bulk 50kg bags and 1MT jumbo bags for global markets.`,
    seoKeywords: `${item.name.toLowerCase()} manufacturer gujarat, bentonite supplier gandhidham, kutch bentonite clay, kutch bentoclay reference`
  };
});

// Update database.json
const dbPath = path.join(__dirname, 'data', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Filter out old bentonite products
const nonBentoniteProducts = db.products.filter(p => p.categoryId !== 'cat_bentonite');

console.log(`Preserving ${nonBentoniteProducts.length} non-bentonite products (Industrial Salt, Edible Salt, China Clay, Kaolin, Other Minerals).`);
console.log(`Generated ${bentoniteProducts.length} full Bentonite products!`);

const allProducts = [
  ...nonBentoniteProducts,
  ...bentoniteProducts
];

// Update subcategories in cat_bentonite
const bentoniteSubcategories = bentoniteProducts.map(p => ({
  id: p.subcategoryId,
  name: p.name,
  slug: p.slug,
  description: p.shortDescription.slice(0, 80) + '...'
}));

const updatedCategories = db.categories.map(cat => {
  if (cat.id === 'cat_bentonite') {
    return {
      ...cat,
      description: "High-grade natural sodium and calcium bentonite clay from Kutch mineral basin, processed for drilling, foundries, civil engineering, and clarifiers (Reference: Kutch Bentoclay).",
      subcategories: bentoniteSubcategories
    };
  }
  return cat;
});

db.products = allProducts;
db.categories = updatedCategories;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully updated database.json with ${allProducts.length} total products!`);

// Also update seedData.js
const seedContent = 'module.exports = ' + JSON.stringify(db, null, 2) + ';\n';
fs.writeFileSync(path.join(__dirname, 'data', 'seedData.js'), seedContent, 'utf8');
console.log('Synchronized seedData.js!');

