'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SPIRITUAL_INTERVAL_MS,
  SPIRITUAL_DISPLAY_DURATION_MS,
  createSpiritualManifestationDeck,
  type SpiritualManifestation,
} from '@/lib/metaphysics/spiritualManifestations';

// ============================================================================
// BẢNG MÀU THEO ACCENT TÂM LINH
// ============================================================================
const ACCENT_STYLES: Record<
  SpiritualManifestation['accentColor'],
  {
    border: string;
    glow: string;
    badgeBg: string;
    badgeText: string;
    titleGrad: string;
    strokePrimary: string;
    strokeSecondary: string;
    particleBg: string;
  }
> = {
  gold: {
    border: 'border-amber-400/70',
    glow: 'shadow-[0_0_80px_rgba(245,158,11,0.45),0_0_30px_rgba(251,191,36,0.3)]',
    badgeBg: 'bg-amber-500/20 border-amber-400/50',
    badgeText: 'text-amber-200',
    titleGrad: 'from-amber-200 via-yellow-300 to-amber-500',
    strokePrimary: '#fbbf24',
    strokeSecondary: '#fde68a',
    particleBg: 'bg-amber-300',
  },
  crimson: {
    border: 'border-red-500/70',
    glow: 'shadow-[0_0_80px_rgba(239,68,68,0.45),0_0_30px_rgba(245,158,11,0.3)]',
    badgeBg: 'bg-red-500/20 border-red-400/50',
    badgeText: 'text-red-200',
    titleGrad: 'from-amber-200 via-red-300 to-amber-400',
    strokePrimary: '#f87171',
    strokeSecondary: '#fbbf24',
    particleBg: 'bg-red-400',
  },
  cyan: {
    border: 'border-cyan-400/70',
    glow: 'shadow-[0_0_80px_rgba(34,211,238,0.4),0_0_30px_rgba(56,189,248,0.3)]',
    badgeBg: 'bg-cyan-500/20 border-cyan-400/50',
    badgeText: 'text-cyan-200',
    titleGrad: 'from-cyan-200 via-sky-200 to-amber-300',
    strokePrimary: '#22d3ee',
    strokeSecondary: '#fde68a',
    particleBg: 'bg-cyan-300',
  },
  emerald: {
    border: 'border-emerald-400/70',
    glow: 'shadow-[0_0_80px_rgba(52,211,153,0.4),0_0_30px_rgba(251,191,36,0.25)]',
    badgeBg: 'bg-emerald-500/20 border-emerald-400/50',
    badgeText: 'text-emerald-200',
    titleGrad: 'from-emerald-200 via-teal-200 to-amber-300',
    strokePrimary: '#34d399',
    strokeSecondary: '#fbbf24',
    particleBg: 'bg-emerald-300',
  },
  violet: {
    border: 'border-purple-400/70',
    glow: 'shadow-[0_0_80px_rgba(192,132,252,0.45),0_0_30px_rgba(251,191,36,0.25)]',
    badgeBg: 'bg-purple-500/20 border-purple-400/50',
    badgeText: 'text-purple-200',
    titleGrad: 'from-purple-200 via-fuchsia-200 to-amber-300',
    strokePrimary: '#c084fc',
    strokeSecondary: '#fde68a',
    particleBg: 'bg-purple-300',
  },
  amber: {
    border: 'border-amber-500/70',
    glow: 'shadow-[0_0_80px_rgba(217,119,6,0.45),0_0_30px_rgba(251,191,36,0.3)]',
    badgeBg: 'bg-amber-500/20 border-amber-400/50',
    badgeText: 'text-amber-200',
    titleGrad: 'from-amber-100 via-amber-300 to-orange-400',
    strokePrimary: '#f59e0b',
    strokeSecondary: '#fef08a',
    particleBg: 'bg-amber-400',
  },
};

