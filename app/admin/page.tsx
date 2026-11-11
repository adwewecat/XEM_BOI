'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dữ liệu trạng thái hệ thống
  const [configStatus, setConfigStatus] = useState<{
    isConfigured: boolean;
    maskedKey: string;
    geminiModel: string;
    updatedAt: string;
  } | null>(null);

  // Form cấu hình
  const [newApiKey, setNewApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash');
  const [newPassInput, setNewPassInput] = useState('');

  // Trạng thái thao tác
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Kiểm tra phiên đăng nhập đã lưu trong sessionStorage
  useEffect(() => {
    const savedPass = sessionStorage.getItem('ziwei_admin_pass');
    if (savedPass) {
      setAdminPassword(savedPass);
      fetchConfig(savedPass);
    }
  }, []);

  const fetchConfig = async (pass: string) => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch(`/api/admin/config?password=${encodeURIComponent(pass)}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        setIsAuthenticated(false);
        setLoginError(data.message || 'Mật khẩu quản trị viên không chính xác.');
        sessionStorage.removeItem('ziwei_admin_pass');
        return;
      }

      setIsAuthenticated(true);
      setConfigStatus({
        isConfigured: data.isConfigured,
        maskedKey: data.maskedKey,
        geminiModel: data.geminiModel,
        updatedAt: data.updatedAt,
      });
      setSelectedModel(data.geminiModel || 'gemini-1.5-flash');
      sessionStorage.setItem('ziwei_admin_pass', pass);
    } catch {
      setLoginError('Lỗi kết nối máy chủ');
      setIsAuthenticated(false);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPassword.trim()) {
      setLoginError('Vui lòng nhập mật khẩu quản trị viên.');
      return;
    }
    fetchConfig(adminPassword.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ziwei_admin_pass');
    setIsAuthenticated(false);
    setAdminPassword('');
    setConfigStatus(null);
    setActionMessage(null);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setActionMessage(null);
    try {
      const res = await fetch('/api/admin/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: adminPassword,
          apiKeyToTest: newApiKey.trim() || undefined,
          modelToTest: selectedModel,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionMessage({ type: 'success', text: data.message });
      } else {
        setActionMessage({ type: 'error', text: data.message || 'Kiểm tra thất bại.' });
      }
    } catch {
      setActionMessage({ type: 'error', text: 'Lỗi mạng khi kiểm tra kết nối.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setActionMessage(null);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: adminPassword,
          geminiApiKey: newApiKey.trim() || undefined,
          geminiModel: selectedModel,
          newPassword: newPassInput.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionMessage({ type: 'success', text: data.message });
        setNewApiKey('');
        if (newPassInput.trim()) {
          setAdminPassword(newPassInput.trim());
          sessionStorage.setItem('ziwei_admin_pass', newPassInput.trim());
          setNewPassInput('');
        }
        // Tải lại thông tin mới
        fetchConfig(adminPassword);
      } else {
        setActionMessage({ type: 'error', text: data.message || 'Lưu cấu hình thất bại.' });
      }
    } catch {
      setActionMessage({ type: 'error', text: 'Lỗi mạng khi lưu cấu hình.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      {/* Header trang Admin */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold flex items-center gap-1.5">
            <span>🛡️</span> QUẢN TRỊ VIÊN HỆ THỐNG
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-amber-100 mt-1">
            Cấu Hình Gemini AI Dùng Chung
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Chỉ Quản trị viên mới có quyền cấu hình. Thiết lập 1 lần, áp dụng tự động cho toàn bộ người dùng website.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-xs px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-colors"
          >
            ← Về Trang Chủ
          </Link>
          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/40 transition-colors cursor-pointer"
            >
              Đăng Xuất
            </button>
          )}
        </div>
      </div>

      {/* MÀN HÌNH ĐĂNG NHẬP ADMIN */}
      {!isAuthenticated ? (
        <div className="card-glass p-6 sm:p-8 rounded-2xl border border-amber-500/30 bg-zinc-950/80 shadow-2xl max-w-md mx-auto space-y-5">
          <div className="text-center space-y-2">
            <div className="text-3xl">🔐</div>
            <h2 className="text-lg font-bold text-amber-200">Xác Thực Quyền Quản Trị Viên</h2>
            <p className="text-xs text-zinc-400">
              Vui lòng nhập mật khẩu quản trị viên để vào trung tâm điều khiển AI.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Mật khẩu Quản trị viên
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-zinc-100 font-mono focus:outline-none"
                autoFocus
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">
                (Mật khẩu mặc định ban đầu: <code className="text-amber-400 font-mono">admin@2026</code>)
              </span>
            </div>

            {loginError && (
              <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                <span>⚠️</span> {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-zinc-950 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isLoggingIn ? '⏳' : '🔓'}</span>
              <span>{isLoggingIn ? 'Đang xác thực...' : 'Đăng Nhập Quản Trị'}</span>
            </button>
          </form>
        </div>
      ) : (
        /* MÀN HÌNH ĐIỀU KHIỂN SAU KHI ĐĂNG NHẬP THÀNH CÔNG */
        <div className="space-y-6">
          {/* 1. THẺ TRẠNG THÁI HIỆN TẠI CỦA HỆ THỐNG */}
          <div className="card-glass p-6 rounded-2xl border border-amber-500/30 bg-zinc-950/80 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-amber-200">
                <span>📊</span> TRẠNG THÁI GEMINI AI DÙNG CHUNG HIỆN TẠI
              </div>
              <div>
                {configStatus?.isConfigured ? (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ĐANG HOẠT ĐỘNG (DÙNG CHUNG)
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    CHƯA CẤU HÌNH API KEY
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                <span className="text-zinc-400 block font-medium">Khóa API Hiện Tại:</span>
                <strong className="text-amber-300 font-mono text-sm block">
                  {configStatus?.maskedKey || 'Chưa thiết lập'}
                </strong>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                <span className="text-zinc-400 block font-medium">Mô Hình Gemini Đang Dùng:</span>
                <strong className="text-cyan-300 font-mono text-sm block">
                  {configStatus?.geminiModel || 'gemini-1.5-flash'}
                </strong>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                <span className="text-zinc-400 block font-medium">Cập Nhật Gần Nhất:</span>
                <span className="text-zinc-300 text-xs block">
                  {configStatus?.updatedAt
                    ? new Date(configStatus.updatedAt).toLocaleString('vi-VN')
                    : 'Mặc định ban đầu'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. FORM CẬP NHẬT CẤU HÌNH API KEY DÙNG CHUNG */}
          <form onSubmit={handleSaveConfig} className="card-glass p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 bg-zinc-950/90 shadow-2xl space-y-5">
            <div className="border-b border-amber-500/20 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-amber-200 flex items-center gap-2">
                  <span>⚙️</span> THIẾT LẬP HOẶC ĐỔI API KEY GEMINI DÙNG CHUNG
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Sau khi lưu, tất cả người dùng xem bói sẽ lập tức được AI phân tích tự động.
                </p>
              </div>
            </div>

            {/* Ô nhập API Key mới */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 block flex items-center justify-between">
                <span>Google Gemini API Key (Bắt đầu bằng AIzaSy...):</span>
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                >
                  {showKey ? '👁️ Ẩn khóa' : '👁️ Hiện khóa'}
                </button>
              </label>
              <input
                type={showKey ? 'text' : 'password'}
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder={configStatus?.isConfigured ? 'Nhập API Key mới nếu muốn thay đổi...' : 'Dán Google Gemini API Key vào đây...'}
                className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-zinc-100 font-mono focus:outline-none"
              />
              <div className="text-[11px] text-zinc-400 pt-1 flex flex-wrap items-center gap-2">
                <span>Chưa có API Key?</span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Nhận Gemini API Key miễn phí từ Google AI Studio ↗</span>
                </a>
              </div>
            </div>

            {/* Chọn Model Gemini */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 block">
                Chọn Mô Hình Ưu Tiên:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', desc: 'Rất nhanh, ổn định cao, miễn phí dồi dào' },
                  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', desc: 'Thế hệ mới nhất, phản hồi cực kỳ sắc bén' },
                  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', desc: 'Suy luận dịch lý siêu sâu, chất lượng cao' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedModel(m.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedModel === m.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{m.name}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Đổi Mật Khẩu Admin (Tùy chọn) */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <label className="text-xs font-bold text-zinc-300 block">
                Đổi Mật Khẩu Quản Trị Viên (Để trống nếu giữ nguyên):
              </label>
              <input
                type="password"
                value={newPassInput}
                onChange={(e) => setNewPassInput(e.target.value)}
                placeholder="Nhập mật khẩu admin mới (tối thiểu 6 ký tự)..."
                className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-xl px-4 py-2 text-xs text-zinc-100 font-mono focus:outline-none"
              />
            </div>

            {/* Thông báo kết quả thao tác */}
            {actionMessage && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                  actionMessage.type === 'success'
                    ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
                }`}
              >
                <span>{actionMessage.type === 'success' ? '✅' : '⚠️'}</span>
                <span>{actionMessage.text}</span>
              </div>
            )}

            {/* Cụm nút bấm thao tác */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting || (!newApiKey.trim() && !configStatus?.isConfigured)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/40 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isTesting ? '🌀' : '🧪'}</span>
                <span>{isTesting ? 'Đang kết nối thử...' : 'Kiểm Tra Kết Nối Thực Tế'}</span>
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 ml-auto"
              >
                <span>{isSaving ? '💾' : '✨'}</span>
                <span>{isSaving ? 'Đang lưu...' : 'Lưu & Kích Hoạt Toàn Hệ Thống'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

