/**
 * BỘ TÍNH TOÁN TỬ BÌNH BÁT TỰ (TỨ TRỤ MỆNH LÝ)
 * Dựa trên thuật toán Lịch pháp chuẩn xác và Mệnh lý Tử Bình kinh điển (Uyên Hải Tử Bình, Trích Thiên Tủy)
 * Toàn bộ thuật ngữ và diễn giải 100% Tiếng Việt chuẩn mực.
 */

import { Solar, Lunar } from 'lunar-javascript';

// Từ điển Thập Thần tiếng Việt
export const SHISHEN_VI: Record<string, { name: string; desc: string; role: string }> = {
  '比肩': { name: 'Tỷ Kiên', desc: 'Đồng hành, anh em, bạn bè, ý chí kiên định, tự lập tự cường', role: 'Bình hòa' },
  '劫财': { name: 'Kiếp Tài', desc: 'Cạnh tranh, hao tán, giao thiệp rộng, dám nghĩ dám làm, tranh đoạt', role: 'Hung/Biến' },
  '食神': { name: 'Thực Thần', desc: 'Phúc tinh, ẩm thực, tài hoa phát tiết, ung dung tự tại, trường thọ', role: 'Cát' },
  '伤官': { name: 'Thương Quan', desc: 'Sáng tạo đột phá, thông minh tuyệt đỉnh, ngạo nghễ, khắc ước thúc', role: 'Hung/Biến' },
  '偏财': { name: 'Thiên Tài', desc: 'Tiền của bất ngờ, kinh doanh, quảng giao, nhanh nhạy cơ hội tài chính', role: 'Cát' },
  '正财': { name: 'Chính Tài', desc: 'Thu nhập ổn định, cần kiệm, chăm chỉ, tiền tài chính đáng, đáng tin cậy', role: 'Cát' },
  '偏官': { name: 'Thất Sát', desc: 'Quyền uy, dũng cảm, quyết đoán, phong ba bão táp, biến nguy thành an', role: 'Hung/Cát hóa' },
  '七杀': { name: 'Thất Sát', desc: 'Quyền uy, dũng cảm, quyết đoán, phong ba bão táp, biến nguy thành an', role: 'Hung/Cát hóa' },
  '正官': { name: 'Chính Quan', desc: 'Danh chính ngôn thuận, quy củ, sự nghiệp vững vàng, liêm chính', role: 'Cát' },
  '偏印': { name: 'Thiên Ấn (Kiêu Thần)', desc: 'Tư duy độc lập, trực giác nhạy bén, huyền học, nghệ thuật, nội tâm', role: 'Bình/Biến' },
  '正印': { name: 'Chính Ấn', desc: 'Học thức uyên bác, mẹ hiền, danh dự, chở che, quý nhân tương trợ', role: 'Cát' },
  '日主': { name: 'Nhật Chủ (Bản Thân)', desc: 'Đại diện cho chính bản mệnh, tâm thức và ý chí chủ đạo', role: 'Trung tâm' },
};

