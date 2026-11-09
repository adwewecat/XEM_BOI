'use client';
import { motion } from 'framer-motion';
import type { Palace, Star } from '@/lib/ziwei/types';
import { getPalaceName, getStarName, getSiHua, getBrightnessVi, getGanzhiName } from '@/lib/ziwei/vietnamese';
import clsx from 'clsx';

interface PalaceCellProps {
  palace: Palace;
  onClick?: () => void;
  onStarClick?: (star: Star) => void;
  isSelected?: boolean;
  isSanFang?: boolean;
  delay?: number;
  /** 叠加四化：星名 → 四化类型（'禄'/'权'/'科'/'忌'） */
  overlayStarSiHua?: Record<string, string>;
  /** 叠加标签：'年'（流年）或 '限'（大限） */
  overlayLabel?: string;
  /** 点击叠加四化 badge 回调 */
  onSiHuaClick?: (starName: string, siHua: string) => void;
}

const SIHUA_STYLES: Record<string, string> = {
  '禄': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  '权': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  '科': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  '忌': 'text-red-400 bg-red-500/10 border-red-500/30',
};

const SiHuaBadge = ({
  siHua,
  overlay,
  label,
  onClick,
}: {
  siHua: string;
  overlay?: boolean;
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  const shInfo = getSiHua(siHua);
  return (
    <span
      className={clsx(
        'inline-flex items-center text-[8.5px] px-1.5 py-0.5 rounded-full border leading-none font-black ml-1 flex-shrink-0 shadow-sm',
        SIHUA_STYLES[siHua] || SIHUA_STYLES[shInfo.zh] || 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        overlay && 'border-dashed opacity-80',
        onClick && 'cursor-pointer hover:opacity-100',
      )}
      onClick={onClick}
      title={`${shInfo.vi} (${shInfo.zh})`}
    >
      {overlay && label && <span className="mr-0.5 opacity-75">{label === '限' ? 'Hạn' : 'Niên'}</span>}
      <span>{shInfo.short}</span>
    </span>
  );
};

export default function PalaceCell({
  palace, onClick, onStarClick, isSelected, isSanFang, delay = 0,
  overlayStarSiHua, overlayLabel, onSiHuaClick,
}: PalaceCellProps) {
  const { branch, stem, name, stars, daXianAge, isCurrentDaXian, isMingGong, isShenGong } = palace;
  const palaceInfo = getPalaceName(name);
  const ganzhiInfo = getGanzhiName(stem, branch);

  const majorStars = stars.filter(s => s.type === 'major');
  const luckyStars = stars.filter(s => s.type === 'lucky');
  const shaStars = stars.filter(s => s.type === 'sha');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      onClick={onClick}
      className="relative flex flex-col p-2 cursor-pointer transition-all duration-200 h-full border border-stone-800/40 rounded-lg hover:border-amber-500/40"
      style={{
        minHeight: '110px',
        background: isCurrentDaXian
          ? 'rgba(147,51,234,0.12)'
          : isSelected
          ? 'rgba(37,99,235,0.22)'
          : isSanFang
          ? 'rgba(37,99,235,0.10)'
          : isMingGong
          ? 'rgba(212,168,67,0.08)'
          : 'rgba(255,255,255,0.02)',
        boxShadow: isCurrentDaXian
          ? 'inset 3px 0 0 rgba(147,51,234,0.6)'
          : isSelected
          ? 'inset 0 0 0 1.5px rgba(212,168,67,0.8), 0 0 16px rgba(212,168,67,0.2)'
          : isSanFang
          ? 'inset 0 0 0 1px rgba(37,99,235,0.5)'
          : 'none',
      }}
    >
      {/* Đại hạn tuổi */}
      {daXianAge && (
        <div className={clsx(
          'absolute top-1.5 right-1.5 text-[9px] font-mono tabular-nums',
          isCurrentDaXian ? 'text-purple-400 font-bold' : ''
        )}
          style={!isCurrentDaXian ? { color: 'var(--tx-3)', opacity: 0.75 } : undefined}
        >
          {daXianAge[0]}–{daXianAge[1]}t
        </div>
      )}

      {/* Tên Cung & Huy hiệu Mệnh/Thân */}
      <div className="flex items-center justify-between mb-1 pr-10">
        <div className="flex items-baseline gap-1">
          <span className={clsx('text-[12px] sm:text-[13.5px] font-black tracking-tight',
            isMingGong ? 'text-amber-300' : isShenGong ? 'text-sky-300' : 'text-stone-100'
          )}>
            {palaceInfo.vi}
          </span>
          <span className="text-[8px] opacity-25 font-serif" style={{ color: 'var(--tx-3)' }}>
            ({palaceInfo.zh})
          </span>
        </div>
        <div className="flex items-center gap-1">
          {isMingGong && (
            <span className="text-[9px] font-black text-amber-300 border border-amber-500/50 bg-amber-500/20 px-1.5 py-0.5 rounded leading-tight shadow-sm">
              MỆNH
            </span>
          )}
          {isShenGong && (
            <span className="text-[9px] font-black text-sky-300 border border-sky-500/50 bg-sky-500/20 px-1.5 py-0.5 rounded leading-tight shadow-sm">
              THÂN
            </span>
          )}
        </div>
      </div>

      {/* Can Chi Cung */}
      <div className="flex items-center gap-1 text-[9.5px] mb-1 font-mono" style={{ color: 'var(--tx-3)', opacity: 0.9 }}>
        <span className="font-bold text-amber-400/90">{ganzhiInfo.vi}</span>
        <span className="text-[7.5px] opacity-25">({ganzhiInfo.zh})</span>
      </div>

      {/* Chính Tinh (Thập Tứ Chính Tinh - TO RÕ NỔI BẬT) */}
      <div className="flex flex-col gap-0.5 flex-1 mb-1">
        {majorStars.length === 0 && (
          <span className="text-[11px] font-medium italic text-stone-400/70">
            Vô Chính Diệu
          </span>
        )}
        {majorStars.map((star) => {
          const starInfo = getStarName(star.name);
          const brightnessVi = star.brightnessRaw ? getBrightnessVi(star.brightnessRaw) : '';
          const overlaySiHua = overlayStarSiHua?.[star.name];
          return (
            <div
              key={star.name}
              className="flex items-baseline flex-wrap gap-1 cursor-pointer hover:brightness-125 transition-all py-0.5"
              onClick={e => { e.stopPropagation(); onStarClick?.(star); }}
              title={`Sao ${starInfo.vi} (${starInfo.zh}) - Nhấp để xem luận giải`}
            >
              <span className={clsx(
                'text-[13px] sm:text-[15px] leading-tight font-black tracking-tight drop-shadow-sm',
                star.brightness === 'bright' ? 'text-amber-300' : star.brightness === 'dim' ? 'text-amber-600' : 'text-amber-400',
              )}>
                {starInfo.vi}
              </span>
              <span className="text-[7.5px] opacity-25 text-stone-400">
                ({starInfo.zh})
              </span>
              {brightnessVi && (
                <span className="text-[9.5px] font-extrabold text-amber-400 font-serif ml-0.5">
                  [{brightnessVi}]
                </span>
              )}
              {star.siHua && <SiHuaBadge siHua={star.siHua} />}
              {overlaySiHua && (
                <SiHuaBadge
                  siHua={overlaySiHua}
                  overlay
                  label={overlayLabel}
                  onClick={e => {
                    e.stopPropagation();
                    onSiHuaClick?.(star.name, overlaySiHua);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Cát Tinh (Phụ Tinh - 100% TIẾNG VIỆT TO RÕ SÁNG ĐẸP) */}
      {luckyStars.length > 0 && (
        <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-0.5">
          {luckyStars.map(s => {
            const sInfo = getStarName(s.name);
            const overlaySiHua = overlayStarSiHua?.[s.name];
            return (
              <span
                key={s.name}
                className="inline-flex items-baseline text-[10px] sm:text-[10.5px] text-sky-300 hover:text-sky-100 leading-tight transition-colors cursor-pointer"
                title={`Sao ${sInfo.vi} (${sInfo.zh})`}
                onClick={e => { e.stopPropagation(); onStarClick?.(s); }}
              >
                <span className="font-semibold">{sInfo.vi}</span>
                {s.siHua && <SiHuaBadge siHua={s.siHua} />}
                {overlaySiHua && (
                  <SiHuaBadge
                    siHua={overlaySiHua}
                    overlay
                    label={overlayLabel}
                    onClick={e => {
                      e.stopPropagation();
                      onSiHuaClick?.(s.name, overlaySiHua);
                    }}
                  />
                )}
              </span>
            );
          })}
        </div>
      )}

      {/* Sát Tinh (Hung Tinh - 100% TIẾNG VIỆT TO RÕ) */}
      {shaStars.length > 0 && (
        <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-0.5">
          {shaStars.map(s => {
            const sInfo = getStarName(s.name);
            return (
              <span
                key={s.name}
                className="inline-flex items-baseline text-[10px] sm:text-[10.5px] text-rose-300 hover:text-rose-100 leading-tight transition-colors cursor-pointer"
                title={`Sao ${sInfo.vi} (${sInfo.zh})`}
                onClick={e => { e.stopPropagation(); onStarClick?.(s); }}
              >
                <span className="font-semibold">{sInfo.vi}</span>
                {s.siHua && <SiHuaBadge siHua={s.siHua} />}
              </span>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
