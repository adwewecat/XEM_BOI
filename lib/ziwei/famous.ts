/**
 * KHO TƯ LIỆU LÁ SỐ DANH NHÂN (名人命盘数据库)
 * Tuyển tập lá số các bậc danh nhân nổi tiếng thế giới và phương Đông,
 * phục vụ nghiên cứu và chiêm nghiệm học thuật Tử Vi Đẩu Số.
 */

export interface FamousPerson {
  id: string;
  name: string;
  nameEn: string;
  category: 'Thương Nghiệp' | 'Văn Nghệ' | 'Công Nghệ' | 'Thể Thao' | 'Lịch Sử' | '商业' | '文艺' | '历史' | '体育' | '科技';
  description: string;           // Giới thiệu danh phận một câu
  descriptionEn: string;
  year: number;
  month: number;
  day: number;
  hour: number;                  // Chỉ số địa chi giờ sinh 0-11
  gender: 'male' | 'female';
  notable: string;               // Điểm sáng cách cục nổi bật
  notableEn: string;
}

export const FAMOUS_PERSONS: FamousPerson[] = [
  // ─── THƯƠNG NGHIỆP TRUYỀN KỲ ──────────────────────────────────
  {
    id: 'ma-yun',
    name: 'Mã Vân (Jack Ma)',
    nameEn: 'Jack Ma',
    category: 'Thương Nghiệp',
    description: 'Nhà sáng lập Tập đoàn thương mại điện tử Alibaba',
    descriptionEn: 'Founder of Alibaba',
    year: 1964, month: 9, day: 10, hour: 5,  // Giờ Tỵ (巳时)
    gender: 'male',
    notable: 'Mệnh bàn thể hiện năng lực phá cách tái thiết phi thường, các sao cung Quan Lộc tương ứng chuẩn xác với đế chế thương mại Internet.',
    notableEn: 'The chart shows an exceptional ability to break established patterns and rebuild, while the Career Palace closely parallels the rise of an internet business empire.',
  },
  {
    id: 'li-jiacheng',
    name: 'Lý Gia Thành (Li Ka-shing)',
    nameEn: 'Li Ka-shing',
    category: 'Thương Nghiệp',
    description: 'Tỷ phú Hồng Kông, người sáng lập Tập đoàn Trường Giang Hòa Ký',
    descriptionEn: 'Hong Kong billionaire and founder of the CK Hutchison business empire',
    year: 1928, month: 7, day: 29, hour: 3,  // Giờ Mão (卯时)
    gender: 'male',
    notable: 'Cung Tài Bạch Tứ Hóa là trường hợp mẫu mực nghiên cứu mệnh đại phú phương Đông; Lộc Tồn trấn thủ, càng tích lũy càng dày.',
    notableEn: 'The Four Transformations in the Wealth Palace make this a compelling case study of extraordinary wealth; Lu Cun preserves assets and supports steady accumulation.',
  },
  {
    id: 'ren-zhengfei',
    name: 'Nhậm Chính Phi (Ren Zhengfei)',
    nameEn: 'Ren Zhengfei',
    category: 'Thương Nghiệp',
    description: 'Nhà sáng lập Tập đoàn viễn thông toàn cầu Huawei',
    descriptionEn: 'Founder of Huawei',
    year: 1944, month: 10, day: 25, hour: 3, // Giờ Mão (卯时)
    gender: 'male',
    notable: 'Cách cục Thất Sát nhập Mệnh kiên cường, cả đời nghịch phong mà tiến, càng bị chèn ép càng bộc lộ sức mạnh quật cường.',
    notableEn: 'Qi Sha in the Life Palace points to a life strengthened by adversity—the greater the pressure, the stronger the response—making this a vivid case study of traditional Qi Sha theory.',
  },

  // ─── VĂN NGHỆ & DANH NHÂN ─────────────────────────────────────
  {
    id: 'zhang-ailing',
    name: 'Trương Ái Linh (Eileen Chang)',
    nameEn: 'Eileen Chang',
    category: 'Văn Nghệ',
    description: 'Đại văn hào văn học hiện đại kinh điển',
    descriptionEn: 'A master of modern Chinese literature',
    year: 1920, month: 9, day: 30, hour: 1, // Giờ Sửu (丑时)
    gender: 'female',
    notable: 'Tổ hợp tinh diệu cô độc tại Mệnh Cung đối chiếu kỳ lạ với đường tình duyên trắc trở cùng di sản văn chương bất hủ.',
    notableEn: 'The chart’s combination of solitary stars forms a striking parallel with her celebrated romantic history and literary achievements.',
  },
  {
    id: 'jay-chou',
    name: 'Châu Kiệt Luân (Jay Chou)',
    nameEn: 'Jay Chou',
    category: 'Văn Nghệ',
    description: 'Thiên vương âm nhạc Pop châu Á, biểu tượng văn hóa',
    descriptionEn: 'Mandopop singer-songwriter and cultural icon',
    year: 1979, month: 1, day: 18, hour: 1,  // Giờ Sửu (丑时)
    gender: 'male',
    notable: 'Sự kết hợp giữa Văn Khúc và Tham Lang, mệnh bẩm sinh nghệ thuật tài hoa, giải thích vì sao anh thâu tóm xuất sắc mọi phong cách âm nhạc.',
    notableEn: 'The combination of Wen Qu and Tan Lang suggests natural artistic talent and helps explain his ability to move across musical styles.',
  },
  {
    id: 'wang-fei',
    name: 'Vương Phi (Faye Wong)',
    nameEn: 'Faye Wong',
    category: 'Văn Nghệ',
    description: 'Huyền thoại Diva thanh sắc hàng đầu làng nhạc',
    descriptionEn: 'One of the most iconic singers in Chinese pop',
    year: 1969, month: 8, day: 8, hour: 4,   // Giờ Thìn (辰时)
    gender: 'female',
    notable: 'Tinh diệu cung Phu Thê ứng nghiệm mật thiết với đường tình duyên ly kỳ, cách cục mang giá trị chiêm nghiệm học thuật sâu sắc.',
    notableEn: 'The stars in the Marriage Palace closely parallel her two high-profile marriages, making the relationship pattern especially valuable for study.',
  },
  {
    id: 'lin-zhiling',
    name: 'Lâm Chí Linh (Lin Chi-ling)',
    nameEn: 'Lin Chi-ling',
    category: 'Văn Nghệ',
    description: 'Siêu mẫu hàng đầu, nữ diễn viên danh tiếng',
    descriptionEn: 'Taiwanese model and actress',
    year: 1974, month: 11, day: 29, hour: 5, // Giờ Tỵ (巳时)
    gender: 'female',
    notable: 'Điển hình Thái Âm thủ Mệnh dung mạo thanh tú ôn nhu, ứng chuẩn luận điểm "Thái Âm nhập Mệnh khuê tú giai nhân" của thầy Nghê Hải Hà.',
    notableEn: 'Tai Yin guarding the Life Palace is a classic symbol of feminine grace, closely echoing the traditional view that this placement bestows exceptional beauty.',
  },

  // ─── CÔNG NGHỆ ĐỘT PHÁ ─────────────────────────────────────────
  {
    id: 'steve-jobs',
    name: 'Steve Jobs (Apple)',
    nameEn: 'Steve Jobs',
    category: 'Công Nghệ',
    description: 'Đồng sáng lập Tập đoàn Apple, người định hình công nghệ tương lai',
    descriptionEn: 'Co-founder of Apple',
    year: 1955, month: 2, day: 24, hour: 6,  // Giờ Ngọ (午时)
    gender: 'male',
    notable: 'Cách cục Phá Quân nhập Mệnh, bị gia đình từ bỏ rồi một tay kiến tạo đế chế Apple, hình mẫu kinh điển "phá bỏ để tái lập đỉnh cao".',
    notableEn: 'Po Jun in the Life Palace, adoption at birth, and the creation of the Apple empire make this an archetypal chart of renewal after disruption.',
  },
  {
    id: 'elon-musk',
    name: 'Elon Musk (Tesla & SpaceX)',
    nameEn: 'Elon Musk',
    category: 'Công Nghệ',
    description: 'Nhà sáng lập SpaceX, CEO Tesla, người chinh phục sao Hỏa',
    descriptionEn: 'Founder of SpaceX and CEO of Tesla',
    year: 1971, month: 6, day: 28, hour: 4,  // Giờ Thìn (辰时)
    gender: 'male',
    notable: 'Hiện thân cực độ của cách cục Sát Phá Tham kết hợp Dịch Mã vượng thịnh, cả đời dấn thân mở rộng biên giới tương lai nhân loại.',
    notableEn: 'An intense expression of the Sha Po Lang pattern, with a powerful Travel Horse star and a life devoted to pushing the boundaries of humanity’s future.',
  },

  // ─── THỂ THAO ĐỈNH CAO ─────────────────────────────────────────
  {
    id: 'yao-ming',
    name: 'Diêu Minh (Yao Ming)',
    nameEn: 'Yao Ming',
    category: 'Thể Thao',
    description: 'Huyền thoại trung phong NBA, Đại sứ bóng rổ châu Á',
    descriptionEn: 'Legendary NBA center and ambassador for Chinese basketball',
    year: 1980, month: 9, day: 12, hour: 5,  // Giờ Tỵ (巳时)
    gender: 'male',
    notable: 'Thiên Lương thủ Mệnh cao lớn uy nghi đĩnh đạc, tinh tượng cung Quan Lộc tương ứng hoàn hảo với thành tựu thể thao quốc tế.',
    notableEn: 'Tian Liang guarding the Life Palace suggests stature and dignity, while the Career Palace closely aligns with his professional achievements.',
  },
  {
    id: 'li-na',
    name: 'Lý Na (Li Na)',
    nameEn: 'Li Na',
    category: 'Thể Thao',
    description: 'Nhà vô địch Grand Slam quần vợt châu Á đầu tiên',
    descriptionEn: 'Chinese Grand Slam tennis champion',
    year: 1982, month: 2, day: 26, hour: 2,  // Giờ Dần (寅时)
    gender: 'female',
    notable: 'Thất Sát hóa khí cương liệt, số mệnh định sẵn tinh thần tranh đấu quyết liệt; đại hạn lưu niên khớp chuẩn xác với thời khắc đăng quang Roland Garros.',
    notableEn: 'Qi Sha channels a powerful competitive drive, while the major periods and annual cycles closely align with the timing of her French Open victory.',
  },
];

/** Lấy danh nhân theo phân loại */
export function getFamousByCategory(category: FamousPerson['category']): FamousPerson[] {
  return FAMOUS_PERSONS.filter(p => p.category === category);
}

/** Danh sách tất cả phân loại */
export const FAMOUS_CATEGORIES: FamousPerson['category'][] = [
  'Thương Nghiệp', 'Văn Nghệ', 'Công Nghệ', 'Thể Thao',
];
