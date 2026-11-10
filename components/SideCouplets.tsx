'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SideCouplets() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* ============================================================== */}
      {/* 2 CÂU ĐỐI CỐ ĐỊNH 2 BÊN MÀN HÌNH (DESKTOP & MÀN HÌNH LỚN >= 1280px) */}
      {/* ============================================================== */}
      <div className="hidden xl:block pointer-events-none">
        {/* Nút thu gọn / mở rộng ở mép trái bên trên câu đối */}
        <div className="fixed left-3 2xl:left-5 top-16 z-50 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Hiện câu đối quy chuẩn' : 'Thu gọn câu đối'}
            className="px-2 py-1 rounded-md text-[10px] font-bold bg-zinc-900/90 text-amber-400/80 border border-amber-500/30 hover:text-amber-200 hover:border-amber-400 transition-all shadow-md backdrop-blur-sm"
          >
            {isCollapsed ? '📜 Hiện Câu Đối' : '⮜ Thu Gọn'}
          </button>
        </div>

        <AnimatePresence>
          {!isCollapsed && (
            <>
              {/* ── CÂU ĐỐI BÊN TRÁI (CÂU 1) ── */}
              <motion.aside
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="fixed left-3 2xl:left-5 top-24 z-40 pointer-events-auto select-none max-h-[calc(100vh-120px)]"
              >
                <div
                  onClick={() => setShowModal(true)}
                  className="group relative cursor-pointer flex flex-col items-center py-3 px-2 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-red-950/90 via-zinc-950/95 to-red-950/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_15px_rgba(217,119,6,0.2)] hover:border-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all duration-300 w-[62px] 2xl:w-[70px]"
                >
                  {/* Đầu câu đối: Khuy triện đồng vàng */}
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-[10px] shadow-sm mb-2.5 border border-amber-200 shrink-0">
                    <span>📜</span>
                  </div>

                  {/* Thân câu đối bên trái: "Không cổ xúy" nằm ngoài, "Thông tin..." nằm trong, chữ quay ngược lại */}
                  <div className="flex flex-row justify-center items-center gap-1.5 2xl:gap-2 py-1">
                    {/* Cột 1 (Nằm ngoài mép trái): Không cổ xúy mê tín dị đoan */}
                    <div
                      className="text-[10px] 2xl:text-[11px] font-black text-amber-200 uppercase tracking-[0.14em] text-center group-hover:text-amber-100 transition-colors whitespace-nowrap"
                      style={{
                        writingMode: 'vertical-lr',
                        textOrientation: 'sideways',
                        WebkitWritingMode: 'vertical-lr',
                        WebkitTextOrientation: 'sideways',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      KHÔNG CỔ XÚY MÊ TÍN DỊ ĐOAN
                    </div>

                    {/* Vạch ngăn trang trí tinh tế */}
                    <div className="w-[1px] h-36 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent shrink-0" />

                    {/* Cột 2 (Câu kế, nằm phía trong): Thông tin chỉ mang tính chất giải trí */}
                    <div
                      className="text-[10px] 2xl:text-[11px] font-black text-amber-300 uppercase tracking-[0.14em] text-center group-hover:text-amber-100 transition-colors whitespace-nowrap"
                      style={{
                        writingMode: 'vertical-lr',
                        textOrientation: 'sideways',
                        WebkitWritingMode: 'vertical-lr',
                        WebkitTextOrientation: 'sideways',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      THÔNG TIN CHỈ MANG TÍNH CHẤT GIẢI TRÍ
                    </div>
                  </div>

                  {/* Chân câu đối: Dấu ấn triện đỏ son */}
                  <div className="mt-2.5 px-1.5 py-0.5 rounded bg-red-800/95 border border-amber-400/60 text-[9px] font-black text-amber-200 tracking-widest shadow-sm shrink-0">
                    GIẢI TRÍ
                  </div>

                  {/* Họa tiết tua rua đuôi liễn */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-gradient-to-b from-amber-500 to-red-600 rounded-b-full shadow-sm" />

                  {/* Tooltip hiển thị đầy đủ văn bản khi hover */}
                  <div className="absolute left-full ml-3 top-6 w-72 p-3 rounded-xl bg-zinc-950/95 border border-amber-500/50 text-left shadow-2xl backdrop-blur-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
                    <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span>📜</span> QUY ĐỊNH VĂN HÓA & TRẢI NGHIỆM
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      Thông tin chỉ mang tính chất giải trí và chiêm nghiệm văn hóa truyền thống, tuyệt đối <strong>không cổ xúy mê tín dị đoan</strong>. Nhấp để xem đầy đủ quy định.
                    </p>
                  </div>
                </div>
              </motion.aside>

              {/* ── CÂU ĐỐI BÊN PHẢI (CÂU 2) ── */}
              <motion.aside
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="fixed right-3 2xl:right-5 top-24 z-40 pointer-events-auto select-none max-h-[calc(100vh-120px)]"
              >
                <div
                  onClick={() => setShowModal(true)}
                  className="group relative cursor-pointer flex flex-col items-center py-3 px-2 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-red-950/90 via-zinc-950/95 to-red-950/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_15px_rgba(217,119,6,0.2)] hover:border-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all duration-300 w-[62px] 2xl:w-[70px]"
                >
                  {/* Đầu câu đối: Khuy triện đồng vàng */}
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-[10px] shadow-sm mb-2.5 border border-amber-200 shrink-0">
                    <span>⚖️</span>
                  </div>

                  {/* Thân câu đối bên phải: "Tất cả thông tin..." lên trước (nằm ngoài mép phải), mới tới câu kia (nằm trong) */}
                  <div className="flex flex-row justify-center items-center gap-1.5 2xl:gap-2 py-1">
                    {/* Cột trong (hướng vào tâm màn hình): Bất kỳ cá nhân tổ chức nào */}
                    <div
                      className="text-[10px] 2xl:text-[11px] font-black text-amber-300 uppercase tracking-[0.14em] text-center group-hover:text-amber-100 transition-colors whitespace-nowrap"
                      style={{
                        writingMode: 'vertical-lr',
                        textOrientation: 'sideways',
                        WebkitWritingMode: 'vertical-lr',
                        WebkitTextOrientation: 'sideways',
                      }}
                    >
                      BẤT KỲ CÁ NHÂN TỔ CHỨC NÀO
                    </div>

                    {/* Vạch ngăn trang trí tinh tế */}
                    <div className="w-[1px] h-36 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent shrink-0" />

                    {/* Cột ngoài (lên trước, sát mép ngoài phải màn hình): Tất cả thông tin không công kích */}
                    <div
                      className="text-[10px] 2xl:text-[11px] font-black text-amber-200 uppercase tracking-[0.14em] text-center group-hover:text-amber-100 transition-colors whitespace-nowrap"
                      style={{
                        writingMode: 'vertical-lr',
                        textOrientation: 'sideways',
                        WebkitWritingMode: 'vertical-lr',
                        WebkitTextOrientation: 'sideways',
                      }}
                    >
                      TẤT CẢ THÔNG TIN KHÔNG CÔNG KÍCH
                    </div>
                  </div>

                  {/* Chân câu đối: Dấu ấn triện đỏ son */}
                  <div className="mt-2.5 px-1.5 py-0.5 rounded bg-red-800/95 border border-amber-400/60 text-[9px] font-black text-amber-200 tracking-widest shadow-sm shrink-0">
                    TRUNG LẬP
                  </div>

                  {/* Họa tiết tua rua đuôi liễn */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-gradient-to-b from-amber-500 to-red-600 rounded-b-full shadow-sm" />

                  {/* Tooltip hướng dẫn khi hover */}
                  <div className="absolute right-full mr-3 top-6 w-72 p-3 rounded-xl bg-zinc-950/95 border border-amber-500/50 text-left shadow-2xl backdrop-blur-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
                    <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span>⚖️</span> MIỄN TRỪ TRÁCH NHIỆM PHÁP LÝ
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      Mọi nội dung giải đoán mang tính khách quan học thuật, <strong>không công kích bất kỳ cá nhân hoặc tổ chức nào</strong>, tuân thủ pháp luật và chuẩn mực đạo đức.
                    </p>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ============================================================== */}
      {/* BANNER PHÁP LÝ CHO TABLET & MÀN HÌNH VỪA (768px - 1280px)       */}
      {/* (Trên mobile < 768px đã có nút ⚖️ Pháp Lý trong MobileBottomNav) */}
      {/* ============================================================== */}
      <div className="hidden md:block xl:hidden fixed bottom-0 left-0 right-0 z-40 pointer-events-auto bg-zinc-950/95 border-t border-amber-500/30 px-3 py-1.5 backdrop-blur-md">
        <div className="flex items-center justify-between max-w-5xl mx-auto gap-2">
          <div className="text-[10px] sm:text-[11px] text-zinc-300 leading-tight flex-1">
            <span className="text-amber-400 font-bold">⚠️ LƯU Ý PHÁP LÝ:</span> Thông tin chỉ mang tính chất giải trí, không cổ xúy mê tín dị đoan. Không công kích bất kỳ cá nhân tổ chức nào.
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-[10px] font-bold text-amber-400 px-2 py-0.5 rounded border border-amber-500/40 hover:bg-amber-500/20 whitespace-nowrap cursor-pointer"
          >
            Chi Tiết
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL CHI TIẾT TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM KHI NHẤP VÀO */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-lg w-full bg-zinc-950 border border-amber-500/50 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2 text-base font-bold text-amber-300">
                  <span>⚖️</span> TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM & PHÁP LÝ
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans max-h-[60vh] overflow-y-auto pr-1">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 font-medium">
                  <strong>Câu 1:</strong> Thông tin chỉ mang tính chất giải trí, tham khảo và nghiên cứu văn hóa truyền thống, tuyệt đối không cổ xúy mê tín dị đoan dưới mọi hình thức.
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 font-medium">
                  <strong>Câu 2:</strong> Tất cả thông tin luận giải hoàn toàn khách quan theo lý số học thuật, tuyệt đối không công kích, xúc phạm hay làm ảnh hưởng đến danh dự của bất kỳ cá nhân, tập thể hay tổ chức nào.
                </div>

                <p className="text-zinc-400 text-xs">
                  • Hệ thống Tử Vi Đẩu Số và Bách Gia Thuật Số được phát triển dựa trên các thư tịch cổ công khai (Tử Vi Đẩu Số Toàn Thư, Cốt Tủy Phú) và giáo trình Thiên Kỷ của danh sư Nghê Hải Hà.
                </p>
                <p className="text-zinc-400 text-xs">
                  • Người sử dụng cần tự chịu trách nhiệm về các quyết định cá nhân trong cuộc sống, không coi những thông tin chiêm nghiệm này là chỉ định y khoa, đầu tư tài chính hay pháp lý bắt buộc.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all"
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
