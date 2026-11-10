/**
 * Thuật Tướng Pháp Bàn Tay & Bói Chỉ Tay Toàn Thư (Palmistry Engine)
 * Kết hợp Nhân Tướng Học Đông Phương (Cổ thư Ma Y Thần Tướng, Thủy Kính Thần Tướng)
 * và Thuật Đọc Chỉ Tay Chiêm Tinh Tây Phương (Chirognomy & Chiromancy).
 */

export type HandElement = 'kim' | 'moc' | 'thuy' | 'hoa' | 'tho';
export type HandSide = 'left' | 'right';

export type LifeLineType = 'dai_sau' | 'ngan_manh' | 're_nhanh' | 'dut_doan' | 'uon_cong_rong';
export type HeadLineType = 'thang_dai' | 'cong_xuong' | 'chia_doi' | 'ngan_thang' | 'uon_luon';
export type HeartLineType = 'dai_len_moc_tinh' | 'ngan_duoi_tho_tinh' | 'cong_sau' | 'duoi_en' | 'thang_ngang';
export type FateLineType = 'ro_net_thang' | 'tu_go_nguyet' | 'dut_doan' | 'huong_thai_duong' | 'mo_nhat';
export type SpecialSign = 'chu_m' | 'chu_nhat' | 'tam_giac_vang' | 'vong_moc_tinh' | 'mat_phat';

export interface PalmInput {
  element: HandElement;
  side: HandSide;
  lifeLine: LifeLineType;
  headLine: HeadLineType;
  heartLine: HeartLineType;
  fateLine: FateLineType;
  specialSigns: SpecialSign[];
  gender?: 'male' | 'female';
}

export interface PalmAnalysisSection {
  name: string;
  glyph: string;
  title: string;
  score: number; // Thang điểm 1-100
  summary: string;
  details: string[];
  advice: string;
}

export interface PalmistryResult {
  input: PalmInput;
  elementInfo: {
    name: string;
    shapeDesc: string;
    personality: string;
    careerFit: string;
    luckyColor: string;
  };
  sideMeaning: string;
  lifeLine: PalmAnalysisSection;
  headLine: PalmAnalysisSection;
  heartLine: PalmAnalysisSection;
  fateLine: PalmAnalysisSection;
  specialSignsInfo: Array<{
    id: SpecialSign;
    name: string;
    rarity: string;
    meaning: string;
    blessing: string;
  }>;
  mountsOverview: {
    venus: string;   // Gò Kim Tinh (sinh lực, tình cảm)
    jupiter: string; // Gò Mộc Tinh (danh vọng, ý chí)
    sun: string;     // Gò Thái Dương (tài năng, nghệ thuật, danh tiếng)
    mercury: string; // Gò Thủy Tinh (kinh doanh, giao tiếp)
    moon: string;    // Gò Nguyệt Tinh (trực giác, tưởng tượng)
  };
  overallVerdict: {
    archetype: string;
    destinyGrade: 'Thượng Cách' | 'Trung Cát Cách' | 'Cát Cách Tiềm Tàng' | 'Đại Khí Vãn Thành';
    summary: string;
    careerProspect: string;
    loveProspect: string;
    wealthProspect: string;
    keyAction: string;
  };
}

