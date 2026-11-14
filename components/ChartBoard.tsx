'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ZiweiChart, Palace, Star } from '@/lib/ziwei/types';
import { BRANCHES, STEMS } from '@/lib/ziwei/constants';
import { BRANCHES_VI, getJuName, getPalaceName } from '@/lib/ziwei/vietnamese';
import PalaceCell from './PalaceCell';
import TimeNav, { type TimeView, getYearStemIndex, buildSiHuaOverlay } from './TimeNav';

interface ChartBoardProps {
  chart: ZiweiChart;
  selectedBranch?: number | null;
  onStarSelect?: (star: Star, palace: Palace) => void;
  onPalaceSelect?: (palace: Palace | null) => void;
  onSiHuaClick?: (starName: string, siHua: string, view: TimeView) => void;
}

const BRANCH_GRID_POS: Record<number, [number, number]> = {
  5: [1, 1], 6: [1, 2], 7: [1, 3], 8: [1, 4],
  4: [2, 1], 9: [2, 4],
  3: [3, 1], 10: [3, 4],
  2: [4, 1], 1: [4, 2], 0: [4, 3], 11: [4, 4],
};

// 每个地支宫位在网格中的中心坐标（百分比）
const BRANCH_SVG_POS: Record<number, [number, number]> = {
  5: [12.5, 12.5], 6: [37.5, 12.5], 7: [62.5, 12.5], 8: [87.5, 12.5],
  4: [12.5, 37.5],                                      9: [87.5, 37.5],
  3: [12.5, 62.5],                                     10: [87.5, 62.5],
  2: [12.5, 87.5], 1: [37.5, 87.5], 0: [62.5, 87.5], 11: [87.5, 87.5],
};

// 绕盘面顺时针排列（用于三方四正四边形排序）
const CLOCKWISE_INDEX: Record<number, number> = {
  5: 0, 6: 1, 7: 2, 8: 3,
  9: 4, 10: 5,
  11: 6, 0: 7, 1: 8, 2: 9,
  3: 10, 4: 11,
};

function sortClockwise(branches: number[]): number[] {
  return [...branches].sort((a, b) => CLOCKWISE_INDEX[a] - CLOCKWISE_INDEX[b]);
}

/** 三方四正：本宫 + 对宫 + 两个三合宫 */
function getSanFangSiZheng(branch: number): [number, number, number, number] {
  return [
    branch,
    (branch + 6) % 12,   // 对宫
    (branch + 4) % 12,   // 三合1
    (branch + 8) % 12,   // 三合2
  ];
}

const ANIMATION_ORDER = [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4];

