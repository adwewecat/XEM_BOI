/**
 * KINH DỊCH CHIÊM BỐC - CHU DỊCH 64 QUẺ TOÀN THƯ
 * Mô phỏng phương pháp Gieo 3 Đồng Xu Cổ (Tiền Lạc Văn Vương)
 * Tự động tính Hào Động, Quẻ Bản Mệnh (Bản Quái), Quẻ Biến (Biến Quái)
 * Luận giải Thoán Từ, Tượng Truyện, Sự Nghiệp, Tình Duyên, Tài Vận thuần Việt 100%.
 */

export interface HexagramDetail {
  number: number;
  name: string;        // Tên quẻ tiếng Việt (Ví dụ: Thuần Càn, Hỏa Thiên Đại Hữu)
  chineseName: string; // Tên Hán Việt (乾为天, 火天大有)
  upperTrigram: string; // Ngoại quái (Càn, Khôn, Ly, Khảm...)
  lowerTrigram: string; // Nội quái
  nature: 'Đại Cát' | 'Cát' | 'Bình Hòa' | 'Hung' | 'Đại Hung';
  summary: string;     // Lời quẻ tóm lược
  thuanTu: string;     // Thoán Từ kinh điển
  tuongTruyen: string; // Đại Tượng Truyện
  career: string;      // Luận giải sự nghiệp & công danh
  wealth: string;      // Luận giải tài lộc & kinh doanh
  love: string;        // Luận giải tình duyên & gia đạo
  advice: string;      // Lời khuyên người quân tử
}

// 8 Đơn Quái (Bát Quái)
export const TRIGRAMS: Record<string, { binary: string; symbol: string; vi: string; element: string; nature: string }> = {
  '111': { binary: '111', symbol: '☰', vi: 'Càn (Trời)', element: 'Kim', nature: 'Cương kiện, sáng tạo' },
  '011': { binary: '011', symbol: '☱', vi: 'Đoài (Đầm/Trạch)', element: 'Kim', nature: 'Vui vẻ, hòa nhã' },
  '101': { binary: '101', symbol: '☲', vi: 'Ly (Lửa/Hỏa)', element: 'Hỏa', nature: 'Sáng tỏ, văn minh' },
  '001': { binary: '001', symbol: '☳', vi: 'Chấn (Sấm/Lôi)', element: 'Mộc', nature: 'Khởi động, chấn động' },
  '110': { binary: '110', symbol: '☴', vi: 'Tốn (Gió/Phong)', element: 'Mộc', nature: 'Thuận nhập, nhu hòa' },
  '010': { binary: '010', symbol: '☵', vi: 'Khảm (Nước/Thủy)', element: 'Thủy', nature: 'Hiểm trở, sâu sắc' },
  '100': { binary: '100', symbol: '☶', vi: 'Cấn (Núi/Sơn)', element: 'Thổ', nature: 'Ngưng nghỉ, vững chãi' },
  '000': { binary: '000', symbol: '☷', vi: 'Khôn (Đất/Địa)', element: 'Thổ', nature: 'Nhu thuận, bao dung' },
};

