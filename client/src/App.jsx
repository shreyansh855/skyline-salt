import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Context Providers
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import EnquiryModal from './components/common/EnquiryModal';
import LanguageSwitcher from './components/common/LanguageSwitcher';
import ScrollToTopButton from './components/common/ScrollToTopButton';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ManufacturingPage from './pages/ManufacturingPage';
import IndustriesPage from './pages/IndustriesPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage';
import AdminContentPage from './pages/admin/AdminContentPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminSeoPage from './pages/admin/AdminSeoPage';

// Automatically scroll to top on route change
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Quick Quote Modal state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState('');

  const handleOpenQuote = (productName = '') => {
    setQuoteProduct(productName || '');
    setQuoteModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTopOnNavigate />
      {/* Public Navbar (hidden on /admin routes) */}
      {!isAdmin && (
        <>
          <Navbar onOpenQuote={handleOpenQuote} />
          {/* Global Floating Multilingual Language Switcher */}
          <LanguageSwitcher />
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage onOpenQuote={handleOpenQuote} />} />
          <Route path="/about" element={<AboutPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/products" element={<ProductsPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/products/:categorySlug" element={<CategoryPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/products/:categorySlug/:productSlug" element={<ProductDetailPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/manufacturing" element={<ManufacturingPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/industries" element={<IndustriesPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
            <Route path="content" element={<AdminContentPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="seo" element={<AdminSeoPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<HomePage onOpenQuote={handleOpenQuote} />} />
        </Routes>
      </div>

      {/* Public Footer (hidden on /admin) */}
      {!isAdmin && <Footer />}

      {/* Floating Scroll to Top Button */}
      {!isAdmin && <ScrollToTopButton />}

      {/* Floating WhatsApp Quick Connect Button matching reference design */}
      {!isAdmin && (
        <a
          href="https://wa.me/917383939786?text=Hello%20Skyline%20Salt%20and%20Minerals%2C%20I%20am%20interested%20in%20your%20mineral%20products%20and%20specifications."
          target="_blank"
          rel="noopener noreferrer"
          title="Direct WhatsApp with Skyline Commercial Desk"
          className="fixed bottom-6 right-6 z-40 w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-hidden group"
        >
          <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-xs" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.121-.518-1.597-.661-2.616-2.28-2.696-2.386-.079-.107-.648-.862-.648-1.644 0-.781.409-1.166.554-1.325.144-.159.314-.198.42-.198.106 0 .211.002.304.006.098.004.229-.037.359.274.135.324.457 1.117.498 1.199.041.082.068.178.013.287-.054.109-.081.178-.162.273-.082.095-.172.212-.246.285-.082.082-.168.171-.072.336.095.164.424.7.91 1.133.626.557 1.154.729 1.318.811.165.082.261.071.359-.041.098-.112.42-.488.532-.656.113-.168.225-.14.378-.083.153.057.971.458 1.138.541.168.083.279.124.321.194.041.071.041.409-.103.814z"/>
            <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.765.459 3.424 1.261 4.869l-1.265 4.631 4.743-1.243c1.396.762 2.991 1.198 4.686 1.198 5.522 0 10-4.477 10-10s-4.478-10-10-10zm0 18.25c-1.523 0-2.951-.416-4.185-1.137l-.3-.176-2.812.737.75-2.743-.193-.306c-.785-1.251-1.235-2.73-1.235-4.307 0-4.549 3.701-8.25 8.25-8.25 4.548 0 8.25 3.701 8.25 8.25 0 4.548-3.702 8.25-8.25 8.25z"/>
          </svg>
          <span className="sr-only">Chat on WhatsApp</span>
        </a>
      )}

      {/* Global Quick Quote / Enquiry Modal */}
      <EnquiryModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct={quoteProduct}
      />
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </SettingsProvider>
  );
}
