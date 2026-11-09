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
  '君臣庆会': { vi: 'Quân Thần Khánh Hội', zh: '君臣庆会', note: 'Vua tôi sum vầy, đại quý cách' },
  '紫府同宫': { vi: 'Tử Phủ Đồng Cung', zh: '紫府同宫', note: 'Đế tinh và Tài khố cùng chiếu, phú quý song toàn' },
  '府相朝垣': { vi: 'Phủ Tướng Triều Viên', zh: '府相朝垣', note: 'Thiên Phủ Thiên Tướng triều bái Mệnh, y lộc dồi dào' },
  '机月同梁': { vi: 'Cơ Nguyệt Đồng Lương', zh: '机月同梁', note: 'Mưu lược văn chức, phò tá đắc lực' },
  '机月同梁三星会': { vi: 'Cơ Nguyệt Đồng Lương Tam Tinh', zh: '机月同梁三星会', note: 'Ba sao hội tụ, văn tài thao lược' },
  '日月并明': { vi: 'Nhật Nguyệt Tịnh Minh', zh: '日月并明', note: 'Mặt trời mặt trăng cùng sáng soi rực rỡ' },
  '日月同宫': { vi: 'Nhật Nguyệt Đồng Cung', zh: '日月同宫', note: 'Thái Dương Thái Âm đồng tọa Sửu Mùi' },
  '日月夹命': { vi: 'Nhật Nguyệt Giáp Mệnh', zh: '日月夹命', note: 'Nhật Nguyệt kẹp hai bên Mệnh, quý khí tiềm ẩn' },
  '阳梁昌禄': { vi: 'Dương Lương Xương Lộc', zh: '阳梁昌禄', note: 'Khoa bảng đỗ đạt đầu bảng, công danh rực rỡ' },
  '石中隐玉': { vi: 'Thạch Trung Ẩn Ngọc', zh: '石中隐玉', note: 'Ngọc ẩn trong đá, hậu vận phát tiết hiển vinh' },
  '杀破狼':   { vi: 'Sát Phá Tham', zh: '杀破狼', note: 'Khai sơn phá thạch, biến động xoay chuyển cờ thế' },
  '武贪格':   { vi: 'Vũ Tham Cách', zh: '武贪格', note: 'Tiền bần hậu phú, trung niên đại phát tài danh' },
  '巨日同宫': { vi: 'Cự Nhật Đồng Cung', zh: '巨日同宫', note: 'Cự Môn Thái Dương đồng tọa Dần Thân, danh vang hải ngoại' },
  '三奇加会': { vi: 'Tam Kỳ Gia Hội', zh: '三奇加会', note: 'Khoa Quyền Lộc hội tụ Tam Phương, chí tôn kỳ cách' },
  '双禄朝垣': { vi: 'Song Lộc Triều Viên', zh: '双禄朝垣', note: 'Lộc Tồn Hóa Lộc triều mệnh, tài nguyên cuồn cuộn' },
  '辅弼同会': { vi: 'Phụ Bật Đồng Hội', zh: '辅弼同会', note: 'Tả Phụ Hữu Bật nâng đỡ, quý nhân trợ lực không ngừng' },
  '辅弼夹命': { vi: 'Phụ Bật Giáp Mệnh', zh: '辅弼夹命', note: 'Tả Phụ Hữu Bật kẹp Mệnh, vạn người nâng đỡ' },
  '昌曲夹命': { vi: 'Xương Khúc Giáp Mệnh', zh: '昌曲夹命', note: 'Văn chương bác nhã, khí chất nho nhã hơn người' },
  '魁钺同会': { vi: 'Khôi Việt Đồng Hội', zh: '魁钺同会', note: 'Thiên Khôi Thiên Việt chiếu mệnh, gặp hung hóa cát' },
  '魁钺夹命': { vi: 'Khôi Việt Giáp Mệnh', zh: '魁钺夹命', note: 'Thiên ất quý nhân phò tá hai bên' },
  '明珠出海': { vi: 'Minh Châu Xuất Hải', zh: '明珠出海', note: 'Viên ngọc sáng nhô lên mặt biển, tài hoa cái thế' },
  '天同天梁格': { vi: 'Thiên Đồng Thiên Lương', zh: '天同天梁格', note: 'Phúc thọ song toàn, bình an hòa nhã' },
  '廉贞天相格': { vi: 'Liêm Trinh Thiên Tướng', zh: '廉贞天相格', note: 'Cương nhu phối hợp, tài năng quản trị kiệt xuất' },
  '武曲七杀': { vi: 'Vũ Khúc Thất Sát', zh: '武曲七杀', note: 'Anh hùng quyết đoán, tay trắng lập nghiệp' },
  '紫微入命': { vi: 'Tử Vi Nhập Mệnh', zh: '紫微入命', note: 'Đế tinh tọa Mệnh, phong thái vương giả lãnh đạo' },
  '化禄入财': { vi: 'Hóa Lộc Nhập Tài', zh: '化禄入财', note: 'Lộc vào cung Tài, tiền của tự nhiên đến tay' },
  '化权入官': { vi: 'Hóa Quyền Nhập Quan', zh: '化权入官', note: 'Quyền vào cung Quan, nắm đại quyền và vị thế vững' },
  '科权双会': { vi: 'Khoa Quyền Song Hội', zh: '科权双会', note: 'Vừa có tài học danh tiếng vừa có thực quyền' },
  '马头带箭': { vi: 'Mã Đầu Đới Tiễn', zh: '马头带箭', note: 'Kình Dương tại Ngọ, trấn giữ biên cương lập đại công' },
  '羊陀夹忌': { vi: 'Kình Đà Giáp Kỵ', zh: '羊陀夹忌', note: 'Kình Dương Đà La kẹp Hóa Kỵ, hung hiểm cần phòng bị' },
  '火铃夹命': { vi: 'Hỏa Linh Giáp Mệnh', zh: '火铃夹命', note: 'Hỏa Tinh Linh Tinh kẹp Mệnh, thử thách rèn luyện sóng gió' },
  '空劫夹命': { vi: 'Không Kiếp Giáp Mệnh', zh: '空劫夹命', note: 'Địa Không Địa Kiếp kẹp Mệnh, thăng trầm bất định' },
  '铃昌陀武': { vi: 'Linh Xương Đà Vũ', zh: '铃昌陀武', note: 'Bốn sao hung hội, hạn đến cần cẩn trọng sông nước tài chính' },
  '巨火羊':   { vi: 'Cự Hỏa Dương', zh: '巨火羊', note: 'Cự Môn Hỏa Tinh Kình Dương, đề phòng thị phi tai ách' },
  '廉杀羊':   { vi: 'Liêm Sát Dương', zh: '廉杀羊', note: 'Liêm Trinh Thất Sát Kình Dương, dễ gặp trắc trở tai biến' },
};

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
  return PATTERN_VI[zhName] || { vi: zhName, zh: zhName };
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
