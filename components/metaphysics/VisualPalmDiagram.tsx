'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HandElement, PalmInput } from '@/lib/metaphysics/palmistry';

interface VisualPalmDiagramProps {
  input: PalmInput;
  onChangeInput?: (newInput: Partial<PalmInput>) => void;
  interactive?: boolean;
}

export default function VisualPalmDiagram({
  input,
  onChangeInput,
  interactive = true,
}: VisualPalmDiagramProps) {
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  // Ánh xạ màu sắc cho các đường chỉ tay
  const lineColors = {
    life: '#10b981',   // Xanh lục ngọc (Sinh mệnh)
    head: '#06b6d4',   // Xanh ngọc lam cyan (Trí tuệ)
    heart: '#f43f5e',  // Đỏ hồng rose (Tâm đạo)
    fate: '#a855f7',   // Tím thạch anh (Định mệnh)
  };

  const lineTitles: Record<string, { name: string; desc: string }> = {
    life: { name: 'Đường Sinh Đạo (Life Line)', desc: 'Chủ về sinh lực thể chất, sức đề kháng, tuổi thọ và biến chuyển cuộc sống.' },
    head: { name: 'Đường Trí Đạo (Head Line)', desc: 'Chủ về năng lực tư duy, học vấn, khả năng sáng tạo và óc phán đoán.' },
    heart: { name: 'Đường Tâm Đạo (Heart Line)', desc: 'Chủ về cảm xúc nội tâm, tình duyên, đời sống hôn nhân và lòng nhân ái.' },
    fate: { name: 'Đường Định Mệnh (Fate Line)', desc: 'Chủ về sự nghiệp, danh vọng, cơ hội quý nhân và thăng trầm công danh.' },
    venus: { name: 'Gò Kim Tinh (Venus Mount)', desc: 'Dưới gốc ngón cái: Chủ về sinh lực, tình cảm ấm áp, sức cuốn hút và phúc thọ.' },
    jupiter: { name: 'Gò Mộc Tinh (Jupiter Mount)', desc: 'Dưới ngón trỏ: Chủ về tham vọng, khả năng lãnh đạo, lòng tự tôn và uy quyền.' },
    sun: { name: 'Gò Thái Dương (Sun Mount)', desc: 'Dưới ngón áp út: Chủ về tài năng nghệ thuật, danh tiếng vang dội và tài lộc dồi dào.' },
    mercury: { name: 'Gò Thủy Tinh (Mercury Mount)', desc: 'Dưới ngón út: Chủ về óc kinh doanh, tài ngoại giao giao tiếp và ứng biến.' },
    moon: { name: 'Gò Nguyệt Tinh (Moon Mount)', desc: 'Đối diện gò Kim Tinh: Chủ về trực giác, trí tưởng tượng và cơ duyên xuất ngoại.' },
  };

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[400px] mx-auto flex flex-col items-center">
      {/* Khung chứa SVG Bàn Tay */}
      <div className="relative w-full aspect-[4/5] rounded-2xl p-4 bg-zinc-950/80 border border-amber-500/30 backdrop-blur-md shadow-2xl flex items-center justify-center overflow-hidden">
        {/* Nền hào quang bàn tay */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-purple-500/10 to-transparent" />

        <svg
          viewBox="0 0 400 500"
          className="w-full h-full select-none"
          style={{ filter: 'drop-shadow(0 0 16px rgba(212,168,67,0.18))' }}
        >
          <defs>
            {/* Hiệu ứng phát sáng Neon */}
            <filter id="neonGlowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="neonGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="neonGlowRed" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="neonGlowPurple" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ─── Hình dáng Bàn Tay Nghệ Thuật (Stylized Palm Contour) ─── */}
          <path
            d="M 120 460
               C 90 440, 70 380, 75 320
               C 65 290, 50 240, 60 190
               C 68 150, 95 160, 110 200
               C 112 170, 115 110, 135 80
               C 150 60, 170 70, 170 120
               C 175 90, 185 40, 205 30
               C 225 25, 235 60, 230 115
               C 240 85, 255 65, 275 60
               C 290 60, 295 90, 285 145
               C 300 125, 320 120, 335 130
               C 345 145, 340 180, 325 240
               C 335 300, 330 380, 310 430
               C 290 460, 250 480, 200 480
               C 150 480, 135 470, 120 460 Z"
            fill="rgba(20, 25, 45, 0.75)"
            stroke="rgba(212, 168, 67, 0.45)"
            strokeWidth="2.5"
            strokeDasharray="none"
          />

          {/* Vòng Cổ Tay (Ngấn Cổ Tay Cát Tường - Rascette Lines) */}
          <path d="M 130 470 Q 200 490 270 470" fill="none" stroke="rgba(212, 168, 67, 0.35)" strokeWidth="1.5" />
          <path d="M 135 480 Q 200 500 265 480" fill="none" stroke="rgba(212, 168, 67, 0.25)" strokeWidth="1.5" />

          {/* ─── Ngũ Đại Gò Bàn Tay (Các Điểm Trực Quan) ─── */}
          {/* Gò Kim Tinh (Venus) - Dưới ngón cái */}
          <g
            className="cursor-pointer transition-transform hover:scale-110"
            onMouseEnter={() => setActiveHighlight('venus')}
            onMouseLeave={() => setActiveHighlight(null)}
          >
            <circle cx="125" cy="360" r="26" fill={activeHighlight === 'venus' ? 'rgba(212,168,67,0.25)' : 'rgba(212,168,67,0.08)'} stroke="rgba(212,168,67,0.4)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="125" y="364" textAnchor="middle" fill="#d4a843" fontSize="13" fontWeight="bold">♀ Kim</text>
          </g>

          {/* Gò Mộc Tinh (Jupiter) - Dưới ngón trỏ */}
          <g
            className="cursor-pointer transition-transform hover:scale-110"
            onMouseEnter={() => setActiveHighlight('jupiter')}
            onMouseLeave={() => setActiveHighlight(null)}
          >
            <circle cx="150" cy="205" r="20" fill={activeHighlight === 'jupiter' ? 'rgba(96,165,250,0.3)' : 'rgba(96,165,250,0.08)'} stroke="rgba(96,165,250,0.4)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="150" y="209" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">♃ Mộc</text>
          </g>

          {/* Gò Thái Dương (Sun) - Dưới ngón áp út */}
          <g
            className="cursor-pointer transition-transform hover:scale-110"
            onMouseEnter={() => setActiveHighlight('sun')}
            onMouseLeave={() => setActiveHighlight(null)}
          >
            <circle cx="260" cy="200" r="20" fill={activeHighlight === 'sun' ? 'rgba(250,204,21,0.3)' : 'rgba(250,204,21,0.08)'} stroke="rgba(250,204,21,0.4)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="260" y="204" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">☉ Nhật</text>
          </g>

          {/* Gò Thủy Tinh (Mercury) - Dưới ngón út */}
          <g
            className="cursor-pointer transition-transform hover:scale-110"
            onMouseEnter={() => setActiveHighlight('mercury')}
            onMouseLeave={() => setActiveHighlight(null)}
          >
            <circle cx="305" cy="235" r="18" fill={activeHighlight === 'mercury' ? 'rgba(45,212,191,0.3)' : 'rgba(45,212,191,0.08)'} stroke="rgba(45,212,191,0.4)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="305" y="239" textAnchor="middle" fill="#5eead4" fontSize="11" fontWeight="bold">☿ Thủy</text>
          </g>

          {/* Gò Nguyệt Tinh (Moon) - Cạnh ngoài đối diện Kim Tinh */}
          <g
            className="cursor-pointer transition-transform hover:scale-110"
            onMouseEnter={() => setActiveHighlight('moon')}
            onMouseLeave={() => setActiveHighlight(null)}
          >
            <circle cx="280" cy="380" r="26" fill={activeHighlight === 'moon' ? 'rgba(192,132,252,0.3)' : 'rgba(192,132,252,0.08)'} stroke="rgba(192,132,252,0.4)" strokeWidth="1" strokeDasharray="3,3" />
            <text x="280" y="384" textAnchor="middle" fill="#d8b4fe" fontSize="13" fontWeight="bold">☽ Nguyệt</text>
          </g>

          {/* ─── 4 ĐƯỜNG CHỈ TAY CHÍNH (INTERACTIVE GLOWING PATHS) ─── */}

          {/* 1. ĐƯỜNG SINH ĐẠO (LIFE LINE) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setActiveHighlight('life')}
            onMouseLeave={() => setActiveHighlight(null)}
          >
            {/* Vùng cảm ứng rộng */}
            <path
              d="M 115 250 C 135 270, 165 310, 160 380 C 158 420, 140 455, 130 465"
              fill="none"
              stroke="transparent"
              strokeWidth="24"
            />
            {/* Đường hiển thị */}
            <motion.path
              d="M 115 250 C 135 270, 165 310, 160 380 C 158 420, 140 455, 130 465"
              fill="none"
              stroke={lineColors.life}
              strokeWidth={activeHighlight === 'life' ? 5 : 3.5}
              filter="url(#neonGlowGreen)"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <text x="120" y="445" fill={lineColors.life} fontSize="10" fontWeight="bold">Sinh Đạo</text>
          </g>

          {/* 2. ĐƯỜNG TRÍ ĐẠO (HEAD LINE) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setActiveHighlight('head')}
            onMouseLeave={() => setActiveHighlight(null)}
          >
            <path
              d="M 115 250 C 150 255, 210 275, 260 325"
              fill="none"
              stroke="transparent"
              strokeWidth="24"
            />
            <motion.path
              d="M 115 250 C 150 255, 210 275, 260 325"
              fill="none"
              stroke={lineColors.head}
              strokeWidth={activeHighlight === 'head' ? 5 : 3.5}
              filter="url(#neonGlowCyan)"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            />
            <text x="265" y="335" fill={lineColors.head} fontSize="10" fontWeight="bold">Trí Đạo</text>
          </g>

          {/* 3. ĐƯỜNG TÂM ĐẠO (HEART LINE) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setActiveHighlight('heart')}
            onMouseLeave={() => setActiveHighlight(null)}
          >
            <path
              d="M 315 260 C 270 240, 200 230, 165 210"
              fill="none"
              stroke="transparent"
              strokeWidth="24"
            />
            <motion.path
              d="M 315 260 C 270 240, 200 230, 165 210"
              fill="none"
              stroke={lineColors.heart}
              strokeWidth={activeHighlight === 'heart' ? 5 : 3.5}
              filter="url(#neonGlowRed)"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            />
            <text x="145" y="195" fill={lineColors.heart} fontSize="10" fontWeight="bold">Tâm Đạo</text>
          </g>

          {/* 4. ĐƯỜNG ĐỊNH MỆNH (FATE LINE) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setActiveHighlight('fate')}
            onMouseLeave={() => setActiveHighlight(null)}
          >
            <path
              d="M 205 450 C 205 380, 208 300, 205 215"
              fill="none"
              stroke="transparent"
              strokeWidth="24"
            />
            <motion.path
              d="M 205 450 C 205 380, 208 300, 205 215"
              fill="none"
              stroke={lineColors.fate}
              strokeWidth={activeHighlight === 'fate' ? 5 : 3}
              filter="url(#neonGlowPurple)"
              strokeDasharray="4,2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
            />
            <text x="212" y="225" fill={lineColors.fate} fontSize="10" fontWeight="bold">Định Mệnh</text>
          </g>
        </svg>

        {/* Chú thích nhanh khi hover vào đường hoặc gò */}
        <AnimatePresence>
          {activeHighlight && lineTitles[activeHighlight] && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-zinc-900/95 border border-amber-500/40 text-left backdrop-blur-md shadow-xl pointer-events-none"
            >
              <div className="text-xs font-bold text-amber-300">
                {lineTitles[activeHighlight].name}
              </div>
              <div className="text-[11px] text-zinc-300 leading-tight mt-0.5">
                {lineTitles[activeHighlight].desc}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend danh sách các đường chỉ tay */}
      <div className="grid grid-cols-2 gap-2 mt-3 w-full">
        <button
          type="button"
          onClick={() => setActiveHighlight('life')}
          className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs transition-all ${
            activeHighlight === 'life' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' : 'bg-zinc-900/40 border-zinc-800 text-zinc-300 hover:border-zinc-700'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 shrink-0" />
          <span className="font-semibold truncate">Đường Sinh Đạo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveHighlight('head')}
          className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs transition-all ${
            activeHighlight === 'head' ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200' : 'bg-zinc-900/40 border-zinc-800 text-zinc-300 hover:border-zinc-700'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-sm shadow-cyan-500/50 shrink-0" />
          <span className="font-semibold truncate">Đường Trí Đạo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveHighlight('heart')}
          className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs transition-all ${
            activeHighlight === 'heart' ? 'bg-rose-950/60 border-rose-500 text-rose-200' : 'bg-zinc-900/40 border-zinc-800 text-zinc-300 hover:border-zinc-700'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50 shrink-0" />
          <span className="font-semibold truncate">Đường Tâm Đạo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveHighlight('fate')}
          className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs transition-all ${
            activeHighlight === 'fate' ? 'bg-purple-950/60 border-purple-500 text-purple-200' : 'bg-zinc-900/40 border-zinc-800 text-zinc-300 hover:border-zinc-700'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50 shrink-0" />
          <span className="font-semibold truncate">Đường Định Mệnh</span>
        </button>
      </div>
    </div>
  );
}

