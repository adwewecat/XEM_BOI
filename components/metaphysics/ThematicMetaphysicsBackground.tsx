'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';

export type MetaphysicsTheme =
  | 'palmistry'
  | 'tarot'
  | 'dongtam'
  | 'almanac'
  | 'bazi'
  | 'iching'
  | 'numerology';

interface ThematicMetaphysicsBackgroundProps {
  activeTheme: MetaphysicsTheme;
  className?: string;
}

export default function ThematicMetaphysicsBackground({
  activeTheme,
  className = '',
}: ThematicMetaphysicsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(activeTheme);

  // Cập nhật ref khi prop thay đổi
  useEffect(() => {
    themeRef.current = activeTheme;
  }, [activeTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isLight = theme === 'light';

    // ─── Biến Trạng Thái Chuyển Động (Animation State) ─────────────
    let time = 0;
    let currentTheme: MetaphysicsTheme = themeRef.current;
    let blendWeight = 1; // 0 -> 1 cho hiệu ứng chuyển đổi mượt mà

    // Hạt năng lượng tự do
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.7 + 0.2,
      color: 'rgba(212, 168, 67, ',
    }));

    // Vòng sóng cộng hưởng cho Động Tâm
    const ripples: Array<{ r: number; maxR: number; opacity: number }> = [
      { r: 20, maxR: 280, opacity: 0.8 },
      { r: 90, maxR: 280, opacity: 0.5 },
      { r: 160, maxR: 280, opacity: 0.3 },
    ];

    // Lá bài Tarot lơ lửng
    const tarotCards = Array.from({ length: 6 }, (_, i) => ({
      angle: (i * Math.PI * 2) / 6,
      distance: 180,
      width: 44,
      height: 72,
      rotSpeed: 0.006,
    }));

    // Số Thần Số Học bay
    const pythagorasNums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '22', '33'];
    const numPositions = pythagorasNums.map((num, i) => ({
      num,
      x: (width * (0.15 + (i * 0.07))) % (width * 0.85),
      y: (height * (0.2 + ((i * 37) % 60) * 0.01)),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: 0.45,
    }));

    // ─── Loop Vẽ Canvas ──────────────────────────────────────────
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Cập nhật chuyển đổi chủ đề mượt mà
      if (currentTheme !== themeRef.current) {
        blendWeight -= 0.06;
        if (blendWeight <= 0) {
          currentTheme = themeRef.current;
          blendWeight = 1;
        }
      } else if (blendWeight < 1) {
        blendWeight = Math.min(1, blendWeight + 0.06);
      }

      const cx = width / 2;
      const cy = height * 0.48;

      ctx.save();
      ctx.globalAlpha = blendWeight * (isLight ? 0.65 : 0.85);

      // ══════════════════════════════════════════════════════════════
      // 1. CHỦ ĐỀ: BÓI CHỈ TAY (PALMISTRY)
      // ══════════════════════════════════════════════════════════════
      if (currentTheme === 'palmistry') {
        // Hào quang bàn tay vàng kim trung tâm
        const palmGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 260);
        palmGrad.addColorStop(0, isLight ? 'rgba(180, 140, 40, 0.20)' : 'rgba(212, 168, 67, 0.30)');
        palmGrad.addColorStop(0.6, isLight ? 'rgba(5, 150, 105, 0.08)' : 'rgba(16, 185, 129, 0.15)');
        palmGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = palmGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 280, 0, Math.PI * 2);
        ctx.fill();

        // Vẽ phác họa bàn tay thần thoại bằng nét vẽ ánh sáng
        ctx.save();
        ctx.translate(cx, cy);
        ctx.strokeStyle = isLight ? 'rgba(160, 120, 20, 0.6)' : 'rgba(240, 205, 90, 0.75)';
        ctx.lineWidth = 1.6;
        if (!isLight) {
          ctx.shadowColor = 'rgba(212, 168, 67, 0.9)';
          ctx.shadowBlur = 12;
        }

        // Đồ hình bàn tay huyền bí cách điệu
        ctx.beginPath();
        ctx.arc(0, 40, 95, 0.2, Math.PI - 0.2); // Đáy lòng bàn tay
        ctx.stroke();

        // 4 Dòng Năng Lượng Chỉ Tay Chạy Sáng Liên Tục (Pulsing Energy Lines)
        const pulse = (Math.sin(time * 3) + 1) / 2;

        // Sinh Đạo (Lục Bảo)
        ctx.beginPath();
        ctx.arc(-25, 45, 60, Math.PI * 0.2, Math.PI * 0.9);
        ctx.strokeStyle = `rgba(16, 185, 129, ${0.6 + pulse * 0.4})`;
        ctx.lineWidth = 2.4;
        ctx.stroke();

        // Trí Đạo (Ngọc Lam)
        ctx.beginPath();
        ctx.moveTo(-35, 30);
        ctx.quadraticCurveTo(10, 50, 65, 80);
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.6 + pulse * 0.4})`;
        ctx.lineWidth = 2.4;
        ctx.stroke();

        // Tâm Đạo (Hồng Đỏ)
        ctx.beginPath();
        ctx.moveTo(65, 15);
        ctx.quadraticCurveTo(0, 0, -25, -20);
        ctx.strokeStyle = `rgba(244, 63, 94, ${0.6 + pulse * 0.4})`;
        ctx.lineWidth = 2.4;
        ctx.stroke();

        // Định Mệnh (Tím Hoàng Gia)
        ctx.beginPath();
        ctx.moveTo(10, 110);
        ctx.lineTo(10, -30);
        ctx.strokeStyle = `rgba(168, 85, 247, ${0.6 + pulse * 0.4})`;
        ctx.lineWidth = 2.0;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Vòng luân xa các gò bàn tay phát sáng
        const chakraMounts = [
          { x: -35, y: 70, col: '#10b981', label: '♀ Kim Tinh' },
          { x: -25, y: -40, col: '#60a5fa', label: '♃ Mộc Tinh' },
          { x: 25, y: -45, col: '#facc15', label: '☉ Thái Dương' },
          { x: 55, y: -30, col: '#2dd4bf', label: '☿ Thủy Tinh' },
          { x: 50, y: 75, col: '#c084fc', label: '☽ Nguyệt Tinh' },
        ];
        chakraMounts.forEach((m) => {
          ctx.beginPath();
          ctx.arc(m.x, m.y, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = m.col;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(m.x, m.y, 10 + pulse * 4, 0, Math.PI * 2);
          ctx.strokeStyle = m.col;
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        ctx.restore();
      }

      // ══════════════════════════════════════════════════════════════
      // 2. CHỦ ĐỀ: BÀI TAROT (ARCANA PORTAL)
      // ══════════════════════════════════════════════════════════════
      else if (currentTheme === 'tarot') {
        // Tinh vân ma pháp tím sapphire
        const tarotGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, 270);
        tarotGrad.addColorStop(0, 'rgba(126, 34, 206, 0.28)');
        tarotGrad.addColorStop(0.5, 'rgba(67, 56, 202, 0.18)');
        tarotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = tarotGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 290, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.translate(cx, cy);

        // Vòng tròn triệu hồi ma pháp (Arcana Summoning Circle)
        ctx.rotate(time * 0.2);
        ctx.strokeStyle = isLight ? 'rgba(120, 50, 180, 0.5)' : 'rgba(192, 132, 252, 0.7)';
        ctx.lineWidth = 1.4;
        if (!isLight) {
          ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
          ctx.shadowBlur = 10;
        }

        // Vòng ngoài
        ctx.beginPath();
        ctx.arc(0, 0, 160, 0, Math.PI * 2);
        ctx.stroke();

        // Hình sao 6 cánh (Hexagram) trong ma pháp trận
        for (let k = 0; k < 2; k++) {
          ctx.beginPath();
          for (let i = 0; i < 3; i++) {
            const a = (i * Math.PI * 2) / 3 + (k * Math.PI) / 3;
            const x = Math.cos(a) * 140;
            const y = Math.sin(a) * 140;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }

        // 4 Biểu tượng Bộ Ẩn Phụ (Ly, Kiếm, Gậy, Tiền)
        const suits = ['🏆', '⚔️', '🪄', '🪙'];
        ctx.font = '18px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        suits.forEach((sym, idx) => {
          const a = (idx * Math.PI) / 2;
          ctx.fillText(sym, Math.cos(a) * 85, Math.sin(a) * 85);
        });

        // 6 Thẻ bài Tarot xoay quanh quỹ đạo
        tarotCards.forEach((card, idx) => {
          const cardAngle = card.angle + time * 0.3;
          const kx = Math.cos(cardAngle) * card.distance;
          const ky = Math.sin(cardAngle) * card.distance;

          ctx.save();
          ctx.translate(kx, ky);
          ctx.rotate(cardAngle + Math.PI / 2);

          // Khung thẻ bài phát sáng
          ctx.fillStyle = 'rgba(30, 20, 50, 0.75)';
          ctx.strokeStyle = 'rgba(240, 200, 100, 0.8)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(-card.width / 2, -card.height / 2, card.width, card.height, 5);
          ctx.fill();
          ctx.stroke();

          // Hoa văn lưng bài Tarot (Mặt Trăng & Ngôi Sao)
          ctx.fillStyle = 'rgba(212, 168, 67, 0.85)';
          ctx.font = '12px system-ui';
          ctx.fillText(idx % 2 === 0 ? '☽' : '★', 0, 0);

          ctx.restore();
        });

        ctx.restore();
      }

      // ══════════════════════════════════════════════════════════════
      // 3. CHỦ ĐỀ: BÓI HỮU DUYÊN (GIỜ ĐỘNG TÂM - TIME RIPPLES)
      // ══════════════════════════════════════════════════════════════
      else if (currentTheme === 'dongtam') {
        const timeGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 250);
        timeGrad.addColorStop(0, 'rgba(212, 168, 67, 0.25)');
        timeGrad.addColorStop(0.5, 'rgba(234, 179, 8, 0.12)');
        timeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = timeGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 270, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.translate(cx, cy);

        // Các vòng sóng đồng tâm lan tỏa (Ripples of Destiny)
        ripples.forEach((rip) => {
          rip.r += 0.8;
          if (rip.r > rip.maxR) rip.r = 10;
          const alpha = Math.max(0, 1 - rip.r / rip.maxR) * 0.6;

          ctx.beginPath();
          ctx.arc(0, 0, rip.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(245, 215, 120, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        // Mặt đồng hồ thiên văn (Astrolabe Clock)
        ctx.beginPath();
        ctx.arc(0, 0, 130, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(212, 168, 67, 0.8)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // 12 Vạch giờ thời không
        for (let i = 0; i < 12; i++) {
          const a = (i * Math.PI * 2) / 12;
          const x1 = Math.cos(a) * 115;
          const y1 = Math.sin(a) * 115;
          const x2 = Math.cos(a) * 128;
          const y2 = Math.sin(a) * 128;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = 'rgba(240, 200, 100, 0.9)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Kim giờ & Kim phút xoay
        const hourAngle = time * 0.4;
        const minAngle = time * 2.5;

        // Kim giờ
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(hourAngle) * 65, Math.sin(hourAngle) * 65);
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3.5;
        ctx.stroke();

        // Kim phút
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(minAngle) * 95, Math.sin(minAngle) * 95);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      }

      // ══════════════════════════════════════════════════════════════
      // 4. CHỦ ĐỀ: TRẠCH NHẬT (NGÀY LÀNH DỮ & NHẬT NGUYỆT)
      // ══════════════════════════════════════════════════════════════
      else if (currentTheme === 'almanac') {
        ctx.save();
        ctx.translate(cx, cy);

        // Vòng 28 Tinh Tú (Nhị Thập Bát Tú) xoay chậm
        ctx.rotate(time * 0.1);
        ctx.strokeStyle = 'rgba(212, 168, 67, 0.5)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, 0, 155, 0, Math.PI * 2);
        ctx.stroke();

        // 28 Điểm sao
        for (let i = 0; i < 28; i++) {
          const a = (i * Math.PI * 2) / 28;
          const x = Math.cos(a) * 155;
          const y = Math.sin(a) * 155;
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = i % 7 === 0 ? '#facc15' : 'rgba(255, 235, 170, 0.85)';
          ctx.fill();
        }

        // Mặt Trời Thái Dương (Vàng rực) & Mặt Trăng Thái Âm (Bạc sáng)
        const sunX = Math.cos(time * 0.5) * 85;
        const sunY = Math.sin(time * 0.5) * 85;
        const moonX = -sunX;
        const moonY = -sunY;

        // Mặt Trời
        ctx.beginPath();
        ctx.arc(sunX, sunY, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 16;
        ctx.fill();

        // Mặt Trăng
        ctx.beginPath();
        ctx.arc(moonX, moonY, 15, 0, Math.PI * 2);
        ctx.fillStyle = '#e0e7ff';
        ctx.shadowColor = '#818cf8';
        ctx.shadowBlur = 14;
        ctx.fill();

        ctx.restore();
      }

      // ══════════════════════════════════════════════════════════════
      // 5. CHỦ ĐỀ: TỬ BÌNH BÁT TỰ (NGŨ HÀNH TƯƠNG SINH)
      // ══════════════════════════════════════════════════════════════
      else if (currentTheme === 'bazi') {
        ctx.save();
        ctx.translate(cx, cy);

        // Ngũ Hành (Kim, Mộc, Thủy, Hỏa, Thổ) theo hình ngũ giác
        const elements = [
          { name: 'KIM', color: '#fbbf24', x: 0, y: -110 },
          { name: 'THỦY', color: '#38bdf8', x: 105, y: -35 },
          { name: 'MỘC', color: '#4ade80', x: 65, y: 90 },
          { name: 'HỎA', color: '#f87171', x: -65, y: 90 },
          { name: 'THỔ', color: '#ca8a04', x: -105, y: -35 },
        ];

        // Đường tương sinh (Vòng ngoài)
        ctx.beginPath();
        elements.forEach((el, idx) => {
          if (idx === 0) ctx.moveTo(el.x, el.y);
          else ctx.lineTo(el.x, el.y);
        });
        ctx.closePath();
        ctx.strokeStyle = 'rgba(212, 168, 67, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Đường tương khắc (Ngôi sao 5 cánh bên trong)
        ctx.beginPath();
        ctx.moveTo(elements[0].x, elements[0].y);
        ctx.lineTo(elements[2].x, elements[2].y);
        ctx.lineTo(elements[4].x, elements[4].y);
        ctx.lineTo(elements[1].x, elements[1].y);
        ctx.lineTo(elements[3].x, elements[3].y);
        ctx.closePath();
        ctx.strokeStyle = 'rgba(240, 200, 100, 0.25)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Vẽ các khối ngũ hành
        elements.forEach((el) => {
          ctx.beginPath();
          ctx.arc(el.x, el.y, 22, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
          ctx.strokeStyle = el.color;
          ctx.lineWidth = 2;
          ctx.shadowColor = el.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.stroke();

          ctx.font = 'bold 11px system-ui';
          ctx.fillStyle = el.color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(el.name, el.x, el.y);
        });

        ctx.restore();
      }

      // ══════════════════════════════════════════════════════════════
      // 6. CHỦ ĐỀ: KINH DỊCH (64 QUẺ & BÁT QUÁI)
      // ══════════════════════════════════════════════════════════════
      else if (currentTheme === 'iching') {
        ctx.save();
        ctx.translate(cx, cy);

        // Bát quái xoay tròn
        ctx.rotate(-time * 0.15);
        ctx.strokeStyle = 'rgba(212, 168, 67, 0.65)';
        ctx.lineWidth = 1.4;

        ctx.beginPath();
        ctx.arc(0, 0, 140, 0, Math.PI * 2);
        ctx.stroke();

        const baguaSymbols = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷'];
        ctx.font = '24px "Segoe UI Symbol", system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#facc15';

        baguaSymbols.forEach((sym, idx) => {
          const a = (idx * Math.PI * 2) / 8;
          ctx.fillText(sym, Math.cos(a) * 110, Math.sin(a) * 110);
        });

        // Thái Cực Âm Dương ở trung tâm
        ctx.rotate(time * 0.3);
        const tr = 36;
        ctx.beginPath();
        ctx.arc(0, 0, tr, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, -tr / 2, tr / 2, Math.PI * 1.5, Math.PI * 0.5, false);
        ctx.arc(0, tr / 2, tr / 2, Math.PI * 1.5, Math.PI * 0.5, true);
        ctx.stroke();

        ctx.restore();
      }

      // ══════════════════════════════════════════════════════════════
      // 7. CHỦ ĐỀ: THẦN SỐ HỌC (PYTHAGORAS & HOÀNG ĐẠO)
      // ══════════════════════════════════════════════════════════════
      else if (currentTheme === 'numerology') {
        ctx.save();

        // Các con số thần số học bay lơ lửng trong không gian
        ctx.font = 'bold 20px "SF Pro Display", system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        numPositions.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 40 || n.x > width - 40) n.vx *= -1;
          if (n.y < 80 || n.y > height - 80) n.vy *= -1;

          ctx.fillStyle = `rgba(240, 205, 90, ${0.35 + Math.sin(time * 2 + Number(n.num)) * 0.2})`;
          ctx.fillText(n.num, n.x, n.y);
        });

        // Vòng tròn 12 Cung Hoàng Đạo
        ctx.translate(cx, cy);
        ctx.rotate(time * 0.12);
        ctx.strokeStyle = 'rgba(96, 165, 250, 0.5)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, 0, 140, 0, Math.PI * 2);
        ctx.stroke();

        const zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
        ctx.font = '16px system-ui';
        ctx.fillStyle = '#93c5fd';
        zodiacSymbols.forEach((sym, idx) => {
          const a = (idx * Math.PI * 2) / 12;
          ctx.fillText(sym, Math.cos(a) * 115, Math.sin(a) * 115);
        });

        ctx.restore();
      }

      // Hạt năng lượng tự do bay xung quanh
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${className}`}
    />
  );
}