// ─── Dữ Liệu 5 Hình Thái Bàn Tay Theo Ngũ Hành ──────────────────────
export const HAND_ELEMENT_DATA: Record<HandElement, {
  name: string;
  shapeDesc: string;
  personality: string;
  careerFit: string;
  luckyColor: string;
}> = {
  kim: {
    name: 'Bàn Tay Hành Kim (Vuông Vức · Cương Nghị)',
    shapeDesc: 'Lòng bàn tay vuông vức, ngón tay vừa vặn đầu ngón hơi tròn vuông, da dẻ săn chắc trắng sáng.',
    personality: 'Tính cách ngay thẳng, kỷ luật thép, giữ chữ tín, trọng công lý, có óc tổ chức và khả năng thực thi phi thường.',
    careerFit: 'Quân đội, công an, tư pháp, quản trị doanh nghiệp, ngân hàng, cơ khí công nghệ cao, kiến trúc sư.',
    luckyColor: 'Vàng ánh kim, trắng tuyết, bạc',
  },
  moc: {
    name: 'Bàn Tay Hành Mộc (Thon Dài · Tri Thức)',
    shapeDesc: 'Lòng bàn tay hình chữ nhật thon dài, ngón tay xương gầy rõ các đốt lóng, chỉ tay mảnh và chằng chịt.',
    personality: 'Hiếu học, tư duy triết học uyên bác, giàu óc sáng tạo, trọng danh dự hơn tiền bạc, tâm tính điềm đạm thanh cao.',
    careerFit: 'Giáo dục, nghiên cứu khoa học, viết lách văn học, triết học, lập trình phần mềm, y khoa, cố vấn chiến lược.',
    luckyColor: 'Xanh lục bảo, xanh ngọc, xanh rêu',
  },
  thuy: {
    name: 'Bàn Tay Hành Thủy (Tròn Trặn · Linh Hoạt)',
    shapeDesc: 'Lòng bàn tay tròn đầy đặn múp míp, ngón tay mũm mĩm mềm mại, da tay mịn màng hồng nhuận.',
    personality: 'Khéo léo trong giao tiếp, trực giác siêu nhạy, khả năng thích nghi tuyệt vời, giàu cảm xúc và nhân duyên rộng mở.',
    careerFit: 'Thương mại quốc tế, ngoại giao, marketing, nghệ thuật biểu diễn, ẩm thực khách sạn, logistics hàng hải.',
    luckyColor: 'Đen huyền, xanh dương sapphire, lam đậm',
  },
  hoa: {
    name: 'Bàn Tay Hành Hỏa (Nhiệt Huyết · Tiên Phong)',
    shapeDesc: 'Lòng bàn tay dài nhưng ngón tay tương đối ngắn, chỉ tay đỏ hồng rõ nét, lòng bàn tay ấm nóng.',
    personality: 'Nhiệt huyết bùng cháy, nhiều tham vọng, dám nghĩ dám làm, giàu sức thu hút người khác, có tố chất lãnh đạo bẩm sinh.',
    careerFit: 'Khởi nghiệp kinh doanh, đầu tư mạo hiểm, chính trị, thể thao đỉnh cao, sân khấu giải trí, diễn giả truyền cảm hứng.',
    luckyColor: 'Đỏ son, hồng ngọc, cam lửa, tím hoàng gia',
  },
  tho: {
    name: 'Bàn Tay Hành Thổ (Dày Cộm · Vững Chãi)',
    shapeDesc: 'Lòng bàn tay vuông dày, ngón tay ngắn và mập chắc, chỉ tay sâu và ít đường vân phụ, da tay dày dặn.',
    personality: 'Thực tế, kiên nhẫn sắt đá, chân thành, cần cù, ghét sự viển vông, tích lũy điền sản và của cải vô cùng bền bỉ.',
    careerFit: 'Bất động sản, xây dựng, nông nghiệp công nghệ cao, sản xuất công nghiệp, quản lý chuỗi cung ứng, khai khoáng.',
    luckyColor: 'Vàng đất hoàng thổ, nâu hổ phách, cà phê',
  },
};

