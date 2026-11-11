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

  // Câu hỏi chiêm nghiệm tùy biến chuyên sâu
  if (customQuestion) {
    const qLower = customQuestion.toLowerCase();
    
    if (qLower.includes('tình') || qLower.includes('duyên') || qLower.includes('hôn nhân') || qLower.includes('yêu') || qLower.includes('vợ') || qLower.includes('chồng') || qLower.includes('kết hôn')) {
      return `**【CHIÊM NGHIỆM TÌNH DUYÊN & HÔN PHỐI】**
Về câu hỏi: *"${customQuestion}"*

**1. Cung Phu Thê Bản Mệnh:**
Cung Phu Thê an tại **${phuThe ? BRANCHES_VI[phuThe.branch] : ''}**, tọa thủ: **${formatStars(phuThe)}**. Cung Phúc Đức phối chiếu: **${formatStars(phucDuc)}**.
Theo bí truyền Thiên Kỷ của thầy Nghê Hải Hà, cung Phu Thê thể hiện khí chất và duyên phận của người phối ngẫu. Đối phương là người có chính kiến, chu toàn công việc và là bạn đồng hành cùng xây đắp tương lai.

**2. Thời Điểm Khởi Sắc & Lời Khuyên:**
Tình cảm cần xây dựng trên nền tảng thấu hiểu, kiên nhẫn lắng nghe và tôn trọng không gian riêng của nhau. Khi bước vào các năm gặp sao Đào Hoa (Hồng Loan, Thiên Hỷ) hoặc cung Phu Thê được cát hóa (Hóa Lộc, Hóa Khoa), nhân duyên ắt đơm hoa kết trái viên mãn.`;
    }

    if (qLower.includes('việc') || qLower.includes('nghề') || qLower.includes('sự nghiệp') || qLower.includes('công danh') || qLower.includes('đổi việc') || qLower.includes('thăng chức') || qLower.includes('làm ăn') || qLower.includes('kinh doanh')) {
      return `**【CHIÊM NGHIỆM CÔNG DANH & ĐỊNH HƯỚNG SỰ NGHIỆP】**
Về câu hỏi: *"${customQuestion}"*

**1. Cung Quan Lộc & Thế Đứng Bản Mệnh:**
Cung Quan Lộc toạ thủ: **${formatStars(quanLoc)}**. Mệnh tọa thủ: **${mingStarsStr}**.
Tam phương tứ chính hội tụ cách cục **${patternNames}**. Đây là cấu trúc chủ về trí tuệ sáng suốt, mưu lược và có năng lực quản trị, tổ chức độc lập.

**2. Chiến Lược Phát Triển Đắc Lợi:**
Bản mệnh thích hợp với công việc mang tính chuyên môn cao, quản lý, đổi mới sáng tạo, tài chính hoặc điều hành hệ thống. Nếu có ý định chuyển đổi công việc hoặc khởi sự, nên chuẩn bị kỹ lưỡng về nguồn lực và chọn thời điểm đại vận/lưu niên được cát tinh trợ lực để bứt phá.`;
    }

    if (qLower.includes('tiền') || qLower.includes('tài') || qLower.includes('giàu') || qLower.includes('đầu tư') || qLower.includes('mua đất') || qLower.includes('bất động sản') || qLower.includes('nợ')) {
      return `**【CHIÊM NGHIỆM TÀI LỘC & ĐIỀN SẢN】**
Về câu hỏi: *"${customQuestion}"*

**1. Cung Tài Bạch & Kho Điền Trạch:**
Tài Bạch toạ thủ: **${formatStars(taiBach)}**. Kho tích lũy Điền Trạch toạ thủ: **${formatStars(dienTrach)}**.
Dòng tiền của bản mệnh mang tính vững bền, tích tiểu thành đại. Của cải có xu hướng tích tụ dần và sinh sôi nảy nở tốt nhất khi chuyển hóa thành các tài sản cố định như nhà cửa, đất đai, bất động sản.

**2. Lời Khuyên Quản Trị Tài Chính:**
Tránh đầu cơ mạo hiểm vào các kênh không minh bạch. Càng kiên định với năng lực cốt lõi và tích lũy điền sản, hậu vận tài chính càng sung túc, thảnh thơi.`;
    }

    if (qLower.includes('bệnh') || qLower.includes('sức khỏe') || qLower.includes('khỏe') || qLower.includes('tai nạn') || qLower.includes('mổ') || qLower.includes('viện') || qLower.includes('ốm')) {
      return `**【CHIÊM NGHIỆM SỨC KHỎE & TẬT ÁCH】**
Về câu hỏi: *"${customQuestion}"*

**1. Cung Tật Ách Bản Mệnh:**
Cung Tật Ách toạ thủ: **${formatStars(tatAch)}**, nhị hợp với cung Phụ Mẫu và tam hợp với Huynh Đệ, Điền Trạch.
Theo lý số Đông y của thầy Nghê Hải Hà, sức khỏe con người chịu ảnh hưởng sâu sắc từ nhịp sinh học tự nhiên và sự cân bằng Ngũ Hành tạng phủ.

**2. Lời Khuyên Dưỡng Sinh:**
Cần chú trọng chế độ ẩm thực thanh đạm, điều dưỡng giấc ngủ và giữ tâm trạng thư thái. Khi gặp những giai đoạn có sát tinh chiếu, cần đi kiểm tra sức khỏe định kỳ và rèn luyện thể thao để tăng cường chính khí, đẩy lùi tà khí.`;
    }

    if (qLower.includes('năm nay') || qLower.includes('đại hạn') || qLower.includes('vận hạn') || qLower.includes('tương lai') || qLower.includes('thời vận') || qLower.includes('khi nào')) {
      return `**【CHIÊM NGHIỆM VẬN HẠN & THỜI THẾ】**
Về câu hỏi: *"${customQuestion}"*

**1. Vận Trình Cốt Lõi:**
Mệnh chủ đang trong giai đoạn tích lũy nội lực mạnh mẽ. Cung Mệnh (**${mingStarsStr}**) phối chiếu cùng các cung vị trọng yếu tạo nên thế cờ nhiều cơ hội đan xen thử thách.

**2. Phương Châm Hành Động:**
Biết người biết ta, thuận thời mà tiến, nghịch thời mà thủ. Khi thời cơ chưa chín muồi, nên mài giũa chuyên môn và mở rộng quan hệ; khi thiên thời địa lợi nhân hòa hội tụ, lập tức dũng cảm nắm bắt để gặt hái thành công lớn.`;
    }

    return `**【CHIÊM NGHIỆM CHUYÊN SÂU LÁ SỐ】**
Về vấn đề: *"${customQuestion}"*

Căn cứ vào Mệnh bàn với chính tinh **${mingStarsStr}** hội tụ cùng các cách cục **${patternNames}**, cung Thân cư tại **${shenBranchVi}**:
Thời điểm này bản mệnh nên giữ tâm thế điềm tĩnh, sáng suốt phân tích thấu đáo mọi khía cạnh. Mọi quyết định xuất phát từ sự chính trực, cẩn trọng và chuẩn bị kỹ lưỡng đều sẽ mang lại kết quả cát tường viên mãn.`;
  }

  return `Lá số bản mệnh an Mệnh tại cung ${mingBranchVi}, ${mingStarsStr}, nạp âm ${juVi}. Cuộc đời nhiều cơ duyên cát lành, nên vững tâm phát triển tài đức.`;
}

