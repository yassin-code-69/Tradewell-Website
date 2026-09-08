'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pro, CORE_CATEGORIES } from '@/data/tradewell';
import { SpotlightConfig, LeadItem } from '@/lib/adminTypes';
import { StarRating, PinIcon, PhoneIcon } from '@/components/ui/Icons';

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data state
  const [pros, setPros] = useState<Pro[]>([]);
  const [spotlight, setSpotlight] = useState<SpotlightConfig | null>(null);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Active tab
  const [activeTab, setActiveTab] = useState<'pros' | 'spotlight' | 'leads' | 'settings'>('pros');

  // Filter & search for pros
  const [proSearch, setProSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Editing pro modal
  const [editingPro, setEditingPro] = useState<Pro | null>(null);
  const [isSavingPro, setIsSavingPro] = useState(false);

  // Quick score edits map { [proId]: score }
  const [quickScores, setQuickScores] = useState<Record<string, number>>({});
  const [savingScoreId, setSavingScoreId] = useState<string | null>(null);

  // Spotlight editing form state
  const [spotlightForm, setSpotlightForm] = useState<SpotlightConfig | null>(null);
  const [isSavingSpotlight, setIsSavingSpotlight] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showManualUrlInput, setShowManualUrlInput] = useState(false);
  const spotlightFileInputRef = useRef<HTMLInputElement>(null);

  // Leads filter
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | 'new' | 'contacted' | 'completed'>('all');

  // Toast feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // 1. Check Auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();
        setIsAuthenticated(!!data.authenticated);
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  // 2. Fetch Data once authenticated
  const fetchData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const res = await fetch('/api/admin/data');
      const data = await res.json();
      if (data.success) {
        setPros(data.pros || []);
        setSpotlight(data.spotlight || null);
        setSpotlightForm(data.spotlight || null);
        setLeads(data.leads || []);

        // Prepopulate quick scores
        const scoresMap: Record<string, number> = {};
        (data.pros || []).forEach((p: Pro) => {
          scoresMap[p.id] = p.tradewellScore || 95;
        });
        setQuickScores(scoresMap);
      }
    } catch {
      showToast('Error loading database', 'error');
    } finally {
      setIsLoadingData(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  // Handle Login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        showToast('Welcome to Tradewell Admin Portal');
      } else {
        setAuthError(data.error || 'Incorrect passcode');
      }
    } catch {
      setAuthError('Connection error. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  }

  // Handle Logout
  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
    setPasscode('');
  }

  // Quick update Tradewell Score
  async function handleSaveQuickScore(proId: string) {
    const newScore = quickScores[proId];
    if (newScore == null || newScore < 0 || newScore > 100) {
      showToast('Score must be between 0 and 100', 'error');
      return;
    }

    setSavingScoreId(proId);
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_pro',
          proId,
          updates: { tradewellScore: Number(newScore) }
        })
      });
      const data = await res.json();
      if (data.success) {
        setPros((prev) => prev.map((p) => (p.id === proId ? { ...p, tradewellScore: Number(newScore) } : p)));
        showToast(`Tradewell Score updated to ${newScore}`);
      } else {
        showToast(data.error || 'Failed to update score', 'error');
      }
    } catch {
      showToast('Network error updating score', 'error');
    } finally {
      setSavingScoreId(null);
    }
  }

  // Save Full Pro Edit Modal
  async function handleSaveProModal(e: React.FormEvent) {
    e.preventDefault();
    if (!editingPro) return;

    setIsSavingPro(true);
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_pro',
          proId: editingPro.id,
          updates: editingPro
        })
      });
      const data = await res.json();
      if (data.success) {
        setPros((prev) => prev.map((p) => (p.id === editingPro.id ? editingPro : p)));
        setQuickScores((prev) => ({ ...prev, [editingPro.id]: editingPro.tradewellScore || 95 }));
        setEditingPro(null);
        showToast(`Saved changes for ${editingPro.name}`);
      } else {
        showToast(data.error || 'Failed to save contractor details', 'error');
      }
    } catch {
      showToast('Error saving contractor', 'error');
    } finally {
      setIsSavingPro(false);
    }
  }

  // Handle Image File Upload
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.success && data.url) {
        if (spotlightForm) {
          setSpotlightForm({ ...spotlightForm, projectImage: data.url });
        }
        showToast(`Photo "${file.name}" uploaded successfully!`);
      } else {
        showToast(data.error || 'Failed to upload photo', 'error');
      }
    } catch {
      showToast('Network error uploading image', 'error');
    } finally {
      setIsUploadingImage(false);
      if (e.target) e.target.value = '';
    }
  }

  // Save Spotlight Form
  async function handleSaveSpotlight(e: React.FormEvent) {
    e.preventDefault();
    if (!spotlightForm) return;

    setIsSavingSpotlight(true);
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_spotlight',
          spotlight: spotlightForm
        })
      });
      const data = await res.json();
      if (data.success) {
        setSpotlight(spotlightForm);
        showToast('Weekly Contractor Spotlight published successfully!');
      } else {
        showToast(data.error || 'Failed to publish spotlight', 'error');
      }
    } catch {
      showToast('Error publishing spotlight', 'error');
    } finally {
      setIsSavingSpotlight(false);
    }
  }

  // Update Lead Status
  async function handleUpdateLeadStatus(leadId: string, status: LeadItem['status']) {
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, status })
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status } : l)));
        showToast(`Lead marked as ${status}`);
      }
    } catch {
      showToast('Error updating lead status', 'error');
    }
  }

  // Delete Lead
  async function handleDeleteLead(leadId: string) {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/leads?id=${leadId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        showToast('Lead removed from inbox');
      }
    } catch {
      showToast('Error deleting lead', 'error');
    }
  }

  // Export CSV
  function handleExportLeadsCSV() {
    if (leads.length === 0) {
      showToast('No leads to export', 'error');
      return;
    }
    const headers = ['Date', 'Name', 'Phone', 'Email', 'City', 'Contractor', 'Category', 'Project Type', 'Status', 'Notes'];
    const rows = leads.map((l) => [
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.city || ''}"`,
      `"${(l.proName || '').replace(/"/g, '""')}"`,
      `"${l.category || ''}"`,
      `"${(l.projectType || '').replace(/"/g, '""')}"`,
      l.status,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tradewell_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Filtered Pros
  const filteredPros = useMemo(() => {
    return pros.filter((p) => {
      const matchesSearch =
        proSearch.trim() === '' ||
        p.name.toLowerCase().includes(proSearch.toLowerCase()) ||
        p.city.toLowerCase().includes(proSearch.toLowerCase());
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory || p.categories.includes(selectedCategory);
      return matchesSearch && matchesCat;
    });
  }, [pros, proSearch, selectedCategory]);

  // Selected Pro for Spotlight Live Preview
  const previewSpotlightPro = useMemo(() => {
    if (!spotlightForm) return null;
    return pros.find((p) => p.id === spotlightForm.activeProId) || pros[0] || null;
  }, [pros, spotlightForm]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    if (leadStatusFilter === 'all') return leads;
    return leads.filter((l) => l.status === leadStatusFilter);
  }, [leads, leadStatusFilter]);

  // Stats calculation
  const averageScore = useMemo(() => {
    if (pros.length === 0) return 0;
    const sum = pros.reduce((acc, p) => acc + (p.tradewellScore || 95), 0);
    return (sum / pros.length).toFixed(1);
  }, [pros]);

  // ----------------------------------------------------
  // Render: Loading Screen
  // ----------------------------------------------------
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-bold text-[var(--ink)]">Loading Tradewell Admin...</p>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Render: Login Screen (if not authenticated)
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-[var(--line)] rounded-2xl p-8 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[var(--ink)] flex items-center justify-center text-white font-black text-xl">
              T
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--ink)] tracking-tight">Tradewell Admin</h1>
              <p className="text-xs text-[var(--muted)]">Arkansas Contractor Directory Management</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1.5">
                Administrator Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. tradewell2026)"
                className="w-full px-4 py-3 rounded-lg border border-[var(--line-2)] text-sm focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                autoFocus
                required
              />
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn btn--primary btn--block py-3 font-bold"
            >
              {isLoggingIn ? 'Verifying...' : 'Unlock Dashboard'}
            </button>

            <div className="text-center pt-2">
              <Link href="/" className="text-xs font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                ← Return to Public Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Render: Authenticated Admin Dashboard
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F7FAFC] text-[var(--ink)] flex flex-col font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg border text-sm font-bold flex items-center gap-3 transition-all transform animate-in slide-in-from-bottom-3 ${
            toast.type === 'error'
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-emerald-50 text-emerald-900 border-emerald-200'
          }`}
        >
          <span>{toast.type === 'error' ? '⚠️' : '✓'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Admin Top Navigation */}
      <header className="bg-white border-b border-[var(--line)] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--ink)] flex items-center justify-center text-white font-black text-base">
                T
              </div>
              <span className="font-extrabold text-lg tracking-tight text-[var(--ink)]">Tradewell</span>
            </Link>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--ink-2)] border border-[var(--line)]">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--ink-2)] hover:text-[var(--accent)] px-3 py-1.5 rounded-lg border border-[var(--line)] hover:bg-[var(--surface)] transition-all"
            >
              <span>View Live Website</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-bold text-red-600 hover:text-red-800 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-[var(--line)] shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
              Verified Contractors
            </div>
            <div className="text-3xl font-extrabold text-[var(--ink)]">{pros.length}</div>
            <div className="text-xs text-[var(--muted)] mt-1">Across 5 Core Trades</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[var(--line)] shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
              Average Tradewell Score
            </div>
            <div className="text-3xl font-extrabold text-[var(--ink)]">{averageScore}</div>
            <div className="text-xs text-[var(--green)] font-semibold mt-1">Northeast & Central AR</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[var(--line)] shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
              Spotlight Pro
            </div>
            <div className="text-lg font-bold text-[var(--ink)] truncate">
              {previewSpotlightPro?.name || 'Valor Roofing LLC'}
            </div>
            <div className="text-xs text-[var(--accent)] font-semibold mt-1">Weekly Arkansas Pick</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[var(--line)] shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
              Leads Captured
            </div>
            <div className="text-3xl font-extrabold text-[var(--ink)]">{leads.length}</div>
            <div className="text-xs text-[var(--muted)] mt-1">
              {leads.filter((l) => l.status === 'new').length} New Uncontacted
            </div>
          </div>
        </div>

        {/* Tab Switcher: Segmented Control Style */}
        <div className="admin-tab-bar" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'pros'}
            onClick={() => setActiveTab('pros')}
            className={`admin-tab ${activeTab === 'pros' ? 'is-active' : ''}`}
          >
            <span>Contractors & Scores</span>
            <span className="admin-tab__badge">
              {pros.length}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'spotlight'}
            onClick={() => setActiveTab('spotlight')}
            className={`admin-tab ${activeTab === 'spotlight' ? 'is-active' : ''}`}
          >
            <span>Weekly Spotlight Desk</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'spotlight'
                  ? 'bg-amber-400 text-[#0E3446]'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}
            >
              Active
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'leads'}
            onClick={() => setActiveTab('leads')}
            className={`admin-tab ${activeTab === 'leads' ? 'is-active' : ''}`}
          >
            <span>Leads & Inquiries Inbox</span>
            {leads.filter((l) => l.status === 'new').length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] text-white font-black">
                {leads.filter((l) => l.status === 'new').length} New
              </span>
            )}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
            className={`admin-tab ${activeTab === 'settings' ? 'is-active' : ''}`}
          >
            <span>Data Backups & Settings</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: CONTRACTORS & SCORES MANAGEMENT                   */}
        {/* ======================================================== */}
        {activeTab === 'pros' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-white p-4 rounded-xl border border-[var(--line)]">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={proSearch}
                  onChange={(e) => setProSearch(e.target.value)}
                  placeholder="Search contractor name or city..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[var(--line-2)] text-sm focus:outline-none focus:border-[var(--ink)]"
                />
                <svg className="w-4 h-4 absolute left-3 top-3.5 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>

              {/* Category Filter Pills */}
              <div className="admin-pill-bar">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`admin-pill ${selectedCategory === 'all' ? 'is-active' : ''}`}
                >
                  <span className="admin-pill__dot" />
                  <span>All ({pros.length})</span>
                </button>
                {CORE_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.name;
                  const count = pros.filter(
                    (p) => p.category === cat.name || p.categories.includes(cat.name)
                  ).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`admin-pill ${isSelected ? 'is-active' : ''}`}
                    >
                      <span className="admin-pill__dot" />
                      <span>{cat.name} ({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contractors List */}
            <div className="bg-white rounded-2xl border border-[var(--line)] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[var(--surface)] border-b border-[var(--line)] text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      <th className="py-3.5 px-4">Contractor</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Tradewell Score</th>
                      <th className="py-3.5 px-4">Rating & Reviews</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    {filteredPros.map((pro) => {
                      const isSaving = savingScoreId === pro.id;
                      const currentScore = quickScores[pro.id] ?? pro.tradewellScore ?? 95;
                      const isValor = pro.id.startsWith('valor-roofing');

                      return (
                        <tr key={pro.id} className="hover:bg-[var(--surface)]/50 transition-colors">
                          {/* Contractor Info */}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-none"
                                style={{ backgroundColor: pro.accent }}
                              >
                                {pro.initials}
                              </div>
                              <div>
                                <div className="font-bold text-[var(--ink)] flex items-center gap-2">
                                  <span>{pro.name}</span>
                                  {isValor && <span className="badge badge--top" style={{ fontSize: '9px', padding: '1px 6px' }}>Featured Pro</span>}
                                </div>
                                <div className="text-xs text-[var(--muted)] flex items-center gap-1 mt-0.5">
                                  <PinIcon /> {pro.city}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-4 px-4 font-medium text-[var(--ink-2)]">
                            {pro.category}
                          </td>

                          {/* Tradewell Score Quick Edit */}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={currentScore}
                                onChange={(e) =>
                                  setQuickScores((prev) => ({
                                    ...prev,
                                    [pro.id]: Number(e.target.value)
                                  }))
                                }
                                className="w-16 px-2 py-1 text-center font-extrabold text-[var(--ink)] rounded-md border border-[var(--line-2)] text-base focus:outline-none focus:border-[var(--accent)]"
                              />
                              <span className="text-xs text-[var(--muted)]">/100</span>
                              {currentScore !== pro.tradewellScore && (
                                <button
                                  type="button"
                                  disabled={isSaving}
                                  onClick={() => handleSaveQuickScore(pro.id)}
                                  className="text-xs font-bold px-2.5 py-1 rounded bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
                                >
                                  {isSaving ? '...' : 'Save'}
                                </button>
                              )}
                            </div>
                          </td>

                          {/* Rating & Reviews */}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-[var(--ink)]">★ {pro.rating.toFixed(1)}</span>
                              <span className="text-xs text-[var(--muted)]">({pro.reviews} reviews)</span>
                            </div>
                            <div className="text-[11px] text-[var(--green)] font-semibold mt-0.5">
                              {pro.responds}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--green)]">
                              <span className="w-2 h-2 rounded-full bg-[var(--green)]" />
                              Verified
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setEditingPro({ ...pro })}
                              className="text-xs font-bold text-[var(--ink)] hover:text-[var(--accent)] px-3 py-1.5 rounded border border-[var(--line)] hover:bg-white transition-all shadow-2xs"
                            >
                              Edit Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: WEEKLY SPOTLIGHT DESK                             */}
        {/* ======================================================== */}
        {activeTab === 'spotlight' && spotlightForm && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Spotlight Editor Form */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-[var(--line)] shadow-xs">
              <div className="mb-6 pb-4 border-b border-[var(--line)]">
                <span className="section__eyebrow">Content Studio</span>
                <h3 className="text-xl font-bold text-[var(--ink)]">Weekly Contractor Highlight</h3>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Update the featured Arkansas contractor, project photograph, and review of the week on the homepage.
                </p>
              </div>

              <form onSubmit={handleSaveSpotlight} className="space-y-4">
                {/* Select Featured Pro */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                    Featured Contractor
                  </label>
                  <select
                    value={spotlightForm.activeProId}
                    onChange={(e) => setSpotlightForm({ ...spotlightForm, activeProId: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--line-2)] text-sm font-semibold focus:outline-none focus:border-[var(--accent)]"
                  >
                    {pros.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.category} — Score: {p.tradewellScore || 95})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                    Recent Project Headline
                  </label>
                  <input
                    type="text"
                    value={spotlightForm.projectTitle}
                    onChange={(e) => setSpotlightForm({ ...spotlightForm, projectTitle: e.target.value })}
                    placeholder="e.g. Complete Architectural Shingle Replacement & Gutters"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                {/* Project Location */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                    Project Location / Arkansas County
                  </label>
                  <input
                    type="text"
                    value={spotlightForm.projectLocation}
                    onChange={(e) => setSpotlightForm({ ...spotlightForm, projectLocation: e.target.value })}
                    placeholder="e.g. Jonesboro & Craighead County, AR"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                {/* Project Image Upload & Selection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                      Project Photograph / Image
                    </label>
                    <span className="text-[11px] text-[var(--muted)]">JPG, PNG, WebP (up to 10MB)</span>
                  </div>

                  {/* Upload Box / Action */}
                  <div className="p-4 rounded-xl border-2 border-dashed border-[var(--line-2)] hover:border-[var(--accent)] bg-[var(--surface)] transition-all flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[var(--line)] bg-white flex-shrink-0">
                      <Image
                        src={spotlightForm.projectImage || '/assets/img/roof-replacement.jpg'}
                        alt="Project Preview Thumbnail"
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-1">
                      <div className="text-xs font-bold text-[var(--ink)]">
                        Upload Weekly Jobsite Photo
                      </div>
                      <div className="text-[11px] text-[var(--muted)]">
                        Select a real photo from your computer or phone to feature in this week’s highlight
                      </div>
                      <div className="pt-1 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                        <input
                          ref={spotlightFileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="spotlight-photo-upload"
                        />
                        <button
                          type="button"
                          disabled={isUploadingImage}
                          onClick={() => spotlightFileInputRef.current?.click()}
                          className="btn btn--outline btn--sm text-xs font-bold py-1.5 px-3 flex items-center gap-1.5 cursor-pointer hover:bg-white"
                        >
                          <svg className="w-3.5 h-3.5 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <span>{isUploadingImage ? 'Uploading photo...' : '📁 Browse & Upload Photo'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setShowManualUrlInput(!showManualUrlInput)}
                          className="text-[11px] font-semibold text-[var(--muted-2)] hover:text-[var(--ink)] underline cursor-pointer"
                        >
                          {showManualUrlInput ? 'Hide URL input' : 'Or enter image URL'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Manual URL Input (collapsible) */}
                  {showManualUrlInput && (
                    <div className="pt-1">
                      <input
                        type="text"
                        value={spotlightForm.projectImage}
                        onChange={(e) => setSpotlightForm({ ...spotlightForm, projectImage: e.target.value })}
                        placeholder="Paste image URL (e.g. https://... or /assets/img/...)"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-xs focus:outline-none focus:border-[var(--accent)] font-mono"
                      />
                    </div>
                  )}

                  {/* Quick Category Presets */}
                  <div className="pt-1">
                    <span className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider block mb-1.5">
                      Or pick from trade presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSpotlightForm({ ...spotlightForm, projectImage: '/assets/img/roof-replacement.jpg' })}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md border transition-all ${
                          spotlightForm.projectImage === '/assets/img/roof-replacement.jpg'
                            ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                            : 'bg-white text-[var(--ink-2)] border-[var(--line)] hover:border-[var(--ink-3)]'
                        }`}
                      >
                        Roofing Preset
                      </button>
                      <button
                        type="button"
                        onClick={() => setSpotlightForm({ ...spotlightForm, projectImage: '/assets/img/hvac-2.jpg' })}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md border transition-all ${
                          spotlightForm.projectImage === '/assets/img/hvac-2.jpg'
                            ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                            : 'bg-white text-[var(--ink-2)] border-[var(--line)] hover:border-[var(--ink-3)]'
                        }`}
                      >
                        HVAC Preset
                      </button>
                      <button
                        type="button"
                        onClick={() => setSpotlightForm({ ...spotlightForm, projectImage: '/assets/img/electrical-2.jpg' })}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md border transition-all ${
                          spotlightForm.projectImage === '/assets/img/electrical-2.jpg'
                            ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                            : 'bg-white text-[var(--ink-2)] border-[var(--line)] hover:border-[var(--ink-3)]'
                        }`}
                      >
                        Electrical Preset
                      </button>
                      <button
                        type="button"
                        onClick={() => setSpotlightForm({ ...spotlightForm, projectImage: '/assets/img/landscaping.jpg' })}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md border transition-all ${
                          spotlightForm.projectImage === '/assets/img/landscaping.jpg'
                            ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                            : 'bg-white text-[var(--ink-2)] border-[var(--line)] hover:border-[var(--ink-3)]'
                        }`}
                      >
                        Lawn/Garden Preset
                      </button>
                    </div>
                  </div>
                </div>

                {/* Editor's Weekly Note */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                    Editor’s Weekly Note (Why They Were Selected)
                  </label>
                  <textarea
                    rows={4}
                    value={spotlightForm.editorialNote}
                    onChange={(e) => setSpotlightForm({ ...spotlightForm, editorialNote: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                {/* Homeowner Review Quote */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                    Homeowner Review of the Week Quote
                  </label>
                  <textarea
                    rows={3}
                    value={spotlightForm.reviewQuote}
                    onChange={(e) => setSpotlightForm({ ...spotlightForm, reviewQuote: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                {/* Review Author */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                    Review Author Citation
                  </label>
                  <input
                    type="text"
                    value={spotlightForm.reviewAuthor}
                    onChange={(e) => setSpotlightForm({ ...spotlightForm, reviewAuthor: e.target.value })}
                    placeholder="e.g. Marcus T., Jonesboro homeowner (Verified Customer)"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
                  <span className="text-xs text-[var(--muted)]">Updates will immediately reflect on homepage</span>
                  <button
                    type="submit"
                    disabled={isSavingSpotlight}
                    className="btn btn--primary px-6 py-2.5 font-bold shadow-sm"
                  >
                    {isSavingSpotlight ? 'Publishing...' : 'Publish Spotlight'}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Live Homepage Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                  Live Homepage Preview
                </span>
                <span className="text-xs font-semibold text-[var(--green)]">● Real-time Preview</span>
              </div>

              {previewSpotlightPro && (
                <article className="bg-white border border-[var(--line)] rounded-2xl overflow-hidden shadow-md flex flex-col">
                  <div className="relative w-full aspect-[16/10] bg-[var(--surface)]">
                    <Image
                      src={spotlightForm.projectImage}
                      alt="Project Preview"
                      fill
                      className="object-cover"
                      sizes="600px"
                    />
                  </div>
                  <div className="p-4 bg-[var(--surface)] border-b border-[var(--line)]">
                    <span className="section__eyebrow" style={{ marginBottom: '2px', display: 'block' }}>
                      Recent Project
                    </span>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)' }}>
                      {spotlightForm.projectTitle}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
                      <PinIcon /> {spotlightForm.projectLocation}
                    </div>
                  </div>

                  <div className="p-6">
                    <div>
                      <div className="pro-card__head">
                        <h3 className="pro-card__name" style={{ fontSize: '22px' }}>
                          {previewSpotlightPro.name}
                        </h3>
                        <span className="badge badge--top">Featured Pro</span>
                      </div>

                      <div className="pro-card__row" style={{ marginTop: '8px', fontSize: '13px' }}>
                        <span className="pro-card__rating">
                          <StarRating rating={previewSpotlightPro.rating} />
                          <span className="num">{previewSpotlightPro.rating.toFixed(1)}</span>
                          <span className="cnt">({previewSpotlightPro.reviews} reviews)</span>
                        </span>
                        <span className="pro-card__score">
                          Tradewell Score: <b>{previewSpotlightPro.tradewellScore || 99}/100</b>
                        </span>
                      </div>

                      <p className="text-xs leading-relaxed text-[var(--ink-2)] mt-4">
                        {spotlightForm.editorialNote}
                      </p>

                      <div className="mt-4 p-4 rounded-xl bg-[var(--surface)] border border-[var(--line)]">
                        <blockquote className="text-xs italic text-[var(--ink)] m-0">
                          &ldquo;{spotlightForm.reviewQuote}&rdquo;
                        </blockquote>
                        <div className="text-[11px] text-[var(--muted)] font-semibold mt-1.5">
                          — {spotlightForm.reviewAuthor}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[var(--line)] flex items-center gap-2">
                      <button type="button" className="btn btn--phone btn--sm">
                        <PhoneIcon />
                        <span>Call Pro</span>
                      </button>
                      <button type="button" className="btn btn--primary btn--sm">
                        Send Info
                      </button>
                    </div>
                  </div>
                </article>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: LEADS & INQUIRIES INBOX                           */}
        {/* ======================================================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-4 rounded-xl border border-[var(--line)]">
              <div className="admin-pill-bar">
                <button
                  type="button"
                  onClick={() => setLeadStatusFilter('all')}
                  className={`admin-pill ${leadStatusFilter === 'all' ? 'is-active' : ''}`}
                >
                  <span className="admin-pill__dot" />
                  <span>All Inquiries ({leads.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLeadStatusFilter('new')}
                  className={`admin-pill ${leadStatusFilter === 'new' ? 'is-active--accent' : ''}`}
                >
                  <span className="admin-pill__dot" />
                  <span>New ({leads.filter((l) => l.status === 'new').length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLeadStatusFilter('contacted')}
                  className={`admin-pill ${leadStatusFilter === 'contacted' ? 'is-active' : ''}`}
                >
                  <span className="admin-pill__dot" />
                  <span>Contacted ({leads.filter((l) => l.status === 'contacted').length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLeadStatusFilter('completed')}
                  className={`admin-pill ${leadStatusFilter === 'completed' ? 'is-active--green' : ''}`}
                >
                  <span className="admin-pill__dot" />
                  <span>Completed ({leads.filter((l) => l.status === 'completed').length})</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleExportLeadsCSV}
                className="btn btn--outline btn--sm text-xs font-bold flex items-center gap-1.5 self-end sm:self-auto"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Export to CSV</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-[var(--line)] overflow-hidden shadow-xs">
              {filteredLeads.length === 0 ? (
                <div className="p-12 text-center text-[var(--muted)]">
                  <div className="text-4xl mb-3">📬</div>
                  <h4 className="font-bold text-base text-[var(--ink)]">No inquiries found in this filter</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    When homeowners submit contact forms or request estimates on the site, their leads appear here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-[var(--surface)] border-b border-[var(--line)] text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Homeowner</th>
                        <th className="py-3 px-4">Contact Info</th>
                        <th className="py-3 px-4">Target Contractor</th>
                        <th className="py-3 px-4">Project / Notes</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--line)]">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-[var(--surface)]/50 transition-colors">
                          <td className="py-3.5 px-4 text-xs text-[var(--muted)] whitespace-nowrap">
                            {new Date(lead.createdAt).toLocaleDateString()}{' '}
                            <span className="block text-[11px] text-[var(--muted-2)]">
                              {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 font-bold text-[var(--ink)]">
                            {lead.name}
                            {lead.city && (
                              <span className="block text-xs font-normal text-[var(--muted)]">
                                {lead.city}
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <a href={`tel:${lead.phone}`} className="font-bold text-[var(--accent)] hover:underline block">
                              {lead.phone}
                            </a>
                            {lead.email && (
                              <span className="text-xs text-[var(--muted)] block truncate max-w-[180px]">
                                {lead.email}
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-[var(--ink)] block">{lead.proName || 'General Inquiry'}</span>
                            <span className="text-xs text-[var(--muted)]">{lead.category}</span>
                          </td>

                          <td className="py-3.5 px-4 max-w-xs">
                            <div className="font-semibold text-xs text-[var(--ink-2)]">{lead.projectType}</div>
                            {lead.notes && (
                              <p className="text-xs text-[var(--muted)] truncate mt-0.5" title={lead.notes}>
                                {lead.notes}
                              </p>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as LeadItem['status'])}
                              className={`text-xs font-bold px-2 py-1 rounded-md border focus:outline-none ${
                                lead.status === 'new'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : lead.status === 'contacted'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              }`}
                            >
                              <option value="new">New Lead</option>
                              <option value="contacted">Contacted</option>
                              <option value="completed">Completed</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteLead(lead.id)}
                              className="text-xs text-red-500 hover:text-red-700 font-semibold p-1 hover:bg-red-50 rounded"
                              title="Delete Lead"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: SETTINGS & BACKUPS                                */}
        {/* ======================================================== */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white p-6 rounded-2xl border border-[var(--line)] shadow-xs space-y-6">
            <div>
              <span className="section__eyebrow">Administration</span>
              <h3 className="text-xl font-bold text-[var(--ink)]">Database Backups & Security</h3>
              <p className="text-xs text-[var(--muted)] mt-1">
                Export and protect your Arkansas contractor directory database.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--line)] space-y-4">
              <div>
                <h4 className="font-bold text-sm text-[var(--ink)]">Database Backup</h4>
                <p className="text-xs text-[var(--muted)] mt-0.5">
                  Download a complete JSON snapshot containing all 14 contractors, Tradewell scores, spotlight configurations, and lead records.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ pros, spotlight, leads }, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute('href', dataStr);
                    downloadAnchor.setAttribute('download', `tradewell_backup_${new Date().toISOString().split('T')[0]}.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                    showToast('Database backup downloaded');
                  }}
                  className="btn btn--outline btn--sm text-xs font-bold mt-3"
                >
                  Download Full JSON Backup
                </button>
              </div>

              <div className="pt-4 border-t border-[var(--line)]">
                <h4 className="font-bold text-sm text-[var(--ink)]">Reset to Defaults</h4>
                <p className="text-xs text-[var(--muted)] mt-0.5">
                  Restore original contractor ratings and spotlight story to clean factory defaults.
                </p>
                <button
                  type="button"
                  onClick={async () => {
                    if (!confirm('Are you sure you want to reset all scores and spotlight to factory defaults?')) return;
                    const res = await fetch('/api/admin/data', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ action: 'reset_defaults' })
                    });
                    const data = await res.json();
                    if (data.success) {
                      showToast('Database reset to defaults');
                      fetchData();
                    }
                  }}
                  className="btn btn--sm text-xs font-bold text-red-600 border border-red-200 hover:bg-red-50 mt-3"
                >
                  Reset to Factory Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* CONTRACTOR FULL EDIT MODAL                               */}
      {/* ======================================================== */}
      {editingPro && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[var(--line)] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--line)] mb-5">
              <div>
                <h3 className="text-lg font-bold text-[var(--ink)]">Edit {editingPro.name}</h3>
                <p className="text-xs text-[var(--muted)]">Update contractor profile, contact, and scores</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingPro(null)}
                className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center text-sm font-bold text-[var(--muted)] hover:text-[var(--ink)]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProModal} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={editingPro.name}
                    onChange={(e) => setEditingPro({ ...editingPro, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                    Trade Category
                  </label>
                  <select
                    value={editingPro.category}
                    onChange={(e) => setEditingPro({ ...editingPro, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm focus:outline-none focus:border-[var(--accent)]"
                  >
                    {CORE_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                    Tradewell Score
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={editingPro.tradewellScore || 95}
                    onChange={(e) => setEditingPro({ ...editingPro, tradewellScore: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm font-bold focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                    Star Rating
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    min={1}
                    max={5}
                    value={editingPro.rating}
                    onChange={(e) => setEditingPro({ ...editingPro, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm font-bold focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                    Review Count
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editingPro.reviews || 0}
                    onChange={(e) => setEditingPro({ ...editingPro, reviews: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm font-bold focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={editingPro.phone || ''}
                    onChange={(e) => setEditingPro({ ...editingPro, phone: e.target.value, phoneHref: `tel:${e.target.value.replace(/\D/g, '')}` })}
                    placeholder="+1 870-316-8800"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                    Response Time Text
                  </label>
                  <input
                    type="text"
                    value={editingPro.responds}
                    onChange={(e) => setEditingPro({ ...editingPro, responds: e.target.value })}
                    placeholder="e.g. Typically responds same day"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                  Location / City Tag
                </label>
                <input
                  type="text"
                  value={editingPro.city}
                  onChange={(e) => setEditingPro({ ...editingPro, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                  Summary Blurb
                </label>
                <textarea
                  rows={2}
                  value={editingPro.blurb}
                  onChange={(e) => setEditingPro({ ...editingPro, blurb: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-1">
                  Services Offered (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingPro.services.join(', ')}
                  onChange={(e) =>
                    setEditingPro({
                      ...editingPro,
                      services: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[var(--line-2)] text-sm focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="pt-4 border-t border-[var(--line)] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPro(null)}
                  className="btn btn--outline btn--sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingPro}
                  className="btn btn--primary btn--sm font-bold"
                >
                  {isSavingPro ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
