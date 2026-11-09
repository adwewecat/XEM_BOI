/**
 * ============================================================================
 * TỪ ĐIỂN VÀ CHUYỂN NGỮ HÁN VIỆT TỬ VI ĐẨU SỐ (紫微斗数汉越对照词典)
 * Phục vụ hiển thị song ngữ chuẩn xác:
 * - Tiếng Việt là ngôn ngữ chính (to rõ, chuẩn thuật ngữ mệnh lý Tử Vi).
 * - Chữ Hán phụ đề nhỏ bên dưới để đối chiếu nguyên bản cổ tịch.
 * ============================================================================
 */

// ─── 1. THẬP NHỊ CUNG (12 CUNG VỊ) ──────────────────────────────────────────
export const PALACE_VI: Record<string, { vi: string; zh: string; short: string }> = {
  '命宫': { vi: 'Mệnh Cung', zh: '命宫', short: 'Mệnh' },
  '命':   { vi: 'Mệnh Cung', zh: '命', short: 'Mệnh' },
  '兄弟': { vi: 'Huynh Đệ', zh: '兄弟', short: 'Huynh' },
  '兄弟宫': { vi: 'Huynh Đệ', zh: '兄弟宫', short: 'Huynh' },
  '夫妻': { vi: 'Phu Thê', zh: '夫妻', short: 'Thê' },
  '夫妻宫': { vi: 'Phu Thê', zh: '夫妻宫', short: 'Thê' },
  '子女': { vi: 'Tử Tức', zh: '子女', short: 'Tử' },
  '子女宫': { vi: 'Tử Tức', zh: '子女宫', short: 'Tử' },
  '财帛': { vi: 'Tài Bạch', zh: '财帛', short: 'Tài' },
  '财帛宫': { vi: 'Tài Bạch', zh: '财帛宫', short: 'Tài' },
  '疾厄': { vi: 'Tật Ách', zh: '疾厄', short: 'Tật' },
  '疾厄宫': { vi: 'Tật Ách', zh: '疾厄宫', short: 'Tật' },
  '迁移': { vi: 'Thiên Di', zh: '迁移', short: 'Di' },
  '迁移宫': { vi: 'Thiên Di', zh: '迁移宫', short: 'Di' },
  '仆役': { vi: 'Nô Bộc', zh: '仆役', short: 'Nô' },
  '仆役宫': { vi: 'Nô Bộc', zh: '仆役宫', short: 'Nô' },
  '交友': { vi: 'Nô Bộc', zh: '交友', short: 'Nô' },
  '交友宫': { vi: 'Nô Bộc', zh: '交友宫', short: 'Nô' },
  '官禄': { vi: 'Quan Lộc', zh: '官禄', short: 'Quan' },
  '官禄宫': { vi: 'Quan Lộc', zh: '官禄', short: 'Quan' },
  '田宅': { vi: 'Điền Trạch', zh: '田宅', short: 'Điền' },
  '田宅宫': { vi: 'Điền Trạch', zh: '田宅宫', short: 'Điền' },
  '福德': { vi: 'Phúc Đức', zh: '福德', short: 'Phúc' },
  '福德宫': { vi: 'Phúc Đức', zh: '福德宫', short: 'Phúc' },
  '父母': { vi: 'Phụ Mẫu', zh: '父母', short: 'Phụ' },
  '父母宫': { vi: 'Phụ Mẫu', zh: '父母宫', short: 'Phụ' },
  '身宫': { vi: 'Thân Cung', zh: '身宫', short: 'Thân' },
  '身':   { vi: 'Thân Cung', zh: '身', short: 'Thân' },
};

// ─── 2. THẬP TỨ CHÍNH TINH (14 SAO CHÍNH) ──────────────────────────────────
export const MAJOR_STARS_VI: Record<string, { vi: string; zh: string }> = {
  '紫微': { vi: 'Tử Vi', zh: '紫微' },
  '天机': { vi: 'Thiên Cơ', zh: '天机' },
  '太阳': { vi: 'Thái Dương', zh: '太阳' },
  '武曲': { vi: 'Vũ Khúc', zh: '武曲' },
  '天同': { vi: 'Thiên Đồng', zh: '天同' },
  '廉贞': { vi: 'Liêm Trinh', zh: '廉贞' },
  '天府': { vi: 'Thiên Phủ', zh: '天府' },
  '太阴': { vi: 'Thái Âm', zh: '太阴' },
  '贪狼': { vi: 'Tham Lang', zh: '贪狼' },
  '巨门': { vi: 'Cự Môn', zh: '巨门' },
  '天相': { vi: 'Thiên Tướng', zh: '天相' },
  '天梁': { vi: 'Thiên Lương', zh: '天梁' },
  '七杀': { vi: 'Thất Sát', zh: '七杀' },
  '破军': { vi: 'Phá Quân', zh: '破军' },
};