export interface PalaceCoreVerdict {
  verdictTitle: string;
  temperament: string;
  strengthsAndCareer: string;
  challengesAndCautions: string;
  directConclusion: string;
}

/**
 * Tổng hợp kết luận giải đoán cốt lõi chuyên sâu độc bản cho cung vị
 */
function synthesizePalaceVerdict(palace: Palace, chart: ZiweiChart): PalaceCoreVerdict {
  const majors = palace.stars.filter(s => s.type === 'major').map(s => s.name);
  const shas = palace.stars.filter(s => s.type === 'sha').map(s => s.name);
  const luckies = palace.stars.filter(s => s.type === 'lucky').map(s => s.name);

  const hasTriet = palace.stars.some(s => s.name.includes('截') || s.name === 'Triệt' || s.name === '截空' || s.name === '副截');
  const hasTuan = palace.stars.some(s => s.name.includes('旬') || s.name === 'Tuần' || s.name === '旬空' || s.name === '副旬');
  const hasHoaKy = palace.stars.some(s => s.siHua === '忌');
  const hasHoaLoc = palace.stars.some(s => s.siHua === '禄');
  const hasHoaQuyen = palace.stars.some(s => s.siHua === '权');
  const hasHoaKhoa = palace.stars.some(s => s.siHua === '科');

  const pName = palace.name;

  if (pName === '命宫') {
    // ─── LUẬN GIẢI CHUYÊN SÂU CUNG MỆNH ───
    if (majors.includes('巨门')) {
      const isNgoOrTy = palace.branch === 6 || palace.branch === 0;
      return {
        verdictTitle: isNgoOrTy
          ? 'MỆNH CÁCH "THẠCH TRUNG ẨN NGỌC" (ĐÁ QUÝ GIẤU TRONG NGỌC) · KHẨU TÀI TRÍ TUỆ'
          : 'MỆNH CÁCH "CỰ MÔN ĐỘC TỌA" · TƯ DUY SẮC BÉN & PHẢN BIỆN CAO MINH',
        temperament: 'Sao Cự Môn tọa thủ Mệnh Cung là biểu tượng của chiều sâu tư duy, trí tuệ phản biện, trực giác sắc bén và năng lực ngôn ngữ vượt bậc. Đương số là người có chiều sâu nội tâm, không thích a dua xu nịnh, nhìn thấu bản chất vấn đề, tư duy logic chặt chẽ và luôn giữ vững lập trường độc lập.',
        strengthsAndCareer: 'Khẩu tài (tài ăn nói), óc phân tích và năng lực đàm phán là vũ khí tối thượng của bạn. Rất đắc lợi trong các lĩnh vực: Chuyên gia tư vấn chiến lược, Luật sư, Giảng viên đại học, Nghiên cứu khoa học, Đàm phán thương mại, Công nghệ phân tích dữ liệu, Truyền thông hoặc Ngoại giao.',
        challengesAndCautions: hasTriet || hasTuan || shas.length > 0 || hasHoaKy
          ? 'Cung Mệnh gặp Triệt/Tuần hoặc Sát tinh: Thời tiền vận (trước 30 tuổi) sẽ có giai đoạn lận đận, hay gặp phải thị phi, hiểu lầm hoặc cảm giác tài năng chưa được công nhận xứng đáng. Đây là giai đoạn tôi luyện ngọc thô; cần nhẫn nhịn, dùng thực lực và chuyên môn sâu để chứng minh, tránh sa đà vào tranh cãi hơn thua.'
          : 'Cần chú ý cẩn trọng lời ăn tiếng nói khi phát biểu, tránh quá thẳng thắn khiến tiểu nhân sinh lòng đố kỵ.',
        directConclusion: 'Ý NGHĨA BẢN MỆNH CỐT TỬ: Đương số là bậc kỳ tài "Ngọc ẩn trong đá" — Tiền vận tự lực cánh sinh lập nghiệp từ hai bàn tay trắng, tích lũy nội lực vượt qua thị phi; khi vượt qua mốc 30 tuổi bước sang Thân Cung (Thái Dương), ngọc trong đá sẽ phát quang rực rỡ, danh tài song thu, công thành danh toại!',
      };
    }

    if (majors.includes('紫微') || majors.includes('天府')) {
      return {
        verdictTitle: 'MỆNH CÁCH "ĐẾ TINH TÔN QUÝ" · KHÍ PHÁCH LÃNH ĐẠO ĐƯỜNG HOÀNG',
        temperament: 'Tử Vi / Thiên Phủ tại Mệnh là đấng quân tử tiên thiên, phong thái đĩnh đạc, bao dung, có tư chất người đứng đầu, tính tình điềm đạm và trọng chữ tín.',
        strengthsAndCareer: 'Có năng khiếu quản trị vĩ mô, quy tụ lòng người. Phù hợp làm lãnh đạo doanh nghiệp, cơ quan quản lý nhà nước, tài chính ngân hàng, điều hành tổ chức lớn.',
        challengesAndCautions: 'Cần tránh tính cách tự cao, áp đặt quan điểm lên người khác; nên lắng nghe cấp dưới để quy tụ nhân tài.',
        directConclusion: 'Ý NGHĨA BẢN MỆNH CỐT TỬ: Đương số mang số mệnh lãnh đạo và kiến tạo, cuộc đời có quý nhân nâng đỡ, tự thân tạo dựng cơ đồ hiển vinh bền vững.',
      };
    }

    if (majors.includes('太阳')) {
      return {
        verdictTitle: 'MỆNH CÁCH "NHẬT QUANG MINH HIỂN" · NHIỆT HUYẾT QUANG ĐẠI',
        temperament: 'Thái Dương thủ Mệnh chủ về lòng dạ quang minh chính đại, khẳng khái, nhiệt tình giúp đỡ người khác, có chí hướng vươn cao.',
        strengthsAndCareer: 'Hợp các ngành giáo dục, pháp luật, truyền thông, chính trị, tổ chức sự kiện, ngoại giao hoặc làm chủ thương hiệu riêng.',
        challengesAndCautions: 'Tính tình bộc trực đôi khi dễ bị kẻ xấu lợi dụng lòng tốt; cần giữ sự kín đáo trong các quyết định kinh doanh lớn.',
        directConclusion: 'Ý NGHĨA BẢN MỆNH CỐT TỬ: Vận mệnh tỏa sáng rực rỡ như vầng thái dương, tài năng bộc lộ sớm, danh tiếng vang xa, hậu vận an khang phú quý.',
      };
    }

    if (majors.includes('太阴')) {
      return {
        verdictTitle: 'MỆNH CÁCH "NGUYỆT LÃNG THIÊN MÔN" · PHÚ TÚC TÀI KHÍ THÂM SÂU',
        temperament: 'Thái Âm thủ Mệnh là người dịu dàng, nội tâm sâu lắng, tinh tế, có mắt thẩm mỹ và năng lực quan sát tỉ mỉ.',
        strengthsAndCareer: 'Rất có duyên với bất động sản, tài chính kế toán, nghệ thuật, sáng tạo nội dung, nhân sự hoặc kinh doanh tiêu dùng.',
        challengesAndCautions: 'Đôi khi đa sầu đa cảm, thiếu quyết đoán trong thời khắc then chốt; cần rèn luyện tính dứt khoát.',
        directConclusion: 'Ý NGHĨA BẢN MỆNH CỐT TỬ: Càng về hậu vận tài sản càng tích lũy dồi dào, cuộc sống sung túc an nhàn, điền sản đất đai phì nhiêu.',
      };
    }

    if (majors.includes('天机')) {
      return {
        verdictTitle: 'MỆNH CÁCH "THIÊN PHÚC MƯU LƯỢC" · TRÍ TUỆ NHẠY BÉN BẬC THẦY',
        temperament: 'Thiên Cơ là sao trí tuệ, cơ biến khôn lường, thích tìm tòi sáng tạo, tính tình hiền lành và tư duy mưu lược.',
        strengthsAndCareer: 'Phù hợp làm chiến lược gia, kỹ sư công nghệ, phân tích tài chính, cố vấn cấp cao, nghiên cứu học thuật.',
        challengesAndCautions: 'Nghĩ nhiều hơn làm, hay lo xa thái quá; cần kiên trì bám đuổi một mục tiêu thay vì phân tán sức lực.',
        directConclusion: 'Ý NGHĨA BẢN MỆNH CỐT TỬ: Lấy chất xám và trí tuệ làm vốn liếng vô giá, chuyển bại thành thắng nhờ tài ứng biến linh hoạt.',
      };
    }

    if (majors.includes('武曲')) {
      return {
        verdictTitle: 'MỆNH CÁCH "VŨ TÀI CƯƠNG NGHỊ" · BẢN LĨNH DỰNG CƠ ĐỒ',
        temperament: 'Vũ Khúc là tài tinh kiêm võ tinh, cương trực, dứt khoát, trọng lời hứa, có bản lĩnh thương trường và tính tự lập rất cao.',
        strengthsAndCareer: 'Kinh doanh, đầu tư tài chính, ngân hàng, công nghệ chế tạo, quản lý chuỗi cung ứng, điều hành sản xuất.',
        challengesAndCautions: 'Tính tình có phần khô khan, ít bộc lộ tình cảm; cần mềm mỏng hơn trong gia đạo và các mối quan hệ thân tình.',
        directConclusion: 'Ý NGHĨA BẢN MỆNH CỐT TỬ: Đương số là người tự lực cánh sinh kiệt xuất, tay trắng làm nên cơ nghiệp, tài vận vững bền.',
      };
    }

    if (majors.includes('七杀') || majors.includes('破军')) {
      return {
        verdictTitle: 'MỆNH CÁCH "SÁT PHÁ CAN TRƯỜNG" · TIÊN PHONG BỨT PHÁ MỞ LỐI',
        temperament: 'Dũng mãnh, dám nghĩ dám làm, không chịu gò bó theo khuôn mẫu cũ, thích mạo hiểm và có ý chí sắt đá vượt qua mọi nghịch cảnh.',
        strengthsAndCareer: 'Khởi nghiệp sáng lập công ty, mở rộng thị trường mới, công nghệ đột phá, quân đội, thể thao hoặc quản trị rủi ro.',
        challengesAndCautions: 'Cuộc đời có nhiều bước ngoặt thăng trầm; cần học chữ "Nhẫn" và chuẩn bị nguồn lực tài chính phòng bị vững vàng.',
        directConclusion: 'Ý NGHĨA BẢN MỆNH CỐT TỬ: Người làm nên nghiệp lớn từ sóng gió, càng gặp khó khăn bản lĩnh càng phi thường, lập nên kỳ tích hiển hách.',
      };
    }

    // Mặc định hoặc Vô Chính Diệu
    return {
      verdictTitle: majors.length === 0
        ? 'MỆNH CÁCH "HƯ LINH THÍCH ỨNG" · UYỂN CHUYỂN MƯỢN LỰC THỜI THẾ'
        : 'MỆNH CÁCH BẢN THÂN · CỐT CÁCH TRUNG CHÍNH KHỞI SẮC',
      temperament: 'Linh hoạt, nhạy bén với sự thay đổi của môi trường, có khả năng dung nạp nhiều quan điểm và dễ dàng thích nghi với thời cuộc.',
      strengthsAndCareer: 'Môi giới, kết nối đối tác, ngoại giao, tư vấn trung gian, dịch vụ đa ngành và phát triển kinh doanh.',
      challengesAndCautions: 'Cần tìm cho mình một người thầy hoặc hệ giá trị vững chắc làm kim chỉ nam để không bị chao đảo theo hoàn cảnh.',
      directConclusion: 'Ý NGHĨA BẢN MỆNH CỐT TỬ: Đương số biết mượn sức gió để đẩy thuyền, khéo léo biến nguồn lực bên ngoài thành thành tựu của chính mình.',
    };
  }

  // ─── CÁC CUNG VỊ KHÁC ───
  if (pName === '夫妻') {
    return {
      verdictTitle: 'DUYÊN NỢ HÔN NHÂN & HÒA HỢP BẠN ĐỜI',
      temperament: 'Cung Phu Thê phản ánh nhân duyên, phong thái và tính cách của người phối ngẫu cũng như mức độ tương thích trong đời sống gia đạo.',
      strengthsAndCareer: 'Bạn đời là người có cá tính độc lập, có năng lực chuyên môn riêng, hỗ trợ đắc lực cho con đường phát triển của đương số.',
      challengesAndCautions: hasTriet || shas.length > 0 || hasHoaKy
        ? 'Có dấu hiệu khảo nghiệm tình cảm: Nên kết hôn muộn (sau 28-30 tuổi) hoặc trải qua một vài mối tình thời trẻ để chín chắn hơn, giúp hôn nhân sau này trăm năm bền vững.'
        : 'Cần lắng nghe và tôn trọng không gian riêng tư của nhau, tránh áp đặt suy nghĩ cá nhân.',
      directConclusion: 'Ý NGHĨA CUNG PHU THÊ: Vợ chồng cùng chung hoạn nạn mới thấu hiểu chân tình; càng đồng lòng chia sẻ thì gia đạo càng hưng vượng.',
    };
  }

  if (pName === '官禄') {
    return {
      verdictTitle: 'CÔNG DANH SỰ NGHIỆP & ĐƯỜNG TIẾN THÂN',
      temperament: 'Phản ánh chí hướng sự nghiệp, phong cách làm việc và vị trí xã hội của đương số trong cuộc đời.',
      strengthsAndCareer: 'Năng lực chuyên môn vững vàng, có tinh thần trách nhiệm cao, thích hợp với các vị trí quản lý hoặc chuyên gia nòng cốt.',
      challengesAndCautions: 'Tránh nôn nóng nhảy việc khi chưa chuẩn bị đủ nguồn lực; cần tích lũy quan hệ tốt với cấp trên và cộng sự.',
      directConclusion: 'Ý NGHĨA CUNG QUAN LỘC: Sự nghiệp phát triển bền vững theo từng nấc thang, nỗ lực phấn đấu ắt gặt hái thành tựu danh giá.',
    };
  }

  if (pName === '财帛') {
    return {
      verdictTitle: 'TÀI LỘC VƯỢNG TƯỚNG & DÒNG TIỀN KINH DOANH',
      temperament: 'Phản ánh năng lực tài chính, phương thức kiếm tiền và mức độ giữ gìn của cải của đương số.',
      strengthsAndCareer: 'Dòng tiền có sự lưu chuyển sinh lời, thích hợp phát triển các kênh thu nhập từ kỹ năng chuyên môn và đầu tư bền vững.',
      challengesAndCautions: 'Cần quản lý rủi ro chặt chẽ, tránh đầu cơ mạo hiểm vào những kênh không am hiểu.',
      directConclusion: 'Ý NGHĨA CUNG TÀI BẠCH: Tiền tài tích lũy từ bàn tay và khối óc, càng biết tái đầu tư hợp lý thì tài khố càng sung túc.',
    };
  }

  if (pName === '田宅') {
    return {
      verdictTitle: 'BẤT ĐỘNG SẢN & CƠ NGHIỆP ĐIỀN SẢN',
      temperament: 'Phản ánh năng lực tích lũy tài sản cố định, nhà đất, không gian sống và phong thủy gia trạch.',
      strengthsAndCareer: 'Có duyên sở hữu nhà đất riêng, tích lũy điền sản làm của để dành vững chắc cho hậu thế.',
      challengesAndCautions: 'Khi mua bán giao dịch bất động sản cần rà soát kỹ lưỡng giấy tờ pháp lý và quy hoạch.',
      directConclusion: 'Ý NGHĨA CUNG ĐIỀN TRẠCH: Đất đai nhà cửa là bến đỗ bình an, càng về sau càng gia tăng giá trị tài sản cố định.',
    };
  }

  if (pName === '迁移') {
    return {
      verdictTitle: 'XUẤT NGOẠI & QUAN HỆ MÔI TRƯỜNG NGOÀI',
      temperament: 'Phản ánh sự may mắn khi đi xa quê hương, hoạt động ngoại giao và sự tương trợ của môi trường xã hội.',
      strengthsAndCareer: 'Càng ra ngoài giao thiệp càng gặp nhiều quý nhân, có duyên công tác xa hoặc định cư phát triển ở các thành phố lớn/nước ngoài.',
      challengesAndCautions: 'Khi đi lại đường sá cần chú ý an toàn giao thông và thích ứng nhanh với văn hóa địa phương.',
      directConclusion: 'Ý NGHĨA CUNG THIÊN DI: Động thái hướng ngoại mang lại nhiều bước ngoặt đột phá cho vận mệnh đương số.',
    };
  }

  if (pName === '疾厄') {
    return {
      verdictTitle: 'SỨC KHỎE NGŨ HÀNH & ĐIỀU DƯỠNG THÂN TÂM',
      temperament: 'Phản ánh thể chất tiên thiên và những tạng phủ ngũ hành cần được chú trọng bảo dưỡng trong đời sống.',
      strengthsAndCareer: 'Thể trạng nhìn chung có sức đề kháng tự nhiên tốt nếu duy trì lối sống lành mạnh.',
      challengesAndCautions: 'Cần chú ý cân bằng giữa làm việc và nghỉ ngơi, tránh lao lực kéo dài ảnh hưởng hệ thần kinh và tiêu hóa.',
      directConclusion: 'Ý NGHĨA CUNG TẬT ÁCH: Thân an thì tâm mới định, dưỡng sinh điều độ là chìa khóa thọ mạng trường cửu.',
    };
  }

  // Cung vị chung
  return {
    verdictTitle: `LUẬN ĐOÁN CUNG ${getPalaceName(palace.name).vi.toUpperCase()}`,
    temperament: 'Cung vị mang năng lượng cát tường hài hòa, tương tác tích cực với toàn bộ bố cục lá số.',
    strengthsAndCareer: 'Phát huy tinh thần hợp tác, kết nối hài hòa các mối quan hệ nhân duyên.',
    challengesAndCautions: 'Cần duy trì tâm thế khiêm nhường, dĩ hòa vi quý để giữ trọn vẹn phúc khí.',
    directConclusion: `Ý NGHĨA CỐT TỬ: Cung ${getPalaceName(palace.name).vi} đóng góp vào sự vẹn toàn của cuộc đời đương số, thuận thời hành sự ắt an khang.`,
  };
}

