import {
  User,
  Pencil,
  Package,
  Heart,
  ShoppingCart,
  MapPin,
  LogOut,
  ChevronRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { OrderRecord } from '../types/shop';

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenTrackOrder?: () => void;
  orders?: OrderRecord[];
}

interface ProfileData {
  name: string;
  email: string;
  greeting: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  isActive: boolean;
}

const DEFAULT_PROFILE: ProfileData = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  greeting: 'Welcome to Momento Shop!',
  phone: '+91 94470 12345',
  address: 'AM Road, Near St. George Cathedral',
  city: 'Kothamangalam, Kerala',
  pincode: '686691',
  isActive: true,
};

const PROFILE_STORAGE_KEY = 'momento_profile_v1';

export function Header({
  cartCount = 0,
  onOpenCart,
  onOpenTrackOrder,
  orders = [],
}: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as ProfileData) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [view, setView] = useState<
    'main' | 'edit-profile' | 'personal-info' | 'wishlist' | 'addresses' | 'logout-confirm'
  >('main');

  // Edit form state
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editGreeting, setEditGreeting] = useState(profile.greeting);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Close profile dropdown on click outside or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
        setView('main');
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
        setView('main');
      }
    }

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileOpen]);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ProfileData = {
      ...profile,
      name: editName.trim() || 'Alex Morgan',
      email: editEmail.trim() || 'alex@example.com',
      greeting: editGreeting.trim() || 'Welcome to Momento Shop!',
    };
    setProfile(updated);
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setView('main');
    }, 500);
  };

  const handleLogout = () => {
    const guestProfile: ProfileData = {
      name: 'Guest Patron',
      email: 'patron@todaymementos.com',
      greeting: 'Welcome to Momento Shop!',
      phone: '+91 94470 00000',
      address: 'AM Road, Kothamangalam',
      city: 'Kothamangalam, Kerala',
      pincode: '686691',
      isActive: false,
    };
    setProfile(guestProfile);
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(guestProfile));
    } catch {
      // Ignore
    }
    setView('main');
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6DCC5]">
      {/* Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Wordmark & Local Tagline */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#top"
            onClick={(e) => scrollToSection('top', e)}
            className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
          >
            <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#B89628] transition-colors whitespace-nowrap">
              Today Mementos
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#8E6718] font-medium hidden xs:block">
              Kothamangalam · Premier Trophy Atelier
            </span>
          </a>
        </div>

        {/* Minimal Navigation Bar Items (Home, Collection, About Us, User/Profile icon) */}
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-4 sm:gap-6 md:gap-8 shrink-0"
        >
          {/* 1. Home */}
          <a
            href="#top"
            onClick={(e) => scrollToSection('top', e)}
            className="text-xs sm:text-sm font-medium text-[#4A443C] hover:text-[#1A1A1A] underline-offset-8 hover:underline decoration-[#D4AF37] transition-colors whitespace-nowrap py-1"
          >
            Home
          </a>

          {/* 2. Collection */}
          <a
            href="#collection"
            onClick={(e) => scrollToSection('collection', e)}
            className="text-xs sm:text-sm font-medium text-[#4A443C] hover:text-[#1A1A1A] underline-offset-8 hover:underline decoration-[#D4AF37] transition-colors whitespace-nowrap py-1"
          >
            Collection
          </a>

          {/* 3. About Us */}
          <a
            href="#about"
            onClick={(e) => scrollToSection('about', e)}
            className="text-xs sm:text-sm font-medium text-[#4A443C] hover:text-[#1A1A1A] underline-offset-8 hover:underline decoration-[#D4AF37] transition-colors whitespace-nowrap py-1"
          >
            About Us
          </a>

          {/* 4. User/Profile icon with Anchored Dropdown Popup */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen((prev) => !prev);
                setView('main');
                setEditName(profile.name);
                setEditEmail(profile.email);
                setEditGreeting(profile.greeting);
              }}
              title="User / Profile"
              aria-label="User Profile"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
              className={`p-1.5 sm:p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] ${
                isProfileOpen
                  ? 'bg-[#1A1A1A] text-[#D4AF37]'
                  : 'text-[#4A443C] hover:text-[#1A1A1A] hover:bg-[#FAF8F4]'
              }`}
            >
              <User className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={1.75} />
              <span className="sr-only">User Profile</span>
            </button>

            {/* Profile Dropdown Popup (Popping directly from icon, styled in Atelier UI colors) */}
            {isProfileOpen && (
              <div
                className="absolute right-0 mt-2.5 w-80 sm:w-[350px] bg-white rounded-2xl shadow-2xl border border-[#E6DCC5] p-4 sm:p-5 text-[#1A1A1A] z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto"
                role="dialog"
                aria-label="User Profile"
              >
                {/* 1. MAIN PROFILE VIEW */}
                {view === 'main' && (
                  <div>
                    {/* Header: Avatar, Name, Email, Greeting & Active Badge */}
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-center gap-3">
                        {/* Illustrated Portrait Avatar with Peach Background */}
                        <div className="w-12 h-12 rounded-xl bg-[#FCE6D8] overflow-hidden flex items-center justify-center shrink-0 border border-[#E6DCC5] shadow-xs">
                          <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-label="User Avatar"
                          >
                            <rect width="100" height="100" fill="#FCE6D8" />
                            {/* Hair Back */}
                            <path
                              d="M22 45C22 28 32 16 50 16C68 16 78 28 78 45C78 60 76 78 72 85C70 80 68 65 65 60C62 55 58 52 50 52C42 52 38 55 35 60C32 65 30 80 28 85C24 78 22 60 22 45Z"
                              fill="#78350F"
                            />
                            {/* Neck */}
                            <rect x="44" y="58" width="12" height="16" rx="3" fill="#E0A98B" />
                            {/* Sweater */}
                            <path
                              d="M24 88C24 76 34 72 42 72H58C66 72 76 76 76 88V100H24V88Z"
                              fill="#A44A3F"
                            />
                            <path
                              d="M42 72C42 76 46 80 50 80C54 80 58 76 58 72H42Z"
                              fill="#E0A98B"
                            />
                            {/* Face */}
                            <ellipse cx="50" cy="46" rx="17" ry="19" fill="#F6C5AF" />
                            {/* Front Hair Waves */}
                            <path
                              d="M33 36C34 26 42 22 50 22C58 22 66 26 67 36C63 32 58 31 50 31C42 31 37 32 33 36Z"
                              fill="#8D4925"
                            />
                            <path
                              d="M33 36C31 46 29 58 34 68C32 58 35 48 37 42C35 40 34 38 33 36Z"
                              fill="#8D4925"
                            />
                            <path
                              d="M67 36C69 46 71 58 66 68C68 58 65 48 63 42C65 40 66 38 67 36Z"
                              fill="#8D4925"
                            />
                            {/* Eyes */}
                            <circle cx="43.5" cy="45" r="2.2" fill="#3E2723" />
                            <circle cx="56.5" cy="45" r="2.2" fill="#3E2723" />
                            {/* Smile */}
                            <path
                              d="M45.5 53.5C47.5 56 52.5 56 54.5 53.5"
                              stroke="#8D4925"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                            {/* Cheeks */}
                            <ellipse cx="40" cy="49" rx="3" ry="1.5" fill="#F472B6" opacity="0.35" />
                            <ellipse cx="60" cy="49" rx="3" ry="1.5" fill="#F472B6" opacity="0.35" />
                          </svg>
                        </div>

                        {/* Name, Email & Greeting */}
                        <div>
                          <h3 className="font-bold text-[#1A1A1A] text-sm sm:text-base leading-tight">
                            {profile.name}
                          </h3>
                          <p className="text-[11px] text-[#7A7266] font-normal">{profile.email}</p>
                          <p className="text-[11px] text-[#8E6718] font-medium mt-0.5">
                            {profile.greeting}
                          </p>
                        </div>
                      </div>

                      {/* Active Status Badge */}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 border ${
                          profile.isActive
                            ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]'
                            : 'bg-[#F5F5F5] text-[#757575] border-[#E0E0E0]'
                        }`}
                      >
                        {profile.isActive ? 'Active' : 'Guest'}
                      </span>
                    </div>

                    {/* Edit Profile Full Width Pill Button */}
                    <button
                      type="button"
                      onClick={() => setView('edit-profile')}
                      className="w-full mt-3 py-1.5 px-3 rounded-full border border-[#E6DCC5] bg-[#FAF8F4] hover:bg-white hover:border-[#8E6718] transition-all flex items-center justify-center gap-1.5 text-xs font-semibold text-[#1A1A1A] cursor-pointer group shadow-2xs"
                    >
                      <Pencil className="w-3.5 h-3.5 text-[#8E6718] group-hover:text-[#B89628] transition-colors" />
                      <span>Edit Profile</span>
                    </button>

                    {/* Divider */}
                    <div className="border-b border-[#E6DCC5] my-3" />

                    {/* Section 1: My Account */}
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8E6718] mb-1 px-1">
                        My Account
                      </h4>
                      <button
                        type="button"
                        onClick={() => setView('personal-info')}
                        className="w-full flex items-center justify-between p-2 hover:bg-[#FAF8F4] rounded-lg transition-colors text-left group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-[#8E6718] group-hover:text-[#1A1A1A] transition-colors" strokeWidth={1.75} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#1A1A1A]">
                              Personal Information
                            </p>
                            <p className="text-[11px] text-[#7A7266]">
                              View and edit your details
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-[#B8AF9F] group-hover:text-[#1A1A1A] transition-colors" />
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="border-b border-[#E6DCC5] my-3" />

                    {/* Section 2: My Shopping */}
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8E6718] mb-1 px-1">
                        My Shopping
                      </h4>
                      <div className="space-y-0.5">
                        {/* My Orders */}
                        <button
                          type="button"
                          onClick={() => {
                            setIsProfileOpen(false);
                            onOpenTrackOrder?.();
                          }}
                          className="w-full flex items-center justify-between p-2 hover:bg-[#FAF8F4] rounded-lg transition-colors text-left group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-5 flex items-center justify-center shrink-0">
                              <Package className="w-4 h-4 text-[#8E6718] group-hover:text-[#1A1A1A] transition-colors" strokeWidth={1.75} />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-[#1A1A1A]">My Orders</p>
                              <p className="text-[11px] text-[#7A7266]">
                                Track and view your orders
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#B8AF9F] group-hover:text-[#1A1A1A] transition-colors" />
                        </button>

                        {/* My Wishlist */}
                        <button
                          type="button"
                          onClick={() => setView('wishlist')}
                          className="w-full flex items-center justify-between p-2 hover:bg-[#FAF8F4] rounded-lg transition-colors text-left group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-5 flex items-center justify-center shrink-0">
                              <Heart className="w-4 h-4 text-[#8E6718] group-hover:text-[#1A1A1A] transition-colors" strokeWidth={1.75} />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-[#1A1A1A]">My Wishlist</p>
                              <p className="text-[11px] text-[#7A7266]">
                                Your saved favourite products
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#B8AF9F] group-hover:text-[#1A1A1A] transition-colors" />
                        </button>

                        {/* My Cart */}
                        <button
                          type="button"
                          onClick={() => {
                            setIsProfileOpen(false);
                            onOpenCart?.();
                          }}
                          className="w-full flex items-center justify-between p-2 hover:bg-[#FAF8F4] rounded-lg transition-colors text-left group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-5 flex items-center justify-center shrink-0">
                              <ShoppingCart className="w-4 h-4 text-[#8E6718] group-hover:text-[#1A1A1A] transition-colors" strokeWidth={1.75} />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-[#1A1A1A]">
                                My Cart {cartCount > 0 && `(${cartCount})`}
                              </p>
                              <p className="text-[11px] text-[#7A7266]">
                                View items added to your cart
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#B8AF9F] group-hover:text-[#1A1A1A] transition-colors" />
                        </button>

                        {/* My Addresses */}
                        <button
                          type="button"
                          onClick={() => setView('addresses')}
                          className="w-full flex items-center justify-between p-2 hover:bg-[#FAF8F4] rounded-lg transition-colors text-left group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-5 flex items-center justify-center shrink-0">
                              <MapPin className="w-4 h-4 text-[#8E6718] group-hover:text-[#1A1A1A] transition-colors" strokeWidth={1.75} />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-[#1A1A1A]">My Addresses</p>
                              <p className="text-[11px] text-[#7A7266]">
                                Manage delivery addresses
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#B8AF9F] group-hover:text-[#1A1A1A] transition-colors" />
                        </button>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-b border-[#E6DCC5] my-3" />

                    {/* Section 3: Account */}
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8E6718] mb-1 px-1">
                        Account
                      </h4>
                      <button
                        type="button"
                        onClick={() => setView('logout-confirm')}
                        className="w-full flex items-center justify-between p-2 hover:bg-[#FEF2F2] rounded-lg transition-colors text-left group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 flex items-center justify-center shrink-0">
                            <LogOut className="w-4 h-4 text-[#DC2626]" strokeWidth={1.75} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#DC2626]">Logout</p>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-[#FCA5A5] group-hover:text-[#DC2626] transition-colors" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. EDIT PROFILE VIEW */}
                {view === 'edit-profile' && (
                  <div>
                    <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-[#E6DCC5]">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setView('main')}
                          className="p-1 text-[#7A7266] hover:text-[#1A1A1A] rounded hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <h3 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
                          Edit Profile
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setView('main')}
                        className="p-1 text-[#7A7266] hover:text-[#1A1A1A] rounded hover:bg-[#FAF8F4]"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveProfile} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#4A443C] mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          required
                          className="w-full px-2.5 py-1.5 bg-[#FAF8F4] border border-[#E6DCC5] rounded-md text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                          placeholder="Alex Morgan"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#4A443C] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          required
                          className="w-full px-2.5 py-1.5 bg-[#FAF8F4] border border-[#E6DCC5] rounded-md text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                          placeholder="alex@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#4A443C] mb-1">
                          Greeting / Tagline
                        </label>
                        <input
                          type="text"
                          value={editGreeting}
                          onChange={(e) => setEditGreeting(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-[#FAF8F4] border border-[#E6DCC5] rounded-md text-xs text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                          placeholder="Welcome to Momento Shop!"
                        />
                      </div>

                      {saveSuccess && (
                        <div className="flex items-center gap-1.5 text-xs text-[#2E7D32] bg-[#E8F5E9] border border-[#C8E6C9] p-2 rounded-md">
                          <Check className="w-3.5 h-3.5" />
                          <span>Saved successfully!</span>
                        </div>
                      )}

                      <div className="flex gap-2 pt-1.5">
                        <button
                          type="button"
                          onClick={() => setView('main')}
                          className="flex-1 py-1.5 px-3 border border-[#E6DCC5] text-xs font-semibold text-[#645D54] hover:bg-[#FAF8F4] rounded-md transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-1.5 px-3 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* 3. PERSONAL INFORMATION VIEW */}
                {view === 'personal-info' && (
                  <div>
                    <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-[#E6DCC5]">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setView('main')}
                          className="p-1 text-[#7A7266] hover:text-[#1A1A1A] rounded hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <h3 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
                          Personal Info
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 bg-[#FAF8F4] border border-[#E6DCC5] rounded-md">
                        <p className="text-[10px] uppercase text-[#7A7266] font-medium">Full Name</p>
                        <p className="font-semibold text-[#1A1A1A] mt-0.5">{profile.name}</p>
                      </div>
                      <div className="p-2.5 bg-[#FAF8F4] border border-[#E6DCC5] rounded-md">
                        <p className="text-[10px] uppercase text-[#7A7266] font-medium">Email</p>
                        <p className="font-semibold text-[#1A1A1A] mt-0.5">{profile.email}</p>
                      </div>
                      <div className="p-2.5 bg-[#FAF8F4] border border-[#E6DCC5] rounded-md">
                        <p className="text-[10px] uppercase text-[#7A7266] font-medium">Contact Phone</p>
                        <p className="font-semibold text-[#1A1A1A] mt-0.5">{profile.phone}</p>
                      </div>
                      <div className="p-2.5 bg-[#FAF8F4] border border-[#E6DCC5] rounded-md">
                        <p className="text-[10px] uppercase text-[#7A7266] font-medium">Atelier Membership</p>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[#8E6718] font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Active Momento Patron</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setView('main')}
                      className="w-full mt-3 py-1.5 px-3 bg-[#FAF8F4] hover:bg-[#F2EBD9] border border-[#E6DCC5] rounded-md text-xs font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
                    >
                      Back to Menu
                    </button>
                  </div>
                )}

                {/* 4. MY WISHLIST VIEW */}
                {view === 'wishlist' && (
                  <div>
                    <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-[#E6DCC5]">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setView('main')}
                          className="p-1 text-[#7A7266] hover:text-[#1A1A1A] rounded hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <h3 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
                          My Wishlist
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 bg-[#FAF8F4] border border-[#E6DCC5] rounded-md flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold text-[#1A1A1A]">Grand Victory Winged Cup</p>
                          <p className="text-[11px] text-[#8E6718] font-bold mt-0.5">₹485</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsProfileOpen(false);
                            document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-2 py-1 text-[10px] font-bold bg-[#1A1A1A] text-white rounded hover:bg-[#2A2A2A] transition-colors cursor-pointer"
                        >
                          View Piece
                        </button>
                      </div>

                      <div className="p-2.5 bg-[#FAF8F4] border border-[#E6DCC5] rounded-md flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold text-[#1A1A1A]">Aurelian Crystal Obelisk</p>
                          <p className="text-[11px] text-[#8E6718] font-bold mt-0.5">₹245</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsProfileOpen(false);
                            document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-2 py-1 text-[10px] font-bold bg-[#1A1A1A] text-white rounded hover:bg-[#2A2A2A] transition-colors cursor-pointer"
                        >
                          View Piece
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setView('main')}
                      className="w-full mt-3 py-1.5 px-3 bg-[#FAF8F4] hover:bg-[#F2EBD9] border border-[#E6DCC5] rounded-md text-xs font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
                    >
                      Back to Menu
                    </button>
                  </div>
                )}

                {/* 5. MY ADDRESSES VIEW */}
                {view === 'addresses' && (
                  <div>
                    <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-[#E6DCC5]">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setView('main')}
                          className="p-1 text-[#7A7266] hover:text-[#1A1A1A] rounded hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <h3 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
                          My Addresses
                        </h3>
                      </div>
                    </div>

                    <div className="p-3 bg-[#FAF8F4] border border-[#E6DCC5] rounded-md">
                      <span className="inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] font-bold mb-1.5">
                        Default Kerala Delivery
                      </span>
                      <p className="text-xs font-bold text-[#1A1A1A]">{profile.name}</p>
                      <p className="text-xs text-[#645D54] mt-0.5">{profile.address}</p>
                      <p className="text-xs text-[#645D54]">{profile.city} — {profile.pincode}</p>
                      <p className="text-[11px] text-[#8E6718] font-semibold mt-1.5">
                        Complimentary Insured Delivery Eligible
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setView('main')}
                      className="w-full mt-3 py-1.5 px-3 bg-[#FAF8F4] hover:bg-[#F2EBD9] border border-[#E6DCC5] rounded-md text-xs font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
                    >
                      Back to Menu
                    </button>
                  </div>
                )}

                {/* 6. LOGOUT CONFIRMATION VIEW */}
                {view === 'logout-confirm' && (
                  <div className="text-center py-1">
                    <div className="w-10 h-10 rounded-full bg-[#FEF2F2] border border-[#FCA5A5] flex items-center justify-center mx-auto text-[#DC2626] mb-2.5">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-[#1A1A1A]">Sign Out of Momento Shop?</h3>
                    <p className="text-[11px] text-[#7A7266] mt-1 max-w-xs mx-auto">
                      You will be switched to a guest patron session.
                    </p>

                    <div className="flex gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => setView('main')}
                        className="flex-1 py-1.5 px-2.5 border border-[#E6DCC5] text-xs font-semibold text-[#645D54] hover:bg-[#FAF8F4] rounded-md transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex-1 py-1.5 px-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
