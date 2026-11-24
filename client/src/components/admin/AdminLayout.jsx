import React, { useState } from 'react';
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Package, FolderTree, MessageSquare, 
  Settings, BarChart3, Globe, LogOut, ExternalLink, 
  FileText, ShieldCheck, User, Menu, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

export default function AdminLayout() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
      isActive
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`;

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Mobile Top Header with Hamburger Toggle */}
      <div className="md:hidden bg-slate-950 text-white px-4 py-3 border-b border-slate-800 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white shadow font-bold text-xs">
            SSM
          </div>
          <div>
            <div className="font-bold text-xs text-white font-heading leading-tight">
              Admin Panel
            </div>
            <div className="text-[10px] text-blue-400 font-medium">
              Skyline Minerals
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            target="_blank"
            title="Open Public Website"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {/* Sidebar (Permanent on Desktop, Dropdown Collapsible on Mobile) */}
      <aside 
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:flex w-full md:w-64 bg-slate-950 text-white border-r border-slate-800 shrink-0 md:h-screen md:sticky md:top-0 flex-col justify-between z-40`}
      >
        <div>
          {/* Desktop Admin Header Logo */}
          <div className="hidden md:flex p-5 border-b border-slate-800/80 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white shadow font-bold text-sm">
                SSM
              </div>
              <div>
                <div className="font-bold text-sm text-white font-heading tracking-tight leading-none">
                  Admin Panel
                </div>
                <div className="text-[10px] text-blue-400 font-medium mt-0.5">
                  Skyline Minerals
                </div>
              </div>
            </div>
            <Link
              to="/"
              target="_blank"
              title="Open Public Website"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="p-3 space-y-1">
            <NavLink to="/admin" end className={navItemClass} onClick={closeMobile}>
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/admin/products" className={navItemClass} onClick={closeMobile}>
              <Package className="w-4 h-4" />
              <span>Products Manager</span>
            </NavLink>

            <NavLink to="/admin/categories" className={navItemClass} onClick={closeMobile}>
              <FolderTree className="w-4 h-4" />
              <span>Categories & Subs</span>
            </NavLink>

            <NavLink to="/admin/enquiries" className={navItemClass} onClick={closeMobile}>
              <MessageSquare className="w-4 h-4" />
              <span>Customer Enquiries</span>
            </NavLink>

            <NavLink to="/admin/content" className={navItemClass} onClick={closeMobile}>
              <FileText className="w-4 h-4" />
              <span>Homepage & CMS</span>
            </NavLink>

            <NavLink to="/admin/settings" className={navItemClass} onClick={closeMobile}>
              <Settings className="w-4 h-4" />
              <span>Company Settings</span>
            </NavLink>

            <NavLink to="/admin/analytics" className={navItemClass} onClick={closeMobile}>
              <BarChart3 className="w-4 h-4" />
              <span>Visitor Analytics</span>
            </NavLink>

            <NavLink to="/admin/seo" className={navItemClass} onClick={closeMobile}>
              <Globe className="w-4 h-4" />
              <span>SEO & Meta Tags</span>
            </NavLink>
          </nav>
        </div>

        {/* User Footer & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                A
              </div>
              <div className="truncate text-xs">
                <div className="font-semibold text-white truncate">{user?.name || 'Administrator'}</div>
                <div className="text-[10px] text-slate-400 truncate">{user?.email}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