// Từ điển Nạp Âm Ngũ Hành tiếng Việt
export const NAYIN_VI: Record<string, string> = {
  '海中金': 'Hải Trung Kim (Vàng trong biển)',
  '炉中火': 'Lư Trung Hỏa (Lửa trong lò)',
  '大林木': 'Đại Lâm Mộc (Gỗ rừng già)',
  '路旁土': 'Lộ Bàng Thổ (Đất ven đường)',
  '剑锋金': 'Kiếm Phong Kim (Vàng mũi kiếm)',
  '山头火': 'Sơn Đầu Hỏa (Lửa trên đỉnh núi)',
  '涧下水': 'Giản Hạ Thủy (Nước dưới khe)',
  '城头土': 'Thành Đầu Thổ (Đất trên thành)',
  '白蜡金': 'Bạch Lạp Kim (Vàng trong sáp)',
  '杨柳木': 'Dương Liễu Mộc (Gỗ cây dương liễu)',
  '泉中水': 'Tuyền Trung Thủy (Nước trong suối)',
  '屋上土': 'Ốc Thượng Thổ (Đất trên nóc nhà)',
  '霹雳火': 'Tích Lịch Hỏa (Lửa sấm sét)',
  '松柏木': 'Tùng Bách Mộc (Gỗ cây tùng bách)',
  '长流水': 'Trường Lưu Thủy (Nước chảy dài ra biển)',
  '沙中金': 'Sa Trung Kim (Vàng trong cát)',
  '山下火': 'Sơn Hạ Hỏa (Lửa chân núi)',
  '平地木': 'Bình Địa Mộc (Gỗ đồng bằng)',
  '壁上土': 'Bích Thượng Thổ (Đất trên tường)',
  '金箔金': 'Kim Bạc Kim (Vàng dát mỏng)',
  '覆灯火': 'Phúc Đăng Hỏa (Lửa ngọn đèn)',
  '天河水': 'Thiên Hà Thủy (Nước trên trời/Ngân hà)',
  '大驿土': 'Đại Dịch Thổ (Đất đường cái)',
  '钗钏金': 'Thoa Xuyến Kim (Vàng trang sức)',
  '桑柘木': 'Tang Đố Mộc (Gỗ cây dâu tằm)',
  '大溪水': 'Đại Khê Thủy (Nước khe lớn)',
  '沙中土': 'Sa Trung Thổ (Đất bãi cát)',
  '天上火': 'Thiên Thượng Hỏa (Lửa trên trời/Mặt trời)',
  '石榴木': 'Thạch Lựu Mộc (Gỗ cây thạch lựu)',
  '大海水': 'Đại Hải Thủy (Nước biển lớn)',
};

// Vòng Trường Sinh Địa Thế tiếng Việt
export const DIESHI_VI: Record<string, string> = {
  '长生': 'Trường Sinh (Sinh sôi, khởi đầu hứa hẹn)',
  '沐浴': 'Mộc Dục (Tắm gội, đào hoa, biến động)',
  '冠带': 'Quan Đới (Trưởng thành, tiến bước công danh)',
  '临官': 'Lâm Quan (Đắc lộc, tự lập, thời vận lên)',
  '帝旺': 'Đế Vượng (Đỉnh cao, mạnh mẽ tuyệt đối)',
  '衰': 'Suy (Hạ nhiệt, thoái trào, nên cẩn trọng)',
  '病': 'Bệnh (Yếu mệt, bất an, cần bồi bổ)',
  '死': 'Tử (Trầm lắng, bế tắc, cần tĩnh tâm)',
  '墓': 'Mộ (Chôn cất, thu tàng, tích lũy kho tàng)',
  '绝': 'Tuyệt (Hết duyên, đoạn tuyệt, chờ thời cơ mới)',
  '胎': 'Thai (Thụ thai, ấp ủ, mầm mống sơ khai)',
  '养': 'Dưỡng (Nuôi dưỡng, tích lũy nội lực bền bỉ)',
};

// Thiên Can tiếng Việt
export const STEM_VI: Record<string, { vi: string; element: 'Mộc' | 'Hỏa' | 'Thổ' | 'Kim' | 'Thủy'; polarity: 'Dương' | 'Âm' }> = {
  '甲': { vi: 'Giáp', element: 'Mộc', polarity: 'Dương' },
  '乙': { vi: 'Ất', element: 'Mộc', polarity: 'Âm' },
  '丙': { vi: 'Bính', element: 'Hỏa', polarity: 'Dương' },
  '丁': { vi: 'Đinh', element: 'Hỏa', polarity: 'Âm' },
  '戊': { vi: 'Mậu', element: 'Thổ', polarity: 'Dương' },
  '己': { vi: 'Kỷ', element: 'Thổ', polarity: 'Âm' },
  '庚': { vi: 'Canh', element: 'Kim', polarity: 'Dương' },
  '辛': { vi: 'Tân', element: 'Kim', polarity: 'Âm' },
  '壬': { vi: 'Nhâm', element: 'Thủy', polarity: 'Dương' },
  '癸': { vi: 'Quý', element: 'Thủy', polarity: 'Âm' },
};

