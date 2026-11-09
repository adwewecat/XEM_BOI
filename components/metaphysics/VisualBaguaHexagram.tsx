'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface VisualBaguaHexagramProps {
  originalName: string;
  originalUpper: string;
  originalLower: string;
  movingLine: number; // 1..6
  changedName: string;
  changedUpper: string;
  changedLower: string;
  highlightOrgan?: string;
  highlightElement?: string;
}

// 8 Đơn quái biểu tượng và nhị phân (hào 3 ở trên, hào 2 ở giữa, hào 1 ở dưới)
const TRIGRAM_LINES: Record<string, [number, number, number]> = {
  'Trời (Thiên)': [1, 1, 1], // Càn
  'Càn': [1, 1, 1],
  'Đầm (Trạch)': [0, 1, 1], // Đoài
  'Đoài': [0, 1, 1],
  'Lửa (Hỏa)': [1, 0, 1], // Ly
  'Ly': [1, 0, 1],
  'Sấm (Lôi)': [0, 0, 1], // Chấn
  'Chấn': [0, 0, 1],
  'Gió (Phong)': [1, 1, 0], // Tốn
  'Tốn': [1, 1, 0],
  'Nước (Thủy)': [0, 1, 0], // Khảm
  'Khảm': [0, 1, 0],
  'Núi (Sơn)': [1, 0, 0], // Cấn
  'Cấn': [1, 0, 0],
  'Đất (Địa)': [0, 0, 0], // Khôn
  'Khôn': [0, 0, 0],
};