// ─── 3. PHỤ TINH, LỤC CÁT, LỤC SÁT, TẠP DIỆU ────────────────────────────────
export const MINOR_STARS_VI: Record<string, { vi: string; zh: string }> = {
  '左辅': { vi: 'Tả Phụ', zh: '左辅' },
  '右弼': { vi: 'Hữu Bật', zh: '右弼' },
  '文昌': { vi: 'Văn Xương', zh: '文昌' },
  '文曲': { vi: 'Văn Khúc', zh: '文曲' },
  '天魁': { vi: 'Thiên Khôi', zh: '天魁' },
  '天钺': { vi: 'Thiên Việt', zh: '天钺' },
  '禄存': { vi: 'Lộc Tồn', zh: '禄存' },
  '天马': { vi: 'Thiên Mã', zh: '天马' },
  '擎羊': { vi: 'Kình Dương', zh: '擎羊' },
  '陀罗': { vi: 'Đà La', zh: '陀罗' },
  '火星': { vi: 'Hỏa Tinh', zh: '火星' },
  '铃星': { vi: 'Linh Tinh', zh: '铃星' },
  '地空': { vi: 'Địa Không', zh: '地空' },
  '地劫': { vi: 'Địa Kiếp', zh: '地劫' },
  '红鸾': { vi: 'Hồng Loan', zh: '红鸾' },
  '天喜': { vi: 'Thiên Hỷ', zh: '天喜' },
  '天刑': { vi: 'Thiên Hình', zh: '天刑' },
  '天姚': { vi: 'Thiên Diêu', zh: '天姚' },
  '天月': { vi: 'Thiên Nguyệt', zh: '天月' },
  '阴煞': { vi: 'Âm Sát', zh: '阴煞' },
  '三台': { vi: 'Tam Thai', zh: '三台' },
  '八座': { vi: 'Bát Tọa', zh: '八座' },
  '恩光': { vi: 'Ân Quang', zh: '恩光' },
  '天贵': { vi: 'Thiên Quý', zh: '天贵' },
  '龙池': { vi: 'Long Trì', zh: '龙池' },
  '凤阁': { vi: 'Phượng Các', zh: '凤阁' },
  '天才': { vi: 'Thiên Tài', zh: '天才' },
  '天寿': { vi: 'Thiên Thọ', zh: '天寿' },
  '截空': { vi: 'Triệt Không', zh: '截空' },
  '旬空': { vi: 'Tuần Không', zh: '旬空' },
  '天哭': { vi: 'Thiên Khốc', zh: '天哭' },
  '天虚': { vi: 'Thiên Hư', zh: '天虚' },
  '孤辰': { vi: 'Cô Thần', zh: '孤辰' },
  '寡宿': { vi: 'Quả Tú', zh: '寡宿' },
  '蜚廉': { vi: 'Phi Liêm', zh: '蜚廉' },
  '破碎': { vi: 'Phá Toái', zh: '破碎' },
  '华盖': { vi: 'Hoa Cái', zh: '华盖' },
  '咸池': { vi: 'Hàm Trì', zh: '咸池' },
  '德秀': { vi: 'Đức Tú', zh: '德秀' },
  '天官': { vi: 'Thiên Quan', zh: '天官' },
  '天福': { vi: 'Thiên Phúc', zh: '天福' },
  '解神': { vi: 'Giải Thần', zh: '解神' },
  '天巫': { vi: 'Thiên Vu', zh: '天巫' },
  '台辅': { vi: 'Đài Phụ', zh: '台辅' },
  '封诰': { vi: 'Phong Cáo', zh: '封诰' },
  '天厨': { vi: 'Thiên Trù', zh: '天厨' },
  '大耗': { vi: 'Đại Hao', zh: '大耗' },
  '小耗': { vi: 'Tiểu Hao', zh: '小耗' },
  '青龙': { vi: 'Thanh Long', zh: '青龙' },
  '白虎': { vi: 'Bạch Hổ', zh: '白虎' },
  '朱雀': { vi: 'Chu Tước', zh: '朱雀' },
  '玄武': { vi: 'Huyền Vũ', zh: '玄武' },
  '博士': { vi: 'Bác Sĩ', zh: '博士' },
  '力士': { vi: 'Lực Sĩ', zh: '力士' },
  '伏兵': { vi: 'Phục Binh', zh: '伏兵' },
  '官符': { vi: 'Quan Phù', zh: '官符' },
  '病符': { vi: 'Bệnh Phù', zh: '病符' },
  '喜神': { vi: 'Hỷ Thần', zh: '喜神' },
  '飞廉': { vi: 'Phi Liêm', zh: '飞廉' },
  '奏书': { vi: 'Tấu Thư', zh: '奏书' },
  '将军': { vi: 'Tướng Quân', zh: '将军' },
  '太岁': { vi: 'Thái Tuế', zh: '太岁' },
  '长生': { vi: 'Trường Sinh', zh: '长生' },
  '沐浴': { vi: 'Mộc Dục', zh: '沐浴' },
  '冠带': { vi: 'Quan Đới', zh: '冠带' },
  '临官': { vi: 'Lâm Quan', zh: '临官' },
  '帝旺': { vi: 'Đế Vượng', zh: '帝旺' },
  '衰':   { vi: 'Suy', zh: '衰' },
  '病':   { vi: 'Bệnh', zh: '病' },
  '死':   { vi: 'Tử', zh: '死' },
  '墓':   { vi: 'Mộ', zh: '墓' },
  '绝':   { vi: 'Tuyệt', zh: '绝' },
  '胎':   { vi: 'Thai', zh: '胎' },
  '养':   { vi: 'Dưỡng', zh: '养' },
};

// ─── 4. TỨ HÓA (LỘC - QUYỀN - KHOA - KỴ) ──────────────────────────────────
export const SIHUA_VI: Record<string, { vi: string; zh: string; short: string }> = {
  '禄':   { vi: 'Hóa Lộc', zh: '禄', short: 'Lộc' },
  '化禄': { vi: 'Hóa Lộc', zh: '化禄', short: 'Lộc' },
  '权':   { vi: 'Hóa Quyền', zh: '权', short: 'Quyền' },
  '化权': { vi: 'Hóa Quyền', zh: '化权', short: 'Quyền' },
  '科':   { vi: 'Hóa Khoa', zh: '科', short: 'Khoa' },
  '化科': { vi: 'Hóa Khoa', zh: '化科', short: 'Khoa' },
  '忌':   { vi: 'Hóa Kỵ', zh: '忌', short: 'Kỵ' },
  '化忌': { vi: 'Hóa Kỵ', zh: '化忌', short: 'Kỵ' },
};

// ─── 5. ĐỘ SÁNG MIẾU HÃM ───────────────────────────────────────────────────
export const BRIGHTNESS_VI: Record<string, string> = {
  '庙': 'Miếu',
  '旺': 'Vượng',
  '得': 'Đắc',
  '利': 'Lợi',
  '平': 'Bình',
  '不': 'Bất',
  '闲': 'Nhàn',
  '陷': 'Hãm',
  '地': 'Địa',
};

// ─── 6. THIÊN CAN & ĐỊA CHI ────────────────────────────────────────────────
export const STEMS_VI = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const BRANCHES_VI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

// ─── 7. CỤC SỐ (NGŨ HÀNH CỤC) ──────────────────────────────────────────────
export const JU_VI: Record<string, string> = {
  '水二局': 'Thủy Nhị Cục',
  '木三局': 'Mộc Tam Cục',
  '金四局': 'Kim Tứ Cục',
  '土五局': 'Thổ Ngũ Cục',
  '火六局': 'Hỏa Lục Cục',
};

// ─── 8. 13 PHƯƠNG DIỆN LUẬN GIẢI ───────────────────────────────────────────
export const TOPIC_VI: Record<string, { title: string; subtitle: string; zh: string }> = {
  overview:    { title: 'Tổng Quan Mệnh Cách', subtitle: 'Khí chất, phẩm cách và trục định hướng cuộc đời', zh: '命格总览' },
  personality: { title: 'Tính Cách & Nội Tâm', subtitle: 'Bản tính cốt lõi, tư duy và phản ứng cảm xúc', zh: '性格特质' },
  love:        { title: 'Tình Duyên & Hôn Nhân', subtitle: 'Duyên nợ, vợ chồng và hạnh phúc gia đạo', zh: '感情婚姻' },
  career:      { title: 'Công Danh & Sự Nghiệp', subtitle: 'Đường hướng nghề nghiệp, chức quyền và thành tựu', zh: '事业职业' },
  wealth:      { title: 'Tài Lộc & Tiền Tài', subtitle: 'Nguồn thu nhập, tích lũy và vận may tài chính', zh: '财富运势' },
  health:      { title: 'Sức Khỏe & Tật Ách', subtitle: 'Thể chất tạng phủ, bệnh tật và phòng ngừa', zh: '健康状况' },
  family:      { title: 'Huynh Đệ & Bạn Thân', subtitle: 'Anh chị em ruột, cộng sự hợp tác làm ăn', zh: '兄弟合伙' },
  children:    { title: 'Tử Tức & Con Cái', subtitle: 'Duyên con, tính cách con cái và hậu tự', zh: '子女缘分' },
  move:        { title: 'Thiên Di & Xuất Ngoại', subtitle: 'Vận may khi ra ngoài, đi xa, định cư xứ người', zh: '迁移外出' },
  friends:     { title: 'Giao Hữu & Quý Nhân', subtitle: 'Mối quan hệ xã hội, cấp dưới và trợ lực', zh: '人际贵人' },
  home:        { title: 'Điền Trạch & Điền Sản', subtitle: 'Nhà cửa đất đai, bất động sản và nơi cư ngụ', zh: '田宅不动产' },
  spirit:      { title: 'Phúc Đức & Hậu Vận', subtitle: 'Thọ mạng, phúc ấm tổ tiên và an lạc tinh thần', zh: '精神福德' },
  parents:     { title: 'Phụ Mẫu & Trưởng Bối', subtitle: 'Cha mẹ, bậc bề trên và sự nâng đỡ từ gia đình', zh: '父母长辈' },
};