// Địa Chi tiếng Việt
export const BRANCH_VI: Record<string, { vi: string; animal: string; element: 'Mộc' | 'Hỏa' | 'Thổ' | 'Kim' | 'Thủy' }> = {
  '子': { vi: 'Tý', animal: 'Chuột', element: 'Thủy' },
  '丑': { vi: 'Sửu', animal: 'Trâu', element: 'Thổ' },
  '寅': { vi: 'Dần', animal: 'Hổ', element: 'Mộc' },
  '卯': { vi: 'Mão', animal: 'Mèo', element: 'Mộc' },
  '辰': { vi: 'Thìn', animal: 'Rồng', element: 'Thổ' },
  '巳': { vi: 'Tỵ', animal: 'Rắn', element: 'Hỏa' },
  '午': { vi: 'Ngọ', animal: 'Ngựa', element: 'Hỏa' },
  '未': { vi: 'Mùi', animal: 'Dê', element: 'Thổ' },
  '申': { vi: 'Thân', animal: 'Khỉ', element: 'Kim' },
  '酉': { vi: 'Dậu', animal: 'Gà', element: 'Kim' },
  '戌': { vi: 'Tuất', animal: 'Chó', element: 'Thổ' },
  '亥': { vi: 'Hợi', animal: 'Lợn', element: 'Thủy' },
};

export interface PillarData {
  title: string;
  stem: string;
  stemVi: string;
  zhi: string;
  zhiVi: string;
  combined: string;
  combinedVi: string;
  naYin: string;
  shiShenGan: string;
  shiShenGanDesc: string;
  shiShenZhi: string[];
  hideGanVi: string[];
  diShi: string;
  xunKong?: string;
}

export interface BaziResult {
  yearPillar: PillarData;
  monthPillar: PillarData;
  dayPillar: PillarData;
  timePillar: PillarData;
  dayMaster: {
    stem: string;
    vi: string;
    element: string;
    nature: string;
    strength: 'Cực Vượng' | 'Thân Vượng' | 'Trung Hòa' | 'Thân Nhược' | 'Cực Nhược';
    strengthDesc: string;
  };
  elementsCount: {
    Kim: number;
    Moc: number;
    Thuy: number;
    Hoa: number;
    Tho: number;
  };
  dominantElement: string;
  lackingElement: string;
  taiYuan: { name: string; naYin: string };
  mingGong: { name: string; naYin: string };
  shenGong: { name: string; naYin: string };
  insightOverview: string;
  careerFinance: string;
  loveMarriage: string;
}

/**
 * Tính toán Bát Tự Tứ Trụ hoàn chỉnh từ ngày giờ Dương Lịch
 */
