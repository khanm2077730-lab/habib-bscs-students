import React, { useState, useRef, useEffect } from 'react';
import {
  Laptop,
  Code2,
  Menu,
  X,
  Search,
  MessageCircle,
  GraduationCap,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { SITE_CONFIG, NAVIGATION_LINKS } from '../data/constants';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  onOpenAuth
}) => {
  const { user, userProfile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getInitials = (name?: string) => {
    if (!name) return 'BS';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Laptop and </> Coding Symbol */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
            aria-label="Habib BSCS Students Home"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative">
                <Laptop className="w-6 h-6 text-blue-400 group-hover:text-cyan-300 transition-colors" />
                <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-[10px] font-mono font-bold text-white px-1.5 py-0.5 rounded-full border border-slate-900 flex items-center">
                  <Code2 className="w-3 h-3 inline mr-0.5" />
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                Habib <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300">BSCS</span> Students
              </span>
              <span className="text-xs text-slate-400 font-medium tracking-wide">
                Learn Programming • Master CS
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = currentTab === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Actions: Search, WhatsApp Contact & Authentication */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-all flex items-center gap-2 text-sm focus:outline-none"
              title="Search subjects, lessons, and notes"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline text-xs text-slate-400">Search (Ctrl+K)</span>
            </button>

            {/* Header WhatsApp Button */}
            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label="Contact on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span className="hidden md:inline">Contact on WhatsApp</span>
              <span className="md:hidden">WhatsApp</span>
            </a>

            {/* Authentication Section */}
            {user ? (
              /* Authenticated User Menu */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-blue-500/60 transition-all focus:outline-none"
                  aria-label="User Account Menu"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-mono font-bold text-xs flex items-center justify-center shadow-inner">
                    {getInitials(userProfile?.displayName || user.displayName || undefined)}
                  </div>
                  <span className="text-xs font-bold text-slate-200 max-w-[110px] truncate hidden md:inline">
                    {userProfile?.displayName || user.displayName || 'BSCS Student'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-3 space-y-2 text-xs z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white truncate text-sm">
                          {userProfile?.displayName || user.displayName || 'BSCS Student'}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                          Active
                        </span>
                      </div>
                      <p className="text-slate-400 font-mono text-[11px] truncate">
                        {user.email}
                      </p>
                      {userProfile?.rollNumber && (
                        <p className="text-cyan-400 font-mono text-[10px]">
                          ID: {userProfile.rollNumber}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1 pt-1">
                      <button
                        onClick={() => handleNavClick('dashboard')}
                        className="w-full text-left p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2.5 transition-colors font-semibold"
                      >
                        <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                        <span>My Study Dashboard</span>
                      </button>

                      <button
                        onClick={async () => {
                          setUserDropdownOpen(false);
                          await signOut();
                          onNavigate('home');
                        }}
                        className="w-full text-left p-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 flex items-center gap-2.5 transition-colors font-semibold"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Unauthenticated: Sign In Button */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('signin')}
                  className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 hover:shadow-blue-500/30 transition-all flex items-center gap-1.5 focus:outline-none"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Status Bar in Mobile */}
          {user ? (
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                  {getInitials(userProfile?.displayName || user.displayName || undefined)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {userProfile?.displayName || user.displayName || 'BSCS Student'}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono truncate max-w-[180px]">
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                onClick={async () => {
                  setMobileMenuOpen(false);
                  await signOut();
                  onNavigate('home');
                }}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pb-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signin');
                }}
                className="py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl text-center shadow-md"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl text-center border border-slate-700"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex flex-col space-y-1">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = currentTab === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <GraduationCap className="w-4 h-4 text-blue-400" />}
                </button>
              );
            })}
          </div>

          {/* WhatsApp Direct in Mobile Drawer */}
          <div className="pt-3 border-t border-slate-800/80">
            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold shadow-md shadow-emerald-500/20 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Contact Habib on WhatsApp</span>
            </a>
            <p className="text-center text-xs text-slate-400 mt-2 font-mono">
              +92 343 0978427
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
