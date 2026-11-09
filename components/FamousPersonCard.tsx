'use client';
import { motion } from 'framer-motion';
import type { FamousPerson } from '@/lib/ziwei/famous';

const CATEGORY_COLORS: Record<string, { vi: string; color: string }> = {
  'Thương Nghiệp': { vi: 'Thương Nghiệp', color: '#4ade80' },
  'Văn Nghệ': { vi: 'Văn Nghệ', color: '#c084fc' },
  'Công Nghệ': { vi: 'Công Nghệ', color: '#60a5fa' },
  'Thể Thao': { vi: 'Thể Thao', color: '#fb923c' },
  'Lịch Sử': { vi: 'Lịch Sử', color: '#facc15' },
  '商业': { vi: 'Thương Nghiệp', color: '#4ade80' },
  '文艺': { vi: 'Văn Nghệ', color: '#c084fc' },
  '科技': { vi: 'Công Nghệ', color: '#60a5fa' },
  '体育': { vi: 'Thể Thao', color: '#fb923c' },
  '历史': { vi: 'Lịch Sử', color: '#facc15' },
};

export default function FamousPersonCard({ person }: { person: FamousPerson }) {
  const cat = CATEGORY_COLORS[person.category] ?? { vi: person.category, color: '#d4a843' };
  const catColor = cat.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="card-glass rounded-xl p-4 mb-4"
      style={{
        border: `1px solid ${catColor}40`,
        background: `linear-gradient(135deg, ${catColor}06, transparent 60%)`,
      }}
    >
      <div className="text-[10px] tracking-wide mb-3 flex items-center justify-between" style={{ color: 'var(--t-faint)' }}>
        <div className="flex items-center gap-1.5">
          <span style={{ color: catColor, opacity: 0.9, fontSize: '13px' }}>★</span>
          <span className="font-bold text-amber-400">LÁ SỐ DANH NHÂN MẪU</span>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded-full font-bold"
          style={{ color: catColor, background: catColor + '18', border: `1px solid ${catColor}40` }}>
          {cat.vi}
        </span>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-base font-bold" style={{ color: 'var(--t-text1)', letterSpacing: '0.02em' }}>
            {person.name}
          </span>
          <span className="text-[11px]" style={{ color: 'var(--t-faint)' }}>
            Năm {person.year} · {person.gender === 'male' ? 'Nam Mệnh (男)' : 'Nữ Mệnh (女)'}
          </span>
        </div>

        <div className="text-[11px] leading-relaxed" style={{ color: 'var(--t-text2)', opacity: 0.9 }}>
          {person.description}
        </div>

        <div className="text-[11px] leading-relaxed px-3 py-2.5 rounded-lg"
          style={{
            color: 'var(--t-text2)',
            background: catColor + '0c',
            border: `1px solid ${catColor}25`,
          }}>
          <span style={{ color: catColor, fontWeight: 700, marginRight: '4px' }}>💡 Điểm sáng cách cục:</span>
          {person.notable}
        </div>

        <div className="text-[10px] mt-2 leading-relaxed" style={{ color: 'var(--t-faint)', opacity: 0.65 }}>
          ⚠️ Giờ sinh thu thập từ tư liệu học thuật công khai để chiêm nghiệm. Luận giải mệnh lý tự động hiển thị theo thuật toán an sao.
        </div>
      </div>
    </motion.div>
  );
}
