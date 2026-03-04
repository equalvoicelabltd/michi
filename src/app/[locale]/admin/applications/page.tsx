/**
 * /src/app/[locale]/admin/applications/page.tsx
 *
 * Admin Dashboard — 審核買手申請
 * 需要輸入 ADMIN_API_KEY 才能訪問
 * 可以查看、批准、拒絕申請
 */

'use client';

import { useState } from 'react';

interface Application {
  id: string;
  name: string;
  name_jp?: string;
  email: string;
  phone?: string;
  location: string;
  specialty: string;
  categories: string[];
  languages: string[];
  experience_years: number;
  bio?: string;
  portfolio_url?: string;
  commission_rate: number;
  min_order_amount?: string;
  payment_methods: string[];
  payment_terms: string;
  deposit_rate: string;
  service_livestream: boolean;
  service_photo: boolean;
  service_queueing: boolean;
  service_shipping: boolean;
  livestream_rate?: string;
  photo_rate?: string;
  queue_rate?: string;
  shipping_note?: string;
  is_premium_application: boolean;
  status: string;
  admin_notes?: string;
  created_at: string;
}

export default function AdminApplicationsPage() {
  const [adminKey, setAdminKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState('');

  const fetchApplications = async (key: string, status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/buyer-applications?status=${status}`, {
        headers: { 'x-admin-key': key },
      });
      const data = await res.json();
      if (data.success) setApplications(data.applications);
      else alert('Error: ' + data.error);
    } catch (err) {
      alert('Network error');
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setAuthenticated(true);
    await fetchApplications(adminKey, filter);
  };

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    if (!confirm(`確認要 ${action === 'approve' ? '批准' : '拒絕'} 這個申請？`)) return;
    setActionLoading(id);
    try {
      const res = await fetch('/api/buyer-applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev => prev.filter(a => a.id !== id));
      } else {
        alert('Error: ' + (data.error || data.warning));
      }
    } catch { alert('Network error'); }
    setActionLoading('');
  };

  const changeFilter = async (f: typeof filter) => {
    setFilter(f);
    await fetchApplications(adminKey, f);
  };

  // ── Login Screen ──────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white p-8 space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C5A059]">Michi Admin</p>
            <h1 className="text-2xl font-black">買手申請管理</h1>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-stone-400">Admin Key</label>
            <input
              type="password"
              value={adminKey}
              onChange={e => setAdminKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059]"
              placeholder="Enter ADMIN_API_KEY..."
            />
          </div>
          <button onClick={handleLogin} className="w-full py-3 bg-[#1C1C1C] text-white text-[10px] font-black uppercase tracking-[0.3em]">
            登入
          </button>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      <div className="bg-[#1C1C1C] text-white px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C5A059]">Michi Admin</p>
            <h1 className="text-xl font-black">買手申請管理</h1>
          </div>
          <div className="flex gap-2">
            {(['pending', 'approved', 'rejected'] as const).map(f => (
              <button key={f} onClick={() => changeFilter(f)}
                className={`px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${filter === f ? 'border-[#C5A059] text-[#C5A059]' : 'border-white/20 text-white/40 hover:border-white/40'}`}>
                {f} {filter === f && `(${applications.length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {loading ? (
          <div className="text-center py-20 text-stone-400">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <p className="text-4xl mb-4">📋</p>
            <p>No {filter} applications</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map(app => {
              const expanded = expandedId === app.id;
              return (
                <div key={app.id} className="bg-white border border-stone-200 overflow-hidden">
                  {/* Summary Row */}
                  <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-stone-50" onClick={() => setExpandedId(expanded ? null : app.id)}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-stone-100 flex items-center justify-center text-lg">
                        {app.is_premium_application ? '✦' : '🛍️'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-sm">{app.name}</h3>
                          {app.is_premium_application && <span className="bg-[#C5A059] text-[#1C1C1C] text-[7px] font-black px-1.5 py-0.5">PREMIUM</span>}
                        </div>
                        <p className="text-xs text-stone-400">{app.location} · {app.specialty} · {app.experience_years}年經驗</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-stone-400">{new Date(app.created_at).toLocaleDateString()}</span>
                      <span className="text-stone-300">{expanded ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  {expanded && (
                    <div className="border-t border-stone-100 p-5 space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div><p className="text-[8px] font-black text-stone-400 uppercase">Email</p><p className="text-sm">{app.email}</p></div>
                        <div><p className="text-[8px] font-black text-stone-400 uppercase">Phone</p><p className="text-sm">{app.phone || '—'}</p></div>
                        <div><p className="text-[8px] font-black text-stone-400 uppercase">Commission</p><p className="text-sm font-black">{app.commission_rate}%</p></div>
                        <div><p className="text-[8px] font-black text-stone-400 uppercase">Min Order</p><p className="text-sm">{app.min_order_amount || '—'}</p></div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div><p className="text-[8px] font-black text-stone-400 uppercase">Payment</p><p className="text-sm">{app.payment_terms === 'full' ? '全額' : `訂金 ${app.deposit_rate}`}</p></div>
                        <div><p className="text-[8px] font-black text-stone-400 uppercase">Methods</p><p className="text-sm">{app.payment_methods?.join(', ') || '—'}</p></div>
                        <div><p className="text-[8px] font-black text-stone-400 uppercase">Languages</p><p className="text-sm">{app.languages?.join(', ')}</p></div>
                        <div><p className="text-[8px] font-black text-stone-400 uppercase">Categories</p><p className="text-sm">{app.categories?.join(', ')}</p></div>
                      </div>

                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { label: 'Live', on: app.service_livestream, rate: app.livestream_rate },
                          { label: 'Photo', on: app.service_photo, rate: app.photo_rate },
                          { label: 'Queue', on: app.service_queueing, rate: app.queue_rate },
                          { label: 'Ship', on: app.service_shipping, rate: app.shipping_note },
                        ].map(s => (
                          <div key={s.label} className={`p-3 text-center border ${s.on ? 'border-green-300 bg-green-50' : 'border-stone-100 bg-stone-50 opacity-40'}`}>
                            <p className="text-[9px] font-black">{s.label}</p>
                            {s.on && s.rate && <p className="text-[8px] text-green-700 mt-1">{s.rate}</p>}
                          </div>
                        ))}
                      </div>

                      {app.bio && (
                        <div><p className="text-[8px] font-black text-stone-400 uppercase mb-1">Bio</p><p className="text-sm text-stone-600 whitespace-pre-line">{app.bio}</p></div>
                      )}

                      {app.portfolio_url && (
                        <div><p className="text-[8px] font-black text-stone-400 uppercase mb-1">Portfolio</p><a href={app.portfolio_url} target="_blank" className="text-sm text-blue-600 underline">{app.portfolio_url}</a></div>
                      )}

                      {/* Action Buttons */}
                      {filter === 'pending' && (
                        <div className="flex gap-3 pt-4 border-t border-stone-100">
                          <button onClick={() => handleAction(app.id, 'approve')} disabled={actionLoading === app.id}
                            className="flex-1 py-3 bg-green-600 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-green-700 disabled:opacity-50">
                            ✓ 批准 {app.is_premium_application ? '(Premium)' : ''}
                          </button>
                          <button onClick={() => handleAction(app.id, 'reject')} disabled={actionLoading === app.id}
                            className="flex-1 py-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-700 disabled:opacity-50">
                            ✕ 拒絕
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}