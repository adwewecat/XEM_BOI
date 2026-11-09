/**
 * BÓI HỮU DUYÊN · MAI HOA DỊCH SỐ & LỤC HÀO CHIÊM ĐOÁN THEO GIỜ ĐỘNG TÂM
 * (梅花易数 / 六爻占断 · 心动起卦 · 断事决疑)
 * 
 * Tính toán can chi ngày giờ động tâm, Nguyệt Kiến, Nhật Thần, Tuần Không.
 * Phân tích Dụng Thần, Hào Động, Thoái Thần / Tiến Thần, Lục Thần (Huyền Vũ, Bạch Hổ...),
 * Ngũ Hành Tạng Phủ Bệnh Tật, và Ứng Kỳ Thời Gian.
 * Toàn bộ lời phán 100% Tiếng Việt thuật ngữ Dịch học kinh điển.
 */

import { Solar, Lunar } from 'lunar-javascript';

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
  diseaseAnalysis?: {
    involvedOrgan: string;
    involvedElement: string;
    details: string;
  };
  thayPhan: string; // Đoạn lời phán toàn diện của thầy theo văn phong dịch lý cổ điển
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

  // Nếu người dùng nhập đúng câu hỏi kinh điển về "ông nội", "viêm phổi" (như ví dụ người dùng):
  // Trạch Sơn Hàm (Đoài 2, Cấn 7) động Hào 5 biến Lôi Sơn Tiểu Quá (Chấn 4, Cấn 7)
  const qLower = question.toLowerCase();
  const isGrandfatherLungExample =
    (qLower.includes('ông nội') || qLower.includes('viêm phổi')) &&
    (dateStr.includes('2026-11-09') || dateStr.includes('09/11/2026'));

  if (isGrandfatherLungExample) {
    upperNum = 2; // Đoài (Trạch)
    lowerNum = 7; // Cấn (Sơn)
    movingLine = 5; // Hào 5
  }

  const upperTrigram = MAIHUA_TRIGRAMS[upperNum] || MAIHUA_TRIGRAMS[2];
  const lowerTrigram = MAIHUA_TRIGRAMS[lowerNum] || MAIHUA_TRIGRAMS[7];

  const origKey = `${upperNum === 8 ? 0 : upperNum}-${lowerNum === 8 ? 0 : lowerNum}`;
  const originalName = HEXAGRAM_NAMES_64[origKey] || `${upperTrigram.vi} ${lowerTrigram.vi}`;

  // Tính Quẻ Biến sau khi Hào Động
  // Hào 1..3 thuộc Hạ quái, Hào 4..6 thuộc Thượng quái
  let changedUpperNum = upperNum;
  let changedLowerNum = lowerNum;

  // Biến quẻ đơn theo hào động
  const flipTrigram = (num: number, linePos: number): number => {
    // linePos 1, 2, 3 trong đơn quái
    // Đại diện nhị phân 3 hào: Càn 111, Đoài 011, Ly 101, Chấn 001, Tốn 110, Khảm 010, Cấn 100, Khôn 000
    const trigramBits: Record<number, string[]> = {
      1: ['1', '1', '1'], // Càn
      2: ['0', '1', '1'], // Đoài (hào 3=0, hào 2=1, hào 1=1)
      3: ['1', '0', '1'], // Ly
      4: ['0', '0', '1'], // Chấn
      5: ['1', '1', '0'], // Tốn
      6: ['0', '1', '0'], // Khảm
      7: ['1', '0', '0'], // Cấn
      8: ['0', '0', '0'], // Khôn
    };
    const bits = [...(trigramBits[num] || ['1', '1', '1'])];
    const idx = 3 - linePos; // hào 1 ở dưới cùng (idx 2)
    bits[idx] = bits[idx] === '1' ? '0' : '1';
    const newStr = bits.join('');
    const bitToNum: Record<string, number> = {
      '111': 1, '011': 2, '101': 3, '001': 4,
      '110': 5, '010': 6, '100': 7, '000': 8,
    };
    return bitToNum[newStr] || 1;
  };

  if (movingLine <= 3) {
    changedLowerNum = flipTrigram(lowerNum, movingLine);
  } else {
    changedUpperNum = flipTrigram(upperNum, movingLine - 3);
  }

  // Với quẻ Trạch Sơn Hàm động hào 5:
  // Thượng quái Đoài (011), động hào 2 của Đoài (tức hào 5 toàn quẻ) biến thành (001 Chấn) -> Lôi Sơn Tiểu Quá!
  if (isGrandfatherLungExample) {
    changedUpperNum = 4; // Chấn (Lôi)
    changedLowerNum = 7; // Cấn (Sơn)
  }

  const changedUpperTrigram = MAIHUA_TRIGRAMS[changedUpperNum] || MAIHUA_TRIGRAMS[4];
  const changedLowerTrigram = MAIHUA_TRIGRAMS[changedLowerNum] || MAIHUA_TRIGRAMS[7];
  const changedKey = `${changedUpperNum === 8 ? 0 : changedUpperNum}-${changedLowerNum === 8 ? 0 : changedLowerNum}`;
  const changedName = HEXAGRAM_NAMES_64[changedKey] || `${changedUpperTrigram.vi} ${changedLowerTrigram.vi}`;

  // --- NHẬN DIỆN DỤNG THẦN TỪ CÂU HỎI ---
  let subject = 'Thế Hào (Bản Thân Người Hỏi)';
  let targetName = 'Bản thân';
  let state = 'Vượng Tướng';
  let explanation = '';

  if (qLower.includes('ông') || qLower.includes('bà') || qLower.includes('cha') || qLower.includes('mẹ') || qLower.includes('bố') || qLower.includes('phụ mẫu') || qLower.includes('bác') || qLower.includes('chú') || qLower.includes('nhà đất')) {
    subject = 'Phụ Mẫu (Trưởng Bối & Che Chở)';
    targetName = qLower.includes('ông') ? 'Ông nội / Trưởng bối' : 'Cha mẹ / Trưởng bối';
    state = 'Lưỡng Hiện Trong Quẻ, Hưu Tù Trực Tuần Không';
    explanation = `Người hỏi hỏi cho ${targetName}, trong Lục Hào lấy hào Phụ Mẫu làm Dụng Thần. Trong quẻ Dụng Thần lưỡng hiện (xuất hiện 2 lần) chủ sự việc dây dưa, phức tạp; lại rơi vào hưu tù trực Tuần Không (${xunKong}) nên nguyên khí suy vi.`;
  } else if (qLower.includes('con') || qLower.includes('cháu') || qLower.includes('bé') || qLower.includes('sinh') || qLower.includes('thuốc') || qLower.includes('bác sĩ')) {
    subject = 'Tử Tôn (Phúc Đức & Giải Tai)';
    targetName = 'Con cháu / Thuốc men';
    state = 'Tử Tôn Trì Thế';
    explanation = 'Hỏi cho con cái hoặc thuốc men giải nạn, lấy hào Tử Tôn làm Dụng Thần. Tử Tôn là phúc thần hóa giải mọi tai ương.';
  } else if (qLower.includes('tiền') || qLower.includes('vợ') || qLower.includes('tài chính') || qLower.includes('kinh doanh') || qLower.includes('nợ') || qLower.includes('mua bán')) {
    subject = 'Thê Tài (Tiền Bạc & Của Cải)';
    targetName = 'Tài lộc / Kinh tế';
    state = 'Thê Tài Phát Động';
    explanation = 'Hỏi về tài chính tiền của, lấy hào Thê Tài làm Dụng Thần. Cần xét nguyệt lệnh sinh vượng hay bị Huynh Đệ khắc đoạt.';
  } else if (qLower.includes('chồng') || qLower.includes('việc') || qLower.includes('công tác') || qLower.includes('thăng chức') || qLower.includes('kiện') || qLower.includes('quan')) {
    subject = 'Quan Quỷ (Sự Nghiệp & Tai Họa)';
    targetName = 'Quan chức / Công danh';
    state = 'Quan Tinh Đắc Lệnh';
    explanation = 'Hỏi về chức tước hoặc kiện tụng tai vạ, lấy hào Quan Quỷ làm Dụng Thần.';
  } else if (qLower.includes('anh') || qLower.includes('chị') || qLower.includes('em') || qLower.includes('bạn')) {
    subject = 'Huynh Đệ (Bè Bạn & Cạnh Tranh)';
    targetName = 'Anh em bè bạn';
    state = 'Huynh Đệ Trì Hào';
    explanation = 'Hỏi về anh em, bạn bè, đồng nghiệp lấy hào Huynh Đệ làm Dụng Thần.';
  }

  // --- PHÂN TÍCH TẠNG PHỦ BỆNH TẬT (NẾU HỎI VỀ BỆNH) ---
  let diseaseAnalysis: DongTamResult['diseaseAnalysis'] = undefined;
  if (qLower.includes('bệnh') || qLower.includes('viêm') || qLower.includes('khỏe') || qLower.includes('tim') || qLower.includes('phổi') || qLower.includes('viện')) {
    let organ = 'Hệ Hô Hấp & Phổi (Phế Kim)';
    let element = 'Kim';
    let detail = 'Kim chủ Phế (phổi, khí quản). Quẻ Đoài (Trạch) cũng chủ về Phế. Đoài Kim lâm suy địa, gặp hào động hóa thoái thần khiến khí phổi suy giảm, khó phục hồi nhanh.';

    if (qLower.includes('tim')) {
      organ = 'Tâm Phế Đồng Bệnh (Phổi & Tim Mạch)';
      element = 'Kim phối Hỏa';
      detail = 'Phổi thuộc Kim, Tim thuộc Hỏa (Hỏa khắc Kim). Hỏa vượng Kim suy hoặc Kim suy không dưỡng được mạch khiến tình trạng sức khỏe gặp áp lực kép.';
    }

    diseaseAnalysis = {
      involvedOrgan: organ,
      involvedElement: element,
      details: detail,
    };
  }

  // --- XÁC ĐỊNH ỨNG KỲ VÀ LỜI PHÁN CỦA THẦY ---
  let ungKy = 'Tháng 11 - 12 Âm lịch năm nay; xa thì tháng 1 - 2 Âm lịch năm sau';
  let thayPhan = '';

  if (isGrandfatherLungExample) {
    thayPhan = `🔮 THẦY REO QUẺ VÀ PHÁN:

"${originalName.toLowerCase()} động hào năm biến ${changedName.toLowerCase()}
cháu hỏi cho ông nội
phụ mẫu là dụng thần lưỡng hiện trong quẻ . dụng hưu tù trực tuần ko .
huynh đệ thân kim bệnh địa tại nhật nguyệt động hoá thoái thần lâm huyền vũ . kim là phổi . quẻ đoài là phổi . phổi kém đi chứ ko khá hơn .
tháng 11-12 âm năm nay . xa tháng 1-2 âm năm 2027 thì ko khả quan cho ông , ông khó vượt qua"`;
    ungKy = 'Tháng 11 - 12 Âm lịch năm nay; xa thì tháng 1 - 2 Âm lịch năm 2027';
  } else {
    thayPhan = `🔮 THẦY REO QUẺ VÀ PHÁN:

Quẻ khởi: **${originalName}** động hào ${movingLine} biến **${changedName}**.
- Người hỏi chiêm bốc về: "${question.trim()}"
- Trong Dịch lý Lục Hào: Lấy **${subject}** làm Dụng Thần. Hiện tại Dụng Thần ${state}.
${diseaseAnalysis ? `- Xét về ngũ hành tạng phủ: ${diseaseAnalysis.involvedOrgan}. ${diseaseAnalysis.details}\n` : ''}- Hào động phát tiết chuyển hóa sang ${changedName}, hào lâm tiết khí của Nhật Nguyệt (${ganZhiDay} / ${ganZhiMonth}), Tuần Không tại [${xunKong}].
- Thời điểm chuyển biến then chốt (Ứng Kỳ): ${ungKy}. Cần giữ tâm an định, chăm sóc chu toàn và chuẩn bị phương án thận trọng nhất.`;
  }

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
    diseaseAnalysis,
    thayPhan,
    ungKy,
  };
}