// ─── Dữ Liệu Luận Giải Đường Sinh Đạo (Life Line) ──────────────────
const LIFE_LINE_DATA: Record<LifeLineType, { title: string; score: number; summary: string; details: string[]; advice: string }> = {
  dai_sau: {
    title: 'Đường Sinh Đạo Dài, Sâu & Hồng Nhuận',
    score: 95,
    summary: 'Biểu tượng của sinh lực dồi dào, thể chất tráng kiện, sức đề kháng phi thường và tuổi thọ viên mãn.',
    details: [
      'Năng lượng dồi dào, hiếm khi ốm vặt nặng, khả năng tự hồi phục sau mệt mỏi cực kỳ nhanh chóng.',
      'Tâm thái lạc quan, tính cách bền bỉ kiên cường trước áp lực cuộc sống.',
      'Gia đạo hưng vượng, về hậu vận con cháu sum vầy, hưởng an lạc trường thọ.',
    ],
    advice: 'Phát huy nền tảng thể lực dồi dào để cống hiến cho đại nghiệp; giữ lối sống điều độ để duy trì nguyên khí trời ban.',
  },
  ngan_manh: {
    title: 'Đường Sinh Đạo Ngắn Nhưng Đậm Nét',
    score: 82,
    summary: 'Sinh lực tập trung cao độ, bùng nổ mạnh mẽ, tuổi thọ không phụ thuộc độ dài mà dựa vào chất lượng sống.',
    details: [
      'Cổ thư tướng pháp khẳng định: Đường sinh đạo ngắn không đồng nghĩa với đoản mệnh nếu gò Kim Tinh đầy đặn và có đường sinh đạo phụ (Hỏa Tinh).',
      'Tính tình quyết liệt, sống hết mình với từng khoảnh khắc hiện tại, ghét sự lề mề trì hoãn.',
      'Thời trẻ bươn chải tiêu hao nhiều năng lượng, cần chú ý cân bằng lao động và nghỉ ngơi.',
    ],
    advice: 'Nên rèn luyện dưỡng sinh, tránh thức khuya và làm việc kiệt sức; tích lũy phúc đức bằng việc thiện để tăng ích tuổi thọ.',
  },
  re_nhanh: {
    title: 'Đường Sinh Đạo Phân Nhánh Về Cuối',
    score: 88,
    summary: 'Cuộc đời nhiều biến động di chuyển, thích xuất ngoại bôn ba hoặc đổi nơi sinh sống mới thành đại nghiệp.',
    details: [
      'Tướng xuất ngoại định cư hoặc lập nghiệp xa quê hương bản quán mới phát huy hết tiềm năng.',
      'Hậu vận có xu hướng sống ở nơi phong cảnh thanh bình, gần gũi thiên nhiên hoặc nước ngoài.',
      'Dễ có nhiều nguồn tài lộc đa dạng từ các phương diện khác nhau.',
    ],
    advice: 'Chủ động đón nhận cơ hội di chuyển, đi xa làm ăn; xây dựng mối quan hệ giao hảo đa phương.',
  },
  dut_doan: {
    title: 'Đường Sinh Đạo Đứt Đoạn Nối Liền',
    score: 75,
    summary: 'Giai đoạn bước ngoặt lớn về sức khỏe hoặc thay đổi toàn diện về nhân sinh quan và môi trường sống.',
    details: [
      'Đoạn đứt thường báo hiệu một biến cố về sức khỏe hoặc sự thay đổi hoàn toàn về lối sống/công việc.',
      'Nếu có đường phụ chạy song song hoặc đoạn sau nối tiếp chồng lên nhau thì đều tai qua nạn khỏi, chuyển nguy thành an.',
      'Sau bước ngoặt sẽ thức tỉnh tâm linh, giác ngộ đạo lý và trưởng thành vượt bậc.',
    ],
    advice: 'Đặc biệt cẩn trọng trong các năm hạn lớn; kiểm tra sức khỏe định kỳ và tu dưỡng nội tâm an bình.',
  },
  uon_cong_rong: {
    title: 'Đường Sinh Đạo Uốn Vòng Rộng Bao Quanh Gò Kim Tinh',
    score: 92,
    summary: 'Tâm hồn bao dung rộng mở, giàu tình thương, nhân duyên thịnh vượng và có sức hút mãnh liệt với tha nhân.',
    details: [
      'Lòng bàn tay có gò Kim Tinh rất rộng lớn, biểu thị tình cảm nồng ấm và sự nhiệt thành.',
      'Có tài lãnh đạo nhân tâm, người xung quanh luôn cảm thấy an toàn và ấm áp khi ở cạnh bạn.',
      'Đời sống hôn nhân và gia đình giàu cảm xúc, phúc khí truyền đời cho con cái.',
    ],
    advice: 'Tận dụng sức hút nhân tâm để làm các công việc cộng đồng, giáo dục hoặc dẫn dắt đội ngũ lớn.',
  },
};