/**
 * Luận giải chi tiết một Cung vị cụ thể trên lá số Tử Vi (chuẩn phái Thiên Kỷ Nghê Hải Hà)
 */
export function generatePalaceAnalysis(palace: Palace, chart: ZiweiChart): {
  palaceNameVi: string;
  ganzhiVi: string;
  roleDescription: string;
  isDaXian: boolean;
  daXianText?: string;
  majorStarsText: string;
  luckyStarsText: string;
  shaStarsText: string;
  sanFangText: string;
  advice: string;
  coreVerdict: PalaceCoreVerdict;
} {
  const palaceInfo = getPalaceName(palace.name);
  const ganzhiInfo = getGanzhiName(palace.stem, palace.branch);
  const palaceNameVi = palaceInfo.vi;

  // 1. Ý nghĩa và vai trò cung vị
  const PALACE_ROLES: Record<string, string> = {
    '命宫': 'Cung Mệnh là hạt nhân tiên thiên của sinh mệnh, chủ về cốt cách, tính tình bẩm sinh, tài năng tiềm ẩn, ngoại hình và vận mệnh thời tiền vận (1–30 tuổi). Xem Mệnh là xem cái "gốc" của toàn bộ đời người.',
    '夫妻': 'Cung Phu Thê chủ quản đường tình duyên, duyên nợ hôn nhân, tính tình và diện mạo người bạn đời, mức độ hòa hợp gia đạo, và thời điểm thành gia lập thất.',
    '兄弟': 'Cung Huynh Đệ chủ về tình cảm anh chị em ruột thịt trong nhà, bạn bè tri kỷ chí cốt và các đối tác đồng cam cộng khổ cùng khởi nghiệp.',
    '子女': 'Cung Tử Tức chủ về con cái, số lượng con, nhân duyên cha mẹ với con, tính cách năng khiếu của con cái và phúc lộc phụ dưỡng về sau.',
    '财帛': 'Cung Tài Bạch chủ về tiền tài, dòng tiền lưu chuyển, phương thức kiếm tiền, năng lực quản lý chi tiêu và mức độ thụ hưởng tài lộc của bản thân.',
    '疾厄': 'Cung Tật Ách chủ về sức khỏe, thể chất, những tạng phủ ngũ hành dễ suy nhược hoặc nhạy cảm bệnh tật, cùng những tai ách cần phòng ngừa.',
    '迁移': 'Cung Thiên Di chủ về hoạt động ngoại giao, xuất ngoại, đi xa, môi trường xã hội bên ngoài và cơ hội quý nhân nâng đỡ khi rời xa quê hương.',
    '交友': 'Cung Giao Hữu (Nô Bộc) chủ về bạn bè xã giao, cấp dưới, đồng nghiệp, cộng sự hợp tác và sự tương trợ của mạng lưới quan hệ xã hội.',
    '奴仆': 'Cung Giao Hữu (Nô Bộc) chủ về bạn bè xã giao, cấp dưới, đồng nghiệp, cộng sự hợp tác và sự tương trợ của mạng lưới quan hệ xã hội.',
    '官禄': 'Cung Quan Lộc chủ về học vấn, công danh, sự nghiệp, đường tiến thân, chức vụ quyền hạn và lĩnh vực chuyên môn phù hợp nhất trong đời.',
    '田宅': 'Cung Điền Trạch chủ về nhà cửa, đất đai, bất động sản, cơ nghiệp tổ phụ để lại và năng lực tích lũy tài sản cố định bền vững.',
    '福德': 'Cung Phúc Đức chủ về đời sống tinh thần, tư tưởng nội tâm, phúc đức tổ tiên, tuổi thọ, thú vui an lạc và nghiệp quả của đời người.',
    '父母': 'Cung Phụ Mẫu chủ về cha mẹ, phúc ấm tiền nhân che chở, sự dạy dỗ gia phong và mối liên hệ với các bậc trưởng bối, cấp trên.',
  };

  const roleDescription = PALACE_ROLES[palace.name] || 'Cung vị phản ánh một phương diện trọng yếu trong cuộc đời đương số.';

  // 2. Đại hạn
  const isDaXian = !!palace.isCurrentDaXian;
  let daXianText: string | undefined;
  if (isDaXian && palace.daXianAge) {
    daXianText = `Hiện tại bạn đang ở độ tuổi ${chart.currentAge} tuổi, nằm trọn trong giai đoạn Đại Hạn 10 năm từ ${palace.daXianAge[0]} đến ${palace.daXianAge[1]} tuổi đóng tại Cung ${palaceNameVi}. Theo danh sư Nghê Hải Hà, trong 10 năm này, Cung ${palaceNameVi} sẽ trở thành "Cung Mệnh lâm thời". Toàn bộ các cơ hội, bước ngoặt và biến động lớn nhất của bạn trong độ tuổi này đều chịu ảnh hưởng trực tiếp từ cung này!`;
  }

  // 3. Chính tinh
  const majors = palace.stars.filter(s => s.type === 'major');
  let majorStarsText = '';
  if (majors.length === 0) {
    const oppBranch = (palace.branch + 6) % 12;
    const oppPalace = chart.palaces.find(p => p.branch === oppBranch);
    const oppName = oppPalace ? getPalaceName(oppPalace.name).vi : '';
    majorStarsText = `Cung ${palaceNameVi} Vô Chính Diệu (không có chính tinh toạ thủ). Theo khẩu quyết Thiên Kỷ của thầy Nghê Hải Hà: "Cung Vô Chính Diệu ắt phải mượn sao của Đối Cung để luận đoán". Bản cung sẽ mượn toàn bộ năng lượng từ Cung ${oppName} xung chiếu sang, tính cách linh hoạt, dễ thích nghi và cần mượn lực từ môi trường bên ngoài để thành công.`;
  } else {
    majorStarsText = majors.map(s => {
      const sInfo = getStarName(s.name);
      const bInfo = s.brightnessRaw ? `[${getBrightnessVi(s.brightnessRaw)}]` : '';
      const hInfo = s.siHua ? `(${getSiHua(s.siHua).vi})` : '';
      return `Sao **${sInfo.vi}** ${bInfo} ${hInfo}`.trim();
    }).join(', ');
  }

  // 4. Cát tinh & Sát tinh
  const luckies = palace.stars.filter(s => s.type === 'lucky');
  const shas = palace.stars.filter(s => s.type === 'sha');

  const luckyStarsText = luckies.length > 0
    ? luckies.map(s => getStarName(s.name).vi).join(', ')
    : 'Không có cát tinh phụ tá nổi bật tại bản cung.';

  const shaStarsText = shas.length > 0
    ? shas.map(s => getStarName(s.name).vi).join(', ')
    : 'Không có sát tinh hung hiểm đóng tại bản cung.';

  // 5. Tam phương tứ chính
  const oppBranch = (palace.branch + 6) % 12;
  const trine1Branch = (palace.branch + 4) % 12;
  const trine2Branch = (palace.branch + 8) % 12;

  const oppP = chart.palaces.find(p => p.branch === oppBranch);
  const trine1P = chart.palaces.find(p => p.branch === trine1Branch);
  const trine2P = chart.palaces.find(p => p.branch === trine2Branch);

  const formatPBrief = (p?: Palace) => {
    if (!p) return '';
    const pName = getPalaceName(p.name).vi;
    const mStars = p.stars.filter(s => s.type === 'major').map(s => getStarName(s.name).vi).join(' ');
    return `Cung ${pName} (${mStars || 'Vô Chính Diệu'})`;
  };

  const sanFangText = `Đối cung xung chiếu: ${formatPBrief(oppP)} · Tam hợp hội tụ: ${formatPBrief(trine1P)} và ${formatPBrief(trine2P)}.`;

  // 6. Lời khuyên
  let advice = '';
  if (palace.name === '夫妻') {
    advice = 'Đối với Cung Phu Thê: Trong giao tiếp tình cảm, cần coi trọng sự đồng điệu tâm hồn và tôn trọng tự do cá nhân của nhau. Nếu có sát tinh (Đà La, Linh Tinh, Cô Thần), nên kết hôn muộn hoặc trải qua một vài khảo nghiệm thời trẻ để hôn nhân sau này viên mãn, trăm năm hạnh phúc.';
  } else if (palace.name === '命宫') {
    advice = 'Đối với Cung Mệnh: Cốt cách là nền móng của thành bại. Giữ vững tâm niệm lương thiện, rèn luyện chuyên môn sắt đá, biết rõ điểm mạnh điểm yếu của mình để tự tay kiến tạo vận mệnh.';
  } else if (palace.name === '官禄') {
    advice = 'Đối với Cung Quan Lộc: Sự nghiệp cần bền chí, không nên nóng vội nhảy việc khi chưa chuẩn bị đủ nguồn lực. Mượn sức mạnh đồng nghiệp và cấp trên để từng bước thăng tiến vững chắc.';
  } else if (palace.name === '财帛') {
    advice = 'Đối với Cung Tài Bạch: Tiền bạc nên đi theo con đường chính đạo, tích lũy đều đặn, chuyển hóa vào các tài sản cố định bền vững, tránh đầu cơ mạo hiểm.';
  } else {
    advice = 'Theo đạo lý Thiên Kỷ Nghê Hải Hà: "Số mệnh chưa bao giờ là định đoạt tuyệt đối. Người hiểu mệnh để hành xử thuận thời, biến nguy thành an, dưỡng tâm lập mệnh".';
  }

  // 7. Tổng hợp Kết luận giải đoán cốt lõi độc bản
  const coreVerdict = synthesizePalaceVerdict(palace, chart);

  return {
    palaceNameVi,
    ganzhiVi: ganzhiInfo.vi,
    roleDescription,
    isDaXian,
    daXianText,
    majorStarsText,
    luckyStarsText,
    shaStarsText,
    sanFangText,
    advice,
    coreVerdict,
  };
}