export default function VisualBaguaHexagram({
  originalName,
  originalUpper,
  originalLower,
  movingLine,
  changedName,
  changedUpper,
  changedLower,
  highlightOrgan,
  highlightElement,
}: VisualBaguaHexagramProps) {
  // Lấy 6 hào của Quẻ Gốc (từ hào 6 xuống hào 1)
  // Thượng quái: hào 6, 5, 4 (tương ứng index 0, 1, 2 trong TRIGRAM_LINES)
  // Hạ quái: hào 3, 2, 1 (tương ứng index 0, 1, 2 trong TRIGRAM_LINES)
  const upLines = TRIGRAM_LINES[originalUpper] || [0, 1, 1];
  const lowLines = TRIGRAM_LINES[originalLower] || [1, 0, 0];
  const orig6Lines = [
    { pos: 6, bit: upLines[0] },
    { pos: 5, bit: upLines[1] },
    { pos: 4, bit: upLines[2] },
    { pos: 3, bit: lowLines[0] },
    { pos: 2, bit: lowLines[1] },
    { pos: 1, bit: lowLines[2] },
  ];

  // Quẻ biến
  const chgUpLines = TRIGRAM_LINES[changedUpper] || [0, 0, 1];
  const chgLowLines = TRIGRAM_LINES[changedLower] || [1, 0, 0];
  const chg6Lines = [
    { pos: 6, bit: chgUpLines[0] },
    { pos: 5, bit: chgUpLines[1] },
    { pos: 4, bit: chgUpLines[2] },
    { pos: 3, bit: chgLowLines[0] },
    { pos: 2, bit: chgLowLines[1] },
    { pos: 1, bit: chgLowLines[2] },
  ];

  // Vòng ngũ hành
  const elements = [
    { name: 'Mộc', organ: 'Can (Gan), Đởm', color: 'text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-950/40' },
    { name: 'Hỏa', organ: 'Tâm (Tim), Mạch', color: 'text-rose-400', border: 'border-rose-500/40', bg: 'bg-rose-950/40' },
    { name: 'Thổ', organ: 'Tỳ (Lách), Vị', color: 'text-yellow-500', border: 'border-yellow-500/40', bg: 'bg-yellow-950/40' },
    { name: 'Kim', organ: 'Phế (Phổi), Đại tràng', color: 'text-amber-300', border: 'border-amber-400/40', bg: 'bg-amber-950/40' },
    { name: 'Thủy', organ: 'Thận, Bàng quang', color: 'text-sky-400', border: 'border-sky-500/40', bg: 'bg-sky-950/40' },
  ];

  return (
    <div className="card-glass p-5 rounded-2xl border border-amber-500/30 bg-zinc-950/80 shadow-2xl space-y-6">
      {/* Tiêu đề đồ họa */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">☯️</span>
          <div>
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-widest">
              ĐỒ HỌA BÁT QUÁI & BIẾN HÓA LỤC HÀO
            </h4>
            <span className="text-[10px] text-zinc-400">
              Trực quan hóa Hào Động và Vòng Sinh Khắc Ngũ Hành Tạng Phủ
            </span>
          </div>
        </div>
        <div className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          Chính Tông Dịch Học
        </div>
      </div>

      {/* SO SÁNH 2 QUẺ TRỰC QUAN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        {/* Quẻ Gốc */}
        <div className="p-4 rounded-xl bg-zinc-900/70 border border-amber-500/30 relative">
          <div className="text-center mb-3">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">QUẺ BẢN THỂ (GỐC)</span>
            <div className="text-base font-black text-amber-200">{originalName}</div>
            <div className="text-[10px] text-zinc-400">
              Thượng: {originalUpper} · Hạ: {originalLower}
            </div>
          </div>

          {/* Vẽ 6 vạch hào */}
          <div className="space-y-2 py-1 max-w-[220px] mx-auto">
            {orig6Lines.map((line) => {
              const isMoving = line.pos === movingLine;
              return (
                <div key={line.pos} className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono ${isMoving ? 'text-rose-400 font-bold' : 'text-zinc-500'}`}>
                    H.{line.pos}
                  </span>
                  <div className="flex-1">
                    {line.bit === 1 ? (
                      // Hào Dương: Vạch liền
                      <div
                        className={`h-3 rounded-sm transition-all duration-300 ${
                          isMoving
                            ? 'bg-rose-500 shadow-md shadow-rose-500/50 animate-pulse'
                            : 'bg-gradient-to-r from-amber-400 to-yellow-300 shadow-sm shadow-amber-500/20'
                        }`}
                      />
                    ) : (
                      // Hào Âm: Vạch đứt
                      <div className="flex gap-2 h-3">
                        <div
                          className={`flex-1 rounded-sm ${
                            isMoving
                              ? 'bg-rose-500 shadow-md shadow-rose-500/50 animate-pulse'
                              : 'bg-zinc-500'
                          }`}
                        />
                        <div
                          className={`flex-1 rounded-sm ${
                            isMoving
                              ? 'bg-rose-500 shadow-md shadow-rose-500/50 animate-pulse'
                              : 'bg-zinc-500'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                  <span className={`text-[10px] w-12 text-right ${isMoving ? 'text-rose-400 font-black' : 'text-zinc-500'}`}>
                    {isMoving ? '⚡ĐỘNG' : line.bit === 1 ? 'Dương' : 'Âm'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quẻ Biến */}
        <div className="p-4 rounded-xl bg-zinc-900/70 border border-sky-500/30 relative">
          <div className="text-center mb-3">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">QUẺ BIẾN (KẾT QUẢ)</span>
            <div className="text-base font-black text-sky-200">{changedName}</div>
            <div className="text-[10px] text-zinc-400">
              Thượng: {changedUpper} · Hạ: {changedLower}
            </div>
          </div>

          {/* Vẽ 6 vạch hào biến */}
          <div className="space-y-2 py-1 max-w-[220px] mx-auto">
            {chg6Lines.map((line) => {
              const wasMoving = line.pos === movingLine;
              return (
                <div key={line.pos} className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-zinc-500">
                    H.{line.pos}
                  </span>
                  <div className="flex-1">
                    {line.bit === 1 ? (
                      // Hào Dương: Vạch liền
                      <div
                        className={`h-3 rounded-sm ${
                          wasMoving
                            ? 'bg-sky-400 shadow-md shadow-sky-500/40'
                            : 'bg-sky-500/80'
                        }`}
                      />
                    ) : (
                      // Hào Âm: Vạch đứt
                      <div className="flex gap-2 h-3">
                        <div
                          className={`flex-1 rounded-sm ${
                            wasMoving
                              ? 'bg-sky-400 shadow-md shadow-sky-500/40'
                              : 'bg-zinc-600'
                          }`}
                        />
                        <div
                          className={`flex-1 rounded-sm ${
                            wasMoving
                              ? 'bg-sky-400 shadow-md shadow-sky-500/40'
                              : 'bg-zinc-600'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] w-12 text-right text-zinc-400">
                    {wasMoving ? '✦ Biến' : line.bit === 1 ? 'Dương' : 'Âm'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ĐỒ HỌA NGŨ HÀNH TẠNG PHỦ BỆNH TẬT & SINH KHẮC */}
      <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <span>🔄</span> VÒNG NGŨ HÀNH TƯƠNG SINH TƯƠNG KHẮC (ĐÔNG Y MỆNH LÝ)
          </span>
          {highlightOrgan && (
            <span className="text-[11px] font-bold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
              Trọng điểm: {highlightOrgan}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          {elements.map((el) => {
            const isTarget = highlightElement?.includes(el.name);
            return (
              <div
                key={el.name}
                className={`p-2.5 rounded-xl border transition-all ${el.bg} ${el.border} ${
                  isTarget ? 'ring-2 ring-rose-500 scale-105 shadow-lg shadow-rose-500/20' : 'opacity-85'
                }`}
              >
                <div className={`text-base font-black ${el.color}`}>{el.name}</div>
                <div className="text-[10px] text-zinc-300 font-medium mt-0.5">{el.organ}</div>
                {isTarget && (
                  <div className="text-[9px] font-bold text-rose-300 mt-1 uppercase tracking-wider">
                    ⚠️ Lâm Bệnh Khí
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">
          💡 <strong>Quy luật sinh khắc cổ truyền:</strong> Mộc sinh Hỏa ➔ Hỏa sinh Thổ ➔ Thổ sinh Kim ➔ Kim sinh Thủy ➔ Thủy sinh Mộc. 
          Kim chủ Phổi (Phế), Hỏa chủ Tim (Tâm). Khi Kim gặp thế hưu tù, thoái thần hoặc bị Hỏa khắc mạnh thì khí quản và phổi suy giảm, cần tăng cường bổ khí dưỡng tạng.
        </p>
      </div>
    </div>
  );
}
