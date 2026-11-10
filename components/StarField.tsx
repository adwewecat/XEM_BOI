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
    const starCount = isLight ? 120 : 220;

    // Các hạt sao nền
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
      const isGold = Math.random() > 0.6;
      const baseAlpha = Math.random() * 0.6 + 0.35;
      const glow = Math.random() > 0.75;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: isLight ? Math.random() * 1.5 + 0.5 : Math.random() * 1.8 + 0.4,
        alpha: baseAlpha,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        speed: Math.random() * 0.006 + 0.003,
        glow,
        color: isLight
          ? 'rgba(180, 130, 30, '
          : isGold
          ? 'rgba(255, 225, 140, '
          : 'rgba(190, 225, 255, ',
      };
    });

    // Chòm sao Bắc Đẩu Thất Tinh (Big Dipper)
    const beidouPoints = [
      { xRel: 0.15, yRel: 0.18, name: 'Thiên Xu' },
      { xRel: 0.19, yRel: 0.16, name: 'Thiên Tuyền' },
      { xRel: 0.23, yRel: 0.20, name: 'Thiên Cơ' },
      { xRel: 0.26, yRel: 0.22, name: 'Thiên Quyền' },
      { xRel: 0.29, yRel: 0.26, name: 'Ngọc Hoành' },
      { xRel: 0.31, yRel: 0.31, name: 'Khai Dương' },
      { xRel: 0.35, yRel: 0.35, name: 'Dao Quang' },
    ];

    // Chòm sao Tử Vi Viên (Polaris & Emperor Crown)
    const ziweiPoints = [
      { xRel: 0.82, yRel: 0.18, name: 'Tử Vi' },
      { xRel: 0.80, yRel: 0.23, name: 'Thiên Phủ' },
      { xRel: 0.85, yRel: 0.24, name: 'Vũ Khúc' },
      { xRel: 0.88, yRel: 0.20, name: 'Thái Dương' },
      { xRel: 0.84, yRel: 0.29, name: 'Thái Âm' },
    ];

    // 8 Quẻ Bát Quái
    const baguaSymbols = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷'];
    const baguaNames = ['Càn', 'Đoài', 'Ly', 'Chấn', 'Tốn', 'Khảm', 'Cấn', 'Khôn'];

    // 12 Địa Chi / 12 Con Giáp
    const earthlyBranches = [
      'TÝ', 'SỬU', 'DẦN', 'MÃO', 'THÌN', 'TỊ',
      'NGỌ', 'MÙI', 'THÂN', 'DẬU', 'TUẤT', 'HỢI',
    ];

    // Sao băng (Shooting star / Meteor)
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
        x: Math.random() * canvas.width * 0.7 + canvas.width * 0.1,
        y: Math.random() * canvas.height * 0.3,
        len: Math.random() * 90 + 70,
        speed: Math.random() * 8 + 10,
        angle: (Math.PI / 180) * (Math.random() * 20 + 35), // ~45 deg
        opacity: 0.85,
        active: true,
      };
    };

    let lastMeteorTime = Date.now();
    let rotationAngle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      // 0. VẼ DẢI TINH VÂN VŨ TRỤ HUYỀN ẢO (COSMIC NEBULA GLOW) GIÚP BACKGROUND SÁNG VÀ NỔI BẬT
      if (!isLight) {
        // Tinh vân trung tâm: Sắc xanh thẳm huyền môn
        const grad1 = ctx.createRadialGradient(
          canvas.width * 0.5, canvas.height * 0.45, 30,
          canvas.width * 0.5, canvas.height * 0.45, canvas.width * 0.7
        );
        grad1.addColorStop(0, 'rgba(32, 54, 115, 0.28)');
        grad1.addColorStop(0.45, 'rgba(18, 32, 75, 0.16)');
        grad1.addColorStop(0.85, 'rgba(7, 14, 35, 0.08)');
        grad1.addColorStop(1, 'rgba(2, 8, 16, 0)');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Hào quang vàng kim stardust ở khu vực thiên bàn Bát Quái
        const grad2 = ctx.createRadialGradient(
          canvas.width * 0.5, canvas.height * 0.55, 20,
          canvas.width * 0.5, canvas.height * 0.55, canvas.width * 0.45
        );
        grad2.addColorStop(0, 'rgba(212, 168, 67, 0.12)');
        grad2.addColorStop(0.5, 'rgba(180, 130, 30, 0.05)');
        grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 1. VẼ CÁC HẠT SAO NỀN (TWINKLING STARS WITH GLOW)
      stars.forEach(p => {
        p.alpha += p.alphaDir * p.speed;
        if (p.alpha >= 0.98) { p.alpha = 0.98; p.alphaDir = -1; }
        if (p.alpha <= 0.20) { p.alpha = 0.20; p.alphaDir = 1; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Quầng sáng lung linh cho các sao lớn
        if (p.glow && !isLight && p.r > 1.0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha * 0.35})`;
          ctx.fill();
        }
      });

      // 2. VẼ ĐƯỜNG NỐI CHÒM SAO BẮC ĐẨU THẤT TINH (BIG DIPPER) - SÁNG VÀ RÕ NÉT
      const constellationAlpha = isLight ? 0.38 : 0.75;
      ctx.save();
      ctx.strokeStyle = isLight
        ? `rgba(180, 130, 30, ${constellationAlpha * 0.7})`
        : `rgba(240, 195, 80, ${constellationAlpha})`;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 4]);
      if (!isLight) {
        ctx.shadowColor = 'rgba(212, 168, 67, 0.8)';
        ctx.shadowBlur = 6;
      }

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

      // Điểm sao Bắc Đẩu phát sáng
      beidouPoints.forEach(pt => {
        const x = pt.xRel * canvas.width;
        const y = pt.yRel * canvas.height;
        // Hào quang ngoài
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(180, 120, 20, 0.20)' : 'rgba(240, 195, 80, 0.35)';
        ctx.fill();
        // Điểm tinh tú trung tâm
        ctx.beginPath();
        ctx.arc(x, y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(180, 120, 20, 0.9)' : 'rgba(255, 245, 200, 1)';
        ctx.fill();

        // Nhãn tên sao Bắc Đẩu
        ctx.font = '9px system-ui, sans-serif';
        ctx.fillStyle = isLight ? 'rgba(140, 90, 10, 0.75)' : 'rgba(255, 220, 130, 0.85)';
        ctx.fillText(pt.name, x, y - 9);
      });

      // 3. VẼ CHÒM SAO TỬ VI VIÊN (POLARIS / EMPEROR CONSTELLATION)
      ctx.save();
      ctx.strokeStyle = isLight
        ? `rgba(180, 130, 30, ${constellationAlpha * 0.6})`
        : `rgba(140, 200, 255, ${constellationAlpha * 0.9})`;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([2, 4]);
      if (!isLight) {
        ctx.shadowColor = 'rgba(120, 190, 255, 0.8)';
        ctx.shadowBlur = 6;
      }

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
        // Hào quang xanh ngọc hoàng đạo
        ctx.beginPath();
        ctx.arc(x, y, 7.5, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(140, 100, 20, 0.20)' : 'rgba(120, 190, 255, 0.35)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(140, 100, 20, 0.85)' : 'rgba(225, 245, 255, 1)';
        ctx.fill();

        ctx.font = '9px system-ui, sans-serif';
        ctx.fillStyle = isLight ? 'rgba(120, 80, 10, 0.75)' : 'rgba(180, 220, 255, 0.85)';
        ctx.fillText(pt.name, x, y - 8);
      });

      // 4. VẼ VÒNG BÁT QUÁI & 12 ĐỊA CHI XOAY CHẬM (MYSTICAL CELESTIAL DIAL) - NỔI BẬT & PHÁT QUANG
      rotationAngle += 0.0008; // Xoay chậm trang nghiêm
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.55;
      const dialRadius = Math.min(canvas.width, canvas.height) * 0.38;

      if (dialRadius > 140) {
        ctx.save();
        ctx.translate(centerX, centerY);

        const dialOpacity = isLight ? 0.16 : 0.46;

        // Bật phát sáng hoàng kim cho đĩa thiên bàn
        if (!isLight) {
          ctx.shadowColor = 'rgba(212, 168, 67, 0.75)';
          ctx.shadowBlur = 8;
        }

        // Vòng tròn quỹ đạo ngoài
        ctx.beginPath();
        ctx.arc(0, 0, dialRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? `rgba(180, 130, 30, ${dialOpacity})`
          : `rgba(240, 195, 80, ${dialOpacity})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Vòng tròn quỹ đạo trong
        ctx.beginPath();
        ctx.arc(0, 0, dialRadius * 0.72, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? `rgba(180, 130, 30, ${dialOpacity * 0.85})`
          : `rgba(240, 195, 80, ${dialOpacity * 0.85})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // Vòng 12 Địa Chi (Xoay thuận)
        ctx.save();
        ctx.rotate(rotationAngle);
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = isLight
          ? `rgba(140, 90, 10, ${dialOpacity * 1.8})`
          : `rgba(255, 220, 120, ${dialOpacity * 2.0})`;

        const branchStep = (Math.PI * 2) / 12;
        earthlyBranches.forEach((branch, idx) => {
          const angle = idx * branchStep;
          const bx = Math.cos(angle) * (dialRadius * 0.88);
          const by = Math.sin(angle) * (dialRadius * 0.88);
          ctx.fillText(branch, bx, by);
        });
        ctx.restore();

        // Vòng Bát Quái 8 Quẻ (Xoay nghịch)
        ctx.save();
        ctx.rotate(-rotationAngle * 0.7);
        const baguaStep = (Math.PI * 2) / 8;
        ctx.font = '19px "Segoe UI Symbol", system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = isLight
          ? `rgba(140, 90, 10, ${dialOpacity * 1.9})`
          : `rgba(255, 230, 140, ${dialOpacity * 2.3})`;

        baguaSymbols.forEach((sym, idx) => {
          const angle = idx * baguaStep;
          const gx = Math.cos(angle) * (dialRadius * 0.6);
          const gy = Math.sin(angle) * (dialRadius * 0.6);
          ctx.fillText(sym, gx, gy);

          // Tên quẻ nhỏ bên dưới ký hiệu
          ctx.save();
          ctx.font = 'bold 9px system-ui, sans-serif';
          ctx.fillStyle = isLight
            ? `rgba(140, 90, 10, ${dialOpacity * 1.5})`
            : `rgba(240, 200, 100, ${dialOpacity * 1.8})`;
          ctx.fillText(baguaNames[idx], gx, gy + 13);
          ctx.restore();
        });
        ctx.restore();

        // Biểu tượng Thái Cực (Yin-Yang) ở trung tâm kèm 2 mắt cá âm dương
        ctx.save();
        ctx.rotate(rotationAngle * 1.2);
        const taijiR = dialRadius * 0.16;
        ctx.beginPath();
        ctx.arc(0, 0, taijiR, 0, Math.PI * 2);
        ctx.strokeStyle = isLight
          ? `rgba(180, 130, 30, ${dialOpacity * 1.4})`
          : `rgba(240, 195, 80, ${dialOpacity * 1.8})`;
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Đường phân âm dương hình chữ S
        ctx.beginPath();
        ctx.arc(0, -taijiR / 2, taijiR / 2, Math.PI * 1.5, Math.PI * 0.5, false);
        ctx.arc(0, taijiR / 2, taijiR / 2, Math.PI * 1.5, Math.PI * 0.5, true);
        ctx.strokeStyle = isLight
          ? `rgba(180, 130, 30, ${dialOpacity * 1.4})`
          : `rgba(240, 195, 80, ${dialOpacity * 1.8})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // 2 mắt cá âm dương (Yin-Yang eyes)
        ctx.beginPath();
        ctx.arc(0, -taijiR / 2, taijiR * 0.16, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? `rgba(180, 130, 30, ${dialOpacity * 1.5})` : `rgba(240, 195, 80, ${dialOpacity * 1.8})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, taijiR / 2, taijiR * 0.16, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? `rgba(180, 130, 30, ${dialOpacity * 1.5})` : `rgba(240, 195, 80, ${dialOpacity * 1.8})`;
        ctx.fill();

        ctx.restore();

        ctx.restore();
      }

      // 5. SAO BĂNG (METEOR / SHOOTING STAR) RỰC RỠ HƠN
      if (!isLight) {
        if (!meteor.active && now - lastMeteorTime > 4000 + Math.random() * 3000) {
          spawnMeteor();
          lastMeteorTime = now;
        }

        if (meteor.active) {
          const tailX = meteor.x - Math.cos(meteor.angle) * meteor.len;
          const tailY = meteor.y - Math.sin(meteor.angle) * meteor.len;

          const grad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
          grad.addColorStop(0, 'rgba(255, 230, 160, 0)');
          grad.addColorStop(0.6, `rgba(255, 215, 100, ${meteor.opacity * 0.7})`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${meteor.opacity})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(meteor.x, meteor.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.0;
          ctx.stroke();

          // Điểm sáng đầu sao băng
          ctx.beginPath();
          ctx.arc(meteor.x, meteor.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${meteor.opacity})`;
          ctx.fill();

          meteor.x += Math.cos(meteor.angle) * meteor.speed;
          meteor.y += Math.sin(meteor.angle) * meteor.speed;
          meteor.opacity -= 0.012;

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
      style={{ opacity: theme === 'light' ? 0.55 : 0.95 }}
    />
  );
}
