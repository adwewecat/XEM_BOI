'use client';
import { motion } from 'framer-motion';
import type { ZiweiChart } from '@/lib/ziwei/types';
import { BRANCHES, STEMS } from '@/lib/ziwei/constants';
import { detectPatterns, getMingGongSummary } from '@/lib/ziwei/patterns';
import { getStarName, PALACE_VI, BRANCHES_VI, STEMS_VI, getPatternVi, getJuName, getSiHua, getPatternDescriptionVi, translateCondition, translatePatternSource } from '@/lib/ziwei/vietnamese';

interface ChartSummaryProps {
  chart: ZiweiChart;
}

const PatternLevelStyle = {
  excellent: { dot: 'bg-amber-400', label: 'text-amber-500', badge: 'text-amber-500 bg-amber-500/10 border-amber-500/25' },
  good: { dot: 'bg-sky-400', label: 'text-sky-500', badge: 'text-sky-500 bg-sky-500/10 border-sky-500/25' },
  neutral: { dot: 'bg-slate-400', label: 'text-slate-400', badge: 'text-slate-400 bg-slate-500/10 border-slate-500/20' },
  caution: { dot: 'bg-orange-500', label: 'text-orange-500', badge: 'text-orange-500 bg-orange-500/10 border-orange-500/25' },
};