// ─── 9. CÁCH CỤC KINH ĐIỂN TỬ VI (50+ 格局) ──────────────────────────────────
export const PATTERN_VI: Record<string, { vi: string; zh: string; note?: string }> = {
  '君臣庆会': { vi: 'Quân Thần Khánh Hội', zh: '君臣庆会', note: 'Vua tôi sum vầy, đại quý cách lãnh đạo' },
  '紫府同宫': { vi: 'Tử Phủ Đồng Cung', zh: '紫府同宫', note: 'Đế tinh và Tài khố cùng chiếu, phú quý song toàn' },
  '府相朝垣': { vi: 'Phủ Tướng Triều Viên', zh: '府相朝垣', note: 'Thiên Phủ Thiên Tướng triều bái Mệnh, y lộc ngàn chung' },
  '机月同梁': { vi: 'Cơ Nguyệt Đồng Lương', zh: '机月同梁', note: 'Mưu lược văn chức, phò tá đắc lực' },
  '机月同梁三星会': { vi: 'Cơ Nguyệt Đồng Lương Tam Tinh', zh: '机月同梁三星会', note: 'Ba sao hội tụ, văn tài mưu lược' },
  '日月并明': { vi: 'Nhật Nguyệt Tịnh Minh', zh: '日月并明', note: 'Mặt trời mặt trăng cùng sáng soi rực rỡ' },
  '日月同宫': { vi: 'Nhật Nguyệt Đồng Cung', zh: '日月同宫', note: 'Thái Dương Thái Âm đồng tọa Sửu Mùi' },
  '日月夹命': { vi: 'Nhật Nguyệt Giáp Mệnh', zh: '日月夹命', note: 'Nhật Nguyệt kẹp hai bên Mệnh, quý khí tiềm ẩn' },
  '阳梁昌禄': { vi: 'Dương Lương Xương Lộc', zh: '阳梁昌禄', note: 'Khoa bảng đỗ đạt đầu bảng, công danh rực rỡ' },
  '石中隐玉': { vi: 'Thạch Trung Ẩn Ngọc', zh: '石中隐玉', note: 'Ngọc ẩn trong đá, hậu vận phát tiết hiển vinh' },
  '杀破狼':   { vi: 'Sát Phá Tham', zh: '杀破狼', note: 'Khai sơn phá thạch, biến động xoay chuyển cờ thế' },
  '武贪格':   { vi: 'Vũ Tham Cách', zh: '武贪格', note: 'Tiền bần hậu phú, trung niên đại phát tài danh' },
  '火贪格':   { vi: 'Hỏa Tham Cách', zh: '火贪格', note: 'Tham Lang Hỏa Tinh, bạo phát hoạnh tài bất ngờ' },
  '铃贪格':   { vi: 'Linh Tham Cách', zh: '铃贪格', note: 'Tham Lang Linh Tinh, bạo phát hoạnh tài bất ngờ' },
  '巨日同宫': { vi: 'Cự Nhật Đồng Cung', zh: '巨日同宫', note: 'Cự Môn Thái Dương đồng tọa Dần Thân, danh vang hải ngoại' },
  '三奇加会': { vi: 'Tam Kỳ Gia Hội', zh: '三奇加会', note: 'Khoa Quyền Lộc hội tụ Tam Phương, chí tôn cát cách' },
  '双禄朝垣': { vi: 'Song Lộc Triều Viên', zh: '双禄朝垣', note: 'Lộc Tồn Hóa Lộc triều mệnh, tài nguyên cuồn cuộn' },
  '辅弼同会': { vi: 'Phụ Bật Đồng Hội', zh: '辅弼同会', note: 'Tả Phụ Hữu Bật nâng đỡ, quý nhân trợ lực không ngừng' },
  '辅弼夹命': { vi: 'Phụ Bật Giáp Mệnh', zh: '辅弼夹命', note: 'Tả Phụ Hữu Bật kẹp Mệnh, vạn người nâng đỡ' },
  '昌曲夹命': { vi: 'Xương Khúc Giáp Mệnh', zh: '昌曲夹命', note: 'Văn chương bác nhã, khí chất nho nhã hơn người' },
  '昌曲坐命': { vi: 'Xương Khúc Tọa Mệnh', zh: '昌曲坐命', note: 'Văn chương cái thế, tú khí đoan chính' },
  '昌曲同会': { vi: 'Xương Khúc Đồng Hội', zh: '昌曲同会', note: 'Văn nghệ tài hoa, khẩu tài văn bút xuất chúng' },
  '魁钺同会': { vi: 'Khôi Việt Đồng Hội', zh: '魁钺同会', note: 'Thiên Khôi Thiên Việt chiếu mệnh, gặp hung hóa cát' },
  '魁钺夹命': { vi: 'Khôi Việt Giáp Mệnh', zh: '魁钺夹命', note: 'Thiên Ất quý nhân phò tá hai bên' },
  '明珠出海': { vi: 'Minh Châu Xuất Hải', zh: '明珠出海', note: 'Viên ngọc sáng nhô lên mặt biển, tài hoa cái thế' },
  '天同天梁格': { vi: 'Thiên Đồng Thiên Lương', zh: '天同天梁格', note: 'Phúc thọ song toàn, bình an hòa nhã' },
  '廉贞天相格': { vi: 'Liêm Trinh Thiên Tướng', zh: '廉贞天相格', note: 'Cương nhu phối hợp, tài năng quản trị kiệt xuất' },
  '武曲七杀': { vi: 'Vũ Khúc Thất Sát', zh: '武曲七杀', note: 'Anh hùng quyết đoán, tay trắng lập nghiệp' },
  '紫微入命': { vi: 'Tử Vi Nhập Mệnh', zh: '紫微入命', note: 'Đế tinh tọa Mệnh, phong thái vương giả lãnh đạo' },
  '禄存守命': { vi: 'Lộc Tồn Thủ Mệnh', zh: '禄存守命', note: 'Lộc Tồn tọa Mệnh, y thực phong túc no đủ' },
  '禄存守身': { vi: 'Lộc Tồn Thủ Thân', zh: '禄存守身', note: 'Lộc Tồn tọa Thân, trung niên đắc lộc tự hưởng' },
  '天马入命': { vi: 'Thiên Mã Nhập Mệnh', zh: '天马入命', note: 'Dịch mã tinh động, động trung sinh tài' },
  '天马在迁': { vi: 'Thiên Mã Tọa Thiên Di', zh: '天马在迁', note: 'Xuất ngoại đắc tài, bôn ba bốn phương lập nghiệp' },
  '化禄入财': { vi: 'Hóa Lộc Nhập Tài', zh: '化禄入财', note: 'Lộc vào cung Tài, tiền của tự nhiên đến tay dồi dào' },
  '化权入官': { vi: 'Hóa Quyền Nhập Quan', zh: '化权入官', note: 'Quyền vào cung Quan, nắm đại quyền và vị thế vững vàng' },
  '化科入命': { vi: 'Hóa Khoa Nhập Mệnh', zh: '化科入命', note: 'Khoa danh gia thân, quý nhân nâng đỡ hiển đạt' },
  '化科入身': { vi: 'Hóa Khoa Nhập Thân', zh: '化科入身', note: 'Thân cư Khoa tinh, dĩ danh thủ lợi vững vàng' },
  '科权双会': { vi: 'Khoa Quyền Song Hội', zh: '科权双会', note: 'Vừa có tài học danh tiếng vừa có thực quyền nắm tay' },
  '马头带箭': { vi: 'Mã Đầu Đới Tiễn', zh: '马头带箭', note: 'Kình Dương tại Ngọ, trấn giữ biên cương lập đại công' },
  '羊陀夹忌': { vi: 'Kình Đà Giáp Kỵ', zh: '羊陀夹忌', note: 'Kình Dương Đà La kẹp Hóa Kỵ, hung hiểm cần phòng bị' },
  '火铃夹命': { vi: 'Hỏa Linh Giáp Mệnh', zh: '火铃夹命', note: 'Hỏa Tinh Linh Tinh kẹp Mệnh, thử thách rèn luyện sóng gió' },
  '空劫夹命': { vi: 'Không Kiếp Giáp Mệnh', zh: '空劫夹命', note: 'Địa Không Địa Kiếp kẹp Mệnh, thăng trầm bất định' },
  '铃昌陀武': { vi: 'Linh Xương Đà Vũ', zh: '铃昌陀武', note: 'Bốn sao hung hội, hạn đến cần cẩn trọng sông nước tài chính' },
  '巨火羊':   { vi: 'Cự Hỏa Dương', zh: '巨火羊', note: 'Cự Môn Hỏa Tinh Kình Dương, đề phòng thị phi tai ách' },
  '廉杀羊':   { vi: 'Liêm Sát Dương', zh: '廉杀羊', note: 'Liêm Trinh Thất Sát Kình Dương, dễ gặp trắc trở tai biến' },
};

