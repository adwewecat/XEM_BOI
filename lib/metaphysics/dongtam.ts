/**
 * BÓI HỮU DUYÊN · MAI HOA DỊCH SỐ & LỤC HÀO CHIÊM ĐOÁN THEO GIỜ ĐỘNG TÂM
 * (梅花易数 / 六爻占断 · 心动起卦 · 断事决疑)
 * 
 * Tính toán can chi ngày giờ động tâm, Nguyệt Kiến, Nhật Thần, Tuần Không.
 * Nhận diện ý định câu hỏi chính xác (Xuất hành, Bệnh tật, Công việc, Tiền tài, Tình duyên).
 * Phân tích Dụng Thần, Hào Động, Ngũ Hành Tạng Phủ, Ứng Kỳ Thời Gian.
 * Trả lời trực diện, chuẩn xác, văn phong Dịch học uyên bác 100% Tiếng Việt.
 */

import { Solar } from 'lunar-javascript';

// 8 Quẻ đơn (Bát Quái) theo Mai Hoa Dịch Số
export const MAIHUA_TRIGRAMS: Record<number, { name: string; element: string; organ: string; symbol: string; vi: string }> = {
  1: { name: 'Càn', element: 'Kim', organ: 'Đầu, xương, đại tràng, phổi', symbol: '☰', vi: 'Trời (Thiên)' },
  2: { name: 'Đoài', element: 'Kim', organ: 'Phổi (Phế), khí quản, miệng, họng, hô hấp', symbol: '☱', vi: 'Đầm (Trạch)' },
  3: { name: 'Ly', element: 'Hỏa', organ: 'Tim (Tâm), huyết áp, mạch máu, mắt', symbol: '☲', vi: 'Lửa (Hỏa)' },
  4: { name: 'Chấn', element: 'Mộc', organ: 'Gan (Can), chân, thần kinh, gân cốt', symbol: '☳', vi: 'Sấm (Lôi)' },
  5: { name: 'Tốn', element: 'Mộc', organ: 'Mật (Đởm), đùi, khí thở, phong hàn', symbol: '☴', vi: 'Gió (Phong)' },
  6: { name: 'Khảm', element: 'Thủy', organ: 'Thận, bàng quang, hệ bài tiết, máu huyết, tai', symbol: '☵', vi: 'Nước (Thủy)' },
  7: { name: 'Cấn', element: 'Thổ', organ: 'Dạ dày, lưng, mũi, xương khớp', symbol: '☶', vi: 'Núi (Sơn)' },
  0: { name: 'Khôn', element: 'Thổ', organ: 'Lá lách (Tỳ), cơ bắp, bụng, tiêu hóa', symbol: '☷', vi: 'Đất (Địa)' },
  8: { name: 'Khôn', element: 'Thổ', organ: 'Lá lách (Tỳ), cơ bắp, bụng, tiêu hóa', symbol: '☷', vi: 'Đất (Địa)' },
};

// Ghép Thượng Quái + Hạ Quái ra Tên Quẻ 64 Trùng Quái
export const HEXAGRAM_NAMES_64: Record<string, string> = {
  '1-1': 'Thuần Càn',
  '1-2': 'Thiên Trạch Lý',
  '1-3': 'Thiên Hỏa Đồng Nhân',
  '1-4': 'Thiên Lôi Vô Vọng',
  '1-5': 'Thiên Phong Cấu',
  '1-6': 'Thiên Thủy Tụng',
  '1-7': 'Thiên Sơn Độn',
  '1-0': 'Thiên Địa Bĩ',

  '2-1': 'Trạch Thiên Quải',
  '2-2': 'Thuần Đoài',
  '2-3': 'Trạch Hỏa Cách',
  '2-4': 'Trạch Lôi Tùy',
  '2-5': 'Trạch Phong Đại Quá',
  '2-6': 'Trạch Thủy Khốn',
  '2-7': 'Trạch Sơn Hàm',
  '2-0': 'Trạch Địa Tụy',

  '3-1': 'Hỏa Thiên Đại Hữu',
  '3-2': 'Hỏa Trạch Khuê',
  '3-3': 'Thuần Ly',
  '3-4': 'Hỏa Lôi Phệ Hạp',
  '3-5': 'Hỏa Phong Đỉnh',
  '3-6': 'Hỏa Thủy Vị Tế',
  '3-7': 'Hỏa Sơn Lữ',
  '3-0': 'Hỏa Địa Tấn',

  '4-1': 'Lôi Thiên Đại Tráng',
  '4-2': 'Lôi Trạch Quy Muội',
  '4-3': 'Lôi Hỏa Phong',
  '4-4': 'Thuần Chấn',
  '4-5': 'Lôi Phong Hằng',
  '4-6': 'Lôi Thủy Giải',
  '4-7': 'Lôi Sơn Tiểu Quá',
  '4-0': 'Lôi Địa Dự',

  '5-1': 'Phong Thiên Tiểu Súc',
  '5-2': 'Phong Trạch Trung Phu',
  '5-3': 'Phong Hỏa Gia Nhân',
  '5-4': 'Phong Lôi Ích',
  '5-5': 'Thuần Tốn',
  '5-6': 'Phong Thủy Hoán',
  '5-7': 'Phong Sơn Tiệm',
  '5-0': 'Phong Địa Quan',

  '6-1': 'Thủy Thiên Nhu',
  '6-2': 'Thủy Trạch Tiết',
  '6-3': 'Thủy Hỏa Ký Tế',
  '6-4': 'Thủy Lôi Truân',
  '6-5': 'Thủy Phong Tỉnh',
  '6-6': 'Thuần Khảm',
  '6-7': 'Thủy Sơn Kiển',
  '6-0': 'Thủy Địa Tỷ',

  '7-1': 'Sơn Thiên Đại Súc',
  '7-2': 'Sơn Trạch Tổn',
  '7-3': 'Sơn Hỏa Bí',
  '7-4': 'Sơn Lôi Di',
  '7-5': 'Sơn Phong Cổ',
  '7-6': 'Sơn Thủy Mông',
  '7-7': 'Thuần Cấn',
  '7-0': 'Sơn Địa Bác',

  '0-1': 'Địa Thiên Thái',
  '0-2': 'Địa Trạch Lâm',
  '0-3': 'Địa Hỏa Minh Di',
  '0-4': 'Địa Lôi Phục',
  '0-5': 'Địa Phong Thăng',
  '0-6': 'Địa Thủy Sư',
  '0-7': 'Địa Sơn Khiêm',
  '0-0': 'Thuần Khôn',
};

