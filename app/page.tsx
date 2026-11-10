'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import StarField from '@/components/StarField';
import { useTheme, type Theme } from '@/components/ThemeProvider';
import AnnouncementModal from '@/components/AnnouncementModal';
import { MAJOR_STARS_VI } from '@/lib/ziwei/vietnamese';

// ─── 滚动入场 wrapper ────────────────────────────────────
function FadeIn({
  children, delay = 0, y = 28, className = '',
}: {
  children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function WeakBoundary({ line }: { line: string }) {
  // 之前的版本有 1px 实线 + 12px 渐变阴影，主题切换时形成清晰横线很硬。
  // 改为更柔和的 24px 渐变 + 低 opacity，section 衔接更自然。
  return (
    <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
      style={{ background: `linear-gradient(to bottom, ${line}, transparent)`, opacity: 0.45 }} />
  );
}

// ─── 主题切换按钮 ────────────────────────────────────────
function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      aria-label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
      style={{
        borderColor: isDark ? 'rgba(212,168,67,0.3)' : 'rgba(140,100,20,0.35)',
        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,252,242,0.85)',
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}
    >
      <div className="relative w-10 h-5 rounded-full flex-shrink-0"
        style={{
          background: isDark ? 'rgba(12,24,64,0.95)' : 'rgba(230,195,80,0.55)',
          transition: 'background 0.35s ease',
        }}>
        <motion.div
          animate={{ x: isDark ? 2 : 22 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="absolute top-1 w-3.5 h-3.5 rounded-full"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, #b8a050, #e8d090)'
              : 'linear-gradient(135deg, #e89010, #f8d050)',
          }}
        />
      </div>
      <span className="text-[11px] font-medium tracking-wide select-none"
        style={{
          color: isDark ? 'rgba(212,180,100,0.85)' : 'rgba(110,72,8,0.8)',
          transition: 'color 0.35s ease',
        }}>
        {isDark ? 'Huyền Dạ' : 'Bạch Trú'}
      </span>
    </motion.button>
  );
}

// ─── 主星数据 ────────────────────────────────────────────
const STARS = [
  { name: '紫微' }, { name: '天机' }, { name: '太阳' }, { name: '武曲' },
  { name: '天同' }, { name: '廉贞' }, { name: '天府' }, { name: '太阴' },
  { name: '贪狼' }, { name: '巨门' }, { name: '天相' }, { name: '天梁' },
  { name: '七杀' }, { name: '破军' },
];

// ─── 功能模块 ────────────────────────────────────────────
const FEATURES = [
  {
    tag: 'HỆ THỐNG AN SAO',
    title: 'Tử Vi Đẩu Số\nThiên Kỷ Chính Tông',
    subtitle: 'Không giản lược, tuân thủ nghiêm ngặt giáo trình của danh sư Nghê Hải Hà',
    points: [
      'Khởi bàn bằng Ngũ Hành Cục Nạp Âm, tuyệt đối không dùng thuật toán giản lược trên mạng',
      'Mệnh cung nghịch đếm giờ sinh, Thân cung thuận đếm giờ sinh, chuẩn xác quy tắc cổ thư',
      '14 Chính tinh và Tứ Hóa phi tinh suy diễn theo nguyên pháp, cấu trúc chặt chẽ có thể kiểm chứng',
    ],
  },
  {
    tag: 'HIỂN THỊ LÁ SỐ',
    title: '14 Chính Tinh\nTứ Hóa Toàn Bàn',
    subtitle: 'Cấu trúc sáng rõ, nhìn thấu trục vận và cung vị trọng điểm',
    points: [
      '14 Chính tinh an định 12 cung, mối tương quan chính tinh rõ ràng dễ đọc',
      'Phụ tinh, Cát tinh và Sát tinh hiển thị đồng thời, không bỏ sót thông tin quan trọng',
      'Độ sáng Miếu, Vượng, Đắc, Hãm phân tầng màu sắc, nhận diện mạnh yếu tức thì',
      'Nhấp vào bất kỳ chính tinh nào để xem phân tích chuyên sâu của thầy Nghê Hải Hà',
    ],
  },
  {
    tag: 'LUẬN GIẢI CHUYÊN SÂU',
    title: 'Trí Tuệ Mệnh Lý\nVượt Xa Tính Toán',
    subtitle: 'Kho tàng tri thức Thiên Kỷ kết hợp luận giải chuyên sâu 100% Tiếng Việt',
    points: [
      'Phân tích Mệnh Cách: Từ chính tinh Mệnh cung kết hợp Tam Phương Tứ Chính, luận đoán tính cách và cục diện cuộc đời',
      'Luận giải 6 phương diện: Định hướng sự nghiệp, Tình duyên hôn nhân, Tài lộc kinh doanh, Sức khỏe tật ách, Gia đạo và Con cái',
      'Lưu niên & Đại hạn 10 năm: Nắm bắt trọng tâm đại vận hiện tại, lưu ý cụ thể và lời khuyên hành động trong năm nay',
      'Hỏi đáp tự do: Giải đáp mọi thắc mắc dựa trên kho tàng tri thức cổ thư nội bộ',
    ],
  },
  {
    tag: 'NHẬN DIỆN CÁCH CỤC',
    title: 'Tự Động Nhận Diện\n50+ Cách Cục Kinh Điển',
    subtitle: 'Từ tổ hợp sao tìm ra vận mệnh độc đáo của riêng bạn',
    points: [
      'Tự động phát hiện 50+ cách cục: Tử Phủ đồng cung, Sát Phá Tham, Cơ Nguyệt Đồng Lương, Liêm Tướng, Vũ Khúc Thất Sát...',
      'Phát hiện chính xác các thế giáp cách: Phụ Bật giáp Mệnh, Nhật Nguyệt giáp Mệnh...',
      'Đánh dấu Tứ Hóa nhập Mệnh Di, cảnh báo các bài học và cơ hội then chốt trong đời',
      'Phân tầng cách cục Đại Cát, Cát, Bình, Phá cách giúp bạn thấu suốt ưu thế và thách thức',
    ],
  },
];

// ─── 4 Đại Phân Hệ Thuật Số (Hero sau timeline) ─────────────
const SECTIONS = [
  {
    key: 'ziwei',
    name: 'Tử Vi Đẩu Số',
    en: 'Zi Wei Dou Shu',
    desc: '14 Chính Tinh · 12 Cung Vị · Luận Giải Chuyên Sâu',
    status: 'ready' as const,
    when: 'Sẵn Sàng',
    icon: '◉',
    note: 'Chính Tông',
  },
  {
    key: 'metaphysics',
    name: 'Kim Cổ Đông Tây',
    en: 'Metaphysics Hub',
    desc: 'Bát Tự · Bói Hữu Duyên · Kinh Dịch 64 Quẻ · Thần Số Học',
    status: 'ready' as const,
    when: 'Mới Ra Mắt',
    icon: '🧭',
    note: 'Đa Hệ',
  },
  {
    key: 'tianji',
    name: 'Thiên Kỷ',
    en: 'Tian Ji',
    desc: 'Tử Vi · Chu Dịch · Mai Hoa & Lục Hào Chiêm Bốc',
    status: 'ready' as const,
    when: 'Hoàn Thiện',
    icon: '⊙',
    note: 'Giáo Trình',
  },
  {
    key: 'renji',
    name: 'Nhân Kỷ',
    en: 'Ren Ji',
    desc: 'Nội Kinh · Thương Hàn · Dưỡng Sinh & Ngũ Hành Tạng Phủ',
    status: 'soon' as const,
    when: 'Đang Mở Rộng',
    icon: '⊕',
    note: 'Y Đạo',
  },
];

// ─── Giáo Huấn Cốt Lõi Của Thầy Nghê Hải Hà ────────────────
const NI_TEACHINGS = [
  {
    title: 'Mệnh Cung vi bản, Tam Phương vi dụng (命宫为本，三方为用)',
    body: 'Thầy Nghê Hải Hà luôn nhấn mạnh: xem mệnh trước hết phải xem Mệnh Cung. Chính tinh Mệnh cung quyết định cốt cách cơ bản và thiên tính, Tam phương (Tài bạch, Quan lộc, Thiên di) quyết định đất dụng võ. 4 cung liên hoàn mới tạo nên bức tranh trọn vẹn của đời người.',
  },
  {
    title: 'Đối Cung mượn sao, tuyệt đối không xem nhẹ (对宫借星，不可忽视)',
    body: 'Nét độc đáo của phái Thiên Kỷ là đặc biệt coi trọng Đối Cung. Cung vô chính diệu bắt buộc phải mượn sao đối cung để luận đoán. Mệnh đối diện Thiên Di, hai bên tương hỗ mật thiết, đây là bí quyết mà người học sơ cơ thường bỏ lỡ.',
  },
  {
    title: 'Tứ Hóa mới là bàn tay định đoạt vận mệnh (四化才是命运的手)',
    body: 'Tinh diệu là gốc, Tứ Hóa (Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ) mới là chìa khóa quyết định thời vận thịnh suy. Cùng một ngôi sao, gặp Hóa Lộc hay gặp Hóa Kỵ thì quỹ đạo đời người hoàn toàn khác biệt. Thầy luôn răn dạy: Không xem Tứ Hóa coi như mới giải được một nửa lá số.',
  },
  {
    title: 'Đại Hạn 10 năm, thời vận tuần hoàn có nhịp (大限十年，运势有节)',
    body: 'Đời người trải qua 12 đại hạn, mỗi đại hạn 10 năm. Ở mỗi cung đại hạn khác nhau, cơ duyên và thử thách hoàn toàn khác biệt. Hiểu rõ bản thân đang ở đại hạn nào, cung vị có những sao gì chiếu mới thật sự nắm bắt được vận may của cuộc đời.',
  },
];