export default function ChartBoard({ chart, selectedBranch: extSelectedBranch, onStarSelect, onPalaceSelect, onSiHuaClick }: ChartBoardProps) {
  const [internalBranch, setInternalBranch] = useState<number | null>(null);
  const activeBranch = extSelectedBranch !== undefined ? extSelectedBranch : internalBranch;
  const [timeView, setTimeView] = useState<TimeView>('mingpan');
  const [liunianYear, setLiunianYear] = useState<number>(new Date().getFullYear());
  const [mobileLayout, setMobileLayout] = useState<'cards' | 'grid'>('cards');

  const palaceMap: Record<number, Palace> = {};
  chart.palaces.forEach(p => { palaceMap[p.branch] = p; });

  // 计算当前叠加四化数据（大限或流年）
  const currentDx = chart.daXians[chart.currentDaXianIndex];
  const overlayData: Record<string, string> = (() => {
    if (timeView === 'daxian' && currentDx) {
      const dxPalace = chart.palaces.find(p => p.branch === currentDx.palaceBranch);
      if (dxPalace) return buildSiHuaOverlay(dxPalace.stem);
    }
    if (timeView === 'liunian') {
      return buildSiHuaOverlay(getYearStemIndex(liunianYear));
    }
    return {};
  })();
  const overlayLabel = timeView === 'daxian' ? '限' : timeView === 'liunian' ? '年' : undefined;

  const handlePalaceClick = (branch: number) => {
    const isDeselecting = activeBranch === branch;
    const nextBranch = isDeselecting ? null : branch;
    setInternalBranch(nextBranch);
    if (!isDeselecting) {
      const palace = palaceMap[branch];
      if (palace) onPalaceSelect?.(palace);
    } else {
      onPalaceSelect?.(null);
    }
  };

  // 三方四正
  const sanFangBranches = activeBranch !== null ? getSanFangSiZheng(activeBranch) : null;
  const sanFangSet = sanFangBranches ? new Set(sanFangBranches) : null;

  return (
    <div className="w-full select-none">
      {/* 时间导航轴 */}
      <TimeNav
        chart={chart}
        view={timeView}
        liunianYear={liunianYear}
        onViewChange={setTimeView}
        onYearChange={setLiunianYear}
      />

      {/* 命盘标题 */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-3"
      >
        <div className="text-[10px] tracking-[0.4em] uppercase mb-1" style={{ color: 'var(--tx-3)' }}>
          HỆ THỐNG MỆNH BÀN TỬ VI ĐẨU SỐ
        </div>
        <h2 className="text-base sm:text-lg tracking-[0.15em] font-extrabold" style={{ color: 'var(--ac)' }}>
          {chart.birthInfo.name ? `${chart.birthInfo.name} · ` : ''}LÁ SỐ TỬ VI
          <span className="hidden sm:inline text-xs font-normal opacity-50 ml-2">（紫微斗数命盘）</span>
        </h2>
      </motion.div>

      {/* Bộ chuyển đổi chế độ xem riêng cho Mobile (< 768px) */}
      <div className="md:hidden flex items-center justify-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => setMobileLayout('cards')}
          className={`flex-1 max-w-[175px] py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            mobileLayout === 'cards'
              ? 'bg-amber-500 text-zinc-950 border-amber-300 shadow-md'
              : 'bg-zinc-900/80 text-zinc-300 border-zinc-700'
          }`}
        >
          <span>📱</span>
          <span>Thẻ 12 Cung</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileLayout('grid')}
          className={`flex-1 max-w-[175px] py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            mobileLayout === 'grid'
              ? 'bg-amber-500 text-zinc-950 border-amber-300 shadow-md'
              : 'bg-zinc-900/80 text-zinc-300 border-zinc-700'
          }`}
        >
          <span>🕸️</span>
          <span>Bảng 4×4 Cổ Điển</span>
        </button>
      </div>

      {/* CHẾ ĐỘ XEM MOBILE DẠNG THẺ 2 CỘT (KHÔNG BỊ CẮT CHỮ) */}
      {mobileLayout === 'cards' && (
        <div className="md:hidden space-y-2.5 mb-3">
          {/* Thẻ Thiên Bàn Tóm Tắt trên Mobile */}
          <div className="p-3 rounded-xl border border-amber-500/35 bg-zinc-950/75 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-black tracking-widest text-amber-400 uppercase">
                THIÊN BÀN · {getJuName(chart.wuxingJuName)}
              </div>
              <div className="text-xs text-zinc-300 mt-0.5 flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => handlePalaceClick(chart.mingGongBranch)}
                  className="underline decoration-dotted text-amber-300 font-bold"
                >
                  Mệnh: {BRANCHES_VI[chart.mingGongBranch]}
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => handlePalaceClick(chart.shenGongBranch)}
                  className="underline decoration-dotted text-sky-300 font-bold"
                >
                  Thân: {BRANCHES_VI[chart.shenGongBranch]}
                </button>
              </div>
              <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                Âm Lịch: {chart.lunarInfo.lunarYear} · Tháng {chart.lunarInfo.lunarMonth}{chart.lunarInfo.isLeapMonth ? ' Nhuận' : ''} · Ngày {chart.lunarInfo.lunarDay}
              </div>
            </div>
            {chart.currentDaXianIndex >= 0 && (() => {
              const dx = chart.daXians[chart.currentDaXianIndex];
              const pInfo = getPalaceName(dx.palaceName);
              return (
                <button
                  type="button"
                  onClick={() => handlePalaceClick(dx.palaceBranch)}
                  className="px-2.5 py-1.5 rounded-lg border border-purple-500/50 bg-purple-950/50 text-right cursor-pointer"
                >
                  <div className="text-[9px] font-bold text-purple-300">⏳ Đại Hạn</div>
                  <div className="text-xs font-black text-purple-200">{dx.startAge}–{dx.endAge}t · {pInfo.vi}</div>
                </button>
              );
            })()}
          </div>

          {/* Lưới 12 Cung 2 cột vừa khít màn hình điện thoại */}
          <div className="grid grid-cols-2 gap-1.5">
            {chart.palaces.map((palace, idx) => {
              const sanFangRole = activeBranch === palace.branch
                ? 'selected'
                : activeBranch !== null && (activeBranch + 6) % 12 === palace.branch
                ? 'opposite'
                : activeBranch !== null && ((activeBranch + 4) % 12 === palace.branch || (activeBranch + 8) % 12 === palace.branch)
                ? 'trine'
                : undefined;

              return (
                <div key={palace.branch} className="rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-950/80">
                  <PalaceCell
                    palace={palace}
                    onClick={() => handlePalaceClick(palace.branch)}
                    onStarClick={(star) => onStarSelect?.(star, palace)}
                    isSelected={activeBranch === palace.branch}
                    isSanFang={!!(sanFangSet?.has(palace.branch) && activeBranch !== palace.branch)}
                    sanFangRole={sanFangRole}
                    delay={idx * 0.02}
                    overlayStarSiHua={Object.keys(overlayData).length > 0 ? overlayData : undefined}
                    overlayLabel={overlayLabel}
                    onSiHuaClick={(starName, siHua) => onSiHuaClick?.(starName, siHua, timeView)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4x4 命盘网格（含 SVG 叠加层） - Luôn hiện trên Desktop/Tablet, hoặc khi Mobile chọn Bảng 4x4 */}
      <div className={`w-full overflow-x-auto pb-2 scrollbar-thin ${mobileLayout === 'cards' ? 'hidden md:block' : 'block'}`}>
        <div className="sm:hidden text-center text-[10px] text-amber-300/90 font-medium mb-1.5 flex items-center justify-center gap-1.5">
          <span>👈</span>
          <span>Vuốt ngang để xem trọn vẹn 12 cung</span>
          <span>👉</span>
        </div>
        <div
          className="grid rounded-xl overflow-hidden relative min-w-[520px] sm:min-w-0"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(4, auto)',
            gap: '1px',
            background: 'var(--t-border)',
            border: '1px solid var(--t-border)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.15)',
          }}
        >
        {ANIMATION_ORDER.map((branch, i) => {
          const [row, col] = BRANCH_GRID_POS[branch];
          const palace = palaceMap[branch];
          if (!palace) return null;

          const sanFangRole = activeBranch === branch
            ? 'selected'
            : activeBranch !== null && (activeBranch + 6) % 12 === branch
            ? 'opposite'
            : activeBranch !== null && ((activeBranch + 4) % 12 === branch || (activeBranch + 8) % 12 === branch)
            ? 'trine'
            : undefined;

          return (
            <div key={branch} style={{ gridRow: row, gridColumn: col, background: 'var(--t-bg)' }}>
              <PalaceCell
                palace={palace}
                onClick={() => handlePalaceClick(branch)}
                onStarClick={(star) => onStarSelect?.(star, palace)}
                isSelected={activeBranch === branch}
                isSanFang={!!(sanFangSet?.has(branch) && activeBranch !== branch)}
                sanFangRole={sanFangRole}
                delay={i * 0.04}
                overlayStarSiHua={Object.keys(overlayData).length > 0 ? overlayData : undefined}
                overlayLabel={overlayLabel}
                onSiHuaClick={(starName, siHua) => onSiHuaClick?.(starName, siHua, timeView)}
              />
            </div>
          );
        })}

        {/* 中央信息区 (Thiên Bàn) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center justify-center p-3 sm:p-4 gap-2 sm:gap-3 card-inner rounded-xl"
          style={{ gridRow: '2 / 4', gridColumn: '2 / 4' }}
        >
          <div className="text-4xl sm:text-5xl select-none leading-none opacity-20" style={{ color: 'var(--ac)' }}>
            ☯
          </div>

          <div className="text-center space-y-1.5">
            <div className="text-[11px] tracking-[0.25em] font-black uppercase text-amber-400">
              THIÊN BÀN TỬ VI
            </div>
            <div className="text-[12px] space-y-1 font-semibold" style={{ color: 'var(--tx-2)' }}>
              <button
                type="button"
                onClick={() => handlePalaceClick(chart.mingGongBranch)}
                className="hover:scale-105 transition-transform cursor-pointer block mx-auto text-left"
                title="Nhấp để xem chi tiết Cung Mệnh"
              >
                Mệnh cư: <span className="font-black text-amber-300 text-xs sm:text-sm underline decoration-dotted decoration-amber-500/60">{BRANCHES_VI[chart.mingGongBranch]}</span>
              </button>
              <button
                type="button"
                onClick={() => handlePalaceClick(chart.shenGongBranch)}
                className="hover:scale-105 transition-transform cursor-pointer block mx-auto text-left"
                title="Nhấp để xem chi tiết Cung Thân"
              >
                Thân cư: <span className="font-black text-sky-300 text-xs sm:text-sm underline decoration-dotted decoration-sky-500/60">{BRANCHES_VI[chart.shenGongBranch]}</span>
              </button>
              <div className="text-[11px] font-black px-2.5 py-0.5 rounded border border-amber-500/40 bg-amber-500/15 text-amber-300 inline-block shadow-sm">
                {getJuName(chart.wuxingJuName)}
              </div>
            </div>
          </div>

          {chart.currentDaXianIndex >= 0 && (() => {
            const dx = chart.daXians[chart.currentDaXianIndex];
            const pInfo = getPalaceName(dx.palaceName);
            return (
              <button
                type="button"
                onClick={() => handlePalaceClick(dx.palaceBranch)}
                className="border border-purple-500/50 hover:border-purple-400 rounded-lg px-3 py-1.5 text-center shadow-md hover:scale-105 transition-all cursor-pointer group"
                style={{ background: 'rgba(147,51,234,0.2)' }}
                title="Nhấp để xem chi tiết Cung Đại Hạn 10 năm hiện tại"
              >
                <div className="text-[9px] text-purple-300 group-hover:text-purple-200 font-bold tracking-wider flex items-center justify-center gap-1">
                  <span>⏳ Đại Hạn Hiện Tại</span>
                  <span className="text-[8px] bg-purple-500/30 px-1 rounded">Click xem</span>
                </div>
                <div className="text-[13px] text-purple-200 font-black tabular-nums">{dx.startAge}–{dx.endAge} tuổi</div>
                <div className="text-[10px] text-purple-300 font-bold">
                  Cung {pInfo.vi}
                </div>
              </button>
            );
          })()}

          <div className="text-[10px] text-center leading-relaxed font-mono" style={{ color: 'var(--tx-3)', opacity: 0.9 }}>
            <span className="block font-medium">Âm Lịch: {chart.lunarInfo.lunarYear} · {chart.lunarInfo.isLeapMonth ? 'Nhuận ' : ''}Tháng {chart.lunarInfo.lunarMonth} · Ngày {chart.lunarInfo.lunarDay}</span>
          </div>
        </motion.div>

        {/* ── 三方四正 SVG 连线（绝对定位在 grid 内部，受 overflow:hidden 裁切） ── */}
        <AnimatePresence>
          {sanFangBranches !== null && (
            <motion.div
              key={`sf-${activeBranch}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none"
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 20,
              }}
            >
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block' }}
              >
                {(() => {
                  // 三角形（三方）+ 一条直线（对宫）
                  const p0 = BRANCH_SVG_POS[sanFangBranches[0]]; // 本宫
                  const p1 = BRANCH_SVG_POS[sanFangBranches[1]]; // 对宫
                  const p2 = BRANCH_SVG_POS[sanFangBranches[2]]; // 三合1
                  const p3 = BRANCH_SVG_POS[sanFangBranches[3]]; // 三合2
                  return (
                    <>
                      {/* 对宫直线：本宫 ↔ 对宫（穿过中心，màu cam hổ phách xung chiếu） */}
                      <line
                        x1={`${p0[0]}%`} y1={`${p0[1]}%`}
                        x2={`${p1[0]}%`} y2={`${p1[1]}%`}
                        stroke="rgba(249, 115, 22, 0.85)" strokeWidth="2"
                        strokeDasharray="5,4" strokeLinecap="round"
                      />
                      {/* 三合三角形：本宫 → 三合1 → 三合2 → 本宫（màu xanh ngọc hội chiếu） */}
                      <line
                        x1={`${p0[0]}%`} y1={`${p0[1]}%`}
                        x2={`${p2[0]}%`} y2={`${p2[1]}%`}
                        stroke="rgba(56, 189, 248, 0.75)" strokeWidth="1.8"
                        strokeDasharray="6,4" strokeLinecap="round"
                      />
                      <line
                        x1={`${p2[0]}%`} y1={`${p2[1]}%`}
                        x2={`${p3[0]}%`} y2={`${p3[1]}%`}
                        stroke="rgba(56, 189, 248, 0.75)" strokeWidth="1.8"
                        strokeDasharray="6,4" strokeLinecap="round"
                      />
                      <line
                        x1={`${p3[0]}%`} y1={`${p3[1]}%`}
                        x2={`${p0[0]}%`} y2={`${p0[1]}%`}
                        stroke="rgba(56, 189, 248, 0.75)" strokeWidth="1.8"
                        strokeDasharray="6,4" strokeLinecap="round"
                      />
                      {/* Bốn điểm tâm cung vị */}
                      <circle cx={`${p0[0]}%`} cy={`${p0[1]}%`} r="5" fill="#f59e0b" />
                      <circle cx={`${p1[0]}%`} cy={`${p1[1]}%`} r="4.5" fill="#f97316" />
                      <circle cx={`${p2[0]}%`} cy={`${p2[1]}%`} r="4" fill="#38bdf8" />
                      <circle cx={`${p3[0]}%`} cy={`${p3[1]}%`} r="4" fill="#38bdf8" />
                    </>
                  );
                })()}
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>

      {/* Chú thích Tứ Hóa & Hướng Dẫn */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-3 flex items-center justify-center gap-2 text-[10px] flex-wrap"
      >
        {[
          { h: 'Hóa Lộc (禄)', c: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/15' },
          { h: 'Hóa Quyền (权)', c: 'text-blue-300 border-blue-500/40 bg-blue-500/15' },
          { h: 'Hóa Khoa (科)', c: 'text-yellow-300 border-yellow-500/40 bg-yellow-500/15' },
          { h: 'Hóa Kỵ (忌)', c: 'text-rose-300 border-rose-500/40 bg-rose-500/15' },
        ].map(({ h, c }) => (
          <span key={h} className={`border px-2 py-0.5 rounded-full font-bold shadow-sm ${c}`}>{h}</span>
        ))}
        <span className="px-2.5 py-0.5 rounded-full text-stone-300 font-semibold border border-stone-700 bg-white/5">
          👉 Nhấp vào ô cung để xem Tam Phương Tứ Chính
        </span>
      </motion.div>
    </div>
  );
}