// ============================================================================
// 1. RENDER ĐẠO BÙA CỔ TRUYỀN (TAOIST TALISMAN SCROLL)
// ============================================================================
function TalismanArtwork({ item }: { item: SpiritualManifestation }) {
  const cfg = item.talismanConfig || {
    sealText: '太上敕令',
    verticalInscriptions: ['乾坤正氣凝神守', '日月光華照本心'],
    paperTone: 'yellow_cinnabar',
    runeVariant: 1,
  };

  const paperStyles = {
    yellow_cinnabar: {
      bg: 'from-amber-300 via-yellow-400 to-amber-500',
      ink: '#991b1b',
      glowInk: '#dc2626',
      subText: 'text-red-900',
      border: 'border-red-800/70',
    },
    crimson_gold: {
      bg: 'from-red-900 via-red-800 to-amber-950',
      ink: '#fde047',
      glowInk: '#fbbf24',
      subText: 'text-amber-300',
      border: 'border-amber-400/70',
    },
    jade_gold: {
      bg: 'from-emerald-950 via-teal-900 to-zinc-950',
      ink: '#fcd34d',
      glowInk: '#34d399',
      subText: 'text-emerald-200',
      border: 'border-emerald-400/60',
    },
    indigo_silver: {
      bg: 'from-slate-950 via-indigo-950 to-cyan-950',
      ink: '#67e8f9',
      glowInk: '#fde047',
      subText: 'text-cyan-200',
      border: 'border-cyan-400/60',
    },
  }[cfg.paperTone];

  // Đường nét bùa chú Đạo gia biến thiên theo runeVariant
  const runePaths: Record<number, string> = {
    1: 'M 60 32 C 35 45, 85 55, 60 70 C 30 85, 90 100, 60 115 L 42 130 L 78 142 L 45 156 L 75 170 L 60 185 C 45 198, 75 205, 60 218',
    2: 'M 60 30 L 40 50 L 80 50 L 60 72 C 25 85, 95 85, 60 108 C 30 125, 90 125, 60 145 L 38 165 L 82 165 L 60 190 L 60 218',
    3: 'M 60 32 C 90 48, 30 68, 60 88 C 90 108, 30 128, 60 148 C 85 168, 35 188, 60 208 L 60 220',
    4: 'M 40 36 L 80 36 L 60 58 L 38 78 L 82 78 L 60 102 C 35 120, 85 135, 60 155 L 45 178 L 75 178 L 60 202 L 60 218',
    5: 'M 45 35 C 25 60, 95 60, 75 35 C 95 75, 25 95, 60 120 C 95 145, 25 165, 60 190 C 45 205, 75 205, 60 218',
    6: 'M 60 30 L 60 55 M 38 45 L 82 45 M 45 68 C 28 90, 92 90, 75 68 L 42 125 L 78 140 L 44 160 L 76 178 C 40 198, 80 205, 60 218',
  };

  return (
    <div className="relative flex items-center justify-center py-2">
      {/* Vòng hào quang trấn pháp xoay phía sau lá bùa */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute w-64 h-64 rounded-full border border-dashed border-amber-400/35 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute w-52 h-52 rounded-full border border-red-500/30 pointer-events-none"
      />

      {/* Cuộn Đạo Bùa (Unfurling Scroll) */}
      <motion.div
        initial={{ scaleY: 0.08, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'top center' }}
        className="relative flex flex-col items-center"
      >
        {/* Trục cuốn trên bằng ngọc/vàng */}
        <div className="w-48 h-3.5 rounded-full bg-gradient-to-r from-amber-700 via-yellow-300 to-amber-700 border border-amber-200 shadow-lg z-10 flex items-center justify-between px-1">
          <div className="w-2 h-2 rounded-full bg-red-700" />
          <div className="w-2 h-2 rounded-full bg-red-700" />
        </div>

        {/* Thân Lá Bùa Hoàng Biểu / Chu Sa */}
        <div
          className={`relative w-44 h-68 bg-gradient-to-b ${paperStyles.bg} border-2 ${paperStyles.border} shadow-[0_0_40px_rgba(220,38,38,0.45)] overflow-hidden flex flex-col items-center justify-between py-2.5 px-2 select-none`}
          style={{ height: '268px' }}
        >
          {/* Khung viền đôi cổ truyền */}
          <div className={`absolute inset-1.5 border ${paperStyles.border} pointer-events-none`} />

          {/* Đầu Phù: Tam Thanh Đạo Tổ (✓ ✓ ✓) & Sắc Lệnh */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`text-[10px] font-black tracking-[0.35em] ${paperStyles.subText}`}>
              ✓ ✓ ✓
            </div>
            <div
              className={`text-xs font-black tracking-[0.25em] ${paperStyles.subText} border-b ${paperStyles.border} pb-0.5`}
            >
              敕 令
            </div>
          </div>

          {/* 2 Cột Chú Ngữ Dọc Hai Bên */}
          <div
            className={`absolute left-2.5 top-12 bottom-10 text-[9px] font-bold ${paperStyles.subText} opacity-80 flex items-center`}
            style={{ writingMode: 'vertical-rl' }}
          >
            {cfg.verticalInscriptions[0]}
          </div>
          <div
            className={`absolute right-2.5 top-12 bottom-10 text-[9px] font-bold ${paperStyles.subText} opacity-80 flex items-center`}
            style={{ writingMode: 'vertical-rl' }}
          >
            {cfg.verticalInscriptions[1]}
          </div>

          {/* Họa Tiết Bùa Chú Vẽ Tự Động Bằng Nét Chu Sa */}
          <svg
            viewBox="0 0 120 230"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <defs>
              <filter id="talisman-glow">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Vòng tròn Thái Cực & Bắc Đẩu trên thân bùa */}
            <motion.circle
              cx="60"
              cy="72"
              r="22"
              fill="none"
              stroke={paperStyles.ink}
              strokeWidth="2.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            />

            {/* Nét bút Phù Lục chính */}
            <motion.path
              d={runePaths[cfg.runeVariant] || runePaths[1]}
              fill="none"
              stroke={paperStyles.ink}
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#talisman-glow)"
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
            />

            {/* 7 Điểm Sao Bắc Đẩu đính trên lá bùa */}
            {[
              [46, 55],
              [54, 65],
              [66, 68],
              [70, 56],
              [58, 86],
              [48, 102],
              [68, 116],
            ].map(([cx, cy], idx) => (
              <motion.circle
                key={idx}
                cx={cx}
                cy={cy}
                r="2.8"
                fill={paperStyles.glowInk}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.4, 1], opacity: 1 }}
                transition={{ delay: 0.35 + idx * 0.1, duration: 0.4 }}
              />
            ))}
          </svg>

          {/* Chữ Linh Phù Trung Tâm */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 1.12, 1], opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.55 }}
            className="relative z-10 my-auto flex flex-col items-center"
          >
            <span
              className="text-5xl font-black select-none drop-shadow-[0_2px_10px_rgba(220,38,38,0.6)]"
              style={{ color: paperStyles.ink }}
            >
              {item.centerGlyph}
            </span>
          </motion.div>

          {/* Ấn Triện Chu Sa Đóng Xuống (Stamping Effect) */}
          <motion.div
            initial={{ scale: 2.6, opacity: 0, rotate: -18 }}
            animate={{ scale: 1, opacity: 0.92, rotate: -6 }}
            transition={{ delay: 0.85, type: 'spring', stiffness: 260, damping: 16 }}
            className="relative z-20 mb-1 px-2.5 py-1 border-2 border-red-600 bg-red-700/20 rounded shadow-[0_0_15px_rgba(220,38,38,0.6)]"
          >
            <div className="text-[11px] font-black tracking-widest text-red-600 bg-white/85 px-1.5 py-0.5 rounded-sm border border-red-600">
              {cfg.sealText}
            </div>
          </motion.div>
        </div>

        {/* Trục cuốn dưới + Tua rua đỏ */}
        <div className="w-48 h-3.5 rounded-full bg-gradient-to-r from-amber-700 via-yellow-300 to-amber-700 border border-amber-200 shadow-lg z-10" />
        <motion.div
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1.5 h-6 bg-gradient-to-b from-amber-400 to-red-600 rounded-b-full shadow-md"
        />
      </motion.div>
    </div>
  );
}

