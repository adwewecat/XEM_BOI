'use client';
import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const isLight = theme === 'light';
    const starCount = isLight ? 75 : 135;

    // Các hạt sao nền tinh giản, dịu nhẹ, không lấn át nội dung
    type Star = {
      x: number;
      y: number;
      r: number;
      alpha: number;
      alphaDir: number;
      speed: number;
      color: string;
      glow: boolean;
    };

    const stars: Star[] = Array.from({ length: starCount }, () => {
      const isGold = Math.random() > 0.65;
      const baseAlpha = Math.random() * 0.35 + 0.12;
      const glow = Math.random() > 0.85;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: isLight ? Math.random() * 1.1 + 0.4 : Math.random() * 1.3 + 0.4,
        alpha: baseAlpha,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        speed: Math.random() * 0.005 + 0.002,
        glow,
        color: isLight
          ? 'rgba(160, 110, 20, '
          : isGold
          ? 'rgba(255, 220, 130, '
          : 'rgba(180, 215, 255, ',
      };
    });

    // Chòm sao Bắc Đẩu Thất Tinh (Bố trí góc cao bên trái, xa khu vực đọc chữ)
    const beidouPoints = [
      { xRel: 0.05, yRel: 0.09, name: 'Thiên Xu' },
      { xRel: 0.08, yRel: 0.07, name: 'Thiên Tuyền' },
      { xRel: 0.11, yRel: 0.11, name: 'Thiên Cơ' },
      { xRel: 0.14, yRel: 0.13, name: 'Thiên Quyền' },
      { xRel: 0.17, yRel: 0.17, name: 'Ngọc Hoành' },
      { xRel: 0.19, yRel: 0.22, name: 'Khai Dương' },
      { xRel: 0.21, yRel: 0.27, name: 'Dao Quang' },
    ];

    // Chòm sao Tử Vi Viên (Bố trí góc cao bên phải, xa khu vực trung tâm)
    const ziweiPoints = [
      { xRel: 0.89, yRel: 0.08, name: 'Tử Vi' },
      { xRel: 0.85, yRel: 0.13, name: 'Thiên Phủ' },
      { xRel: 0.91, yRel: 0.15, name: 'Vũ Khúc' },
      { xRel: 0.94, yRel: 0.11, name: 'Thái Dương' },
      { xRel: 0.90, yRel: 0.20, name: 'Thái Âm' },
    ];

    // 8 Quẻ Bát Quái
    const baguaSymbols = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷'];
    const baguaNames = ['Càn', 'Đoài', 'Ly', 'Chấn', 'Tốn', 'Khảm', 'Cấn', 'Khôn'];

    // 12 Địa Chi
    const earthlyBranches = [
      'TÝ', 'SỬU', 'DẦN', 'MÃO', 'THÌN', 'TỊ',
      'NGỌ', 'MÙI', 'THÂN', 'DẬU', 'TUẤT', 'HỢI',
    ];

    // Sao băng dịu nhẹ
    type Meteor = {
      x: number;
      y: number;
      len: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    };

    let meteor: Meteor = {
      x: 0,
      y: 0,
      len: 0,
      speed: 0,
      angle: Math.PI / 4,
      opacity: 0,
      active: false,
    };

    const spawnMeteor = () => {
      meteor = {
        x: Math.random() * canvas.width * 0.6 + canvas.width * 0.1,
        y: Math.random() * canvas.height * 0.25,
        len: Math.random() * 70 + 50,
        speed: Math.random() * 6 + 7,
        angle: (Math.PI / 180) * (Math.random() * 20 + 35),
        opacity: 0.5,
        active: true,
      };
    };

    let lastMeteorTime = Date.now();
    let rotationAngle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      // 0. VẼ DẢI TINH VÂN VŨ TRỤ HUYỀN ẢO DỊU NHẸ (Không gây chói hoặc đục nền)
      if (!isLight) {
        // Tinh vân xanh thẳm sâu lắng
        const grad1 = ctx.createRadialGradient(
          canvas.width * 0.5, canvas.height * 0.5, 30,
          canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.65
        );
        grad1.addColorStop(0, 'rgba(16, 28, 64, 0.12)');
        grad1.addColorStop(0.5, 'rgba(8, 16, 38, 0.06)');
        grad1.addColorStop(1, 'rgba(2, 6, 14, 0)');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Hào quang vàng kim mỏng nhẹ ở xa
        const grad2 = ctx.createRadialGradient(
          canvas.width * 0.5, canvas.height * 0.65, 20,
          canvas.width * 0.5, canvas.height * 0.65, canvas.width * 0.4
        );
        grad2.addColorStop(0, 'rgba(212, 168, 67, 0.03)');
        grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 1. VẼ CÁC HẠT SAO NỀN (LẤP LÁNH DỊU MẮT)
      stars.forEach(p => {
        p.alpha += p.alphaDir * p.speed;
        if (p.alpha >= 0.60) { p.alpha = 0.60; p.alphaDir = -1; }
        if (p.alpha <= 0.10) { p.alpha = 0.10; p.alphaDir = 1; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        if (p.glow && !isLight && p.r > 1.1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha * 0.18})`;
          ctx.fill();
        }
      });

      // 2. VẼ CHÒM SAO BẮC ĐẨU THẤT TINH (GÓC TÂY BẮC, NÉT MẢNH THANH TAO)
      const constellationAlpha = isLight ? 0.12 : 0.22;
      ctx.save();
      ctx.strokeStyle = isLight
        ? `rgba(160, 110, 20, ${constellationAlpha * 0.7})`
        : `rgba(240, 195, 80, ${constellationAlpha})`;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 4]);

      ctx.beginPath();
      beidouPoints.forEach((pt, idx) => {
        const x = pt.xRel * canvas.width;
        const y = pt.yRel * canvas.height;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Điểm sao Bắc Đẩu
      beidouPoints.forEach(pt => {
        const x = pt.xRel * canvas.width;
        const y = pt.yRel * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(160, 110, 20, 0.08)' : 'rgba(240, 195, 80, 0.14)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(160, 110, 20, 0.55)' : 'rgba(255, 235, 170, 0.65)';
        ctx.fill();

        // Nhãn sao tinh tế, mờ nhẹ
        ctx.font = '8px system-ui, sans-serif';
        ctx.fillStyle = isLight ? 'rgba(140, 90, 10, 0.25)' : 'rgba(255, 220, 130, 0.32)';
        ctx.fillText(pt.name, x + 4, y - 4);
      });

      // 3. VẼ CHÒM SAO TỬ VI VIÊN (GÓC ĐÔNG BẮC, NÉT MẢNH THANH NHÃ)
      ctx.save();
      ctx.strokeStyle = isLight
        ? `rgba(140, 100, 20, ${constellationAlpha * 0.6})`
        : `rgba(140, 200, 255, ${constellationAlpha * 0.85})`;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 4]);

      ctx.beginPath();
      ziweiPoints.forEach((pt, idx) => {
        const x = pt.xRel * canvas.width;
        const y = pt.yRel * canvas.height;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      ziweiPoints.forEach(pt => {
        const x = pt.xRel * canvas.width;
        const y = pt.yRel * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(140, 100, 20, 0.08)' : 'rgba(120, 190, 255, 0.14)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(140, 100, 20, 0.55)' : 'rgba(210, 240, 255, 0.65)';
        ctx.fill();

        ctx.font = '8px system-ui, sans-serif';
        ctx.fillStyle = isLight ? 'rgba(120, 80, 10, 0.25)' : 'rgba(180, 220, 255, 0.32)';
        ctx.fillText(pt.name, x + 4, y - 4);
      });

      // 4. VẼ VÒNG BÁT QUÁI & 12 ĐỊA CHI (HÌNH THỦY ẤN CHÌM CỔ KÍNH - KHÔNG CẮT VÀO CHỮ)
      rotationAngle += 0.0006;
      const centerX = canvas.width / 2;
      // Hạ tâm đĩa thiên văn xuống dưới để không va chạm dòng tiêu đề chính
      const centerY = canvas.height * 0.64;
      const dialRadius = Math.min(canvas.width, canvas.height) * 0.31;

      if (dialRadius > 120) {
        ctx.save();
        ctx.translate(centerX, centerY);

        // Độ mờ chìm nhã nhặn (watermark mờ), tuyệt đối không lấn át văn bản chính
        const dialOpacity = isLight ? 0.06 : 0.09;

        // Vòng tròn quỹ đạo ngoài
        ctx.beginPath();
        ctx.arc(0, 0, dialRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? `rgba(180, 130, 30, ${dialOpacity})`
          : `rgba(240, 195, 80, ${dialOpacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Vòng tròn quỹ đạo trong
        ctx.beginPath();
        ctx.arc(0, 0, dialRadius * 0.74, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? `rgba(180, 130, 30, ${dialOpacity * 0.8})`
          : `rgba(240, 195, 80, ${dialOpacity * 0.8})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // Vòng 12 Địa Chi (Xoay thuận, mờ dịu)
        ctx.save();
        ctx.rotate(rotationAngle);
        ctx.font = '9px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = isLight
          ? `rgba(140, 90, 10, ${dialOpacity * 1.5})`
          : `rgba(240, 200, 100, ${dialOpacity * 1.8})`;

        const branchStep = (Math.PI * 2) / 12;
        earthlyBranches.forEach((branch, idx) => {
          const angle = idx * branchStep;
          const bx = Math.cos(angle) * (dialRadius * 0.88);
          const by = Math.sin(angle) * (dialRadius * 0.88);
          ctx.fillText(branch, bx, by);
        });
        ctx.restore();

        // Vòng Bát Quái 8 Quẻ (Xoay nghịch, mờ dịu)
        ctx.save();
        ctx.rotate(-rotationAngle * 0.7);
        const baguaStep = (Math.PI * 2) / 8;
        ctx.font = '14px "Segoe UI Symbol", system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = isLight
          ? `rgba(140, 90, 10, ${dialOpacity * 1.6})`
          : `rgba(255, 230, 140, ${dialOpacity * 1.9})`;

        baguaSymbols.forEach((sym, idx) => {
          const angle = idx * baguaStep;
          const gx = Math.cos(angle) * (dialRadius * 0.62);
          const gy = Math.sin(angle) * (dialRadius * 0.62);
          ctx.fillText(sym, gx, gy);

          // Tên quẻ nhỏ bên dưới ký hiệu
          ctx.save();
          ctx.font = '8px system-ui, sans-serif';
          ctx.fillStyle = isLight
            ? `rgba(140, 90, 10, ${dialOpacity * 1.2})`
            : `rgba(240, 200, 100, ${dialOpacity * 1.4})`;
          ctx.fillText(baguaNames[idx], gx, gy + 11);
          ctx.restore();
        });
        ctx.restore();

        // Biểu tượng Thái Cực (Yin-Yang) ở trung tâm
        ctx.save();
        ctx.rotate(rotationAngle * 1.2);
        const taijiR = dialRadius * 0.15;
        ctx.beginPath();
        ctx.arc(0, 0, taijiR, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? `rgba(180, 130, 30, ${dialOpacity * 1.2})`
          : `rgba(240, 195, 80, ${dialOpacity * 1.4})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, -taijiR / 2, taijiR / 2, Math.PI * 1.5, Math.PI * 0.5, false);
        ctx.arc(0, taijiR / 2, taijiR / 2, Math.PI * 1.5, Math.PI * 0.5, true);
        ctx.strokeStyle = isLight
          ? `rgba(180, 130, 30, ${dialOpacity * 1.2})`
          : `rgba(240, 195, 80, ${dialOpacity * 1.4})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, -taijiR / 2, taijiR * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? `rgba(180, 130, 30, ${dialOpacity * 1.2})` : `rgba(240, 195, 80, ${dialOpacity * 1.4})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, taijiR / 2, taijiR * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? `rgba(180, 130, 30, ${dialOpacity * 1.2})` : `rgba(240, 195, 80, ${dialOpacity * 1.4})`;
        ctx.fill();

        ctx.restore();
        ctx.restore();
      }

      // 5. SAO BĂNG (METEOR) DỊU DÀNG THOẢNG QUA
      if (!isLight) {
        if (!meteor.active && now - lastMeteorTime > 7000 + Math.random() * 5000) {
          spawnMeteor();
          lastMeteorTime = now;
        }

        if (meteor.active) {
          const tailX = meteor.x - Math.cos(meteor.angle) * meteor.len;
          const tailY = meteor.y - Math.sin(meteor.angle) * meteor.len;

          const grad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
          grad.addColorStop(0, 'rgba(255, 230, 160, 0)');
          grad.addColorStop(0.7, `rgba(255, 215, 100, ${meteor.opacity * 0.4})`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${meteor.opacity})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(meteor.x, meteor.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(meteor.x, meteor.y, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${meteor.opacity})`;
          ctx.fill();

          meteor.x += Math.cos(meteor.angle) * meteor.speed;
          meteor.y += Math.sin(meteor.angle) * meteor.speed;
          meteor.opacity -= 0.010;

          if (meteor.opacity <= 0 || meteor.x > canvas.width || meteor.y > canvas.height) {
            meteor.active = false;
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: theme === 'light' ? 0.45 : 0.85 }}
    />
  );
}
