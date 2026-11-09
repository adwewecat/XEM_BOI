/**
 * lib/metaphysics/almanac.ts
 * Module Xem Ngày Lành Dữ · Trạch Nhật Phong Thủy & Vận Nhật Quá Khứ - Vị Lai
 * Tính toán Hoàng Đạo, Hắc Đạo, Nhị Thập Bát Tú, Thập Nhị Trực, Nghi Kỵ và Tương Hợp Tuổi Mệnh.
 */

import { Solar, Lunar } from 'lunar-javascript';

// Bát Quái / Lục Xung / Tam Hợp / Lục Hợp quy chiếu
const ZHI_LIST = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

// 6 Cặp Lục Hợp
const LUC_HOP: Record<string, string> = {
  'Tý': 'Sửu', 'Sửu': 'Tý',
  'Dần': 'Hợi', 'Hợi': 'Dần',
  'Mão': 'Tuất', 'Tuất': 'Mão',
  'Thìn': 'Dậu', 'Dậu': 'Thìn',
  'Tỵ': 'Thân', 'Thân': 'Tỵ',
  'Ngọ': 'Mùi', 'Mùi': 'Ngọ',
};

// 4 Cục Tam Hợp
const TAM_HOP: Record<string, string[]> = {
  'Thân': ['Tý', 'Thìn'], 'Tý': ['Thân', 'Thìn'], 'Thìn': ['Thân', 'Tý'],
  'Hợi': ['Mão', 'Mùi'], 'Mão': ['Hợi', 'Mùi'], 'Mùi': ['Hợi', 'Mão'],
  'Dần': ['Ngọ', 'Tuất'], 'Ngọ': ['Dần', 'Tuất'], 'Tuất': ['Dần', 'Ngọ'],
  'Tỵ': ['Dậu', 'Sửu'], 'Dậu': ['Tỵ', 'Sửu'], 'Sửu': ['Tỵ', 'Dậu'],
};

// 6 Cặp Lục Xung
const LUC_XUNG: Record<string, string> = {
  'Tý': 'Ngọ', 'Ngọ': 'Tý',
  'Sửu': 'Mùi', 'Mùi': 'Sửu',
  'Dần': 'Thân', 'Thân': 'Dần',
  'Mão': 'Dậu', 'Dậu': 'Mão',
  'Thìn': 'Tuất', 'Tuất': 'Thìn',
  'Tỵ': 'Hợi', 'Hợi': 'Tỵ',
};

// Từ điển dịch việc nên làm & kiêng cữ
const YI_JI_VI: Record<string, string> = {
  '祭祀': 'Tế tự, cúng tế, tạ lễ gia tiên',
  '祈福': 'Cầu phúc, cầu bình an, xin lộc',
  '求嗣': 'Cầu con cái, cầu hậu duệ',
  '开光': 'Khai quang điểm nhãn, rước tượng thần tài',
  '出行': 'Xuất hành đi xa, du lịch, công tác',
  '嫁娶': 'Cưới hỏi, rước dâu, đính hôn',
  '纳采': 'Dạm ngõ, ăn hỏi, nạp lễ cưới',
  '入宅': 'Nhập trạch, về nhà mới, dọn chỗ ở mới',
  '安床': 'Kê giường, an vị phòng ngủ',
  '开市': 'Khai trương cửa hàng, mở hàng buôn bán',
  '立券': 'Ký kết hợp đồng, giao dịch thương mại',
  '交易': 'Giao dịch mua bán, ký kết tài chính',
  '纳财': 'Thu nợ, nạp tài lộc, mở tài khoản ngân hàng',
  '动土': 'Động thổ, khởi công xây dựng công trình',
  '修造': 'Tu sửa nhà cửa, nâng cấp nội thất',
  '破土': 'Đào móng, khai quang huyệt vị',
  '安葬': 'An táng, cải táng, làm lễ chôn cất',
  '求医': 'Khám chữa bệnh, cầu danh y, bốc thuốc',
  '治病': 'Điều trị bệnh tật, phẫu thuật dưỡng sinh',
  '移徙': 'Chuyển dọn nhà cửa, di dời văn phòng',
  '竖柱': 'Dựng cột nhà, thượng lương',
  '上梁': 'Cất nóc, lễ thượng lương',
  '栽种': 'Trồng trọt thảo mộc, canh tác cây cối',
  '纳畜': 'Chăn nuôi, mua gia súc vật nuôi',
  '沐浴': 'Tắm gội thanh tẩy thân tâm',
  '扫舍': 'Quét dọn nhà cửa, thanh lọc không gian sống',
  '安门': 'Lắp cửa chính, sửa cổng ngõ',
  '作灶': 'Sửa bếp, đặt bếp mới',
  '修坟': 'Tu sửa phần mộ gia tiên',
  '馀事勿取': 'Các việc lớn khác nên tránh, chỉ nên làm việc thường',
  '诸事不宜': 'Trăm sự đều nên kiêng cữ, tránh khởi sự việc lớn',
  '无': 'Không có điều kiêng kỵ đặc biệt',
};

