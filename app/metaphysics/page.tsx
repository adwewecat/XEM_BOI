'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateBazi, BaziResult } from '@/lib/metaphysics/bazi';
import { castIChingCoins, DivinationResult, getHexagramByBinary } from '@/lib/metaphysics/iching';
import { castDongTam, DongTamResult } from '@/lib/metaphysics/dongtam';
import {
  calculateLifePath,
  calculateDestinyNumber,
  calculatePersonalYear,
  getZodiacSign,
  LifePathDetail,
  ZodiacSignDetail,
} from '@/lib/metaphysics/numerology';

export default function MetaphysicsPage() {
  const [activeTab, setActiveTab] = useState<'bazi' | 'dongtam' | 'iching' | 'numerology'>('dongtam');

  // --- STATE CHO BÓI HỮU DUYÊN (GIỜ ĐỘNG TÂM) ---
  const [dongTamQuestion, setDongTamQuestion] = useState(
    'Cháu hỏi cho ông nội ông nội con nằm viện nửa tháng nay do bị viêm phổi có bị tim nữa ạ. Nhưng nửa tháng nay không thấy khá lên, xin các thầy cho con hỏi ông nội con có thể khoẻ lên được không ạ vượt qua cơn bệnh này được không ạ?'
  );
  const [dongTamDate, setDongTamDate] = useState('2026-11-09');
  const [dongTamTime, setDongTamTime] = useState('08:44');
  const [dongTamResult, setDongTamResult] = useState<DongTamResult>(() =>
    castDongTam(
      'Cháu hỏi cho ông nội ông nội con nằm viện nửa tháng nay do bị viêm phổi có bị tim nữa ạ. Nhưng nửa tháng nay không thấy khá lên, xin các thầy cho con hỏi ông nội con có thể khoẻ lên được không ạ vượt qua cơn bệnh này được không ạ?',
      '2026-11-09',
      '08:44'
    )
  );
  const [isDongTamCasting, setIsDongTamCasting] = useState(false);

  const handleCastDongTam = () => {
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

  // --- STATE CHO BÁT TỰ TỨ TRỤ ---
  const [baziYear, setBaziYear] = useState(1995);
  const [baziMonth, setBaziMonth] = useState(8);
  const [baziDay, setBaziDay] = useState(23);
  const [baziHour, setBaziHour] = useState(12);
  const [baziMinute, setBaziMinute] = useState(0);

  const baziData: BaziResult = useMemo(() => {
    return calculateBazi(baziYear, baziMonth, baziDay, baziHour, baziMinute);
  }, [baziYear, baziMonth, baziDay, baziHour, baziMinute]);

  // --- STATE CHO KINH DỊCH ---
  const [divination, setDivination] = useState<DivinationResult | null>(null);
  const [isCasting, setIsCasting] = useState(false);

  const handleCastCoins = () => {
    setIsCasting(true);
    setTimeout(() => {
      setDivination(castIChingCoins());
      setIsCasting(false);
    }, 600);
  };

  // --- STATE CHO THẦN SỐ HỌC & HOÀNG ĐẠO ---
  const [numName, setNumName] = useState('Nguyễn Văn An');
  const [numYear, setNumYear] = useState(1995);
  const [numMonth, setNumMonth] = useState(8);
  const [numDay, setNumDay] = useState(23);

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
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-3">
            <span>🧭</span> KHO TÀNG HUYỀN HỌC ĐÔNG TÂY TOÀN THƯ
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-amber-100 tracking-tight mb-3">
            KIM CỔ ĐÔNG TÂY · BÁCH GIA THUẬT SỐ
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Hợp nhất tinh hoa Mệnh Lý Phương Đông (<strong className="text-amber-300">Tử Bình Bát Tự, Chu Dịch 64 Quẻ</strong>) 
            và Huyền Học Phương Tây (<strong className="text-amber-300">Thần Số Học Pitago, 12 Cung Hoàng Đạo</strong>).
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-xl bg-zinc-900/80 border border-amber-500/30 backdrop-blur-md shadow-xl gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('bazi')}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'bazi'
                  ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30 font-black'
                  : 'text-zinc-400 hover:text-amber-200 hover:bg-zinc-800/60'
              }`}
            >
              <span>🎴</span>
              <span>Tử Bình Bát Tự (Tứ Trụ)</span>
            </button>

            <button
              onClick={() => setActiveTab('dongtam')}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'dongtam'
                  ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30 font-black'
                  : 'text-zinc-400 hover:text-amber-200 hover:bg-zinc-800/60'
              }`}
            >
              <span>🔮</span>
              <span>Bói Hữu Duyên (Giờ Động Tâm)</span>
            </button>

            <button
              onClick={() => setActiveTab('iching')}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
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
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
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

        {/* TAB 1: TỬ BÌNH BÁT TỰ */}
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
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Giờ sinh (0-23)</label>
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
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Phút</label>
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

            {/* BẢNG TỨ TRỤ 4 CỘT */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {[baziData.yearPillar, baziData.monthPillar, baziData.dayPillar, baziData.timePillar].map((p, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border relative overflow-hidden transition-all duration-300 ${
                    idx === 2
                      ? 'bg-amber-950/30 border-amber-400/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/40'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:border-amber-500/40'
                  }`}
                >
                  {idx === 2 && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-500 text-zinc-950">
                      NHẬT CHỦ
                    </div>
                  )}
                  <div className="text-xs font-bold text-amber-300/80 mb-2">{p.title}</div>

                  {/* Can Chi to rõ */}
                  <div className="text-center py-3 bg-zinc-950/60 rounded-lg border border-zinc-800/60 mb-3">
                    <div className="text-2xl font-black text-amber-200 tracking-wide mb-1">
                      {p.combinedVi}
                    </div>
                    <div className="text-xs font-mono text-zinc-400">
                      {p.combined}
                    </div>
                  </div>

                  {/* Chi tiết từng trụ */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-zinc-300">
                      <span className="text-zinc-500">Thập Thần:</span>
                      <span className="font-bold text-sky-300">{p.shiShenGan}</span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-300">
                      <span className="text-zinc-500">Nạp Âm:</span>
                      <span className="font-semibold text-amber-300/90 text-[11px] truncate max-w-[140px]" title={p.naYin}>
                        {p.naYin}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-300">
                      <span className="text-zinc-500">Địa Thế:</span>
                      <span className="font-medium text-emerald-400 text-[11px] truncate max-w-[140px]" title={p.diShi}>
                        {p.diShi}
                      </span>
                    </div>
                    {p.xunKong && (
                      <div className="flex justify-between items-center text-zinc-300">
                        <span className="text-zinc-500">Tuần Không:</span>
                        <span className="font-mono text-rose-300">{p.xunKong}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Phân Tích Ngũ Hành & Nhật Chủ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Ngũ Hành Tỷ Lệ */}
              <div className="card-glass p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 space-y-4">
                <div className="text-sm font-black text-amber-200 flex items-center gap-2">
                  <span>⚖️</span> TỶ LỆ NGŨ HÀNH TỨ TRỤ
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: 'Kim', count: baziData.elementsCount.Kim, color: 'bg-amber-300', text: 'text-amber-300' },
                    { label: 'Mộc', count: baziData.elementsCount.Moc, color: 'bg-emerald-400', text: 'text-emerald-400' },
                    { label: 'Thủy', count: baziData.elementsCount.Thuy, color: 'bg-sky-400', text: 'text-sky-400' },
                    { label: 'Hỏa', count: baziData.elementsCount.Hoa, color: 'bg-rose-400', text: 'text-rose-400' },
                    { label: 'Thổ', count: baziData.elementsCount.Tho, color: 'bg-yellow-600', text: 'text-yellow-500' },
                  ].map((e) => (
                    <div key={e.label} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className={e.text}>{e.label}</span>
                        <span className="font-mono text-zinc-300">{e.count} chữ ({(e.count / 8 * 100).toFixed(0)}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className={`h-full ${e.color} transition-all duration-500`}
                          style={{ width: `${(e.count / 8) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-zinc-800/80 text-xs text-zinc-400 space-y-1">
                  <div>Vượng nhất: <strong className="text-amber-300">{baziData.dominantElement}</strong></div>
                  <div>Khuyết thiếu: <strong className="text-rose-300">{baziData.lackingElement}</strong></div>
                </div>
              </div>

              {/* Luận Giải Nhật Chủ & Mệnh Cục */}
              <div className="lg:col-span-2 card-glass p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-black text-amber-200 flex items-center gap-2">
                    <span>📜</span> LUẬN ĐOÁN MỆNH CỤC TỬ BÌNH
                  </div>
                  <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    baziData.dayMaster.strength === 'Thân Vượng'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  }`}>
                    {baziData.dayMaster.strength}
                  </div>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
                  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
                    <strong className="text-amber-300 block mb-1">🌟 Tổng quan Bản mệnh:</strong>
                    {baziData.insightOverview}
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
                    <strong className="text-sky-300 block mb-1">💼 Sự nghiệp & Tài chính:</strong>
                    {baziData.careerFinance}
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
                    <strong className="text-rose-300 block mb-1">❤️ Tình duyên & Hôn nhân:</strong>
                    {baziData.loveMarriage}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                    <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-center">
                      <span className="text-zinc-500 block">Thai Nguyên</span>
                      <strong className="text-amber-200">{baziData.taiYuan.name}</strong>
                      <span className="text-zinc-400 block text-[10px]">{baziData.taiYuan.naYin}</span>
                    </div>
                    <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-center">
                      <span className="text-zinc-500 block">Mệnh Cung</span>
                      <strong className="text-amber-200">{baziData.mingGong.name}</strong>
                      <span className="text-zinc-400 block text-[10px]">{baziData.mingGong.naYin}</span>
                    </div>
                    <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-center">
                      <span className="text-zinc-500 block">Thân Cung</span>
                      <strong className="text-amber-200">{baziData.shenGong.name}</strong>
                      <span className="text-zinc-400 block text-[10px]">{baziData.shenGong.naYin}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB BÓI HỮU DUYÊN (GIỜ ĐỘNG TÂM) */}
        {activeTab === 'dongtam' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            {/* Form Nhập Câu Hỏi & Ngày Giờ Động Tâm */}
            <div className="card-glass p-5 rounded-2xl border border-amber-500/40 bg-zinc-950/80 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2 text-sm font-black text-amber-300">
                  <span>🔮</span> BÓI HỮU DUYÊN · MAI HOA & LỤC HÀO CHIÊM ĐOÁN THEO GIỜ ĐỘNG TÂM
                </div>
                <button
                  type="button"
                  onClick={handleSetCurrentTime}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/20 transition-all flex items-center gap-1.5"
                >
                  <span>⏱️</span> Lấy Giờ Hiện Tại
                </button>
              </div>

              {/* Textarea câu hỏi */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <span>✍️</span> Vấn đề cần hỏi / Sự việc trăn trở trong tâm:
                </label>
                <textarea
                  rows={3}
                  value={dongTamQuestion}
                  onChange={(e) => setDongTamQuestion(e.target.value)}
                  placeholder="Ví dụ: Cháu hỏi cho ông nội nằm viện do viêm phổi, có tim nữa... Liệu có qua khỏi không ạ?"
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-xl p-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Gợi ý câu hỏi mẫu */}
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="text-zinc-500 font-semibold">Gợi ý mẫu:</span>
                {[
                  {
                    label: '🫁 Hỏi bệnh ông nội (viêm phổi & tim)',
                    text: 'Cháu hỏi cho ông nội ông nội con nằm viện nửa tháng nay do bị viêm phổi có bị tim nữa ạ. Nhưng nửa tháng nay không thấy khá lên, xin các thầy cho con hỏi ông nội con có thể khoẻ lên được không ạ vượt qua cơn bệnh này được không ạ?',
                    date: '2026-11-09',
                    time: '08:44',
                  },
                  {
                    label: '💼 Hỏi chuyển việc & thăng chức',
                    text: 'Con đang làm việc ở công ty cũ nhưng có lời mời sang công ty mới với mức đãi ngộ tốt hơn. Xin thầy cho biết con đổi việc lúc này có thuận lợi không ạ?',
                    date: '2026-11-09',
                    time: '10:15',
                  },
                  {
                    label: '💰 Hỏi đầu tư kinh doanh',
                    text: 'Tôi chuẩn bị hùn vốn với bạn mở cửa hàng kinh doanh cuối năm nay. Xin hỏi công việc làm ăn buôn bán này có thu được tài lộc không?',
                    date: '2026-11-09',
                    time: '14:30',
                  },
                  {
                    label: '❤️ Hỏi tình duyên kết hôn',
                    text: 'Chúng con yêu nhau đã được 3 năm và đang tính chuyện cưới hỏi vào năm tới. Xin thầy xem giúp tình duyên gia đạo hai bên có hòa hợp lâu dài không ạ?',
                    date: '2026-11-09',
                    time: '20:00',
                  },
                ].map((sample, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDongTamQuestion(sample.text);
                      setDongTamDate(sample.date);
                      setDongTamTime(sample.time);
                    }}
                    className="px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-amber-200 transition-colors"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>

              {/* Ngày giờ động tâm & Nút bấm */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Ngày động tâm</label>
                  <input
                    type="date"
                    value={dongTamDate}
                    onChange={(e) => setDongTamDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-sm text-zinc-100 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Giờ động tâm (Giờ:Phút)</label>
                  <input
                    type="time"
                    value={dongTamTime}
                    onChange={(e) => setDongTamTime(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-sm text-zinc-100 font-bold focus:outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleCastDongTam}
                    disabled={isDongTamCasting}
                    className="w-full py-2.5 rounded-xl font-black text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 shadow-lg shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isDongTamCasting ? '🌀' : '🔮'}</span>
                    <span>{isDongTamCasting ? 'ĐANG REO QUẺ...' : 'THẦY REO QUẺ & PHÁN'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* KẾT QUẢ THẦY PHÁN */}
            {dongTamResult && (
              <div className="space-y-6">
                {/* Khung Lời Phán Của Thầy (Vàng Kim Sang Trọng) */}
                <div className="card-glass p-6 sm:p-8 rounded-2xl border-2 border-amber-500/60 bg-gradient-to-br from-amber-950/40 via-zinc-950/90 to-zinc-950 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between border-b border-amber-500/30 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⛩️</span>
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase block">LỜI THẦY PHÁN TRỰC TIẾP</span>
                        <h3 className="text-base sm:text-lg font-black text-amber-200">
                          {dongTamResult.hexagram.originalName} Động Hào {dongTamResult.hexagram.movingLine} Biến {dongTamResult.hexagram.changedName}
                        </h3>
                      </div>
                    </div>
                    <div className="text-right text-[11px] font-mono text-zinc-400">
                      <div>{dongTamResult.datetimeInput.solarStr}</div>
                      <div className="text-amber-300 font-bold">{dongTamResult.datetimeInput.lunarStr}</div>
                    </div>
                  </div>

                  {/* Lời phán văn phong cổ truyền to rõ */}
                  <div className="p-4 sm:p-5 rounded-xl bg-zinc-900/90 border border-amber-500/30 text-amber-100 text-sm sm:text-base leading-relaxed font-serif whitespace-pre-line shadow-inner">
                    {dongTamResult.thayPhan}
                  </div>

                  {/* Tóm tắt then chốt */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
                    <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                      <span className="text-zinc-500 block text-[11px]">Dụng Thần Xác Định:</span>
                      <strong className="text-sky-300 block text-sm mt-0.5">{dongTamResult.dungThan.subject}</strong>
                      <span className="text-zinc-400 text-[11px]">{dongTamResult.dungThan.state}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                      <span className="text-zinc-500 block text-[11px]">Hào Động & Biến Quái:</span>
                      <strong className="text-amber-300 block text-sm mt-0.5">Hào {dongTamResult.hexagram.movingLine} Động</strong>
                      <span className="text-zinc-400 text-[11px]">{dongTamResult.hexagram.originalName} ➔ {dongTamResult.hexagram.changedName}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                      <span className="text-zinc-500 block text-[11px]">Thời Điểm Ứng Kỳ:</span>
                      <strong className="text-rose-300 block text-sm mt-0.5">Ứng Kỳ Then Chốt</strong>
                      <span className="text-zinc-300 text-[11px] leading-tight block">{dongTamResult.ungKy}</span>
                    </div>
                  </div>
                </div>

                {/* BẢNG CHI TIẾT KỸ THUẬT DỊCH LÝ LỤC HÀO */}
                <div className="card-glass p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 space-y-4">
                  <div className="text-sm font-black text-amber-200 flex items-center gap-2">
                    <span>📖</span> CĂN CỨ DỊCH LÝ & PHÂN TÍCH TƯỢNG HÀO
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-zinc-300">
                    <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                      <strong className="text-amber-300 block">1. Can Chi Lịch Pháp & Tuần Không:</strong>
                      <p>
                        Ngày giờ động tâm chuyển hóa thành Tứ Trụ Can Chi: <strong>Năm {dongTamResult.datetimeInput.ganZhiYear}</strong>, 
                        <strong> Tháng {dongTamResult.datetimeInput.ganZhiMonth}</strong>, 
                        <strong> Ngày {dongTamResult.datetimeInput.ganZhiDay}</strong>, 
                        <strong> Giờ {dongTamResult.datetimeInput.ganZhiHour}</strong>.
                      </p>
                      <p>
                        Tuần Không tại ngày động tâm là [<strong>{dongTamResult.datetimeInput.xunKong}</strong>]. 
                        Hào lâm Tuần Không chủ sự việc hư ảo, thiếu lực trợ phù hoặc dấu hiệu hưu tù khó chống đỡ.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                      <strong className="text-sky-300 block">2. Chi Tiết Lục Thân Dụng Thần:</strong>
                      <p>{dongTamResult.dungThan.explanation}</p>
                      {dongTamResult.diseaseAnalysis && (
                        <div className="pt-1 text-rose-300">
                          <strong>Ngũ hành tạng phủ: </strong>
                          {dongTamResult.diseaseAnalysis.details}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 2: KINH DỊCH 64 QUẺ */}
        {activeTab === 'iching' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            {/* Banner Gieo Quẻ */}
            <div className="card-glass p-6 rounded-2xl border border-amber-500/30 bg-zinc-950/80 text-center shadow-xl space-y-4">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                CHIÊM BỐC VĂN VƯƠNG · 3 ĐỒNG XU CỔ THÁI SƠN
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-amber-100">
                TÂM KHỞI NIỆM SỰ VIỆC · GIEO QUẺ TÌM ĐƯỜNG ĐI
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto">
                Trước khi gieo, hãy tĩnh tâm 30 giây suy nghĩ rõ ràng về việc cần hỏi (Công danh, Sự nghiệp, Hôn nhân, Đầu tư).
                Hào sẽ tự động an vị theo thuật ngữ cổ điển.
              </p>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleCastCoins}
                  disabled={isCasting}
                  className="px-6 py-3 rounded-xl font-black text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-zinc-950 shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>{isCasting ? '🌀' : '🪙'}</span>
                  <span>{isCasting ? 'ĐANG GIEO QUẺ...' : 'GIEO QUẺ KINH DỊCH'}</span>
                </button>
              </div>
            </div>

            {/* KẾT QUẢ QUẺ DỊCH */}
            {divination && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quẻ Bản Thể */}
                  <div className="card-glass p-5 rounded-2xl border border-amber-500/40 bg-zinc-950/80 shadow-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">QUẺ GỐC (BẢN QUÁI)</span>
                        <h3 className="text-lg font-black text-amber-200">
                          {divination.originalHexagram.name}
                        </h3>
                        <span className="text-xs text-zinc-400 font-mono">
                          {divination.originalHexagram.chineseName}
                        </span>
                      </div>
                      <div className="px-2.5 py-1 rounded text-xs font-black bg-amber-500/20 border border-amber-500/40 text-amber-300">
                        {divination.originalHexagram.nature}
                      </div>
                    </div>

                    {/* 6 Hào trực quan (từ hào 6 xuống hào 1) */}
                    <div className="space-y-2 py-2 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
                      {[...divination.tosses].reverse().map((toss) => (
                        <div key={toss.tossIndex} className="flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-500 w-16">Hào {toss.tossIndex}:</span>
                          <div className="flex-1 text-center font-bold tracking-widest text-lg">
                            {toss.originalBit === '1' ? (
                              <span className="text-amber-300">━━━━━━━</span>
                            ) : (
                              <span className="text-zinc-400">━━━ ━━━</span>
                            )}
                          </div>
                          <span className={`w-20 text-right text-[11px] font-sans ${toss.isMoving ? 'text-rose-400 font-bold' : 'text-zinc-500'}`}>
                            {toss.isMoving ? '⚡ HÀO ĐỘNG' : 'Tĩnh'}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-zinc-300 space-y-2 leading-relaxed">
                      <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                        <strong className="text-amber-300 block mb-1">📖 Thoán Từ:</strong>
                        {divination.originalHexagram.thuanTu}
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                        <strong className="text-sky-300 block mb-1">🌌 Đại Tượng Truyện:</strong>
                        {divination.originalHexagram.tuongTruyen}
                      </div>
                    </div>
                  </div>

                  {/* Quẻ Biến */}
                  <div className="card-glass p-5 rounded-2xl border border-sky-500/40 bg-zinc-950/80 shadow-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">QUẺ BIẾN (BIẾN QUÁI)</span>
                        <h3 className="text-lg font-black text-sky-200">
                          {divination.changedHexagram.name}
                        </h3>
                        <span className="text-xs text-zinc-400 font-mono">
                          {divination.changedHexagram.chineseName}
                        </span>
                      </div>
                      <div className="px-2.5 py-1 rounded text-xs font-black bg-sky-500/20 border border-sky-500/40 text-sky-300">
                        {divination.changedHexagram.nature}
                      </div>
                    </div>

                    {/* 6 Hào Biến */}
                    <div className="space-y-2 py-2 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80">
                      {[...divination.tosses].reverse().map((toss) => (
                        <div key={toss.tossIndex} className="flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-500 w-16">Hào {toss.tossIndex}:</span>
                          <div className="flex-1 text-center font-bold tracking-widest text-lg">
                            {toss.changedBit === '1' ? (
                              <span className="text-sky-300">━━━━━━━</span>
                            ) : (
                              <span className="text-zinc-400">━━━ ━━━</span>
                            )}
                          </div>
                          <span className="w-20 text-right text-[11px] font-sans text-zinc-500">
                            {toss.changedBit === '1' ? 'Dương' : 'Âm'}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-zinc-300 space-y-2 leading-relaxed">
                      <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                        <strong className="text-sky-300 block mb-1">📖 Thoán Từ Quẻ Biến:</strong>
                        {divination.changedHexagram.thuanTu}
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                        <strong className="text-amber-300 block mb-1">🌟 Hướng Chuyển Hóa:</strong>
                        {divination.movingLines.length > 0 ? (
                          <span>Quẻ mang {divination.movingLines.length} hào động tại vị trí {divination.movingLines.join(', ')}. Đây là điểm mấu chốt then chốt quyết định sự thành bại.</span>
                        ) : (
                          <span>Quẻ thuần tĩnh không có hào động; sự việc giữ nguyên trạng thái hiện tại, chưa nên vội vàng biến đổi.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Luận Giải 4 Phương Diện */}
                <div className="card-glass p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 space-y-4">
                  <div className="text-sm font-black text-amber-200 flex items-center gap-2">
                    <span>💡</span> LUẬN ĐOÁN CHI TIẾT SỰ VIỆC
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                      <strong className="text-amber-300 block mb-1">💼 Sự Nghiệp & Công Danh:</strong>
                      {divination.originalHexagram.career}
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                      <strong className="text-emerald-400 block mb-1">💰 Tài Lộc & Kinh Doanh:</strong>
                      {divination.originalHexagram.wealth}
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                      <strong className="text-rose-300 block mb-1">❤️ Tình Duyên & Gia Đạo:</strong>
                      {divination.originalHexagram.love}
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                      <strong className="text-sky-300 block mb-1">🧘 Lời Khuyên Người Quân Tử:</strong>
                      {divination.originalHexagram.advice}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: THẦN SỐ HỌC & CHIÊM TINH PHƯƠNG TÂY */}
        {activeTab === 'numerology' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
            {/* Input Form */}
            <div className="card-glass p-5 rounded-2xl border border-amber-500/30 bg-zinc-950/70 shadow-xl">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-300 mb-3">
                <span>👤</span> THÔNG TIN CÁ NHÂN (HỌ TÊN & NGÀY SINH DƯƠNG LỊCH)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Họ và tên (có dấu hoặc không)</label>
                  <input
                    type="text"
                    value={numName}
                    onChange={(e) => setNumName(e.target.value)}
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
              </div>
            </div>

            {/* Ba Chỉ Số Then Chốt */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Con Số Chủ Đạo */}
              <div className="card-glass p-5 rounded-2xl border border-amber-500/50 bg-gradient-to-br from-amber-950/30 to-zinc-950/70 text-center space-y-2">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">CON SỐ CHỦ ĐẠO (LIFE PATH)</span>
                <div className="text-5xl font-black text-amber-300 drop-shadow-md">
                  {lifePath.number}
                </div>
                <div className="text-xs font-bold text-amber-200">
                  {lifePath.title}
                </div>
                <div className="text-[11px] text-zinc-400 italic">
                  {lifePath.keyword}
                </div>
              </div>

              {/* Số Sứ Mệnh */}
              <div className="card-glass p-5 rounded-2xl border border-sky-500/40 bg-zinc-950/70 text-center space-y-2">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">SỐ SỨ MỆNH (DESTINY)</span>
                <div className="text-5xl font-black text-sky-300 drop-shadow-md">
                  {destiny.number}
                </div>
                <div className="text-xs font-bold text-sky-200">
                  Khát vọng linh hồn
                </div>
                <div className="text-[11px] text-zinc-300 leading-tight">
                  {destiny.meaning}
                </div>
              </div>

              {/* Năm Cá Nhân */}
              <div className="card-glass p-5 rounded-2xl border border-emerald-500/40 bg-zinc-950/70 text-center space-y-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">NĂM CÁ NHÂN {new Date().getFullYear()}</span>
                <div className="text-5xl font-black text-emerald-300 drop-shadow-md">
                  {personalYear.yearNum}
                </div>
                <div className="text-xs font-bold text-emerald-200">
                  {personalYear.theme}
                </div>
                <div className="text-[11px] text-zinc-300 leading-tight">
                  {personalYear.advice}
                </div>
              </div>
            </div>

            {/* Chi Tiết Con Số Chủ Đạo & 12 Cung Hoàng Đạo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chi Tiết Con Số Chủ Đạo */}
              <div className="card-glass p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 space-y-4">
                <div className="text-sm font-black text-amber-200 flex items-center gap-2">
                  <span>📜</span> BẢN ĐỒ TIỀM NĂNG THẦN SỐ HỌC
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {lifePath.description}
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                    <strong className="text-emerald-400 block mb-1">✨ Điểm mạnh nổi bật:</strong>
                    <ul className="list-disc list-inside space-y-0.5 text-zinc-300">
                      {lifePath.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                    <strong className="text-rose-400 block mb-1">⚠️ Thử thách cần khắc phục:</strong>
                    <ul className="list-disc list-inside space-y-0.5 text-zinc-300">
                      {lifePath.weaknesses.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                    <strong className="text-amber-300 block mb-1">💼 Nghề nghiệp phù hợp:</strong>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {lifePath.careerPath.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                    <strong className="text-sky-300 block mb-1">🌱 Bài học đường đời:</strong>
                    <span className="text-zinc-300">{lifePath.lifeLesson}</span>
                  </div>
                </div>
              </div>

              {/* 12 Cung Hoàng Đạo Phương Tây */}
              <div className="card-glass p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-black text-amber-200 flex items-center gap-2">
                    <span>♈</span> CHIÊM TINH PHƯƠNG TÂY (ZODIAC)
                  </div>
                  <div className="text-2xl">{zodiac.symbol}</div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-amber-200">{zodiac.name} ({zodiac.latinName})</h3>
                    <div className="text-xs text-zinc-400">{zodiac.dates}</div>
                  </div>
                  <div className="text-right text-xs">
                    <span className="font-bold text-amber-300 block">Nguyên tố: {zodiac.element}</span>
                    <span className="text-zinc-400 text-[11px]">{zodiac.modality}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                    <strong className="text-sky-300 block mb-1">🪐 Hành tinh chủ quản:</strong>
                    <span className="text-zinc-300">{zodiac.rulerPlanet}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                    <strong className="text-emerald-400 block mb-1">💪 Điểm mạnh tính cách:</strong>
                    <span className="text-zinc-300">{zodiac.strengths}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                    <strong className="text-rose-400 block mb-1">⚠️ Điểm cần lưu ý:</strong>
                    <span className="text-zinc-300">{zodiac.weaknesses}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                    <strong className="text-amber-300 block mb-1">🌟 Lời khuyên phát triển:</strong>
                    <span className="text-zinc-300">{zodiac.advice}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