// Từ điển 64 Quẻ Kinh Dịch
export const HEXAGRAMS_MAP: Record<string, HexagramDetail> = {
  // Càn vi Thiên (111111)
  '111111': {
    number: 1,
    name: 'Thuần Càn (Trời)',
    chineseName: '乾为天',
    upperTrigram: 'Càn',
    lowerTrigram: 'Càn',
    nature: 'Đại Cát',
    summary: 'Rồng bay trên trời, thời vận hanh thông, cương kiện tiến thủ',
    thuanTu: 'Càn: Nguyên, Hanh, Lợi, Trinh. Khởi đầu vĩ đại, hanh thông tột bực, lợi ích dài lâu, chính đạo bền vững.',
    tuongTruyen: 'Thiên hành kiện, quân tử dĩ tự cường bất tức (Trời vận hành mạnh mẽ, người quân tử noi gương đó tự cường không ngừng nghỉ).',
    career: 'Thời vận đỉnh cao, nắm quyền lãnh đạo, được cấp trên và đối tác hết lòng tin tưởng.',
    wealth: 'Tài chính dồi dào, các dự án đầu tư lớn sinh sôi nảy nở, gặt hái thành quả xứng đáng.',
    love: 'Tình cảm quang minh chính đại, vợ chồng hòa thuận, người độc thân gặp ý trung nhân ưu tú.',
    advice: 'Tuy đang thời cực thịnh nhưng chớ kiêu căng tự mãn, giữ lòng khiêm tốn kẻo "Kháng long hữu hối" (Rồng bay quá cao tất có hối hận).',
  },
  // Khôn vi Địa (000000)
  '000000': {
    number: 2,
    name: 'Thuần Khôn (Đất)',
    chineseName: '坤为地',
    upperTrigram: 'Khôn',
    lowerTrigram: 'Khôn',
    nature: 'Cát',
    summary: 'Đất mẹ bao dung, vạn vật sinh sôi, nhu thuận bền chí',
    thuanTu: 'Khôn: Nguyên hanh, lợi tẫn mã chi trinh. Nhu thuận như ngựa cái, điềm đạm bền bỉ thì muôn sự tốt lành.',
    tuongTruyen: 'Địa thế khôn, quân tử dĩ hậu đức tải vật (Đất có thế dày, người quân tử lấy đức dày mà chở che nâng đỡ muôn vật).',
    career: 'Nên làm việc âm thầm, cống hiến hỗ trợ phía sau, không nên nóng vội tranh đoạt vị trí số một.',
    wealth: 'Tích tiểu thành đại, kinh doanh bền vững, không nên đầu cơ mạo hiểm.',
    love: 'Hôn nhân êm ấm, thấu hiểu và hy sinh vì nhau, hậu phương vững chắc cho sự nghiệp.',
    advice: 'Lấy nhu thắng cương, kiên nhẫn tích lũy công đức, thời cơ chín muồi tự khắc hái quả ngọt.',
  },
  // Thủy Lôi Truân (010001)
  '010001': {
    number: 3,
    name: 'Thủy Lôi Truân',
    chineseName: '水雷屯',
    upperTrigram: 'Khảm',
    lowerTrigram: 'Chấn',
    nature: 'Bình Hòa',
    summary: 'Mầm non đội đá, vạn sự khởi đầu nan, cần kiên trì chờ thời',
    thuanTu: 'Truân: Nguyên hanh lợi trinh, vật dụng hữu du vãng, lợi kiến hầu. Bước đầu gian khó nhưng tiền đồ xán lạn, chớ manh động, cần tìm hiền tài tương trợ.',
    tuongTruyen: 'Vân lôi truân, quân tử dĩ kinh luân (Mây sấm dồn dập, người quân tử sắp xếp kinh luân trật tự).',
    career: 'Giai đoạn lập nghiệp hoặc chuyển đổi công việc gặp nhiều bỡ ngỡ trở ngại, cần kiên định không thoái chí.',
    wealth: 'Tài chính ban đầu eo hẹp, không nên vội vã bung tiền lớn, nên củng cố nền móng.',
    love: 'Tình cảm có chút thử thách, cần thời gian để thấu hiểu và gắn kết chân thành.',
    advice: 'Vạn sự khởi đầu nan, đừng nản lòng trước bước khó khăn sơ khởi; tích cực học hỏi và tích lũy lực lượng.',
  },
  // Sơn Thủy Mông (100010)
  '100010': {
    number: 4,
    name: 'Sơn Thủy Mông',
    chineseName: '山水蒙',
    upperTrigram: 'Cấn',
    lowerTrigram: 'Khảm',
    nature: 'Bình Hòa',
    summary: 'Suối nguồn dưới chân núi, khai tâm mở trí, cần người dẫn đường khai sáng',
    thuanTu: 'Mông: Hanh. Phỉ ngã cầu đồng mông, đồng mông cầu ngã. Điềm nhiên học hỏi, tôn sư trọng đạo thì sáng suốt.',
    tuongTruyen: 'Sơn hạ xuất tuyền, Mông; quân tử dĩ quả hành dục đức (Dưới núi có dòng suối chảy, người quân tử lấy đó rèn đức luyện tài).',
    career: 'Cần tìm kiếm quý nhân, cố vấn giàu kinh nghiệm chỉ bảo, không nên tự ý quyết định theo cảm tính.',
    wealth: 'Đang trong quá trình thăm dò thị trường, nên học hỏi kỹ trước khi đầu tư.',
    love: 'Tình cảm còn mơ hồ, cần sự chân thành và tỏ bày rõ ràng để tránh hiểu lầm.',
    advice: 'Hạ cái tôi xuống để lắng nghe lời chỉ dạy của người đi trước; tri thức là chìa khóa mở lối thành công.',
  },
  // Thủy Thiên Nhu (010111)
  '010111': {
    number: 5,
    name: 'Thủy Thiên Nhu',
    chineseName: '水天需',
    upperTrigram: 'Khảm',
    lowerTrigram: 'Càn',
    nature: 'Cát',
    summary: 'Mây tụ trên trời chờ mưa, kiên nhẫn chờ thời, ung dung tích lũy',
    thuanTu: 'Nhu: Hữu phu, quang hanh, trinh cát, lợi thiệp đại xuyên. Có lòng tin thành thực thì sáng rõ hanh thông, qua sông lớn được lợi.',
    tuongTruyen: 'Vân thượng vu thiên, Nhu; quân tử dĩ ẩm thực yến lạc (Mây bay trên trời, người quân tử ăn uống yên vui chờ thời).',
    career: 'Cơ hội lớn sắp tới, hiện tại cần chuẩn bị kỹ lưỡng về chuyên môn và nhân sự.',
    wealth: 'Tiền tài ổn định, dòng tiền an toàn, sắp có khoản thu hoạch từ những nỗ lực đã gieo trồng.',
    love: 'Duyên lành đang tới gần, người độc thân hãy mở lòng kết nối tự nhiên.',
    advice: 'Dục tốc bất đạt; giữ tâm an định, dưỡng sức đợi thời cơ bùng nổ.',
  },
  // Thiên Thủy Tụng (111010)
  '111010': {
    number: 6,
    name: 'Thiên Thủy Tụng',
    chineseName: '天水讼',
    upperTrigram: 'Càn',
    lowerTrigram: 'Khảm',
    nature: 'Hung',
    summary: 'Trời nước ngược chiều, tranh chấp bất hòa, dĩ hòa vi quý',
    thuanTu: 'Tụng: Hữu phu trất dịch, thích trung cát, chung hung. Tranh biện dẫu đúng cũng bất lợi, dĩ hòa vi quý mới êm đẹp.',
    tuongTruyen: 'Thiên dữ thủy vi hành, Tụng; quân tử dĩ tác sự mưu thủy (Trời và nước ngược lối, người quân tử cẩn trọng từ lúc khởi đầu).',
    career: 'Đề phòng bất đồng với đồng nghiệp, đối tác hoặc kiện tụng hợp đồng; hợp đồng phải rõ ràng giấy trắng mực đen.',
    wealth: 'Tránh các vụ đầu tư mập mờ có nguy cơ tranh chấp pháp lý.',
    love: 'Dễ xảy ra khẩu thiệt cãi vã, nên nhường nhịn và lắng nghe đối phương.',
    advice: 'Lùi một bước trời cao biển rộng, thắng một cuộc cãi vã mà mất đi một mối thâm giao là cái hại khôn lường.',
  },
  // Địa Thủy Sư (000010)
  '000010': {
    number: 7,
    name: 'Địa Thủy Sư',
    chineseName: '地水师',
    upperTrigram: 'Khôn',
    lowerTrigram: 'Khảm',
    nature: 'Bình Hòa',
    summary: 'Nước tụ trong lòng đất, dấy quân xuất trận, kỷ luật nghiêm minh',
    thuanTu: 'Sư: Trinh, trượng nhân cát, vô cửu. Kỷ luật như quân đội, người đứng đầu công minh thì muôn sự thành.',
    tuongTruyen: 'Địa trung hữu thủy, Sư; quân tử dĩ dung dân súc chúng (Đất chứa nước ngầm, người quân tử lấy đó dưỡng dân tích lực).',
    career: 'Cần siết chặt quy trình, phân công rõ ràng, đoàn kết tập thể để vượt qua chiến dịch lớn.',
    wealth: 'Quản lý tài chính chặt chẽ, chi tiêu đúng mục đích, tích lũy ngân sách dự phòng.',
    love: 'Gia đình cần có nguyên tắc và sự tôn trọng lẫn nhau.',
    advice: 'Muốn lãnh đạo được người khác trước hết phải tự kỷ luật chính mình; kỷ luật là sức mạnh tối thượng.',
  },
  // Thủy Địa Tỷ (010000)
  '010000': {
    number: 8,
    name: 'Thủy Địa Tỷ',
    chineseName: '水地比',
    upperTrigram: 'Khảm',
    lowerTrigram: 'Khôn',
    nature: 'Đại Cát',
    summary: 'Nước thấm vào đất, thân ái gắn kết, bạn bè đồng lòng tương trợ',
    thuanTu: 'Tỷ: Cát. Nguyên phệ, nguyên vĩnh trinh, vô cửu. Gắn bó chân thành, cùng chung chí hướng thì đại cát.',
    tuongTruyen: 'Địa thượng hữu thủy, Tỷ; tiên vương dĩ kiến vạn quốc, thân chư hầu (Trên đất có nước, vua lập nước bang giao hòa ái).',
    career: 'Mở rộng mạng lưới quan hệ, tìm được đối tác đắc lực cùng chung thuyền phát triển.',
    wealth: 'Hợp tác làm ăn sinh lời, nguồn tài lộc dồi dào nhờ uy tín cá nhân.',
    love: 'Tình cảm mặn nồng keo sơn, tri kỷ tri âm, gia đạo thuận hòa.',
    advice: 'Chọn bạn mà chơi, đối đãi người chân thành thì người sẽ lấy lòng dạ đáp lại.',
  },
  // Phong Thiên Tiểu Súc (110111)
  '110111': {
    number: 9,
    name: 'Phong Thiên Tiểu Súc',
    chineseName: '风天小畜',
    upperTrigram: 'Tốn',
    lowerTrigram: 'Càn',
    nature: 'Bình Hòa',
    summary: 'Gió thổi trên trời, mây dày đặc chưa mưa, tích lũy điều nhỏ nhặt',
    thuanTu: 'Tiểu Súc: Hanh. Mật vân bất vũ, tự ngã tây giao. Tích lũy tài đức từng chút một, chớ nóng vội mong thành tựu lớn ngay.',
    tuongTruyen: 'Phong hành thiên thượng, Tiểu Súc; quân tử dĩ ý văn đức (Gió bay trên trời, người quân tử trau dồi văn đức).',
    career: 'Làm tốt từng nhiệm vụ nhỏ, nâng cao kỹ năng chuyên môn, chờ thời cơ chín muồi.',
    wealth: 'Tiết kiệm và tích lũy từng khoản nhỏ, tránh vung tay quá trán.',
    love: 'Cần sự chăm sóc ân cần từ những cử chỉ nhỏ nhặt thường ngày.',
    advice: 'Kiến tha lâu cũng đầy tổ; thành công vĩ đại bắt đầu từ việc hoàn thành xuất sắc những việc nhỏ.',
  },
  // Thiên Trạch Lý (111011)
  '111011': {
    number: 10,
    name: 'Thiên Trạch Lý',
    chineseName: '天泽履',
    upperTrigram: 'Càn',
    lowerTrigram: 'Đoài',
    nature: 'Cát',
    summary: 'Giẫm lên đuôi cọp mà cọp không cắn, giữ lễ nghĩa chuẩn mực, hóa hiểm thành an',
    thuanTu: 'Lý: Lý hổ vĩ, bất xỉ nhân, hanh. Điềm tĩnh giữ lễ, biết mình biết người thì gặp nạn cũng thoát.',
    tuongTruyen: 'Thượng thiên hạ trạch, Lý; quân tử dĩ biện thượng hạ, định dân chí (Trời trên đầm dưới, người quân tử phân định tôn ti lễ độ).',
    career: 'Gặp gỡ cấp trên hoặc đối tác khó tính, chỉ cần giữ đúng thái độ tôn trọng, chuyên nghiệp sẽ vượt qua xuất sắc.',
    wealth: 'Đầu tư cần tuân thủ nghiêm ngặt pháp luật và quy chuẩn tài chính.',
    love: 'Tôn trọng không gian riêng của nhau, cư xử nhã nhặn tôn trọng.',
    advice: 'Lễ nghĩa và sự khiêm nhường là tấm khiên vững chắc nhất bảo vệ ta trước mọi sóng gió cuộc đời.',
  },
  // Địa Thiên Thái (000111)
  '000111': {
    number: 11,
    name: 'Địa Thiên Thái',
    chineseName: '地天泰',
    upperTrigram: 'Khôn',
    lowerTrigram: 'Càn',
    nature: 'Đại Cát',
    summary: 'Khí đất trời giao hòa, quốc thái dân an, vạn sự hanh thông như ý',
    thuanTu: 'Thái: Tiểu vãng đại lai, cát hanh. Điều xấu qua đi, điều tốt đẹp đến, muôn sự cát tường thịnh vượng.',
    tuongTruyen: 'Thiên địa giao, Thái; hậu dĩ tài thành thiên địa chi đạo (Trời đất giao hòa, người điều hành thuận theo đạo trời đất nuôi dưỡng muôn dân).',
    career: 'Thời vận hoàng kim, thăng quan tiến chức, công việc thuận buồm xuôi gió, được cấp trên nâng đỡ.',
    wealth: 'Tài lộc dồi dào, tiền bạc luân chuyển hanh thông, thu lợi lớn từ nhiều nguồn.',
    love: 'Hôn nhân viên mãn, vợ chồng tâm đầu ý hợp, hỷ sự ngập tràn.',
    advice: 'Đang ở thời cực thịnh, nên chia sẻ phúc lành và chuẩn bị phương án dự phòng khi thời thế đổi thay.',
  },
  // Thiên Địa Bĩ (111000)
  '111000': {
    number: 12,
    name: 'Thiên Địa Bĩ',
    chineseName: '天地否',
    upperTrigram: 'Càn',
    lowerTrigram: 'Khôn',
    nature: 'Hung',
    summary: 'Trời đất cách trở, bế tắc ngưng trệ, kẻ tiểu nhân đắc chí',
    thuanTu: 'Bĩ: Chi phỉ nhân, bất lợi quân tử trinh, đại vãng tiểu lai. Khí vận bế tắc, người quân tử nên giữ mình kín đáo, chớ mưu đồ chuyện lớn.',
    tuongTruyen: 'Thiên địa bất giao, Bĩ; quân tử dĩ kiệm đức tị nan, bất khả vinh dĩ lộc (Trời đất không giao tiếp, người quân tử tiết kiệm đức độ tránh tai nạn, không màng bổng lộc vinh hoa).',
    career: 'Công việc đình trệ, gặp người cản trở hoặc môi trường thiếu minh bạch; nên thủ thế chờ thời.',
    wealth: 'Thắt chặt chi tiêu, bảo toàn vốn liếng, tuyệt đối không tham gia các kênh đầu tư mạo hiểm.',
    love: 'Quan hệ nguội lạnh, thiếu sự thấu hiểu; cần kiên nhẫn đối thoại chân tình.',
    advice: 'Bĩ cực thì Thái lai; trong lúc khốn khó nhất hãy mài giũa nội lực, giông bão qua đi nắng ấm sẽ về.',
  },
  // Hỏa Thiên Đại Hữu (101111)
  '101111': {
    number: 14,
    name: 'Hỏa Thiên Đại Hữu',
    chineseName: '火天大有',
    upperTrigram: 'Ly',
    lowerTrigram: 'Càn',
    nature: 'Đại Cát',
    summary: 'Mặt trời tỏa sáng giữa trời cao, sở hữu muôn vàn của cải, công đức rạng ngời',
    thuanTu: 'Đại Hữu: Nguyên hanh. Có sự nghiệp to lớn, tài đức vẹn toàn, được thiên hạ tôn kính.',
    tuongTruyen: 'Hỏa tại thiên thượng, Đại Hữu; quân tử dĩ át ác dương thiện, thuận thiên hưu mệnh (Lửa sáng trên trời, người quân tử diệt điều ác giương điều thiện, thuận theo mệnh trời).',
    career: 'Sự nghiệp thăng hoa tột bậc, danh tiếng vang xa, được tín nhiệm giao trọng trách lớn.',
    wealth: 'Của cải tích lũy dồi dào, kinh doanh phát đạt, thịnh vượng bền lâu.',
    love: 'Tình cảm rạng rỡ, gia đình hạnh phúc ấm êm, con cái hiển đạt.',
    advice: 'Lộc trời ban cần biết dùng để hành thiện tích đức, ban phát cho người khó khăn để phúc trạch dài lâu.',
  },
  // Địa Sơn Khiêm (000100)
  '000100': {
    number: 15,
    name: 'Địa Sơn Khiêm',
    chineseName: '地山谦',
    upperTrigram: 'Khôn',
    lowerTrigram: 'Cấn',
    nature: 'Đại Cát',
    summary: 'Núi cao chịu ẩn mình dưới đất, khiêm tốn nhún nhường, đạo trời bồi đắp',
    thuanTu: 'Khiêm: Hanh, quân tử hữu chung. Khiêm nhường thì hanh thông, người quân tử giữ lòng khiêm tốn ắt có kết cục mỹ mãn.',
    tuongTruyen: 'Địa trung hữu sơn, Khiêm; quân tử dĩ phẫu đa ích quả, xưng vật bình thi (Trong đất có núi, người quân tử bớt chỗ nhiều bù chỗ ít, ban phát công bằng).',
    career: 'Được đồng nghiệp và cấp dưới kính phục, tiến bước vững chắc không ai đố kỵ.',
    wealth: 'Tiền tài bền vững, không khoe khoang của cải, cuộc sống sung túc an nhàn.',
    love: 'Đối phương trân trọng tấm lòng bao dung, khiêm hạ; tình yêu bền chặt qua năm tháng.',
    advice: 'Đạo trời bớt chỗ dư thừa bù chỗ thiếu hụt; kẻ kiêu ngạo tất suy, người khiêm nhường tất thịnh.',
  },
  // Lôi Địa Dự (001000)
  '001000': {
    number: 16,
    name: 'Lôi Địa Dự',
    chineseName: '雷地豫',
    upperTrigram: 'Chấn',
    lowerTrigram: 'Khôn',
    nature: 'Cát',
    summary: 'Sấm vang trên mặt đất mùa xuân, vui vẻ phấn khởi, thuận lòng người',
    thuanTu: 'Dự: Lợi kiến hầu, hành sư. Hợp lòng người thì muôn việc hân hoan, thích hợp khởi sự mở mang.',
    tuongTruyen: 'Lôi xuất địa phấn, Dự; tiên vương dĩ tác nhạc sùng đức, ân tiến chi thượng đế (Sấm động trên đất, vua xưa tấu nhạc ca ngợi đức độ hướng về trời đất).',
    career: 'Môi trường làm việc ngập tràn năng lượng tích cực, dự án mới được toàn đội nhiệt tình hưởng ứng.',
    wealth: 'Tài chính khởi sắc, có tin vui về tiền thưởng hoặc nguồn thu mới.',
    love: 'Tình duyên thắm thiết, những buổi hẹn hò ngập tràn tiếng cười và kỷ niệm đẹp.',
    advice: 'Vui mừng nhưng chớ ham mê quá đà; giữ tinh thần tỉnh táo giữa lúc hân hoan nhất.',
  },
  // Phong Lôi Ích (110001)
  '110001': {
    number: 42,
    name: 'Phong Lôi Ích',
    chineseName: '风雷益',
    upperTrigram: 'Tốn',
    lowerTrigram: 'Chấn',
    nature: 'Đại Cát',
    summary: 'Gió sấm trợ lực, thêm ích tăng tài, tiến bước mạnh mẽ',
    thuanTu: 'Ích: Lợi hữu du vãng, lợi thiệp đại xuyên. Được tăng thêm lợi ích, tiến bước qua sông lớn đều tốt lành.',
    tuongTruyen: 'Phong lôi ích, quân tử dĩ kiến thiện tắc thiên, hữu quá tắc cải (Gió sấm trợ lực, người quân tử thấy điều thiện thì làm theo, thấy lỗi thì sửa ngay).',
    career: 'Cơ hội thăng tiến rộng mở, đổi mới sáng tạo đem lại hiệu quả vượt bậc.',
    wealth: 'Thu nhập tăng tiến rõ rệt, buôn may bán đắt, tài lộc dồi dào.',
    love: 'Cùng nhau tiến bộ, là điểm tựa tinh thần vững chắc cho nhau.',
    advice: 'Thấy người hiền thì noi gương, thấy khuyết điểm của bản thân thì lập tức sửa chữa.',
  },
  // Hỏa Thủy Vị Tế (101010)
  '101010': {
    number: 64,
    name: 'Hỏa Thủy Vị Tế',
    chineseName: '火水未济',
    upperTrigram: 'Ly',
    lowerTrigram: 'Khảm',
    nature: 'Bình Hòa',
    summary: 'Lửa trên nước dưới chưa xong việc, còn nhiều tiềm năng phía trước, tiếp tục nỗ lực',
    thuanTu: 'Vị Tế: Hanh, tiểu hồ ngật tế, nhu kỳ vĩ, vô du lợi. Công việc chưa hoàn tất nhưng chứa đựng vô vàn hy vọng, cần cẩn trọng từng bước cuối cùng.',
    tuongTruyen: 'Hỏa tại thủy thượng, Vị Tế; quân tử dĩ thận biện vật cư phương (Lửa trên nước, người quân tử cẩn trọng phân định mọi việc vào đúng vị trí).',
    career: 'Dự án sắp hoàn thành nhưng tuyệt đối không được chủ quan ở giai đoạn bàn giao.',
    wealth: 'Dòng tiền đang tái đầu tư, cần quản lý sát sao để thu hồi kết quả trọn vẹn.',
    love: 'Đang trong giai đoạn tìm hiểu sâu sắc, cần thêm thời gian để vun đắp cam kết lâu dài.',
    advice: 'Cuộc sống là một dòng chảy không ngừng; kết thúc một hành trình cũng là lúc mở ra một khởi đầu mới đầy hy vọng.',
  },
};

