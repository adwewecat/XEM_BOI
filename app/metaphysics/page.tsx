'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { calculateBazi, BaziResult } from '@/lib/metaphysics/bazi';
import { castIChingCoins, DivinationResult } from '@/lib/metaphysics/iching';
import { castDongTam, DongTamResult } from '@/lib/metaphysics/dongtam';
import { drawTarotSpread, TarotSpreadResult } from '@/lib/metaphysics/tarot';
import { calculateAlmanac, AlmanacResult } from '@/lib/metaphysics/almanac';
import VisualBaguaHexagram from '@/components/metaphysics/VisualBaguaHexagram';
import VisualTarotCard from '@/components/metaphysics/VisualTarotCard';
import {
  calculateLifePath,
  calculateDestinyNumber,
  calculatePersonalYear,
  getZodiacSign,
  LifePathDetail,
  ZodiacSignDetail,
} from '@/lib/metaphysics/numerology';

export default function MetaphysicsPage() {
  const [activeTab, setActiveTab] = useState<'dongtam' | 'almanac' | 'bazi' | 'tarot' | 'iching' | 'numerology'>('dongtam');

  // --- THÔNG TIN NGƯỜI DÙNG ĐỒNG BỘ TỪ LÁ SỐ ---
  const [userProfile, setUserProfile] = useState<{
    name?: string;
    year?: number;
    month?: number;
    day?: number;
    clockHour?: number;
    clockMinute?: number;
    gender?: string;
    province?: string;
    city?: string;
  } | null>(null);

  // --- STATE CHO BÓI HỮU DUYÊN (GIỜ ĐỘNG TÂM) ---
  const [dongTamQuestion, setDongTamQuestion] = useState('');
  const [dongTamDate, setDongTamDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  });
  const [dongTamTime, setDongTamTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  });
  const [dongTamResult, setDongTamResult] = useState<DongTamResult | null>(null);
  const [isDongTamCasting, setIsDongTamCasting] = useState(false);

  // --- STATE CHO XEM NGÀY LÀNH DỮ & VẬN NHẬT (TRẠCH NHẬT) ---
  const [almanacDate, setAlmanacDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  });

  // --- STATE CHO BÀI TAROT ---
  const [tarotType, setTarotType] = useState<'three_cards' | 'single' | 'love'>('three_cards');
  const [tarotQuestion, setTarotQuestion] = useState('');
  const [tarotResult, setTarotResult] = useState<TarotSpreadResult | null>(null);
  const [isTarotDrawing, setIsTarotDrawing] = useState(false);

  // --- STATE CHO BÁT TỰ TỨ TRỤ ---
  const [baziYear, setBaziYear] = useState(1995);
  const [baziMonth, setBaziMonth] = useState(8);
  const [baziDay, setBaziDay] = useState(23);
  const [baziHour, setBaziHour] = useState(12);
  const [baziMinute, setBaziMinute] = useState(0);

  // --- STATE CHO KINH DỊCH ---
  const [divination, setDivination] = useState<DivinationResult | null>(null);
  const [isCasting, setIsCasting] = useState(false);

  // --- STATE CHO THẦN SỐ HỌC & HOÀNG ĐẠO ---
  const [numName, setNumName] = useState('Nguyễn Văn An');
  const [numYear, setNumYear] = useState(1995);
  const [numMonth, setNumMonth] = useState(8);
  const [numDay, setNumDay] = useState(23);

  // Tự động khôi phục dữ liệu người dùng từ localStorage và khởi tạo thời gian thực Date.now()
  useEffect(() => {
    // 1. Lấy thông tin lá số đã lập
    try {
      const saved = localStorage.getItem('ziwei_user_profile');
      if (saved) {
        const p = JSON.parse(saved);
        if (p && p.year) {
          setUserProfile(p);
          if (p.year) setBaziYear(Number(p.year));
          if (p.month) setBaziMonth(Number(p.month));
          if (p.day) setBaziDay(Number(p.day));
          if (p.clockHour !== undefined) setBaziHour(Number(p.clockHour));
          if (p.clockMinute !== undefined) setBaziMinute(Number(p.clockMinute));
          if (p.name) setNumName(p.name);
          if (p.year) setNumYear(Number(p.year));
          if (p.month) setNumMonth(Number(p.month));
          if (p.day) setNumDay(Number(p.day));
        }
      }
    } catch {}

    // 2. Khởi tạo ngày giờ động tâm và trạch nhật chính xác theo Date.now()
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const h = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    setDongTamDate(`${y}-${m}-${d}`);
    setDongTamTime(`${h}:${min}`);
    setAlmanacDate(`${y}-${m}-${d}`);
  }, []);

  const handleCastDongTam = () => {
    if (!dongTamQuestion.trim()) return;
    setIsDongTamCasting(true);
    setTimeout(() => {
      setDongTamResult(castDongTam(dongTamQuestion, dongTamDate, dongTamTime));
      setIsDongTamCasting(false);
    }, 450);
  };

  const handleSetCurrentTime = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const h = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    setDongTamDate(`${y}-${m}-${d}`);
    setDongTamTime(`${h}:${min}`);
  };

  const handleDrawTarot = () => {
    setIsTarotDrawing(true);
    setTimeout(() => {
      setTarotResult(drawTarotSpread(tarotType, tarotQuestion.trim() || 'Thông điệp dẫn lối tổng quan'));
      setIsTarotDrawing(false);
    }, 500);
  };

  const baziData: BaziResult = useMemo(() => {
    return calculateBazi(baziYear, baziMonth, baziDay, baziHour, baziMinute);
  }, [baziYear, baziMonth, baziDay, baziHour, baziMinute]);

  const handleCastCoins = () => {
    setIsCasting(true);
    setTimeout(() => {
      setDivination(castIChingCoins());
      setIsCasting(false);
    }, 600);
  };

  const lifePath: LifePathDetail = useMemo(() => {
    return calculateLifePath(numYear, numMonth, numDay);
  }, [numYear, numMonth, numDay]);

  const destiny = useMemo(() => {
    return calculateDestinyNumber(numName);
  }, [numName]);

  const personalYear = useMemo(() => {
    return calculatePersonalYear(numDay, numMonth);
  }, [numDay, numMonth]);

  const zodiac: ZodiacSignDetail = useMemo(() => {
    return getZodiacSign(numDay, numMonth);
  }, [numDay, numMonth]);

  const almanacResult: AlmanacResult = useMemo(() => {
    return calculateAlmanac(almanacDate, userProfile ?? undefined);
  }, [almanacDate, userProfile]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-amber-500/20">
          <Link href="/chart" className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
            <span>←</span> Lập Lá Số Tử Vi (紫微)
          </Link>
          <div className="text-xs font-mono font-bold tracking-widest text-amber-200/80 uppercase">
            Bách Gia Thuật Số · Kim Cổ Đông Tây
          </div>
          <Link href="/knowledge" className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
            Vạn Tinh Các (万星) <span>→</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-3">
            <span>🧭</span> KHO TÀNG HUYỀN HỌC ĐÔNG TÂY TOÀN THƯ
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-amber-100 tracking-tight mb-3">
            KIM CỔ ĐÔNG TÂY · BÁCH GIA THUẬT SỐ
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Hợp nhất tinh hoa Mệnh Lý Phương Đông (<strong className="text-amber-300">Tử Bình Bát Tự, Chu Dịch 64 Quẻ, Trạch Nhật</strong>) 
            và Huyền Học Phương Tây (<strong className="text-amber-300">Bài Tarot 22 Ẩn Chính, Thần Số Học Pitago, 12 Cung Hoàng Đạo</strong>).
          </p>
        </div>

        {/* Banner Tự Động Đồng Bộ Dữ Liệu Lá Số */}
        {userProfile && (
          <div className="mb-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-2 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-200">
              <span className="text-amber-400 font-black">✓ ĐÃ ĐỒNG BỘ TỪ LÁ SỐ:</span>
              <strong className="text-amber-100 font-bold">{userProfile.name || 'Người Xem'}</strong>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-300 font-medium">
                Sinh ngày {userProfile.day}/{userProfile.month}/{userProfile.year} lúc {String(userProfile.clockHour ?? 0).padStart(2, '0')}:{String(userProfile.clockMinute ?? 0).padStart(2, '0')}
              </span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-300 font-medium">{userProfile.gender === 'female' ? 'Nữ Mệnh' : 'Nam Mệnh'}</span>
            </div>
            <div className="text-[11px] text-zinc-400 flex items-center gap-2">
              <span className="text-emerald-400 font-semibold">Tự động điền Bát Tự, Thần Số Học & Đối chiếu Hợp Mệnh</span>
              <Link href="/chart" className="text-amber-400 font-semibold hover:underline">
                Đổi lá số khác →
              </Link>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-xl bg-zinc-900/80 border border-amber-500/30 backdrop-blur-md shadow-xl gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('dongtam')}
              className={`px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'dongtam'
                  ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30 font-black'
                  : 'text-zinc-400 hover:text-amber-200 hover:bg-zinc-800/60'
              }`}
            >
              <span>🔮</span>
              <span>Bói Hữu Duyên (Giờ Động Tâm)</span>
            </button>

            <button
              onClick={() => setActiveTab('almanac')}
              className={`px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'almanac'
                  ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30 font-black'
                  : 'text-zinc-400 hover:text-amber-200 hover:bg-zinc-800/60'
              }`}
            >
              <span>📅</span>
              <span>Xem Ngày Lành Dữ (Trạch Nhật)</span>
            </button>

            <button
              onClick={() => setActiveTab('bazi')}
              className={`px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'bazi'
                  ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30 font-black'
                  : 'text-zinc-400 hover:text-amber-200 hover:bg-zinc-800/60'
              }`}
            >
              <span>🎴</span>
              <span>Tử Bình Bát Tự (Tứ Trụ)</span>
            </button>

            <button
              onClick={() => setActiveTab('tarot')}
              className={`px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'tarot'
                  ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30 font-black'
                  : 'text-zinc-400 hover:text-amber-200 hover:bg-zinc-800/60'
              }`}
            >
              <span>🃏</span>
              <span>Bài Tarot (22 Ẩn Chính)</span>
            </button>

            <button
              onClick={() => setActiveTab('iching')}
              className={`px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'iching'
                  ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30 font-black'
                  : 'text-zinc-400 hover:text-amber-200 hover:bg-zinc-800/60'
              }`}
            >
              <span>🪙</span>
              <span>Kinh Dịch (64 Quẻ)</span>
            </button>

            <button
              onClick={() => setActiveTab('numerology')}
              className={`px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'numerology'
                  ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30 font-black'
                  : 'text-zinc-400 hover:text-amber-200 hover:bg-zinc-800/60'
              }`}
            >
              <span>🔯</span>
              <span>Thần Số & Hoàng Đạo</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: BÓI HỮU DUYÊN (GIỜ ĐỘNG TÂM - MAI HOA & LỤC HÀO) */}
        {/* ============================================================== */}
        {activeTab === 'dongtam' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            <div className="card-glass p-6 rounded-2xl border border-amber-500/30 shadow-2xl bg-zinc-950/80 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-amber-300">
                  <span>🔮</span> BÓI HỮU DUYÊN · MAI HOA & LỤC HÀO CHIÊM ĐOÁN THEO GIỜ ĐỘNG TÂM
                </div>
                <button
                  type="button"
                  onClick={handleSetCurrentTime}
                  className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors flex items-center gap-1 font-semibold"
                >
                  <span>⏰</span> Lấy Giờ Hiện Tại
                </button>
              </div>

              {/* Ô nhập câu hỏi */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 block flex items-center gap-1.5">
                  <span>✍️</span> Vấn đề cần hỏi / Sự việc trăn trở trong tâm:
                </label>
                <textarea
                  value={dongTamQuestion}
                  onChange={(e) => setDongTamQuestion(e.target.value)}
                  rows={4}
                  placeholder="Nhập việc bạn đang trăn trở muốn gieo quẻ (về công danh sự nghiệp, tài lộc làm ăn, tình duyên gia đạo, xuất hành chuyển chỗ, sức khỏe...)"
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-zinc-100 font-semibold focus:outline-none placeholder:text-zinc-600 leading-relaxed"
                />
              </div>

              {/* Ngày giờ động tâm & Nút reo quẻ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end pt-2">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Ngày động tâm</label>
                  <input
                    type="date"
                    value={dongTamDate}
                    onChange={(e) => setDongTamDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-xl px-3 py-2 text-sm text-zinc-100 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Giờ động tâm (Giờ:Phút)</label>
                  <input
                    type="time"
                    value={dongTamTime}
                    onChange={(e) => setDongTamTime(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-xl px-3 py-2 text-sm text-zinc-100 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleCastDongTam}
                    disabled={isDongTamCasting || !dongTamQuestion.trim()}
                    className={`w-full py-2.5 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                      !dongTamQuestion.trim()
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                        : 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95'
                    }`}
                  >
                    <span>{isDongTamCasting ? '🌀' : '🔮'}</span>
                    <span>{isDongTamCasting ? 'ĐANG KHỞI QUẺ DỊCH...' : 'THẦY REO QUẺ & PHÁN'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* KẾT QUẢ PHÁN QUẺ CỦA THẦY */}
            {dongTamResult && (
              <div className="space-y-6">
                {/* Lời phán trực tiếp của Thầy */}
                <div className="card-glass p-6 sm:p-8 rounded-2xl border-2 border-amber-500/60 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Header quẻ */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-4 mb-5">
                    <div>
                      <div className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                        <span>⛩️</span> LỜI THẦY PHÁN TRỰC TIẾP
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-amber-200 mt-1">
                        {dongTamResult.hexagram.originalName} Động Hào {dongTamResult.hexagram.movingLine} Biến {dongTamResult.hexagram.changedName}
                      </h2>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-zinc-400">{dongTamResult.datetimeInput.solarStr}</div>
                      <div className="text-xs font-bold text-amber-300 mt-0.5">{dongTamResult.datetimeInput.lunarStr}</div>
                    </div>
                  </div>

                  {/* Lời luận giải nguyên bản */}
                  <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-6">
                    <div className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-2">
                      <span>🎴</span> THẦY REO QUẺ VÀ PHÁN:
                    </div>
                    <p className="text-sm sm:text-base font-serif text-zinc-100 leading-loose italic whitespace-pre-line">
                      "{dongTamResult.thayPhan}"
                    </p>
                  </div>

                  {/* Chi tiết Dụng Thần & Dịch Lý */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-4">
                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-500 block font-semibold">Tứ Trụ Can Chi Thời Khắc:</span>
                      <strong className="text-amber-300 text-sm font-bold block mt-0.5">
                        {dongTamResult.datetimeInput.ganZhiYear} {dongTamResult.datetimeInput.ganZhiMonth} {dongTamResult.datetimeInput.ganZhiDay} {dongTamResult.datetimeInput.ganZhiHour}
                      </strong>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-500 block font-semibold">Dụng Thần Chiêm Đoán:</span>
                      <strong className="text-amber-300 text-sm font-bold block mt-0.5">
                        {dongTamResult.dungThan.subject} ({dongTamResult.dungThan.targetName}) - {dongTamResult.dungThan.state}
                      </strong>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-500 block font-semibold">Tuần Không (Xun Kong):</span>
                      <strong className="text-rose-400 text-sm font-bold block mt-0.5">{dongTamResult.datetimeInput.xunKong} (Không Vong)</strong>
                    </div>
                  </div>

                  {/* Ứng Kỳ Thời Gian */}
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
                    <span className="text-lg">💡</span>
                    <div>
                      <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                        ỨNG KỲ THỜI GIAN & LỜI DẪN:
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {dongTamResult.ungKy}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ĐỒ HỌA TRỰC QUAN BÁT QUÁI & HÀO ĐỘNG & NGŨ HÀNH TẠNG PHỦ */}
                <VisualBaguaHexagram
                  originalName={dongTamResult.hexagram.originalName}
                  originalUpper={dongTamResult.hexagram.originalUpper}
                  originalLower={dongTamResult.hexagram.originalLower}
                  movingLine={dongTamResult.hexagram.movingLine}
                  changedName={dongTamResult.hexagram.changedName}
                  changedUpper={dongTamResult.hexagram.changedUpper}
                  changedLower={dongTamResult.hexagram.changedLower}
                  highlightOrgan={dongTamResult.diseaseAnalysis?.involvedOrgan}
                  highlightElement={dongTamResult.diseaseAnalysis?.involvedElement}
                />
              </div>
            )}
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: XEM NGÀY LÀNH DỮ & VẬN NHẬT (TRẠCH NHẬT PHONG THỦY) */}
        {/* ============================================================== */}
        {activeTab === 'almanac' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            {/* Bộ chọn ngày: Nhanh và tùy chỉnh */}
            <div className="card-glass p-5 rounded-2xl border border-amber-500/30 shadow-xl bg-zinc-950/70 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-amber-300">
                  <span>📅</span> TRẠCH NHẬT PHONG THỦY · XEM NGÀY LÀNH DỮ & VẬN NHẬT
                </div>
                <div className="text-xs text-zinc-400">
                  Tra cứu Quá Khứ để nghiệm chứng hoặc Vị Lai để trù tính đại sự
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[220px]">
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">
                    Chọn Ngày Cần Xem (Dương Lịch):
                  </label>
                  <input
                    type="date"
                    value={almanacDate}
                    onChange={(e) => setAlmanacDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-zinc-100 font-bold focus:outline-none"
                  />
                </div>

                {/* Nút chọn nhanh */}
                <div className="flex flex-wrap items-center gap-2 pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      const now = new Date();
                      setAlmanacDate(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`);
                    }}
                    className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-amber-300 border border-zinc-700 transition-colors"
                  >
                    Hôm Nay
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const next = new Date(Date.now() + 86400000);
                      setAlmanacDate(`${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-${String(next.getDate()).padStart(2, '0')}`);
                    }}
                    className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 border border-zinc-700 transition-colors"
                  >
                    Ngày Mai
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const d3 = new Date(Date.now() + 86400000 * 3);
                      setAlmanacDate(`${d3.getFullYear()}-${String(d3.getMonth() + 1).padStart(2, '0')}-${String(d3.getDate()).padStart(2, '0')}`);
                    }}
                    className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 border border-zinc-700 transition-colors"
                  >
                    +3 Ngày Tới
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const d7 = new Date(Date.now() + 86400000 * 7);
                      setAlmanacDate(`${d7.getFullYear()}-${String(d7.getMonth() + 1).padStart(2, '0')}-${String(d7.getDate()).padStart(2, '0')}`);
                    }}
                    className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 border border-zinc-700 transition-colors"
                  >
                    +7 Ngày Tới
                  </button>
                </div>
              </div>
            </div>

            {/* Chi tiết kết quả Trạch Nhật */}
            <div className="space-y-6">
              {/* Banner 1: Trạng thái Hoàng Đạo / Hắc Đạo & Âm Dương Lịch */}
              <div className={`card-glass p-6 rounded-2xl border-2 shadow-2xl ${
                almanacResult.isHuangDao
                  ? 'border-amber-500/50 bg-gradient-to-br from-amber-950/40 via-zinc-950 to-zinc-950'
                  : 'border-purple-500/40 bg-gradient-to-br from-purple-950/30 via-zinc-950 to-zinc-950'
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                        almanacResult.isHuangDao
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      }`}>
                        {almanacResult.tianShenType}
                      </span>
                      <span className="text-xs text-zinc-400">·</span>
                      <span className="text-xs font-bold text-amber-200">
                        Thần Sát: {almanacResult.tianShen} ({almanacResult.tianShenLuck})
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-zinc-100">
                      {almanacResult.solarDayOfWeek}, Ngày {almanacResult.solarDate}
                    </div>
                    <div className="text-sm font-semibold text-amber-300/90 mt-0.5">
                      {almanacResult.lunarDateStr} · Tiết Khí: {almanacResult.jieQi}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800 text-center">
                    <div>
                      <div className="text-[10px] text-zinc-400 font-semibold">Năm Can Chi</div>
                      <div className="text-xs font-bold text-amber-300">{almanacResult.ganZhiYear}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-400 font-semibold">Tháng Can Chi</div>
                      <div className="text-xs font-bold text-amber-300">{almanacResult.ganZhiMonth}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-400 font-semibold">Ngày Can Chi</div>
                      <div className="text-xs font-bold text-amber-400">{almanacResult.ganZhiDay}</div>
                    </div>
                  </div>
                </div>

                {/* Nạp Âm & Nhị Thập Bát Tú */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                      <span>🌟</span> NHỊ THẬP BÁT TÚ (28 VÌ SAO)
                    </div>
                    <div className="text-zinc-200 font-semibold">
                      Trực tinh: <strong className="text-amber-400">{almanacResult.xiuName}</strong> ({almanacResult.xiuLuck})
                    </div>
                    {almanacResult.xiuPoem && (
                      <div className="text-[11px] text-zinc-400 italic line-clamp-2">
                        "{almanacResult.xiuPoem}"
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                    <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                      <span>🌊</span> NẠP ÂM & XUNG SÁT TRONG NGÀY
                    </div>
                    <div className="text-zinc-200">
                      Nạp âm ngày: <strong className="text-amber-300 font-bold">{almanacResult.naYinDay}</strong>
                    </div>
                    <div className="text-zinc-400 text-[11px]">
                      Tuổi trực xung: <span className="text-rose-400 font-semibold">{almanacResult.chongZhi}</span> · {almanacResult.shaDirection}
                    </div>
                  </div>
                </div>
              </div>

              {/* Banner 2: Tương hợp với bản mệnh của người dùng */}
              {almanacResult.userCompatibility && (
                <div className={`card-glass p-5 rounded-2xl border shadow-xl ${
                  almanacResult.userCompatibility.relationType === 'luc_hop' || almanacResult.userCompatibility.relationType === 'tam_hop'
                    ? 'border-emerald-500/40 bg-emerald-950/15'
                    : almanacResult.userCompatibility.relationType === 'luc_xung'
                    ? 'border-rose-500/50 bg-rose-950/20'
                    : 'border-amber-500/30 bg-zinc-900/50'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                      <span>👤</span>
                      <span>ĐỐI CHIẾU BẢN MỆNH: {almanacResult.userCompatibility.userName} (Tuổi {almanacResult.userCompatibility.userYearZhi})</span>
                    </div>
                    <div className={`px-2.5 py-1 rounded-lg text-xs font-black ${
                      almanacResult.userCompatibility.score >= 85
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : almanacResult.userCompatibility.score <= 50
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      Hợp Mệnh: {almanacResult.userCompatibility.score}/100
                    </div>
                  </div>
                  <div className="text-sm font-black text-amber-200 mb-1">
                    {almanacResult.userCompatibility.title}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {almanacResult.userCompatibility.description}
                  </p>
                </div>
              )}

              {/* Banner 3: Việc Nên Làm (Nghi) & Việc Kiêng Cữ (Kỵ) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cột Việc Nên Làm */}
                <div className="card-glass p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 shadow-lg space-y-3">
                  <div className="flex items-center gap-2 text-sm font-black text-emerald-400 border-b border-emerald-500/20 pb-2">
                    <span>✅</span>
                    <span>VIỆC NÊN LÀM (NGHI · 宜)</span>
                    <span className="text-[11px] text-emerald-500/80 font-normal ml-auto">({almanacResult.yiList.length} việc cát lợi)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {almanacResult.yiList.slice(0, 12).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 p-2 rounded-lg bg-zinc-900/60 border border-emerald-500/20 text-zinc-200 font-medium">
                        <span className="text-emerald-400 text-xs">◆</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cột Việc Kiêng Cữ */}
                <div className="card-glass p-5 rounded-2xl border border-rose-500/30 bg-rose-950/10 shadow-lg space-y-3">
                  <div className="flex items-center gap-2 text-sm font-black text-rose-400 border-b border-rose-500/20 pb-2">
                    <span>⛔</span>
                    <span>VIỆC NÊN KIÊNG CỮ (KỴ · 忌)</span>
                    <span className="text-[11px] text-rose-500/80 font-normal ml-auto">({almanacResult.jiList.length} việc nên tránh)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {almanacResult.jiList.slice(0, 12).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 p-2 rounded-lg bg-zinc-900/60 border border-rose-500/20 text-zinc-300 font-medium">
                        <span className="text-rose-400 text-xs">✕</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Banner 4: 12 Khung Giờ Hoàng Đạo trong ngày */}
              <div className="card-glass p-5 rounded-2xl border border-amber-500/30 bg-zinc-950/70 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                    <span>⏰</span>
                    <span>12 KHUNG GIỜ HOÀNG ĐẠO TRONG NGÀY</span>
                  </div>
                  <div className="text-xs text-zinc-400">
                    Chọn giờ Hoàng Đạo để tiến hành các công việc quan trọng
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                  {almanacResult.hourlyList.map((h, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        h.isHuangDao
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <div className="text-xs font-bold text-zinc-100">{h.hourName}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">{h.timeRange}</div>
                      <div className="text-[10px] text-amber-300/80 mt-0.5">{h.tianShen}</div>
                      <div className="mt-1">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black ${
                          h.isHuangDao
                            ? 'bg-amber-500/25 text-amber-300 border border-amber-500/30'
                            : 'bg-zinc-800 text-zinc-500'
                        }`}>
                          {h.isHuangDao ? 'Hoàng Đạo (Cát)' : 'Hắc Đạo'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Banner 5: Lời răn Bành Tổ Bách Kỵ */}
              <div className="card-glass p-4 rounded-xl border border-amber-500/20 bg-zinc-900/40 text-xs text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">📜 BÀNH TỔ BÁCH KỴ:</span>
                  <span>{almanacResult.pengZuGan} · {almanacResult.pengZuZhi}</span>
                </div>
                <div className="text-[11px] text-zinc-500">
                  Trích từ Lịch Thư phong thủy cổ truyền phương Đông
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: TỬ BÌNH BÁT TỰ */}
        {/* ============================================================== */}
        {activeTab === 'bazi' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            {/* Input Form */}
            <div className="card-glass p-5 rounded-2xl border border-amber-500/30 shadow-xl bg-zinc-950/70">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-300 mb-3">
                <span>⚙️</span> THỜI ĐIỂM XUẤT SINH (DƯƠNG LỊCH)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Năm sinh</label>
                  <input
                    type="number"
                    value={baziYear}
                    onChange={(e) => setBaziYear(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-sm text-zinc-100 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Tháng sinh</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={baziMonth}
                    onChange={(e) => setBaziMonth(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-sm text-zinc-100 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Ngày sinh</label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={baziDay}
                    onChange={(e) => setBaziDay(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-sm text-zinc-100 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Giờ sinh (24h)</label>
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={baziHour}
                    onChange={(e) => setBaziHour(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-sm text-zinc-100 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Phút sinh</label>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={baziMinute}
                    onChange={(e) => setBaziMinute(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-sm text-zinc-100 font-bold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bảng 4 Trụ Tứ Trụ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: 'TRỤ NĂM (TỔ TIÊN)', p: baziData.yearPillar },
                { name: 'TRỤ THÁNG (CHA MẸ)', p: baziData.monthPillar },
                { name: 'TRỤ NGÀY (NHẬT CHỦ)', p: baziData.dayPillar },
                { name: 'TRỤ GIỜ (CON CÁI)', p: baziData.timePillar },
              ].map((item, idx) => (
                <div key={idx} className="card-glass p-4 rounded-xl border border-amber-500/20 text-center space-y-2 bg-zinc-900/50">
                  <div className="text-[10px] font-mono tracking-widest text-zinc-400">{item.name}</div>
                  
                  {/* Thập thần Thiên Can */}
                  <div className="text-xs font-bold text-amber-300">
                    {item.p.shiShenGan}
                  </div>

                  {/* Can Chi chữ to */}
                  <div className="text-xl sm:text-2xl font-black text-amber-100 tracking-wider">
                    {item.p.combinedVi}
                  </div>

                  {/* Địa Chi Tàng Can */}
                  <div className="text-[11px] text-zinc-400">
                    Tàng: <span className="text-zinc-200">{item.p.hideGanVi.join(', ')}</span>
                  </div>

                  {/* Nạp Âm */}
                  <div className="text-[10px] text-amber-400/90 bg-amber-500/10 rounded px-2 py-0.5">
                    {item.p.naYin}
                  </div>

                  {/* Trường Sinh */}
                  <div className="text-[10px] text-zinc-500">
                    Địa thế: {item.p.diShi}
                  </div>
                </div>
              ))}
            </div>

            {/* Luận giải Nhật Chủ & Ngũ Hành */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card-glass p-5 rounded-xl border border-amber-500/20 space-y-3 bg-zinc-900/40">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                  <span>👑</span> NHẬT CHỦ BẢN THÂN: {baziData.dayMaster.vi} ({baziData.dayMaster.nature} {baziData.dayMaster.element})
                </div>
                <div className="text-xs text-zinc-300 leading-relaxed space-y-2">
                  <p><strong className="text-amber-200">Độ vượng nhược:</strong> {baziData.dayMaster.strength}</p>
                  <p><strong className="text-amber-200">Đặc tính bản mệnh:</strong> {baziData.dayMaster.strengthDesc}</p>
                </div>
              </div>

              <div className="card-glass p-5 rounded-xl border border-amber-500/20 space-y-3 bg-zinc-900/40">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                  <span>⚖️</span> TỶ LỆ NGŨ HÀNH BẢN MỆNH
                </div>
                <div className="space-y-2 pt-1">
                  {[
                    { el: 'Kim (金)', count: baziData.elementsCount.Kim, color: 'bg-zinc-300 text-zinc-950' },
                    { el: 'Mộc (木)', count: baziData.elementsCount.Moc, color: 'bg-emerald-500 text-zinc-950' },
                    { el: 'Thủy (水)', count: baziData.elementsCount.Thuy, color: 'bg-cyan-500 text-zinc-950' },
                    { el: 'Hỏa (火)', count: baziData.elementsCount.Hoa, color: 'bg-rose-500 text-white' },
                    { el: 'Thổ (土)', count: baziData.elementsCount.Tho, color: 'bg-amber-500 text-zinc-950' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <span className="w-16 font-semibold text-zinc-300">{row.el}</span>
                      <div className="flex-1 bg-zinc-800 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full ${row.color} rounded-full transition-all duration-500`}
                          style={{ width: `${Math.min(100, row.count * 25)}%` }}
                        />
                      </div>
                      <span className="w-8 text-right font-mono font-bold text-zinc-200">{row.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: BÀI TAROT (22 ẨN CHÍNH) */}
        {/* ============================================================== */}
        {activeTab === 'tarot' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            <div className="card-glass p-6 rounded-2xl border border-amber-500/30 shadow-2xl bg-zinc-950/80 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-amber-300">
                  <span>🃏</span> CHIÊM TINH TAROT · 22 ĐẠI BÍ MẬT ẨN CHÍNH (MAJOR ARCANA)
                </div>
                <div className="text-xs text-zinc-400">
                  Chuẩn quy cách Rider-Waite-Smith quốc tế
                </div>
              </div>

              {/* Chọn phương thức trải bài */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 block">
                  Chọn Phương Thức Trải Bài:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { type: 'three_cards', label: '3 Lá: Quá Khứ - Hiện Tại - Tương Lai', desc: 'Nhìn thấu dòng chảy vận mệnh' },
                    { type: 'single', label: '1 Lá: Vấn Đáp Nhanh & Chỉ Dẫn', desc: 'Thông điệp ngày mới / Có-Không' },
                    { type: 'love', label: '3 Lá: Tình Duyên & Hòa Hợp', desc: 'Bạn - Đối phương - Tương lai' },
                  ].map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setTarotType(item.type as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        tarotType === item.type
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Câu hỏi */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-zinc-300 block">
                  Câu hỏi / Vấn đề bạn muốn vũ trụ hồi đáp:
                </label>
                <input
                  type="text"
                  value={tarotQuestion}
                  onChange={(e) => setTarotQuestion(e.target.value)}
                  placeholder="Nhập câu hỏi hoặc phương diện bạn muốn vũ trụ hồi đáp (hoặc để trống để nhận thông điệp tổng quan)..."
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-zinc-100 font-semibold focus:outline-none"
                />
              </div>

              {/* Nút bấm rút bài */}
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleDrawTarot}
                  disabled={isTarotDrawing}
                  className="px-8 py-3 rounded-xl font-black text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>{isTarotDrawing ? '🌀' : '🃏'}</span>
                  <span>{isTarotDrawing ? 'ĐANG XÀO VÀ RÚT BÀI...' : 'XÀO BÀI & RÚT BÀI TAROT'}</span>
                </button>
              </div>
            </div>

            {/* KẾT QUẢ TRẢI BÀI TAROT */}
            {tarotResult && (
              <div className="space-y-6">
                {/* Banner Tổng Hợp Lời Khuyên Vũ Trụ */}
                <div className="card-glass p-5 rounded-2xl border-2 border-amber-500/50 bg-gradient-to-r from-zinc-950 via-amber-950/30 to-zinc-950 shadow-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span>✨</span> THÔNG ĐIỆP TỔNG HÒA VŨ TRỤ ({tarotResult.spreadTitle})
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">{tarotResult.timestamp}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-serif">
                    {tarotResult.overallSynthesis}
                  </p>
                </div>

                {/* Grid hiển thị các lá bài */}
                <div className={`grid grid-cols-1 ${tarotResult.cards.length === 1 ? 'max-w-md mx-auto' : 'sm:grid-cols-3'} gap-4`}>
                  {tarotResult.cards.map((c, i) => (
                    <VisualTarotCard key={i} drawnCard={c} index={i} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: KINH DỊCH (64 QUẺ) */}
        {/* ============================================================== */}
        {activeTab === 'iching' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            <div className="card-glass p-6 rounded-2xl border border-amber-500/30 text-center space-y-4 bg-zinc-950/70">
              <div className="text-sm font-bold text-amber-300">
                CHU DỊCH DỰ ĐOÁN HỌC · GIEO QUẺ BẰNG ĐỒNG TIỀN HOA CÚC
              </div>
              <p className="text-xs text-zinc-400 max-w-lg mx-auto leading-relaxed">
                Giữ tâm an tịnh, nghĩ về điều trăn trở nhất của bạn lúc này. 
                Gieo 6 lần đồng xu theo cổ pháp Tiền Bặc Thiệp Dịch để lập Quẻ Chủ và Quẻ Biến.
              </p>

              <button
                type="button"
                onClick={handleCastCoins}
                disabled={isCasting}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all"
              >
                {isCasting ? 'Đang tung đồng xu...' : '🪙 Gieo Quẻ Đồng Xu'}
              </button>
            </div>

            {divination && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quẻ Chủ */}
                <div className="card-glass p-6 rounded-2xl border border-amber-500/30 space-y-4 bg-zinc-900/60">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <span className="text-xs font-mono font-bold text-amber-400">QUẺ CHỦ (GỐC)</span>
                    <span className="text-xs text-zinc-400 font-bold">{divination.originalHexagram.chineseName}</span>
                  </div>

                  <div className="text-xl sm:text-2xl font-black text-amber-200">
                    {divination.originalHexagram.number}. {divination.originalHexagram.name}
                  </div>

                  {/* Vẽ 6 hào */}
                  <div className="space-y-1.5 py-2 max-w-[200px] mx-auto">
                    {[...divination.tosses].reverse().map((toss, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2">
                        <div className="flex-1 flex gap-1 items-center justify-center">
                          {toss.originalBit === '1' ? (
                            <div className="h-2.5 w-full bg-amber-400 rounded-sm" />
                          ) : (
                            <>
                              <div className="h-2.5 w-1/2 bg-zinc-400 rounded-sm" />
                              <div className="w-3" />
                              <div className="h-2.5 w-1/2 bg-zinc-400 rounded-sm" />
                            </>
                          )}
                        </div>
                        {toss.isMoving && (
                          <span className="text-[10px] text-rose-400 font-bold">● Động</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-zinc-800">
                    <p><strong className="text-amber-200">Thoán Từ:</strong> {divination.originalHexagram.thuanTu}</p>
                    <p><strong className="text-amber-200">Tượng Truyện:</strong> {divination.originalHexagram.tuongTruyen}</p>
                    <p><strong className="text-amber-200">Tóm Lược:</strong> {divination.originalHexagram.summary}</p>
                    <p><strong className="text-amber-200">Lời Khuyên:</strong> {divination.originalHexagram.advice}</p>
                  </div>
                </div>

                {/* Quẻ Biến (nếu có hào động) */}
                {divination.movingLines.length > 0 ? (
                  <div className="card-glass p-6 rounded-2xl border border-emerald-500/30 space-y-4 bg-zinc-900/60">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-xs font-mono font-bold text-emerald-400">QUẺ BIẾN (TƯƠNG LAI)</span>
                      <span className="text-xs text-zinc-400 font-bold">{divination.changedHexagram.chineseName}</span>
                    </div>

                    <div className="text-xl sm:text-2xl font-black text-emerald-200">
                      {divination.changedHexagram.number}. {divination.changedHexagram.name}
                    </div>

                    {/* Vẽ 6 hào quẻ biến */}
                    <div className="space-y-1.5 py-2 max-w-[200px] mx-auto">
                      {[...divination.tosses].reverse().map((toss, idx) => {
                        const isYang = toss.changedBit === '1';
                        return (
                          <div key={idx} className="flex items-center justify-between gap-2">
                            <div className="flex-1 flex gap-1 items-center justify-center">
                              {isYang ? (
                                <div className="h-2.5 w-full bg-emerald-400 rounded-sm" />
                              ) : (
                                <>
                                  <div className="h-2.5 w-1/2 bg-zinc-400 rounded-sm" />
                                  <div className="w-3" />
                                  <div className="h-2.5 w-1/2 bg-zinc-400 rounded-sm" />
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-zinc-800">
                      <p><strong className="text-emerald-200">Thoán Từ:</strong> {divination.changedHexagram.thuanTu}</p>
                      <p><strong className="text-emerald-200">Tượng Truyện:</strong> {divination.changedHexagram.tuongTruyen}</p>
                      <p><strong className="text-emerald-200">Tóm Lược:</strong> {divination.changedHexagram.summary}</p>
                      <p><strong className="text-emerald-200">Lời Khuyên:</strong> {divination.changedHexagram.advice}</p>
                    </div>
                  </div>
                ) : (
                  <div className="card-glass p-6 rounded-2xl border border-zinc-800 flex items-center justify-center text-center text-zinc-500 text-xs">
                    Quẻ Tĩnh không có hào động. Việc diễn tiến theo đúng nguyên lý của Quẻ Chủ, không có đột biến.
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: THẦN SỐ HỌC & CUNG HOÀNG ĐẠO */}
        {/* ============================================================== */}
        {activeTab === 'numerology' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            {/* Form nhập Họ tên & Ngày sinh */}
            <div className="card-glass p-5 rounded-2xl border border-amber-500/30 shadow-xl bg-zinc-950/70">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-300 mb-3">
                <span>👤</span> THÔNG TIN ĐƯƠNG SỐ
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-1">
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Họ và Tên</label>
                  <input
                    type="text"
                    value={numName}
                    onChange={(e) => setNumName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-sm text-zinc-100 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Ngày sinh</label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={numDay}
                    onChange={(e) => setNumDay(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-sm text-zinc-100 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Tháng sinh</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={numMonth}
                    onChange={(e) => setNumMonth(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-sm text-zinc-100 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Năm sinh</label>
                  <input
                    type="number"
                    value={numYear}
                    onChange={(e) => setNumYear(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-sm text-zinc-100 font-bold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Các con số cốt lõi */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="card-glass p-5 rounded-2xl border border-amber-500/30 text-center bg-zinc-900/60 space-y-1">
                <div className="text-[10px] text-zinc-400 font-bold tracking-widest">SỐ CHỦ ĐẠO (ĐƯỜNG ĐỜI)</div>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 py-1">{lifePath.number}</div>
                <div className="text-xs font-semibold text-amber-100">{lifePath.title}</div>
              </div>

              <div className="card-glass p-5 rounded-2xl border border-amber-500/30 text-center bg-zinc-900/60 space-y-1">
                <div className="text-[10px] text-zinc-400 font-bold tracking-widest">SỐ SỨ MỆNH (TÊN GỌI)</div>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 py-1">{destiny.number}</div>
                <div className="text-xs font-semibold text-amber-100">{destiny.meaning}</div>
              </div>

              <div className="card-glass p-5 rounded-2xl border border-amber-500/30 text-center bg-zinc-900/60 space-y-1">
                <div className="text-[10px] text-zinc-400 font-bold tracking-widest">NĂM CÁ NHÂN {new Date().getFullYear()}</div>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 py-1">{personalYear.yearNum}</div>
                <div className="text-xs font-semibold text-amber-100">{personalYear.theme}</div>
              </div>

              <div className="card-glass p-5 rounded-2xl border border-amber-500/30 text-center bg-zinc-900/60 space-y-1">
                <div className="text-[10px] text-zinc-400 font-bold tracking-widest">12 CUNG HOÀNG ĐẠO</div>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 py-1">{zodiac.symbol}</div>
                <div className="text-xs font-semibold text-amber-100">{zodiac.name} ({zodiac.element})</div>
              </div>
            </div>

            {/* Chi tiết luận giải */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card-glass p-5 rounded-xl border border-amber-500/20 space-y-3 bg-zinc-900/40">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                  <span>📜</span> BẢN ĐỒ SỐ MỆNH ĐƯỜNG ĐỜI {lifePath.number}
                </div>
                <div className="text-xs text-zinc-300 leading-relaxed space-y-2">
                  <p><strong className="text-amber-200">Mô tả tổng quát:</strong> {lifePath.description}</p>
                  <p><strong className="text-amber-200">Điểm mạnh bẩm sinh:</strong> {lifePath.strengths.join(', ')}</p>
                  <p><strong className="text-amber-200">Thách thức cần vượt qua:</strong> {lifePath.weaknesses.join(', ')}</p>
                  <p><strong className="text-amber-200">Sự nghiệp phù hợp:</strong> {lifePath.careerPath.join(', ')}</p>
                </div>
              </div>

              <div className="card-glass p-5 rounded-xl border border-amber-500/20 space-y-3 bg-zinc-900/40">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                  <span>✨</span> CHIÊM TINH HOÀNG ĐẠO: {zodiac.name} ({zodiac.dates})
                </div>
                <div className="text-xs text-zinc-300 leading-relaxed space-y-2">
                  <p><strong className="text-amber-200">Nguyên tố & Sao chiếu:</strong> {zodiac.element} · {zodiac.rulerPlanet}</p>
                  <p><strong className="text-amber-200">Tính cách cốt lõi:</strong> {zodiac.strengths}</p>
                  <p><strong className="text-amber-200">Lời khuyên phát triển:</strong> {zodiac.advice}</p>
                  <p><strong className="text-amber-200">Chỉ dẫn năm cá nhân:</strong> {personalYear.advice}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
