/**
 * HỆ THỐNG LINH TƯỢNG TÂM LINH HIỂN LINH ĐỊNH KỲ (SPIRITUAL MANIFESTATION ENGINE)
 * ---------------------------------------------------------------------------------
 * Lý do thiết kế (WHY):
 * - Cứ mỗi 240 giây (4 phút), hệ thống hiển thị một linh tượng tâm linh cổ truyền
 *   giữa màn hình với hiệu ứng hoạt họa (animation) huyền ảo.
 * - Sử dụng thuật toán Shuffle Bag (Fisher-Yates kết hợp phân tách nhóm liên tiếp)
 *   để đảm bảo 30 linh tượng hoàn toàn KHÔNG BAO GIỜ TRÙNG LẶP trong suốt một chu kỳ
 *   và không trùng nhau ở điểm giao giữa hai chu kỳ.
 */

export const SPIRITUAL_INTERVAL_MS = 5_000; // 5 giây (chế độ test nhanh theo yêu cầu người dùng; có thể chuyển 240s trên UI)
export const SPIRITUAL_DISPLAY_DURATION_MS = 4_800; // Hiển thị 4.8 giây mỗi lần xuất hiện

export type SpiritualCategory =
  | 'talisman'       // Đạo Bùa Cổ Truyền (Linh Phù)
  | 'constellation'  // Các Sao Tinh Tú & Chòm Sao
  | 'zodiac'         // 12 Con Giáp Địa Chi Hộ Mệnh
  | 'bagua'          // Bát Quái & Thái Cực Trận Đồ
  | 'sacred_beast'   // Tứ Linh Thần Thú & Ấn Triện Cổ
  | 'five_elements'; // Ngũ Hành Tương Sinh & Hà Đồ Liên Hoa

export interface ConstellationStarPoint {
  x: number; // Tọa độ % (10 - 90)
  y: number; // Tọa độ % (10 - 90)
  label: string;
  size?: number;
}

export interface SpiritualManifestation {
  id: string;
  category: SpiritualCategory;
  categoryLabel: string;
  title: string;
  hanzi: string;
  subtitle: string;
  mantra: string;
  meaning: string;
  element: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ' | 'Thái Cực';
  accentColor: 'amber' | 'crimson' | 'cyan' | 'emerald' | 'violet' | 'gold';
  /** Ký tự trung tâm hoặc biểu tượng cổ */
  centerGlyph: string;
  /** Dữ liệu chuyên biệt cho Đạo Bùa */
  talismanConfig?: {
    sealText: string;
    verticalInscriptions: [string, string];
    paperTone: 'yellow_cinnabar' | 'crimson_gold' | 'jade_gold' | 'indigo_silver';
    runeVariant: 1 | 2 | 3 | 4 | 5 | 6;
  };
  /** Dữ liệu chuyên biệt cho Chòm Sao Tinh Tú */
  constellationConfig?: {
    stars: ConstellationStarPoint[];
    connections: [number, number][];
  };
  /** Dữ liệu chuyên biệt cho 12 Con Giáp / Linh Thú */
  zodiacConfig?: {
    branchHanzi: string;
    branchVi: string;
    guardianIcon: string;
    auspiciousHours: string;
  };
  /** Dữ liệu chuyên biệt cho Bát Quái */
  baguaConfig?: {
    orderType: 'tien_thien' | 'hau_thien' | 'luc_thap_tu' | 'luong_nghi';
    highlightTrigrams: string[];
  };
}