export interface HourlyFortune {
  hourName: string;
  timeRange: string;
  tianShen: string;
  isHuangDao: boolean;
  luck: string;
}

export interface AlmanacResult {
  solarDate: string;
  solarDayOfWeek: string;
  lunarDateStr: string;
  lunarMonthName: string;
  lunarDay: number;
  ganZhiYear: string;
  ganZhiMonth: string;
  ganZhiDay: string;
  naYinDay: string;
  jieQi: string;
  // Hoàng đạo / Hắc đạo
  tianShen: string;
  tianShenType: string;
  isHuangDao: boolean;
  tianShenLuck: string;
  // 28 Tú
  xiuName: string;
  xiuLuck: string;
  xiuPoem: string;
  // Xung sát
  chongZhi: string;
  shaDirection: string;
  pengZuGan: string;
  pengZuZhi: string;
  // Việc nên / kiêng
  yiList: string[];
  jiList: string[];
  // 12 Khung giờ
  hourlyList: HourlyFortune[];
  // Tương hợp với bản mệnh người dùng
  userCompatibility?: {
    userYearZhi: string;
    userName: string;
    relationType: 'luc_hop' | 'tam_hop' | 'luc_xung' | 'binh_thuong';
    title: string;
    description: string;
    score: number;
  };
}