// ─── TỪ ĐIỂN DIỄN GIẢI CÁCH CỤC TIẾNG VIỆT CHUẨN MỰC ────────────────────────
export const PATTERN_DESCRIPTIONS_VI: Record<string, string> = {
  '君臣庆会': 'Tử Vi tọa Mệnh được Tả Phụ Hữu Bật cùng hội tụ, ví như bậc đế vương có hiền thần phò tá, chủ về đại phú đại quý, phong thái thống soái. Suốt đời quý nhân nâng đỡ không ngớt, rất hợp nắm quyền hành lớn trong chính giới hoặc doanh nghiệp hàng đầu.',
  '紫府同宫': 'Tử Vi và Thiên Phủ cùng vào cung Mệnh tại Dần hoặc Thân. Đế tinh gặp Tài khố, là mệnh tôn quý thanh cao, phẩm hạnh đoan chính, một đời y thực no đủ không lo thiếu thốn, có năng lực lãnh đạo xuất chúng.',
  '府相朝垣': 'Thiên Phủ và Thiên Tướng chia nhau đóng giữ tam phương tứ chính của cung Mệnh, tạo thế văn võ song toàn, quyền ấn rực rỡ. Cổ thư viết: "Phủ Tướng triều viên thiên chung thực lộc", chủ về địa vị cao sang, cơm no áo ấm trọn đời.',
  '阳梁昌禄': 'Thái Dương, Thiên Lương, Văn Xương, Lộc Tồn cùng hội tụ tại Mệnh cung tam phương. Đây là cách cục "Khoa cử đệ nhất tinh", chủ về thông minh đỗ đạt đầu bảng, thi cử hanh thông, công danh rực rỡ, rất hợp con đường học thuật, giáo dục, chuyên môn uy tín.',
  '武贪格': 'Vũ Khúc gặp Tham Lang tại cung Mệnh, tài tinh kết hợp với sao dục vọng giao hòa. Cổ ngữ có câu "Vũ Tham bất phát thiếu niên nhân" – sau tuổi ba mươi mới tích lũy bộc phát đại tài. Hợp tài chính, đầu tư, thương nghiệp, giải trí.',
  '火贪格': 'Tham Lang hội cùng Hỏa Tinh đồng cung hoặc chiếu tam phương, chủ về cơ hội phát tài bất ngờ, hoạnh phát đại tài. Cổ phú viết: "Tham Lang ngộ Hỏa Linh tất phát hoạnh tài", cơ hội tài lộc đến mau chóng, nên biết điểm dừng giữ gìn thành quả.',
  '铃贪格': 'Tham Lang hội cùng Linh Tinh đồng cung hoặc chiếu tam phương, chủ về bộc phát hoạnh tài, có những bước ngoặt bất ngờ mang lại tài lộc và danh tiếng vang dội.',
  '杀破狼': 'Thất Sát, Phá Quân, Tham Lang tam phương hội tụ, là cách cục khai sơn phá thạch, biến động xoay chuyển cuộc đời. Cả đời không cam chịu bình thường, nhiều chuyển biến lớn, hợp kinh doanh khởi nghiệp, quân đội, công an, bôn ba lập nghiệp lớn.',
  '机月同梁': 'Bốn sao Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương cùng hội tụ tại Mệnh - Di - Tài - Quan. Tính tình nho nhã, thông minh túc trí, mưu lược sâu xa. Rất hợp làm việc trong cơ quan nhà nước, nghiên cứu học thuật, giáo dục, y tế, dịch vụ chuyên môn cao; không hợp đầu cơ mạo hiểm.',
  '机月同梁三星会': 'Bộ sao Cơ Nguyệt Đồng Lương hội tụ được 3 sao tại tam phương tứ chính, là cách cục văn cách mưu trí, tính tình hòa nhã, có tài phò tá quy hoạch, thích hợp công việc ổn định chuyên môn, cống hiến bền bỉ.',
  '廉贞天相格': 'Liêm Trinh Thiên Tướng đồng cung, tạo thế ấn thụ cương nhu tịnh tế. Chủ về làm việc công minh chính trực, có danh tiếng thanh liêm, hợp hành chính, tư pháp, quản trị doanh nghiệp, kế hoạch dự án.',
  '武曲七杀': 'Vũ Khúc Thất Sát đồng cung, Tướng tinh phối hợp Tài tinh, chủ về tính cách quyết đoán cương nghị, năng lực quản lý tài chính vượt trội, hợp với tài chính, ngân hàng, quân đội, khởi nghiệp. Cần tránh gặp Hóa Kỵ và sát tinh để giảm bớt vất vả nhọc nhằn.',
  '天同天梁格': 'Thiên Đồng Thiên Lương đồng cung, Phúc tinh hòa quyện Ấm tinh, chủ về tâm tính nhân hậu, từ bi đức độ, thích giúp đỡ mọi người. Thích hợp ngành y tế, giáo dục, tôn giáo, từ thiện xã hội. Cuộc đời bình an trung hậu.',
  '日月同宫': 'Thái Dương và Thái Âm đồng tọa tại Sửu hoặc Mùi, âm dương cân bằng, văn võ vẹn toàn. Chủ về nhân duyên khác giới tốt đẹp, sự nghiệp hanh thông, danh tiếng vang xa.',
  '日月夹命': 'Thái Dương và Thái Âm chia đóng hai bên giáp cung Mệnh, quang minh chính đại, suốt đời luôn có quý nhân âm thầm nâng đỡ. Nam mệnh chủ công danh quý hiển, nữ mệnh vượng phu ích tử.',
  '巨日同宫': 'Cự Môn và Thái Dương đồng cung tại Dần hoặc Thân. Thái Dương tỏa ánh quang xua tan ám khí của Cự Môn, chủ về phát đạt nhờ tài ăn nói, truyền thông, ngoại ngữ, danh tiếng vang dội hải ngoại.',
  '石中隐玉': 'Cự Môn tọa thủ cung Mệnh tại Tý hoặc Ngọ. Vẻ ngoài trầm tĩnh mà bên trong chứa chan tài hoa học vấn sâu rộng. Tiền vận bình lặng, trung hậu vận phát tiết hiển vinh như ngọc quý mài sáng.',
  '明珠出海': 'Cung Mệnh tại Mùi vô chính diệu, đối cung tại Sửu có Nhật Nguyệt đồng chiếu rực rỡ, ví như viên ngọc sáng nhô lên mặt biển. Chủ về tay trắng lập nên sự nghiệp lớn, càng đi xa càng hiển vinh.',
  '紫微入命': 'Tử Vi đế tinh độc tọa cung Mệnh, tự trọng cao độ, có sức hút lãnh đạo tự nhiên. Cần có Tả Phụ Hữu Bật hội chiếu để phát huy tối đa quyền năng đế vương.',
  '辅弼夹命': 'Tả Phụ Hữu Bật kẹp hai bên cung Mệnh, phúc thọ sâu dày, bất kể làm việc gì cũng nhận được sự trợ giúp đắc lực của đồng nghiệp và cấp dưới.',
  '昌曲夹命': 'Văn Xương Văn Khúc kẹp hai bên cung Mệnh, chủ về thông minh tuấn tú, văn chương cái thế, rất có lợi cho thi cử, bằng cấp học thuật và sáng tạo nghệ thuật.',
  '魁钺夹命': 'Thiên Khôi Thiên Việt kẹp hai bên cung Mệnh, gọi là giáp quý, cả đời thường có cơ may bất ngờ và quý nhân ra tay trợ giúp đúng những thời điểm bước ngoặt.',
  '双禄朝垣': 'Hóa Lộc và Lộc Tồn cùng chiếu vào tam phương tứ chính của cung Mệnh, tiền của cuồn cuộn dồi dào, kinh doanh đắc lợi, giàu có như đào chu.',
  '三奇加会': 'Hóa Lộc, Hóa Quyền, Hóa Khoa cùng hội tụ tam phương tứ chính, là một trong những đại cát cách bậc nhất của Tử Vi, chủ về danh tiếng, quyền lực và tiền tài vẹn toàn.',
  '羊陀夹忌': 'Hóa Kỵ tọa thủ cung Mệnh, hai bên bị Kình Dương và Đà La kẹp chặt. Cổ thư xem đây là thế hung hiểm cần phòng bị, dễ gặp áp lực và thử thách, cần tu tâm dưỡng tính và làm việc cẩn trọng.',
  '火铃夹命': 'Hỏa Tinh và Linh Tinh kẹp hai bên cung Mệnh, chủ về tính cách có phần nóng nảy bộc trực, dễ gặp sóng gió bất ngờ, cần rèn luyện tính kiên nhẫn và bình tĩnh.',
  '空劫夹命': 'Địa Không Địa Kiếp kẹp hai bên cung Mệnh, chủ về tài lộc dễ đến dễ đi, tư tưởng khoáng đạt thanh thoát, hợp với nghệ thuật, nghiên cứu, tôn giáo triết học.',
  '廉杀羊': 'Liêm Trinh, Thất Sát, Kình Dương hội chiếu, nhắc nhở đương số khi gặp vận hạn cần giữ gìn an toàn khi đi lại và chú ý sức khỏe.',
  '巨火羊': 'Cự Môn, Hỏa Tinh, Kình Dương hội chiếu, nhắc nhở cần khéo léo trong lời ăn tiếng nói, tránh tranh cãi thị phi và học cách lắng nghe.',
  '铃昌陀武': 'Linh Tinh, Văn Xương, Đà La, Vũ Khúc hội chiếu, nhắc nhở khi đại vận đến tổ hợp này cần quản lý tài chính thận trọng và giữ vững tâm lý.',
  '马头带箭': 'Kình Dương tọa thủ cung Mệnh tại Ngọ, trấn giữ biên cương lập công lớn. Cách cục tượng trưng cho ý chí thép, hành động quả quyết và sức bật phi thường.',
  '禄存守命': 'Lộc Tồn tọa Mệnh, chủ về cả đời cơm no áo ấm, tài lộc ổn định vững vàng, tính tình thận trọng chu đáo.',
  '禄存守身': 'Lộc Tồn tọa Thân, chủ về trung hậu vận tài nguyên ổn định dồi dào, tự mình thụ hưởng thành quả tốt đẹp.',
  '天马入命': 'Thiên Mã tọa Mệnh, chủ về bôn ba di động, năng động sáng tạo, cầu tài trong sự chuyển động, càng đi xa càng dễ thành công.',
  '天马在迁': 'Thiên Mã tọa cung Thiên Di, chủ về ra ngoài đắc lợi, thích hợp phát triển sự nghiệp ở phương xa hoặc giao thương quốc tế.',
  '化禄入财': 'Hóa Lộc vào cung Tài Bạch, chủ về nguồn tiền hanh thông dồi dào, năng lực kiếm tiền vượt trội, dòng tiền luôn luân chuyển thuận lợi.',
  '化权入官': 'Hóa Quyền vào cung Quan Lộc, chủ về có uy quyền và năng lực kiểm soát mạnh mẽ trong công việc, dễ trở thành người lãnh đạo chủ chốt.',
  '化科入命': 'Hóa Khoa vào cung Mệnh, chủ về học vấn uyên bác, có danh tiếng tốt, tính tình hòa nhã, luôn có quý nhân trợ giúp hiển đạt.',
  '化科入身': 'Hóa Khoa vào cung Thân, chủ về hậu vận danh tiếng vẻ vang, gầy dựng sự nghiệp dựa trên uy tín và tài năng chuyên môn.',
  '昌曲坐命': 'Văn Xương Văn Khúc đồng tọa cung Mệnh, văn chương cái thế, tài hoa xuất chúng, khí chất nho nhã phong lưu.',
  '昌曲同会': 'Văn Xương Văn Khúc cùng hội tam phương tứ chính, chủ về ăn nói lưu loát, năng khiếu thẩm mỹ và viết lách xuất sắc.',
  '辅弼同会': 'Tả Phụ Hữu Bật cùng hội tụ tam phương tứ chính, suốt đời quý nhân trợ giúp không ngớt, quan hệ xã hội tốt đẹp, hợp công việc lãnh đạo tập thể.',
  '魁钺同会': 'Thiên Khôi Thiên Việt cùng hội tụ tam phương tứ chính, được Thiên Ất quý nhân chiếu mệnh, gặp dữ hóa lành, gặp thời đại phát.',
  '科权双会': 'Hóa Khoa và Hóa Quyền cùng hội tam phương tứ chính, chủ về danh quyền song mỹ, vừa có tài năng học vấn lại vừa có thực quyền trong tay.',
};