// ─── Dữ Liệu Luận Giải Đường Trí Đạo (Head Line) ──────────────────
const HEAD_LINE_DATA: Record<HeadLineType, { title: string; score: number; summary: string; details: string[]; advice: string }> = {
  thang_dai: {
    title: 'Đường Trí Đạo Thẳng, Dài & Dứt Khoát',
    score: 94,
    summary: 'Trí tuệ duy lý, tư duy logic sắc sảo, đầu óc thực tế và khả năng phán đoán chuẩn xác tuyệt vời.',
    details: [
      'Suy nghĩ mạch lạc, không để cảm xúc cá nhân chi phối quyết định mang tính chiến lược.',
      'Khả năng tập trung cao độ, giải quyết các bài toán hóc búa một cách có hệ thống.',
      'Phù hợp trở thành chuyên gia cấp cao, nhà quản trị dữ liệu, tài chính hoặc thẩm phán.',
    ],
    advice: 'Tránh quá cứng nhắc trong quan hệ nhân sự; bổ sung sự đồng cảm và linh hoạt mềm mỏng.',
  },
  cong_xuong: {
    title: 'Đường Trí Đạo Cong Nhẹ Về Gò Nguyệt Tinh',
    score: 96,
    summary: 'Tài năng sáng tạo thiên bẩm, trí tưởng tượng phong phú, kết hợp hoàn hảo giữa lý trí và nghệ thuật.',
    details: [
      'Trực giác bén nhạy, có khả năng nhìn thấy những điều người khác không nhận ra.',
      'Tâm hồn lãng mạn nhưng không viển vông, biến các ý tưởng độc đáo thành sản phẩm cụ thể.',
      'Rất thành công trong sáng tạo nội dung, nghệ thuật, thiết kế, marketing, phát minh.',
    ],
    advice: 'Nuôi dưỡng không gian sáng tạo của riêng mình; tránh tự giam cầm bản thân trong các khuôn mẫu gò bó.',
  },
  chia_doi: {
    title: 'Đường Trí Đạo Đuôi Cá (Phân Nhánh Bút Nhà Văn)',
    score: 98,
    summary: 'Tướng "Nhánh Bút Nhà Văn" trứ danh - Đa tài đa nghệ, tư duy hai chiều, tài hùng biện và đàm phán xuất chúng.',
    details: [
      'Một nhánh hướng về thực tế (Gò Hỏa Tinh), một nhánh hướng về sáng tạo (Gò Nguyệt Tinh).',
      'Có khả năng thích ứng linh hoạt với mọi hoàn cảnh, biến nguy thành cơ trong đàm phán.',
      'Dễ đạt thành tựu trong cả lĩnh vực học thuật lẫn kinh doanh thương trường.',
    ],
    advice: 'Tránh phân tâm quá nhiều hướng cùng lúc; tập trung mũi nhọn chiến lược để bứt phá đỉnh cao.',
  },
  ngan_thang: {
    title: 'Đường Trí Đạo Ngắn Nhưng Cương Mãnh',
    score: 80,
    summary: 'Hành động nhanh như chớp, ghét lý thuyết suông, chú trọng hiệu quả tức thì.',
    details: [
      'Tác phong làm việc nhanh gọn, quyết đoán, không chần chừ do dự.',
      'Thích hợp với môi trường tác chiến thực tế đòi hỏi phản xạ ngay lập tức.',
      'Cần chú ý tránh hấp tấp bỏ sót các chi tiết pháp lý hoặc kế hoạch dài hạn.',
    ],
    advice: 'Nên tham vấn thêm các chuyên gia tư vấn chiến lược trước khi ra quyết định đầu tư quy mô lớn.',
  },
  uon_luon: {
    title: 'Đường Trí Đạo Uốn Lượn Gợn Sóng',
    score: 78,
    summary: 'Tư duy linh hoạt biến ảo, giỏi thích nghi tình thế nhưng tâm trí dễ bị xao nhãng.',
    details: [
      'Có tài xoay xở trong các tình huống khẩn cấp, nhiều mẹo vặt thông minh.',
      'Tâm lý thay đổi theo môi trường, cần có người đồng hành kiên định làm điểm tựa.',
      'Dễ tìm thấy cơ hội làm ăn ngách mà người khác bỏ qua.',
    ],
    advice: 'Rèn luyện thói quen kiên định mục tiêu đến cùng; thiền định để tâm trí tĩnh lặng sáng suốt.',
  },
};