// ─── 主题色彩 helper ─────────────────────────────────────
function useColors(theme: Theme) {
  const d = theme === 'dark';
  return {
    bgBase:       d ? '#020810'                                : '#f5efe0',
    // nav 用与 bgBase 完全相同的不透明色，避免半透明叠加产生色差带
    navBg:        d ? '#020810'                                : '#f5efe0',
    navBorder:    d ? 'rgba(255,255,255,0.05)'                : 'rgba(160,120,30,0.15)',
    goldGrad:     d ? 'linear-gradient(160deg,#c8993a 0%,#f0d070 40%,#c8993a 70%,#f0c755 100%)'
                    : 'linear-gradient(160deg,#6a4206 0%,#9a6a10 40%,#6a4206 70%,#885010 100%)',
    goldSolid:    d ? '#d4a843'                               : '#8b6410',
    goldLine:     d ? 'rgba(212,168,67,0.4)'                  : 'rgba(140,100,20,0.4)',
    tagText:      d ? 'rgba(212,168,67,0.6)'                  : 'rgba(120,80,10,0.65)',
    // 亮色文字用冷灰系（A 方案核心）：暖底 + 冷字 → 视觉不审美疲劳
    textPrimary:  d ? '#e8eef6'                               : '#1a1d24',
    textSecond:   d ? '#b8c6df'                               : '#3a3f4a',
    textMuted:    d ? '#9db0d0'                               : '#5a6275',
    textFaint:    d ? 'rgba(240,246,255,0.56)'                : '#9da4b3',
    // 冷色 accent（B 方案核心）：呼应暗色 quan 蓝；用于装饰性 glow / 链接 / 高亮
    accent:       d ? '#3a78d4'                               : '#3a5a82',
    accentSoft:   d ? 'rgba(58,120,212,0.18)'                 : 'rgba(58,90,130,0.10)',
    cardBg:       d ? 'rgba(255,255,255,0.05)'                : 'rgba(255,255,255,0.88)',
    cardBorder:   d ? 'rgba(255,255,255,0.10)'                : 'rgba(200,160,60,0.25)',
    cardShadow:   d ? '0 4px 32px rgba(0,0,0,0.5)'           : '0 4px 24px rgba(140,100,20,0.12)',
    featureBg:    d ? 'rgba(255,255,255,0.04)'                : 'rgba(255,255,255,0.75)',
    featureBord:  d ? 'rgba(255,255,255,0.08)'                : 'rgba(200,160,60,0.2)',
    glowTint:     d ? 'rgba(212,168,67,0.07)'                 : 'rgba(180,140,40,0.06)',
    // 亮色 glow 真用蓝/紫——给整体氛围加冷色点缀
    glowBlue:     d ? 'rgba(40,80,160,0.12)'                  : 'rgba(58,90,130,0.06)',
    glowPurple:   d ? 'rgba(120,50,180,0.08)'                 : 'rgba(96,80,140,0.04)',
    niBg:         d ? 'rgba(255,255,255,0.04)'                : 'rgba(255,255,255,0.8)',
    niBorder:     d ? 'rgba(212,168,67,0.2)'                  : 'rgba(180,130,40,0.25)',
    niDivider:    d ? 'rgba(255,255,255,0.08)'                : 'rgba(180,130,40,0.12)',
    niCardBg:     d ? 'rgba(255,255,255,0.04)'                : 'rgba(255,255,255,0.9)',
    niCardBord:   d ? 'rgba(255,255,255,0.08)'                : 'rgba(200,160,60,0.2)',
    niCardShadow: d ? '0 2px 20px rgba(0,0,0,0.4)'           : '0 2px 16px rgba(140,100,20,0.1)',
    starBg:       d ? 'rgba(255,255,255,0.04)'                : 'rgba(255,255,255,0.7)',
    starBorder:   d ? 'rgba(212,168,67,0.22)'                 : 'rgba(160,120,30,0.3)',
    starText:     d ? 'rgba(212,168,67,0.7)'                  : 'rgba(120,80,10,0.7)',
    ctaBg:        d ? 'linear-gradient(135deg,#b8892a,#f0d070,#b8892a)'
                    : 'linear-gradient(135deg,#6a4206,#9a6810,#6a4206)',
    ctaText:      d ? '#08080a'                               : '#f8f3e8',
    footerText:   d ? 'rgba(255,255,255,0.08)'                : '#d0b878',
    scrollLine:   d ? 'rgba(212,168,67,0.3)'                  : 'rgba(140,100,20,0.3)',
    scrollText:   d ? 'rgba(255,255,255,0.12)'                : '#c0a870',
    altSection:   d ? 'rgba(255,255,255,0.02)'                : 'rgba(255,255,255,0.4)',
    quoteBg:      d ? 'rgba(212,168,67,0.04)'                 : 'rgba(255,255,255,0.9)',
  };
}

// ─── Tứ Hóa Giới Thiệu (100% Tiếng Việt) ───────────────────
const SIHUA_BRIEF: Record<string, { viName: string; attr: string; brief: string }> = {
  '化禄': {
    viName: 'Hóa Lộc (化禄)',
    attr: 'Cát Hóa · Tăng Ích Tài Phúc',
    brief: 'Chủ về tài lộc, cơ hội dồi dào, phúc khí tăng tiến và nhân duyên hanh thông. An tại cung nào thì phương diện nơi đó thuận lợi, khởi sắc tiền bạc, là sao cát hóa được chào đón nhất trên lá số.',
  },
  '化权': {
    viName: 'Hóa Quyền (化权)',
    attr: 'Cát Hóa · Quyền Uy & Lãnh Đạo',
    brief: 'Chủ về thực quyền, quyền lực lãnh đạo, bản lĩnh và ý chí quyết đoán. Rất đắc vị khi nhập Mệnh Cung hoặc Quan Lộc Cung, biểu hiện quyền uy nắm giữ đại cục.',
  },
  '化科': {
    viName: 'Hóa Khoa (化科)',
    attr: 'Cát Hóa · Danh Dự & Khoa Bảng',
    brief: 'Chủ về học vấn, thanh danh, thi cử đỗ đạt và quý nhân phù trợ. Hóa giải tai ương nhẹ nhàng, mang lại tiếng thơm, bằng cấp và sự kính trọng từ xã hội.',
  },
  '化忌': {
    viName: 'Hóa Kỵ (化忌)',
    attr: 'Hung Hóa · Trở Ngại & Khảo Nghiệm',
    brief: 'Chủ về sự chấp niệm, khúc mắc, hao tổn hoặc trở lực thử thách. Đóng ở cung nào thì đời người phải dành nhiều tâm sức tu dưỡng, biến thách thức thành bài học trưởng thành.',
  },
};

// ─── 14 Chính Tinh Giới Thiệu (100% Tiếng Việt) ─────────────
const STAR_BRIEF: Record<string, { viName: string; attr: string; brief: string }> = {
  '紫微': {
    viName: 'Tử Vi (紫微)',
    attr: 'Thổ · Đế Vương Tinh',
    brief: 'Đế tinh chí tôn, thống ngự vạn sao. Tọa Mệnh cốt cách cao quý, có khí chất lãnh đạo thiên bẩm, phong thái đĩnh đạc, phù hợp đảm đương vị trí đứng đầu gánh vác đại cuộc.',
  },
  '天机': {
    viName: 'Thiên Cơ (天机)',
    attr: 'Mộc · Trí Tuệ Tinh',
    brief: 'Thiện tinh chủ mưu lược, quyền biến và trí tuệ mẫn tiệp. Tư duy linh hoạt, tính toán sâu sắc, giỏi phân tích hoạch định, phù hợp làm cố vấn chiến lược, chuyên gia công nghệ cao.',
  },
  '太阳': {
    viName: 'Thái Dương (太阳)',
    attr: 'Hỏa · Quan Lộc Chủ',
    brief: 'Chủ về quang minh, danh vọng, phụng sự cộng đồng và sức ảnh hưởng. Tính tình hào sảng, phóng khoáng, thích hợp làm việc công ích, giáo dục, ngoại giao và chính trường.',
  },
  '武曲': {
    viName: 'Vũ Khúc (武曲)',
    attr: 'Kim · Tài Bạch Chủ',
    brief: 'Tài tinh cương nghị, chủ về quản trị tài chính, hành động quyết liệt và thực tế. Kiên trì sắt đá, phù hợp ngành ngân hàng, kinh doanh thương mại, quân sự hoặc tài chính quy mô lớn.',
  },
  '天同': {
    viName: 'Thiên Đồng (天同)',
    attr: 'Thủy · Phúc Tinh',
    brief: 'Phúc tinh chủ sự ôn hòa, an lạc, phúc thọ và nhân duyên thiện lành. Tính tình thuần hậu, biết hưởng thụ cuộc sống, càng về hậu vận càng tích lũy nhiều phúc báo an nhàn.',
  },
  '廉贞': {
    viName: 'Liêm Trinh (廉贞)',
    attr: 'Hỏa · Thứ Đào Hoa / Quan Tinh',
    brief: 'Biểu tượng của tài nghệ, sự nhạy bén và tính cách kiên định. Giàu năng khiếu nghệ thuật hoặc chính trị ngoại giao, đa tài đa nghệ, sống có nguyên tắc và kỷ luật tự giác cao.',
  },
  '天府': {
    viName: 'Thiên Phủ (天府)',
    attr: 'Thổ · Lệnh Tinh / Tài Khố',
    brief: 'Nam Đẩu chủ tinh, biểu tượng của kho tàng quốc gia và sự tích lũy vững chắc. Tính cách điềm đạm, bao dung, quản lý tiền bạc tuyệt vời, tạo nền tảng gia nghiệp hưng thịnh.',
  },
  '太阴': {
    viName: 'Thái Âm (太阴)',
    attr: 'Thủy · Điền Trạch Chủ',
    brief: 'Chủ về phú quý âm nhu, bất động sản và đời sống nội tâm sâu sắc. Tính cách tinh tế, trầm tĩnh, giỏi tích lũy của cải lâu dài, cực kỳ đắc lợi với điền sản và nghệ thuật.',
  },
  '贪狼': {
    viName: 'Tham Lang (贪狼)',
    attr: 'Thủy Mộc · Chính Đào Hoa',
    brief: 'Chủ về khát vọng, sự lôi cuốn, giao tiếp xã hội và khả năng học hỏi đa lĩnh vực. Năng động, thích khám phá, giỏi nắm bắt tâm lý, dễ thành công trong thương mại và sáng tạo.',
  },
  '巨门': {
    viName: 'Cự Môn (巨门)',
    attr: 'Thủy · Ám Tinh / Ngôn Luận',
    brief: 'Chủ về khẩu tài hùng biện, tư duy phản biện và khả năng nghiên cứu tìm tòi chân lý. Rất thích hợp làm luật sư, giảng viên, diễn giả, truyền thông; lấy tài ăn nói để lập thân.',
  },
  '天相': {
    viName: 'Thiên Tướng (天相)',
    attr: 'Thủy · Ấn Tinh / Phò Tá',
    brief: 'Chủ về sự chính trực, lòng trung thành, uy tín và sự phụng sự. Khéo léo điều phối, trọng lễ nghĩa và kỷ cương, là cánh tay phải đắc lực của người lãnh đạo lớn.',
  },
  '天梁': {
    viName: 'Thiên Lương (天梁)',
    attr: 'Thổ · Ấm Tinh / Thọ Tinh',
    brief: 'Chủ về sự che chở của tiền nhân, sự thanh cao, thọ khang và cứu nhân độ thế. Lương thiện, bao dung, thường hóa hung thành cát, rất phù hợp ngành y dược, giáo dục, tâm linh.',
  },
  '七杀': {
    viName: 'Thất Sát (七杀)',
    attr: 'Kim Hỏa · Tướng Tinh',
    brief: 'Chủ về sự dũng mãnh, cương liệt, ý chí khai sơn phá thạch. Dám nghĩ dám làm, không lùi bước trước thử thách, phù hợp vị trí tiên phong mở đường, khởi nghiệp độc lập.',
  },
  '破军': {
    viName: 'Phá Quân (破军)',
    attr: 'Thủy · Hao Tinh / Tiên Phong',
    brief: 'Chủ về sự đột phá, biến động đổi mới và khả năng tái thiết toàn diện. Dũng cảm phá vỡ lối mòn cũ để tạo nên đế chế mới, thích hợp công việc khai phá và cách tân táo bạo.',
  },
};

