'use client';
import { motion } from 'framer-motion';
import type { ZiweiChart } from '@/lib/ziwei/types';
import { detectPatterns } from '@/lib/ziwei/patterns';
import { getPatternVi, PALACE_VI, getPatternDescriptionVi, translateCondition, translatePatternSource } from '@/lib/ziwei/vietnamese';

const LevelStyle = {
  excellent: { dot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]', label: 'text-amber-400 font-black', badge: 'text-amber-300 bg-amber-500/15 border-amber-500/40 font-bold', levelText: 'Đại Cát · 大吉' },
  good:      { dot: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]',   label: 'text-sky-400 font-black',   badge: 'text-sky-300 bg-sky-500/15 border-sky-500/40 font-bold', levelText: 'Cát Cách · 吉' },
  neutral:   { dot: 'bg-stone-400', label: 'text-stone-300 font-bold', badge: 'text-stone-300 bg-stone-500/15 border-stone-500/30', levelText: 'Bình Cách · 平' },
  caution:   { dot: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]', label: 'text-rose-400 font-black', badge: 'text-rose-300 bg-rose-500/15 border-rose-500/40 font-bold', levelText: 'Cần Phòng · 需防' },
};

export default function PatternsCard({ chart }: { chart: ZiweiChart }) {
  const patterns = detectPatterns(chart);
  if (patterns.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card-glass rounded-xl p-4 mb-4"
    >
      <div className="text-[12px] tracking-wide mb-3 flex items-center justify-between" style={{ color: 'var(--t-faint)' }}>
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-sm">◉</span>
          <span className="font-extrabold text-amber-400 text-xs sm:text-sm tracking-wider">NHẬN DIỆN CÁCH CỤC</span>
          <span className="text-[10px] text-stone-400 font-medium">· Chuẩn Cổ Tịch</span>
        </div>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/15 text-amber-300 font-bold">
          {patterns.length} cách cục
        </span>
      </div>

      <div className="space-y-3">
        {patterns.map((p, i) => {
          const st = LevelStyle[p.level];
          const patInfo = getPatternVi(p.name);
          const descVi = getPatternDescriptionVi(p.name, p.description);

          return (
            <motion.div
              key={`${p.name}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="card-inner rounded-xl p-3.5 border border-stone-800/60 hover:border-amber-500/30 transition-all"
            >
              {/* Tiêu đề Cách Cục: Tiếng Việt TO RÕ, ĐẬM ĐÀ */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-start gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${st.dot}`} />
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className={`text-[15px] sm:text-[16px] font-black tracking-wide ${st.label}`}>
                        {patInfo.vi}
                      </span>
                      <span className="text-[10px] text-stone-400 font-normal">
                        ({patInfo.zh})
                      </span>
                    </div>
                    {patInfo.note && (
                      <div className="text-[11px] text-amber-400/90 font-medium italic mt-0.5">
                        {patInfo.note}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className={`text-[9px] px-2 py-0.5 rounded border ${st.badge}`}>
                    {st.levelText}
                  </span>
                  <div className="flex gap-1">
                    {p.palaces.slice(0, 2).map(pa => {
                      const palaceShort = PALACE_VI[pa]?.short || pa.replace('宫', '');
                      return (
                        <span key={pa} className="text-[9px] px-1.5 py-px rounded bg-white/10 border border-white/10 text-stone-200 font-semibold">
                          Cung {palaceShort}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Diễn giải chi tiết Tiếng Việt TO RÕ */}
              <p className="text-[12px] leading-relaxed pl-5 mb-2.5 text-stone-200">
                {descVi}
              </p>

              {/* Điều kiện thành cách / phá cách Tiếng Việt */}
              {p.conditions && (
                <div className="pl-5 space-y-1.5 pt-2 border-t border-white/5">
                  {p.conditions.required.length > 0 && (
                    <div className="text-[11px] leading-relaxed flex items-baseline gap-1.5 text-stone-300">
                      <span className="font-bold text-amber-400 flex-shrink-0">Bắt buộc:</span>
                      <span className="font-medium text-stone-200">{p.conditions.required.map(translateCondition).join(' · ')}</span>
                    </div>
                  )}
                  {p.conditions.bonus && p.conditions.bonus.length > 0 && (
                    <div className="text-[11px] leading-relaxed flex items-baseline gap-1.5 text-stone-300">
                      <span className="font-bold text-emerald-400 flex-shrink-0">Gia cát:</span>
                      <span className="text-emerald-300">{p.conditions.bonus.map(translateCondition).join(' · ')}</span>
                    </div>
                  )}
                  {p.conditions.breaking && p.conditions.breaking.length > 0 && (
                    <div className="text-[11px] leading-relaxed flex items-baseline gap-1.5 text-stone-300">
                      <span className="font-bold text-rose-400 flex-shrink-0">Phá cách:</span>
                      <span className="text-rose-300">{p.conditions.breaking.map(translateCondition).join(' · ')}</span>
                    </div>
                  )}
                </div>
              )}

              {p.source && (
                <div className="text-[10px] mt-2 pl-5 flex items-center gap-1.5 text-stone-400">
                  <span className="text-amber-500">📜 Cổ tịch:</span>
                  <span className="italic text-stone-300">{translatePatternSource(p.source)}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
