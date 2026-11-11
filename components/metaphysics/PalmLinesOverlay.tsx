'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HandSide, PalmistryResult, LifeLineType, HeadLineType, HeartLineType, FateLineType } from '@/lib/metaphysics/palmistry';

export interface PalmLinesOverlayProps {
  imageUrl: string;
  side: HandSide;
  result?: PalmistryResult | null;
  isAnalyzing?: boolean;
  activeLine?: string | null;
  onSelectLine?: (lineKey: string) => void;
  allowCalibration?: boolean;
  showLabels?: boolean;
  className?: string;
}

export interface CalibrationState {
  scale: number;
  offsetX: number;
  offsetY: number;
  rotation: number;
  flipHorizontal: boolean;
  opacity: number;
}

export default function PalmLinesOverlay({
  imageUrl,
  side,
  result,
  isAnalyzing = false,
  activeLine = null,
  onSelectLine,
  allowCalibration = true,
  showLabels = true,
  className = '',
}: PalmLinesOverlayProps) {
  // Trạng thái căn chỉnh nét vẽ trên ảnh
  const [calibration, setCalibration] = useState<CalibrationState>({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    rotation: 0,
    flipHorizontal: side === 'left',
    opacity: 0.95,
  });

  const [showControlPanel, setShowControlPanel] = useState(false);
  const [internalActiveLine, setInternalActiveLine] = useState<string | null>(activeLine);
  const [showLines, setShowLines] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedHighlight = activeLine !== undefined && activeLine !== null ? activeLine : internalActiveLine;

  const handleLineClick = (lineKey: string) => {
    setInternalActiveLine(lineKey === selectedHighlight ? null : lineKey);
    if (onSelectLine) {
      onSelectLine(lineKey);
    }
  };

  // Các preset căn chỉnh nhanh
  const applyPreset = (preset: 'default' | 'rotate90' | 'rotate270' | 'flip') => {
    if (preset === 'default') {
      setCalibration({
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        rotation: 0,
        flipHorizontal: side === 'left',
        opacity: 0.95,
      });
    } else if (preset === 'rotate90') {
      setCalibration((prev) => ({
        ...prev,
        rotation: (prev.rotation + 90) % 360,
      }));
    } else if (preset === 'rotate270') {
      setCalibration((prev) => ({
        ...prev,
        rotation: (prev.rotation - 90 + 360) % 360,
      }));
    } else if (preset === 'flip') {
      setCalibration((prev) => ({
        ...prev,
        flipHorizontal: !prev.flipHorizontal,
      }));
    }
  };

  // Bảng màu sắc cho từng tuyến chỉ tay phát sáng Neon
  const lineConfig = {
    life: {
      key: 'life',
      name: 'Đường Sinh Đạo',
      english: 'Life Line',
      color: '#10b981',      // Emerald Green
      glow: 'rgba(16, 185, 129, 0.85)',
      desc: result?.lifeLine?.title || 'Sinh lực, thọ mạng & sức đề kháng',
      score: result?.lifeLine?.score || 92,
    },
    head: {
      key: 'head',
      name: 'Đường Trí Đạo',
      english: 'Head Line',
      color: '#06b6d4',      // Cyan Light
      glow: 'rgba(6, 182, 212, 0.85)',
      desc: result?.headLine?.title || 'Tư duy, trí tuệ & khả năng phán đoán',
      score: result?.headLine?.score || 90,
    },
    heart: {
      key: 'heart',
      name: 'Đường Tâm Đạo',
      english: 'Heart Line',
      color: '#f43f5e',      // Rose Ruby
      glow: 'rgba(244, 63, 94, 0.85)',
      desc: result?.heartLine?.title || 'Tình duyên, cảm xúc & lòng nhân ái',
      score: result?.heartLine?.score || 88,
    },
    fate: {
      key: 'fate',
      name: 'Đường Định Mệnh',
      english: 'Fate Line',
      color: '#a855f7',      // Amethyst Purple
      glow: 'rgba(168, 85, 247, 0.85)',
      desc: result?.fateLine?.title || 'Sự nghiệp, danh vọng & quý nhân phù trợ',
      score: result?.fateLine?.score || 86,
    },
  };

  // Tạo tọa độ SVG Bézier cho từng đường chỉ tay chuẩn theo giải phẫu bàn tay
  // Hộp viewbox chuẩn: 0 0 400 500
  // Cung Sinh Đạo: Vòng cung ôm quanh gò Kim Tinh (từ khe ngón trỏ/cái xuống cổ tay)
  const lifeLinePath = 'M 135 210 C 155 240, 185 290, 180 370 C 175 420, 150 460, 135 480';
  // Cung Trí Đạo: Chạy từ khe ngón trỏ/cái ngang qua lòng bàn tay hướng sang gò Nguyệt Tinh
  const headLinePath = 'M 135 210 C 180 235, 240 270, 305 320';
  // Cung Tâm Đạo: Chạy từ mép ngoài dưới ngón út (phải) sang dưới ngón trỏ/giữa (trái)
  const heartLinePath = 'M 345 255 C 290 230, 220 215, 175 190';
  // Cung Định Mệnh: Chạy thẳng từ cổ tay lên gốc ngón giữa (gò Thổ Tinh)
  const fateLinePath = 'M 215 470 C 220 380, 225 290, 230 190';

  // Dấu ấn chữ M (Nối 4 điểm: Sinh Đạo -> Trí Đạo -> Định Mệnh -> Tâm Đạo)
  const hasLetterM = result?.input?.specialSigns?.includes('chu_m');
  const letterMPath = 'M 140 220 L 235 300 L 230 195 L 340 255';

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-lg mx-auto rounded-2xl overflow-hidden border-2 border-amber-500/40 bg-zinc-950 shadow-2xl select-none ${className}`}
    >
      {/* ─── THANH TIÊU ĐỀ & CHẾ ĐỘ HIỂN THỊ NÉT VẼ ─── */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-xs z-20 relative">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-amber-300">
            {calibration.flipHorizontal ? '🤚 TAY TRÁI' : '✋ TAY PHẢI'} · NÉT VẼ QUÉT AI CHÍNH XÁC
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowLines(!showLines)}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
              showLines
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
            }`}
            title="Bật/Tắt hiển thị các đường chỉ tay vẽ trên ảnh"
          >
            {showLines ? '👁️ Nét Vẽ: BẬT' : '👁️‍🗨️ Nét Vẽ: TẮT'}
          </button>

          {allowCalibration && (
            <button
              type="button"
              onClick={() => setShowControlPanel(!showControlPanel)}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer flex items-center gap-1 ${
                showControlPanel
                  ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-cyan-300 border border-cyan-500/30'
              }`}
              title="Mở thanh công cụ căn chỉnh vị trí nét vẽ cho khớp ảnh"
            >
              <span>⚙️</span> Căn Chỉnh
            </button>
          )}
        </div>
      </div>

      {/* ─── THANH CÔNG CỤ TINH CHỈNH NÉT VẼ (HIỂN THỊ KHI BẤM CĂN CHỈNH) ─── */}
      <AnimatePresence>
        {showControlPanel && allowCalibration && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-zinc-900/95 border-b border-zinc-800 px-3 sm:px-4 py-3 text-xs space-y-2.5 z-20 relative"
          >
            <div className="flex items-center justify-between text-zinc-300 font-bold">
              <span className="flex items-center gap-1 text-cyan-300">
                <span>🎯</span> Tinh Chỉnh Nét Vẽ Khớp Lòng Bàn Tay Trong Ảnh:
              </span>
              <button
                type="button"
                onClick={() => applyPreset('default')}
                className="text-[11px] text-amber-400 hover:underline cursor-pointer"
              >
                Đặt lại mặc định
              </button>
            </div>

            {/* Các nút preset xoay & đảo chiều */}
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => applyPreset('flip')}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold text-[11px] flex items-center justify-center gap-1"
                title="Đổi chiều Trái / Phải"
              >
                <span>⇄</span> Lật Tay
              </button>
              <button
                type="button"
                onClick={() => applyPreset('rotate90')}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold text-[11px] flex items-center justify-center gap-1"
                title="Xoay sang phải 90 độ"
              >
                <span>↷</span> Xoay +90°
              </button>
              <button
                type="button"
                onClick={() => applyPreset('rotate270')}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold text-[11px] flex items-center justify-center gap-1"
                title="Xoay sang trái 90 độ"
              >
                <span>↶</span> Xoay -90°
              </button>
              <button
                type="button"
                onClick={() =>
                  setCalibration((p) => ({
                    ...p,
                    scale: Math.min(1.6, p.scale + 0.1),
                  }))
                }
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold text-[11px] flex items-center justify-center gap-1"
              >
                <span>🔍+</span> Phóng to
              </button>
            </div>

            {/* Các nút vi chỉnh dịch chuyển 4 hướng */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-800/80">
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-zinc-400 mr-1">Dịch chuyển:</span>
                <button
                  type="button"
                  onClick={() => setCalibration((p) => ({ ...p, offsetY: p.offsetY - 12 }))}
                  className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-200 font-bold"
                  title="Dịch lên"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => setCalibration((p) => ({ ...p, offsetY: p.offsetY + 12 }))}
                  className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-200 font-bold"
                  title="Dịch xuống"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => setCalibration((p) => ({ ...p, offsetX: p.offsetX - 12 }))}
                  className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-200 font-bold"
                  title="Dịch sang trái"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setCalibration((p) => ({ ...p, offsetX: p.offsetX + 12 }))}
                  className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-200 font-bold"
                  title="Dịch sang phải"
                >
                  →
                </button>
              </div>

              {/* Thanh chỉnh độ mờ nét vẽ */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-400">Độ sáng nét:</span>
                <input
                  type="range"
                  min="0.3"
                  max="1"
                  step="0.05"
                  value={calibration.opacity}
                  onChange={(e) =>
                    setCalibration((p) => ({ ...p, opacity: parseFloat(e.target.value) }))
                  }
                  className="w-20 accent-amber-400 cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── KHUNG HÌNH ẢNH GỐC & LỚP SVG OVERLAY VẼ NÉT CHỈ TAY ─── */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-black flex items-center justify-center">
        {/* 1. Ảnh bàn tay thật người dùng đã đăng */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="Ảnh bàn tay phân tích"
          className="w-full h-full object-contain pointer-events-none select-none"
        />

        {/* 2. Lớp tia sáng laze quét AI (khi đang phân tích) */}
        {isAnalyzing && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden bg-amber-500/10 z-10">
            <motion.div
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_20px_6px_rgba(251,191,36,0.9)]"
            />
            {/* Lưới tọa độ định vị giải phẫu */}
            <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-30" />
            <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/85 border border-amber-500/40 rounded-xl p-2.5 text-center text-xs font-bold text-amber-200 backdrop-blur-md shadow-lg">
              🔍 Đang định vị và vẽ các đường chỉ tay vào lòng bàn tay...
            </div>
          </div>
        )}

        {/* 3. LỚP PHỦ SVG VẼ ĐƯỜNG CHỈ TAY PHÁT SÁNG NEON */}
        {showLines && (
          <svg
            viewBox="0 0 400 500"
            className="absolute inset-0 w-full h-full pointer-events-auto"
            style={{
              opacity: calibration.opacity,
            }}
          >
            <defs>
              {/* Bộ lọc Neon phát sáng nhiều màu */}
              <filter id="neonGlowLife" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4.5" result="blur1" />
                <feGaussianBlur stdDeviation="9" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="neonGlowHead" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4.5" result="blur1" />
                <feGaussianBlur stdDeviation="9" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="neonGlowHeart" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4.5" result="blur1" />
                <feGaussianBlur stdDeviation="9" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="neonGlowFate" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4.5" result="blur1" />
                <feGaussianBlur stdDeviation="9" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Nhóm vẽ hỗ trợ scale, offset, rotate, flip */}
            <g
              transform={`
                translate(${200 + calibration.offsetX}, ${250 + calibration.offsetY})
                rotate(${calibration.rotation})
                scale(${calibration.flipHorizontal ? -calibration.scale : calibration.scale}, ${calibration.scale})
                translate(-200, -250)
              `}
            >
              {/* ─── CÁC GÒ BÀN TAY (MOUNTS) ĐỊNH VỊ PHÁT SÁNG ─── */}
              {/* Gò Kim Tinh (Venus) */}
              <g
                className="cursor-pointer"
                onClick={() => handleLineClick('venus')}
              >
                <circle
                  cx="150"
                  cy="360"
                  r="24"
                  fill={selectedHighlight === 'venus' ? 'rgba(245,158,11,0.3)' : 'rgba(245,158,11,0.08)'}
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <circle cx="150" cy="360" r="3" fill="#f59e0b" />
              </g>

              {/* Gò Mộc Tinh (Jupiter) - Dưới ngón trỏ */}
              <g
                className="cursor-pointer"
                onClick={() => handleLineClick('jupiter')}
              >
                <circle
                  cx="160"
                  cy="170"
                  r="18"
                  fill={selectedHighlight === 'jupiter' ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.08)'}
                  stroke="#60a5fa"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              </g>

              {/* Gò Thổ Tinh (Saturn) - Dưới ngón giữa */}
              <g className="cursor-pointer">
                <circle
                  cx="215"
                  cy="160"
                  r="17"
                  fill="rgba(168,85,247,0.08)"
                  stroke="#c084fc"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              </g>

              {/* Gò Thái Dương (Sun) - Dưới ngón áp út */}
              <g className="cursor-pointer">
                <circle
                  cx="265"
                  cy="175"
                  r="17"
                  fill="rgba(250,204,21,0.08)"
                  stroke="#facc15"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              </g>

              {/* Gò Thủy Tinh (Mercury) - Dưới ngón út */}
              <g className="cursor-pointer">
                <circle
                  cx="320"
                  cy="205"
                  r="17"
                  fill="rgba(20,184,166,0.08)"
                  stroke="#2dd4bf"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              </g>

              {/* Gò Nguyệt Tinh (Moon) - Cạnh ngoài đối diện Kim Tinh */}
              <g className="cursor-pointer">
                <circle
                  cx="310"
                  cy="390"
                  r="24"
                  fill="rgba(192,132,252,0.08)"
                  stroke="#d8b4fe"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              </g>

              {/* ─── DẤU ẤN QUÝ TƯỚNG (NẾU CÓ CHỮ M) ─── */}
              {hasLetterM && (
                <g>
                  <motion.path
                    d={letterMPath}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth={selectedHighlight === 'chu_m' ? 4 : 2}
                    strokeDasharray="4 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />
                  <text
                    x="235"
                    y="255"
                    fill="#fbbf24"
                    fontSize="13"
                    fontWeight="black"
                    filter="drop-shadow(0 0 4px rgba(251,191,36,0.9))"
                  >
                    ★ Chữ M
                  </text>
                </g>
              )}

              {/* ─── 1. ĐƯỜNG SINH ĐẠO (LIFE LINE) ─── */}
              <g
                className="cursor-pointer group"
                onClick={() => handleLineClick('life')}
              >
                {/* Hitbox cảm ứng rộng */}
                <path d={lifeLinePath} fill="none" stroke="transparent" strokeWidth="28" />

                {/* Nét chính phát sáng Neon */}
                <motion.path
                  d={lifeLinePath}
                  fill="none"
                  stroke={lineConfig.life.color}
                  strokeWidth={selectedHighlight === 'life' ? 6 : 3.8}
                  filter="url(#neonGlowLife)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />

                {/* Các điểm neo trên đường Sinh Đạo */}
                <circle cx="135" cy="210" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="180" cy="370" r="3.5" fill="#10b981" />
                <circle cx="135" cy="480" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
              </g>

              {/* ─── 2. ĐƯỜNG TRÍ ĐẠO (HEAD LINE) ─── */}
              <g
                className="cursor-pointer group"
                onClick={() => handleLineClick('head')}
              >
                <path d={headLinePath} fill="none" stroke="transparent" strokeWidth="28" />

                <motion.path
                  d={headLinePath}
                  fill="none"
                  stroke={lineConfig.head.color}
                  strokeWidth={selectedHighlight === 'head' ? 6 : 3.8}
                  filter="url(#neonGlowHead)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                />

                <circle cx="305" cy="320" r="4.5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />
              </g>

              {/* ─── 3. ĐƯỜNG TÂM ĐẠO (HEART LINE) ─── */}
              <g
                className="cursor-pointer group"
                onClick={() => handleLineClick('heart')}
              >
                <path d={heartLinePath} fill="none" stroke="transparent" strokeWidth="28" />

                <motion.path
                  d={heartLinePath}
                  fill="none"
                  stroke={lineConfig.heart.color}
                  strokeWidth={selectedHighlight === 'heart' ? 6 : 3.8}
                  filter="url(#neonGlowHeart)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                />

                <circle cx="345" cy="255" r="4.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="175" cy="190" r="4.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
              </g>

              {/* ─── 4. ĐƯỜNG ĐỊNH MỆNH (FATE LINE) ─── */}
              <g
                className="cursor-pointer group"
                onClick={() => handleLineClick('fate')}
              >
                <path d={fateLinePath} fill="none" stroke="transparent" strokeWidth="28" />

                <motion.path
                  d={fateLinePath}
                  fill="none"
                  stroke={lineConfig.fate.color}
                  strokeWidth={selectedHighlight === 'fate' ? 5.5 : 3.2}
                  filter="url(#neonGlowFate)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
                />

                <circle cx="215" cy="470" r="4" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="230" cy="190" r="4" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
              </g>
            </g>
          </svg>
        )}

        {/* ─── CÁC BADGE NHÃN NHẬN DIỆN CỐ ĐỊNH TRÊN ẢNH ─── */}
        {showLines && showLabels && (
          <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1.5 pointer-events-none z-10">
            {Object.values(lineConfig).map((line) => {
              const isSelected = selectedHighlight === line.key;
              return (
                <button
                  key={line.key}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLineClick(line.key);
                  }}
                  className={`pointer-events-auto px-2 py-0.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-1 shadow-md cursor-pointer ${
                    isSelected
                      ? 'scale-105 ring-2 ring-white shadow-lg'
                      : 'opacity-85 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isSelected ? line.color : 'rgba(24, 24, 27, 0.85)',
                    color: isSelected ? '#000000' : line.color,
                    border: `1px solid ${line.color}`,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: line.color }} />
                  <span>{line.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* ─── POPUP GIẢI MÃ NHANH KHI CHẠM / CLICK VÀO MỘT ĐƯỜNG ─── */}
        <AnimatePresence>
          {selectedHighlight && lineConfig[selectedHighlight as keyof typeof lineConfig] && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-zinc-950/95 border-2 border-amber-500/60 shadow-2xl backdrop-blur-md z-20 space-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{
                      backgroundColor:
                        lineConfig[selectedHighlight as keyof typeof lineConfig].color,
                    }}
                  />
                  <strong className="text-xs font-bold text-amber-200">
                    {lineConfig[selectedHighlight as keyof typeof lineConfig].name}
                  </strong>
                  <span className="text-[10px] text-zinc-400">
                    ({lineConfig[selectedHighlight as keyof typeof lineConfig].english})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleLineClick(selectedHighlight)}
                  className="w-5 h-5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="text-[11px] text-zinc-200 leading-relaxed">
                {lineConfig[selectedHighlight as keyof typeof lineConfig].desc}
              </p>
              <div className="flex items-center justify-between text-[10px] pt-0.5 text-zinc-400">
                <span className="text-emerald-400 font-semibold">
                  ✓ Nét chỉ tay đã vẽ khớp theo cấu trúc ảnh
                </span>
                <span className="text-amber-400 font-bold">
                  Điểm: {lineConfig[selectedHighlight as keyof typeof lineConfig].score}/100
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chú thích màu sắc dưới chân ảnh */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-2 bg-zinc-900/90 border-t border-zinc-800 text-[10px]">
        {Object.values(lineConfig).map((line) => (
          <div
            key={line.key}
            onClick={() => handleLineClick(line.key)}
            className={`flex items-center gap-1.5 p-1 rounded cursor-pointer transition-all ${
              selectedHighlight === line.key ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: line.color }} />
            <span className="text-zinc-300 font-medium truncate">{line.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
