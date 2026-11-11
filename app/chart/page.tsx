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

function formatBoldMarkup(text: string) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="text-amber-300 font-bold px-0.5">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function ChartPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);
  const [view, setView] = useState<TimeView>('mingpan');
  const [liunianYear, setLiunianYear] = useState(() => new Date().getFullYear());
  const [shareOpen, setShareOpen] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [guideTab, setGuideTab] = useState<'steps' | 'terms' | 'palace_map'>('steps');
  const [rightTab, setRightTab] = useState<'patterns' | 'insights' | 'palace'>('palace');

  // State cho trợ lý hỏi đáp Tử Vi AI chuyên sâu
  const [aiQuestion, setAiQuestion] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

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

  const handleAskAi = async (overrideQ?: string) => {
    const q = (overrideQ || aiQuestion).trim();
    if (!q || !chart) return;
    setIsAiLoading(true);
    setAiError(null);
    try {
      const mingP = chart.palaces.find(p => p.branch === chart.mingGongBranch);
      const shenP = chart.palaces.find(p => p.branch === chart.shenGongBranch);
      const currentDx = chart.daXians[chart.currentDaXianIndex];

      const contextData = {
        name: birthState.city && birthState.city !== 'Hà Nội' ? birthState.city : 'Đương số',
        gender: chart.birthInfo.gender === 'female' ? 'Nữ Mệnh' : 'Nam Mệnh',
        currentAge: chart.currentAge,
        solarDate: `${chart.birthInfo.day}/${chart.birthInfo.month}/${chart.birthInfo.year}`,
        lunarDate: `${chart.lunarInfo.lunarDay}/${chart.lunarInfo.lunarMonth}/${chart.lunarInfo.lunarYear} Âm lịch`,
        wuxingJu: chart.wuxingJuName,
        mingGong: {
          stem: STEMS_VI[mingP?.stem ?? 0],
          branch: BRANCHES_VI[chart.mingGongBranch],
          majors: mingP?.stars.filter(s => s.type === 'major').map(s => `${getStarName(s.name).vi} [${s.brightnessRaw || ''}]`).join(', ') || 'Vô Chính Diệu',
          allStars: mingP?.stars.map(s => getStarName(s.name).vi).join(', '),
        },
        shenGong: {
          palace: getPalaceName(shenP?.name || '').vi,
          branch: BRANCHES_VI[chart.shenGongBranch],
        },
        currentDaXian: currentDx ? {
          palace: getPalaceName(currentDx.palaceName).vi,
          ageRange: `${currentDx.startAge}-${currentDx.endAge} tuổi`,
          branch: BRANCHES_VI[currentDx.palaceBranch],
        } : null,
        selectedPalace: selectedPalace ? {
          name: getPalaceName(selectedPalace.name).vi,
          stem: STEMS_VI[selectedPalace.stem],
          branch: BRANCHES_VI[selectedPalace.branch],
          majors: selectedPalace.stars.filter(s => s.type === 'major').map(s => `${getStarName(s.name).vi} [${s.brightnessRaw || ''}]`).join(', ') || 'Vô Chính Diệu',
        } : null,
      };

      const res = await fetch('/api/ai/divine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'ziwei',
          question: q,
          contextData,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAiError(data.message || 'Không thể kết nối đến Gemini AI lúc này.');
        return;
      }

      setAiAnswer(data.answer);
      if (overrideQ) {
        setAiQuestion(overrideQ);
      }
    } catch (err: unknown) {
      setAiError(err instanceof Error ? err.message : 'Lỗi kết nối máy chủ AI');
    } finally {
      setIsAiLoading(false);
    }
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

                  {/* 7. KẾT LUẬN GIẢI ĐOÁN CỐT LÕI DÀNH CHO ĐƯƠNG SỐ */}
                  {analysis.coreVerdict && (
                    <div className="p-4 rounded-xl bg-gradient-to-b from-amber-950/30 via-stone-900/90 to-amber-950/20 border-2 border-amber-400/60 shadow-2xl space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-amber-500/40">
                        <span className="text-base">🎯</span>
                        <h4 className="font-black text-amber-300 text-xs sm:text-sm uppercase tracking-wide">
                          KẾT LUẬN GIẢI ĐOÁN CỐT LÕI (DÀNH RIÊNG CHO BẠN)
                        </h4>
                      </div>

                      {/* Tiêu đề định vị cách cục */}
                      <div className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-200 font-extrabold text-xs">
                        👑 {analysis.coreVerdict.verdictTitle}
                      </div>

                      {/* Cốt cách & Khí chất */}
                      <div className="space-y-1 text-xs">
                        <span className="font-bold text-amber-300 flex items-center gap-1.5">
                          <span>👤</span>
                          <span>Cốt Cách & Khí Chất Tiên Thiên:</span>
                        </span>
                        <p className="text-stone-200 leading-relaxed pl-4 border-l-2 border-amber-500/40">
                          {analysis.coreVerdict.temperament}
                        </p>
                      </div>

                      {/* Thế mạnh & Ngành nghề */}
                      <div className="space-y-1 text-xs">
                        <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                          <span>💼</span>
                          <span>Thế Mạnh & Ngành Nghề Đắc Lộc Nhất:</span>
                        </span>
                        <p className="text-stone-200 leading-relaxed pl-4 border-l-2 border-emerald-500/40">
                          {analysis.coreVerdict.strengthsAndCareer}
                        </p>
                      </div>

                      {/* Khảo nghiệm & Thận trọng */}
                      <div className="space-y-1 text-xs">
                        <span className="font-bold text-rose-300 flex items-center gap-1.5">
                          <span>⚠️</span>
                          <span>Khảo Nghiệm Vận Trình & Điểm Cần Tu Dưỡng:</span>
                        </span>
                        <p className="text-stone-200 leading-relaxed pl-4 border-l-2 border-rose-500/40">
                          {analysis.coreVerdict.challengesAndCautions}
                        </p>
                      </div>

                      {/* Phán Quyết Định Mệnh Cốt Tử */}
                      <div className="p-3 rounded-lg bg-amber-500/20 border border-amber-400/70 text-amber-100 text-xs leading-relaxed font-semibold shadow-inner">
                        <div className="text-[11px] font-black uppercase text-amber-300 tracking-wider mb-1 flex items-center gap-1">
                          <span>📜</span>
                          <span>Phán Quyết Định Mệnh Cốt Tử:</span>
                        </div>
                        <p className="text-amber-100">{analysis.coreVerdict.directConclusion}</p>
                      </div>
                    </div>
                  )}

                  {/* 8. TRỢ LÝ TỬ VI AI · ĐẶT CÂU HỎI VỀ LÁ SỐ */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 via-stone-900/90 to-purple-950/40 border border-indigo-500/50 shadow-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔮</span>
                        <span className="font-black text-indigo-300 text-xs sm:text-sm">
                          TRỢ LÝ TỬ VI AI · LUẬN GIẢI CHUYÊN SÂU
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono">
                        Gemini Pro
                      </span>
                    </div>

                    <p className="text-[11.5px] text-stone-300">
                      Bạn có thắc mắc gì về <strong className="text-amber-300">Cung {analysis.palaceNameVi}</strong> hoặc toàn bộ lá số của mình? Hãy chọn câu hỏi nhanh bên dưới hoặc nhập câu hỏi riêng:
                    </p>

                    {/* Gợi ý câu hỏi nhanh 1-click */}
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        `Ý nghĩa tổng quan cung ${analysis.palaceNameVi} của tôi là gì?`,
                        'Tôi làm nghề gì hoặc đầu tư lĩnh vực nào thì phát tài nhất?',
                        'Chuyện tình duyên hôn nhân của tôi thế nào, khi nào thuận lợi?',
                        'Đại hạn hiện tại này tôi nên tiến công hay phòng thủ?',
                        'Lá số của tôi có cách cục gì đặc biệt, phát về danh hay tài?'
                      ].map((quickQ, qIdx) => (
                        <button
                          key={qIdx}
                          type="button"
                          disabled={isAiLoading}
                          onClick={() => handleAskAi(quickQ)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-stone-800/80 hover:bg-indigo-600/30 text-stone-300 hover:text-indigo-200 border border-stone-700/80 hover:border-indigo-400/50 transition-all text-left"
                        >
                          💬 {quickQ}
                        </button>
                      ))}
                    </div>

                    {/* Ô nhập câu hỏi tuỳ biến */}
                    <div className="space-y-2 pt-1">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={aiQuestion}
                          onChange={(e) => setAiQuestion(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !isAiLoading && aiQuestion.trim()) {
                              handleAskAi();
                            }
                          }}
                          placeholder={`Đặt câu hỏi về cung ${analysis.palaceNameVi} hoặc vận mệnh của bạn...`}
                          className="flex-1 px-3 py-2 text-xs rounded-lg bg-stone-950/80 border border-indigo-500/30 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-indigo-400"
                        />
                        <button
                          type="button"
                          disabled={isAiLoading || !aiQuestion.trim()}
                          onClick={() => handleAskAi()}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed shadow transition-all flex items-center gap-1.5 shrink-0"
                        >
                          {isAiLoading ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Đang Luận...</span>
                            </>
                          ) : (
                            <>
                              <span>✨</span>
                              <span>Hỏi Thầy</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Lỗi nếu có */}
                      {aiError && (
                        <div className="p-2 rounded bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs">
                          ⚠️ {aiError}
                        </div>
                      )}

                      {/* Hiển thị câu trả lời AI */}
                      {aiAnswer && (
                        <div className="mt-3 p-3.5 rounded-xl bg-stone-950/90 border border-indigo-400/50 space-y-2">
                          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                              <span>📜</span>
                              <span>Lời Thầy Giải Đoán Cho Bạn:</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => setAiAnswer(null)}
                              className="text-[10px] text-stone-400 hover:text-stone-200"
                            >
                              Đóng
                            </button>
                          </div>
                          <div className="text-xs text-stone-200 leading-relaxed whitespace-pre-wrap space-y-2">
                            {formatBoldMarkup(aiAnswer)}
                          </div>
                        </div>
                      )}
                    </div>
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
              <div className="flex flex-wrap gap-1 rounded-xl p-1 bg-stone-900 border border-stone-800">
                <button
                  type="button"
                  onClick={() => setGuideTab('steps')}
                  className={`flex-1 min-w-[120px] py-1.5 rounded-lg text-xs font-bold transition-all ${
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
                  className={`flex-1 min-w-[160px] py-1.5 rounded-lg text-xs font-bold transition-all ${
                    guideTab === 'terms'
                      ? 'bg-amber-500 text-stone-950 shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  📖 Bản Mệnh · Cung Mệnh · Đại Hạn
                </button>
                <button
                  type="button"
                  onClick={() => setGuideTab('palace_map')}
                  className={`flex-1 min-w-[160px] py-1.5 rounded-lg text-xs font-bold transition-all ${
                    guideTab === 'palace_map'
                      ? 'bg-amber-500 text-stone-950 shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  🗺️ Bản Đồ 12 Cung: Bấm Đâu Để Xem?
                </button>
              </div>

              {guideTab === 'steps' && (
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
              )}

              {guideTab === 'terms' && (
                <div className="space-y-4 text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {/* 1. Bản Mệnh vs Cung Mệnh vs Cung Thân */}
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2.5">
                    <div className="font-extrabold text-amber-300 flex items-center gap-2 text-sm">
                      <span>🌟</span>
                      <span>1. PHÂN BIỆT BẢN MỆNH · CUNG MỆNH · CUNG THÂN</span>
                    </div>
                    <div className="space-y-2 text-xs text-stone-300 leading-relaxed">
                      <div className="p-2.5 rounded bg-stone-900/80 border border-stone-700">
                        <strong className="text-amber-300">🌱 Bản Mệnh (Ngũ Hành Nạp Âm năm sinh):</strong><br />
                        Là cốt chất ngũ hành tiên thiên khởi sinh của bạn (ví dụ: <em>Sa Trung Kim</em>, <em>Dương Liễu Mộc</em>, <em>Sơn Hạ Hỏa</em>...). Bản Mệnh là &quot;chất liệu gốc&quot; dùng để so sánh sinh/khắc với Cục số (Mệnh sinh Cục là lao tâm, Cục sinh Mệnh là được hoàn cảnh trợ duyên) và dùng để so đôi tuổi vợ chồng.
                      </div>
                      <div className="p-2.5 rounded bg-stone-900/80 border border-stone-700">
                        <strong className="text-amber-300">🏛️ Cung Mệnh (Cung vị số 1 trên Thiên Bàn):</strong><br />
                        Là <strong>&quot;Bộ Tổng Tư Lệnh&quot;</strong>, hạt nhân tiên thiên của sinh mệnh. Cung Mệnh quyết định cốt cách, ngoại hình, tư chất thông minh, tài năng bẩm sinh và vận mệnh thời tiền vận (1–30 tuổi). Xem Mệnh là xem cái <strong>GỐC</strong> của cây đại thụ — gốc có sâu rễ bền thì hoa trái mới xum xuê.
                      </div>
                      <div className="p-2.5 rounded bg-stone-900/80 border border-stone-700">
                        <strong className="text-sky-300">⚓ Cung Thân (Hậu Vận Sau 30 Tuổi):</strong><br />
                        Mệnh là hạt giống gieo xuống, còn Thân là thành quả nỗ lực gặt hái sau 30 tuổi. Thân cư đâu thì tâm trí và sự nghiệp dồn vào đó: Thân cư Quan Lộc thì cả đời vì công danh; Thân cư Phu Thê thì gia đình bạn đời là trọng tâm; Thân cư Tài Bạch thì miệt mài gầy dựng của cải.
                      </div>
                    </div>
                  </div>

                  {/* 2. Đại hạn 10 năm */}
                  <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-2">
                    <div className="font-extrabold text-purple-300 flex items-center gap-2 text-sm">
                      <span>⏳</span>
                      <span>2. ĐẠI HẠN LÀ SAO? TẠI SAO LẠI TRỎ VÀO CUNG KHÁC (VÍ DỤ PHU THÊ)?</span>
                    </div>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      - <strong>Quy luật chu kỳ 10 năm:</strong> Đời người trong Tử Vi chia thành các nấc thang 10 năm gọi là <em>Đại Hạn</em>.<br />
                      - <strong>Ý nghĩa &quot;Cung Mệnh Lâm Thời&quot;:</strong> Khi bạn bước vào độ tuổi của Đại Hạn nào, cung đó tạm thời trở thành &quot;Cung Mệnh&quot; thứ hai của bạn trong suốt 10 năm! Ví dụ: Nếu Đại Hạn đang ở Cung Phu Thê (như tuổi 24–33), mọi quyết định lớn nhất về tình cảm, kết hôn, sự trợ lực từ người bạn đời và đối tác sẽ ảnh hưởng trực tiếp đến sự nghiệp và tài chính của bạn trong 10 năm đó.
                    </p>
                  </div>

                  {/* 3. Lưu Niên */}
                  <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/40 space-y-2">
                    <div className="font-extrabold text-sky-300 flex items-center gap-2 text-sm">
                      <span>📅</span>
                      <span>3. LƯU NIÊN NÊN XEM THẾ NÀO?</span>
                    </div>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      - <strong>Đại Hạn quản 10 năm (Thời thế vĩ mô), Lưu Niên quản 1 năm (Biến cố vi mô):</strong> Lưu Niên cho biết cơ hội và hạn cụ thể của từng năm (ví dụ năm 2026 Bính Ngọ).<br />
                      - <strong>Nguyên tắc 3 tầng:</strong><br />
                      &nbsp;&nbsp;+ <em>Mệnh (Nội lực bản thân):</em> Bạn có đủ tài trí và bản lĩnh không?<br />
                      &nbsp;&nbsp;+ <em>Đại Hạn (Thời thế 10 năm):</em> Đang vào giai đoạn thịnh vượng hay trắc trở?<br />
                      &nbsp;&nbsp;+ <em>Lưu Niên (Cơ hội năm nay):</em> Năm nay có nên đầu tư, đổi nghề, lập gia đình hay giữ mình phòng thủ?
                    </p>
                  </div>
                </div>
              )}

              {guideTab === 'palace_map' && (
                <div className="space-y-3.5 text-xs text-stone-200 leading-relaxed">
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                    💡 <strong>Bản Đồ 12 Cung Vị:</strong> Bạn đang băn khoăn về vấn đề gì trong cuộc sống? Hãy tra cứu bảng dưới đây và bấm vào nút <strong>[ 🎯 Bấm Xem Cung Này ]</strong> để hệ thống nhảy ngay đến cung vị đó và mở phân tích chi tiết:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[55vh] overflow-y-auto pr-1">
                    {[
                      {
                        name: 'CUNG MỆNH',
                        badge: '🌟 Gốc Tiên Thiên',
                        desc: 'Cốt cách, bản lĩnh, tư chất thông minh, ngoại hình và vận mệnh thời tiền vận (1–30 tuổi). Xem Mệnh là xem cái "gốc" của toàn bộ đời người.',
                        match: (p: Palace) => p.isMingGong,
                      },
                      {
                        name: 'CUNG THÂN',
                        badge: '⚓ Hậu Vận Sau 30t',
                        desc: 'Thành quả nỗ lực nửa đời sau (từ 30 tuổi trở đi), nơi an thân lập mệnh, phương hướng dồn tâm huyết của bạn.',
                        match: (p: Palace) => p.isShenGong,
                      },
                      {
                        name: 'CUNG QUAN LỘC',
                        badge: '💼 Công Danh Sự Nghiệp',
                        desc: 'Nghề nghiệp, con đường thăng tiến, quan chức, kinh doanh, công chức hay tự do, môi trường công tác và phong cách hành sự.',
                        match: (p: Palace) => p.name === '官禄' || p.name.includes('官'),
                      },
                      {
                        name: 'CUNG TÀI BẠCH',
                        badge: '💰 Tiền Tài & Tài Lộc',
                        desc: 'Khả năng kiếm tiền, nguồn tài chính, dòng tiền đầu tư, năng lực quản lý của cải, giữ được tiền hay hao tài tốn của.',
                        match: (p: Palace) => p.name === '财帛' || p.name.includes('财'),
                      },
                      {
                        name: 'CUNG PHU THÊ',
                        badge: '💍 Hôn Nhân Tình Duyên',
                        desc: 'Duyên nợ tình cảm, tính cách và diện mạo người bạn đời, thời điểm kết hôn, gia đạo êm ấm hay trắc trở thử thách.',
                        match: (p: Palace) => p.name === '夫妻' || p.name.includes('夫妻'),
                      },
                      {
                        name: 'CUNG ĐIỀN TRẠCH',
                        badge: '🏡 Bất Động Sản Nhà Đất',
                        desc: 'Nhà cửa, đất đai, bất động sản, cơ ngơi tích lũy, tài sản thừa kế từ gia tiên và phong thủy nơi sinh sống.',
                        match: (p: Palace) => p.name === '田宅' || p.name.includes('田'),
                      },
                      {
                        name: 'CUNG PHÚC ĐỨC',
                        badge: '🕊️ Phúc Ấm & Tâm Linh',
                        desc: 'Phúc đức tổ tiên dòng họ, tuổi thọ, sự bình an trong tâm hồn, mức độ thụ hưởng tinh thần và may mắn ngầm.',
                        match: (p: Palace) => p.name === '福德' || p.name.includes('福'),
                      },
                      {
                        name: 'CUNG THIÊN DI',
                        badge: '✈️ Xuất Ngoại & Đi Xa',
                        desc: 'Đi xa quê lập nghiệp, xuất ngoại, môi trường bên ngoài xã hội, đối nhân xử thế và sự đón nhận của người đời.',
                        match: (p: Palace) => p.name === '迁移' || p.name.includes('迁'),
                      },
                      {
                        name: 'CUNG TẬT ÁCH',
                        badge: '🏥 Sức Khỏe & Thể Trạng',
                        desc: 'Sức khỏe cơ thể, các tạng phủ dễ suy yếu, bệnh lý tiềm ẩn, tai ương và những điều cần chăm sóc phòng ngừa.',
                        match: (p: Palace) => p.name === '疾厄' || p.name.includes('疾'),
                      },
                      {
                        name: 'CUNG TỬ TỨC',
                        badge: '👶 Con Cái & Hậu Duệ',
                        desc: 'Đường con cái, khả năng sinh nở, tính cách tài năng của con, phúc lộc phụ dưỡng và sự hiếu thuận tuổi già.',
                        match: (p: Palace) => p.name === '子女' || p.name.includes('子'),
                      },
                      {
                        name: 'CUNG PHỤ MẪU',
                        badge: '👨‍👩‍👦 Cha Mẹ & Phúc Gia Tộc',
                        desc: 'Tình cảm với cha mẹ, sự chăm sóc giáo dưỡng, phúc lộc của phụ mẫu và mối tương quan gia đình ruột thịt.',
                        match: (p: Palace) => p.name === '父母' || p.name.includes('父'),
                      },
                      {
                        name: 'CUNG HUYNH ĐỆ',
                        badge: '🤝 Anh Em & Bạn Chí Cốt',
                        desc: 'Tình cảm anh chị em trong nhà, bạn bè tri kỷ chí cốt cùng chung lưng đấu cật khởi nghiệp làm ăn.',
                        match: (p: Palace) => p.name === '兄弟' || p.name.includes('兄'),
                      },
                      {
                        name: 'CUNG NÔ BỘC (GIAO HỮU)',
                        badge: '👥 Đồng Nghiệp & Đối Tác',
                        desc: 'Bạn bè xã giao, cấp dưới, nhân viên, đối tác làm ăn, mức độ được người khác phò trợ hay bị phản trắc.',
                        match: (p: Palace) => p.name === '交友' || p.name === '奴仆' || p.name.includes('友') || p.name.includes('仆'),
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-amber-500/50 flex flex-col justify-between space-y-2 transition-all shadow"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-extrabold text-amber-300 text-xs">
                              {item.name}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[11.5px] text-stone-300 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (!chart) return;
                            const target = chart.palaces.find(item.match);
                            if (target) {
                              setSelectedPalace(target);
                              setRightTab('palace');
                              setShowGuideModal(false);
                            }
                          }}
                          className="w-full py-1.5 px-3 rounded-lg text-[11px] font-bold bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border border-amber-500/40 hover:border-amber-400 transition-all flex items-center justify-center gap-1"
                        >
                          <span>🎯</span>
                          <span>Bấm Xem Cung Này Ngay</span>
                        </button>
                      </div>
                    ))}
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
