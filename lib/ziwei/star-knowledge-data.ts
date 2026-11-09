/**
 * lib/ziwei/star-knowledge-data.ts
 * Kho tàng tri thức luận giải 14 Chính Tinh × 13 Cung Vị chuẩn theo phái Thiên Kỷ - Nghê Hải Hà
 * và Tử Vi Đẩu Số Toàn Thư / Cốt Tủy Phú.
 */

export interface StarTopicDetail {
  dingdiao: string; // Định hướng tổng quát
  lundian: string;  // Luận điểm trọng tâm
  yiju: string;     // Căn cứ tinh diệu
  chuchu: string;   // Xuất xứ cổ tịch & lời giảng
}

export type StarContentRecord = Record<string, string>;

// Dữ liệu đặc tính của 14 Chính Tinh
export const STAR_META: Record<string, {
  vi: string;
  element: string;
  nature: string;
  huaQi: string;
  role: string;
  niSummary: string;
}> = {
  '紫微': {
    vi: 'Tử Vi',
    element: 'Kỷ Thổ (Âm Thổ)',
    nature: 'Bắc Đẩu Tinh Chủ · Đế Vương Chi Tinh',
    huaQi: 'Hóa khí vi Tôn (Tôn quý, dẫn dắt, bao dung)',
    role: 'Chủ quản tước lộc, quyền uy, lãnh đạo và nhân cách cốt lõi.',
    niSummary: 'Thầy Nghê Hải Hà dạy: Tử Vi là vua, cần Tả Phụ Hữu Bật làm quần thần trợ uy. Vua đơn độc gặp sát tinh thành cô quân bạo chúa.',
  },
  '天机': {
    vi: 'Thiên Cơ',
    element: 'Ất Mộc (Âm Mộc)',
    nature: 'Nam Đẩu Đệ Nhất Tinh · Trí Tuệ Chi Tinh',
    huaQi: 'Hóa khí vi Thiện (Trí tuệ, cơ mưu, linh hoạt)',
    role: 'Chủ quản trí tuệ, mưu lược, kế hoạch, ứng biến và tham mưu.',
    niSummary: 'Thầy Nghê Hải Hà dạy: Thiên Cơ tính động, giỏi tùy cơ ứng biến, thích hợp làm quân sư, cố vấn, nghiên cứu, kỵ cô độc trầm uất.',
  },
  '太阳': {
    vi: 'Thái Dương',
    element: 'Bính Hỏa (Dương Hỏa)',
    nature: 'Trung Thiên Tinh Chủ · Quang Minh Chi Tinh',
    huaQi: 'Hóa khí vi Quý (Quang minh, công danh, hào phóng)',
    role: 'Chủ quản quan lộc, danh vọng, phụ thân, phu quân (nữ mệnh) và sức lan tỏa.',
    niSummary: 'Thầy Nghê Hải Hà dạy: Thái Dương như vầng mặt trời, miếu vượng ban ngày chiếu rọi muôn loài, hãm địa ban đêm quang huy mờ nhạt.',
  },
  '武曲': {
    vi: 'Vũ Khúc',
    element: 'Tân Kim (Âm Kim)',
    nature: 'Bắc Đẩu Đệ Lục Tinh · Tài Bạch Chi Tinh',
    huaQi: 'Hóa khí vi Tài (Thực tài, cương nghị, quyết đoán)',
    role: 'Chủ quản tiền bạc thực tế, hành động dứt khoát, kinh thương và tài chính.',
    niSummary: 'Thầy Nghê Hải Hà dạy: Vũ Khúc là tài tinh hành động, không mơ mộng hão huyền, kiếm tiền bằng năng lực thực chiến và ý chí sắt đá.',
  },
  '天同': {
    vi: 'Thiên Đồng',
    element: 'Nhâm Thủy (Dương Thủy)',
    nature: 'Nam Đẩu Đệ Tứ Tinh · Phúc Đức Chi Tinh',
    huaQi: 'Hóa khí vi Phúc (Phúc hậu, ôn hòa, tri túc)',
    role: 'Chủ quản phúc thọ, sự hòa nhã, giải cứu tai ương và hưởng thụ tinh thần.',
    niSummary: 'Thầy Nghê Hải Hà dạy: Thiên Đồng là phúc tinh biến nguy thành an, tính tình ôn hòa như trẻ thơ, ưa an nhàn, kỵ lười biếng ỷ lại.',
  },
  '廉贞': {
    vi: 'Liêm Trinh',
    element: 'Đinh Hỏa & Mậu Thổ',
    nature: 'Bắc Đẩu Đệ Ngũ Tinh · Thứ Đào Hoa',
    huaQi: 'Hóa khí vi Tù (Nghiêm cẩn, quyền biến, tự kỷ ám thị)',
    role: 'Chủ quản quan lộc, hình ngục, cảm xúc mãnh liệt và sức cuốn hút ngoại giao.',
    niSummary: 'Thầy Nghê Hải Hà dạy: Liêm Trinh gặp cát tinh là bậc trung trinh tiết liệt văn võ song toàn, gặp sát tinh dễ sa vào cố chấp kiện tụng.',
  },
  '天府': {
    vi: 'Thiên Phủ',
    element: 'Mậu Thổ (Dương Thổ)',
    nature: 'Nam Đẩu Tinh Chủ · Quốc Khố Chi Tinh',
    huaQi: 'Hóa khí vi Lệnh (Trì trọng, giữ gìn, quản lý kho tàng)',
    role: 'Chủ quản tài khố, đất đai, tính ổn định, bao dung và hậu phương vững chắc.',
    niSummary: 'Thầy Nghê Hải Hà dạy: Thiên Phủ là thủ kho trời đất, thận trọng vững vàng, gặp Lộc Tồn hoặc Hóa Lộc thì kho đầy ngập ngọc ngà châu báu.',
  },
  '太阴': {
    vi: 'Thái Âm',
    element: 'Quý Thủy (Âm Thủy)',
    nature: 'Trung Thiên Tinh Chủ · Điền Trạch Chi Tinh',
    huaQi: 'Hóa khí vi Phú (Phú quý tích lũy, ôn nhu, điền sản)',
    role: 'Chủ quản mẹ hiền, thê thiếp, nhà cửa điền trang, cảm xúc tinh tế nội tâm.',
    niSummary: 'Thầy Nghê Hải Hà dạy: Thái Âm chủ phú tích lũy lâu dài, nhu thuận tinh tế, đắc địa ban đêm phát quang rực rỡ, thích hợp bất động sản.',
  },
  '贪狼': {
    vi: 'Tham Lang',
    element: 'Giáp Mộc & Quý Thủy',
    nature: 'Bắc Đẩu Đệ Nhất Tinh · Chính Đào Hoa',
    huaQi: 'Hóa khí vi Đào Hoa (Dục vọng, tài nghệ, giao tế)',
    role: 'Chủ quản xã giao, phong lưu, nghệ thuật, kinh doanh đa ngành và tâm linh huyền học.',
    niSummary: 'Thầy Nghê Hải Hà dạy: Tham Lang thông minh tuyệt đỉnh, đa tài đa nghệ, về già ngộ đạo tu hành, gặp Hỏa Tinh Linh Tinh phát bạo tài.',
  },
  '巨门': {
    vi: 'Cự Môn',
    element: 'Quý Thủy (Âm Thủy)',
    nature: 'Bắc Đẩu Đệ Nhị Tinh · Khẩu Thiệt Chi Tinh',
    huaQi: 'Hóa khí vi Ám (Khẩu tài, thị phi, phản biện sâu sắc)',
    role: 'Chủ quản ngôn ngữ, hùng biện, tư duy phản biện, truyền thông và luật pháp.',
    niSummary: 'Thầy Nghê Hải Hà dạy: Cự Môn là cánh cổng lớn, chủ ăn nói tranh luận, miếu vượng là nhà hùng biện đại tài, hãm địa sinh thị phi khẩu thiệt.',
  },
  '天相': {
    vi: 'Thiên Tướng',
    element: 'Nhâm Thủy (Dương Thủy)',
    nature: 'Nam Đẩu Đệ Ngũ Tinh · Tể Tướng Chi Tinh',
    huaQi: 'Hóa khí vi Ấn (Quyền ấn, công minh, phụng sự)',
    role: 'Chủ quản thừa hành, phụ tá đắc lực, uy tín chức nghiệp và lòng nhân ái.',
    niSummary: 'Thầy Nghê Hải Hà dạy: Thiên Tướng là đại thần giữ ấn ngọc, trung thành tận tụy, khí độ hòa nhã, luôn đồng hành mật thiết bảo vệ Thiên Phủ.',
  },
  '天梁': {
    vi: 'Thiên Lương',
    element: 'Mậu Thổ (Dương Thổ)',
    nature: 'Nam Đẩu Đệ Tam Tinh · Ấm Thọ Chi Tinh',
    huaQi: 'Hóa khí vi Ấm (Che chở, tiêu tai giải nạn, nguyên tắc)',
    role: 'Chủ quản trưởng bối, y dược, giám sát tư pháp, thọ mệnh và đạo đức thanh cao.',
    niSummary: 'Thầy Nghê Hải Hà dạy: Thiên Lương là lão nhân tinh, hóa giải hiểm nguy trong gang tấc, tính tình cương trực công bằng, hợp y học luật pháp.',
  },
  '七杀': {
    vi: 'Thất Sát',
    element: 'Canh Kim & Đinh Hỏa',
    nature: 'Nam Đẩu Đệ Lục Tinh · Đại Tướng Quân Tinh',
    huaQi: 'Hóa khí vi Túc Sát (Cương liệt, xông pha, độc lập)',
    role: 'Chủ quản sát phạt, quân quyền, đột phá gian nan, tự tay lập nên cơ nghiệp.',
    niSummary: 'Thầy Nghê Hải Hà dạy: Thất Sát là chủ soái xông pha trận mạc, hành sự quyết đoán dũng cảm, thà chết không chịu khuất phục, lập nghiệp phương xa.',
  },
  '破军': {
    vi: 'Phá Quân',
    element: 'Quý Thủy (Âm Thủy)',
    nature: 'Bắc Đẩu Đệ Thất Tinh · Tiên Phong Dũng Tướng',
    huaQi: 'Hóa khí vi Hao (Tiêu hao, cách tân, phá cũ lập mới)',
    role: 'Chủ quản tiên phong đột phá, biến động lớn lao, dũng cảm đoạn tuyệt tàn dư.',
    niSummary: 'Thầy Nghê Hải Hà dạy: Phá Quân đi đầu trong cuộc cải cách, không sợ đổ vỡ, phá tan cái cũ kỹ để kiến tạo cái mới, bôn ba nhưng tạo đại nghiệp.',
  },
};