// ─── TỰ ĐỘNG DỊCH DIỄN GIẢI CÁCH CỤC ─────────────────────────────────────────
export function getPatternDescriptionVi(name: string, zhDesc: string): string {
  if (PATTERN_DESCRIPTIONS_VI[name]) {
    return PATTERN_DESCRIPTIONS_VI[name];
  }
  // Xử lý các mẫu động như "天机化禄入命", "巨门化忌入命"
  const luMatch = name.match(/^(.+?)化禄入命$/);
  if (luMatch) {
    const starVi = getStarName(luMatch[1]).vi;
    return `${starVi} Hóa Lộc tọa thủ cung Mệnh, chủ về đường tài lộc hanh thông, nhân duyên tốt đẹp, cơ trí linh hoạt, kiếm tiền thuận lợi và nhiều quý nhân giúp đỡ.`;
  }
  const jiMatch = name.match(/^(.+?)化忌入(命|迁)$/);
  if (jiMatch) {
    const starVi = getStarName(jiMatch[1]).vi;
    const palace = jiMatch[2] === '命' ? 'cung Mệnh' : 'cung Thiên Di';
    return `${starVi} Hóa Kỵ tọa thủ ${palace}, cần chú ý sự cứng nhắc hoặc áp lực tâm lý trong các vấn đề liên quan đến sao ${starVi}, làm việc gì cũng nên suy nghĩ thấu đáo, dĩ hòa vi quý.`;
  }
  // Nếu có đoạn tiếng Trung chưa dịch hết, dịch cơ bản tên sao bên trong
  return translateCondition(zhDesc);
}