export function calculateBazi(year: number, month: number, day: number, hour: number, minute: number = 0): BaziResult {
  const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
  const lunar = solar.getLunar();
  const eightChar = lunar.getEightChar();

  // Helper chuyển đổi 1 trụ
  const makePillar = (
    title: string,
    stem: string,
    zhi: string,
    naYinRaw: string,
    shiShenGanRaw: string,
    shiShenZhiRaw: string[],
    diShiRaw: string,
    xunKongRaw?: string
  ): PillarData => {
    const sInfo = STEM_VI[stem] || { vi: stem, element: 'Mộc', polarity: 'Dương' };
    const zInfo = BRANCH_VI[zhi] || { vi: zhi, animal: '', element: 'Thủy' };
    const ssInfo = SHISHEN_VI[shiShenGanRaw] || { name: shiShenGanRaw || 'Nhật Chủ', desc: '', role: '' };
    const sszMapped = (shiShenZhiRaw || []).map(s => (SHISHEN_VI[s] ? SHISHEN_VI[s].name : s));

    return {
      title,
      stem,
      stemVi: `${sInfo.vi} (${sInfo.element} ${sInfo.polarity})`,
      zhi,
      zhiVi: `${zInfo.vi} (${zInfo.animal} - ${zInfo.element})`,
      combined: `${stem}${zhi}`,
      combinedVi: `${sInfo.vi} ${zInfo.vi}`,
      naYin: NAYIN_VI[naYinRaw] || naYinRaw,
      shiShenGan: ssInfo.name,
      shiShenGanDesc: ssInfo.desc,
      shiShenZhi: sszMapped,
      hideGanVi: sszMapped,
      diShi: DIESHI_VI[diShiRaw] || diShiRaw,
      xunKong: xunKongRaw,
    };
  };

  const yStem = eightChar.getYearGan();
  const yZhi = eightChar.getYearZhi();
  const mStem = eightChar.getMonthGan();
  const mZhi = eightChar.getMonthZhi();
  const dStem = eightChar.getDayGan();
  const dZhi = eightChar.getDayZhi();
  const tStem = eightChar.getTimeGan();
  const tZhi = eightChar.getTimeZhi();

  const yearPillar = makePillar(
    'Trụ Năm (Tổ tiên - Gốc rễ)',
    yStem,
    yZhi,
    eightChar.getYearNaYin(),
    eightChar.getYearShiShenGan(),
    eightChar.getYearShiShenZhi(),
    eightChar.getYearDiShi(),
    eightChar.getYearXunKong()
  );

  const monthPillar = makePillar(
    'Trụ Tháng (Cha mẹ - Khí tiết)',
    mStem,
    mZhi,
    eightChar.getMonthNaYin(),
    eightChar.getMonthShiShenGan(),
    eightChar.getMonthShiShenZhi(),
    eightChar.getMonthDiShi()
  );

  const dayPillar = makePillar(
    'Trụ Ngày (Bản thân & Phối ngẫu)',
    dStem,
    dZhi,
    eightChar.getDayNaYin(),
    '日主',
    eightChar.getDayShiShenZhi(),
    eightChar.getDayDiShi(),
    eightChar.getDayXunKong()
  );

  const timePillar = makePillar(
    'Trụ Giờ (Con cái & Hậu vận)',
    tStem,
    tZhi,
    eightChar.getTimeNaYin(),
    eightChar.getTimeShiShenGan(),
    eightChar.getTimeShiShenZhi(),
    eightChar.getTimeDiShi()
  );

  // Đếm ngũ hành từ 8 chữ
  const count: { Kim: number; Moc: number; Thuy: number; Hoa: number; Tho: number } = {
    Kim: 0,
    Moc: 0,
    Thuy: 0,
    Hoa: 0,
    Tho: 0,
  };

  const addElement = (elemStr: string) => {
    if (elemStr.includes('金')) count.Kim += 1;
    if (elemStr.includes('木')) count.Moc += 1;
    if (elemStr.includes('水')) count.Thuy += 1;
    if (elemStr.includes('火')) count.Hoa += 1;
    if (elemStr.includes('土')) count.Tho += 1;
  };

  addElement(eightChar.getYearWuXing());
  addElement(eightChar.getMonthWuXing());
  addElement(eightChar.getDayWuXing());
  addElement(eightChar.getTimeWuXing());

  // Tìm ngũ hành vượng nhất và khuyết
  const elemEntries = Object.entries(count) as [keyof typeof count, number][];
  elemEntries.sort((a, b) => b[1] - a[1]);
  const dominantElement = elemEntries[0][0];
  const lackingElement = elemEntries.find(e => e[1] === 0)?.[0] || 'Ngũ hành tương đối đủ đầy';

  // Nhật chủ
  const dmInfo = STEM_VI[dStem] || { vi: dStem, element: 'Mộc', polarity: 'Dương' };
  // Đánh giá sơ bộ thân vượng / nhược dựa trên đắc lệnh tháng
  const monthZhiElem = BRANCH_VI[mZhi]?.element || 'Thổ';
  const dmElem = dmInfo.element;

  let strength: BaziResult['dayMaster']['strength'] = 'Trung Hòa';
  let strengthDesc = 'Ngũ hành bản mệnh cân bằng, dễ thích nghi với mọi môi trường, bình hòa vững chãi.';

  if (monthZhiElem === dmElem) {
    strength = 'Thân Vượng';
    strengthDesc = `Được Lệnh tháng sinh trợ (${dmElem} nắm lệnh), tính cách cương trực, giàu sinh lực và bản lĩnh gánh vác đại nghiệp.`;
  } else if ((dmElem === 'Mộc' && monthZhiElem === 'Thủy') ||
             (dmElem === 'Hỏa' && monthZhiElem === 'Mộc') ||
             (dmElem === 'Thổ' && monthZhiElem === 'Hỏa') ||
             (dmElem === 'Kim' && monthZhiElem === 'Thổ') ||
             (dmElem === 'Thủy' && monthZhiElem === 'Kim')) {
    strength = 'Thân Vượng';
    strengthDesc = `Được Ấn tinh của Lệnh tháng sinh phù, gốc rễ vững chãi, tư chất thông tuệ, có hậu thuẫn tốt.`;
  } else {
    strength = 'Thân Nhược';
    strengthDesc = `Không đắc thời lệnh, cần nhờ Tỷ Kiên tương trợ hoặc Ấn tinh phù trì để tích lũy nội lực phát triển.`;
  }

  // Luận giải chi tiết
  const insightOverview = `Nhật Chủ ${dmInfo.vi} (${dmInfo.element} ${dmInfo.polarity}) ngự tại ngày ${dayPillar.combinedVi}. Bản mệnh mang nạp âm ${dayPillar.naYin}. Tứ trụ ${strength}. Ngũ hành thể hiện vượng nhất là ${dominantElement} (${count[dominantElement as keyof typeof count]} chữ), ${lackingElement === 'Ngũ hành tương đối đủ đầy' ? 'ngũ hành lưu thông khá hài hòa' : `khuyết thiếu ngũ hành ${lackingElement}, nên bổ sung phương hướng hoặc màu sắc tương ứng`}.`;

  const careerFinance = `Trong mệnh cục, Thập thần trụ tháng là ${monthPillar.shiShenGan} và trụ giờ là ${timePillar.shiShenGan}. Đây là thế cục ${
    strength === 'Thân Vượng'
      ? 'Thân Vượng Thắng Tài Quan, thích hợp xông pha kinh doanh, nắm giữ vị trí quản lý hoặc tạo dựng sự nghiệp riêng.'
      : 'Thân Nhược Hỷ Ấn Tỷ, thích hợp hợp tác đồng hành, làm trong các tổ chức uy tín hoặc phát triển theo hướng chuyên gia học thuật.'
  }`;

  const loveMarriage = `Trụ ngày đại diện cho cung phu thê tàng chứa ${dayPillar.shiShenZhi.join(', ')}. Tình cảm sâu sắc, người phối ngẫu là điểm tựa hoặc là người đồng cam cộng khổ cùng xây đắp tương lai.`;

  // Thai nguyên, Mệnh cung, Thân cung
  const ty = eightChar.getTaiYuan();
  const tyNaYin = NAYIN_VI[eightChar.getTaiYuanNaYin()] || eightChar.getTaiYuanNaYin();
  const mg = eightChar.getMingGong();
  const mgNaYin = NAYIN_VI[eightChar.getMingGongNaYin()] || eightChar.getMingGongNaYin();
  const sg = eightChar.getShenGong();
  const sgNaYin = NAYIN_VI[eightChar.getShenGongNaYin()] || eightChar.getShenGongNaYin();

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    timePillar,
    dayMaster: {
      stem: dStem,
      vi: dmInfo.vi,
      element: dmInfo.element,
      nature: `${dmInfo.element} ${dmInfo.polarity}`,
      strength,
      strengthDesc,
    },
    elementsCount: count,
    dominantElement,
    lackingElement,
    taiYuan: { name: ty, naYin: tyNaYin },
    mingGong: { name: mg, naYin: mgNaYin },
    shenGong: { name: sg, naYin: sgNaYin },
    insightOverview,
    careerFinance,
    loveMarriage,
  };
}

