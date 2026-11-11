'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import BirthForm, { type BirthFormState } from '@/components/BirthForm';
import ChartBoard from '@/components/ChartBoard';
import InsightPanel from '@/components/InsightPanel';
import TimeNav, { type TimeView } from '@/components/TimeNav';
import PatternsCard from '@/components/PatternsCard';
import ShareModal from '@/components/ShareModal';
import { generateChart } from '@/lib/ziwei/algorithm';
import { FAMOUS_PERSONS, type FamousPerson } from '@/lib/ziwei/famous';
import type { BirthInfo, ZiweiChart, Palace } from '@/lib/ziwei/types';
import { BRANCHES, STEMS } from '@/lib/ziwei/constants';
import { PALACE_VI, getPalaceName, getStarName, BRANCHES_VI, STEMS_VI, BRIGHTNESS_VI, generatePalaceAnalysis } from '@/lib/ziwei/vietnamese';
import { useTheme } from '@/components/ThemeProvider';

export default function ChartPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);
  const [view, setView] = useState<TimeView>('mingpan');
  const [liunianYear, setLiunianYear] = useState(() => new Date().getFullYear());
  const [shareOpen, setShareOpen] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [guideTab, setGuideTab] = useState<'steps' | 'terms'>('steps');
  const [rightTab, setRightTab] = useState<'patterns' | 'insights' | 'palace'>('palace');

  // Lưu thông tin sinh để dùng khi xuất ảnh lá số (ShareModal)
  const [birthState, setBirthState] = useState({
    year: '1995',
    month: '8',
    day: '15',
    clockHour: '9',
    minute: '30',
    gender: 'male' as 'male' | 'female',
    city: 'Hà Nội'
  });

  const handleFormSubmit = (info: BirthInfo) => {
    const generated = generateChart(info);
    setChart(generated);
    // Tự động mở Cung Mệnh ngay khi vừa lập lá số để người dùng có trọng tâm đầu tiên
    const mingP = generated.palaces.find(p => p.branch === generated.mingGongBranch);
    setSelectedPalace(mingP || null);
    setRightTab('palace');
  };

  const handleFormSave = (data: BirthFormState) => {
    setBirthState({
      year: data.year,
      month: data.month,
      day: data.day,
      clockHour: data.clockHour,
      minute: data.clockMinute,
      gender: data.gender,
      city: data.city || data.province || 'Hà Nội'
    });
  };

  const handleSelectFamous = (person: FamousPerson) => {
    const info: BirthInfo = {
      year: person.year,
      month: person.month,
      day: person.day,
      hour: person.hour,
      gender: person.gender,
    };
    setBirthState({
      year: String(person.year),
      month: String(person.month),
      day: String(person.day),
      clockHour: String(person.hour * 2),
      minute: '0',
      gender: person.gender,
      city: person.name
    });
    try {
      localStorage.setItem('ziwei_user_profile', JSON.stringify({
        name: person.name,
        year: person.year,
        month: person.month,
        day: person.day,
        clockHour: person.hour * 2,
        clockMinute: 0,
        gender: person.gender,
      }));
    } catch {}
    const gen = generateChart(info);
    setChart(gen);
    const mingP = gen.palaces.find(p => p.branch === gen.mingGongBranch);
    setSelectedPalace(mingP || null);
    setRightTab('palace');
  };

  // ─── GIAO DIỆN KHI CHƯA LẬP LÁ SỐ (MÀN HÌNH NHẬP LIỆU HUYỀN BÍ) ───
  if (!chart) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* Banner Huyền Bí Đầu Trang */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-3 border shadow-lg"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(212,168,67,0.25), rgba(18,25,42,0.9))'
                : 'linear-gradient(135deg, rgba(184,146,42,0.2), #fff)',
              borderColor: 'var(--ac)',
              boxShadow: isDark ? '0 0 24px rgba(212,168,67,0.4)' : '0 0 16px rgba(184,146,42,0.25)'
            }}
          >
            <span className="text-2xl select-none">🔮</span>
          </motion.div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-wide mb-3" style={{ color: 'var(--tx-0)' }}>
            LẬP LÁ SỐ TỬ VI ĐẨU SỐ
          </h1>
          <p className="text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--tx-3)' }}>
            Hệ thống an sao 12 Cung vị, 14 Chính tinh, Tứ Hóa & Giờ Chân Thái Dương (True Solar Time)
            theo chuẩn lý số phương Đông và giáo trình 《Thiên Kỷ》 của danh sư Nghê Hải Hà.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cột Trái: Form Nhập Sinh Nhật */}
          <div className="lg:col-span-7">
            <div className="card-glass rounded-2xl p-6 sm:p-8 relative">
              <div className="flex items-center gap-2 mb-5 pb-3 border-b" style={{ borderColor: 'var(--bdr)' }}>
                <span className="text-base">📜</span>
                <h2 className="text-base font-bold tracking-wide" style={{ color: 'var(--tx-0)' }}>
                  Nhập Thông Tin Bát Tự & Giờ Sinh
                </h2>
              </div>

              <BirthForm
                onSubmit={handleFormSubmit}
                onFormSave={handleFormSave}
                initialData={{
                  province: 'Việt Nam (63 Tỉnh Thành)',
                  city: 'Hà Nội (Thủ đô)',
                  longitude: 105.85,
                  year: '1995',
                  month: '8',
                  day: '15',
                  clockHour: '9',
                  clockMinute: '30'
                }}
              />
            </div>
          </div>

          {/* Cột Phải: Lá Số Danh Nhân Mẫu (Quick Presets) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="card-glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b" style={{ borderColor: 'var(--bdr)' }}>
                <span className="text-sm">🌟</span>
                <h3 className="text-sm font-bold tracking-wide" style={{ color: 'var(--tx-0)' }}>
                  Khám Phá Nhanh Lá Số Danh Nhân
                </h3>
                <span className="text-[10px] ml-auto px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--ac-bg)', color: 'var(--ac)' }}>
                  1 Click Xem Ngay
                </span>
              </div>
              <p className="text-[11px] mb-3 leading-relaxed" style={{ color: 'var(--tx-3)' }}>
                Bấm vào một danh nhân bất kỳ để khởi tạo lá số mẫu và khám phá cách cục ngay lập tức:
              </p>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {FAMOUS_PERSONS.slice(0, 7).map((person) => (
                  <button
                    key={person.id}
                    type="button"
                    onClick={() => handleSelectFamous(person)}
                    className="w-full text-left p-3 rounded-xl border transition-all duration-200 hover:scale-[1.01] flex flex-col gap-1 group"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(184,146,42,0.18)'
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold group-hover:text-amber-500 transition-colors" style={{ color: 'var(--tx-0)' }}>
                          {person.name}
                        </span>
                        <span className="text-[10px]" style={{ color: 'var(--tx-3)' }}>
                          ({person.year} · {person.gender === 'male' ? 'Nam' : 'Nữ'})
                        </span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded border"
                        style={{
                          background: 'rgba(58,120,212,0.1)',
                          borderColor: 'rgba(58,120,212,0.25)',
                          color: isDark ? '#60a5fa' : '#2563eb'
                        }}
                      >
                        {person.category}
                      </span>
                    </div>
                    <p className="text-[10px] line-clamp-1" style={{ color: 'var(--tx-3)' }}>
                      {person.description}
                    </p>
                    <p className="text-[9px] line-clamp-1 italic" style={{ color: 'var(--ac)' }}>
                      💡 {person.notable}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Tính năng nổi bật */}
            <div className="card-glass rounded-2xl p-4 text-[11px] space-y-2" style={{ color: 'var(--tx-2)' }}>
              <div className="font-semibold flex items-center gap-1.5" style={{ color: 'var(--tx-0)' }}>
                <span>✨</span>
                <span>Hệ thống luận giải tự động:</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-[10px]" style={{ color: 'var(--tx-3)' }}>
                <li>Nhận diện hơn 50+ cách cục cát hung kinh điển.</li>
                <li>Tự động tính Giờ Chân Thái Dương bù trừ kinh độ theo từng tỉnh thành.</li>
                <li>Hỗ trợ xuất ảnh lá số PNG độ phân giải cao để lưu trữ.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ─── GIAO DIỆN KHI ĐÃ LẬP LÁ SỐ (CHIÊM NGHIỆM MỆNH BÀN TOÀN DIỆN) ───
  const currentDx = chart ? chart.daXians[chart.currentDaXianIndex] : null;

  const selectPalaceByBranch = (branch: number) => {
    if (!chart) return;
    const p = chart.palaces.find(item => item.branch === branch);
    if (p) {
      setSelectedPalace(p);
      setRightTab('palace');
    }
  };

  const selectPalaceByName = (nameZh: string) => {
    if (!chart) return;
    const p = chart.palaces.find(item => item.name === nameZh);
    if (p) {
      setSelectedPalace(p);
      setRightTab('palace');
    }
  };

  return (
    <main className="max-w-[1440px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
      {/* Thanh Thao Tác Đầu Trang */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 p-3 rounded-xl card-glass">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setChart(null); setSelectedPalace(null); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all hover:bg-amber-500/10 hover:border-amber-500/40"
            style={{
              borderColor: 'var(--bdr-heavy)',
              color: 'var(--tx-1)',
              background: 'transparent'
            }}
          >
            <span>←</span>
            <span>Nhập lại thông tin</span>
          </button>

          <Link
            href="/heming"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all hover:bg-sky-500/10 hover:border-sky-500/40"
            style={{
              borderColor: 'rgba(58,120,212,0.3)',
              color: isDark ? '#93c5fd' : '#1d4ed8'
            }}
          >
            <span>☯️</span>
            <span>So Kèo Hợp Mệnh</span>
          </Link>
        </div>

        {/* Nút Xuất Ảnh PNG */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #c8993a, #f0d070)',
              color: '#1a1000',
              border: '1px solid rgba(212,168,67,0.5)'
            }}
          >
            <span>📷</span>
            <span>Xuất Ảnh Lá Số (PNG)</span>
          </button>
        </div>
      </div>

      {/* 🧭 LỘ TRÌNH ĐỌC LÁ SỐ TỬ VI CHUẨN XÁC (GIẢI TOẢ BĂN KHOĂN: ĐỌC GÌ & XEM GÌ) */}
      <div className="mb-4 p-3 sm:p-4 rounded-xl card-glass border border-amber-500/35 flex flex-wrap items-center justify-between gap-3 shadow-md"
        style={{ background: 'rgba(212, 168, 67, 0.07)' }}>
        <div className="flex items-center gap-2.5">
          <span className="text-xl sm:text-2xl select-none">🧭</span>
          <div>
            <div className="text-xs sm:text-sm font-extrabold text-amber-300 flex items-center gap-2">
              <span>LỘ TRÌNH ĐỌC LÁ SỐ THEO THỨ TỰ CHUẨN</span>
              <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                1-Click Xem Ngay
              </span>
            </div>
            <div className="text-[11px] text-stone-300 mt-0.5">
              Bạn chưa biết bắt đầu từ đâu? Hãy nhấp theo 5 bước dưới đây để hệ thống tự động làm nổi bật và luận giải:
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Bước 1: Mệnh Cung */}
          <button
            type="button"
            onClick={() => selectPalaceByBranch(chart.mingGongBranch)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border ${
              selectedPalace?.branch === chart.mingGongBranch
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md scale-105'
                : 'bg-amber-500/15 text-amber-300 border-amber-500/35 hover:bg-amber-500/25'
            }`}
          >
            <span>🌟 1. Mệnh Cung (Bản Cốt)</span>
          </button>

          {/* Bước 2: Thân Cung */}
          <button
            type="button"
            onClick={() => selectPalaceByBranch(chart.shenGongBranch)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border ${
              selectedPalace?.branch === chart.shenGongBranch
                ? 'bg-sky-500 text-stone-950 border-sky-400 shadow-md scale-105'
                : 'bg-sky-500/15 text-sky-300 border-sky-500/35 hover:bg-sky-500/25'
            }`}
          >
            <span>⚓ 2. Thân Cư (Hậu Vận)</span>
          </button>

          {/* Bước 3: Đại Hạn Hiện Tại */}
          {currentDx && (
            <button
              type="button"
              onClick={() => selectPalaceByBranch(currentDx.palaceBranch)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border ${
                selectedPalace?.branch === currentDx.palaceBranch
                  ? 'bg-purple-600 text-purple-100 border-purple-400 shadow-md scale-105'
                  : 'bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30'
              }`}
            >
              <span>⏳ 3. Đại Hạn {currentDx.startAge}–{currentDx.endAge}t ({getPalaceName(currentDx.palaceName).vi})</span>
            </button>
          )}

          {/* Bước 4: Quan Lộc */}
          <button
            type="button"
            onClick={() => selectPalaceByName('官禄')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border ${
              selectedPalace?.name === '官禄'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md scale-105'
                : 'bg-stone-800/80 text-stone-200 border-stone-700 hover:bg-stone-700'
            }`}
          >
            <span>💼 4. Sự Nghiệp</span>
          </button>

          {/* Bước 5: Tài Bạch */}
          <button
            type="button"
            onClick={() => selectPalaceByName('财帛')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border ${
              selectedPalace?.name === '财帛'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md scale-105'
                : 'bg-stone-800/80 text-stone-200 border-stone-700 hover:bg-stone-700'
            }`}
          >
            <span>💰 5. Tiền Tài</span>
          </button>

          {/* Nút Xem Hướng Dẫn Chi Tiết */}
          <button
            type="button"
            onClick={() => setShowGuideModal(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-extrabold bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 border border-amber-400/60 shadow hover:brightness-110 transition-all flex items-center gap-1"
          >
            <span>❓ Cần Đọc Gì & Xem Gì?</span>
          </button>
        </div>
      </div>

      {/* Khu Vực Hiển Thị Chính: 2 Cột (Lá Số & Luận Giải / Cách Cục) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Cột Trái: Bảng 12 Cung Lá Số Tử Vi (ChartBoard) */}
        <div className="lg:col-span-8 overflow-x-auto">
          <div className="card-glass rounded-2xl p-2 sm:p-4">
            <ChartBoard
              chart={chart}
              selectedBranch={selectedPalace?.branch ?? null}
              onPalaceSelect={(p) => {
                setSelectedPalace(p);
                if (p) setRightTab('palace');
              }}
            />
          </div>
        </div>

        {/* Cột Phải: Hệ Thống Luận Giải & Cách Cục & Chi Tiết Cung */}
        <div className="lg:col-span-4 space-y-4">
          {/* Bộ Tab Chuyển Đổi Nội Dung Luận Giải */}
          <div className="flex rounded-xl p-1 border card-inner" style={{ borderColor: 'var(--bdr)' }}>
            <button
              type="button"
              onClick={() => setRightTab('palace')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                rightTab === 'palace'
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              🔍 {selectedPalace ? `Cung ${PALACE_VI[selectedPalace.name]?.short || selectedPalace.name}` : 'Chi Tiết Cung'}
            </button>
            <button
              type="button"
              onClick={() => setRightTab('patterns')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                rightTab === 'patterns'
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              🏆 Cách Cục ({chart ? '50+' : ''})
            </button>
            <button
              type="button"
              onClick={() => setRightTab('insights')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                rightTab === 'insights'
                  ? 'bg-sky-500/25 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              📖 Luận Mệnh
            </button>
          </div>

          {/* Nội Dung Từng Tab */}
          <AnimatePresence mode="wait">
            {rightTab === 'palace' && selectedPalace && (() => {
              const analysis = generatePalaceAnalysis(selectedPalace, chart);
              return (
                <motion.div
                  key={`tab-palace-${selectedPalace.branch}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="card-glass rounded-xl p-4 sm:p-5 space-y-3.5 shadow-xl border border-amber-500/30"
                >
                  {/* Header Cung */}
                  <div className="flex items-center justify-between pb-3 border-b border-stone-700/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-amber-400">
                          CUNG {analysis.palaceNameVi.toUpperCase()}
                        </span>
                        <span className="text-xs text-stone-400">({analysis.ganzhiVi})</span>
                      </div>
                      <div className="text-[11px] text-stone-300 mt-0.5">
                        Can {STEMS_VI[selectedPalace.stem]} {BRANCHES_VI[selectedPalace.branch]}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {selectedPalace.isMingGong && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-400 text-stone-950 border border-amber-300">
                          🌟 MỆNH CUNG
                        </span>
                      )}
                      {selectedPalace.isShenGong && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded bg-sky-400 text-stone-950 border border-sky-300">
                          ⚓ THÂN CƯ
                        </span>
                      )}
                      {analysis.isDaXian && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-600 text-purple-100 border border-purple-400 animate-pulse">
                          ⏳ ĐẠI HẠN {selectedPalace.daXianAge ? `${selectedPalace.daXianAge[0]}-${selectedPalace.daXianAge[1]}T` : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 1. Vai trò cung vị trong đời người */}
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/25">
                    <span className="text-[11px] font-bold text-amber-300 block mb-1">
                      📖 Ý Nghĩa Cung {analysis.palaceNameVi}:
                    </span>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      {analysis.roleDescription}
                    </p>
                  </div>

                  {/* 2. Cảnh báo nếu là Cung Đại Hạn Hiện Tại */}
                  {analysis.isDaXian && analysis.daXianText && (
                    <div className="p-3.5 rounded-lg bg-purple-950/40 border border-purple-500/50 text-purple-200 space-y-1.5 shadow-md">
                      <div className="font-bold text-xs text-purple-300 flex items-center gap-1.5">
                        <span>⏳ ĐÂY LÀ ĐẠI HẠN 10 NĂM HIỆN TẠI CỦA BẠN!</span>
                      </div>
                      <p className="text-xs leading-relaxed opacity-95">
                        {analysis.daXianText}
                      </p>
                    </div>
                  )}

                  {/* 3. Chính Tinh Tọa Thủ */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                      <span>★</span>
                      <span>Chính Tinh Toạ Thủ:</span>
                    </span>
                    <p className="text-xs text-stone-100 font-medium leading-relaxed bg-stone-900/50 p-2.5 rounded-lg border border-stone-800">
                      {analysis.majorStarsText}
                    </p>
                  </div>

                  {/* 4. Cát Tinh & Sát Tinh Phụ Tá */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-sky-950/20 border border-sky-500/20 space-y-1">
                      <span className="font-bold text-sky-300 text-[11px] block">✨ Cát Tinh Trợ Mệnh:</span>
                      <p className="text-stone-300 text-[11.5px] leading-relaxed">{analysis.luckyStarsText}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20 space-y-1">
                      <span className="font-bold text-rose-300 text-[11px] block">⚠️ Sát Tinh Khảo Nghiệm:</span>
                      <p className="text-stone-300 text-[11.5px] leading-relaxed">{analysis.shaStarsText}</p>
                    </div>
                  </div>

                  {/* 5. Tam Phương Tứ Chính Chiếu Về */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                      <span>⚡</span>
                      <span>Tam Phương Tứ Chính Chiếu Về:</span>
                    </span>
                    <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/40 p-2 rounded-lg border border-stone-800">
                      {analysis.sanFangText}
                    </p>
                  </div>

                  {/* 6. Lời Khuyên Thực Tế */}
                  <div className="p-3 rounded-lg bg-gradient-to-r from-amber-950/40 to-stone-900/60 border border-amber-500/30 text-xs text-amber-200 leading-relaxed space-y-1">
                    <span className="font-bold text-amber-300 block">💡 Lời Khuyên Danh Sư Nghê Hải Hà:</span>
                    <p className="italic">{analysis.advice}</p>
                  </div>
                </motion.div>
              );
            })()}

            {rightTab === 'patterns' && (
              <motion.div
                key="tab-patterns"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <PatternsCard chart={chart} />
              </motion.div>
            )}

            {rightTab === 'insights' && (
              <motion.div
                key="tab-insights"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <InsightPanel chart={chart} selectedPalace={selectedPalace} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal Cẩm Nang 5 Bước Đọc Lá Số Dành Cho Người Mới */}
      <AnimatePresence>
        {showGuideModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto card-glass rounded-2xl p-5 sm:p-7 border border-amber-500/40 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-700">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧭</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-amber-400">
                      CẨM NANG ĐỌC LÁ SỐ TỬ VI THIÊN KỶ
                    </h3>
                    <p className="text-[11px] text-stone-300">
                      Hướng dẫn 5 bước chiêm nghiệm dành cho người mới xem
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGuideModal(false)}
                  className="w-8 h-8 rounded-full border border-stone-700 hover:border-amber-400 text-stone-300 hover:text-white flex items-center justify-center text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Tab Chuyển Đổi Trong Modal */}
              <div className="flex rounded-xl p-1 bg-stone-900 border border-stone-800">
                <button
                  type="button"
                  onClick={() => setGuideTab('steps')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    guideTab === 'steps'
                      ? 'bg-amber-500 text-stone-950 shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  🧭 5 Bước Xem Nhanh
                </button>
                <button
                  type="button"
                  onClick={() => setGuideTab('terms')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    guideTab === 'terms'
                      ? 'bg-amber-500 text-stone-950 shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  📖 Giải Mã: Bản Mệnh · Đại Hạn · Lưu Niên
                </button>
              </div>

              {guideTab === 'steps' ? (
                <div className="space-y-4 text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {/* Bước 1 */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
                    <div className="font-extrabold text-amber-300 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-xs">Bước 1</span>
                      <span>XEM MỆNH CUNG & THÂN CƯ (GỐC RỄ CUỘC ĐỜI)</span>
                    </div>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      - <strong>Mệnh Cung</strong>: Quyết định cốt cách, năng lực bẩm sinh và thời niên thiếu (1–30 tuổi).<br />
                      - <strong>Thân Cung</strong>: Xu hướng phát triển nửa đời sau (từ 30 tuổi trở đi), nơi bạn dồn tâm huyết an thân lập mệnh.
                    </p>
                  </div>

                  {/* Bước 2 */}
                  <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/30 space-y-1.5">
                    <div className="font-extrabold text-sky-300 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 border border-sky-500/40 text-xs">Bước 2</span>
                      <span>XEM TAM PHƯƠNG TỨ CHÍNH (4 TRỤ CỘT THÀNH BẠI)</span>
                    </div>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      Nhấp vào Cung Mệnh để xem 4 cung liên hoàn: <strong>Mệnh (Bản thân) - Quan Lộc (Sự nghiệp) - Tài Bạch (Tiền tài) - Thiên Di (Xã hội bên ngoài)</strong>. Bốn cung này tạo nên bộ khung thành công của một con người.
                    </p>
                  </div>

                  {/* Bước 3 */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                    <div className="font-extrabold text-emerald-300 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-xs">Bước 3</span>
                      <span>XEM TỨ HÓA NĂM SINH (BÀN TAY SỐ MỆNH)</span>
                    </div>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      - 🟢 <strong>Hóa Lộc</strong>: Nơi có tiền bạc, cơ duyên dồi dào.<br />
                      - 🔵 <strong>Hóa Quyền</strong>: Nơi nắm giữ thực quyền và quyền uy.<br />
                      - 🟡 <strong>Hóa Khoa</strong>: Nơi có danh tiếng, thi cử đỗ đạt, quý nhân cứu giải.<br />
                      - 🔴 <strong>Hóa Kỵ</strong>: Nơi có trắc trở, khảo nghiệm cần nhẫn nại tu dưỡng.
                    </p>
                  </div>

                  {/* Bước 4 */}
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-1.5">
                    <div className="font-extrabold text-purple-300 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-xs">Bước 4</span>
                      <span>XEM ĐẠI HẠN 10 NĂM & LƯU NIÊN TỪNG NĂM</span>
                    </div>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      Thời gian thay đổi theo từng chu kỳ 10 năm. Ô cung nào có viền tím phát sáng và nhãn <strong>[ ⏳ ĐẠI HẠN ]</strong> chính là giai đoạn 10 năm hiện tại của bạn. Toàn bộ trọng tâm công danh, hôn nhân hay tài lộc sẽ đổ dồn vào cung này.
                    </p>
                  </div>

                  {/* Bước 5 */}
                  <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-700 space-y-1.5">
                    <div className="font-extrabold text-amber-300 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-xs">Bước 5</span>
                      <span>XEM CÁC CUNG VỊ CHUYÊN BIỆT BẠN QUAN TÂM</span>
                    </div>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      Nhấp trực tiếp vào bất kỳ ô nào trên 12 cung (Phu Thê - Hôn nhân, Điền Trạch - Nhà đất, Tử Tức - Con cái, Phúc Đức - Tổ ấm...) để hệ thống hiển thị phân tích chuyên sâu chi tiết.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {/* Bản Mệnh là gì */}
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                    <div className="font-extrabold text-amber-300 flex items-center gap-2 text-sm">
                      <span>🌟</span>
                      <span>1. XEM BẢN MỆNH LÀ XEM VỚI Ý NGHĨA GÌ?</span>
                    </div>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      - <strong>Bản Mệnh (Cung Mệnh):</strong> Là cái &quot;Gốc&quot; của toàn bộ cây số mệnh. Mệnh quyết định cốt cách tiên thiên, tính cách bẩm sinh, trí tuệ, tài năng tiềm ẩn và &quot;trần nhà&quot; thành bại lớn nhất trong đời người.<br />
                      - <strong>Xem Mệnh để làm gì?</strong> Để thấu suốt chính mình: Biết sở trường để phát huy, biết nhược điểm để sửa đổi, biết làm ngành nghề gì thì hợp khí số.<br />
                      - <strong>Thân Cư (Hậu Vận):</strong> Đại diện cho nửa đời sau (từ 30 tuổi trở đi). Mệnh là tư chất khi sinh ra, còn Thân là thành tựu do bạn nỗ lực tạo nên. Thân cư Phu Thê thì coi trọng gia đình bạn đời; Thân cư Quan Lộc thì cuộc đời vì sự nghiệp; Thân cư Tài Bạch thì lo toan tài chính.
                    </p>
                  </div>

                  {/* Đại hạn 24-33 là gì */}
                  <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-2">
                    <div className="font-extrabold text-purple-300 flex items-center gap-2 text-sm">
                      <span>⏳</span>
                      <span>2. ĐẠI HẠN 24–33 TUỔI LÀ SAO? TẠI SAO TRỎ VÀO CUNG PHU THÊ?</span>
                    </div>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      - <strong>Quy luật chu kỳ 10 năm:</strong> Cuộc đời con người trong Tử Vi được chia thành các nấc thang 10 năm gọi là <em>Đại Hạn</em>.<br />
                      - <strong>Tại sao lại trỏ vào Cung Phu Thê?</strong> Đương số sinh năm 2000, hiện 26 tuổi, rơi đúng vào khoảng tuổi <strong>24 đến 33 tuổi</strong>. Trên lá số của bạn, dải số này nằm tại cung Giáp Dần — mang tên Cung Phu Thê.<br />
                      - <strong>Ý nghĩa &quot;Cung Mệnh Lâm Thời&quot;:</strong> Trong 10 năm từ 24 đến 33 tuổi, Cung Phu Thê tạm thời đóng vai trò như Cung Mệnh của bạn! Mọi biến động lớn nhất về tâm sinh lý, các mối quan hệ tình cảm, duyên nợ hôn nhân hoặc người bạn đời/đối tác sẽ ảnh hưởng trực tiếp đến sự nghiệp và tài lộc của bạn.<br />
                      - <strong>Tam phương tứ chính Đại Hạn:</strong> Trong 10 năm này, Quan Lộc đại hạn sẽ chiếu về, thử thách và cơ hội lập gia đình đi đôi với sự nghiệp.
                    </p>
                  </div>

                  {/* Lưu Niên */}
                  <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/40 space-y-2">
                    <div className="font-extrabold text-sky-300 flex items-center gap-2 text-sm">
                      <span>📅</span>
                      <span>3. LƯU NIÊN NÊN XEM THẾ NÀO? Ý NGHĨA LÀ GÌ?</span>
                    </div>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      - <strong>Đại Hạn quản 10 năm (Thời thế vĩ mô), Lưu Niên quản 1 năm (Biến cố vi mô):</strong> Lưu Niên là vận trình của riêng năm đó (ví dụ năm 2026 Bính Ngọ).<br />
                      - <strong>Cách xem chuẩn danh sư:</strong> Cung Ngọ trên lá số sẽ là gốc của năm 2026. Tứ Hóa năm 2026 kích hoạt (Đồng Lộc, Cơ Quyền, Xương Khoa, Liêm Kỵ).<br />
                      - <strong>Nguyên lý kết hợp 3 tầng:</strong><br />
                      &nbsp;&nbsp;+ <em>Mệnh (Gốc rễ):</em> Nội lực bên trong của bạn có vững vàng không?<br />
                      &nbsp;&nbsp;+ <em>Đại Hạn (Thời cuộc 10 năm):</em> Đang vào giai đoạn thuận buồm xuôi gió hay gặp trắc trở?<br />
                      &nbsp;&nbsp;+ <em>Lưu Niên (Cơ hội cụ thể năm nay):</em> Năm nay có nên đầu tư, đổi việc, kết hôn hay nên giữ mình phòng thủ?
                    </p>
                  </div>

                  {/* Những yếu tố khác */}
                  <div className="p-4 rounded-xl bg-stone-900 border border-stone-700 space-y-2">
                    <div className="font-extrabold text-amber-300 flex items-center gap-2 text-sm">
                      <span>🔮</span>
                      <span>4. CÁC THÀNH PHẦN KHÁC TRÊN LÁ SỐ CẦN BIẾT:</span>
                    </div>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      - <strong>Tam Phương Tứ Chính:</strong> Tuyệt đối không xem 1 cung đơn lẻ! Đối Cung (xung chiếu) tác động tới 40%, 2 cung Tam Hợp (hội chiếu) tác động mỗi cung 30%.<br />
                      - <strong>Cung Vô Chính Diệu:</strong> Cung không có chính tinh nào trong 14 sao lớn. Cung này linh hoạt, uyển chuyển, cần mượn sao của cung đối diện về để luận giải.<br />
                      - <strong>Lục Sát Tinh (Kình, Đà, Hỏa, Linh, Không, Kiếp):</strong> Những ngôi sao rèn luyện bản lĩnh. Gặp cát tinh chế hóa thì bộc phát anh hùng, gặp hãm địa thì cần thận trọng phòng ngừa rủi ro.
                    </p>
                  </div>
                </div>
              )}

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowGuideModal(false)}
                  className="px-6 py-2.5 rounded-full font-bold text-xs bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors shadow-lg"
                >
                  Đã Hiểu · Bắt Đầu Khám Phá Lá Số
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Xuất Ảnh Lá Số PNG */}
      {shareOpen && (
        <ShareModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          shareUrl={typeof window !== 'undefined' ? window.location.href : ''}
          chart={chart}
          birth={{
            year: birthState.year,
            month: birthState.month,
            day: birthState.day,
            hour: birthState.clockHour,
            minute: birthState.minute,
            gender: birthState.gender,
            city: birthState.city
          }}
          highlight="Lá số Tử Vi Đẩu Số chuẩn phái Thiên Kỷ"
        />
      )}
    </main>
  );
}
