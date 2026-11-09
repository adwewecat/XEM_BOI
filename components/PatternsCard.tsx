'use client';
import { motion } from 'framer-motion';
import type { ZiweiChart } from '@/lib/ziwei/types';
import { detectPatterns } from '@/lib/ziwei/patterns';
import { getPatternVi, PALACE_VI } from '@/lib/ziwei/vietnamese';

const LevelStyle = {
  excellent: { dot: 'bg-amber-400', label: 'text-amber-500', badge: 'text-amber-500 bg-amber-500/10 border-amber-500/25', levelText: 'Đại Cát · 大吉' },
  good:      { dot: 'bg-sky-400',   label: 'text-sky-500',   badge: 'text-sky-500 bg-sky-500/10 border-sky-500/25', levelText: 'Cát Cách · 吉' },
  neutral:   { dot: 'bg-slate-400', label: 'text-slate-400', badge: 'text-slate-400 bg-slate-500/10 border-slate-500/20', levelText: 'Bình Cách · 平' },
  caution:   { dot: 'bg-orange-500', label: 'text-orange-500', badge: 'text-orange-500 bg-orange-500/10 border-orange-500/25', levelText: 'Phòng Bị · 需防' },
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
      <div className="text-[11px] tracking-wide mb-3 flex items-center justify-between" style={{ color: 'var(--t-faint)' }}>
        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--t-gold)' }}>◉</span>
          <span className="font-bold text-amber-500">NHẬN DIỆN CÁCH CỤC</span>
          <span className="text-[9px] opacity-60">格局识别 · Chuẩn Cổ Tịch</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-400 font-medium">
          {patterns.length} cách cục
        </span>
      </div>

      <div className="space-y-2.5">
        {patterns.map((p, i) => {
          const st = LevelStyle[p.level];
          const patInfo = getPatternVi(p.name);

          return (
            <motion.div
              key={`${p.name}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="card-inner rounded-lg p-3"
            >
              {/* Tiêu đề Cách Cục: Tiếng Việt to rõ + Tiếng Trung nhỏ bên dưới */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-start gap-2">
                  <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${st.dot}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[13px] font-bold tracking-wide ${st.label}`}>
                        {patInfo.vi}
                      </span>
                      <span className="text-[10px] opacity-60 font-normal">
                        ({patInfo.zh})
                      </span>
                    </div>
                    {patInfo.note && (
                      <div className="text-[10px] text-amber-400/80 italic mt-0.5">
                        {patInfo.note}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded border font-medium ${st.badge}`}>
                    {st.levelText}
                  </span>
                  <div className="flex gap-1">
                    {p.palaces.slice(0, 2).map(pa => {
                      const palaceShort = PALACE_VI[pa]?.short || pa.replace('宫', '');
                      return (
                        <span key={pa} className="text-[8px] px-1.5 py-px rounded bg-white/5 border border-white/10 text-stone-300">
                          {palaceShort}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Diễn giải chi tiết */}
              <p className="text-[11px] leading-relaxed pl-4 mb-2" style={{ color: 'var(--t-text2)' }}>
                {p.description}
              </p>

              {/* Điều kiện thành cách / phá cách */}
              {p.conditions && (
                <div className="pl-4 space-y-1 pt-1 border-t border-white/5">
                  {p.conditions.required.length > 0 && (
                    <div className="text-[10px] leading-relaxed flex items-baseline gap-1.5" style={{ color: 'var(--t-text2)' }}>
                      <span className="font-semibold text-amber-400 flex-shrink-0">Bắt buộc (必须):</span>
                      <span>{p.conditions.required.join('、')}</span>
                    </div>
                  )}
                  {p.conditions.bonus && p.conditions.bonus.length > 0 && (
                    <div className="text-[10px] leading-relaxed flex items-baseline gap-1.5" style={{ color: 'var(--t-text2)' }}>
                      <span className="font-semibold text-emerald-400 flex-shrink-0">Gia cát (加分):</span>
                      <span>{p.conditions.bonus.join('、')}</span>
                    </div>
                  )}
                  {p.conditions.breaking && p.conditions.breaking.length > 0 && (
                    <div className="text-[10px] leading-relaxed flex items-baseline gap-1.5" style={{ color: 'var(--t-text2)' }}>
                      <span className="font-semibold text-orange-400 flex-shrink-0">Phá cách (破格):</span>
                      <span>{p.conditions.breaking.join('、')}</span>
                    </div>
                  )}
                </div>
              )}

              {p.source && (
                <div className="text-[9px] mt-2 pl-4 flex items-center gap-1" style={{ color: 'var(--t-faint)', opacity: 0.7 }}>
                  <span>📜 Xuất xứ cổ tịch:</span>
                  <span>{p.source}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
