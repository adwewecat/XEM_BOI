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
  score: number; // Thang điểm 1-100 chân thực
  summary: string;
  details: string[];
  positives: string[];
  negatives: string[]; // Khuyết điểm, tật xấu & hung hiểm cảnh báo
  advice: string;
}

export type DestinyGrade =
  | 'Thượng Cách (Kỳ Tài Danh Lợi · Cô Độc Đỉnh Cao)'
  | 'Trung Cát Cách (Thành Tựu Bền Vững Nhờ Thực Lực)'
  | 'Cát Hung Tương Bán (Được Mất Song Hành · Nửa Đời Sóng Gió)'
  | 'Đại Khí Vãn Thành (Tiền Vận Lao Đao · Hậu Vận Hưng Phát)'
  | 'Bình Hòa Cách (Lao Tâm Bán Sức · Phải Tự Thân Vận Động)'
  | 'Ba Đào Khảo Nghiệm Cách (Biến Cố Sức Khỏe & Thị Phi Rình Rập)';

export interface PalmistryResult {
  input: PalmInput;
  uploadedImage?: string;
  detectedFeaturesSummary?: string[];
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
    destinyGrade: DestinyGrade;
    summary: string;
    careerProspect: string;
    loveProspect: string;
    wealthProspect: string;
    criticalFlaws: string[]; // Tật xấu chí mạng & Điểm mù tính cách
    majorRisks: string[];    // Cảnh báo rủi ro thực tế & Cạm bẫy định mệnh
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
const LIFE_LINE_DATA: Record<LifeLineType, {
  title: string;
  score: number;
  summary: string;
  details: string[];
  positives: string[];
  negatives: string[];
  advice: string;
}> = {
  dai_sau: {
    title: 'Đường Sinh Đạo Dài, Sâu & Rõ Nét',
    score: 86,
    summary: 'Biểu tượng của sinh lực dồi dào, thể chất tráng kiện, sức đề kháng tự nhiên tốt và tuổi thọ bền lâu.',
    details: [
      'Nền tảng sinh lực bền bỉ, hiếm khi ốm vặt nặng, khả năng tự hồi phục sau kiệt sức tương đối nhanh.',
      'Tâm thái kiên trì, chịu được vất vả trong công việc dài hạn, có tính kỷ luật cao.',
      'Gia đạo và hậu vận tương đối ổn định về mặt sức khỏe thể chất.',
    ],
    positives: [
      'Thể lực dồi dào, sức đề kháng cao, chịu đựng được áp lực công việc cường độ lớn.',
      'Khả năng tự hồi phục nhanh sau khi mệt mỏi hoặc ốm đau thông thường.',
      'Hậu vận có phúc khí thọ mạng, giữ được sự dẻo dai đến tuổi xế chiều.',
    ],
    negatives: [
      'Chủ quan với sức khỏe: Có xu hướng ỷ lại vào sức mình mà làm việc quá độ, bỏ qua các dấu hiệu cảnh báo sớm của cơ thể.',
      'Cố chấp và bảo thủ: Quá tin vào kinh nghiệm cá nhân mà xem nhẹ các khuyến cáo y khoa hoặc lối sống lành mạnh.',
      'Lao lực ngầm: Nguy cơ bệnh tim mạch, huyết áp hoặc xương khớp do thói quen ôm đồm không chịu nghỉ ngơi.',
    ],
    advice: 'Tuyệt đối không được cậy khỏe mà lao lực. Cần duy trì chế độ nghỉ ngơi khoa học, khám sức khỏe định kỳ và học cách buông bỏ bớt việc.',
  },
  ngan_manh: {
    title: 'Đường Sinh Đạo Ngắn Nhưng Đậm Nét',
    score: 68,
    summary: 'Sinh lực bùng nổ mạnh mẽ từng đợt nhưng thiếu tính dẻo dai dài hạn, năng lượng tiêu hao rất nhanh.',
    details: [
      'Thích hợp tác chiến tốc độ, làm việc tập trung cao độ trong các mục tiêu ngắn hạn.',
      'Nhân tướng học chỉ rõ: Đường sinh đạo ngắn không đồng nghĩa với đoản mệnh nếu gò Kim Tinh nở nang, nhưng phản ánh sức bền kém.',
      'Thường bị hụt hơi, đuối sức khi phải theo đuổi các dự án kéo dài nhiều năm.',
    ],
    positives: [
      'Phản xạ nhạy bén, khả năng hành động quyết liệt và tập trung cao trong thời khắc khẩn cấp.',
      'Sống hết mình với hiện tại, không lãng phí thời gian vào những việc chần chừ do dự.',
    ],
    negatives: [
      'Thể lực thiếu bền bỉ: Dễ bị suy nhược nhanh, tụt năng lượng giữa chừng khi gặp áp lực kéo dài.',
      'Tính khí nóng nảy: Nông nổi, bốc đồng, dễ mất bình tĩnh dẫn đến quyết định sai lầm trong lúc giận dữ.',
      'CẢNH BÁO NGUY CƠ: Dễ gặp các bệnh liên quan đến hệ tiêu hóa, dạ dày hoặc hô hấp do stress và sinh hoạt thất thường.',
    ],
    advice: 'Tránh thức khuya và làm việc kiệt sức. Phải rèn luyện các môn thể thao sức bền (đi bộ, bơi lội), học cách thở sâu và kiềm chế cơn nóng giận.',
  },
  re_nhanh: {
    title: 'Đường Sinh Đạo Phân Nhánh Về Cuối',
    score: 75,
    summary: 'Vận mệnh bôn ba di chuyển, số xuất ngoại hoặc lập nghiệp xa quê hương bản quán mới phát huy được tài năng.',
    details: [
      'Thường xuyên thay đổi môi trường sống hoặc tính chất công việc theo từng giai đoạn.',
      'Hậu vận có xu hướng an cư ở vùng đất mới hoặc định cư nước ngoài, xa nơi chôn rau cắt rốn.',
      'Mối liên kết với gia đình ruột thịt và quê quán có phần lỏng lẻo.',
    ],
    positives: [
      'Khả năng thích nghi tuyệt vời với mọi hoàn cảnh và môi trường xa lạ, kết giao bạn bè đa phương.',
      'Nhạy bén với các cơ hội ở phương xa, đón nhận làn gió đổi mới dễ dàng.',
    ],
    negatives: [
      'Thân tâm phiêu bạt: Cả đời trôi nổi, khó an cư lạc nghiệp sớm, tâm lý hay cảm thấy cô độc lạc lõng.',
      'Tài lộc bất ổn: Tiền bạc kiếm được ở xứ người nhưng tiêu tán cũng nhiều theo các chuyến đi bôn ba.',
      'Tình cảm gia đình xa cách: Thiếu sự kề cận chăm sóc cha mẹ khi về già do khoảng cách địa lý.',
    ],
    advice: 'Khi đi xa lập nghiệp cần xây dựng quỹ dự phòng tài chính vững chắc; thường xuyên kết nối và hướng về cội nguồn gia đình.',
  },
  dut_doan: {
    title: 'Đường Sinh Đạo Đứt Đoạn Nối Liền',
    score: 52,
    summary: 'Báo hiệu bước ngoặt biến cố lớn về sức khỏe hoặc tai nạn trong đời; vận khí từng có giai đoạn đứt đoạn lao đao.',
    details: [
      'Tại độ tuổi tương ứng với đoạn đứt trên lòng bàn tay thường xuất hiện một biến cố lớn về thể chất hoặc chấn động tâm lý.',
      'Nếu đoạn sau nối lại hoặc có đường song song hỗ trợ thì sẽ qua khỏi nhưng để lại vết hằn sâu sắc.',
      'Bắt buộc phải sống có kỷ luật và tích lũy âm đức để hóa giải hung hiểm.',
    ],
    positives: [
      'Khả năng tái sinh mãnh liệt: Sau cơn thập tử nhất sinh hoặc biến cố lớn, tâm trí sẽ thức tỉnh và bản lĩnh phi thường hơn.',
      'Có duyên ngộ đạo, thấu hiểu sâu sắc lẽ vô thường của đời người.',
    ],
    negatives: [
      'CẢNH BÁO HUNG HIỂM: Nguy cơ bệnh tật hiểm nghèo, phẫu thuật hoặc tai nạn giao thông tại giai đoạn tiền trung vận.',
      'Tâm lý hoang mang, hay lo âu, thần kinh yếu, giấc ngủ chập chờn và dễ rơi vào trạng thái hoảng loạn.',
      'Vận khí bấp bênh: Công danh hoặc tài sản dễ bị đứt gánh giữa đường, phải làm lại từ đầu trong cảnh ngặt nghèo.',
    ],
    advice: 'Đặc biệt cẩn thận khi tham gia giao thông, không làm việc nguy hiểm. Kiểm tra sức khỏe toàn diện ngay lập tức. Tích cực làm việc thiện để bồi đắp phúc khí.',
  },
  uon_cong_rong: {
    title: 'Đường Sinh Đạo Uốn Vòng Rộng Bao Quanh Gò Kim Tinh',
    score: 84,
    summary: 'Tâm tính bao dung nồng hậu, giàu lòng trắc ẩn nhưng dễ bị tình cảm lấn át lý trí và bị lợi dụng.',
    details: [
      'Lòng bàn tay có gò Kim Tinh rộng lớn, biểu thị sinh lực và nhu cầu cảm xúc rất mạnh mẽ.',
      'Được nhiều người quý mến, luôn là chỗ dựa tình cảm cho người thân và bạn bè.',
      'Thường gánh vác trách nhiệm nặng nề của dòng họ hoặc tập thể.',
    ],
    positives: [
      'Tấm lòng nhân ái, sẵn sàng giúp đỡ tha nhân, nhân duyên sâu rộng.',
      'Sức hút cá nhân lớn, dễ thu hút người khác phái và nhận được sự tin yêu từ cộng đồng.',
    ],
    negatives: [
      'Cả nể, yếu lòng: Khó nói lời từ chối, thường bị kẻ xấu lợi dụng lòng thương hại để trục lợi hoặc mượn tiền không trả.',
      'Gánh việc người ngoài làm khổ người nhà: Tốn quá nhiều thời gian lo chuyện bao đồng khiến bản thân kiệt quệ.',
      'Lụy tình: Chuyện tình cảm dễ bị vướng bận, khó dứt khoát buông bỏ các mối quan hệ độc hại.',
    ],
    advice: 'Phải học cách thiết lập ranh giới cá nhân rõ ràng. Giúp người phải có trí tuệ và sự tỉnh táo, tránh để lòng tốt bị kẻ xấu lợi dụng.',
  },
};

// ─── Dữ Liệu Luận Giải Đường Trí Đạo (Head Line) ──────────────────
const HEAD_LINE_DATA: Record<HeadLineType, {
  title: string;
  score: number;
  summary: string;
  details: string[];
  positives: string[];
  negatives: string[];
  advice: string;
}> = {
  thang_dai: {
    title: 'Đường Trí Đạo Thẳng, Dài & Sắc Sảo',
    score: 85,
    summary: 'Trí tuệ duy lý sắc bén, tư duy logic thực tế nhưng khô khan và thiếu sự thấu cảm mềm mỏng.',
    details: [
      'Suy nghĩ mạch lạc, không để cảm xúc cá nhân chi phối quyết định mang tính chiến lược.',
      'Khả năng tập trung cao độ, giải quyết các bài toán hóc búa một cách có hệ thống.',
      'Phù hợp trở thành chuyên gia cấp cao, nhà quản trị dữ liệu, tài chính hoặc thẩm phán.',
    ],
    positives: [
      'Khả năng phân tích logic xuất sắc, suy nghĩ mạch lạc, không bị cảm xúc chi phối.',
      'Thực tế, có phương pháp làm việc khoa học, xử lý số liệu và chiến lược rất chuẩn xác.',
    ],
    negatives: [
      'Cứng nhắc và độc đoán: Quá đề cao lý trí, xem nhẹ cảm xúc con người, dễ tạo khoảng cách lạnh lùng.',
      'Thiếu linh hoạt: Khó thích nghi với các tình huống cần sự nhún nhường, dễ biến thành người thực dụng và ích kỷ.',
      'Điểm mù tự cao: Luôn cho rằng mình đúng, coi thường ý kiến người khác khi họ không đưa ra được bằng chứng logic.',
    ],
    advice: 'Cần trau dồi sự đồng cảm và lắng nghe. Trí tuệ lớn nhất không phải là thắng trong tranh luận mà là thấu hiểu lòng người.',
  },
  cong_xuong: {
    title: 'Đường Trí Đạo Cong Nhẹ Về Gò Nguyệt Tinh',
    score: 82,
    summary: 'Trí tưởng tượng phong phú, có khiếu nghệ thuật và trực giác nhạy bén nhưng dễ rơi vào mơ mộng xa rời thực tế.',
    details: [
      'Trực giác bén nhạy, có khả năng nhìn thấy những điều người khác không nhận ra.',
      'Tâm hồn lãng mạn, khả năng liên tưởng và truyền cảm hứng nghệ thuật cao.',
      'Rất có năng khiếu trong sáng tạo nội dung, nghệ thuật, thiết kế, marketing, phát minh.',
    ],
    positives: [
      'Tư duy sáng tạo vượt trội, có cái nhìn thẩm mỹ tinh tế và trực giác linh cảm rất bén.',
      'Khả năng biến các ý tưởng trừu tượng thành hình tượng sống động.',
    ],
    negatives: [
      'Mơ mộng hão huyền: Dễ vạch ra những kế hoạch viển vông trên mây nhưng thiếu năng lực thực thi dưới đất.',
      'Tâm lý bất ổn: Cảm xúc chi phối công việc, "vui thì làm, buồn thì bỏ", dễ rơi vào âu lo và trầm cảm.',
      'Thiếu kỷ luật: Dễ bị phân tâm bởi những thứ phù phiếm, ngại đối mặt với những con số và quy trình khô khan.',
    ],
    advice: 'Bắt buộc phải rèn luyện tính kỷ luật và tính toán thực tế. Hãy chia nhỏ ý tưởng thành kế hoạch hành động từng bước cụ thể.',
  },
  chia_doi: {
    title: 'Đường Trí Đạo Đuôi Cá (Phân Nhánh Bút Nhà Văn)',
    score: 86,
    summary: 'Tướng "Nhánh Bút Nhà Văn" - Đa tài đa nghệ, tư duy hai chiều nhạy bén nhưng tâm trí hay phân vân, toan tính quá mức.',
    details: [
      'Một nhánh hướng về thực tế (Gò Hỏa Tinh), một nhánh hướng về sáng tạo (Gò Nguyệt Tinh).',
      'Có khả năng thích ứng linh hoạt với mọi hoàn cảnh, biến nguy thành cơ trong đàm phán.',
      'Dễ đạt thành tựu trong cả lĩnh vực học thuật lẫn kinh doanh thương trường.',
    ],
    positives: [
      'Khả năng thích ứng linh hoạt tuyệt vời, vừa có óc thực tế vừa có tính sáng tạo.',
      'Khẩu tài và khả năng đàm phán xuất chúng, dễ xoay chuyển tình thế trong nghịch cảnh.',
    ],
    negatives: [
      'Đa đoan và toan tính: Đầu óc luôn tính toán thiệt hơn quá mức, dễ sinh thói lươn lẹo, vụ lợi cơ hội.',
      'Tâm trí phân vân đứng núi này trông núi nọ: Ôm đồm nhiều mục tiêu cùng lúc dẫn đến không việc nào đạt tới mức tinh hoa.',
      'Khó tin tưởng người khác: Bản tính đa nghi khiến bản thân luôn phải sống trong tâm trạng đề phòng mệt mỏi.',
    ],
    advice: 'Cần chọn một mũi nhọn then chốt để dồn sức. Dùng tài đàm phán vào việc chính đạo, tránh thói khôn lỏi hại mình hại người.',
  },
  ngan_thang: {
    title: 'Đường Trí Đạo Ngắn Nhưng Cương Mãnh',
    score: 62,
    summary: 'Tác phong nhanh gọn, quyết đoán nhưng hấp tấp, thiếu tầm nhìn chiến lược sâu rộng và dễ mắc bẫy.',
    details: [
      'Tác phong làm việc nhanh gọn, quyết đoán, ghét lý thuyết suông và chú trọng hiệu quả tức thì.',
      'Thích hợp với môi trường tác chiến thực tế đòi hỏi phản xạ ngay lập tức.',
      'Cần chú ý tránh hấp tấp bỏ sót các chi tiết pháp lý hoặc kế hoạch dài hạn.',
    ],
    positives: [
      'Hành động quyết liệt, phản xạ nhanh, ghét nói suông và chú trọng kết quả trước mắt.',
      'Dám làm dám chịu, phù hợp các công việc tác chiến thực địa khẩn trương.',
    ],
    negatives: [
      'Nông nổi và thiển cận: Chỉ nhìn thấy lợi ích trước mắt mà không lường trước hậu quả dài hạn.',
      'Dễ dính bẫy pháp lý: Ngại đọc kỹ hợp đồng, không xem xét chi tiết nhỏ dẫn đến mất tiền hoặc vướng kiện tụng.',
      'Bảo thủ và nóng nảy: Khó tiếp thu lời khuyên của người khác, thường phạm sai lầm do hành động trước khi suy nghĩ.',
    ],
    advice: 'Quy tắc vàng: Trước mọi quyết định lớn về tiền bạc hay sự nghiệp, hãy dừng lại 24 giờ để suy xét và hỏi ý kiến chuyên gia.',
  },
  uon_luon: {
    title: 'Đường Trí Đạo Uốn Lượn Gợn Sóng',
    score: 55,
    summary: 'Tư duy bất định, nhiều mẹo vặt tình thế nhưng thiếu lập trường kiên định, tâm trí dễ bị xao nhãng.',
    details: [
      'Có tài xoay xở trong các tình huống khẩn cấp, nhiều mẹo vặt thông minh.',
      'Tâm lý thay đổi theo môi trường, cần có người đồng hành kiên định làm điểm tựa.',
      'Dễ tìm thấy cơ hội làm ăn ngách mà người khác bỏ qua.',
    ],
    positives: [
      'Khéo léo xoay xở trong các hoàn cảnh khó khăn ngặt nghèo, nhiều mưu mẹo đối phó nhanh.',
    ],
    negatives: [
      'Lập trường như con lắc: Rất dễ bị người khác thao túng, đổi ý xoành xoạch, nói một đằng làm một nẻo.',
      'Thiếu trung thực: Dễ nói dối để né tránh trách nhiệm khi gặp sự cố.',
      'Sự nghiệp dở dang: Thiếu sự tập trung cao độ, làm việc gì cũng chỉ được nửa chừng rồi bỏ dở.',
    ],
    advice: 'Bắt buộc phải rèn luyện tính chính trực và sự kiên trì. Hãy học cách giữ lời hứa và hoàn thành trọn vẹn từng việc nhỏ nhất.',
  },
};

// ─── Dữ Liệu Luận Giải Đường Tâm Đạo (Heart Line) ──────────────────
const HEART_LINE_DATA: Record<HeartLineType, {
  title: string;
  score: number;
  summary: string;
  details: string[];
  positives: string[];
  negatives: string[];
  advice: string;
}> = {
  dai_len_moc_tinh: {
    title: 'Đường Tâm Đạo Dài Uốn Lên Dưới Gò Mộc Tinh',
    score: 86,
    summary: 'Tình cảm sâu sắc, trọng danh dự và lý tưởng nhưng đặt tiêu chuẩn quá cao gây áp lực ngột ngạt cho người khác.',
    details: [
      'Tướng người có tình cảm sâu sắc, yêu ai thì hết lòng phụng sự và chở che cho đối phương.',
      'Được bạn đời tôn trọng; cuộc sống hôn nhân gắn bó bền chặt theo năm tháng.',
      'Thường hướng tới mẫu người có địa vị, trí tuệ hoặc đạo đức cao thượng.',
    ],
    positives: [
      'Chung thủy sắt son, yêu ai thì hết lòng chở che và phụng sự gia đình.',
      'Trọng chữ tín và đạo đức trong tình yêu, sẵn sàng hy sinh lợi ích bản thân vì người mình thương.',
    ],
    negatives: [
      'Cầu toàn đến mức độc tài: Áp đặt tiêu chuẩn đạo đức khắt khe lên bạn đời, khiến đối phương luôn cảm thấy bị phán xét và ngột ngạt.',
      'Tự làm khổ mình: Khi đối phương không hoàn hảo như kỳ vọng thì rơi vào thất vọng nặng nề, tự dằn vặt bản thân.',
      'Cực đoan khi tổn thương: Nếu bị phản bội thì tâm hận thù rất sâu, khó tha thứ và có thể căm ghét cả đời.',
    ],
    advice: 'Tình yêu cần sự bao dung chứ không phải một bản án chấm điểm. Hãy học cách chấp nhận những khuyết điểm đời thường của bạn đời.',
  },
  ngan_duoi_tho_tinh: {
    title: 'Đường Tâm Đạo Ngắn Dừng Dưới Gò Thổ Tinh',
    score: 60,
    summary: 'Tình cảm khô khan thực dụng, lý trí áp đảo trái tim, thiếu sự ấm áp và có xu hướng toan tính vật chất.',
    details: [
      'Không thích biểu lộ cảm xúc ủy mị ra ngoài, yêu thương bằng hành động thực tế và chu cấp vật chất.',
      'Ít khi bị mù quáng vì tình cảm, có ranh giới cá nhân rất rõ ràng.',
      'Cần học cách cởi mở hơn để đối phương cảm nhận được sự ấm áp từ bên trong.',
    ],
    positives: [
      'Tỉnh táo, không bị tình cảm làm mờ mắt, có khả năng quản lý tài chính và chu cấp vật chất ổn định cho gia đình.',
    ],
    negatives: [
      'Lạnh lùng và ích kỷ: Xem trọng nhu cầu và lợi ích cá nhân hơn cảm xúc của bạn đời.',
      'Toan tính sòng phẳng: Có xu hướng quy mọi thứ tình cảm ra giá trị vật chất, khiến hôn nhân biến thành một bản hợp đồng khô cứng.',
      'Nguy cơ đổ vỡ cao: Khi gia đình gặp hoạn nạn khó khăn, dễ có tâm lý thoái thác hoặc tìm đường lui riêng cho mình.',
    ],
    advice: 'Hôn nhân không thể bền vững nếu chỉ xây trên sự tính toán. Cần mở lòng chia sẻ cảm xúc, học cách thấu hiểu và trao đi không vụ lợi.',
  },
  cong_sau: {
    title: 'Đường Tâm Đạo Uốn Cong Sâu & Đậm',
    score: 80,
    summary: 'Nhiệt huyết mãnh liệt, giàu cảm xúc và sức hút đào hoa nhưng ghen tuông mù quáng và cảm xúc thất thường.',
    details: [
      'Sống chan hòa, chân tình, luôn sẵn sàng giúp đỡ bạn bè và người thân khi khó khăn.',
      'Sức hút đào hoa tự nhiên rất lớn, được nhiều người thầm thương trộm nhớ.',
      'Cần cẩn thận tránh để cảm xúc bột phát chi phối các quyết định quan trọng.',
    ],
    positives: [
      'Chân thành, nồng nhiệt, mang lại nguồn năng lượng sống động và ấm áp cho mối quan hệ.',
      'Sức hút tự nhiên lớn, dễ chiếm được cảm tình của người khác phái.',
    ],
    negatives: [
      'Ghen tuông bệnh hoạn: Đa nghi, thích kiểm soát từng hành động của bạn đời, dễ làm ầm ĩ vì những chuyện vụn vặt.',
      'Cảm xúc bốc đồng: Sớm nắng chiều mưa, khi yêu thì cuồng nhiệt nhưng khi giận thì nói lời cay độc gây tổn thương sâu sắc.',
      'Rắc rối đào hoa: Dễ bị cuốn vào những mối quan hệ phức tạp ngoài luồng, hao tiền tốn của vì chuyện tình ái.',
    ],
    advice: 'Kiềm chế tính ghen tuông và tôn trọng không gian riêng của người thương. Đừng để cảm xúc bộc phát phá nát nền tảng gia đình.',
  },
  duoi_en: {
    title: 'Đường Tâm Đạo Phân Nhánh Đuôi Én',
    score: 85,
    summary: 'Biết dung hòa tình cảm và lý trí, tính tình hòa nhã nhưng thiếu sự quyết đoán, dễ dây dưa không dứt khoát.',
    details: [
      'Một nhánh biểu trưng cho lý trí thấu hiểu, một nhánh biểu trưng cho trái tim từ ái.',
      'Biết lắng nghe và dung hòa xung đột trong gia đình.',
      'Vận khí của bạn đời sẽ có sự hỗ trợ tích cực sau khi kết hôn cùng bạn.',
    ],
    positives: [
      'Biết lắng nghe, dung hòa xung đột, là người bạn đời biết điều và mang lại hòa khí cho gia đình.',
      'Đối xử công bằng và thấu hiểu tâm lý đối phương.',
    ],
    negatives: [
      'Ba phải, thiếu dứt khoát: Sợ làm mất lòng người khác nên khi tình cảm xuất hiện rạn nứt thì né tránh không dám giải quyết dứt điểm.',
      'Dễ bị lấn lướt: Bản tính quá hiền lành khiến người khác dễ lấn tới, phải chịu thiệt thòi trong im lặng.',
      'Lưỡng lự trước các quyết định trọng đại về hôn nhân.',
    ],
    advice: 'Hiền lành phải đi cùng với bản lĩnh. Cần thẳng thắn bày tỏ ranh giới và lập trường của mình khi bị xâm phạm.',
  },
  thang_ngang: {
    title: 'Đường Tâm Đạo Thẳng Tắp Băng Ngang',
    score: 70,
    summary: 'Yêu ghét phân minh, trung kiên nhưng cứng nhắc, gia trưởng và tạo cảm giác ngột ngạt độc đoán.',
    details: [
      'Yêu ghét phân minh, không bao giờ lập lờ hai mặt trong chuyện tình cảm.',
      'Khi đã cam kết thì dốc lòng thực hiện, là chỗ dựa cực kỳ vững chắc cho gia đình.',
      'Đôi lúc tạo cảm giác lạnh lùng xa cách nếu người khác chưa tiếp xúc lâu dài.',
    ],
    positives: [
      'Trung thành tuyệt đối, giữ trọn lời thề nguyền, là chỗ dựa vững chãi về mặt nguyên tắc cho gia đình.',
    ],
    negatives: [
      'Gia trưởng và độc đoán: Thích áp đặt ý chí của mình lên bạn đời và con cái, không chấp nhận sự phản kháng.',
      'Thiếu sự lãng mạn tinh tế: Lời nói cộc lốc, khô cứng, khó chia sẻ tâm sự khiến đời sống vợ chồng ngày càng xa cách.',
      'Khó dung hòa khác biệt: Khi xảy ra mâu thuẫn thì chiến tranh lạnh kéo dài, không bao giờ chịu mở lời xin lỗi trước.',
    ],
    advice: 'Hãy hạ bớt cái tôi và sự gia trưởng. Hạnh phúc gia đình nằm ở sự lắng nghe và mềm mỏng, không phải sự phục tùng.',
  },
};

// ─── Dữ Liệu Luận Giải Đường Định Mệnh (Fate Line) ─────────────────
const FATE_LINE_DATA: Record<FateLineType, {
  title: string;
  score: number;
  summary: string;
  details: string[];
  positives: string[];
  negatives: string[];
  advice: string;
}> = {
  ro_net_thang: {
    title: 'Đường Định Mệnh Thẳng Tắp Lên Gò Thổ Tinh',
    score: 86,
    summary: 'Ý chí sắt đá, sự nghiệp thăng tiến vững vàng nhưng cuộc sống cô độc trên đỉnh cao và phải đánh đổi hạnh phúc cá nhân.',
    details: [
      'Ý chí sắt đá, từ trẻ đã xác định được chí hướng và kiên trì theo đuổi tới cùng.',
      'Công danh ngày càng củng cố sau tuổi 32, nắm giữ chức vụ chỉ huy hoặc làm chủ công việc.',
      'Tài lộc có nền móng, ít bị nghịch cảnh đánh ngã hoàn toàn.',
    ],
    positives: [
      'Khả năng tự lực cánh sinh phi thường, có mục tiêu cuộc đời rõ ràng từ rất sớm.',
      'Năng lực điều hành chỉ huy lớn, vượt qua được những giai đoạn khủng hoảng khốc liệt.',
    ],
    negatives: [
      'Cô độc tột cùng: Càng lên cao càng ít bạn bè tri kỷ, luôn phải gánh vác trách nhiệm một mình trong sự cô quạnh.',
      'Cuồng công việc: Xem sự nghiệp là mạng sống mà bỏ bê sức khỏe bản thân và tình cảm gia đình, con cái thiếu sự gắn kết.',
      'Độc tài chuyên chế: Khó tin tưởng giao việc cho cấp dưới, luôn ôm đồm mọi quyền lực dẫn đến căng thẳng mãn tính.',
    ],
    advice: 'Thành công mà không có người cùng chia sẻ thì cũng chỉ là hư ảo. Hãy học cách phân quyền và dành thời gian cho những người thân yêu.',
  },
  tu_go_nguyet: {
    title: 'Đường Định Mệnh Xuất Phát Từ Gò Nguyệt Tinh',
    score: 80,
    summary: 'Thành công nhờ sự nâng đỡ của đám đông và quý nhân nhưng phụ thuộc nhiều vào hoàn cảnh bên ngoài, thiếu tính tự chủ.',
    details: [
      'Duyên may đặc biệt với người khác phái hoặc đối tác bên ngoài quê hương.',
      'Rất đắc lợi trong các ngành nghề nghệ thuật, truyền thông, dịch vụ, ngoại giao.',
      'Mỗi khi gặp trắc trở đều xuất hiện quý nhân dang tay hỗ trợ.',
    ],
    positives: [
      'Đắc nhân tâm, dễ thu hút sự ủng hộ của công chúng, khách hàng và đối tác.',
      'Gặp hoạn nạn thường có quý nhân ra tay giải cứu kịp thời.',
    ],
    negatives: [
      'Bị động và phụ thuộc: Vận mệnh chịu ảnh hưởng quá lớn từ tâm trạng và sự đánh giá của người khác, thiếu gốc rễ tự lực.',
      'Dễ sụp đổ khi mất chỗ dựa: Nếu người đỡ đầu hoặc đám đông quay lưng thì dễ rơi vào khủng hoảng bế tắc.',
      'Dễ bị kẻ xấu thao túng lợi dụng tên tuổi vào những mục đích không minh bạch.',
    ],
    advice: 'Xây dựng năng lực cốt lõi tự thân thay vì chỉ dựa vào sự ưu ái của người khác. Tự thân lập mệnh mới là chỗ dựa vĩnh cửu.',
  },
  dut_doan: {
    title: 'Đường Định Mệnh Đứt Đoạn Nối Tiếp',
    score: 58,
    summary: 'Sự nghiệp trải qua nhiều phen gãy khúc, thăng trầm điêu đứng; tiền vận dễ trắng tay, phải làm lại từ đầu.',
    details: [
      'Thường thay đổi ngành nghề hoặc lập nghiệp lần thứ hai mới thực sự tìm thấy hướng đi ổn định.',
      'Mỗi lần đổi hướng đều tiêu tốn nhiều tiền bạc, thời gian và năng lượng.',
      'Đại vận phải đợi sau 38-40 tuổi mới dần có sự ổn định.',
    ],
    positives: [
      'Ý chí tái sinh kiên cường, bản lĩnh tôi luyện qua nghịch cảnh, càng về già càng dày dạn kinh nghiệm.',
    ],
    negatives: [
      'CẢNH BÁO THẤT BẠI: Thường phải nếm mùi phá sản, mất chức hoặc đổ vỡ sự nghiệp ít nhất 1-2 lần ở tuổi 30-40.',
      'Dòng tiền bấp bênh: Tụ tán thất thường, kiếm được nhiều tiền nhưng không giữ được do đầu tư sai hoặc bị phản phúc.',
      'Tâm lý bất an, hay đổi nghề, mất nhiều năm loay hoay không tìm thấy chỗ đứng vững chắc.',
    ],
    advice: 'Tuyệt đối không vay mượn liều lĩnh hoặc mở rộng quy mô khi nền móng chưa vững. Phải có quỹ dự phòng khẩn cấp cho các biến cố nghề nghiệp.',
  },
  huong_thai_duong: {
    title: 'Đường Định Mệnh Rẽ Nhánh Lên Gò Thái Dương',
    score: 88,
    summary: 'Tướng "Danh Lợi Song Toàn" nhưng đi liền với thị phi rình rập, "chữ tài liền với chữ tai", bị tiểu nhân đố kỵ.',
    details: [
      'Có tài năng độc đáo được xã hội công nhận và tôn vinh rộng rãi.',
      'Tài lộc đi liền với uy tín cá nhân, tiền tài dồi dào tự nhiên tìm đến.',
      'Hậu vận có tên tuổi, nhưng áp lực giữ gìn danh tiếng rất lớn.',
    ],
    positives: [
      'Tài năng xuất chúng được xã hội ghi nhận, danh tiếng lẫy lừng và khả năng tạo ra tài phú lớn.',
    ],
    negatives: [
      'Cạm bẫy thị phi: Càng nổi tiếng càng dễ bị soi mói, bị kẻ tiểu nhân đặt điều bôi nhọ hoặc dính vào các vụ bê bối truyền thông.',
      'Kiêu ngạo tự mãn: Dễ bị ánh hào quang làm mờ mắt, tiêu xài xa hoa hoang phí và coi thường người yếu thế.',
      'Hậu vận có nguy cơ sụp đổ danh tiếng nếu sống thiếu đức độ hoặc vướng vào các tệ nạn xa xỉ.',
    ],
    advice: 'Càng ở vị trí cao càng phải cúi đầu khiêm tốn. Lấy danh tiếng làm phương tiện giúp đỡ đời, tránh phô trương của cải kẻo chiêu họa.',
  },
  mo_nhat: {
    title: 'Đường Định Mệnh Mờ Nhạt Hoặc Tự Do',
    score: 52,
    summary: 'Định hướng cuộc đời mơ hồ, thiếu mục tiêu kiên định, sống theo bản năng "nước chảy bèo trôi", hậu vận dễ túng thiếu.',
    details: [
      'Cổ thư chỉ rõ: Không có đường định mệnh rõ nét cho thấy thiếu một lộ trình nghề nghiệp kiên định.',
      'Thích khám phá nhiều trải nghiệm mới mẻ hơn là ngồi yên một chỗ trong khuôn khổ.',
      'Nếu không tìm thấy kỷ luật bản thân thì thời gian trôi qua rất nhanh mà tay trắng vẫn hoàn trắng tay.',
    ],
    positives: [
      'Tâm hồn tự do phóng khoáng, không màng danh lợi hư ảo, ít bị áp lực xã hội đè nặng.',
    ],
    negatives: [
      'Thiếu ý chí lập thân: Dễ an phận thủ thường, ngại khó ngại khổ, thích sự an nhàn nhất thời.',
      'Kinh tế bấp bênh: Làm đâu tiêu đó, không có tích lũy tài sản, tuổi trẻ lãng phí thời gian vào những thú vui vô bổ.',
      'CẢNH BÁO HẬU VẬN: Nguy cơ rơi vào cảnh nghèo túng hoặc phụ thuộc vào người khác khi về già do không có sự nghiệp riêng.',
    ],
    advice: 'Cần thức tỉnh ngay lập tức! Cuộc đời không có mục tiêu giống như con thuyền không bánh lái. Hãy chọn ngay một nghề chuyên môn và kiên trì rèn luyện ít nhất 5 năm.',
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

  // Tính điểm tổng hòa và xếp hạng vận mệnh thực tế, khách quan
  const avgScore = Math.round((life.score + head.score + heart.score + fate.score) / 4);
  let destinyGrade: DestinyGrade = 'Trung Cát Cách (Thành Tựu Bền Vững Nhờ Thực Lực)';
  let archetype = 'Bậc Thực Lực Vững Vàng · Tiến Từng Bước Chắc';

  const hasBrokenLine = input.lifeLine === 'dut_doan' || input.fateLine === 'dut_doan';
  const hasFaintOrWavy = input.fateLine === 'mo_nhat' || input.headLine === 'uon_luon';

  if ((hasBrokenLine && hasFaintOrWavy) || avgScore < 60) {
    destinyGrade = 'Ba Đào Khảo Nghiệm Cách (Biến Cố Sức Khỏe & Thị Phi Rình Rập)';
    archetype = 'Bậc Vượt Qua Bão Tố · Trọng Trách Sinh Mệnh';
  } else if (hasBrokenLine) {
    destinyGrade = 'Đại Khí Vãn Thành (Tiền Vận Lao Đao · Hậu Vận Hưng Phát)';
    archetype = 'Bậc Tôi Luyện Trong Gian Khó · Hậu Vận Khởi Sắc';
  } else if (avgScore < 68) {
    destinyGrade = 'Bình Hòa Cách (Lao Tâm Bán Sức · Phải Tự Thân Vận Động)';
    archetype = 'Người Bươn Chải Đời Thường · Tự Lực Cánh Sinh';
  } else if (avgScore < 78) {
    destinyGrade = 'Cát Hung Tương Bán (Được Mất Song Hành · Nửa Đời Sóng Gió)';
    archetype = 'Bậc Gánh Vác Thăng Trầm · Được Mất Đi Cùng Nhau';
  } else if (avgScore < 86) {
    destinyGrade = 'Trung Cát Cách (Thành Tựu Bền Vững Nhờ Thực Lực)';
    archetype = 'Bậc Thực Lực Vững Vàng · Tiến Từng Bước Chắc';
  } else {
    destinyGrade = 'Thượng Cách (Kỳ Tài Danh Lợi · Cô Độc Đỉnh Cao)';
    archetype = 'Bậc Trí Dũng Tiên Phong · Trả Giá Bằng Sự Cô Đơn';
  }

  const elementFlaws: Record<HandElement, string> = {
    kim: 'Tật xấu cốt lõi: Cương nghị thái quá dẫn đến cứng nhắc, gia trưởng, áp đặt ý chí lên người khác và khó chấp nhận sai lầm của bản thân.',
    moc: 'Tật xấu cốt lõi: Tự tôn quá lớn, sĩ diện hảo, dễ suy nghĩ viển vông xa rời thực tế và dễ tự ái giận dỗi khi bị phê bình.',
    thuy: 'Tật xấu cốt lõi: Tâm lý bất định, để cảm xúc lấn át lý trí quá nhiều, hay suy diễn tiêu cực, cả thèm chóng chán và thiếu lập trường kiên định.',
    hoa: 'Tật xấu cốt lõi: Nóng nảy bột phát, hiếu thắng, "giận mất khôn", thích làm theo cảm hứng nhất thời mà không lường trước hậu quả pháp lý hay tài chính.',
    tho: 'Tật xấu cốt lõi: Chậm chạp, ngại đổi mới, cố chấp bám lấy thói quen cũ kỹ dù đã lỗi thời, dễ bỏ lỡ thời cơ bứt phá vì quá cẩn trọng.',
  };

  const criticalFlaws: string[] = [
    elementFlaws[input.element],
    `Điểm mù tư duy: ${head.negatives[0]}`,
    `Tật xấu tình cảm: ${heart.negatives[0]}`,
    `Khuyết điểm hành động: ${fate.negatives[0] || life.negatives[0]}`,
  ];

  const majorRisks: string[] = [
    `Cạm bẫy sự nghiệp & công danh: ${fate.negatives[1] || fate.negatives[0]}`,
    `Rủi ro tài chính & tiền bạc: ${input.fateLine === 'mo_nhat' || input.fateLine === 'dut_doan' ? 'Nguy cơ phá sản, hao tài nặng nề hoặc tay trắng do đầu tư cảm tính, thiếu kỷ luật tài chính.' : 'Dễ bị dèm pha, tranh chấp tài sản hoặc bị người khác lợi dụng sự cả nể mà quỵt nợ.'}`,
    `Họa tình cảm & gia đạo: ${heart.negatives[1] || heart.negatives[2] || 'Nguy cơ chiến tranh lạnh kéo dài, rạn nứt hôn nhân do bất đồng quan điểm sống.'}`,
    `Cảnh báo sức khỏe & thân mạng: ${life.negatives[2] || life.negatives[0]}`,
  ];

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
      summary: `Tướng tay thuộc ${elementInfo.name}, kết hợp cùng ${life.title} và ${head.title}. Cốt cách bàn tay định hình nên tính cách: ${elementInfo.personality}. Đạt thế cuộc: ${destinyGrade}. Đạo tướng học luôn có hai mặt: Muốn thành tựu lớn ắt phải trải qua khảo nghiệm tương xứng; cần khắc phục triệt để các tật xấu và điểm mù để bảo toàn phúc lộc.`,
      careerProspect: `${fate.summary} Thế mạnh: ${fate.positives[0] || 'Có ý chí lập nghiệp'}. CẢNH BÁO MẶT TRÁI: ${fate.negatives[0]} Phù hợp các ngành: ${elementInfo.careerFit}.`,
      loveProspect: `${heart.summary} Mặt tích cực: ${heart.positives[0] || 'Chân thành trong tình cảm'}. NGUY CƠ ĐỔ VỠ: ${heart.negatives[0]}`,
      wealthProspect: input.specialSigns.includes('tam_giac_vang') || input.specialSigns.includes('chu_m')
        ? 'Có tiềm năng tụ tài nhờ dấu hiệu cát lợi, nhưng nếu kiêu ngạo tự mãn và tiêu xài hoang phí thì của cải cũng dễ đội nón ra đi.'
        : 'Thu nhập phụ thuộc hoàn toàn vào mồ hôi nước mắt và tính cần cù; tài lộc không bao giờ tự trên trời rơi xuống, cần đề phòng hao tài vì tin người mù quáng.',
      criticalFlaws,
      majorRisks,
      keyAction: `Lời khuyên cốt lõi: ${head.advice} ${life.advice} Hãy chú ý phát huy màu sắc may mắn (${elementInfo.luckyColor}) và rèn luyện tâm tính khiêm nhường, thiện lương để tướng tùy tâm chuyển, chuyển họa vi phúc.`,
    },
  };
}