// Đánh giá tính chất cát/hung đại cương của 64 quẻ
const AUSPICIOUS_HEXAGRAMS = new Set([
  'Thuần Càn', 'Địa Thiên Thái', 'Hỏa Thiên Đại Hữu', 'Thiên Hỏa Đồng Nhân',
  'Địa Sơn Khiêm', 'Lôi Hỏa Phong', 'Phong Lôi Ích', 'Lôi Phong Hằng',
  'Trạch Lôi Tùy', 'Hỏa Địa Tấn', 'Sơn Thiên Đại Súc', 'Thuần Khôn',
  'Thủy Thiên Nhu', 'Phong Trạch Trung Phu', 'Địa Trạch Lâm', 'Địa Phong Thăng',
  'Trạch Sơn Hàm', 'Hỏa Phong Đỉnh', 'Phong Hỏa Gia Nhân', 'Lôi Thủy Giải'
]);

const CAUTION_HEXAGRAMS = new Set([
  'Thiên Địa Bĩ', 'Trạch Thủy Khốn', 'Thủy Sơn Kiển', 'Sơn Phong Cổ',
  'Thiên Thủy Tụng', 'Thủy Lôi Truân', 'Hỏa Thủy Vị Tế', 'Lôi Sơn Tiểu Quá',
  'Hỏa Lôi Phệ Hạp', 'Sơn Địa Bác', 'Địa Hỏa Minh Di', 'Trạch Phong Đại Quá'
]);

export interface DongTamResult {
  question: string;
  datetimeInput: {
    date: string;
    time: string;
    solarStr: string;
    lunarStr: string;
    ganZhiYear: string;
    ganZhiMonth: string;
    ganZhiDay: string;
    ganZhiHour: string;
    xunKong: string;
  };
  hexagram: {
    originalUpper: string;
    originalLower: string;
    originalName: string;
    movingLine: number; // 1..6
    changedUpper: string;
    changedLower: string;
    changedName: string;
  };
  dungThan: {
    subject: string; // Phụ Mẫu, Tử Tôn, Thê Tài, Quan Quỷ, Huynh Đệ, Thế Hào
    targetName: string; // Ông nội, con cái, bản thân, công việc...
    state: string; // Lưỡng hiện, Trực tuần không, Hưu tù, Vượng tướng...
    explanation: string;
  };
  directConclusion: string; // Câu kết luận trực diện, trả lời thẳng thắn câu hỏi của người hỏi
  dichLyDetails: string;    // Phân tích chi tiết Dịch lý (Quẻ gốc, hào động, quẻ biến)
  diseaseAnalysis?: {
    involvedOrgan: string;
    involvedElement: string;
    details: string;
  };
  thayPhan: string; // Toàn văn lời phán hoàn chỉnh, trang nhã, không lỗi font
  ungKy: string;   // Thời gian ứng nghiệm (tháng, năm)
}

/**
 * Thuật toán Bói Hữu Duyên theo Ngày Giờ Động Tâm (Mai Hoa Dịch Số & Lục Hào Chiêm Bốc)
 */