export default function ChartSummary({ chart }: ChartSummaryProps) {
  const patterns = detectPatterns(chart);
  const { stars: mingStars, keywords, nature } = getMingGongSummary(chart);
  const currentDx = chart.daXians[chart.currentDaXianIndex];

  const siHuaSummary: { name: string; siHua: string; palaceName: string }[] = [];
  for (const palace of chart.palaces) {
    for (const star of palace.stars) {
      if (star.siHua) {
        siHuaSummary.push({ name: star.name, siHua: star.siHua, palaceName: palace.name });
      }
    }
  }
  const siHuaOrder = ['禄', '权', '科', '忌'];
  siHuaSummary.sort((a, b) => siHuaOrder.indexOf(a.siHua) - siHuaOrder.indexOf(b.siHua));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="space-y-4"
    >
      {/* ── 命格总览 ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
      <div className="card-glass rounded-xl p-5">
        <div className="text-[10px] tracking-wide mb-4 flex items-center gap-2" style={{ color: 'var(--t-faint)' }}>
          <span style={{ color: 'var(--t-gold)', opacity: 0.8 }}>✦</span>
          <span className="font-bold text-amber-400">TỔNG QUAN MỆNH CÁCH</span>
          <span className="text-[9px] opacity-60">(命格总览)</span>
        </div>

        <div className="flex flex-wrap items-start gap-4">
          <div>
            <div className="text-[10px] mb-1.5" style={{ color: 'var(--t-faint)', opacity: 0.85 }}>Chính Tinh Cung Mệnh</div>
            <div className="flex items-center gap-2">
              {mingStars.length > 0 ? (
                mingStars.map(s => {
                  const st = getStarName(s);
                  return (
                    <div key={s} className="flex flex-col">
                      <span className="font-bold text-lg" style={{ color: 'var(--t-gold)' }}>{st.vi}</span>
                      <span className="text-[9px] opacity-60 -mt-1">{st.zh}</span>
                    </div>
                  );
                })
              ) : (
                <span className="text-sm italic" style={{ color: 'var(--t-faint)' }}>Mệnh Vô Chính Diệu</span>
              )}
            </div>
            {nature && (
              <div className="text-[10px] mt-1 font-medium" style={{ color: 'var(--t-gold)', opacity: 0.7 }}>{nature}</div>
            )}
          </div>

          {keywords.length > 0 && (
            <div>
              <div className="text-[10px] mb-1.5" style={{ color: 'var(--t-faint)', opacity: 0.85 }}>Đặc Tính Cốt Lõi</div>
              <div className="flex flex-wrap gap-1.5">
                {keywords.map(k => (
                  <span key={k} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      color: 'var(--t-gold)',
                      background: 'rgba(212,168,67,0.1)',
                      border: '1px solid rgba(212,168,67,0.25)',
                    }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="ml-auto text-right">
            <div className="text-[10px] mb-1" style={{ color: 'var(--t-faint)', opacity: 0.85 }}>Cục Số · Đại Hạn Hiện Tại</div>
            <div className="text-[11px] font-bold" style={{ color: 'var(--t-text2)' }}>{getJuName(chart.wuxingJuName)}</div>
            {currentDx && (
              <div className="text-[11px] text-purple-400 font-medium mt-0.5">
                {currentDx.startAge}~{currentDx.endAge} tuổi · {PALACE_VI[currentDx.palaceName]?.vi || currentDx.palaceName}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[10px]"
          style={{ borderTop: '1px solid var(--t-border)', color: 'var(--t-faint)' }}>
          <span>Dương Lịch: {chart.birthInfo.day}/{chart.birthInfo.month}/{chart.birthInfo.year}</span>
          <span>
            Âm Lịch: Ngày {chart.lunarInfo.lunarDay} Tháng {chart.lunarInfo.lunarMonth}{chart.lunarInfo.isLeapMonth ? ' (Nhuận)' : ''} Năm {chart.lunarInfo.lunarYear}
          </span>
          <span>Năm {STEMS_VI[chart.lunarInfo.yearStem]} {BRANCHES_VI[chart.lunarInfo.yearBranch]} · Giờ {BRANCHES_VI[chart.birthInfo.hour]}</span>
          <span>Cung Mệnh tại {BRANCHES_VI[chart.mingGongBranch]} · Thân tại {BRANCHES_VI[chart.shenGongBranch]}</span>
        </div>
      </div>
      </motion.div>

      {/* ── 本命四化 ── */}
      {siHuaSummary.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
        <div className="card-glass rounded-xl p-4">
          <div className="text-[10px] tracking-wide mb-3 flex items-center gap-2" style={{ color: 'var(--t-faint)' }}>
            <span style={{ color: 'var(--t-gold)', opacity: 0.8 }}>◆</span>
            <span className="font-bold text-amber-400">TỨ HÓA NGUYÊN BẢN</span>
            <span className="text-[9px] opacity-60">(本命四化)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {siHuaSummary.map(({ name, siHua, palaceName }) => {
              const colors: Record<string, { text: string; bg: string; border: string }> = {
                '禄': { text: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.25)' },
                '权': { text: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.25)' },
                '科': { text: '#facc15', bg: 'rgba(250,204,21,0.08)', border: 'rgba(250,204,21,0.25)' },
                '忌': { text: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.25)' },
              };
              const c = colors[siHua] || colors['禄'];
              const st = getStarName(name);
              const pShort = PALACE_VI[palaceName]?.short || palaceName;
              const huaVi = getSiHua(siHua).vi;

              return (
                <div key={name + siHua}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-[10px]"
                  style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
                >
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold">{st.vi}</span>
                    <span className="text-[8px] opacity-60">({st.zh})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-right">
                    <span style={{ opacity: 0.7 }} className="text-[9px]">{pShort}</span>
                    <span className="font-bold">{huaVi}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </motion.div>
      )}

      {/* ── 格局识别 ── */}
      {patterns.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
        <div className="card-glass rounded-xl p-4">
          <div className="text-[10px] tracking-wide mb-3 flex items-center gap-2" style={{ color: 'var(--t-faint)' }}>
            <span style={{ color: 'var(--t-gold)', opacity: 0.8 }}>◉</span>
            <span className="font-bold text-amber-400">NHẬN DIỆN CÁCH CỤC</span>
            <span className="text-[9px] ml-auto font-medium" style={{ color: 'var(--t-faint)', opacity: 0.85 }}>
              {patterns.length} cách cục (格局)
            </span>
          </div>
          <div className="space-y-2.5">
            {patterns.map((p, i) => {
              const st = PatternLevelStyle[p.level];
              const pat = getPatternVi(p.name);
              const descVi = getPatternDescriptionVi(p.name, p.description);

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="card-inner rounded-lg p-3"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${st.dot}`} />
                    <span className={`text-[13px] font-black ${st.label}`}>{pat.vi}</span>
                    <span className="text-[10px] opacity-60">({pat.zh})</span>
                    <div className="flex gap-1 ml-auto">
                      {p.palaces.slice(0, 2).map(pa => (
                        <span key={pa} className={`text-[9px] px-1.5 py-px rounded border font-semibold ${st.badge}`}>
                          Cung {PALACE_VI[pa]?.short || pa.replace('宫', '')}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] leading-relaxed pl-3.5 mb-1.5 text-stone-200">
                    {descVi}
                  </p>

                  {p.conditions && (
                    <div className="mt-2 pl-3.5 space-y-1">
                      {p.conditions.required.length > 0 && (
                        <div className="text-[10px] leading-relaxed" style={{ color: 'var(--t-text2)', opacity: 0.9 }}>
                          <span className="font-bold text-amber-400">Bắt buộc:</span>
                          <span className="text-stone-300"> {p.conditions.required.map(translateCondition).join(' · ')}</span>
                        </div>
                      )}
                      {p.conditions.bonus && p.conditions.bonus.length > 0 && (
                        <div className="text-[10px] leading-relaxed" style={{ color: 'var(--t-text2)', opacity: 0.9 }}>
                          <span className="font-bold text-emerald-400">Gia cát:</span>
                          <span className="text-emerald-300"> {p.conditions.bonus.map(translateCondition).join(' · ')}</span>
                        </div>
                      )}
                      {p.conditions.breaking && p.conditions.breaking.length > 0 && (
                        <div className="text-[10px] leading-relaxed" style={{ color: 'var(--t-text2)', opacity: 0.9 }}>
                          <span className="font-bold text-orange-400">Phá cách:</span>
                          <span className="text-orange-300"> {p.conditions.breaking.map(translateCondition).join(' · ')}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {p.source && (
                    <div className="text-[10px] mt-1.5 pl-3.5 text-stone-400 italic">
                      📜 Xuất xứ: {translatePatternSource(p.source)}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
        </motion.div>
      )}

      {/* ── Vận Trình Đại Hạn ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.88, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
      <div className="card-glass rounded-xl p-4">
        <div className="text-[10px] tracking-widest mb-3 flex items-center gap-2" style={{ color: 'var(--t-faint)' }}>
          <span className="text-purple-400">◎</span>
          <span className="font-bold text-purple-400">VẬN TRÌNH ĐẠI HẠN (大限运程)</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {chart.daXians.slice(0, 9).map((dx, i) => {
            const isCurrent = i === chart.currentDaXianIndex;
            return (
              <div
                key={i}
                className="text-[10px] px-2 py-2 rounded-lg text-center transition-colors"
                style={{
                  border: isCurrent
                    ? '1px solid rgba(147,51,234,0.4)'
                    : '1px solid var(--t-border)',
                  background: isCurrent ? 'rgba(147,51,234,0.08)' : 'transparent',
                  color: isCurrent ? '#a78bfa' : 'var(--t-faint)',
                }}
              >
                <div className="font-mono tabular-nums">{dx.startAge}~{dx.endAge}</div>
                <div className="text-[9px] mt-0.5" style={{ opacity: 0.7 }}>{dx.palaceName.replace('宫', '')}</div>
              </div>
            );
          })}
        </div>
      </div>
      </motion.div>
    </motion.div>
  );
}