export function calculateAlmanac(targetDate: Date | string, userProfile?: { year?: number; name?: string; gender?: string }): AlmanacResult {
  const d = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const solar = Solar.fromYmd(d.getFullYear(), d.getMonth() + 1, d.getDate());
  const lunar = solar.getLunar() as any;

  // Thứ trong tuần
  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const solarDayOfWeek = daysOfWeek[d.getDay()];

  // Hoàng Đạo / Hắc Đạo
  const tianShen = lunar.getDayTianShen ? lunar.getDayTianShen() : '';
  const tianShenType = lunar.getDayTianShenType ? lunar.getDayTianShenType() : '';
  const isHuangDao = String(tianShenType).includes('黄道');
  const tianShenLuck = lunar.getDayTianShenLuck ? lunar.getDayTianShenLuck() : '';

  // 28 Tú
  const xiuName = lunar.getXiu ? lunar.getXiu() : '';
  const xiuLuck = lunar.getXiuLuck ? lunar.getXiuLuck() : '';
  const xiuPoem = lunar.getXiuSong ? lunar.getXiuSong() : '';

  // Can Chi ngày
  const ganZhiDay = lunar.getDayInGanZhi ? lunar.getDayInGanZhi() : '';
  const naYinDay = lunar.getDayNaYin ? lunar.getDayNaYin() : '';

  // Xung sát & Bành Tổ
  const chongZhi = lunar.getDayChongDesc ? lunar.getDayChongDesc() : '';
  const shaDirection = lunar.getDaySha ? lunar.getDaySha() : '';
  const pengZuGan = lunar.getPengZuGan ? lunar.getPengZuGan() : '';
  const pengZuZhi = lunar.getPengZuZhi ? lunar.getPengZuZhi() : '';

  // Việc Nên & Kiêng
  const rawYi: string[] = (lunar.getDayYi ? lunar.getDayYi() : []) || [];
  const rawJi: string[] = (lunar.getDayJi ? lunar.getDayJi() : []) || [];

  const yiList = rawYi.map((y: string) => YI_JI_VI[y] || y);
  const jiList = rawJi.map((j: string) => YI_JI_VI[j] || j);

  // 12 Khung Giờ trong ngày từ getTimes() của lunar-javascript
  const times = lunar.getTimes ? lunar.getTimes() : [];
  const hourlyList: HourlyFortune[] = times.map((t: any) => {
    const isHd = String(t.getTianShenType ? t.getTianShenType() : '').includes('黄道');
    const zhi = t.getZhi ? t.getZhi() : '';
    const ganZhi = t.getGanZhi ? t.getGanZhi() : '';
    const minHm = t.getMinHm ? t.getMinHm() : '';
    const maxHm = t.getMaxHm ? t.getMaxHm() : '';

    return {
      hourName: `Giờ ${zhi} (${ganZhi})`,
      timeRange: `${minHm} - ${maxHm}`,
      tianShen: t.getTianShen ? t.getTianShen() : '',
      isHuangDao: isHd,
      luck: t.getTianShenLuck ? t.getTianShenLuck() : '',
    };
  });

  // Tương hợp với tuổi của người dùng
  let userCompatibility: AlmanacResult['userCompatibility'] = undefined;
  if (userProfile && userProfile.year) {
    const userBirthLunar = Solar.fromYmd(userProfile.year, 6, 15).getLunar() as any;
    const userZhiRaw = userBirthLunar.getYearZhi ? userBirthLunar.getYearZhi() : '';
    const dayZhiRaw = lunar.getDayZhi ? lunar.getDayZhi() : '';

    // Map sang tên Chi tiếng Việt
    const zhiMap: Record<string, string> = {
      '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão',
      '辰': 'Thìn', '巳': 'Tỵ', '午': 'Ngọ', '未': 'Mùi',
      '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi',
    };

    const userZhiVi = zhiMap[userZhiRaw] || userZhiRaw;
    const dayZhiVi = zhiMap[dayZhiRaw] || dayZhiRaw;

    if (LUC_XUNG[userZhiVi] === dayZhiVi) {
      userCompatibility = {
        userYearZhi: userZhiVi,
        userName: userProfile.name || 'Đương Số',
        relationType: 'luc_xung',
        title: `⚠️ Ngày Trực Xung Với Bản Mệnh (${userZhiVi} Xung ${dayZhiVi})`,
        description: `Ngày này mang địa chi ${dayZhiVi} trực xung với tuổi ${userZhiVi} của bạn. Từ trường đối chọi, tâm lý dễ nóng vội, làm việc dễ phát sinh trắc trở ngoài ý muốn. Nên hạn chế ký kết hợp đồng lớn, kiêng cãi cọ tranh chấp và cẩn thận khi lái xe xuất hành.`,
        score: 40,
      };
    } else if (LUC_HOP[userZhiVi] === dayZhiVi) {
      userCompatibility = {
        userYearZhi: userZhiVi,
        userName: userProfile.name || 'Đương Số',
        relationType: 'luc_hop',
        title: `✨ Ngày Lục Hợp Quý Nhân (${userZhiVi} Hợp ${dayZhiVi})`,
        description: `Ngày này mang địa chi ${dayZhiVi} hòa hợp tuyệt đối (Lục Hợp) với bản mệnh tuổi ${userZhiVi} của bạn. Khí trường tương sinh tương trợ, dễ gặp quý nhân nâng đỡ, thích hợp để gặp gỡ đối tác, bàn chuyện hôn sự, bắt đầu dự án mới.`,
        score: 95,
      };
    } else if (TAM_HOP[userZhiVi]?.includes(dayZhiVi)) {
      userCompatibility = {
        userYearZhi: userZhiVi,
        userName: userProfile.name || 'Đương Số',
        relationType: 'tam_hop',
        title: `🌟 Ngày Tam Hợp Cát Lợi (${userZhiVi} Tam Hợp ${dayZhiVi})`,
        description: `Ngày ${dayZhiVi} cùng với tuổi ${userZhiVi} của bạn nằm trong tam hợp cục tương sinh vượng khí. Mọi sự mưu cầu về công danh, học hành, tài lộc đều có thêm trợ lực hanh thông, đón lành tránh dữ.`,
        score: 90,
      };
    } else {
      userCompatibility = {
        userYearZhi: userZhiVi,
        userName: userProfile.name || 'Đương Số',
        relationType: 'binh_thuong',
        title: `🌿 Ngày Bình Hòa Với Bản Mệnh (${userZhiVi} - ${dayZhiVi})`,
        description: `Ngày này không xung không khắc với tuổi ${userZhiVi} của bạn. Bạn có thể y theo cát hung Hoàng Đạo / Hắc Đạo của ngày để tiến hành các công việc thường nhật thuận lợi.`,
        score: 75,
      };
    }
  }

  const yStr = d.getFullYear();
  const mStr = String(d.getMonth() + 1).padStart(2, '0');
  const dStr = String(d.getDate()).padStart(2, '0');

  return {
    solarDate: `${yStr}-${mStr}-${dStr}`,
    solarDayOfWeek,
    lunarDateStr: `Ngày ${lunar.getDay()} tháng ${Math.abs(lunar.getMonth())}${lunar.getMonth() < 0 ? ' (Nhuận)' : ''} năm ${lunar.getYear()}`,
    lunarMonthName: `Tháng ${Math.abs(lunar.getMonth())} Âm lịch`,
    lunarDay: lunar.getDay(),
    ganZhiYear: lunar.getYearInGanZhi ? lunar.getYearInGanZhi() : '',
    ganZhiMonth: lunar.getMonthInGanZhi ? lunar.getMonthInGanZhi() : '',
    ganZhiDay,
    naYinDay,
    jieQi: (lunar.getJieQi ? lunar.getJieQi() : '') || 'Thường Khí',
    tianShen,
    tianShenType: isHuangDao ? 'Hoàng Đạo (Cát Lợi)' : 'Hắc Đạo (Thận Trọng)',
    isHuangDao,
    tianShenLuck,
    xiuName: `${xiuName} Tinh`,
    xiuLuck,
    xiuPoem,
    chongZhi,
    shaDirection: `Hướng Sát: ${shaDirection}`,
    pengZuGan,
    pengZuZhi,
    yiList,
    jiList,
    hourlyList,
    userCompatibility,
  };
}