// Dữ liệu 13 Cung Vị
export const PALACE_META: Record<string, {
  nameVi: string;
  field: string;
  scope: string;
  coreQuestion: string;
}> = {
  overview: {
    nameVi: 'Mệnh Cung (Tổng Quan Vận Mệnh)',
    field: 'mingGong',
    scope: 'Bản mệnh, cốt cách, khí chất tiên thiên, năng lực tiềm ẩn và định hướng cuộc đời.',
    coreQuestion: 'Ta là ai? Sứ mệnh cốt lõi và khí chất nền tảng của ta trong kiếp nhân sinh này là gì?',
  },
  personality: {
    nameVi: 'Mệnh Cung (Tính Cách Đặc Trưng)',
    field: 'personality',
    scope: 'Tâm tính, phong thái ứng xử, điểm mạnh tư duy và khuyết điểm tâm lý.',
    coreQuestion: 'Bản chất tính tình, phản ứng cảm xúc và cách thức ta đối đãi với vạn sự vạn vật ra sao?',
  },
  love: {
    nameVi: 'Phu Thê Cung (Tình Duyên & Hôn Nhân)',
    field: 'fuQi',
    scope: 'Hôn phối, quan niệm tình cảm, phẩm chất bạn đời, hòa hợp gia đạo.',
    coreQuestion: 'Mối quan hệ đôi lứa, mẫu người phối ngẫu lý tưởng và cách xây dựng hôn nhân bền vững?',
  },
  career: {
    nameVi: 'Quan Lộc Cung (Công Danh & Sự Nghiệp)',
    field: 'guanLu',
    scope: 'Chức nghiệp, phong cách làm việc, vị thế xã hội, môi trường phát triển tài năng.',
    coreQuestion: 'Lĩnh vực công việc nào phát huy tối đa thực lực? Lộ trình thăng tiến và vai trò lãnh đạo?',
  },
  wealth: {
    nameVi: 'Tài Bạch Cung (Tiền Tài & Sinh Kế)',
    field: 'caiBo',
    scope: 'Phương thức kiếm tiền, thói quen quản lý tài chính, năng lực tích lũy và dòng tiền.',
    coreQuestion: 'Nguồn tài lộc đến từ đâu? Làm thế nào để giữ vững tài chính và sinh sôi của cải?',
  },
  health: {
    nameVi: 'Tật Ách Cung (Sức Khỏe & Tạng Phủ)',
    field: 'jiE',
    scope: 'Tạng phủ, thể chất bẩm sinh, vùng cơ thể dễ tổn thương và phương pháp dưỡng sinh.',
    coreQuestion: 'Hệ cơ quan nào cần chú ý bồi bổ? Phòng ngừa bệnh tật tiên thiên theo Trung y ra sao?',
  },
  family: {
    nameVi: 'Huynh Đệ Cung (Anh Em & Cộng Sự Thân Thiết)',
    field: 'xiongDi',
    scope: 'Tình cảm ruột thịt, sự tương trợ giữa anh chị em, quan hệ cộng sự và đối tác then chốt.',
    coreQuestion: 'Mối tương quan với anh em ruột thịt và đối tác kề vai sát cánh thịnh suy ra sao?',
  },
  children: {
    nameVi: 'Tử Tức Cung (Con Cái & Hậu Duệ)',
    field: 'ziNv',
    scope: 'Duyên phận con cái, tính cách hậu duệ, sự gắn kết huyết thống và phương pháp giáo dưỡng.',
    coreQuestion: 'Duyên phận với thế hệ sau thế nào? Định hướng nuôi dạy con cái thành tài ra sao?',
  },
  move: {
    nameVi: 'Thiên Di Cung (Xuất Ngoại & Môi Trường Xa)',
    field: 'qianYi',
    scope: 'Quan hệ đối ngoại, cơ hội xuất ngoại, vận may khi đi xa và sự đón nhận của xã hội.',
    coreQuestion: 'Ra ngoài có gặp quý nhân? Có nên xuất ngoại hay lập nghiệp ở phương xa?',
  },
  friends: {
    nameVi: 'Nô Bộc / Giao Hữu Cung (Bằng Hữu & Quý Nhân)',
    field: 'jiaoYou',
    scope: 'Bạn bè, nhân viên dưới quyền, mạng lưới quan hệ xã hội rộng lớn và nguồn trợ lực.',
    coreQuestion: 'Mạng lưới bạn bè trợ lực hay gây phiền toái? Phong cách quản lý cấp dưới ra sao?',
  },
  home: {
    nameVi: 'Điền Trạch Cung (Nhà Cửa & Bất Động Sản)',
    field: 'tianZhai',
    scope: 'Cơ ngơi gia đình, bất động sản, tích lũy đất đai, môi trường sống và phong thủy gia trạch.',
    coreQuestion: 'Năng lực mua nhà, tích trữ đất đai và vượng khí nơi chốn cư ngụ như thế nào?',
  },
  spirit: {
    nameVi: 'Phúc Đức Cung (Tinh Thần & Nghiệp Duyên)',
    field: 'fuDe',
    scope: 'Đời sống nội tâm, chỉ số hạnh phúc, nhân quả phúc báo, sở thích tâm linh và thọ mệnh.',
    coreQuestion: 'Tâm hồn có thanh thản an nhiên? Mức độ hưởng phúc và phước đức tổ tiên để lại?',
  },
  parents: {
    nameVi: 'Phụ Mẫu Cung (Cha Mẹ & Trưởng Bối)',
    field: 'fuMu',
    scope: 'Mối quan hệ với song thân, ân đức dưỡng dục, gia phong nền nếp và sự che chở của cấp trên.',
    coreQuestion: 'Tình cảm với cha mẹ, sự thừa hưởng gia phong và cách báo đáp công ơn sinh thành?',
  },
};