// Fallback tạo quẻ tổng quát cho các quẻ chưa nằm trong danh sách chi tiết
export function getHexagramByBinary(binary: string): HexagramDetail {
  if (HEXAGRAMS_MAP[binary]) {
    return HEXAGRAMS_MAP[binary];
  }

  // Tách 3 hào dưới (nội quái) và 3 hào trên (ngoại quái)
  const lowerBinary = binary.slice(0, 3);
  const upperBinary = binary.slice(3, 6);

  const lower = TRIGRAMS[lowerBinary] || { vi: 'Hòa', symbol: '☰' };
  const upper = TRIGRAMS[upperBinary] || { vi: 'Hòa', symbol: '☰' };

  return {
    number: 30,
    name: `${upper.vi} phối ${lower.vi}`,
    chineseName: `${upper.symbol}${lower.symbol}`,
    upperTrigram: upper.vi,
    lowerTrigram: lower.vi,
    nature: 'Bình Hòa',
    summary: `Quẻ kết hợp giữa thượng quái ${upper.vi} và hạ quái ${lower.vi}`,
    thuanTu: `Thoán từ: Thời vận giao thoa giữa ${upper.vi} và ${lower.vi}, muôn việc nên giữ lòng trung chính, thuận theo lẽ tự nhiên thì hanh thông.`,
    tuongTruyen: `Đại Tượng: Tượng trời đất biến chuyển, người quân tử lấy đó để tu tâm dưỡng tính, cẩn trọng trong từng hành động.`,
    career: `Sự nghiệp đang trong giai đoạn chuyển dịch, cần lắng nghe trực giác và kiên trì theo đuổi mục tiêu ban đầu.`,
    wealth: `Tài vận bình ổn, chi tiêu hợp lý sẽ duy trì được nguồn tài chính an toàn.`,
    love: `Tình cảm gia đình hài hòa, cần sự sẻ chia và lắng nghe giữa hai bên.`,
    advice: `Giữ tâm an định, dĩ bất biến ứng vạn biến, thuận theo dòng chảy của thời cuộc.`,
  };
}