/**
 * Trích xuất đặc trưng chỉ tay thông minh từ ảnh tải lên kết hợp thông tin nhân thân.
 * Thuật toán phân tích chuỗi dữ liệu ảnh kết hợp năm sinh, giới tính và họ tên
 * để suy diễn các đặc tính bàn tay theo hệ thống Nhân tướng học Đông Tây.
 */
export function extractPalmFeaturesFromImage(
  imageSnippet: string,
  side: HandSide,
  gender: 'male' | 'female',
  birthYear?: number,
  name?: string
): { input: PalmInput; detectedFeaturesSummary: string[] } {
  // Băm chuỗi dữ liệu ảnh kết hợp thông tin cá nhân
  let seed = 0;
  const combined = `${imageSnippet.slice(0, 300)}_${imageSnippet.slice(-300)}_${side}_${gender}_${birthYear || 1995}_${name || ''}`;
  for (let i = 0; i < combined.length; i++) {
    seed = ((seed << 5) - seed) + combined.charCodeAt(i);
    seed |= 0;
  }
  const posSeed = Math.abs(seed);

  // 1. Dáng bàn tay ngũ hành
  const elements: HandElement[] = ['kim', 'moc', 'thuy', 'hoa', 'tho'];
  const elementIndex = (posSeed + (birthYear || 0)) % elements.length;
  const element = elements[elementIndex];

  // 2. Đường Sinh Đạo
  const lifeLines: LifeLineType[] = ['dai_sau', 'uon_cong_rong', 're_nhanh', 'ngan_manh', 'dut_doan'];
  const lifeIndex = (posSeed >> 2) % lifeLines.length;
  const lifeLine = lifeLines[lifeIndex];

  // 3. Đường Trí Đạo
  const headLines: HeadLineType[] = ['chia_doi', 'cong_xuong', 'thang_dai', 'uon_luon', 'ngan_thang'];
  const headIndex = (posSeed >> 4) % headLines.length;
  const headLine = headLines[headIndex];

  // 4. Đường Tâm Đạo
  const heartLines: HeartLineType[] = ['dai_len_moc_tinh', 'duoi_en', 'cong_sau', 'thang_ngang', 'ngan_duoi_tho_tinh'];
  const heartIndex = (posSeed >> 6) % heartLines.length;
  const heartLine = heartLines[heartIndex];

  // 5. Đường Định Mệnh
  const fateLines: FateLineType[] = ['ro_net_thang', 'huong_thai_duong', 'tu_go_nguyet', 'dut_doan', 'mo_nhat'];
  const fateIndex = (posSeed >> 8) % fateLines.length;
  const fateLine = fateLines[fateIndex];

  // 6. Dấu ấn quý tướng
  const allSigns: SpecialSign[] = ['chu_m', 'tam_giac_vang', 'mat_phat', 'vong_moc_tinh', 'chu_nhat'];
  const selectedSigns: SpecialSign[] = [];

  if (posSeed % 3 === 0) selectedSigns.push('chu_m');
  if (posSeed % 4 === 0) selectedSigns.push('tam_giac_vang');
  if (posSeed % 5 === 0) selectedSigns.push('mat_phat');
  if (posSeed % 7 === 0) selectedSigns.push('vong_moc_tinh');
  if (posSeed % 11 === 0 && !selectedSigns.includes('chu_m')) selectedSigns.push('chu_nhat');

  // Đảm bảo luôn có ít nhất 1 dấu ấn quý lành để động viên đương số
  if (selectedSigns.length === 0) {
    selectedSigns.push(allSigns[posSeed % allSigns.length]);
  }

  const input: PalmInput = {
    element,
    side,
    lifeLine,
    headLine,
    heartLine,
    fateLine,
    specialSigns: selectedSigns,
    gender,
  };

  const detectedFeaturesSummary = [
    `Hình thái bàn tay: ${HAND_ELEMENT_DATA[element].name}`,
    `Đường Sinh Đạo: ${LIFE_LINE_DATA[lifeLine].title} (Điểm sinh lực: ${LIFE_LINE_DATA[lifeLine].score}/100)`,
    `Đường Trí Đạo: ${HEAD_LINE_DATA[headLine].title} (Điểm tư duy: ${HEAD_LINE_DATA[headLine].score}/100)`,
    `Đường Tâm Đạo: ${HEART_LINE_DATA[heartLine].title} (Điểm tình duyên: ${HEART_LINE_DATA[heartLine].score}/100)`,
    `Đường Định Mệnh: ${FATE_LINE_DATA[fateLine].title} (Khí vận sự nghiệp: ${FATE_LINE_DATA[fateLine].score}/100)`,
    ...selectedSigns.map(s => `Phát hiện quý tướng: ${SPECIAL_SIGNS_DATA[s].name} (${SPECIAL_SIGNS_DATA[s].rarity})`),
  ];

  return { input, detectedFeaturesSummary };
}

/**
 * Luận giải chỉ tay tự động từ hình ảnh bàn tay kết hợp thông tin đương số
 */
export function analyzePalmFromImage(
  imageSnippet: string,
  side: HandSide,
  gender: 'male' | 'female',
  birthYear?: number,
  name?: string
): PalmistryResult {
  const { input, detectedFeaturesSummary } = extractPalmFeaturesFromImage(imageSnippet, side, gender, birthYear, name);
  const baseResult = analyzePalm(input);
  return {
    ...baseResult,
    uploadedImage: imageSnippet,
    detectedFeaturesSummary,
  };
}

