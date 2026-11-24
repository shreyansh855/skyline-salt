# Skyline Salt and Minerals — Enterprise Fullstack Web Application

A modern, production-ready website and dynamic administration portal for **Skyline Salt and Minerals**, a premier salt and industrial minerals manufacturing and export company based in Bhuj and Gandhidham, Kutch, Gujarat, India.

---

## 🏗️ Architecture & Technology Stack

- **Frontend**:
  - React 19 + Vite + Tailwind CSS v4 (Industrial white & ocean blue palette: `#0F2C59`, `#0077B6`, `#00B4D8`, `#F8FAFC`, `#FFFFFF`)
  - Lucide Icons
  - React Router v7 with Client-Side Routing and dynamic breadcrumbs
  - JSON-LD Structured Data Schema (`Organization` and `Product` rich snippets)
  - Responsive across desktop, tablet, and mobile devices
  - **Packaging menu/section removed from top navigation** as specified.
- **Backend**:
  - Node.js & Express.js REST API with CORS, Helmet security headers, Morgan logging, and Gzip compression
  - JSON transactional database engine (`server/data/database.json`) with atomic file writes, backup rotation, and zero native-compilation errors on Windows/Linux
  - JWT Authentication with bcrypt password hashing
  - Automated visitor pageview & device analytics tracking
  - File upload engine (Multer) for product images (`/uploads`)
  - Dynamic XML Sitemap generator (`/sitemap.xml`)
  - Dynamic Robots generator (`/robots.txt`)
  - Single-port deployment (Express serves static client build + API on port 5000)

---

## 💎 Product Portfolio & Catalogue

All products feature individual product pages with:
- Product name, imagery gallery, short & comprehensive descriptions
- **Complete Technical Specifications Table** (chemical assay, physical parameters, test methods)
- **Available Grades**
- **Packaging Information** (25kg/50kg HDPE bags, 1 MT / 1.25 MT jumbo bulk bags, bulk export)
- **Direct Enquiry & Quote Buttons**

### Categories:
1. **Industrial Salt**: Refined Industrial Salt (99.2%+ NaCl), Pure Dried Vacuum (PDV) Salt, Tablet Salt (Water Softener Salt), Raw Solar Sea Salt, De-Icing Road Salt.
2. **Edible Salt**: Refined Free Flow Iodized Salt (FSSAI compliant), PDV Food Grade Salt, Natural Crystal Sea Salt.
3. **Bentonite**: API 13A Section 9 & 11 Drilling Bentonite, Foundry Grade Sodium Bentonite, Piling & Civil Engineering Bentonite, Activated Bleaching Earth, Cat Litter Clumping Granules, Electrical Earthing Bentonite Powder.
4. **China Clay**: China Clay Noodles (Extruded, high alumina 36-38%), Washed / Levigated China Clay Powder (300-500 mesh), Crude China Clay Lumps, Rubber Grade China Clay.
5. **Kaolin**: Calcined Kaolin Powder (90-93% GE brightness, TiO2 extender), Hydrous Kaolin Powder, Highly Reactive Metakaolin.
6. **Other Relevant Minerals**: Silica Ramming Mass (premixed with boric acid for induction furnaces), Industrial Gypsum Granules, Potassium & Sodium Feldspar. *(Strictly excludes Silica Sand and Silica Quartz Powder)*.

---

## 📍 Official Company Locations & Contacts

| Department | Address / Contact | Action Link |
|---|---|---|
| **Head Office (Bhuj)** | Plot No. 92, Near Fateh Mamad Hajira, Lalshah Burhanshah Dargah, Bhuj-Kutch, 370001, Gujarat, India. | [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Plot+No.+92,+Near+Fateh+Mamad+Hajira,+Lalshah+Burhanshah+Dargah,+Bhuj-Kutch,+370001,+Gujarat,+India) |
| **Manufacturing Plant (Gandhidham)** | Plot No. D-35, Jawahar Nagar, Gandhidham, Kutch, 370201, Gujarat, India. | [Open in Google Maps](https://www.google.com/maps/search/?api=1&query=Plot+No.+D-35,+Jawahar+Nagar,+Gandhidham,+Kutch,+370201,+Gujarat,+India) |
| **Primary Mobile** | `+91 73839 39786` | [tel:+917383939786](tel:+917383939786) |
| **Secondary Mobile** | `+91 96871 36559` | [tel:+919687136559](tel:+919687136559) |
| **Inquiries Email** | `Info@skylinesaltandminerals.com` | [mailto:Info@skylinesaltandminerals.com](mailto:Info@skylinesaltandminerals.com) |
| **Customer Support** | `support@skylinesaltandminerals.com` | [mailto:support@skylinesaltandminerals.com](mailto:support@skylinesaltandminerals.com) |

*(Note: All contact details are dynamically manageable via the Admin Panel and reflect site-wide without code modifications).*

---

## 🔐 Admin Panel & Credentials

- **Admin Portal URL**: `http://localhost:5000/admin/login`
- **Default Email**: `admin@skylinesaltandminerals.com`
- **Default Password**: `Admin@Skyline2026!`

### Admin Capabilities:
- **Products**: Add, edit, delete products, manage technical specifications tables, upload photos, manage grades & packaging.
- **Categories**: Create and manage categories and subcategories.
- **Enquiries**: View customer quotation submissions, update lead statuses (New, Contacted, In Progress, Closed), add follow-up notes, and export to CSV.
- **Homepage & CMS**: Edit hero headlines, stats, About story, mission, and Gandhidham manufacturing plant descriptions.
- **Company Settings**: Update office address, factory address, Google Maps links, phones, emails, and change admin password.
- **Visitor Analytics**: View 14-day pageview charts, top viewed products, and device breakdown.
- **SEO Manager**: Customize meta titles, descriptions, and keywords for each page route.

---

## 🚀 Getting Started & Local Development

### 1. Prerequisites
- Node.js (v18+ or v20+ or v24+)
- npm (v9+)

### 2. Running the Unified Server (Production Mode)
```bash
# From project root
npm start
```
Server starts on `http://localhost:5000`. It serves both the backend API and the compiled React frontend!

### 3. Running in Development Mode
```bash
# Terminal 1: Backend API
npm run server

# Terminal 2: React Vite Client with HMR
npm run client
```

### 4. Rebuilding the Frontend
```bash
npm run build
```

---

## 🗺️ Key Endpoints
- Frontend Home: `http://localhost:5000/`
- Products Catalogue: `http://localhost:5000/products`
- Gandhidham Plant: `http://localhost:5000/manufacturing`
- Contact Us: `http://localhost:5000/contact`
- Admin Portal: `http://localhost:5000/admin`
- Dynamic XML Sitemap: `http://localhost:5000/sitemap.xml`
- Dynamic Robots.txt: `http://localhost:5000/robots.txt`
- Health Check: `http://localhost:5000/api/health`