// ─── 功能视觉装饰 ────────────────────────────────────────
function FeatureVisual({ index, colors: c }: { index: number; colors: ReturnType<typeof useColors> }) {
  if (index === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-5">
        <div className="grid grid-cols-4 gap-1.5 w-72 mx-auto">
          {Array.from({ length: 16 }).map((_, i) => {
            const isCenter = [5, 6, 9, 10].includes(i);
            const isActive = [0, 3, 12, 15].includes(i);
            return (
              <motion.div key={i}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="h-14 rounded-sm flex items-center justify-center text-xs transition-all duration-300"
                style={{
                  border: `1px solid ${isActive ? c.goldLine : c.cardBorder}`,
                  background: isCenter ? 'transparent' : isActive ? c.starBg : c.featureBg,
                  color: isActive ? c.goldSolid : c.textFaint,
                  opacity: isCenter ? 0 : 1,
                }}>
                {isActive ? '★' : ''}
              </motion.div>
            );
          })}
        </div>
        <p className="text-[11px] font-semibold tracking-widest transition-colors duration-300"
          style={{ color: c.goldSolid }}>Phương Pháp An Sao Nghê Hải Hà</p>
      </div>
    );
  }

  if (index === 1) {
    const [sel, setSel] = useState<string | null>(null);
    const selInfo = sel ? (STAR_BRIEF[sel] ?? SIHUA_BRIEF[sel] ?? null) : null;
    return (
      <div className="flex flex-col gap-4 h-full justify-center">
        {[
          {
            groupVi: 'Nhóm Tử Vi',
            groupZh: '紫微系',
            stars: [
              { zh: '紫微', vi: 'Tử Vi' },
              { zh: '天机', vi: 'Thiên Cơ' },
              { zh: '太阳', vi: 'Thái Dương' },
              { zh: '武曲', vi: 'Vũ Khúc' },
              { zh: '天同', vi: 'Thiên Đồng' },
              { zh: '廉贞', vi: 'Liêm Trinh' },
            ],
          },
          {
            groupVi: 'Nhóm Thiên Phủ',
            groupZh: '天府系',
            stars: [
              { zh: '天府', vi: 'Thiên Phủ' },
              { zh: '太阴', vi: 'Thái Âm' },
              { zh: '贪狼', vi: 'Tham Lang' },
              { zh: '巨门', vi: 'Cự Môn' },
              { zh: '天相', vi: 'Thiên Tướng' },
              { zh: '天梁', vi: 'Thiên Lương' },
              { zh: '七杀', vi: 'Thất Sát' },
              { zh: '破军', vi: 'Phá Quân' },
            ],
          },
        ].map(group => (
          <div key={group.groupVi}>
            <div className="text-[11px] font-bold tracking-widest mb-2 transition-colors duration-300"
              style={{ color: c.textPrimary }}>
              ✦ {group.groupVi} <span className="text-[9px] font-normal opacity-60">({group.groupZh})</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.stars.map(s => (
                <motion.button key={s.zh}
                  onClick={() => setSel(sel === s.zh ? null : s.zh)}
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="text-xs px-2.5 py-1 rounded-md cursor-pointer flex flex-col items-center"
                  style={{
                    border: `1px solid ${sel === s.zh ? c.goldSolid : c.goldLine}`,
                    color: c.goldSolid,
                    background: sel === s.zh ? `${c.goldLine}30` : 'transparent',
                    fontWeight: sel === s.zh ? 700 : 500,
                  }}>
                  <span className="font-bold">{s.vi}</span>
                  <span className="text-[8px] opacity-60 leading-none">{s.zh}</span>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
        <div>
          <div className="text-[11px] font-bold tracking-widest mb-2 transition-colors duration-300"
            style={{ color: c.textPrimary }}>
            ✦ Tứ Hóa Phi Tinh <span className="text-[9px] font-normal opacity-60">(四化飞星)</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              ['化禄', 'Hóa Lộc', 'rgba(52,211,153,0.9)'],
              ['化权', 'Hóa Quyền', 'rgba(96,165,250,0.9)'],
              ['化科', 'Hóa Khoa', 'rgba(250,204,21,0.9)'],
              ['化忌', 'Hóa Kỵ', 'rgba(248,113,113,0.9)'],
            ].map(([zh, vi, color]) => (
              <motion.button key={zh}
                onClick={() => setSel(sel === zh ? null : zh)}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="text-xs px-3 py-1 rounded-md cursor-pointer flex flex-col items-center"
                style={{
                  border: `1px solid ${color}`,
                  color,
                  background: sel === zh ? `${color.replace('0.9', '0.2')}` : 'transparent',
                  fontWeight: sel === zh ? 700 : 500,
                }}>
                <span className="font-bold">{vi}</span>
                <span className="text-[8px] opacity-70 leading-none">{zh}</span>
              </motion.button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {selInfo && (
            <motion.div key={sel}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl p-4 mt-1.5"
              style={{ border: `1px solid ${c.goldLine}`, background: c.featureBg }}>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-sm font-bold" style={{ color: c.goldSolid }}>{selInfo.viName}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold" style={{ color: c.tagText, border: `1px solid ${c.goldLine}` }}>{selInfo.attr}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: c.textSecond }}>{selInfo.brief}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (index === 2) {
    const msgs = [
      { role: 'user', text: 'Năm nay vận trình sự nghiệp của tôi thế nào?' },
      { role: 'ai', text: 'Mệnh cung Thiên Cơ Hóa Lộc, năm nay đại hạn đáo Quan Lộc, tam phương có Tả Phụ tương trợ, sự nghiệp có quý nhân nâng đỡ, thích hợp chủ động mở rộng kinh doanh...' },
      { role: 'user', text: 'Khi nào vận trình tình cảm duyên nợ khởi sắc nhất?' },
    ];
    return (
      <div className="flex flex-col gap-2 h-full justify-center">
        {msgs.map((m, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[85%] text-[11px] px-3 py-2 rounded-lg leading-relaxed"
              style={{
                border: `1px solid ${m.role === 'user' ? c.goldLine : c.cardBorder}`,
                background: m.role === 'user' ? c.starBg : c.featureBg,
                color: m.role === 'user' ? c.goldSolid : c.textSecond,
              }}>
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (index === 3) {
    const patterns = [
      { name: 'Cách Sát Phá Tham', desc: 'Mệnh cách khai phá tiên phong, dám nghĩ dám làm', ok: true },
      { name: 'Cách Liêm Trinh Thiên Tướng', desc: 'Cốt cách ấn thụ hành chính, tài năng lãnh đạo', ok: true },
      { name: 'Hóa Kỵ Nhập Mệnh', desc: 'Cần chú ý tu dưỡng tâm tính, vượt qua bài học cuộc đời', ok: false },
    ];
    return (
      <div className="flex flex-col gap-3 h-full justify-center">
        {patterns.map((p, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
            style={{
              border: `1px solid ${p.ok ? 'rgba(96,165,250,0.25)' : 'rgba(251,146,60,0.25)'}`,
              background: p.ok ? 'rgba(96,165,250,0.05)' : 'rgba(251,146,60,0.05)',
            }}>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: p.ok ? 'rgba(96,165,250,0.6)' : 'rgba(251,146,60,0.6)' }} />
            <div>
              <div className="text-[11px] font-bold"
                style={{ color: p.ok ? 'rgba(147,197,253,0.9)' : 'rgba(253,186,116,0.9)' }}>{p.name}</div>
              <div className="text-[10px]" style={{ color: c.textMuted }}>{p.desc}</div>
            </div>
          </motion.div>
        ))}
        <div className="text-[10px] mt-2 tracking-wider text-center font-semibold" style={{ color: c.goldSolid }}>
          Tự Động Nhận Diện 50+ Cách Cục Kinh Điển
        </div>
      </div>
    );
  }

  return null;
}

// ─── 主页 ─────────────────────────────────────────────────
export default function HomePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = useColors(theme);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // 把 body / html 背景同步到 home 主题色，消除半透明 nav 透出 #fafaf9 的色差
  // useLayoutEffect 保证在浏览器绘制前同步更新，避免与根 div 的 transition 不同步
  useLayoutEffect(() => {
    document.documentElement.style.background = c.bgBase;
    document.body.style.background = c.bgBase;
    return () => {
      document.documentElement.style.background = '';
      document.body.style.background = '';
    };
  }, [c.bgBase]);

  return (
    <div style={{ background: c.bgBase, transition: 'background 0.35s ease' }} className="overflow-x-hidden">
      {/* 致用户公告——首次访问全屏覆盖，关闭后才进入首页 */}
      <AnnouncementModal />

      <StarField />

      {/* 全局光晕 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(ellipse, ${c.glowTint} 0%, transparent 70%)` }} />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full"
          style={{ background: `radial-gradient(ellipse, ${c.glowBlue} 0%, transparent 70%)` }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
          style={{ background: `radial-gradient(ellipse, ${c.glowPurple} 0%, transparent 70%)` }} />
      </div>

      {/* ── 顶部导航 ── nav 与 hero 同色（c.bgBase），无 blur 无 border，彻底无色差带 */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 gap-2"
        style={{
          background: c.navBg,
        }}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-base">🔮</span>
          <div>
            <div className="text-[12px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] font-bold transition-colors duration-300"
              style={{ color: c.goldSolid }}>
              TỬ VI ĐẨU SỐ
            </div>
            <div className="text-[8px] opacity-60 tracking-[0.2em] -mt-0.5" style={{ color: c.textMuted }}>
              MỆNH BÀN · THIÊN KỶ
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <ThemeToggle />
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/heming')}
            className="text-[11px] sm:text-xs px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full transition-all duration-300"
            style={{ border: `1px solid ${c.navBorder}`, color: c.textMuted }}>
            So Hợp Mệnh
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/chart')}
            className="text-[11px] sm:text-xs px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full transition-all duration-300 font-semibold"
            style={{ border: `1px solid ${c.goldLine}`, color: c.goldSolid }}>
            Lập Lá Số
          </motion.button>
        </div>
      </nav>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[82svh] lg:min-h-[92vh] flex flex-col items-center justify-center px-6 z-10 pb-24 pt-10">
        <motion.div style={{ y: heroY, opacity: heroOpacity, maxWidth: '960px' }} className="text-center w-full mx-auto mt-10">
          {/* 标签行 */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${c.goldLine})` }} />
            <span className="text-[11px] tracking-[0.3em] font-medium transition-colors duration-300" style={{ color: c.tagText }}>
              TỬ VI ĐẨU SỐ · HỆ PHÁI THIÊN KỶ (DANH SƯ NGHÊ HẢI HÀ)
            </span>
            <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${c.goldLine})` }} />
          </motion.div>

          {/* 主标题 */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: 'relative', display: 'inline-block' }}>
            <h1
              className={`grad-text ${theme === 'dark' ? 'grad-text-dark' : 'grad-text-light'} font-extrabold leading-none mb-3`}
              style={{
                fontSize: 'clamp(44px, 8vw, 96px)',
                letterSpacing: '0.04em',
              }}>
              TỬ VI ĐẨU SỐ
            </h1>
            <div className="text-xs sm:text-sm tracking-[0.35em] uppercase mb-4 font-bold" style={{ color: c.goldSolid, opacity: 0.9 }}>
              THIÊN BÀN VẬN MỆNH · KHÁM PHÁ BẢN THÂN
            </div>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-base md:text-lg tracking-[0.12em] mb-1.5"
            style={{ color: c.textSecond, fontWeight: 600 }}>
            Tử Vi Vi Môn · Thiên Địa Nhân Vi Lộ · Nghê Hải Hà Vi Sư
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-xs md:text-sm tracking-[0.2em] mb-5"
            style={{ color: c.textMuted, opacity: 0.9 }}>
            Khai Mở Mệnh Lý · Thấu Suốt Thiên Thời · Dưỡng Tâm Lập Mệnh
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="text-sm max-w-xl mx-auto leading-relaxed mb-8"
            style={{ color: c.textMuted }}>
            Nhập ngày tháng năm và thời khắc sinh, tự động hiệu chỉnh Giờ Chân Thái Dương (True Solar Time) theo 63 tỉnh thành để khởi tạo lá số Tử Vi 12 cung hoàn chỉnh.
          </motion.p>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-col items-center gap-4">
            <motion.button
              whileHover={{ y: -2, filter: 'brightness(1.06)' }} whileTap={{ scale: 0.97 }}
              onClick={() => router.push('/chart')}
              className="px-10 py-3.5 font-bold text-sm sm:text-base tracking-widest rounded-full shadow-lg flex flex-col items-center"
              style={{ background: c.ctaBg, color: c.ctaText }}>
              <span>🔮 KHỞI TẠO LÁ SỐ NGAY</span>
              <span className="text-[10px] font-normal opacity-85">An Sao Chuẩn Xác · Giải Mã Vận Mệnh</span>
            </motion.button>
          </motion.div>

          {/* 十四主星 */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 max-w-[680px] mx-auto">
            {STARS.map((star, i) => {
              const viInfo = MAJOR_STARS_VI[star.name];
              const starBrief = STAR_BRIEF[star.name];
              const elementText = starBrief?.attr.split(' · ')[0] || '';
              return (
                <motion.div key={star.name}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.05 + i * 0.03, duration: 0.35 }}
                  className="flex flex-col items-center justify-center px-2 py-1.5 rounded-xl border"
                  style={{ background: c.starBg, borderColor: c.starBorder }}>
                  <span className="text-[12px] font-bold tracking-tight leading-tight" style={{ color: c.starText }}>
                    {viInfo?.vi || star.name}
                  </span>
                  <span className="text-[9px] opacity-75 font-medium leading-none mt-0.5" style={{ color: c.textMuted }}>
                    {elementText || star.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* 上线公告便利贴 — 桌面端绝对定位右侧 */}
        <motion.div
          initial={{ opacity: 0, x: 30, rotate: 0 }}
          animate={{ opacity: 1, x: 0, rotate: -4 }}
          transition={{ delay: 1.4, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute hidden lg:block pointer-events-none"
          style={{
            right: 'clamp(2%, 6vw, 8%)',
            top: '54%',
            maxWidth: '240px',
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #fff5e3 0%, #ffe1c0 100%)',
            border: '2px dashed rgba(232,132,62,0.45)',
            borderRadius: '16px',
            padding: '14px 18px',
            boxShadow: '0 8px 24px rgba(196,90,45,0.18), 0 2px 6px rgba(196,90,45,0.1)',
            fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
          }}>
            <div style={{ fontSize: '20px', marginBottom: '6px', lineHeight: 1 }}>🎁</div>
            <div style={{ fontSize: '13px', lineHeight: 1.7, color: '#8b3a1a', fontWeight: 500 }}>
              <span style={{ color: '#c45a2d', fontWeight: 700, fontSize: '14px' }}>TRẢI NGHIỆM MIỄN PHÍ</span>
              <span> TOÀN BỘ</span>
            </div>
            <div style={{ fontSize: '13px', lineHeight: 1.7, color: '#8b3a1a', fontWeight: 500 }}>
              Tử Vi · Bát Tự · Bói Hữu Duyên
              <strong style={{ color: '#c45a2d' }}> 100% Miễn Phí</strong>
            </div>
          </div>
        </motion.div>

        {/* 上线公告便利贴 — 手机端正常流式显示（hero 内容下方居中） */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ delay: 1.4, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="lg:hidden mx-auto mt-8 mb-2 pointer-events-none"
          style={{
            maxWidth: 'min(280px, 84vw)',
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #fff5e3 0%, #ffe1c0 100%)',
            border: '2px dashed rgba(232,132,62,0.45)',
            borderRadius: '14px',
            padding: '12px 16px',
            boxShadow: '0 6px 18px rgba(196,90,45,0.16), 0 2px 4px rgba(196,90,45,0.08)',
            fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '18px', marginBottom: '4px', lineHeight: 1 }}>🎁</div>
            <div style={{ fontSize: '12px', lineHeight: 1.7, color: '#8b3a1a', fontWeight: 500 }}>
              <span style={{ color: '#c45a2d', fontWeight: 700, fontSize: '13px' }}>TRẢI NGHIỆM MIỄN PHÍ</span>
            </div>
            <div style={{ fontSize: '12px', lineHeight: 1.7, color: '#8b3a1a', fontWeight: 500 }}>
              Tử Vi & Bói Hữu Duyên <strong style={{ color: '#c45a2d' }}>100% Miễn Phí</strong>
            </div>
          </div>
        </motion.div>

        {/* 滚动提示（绝对定位，不影响 hero opacity 计算） */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: c.scrollText }}>KHÁM PHÁ THÊM</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${c.scrollLine}, transparent)` }} />
        </motion.div>
      </section>

      {/* ══ CÁC HÌNH THỨC XEM BÓI PHỔ BIẾN (THEMATIC SHOWCASE VỚI ANIMATION THEO CHỦ ĐỀ) ════════ */}
      <section className="relative z-10 py-16 px-6 md:px-10 lg:px-14">
        <FadeIn className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${c.goldLine})` }} />
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold" style={{ color: c.goldSolid }}>
              KHÁM PHÁ VẬN MỆNH & TƯƠNG LAI
            </span>
            <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${c.goldLine})` }} />
          </div>
          <h2 className={`grad-text ${theme === 'dark' ? 'grad-text-dark' : 'grad-text-light'} font-black text-2xl sm:text-4xl mb-3 tracking-tight`}>
            Các Hình Thức Xem Bói Phổ Biến
          </h2>
          <p className="text-xs sm:text-sm max-w-xl mx-auto" style={{ color: c.textSecond }}>
            Hợp nhất nhân tướng học Đông Phương, kinh điển Tử Vi Thiên Kỷ và thuật chiêm tinh Tây Phương với animation huyền ảo sinh động.
          </p>
        </FadeIn>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Bói Chỉ Tay */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={() => router.push('/metaphysics?tab=palmistry')}
            className="group relative rounded-2xl p-6 border overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300"
            style={{
              background: theme === 'dark' ? 'rgba(12, 18, 36, 0.75)' : 'rgba(255, 255, 255, 0.85)',
              borderColor: 'rgba(16, 185, 129, 0.35)',
              boxShadow: c.cardShadow,
            }}
          >
            {/* Thematic Hover Background Animation: Bàn tay phát sáng và các luồng sáng chỉ tay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-emerald-950/40 via-amber-950/20 to-transparent" />
            <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none text-emerald-400">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none stroke-2">
                <path d="M 30 90 C 25 70, 15 50, 20 30 C 25 15, 45 20, 50 35 C 55 10, 70 15, 70 35 C 80 15, 90 25, 85 45 C 95 40, 95 60, 85 75 Z" />
                <path d="M 35 55 Q 50 65 65 75" className="stroke-emerald-400 group-hover:animate-pulse" />
                <path d="M 35 45 Q 60 55 75 55" className="stroke-cyan-400 group-hover:animate-pulse" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">🖐️</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  MỚI RA MẮT
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1.5 text-zinc-100 group-hover:text-amber-300 transition-colors">
                Xem Bói Chỉ Tay (Palmistry)
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: c.textSecond }}>
                Định hướng tương lai qua 4 đại tuyến chỉ tay (Sinh Đạo, Trí Đạo, Tâm Đạo, Định Mệnh) và các vân quý cát tường (Chữ M, Tam Giác Vàng).
              </p>
            </div>

            <div className="relative z-10 mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Xem ngay <span>→</span>
              </span>
              <span className="text-[10px]" style={{ color: c.textMuted }}>Đồ hình tương tác SVG</span>
            </div>
          </motion.div>

          {/* Card 2: Bói Bài Tarot */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={() => router.push('/metaphysics?tab=tarot')}
            className="group relative rounded-2xl p-6 border overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300"
            style={{
              background: theme === 'dark' ? 'rgba(12, 18, 36, 0.75)' : 'rgba(255, 255, 255, 0.85)',
              borderColor: 'rgba(168, 85, 247, 0.35)',
              boxShadow: c.cardShadow,
            }}
          >
            {/* Thematic Hover Background Animation: Arcana Portal xoay tròn */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-purple-950/40 via-indigo-950/20 to-transparent" />
            <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none text-purple-400 group-hover:rotate-45 transition-transform duration-1000">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none stroke-2">
                <circle cx="50" cy="50" r="40" strokeDasharray="4,4" />
                <polygon points="50,15 80,75 20,75" />
                <polygon points="50,85 80,25 20,25" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">🃏</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/40">
                  CHIÊM TINH TÂY PHƯƠNG
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1.5 text-zinc-100 group-hover:text-purple-300 transition-colors">
                Xem Bói Bài Tarot
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: c.textSecond }}>
                Khai mở thông điệp vũ trụ dẫn lối từ 22 lá bài Ẩn Chính Rider-Waite, thấu thị tình cảm, sự nghiệp và vận trình tương lai.
              </p>
            </div>

            <div className="relative z-10 mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Rút bài ngay <span>→</span>
              </span>
              <span className="text-[10px]" style={{ color: c.textMuted }}>22 Ẩn Chính Chuẩn</span>
            </div>
          </motion.div>

          {/* Card 3: Lập Lá Số Tử Vi */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={() => router.push('/chart')}
            className="group relative rounded-2xl p-6 border overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300"
            style={{
              background: theme === 'dark' ? 'rgba(12, 18, 36, 0.75)' : 'rgba(255, 255, 255, 0.85)',
              borderColor: 'rgba(212, 168, 67, 0.45)',
              boxShadow: c.cardShadow,
            }}
          >
            {/* Thematic Hover Background Animation: Bát Quái và Thiên Bàn Tử Vi */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-amber-950/40 via-yellow-950/20 to-transparent" />
            <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none text-amber-400 group-hover:rotate-90 transition-transform duration-1000">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none stroke-2">
                <circle cx="50" cy="50" r="42" />
                <circle cx="50" cy="50" r="28" strokeDasharray="3,3" />
                <path d="M 50 22 Q 64 36 50 50 Q 36 64 50 78" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">🔮</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  CHÍNH TÔNG THIÊN KỶ
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1.5 text-zinc-100 group-hover:text-amber-300 transition-colors">
                Lập Lá Số Tử Vi Đẩu Số
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: c.textSecond }}>
                An sao 12 cung, 14 Chính tinh, Tứ Hóa phi tinh và hiệu chỉnh Giờ Chân Thái Dương 63 tỉnh thành theo giáo trình danh sư Nghê Hải Hà.
              </p>
            </div>

            <div className="relative z-10 mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Lập lá số <span>→</span>
              </span>
              <span className="text-[10px]" style={{ color: c.textMuted }}>Giờ Chân Thái Dương</span>
            </div>
          </motion.div>

          {/* Card 4: Xem Ngày Lành Dữ */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={() => router.push('/metaphysics?tab=almanac')}
            className="group relative rounded-2xl p-6 border overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300"
            style={{
              background: theme === 'dark' ? 'rgba(12, 18, 36, 0.75)' : 'rgba(255, 255, 255, 0.85)',
              borderColor: 'rgba(234, 179, 8, 0.35)',
              boxShadow: c.cardShadow,
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-yellow-950/40 via-amber-950/20 to-transparent" />
            <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none text-yellow-400">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none stroke-2">
                <circle cx="50" cy="50" r="30" />
                <path d="M 50 10 L 50 20 M 50 80 L 50 90 M 10 50 L 20 50 M 80 50 L 90 50" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">📅</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/40">
                  TRẠCH NHẬT PHONG THỦY
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1.5 text-zinc-100 group-hover:text-yellow-300 transition-colors">
                Xem Ngày Lành Dữ (Trạch Nhật)
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: c.textSecond }}>
                Tra cứu Hoàng Đạo, Nhị Thập Bát Tú, Thần Sát và đối chiếu tuổi bản mệnh chọn ngày cát tường cho xuất hành, khai trương, cưới hỏi.
              </p>
            </div>

            <div className="relative z-10 mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-yellow-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Tra cứu ngay <span>→</span>
              </span>
              <span className="text-[10px]" style={{ color: c.textMuted }}>Nhị Thập Bát Tú</span>
            </div>
          </motion.div>

          {/* Card 5: Bói Hữu Duyên */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={() => router.push('/metaphysics?tab=dongtam')}
            className="group relative rounded-2xl p-6 border overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300"
            style={{
              background: theme === 'dark' ? 'rgba(12, 18, 36, 0.75)' : 'rgba(255, 255, 255, 0.85)',
              borderColor: 'rgba(59, 130, 246, 0.35)',
              boxShadow: c.cardShadow,
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blue-950/40 via-cyan-950/20 to-transparent" />
            <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none text-blue-400">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none stroke-2">
                <circle cx="50" cy="50" r="38" />
                <circle cx="50" cy="50" r="24" />
                <circle cx="50" cy="50" r="10" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">🪙</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40">
                  MAI HOA & LỤC HÀO
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1.5 text-zinc-100 group-hover:text-blue-300 transition-colors">
                Bói Hữu Duyên (Giờ Động Tâm)
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: c.textSecond }}>
                Gieo quẻ theo thời khắc tâm niệm phát khởi, hồi đáp trực diện và dứt khoát các vấn đề đi lại, bình an, công việc hay tình cảm.
              </p>
            </div>

            <div className="relative z-10 mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Gieo quẻ ngay <span>→</span>
              </span>
              <span className="text-[10px]" style={{ color: c.textMuted }}>Trả lời trực diện</span>
            </div>
          </motion.div>

          {/* Card 6: Thần Số Học Pitago */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            onClick={() => router.push('/metaphysics?tab=numerology')}
            className="group relative rounded-2xl p-6 border overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300"
            style={{
              background: theme === 'dark' ? 'rgba(12, 18, 36, 0.75)' : 'rgba(255, 255, 255, 0.85)',
              borderColor: 'rgba(236, 72, 153, 0.35)',
              boxShadow: c.cardShadow,
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-pink-950/40 via-purple-950/20 to-transparent" />
            <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none text-pink-400">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-current fill-none stroke-2">
                <polygon points="50,15 90,85 10,85" />
                <line x1="50" y1="15" x2="50" y2="85" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">🔯</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40">
                  HUYỀN HỌC PITAGO
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1.5 text-zinc-100 group-hover:text-pink-300 transition-colors">
                Thần Số Học & Ngày Sinh
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: c.textSecond }}>
                Giải mã con số chủ đạo (Life Path), 4 đỉnh cao kim tự tháp cuộc đời, số sứ mệnh tên gọi và dự báo chu kỳ năm cá nhân.
              </p>
            </div>

            <div className="relative z-10 mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-pink-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Khám phá ngay <span>→</span>
              </span>
              <span className="text-[10px]" style={{ color: c.textMuted }}>Kim Tự Tháp Cuộc Đời</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 哲学引言 ══════════════════════════════════════ */}
      <section className="relative z-10 overflow-hidden min-h-[82svh] lg:min-h-[92vh] flex items-center" style={{ padding: '72px 24px' }}>
        <WeakBoundary line={c.navBorder} />
        <div className="absolute inset-0"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(to bottom, #020810 0%, #020810 6%, #030a18 22%, #0d0820 40%, #0a0618 68%, #030a18 86%, #020810 100%)'
              : 'linear-gradient(to bottom, #f5efe0 0%, #f5efe0 6%, #c08055 18%, #6a2810 32%, #1e0a02 50%, #1e0a02 70%, #6a2810 84%, #f5efe0 100%)',
            transition: 'background 0.4s ease',
          }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-bold" style={{ fontSize: 'clamp(220px, 38vw, 460px)', color: 'rgba(212,168,67,0.012)', lineHeight: 1, fontFamily: 'serif' }}>MỆNH</span>
        </div>
        <FadeIn className="relative mx-auto text-center w-full" y={20}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.45))' }} />
            <span className="text-[10px] tracking-[0.55em] uppercase font-bold" style={{ color: 'rgba(212,168,67,0.7)' }}>MỆNH · VẬN · QUAN</span>
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(212,168,67,0.45))' }} />
          </div>
          <div className="space-y-3" style={{ maxWidth: '840px', margin: '0 auto' }}>
            {[
              { text: 'Ý nghĩa của việc thấu suốt vận mệnh', size: 'clamp(17px, 2.2vw, 28px)', color: 'rgba(215,228,252,0.72)', delay: 0.1 },
              { text: 'Không phải để lo âu về tương lai', size: 'clamp(21px, 2.6vw, 32px)', color: 'rgba(220,232,250,0.74)', delay: 0.25 },
              { text: 'Mà là để không ngừng thấu hiểu chính mình', size: 'clamp(24px, 3vw, 40px)', color: 'rgba(218,230,248,0.8)', delay: 0.34 },
            ].map((line, i) => (
              <motion.p key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: line.delay }}
                className="tracking-wider" style={{ fontSize: line.size, color: line.color, fontWeight: 400 }}>
                {line.text}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className={`grad-text ${theme === 'dark' ? 'grad-text-dark' : 'grad-text-light'} font-bold`}
              style={{ fontSize: 'clamp(24px, 3.4vw, 48px)', letterSpacing: '0.05em', lineHeight: 1.35 }}>
              Tự tay viết nên kịch bản cuộc đời rực rỡ nhất
            </motion.p>
          </div>
        </FadeIn>
      </section>

      {/* ══ 4 大学习板块时间轴 ════════════════════════════ */}
      <section className="relative z-10 py-20 lg:py-24 px-6"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to bottom, transparent 0%, rgba(184,146,42,0.03) 50%, transparent 100%)'
            : 'linear-gradient(to bottom, transparent 0%, rgba(184,146,42,0.04) 50%, transparent 100%)',
        }}>
        <FadeIn className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${c.goldLine})` }} />
            <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: c.goldSolid, opacity: 0.7 }}>HỆ THỐNG MÔN HỌC</span>
            <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${c.goldLine})` }} />
          </div>
          <div className="text-2xl lg:text-3xl font-bold mb-2 tracking-[0.15em]" style={{ color: c.textPrimary }}>
            Phương Pháp Luận Nghê Hải Hà · Từng Bước Mở Ra
          </div>
          <div className="text-xs lg:text-sm tracking-[0.1em]" style={{ color: c.textMuted }}>
            Từ nhập môn Tử Vi, dần tiếp cận các đại hệ thống tri thức Thiên Kỷ / Địa Kỷ / Nhân Kỷ
          </div>
        </FadeIn>

        <div className="max-w-sm lg:max-w-5xl mx-auto relative">
          {/* 横向连接线（仅桌面）*/}
          <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-0.5"
            style={{
              background: `linear-gradient(90deg, ${c.goldSolid} 0%, ${c.goldSolid} 25%, ${c.goldLine} 25%)`,
              opacity: 0.6,
            }} />

          {/* 纵向连接线（仅手机）—— 圆点贴在线上，做"地铁线路图"风格 */}
          <div className="lg:hidden absolute left-7 top-7 bottom-7 w-px -translate-x-1/2"
            style={{
              background: `linear-gradient(180deg, ${c.goldSolid} 0%, ${c.goldSolid} 22%, ${c.goldLine} 22%)`,
              opacity: 0.6,
            }} />

          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-4 lg:gap-4">
            {SECTIONS.map((s, i) => {
              const ready = s.status === 'ready';
              return (
                <motion.div key={s.key}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative flex flex-row lg:flex-col items-center lg:items-center text-left lg:text-center gap-4 lg:gap-0">
                  {/* 节点圆 */}
                  <div className="relative w-14 h-14 shrink-0 rounded-full flex items-center justify-center lg:mb-3"
                    style={{
                      background: ready
                        ? `linear-gradient(135deg, ${c.goldSolid} 0%, ${c.goldSolid}cc 100%)`
                        : (theme === 'dark' ? 'rgba(184,146,42,0.05)' : '#fdf8ee'),
                      border: ready ? 'none' : `2px dashed ${c.goldLine}`,
                      color: ready ? '#fff' : c.textMuted,
                      boxShadow: ready ? `0 4px 16px ${c.goldSolid}55` : 'none',
                    }}>
                    <span className="text-2xl">{s.icon}</span>
                    {ready && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white"
                        style={{ background: '#10b981', boxShadow: '0 2px 6px rgba(16,185,129,0.4)' }}>
                        ✓
                      </div>
                    )}
                  </div>
                  {/* 文字组：手机端右排单列；桌面端居中堆叠 */}
                  <div className="flex-1 lg:flex-none flex flex-col items-start lg:items-center min-w-0">
                    {/* 顶行：时间标签 + 板块名 + note（手机端 inline；桌面端依然分行） */}
                    <div className="flex items-baseline gap-2 lg:flex-col lg:gap-0 lg:mb-1">
                      <div className="text-[10px] tracking-[0.25em] lg:mb-1.5"
                        style={{ color: ready ? '#10b981' : c.textMuted, fontWeight: 500 }}>
                        {s.when}
                      </div>
                      <div className="text-base lg:text-xl font-semibold tracking-[0.15em]"
                        style={{ color: c.textPrimary }}>
                        {s.name}
                      </div>
                      {s.note && (
                        <div className="text-[9px] tracking-[0.15em] px-2 py-0.5 rounded-full lg:hidden"
                          style={{
                            color: c.goldSolid,
                            background: theme === 'dark' ? 'rgba(184,146,42,0.1)' : 'rgba(184,146,42,0.08)',
                            border: `1px solid ${c.goldLine}`,
                            opacity: 0.85,
                          }}>
                          {s.note}
                        </div>
                      )}
                    </div>
                    {/* 桌面专属 note（手机已在顶行 inline 展示）*/}
                    {s.note && (
                      <div className="hidden lg:block text-[9px] tracking-[0.15em] mb-1.5 px-2 py-0.5 rounded-full"
                        style={{
                          color: c.goldSolid,
                          background: theme === 'dark' ? 'rgba(184,146,42,0.1)' : 'rgba(184,146,42,0.08)',
                          border: `1px solid ${c.goldLine}`,
                          opacity: 0.85,
                        }}>
                        {s.note}
                      </div>
                    )}
                    {/* 简介 */}
                    <div className="text-[11px] lg:text-xs leading-relaxed lg:max-w-[200px] mt-0.5 lg:mt-0"
                      style={{ color: c.textSecond }}>
                      {s.desc}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 功能详解 ══════════════════════════════════════ */}
      <section className="relative z-10">
        {FEATURES.map((feature, i) => (
          <div key={i}
            className={`flex items-center px-6 md:px-10 lg:px-14 py-20 md:py-24 ${i <= 2 ? 'min-h-[82svh] lg:min-h-[92vh]' : ''}`}
            style={{ background: i % 2 === 1 ? c.altSection : 'transparent' }}>
            <div className="mx-auto w-full" style={{ maxWidth: '1280px' }}>
              <div className={`grid grid-cols-1 ${i % 2 === 0 ? 'lg:grid-cols-[0.45fr_0.55fr]' : 'lg:grid-cols-[0.55fr_0.45fr]'} gap-10 lg:gap-16 items-start ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                {/* 文字区 */}
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <FadeIn delay={0}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px w-8" style={{ background: c.goldLine }} />
                      <span className="text-[10px] tracking-[0.5em] uppercase" style={{ color: c.tagText }}>{feature.tag}</span>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.1}>
                    <h2 className={`grad-text ${theme === 'dark' ? 'grad-text-dark' : 'grad-text-light'} font-bold leading-tight mb-5 tracking-tight`}
                      style={{
                        fontSize: i < 2 ? 'clamp(36px, 4vw, 56px)' : 'clamp(30px, 3.5vw, 48px)',
                        whiteSpace: 'pre-line',
                      }}>
                      {feature.title}
                    </h2>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                    <p className="text-base mb-8 leading-relaxed" style={{ color: c.textSecond }}>{feature.subtitle}</p>
                  </FadeIn>
                  <div className="space-y-4">
                    {feature.points.map((point, j) => (
                      <FadeIn key={j} delay={0.25 + j * 0.08}>
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-2 w-1 h-1 rounded-full" style={{ background: c.goldSolid, opacity: 0.6 }} />
                          <p className="text-sm leading-relaxed" style={{ color: c.textMuted }}>{point}</p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
                {/* 视觉装饰区 */}
                <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <FadeIn delay={0.15}>
                    <div className="relative rounded-2xl overflow-hidden p-8 md:p-12"
                      style={{
                        border: `1px solid ${c.featureBord}`,
                        background: c.featureBg,
                        minHeight: i <= 1 ? '540px' : i === 2 ? '460px' : '320px',
                        boxShadow: c.cardShadow,
                      }}>
                      <FeatureVisual index={i} colors={c} />
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ══ THIÊN · ĐỊA · NHÂN (TRIẾT LÝ MỆNH VẬN NGHÊ HẢI HÀ) ════════════════════════════ */}
      <section className="relative z-10 flex items-center px-6 md:px-10 lg:px-14 py-20"
        style={{ background: c.altSection, minHeight: '82svh' }}>
        <WeakBoundary line={c.navBorder} />
        <div className="mx-auto w-full" style={{ maxWidth: '1280px' }}>
          <FadeIn>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${c.goldLine})` }} />
                <span className="text-[10px] tracking-[0.5em] uppercase font-bold" style={{ color: c.tagText }}>Triết Lý Mệnh Vận · Nghê Hải Hà</span>
                <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${c.goldLine})` }} />
              </div>
              <h2 className={`grad-text ${theme === 'dark' ? 'grad-text-dark' : 'grad-text-light'} font-bold mb-5 tracking-tight`}
                style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
                THIÊN · ĐỊA · NHÂN
              </h2>
              <p className="max-w-2xl mx-auto text-sm leading-relaxed" style={{ color: c.textSecond }}>
                Đạo lý cốt lõi của danh sư Nghê Hải Hà: Số mệnh chưa bao giờ là toàn bộ cuộc đời.<br />
                Thầy đúc kết ba lực lượng ngang hàng cùng nhau kiến tạo nên trọn vẹn số phận một con người.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {[
              {
                glyph: 'THIÊN',
                zh: '天',
                label: 'Tiên Thiên Mệnh Vận',
                pct: '⅓',
                color: c.goldSolid,
                borderColor: c.goldLine,
                desc: 'Lá số Tử Vi tiết lộ cách cục tiên thiên của mỗi người: Vị trí tinh diệu, Ngũ hành cục số, chính tinh Mệnh cung do thời khắc sinh quyết định. Đây chỉ là một phần ba định mệnh, là gam màu nền của cuộc đời chứ không phải là toàn bộ bức tranh.',
                sub: 'Mệnh Bàn · Tinh Diệu · Ngũ Hành'
              },
              {
                glyph: 'ĐỊA',
                zh: '地',
                label: 'Địa Lý Môi Trường',
                pct: '⅓',
                color: 'rgba(96,165,250,0.9)',
                borderColor: 'rgba(96,165,250,0.3)',
                desc: 'Môi trường địa lý, phong thủy nơi sinh sống, văn hóa vùng miền, gia thế và cấu trúc xã hội tạo nên chiều kích thứ hai của vận mệnh. Cùng một lá số, sinh ra ở hai vùng đất khác nhau thì cơ duyên và thành tựu sẽ có sự khác biệt rõ rệt.',
                sub: 'Địa Vực · Phong Thủy · Hoàn Cảnh'
              },
              {
                glyph: 'NHÂN',
                zh: '人',
                label: 'Nhân Tâm Niệm Niệm',
                pct: '⅓',
                color: 'rgba(100,216,139,0.9)',
                borderColor: 'rgba(100,216,139,0.3)',
                desc: 'Ý chí, tâm thái, sự lựa chọn và hành động của bản thân là sức mạnh chủ động mạnh mẽ nhất để chuyển hóa vận mệnh. Thầy Nghê Hải Hà luôn răn dạy: Thấu hiểu lá số là để tu dưỡng làm người tốt hơn, chứ không phải ngồi thụ động chờ số phận an bài.',
                sub: 'Ý Chí · Chọn Lựa · Hành Động'
              },
            ].map((item, i) => (
              <FadeIn key={item.glyph} delay={0.1 + i * 0.12}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.1 }}
                  className="rounded-2xl p-7 h-full flex flex-col"
                  style={{ background: c.cardBg, border: `1px solid ${item.borderColor}`, boxShadow: c.cardShadow }}>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="text-3xl font-black leading-none tracking-tight" style={{ color: item.color }}>{item.glyph}</div>
                      <div className="text-xs opacity-60 font-serif mt-1" style={{ color: item.color }}>({item.zh})</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ color: item.color }}>{item.pct}</div>
                      <div className="text-[9px] mt-0.5 tracking-widest font-semibold" style={{ color: c.textMuted }}>vận mệnh đời người</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm font-bold mb-0.5" style={{ color: item.color }}>{item.label}</div>
                    <div className="text-[10px] tracking-wider" style={{ color: c.textMuted }}>{item.sub}</div>
                  </div>
                  <div className="h-px mb-4" style={{ background: item.borderColor }} />
                  <p className="text-xs leading-relaxed flex-1" style={{ color: c.textSecond }}>{item.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="mt-10 text-center">
              <p className="text-sm md:text-base leading-relaxed font-medium italic" style={{ color: c.goldSolid }}>
                &ldquo;Số mệnh không phải là toàn bộ cuộc đời; phải cộng thêm vị trí phong thủy địa lý và nhân tâm sở niệm, mới thực sự trọn vẹn.&rdquo;
              </p>
              <p className="mt-2 text-xs tracking-widest font-bold" style={{ color: c.tagText }}>— DANH SƯ NGHÊ HẢI HÀ (NI HAIXIA)</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ 倪海厦介绍 ════════════════════════════════════ */}
      <section className="relative z-10 flex items-center px-6 md:px-10 lg:px-14 py-20" style={{ minHeight: '82svh' }}>
        <WeakBoundary line={c.navBorder} />
        <div className="mx-auto w-full" style={{ maxWidth: '1280px' }}>
          <FadeIn>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${c.goldLine})` }} />
                <span className="text-[10px] tracking-[0.5em] uppercase font-bold" style={{ color: c.tagText }}>DANH SƯ · 1954 – 2012</span>
                <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${c.goldLine})` }} />
              </div>
              <h2 className={`grad-text ${theme === 'dark' ? 'grad-text-dark' : 'grad-text-light'} font-bold mb-6 tracking-tight`}
                style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
                Đại Sư Nghê Hải Hà (Ni Haixia)
              </h2>
              <p className="max-w-2xl mx-auto leading-relaxed text-sm" style={{ color: c.textSecond }}>
                Một trong những đại tông sư có tầm ảnh hưởng sâu rộng nhất về Trung Y và Thuật Số Đông Phương<br />
                Sáng lập Học viện Trung Y Hán Đường tại Hoa Kỳ · Để lại hai bộ đại pháp bất hủ:「Nhân Kỷ」và「Thiên Kỷ」
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl p-8 md:p-10 mb-8"
              style={{ border: `1px solid ${c.niBorder}`, background: c.niBg, boxShadow: c.cardShadow }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'NĂM SINH', value: '1954', sub: 'Đài Loan' },
                  { label: 'TẠ THẾ', value: '2012', sub: '31/01/2012 · Hưởng thọ 58 tuổi' },
                  { label: 'TRUYỀN THỪA', value: 'Tử Vi Đẩu Số', sub: 'Kinh Phương Y Đạo · Kinh Dịch' },
                ].map(item => (
                  <div key={item.label} className="text-center rounded-xl px-4 py-3"
                    style={{ border: `1px solid ${c.niDivider}`, background: 'rgba(255,255,255,0.02)' }}>
                    <div className="text-[10px] tracking-[0.3em] mb-1 font-bold" style={{ color: c.textFaint }}>{item.label}</div>
                    <div className="text-2xl font-bold mb-0.5" style={{ color: c.goldSolid }}>{item.value}</div>
                    <div className="text-[11px]" style={{ color: c.textMuted }}>{item.sub}</div>
                  </div>
                ))}
              </div>
              <div className="h-px mb-8" style={{ background: c.niDivider }} />
              <div className="space-y-4 text-sm leading-relaxed max-w-3xl mx-auto" style={{ color: c.textSecond }}>
                <p>
                  <strong style={{ color: c.goldSolid }}>Tiểu sử & Cuộc đời</strong>:
                  Danh sư Nghê Hải Hà (1954–2012) sinh ra tại Đài Loan, từ nhỏ theo học nhiều danh y kiệt xuất, chuyên sâu trường phái Kinh Phương (truyền thừa <em>Thương Hàn Luận</em> của Trọng Cảnh).
                  Tuổi trung niên sang Mỹ hành nghề y, sáng lập <strong>Học viện Trung Y Hán Đường</strong> tại Florida, hơn hai mươi năm truyền thụ hệ thống Trung y cổ truyền và Thuật số kinh điển.
                  Ngày 31 tháng 1 năm 2012, thầy tạ thế tại Đài Loan, hưởng thọ 58 tuổi.
                </p>
                <p>
                  <strong style={{ color: c.goldSolid }}>Hệ thống Giáo trình</strong>:
                  Thầy đã đúc kết sở học cả đời thành hai pho đại giáo trình công khai.
                  <strong>「Nhân Kỷ」</strong> bao gồm <em>Châm Cứu Đại Thành</em>, <em>Thần Nông Bản Thảo Kinh</em>, <em>Hoàng Đế Nội Kinh</em>, <em>Thương Hàn Luận</em>, <em>Kim Quỹ Yếu Lược</em> —
                  đặt nền móng y đạo trọn vẹn cứu nhân độ thế;
                  <strong>「Thiên Kỷ」</strong> bao gồm <em>Tử Vi Đẩu Số</em> và <em>Kinh Dịch</em> — thành tựu thuật số chuẩn xác giúp con người hiểu thiên thời, địa lợi, nhân hòa.
                  Hai bộ hợp nhất là di sản vĩ đại nhất thầy để lại cho hậu thế.
                </p>
                <p>
                  <strong style={{ color: c.goldSolid }}>Trường phái Tử Vi</strong>:
                  Thầy Nghê Hải Hà theo <strong>Nam Phái Tam Hợp</strong>, chủ trương <em>「Lấy Mệnh Cung làm gốc, Tam Phương Tứ Chính làm dụng, Tứ Hóa làm cương lĩnh」</em>.
                  Thầy từng giảng trong <em>Thiên Kỷ</em>: <em>「Phi tinh bay qua bay lại quá rườm rà, chúng ta không dùng lối đó, bởi Đại Đạo Chí Giản」</em> —
                  phân định rõ rệt với sự phức tạp của phái Phi Tinh.
                </p>
                <p>
                  <strong style={{ color: c.goldSolid }}>Tinh thần Học thuật</strong>:
                  Thầy phản đối học vẹt khẩu quyết, nhấn mạnh <em>「Hiểu rõ đạo lý hơn là học vẹt」</em>, <em>「Logic có thể chứng thực hơn là huyền học mơ hồ」</em>.
                  Tinh thần này đưa Tử Vi Đẩu Số từ bí truyền khép kín trở thành một hệ thống tri thức hiện đại, có thể kiểm chứng và học tập mạch lạc.
                </p>
                <p>
                  <strong style={{ color: c.goldSolid }}>Tầm ảnh hưởng Đương đại</strong>:
                  Các bài giảng video của thầy được chia sẻ rộng rãi trên khắp các nền tảng mạng xã hội, là giáo trình gối đầu giường được mọi người yêu thích mệnh lý và y học cổ truyền tìm học.
                  Thầy không chỉ là bậc thầy truyền thừa Tử Vi, mà còn là người đưa văn hóa thuật số cổ xưa giao hòa trọn vẹn với tư duy văn minh hiện đại.
                </p>
                <p style={{ fontSize: '11px', color: c.textMuted, fontStyle: 'italic', marginTop: '12px' }}>
                  Toàn bộ phân tích trên nền tảng được tổng hợp từ giáo trình Thiên Kỷ công khai của thầy Nghê Hải Hà, Tử Vi Đẩu Số Toàn Thư (bản Minh Khắc) và cổ thư Tam Hợp truyền thống, phục vụ mục đích nghiên cứu học thuật và phát triển bản thân. Thầy Nghê Hải Hà và thân quyến không có liên hệ thương mại với nền tảng.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NI_TEACHINGS.map((teaching, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.1 }}
                  className="rounded-xl p-6 h-full"
                  style={{ border: `1px solid ${c.niCardBord}`, background: c.niCardBg, boxShadow: c.niCardShadow }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center mt-0.5"
                      style={{ borderColor: c.goldLine }}>
                      <span className="text-[9px]" style={{ color: c.goldSolid }}>{i + 1}</span>
                    </div>
                    <h3 className="text-sm font-medium leading-relaxed" style={{ color: c.goldSolid }}>{teaching.title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed pl-8" style={{ color: c.textSecond }}>{teaching.body}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 合盘入口 ══════════════════════════════════════ */}
      <section className="relative z-10 px-6 md:px-10 lg:px-14 py-20">
        <div className="mx-auto" style={{ maxWidth: '1280px' }}>
          <div className="rounded-2xl p-10 md:p-14 text-center"
            style={{
              background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
              border: `1px solid ${c.cardBorder}`,
              boxShadow: c.cardShadow,
            }}>
            <FadeIn>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: c.goldLine }} />
                <span className="text-[10px] tracking-[0.5em] uppercase font-bold" style={{ color: c.tagText }}>TƯƠNG HỢP · ĐÔI LỨA & CỘNG SỰ</span>
                <div className="h-px w-8" style={{ background: c.goldLine }} />
              </div>
              <h2 className={`grad-text ${theme === 'dark' ? 'grad-text-dark' : 'grad-text-light'} font-bold mb-4 tracking-tight`}
                style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}>
                Tử Vi So Kèo Hợp Mệnh
              </h2>
              <p className="text-sm leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: c.textSecond }}>
                Nhập thông tin ngày giờ sinh của hai người, hệ thống dựa trên phương pháp luận Thiên Kỷ phân tích cung Phu Thê đối ứng, mức độ tương hợp Mệnh Cung và tương tác Tam Phương Tứ Chính,<br className="hidden md:block" />
                đưa ra chỉ số hòa hợp tình duyên, khả năng kết hợp làm ăn và lời khuyên ứng xử tốt nhất.
              </p>
              <div className="flex justify-center gap-3 flex-wrap mb-6">
                {['Độ Hòa Hợp Tình Duyên', 'Hợp Tác Kinh Doanh', 'Duyên Phận Cha Mẹ - Con Cái', 'Đánh Giá Tiền Hôn Nhân'].map(item => (
                  <span key={item} style={{
                    fontSize: '12px', padding: '5px 14px', borderRadius: '20px',
                    background: theme === 'dark' ? 'rgba(212,168,67,0.08)' : 'rgba(212,168,67,0.12)',
                    border: `1px solid ${c.goldLine}`,
                    color: c.goldSolid,
                  }}>
                    {item}
                  </span>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => router.push('/heming')}
                className="px-10 py-3 font-bold text-sm tracking-widest rounded-full"
                style={{
                  background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(140,100,20,0.1)',
                  border: `1px solid ${c.goldLine}`,
                  color: c.goldSolid,
                  cursor: 'pointer',
                }}>
                BẮT ĐẦU PHÂN TÍCH HỢP MỆNH →
              </motion.button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ 最终 CTA ══════════════════════════════════════ */}
      <section className="relative z-10 py-40 px-6 text-center" style={{ background: c.altSection }}>
        <FadeIn>
          <p className="text-[10px] tracking-[0.6em] uppercase mb-6 font-bold" style={{ color: c.tagText }}>BẮT ĐẦU HÀNH TRÌNH KHÁM PHÁ VẬN MỆNH</p>
          <h2 className={`grad-text ${theme === 'dark' ? 'grad-text-dark' : 'grad-text-light'} font-bold mb-8 tracking-tight leading-tight`}
            style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
            Lá Số Tử Vi Của Bạn<br />Đang Chờ Được Mở Ra
          </h2>
          <p className="text-sm mb-10 max-w-md mx-auto leading-relaxed" style={{ color: c.textSecond }}>
            Nhập ngày giờ sinh để an lá số chuẩn xác trong vài giây,<br />
            cùng hệ thống giải mã chuyên sâu theo giáo trình Thiên Kỷ.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/chart')}
            className="px-14 py-4 font-black text-base tracking-widest rounded-full shadow-xl shadow-amber-500/20"
            style={{ background: c.ctaBg, color: c.ctaText }}>
            LẬP LÁ SỐ MIỄN PHÍ NGAY
          </motion.button>
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            <motion.a
              href="/knowledge"
              whileHover={{ scale: 1.02 }}
              className="text-xs tracking-[0.2em] inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold"
              style={{
                color: c.goldSolid,
                border: `1px solid ${c.goldLine}`,
                background: 'transparent',
                textDecoration: 'none',
              }}>
              ✦ Thư Viện Kiến Thức Tử Vi →
            </motion.a>
            <motion.a
              href="/library"
              whileHover={{ scale: 1.02 }}
              className="text-xs tracking-[0.2em] inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold"
              style={{
                color: c.goldSolid,
                border: `1px solid ${c.goldLine}`,
                background: 'transparent',
                textDecoration: 'none',
              }}>
              📜 Kho Tàng Cổ Tịch Nguyên Bản →
            </motion.a>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6"
        style={{ borderTop: `1px solid ${c.niCardBord}` }}>

        {/* 4 板块导航占位（已上线 + 即将开放）*/}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="text-[9px] tracking-[0.3em] text-center mb-4 uppercase font-bold"
            style={{ color: c.textMuted, opacity: 0.7 }}>
            PHƯƠNG PHÁP LUẬN NGHÊ HẢI HÀ · HỆ THỐNG HỌC THUẬT
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {SECTIONS.map(s => {
              const ready = s.status === 'ready';
              return (
                <a
                  key={s.key}
                  href={ready ? '/chart' : undefined}
                  onClick={ready ? undefined : (e) => e.preventDefault()}
                  className="rounded-lg px-3 py-3 text-center transition-all"
                  style={{
                    background: ready ? c.starBg : 'transparent',
                    border: `1px ${ready ? 'solid' : 'dashed'} ${ready ? c.goldLine : c.navBorder}`,
                    cursor: ready ? 'pointer' : 'not-allowed',
                    opacity: ready ? 1 : 0.5,
                    textDecoration: 'none',
                  }}
                >
                  <div className="text-base font-semibold mb-0.5 tracking-[0.1em]"
                    style={{ color: ready ? c.goldSolid : c.textMuted }}>
                    {s.name}
                  </div>
                  <div className="text-[9px] tracking-wider"
                    style={{ color: ready ? '#10b981' : c.textMuted }}>
                    {ready ? '✓ Đã Ra Mắt' : `${s.when} Ra Mắt`}
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <p className="text-[10px] tracking-wider mb-3 font-semibold" style={{ color: c.footerText }}>
            Tử Vi Đẩu Số Thiên Kỷ · Dựa trên giáo trình chính tông của danh sư Nghê Hải Hà · Mệnh do Trời định, Vận do Người nắm giữ.
          </p>
          <p className="text-[10px] tracking-wider mb-3 max-w-2xl mx-auto leading-relaxed"
            style={{ color: c.footerText, opacity: 0.85 }}>
            Nền tảng nghiên cứu văn hóa truyền thống Á Đông, phục vụ học tập tham khảo.<br className="sm:hidden" />
            Không cấu thành các chỉ định y tế, khuyến nghị đầu tư tài chính hay pháp lý.
          </p>
          <p className="text-[10px] tracking-wider" style={{ color: c.footerText }}>
            <a href="/terms" style={{ color: c.footerText, textDecoration: 'underline' }}>Điều Khoản Dịch Vụ</a>
            {' · '}
            <a href="/privacy" style={{ color: c.footerText, textDecoration: 'underline' }}>Chính Sách Bảo Mật</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