// ─── TỰ ĐỘNG DỊCH CÁC ĐIỀU KIỆN (CONDITIONS) THÀNH TIẾNG VIỆT ────────────────
export function translateCondition(cond: string): string {
  let s = cond;

  // Dịch các cụm từ Tử Vi kinh điển
  const replacements: [RegExp, string][] = [
    [/三方四正齐入|四星齐入命宫三方四正|四星齐入命迁财官|四星齐入/g, 'Bốn sao cùng hội tụ vào Mệnh - Di - Tài - Quan'],
    [/三星齐入命宫三方四正|三星齐会|三星齐入/g, 'Ba sao cùng hội tụ vào Tam Phương Tứ Chính'],
    [/同会三方四正|同会命宫三方四正/g, 'cùng hội tụ Tam Phương Tứ Chính'],
    [/会照命宫三方|会照三方四正/g, 'hội chiếu Tam Phương Tứ Chính'],
    [/会命宫三方/g, 'hội cung Mệnh tam phương'],
    [/分居命宫前后两宫/g, 'chia kẹp hai bên cung Mệnh'],
    [/同入命宫/g, 'cùng tọa thủ cung Mệnh'],
    [/入命宫/g, 'tọa thủ cung Mệnh'],
    [/入身宫/g, 'tọa thủ cung Thân'],
    [/入迁移宫/g, 'tọa thủ cung Thiên Di'],
    [/入财帛宫/g, 'tọa thủ cung Tài Bạch'],
    [/入官禄宫/g, 'tọa thủ cung Quan Lộc'],
    [/同宫/g, ' đồng cung '],
    [/会照/g, ' hội chiếu '],
    [/坐命/g, ' tọa Mệnh '],
    [/对宫拱照/g, ' đối cung chiếu về '],
    [/庙旺/g, ' Miếu Vượng '],
    [/落陷/g, ' Lạc Hãm '],
    [/化禄/g, ' Hóa Lộc '],
    [/化权/g, ' Hóa Quyền '],
    [/化科/g, ' Hóa Khoa '],
    [/化忌/g, ' Hóa Kỵ '],
    [/再会昌曲/g, 'Hội thêm Văn Xương, Văn Khúc'],
    [/再会文昌或文曲/g, 'Hội thêm Văn Xương hoặc Văn Khúc'],
    [/再会化科/g, 'Hội thêm Hóa Khoa'],
    [/再会左辅/g, 'Hội thêm Tả Phụ'],
    [/再会魁钺/g, 'Hội thêm Thiên Khôi, Thiên Việt'],
    [/辅弼同会/g, 'Tả Phụ, Hữu Bật cùng hội'],
    [/辅弼相助/g, 'Tả Phụ, Hữu Bật nâng đỡ'],
    [/魁钺加照/g, 'Thiên Khôi, Thiên Việt gia chiếu'],
    [/魁钺相助/g, 'Thiên Khôi, Thiên Việt trợ lực'],
    [/煞星同坐/g, 'Sát tinh đồng tọa'],
    [/煞星过多|煞星过重/g, 'Sát tinh quá nhiều'],
    [/命宫坐煞/g, 'Mệnh cung tọa sát tinh'],
    [/命坐空劫/g, 'Mệnh gặp Địa Không, Địa Kiếp'],
    [/空劫同坐/g, 'Địa Không, Địa Kiếp đồng tọa'],
    [/三方煞重/g, 'Tam phương sát tinh hội nhiều'],
    [/地空地劫双夹会照/g, 'Địa Không, Địa Kiếp kẹp hoặc hội chiếu'],
    [/动得有力/g, 'biến động đắc lực mang lại tài lộc'],
    [/动而无成/g, 'biến động vất vả nhưng khó thành'],
    [/动得辛苦/g, 'biến động nhiều nhọc nhằn'],
    [/口才生财/g, 'ăn nói khéo léo sinh tài'],
    [/口舌官非/g, 'đề phòng tranh chấp thị phi'],
    [/无辅弼/g, 'Không có Tả Phụ, Hữu Bật'],
    [/孤君无臣/g, 'Vua đơn độc thiếu bề tôi phò tá'],
    [/两星不同宫/g, 'Hai sao không đồng cung'],
    [/命宫见禄/g, 'Mệnh cung gặp Lộc Tồn hoặc Hóa Lộc'],
    [/见禄存或廉贞化禄/g, 'Gặp Lộc Tồn hoặc Liêm Trinh Hóa Lộc'],
    [/三方有化禄或化权/g, 'Tam phương có Hóa Lộc hoặc Hóa Quyền'],
  ];

  for (const [re, rep] of replacements) {
    s = s.replace(re, rep);
  }

  // Thay thế tên sao tiếng Trung sang Tiếng Việt
  for (const [zh, info] of Object.entries(MAJOR_STARS_VI)) {
    s = s.replaceAll(zh, info.vi);
  }
  for (const [zh, info] of Object.entries(MINOR_STARS_VI)) {
    s = s.replaceAll(zh, info.vi);
  }

  // Dọn dẹp khoảng trắng và dấu phẩy
  s = s.replace(/、/g, ', ').replace(/\s+/g, ' ').trim();
  return s;
}

