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
import { PALACE_VI, getStarName, BRANCHES_VI, STEMS_VI, BRIGHTNESS_VI } from '@/lib/ziwei/vietnamese';
import { useTheme } from '@/components/ThemeProvider';

export default function ChartPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);
  const [view, setView] = useState<TimeView>('mingpan');
  const [liunianYear, setLiunianYear] = useState(() => new Date().getFullYear());
  const [shareOpen, setShareOpen] = useState(false);
  const [rightTab, setRightTab] = useState<'patterns' | 'insights' | 'palace'>('patterns');

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
    setSelectedPalace(null);
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
    setChart(generateChart(info));
    setSelectedPalace(null);
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

      {/* Khu Vực Hiển Thị Chính: 2 Cột (Lá Số & Luận Giải / Cách Cục) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Cột Trái: Bảng 12 Cung Lá Số Tử Vi (ChartBoard) */}
        <div className="lg:col-span-8 overflow-x-auto">
          <div className="card-glass rounded-2xl p-2 sm:p-4">
            <ChartBoard
              chart={chart}
              onPalaceSelect={(p) => {
                setSelectedPalace(p);
                setRightTab('palace');
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
              onClick={() => setRightTab('patterns')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                rightTab === 'patterns'
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              🏆 Cách Cục Cổ Tịch
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
              📖 Luận Giải Mệnh Số
            </button>
            {selectedPalace && (
              <button
                type="button"
                onClick={() => setRightTab('palace')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  rightTab === 'palace'
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                🔍 Cung {PALACE_VI[selectedPalace.name]?.short || selectedPalace.name}
              </button>
            )}
          </div>

          {/* Nội Dung Từng Tab */}
          <AnimatePresence mode="wait">
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

            {rightTab === 'palace' && selectedPalace && (
              <motion.div
                key="tab-palace"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="card-glass rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--bdr)' }}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-amber-500">
                        {PALACE_VI[selectedPalace.name]?.vi || selectedPalace.name}
                      </span>
                      <span className="text-[10px] opacity-60">({selectedPalace.name})</span>
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      {PALACE_VI[selectedPalace.name]?.short} · Cung {BRANCHES_VI[selectedPalace.branch]} ({BRANCHES[selectedPalace.branch]})
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/25 font-semibold">
                      Can {STEMS_VI[selectedPalace.stem]} ({STEMS[selectedPalace.stem]})
                    </span>
                  </div>
                </div>

                {/* Danh Sách Sao Trong Cung */}
                <div>
                  <span className="text-[11px] font-semibold block mb-2" style={{ color: 'var(--tx-2)' }}>
                    ★ Các Tinh Diệu Toạ Thủ:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedPalace.stars.map((s, idx) => {
                      const st = getStarName(s.name);
                      const brightVi = s.brightnessRaw ? BRIGHTNESS_VI[s.brightnessRaw] || s.brightnessRaw : '';

                      return (
                        <div
                          key={`${s.name}-${idx}`}
                          className={`text-xs px-2.5 py-1.5 rounded-lg border flex flex-col items-center leading-tight ${
                            s.type === 'major'
                              ? 'bg-amber-500/15 border-amber-500/35 text-amber-400 font-bold'
                              : s.type === 'lucky'
                              ? 'bg-sky-500/15 border-sky-500/35 text-sky-400'
                              : s.type === 'sha'
                              ? 'bg-red-500/15 border-red-500/35 text-red-400'
                              : 'bg-stone-500/10 border-stone-500/25 text-stone-300'
                          }`}
                        >
                          <div className="flex items-baseline gap-1">
                            <span>{st.vi}</span>
                            {brightVi && <span className="text-[9px] opacity-80 font-normal">[{brightVi}]</span>}
                          </div>
                          <span className="text-[8px] opacity-50 font-normal mt-0.5">
                            {st.zh}{s.brightnessRaw ? `(${s.brightnessRaw})` : ''}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Đại Hạn Cung */}
                {selectedPalace.daXianAge && (
                  <div className="text-xs p-2.5 rounded-lg card-inner flex items-center justify-between" style={{ color: 'var(--tx-2)' }}>
                    <span className="font-semibold text-amber-500">Đại Hạn:</span>
                    <span className="font-bold">{selectedPalace.daXianAge[0]} - {selectedPalace.daXianAge[1]} tuổi</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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