// ─── Dữ Liệu Luận Giải Đường Tâm Đạo (Heart Line) ──────────────────
const HEART_LINE_DATA: Record<HeartLineType, { title: string; score: number; summary: string; details: string[]; advice: string }> = {
  dai_len_moc_tinh: {
    title: 'Đường Tâm Đạo Dài Uốn Lên Dưới Gò Mộc Tinh',
    score: 96,
    summary: 'Trái tim cao quý, trọng danh dự, lý tưởng tình yêu thuần khiết, chung thủy sắt son và tận tụy hy sinh.',
    details: [
      'Tướng người có tình cảm sâu sắc, yêu ai thì hết lòng phụng sự và chở che cho đối phương.',
      'Được bạn đời tôn trọng và quý mến; cuộc sống hôn nhân đầm ấm, bền chặt theo năm tháng.',
      'Thường kết duyên với người có địa vị, trí tuệ hoặc đạo đức cao thượng.',
    ],
    advice: 'Tránh đặt kỳ vọng quá hoàn hảo khiến bản thân chịu nhiều áp lực vô hình; bao dung với khuyết điểm nhỏ của người thương.',
  },
  ngan_duoi_tho_tinh: {
    title: 'Đường Tâm Đạo Ngắn Dừng Dưới Gò Thổ Tinh',
    score: 80,
    summary: 'Tình cảm thiên về thực tế, tỉnh táo và có xu hướng lý trí kiểm soát cảm xúc.',
    details: [
      'Không thích biểu lộ cảm xúc ủy mị ra ngoài, yêu thương bằng hành động thực tế và chu cấp vật chất.',
      'Ít khi bị mù quáng vì tình cảm, có ranh giới cá nhân rất rõ ràng.',
      'Cần học cách cởi mở hơn để đối phương cảm nhận được sự ấm áp từ bên trong.',
    ],
    advice: 'Hãy chia sẻ cảm xúc và dành nhiều lời khen ngợi ngọt ngào cho người bạn đời.',
  },
  cong_sau: {
    title: 'Đường Tâm Đạo Uốn Cong Sâu & Đậm',
    score: 90,
    summary: 'Nhiệt huyết nồng nàn, cảm xúc mãnh liệt, luôn mang lại ngọn lửa ấm áp cho các mối quan hệ.',
    details: [
      'Sống chan hòa, chân tình, luôn sẵn sàng giúp đỡ bạn bè và người thân khi khó khăn.',
      'Sức hút đào hoa tự nhiên rất lớn, được nhiều người thầm thương trộm nhớ.',
      'Cần cẩn thận tránh để cảm xúc bột phát chi phối các quyết định quan trọng.',
    ],
    advice: 'Giữ sự tỉnh táo trong việc chọn bạn tri kỷ; biến năng lượng yêu thương thành nguồn động lực xây đắp tổ ấm.',
  },
  duoi_en: {
    title: 'Đường Tâm Đạo Phân Nhánh Đuôi Én Cát Tường',
    score: 95,
    summary: 'Biểu tượng của nhân duyên hòa hợp viên mãn, gia đạo hưng thịnh và tâm hồn quân tử.',
    details: [
      'Một nhánh biểu trưng cho lý trí thấu hiểu, một nhánh biểu trưng cho trái tim từ ái.',
      'Là người bạn đời lý tưởng, biết lắng nghe và dung hòa mọi xung đột trong gia đình.',
      'Vận khí của bạn đời sẽ tăng tiến rõ rệt sau khi kết hôn cùng bạn.',
    ],
    advice: 'Đây là cát tướng hiếm thấy trong nhân tướng học, hãy trân trọng và vun đắp hạnh phúc hiện tại.',
  },
  thang_ngang: {
    title: 'Đường Tâm Đạo Thẳng Tắp Băng Ngang',
    score: 82,
    summary: 'Lòng trung kiên, nguyên tắc rõ ràng, trọng lời hứa nhưng đôi khi hơi nghiêm khắc.',
    details: [
      'Yêu ghét phân minh, không bao giờ lập lờ hai mặt trong chuyện tình cảm.',
      'Khi đã cam kết thì dốc lòng thực hiện, là chỗ dựa cực kỳ vững chắc cho gia đình.',
      'Đôi lúc tạo cảm giác lạnh lùng xa cách nếu người khác chưa tiếp xúc lâu dài.',
    ],
    advice: 'Mở lòng thả lỏng hơn, học cách lắng nghe cảm xúc tế nhị của người thân yêu.',
  },
};