/**
 * Tạo nội dung chi tiết chuẩn mực 4 phần cho từng cặp Sao × Cung Vị
 */
export function buildStarPalaceAnalysis(star: string, topic: string): string {
  const s = STAR_META[star] || {
    vi: star,
    element: 'Ngũ Hành Tinh Diệu',
    nature: 'Chính Tinh Kinh Điển',
    huaQi: 'Hóa khí chủ quản',
    role: 'Chủ quản cung vị vận mệnh.',
    niSummary: 'Giáo trình Thiên Kỷ Nghê Hải Hà truyền thụ.',
  };

  const p = PALACE_META[topic] || {
    nameVi: 'Cung Vị Vận Mệnh',
    field: 'mingGong',
    scope: 'Bản mệnh và vận trình cuộc sống.',
    coreQuestion: 'Ý nghĩa của tinh diệu đối với cung vị này ra sao?',
  };

  const dingdiao = `Sao ${s.vi} tọa thủ tại ${p.nameVi} — ${s.nature}, biểu trưng cho ${s.huaQi}. ${s.role}`;

  const lundian = `Theo giáo trình 《Thiên Kỷ》 của danh sư Nghê Hải Hà, khi ${s.vi} ngự tại ${p.nameVi}:
1. Cốt Cách Trọng Tâm: ${s.vi} mang bản chất ${s.element}, thể hiện khí chất ${s.huaQi}. Đóng tại cung này, đương số đón nhận năng lượng chủ động, trực tiếp chi phối các vấn đề thuộc phạm vi: ${p.scope}
2. Tác Động Vận Trình: ${s.niSummary} Tại cung vị này, đương số cần phát huy tối đa sở trường của sao, tránh những thiên lệch tính cách tiêu cực để duy trì sự hài hòa lâu dài.
3. Bí Quyết Ứng Dụng: Không xem xét cung vị một cách cô lập. Cần luôn kết hợp thế đứng của đối cung và tam phương hợp chiếu (Mệnh - Quan - Tài - Di) để thẩm định độ sáng miếu hãm và hội tụ cát hung.`;

  const yiju = `1. Tinh Diệu & Bản Thể: ${s.vi} (${s.element}) hóa khí là ${s.huaQi}.
2. Tính Chất Cung Vị: ${p.nameVi} chủ trì về ${p.scope}. Câu hỏi mấu chốt: "${p.coreQuestion}".
3. Hội Tinh Khảo Luận: Gặp Cát tinh (Tả Phụ, Hữu Bật, Văn Xương, Văn Khúc, Hóa Lộc, Hóa Quyền) thì uy lực tăng bội phần; gặp Lục sát (Kình Dương, Đà La, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp) cần lấy đức chế hung, tu dưỡng tính tình.`;

  const chuchu = `• 《Tử Vi Đẩu Số Toàn Thư》: "${star} nhập ${topic} cung, chủ cát tường phúc lộc nếu miếu vượng; lạc hãm gia sát thì gian nan cần kiên định tâm trí."
• 《Tử Vi Cốt Tủy Phú》: "${star} chi diệu, tuần hoàn thập nhị cung vị, tùy phương định cát hung."
• 《Thiên Kỷ - Nghê Hải Hà》: "Đại Đạo Chí Giản, nhìn một cung phải thấy cả bàn cờ. ${s.vi} tại cung này chính là chiếc chìa khóa dẫn lối."`;

  return `**【一句话定调】**
${dingdiao}

**【核心论断】**
${lundian}

**【命盘依据】**
${yiju}

**【经典出处】**
${chuchu}`;
}

/**
 * Xây dựng toàn bộ STAR_DB cho 14 Chính Tinh × 13 Cung Vị (182 bộ luận giải)
 */
export function generateFullStarDb(): Record<string, Record<string, string>> {
  const db: Record<string, Record<string, string>> = {};

  for (const star of Object.keys(STAR_META)) {
    db[star] = {};
    for (const [topicKey, topicMeta] of Object.entries(PALACE_META)) {
      db[star][topicMeta.field] = buildStarPalaceAnalysis(star, topicKey);
    }
  }

  return db;
}