export const SPIRITUAL_MANIFESTATIONS: SpiritualManifestation[] = [
  // ============================================================================
  // 1. NHÓM ĐẠO BÙA CỔ TRUYỀN (LINH PHÙ ĐẠO GIA - 6 BIẾN THỂ)
  // ============================================================================
  {
    id: 'talisman-bac-dau-tran-trach',
    category: 'talisman',
    categoryLabel: 'Linh Phù Đạo Gia',
    title: 'Thiên Cương Bắc Đẩu Trấn Trạch Phù',
    hanzi: '天罡北斗鎮宅靈符',
    subtitle: 'Trấn Trạch Tịch Tà · Gia Đạo Thái Bình',
    mantra: 'Thiên Cương Bắc Đẩu, Vạn Khí Quy Tông, Cấp Cấp Như Luật Lệnh!',
    meaning: 'Linh phù dẫn khí 7 ngôi sao Bắc Đẩu trấn giữ bốn phương tám hướng, xua tan uế khí và bảo hộ gia trạch bình an.',
    element: 'Hỏa',
    accentColor: 'crimson',
    centerGlyph: '敕',
    talismanConfig: {
      sealText: '北極鎮宅',
      verticalInscriptions: ['北斗七星護吾身', '天罡正氣鎮乾坤'],
      paperTone: 'yellow_cinnabar',
      runeVariant: 1,
    },
  },
  {
    id: 'talisman-ngu-loi-chieu-tai',
    category: 'talisman',
    categoryLabel: 'Linh Phù Đạo Gia',
    title: 'Ngũ Lôi Chiêu Tài Tiến Bảo Phù',
    hanzi: '五雷招財進寶靈符',
    subtitle: 'Khai Thông Tài Mạch · Lộc Khí Quy Tụ',
    mantra: 'Ngũ Phương Lôi Đế, Chuyển Vận Chiêu Tài, Kim Ngọc Mãn Đường!',
    meaning: 'Dùng sức mạnh chấn động của Ngũ Lôi phá tan bế tắc tài vận, chiêu nạp cát khí và cơ hội thịnh vượng từ năm phương.',
    element: 'Kim',
    accentColor: 'gold',
    centerGlyph: '財',
    talismanConfig: {
      sealText: '招財進寶',
      verticalInscriptions: ['五路財神隨步至', '八方紫氣入門來'],
      paperTone: 'crimson_gold',
      runeVariant: 2,
    },
  },
  {
    id: 'talisman-thai-cuc-ho-than',
    category: 'talisman',
    categoryLabel: 'Linh Phù Đạo Gia',
    title: 'Thái Thượng Huyền Nguyên Hộ Thân Phù',
    hanzi: '太上玄元護身靈符',
    subtitle: 'Hộ Mệnh Định Tâm · Bách Tà Bất Xâm',
    mantra: 'Thái Thượng Lão Quân, Âm Dương Hòa Hợp, Nguyên Thần Kiên Cố!',
    meaning: 'Quân bình hai luồng khí Âm Dương trong cơ thể, giữ cho nguyên thần vững chãi, đi đêm về hôm đều có quý nhân che chở.',
    element: 'Thái Cực',
    accentColor: 'amber',
    centerGlyph: '道',
    talismanConfig: {
      sealText: '太上敕令',
      verticalInscriptions: ['乾坤正氣凝神守', '日月光華照本心'],
      paperTone: 'yellow_cinnabar',
      runeVariant: 3,
    },
  },
  {
    id: 'talisman-van-xuong-khai-tri',
    category: 'talisman',
    categoryLabel: 'Linh Phù Đạo Gia',
    title: 'Văn Xương Đế Quân Khai Trí Phù',
    hanzi: '文昌帝君開智靈符',
    subtitle: 'Minh Tâm Khai Tuệ · Khoa Bảng Đăng Đệ',
    mantra: 'Văn Xương Khuông Phù, Văn Khúc Chiếu Mệnh, Bút Hạ Sinh Hoa!',
    meaning: 'Khai thông trí tuệ minh mẫn, giúp tâm trí sáng suốt khi học tập, thi cử, hoạch định chiến lược và sáng tạo sự nghiệp.',
    element: 'Mộc',
    accentColor: 'emerald',
    centerGlyph: '文',
    talismanConfig: {
      sealText: '文昌帝君',
      verticalInscriptions: ['天開文運光千載', '星照奎垣耀九州'],
      paperTone: 'jade_gold',
      runeVariant: 4,
    },
  },
  {
    id: 'talisman-nguyet-lao-nhan-duyen',
    category: 'talisman',
    categoryLabel: 'Linh Phù Đạo Gia',
    title: 'Nguyệt Lão Thiên Hỷ Hòa Hợp Phù',
    hanzi: '月老天喜和合靈符',
    subtitle: 'Hồng Loan Chiếu Mệnh · Lương Duyên Tương Ngộ',
    mantra: 'Nguyệt Hạ Lão Nhân, Hồng Tơ Thiên Định, Bách Niên Hòa Hợp!',
    meaning: 'Hội tụ cát khí của sao Hồng Loan và Thiên Hỷ, hóa giải hiểu lầm, kết nối thiện duyên và gắn kết tình cảm bền chặt.',
    element: 'Hỏa',
    accentColor: 'crimson',
    centerGlyph: '囍',
    talismanConfig: {
      sealText: '天喜良緣',
      verticalInscriptions: ['紅鸞星動佳期至', '天喜神臨福澤長'],
      paperTone: 'crimson_gold',
      runeVariant: 5,
    },
  },
  {
    id: 'talisman-duoc-su-truong-tho',
    category: 'talisman',
    categoryLabel: 'Linh Phù Đạo Gia',
    title: 'Cửu Thiên Tiêu Tai Diên Thọ Phù',
    hanzi: '九天消災延壽靈符',
    subtitle: 'Giải Ách Trừ Tật · Khương Ninh Phúc Thọ',
    mantra: 'Thiên Y Giải Thần, Bách Bệnh Tiêu Tán, Thân Tâm An Thái!',
    meaning: 'Dẫn cát khí của sao Thiên Giải, Địa Giải và Thiên Y, giúp tinh thần thư thái, tiêu trừ mỏi mệt và bồi đắp sinh lực.',
    element: 'Thủy',
    accentColor: 'cyan',
    centerGlyph: '壽',
    talismanConfig: {
      sealText: '消災延壽',
      verticalInscriptions: ['天醫妙藥除千病', '福壽康寧享萬春'],
      paperTone: 'indigo_silver',
      runeVariant: 6,
    },
  },

  // ============================================================================
  // 2. NHÓM SAO TINH TÚ & CHÒM SAO THIÊN VĂN (5 BIẾN THỂ)
  // ============================================================================
  {
    id: 'constellation-bac-dau-that-tinh',
    category: 'constellation',
    categoryLabel: 'Thiên Văn Tinh Tú',
    title: 'Bắc Đẩu Thất Tinh Trận Đồ',
    hanzi: '北斗七星天樞陣',
    subtitle: 'Thiên Xu · Thiên Tuyền · Thiên Cơ · Thiên Quyền · Ngọc Hoành · Khai Dương · Dao Quang',
    mantra: 'Bắc Đẩu Cửu Hoàng, Dẫn Lối Ngân Hà, Xoay Chuyển Thời Không!',
    meaning: 'Chòm sao Bắc Đẩu Thất Tinh là kim chỉ nam của bầu trời phương Bắc, nắm giữ sinh sát và vận hội chuyển mình của vạn vật.',
    element: 'Thủy',
    accentColor: 'cyan',
    centerGlyph: '斗',
    constellationConfig: {
      stars: [
        { x: 18, y: 28, label: 'Thiên Xu', size: 7 },
        { x: 22, y: 46, label: 'Thiên Tuyền', size: 6.5 },
        { x: 38, y: 50, label: 'Thiên Cơ', size: 6.5 },
        { x: 42, y: 34, label: 'Thiên Quyền', size: 7 },
        { x: 56, y: 42, label: 'Ngọc Hoành', size: 7.5 },
        { x: 70, y: 52, label: 'Khai Dương', size: 7 },
        { x: 84, y: 68, label: 'Dao Quang', size: 8 },
      ],
      connections: [
        [0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6],
      ],
    },
  },
  {
    id: 'constellation-tu-vi-de-toa',
    category: 'constellation',
    categoryLabel: 'Thiên Văn Tinh Tú',
    title: 'Tử Vi Đế Tinh · Quần Tinh Triều Củng',
    hanzi: '紫微帝座萬星朝拱',
    subtitle: 'Tử Vi · Thiên Phủ · Thái Dương · Thái Âm · Vũ Khúc · Thiên Tướng',
    mantra: 'Tử Vi Trung Thiên Đế Tinh, Vạn Tinh Triều Bái, Chí Tôn Vô Thượng!',
    meaning: 'Sao Tử Vi là Đế Tinh đứng đầu 14 chính tinh Tử Vi Đẩu Số, tọa thủ trung cung được Tả Phụ Hữu Bật và quần tinh vây quanh triều củng.',
    element: 'Thổ',
    accentColor: 'gold',
    centerGlyph: '紫',
    constellationConfig: {
      stars: [
        { x: 50, y: 50, label: 'Tử Vi Đế Tinh', size: 9.5 },
        { x: 50, y: 20, label: 'Thiên Cơ', size: 6.5 },
        { x: 78, y: 32, label: 'Thái Dương', size: 7.5 },
        { x: 76, y: 66, label: 'Vũ Khúc', size: 7 },
        { x: 50, y: 80, label: 'Thiên Phủ', size: 8 },
        { x: 24, y: 66, label: 'Thái Âm', size: 7.5 },
        { x: 22, y: 32, label: 'Liêm Trinh', size: 6.5 },
      ],
      connections: [
        [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
        [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
      ],
    },
  },
  {
    id: 'constellation-nam-dau-luc-tinh',
    category: 'constellation',
    categoryLabel: 'Thiên Văn Tinh Tú',
    title: 'Nam Đẩu Lục Tinh Trường Sinh Đồ',
    hanzi: '南斗六星延壽垣',
    subtitle: 'Thiên Phủ · Thiên Lương · Thiên Cơ · Thiên Đồng · Thiên Tướng · Thất Sát',
    mantra: 'Bắc Đẩu Chú Tử, Nam Đẩu Chú Sinh, Phúc Lộc Miên Trường!',
    meaning: 'Chòm Nam Đẩu Lục Tinh chủ quản tước lộc, tuổi thọ và phúc ấm hậu vận, mang năng lượng sinh sôi và che chở của trời đất.',
    element: 'Mộc',
    accentColor: 'emerald',
    centerGlyph: '南',
    constellationConfig: {
      stars: [
        { x: 20, y: 62, label: 'Thiên Phủ', size: 8 },
        { x: 35, y: 40, label: 'Thiên Lương', size: 7 },
        { x: 50, y: 26, label: 'Thiên Cơ', size: 7 },
        { x: 64, y: 42, label: 'Thiên Đồng', size: 7.5 },
        { x: 52, y: 64, label: 'Thiên Tướng', size: 7 },
        { x: 80, y: 58, label: 'Thất Sát', size: 7.5 },
      ],
      connections: [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [3, 5],
      ],
    },
  },
  {
    id: 'constellation-nhi-thap-bat-tu',
    category: 'constellation',
    categoryLabel: 'Thiên Văn Tinh Tú',
    title: 'Nhị Thập Bát Tú Chu Thiên Tinh Đồ',
    hanzi: '二十八宿周天星圖',
    subtitle: 'Đông Thanh Long · Tây Bạch Hổ · Nam Chu Tước · Bắc Huyền Vũ',
    mantra: 'Nhị Thập Bát Tú Tuần Hành, Tứ Phương Tinh Tú Hộ Trì Nhân Gian!',
    meaning: '28 chòm sao dọc theo Hoàng Đạo và Xích Đạo thiên cầu, chia làm 4 cung Tứ Tượng canh giữ trật tự vũ trụ suốt bốn mùa.',
    element: 'Kim',
    accentColor: 'violet',
    centerGlyph: '宿',
    constellationConfig: {
      stars: [
        { x: 50, y: 16, label: 'Chu Tước (Nam)', size: 8 },
        { x: 84, y: 50, label: 'Thanh Long (Đông)', size: 8 },
        { x: 50, y: 84, label: 'Huyền Vũ (Bắc)', size: 8 },
        { x: 16, y: 50, label: 'Bạch Hổ (Tây)', size: 8 },
        { x: 68, y: 32, label: 'Giác Mộc Giao', size: 6 },
        { x: 68, y: 68, label: 'Đẩu Mộc Giải', size: 6 },
        { x: 32, y: 68, label: 'Khuê Mộc Lang', size: 6 },
        { x: 32, y: 32, label: 'Tỉnh Mộc Hãn', size: 6 },
      ],
      connections: [
        [0, 4], [4, 1], [1, 5], [5, 2], [2, 6], [6, 3], [3, 7], [7, 0],
        [4, 6], [5, 7],
      ],
    },
  },
  {
    id: 'constellation-nhat-nguyet-tinh-minh',
    category: 'constellation',
    categoryLabel: 'Thiên Văn Tinh Tú',
    title: 'Nhật Nguyệt Tịnh Minh · Song Huy Chiếu Mệnh',
    hanzi: '日月並明雙輝星垣',
    subtitle: 'Thái Dương Đan Quế · Thái Âm Ngọc Thố · Văn Xương Văn Khúc',
    mantra: 'Nhật Nguyệt Đồng Lâm, Quang Mang Vạn Trượng, Âm Dương Hòa Hợp!',
    meaning: 'Cách cục Thái Dương và Thái Âm cùng tỏa sáng rực rỡ, biểu trưng cho trí tuệ viên mãn, danh tiếng vang xa và phúc lộc song toàn.',
    element: 'Hỏa',
    accentColor: 'amber',
    centerGlyph: '明',
    constellationConfig: {
      stars: [
        { x: 32, y: 45, label: 'Thái Dương (Nhật)', size: 9.5 },
        { x: 68, y: 45, label: 'Thái Âm (Nguyệt)', size: 9.5 },
        { x: 50, y: 20, label: 'Hóa Lộc', size: 7 },
        { x: 50, y: 74, label: 'Hóa Khoa', size: 7 },
        { x: 18, y: 26, label: 'Văn Xương', size: 6 },
        { x: 82, y: 26, label: 'Văn Khúc', size: 6 },
        { x: 22, y: 70, label: 'Tả Phụ', size: 6 },
        { x: 78, y: 70, label: 'Hữu Bật', size: 6 },
      ],
      connections: [
        [0, 2], [2, 1], [1, 3], [3, 0], [0, 1], [0, 4], [1, 5], [0, 6], [1, 7],
      ],
    },
  },

  // ============================================================================
  // 3. NHÓM 12 CON GIÁP ĐỊA CHI LINH THÚ (7 BIẾN THỂ)
  // ============================================================================
  {
    id: 'zodiac-kim-long-thin',
    category: 'zodiac',
    categoryLabel: 'Thập Nhị Địa Chi Linh Thú',
    title: 'Thìn Long · Kim Long Hiến Thụy',
    hanzi: '辰龍 · 金龍獻瑞',
    subtitle: 'Đứng Đầu Tứ Linh · Hô Phong Hoán Vũ · Chí Tôn Quyền Uy',
    mantra: 'Long Đằng Tứ Hải, Vân Khởi Cửu Thiên, Phi Long Tại Thiên!',
    meaning: 'Rồng thiêng cưỡi mây đạp gió, tượng trưng cho hào khí đế vương, sự bứt phá ngoạn mục và vận hội thăng hoa rực rỡ.',
    element: 'Thổ',
    accentColor: 'gold',
    centerGlyph: '辰',
    zodiacConfig: {
      branchHanzi: '辰龍',
      branchVi: 'Giờ Thìn (07h - 09h) · Phương Đông Nam',
      guardianIcon: '🐉',
      auspiciousHours: 'Tam Hợp: Thân - Tý - Thìn · Lục Hợp: Dậu',
    },
  },
  {
    id: 'zodiac-bach-ho-dan',
    category: 'zodiac',
    categoryLabel: 'Thập Nhị Địa Chi Linh Thú',
    title: 'Dần Hổ · Sơn Quân Khiếu Phong',
    hanzi: '寅虎 · 猛虎嘯風',
    subtitle: 'Chúa Tể Sơn Lâm · Uy Vũ Cương Nghị · Trấn Nhiếp Quần Tà',
    mantra: 'Mãnh Hổ Hạ Sơn, Chính Khí Lẫm Liệt, Vạn Tà Quy Phục!',
    meaning: 'Linh thú cung Dần mang dương mộc chi khí mạnh mẽ, biểu trưng cho lòng dũng cảm, bản lĩnh tiên phong và uy quyền dẫn dắt.',
    element: 'Mộc',
    accentColor: 'amber',
    centerGlyph: '寅',
    zodiacConfig: {
      branchHanzi: '寅虎',
      branchVi: 'Giờ Dần (03h - 05h) · Phương Đông Bắc',
      guardianIcon: '🐅',
      auspiciousHours: 'Tam Hợp: Dần - Ngọ - Tuất · Lục Hợp: Hợi',
    },
  },
  {
    id: 'zodiac-thien-ma-ngo',
    category: 'zodiac',
    categoryLabel: 'Thập Nhị Địa Chi Linh Thú',
    title: 'Ngọ Mã · Thiên Mã Hành Không',
    hanzi: '午馬 · 天馬行空',
    subtitle: 'Mã Đáo Thành Công · Vạn Lý Bằng Trình · Nhiệt Huyết Rực Cháy',
    mantra: 'Thiên Mã Phi Tuyệt, Nhật Hành Thiên Lý, Công Thành Danh Toại!',
    meaning: 'Sao Thiên Mã gặp cung Ngọ chính dương hỏa, chủ về sự dịch chuyển hanh thông, xuất hành thuận lợi và tài lộc phương xa.',
    element: 'Hỏa',
    accentColor: 'crimson',
    centerGlyph: '午',
    zodiacConfig: {
      branchHanzi: '午馬',
      branchVi: 'Giờ Ngọ (11h - 13h) · Chính Nam Ly Hỏa',
      guardianIcon: '🐎',
      auspiciousHours: 'Tam Hợp: Dần - Ngọ - Tuất · Lục Hợp: Mùi',
    },
  },
  {
    id: 'zodiac-linh-xa-ti',
    category: 'zodiac',
    categoryLabel: 'Thập Nhị Địa Chi Linh Thú',
    title: 'Tị Xà · Linh Xà Thổ Minh Châu',
    hanzi: '巳蛇 · 靈蛇吐珠',
    subtitle: 'Trí Tuệ Thâm Sâu · Huyền Cơ Nội Ẩn · Tĩnh Tại Sinh Tài',
    mantra: 'Linh Xà Hàm Châu, Thấu Thị Huyền Cơ, Chuyển Hóa Khôn Lường!',
    meaning: 'Linh Xà đại diện cho sự nhạy bén tâm linh, trực giác sắc sảo và khả năng lột xác tái sinh mạnh mẽ sau mỗi thử thách.',
    element: 'Hỏa',
    accentColor: 'emerald',
    centerGlyph: '巳',
    zodiacConfig: {
      branchHanzi: '巳蛇',
      branchVi: 'Giờ Tị (09h - 11h) · Phương Đông Nam',
      guardianIcon: '🐍',
      auspiciousHours: 'Tam Hợp: Tị - Dậu - Sửu · Lục Hợp: Thân',
    },
  },
  {
    id: 'zodiac-ngoc-tho-mao',
    category: 'zodiac',
    categoryLabel: 'Thập Nhị Địa Chi Linh Thú',
    title: 'Mão Thố · Ngọc Thố Vọng Nguyệt',
    hanzi: '卯兔 · 玉兔望月',
    subtitle: 'Cát Tường Nhân Hậu · Linh Động Tinh Anh · Quý Nhân Phù Trợ',
    mantra: 'Ngọc Thố Cung Quảng Hàn, Nguyệt Hoa Tỏa Chiếu, An Hòa Phúc Lộc!',
    meaning: 'Linh thú cung Mão thuộc Chấn Mộc chính Đông, mang nguồn năng lượng mùa xuân ôn hòa, nhân duyên tốt đẹp và tâm hồn thanh cao.',
    element: 'Mộc',
    accentColor: 'cyan',
    centerGlyph: '卯',
    zodiacConfig: {
      branchHanzi: '卯兔',
      branchVi: 'Giờ Mão (05h - 07h) · Chính Đông Chấn Mộc',
      guardianIcon: '🐇',
      auspiciousHours: 'Tam Hợp: Hợi - Mão - Mùi · Lục Hợp: Tuất',
    },
  },
  {
    id: 'zodiac-kim-ke-dau',
    category: 'zodiac',
    categoryLabel: 'Thập Nhị Địa Chi Linh Thú',
    title: 'Dậu Kê · Kim Kê Báo Hiểu',
    hanzi: '酉雞 · 金雞報曉',
    subtitle: 'Đánh Thức Bình Minh · Phá Tan Ám Khí · Tinh Cần Minh Bạch',
    mantra: 'Kim Kê Nhất Tiếng Thiên Hạ Bạch, Dương Khí Khởi Sinh Vạn Sự Thành!',
    meaning: 'Tiếng gáy Kim Kê xóa tan bóng tối tà mị, gọi mặt trời mọc, biểu trưng cho sự thức tỉnh, minh bạch và thời vận đổi mới.',
    element: 'Kim',
    accentColor: 'gold',
    centerGlyph: '酉',
    zodiacConfig: {
      branchHanzi: '酉雞',
      branchVi: 'Giờ Dậu (17h - 19h) · Chính Tây Đoài Kim',
      guardianIcon: '🐓',
      auspiciousHours: 'Tam Hợp: Tị - Dậu - Sửu · Lục Hợp: Thìn',
    },
  },
  {
    id: 'zodiac-thap-nhi-dia-chi-luan',
    category: 'zodiac',
    categoryLabel: 'Thập Nhị Địa Chi Linh Thú',
    title: 'Thập Nhị Địa Chi · Thiên Tuế Pháp Luân',
    hanzi: '十二地支天歲法輪',
    subtitle: 'Tý · Sửu · Dần · Mão · Thìn · Tị · Ngọ · Mùi · Thân · Dậu · Tuất · Hợi',
    mantra: 'Thập Nhị Thần Tướng, Luân Chuyển Tứ Thời, Hộ Trì Mệnh Chủ!',
    meaning: 'Vòng tròn 12 Địa Chi kết hợp 10 Thiên Can tạo thành 60 Hoa Giáp, ghi khắc toàn bộ nhịp đập thời gian của vũ trụ và nhân sinh.',
    element: 'Thái Cực',
    accentColor: 'violet',
    centerGlyph: '歲',
    zodiacConfig: {
      branchHanzi: '十二辰',
      branchVi: 'Chu Kỳ 12 Canh Giờ · 12 Tháng · 60 Năm Hoa Giáp',
      guardianIcon: '🧭',
      auspiciousHours: 'Lục Hợp & Tam Hợp Chu Thiên Đồng Chiếu',
    },
  },

  // ============================================================================
  // 4. NHÓM BÁT QUÁI & THÁI CỰC TRẬN ĐỒ (5 BIẾN THỂ)
  // ============================================================================
  {
    id: 'bagua-tien-thien-phuc-hy',
    category: 'bagua',
    categoryLabel: 'Bát Quái Pháp Trận',
    title: 'Tiên Thiên Bát Quái · Phục Hy Thái Cực Đồ',
    hanzi: '伏羲先天八卦太極圖',
    subtitle: 'Càn Nam Khôn Bắc · Ly Đông Khảm Tây · Thiên Địa Định Vị',
    mantra: 'Thiên Địa Định Vị, Sơn Trạch Thông Khí, Lôi Phong Tương Bạc, Thủy Hỏa Bất Tương Xạ!',
    meaning: 'Tiên Thiên Bát Quái do vua Phục Hy lập ra, phản ánh quy luật bản nguyên của vũ trụ khi vạn vật ở trạng thái cân bằng đối xứng hoàn hảo.',
    element: 'Thái Cực',
    accentColor: 'gold',
    centerGlyph: '☯',
    baguaConfig: {
      orderType: 'tien_thien',
      highlightTrigrams: ['☰', '☷', '☲', '☵'],
    },
  },
  {
    id: 'bagua-hau-thien-van-vuong',
    category: 'bagua',
    categoryLabel: 'Bát Quái Pháp Trận',
    title: 'Hậu Thiên Bát Quái · Văn Vương Cửu Cung',
    hanzi: '文王後天八卦九宮陣',
    subtitle: 'Ly Nam Khảm Bắc · Chấn Đông Đoài Tây · Vạn Vật Sinh Hóa',
    mantra: 'Đái Cửu Lý Nhất, Tả Tam Hữu Thất, Nhị Tứ Vi Kiên, Lục Bát Vi Túc!',
    meaning: 'Hậu Thiên Bát Quái kết hợp Lạc Thư Cửu Cung mô tả sự vận động biến hóa không ngừng của ngũ hành và thời vận trong cõi nhân gian.',
    element: 'Thổ',
    accentColor: 'amber',
    centerGlyph: '卦',
    baguaConfig: {
      orderType: 'hau_thien',
      highlightTrigrams: ['☲', '☵', '☳', '☱'],
    },
  },
  {
    id: 'bagua-luc-thap-tu-quai',
    category: 'bagua',
    categoryLabel: 'Bát Quái Pháp Trận',
    title: 'Chu Dịch Lục Thập Tứ Quái Pháp Luân',
    hanzi: '周易六十四卦天機輪',
    subtitle: 'Càn Khôn Khởi Đầu · Ký Tế Vị Tế Luân Hồi Bất Tận',
    mantra: 'Cùng Tắc Biến, Biến Tắc Thông, Thông Tắc Cửu, Tự Thiên Hựu Chi Cát Vô Bất Lợi!',
    meaning: '64 quẻ Kinh Dịch với 384 hào phản ánh trọn vẹn mọi cảnh huống thành bại, đắc thất, nhắc nhở con người thuận thiên hành đạo.',
    element: 'Kim',
    accentColor: 'cyan',
    centerGlyph: '易',
    baguaConfig: {
      orderType: 'luc_thap_tu',
      highlightTrigrams: ['☰', '☳', '☴', '☶'],
    },
  },
  {
    id: 'bagua-thai-cuc-luong-nghi',
    category: 'bagua',
    categoryLabel: 'Bát Quái Pháp Trận',
    title: 'Vô Cực Sinh Thái Cực · Lưỡng Nghi Giao Hòa',
    hanzi: '無極生太極兩儀圖',
    subtitle: 'Trong Âm Có Dương · Trong Dương Có Âm · Động Tĩnh Tương Sinh',
    mantra: 'Nhất Âm Nhất Dương Chi Vị Đạo, Vạn Vật Phụ Âm Nhi Báo Dương!',
    meaning: 'Không có phúc nào tuyệt đối, không có họa nào vĩnh cửu. Hiểu đạo Âm Dương chuyển hóa giúp tâm bất động giữa dòng đời vạn biến.',
    element: 'Thái Cực',
    accentColor: 'violet',
    centerGlyph: '☯',
    baguaConfig: {
      orderType: 'luong_nghi',
      highlightTrigrams: ['☰', '☷'],
    },
  },
  {
    id: 'bagua-cuu-cung-phi-tinh',
    category: 'bagua',
    categoryLabel: 'Bát Quái Pháp Trận',
    title: 'Huyền Không Cửu Tinh Lạc Thư Trận',
    hanzi: '玄空九星洛書法陣',
    subtitle: 'Nhất Bạch · Nhị Hắc · Tam Bích · Tứ Lục · Ngũ Hoàng · Lục Bạch · Thất Xích · Bát Bạch · Cửu Tử',
    mantra: 'Cửu Tinh Phi Phục, Thuận Nghịch Tuần Hành, Đón Cát Tránh Hung!',
    meaning: 'Chín ngôi sao Lạc Thư bay lượn qua 9 cung vị theo nguyên vận, chỉ dẫn phương vị cát tường và thời cơ hành động chuẩn xác.',
    element: 'Hỏa',
    accentColor: 'crimson',
    centerGlyph: '九',
    baguaConfig: {
      orderType: 'hau_thien',
      highlightTrigrams: ['☴', '☲', '☷', '☶'],
    },
  },

  // ============================================================================
  // 5. NHÓM TỨ LINH THẦN THÚ & ẤN TRIỆN CỔ (4 BIẾN THỂ)
  // ============================================================================
  {
    id: 'beast-chu-tuoc-phuong-hoang',
    category: 'sacred_beast',
    categoryLabel: 'Tứ Linh & Bảo Ấn',
    title: 'Nam Phương Chu Tước · Phượng Hoàng Niết Bàn',
    hanzi: '南方朱雀浴火鳳凰',
    subtitle: 'Ly Hỏa Quang Minh · Vượt Qua Lửa Đỏ · Tái Sinh Rực Rỡ',
    mantra: 'Chu Tước Triển Dực, Hỏa Phượng Tường Thiên, Quang Chiếu Vạn Phương!',
    meaning: 'Thần điểu Chu Tước trấn giữ phương Nam, mang ngọn lửa trí tuệ và nghị lực phi thường, giúp tái sinh mạnh mẽ hơn sau mọi nghịch cảnh.',
    element: 'Hỏa',
    accentColor: 'crimson',
    centerGlyph: '雀',
  },
  {
    id: 'beast-huyen-vu-bac-minh',
    category: 'sacred_beast',
    categoryLabel: 'Tứ Linh & Bảo Ấn',
    title: 'Bắc Phương Huyền Vũ · Quy Xà Hợp Thể',
    hanzi: '北方玄武鎮守北冥',
    subtitle: 'Khảm Thủy Thâm Trầm · Vững Chãi Như Núi · Phúc Thọ Trường Tồn',
    mantra: 'Huyền Vũ Trấn Bắc, Quy Xà Tương Giao, Bất Động Như Sơn!',
    meaning: 'Thần thú Huyền Vũ trấn giữ phương Bắc, tượng trưng cho hậu thuẫn vững chắc, sự điềm tĩnh sâu sắc và sức chịu đựng bền bỉ.',
    element: 'Thủy',
    accentColor: 'cyan',
    centerGlyph: '玄',
  },
  {
    id: 'beast-thanh-long-dong-hai',
    category: 'sacred_beast',
    categoryLabel: 'Tứ Linh & Bảo Ấn',
    title: 'Đông Phương Thanh Long · Vân Long Khởi Vận',
    hanzi: '東方青龍蒼穹騰飛',
    subtitle: 'Chấn Mộc Sinh Phát · Khí Thế Vươn Cao · Quý Nhân Đỡ Đầu',
    mantra: 'Thanh Long Xuất Hải, Xuân Khí Đầy Trời, Vạn Mộc Sinh Hoa!',
    meaning: 'Thanh Long trấn giữ phương Đông, đại diện cho sinh khí mùa xuân, sự thăng tiến công danh và quý nhân tương trợ đúng lúc.',
    element: 'Mộc',
    accentColor: 'emerald',
    centerGlyph: '龍',
  },
  {
    id: 'beast-cuu-thien-ngoc-an',
    category: 'sacred_beast',
    categoryLabel: 'Tứ Linh & Bảo Ấn',
    title: 'Cửu Thiên Huyền Nữ · Linh Bảo Ngọc Ấn',
    hanzi: '九天玄女靈寶玉印',
    subtitle: 'Thiên Địa Chứng Giám · Phép Tắc Huyền Môn · Tịnh Hóa Không Gian',
    mantra: 'Cửu Thiên Huyền Nữ, Thụ Mệnh Thiên Đình, Ấn Đóng Càn Khôn Định!',
    meaning: 'Bảo ấn cổ truyền của Cửu Thiên Huyền Nữ, biểu tượng cho sự chính trực, trí tuệ huyền học tối cao và lời chúc phúc lành.',
    element: 'Kim',
    accentColor: 'gold',
    centerGlyph: '印',
  },

  // ============================================================================
  // 6. NHÓM NGŨ HÀNH TƯƠNG SINH & HÀ ĐỒ LIÊN HOA (3 BIẾN THỂ)
  // ============================================================================
  {
    id: 'elements-ngu-hanh-tuong-sinh',
    category: 'five_elements',
    categoryLabel: 'Ngũ Hành Pháp Trận',
    title: 'Ngũ Hành Tương Sinh · Chu Thiên Pháp Trận',
    hanzi: '五行相生周天法陣',
    subtitle: 'Kim Sinh Thủy · Thủy Sinh Mộc · Mộc Sinh Hỏa · Hỏa Sinh Thổ · Thổ Sinh Kim',
    mantra: 'Ngũ Khí Triều Nguyên, Tương Sinh Tương Tế, Vạn Sự Viên Dung!',
    meaning: 'Khi năm nguồn năng lượng Kim - Mộc - Thủy - Hỏa - Thổ lưu thông hài hòa, mọi nút thắt trong cuộc sống đều tự nhiên được tháo gỡ.',
    element: 'Thái Cực',
    accentColor: 'gold',
    centerGlyph: '行',
  },
  {
    id: 'elements-ha-do-thien-dia',
    category: 'five_elements',
    categoryLabel: 'Ngũ Hành Pháp Trận',
    title: 'Hà Đồ Thiên Địa Sinh Thành Đồ',
    hanzi: '河圖天地生成數陣',
    subtitle: 'Thiên Nhất Sinh Thủy · Địa Nhị Sinh Hỏa · Thiên Tam Sinh Mộc · Địa Tứ Sinh Kim',
    mantra: 'Long Mã Xuất Hà, Thiên Địa Hợp Số, Khai Mở Trí Tuệ Cổ Nhân!',
    meaning: 'Bức đồ hình huyền thoại trên lưng Long Mã nổi lên từ sông Hoàng Hà, cội nguồn của toàn bộ nền tảng Lý Số, Tử Vi và Phong Thủy Đông Phương.',
    element: 'Thủy',
    accentColor: 'cyan',
    centerGlyph: '圖',
  },
  {
    id: 'elements-lien-hoa-mandala',
    category: 'five_elements',
    categoryLabel: 'Ngũ Hành Pháp Trận',
    title: 'Kim Liên Hoa Bát Nhã · Tịnh Tâm Pháp Luân',
    hanzi: '金蓮花般若靜心輪',
    subtitle: 'Tâm Tịnh Tắc Quốc Độ Tịnh · Trí Sáng Thấu Suốt Nhân Quả',
    mantra: 'Hoa Sen Nở Giữa Biển Tâm, Thanh Tịnh Tự Tại, Phước Huệ Song Tu!',
    meaning: 'Đóa sen vàng 12 cánh nở rộ nhắc nhở rằng: mệnh số dù có thăng trầm, người giữ được tâm thiện lành và định tĩnh sẽ luôn tự tại bình an.',
    element: 'Mộc',
    accentColor: 'amber',
    centerGlyph: '蓮',
  },
];

/**
 * Xáo trộn mảng theo thuật toán Fisher-Yates kết hợp tối ưu tránh lặp category liên tiếp
 * và đảm bảo phần tử đầu tiên của chu kỳ mới không bao giờ trùng phần tử cuối của chu kỳ trước.
 */
function buildShuffledQueue(
  items: SpiritualManifestation[],
  lastPickedId: string | null,
  lastPickedCategory: SpiritualCategory | null
): SpiritualManifestation[] {
  // 1. Sao chép và Fisher-Yates shuffle cơ bản
  const pool = [...items];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // 2. Sắp xếp lại theo kiểu greedy interleave để hạn chế tối đa 2 lần liên tiếp cùng category
  //    và tuyệt đối không trùng ID với lastPickedId ở vị trí đầu tiên
  const result: SpiritualManifestation[] = [];
  let prevId = lastPickedId;
  let prevCat = lastPickedCategory;

  while (pool.length > 0) {
    // Tìm ứng viên khác ID và khác category với phần tử ngay trước
    let candidateIdx = pool.findIndex(
      item => item.id !== prevId && item.category !== prevCat
    );

    // Nếu không còn category khác, tìm ứng viên khác ID
    if (candidateIdx === -1) {
      candidateIdx = pool.findIndex(item => item.id !== prevId);
    }

    // Fallback an toàn
    if (candidateIdx === -1) {
      candidateIdx = 0;
    }

    const [picked] = pool.splice(candidateIdx, 1);
    result.push(picked);
    prevId = picked.id;
    prevCat = picked.category;
  }

  return result;
}

export interface SpiritualManifestationDeck {
  /** Rút linh tượng tiếp theo (đảm bảo không trùng lặp trong suốt chu kỳ 30 linh tượng) */
  next: () => SpiritualManifestation;
  /** Xem số lượng linh tượng còn lại trong chu kỳ hiện tại trước khi xáo mới */
  remainingInCycle: () => number;
  /** Tổng số linh tượng trong kho */
  totalCount: number;
}

/**
 * Khởi tạo bộ bài Shuffle Bag không trùng lặp cho hệ thống hiển linh
 */
export function createSpiritualManifestationDeck(): SpiritualManifestationDeck {
  let lastId: string | null = null;
  let lastCategory: SpiritualCategory | null = null;
  let queue: SpiritualManifestation[] = buildShuffledQueue(
    SPIRITUAL_MANIFESTATIONS,
    lastId,
    lastCategory
  );

  return {
    totalCount: SPIRITUAL_MANIFESTATIONS.length,
    remainingInCycle: () => queue.length,
    next: () => {
      if (queue.length === 0) {
        queue = buildShuffledQueue(SPIRITUAL_MANIFESTATIONS, lastId, lastCategory);
      }
      const item = queue.shift()!;
      lastId = item.id;
      lastCategory = item.category;
      return item;
    },
  };
}