// ─── TỰ ĐỘNG DỊCH NGUỒN GỐC XUẤT XỨ CỔ TỊCH ─────────────────────────────────
export function translatePatternSource(source: string): string {
  if (!source) return '';
  let s = source;
  s = s.replace(/《紫微斗数全书·(.+?)》/, 'Tử Vi Đẩu Số Toàn Thư · $1');
  s = s.replace(/《紫微斗数骨髓赋·(.+?)》/, 'Tử Vi Cốt Tủy Phú · $1');
  s = s.replace(/《紫微斗数全集·(.+?)》/, 'Tử Vi Đẩu Số Toàn Tập · $1');
  s = s.replace(/《紫微斗数全书》/, 'Tử Vi Đẩu Số Toàn Thư');
  s = s.replace(/《紫微斗数骨髓赋》/, 'Tử Vi Cốt Tủy Phú');
  s = s.replace(/《紫微斗数全集》/, 'Tử Vi Đẩu Số Toàn Tập');
  s = s.replace(/《(.+?)》/, '$1');

  // Dịch tên cách cục trong ngoặc xuất xứ
  for (const [zh, info] of Object.entries(PATTERN_VI)) {
    s = s.replaceAll(zh, info.vi);
  }
  return s;
}

// ─── HELPER FUNCTIONS CHUYỂN ĐỔI NHANH ──────────────────────────────────────
export function getPalaceName(zhName: string): { vi: string; zh: string } {
  const p = PALACE_VI[zhName];
  if (p) return { vi: p.vi, zh: p.zh };
  return { vi: zhName, zh: zhName };
}

export function getStarName(zhName: string): { vi: string; zh: string } {
  const m = MAJOR_STARS_VI[zhName];
  if (m) return m;
  const s = MINOR_STARS_VI[zhName];
  if (s) return s;
  return { vi: zhName, zh: zhName };
}

export function getPatternVi(zhName: string): { vi: string; zh: string; note?: string } {
  if (PATTERN_VI[zhName]) return PATTERN_VI[zhName];
  // Kiểm tra mẫu động như "天机化禄入命"
  const luMatch = zhName.match(/^(.+?)化禄入命$/);
  if (luMatch) {
    const starVi = getStarName(luMatch[1]).vi;
    return { vi: `${starVi} Hóa Lộc Nhập Mệnh`, zh: zhName, note: 'Tài lộc hanh thông, sinh ý dồi dào' };
  }
  const jiMatch = zhName.match(/^(.+?)化忌入(命|迁)$/);
  if (jiMatch) {
    const starVi = getStarName(jiMatch[1]).vi;
    const pal = jiMatch[2] === '命' ? 'Nhập Mệnh' : 'Nhập Thiên Di';
    return { vi: `${starVi} Hóa Kỵ ${pal}`, zh: zhName, note: 'Cần cẩn trọng suy xét, tránh tranh chấp' };
  }
  return { vi: zhName, zh: zhName };
}

export function getSiHua(zhSiHua: string): { vi: string; zh: string; short: string } {
  return SIHUA_VI[zhSiHua] || { vi: zhSiHua, zh: zhSiHua, short: zhSiHua };
}

export function getBrightnessVi(zhB: string): string {
  return BRIGHTNESS_VI[zhB] || zhB;
}

export function getGanzhiName(stemIdx: number, branchIdx: number): { vi: string; zh: string } {
  const vi = `${STEMS_VI[stemIdx]} ${BRANCHES_VI[branchIdx]}`;
  const zh = `${['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'][stemIdx]}${['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'][branchIdx]}`;
  return { vi, zh };
}

export function getJuName(juNameZh: string): string {
  return JU_VI[juNameZh] || juNameZh;
}

// ─── BỘ MÁY TỰ ĐỘNG SINH LUẬN GIẢI MỆNH LÝ TIẾNG VIỆT TOÀN DIỆN ─────────────
import type { ZiweiChart, Palace, Star } from './types';
import { detectPatterns } from './patterns';