// ─── Dữ Liệu Luận Giải Đường Định Mệnh (Fate Line) ─────────────────
const FATE_LINE_DATA: Record<FateLineType, { title: string; score: number; summary: string; details: string[]; advice: string }> = {
  ro_net_thang: {
    title: 'Đường Định Mệnh Thẳng Tắp Từ Cổ Tay Lên Gò Thổ Tinh',
    score: 96,
    summary: 'Mệnh cách tự lực cánh sinh kiệt xuất, mục tiêu cuộc đời sáng rõ, sự nghiệp thăng tiến vững như bàn thạch.',
    details: [
      'Ý chí sắt đá, từ trẻ đã xác định được chí hướng và kiên trì theo đuổi tới cùng.',
      'Công danh ngày càng rực rỡ từ tuổi 32 trở đi, nắm giữ chức vụ chỉ huy hoặc làm chủ doanh nghiệp lớn.',
      'Tài lộc hanh thông, ít bị nghịch cảnh đánh ngã, luôn có đường hướng bứt phá.',
    ],
    advice: 'Duy trì sự khiêm nhường khi đạt đỉnh cao; đào tạo thế hệ kế thừa để gia nghiệp trường tồn.',
  },
  tu_go_nguyet: {
    title: 'Đường Định Mệnh Xuất Phát Từ Gò Nguyệt Tinh',
    score: 94,
    summary: 'Mệnh cách quý nhân phù trợ, thành công nhờ sự trợ lực của đám đông, công chúng và tha nhân.',
    details: [
      'Duyên may đặc biệt với người khác phái hoặc đối tác bên ngoài quê hương.',
      'Rất đắc lợi trong các ngành nghề nghệ thuật, truyền thông, dịch vụ, ngoại giao, chính trị gia.',
      'Mỗi khi gặp trắc trở đều xuất hiện quý nhân dang tay cứu giúp.',
    ],
    advice: 'Luôn giữ tấm lòng tri ân và đối xử tử tế với mọi người; đó chính là nguồn cội may mắn lớn nhất của bạn.',
  },
  dut_doan: {
    title: 'Đường Định Mệnh Đứt Đoạn Nối Tiếp',
    score: 82,
    summary: 'Sự nghiệp trải qua nhiều lần chuyển hướng ngoạn mục, hậu vận tái sinh thành công rực rỡ.',
    details: [
      'Thường thay đổi ngành nghề hoặc lập nghiệp lần thứ hai mới thực sự tìm thấy thiên mệnh.',
      'Mỗi lần đổi hướng đều tích lũy thêm một kho tàng kinh nghiệm và mạng lưới quan hệ mới.',
      'Đại vận từ trung niên (khoảng sau 38-40 tuổi) bừng sáng ngoạn mục.',
    ],
    advice: 'Đừng nản lòng khi gặp giai đoạn chững lại; coi đó là bước đệm cần thiết để tích lũy năng lượng cho bước nhảy vọt.',
  },
  huong_thai_duong: {
    title: 'Đường Định Mệnh Rẽ Nhánh Lên Gò Thái Dương',
    score: 98,
    summary: 'Tướng "Danh Lợi Song Toàn" - Đạt tới đỉnh cao của danh tiếng lẫy lừng và tài phú dồi dào.',
    details: [
      'Có tài năng độc đáo được xã hội công nhận và tôn vinh rộng rãi.',
      'Tài lộc đi liền với uy tín cá nhân, tiền tài dồi dào tự nhiên tìm đến.',
      'Hậu vận rực rỡ, được xã hội kính trọng và lưu danh thơm.',
    ],
    advice: 'Dùng danh tiếng và tài lực để làm các việc công ích thiện nguyện, tạo phúc đức trường cửu cho hậu duệ.',
  },
  mo_nhat: {
    title: 'Đường Định Mệnh Mờ Nhạt Hoặc Tự Do',
    score: 78,
    summary: 'Lối sống phóng khoáng tự tại, không bị trói buộc bởi khuôn mẫu truyền thống, tự tay vẽ nên số phận.',
    details: [
      'Cổ thư chỉ rõ: Không có đường định mệnh rõ nét đồng nghĩa bạn là người tự do, tương lai hoàn toàn do bạn quyết định.',
      'Thích khám phá nhiều trải nghiệm mới mẻ hơn là ngồi yên một chỗ trong văn phòng.',
      'Khi tìm đúng đam mê đích thực, đường định mệnh sẽ tự động hằn sâu và rõ nét dần theo thời gian.',
    ],
    advice: 'Xác định một mục tiêu cốt lõi và kiên trì tối thiểu 3 năm, bạn sẽ thấy vận mệnh thay đổi kỳ diệu.',
  },
};

