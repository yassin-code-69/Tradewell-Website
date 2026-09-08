'use client';

import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import {
  PROS,
  Pro,
  scorePro,
  CITIES,
  norm
} from '@/data/tradewell';
import { SpotlightConfig, DEFAULT_SPOTLIGHT } from '@/lib/adminTypes';

export type SortOption = 'recommended' | 'rating' | 'reviews' | 'name';
export type ModalType = 'profile' | 'estimate' | 'contact' | 'join' | null;

interface ScoredPro {
  pro: Pro;
  score: number;
}

export interface NewLeadInput {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  proId?: string;
  proName?: string;
  category?: string;
  projectType?: string;
  notes?: string;
  source?: 'contact_modal' | 'estimate_modal' | 'join_modal';
}

interface DirectoryContextType {
  isDirectoryOpen: boolean;
  openDirectory: (term?: string, city?: string) => void;
  closeDirectory: () => void;

  term: string;
  setTerm: (term: string) => void;
  city: string;
  setCity: (city: string) => void;
  category: string;
  setCategory: (category: string) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  fast: boolean;
  setFast: (fast: boolean) => void;
  sort: SortOption;
  setSort: (sort: SortOption) => void;

  resetFilters: () => void;
  clearFilter: (filterKey: 'category' | 'city' | 'rating' | 'fast') => void;

  pros: Pro[];
  spotlight: SpotlightConfig;
  results: ScoredPro[];
  submitLead: (input: NewLeadInput) => Promise<boolean>;

  modalType: ModalType;
  activeProId: string | null;
  openProfile: (proId: string) => void;
  openEstimate: (proId: string) => void;
  openContact: (proId: string) => void;
  openJoin: () => void;
  closeModal: () => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;

  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;

  handleQuickSearch: (term: string) => void;
  handleCityClick: (cityName: string) => void;
}

const DirectoryContext = createContext<DirectoryContextType | null>(null);

export function DirectoryProvider({ children }: { children: React.ReactNode }) {
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [term, setTerm] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [fast, setFast] = useState(false);
  const [sort, setSort] = useState<SortOption>('recommended');

  const [modalType, setModalType] = useState<ModalType>(null);
  const [activeProId, setActiveProId] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Dynamic pros and spotlight fetched from admin database
  const [pros, setPros] = useState<Pro[]>(PROS);
  const [spotlight, setSpotlight] = useState<SpotlightConfig>(DEFAULT_SPOTLIGHT);

  // Load live data from /api/admin/data
  const refreshData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/data');
      const data = await res.json();
      if (data.success) {
        if (data.pros && data.pros.length > 0) setPros(data.pros);
        if (data.spotlight) setSpotlight(data.spotlight);
      }
    } catch {
      // Graceful fallback to initial values
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Compute filtered & sorted results using dynamic pros
  const results = useMemo(() => {
    // 1. Score
    const scored = pros.map((p) => ({
      pro: p,
      score: scorePro(p, term, city)
    })).filter((r) => r.score > 0);

    // 2. Filter
    const filtered = scored.filter((r) => {
      const p = r.pro;
      if (minRating > 0 && p.rating < minRating) return false;
      if (category && !p.categories.includes(category)) return false;
      if (city && !p.covers.some((c) => norm(c) === norm(city))) return false;
      if (fast && !/hour|same day/i.test(p.responds)) return false;
      return true;
    });

    // 3. Sort
    const sorted = [...filtered];
    if (sort === 'rating') {
      sorted.sort((a, b) => b.pro.rating - a.pro.rating || b.score - a.score);
    } else if (sort === 'reviews') {
      sorted.sort((a, b) => (b.pro.reviews || 0) - (a.pro.reviews || 0));
    } else if (sort === 'name') {
      sorted.sort((a, b) => a.pro.name.localeCompare(b.pro.name));
    } else {
      sorted.sort((a, b) => b.score - a.score);
    }

    return sorted;
  }, [pros, term, city, category, minRating, fast, sort]);

  const openDirectory = (searchQuery?: string, searchCity?: string) => {
    if (searchQuery !== undefined) setTerm(searchQuery);
    if (searchCity !== undefined) setCity(searchCity);
    setIsDirectoryOpen(true);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const closeDirectory = () => {
    setIsDirectoryOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const resetFilters = () => {
    setCategory('');
    setCity('');
    setMinRating(0);
    setFast(false);
  };

  const clearFilter = (filterKey: 'category' | 'city' | 'rating' | 'fast') => {
    if (filterKey === 'category') setCategory('');
    if (filterKey === 'city') setCity('');
    if (filterKey === 'rating') setMinRating(0);
    if (filterKey === 'fast') setFast(false);
  };

  const handleQuickSearch = (quickTerm: string) => {
    setTerm(quickTerm);
    setIsDrawerOpen(false);
    openDirectory(quickTerm);
  };

  const handleCityClick = (cityName: string) => {
    const cleanCity = cityName.split(',')[0].trim();
    setCity(cleanCity);
    openDirectory(term, cleanCity);
  };

  const openProfile = (proId: string) => {
    setActiveProId(proId);
    setModalType('profile');
  };

  const openEstimate = (proId: string) => {
    setActiveProId(proId);
    setModalType('estimate');
  };

  const openContact = (proId: string) => {
    setActiveProId(proId);
    setModalType('contact');
  };

  const openJoin = () => {
    setModalType('join');
  };

  const closeModal = () => {
    setModalType(null);
    setActiveProId(null);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Submit Lead to API
  const submitLead = async (input: NewLeadInput): Promise<boolean> => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
      const data = await res.json();
      return !!data.success;
    } catch {
      return false;
    }
  };

  // Lock body when modal is open
  useEffect(() => {
    if (modalType || isDrawerOpen) {
      document.body.classList.add('is-locked');
    } else {
      document.body.classList.remove('is-locked');
    }
    return () => {
      document.body.classList.remove('is-locked');
    };
  }, [modalType, isDrawerOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (modalType) closeModal();
        if (isDrawerOpen) closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalType, isDrawerOpen]);

  return (
    <DirectoryContext.Provider
      value={{
        isDirectoryOpen,
        openDirectory,
        closeDirectory,
        term,
        setTerm,
        city,
        setCity,
        category,
        setCategory,
        minRating,
        setMinRating,
        fast,
        setFast,
        sort,
        setSort,
        resetFilters,
        clearFilter,
        pros,
        spotlight,
        results,
        submitLead,
        modalType,
        activeProId,
        openProfile,
        openEstimate,
        openContact,
        openJoin,
        closeModal,
        toastMessage,
        showToast,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        handleQuickSearch,
        handleCityClick,
      }}
    >
      {children}
    </DirectoryContext.Provider>
  );
}

export function useDirectory() {
  const ctx = useContext(DirectoryContext);
  if (!ctx) {
    throw new Error('useDirectory must be used within a DirectoryProvider');
  }
  return ctx;
}
