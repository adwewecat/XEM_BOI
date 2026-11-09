'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { href: '/chart', label: 'Lập Lá Số', icon: '🔮', desc: 'An sao 12 cung & Vận hạn' },
  { href: '/metaphysics', label: 'Kim Cổ Đông Tây', icon: '🧭', desc: 'Bát Tự · Kinh Dịch · Thần Số' },
  { href: '/heming', label: 'So Hợp Mệnh', icon: '☯️', desc: 'Hợp duyên & Đối tác' },
  { href: '/knowledge', label: 'Vạn Tinh Các', icon: '🌌', desc: 'Tra cứu 14 Chính tinh' },
  { href: '/library', label: 'Tàng Kinh Các', icon: '📜', desc: 'Cổ thư kinh điển' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-colors duration-300"
      style={{
        background: isDark ? 'rgba(2, 8, 16, 0.85)' : 'rgba(250, 246, 235, 0.90)',
        borderColor: isDark ? 'rgba(212, 168, 67, 0.20)' : 'rgba(184, 146, 42, 0.22)',
        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 2px 12px rgba(184,146,42,0.06)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-9 h-9 rounded-full flex items-center justify-center border transition-transform duration-300 group-hover:scale-105"
            style={{
              background: isDark ? 'linear-gradient(135deg, rgba(212,168,67,0.25), rgba(18,25,42,0.8))' : 'linear-gradient(135deg, rgba(184,146,42,0.2), #fff)',
              borderColor: 'var(--ac)',
              boxShadow: isDark ? '0 0 14px rgba(212,168,67,0.35)' : '0 0 8px rgba(184,146,42,0.2)'
            }}
          >
            <span className="text-base select-none">☯</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-wide" style={{ color: 'var(--tx-0)' }}>
                XEM BÓI TỬ VI
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold"
                style={{
                  background: 'var(--ac-bg)',
                  color: 'var(--ac)',
                  border: '1px solid var(--ac-bdr)'
                }}
              >
                紫微斗数
              </span>
            </div>
            <span className="text-[10px] tracking-wider" style={{ color: 'var(--tx-3)' }}>
              Thiên Kỷ Chuẩn Lý Số
            </span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap"
                style={{
                  color: isActive ? (isDark ? '#f0d070' : '#8b6410') : 'var(--tx-2)',
                  background: isActive
                    ? (isDark ? 'rgba(212,168,67,0.14)' : 'rgba(184,146,42,0.12)')
                    : 'transparent',
                  border: isActive
                    ? `1px solid ${isDark ? 'rgba(212,168,67,0.35)' : 'rgba(184,146,42,0.30)'}`
                    : '1px solid transparent'
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute -bottom-[9px] left-3 right-3 h-[2px] rounded-full"
                    style={{ background: 'var(--ac)' }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle Button & GitHub */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={toggle}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-medium transition-all duration-200"
            style={{
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(184,146,42,0.08)',
              borderColor: isDark ? 'rgba(212,168,67,0.3)' : 'rgba(184,146,42,0.25)',
              color: 'var(--tx-1)'
            }}
            title={isDark ? 'Chuyển sang Giao diện Sáng (Thái Dương)' : 'Chuyển sang Giao diện Tối (Huyền Dạ)'}
          >
            <span>{isDark ? '🌙' : '☀️'}</span>
            <span className="hidden sm:inline">{isDark ? 'Huyền Dạ' : 'Thái Dương'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

