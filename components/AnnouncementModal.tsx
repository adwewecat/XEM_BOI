'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 公告版本号——以后想再弹新公告，改这里就行（旧版 key 失效，新版重新弹一次）
const ANNOUNCEMENT_VERSION = '2026-05-01';
const STORAGE_KEY = `announcement_seen_${ANNOUNCEMENT_VERSION}`;

export default function AnnouncementModal() {
  // 默认不开，client 端 useEffect 检查 localStorage 后立即决定是否弹出。
  // 没看过 → 立即覆盖首页；看过 → 不再弹。
  const [open, setOpen] = useState(false);
  const [decided, setDecided] = useState(false); // hydration 完成标志

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) setOpen(true);
    } catch { /* localStorage 可能被禁，忽略 */ }
    setDecided(true);
  }, []);

  // 公告打开时锁住 body 滚动，防止背后首页可滚（仪式感更强）
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const close = () => {
    setOpen(false);
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* skip */ }
  };

  if (!decided) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          // 不点击外部关闭——强制用户按"我知道了"按钮才能进入首页
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(20,12,2,0.88)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #fefcf6 0%, #faf3e3 100%)',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '640px',
              maxHeight: 'min(85vh, 760px)',
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(60,30,10,0.4), 0 4px 16px rgba(60,30,10,0.2)',
              border: '1px solid rgba(184,146,42,0.25)',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
            }}
          >
            {/* 顶部装饰 + 关闭按钮 */}
            <div style={{
              padding: '22px 28px 14px',
              borderBottom: '1px solid rgba(184,146,42,0.15)',
              background: 'linear-gradient(180deg, rgba(184,146,42,0.08) 0%, transparent 100%)',
              flexShrink: 0,
              position: 'relative',
            }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#b8922a', opacity: 0.8, marginBottom: '6px', fontWeight: 600 }}>
                THÔNG ĐIỆP ĐẦU TIÊN · A LETTER TO USERS
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#3d2f10', letterSpacing: '0.04em', margin: 0 }}>
                Gửi Đến Bạn — Người Đang Trải Nghiệm Nền Tảng
              </h2>
              <button
                onClick={close}
                aria-label="Đóng"
                style={{
                  position: 'absolute', top: '14px', right: '16px',
                  width: '28px', height: '28px',
                  background: 'rgba(184,146,42,0.08)',
                  border: '1px solid rgba(184,146,42,0.2)',
                  borderRadius: '50%',
                  color: '#7a5e2a', fontSize: '14px',
                  cursor: 'pointer', lineHeight: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >×</button>
            </div>

            {/* 限时免费 banner（最关键信息，置顶强调）*/}
            <div style={{
              margin: '14px 22px 0',
              padding: '12px 16px',
              background: 'linear-gradient(135deg, #fff5e3 0%, #ffe1c0 100%)',
              border: '1.5px dashed rgba(232,132,62,0.5)',
              borderRadius: '12px',
              flexShrink: 0,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#c45a2d', marginBottom: '4px', fontWeight: 700 }}>
                TRẢI NGHIỆM TRỌN VẸN · MIỄN PHÍ 100%
              </div>
              <div style={{ fontSize: '13px', color: '#8b3a1a', fontWeight: 600, lineHeight: 1.6 }}>
                Toàn bộ tính năng Lập Lá Số, Giờ Chân Thái Dương 63 Tỉnh Thành & Nhận Diện 50+ Cách Cục đã sẵn sàng!
              </div>
            </div>

            {/* 正文（可滚动）*/}
            <div style={{
              padding: '18px 28px 24px',
              overflowY: 'auto',
              fontSize: '13px',
              lineHeight: 1.85,
              color: '#5a4a30',
              flex: 1,
            }}>
              <p style={{ margin: '0 0 12px' }}>
                Chào bạn, chào mừng bạn đến với hệ thống nghiên cứu Tử Vi Đẩu Số phương Đông.
              </p>
              <p style={{ margin: '0 0 12px' }}>
                Tâm nguyện khi xây dựng hệ thống này rất giản dị: Trong thời đại công nghệ số, làm sao để kho tàng học thuật Tử Vi Đẩu Số vốn thâm sâu, phức tạp của cổ nhân và giáo trình 《Thiên Kỷ》 của danh sư Nghê Hải Hà trở nên trực quan, chính xác và dễ tiếp cận nhất.
              </p>
              <p style={{ margin: '0 0 12px' }}>
                Bạn không nhất thiết phải mất hàng năm trời đọc cổ thư chữ Hán mới có thể an sao đúng. Hệ thống đã tự động tính toán Ngũ Hành Cục, Giờ Chân Thái Dương chuẩn NOAA và nhận diện các cách cục cát hung giúp bạn có cái nhìn sâu sắc về bản thân.
              </p>
              <p style={{
                margin: '0 0 12px',
                padding: '10px 14px',
                background: 'rgba(184,146,42,0.07)',
                borderLeft: '3px solid rgba(184,146,42,0.45)',
                borderRadius: '0 8px 8px 0',
                fontStyle: 'italic',
                color: '#7a5e2a',
              }}>
                Danh sư Nghê Hải Hà từng nói: &ldquo;Cổ nhân sao có thể sáng tạo ra thứ hoàn toàn vô dụng?&rdquo;
              </p>
              <p style={{ margin: '0 0 12px' }}>
                Tử Vi Đẩu Số và Chu Dịch không phải để phán xét hay trói buộc cuộc đời vào một định mệnh bất biến, mà để chúng ta nhìn thấy quán tính tính cách, bài học cuộc đời và thời điểm chuyển vận. Nhìn thấy rồi mới có cơ hội chuyển hóa; hiểu mình rồi mới có cơ hội sống tốt hơn.
              </p>
              <p style={{ margin: '0 0 16px', color: '#3d2f10', fontWeight: 600 }}>
                Chúc bạn luôn thấu suốt tâm trí, vững vàng định hướng và làm chủ trọn vẹn vận mệnh của mình!
              </p>
              <p style={{ margin: 0, textAlign: 'right', fontSize: '13px', color: '#7a5e2a' }}>
                —— Trân trọng cảm ơn bạn 🙏
              </p>
            </div>

            {/* 底部按钮 */}
            <div style={{
              padding: '14px 22px',
              borderTop: '1px solid rgba(184,146,42,0.15)',
              background: 'rgba(184,146,42,0.04)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              flexShrink: 0,
            }}>
              <button
                onClick={close}
                style={{
                  padding: '10px 24px',
                  background: 'linear-gradient(135deg, #b8922a 0%, #9a7a20 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '13px',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(184,146,42,0.3)',
                }}
              >
                Đã Hiểu · Bắt Đầu Khám Phá →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