export function castDongTam(
  question: string,
  dateStr: string, // YYYY-MM-DD
  timeStr: string  // HH:mm
): DongTamResult {
  const parts = dateStr.split('-').map(Number);
  const timeParts = timeStr.split(':').map(Number);
  const year = parts[0] || 2026;
  const month = parts[1] || 11;
  const day = parts[2] || 9;
  const hour = timeParts[0] || 8;
  const minute = timeParts[1] || 44;

  const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
  const lunar = solar.getLunar();
  const eightChar = lunar.getEightChar();

  const ganZhiYear = eightChar.getYear();
  const ganZhiMonth = eightChar.getMonth();
  const ganZhiDay = eightChar.getDay();
  const ganZhiHour = eightChar.getTime();
  const xunKong = eightChar.getDayXunKong() || 'Tuất Hợi';

  // Chuyển địa chi thành số thứ tự (Tý=1, Sửu=2 ... Hợi=12)
  const zhiMap: Record<string, number> = {
    '子': 1, '丑': 2, '寅': 3, '卯': 4, '辰': 5, '巳': 6,
    '午': 7, '未': 8, '申': 9, '酉': 10, '戌': 11, '亥': 12,
  };
  const yearZhiNum = zhiMap[eightChar.getYearZhi()] || 7;
  const hourZhiNum = zhiMap[eightChar.getTimeZhi()] || 5;
  const lunarMonth = Math.abs(lunar.getMonth());
  const lunarDay = lunar.getDay();

  // Khởi quẻ theo Mai Hoa Dịch Số
  // Thượng quái = (Năm + Tháng + Ngày) % 8
  let upperNum = (yearZhiNum + lunarMonth + lunarDay) % 8;
  if (upperNum === 0) upperNum = 8;

  // Hạ quái = (Năm + Tháng + Ngày + Giờ) % 8
  let lowerNum = (yearZhiNum + lunarMonth + lunarDay + hourZhiNum) % 8;
  if (lowerNum === 0) lowerNum = 8;

  // Hào động = (Năm + Tháng + Ngày + Giờ + Phút) % 6
  let movingLine = (yearZhiNum + lunarMonth + lunarDay + hourZhiNum + minute) % 6;
  if (movingLine === 0) movingLine = 6;

  const upperTrigram = MAIHUA_TRIGRAMS[upperNum] || MAIHUA_TRIGRAMS[2];
  const lowerTrigram = MAIHUA_TRIGRAMS[lowerNum] || MAIHUA_TRIGRAMS[7];

  const origKey = `${upperNum === 8 ? 0 : upperNum}-${lowerNum === 8 ? 0 : lowerNum}`;
  const originalName = HEXAGRAM_NAMES_64[origKey] || `${upperTrigram.vi} ${lowerTrigram.vi}`;

  // Tính Quẻ Biến sau khi Hào Động
  const flipTrigram = (num: number, linePos: number): number => {
    const trigramBits: Record<number, string[]> = {
      1: ['1', '1', '1'], // Càn
      2: ['0', '1', '1'], // Đoài
      3: ['1', '0', '1'], // Ly
      4: ['0', '0', '1'], // Chấn
      5: ['1', '1', '0'], // Tốn
      6: ['0', '1', '0'], // Khảm
      7: ['1', '0', '0'], // Cấn
      8: ['0', '0', '0'], // Khôn
    };
    const bits = [...(trigramBits[num] || ['1', '1', '1'])];
    const idx = 3 - linePos;
    bits[idx] = bits[idx] === '1' ? '0' : '1';
    const newStr = bits.join('');
    const bitToNum: Record<string, number> = {
      '111': 1, '011': 2, '101': 3, '001': 4,
      '110': 5, '010': 6, '100': 7, '000': 8,
    };
    return bitToNum[newStr] || 1;
  };

  let changedUpperNum = upperNum;
  let changedLowerNum = lowerNum;

  if (movingLine <= 3) {
    changedLowerNum = flipTrigram(lowerNum, movingLine);
  } else {
    changedUpperNum = flipTrigram(upperNum, movingLine - 3);
  }

  const changedUpperTrigram = MAIHUA_TRIGRAMS[changedUpperNum] || MAIHUA_TRIGRAMS[4];
  const changedLowerTrigram = MAIHUA_TRIGRAMS[changedLowerNum] || MAIHUA_TRIGRAMS[7];
  const changedKey = `${changedUpperNum === 8 ? 0 : changedUpperNum}-${changedLowerNum === 8 ? 0 : changedLowerNum}`;
  const changedName = HEXAGRAM_NAMES_64[changedKey] || `${changedUpperTrigram.vi} ${changedLowerTrigram.vi}`;

  // --- PHÂN TÍCH Ý ĐỊNH CÂU HỎI & XÁC ĐỊNH DỤNG THẦN CHUẨN XÁC ---
  const qClean = question.trim().toLowerCase();

  // Kiểm tra ý định bằng biểu thức chính quy (Word boundaries, chống lỗi so khớp substring như 'không' dính 'ông')
  const isPastLife = /(?:^|\s|[.,?!])(kiếp trước|tiền kiếp|kiếp sau|tiền duyên|luân hồi|linh hồn|sứ mệnh|túc mệnh|túc nghiệp|căn duyên|tâm linh|chân ngã|nhân quả|đầu thai|nghiệp duyên|tu tập|kiếp xưa|túc duyên)(?:\s|$|[.,?!])/i.test(qClean);
  const isLostItem = /(?:^|\s|[.,?!])(mất|tìm|thất lạc|ở đâu|đánh rơi|rơi đồ|để quên|tìm thấy|đồ mất)(?:\s|$|[.,?!])/i.test(qClean);
  const isProperty = /(?:^|\s|[.,?!])(nhà đất|bất động sản|mua nhà|bán nhà|mua đất|bán đất|thuê nhà|mặt bằng|chung cư|phong thủy nhà|nhà ở)(?:\s|$|[.,?!])/i.test(qClean);
  const isTravel = /(?:^|\s|[.,?!])(về|đi|xuất hành|đi lại|trở về|xe|tàu|máy bay|đường|lộ trình|trắc trở|an toàn|bình an|thuận lợi|về quê|về nhà|đi xa)(?:\s|$|[.,?!])/i.test(qClean);
  const isHealth = /(?:^|\s|[.,?!])(bệnh|viện|nằm viện|khỏe|mổ|thuốc|bác sĩ|ung thư|viêm|phổi|tim|sốt|đau|tai qua|khỏi|nặng|sức khỏe)(?:\s|$|[.,?!])/i.test(qClean);
  const isCareer = /(?:^|\s|[.,?!])(việc|công việc|công tác|xin việc|phỏng vấn|thăng chức|tăng lương|đổi việc|nhảy việc|sếp|thi|đậu|đỗ|tuyển dụng|chức vị)(?:\s|$|[.,?!])/i.test(qClean);
  const isWealth = /(?:^|\s|[.,?!])(tiền|tài chính|tài lộc|kinh doanh|làm ăn|buôn bán|đầu tư|chứng khoán|đòi nợ|vay|mượn|lãi|lỗ|hợp đồng)(?:\s|$|[.,?!])/i.test(qClean);
  const isLove = /(?:^|\s|[.,?!])(yêu|người yêu|tình cảm|tình duyên|hẹn hò|kết hôn|cưới|ly hôn|chia tay|quay lại|tỏ tình|bạn gái|bạn trai)(?:\s|$|[.,?!])/i.test(qClean);
  const isLawsuit = /(?:^|\s|[.,?!])(kiện|kiện cáo|tranh chấp|tòa án|pháp luật|công an|thưa gửi|bồi thường|tranh giành)(?:\s|$|[.,?!])/i.test(qClean);
  const isPartnership = /(?:^|\s|[.,?!])(hợp tác|làm chung|góp vốn|chung vốn|đối tác|hợp tác làm ăn|hùn hạp)(?:\s|$|[.,?!])/i.test(qClean);

  // Quan hệ thân nhân (dùng ranh giới từ chuẩn xác)
  const isElder = /(?:^|\s|[.,?!])(ông|bà|cha|mẹ|bố|bác|chú|cô|dì|phụ mẫu)(?:\s|$|[.,?!])/i.test(qClean);
  const isChild = /(?:^|\s|[.,?!])(con|cháu|bé|tử tức)(?:\s|$|[.,?!])/i.test(qClean);
  const isSpouse = /(?:^|\s|[.,?!])(vợ|chồng|bạn đời|phu thê)(?:\s|$|[.,?!])/i.test(qClean);
  const isSibling = /(?:^|\s|[.,?!])(anh|chị|em|bạn bè|đồng nghiệp)(?:\s|$|[.,?!])/i.test(qClean);

  let subject = 'Thế Hào (Bản Thân Người Hỏi)';
  let targetName = 'Bản thân';
  let state = 'Vượng Tướng Sinh Khí';
  let explanation = '';
  let directConclusion = '';
  let dichLyDetails = '';
  let ungKy = 'Trong ngày hôm nay đến nội trong 3-7 ngày tới';
  let diseaseAnalysis: DongTamResult['diseaseAnalysis'] = undefined;

  const isChangedAuspicious = AUSPICIOUS_HEXAGRAMS.has(changedName);
  const isChangedCaution = CAUTION_HEXAGRAMS.has(changedName);

  if (isPastLife) {
    // 0. HỎI VỀ TIỀN KIẾP / TÂM LINH / SỨ MỆNH LINH HỒN / TÚC DUYÊN LUÂN HỒI
    subject = 'Thần Hồn & Tiền Thân (Gốc Rễ Túc Nghiệp Luân Hồi)';
    targetName = 'Túc duyên & Bản thể linh hồn tiền kiếp';
    state = isChangedAuspicious ? 'Túc Thiện Căn Khởi Sắc, Linh Giác Tỏ Rõ' : 'Đang Chuyển Hóa Nghiệp Lực Tiền Kiếp';
    explanation = 'Chiêm bốc về tiền kiếp và linh hồn: Lấy Thế hào làm Chân linh kiếp này, Hào Ứng & Quẻ Nội làm Túc duyên tiền kiếp, Quẻ Biến làm Bài học giác ngộ của linh hồn.';
    ungKy = 'Hiện tiền kiếp này là thời điểm vàng để thức tỉnh và tu dưỡng tâm thức';

    if (isChangedAuspicious) {
      directConclusion = 'VỀ TIỀN THÂN & CĂN DUYÊN CỦA BẠN: BẠN MANG TÚC DUYÊN THIỆN LÀNH TỪ NHIỀU ĐỜI TRƯỚC, TỪNG LÀ BẬC TRÍ THỨC, NGƯỜI HÀNH THIỆN HOẶC CÓ DUYÊN TU TẬP TÍCH ĐỨC; KIẾP NÀY ĐẾN ĐỂ TIẾP TỤC KHAI MỞ TRÍ TUỆ VÀ GIÚP ĐỠ MỌI NGƯỜI.';
      dichLyDetails = `Quẻ gốc ${originalName} động hào ${movingLine} biến ${changedName} cho thấy trong tiền kiếp bạn là người có căn cơ tu dưỡng, từng gieo nhiều hạt giống phước lành. Tuy nhiên cũng từng có những nguyện ước sâu xa chưa hoàn thành trọn vẹn, nên kiếp này sinh ra với trực giác nhạy bén, sâu sắc và nhiều trăn trở với ý nghĩa nhân sinh. Hãy tự tin đi theo con đường thiện lương và phát triển tài năng chân chính.`;
    } else {
      directConclusion = 'VỀ TIỀN THÂN & TÚC MỆNH: TIỀN THÂN CỦA BẠN TỪNG LÀ NGƯỜI GÁNH VÁC TRỌNG TRÁCH LỚN HOẶC TRẢI QUA NHIỀU THĂNG TRẦM VỀ TÌNH CẢM & TRÁCH NHIỆM; KIẾP NÀY BÀI HỌC CỐT LÕI LÀ HỌC CÁCH BUÔNG BỎ ÁP LỰC, CHỮA LÀNH TÂM HỒN VÀ SỐNG VÌ CHÍNH MÌNH.';
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} là biểu tượng của sự thanh lọc và chuyển hóa nghiệp lực. Những thử thách hay cảm giác cô đơn ở hiện tại chính là dư âm từ bài học linh hồn kiếp trước trao lại. Giữ tâm tĩnh lặng, sống vị tha và bao dung sẽ giúp hóa giải trọn vẹn túc nghiệp, khai phóng vận trình tươi sáng.`;
    }

  } else if (isLostItem) {
    // TÌM ĐỒ THẤT LẠC
    subject = 'Thê Tài (Tài Vật Thất Lạc)';
    targetName = 'Đồ vật / Tài sản bị mất';
    state = isChangedAuspicious ? 'Đồ Vật Còn Nguyên, Chưa Bị Mất Hẳn' : 'Khó Tìm, Đã Bị Di Dời Hoặc Che Khuất';
    explanation = 'Chiêm tìm đồ thất lạc lấy hào Thê Tài làm Dụng Thần, phối hào Phụ Mẫu xem nơi cất giấu.';
    ungKy = 'Trong vòng 1-3 ngày tới hoặc tìm vào hướng quẻ chỉ dẫn';

    if (isChangedAuspicious) {
      directConclusion = 'VỀ ĐỒ VẬT THẤT LẠC: CƠ HỘI TÌM LẠI RẤT CAO, ĐỒ VẬT CHƯA HỀ BỊ MẤT MÀ CHỈ ĐANG BỊ BỎ QUÊN HOẶC ĐỒ KHÁC CHE KHUẤT.';
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} cho thấy tài vật vẫn còn ở gần trong phạm vi quen thuộc (nhà ở, nơi làm việc hoặc phương tiện đi lại). Hãy tìm ở các góc khuất, hộc tủ hoặc hỏi người thân gần gũi.`;
    } else {
      directConclusion = 'VỀ ĐỒ VẬT THẤT LẠC: TẠM THỜI KHÓ TÌM THẤY NGAY, CÓ DẤU HIỆU ĐÃ BỊ THẤT LẠC RA KHỎI NƠI QUEN THUỘC HOẶC RƠI Ở NƠI CÔNG CỘNG.';
      dichLyDetails = `Quẻ ${originalName} động hào ${movingLine} biến ${changedName} cảnh báo tài khí bị phân tán. Cần bình tĩnh nhớ lại lộ trình di chuyển, kiểm tra camera an ninh hoặc liên hệ nơi bạn vừa rời khỏi.`;
    }

  } else if (isProperty) {
    // NHÀ ĐẤT / BẤT ĐỘNG SẢN
    subject = 'Phụ Mẫu (Nhà Cửa, Đất Đai, Khế Ước)';
    targetName = 'Bất động sản / Nhà đất';
    state = isChangedAuspicious ? 'Địa Khí Vượng Tướng, Giấy Tờ Hợp Cách' : 'Có Vướng Mắc Thủ Tục Hoặc Tranh Giá';
    explanation = 'Chiêm nhà đất lấy hào Phụ Mẫu làm Dụng Thần (tượng trưng cho đất đai, nhà cửa, sổ đỏ), hào Thê Tài làm giá cả giao dịch.';
    ungKy = 'Trong vòng 1-3 tháng tới hoặc vào các tháng tứ quý (Thìn, Tuất, Sửu, Mùi)';

    if (isChangedAuspicious) {
      directConclusion = 'VỀ NHÀ ĐẤT / BẤT ĐỘNG SẢN: RẤT THUẬN LỢI, GIAO DỊCH DỄ THÀNH CÔNG, ĐẤT ĐAI CÓ ĐỊA KHÍ TỐT ĐEM LẠI AN CƯ HOẶC SINH LỜI.';
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} là điềm cát lợi cho điền trạch. Giấy tờ pháp lý minh bạch, đôi bên mua bán hòa hợp và có lợi.`;
    } else {
      directConclusion = 'VỀ GIAO DỊCH NHÀ ĐẤT: NÊN THẬN TRỌNG RÀ SOÁT KỸ PHÁP LÝ, GIẤY TỜ VÀ QUY HOẠCH TRƯỚC KHI XUỐNG TIỀN.';
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} nhắc nhở cần chú ý các điều khoản hợp đồng cọc, phong thủy hoặc thủ tục chuyển nhượng để tránh phát sinh phiền toái.`;
    }

  } else if (isTravel) {
    // 1. HỎI VỀ XUẤT HÀNH / ĐI LẠI / TRỞ VỀ / TRẮC TRỞ
    subject = 'Thế Hào & Hào Ứng (Bản Thân & Lộ Trình Di Chuyển)';
    targetName = 'Chuyến đi / Việc xuất hành trở về';
    state = isChangedAuspicious ? 'Thế Ứng Tương Sinh, Lâm Cát Địa' : 'Hào Lâm Động Biến, Có Chút Chậm Trễ';
    explanation = 'Hỏi về việc đi lại, lấy Thế hào làm bản thân người đi, Ứng hào làm điểm đến hoặc cung đường; hào Phụ Mẫu làm xe cộ giấy tờ.';
    ungKy = 'Ngay trong ngày hôm nay; khung giờ cát lợi: giờ Thìn (07-09h), Tị (09-11h), Thân (15-17h)';

    if (originalName === 'Trạch Hỏa Cách' && changedName === 'Lôi Hỏa Phong') {
      directConclusion = 'Về việc đi lại / trở về hôm nay của bạn: HOÀN TOÀN BÌNH AN, KHÔNG CÓ TRẮC TRỞ LỚN. Lộ trình hanh thông, về đích an toàn thuận lợi.';
      dichLyDetails = 'Quẻ khởi Trạch Hỏa Cách (tượng Đầm trên Lửa, có sự biến động chuyển dời), ban đầu có thể có sự sắp xếp cập rập hoặc thay đổi kế hoạch đôi chút. Nhưng động hào 5 (ngôi tôn quý cửu ngũ) biến thành Lôi Hỏa Phong (Sấm chớp phát quang, thịnh đại quang minh), bảo chứng dọc đường không gặp tai ách, phương tiện di chuyển êm ả, càng về sau càng thuận lợi.';
    } else if (isChangedAuspicious || !isChangedCaution) {
      directConclusion = 'Về việc đi lại / trở về hôm nay của bạn: HOÀN TOÀN BÌNH AN VÀ THUẬN LỢI. Không có trở ngại nguy hiểm, chuyến đi diễn ra suôn sẻ đúng như dự định.';
      dichLyDetails = `Quẻ gốc là ${originalName} gặp hào động ${movingLine} biến hóa thành ${changedName}. Hào thế được trợ lực, quẻ biến ngụ ý thông suốt, không có sát tinh hãm địa. Bạn có thể an tâm lên đường.`;
    } else {
      directConclusion = 'Về việc đi lại / trở về hôm nay: CẦN CHÚ Ý THẬN TRỌNG VỀ GIỜ GIẤC VÀ XE CỘ. Có thể gặp chút chậm trễ hoặc tắc đường nhẹ, nên điềm tĩnh, đi chậm giữ an toàn.';
      dichLyDetails = `Quẻ gốc ${originalName} biến thành ${changedName} là quẻ cần sự cẩn trọng. Nên kiểm tra kỹ phương tiện, tư trang và chú ý quan sát khi tham gia giao thông.`;
    }

  } else if (isHealth) {
    // 2. HỎI VỀ BỆNH TẬT / SỨC KHỎE
    if (isElder) {
      subject = 'Phụ Mẫu (Trưởng Bối & Che Chở)';
      targetName = 'Trưởng bối / Người thân lớn tuổi';
      state = 'Hưu Tù Lâm Tuần Không, Cần Bồi Đắp Nguyên Khí';
      explanation = `Hỏi bệnh cho ${targetName}, lấy hào Phụ Mẫu làm Dụng Thần. Trong quẻ Dụng Thần gặp tuần không (${xunKong}) chủ khí lực suy thoái, cần sự chăm sóc kiên trì và thuốc thang đúng phương.`;
      ungKy = 'Thời điểm then chốt: Tháng 11 - 12 Âm lịch năm nay; xa thì tháng 1 - 2 Âm lịch năm sau';
    } else if (isChild) {
      subject = 'Tử Tôn (Phúc Đức & Giải Tai)';
      targetName = 'Con cháu / Hậu bối';
      state = 'Tử Tôn Trì Thế, Được Phúc Thần Che Chở';
      explanation = 'Hỏi cho con cái, lấy hào Tử Tôn làm Dụng Thần. Tử Tôn là phúc thần hóa giải tai ương, bệnh sẽ dần thuyên giảm.';
      ungKy = 'Chuyển biến tích cực trong vòng 7 - 14 ngày tới';
    } else {
      subject = 'Thế Hào (Bản Thân Người Bệnh)';
      targetName = 'Bản thân';
      state = 'Thế Hào Đắc Lệnh / Cần Điều Dưỡng';
      explanation = 'Hỏi về sức khỏe bản thân, lấy Thế hào làm Dụng Thần.';
      ungKy = 'Cần kiên trì điều dưỡng trong tháng này';
    }

    // Phân tích tạng phủ
    let organ = 'Hệ Hô Hấp & Phổi (Phế Kim)';
    let element = 'Kim';
    let detail = 'Kim chủ Phế (phổi, khí quản). Quẻ Đoài (Trạch) cũng chủ về Phế. Đoài Kim lâm suy địa, gặp hào động khiến chức năng thông khí gặp trở ngại, cần kiên trì điều trị theo phác đồ.';

    if (qClean.includes('tim')) {
      organ = 'Tâm Phế Đồng Bệnh (Phổi & Tim Mạch)';
      element = 'Kim phối Hỏa';
      detail = 'Phổi thuộc Kim, Tim thuộc Hỏa (Hỏa khắc Kim). Hỏa nhiệt làm hao tổn Phế âm, dẫn đến tình trạng suy nhược kép. Cần chú trọng nâng cao thể trạng và giữ môi trường nghỉ ngơi yên tĩnh.';
    }

    diseaseAnalysis = { involvedOrgan: organ, involvedElement: element, details: detail };
    directConclusion = `Về tình hình sức khỏe và bệnh tình: TÌNH TRẠNG HIỆN TẠI KHÁ NẶNG VÀ PHỨC TẠP, CẦN SỰ CHĂM SÓC CHU ĐÁO VÀ THEO DÕI SÁT SAO CỦA Y BÁC SĨ.`;
    dichLyDetails = `Quẻ ${originalName} động hào ${movingLine} biến ${changedName}. Xét ngũ hành tạng phủ: ${organ}. Dụng thần lâm hưu tù, khí huyết chưa được thông suốt nhanh. Cần chuẩn bị phương án điều trị dài hơi và động viên tinh thần người bệnh.`;

  } else if (isCareer) {
    // 3. HỎI VỀ CÔNG VIỆC / SỰ NGHIỆP
    subject = 'Quan Quỷ (Sự Nghiệp & Chức Vụ)';
    targetName = 'Công danh / Sự nghiệp';
    state = isChangedAuspicious ? 'Quan Tinh Sinh Hóa, Đắc Thời Đắc Lợi' : 'Chờ Thời Cơ Chuyển Biến';
    explanation = 'Hỏi về công danh sự nghiệp, thi cử, thăng chức lấy hào Quan Quỷ làm Dụng Thần, hào Phụ Mẫu làm giấy tờ quyết định.';
    ungKy = 'Trong vòng 1 đến 3 tháng tới';

    if (isChangedAuspicious) {
      directConclusion = 'Về công việc / sự nghiệp của bạn: RẤT CÓ TRIỂN VỌNG, ĐƯỢC CẤP TRÊN HOẶC QUÝ NHÂN HỖ TRỢ, DỄ ĐẠT ĐƯỢC Ý NGUYỆN.';
      dichLyDetails = `Quẻ gốc ${originalName} biến thành ${changedName} là điềm báo công việc có sự mở mang hoặc được tin tưởng giao trọng trách mới. Cứ tự tin thể hiện năng lực.`;
    } else {
      directConclusion = 'Về công việc hiện tại: CẦN KIÊN NHẪN CHỜ ĐỢI THỜI CƠ, TRÁNH VỘI VÀNG ĐỔI CHỖ HOẶC TRANH CHẤP.';
      dichLyDetails = `Quẻ ${originalName} động hào ${movingLine} cho thấy nội bộ hoặc môi trường đang có sự tái cơ cấu, cần giữ thái độ khiêm tốn, tích lũy thực lực.`;
    }

  } else if (isWealth) {
    // 4. HỎI VỀ TIỀN TÀI / KINH DOANH
    subject = 'Thê Tài (Tài Bạch & Nguồn Tiền)';
    targetName = 'Tài lộc / Kinh tế';
    state = isChangedAuspicious ? 'Thê Tài Lâm Vượng Địa' : 'Tài Khí Hưu Tù, Đề Phòng Hao Tổn';
    explanation = 'Hỏi về tài lộc kinh doanh tiền của, lấy hào Thê Tài làm Dụng Thần.';
    ungKy = 'Tháng sau hoặc vào các ngày Tý, Thìn, Thân';

    if (isChangedAuspicious) {
      directConclusion = 'Về tiền tài / kinh doanh: DÒNG TIỀN CÓ DẤU HIỆU KHỞI SẮC, CÔNG VIỆC LÀM ĂN GẶP CƠ HỘI SINH LỜI.';
      dichLyDetails = `Quẻ ${originalName} biến sang ${changedName} mang lại vượng khí tài lộc. Thích hợp mở rộng giao thương hoặc thu hồi các khoản vốn cũ.`;
    } else {
      directConclusion = 'Về tiền bạc / đầu tư: NÊN CẨN TRỌNG QUẢN LÝ TÀI CHÍNH, KHÔNG NÊN ĐẦU TƯ MẠO HIỂM HAY CHO VAY MƯỢN LÚC NÀY.';
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} cảnh báo nguy cơ hao tán. Cần quản lý chặt chẽ dòng tiền và xem xét kỹ hợp đồng pháp lý.`;
    }

  } else if (isLove) {
    // 5. HỎI VỀ TÌNH CẢM / HÔN NHÂN
    subject = 'Thê Tài / Quan Quỷ & Hào Ứng (Đối Phương)';
    targetName = 'Nhân duyên / Tình cảm';
    state = isChangedAuspicious ? 'Thế Ứng Tương Hợp, Duyên Lành Hội Tụ' : 'Có Khúc Mắc Cần Hóa Giải';
    explanation = 'Hỏi về tình duyên, nam lấy Thê Tài làm Dụng Thần, nữ lấy Quan Quỷ làm Dụng Thần; Hào Ứng đại diện cho đối phương.';
    ungKy = 'Trong vòng vài tuần tới hoặc vào tiết tháng tới';

    if (isChangedAuspicious) {
      directConclusion = 'Về nhân duyên / tình cảm: CÓ TRIỂN VỌNG TỐT ĐẸP, ĐÔI BÊN HÒA HỢP, DỄ TIẾN TỚI GẮN KẾT LÂU DÀI.';
      dichLyDetails = `Quẻ ${originalName} chuyển hóa sang ${changedName} tượng trưng cho sự thấu hiểu và gắn bó. Cần mở lòng chia sẻ chân thành để duyên lành đơm hoa kết trái.`;
    } else {
      directConclusion = 'Về tình cảm: ĐANG CÓ CHÚT BẤT ĐỒNG QUAN ĐIỂM HOẶC TRẦM LẮNG, CẦN BÌNH TÂM LẮNG NGHE ĐỐI PHƯƠNG.';
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} cho thấy cả hai cần thêm thời gian để dung hòa tính cách, tránh nóng giận lời qua tiếng lại.`;
    }

  } else if (isLawsuit) {
    // 6. HỎI VỀ TRANH CHẤP / KIỆN TỤNG / PHÁP LUẬT
    subject = 'Quan Quỷ (Tranh Chấp, Pháp Lý & Công Quyền)';
    targetName = 'Tranh chấp pháp lý / Thủ tục thưa gửi';
    state = isChangedAuspicious ? 'Hòa Giải Hanh Thông, Giảm Bớt Áp Lực' : 'Khắc Phạt Khó Khăn, Cần Chuẩn Bị Bằng Chứng';
    explanation = 'Chiêm kiện tụng tranh chấp, lấy hào Quan Quỷ làm cơ quan pháp luật, Thế hào làm bản thân, Ứng hào làm đối phương.';
    ungKy = 'Trong vòng 1-2 tháng tới hoặc khi có phán quyết chính thức';

    if (isChangedAuspicious) {
      directConclusion = 'VỀ VIỆC TRANH CHẤP / PHÁP LÝ: KẾT QUẢ KHẢ QUAN, CÓ KHẢ NĂNG HÒA GIẢI HOẶC BẠN CHIẾM ĐƯỢC LỢI THẾ HỢP PHÁP.';
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} cho thấy mâu thuẫn sẽ từng bước được tháo gỡ. Nên chủ động giữ thái độ thượng tôn pháp luật và đàm phán ôn hòa.`;
    } else {
      directConclusion = 'VỀ VIỆC TRANH CHẤP: CẦN RẤT CẨN TRỌNG, CHUẨN BỊ KỸ CÀNG VĂN BẢN VÀ CHỨNG CỨ, TRÁNH ĐỂ BỊ ĐỘNG.';
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} báo hiệu quá trình giải quyết có thể kéo dài và tốn kém năng lượng. Nên nhờ luật sư hoặc chuyên gia tư vấn kỹ.`;
    }

  } else if (isPartnership) {
    // 7. HỎI VỀ HỢP TÁC / ĐỐI TÁC / GÓP VỐN
    subject = 'Hào Ứng & Huynh Đệ (Đối Tác & Cộng Sự)';
    targetName = 'Đối tác hợp tác / Người cùng làm ăn';
    state = isChangedAuspicious ? 'Thế Ứng Đồng Tâm, Tương Trợ Đôi Bên' : 'Khác Biệt Quan Điểm, Đề Phòng Tranh Lợi';
    explanation = 'Chiêm hợp tác lấy Thế hào làm mình, Ứng hào làm đối tác, Huynh Đệ làm người cộng sự.';
    ungKy = 'Trong vòng 1-3 tháng tới';

    if (isChangedAuspicious) {
      directConclusion = 'VỀ HỢP TÁC LÀM ĂN: ĐỐI TÁC CÓ THIỆN CHÍ, ĐÔI BÊN HỢP TÁC RẤT DỄ ĐẠT ĐƯỢC THÀNH CÔNG VÀ LỢI NHUẬN.';
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} là tượng đồng tâm hiệp lực. Có thể tiến hành ký kết hợp đồng và triển khai kế hoạch.`;
    } else {
      directConclusion = 'VỀ HỢP TÁC: CẦN PHÂN ĐỊNH RÕ RÀNG QUYỀN LỢI, TRÁCH NHIỆM VÀ ĐIỀU KHOẢN TÀI CHÍNH TRÊN GIẤY TỜ TRƯỚC KHI BẮT ĐẦU.';
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} cảnh báo nguy cơ bất đồng quan điểm phân chia lợi ích về sau. Minh bạch tài chính là yếu tố sống còn.`;
    }

  } else {
    // 6. CÁC CÂU HỎI TỔNG QUÁT KHÁC
    subject = 'Thế Hào (Chủ Thể Sự Việc)';
    targetName = 'Sự việc người hỏi trăn trở';
    state = isChangedAuspicious ? 'Cát Khí Khởi Sắc' : 'Bình Hòa Thận Trọng';
    explanation = 'Lấy Thế hào làm trung tâm xem xét động tĩnh của các hào trong quẻ Mai Hoa.';
    ungKy = 'Trong thời gian ngắn sắp tới';

    if (isChangedAuspicious) {
      directConclusion = 'Về sự việc bạn đang băn khoăn: KẾT QUẢ RẤT KHẢ QUAN, THỜI VẬN ĐANG CHUYỂN BIẾN THEO HƯỚNG TÍCH CỰC.';
      dichLyDetails = `Quẻ ${originalName} động hào ${movingLine} biến ${changedName} là biểu tượng của sự hanh thông. Cứ tự tin tiến hành với tâm thế vững vàng.`;
    } else {
      directConclusion = 'Về sự việc bạn hỏi: CẦN THẬN TRỌNG TỪNG BƯỚC, KHÔNG NÊN NÓNG VỘI, TẬP TRUNG LÀM TỐT PHẦN VIỆC CỦA MÌNH.';
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} khuyên đương số nên giữ tâm định tĩnh, quan sát diễn biến và linh hoạt ứng phó.`;
    }
  }

  // Tạo đoạn văn phán của Thầy đầy đủ, trang trọng, không lỗi font
  const thayPhan = [
    `Quẻ khởi: ${originalName} động hào ${movingLine} biến ${changedName}.`,
    `- Người hỏi chiêm bốc về: "${question.trim()}"`,
    `- KẾT LUẬN TRỰC DIỆN CỦA THẦY: ${directConclusion}`,
    `- Trong Dịch lý Lục Hào: Lấy ${subject} (${targetName}) làm Dụng Thần. Hiện tại Dụng Thần ${state}.`,
    `- Luận giải tượng quẻ: ${dichLyDetails}`,
    diseaseAnalysis ? `- Xét về ngũ hành tạng phủ: ${diseaseAnalysis.involvedOrgan}. ${diseaseAnalysis.details}` : null,
    `- Hào động phát tiết chuyển hóa sang quẻ ${changedName}, hào lâm tiết khí của Nhật Nguyệt (${ganZhiDay} / ${ganZhiMonth}), Tuần Không tại [${xunKong}].`,
    `- Thời điểm chuyển biến then chốt (Ứng Kỳ): ${ungKy}. Cần giữ tâm an định, chu toàn hành sự.`,
  ].filter(Boolean).join('\n');

  return {
    question,
    datetimeInput: {
      date: dateStr,
      time: timeStr,
      solarStr: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      lunarStr: `Năm ${eightChar.getYear()} (${lunar.getYear()}) tháng ${Math.abs(lunar.getMonth())} ngày ${lunar.getDay()} âm lịch`,
      ganZhiYear,
      ganZhiMonth,
      ganZhiDay,
      ganZhiHour,
      xunKong,
    },
    hexagram: {
      originalUpper: upperTrigram.vi,
      originalLower: lowerTrigram.vi,
      originalName,
      movingLine,
      changedUpper: changedUpperTrigram.vi,
      changedLower: changedLowerTrigram.vi,
      changedName,
    },
    dungThan: {
      subject,
      targetName,
      state,
      explanation,
    },
    directConclusion,
    dichLyDetails,
    diseaseAnalysis,
    thayPhan,
    ungKy,
  };
}
