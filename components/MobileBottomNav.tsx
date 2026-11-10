'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';

const NAV_TABS = [
  { href: '/chart', label: 'Lá Số', icon: '🔮', desc: 'An sao 12 cung' },
  { href: '/metaphysics', label: 'Xem Bói', icon: '🖐️', desc: 'Chỉ tay & Tarot' },
  { href: '/heming', label: 'Hợp Mệnh', icon: '☯️', desc: 'So đôi lứa' },
  { href: '/knowledge', label: 'Vạn Tinh', icon: '🌌', desc: 'Tra cứu sao' },
  { href: '/library', label: 'Cổ Thư', icon: '📜', desc: 'Tàng Kinh Các' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showLegal, setShowLegal] = useState(false);

  return (
    <>
      {/* ─── Thanh Điều Hướng Đáy Màn Hình Di Động ─── */}
      <nav
        aria-label="Thanh điều hướng di động"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 select-none transition-colors duration-300"
        style={{
          background: isDark ? 'rgba(6, 14, 31, 0.94)' : 'rgba(250, 246, 235, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: isDark ? '1px solid rgba(212, 168, 67, 0.35)' : '1px solid rgba(184, 146, 42, 0.30)',
          boxShadow: isDark
            ? '0 -6px 24px rgba(0, 0, 0, 0.7), 0 -1px 0 rgba(212, 168, 67, 0.25)'
            : '0 -4px 18px rgba(184, 146, 42, 0.12)',
          paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)',
        }}
      >
        <div className="flex items-center justify-around px-1 pt-1.5 pb-1 max-w-lg mx-auto">
          {NAV_TABS.map((tab) => {
            const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="relative flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 group"
              >
                {/* Hào quang nền khi active */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-glow"
                    className="absolute inset-x-2 inset-y-0.5 rounded-xl pointer-events-none"
                    style={{
                      background: isDark ? 'rgba(212, 168, 67, 0.16)' : 'rgba(184, 146, 42, 0.14)',
                      border: isDark ? '1px solid rgba(212, 168, 67, 0.4)' : '1px solid rgba(184, 146, 42, 0.35)',
                    }}
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}

                {/* Biểu tượng Tab */}
                <motion.span
                  whileTap={{ scale: 0.85 }}
                  className="text-lg relative z-10 leading-none mb-0.5 transition-transform"
                  style={{
                    filter: isActive && isDark ? 'drop-shadow(0 0 8px rgba(212, 168, 67, 0.8))' : 'none',
                    transform: isActive ? 'scale(1.12)' : 'scale(1)',
                  }}
                >
                  {tab.icon}
                </motion.span>

                {/* Tiêu đề Tab */}
                <span
                  className="text-[10px] font-bold tracking-tight relative z-10 leading-none transition-colors"
                  style={{
                    color: isActive
                      ? isDark ? '#f5d070' : '#8b6410'
                      : isDark ? 'rgba(180, 195, 220, 0.65)' : 'rgba(90, 75, 45, 0.7)',
                  }}
                >
                  {tab.label}
                </span>

                {/* Chấm sáng dưới tab đang chọn */}
                {isActive && (
                  <div
                    className="w-1 h-1 rounded-full mt-0.5 relative z-10"
                    style={{
                      background: isDark ? '#f5d070' : '#8b6410',
                      boxShadow: '0 0 6px rgba(212, 168, 67, 0.9)',
                    }}
                  />
                )}
              </Link>
            );
          })}

          {/* Nút Xem Lưu Ý Pháp Lý Tiện Lợi Trên Mobile */}
          <button
            type="button"
            onClick={() => setShowLegal(true)}
            aria-label="Xem lưu ý pháp lý & miễn trừ trách nhiệm"
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all opacity-70 hover:opacity-100"
            title="Lưu ý pháp lý"
          >
            <span className="text-base leading-none mb-0.5">⚖️</span>
            <span className="text-[9px] font-medium leading-none text-zinc-400">
              Pháp lý
            </span>
          </button>
        </div>
      </nav>

      {/* Modal Lưu Ý Pháp Lý Mở Từ Mobile Bottom Nav */}
      <AnimatePresence>
        {showLegal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="relative max-w-md w-full bg-zinc-950 border border-amber-500/50 rounded-2xl p-5 shadow-2xl space-y-3.5 mb-14 sm:mb-0"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                  <span>⚖️</span> MIỄN TRỪ TRÁCH NHIỆM & PHÁP LÝ
                </div>
                <button
                  type="button"
                  onClick={() => setShowLegal(false)}
                  className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-xs text-zinc-300 leading-relaxed max-h-[50vh] overflow-y-auto pr-1">
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
                  <strong>1. Tính Chất Giải Trí:</strong> Mọi thông tin tử vi, chỉ tay, tarot và kinh dịch chỉ mang tính chất tham khảo văn hóa truyền thống, tuyệt đối <strong>không cổ xúy mê tín dị đoan</strong>.
                </div>
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
                  <strong>2. Tính Trung Lập:</strong> Hệ thống thuần túy học thuật, <strong>không công kích bất kỳ cá nhân hay tổ chức nào</strong>, tuân thủ pháp luật và đạo đức xã hội.
                </div>
              </div>

              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowLegal(false)}
                  className="w-full py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-black text-xs shadow-md"
                >
                  Đã Hiểu & Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