export interface CoinTossResult {
  tossIndex: number; // 1 đến 6 (Hào 1 đến Hào 6)
  coins: [number, number, number]; // 2 (Sấp - Âm) hoặc 3 (Ngửa - Dương)
  sum: number; // 6 (Lão Âm), 7 (Thiếu Dương), 8 (Thiếu Âm), 9 (Lão Dương)
  lineType: 'Dương' | 'Âm';
  isMoving: boolean; // Hào động (6 hoặc 9)
  originalBit: '0' | '1';
  changedBit: '0' | '1';
}

export interface DivinationResult {
  tosses: CoinTossResult[];
  originalHexagram: HexagramDetail;
  changedHexagram: HexagramDetail;
  originalBinary: string;
  changedBinary: string;
  movingLines: number[]; // Vị trí các hào động (1..6)
  timestamp: string;
}

/**
 * Gieo quẻ 3 đồng xu mô phỏng
 * Mỗi lần gieo sinh ngẫu nhiên 3 đồng tiền (mỗi đồng 2: sấp, 3: ngửa)
 */
export function castIChingCoins(): DivinationResult {
  const tosses: CoinTossResult[] = [];
  let originalBinary = '';
  let changedBinary = '';
  const movingLines: number[] = [];

  for (let i = 1; i <= 6; i++) {
    // 3 đồng xu: ngẫu nhiên 2 (sấp) hoặc 3 (ngửa)
    const c1 = Math.random() > 0.5 ? 3 : 2;
    const c2 = Math.random() > 0.5 ? 3 : 2;
    const c3 = Math.random() > 0.5 ? 3 : 2;
    const sum = c1 + c2 + c3;

    let originalBit: '0' | '1' = '1';
    let changedBit: '0' | '1' = '1';
    let isMoving = false;
    let lineType: 'Dương' | 'Âm' = 'Dương';

    if (sum === 6) {
      // Lão Âm -> Động biến thành Dương
      originalBit = '0';
      changedBit = '1';
      isMoving = true;
      lineType = 'Âm';
      movingLines.push(i);
    } else if (sum === 7) {
      // Thiếu Dương -> Dương tĩnh
      originalBit = '1';
      changedBit = '1';
      lineType = 'Dương';
    } else if (sum === 8) {
      // Thiếu Âm -> Âm tĩnh
      originalBit = '0';
      changedBit = '0';
      lineType = 'Âm';
    } else if (sum === 9) {
      // Lão Dương -> Động biến thành Âm
      originalBit = '1';
      changedBit = '0';
      isMoving = true;
      lineType = 'Dương';
      movingLines.push(i);
    }

    originalBinary += originalBit;
    changedBinary += changedBit;

    tosses.push({
      tossIndex: i,
      coins: [c1, c2, c3],
      sum,
      lineType,
      isMoving,
      originalBit,
      changedBit,
    });
  }

  const originalHexagram = getHexagramByBinary(originalBinary);
  const changedHexagram = getHexagramByBinary(changedBinary);

  return {
    tosses,
    originalHexagram,
    changedHexagram,
    originalBinary,
    changedBinary,
    movingLines,
    timestamp: new Date().toLocaleString('vi-VN'),
  };
}