// ============================================================================
// 2. RENDER CHÒM SAO TINH TÚ & THIÊN VĂN (CELESTIAL CONSTELLATION)
// ============================================================================
function ConstellationArtwork({ item }: { item: SpiritualManifestation }) {
  const cfg = item.constellationConfig || {
    stars: [
      { x: 20, y: 30, label: 'Thiên Xu', size: 7 },
      { x: 35, y: 48, label: 'Thiên Tuyền', size: 7 },
      { x: 52, y: 45, label: 'Thiên Cơ', size: 7 },
      { x: 68, y: 58, label: 'Khai Dương', size: 8 },
      { x: 82, y: 72, label: 'Dao Quang', size: 8 },
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  };

  return (
    <div className="relative w-68 h-68 sm:w-72 sm:h-72 flex items-center justify-center mx-auto">
      {/* Vòng Tinh Bàn Nhị Thập Bát Tú xoay tròn */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-cyan-400/35 shadow-[inset_0_0_40px_rgba(34,211,238,0.18)]"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-4 rounded-full border border-dashed border-amber-300/40"
      />

      {/* Chữ Hán Chìm Giữa Tinh Bàn */}
      <div className="absolute text-7xl font-black text-amber-300/10 select-none pointer-events-none">
        {item.centerGlyph}
      </div>

      {/* Bản đồ Chòm Sao SVG */}
      <svg viewBox="0 0 100 100" className="relative z-10 w-64 h-64 overflow-visible">
        <defs>
          <radialGradient id="star-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="45%" stopColor="#fde047" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Đường nối các ngôi sao trong chòm sao */}
        {cfg.connections.map(([fromIdx, toIdx], idx) => {
          const from = cfg.stars[fromIdx];
          const to = cfg.stars[toIdx];
          if (!from || !to) return null;
          return (
            <motion.line
              key={`conn-${idx}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#fde047"
              strokeWidth="0.9"
              strokeDasharray="2 1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 0.9, delay: 0.15 + idx * 0.1 }}
            />
          );
        })}

        {/* Các Ngôi Sao Phát Sáng & Nhãn Tên Sao */}
        {cfg.stars.map((star, idx) => {
          const r = (star.size || 7) * 0.45;
          return (
            <g key={`star-${idx}`}>
              {/* Quầng sáng lan tỏa */}
              <motion.circle
                cx={star.x}
                cy={star.y}
                r={r * 2.6}
                fill="url(#star-halo)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.95, 0.5] }}
                transition={{
                  delay: idx * 0.12,
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Nhân ngôi sao */}
              <motion.circle
                cx={star.x}
                cy={star.y}
                r={r * 0.75}
                fill="#ffffff"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.12, duration: 0.35 }}
              />
              {/* Tia sao chữ thập 4 cánh */}
              <motion.path
                d={`M ${star.x - r * 1.8} ${star.y} L ${star.x + r * 1.8} ${star.y} M ${star.x} ${star.y - r * 1.8} L ${star.x} ${star.y + r * 1.8}`}
                stroke="#fef08a"
                strokeWidth="0.55"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ delay: idx * 0.12, duration: 1.8, repeat: Infinity }}
              />
              {/* Tên ngôi sao */}
              <motion.text
                x={star.x}
                y={star.y - r * 1.9}
                textAnchor="middle"
                fill="#fef3c7"
                fontSize="3.8"
                fontWeight="bold"
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                {star.label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ============================================================================
// 3. RENDER 12 CON GIÁP ĐỊA CHI LINH THÚ (ZODIAC WHEEL & GUARDIAN)
// ============================================================================
const TWELVE_BRANCHES = ['TÝ', 'SỬU', 'DẦN', 'MÃO', 'THÌN', 'TỊ', 'NGỌ', 'MÙI', 'THÂN', 'DẬU', 'TUẤT', 'HỢI'];

function ZodiacArtwork({ item }: { item: SpiritualManifestation }) {
  const cfg = item.zodiacConfig || {
    branchHanzi: '辰龍',
    branchVi: 'Giờ Thìn · Phương Đông Nam',
    guardianIcon: '🐉',
    auspiciousHours: 'Tam Hợp Cát Tường',
  };

  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mx-auto">
      {/* Vòng 12 Địa Chi xoay chậm */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border-2 border-amber-400/50 bg-gradient-to-br from-amber-950/30 via-zinc-950/60 to-red-950/30 shadow-[0_0_50px_rgba(245,158,11,0.25)]"
      >
        {TWELVE_BRANCHES.map((branch, idx) => {
          const angleDeg = idx * 30 - 90;
          const rad = (angleDeg * Math.PI) / 180;
          const x = 50 + Math.cos(rad) * 42;
          const y = 50 + Math.sin(rad) * 42;
          return (
            <div
              key={branch}
              style={{ left: `${x}%`, top: `${y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-[9px] font-black text-amber-300/85 tracking-wider"
            >
              {branch}
            </div>
          );
        })}
      </motion.div>

      {/* Vòng Bát Giác Kim Quang xoay ngược */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8 rounded-full border border-dashed border-amber-300/50"
      />

      {/* Pháp Ấn Linh Thú Trung Tâm */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-b from-amber-500/25 via-red-950/70 to-zinc-950 border-2 border-amber-300/80 shadow-[0_0_35px_rgba(251,191,36,0.45)] flex flex-col items-center justify-center p-2 text-center"
      >
        <span className="absolute text-6xl font-black text-amber-400/15 select-none">
          {item.centerGlyph}
        </span>
        <motion.div
          animate={{ y: [-3, 3, -3], scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-5xl drop-shadow-[0_0_18px_rgba(251,191,36,0.8)]"
        >
          {cfg.guardianIcon}
        </motion.div>
        <div className="mt-1 text-xs font-black text-amber-200 tracking-widest">
          {cfg.branchHanzi}
        </div>
        <div className="text-[9px] text-amber-300/90 font-semibold leading-tight mt-0.5">
          {cfg.auspiciousHours}
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// 4. RENDER BÁT QUÁI & THÁI CỰC ĐỒ (BAGUA & TAIJI ARRAY)
// ============================================================================
const TIEN_THIEN_TRIGRAMS = [
  { sym: '☰', name: 'Càn' },
  { sym: '☱', name: 'Đoài' },
  { sym: '☲', name: 'Ly' },
  { sym: '☳', name: 'Chấn' },
  { sym: '☷', name: 'Khôn' },
  { sym: '☶', name: 'Cấn' },
  { sym: '☵', name: 'Khảm' },
  { sym: '☴', name: 'Tốn' },
];

const HAU_THIEN_TRIGRAMS = [
  { sym: '☲', name: 'Ly' },
  { sym: '☷', name: 'Khôn' },
  { sym: '☱', name: 'Đoài' },
  { sym: '☰', name: 'Càn' },
  { sym: '☵', name: 'Khảm' },
  { sym: '☶', name: 'Cấn' },
  { sym: '☳', name: 'Chấn' },
  { sym: '☴', name: 'Tốn' },
];

function BaguaArtwork({ item }: { item: SpiritualManifestation }) {
  const orderType = item.baguaConfig?.orderType || 'tien_thien';
  const trigrams = orderType === 'hau_thien' ? HAU_THIEN_TRIGRAMS : TIEN_THIEN_TRIGRAMS;

  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mx-auto">
      {/* Sóng xung kích kim quang lan tỏa */}
      <motion.div
        animate={{ scale: [0.9, 1.18, 0.9], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full border-2 border-amber-400/40 pointer-events-none"
      />

      {/* Vòng ngoài 8 Quẻ Bát Quái xoay thuận */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-1 rounded-full border-2 border-amber-400/60 bg-gradient-to-br from-amber-950/40 via-zinc-950/80 to-amber-900/30 shadow-[0_0_50px_rgba(251,191,36,0.3)]"
      >
        {trigrams.map((tg, idx) => {
          const angleDeg = idx * 45 - 90;
          const rad = (angleDeg * Math.PI) / 180;
          const x = 50 + Math.cos(rad) * 39;
          const y = 50 + Math.sin(rad) * 39;
          return (
            <div
              key={`${tg.name}-${idx}`}
              style={{ left: `${x}%`, top: `${y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            >
              <span className="text-lg sm:text-xl font-bold text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] leading-none">
                {tg.sym}
              </span>
              <span className="text-[8px] font-bold text-amber-100/80 uppercase tracking-tighter">
                {tg.name}
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* Vòng Lạc Thư Cửu Cung xoay ngược */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-14 rounded-full border border-dashed border-amber-300/60"
      />

      {/* Tâm Thái Cực Đồ (Yin-Yang) Xoay Tròn */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="relative z-10 w-24 h-24 rounded-full border-2 border-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.65)] overflow-hidden flex items-center justify-center bg-zinc-950"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="49" fill="#09090b" />
          <path
            d="M 50 1 A 49 49 0 0 1 50 99 A 24.5 24.5 0 0 1 50 50 A 24.5 24.5 0 0 0 50 1 Z"
            fill="#fbbf24"
          />
          <circle cx="50" cy="25.5" r="7" fill="#fbbf24" />
          <circle cx="50" cy="74.5" r="7" fill="#09090b" />
        </svg>
      </motion.div>
    </div>
  );
}

// ============================================================================
// 5. RENDER TỨ LINH THẦN THÚ & ẤN TRIỆN CỔ (SACRED BEASTS & IMPERIAL SEAL)
// ============================================================================
function SacredBeastArtwork({ item }: { item: SpiritualManifestation }) {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center mx-auto">
      {/* 2 Khung Vuông Xoay Chéo Tạo Thành Bát Giác Trận */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute w-48 h-48 border-2 border-amber-400/50 bg-amber-500/5"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute w-48 h-48 border-2 border-red-500/50 bg-red-500/5 rotate-45"
      />

      {/* Ngọc Ấn Đóng Xuống Giữa Trận Đồ */}
      <motion.div
        initial={{ scale: 2.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16 }}
        className="relative z-10 w-36 h-36 rounded-2xl border-4 border-amber-300 bg-gradient-to-br from-red-900/90 via-red-950 to-zinc-950 shadow-[0_0_45px_rgba(239,68,68,0.6),inset_0_0_20px_rgba(251,191,36,0.4)] flex flex-col items-center justify-center p-2"
      >
        <div className="absolute inset-1.5 border border-amber-400/60 rounded-xl pointer-events-none" />
        <span className="text-[9px] font-bold text-amber-300/80 tracking-[0.25em] mb-0.5">
          九天寶印
        </span>
        <span className="text-5xl font-black text-amber-200 drop-shadow-[0_0_15px_rgba(251,191,36,0.9)]">
          {item.centerGlyph}
        </span>
        <span className="text-[9px] font-bold text-amber-300/80 tracking-[0.2em] mt-1">
          護佑平安
        </span>
      </motion.div>
    </div>
  );
}

// ============================================================================
// 6. RENDER NGŨ HÀNH TƯƠNG SINH & LIÊN HOA PHÁP TRẬN (FIVE ELEMENTS MANDALA)
// ============================================================================
const FIVE_ELEMENTS_NODES = [
  { label: 'HỎA', hanzi: '火', color: 'from-red-500 to-orange-600', angle: -90 },
  { label: 'THỔ', hanzi: '土', color: 'from-amber-400 to-yellow-600', angle: -18 },
  { label: 'KIM', hanzi: '金', color: 'from-slate-100 to-amber-200', angle: 54 },
  { label: 'THỦY', hanzi: '水', color: 'from-cyan-400 to-blue-600', angle: 126 },
  { label: 'MỘC', hanzi: '木', color: 'from-emerald-400 to-green-600', angle: 198 },
];

function FiveElementsArtwork({ item }: { item: SpiritualManifestation }) {
  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mx-auto">
      {/* Vòng Ngũ Hành Tương Sinh Xoay Tròn */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-2 rounded-full border-2 border-amber-400/40"
      >
        {/* Ngôi sao ngũ giác nối 5 hành */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <polygon
            points="50,8 90,37 75,85 25,85 10,37"
            fill="none"
            stroke="rgba(251, 191, 36, 0.45)"
            strokeWidth="0.8"
          />
          <polygon
            points="50,8 75,85 10,37 90,37 25,85"
            fill="none"
            stroke="rgba(52, 211, 153, 0.35)"
            strokeWidth="0.6"
            strokeDasharray="2 1"
          />
        </svg>

        {FIVE_ELEMENTS_NODES.map(el => {
          const rad = (el.angle * Math.PI) / 180;
          const x = 50 + Math.cos(rad) * 42;
          const y = 50 + Math.sin(rad) * 42;
          return (
            <div
              key={el.label}
              style={{ left: `${x}%`, top: `${y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-gradient-to-br ${el.color} p-0.5 shadow-[0_0_18px_rgba(251,191,36,0.5)] flex flex-col items-center justify-center`}
            >
              <div className="w-full h-full rounded-full bg-zinc-950/85 flex flex-col items-center justify-center">
                <span className="text-xs font-black text-amber-200 leading-none">{el.hanzi}</span>
                <span className="text-[7px] font-bold text-zinc-300">{el.label}</span>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Đoá Kim Liên Hoa Nở Giữa Trung Tâm */}
      <motion.div
        animate={{ scale: [0.95, 1.06, 0.95] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/30 via-amber-600/20 to-zinc-950 border-2 border-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center justify-center"
      >
        <span className="text-4xl font-black text-amber-200 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]">
          {item.centerGlyph}
        </span>
      </motion.div>
    </div>
  );
}

// ============================================================================
// COMPONENT CHÍNH: HIỂN LINH ĐỊNH KỲ MỖI 240 GIÂY + NÚT THỈNH LINH TƯỢNG NGAY
// ============================================================================
export default function SpiritualManifestationOverlay() {
  const deckRef = useRef(createSpiritualManifestationDeck());
  const [activeItem, setActiveItem] = useState<SpiritualManifestation | null>(null);
  const [drawCounter, setDrawCounter] = useState(0);
  const [autoEnabled, setAutoEnabled] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(SPIRITUAL_INTERVAL_MS / 1000);
  const [isHovered, setIsHovered] = useState(false);

  // Hàm rút linh tượng tiếp theo từ bộ bài không trùng lặp
  const summonNextManifestation = useCallback(() => {
    const nextItem = deckRef.current.next();
    setActiveItem(nextItem);
    setDrawCounter(prev => prev + 1);
    setSecondsLeft(SPIRITUAL_INTERVAL_MS / 1000);
  }, []);

  // Bộ đếm ngược 240s tự động hiển linh
  useEffect(() => {
    if (!autoEnabled) return;

    const countdownTimer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          const nextItem = deckRef.current.next();
          setActiveItem(nextItem);
          setDrawCounter(c => c + 1);
          return SPIRITUAL_INTERVAL_MS / 1000;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [autoEnabled]);

  // Tự động thu ấn sau 7.5 giây (tạm dừng nếu người dùng đang di chuột vào xem)
  useEffect(() => {
    if (!activeItem || isHovered) return;

    const hideTimer = setTimeout(() => {
      setActiveItem(null);
    }, SPIRITUAL_DISPLAY_DURATION_MS);

    return () => clearTimeout(hideTimer);
  }, [activeItem, isHovered]);

  const style = activeItem ? ACCENT_STYLES[activeItem.accentColor] : ACCENT_STYLES.gold;

  return (
    <>
      {/* ==================================================================== */}
      {/* NÚT PHÁP KHÍ NỔI GÓC DƯỚI BÊN PHẢI: THỈNH LINH TƯỢNG NGAY & HẸN GIỜ 240S */}
      {/* ==================================================================== */}
      <div className="fixed bottom-20 md:bottom-11 xl:bottom-5 right-3 sm:right-5 z-[60] flex items-center gap-1.5 select-none">
        <button
          type="button"
          onClick={summonNextManifestation}
          data-testid="summon-spiritual-btn"
          title="Thỉnh ngẫu nhiên 1 Đạo Bùa, Chòm Sao, 12 Con Giáp hoặc Bát Quái (Không trùng lặp)"
          className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-950/95 via-red-950/95 to-zinc-950/95 border border-amber-400/60 hover:border-amber-300 text-amber-200 hover:text-amber-100 shadow-[0_4px_25px_rgba(0,0,0,0.7),0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_28px_rgba(251,191,36,0.55)] backdrop-blur-md transition-all duration-300 cursor-pointer"
        >
          <span className="text-sm group-hover:scale-125 transition-transform duration-300">
            🧧
          </span>
          <span className="text-[11px] font-bold tracking-wide">
            Linh Phù Hiển Linh
          </span>
          {autoEnabled && (
            <span className="text-[10px] font-mono text-amber-300 bg-black/50 px-1.5 py-0.5 rounded-full border border-amber-500/30">
              {secondsLeft}s
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setAutoEnabled(prev => !prev)}
          data-testid="toggle-auto-spiritual-btn"
          title={
            autoEnabled
              ? 'Đang bật tự động hiển linh mỗi 240s (Nhấp để tạm dừng)'
              : 'Đang tắt tự động hiển linh 240s (Nhấp để bật lại)'
          }
          className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold border backdrop-blur-md transition-all cursor-pointer shadow-md ${
            autoEnabled
              ? 'bg-zinc-900/90 border-amber-500/50 text-amber-300 hover:border-amber-300'
              : 'bg-zinc-950/85 border-zinc-700 text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {autoEnabled ? '⚡240s' : '⏸Tắt'}
        </button>
      </div>

      {/* ==================================================================== */}
      {/* HIỂN LINH GIỮA MÀN HÌNH (MODAL TÂM LINH HUYỀN ẢO)                     */}
      {/* ==================================================================== */}
      <AnimatePresence mode="wait">
        {activeItem && (
          <motion.div
            key={activeItem.id}
            data-testid="spiritual-manifestation-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 pointer-events-none"
          >
            {/* Lớp nền mờ huyền ảo (Nhấp ra ngoài để đóng nhanh) */}
            <div
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-black/65 backdrop-blur-[4px] pointer-events-auto cursor-pointer"
            />

            {/* Khung Linh Tượng Chính Giữa Màn Hình */}
            <motion.div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              initial={{ scale: 0.72, y: 35, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: -25, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 210, damping: 20 }}
              className={`relative z-10 max-w-md w-full rounded-3xl bg-gradient-to-b from-zinc-950/95 via-slate-950/95 to-zinc-950/98 border-2 ${style.border} ${style.glow} p-5 sm:p-6 text-center pointer-events-auto overflow-hidden select-none`}
            >
              {/* Hạt bụi vàng tâm linh bay lơ lửng */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <motion.span
                    key={idx}
                    initial={{
                      x: `${(idx * 19 + 7) % 95}%`,
                      y: '105%',
                      opacity: 0,
                    }}
                    animate={{
                      y: '-10%',
                      opacity: [0, 0.85, 0],
                    }}
                    transition={{
                      duration: 3.2 + (idx % 4) * 0.8,
                      repeat: Infinity,
                      delay: idx * 0.25,
                      ease: 'easeOut',
                    }}
                    className={`absolute w-1.5 h-1.5 rounded-full ${style.particleBg} blur-[0.5px]`}
                  />
                ))}
              </div>

              {/* Header: Nhóm Tâm Linh + Ngũ Hành + Bộ Đếm Không Trùng */}
              <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${style.badgeBg} ${style.badgeText}`}
                  >
                    ✨ {activeItem.categoryLabel}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-900 border border-zinc-700 text-amber-300">
                    Hành {activeItem.element}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-zinc-400 font-mono">
                    #{((drawCounter - 1) % deckRef.current.totalCount) + 1}/{deckRef.current.totalCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveItem(null)}
                    aria-label="Đóng linh tượng"
                    className="w-6 h-6 rounded-full bg-zinc-900/90 border border-zinc-700 text-zinc-400 hover:text-white hover:border-amber-400 flex items-center justify-center text-xs font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Đồ Họa Hoạt Họa Trung Tâm Tùy Theo Nhóm Tâm Linh */}
              <div className="relative z-10 my-1">
                {activeItem.category === 'talisman' && <TalismanArtwork item={activeItem} />}
                {activeItem.category === 'constellation' && (
                  <ConstellationArtwork item={activeItem} />
                )}
                {activeItem.category === 'zodiac' && <ZodiacArtwork item={activeItem} />}
                {activeItem.category === 'bagua' && <BaguaArtwork item={activeItem} />}
                {activeItem.category === 'sacred_beast' && (
                  <SacredBeastArtwork item={activeItem} />
                )}
                {activeItem.category === 'five_elements' && (
                  <FiveElementsArtwork item={activeItem} />
                )}
              </div>

              {/* Tên Linh Tượng & Cổ Tự Hán Văn */}
              <div className="relative z-10 mt-3 space-y-1">
                <div className="text-xs font-bold tracking-[0.28em] text-amber-400/90 uppercase">
                  {activeItem.hanzi}
                </div>
                <h3
                  data-testid="spiritual-manifestation-title"
                  className={`text-lg sm:text-xl font-black bg-gradient-to-r ${style.titleGrad} bg-clip-text text-transparent`}
                >
                  {activeItem.title}
                </h3>
                <p className="text-[11px] font-semibold text-amber-200/80">
                  {activeItem.subtitle}
                </p>
              </div>

              {/* Khẩu Quyết / Chú Ngữ Cổ Truyền */}
              <div className="relative z-10 mt-3 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-400/30">
                <div className="text-[11px] font-bold text-amber-300 italic">
                  “{activeItem.mantra}”
                </div>
              </div>

              {/* Ý Nghĩa Tâm Linh */}
              <p className="relative z-10 mt-2.5 text-xs text-zinc-300 leading-relaxed">
                {activeItem.meaning}
              </p>

              {/* Nút Tương Tác: Đổi Linh Tượng Khác (Random Không Trùng) Hoặc Thu Ấn */}
              <div className="relative z-10 mt-4 flex items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={summonNextManifestation}
                  data-testid="next-spiritual-btn"
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-extrabold text-xs shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all cursor-pointer"
                >
                  🎲 Linh Tượng Khác ({deckRef.current.remainingInCycle()} còn lại)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold text-xs transition-all cursor-pointer"
                >
                  Thu Ấn
                </button>
              </div>

              {/* Thanh tiến trình tự động thu ấn */}
              {!isHovered && (
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: SPIRITUAL_DISPLAY_DURATION_MS / 1000, ease: 'linear' }}
                  style={{ transformOrigin: 'left' }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-red-500 to-amber-300"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