// ─── Dữ Liệu Các Dấu Hiệu Quý Tướng Hiếm Có ────────────────────────
export const SPECIAL_SIGNS_DATA: Record<SpecialSign, {
  name: string;
  rarity: string;
  meaning: string;
  blessing: string;
}> = {
  chu_m: {
    name: 'Bàn Tay Chữ M Thần Kỳ',
    rarity: 'Chỉ khoảng 3% dân số thế giới sở hữu',
    meaning: 'Tạo bởi sự kết nối hoàn mỹ của 4 đường Sinh Đạo, Trí Đạo, Tâm Đạo và Định Mệnh.',
    blessing: 'Trực giác cực nhạy, có năng khiếu phát hiện dối trá, tài năng lãnh đạo thiên bẩm, hậu vận đại phú đại quý.',
  },
  chu_nhat: {
    name: 'Chỉ Tay Chữ Nhất (Simian Line)',
    rarity: 'Khoảng 1.5% dân số (đường Trí Đạo và Tâm Đạo hợp nhất làm một)',
    meaning: 'Biểu thị ý chí sắt đá kiên cường, khả năng tập trung cao độ vượt xa người thường.',
    blessing: 'Nếu hướng thiện sẽ trở thành bậc vĩ nhân, tướng lĩnh hoặc tỷ phú lỗi lạc; cần kiểm soát tính nóng nảy.',
  },
  tam_giac_vang: {
    name: 'Vân Tam Giác Vàng (Kim Tự Tháp Tài Vận)',
    rarity: 'Khoảng 5% dân số',
    meaning: 'Hình thành từ giao điểm của Trí Đạo, Sinh Đạo và đường Vận Mệnh tạo thành tam giác khép kín.',
    blessing: 'Khả năng tụ tài, giữ tiền và sinh lời siêu việt; của cải vào tay không bị thất thoát, tích lũy điền sản lớn.',
  },
  vong_moc_tinh: {
    name: 'Vòng Mộc Tinh (Solomon Ring)',
    rarity: 'Khoảng 2% dân số (vòng cung nhỏ bao quanh ngón trỏ)',
    meaning: 'Biểu tượng trí tuệ thông thái của vua Solomon trong huyền thoại cổ phương Tây.',
    blessing: 'Giác quan thứ sáu cực mạnh, giác ngộ triết học tâm linh sâu sắc, nói lời uy tín được vạn người lắng nghe.',
  },
  mat_phat: {
    name: 'Vân Mắt Phật (Khổng Tử Nhãn / Mắt Phượng)',
    rarity: 'Vân tròn hình con mắt tại đốt ngón cái',
    meaning: 'Dấu ấn phúc báo sâu dày từ tổ tiên dòng họ và tiền kiếp.',
    blessing: 'Gặp hung hóa cát, đi đâu cũng có thần minh che chở, bình an một đời, tài lộc hanh thông.',
  },
};

