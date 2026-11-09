'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DrawnCard } from '@/lib/metaphysics/tarot';

interface VisualTarotCardProps {
  drawnCard: DrawnCard;
  index?: number;
}

export default function VisualTarotCard({ drawnCard, index = 0 }: VisualTarotCardProps) {
  const { card, isReversed, positionName } = drawnCard;
  const reading = isReversed ? card.reversed : card.upright;
  const keywords = isReversed ? card.keywordsReversed : card.keywordsUpright;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className="card-glass p-5 rounded-2xl border border-amber-500/30 bg-zinc-950/80 shadow-2xl space-y-4 flex flex-col justify-between"
    >
      {/* Vị trí trong trải bài */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
          {positionName}
        </span>
        <div
          className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
            isReversed
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}
        >
          {isReversed ? '🔄 Ngược (Reversed)' : '✨ Xuôi (Upright)'}
        </div>
      </div>

      {/* THẺ BÀI TAROT NGHỆ THUẬT */}
      <div className="relative mx-auto w-full max-w-[240px] aspect-[1/1.6] rounded-2xl border-2 border-amber-400/60 p-3 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 shadow-xl overflow-hidden flex flex-col justify-between items-center group">
        {/* Hào quang nền */}
        <div
          className={`absolute inset-0 opacity-20 bg-gradient-to-br ${card.colorTheme} blur-xl group-hover:opacity-30 transition-opacity`}
        />

        {/* Khung viền hoàng kim cổ điển */}
        <div className="absolute inset-1.5 border border-amber-400/30 rounded-xl pointer-events-none" />

        {/* Đầu lá bài: Số La Mã & Nguyên tố */}
        <div className="w-full flex items-center justify-between z-10 text-[11px] font-mono text-amber-300 px-1">
          <span className="font-serif font-black text-sm">{card.roman}</span>
          <span className="text-[10px] text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700">
            {card.element} · {card.planetOrZodiac}
          </span>
        </div>

        {/* Biểu tượng trung tâm với hiệu ứng lộn ngược nếu là reversed */}
        <motion.div
          animate={{ rotate: isReversed ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          className="my-auto text-center z-10"
        >
          <div className="text-6xl sm:text-7xl mb-2 filter drop-shadow-md select-none">
            {card.symbol}
          </div>
          <div className="text-xs text-amber-300/80 tracking-widest uppercase font-mono">
            {card.name}
          </div>
        </motion.div>

        {/* Chân lá bài: Tên tiếng Việt */}
        <div className="w-full text-center z-10 pb-1">
          <h3 className="text-base font-black text-amber-200 tracking-wide">
            {card.nameVi}
          </h3>
          <span className="text-[9px] text-zinc-400 uppercase tracking-widest block -mt-0.5">
            Arcana {card.roman}
          </span>
        </div>
      </div>

      {/* TỪ KHÓA NĂNG LƯỢNG */}
      <div className="flex flex-wrap gap-1.5 justify-center pt-1">
        {keywords.map((kw, i) => (
          <span
            key={i}
            className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 border border-amber-500/20 text-amber-300"
          >
            {kw}
          </span>
        ))}
      </div>

      {/* LUẬN GIẢI CHI TIẾT */}
      <div className="space-y-2 text-xs text-zinc-300 leading-relaxed pt-2 border-t border-zinc-800/80">
        <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
          <strong className="text-amber-300 block mb-1">🌟 Thông Điệp Cốt Lõi:</strong>
          {reading.summary}
        </div>

        <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
          <strong className="text-sky-300 block mb-0.5">💼 Công Việc:</strong>
          {reading.career}
        </div>

        <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
          <strong className="text-rose-300 block mb-0.5">❤️ Tình Duyên:</strong>
          {reading.love}
        </div>

        <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
          <strong className="text-emerald-400 block mb-0.5">💰 Tài Chính:</strong>
          {reading.finance}
        </div>

        <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
          <strong className="text-yellow-400 block mb-0.5">🧘 Lời Khuyên Vũ Trụ:</strong>
          {reading.advice}
        </div>
      </div>
    </motion.div>
  );
}