export function generateLocalInsight(chart: ZiweiChart, topic: string, customQuestion?: string): string {
  const mingPalace = chart.palaces.find(p => p.branch === chart.mingGongBranch);
  const shenPalace = chart.palaces.find(p => p.branch === chart.shenGongBranch);
  const phuThe = chart.palaces.find(p => p.name === '夫妻');
  const quanLoc = chart.palaces.find(p => p.name === '官禄');
  const taiBach = chart.palaces.find(p => p.name === '财帛');
  const dienTrach = chart.palaces.find(p => p.name === '田宅');
  const tatAch = chart.palaces.find(p => p.name === '疾厄');
  const thienDi = chart.palaces.find(p => p.name === '迁移');
  const phucDuc = chart.palaces.find(p => p.name === '福德');

  const patterns = detectPatterns(chart);
  const patternNames = patterns.map(p => getPatternVi(p.name).vi).join(', ') || 'Cách cục tự nhiên cân bằng';

  const formatStars = (palace?: Palace) => {
    if (!palace) return 'Vô Chính Diệu';
    const majors = palace.stars.filter(s => s.type === 'major');
    if (majors.length === 0) return 'Vô Chính Diệu (mượn lực cung đối)';
    return majors.map(s => {
      const vi = getStarName(s.name).vi;
      const b = s.brightnessRaw ? ` [${getBrightnessVi(s.brightnessRaw)}]` : '';
      const h = s.siHua ? ` (${getSiHua(s.siHua).vi})` : '';
      return `${vi}${b}${h}`;
    }).join(' đồng cung ');
  };

  const mingBranchVi = BRANCHES_VI[chart.mingGongBranch];
  const shenBranchVi = BRANCHES_VI[chart.shenGongBranch];
  const juVi = getJuName(chart.wuxingJuName);
  const mingStarsStr = formatStars(mingPalace);

  if (topic === 'overview') {
    return `**【MỆNH CÁCH TỔNG QUAN】**
Mệnh chủ an Mệnh tại cung **${mingBranchVi}**, Thân cư tại cung **${shenBranchVi}**, nạp âm thuộc **${juVi}**. 
Chính tinh thủ Mệnh: **${mingStarsStr}**.
Cách cục cốt lõi hội tụ: **${patternNames}**.

**【LUẬN GIẢI CHÍNH TINH THỦ MỆNH】**
Theo trường phái Tử Vi Thiên Kỷ của danh sư Nghê Hải Hà, cung Mệnh đóng vai trò như hạt nhân tiên thiên của một đời người. Với tinh diệu **${mingStarsStr}**, mệnh chủ mang cốt cách thông minh túc trí, tư duy độc lập và có ý chí kiến tạo sự nghiệp riêng. Dù gặp thăng trầm biến động, bản mệnh luôn có nội lực vững vàng để chuyển nguy thành an.

**【TAM PHƯƠNG TỨ CHÍNH & VẬN TRÌNH】**
Tam phương tứ chính hội tụ Quan Lộc (**${formatStars(quanLoc)}**), Tài Bạch (**${formatStars(taiBach)}**), và Thiên Di (**${formatStars(thienDi)}**), tạo nên thế chân vạc hỗ trợ đắc lực. Cuộc đời mệnh chủ càng đi xa, càng giao lưu kết nối rộng rãi thì tài lộc và danh vọng càng thêm phát tiết hiển vinh.

**【LỜI KHUYÊN PHÁT TRIỂN CUỘC ĐỜI】**
Nên phát huy thế mạnh chuyên môn, kiên trì theo đuổi mục tiêu dài hạn, dĩ hòa vi quý trong giao tiếp và tích lũy phúc đức để hậu vận thảnh thơi an nhàn trọn vẹn.`;
  }

  if (topic === 'love') {
    const phuTheStars = formatStars(phuThe);
    return `**【CUNG PHU THÊ & TÌNH DUYÊN】**
Cung Phu Thê an tại **${phuThe ? BRANCHES_VI[phuThe.branch] : ''}**, có chính tinh: **${phuTheStars}**.
Cung Phúc Đức phối chiếu: **${formatStars(phucDuc)}**.

**【TÂM TÍNH BẠN ĐỜI & GIA ĐẠO】**
Bạn đời là người có cá tính rõ ràng, thông tuệ, có năng lực tự lập cao và biết quán xuyến công việc. Mối lương duyên này mang tính hỗ trợ tương đắc, đối phương vừa là người bạn đời vừa là người đồng hành đáng tin cậy trên đường đời.

**【LỜI KHUYÊN HÔN NHÂN & HÒA HỢP】**
Theo lý số cổ truyền, tình duyên nên chín chắn, thấu hiểu và tôn trọng khoảng trời riêng của nhau. Trong đời sống gia đạo, cần lắng nghe, chia sẻ chân thành để duy trì ngọn lửa yêu thương bền chặt qua năm tháng.`;
  }

  if (topic === 'career') {
    const quanLocStars = formatStars(quanLoc);
    return `**【CÔNG DANH & SỰ NGHIỆP】**
Cung Quan Lộc an tại **${quanLoc ? BRANCHES_VI[quanLoc.branch] : ''}**, toạ thủ chính tinh: **${quanLocStars}**.

**【LĨNH VỰC & HƯỚNG PHÁT TRIỂN TỐI ƯU】**
Bản mệnh rất thích hợp với các ngành nghề đòi hỏi tư duy mưu lược, chuyên môn sâu, quản lý điều hành, công nghệ, tài chính thương mại hoặc giáo dục học thuật. Năng lực làm việc trách nhiệm cao giúp mệnh chủ luôn được cấp trên và đối tác tín nhiệm.

**【CƠ HỘI THĂNG TIẾN & BỨT PHÁ】**
Đường quan lộc có xu hướng càng về trung vận càng khởi sắc mạnh mẽ. Khi nắm bắt được đúng thời cơ chuyển biến của đại hạn, mệnh chủ có thể tạo nên bước ngoặt lớn, khẳng định vị thế và tiếng vang vững chắc.`;
  }

  if (topic === 'wealth') {
    const taiBachStars = formatStars(taiBach);
    const dienTrachStars = formatStars(dienTrach);
    return `**【TÀI BẠCH & NGUỒN TIỀN】**
Cung Tài Bạch toạ thủ: **${taiBachStars}**.
Cung Điền Trạch (Kho của cải, nhà đất): **${dienTrachStars}**.

**【MÔ HÌNH DÒNG TIỀN & ĐIỀN SẢN】**
Nguồn thu nhập chính xuất phát từ tài năng thực học và uy tín bản thân. Mệnh chủ có khả năng nhìn thấy cơ hội sinh lời từ sớm, biết tích lũy và chuyển hóa tiền mặt thành tài sản cố định như bất động sản, điền trạch để giữ của lâu bền.

**【CHIẾN LƯỢC QUẢN LÝ TÀI CHÍNH】**
Không nên quá sa đà vào các dự án đầu cơ mạo hiểm ngắn hạn. Ưu tiên các kênh đầu tư bền vững, củng cố kho tài lộc Điền Trạch để hậu vận phú túc sung túc.`;
  }

  if (topic === 'health') {
    const tatAchStars = formatStars(tatAch);
    return `**【TẬT ÁCH & SỨC KHỎE TẠNG PHỦ】**
Cung Tật Ách an tại **${tatAch ? BRANCHES_VI[tatAch.branch] : ''}**, toạ thủ: **${tatAchStars}**.

**【LƯU Ý DƯỠNG SINH CỔ TRUYỀN】**
Theo thuyết Ngũ Hành sinh khắc của Đông y mệnh lý, cần lưu tâm cân bằng thể trạng, chú ý chế độ sinh hoạt điều độ, giữ gìn giấc ngủ ngon và giải tỏa áp lực tinh thần. Nên duy trì thói quen vận động thể thao nhẹ nhàng ngoài trời để khí huyết lưu thông thông suốt.`;
  }

  if (topic === 'personality') {
    return `**【TÍNH CÁCH & KHÍ CHẤT CỐT LÕI】**
Mệnh tọa **${mingBranchVi}** (${mingStarsStr}), Thân cư **${shenBranchVi}**.

**【PHẨM CÁCH ĐẶC TRƯNG】**
Mệnh chủ là người có nội tâm sâu sắc, trọng tình nghĩa, biết trước biết sau. Bề ngoài có thể ôn hòa điềm đạm nhưng bên trong lại chứa đựng nghị lực kiên cường và quyết đoán khi cần thiết. Có tinh thần cầu tiến cao và luôn hướng thiện.`;
  }

  // Câu hỏi chiêm nghiệm tùy biến
  if (customQuestion) {
    return `**【CHIÊM NGHIỆM VẬN MỆNH】**
Về vấn đề: *"${customQuestion}"*

Căn cứ vào Mệnh bàn với chính tinh **${mingStarsStr}** hội tụ cùng các cách cục **${patternNames}**, thời điểm này bản mệnh nên giữ tâm thế điềm tĩnh, sáng suốt phân tích thấu đáo mọi khía cạnh. Mọi quyết định xuất phát từ sự chính trực, cẩn trọng và chuẩn bị kỹ lưỡng đều sẽ mang lại kết quả cát tường viên mãn.`;
  }

  return `Lá số bản mệnh an Mệnh tại cung ${mingBranchVi}, ${mingStarsStr}, nạp âm ${juVi}. Cuộc đời nhiều cơ duyên cát lành, nên vững tâm phát triển tài đức.`;
}