// ─── Hàm Luận Giải Bói Chỉ Tay Tổng Hợp ────────────────────────────
export function analyzePalm(input: PalmInput): PalmistryResult {
  const elementInfo = HAND_ELEMENT_DATA[input.element];
  const life = LIFE_LINE_DATA[input.lifeLine];
  const head = HEAD_LINE_DATA[input.headLine];
  const heart = HEART_LINE_DATA[input.heartLine];
  const fate = FATE_LINE_DATA[input.fateLine];

  // Luận ý nghĩa tay trái / tay phải
  const isFemale = input.gender === 'female';
  const isLeft = input.side === 'left';
  let sideMeaning = '';
  if (isLeft) {
    sideMeaning = isFemale
      ? 'Tay Trái (Hậu Thiên Vận Trình): Biểu thị những gì bạn tự tay tạo dựng và gặt hái được trong thực tế.'
      : 'Tay Trái (Tiên Thiên Bản Mệnh): Tiết lộ cốt cách bẩm sinh, tiềm năng trời phú và phúc khí gốc rễ.';
  } else {
    sideMeaning = isFemale
      ? 'Tay Phải (Tiên Thiên Bản Mệnh): Tiết lộ phúc phận căn nguyên, tính cách sâu kín và trực giác bẩm sinh.'
      : 'Tay Phải (Hậu Thiên Vận Trình): Thể hiện sự nghiệp, thành tựu xã hội và những nỗ lực hiện thực hóa ước mơ.';
  }

  // Danh sách dấu hiệu quý tướng
  const specialSignsInfo = input.specialSigns.map(s => ({
    id: s,
    ...SPECIAL_SIGNS_DATA[s],
  }));

  // Đánh giá ngũ đại gò bàn tay
  const mountsOverview = {
    venus: input.element === 'tho' || input.lifeLine === 'uon_cong_rong'
      ? 'Gò Kim Tinh đầy đặn nhô cao: Sinh lực tràn trề, tình cảm nồng hậu, sống thọ và giàu lòng vị tha.'
      : 'Gò Kim Tinh thanh tú vừa vặn: Sức khỏe ổn định, tính cách ôn hòa, biết cân đối giữa cảm xúc và lý trí.',
    jupiter: input.element === 'kim' || input.specialSigns.includes('vong_moc_tinh')
      ? 'Gò Mộc Tinh phát quang rực rỡ: Hoài bão lớn lao, khí chất lãnh đạo thiên bẩm, danh vọng thăng tiến.'
      : 'Gò Mộc Tinh bằng phẳng vững vàng: Độc lập tự chủ, tự lượng sức mình, từng bước thăng tiến chắc chắn.',
    sun: input.fateLine === 'huong_thai_duong' || input.specialSigns.includes('chu_m')
      ? 'Gò Thái Dương hồng nhuận tươi sáng: Tài hoa xuất chúng, có tiếng tăm trong xã hội, tiền tài tự nhiên tìm đến.'
      : 'Gò Thái Dương vừa phải: Cuộc sống bình an thư thái, không ham danh ảo, tài lộc đủ đầy an nhiên.',
    mercury: input.element === 'thuy' || input.headLine === 'chia_doi'
      ? 'Gò Thủy Tinh nổi rõ: Khẩu tài xuất sắc, óc kinh doanh nhạy bén, đàm phán thương trường bách chiến bách thắng.'
      : 'Gò Thủy Tinh bình thường: Thành thật giữ chữ tín, làm ăn chân chính, bạn bè đối tác tin cậy.',
    moon: input.element === 'moc' || input.headLine === 'cong_xuong' || input.fateLine === 'tu_go_nguyet'
      ? 'Gò Nguyệt Tinh nở nang: Trực giác siêu việt, giàu óc sáng tạo nghệ thuật, có duyên xuất ngoại đi xa.'
      : 'Gò Nguyệt Tinh gọn gàng: Tư duy thực tế, ưa nhìn thấy kết quả cụ thể hơn là mơ mộng viển vông.',
  };

  // Tính điểm tổng hòa và xếp hạng vận mệnh
  const avgScore = Math.round((life.score + head.score + heart.score + fate.score) / 4) + (input.specialSigns.length * 3);
  let destinyGrade: 'Thượng Cách' | 'Trung Cát Cách' | 'Cát Cách Tiềm Tàng' | 'Đại Khí Vãn Thành' = 'Trung Cát Cách';
  let archetype = 'Bậc Tự Lập Khai Phá';

  if (avgScore >= 95 || input.specialSigns.includes('chu_m') || input.specialSigns.includes('tam_giac_vang')) {
    destinyGrade = 'Thượng Cách';
    archetype = 'Bậc Kỳ Tài Danh Lợi Song Toàn';
  } else if (avgScore >= 88) {
    destinyGrade = 'Trung Cát Cách';
    archetype = 'Bậc Trí Dũng Thăng Tiến Bền Vững';
  } else if (input.fateLine === 'dut_doan' || input.lifeLine === 'dut_doan') {
    destinyGrade = 'Đại Khí Vãn Thành';
    archetype = 'Bậc Chuyển Họa Vi Phúc · Càng Về Già Càng Hưng Vượng';
  } else {
    destinyGrade = 'Cát Cách Tiềm Tàng';
    archetype = 'Viên Ngọc Quý Chờ Ngày Tỏa Sáng';
  }

  return {
    input,
    elementInfo,
    sideMeaning,
    lifeLine: {
      name: 'Đường Sinh Đạo',
      glyph: '🌱',
      ...life,
    },
    headLine: {
      name: 'Đường Trí Đạo',
      glyph: '💡',
      ...head,
    },
    heartLine: {
      name: 'Đường Tâm Đạo',
      glyph: '❤️',
      ...heart,
    },
    fateLine: {
      name: 'Đường Định Mệnh',
      glyph: '⚡',
      ...fate,
    },
    specialSignsInfo,
    mountsOverview,
    overallVerdict: {
      archetype,
      destinyGrade,
      summary: `Tướng tay thuộc ${elementInfo.name}, kết hợp cùng ${life.title} và ${head.title}. Cốt cách bàn tay biểu thị một tâm hồn ${elementInfo.personality}. Tổng thể đạt mức ${destinyGrade}.`,
      careerProspect: `Sự nghiệp rất hợp với các ngành nghề: ${elementInfo.careerFit}. ${fate.summary}`,
      loveProspect: `Vận tình cảm hôn nhân: ${heart.summary}`,
      wealthProspect: input.specialSigns.includes('tam_giac_vang') || input.specialSigns.includes('chu_m')
        ? 'Tài vận đại cát: Sở hữu dấu ấn tụ tài hiếm có, tiền bạc vào tay không bị thất thoát, càng tích lũy càng giàu có hưng thịnh.'
        : 'Tài vận hanh thông vững vàng: Thu nhập tỷ lệ thuận với công sức và uy tín cá nhân, hậu vận điền sản dồi dào.',
      keyAction: `Lời khuyên cốt lõi: ${head.advice} Hãy chú ý phát huy màu sắc may mắn (${elementInfo.luckyColor}) và rèn luyện tâm tính thiện lành để tướng tùy tâm chuyển, phúc khí đời đời.`,
    },
  };
}

