/**
 * BÓI HỮU DUYÊN · MAI HOA DỊCH SỐ & LỤC HÀO CHIÊM ĐOÁN THEO GIỜ ĐỘNG TÂM
 * (梅花易数 / 六爻占断 · 心动起卦 · 断事决疑)
 * 
 * Tính toán can chi ngày giờ động tâm, Nguyệt Kiến, Nhật Thần, Tuần Không.
 * Hệ thống 64 Quẻ Kinh Dịch toàn diện: Thoán Từ, Tượng Ý, Hào Động và Quẻ Biến.
 * Phân tích ý định câu hỏi thông minh theo ngôn ngữ tự nhiên:
 * - Tự động nhận diện dạng câu hỏi: Có/Không (Quyết định), Thời điểm (Bao giờ), Diễn tiến (Thế nào), Lời khuyên (Làm sao).
 * - Kết hợp chính xác ngữ cảnh Dịch lý Quẻ Chủ + Hào Động + Quẻ Biến, trả lời trực diện 100% độc bản cho từng câu hỏi.
 */

import { Solar } from 'lunar-javascript';

// Bát Quái Tiên Thiên (Phục Hy) dùng tính số quẻ Mai Hoa
export const MAIHUA_TRIGRAMS: Record<number, { vi: string; zh: string; nature: string; element: string; organ: string }> = {
  1: { vi: 'Càn (Trời)', zh: '乾', nature: 'Cương kiện', element: 'Kim', organ: 'Đầu, Não, Xương' },
  2: { vi: 'Đoài (Đầm)', zh: '兑', nature: 'Hòa duyệt', element: 'Kim', organ: 'Phổi, Khí quản, Miệng, Răng' },
  3: { vi: 'Ly (Lửa)', zh: '离', nature: 'Quang minh', element: 'Hỏa', organ: 'Tim, Mạch máu, Mắt' },
  4: { vi: 'Chấn (Sấm)', zh: '震', nature: 'Chấn động', element: 'Mộc', organ: 'Gan, Mật, Thần kinh, Chân' },
  5: { vi: 'Tốn (Gió)', zh: '巽', nature: 'Thuận nhập', element: 'Mộc', organ: 'Mật, Đùi, Khí huyết' },
  6: { vi: 'Khảm (Nước)', zh: '坎', nature: 'Hiểm trở', element: 'Thủy', organ: 'Thận, Bàng quang, Tai, Máu huyết' },
  7: { vi: 'Cấn (Núi)', zh: '艮', nature: 'Chỉ định', element: 'Thổ', organ: 'Dạ dày, Lách, Tay, Mũi' },
  8: { vi: 'Khôn (Đất)', zh: '坤', nature: 'Nhu thuận', element: 'Thổ', organ: 'Bụng, Dạ dày, Tỳ vị, Da thịt' },
};

// 64 Trùng Quái
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

export interface HexagramKnowledge {
  nature: string;
  omen: 'đại_cát' | 'cát' | 'bình_hòa' | 'thận_trọng' | 'hung';
  coreMeaning: string;
  advice: string;
}

// BẢNG TRI THỨC TOÀN DIỆN 64 QUẺ KINH DỊCH
export const HEXAGRAM_KNOWLEDGE_64: Record<string, HexagramKnowledge> = {
  'Thuần Càn': { nature: 'Cương kiện hanh thông, đại quang minh', omen: 'đại_cát', coreMeaning: 'Vạn vật sinh sôi, khí thế mạnh mẽ, mưu sự đại thành.', advice: 'Hành động quyết đoán, tự cường bất tức, nhưng tránh tự cao tự đại.' },
  'Thiên Trạch Lý': { nature: 'Giữ lễ cẩn trọng, giẫm đuôi cọp nhưng bình an', omen: 'bình_hòa', coreMeaning: 'Đi trên đường hiểm nhưng nhờ giữ lễ nghĩa, cẩn thận nên tai qua nạn khỏi.', advice: 'Cư xử khéo léo, tôn trọng nguyên tắc và giữ thái độ hòa nhã.' },
  'Thiên Hỏa Đồng Nhân': { nature: 'Đồng lòng chung sức, đại đồng chí hướng', omen: 'đại_cát', coreMeaning: 'Hợp tác thuận hòa, mọi người cùng nhìn về một hướng, quý nhân ủng hộ.', advice: 'Mở rộng giao tiếp, làm việc nhóm, chia sẻ lợi ích công bằng.' },
  'Thiên Lôi Vô Vọng': { nature: 'Chân thật tự nhiên, không toan tính vụ lợi', omen: 'bình_hòa', coreMeaning: 'Làm việc thuận theo lẽ phải thì tốt, nếu tham lam mưu cầu sằng bậy ắt gặp họa.', advice: 'Giữ tâm trong sáng, không làm liều, tập trung làm đúng bổn phận.' },
  'Thiên Phong Cấu': { nature: 'Gặp gỡ bất ngờ, duyên tao ngộ kỳ thú', omen: 'bình_hòa', coreMeaning: 'Xuất hiện cơ hội hoặc nhân vật mới bất ngờ, cần xem xét kỹ trước khi tin cậy.', advice: 'Tỉnh táo trước lời đường mật, đề phòng cạm bẫy phía sau sự hào nhoáng.' },
  'Thiên Thủy Tụng': { nature: 'Bất hòa tranh chấp, kiện tụng đối đầu', omen: 'thận_trọng', coreMeaning: 'Ý kiến trái ngược, dễ nảy sinh cãi vã, kiện cáo bất lợi.', advice: 'Lùi một bước biển rộng trời cao, chủ động hòa giải, tránh đôi co.' },
  'Thiên Sơn Độn': { nature: 'Thoái lui ẩn dật, tạm thời tránh xa thị phi', omen: 'thận_trọng', coreMeaning: 'Thời thế chưa thuận, tiểu nhân lấn lướt, tiến lên sẽ chịu thiệt.', advice: 'Nên bảo toàn lực lượng, rút lui đúng lúc để chờ đợi thời cơ mới.' },
  'Thiên Địa Bĩ': { nature: 'Bế tắc ngăn cách, âm dương không giao thông', omen: 'thận_trọng', coreMeaning: 'Vận trình đang gặp trắc trở, mọi việc đình trệ hoặc thiếu sự thấu hiểu.', advice: 'Kiên nhẫn nhẫn nại, không nản lòng, tích lũy nội lực chờ ngày hanh thông.' },

  'Trạch Thiên Quải': { nature: 'Quyết đoán dứt khoát, loại trừ điều tiêu cực', omen: 'cát', coreMeaning: 'Thời điểm cần dũng cảm vạch rõ ranh giới, dứt bỏ kẻ xấu hoặc thói quen cũ.', advice: 'Quyết đoán hành động nhưng cần công minh, tránh hành xử cực đoan.' },
  'Thuần Đoài': { nature: 'Vui vẻ hòa nhã, niềm vui sẻ chia chân thành', omen: 'đại_cát', coreMeaning: 'Không khí tươi vui, giao tiếp thuận lợi, gặp được bạn tri âm đồng điệu.', advice: 'Giữ nụ cười trên môi, đối đãi chân tình, cùng nhau tháo gỡ vướng mắc.' },
  'Trạch Hỏa Cách': { nature: 'Canh tân đổi mới, lột xác triệt để, bước sang trang mới', omen: 'đại_cát', coreMeaning: 'Phá bỏ lối mòn cũ kỹ, cải cách toàn diện, thay đổi để tiến hóa vượt bậc.', advice: 'Mạnh dạn đổi mới tư duy, đón nhận bước ngoặt và không ngại thử thách mới.' },
  'Trạch Lôi Tùy': { nature: 'Tùy duyên thuận thời, uyển chuyển thích ứng', omen: 'cát', coreMeaning: 'Biết nương theo hoàn cảnh, đi theo người có tài đức thì mọi sự suôn sẻ.', advice: 'Linh hoạt ứng biến, không bảo thủ cứng nhắc, thuận theo dòng chảy.' },
  'Trạch Phong Đại Quá': { nature: 'Quá tải áp lực, gánh nặng vượt mức bình thường', omen: 'thận_trọng', coreMeaning: 'Cột kèo cong oằn, trách nhiệm quá nặng nề cần có giải pháp san sẻ.', advice: 'Biết lượng sức mình, giảm bớt kỳ vọng, tìm người hỗ trợ gánh vác.' },
  'Trạch Thủy Khốn': { nature: 'Khốn khó thử thách, cây khô giữa đầm cạn', omen: 'thận_trọng', coreMeaning: 'Giai đoạn khó khăn tài chính hoặc tinh thần, thử thách ý chí và bản lĩnh.', advice: 'Giữ vững niềm tin, không than vãn, kiên cường vượt qua nghịch cảnh.' },
  'Trạch Sơn Hàm': { nature: 'Cảm ứng giao hòa, tình cảm chân thành gắn kết', omen: 'đại_cát', coreMeaning: 'Tâm ý tương thông, nhân duyên tốt lành, đôi bên thấu hiểu và rung động.', advice: 'Mở lòng bày tỏ cảm xúc, lắng nghe tiếng gọi của trái tim.' },
  'Trạch Địa Tụy': { nature: 'Tụ họp đông đảo, tinh hoa hội tụ', omen: 'cát', coreMeaning: 'Người và tài vật tụ họp về một nơi, cơ hội phát triển hội nhóm, kinh doanh.', advice: 'Xây dựng mối quan hệ đoàn kết, quản lý nguồn lực chặt chẽ.' },

  'Hỏa Thiên Đại Hữu': { nature: 'Sở hữu dồi dào, phúc lộc ngập tràn', omen: 'đại_cát', coreMeaning: 'Mặt trời trên trời cao tỏa sáng muôn nơi, tài lộc dồi dào, vạn sự thành tựu.', advice: 'Biết chia sẻ thành quả, làm việc thiện tích đức, giữ tâm khiêm cung.' },
  'Hỏa Trạch Khuê': { nature: 'Bất đồng chia rẽ, mắt nhìn hai hướng khác nhau', omen: 'thận_trọng', coreMeaning: 'Dễ xảy ra hiểu lầm, khác biệt quan điểm giữa đối tác hoặc người thân.', advice: 'Tìm điểm chung trong sự khác biệt, tôn trọng cá tính riêng của đối phương.' },
  'Thuần Ly': { nature: 'Ánh sáng bừng nở, trí tuệ soi chiếu minh bạch', omen: 'cát', coreMeaning: 'Lửa sáng soi tỏ mọi điều khuất tất, công danh học hành thi cử rạng rỡ.', advice: 'Nương tựa vào điều chính đạo, giữ tâm nhiệt huyết nhưng không nóng vội.' },
  'Hỏa Lôi Phệ Hạp': { nature: 'Cắn đứt rào cản, hành động quyết liệt công minh', omen: 'cát', coreMeaning: 'Cần dùng biện pháp dứt khoát để xử lý dứt điểm khúc mắc hoặc người cản đường.', advice: 'Thẳng thắn giải quyết vấn đề, không chần chừ do dự, dựa vào lý lẽ công bằng.' },
  'Hỏa Phong Đỉnh': { nature: 'Ổn định cơ nghiệp, đúc luyện thành tài', omen: 'đại_cát', coreMeaning: 'Chiếc đỉnh đồng vững chãi, thành công được tôi luyện qua thử thách.', advice: 'Xây dựng nền tảng vững chắc, bồi dưỡng nhân tài, duy trì phong độ.' },
  'Hỏa Thủy Vị Tế': { nature: 'Việc chưa hoàn tất, hành trình mới lại bắt đầu', omen: 'bình_hòa', coreMeaning: 'Chưa phải là hồi kết mà là khúc dạo đầu cho chu kỳ mới, đầy ắp cơ hội.', advice: 'Chuẩn bị kỹ càng cho chặng đường tiếp theo, cẩn trọng trong từng bước đi.' },
  'Hỏa Sơn Lữ': { nature: 'Lữ khách tha hương, bôn ba tìm kiếm phương trời mới', omen: 'bình_hòa', coreMeaning: 'Chuyến đi xa, thay đổi chỗ ở hoặc làm việc nơi xa xứ, cần sự thích nghi.', advice: 'Cẩn trọng tư trang giấy tờ, khiêm tốn khi đến môi trường mới.' },
  'Hỏa Địa Tấn': { nature: 'Tiến lên quang minh, được quý nhân đề bạt thăng tiến', omen: 'đại_cát', coreMeaning: 'Mặt trời nhô lên khỏi mặt đất, sự nghiệp và danh vọng bước vào đà thăng hoa.', advice: 'Nắm bắt thời cơ thể hiện năng lực, đón nhận trọng trách mới với tinh thần cống hiến.' },

  'Lôi Thiên Đại Tráng': { nature: 'Khí thế dũng mãnh, sức mạnh áp đảo', omen: 'cát', coreMeaning: 'Năng lượng mạnh mẽ, tự tin hành động, nhưng tránh cậy sức làm càn.', advice: 'Biết tiết chế sức mạnh, hành sự có chừng mực để không làm tổn hại người khác.' },
  'Lôi Trạch Quy Muội': { nature: 'Hấp tấp sai lầm, khởi đầu trật tự lộn xộn', omen: 'thận_trọng', coreMeaning: 'Làm việc nôn nóng, đốt cháy giai đoạn dẫn đến kết quả không như ý.', advice: 'Bình tĩnh xem xét lại quy trình, đặt đúng người vào đúng việc.' },
  'Lôi Hỏa Phong': { nature: 'Thịnh đại dồi dào, ánh sáng sấm chớp rực rỡ đến đỉnh điểm', omen: 'cát', coreMeaning: 'Thời kỳ cực thịnh, cơ hội lớn đang mở ra nhưng đi kèm áp lực và chuyển động mạnh.', advice: 'Tận dụng thời cơ vàng, nhưng chủ động chuẩn bị cho những thay đổi sắp tới.' },
  'Thuần Chấn': { nature: 'Sấm động kinh tâm, giật mình thức tỉnh', omen: 'cát', coreMeaning: 'Có biến cố bất ngờ gây chấn động tâm lý nhưng là điềm báo thức tỉnh vận hội mới.', advice: 'Giữ tâm định tĩnh, cười nói ung dung trước biến cố, biến nguy thành cơ.' },
  'Lôi Phong Hằng': { nature: 'Bền bỉ lâu dài, thủy chung son sắt', omen: 'đại_cát', coreMeaning: 'Sự kiên trì mang lại kết quả bền vững, tình cảm và sự nghiệp ổn định dài lâu.', advice: 'Giữ vững lập trường, không đứng núi này trông núi nọ, kiên định với mục tiêu.' },
  'Lôi Thủy Giải': { nature: 'Hóa giải ách tắc, mưa giông xua tan u ám', omen: 'đại_cát', coreMeaning: 'Khúc mắc được tháo gỡ, ân xá bỏ qua lỗi lầm cũ, không khí nhẹ nhõm trở lại.', advice: 'Chủ động tha thứ, buông bỏ muộn phiền quá khứ để đón nhận bình an.' },
  'Lôi Sơn Tiểu Quá': { nature: 'Vượt qua một chút, việc nhỏ thành việc lớn nên đợi', omen: 'bình_hòa', coreMeaning: 'Những việc nhỏ nhặt làm rất tốt, nhưng việc trọng đại cần thêm thời gian chuẩn bị.', advice: 'Tập trung hoàn thành tốt chi tiết nhỏ, không nên ôm đồm việc vượt tầm tay.' },
  'Lôi Địa Dự': { nature: 'Vui vẻ hân hoan, chuẩn bị đón niềm vui bất ngờ', omen: 'đại_cát', coreMeaning: 'Không khí phấn khởi, dự liệu trước mọi việc nên khi cơ hội đến đón nhận trọn vẹn.', advice: 'Hòa mình vào niềm vui chung nhưng không quên giữ kỷ luật và kế hoạch.' },

  'Phong Thiên Tiểu Súc': { nature: 'Tích lũy nhỏ, mây kéo đến nhưng chưa mưa', omen: 'bình_hòa', coreMeaning: 'Năng lực đang được tích lũy từng ngày, kiên nhẫn chờ thời điểm bùng nổ.', advice: 'Tập trung bồi đắp kiến thức và nguồn lực, không nên vội vã đòi hỏi kết quả ngay.' },
  'Phong Trạch Trung Phu': { nature: 'Tín nghĩa từ đáy lòng, niềm tin chân thành cảm động lòng người', omen: 'đại_cát', coreMeaning: 'Sự chân thành là chìa khóa vạn năng mở lối thành công, đối tác tin cậy.', advice: 'Nói lời giữ lấy lời, dùng sự thành tín để chinh phục đối phương.' },
  'Phong Hỏa Gia Nhân': { nature: 'Gia đạo êm ấm, trong ấm ngoài êm', omen: 'đại_cát', coreMeaning: 'Gia đình thuận hòa, các thành viên yêu thương ủng hộ lẫn nhau, hậu phương vững chắc.', advice: 'Chăm lo cho tổ ấm, quan tâm đến người thân, ổn định nội bộ trước khi ra ngoài.' },
  'Phong Lôi Ích': { nature: 'Gia tăng lợi ích, thời cơ mở rộng phát triển mạnh mẽ', omen: 'đại_cát', coreMeaning: 'Gió sấm tương trợ tạo nên sức bật lớn, tài lộc sinh sôi, danh vọng tiến bước.', advice: 'Mạnh dạn mở rộng quy mô, tận dụng gió lành để căng buồm ra khơi.' },
  'Thuần Tốn': { nature: 'Gió thuận theo chiều, mềm mỏng khéo léo', omen: 'cát', coreMeaning: 'Lựa gió xoay buồm, dùng sự nhu hòa mềm mỏng để hóa giải xung đột gai góc.', advice: 'Hạ cái tôi xuống, khéo léo lắng nghe và thích nghi với hoàn cảnh.' },
  'Phong Thủy Hoán': { nature: 'Ly tán giải tỏa, băng tan thành nước', omen: 'cát', coreMeaning: 'Băng giá nghi kỵ tan biến, dòng chảy cảm xúc được khơi thông, hóa giải mâu thuẫn.', advice: 'Mở lòng sẻ chia, không giữ định kiến trong lòng, tạo bầu không khí cởi mở.' },
  'Phong Sơn Tiệm': { nature: 'Tiến bước tuần tự, chim nhạn bay về cồn cát', omen: 'đại_cát', coreMeaning: 'Từng bước vững chắc, chậm mà chắc, không sốt ruột, tương lai xán lạn.', advice: 'Kiên trì theo đúng lộ trình, làm tốt từng giai đoạn, thành công sẽ tự đến.' },
  'Phong Địa Quan': { nature: 'Quan sát chiêm nghiệm, tầm nhìn bao quát sâu rộng', omen: 'bình_hòa', coreMeaning: 'Đứng trên cao nhìn thấu tỏ thế sự, cần quan sát kỹ lưỡng trước khi đưa ra quyết định.', advice: 'Lắng đọng tâm trí, học hỏi kinh nghiệm từ người đi trước.' },

  'Thủy Thiên Nhu': { nature: 'Kiên nhẫn chờ thời, dưỡng tâm tích lũy thực lực', omen: 'cát', coreMeaning: 'Thời cơ đang chín muồi dần, không nóng vội sốt ruột, ăn uống nghỉ ngơi tĩnh tâm.', advice: 'Tập trung chuẩn bị nội lực, đúng thời điểm vàng hành động sẽ tất thắng.' },
  'Thủy Trạch Tiết': { nature: 'Tiết chế chừng mực, biết dừng đúng giới hạn', omen: 'bình_hòa', coreMeaning: 'Biết đủ là đủ, giữ gìn khuôn khổ nguyên tắc để tránh hao tổn sinh lực và tiền tài.', advice: 'Chi tiêu có kế hoạch, sinh hoạt điều độ, không để cảm xúc vượt tầm kiểm soát.' },
  'Thủy Hỏa Ký Tế': { nature: 'Việc đã hoàn thành, âm dương cân bằng hoàn hảo', omen: 'cát', coreMeaning: 'Công việc đạt được thành tựu như ý nguyện, mọi sự đã vào quỹ đạo ổn định.', advice: 'Cẩn trọng giữ gìn thành quả, phòng ngừa sơ hở phát sinh sau khi đạt mục tiêu.' },
  'Thủy Lôi Truân': { nature: 'Gian nan khởi đầu, chông gai bỡ ngỡ', omen: 'thận_trọng', coreMeaning: 'Vạn sự khởi đầu nan, mầm non đội đất vươn lên gặp nhiều trở ngại.', advice: 'Tìm kiếm sự chỉ dẫn từ người có kinh nghiệm, kiên trì không bỏ cuộc giữa chừng.' },
  'Thủy Phong Tỉnh': { nature: 'Giếng nước ngọt ngào, nguồn dinh dưỡng vô tận', omen: 'cát', coreMeaning: 'Nguồn sữa mát lành nuôi dưỡng thân tâm, tài năng và phẩm hạnh không bao giờ vơi cạn.', advice: 'Không ngừng tu dưỡng bản thân, chia sẻ kiến thức và giúp đỡ cộng đồng.' },
  'Thuần Khảm': { nature: 'Hiểm trở trùng điệp, hố sâu thử thách lòng can đảm', omen: 'thận_trọng', coreMeaning: 'Đối mặt với giai đoạn khó khăn liên tiếp, cần sự vững vàng tinh thần.', advice: 'Giữ tâm trong sáng như dòng nước, không hoảng loạn, kiên nhẫn tìm lối thoát.' },
  'Thủy Sơn Kiển': { nature: 'Khó khăn cản trở, núi cao vực thẳm trước mặt', omen: 'thận_trọng', coreMeaning: 'Đường đi bị tắc nghẽn, cố chấp tiến lên sẽ gặp nguy hiểm.', advice: 'Nên dừng lại nghỉ ngơi, quay về tu dưỡng hoặc tìm hướng đi khác thông thoáng hơn.' },
  'Thủy Địa Tỷ': { nature: 'Thân thiện gắn kết, tìm được tri âm cùng chí hướng', omen: 'đại_cát', coreMeaning: 'Nước thấm vào đất tạo nên sự sống, đối tác tin cậy, bạn bè giúp đỡ chí tình.', advice: 'Chủ động kết bạn, tìm kiếm người đồng hành trung thực để cùng nhau phát triển.' },

  'Sơn Thiên Đại Súc': { nature: 'Tích lũy tài đức lớn, chứa đựng tiềm năng khổng lồ', omen: 'đại_cát', coreMeaning: 'Bản lĩnh và tài lực đã chín muồi, sẵn sàng đảm đương những trọng trách vĩ đại.', advice: 'Tự tin nắm bắt cơ hội lớn, dấn thân vào những thử thách xứng tầm bản thân.' },
  'Sơn Trạch Tổn': { nature: 'Bớt giận nén lòng, chịu thiệt trước mắt để lợi lâu dài', omen: 'bình_hòa', coreMeaning: 'Hy sinh cái nhỏ để giữ cái lớn, bớt cái tôi vị kỷ để thu phục lòng người.', advice: 'Học cách nhường nhịn, quản lý cảm xúc, xem xét lợi ích tổng thể.' },
  'Sơn Hỏa Bí': { nature: 'Văn vẻ rực rỡ, vẻ đẹp trang nhã thanh tao', omen: 'cát', coreMeaning: 'Hình thức đẹp đẽ, giao tiếp tao nhã, các mối quan hệ xã giao tốt đẹp.', advice: 'Đẹp hình thức nhưng phải đi đôi với thực chất bên trong, tránh hư danh phù phiếm.' },
  'Sơn Lôi Di': { nature: 'Nuôi dưỡng thân tâm, cẩn trọng lời ăn tiếng nói', omen: 'bình_hòa', coreMeaning: 'Họa từ miệng mà ra, bệnh từ miệng mà vào, chú ý chăm sóc sức khỏe và phát ngôn.', advice: 'Uống thuốc đúng liều, ăn uống lành mạnh, nói lời ái ngữ xây dựng.' },
  'Sơn Phong Cổ': { nature: 'Chấn chỉnh mục ruỗng, sửa chữa sai lầm từ gốc rễ', omen: 'thận_trọng', coreMeaning: 'Tồn đọng những vấn đề cũ kỹ cần dũng cảm phẫu thuật, cải tổ lại từ đầu.', advice: 'Không che giấu khuyết điểm, thẳng thắn sửa chữa sai lầm của bản thân hoặc tập thể.' },
  'Sơn Thủy Mông': { nature: 'Khai mở mông muội, học hỏi kiến thức mới', omen: 'bình_hòa', coreMeaning: 'Giai đoạn còn non nớt cần khiêm tốn tìm thầy học đạo, mở rộng tầm hiểu biết.', advice: 'Hạ cái tôi xuống, chăm chỉ học hỏi, không nên tự mãn khi kiến thức còn hạn hẹp.' },
  'Thuần Cấn': { nature: 'Núi đứng sừng sững, dừng lại đúng lúc, an định tâm trí', omen: 'bình_hòa', coreMeaning: 'Biết dừng lại khi cần thiết, giữ tâm tĩnh lặng như ngọn núi trước phong ba bão táp.', advice: 'Không hành động bốc đồng, ngồi thiền tịnh tâm, suy nghĩ thấu đáo.' },
  'Sơn Địa Bác': { nature: 'Bào mòn thoái hóa, thời vận suy vi', omen: 'thận_trọng', coreMeaning: 'Nền móng đang bị xói mòn, không nên mạo hiểm đầu tư hay mở rộng lúc này.', advice: 'Phòng thủ chặt chẽ, cắt giảm chi phí, chờ qua cơn bĩ cực.' },

  'Địa Thiên Thái': { nature: 'Thái bình thịnh vượng, âm dương hòa hợp đỉnh cao', omen: 'đại_cát', coreMeaning: 'Trời đất giao hòa, vạn sự hanh thông rực rỡ, quý nhân phù trợ, cầu gì được nấy.', advice: 'Tận dụng thời kỳ hoàng kim để hoàn thành ước mơ, đối xử hào sảng rộng lượng.' },
  'Địa Trạch Lâm': { nature: 'Tiếp cận gần gũi, thế vận đang trên đà đi lên', omen: 'đại_cát', coreMeaning: 'Cơ hội tốt đẹp đang tiến đến rất gần, tiếng nói có uy quyền và sức ảnh hưởng.', advice: 'Chủ động đón nhận cơ hội, hành động dứt khoát không để tuột mất thời cơ.' },
  'Địa Hỏa Minh Di': { nature: 'Ánh sáng bị chôn vùi, thời kỳ gian nan cần giấu tài', omen: 'thận_trọng', coreMeaning: 'Tài năng chưa được công nhận, gặp môi trường đố kỵ hoặc áp lực nặng nề.', advice: 'Ẩn nhẫn chờ thời, giấu tài năng, không đối đầu trực diện với kẻ tiểu nhân.' },
  'Địa Lôi Phục': { nature: 'Phục hưng tái sinh, mầm sống mới quay trở lại', omen: 'đại_cát', coreMeaning: 'Mùa xuân quay lại sau chuỗi ngày ảm đạm, vận khí bắt đầu ấm dần lên.', advice: 'Khởi đầu kế hoạch mới với tâm thế tự tin, từng bước lấy lại phong độ.' },
  'Địa Phong Thăng': { nature: 'Thăng tiến từng bước, cây non vươn lên thành đại thụ', omen: 'đại_cát', coreMeaning: 'Sự nghiệp và vận thế đi lên vững chắc theo từng ngày, được tín nhiệm cất nhắc.', advice: 'Làm việc chăm chỉ, tích lũy uy tín, đường thăng tiến đang rộng mở.' },
  'Địa Thủy Sư': { nature: 'Kỷ luật quân đội, đoàn kết để chiến thắng', omen: 'cát', coreMeaning: 'Đối mặt với nhiệm vụ thử thách lớn đòi hỏi sự đoàn kết, tính kỷ luật thép và công minh.', advice: 'Giữ kỷ luật nghiêm cẩn, lắng nghe chỉ huy, không hành động tùy tiện.' },
  'Địa Sơn Khiêm': { nature: 'Khiêm nhường đức độ, quẻ tối cát trong Kinh Dịch', omen: 'đại_cát', coreMeaning: 'Núi cao chịu ẩn mình dưới lòng đất, người có tài đức càng nhún nhường càng đắc đại lợi.', advice: 'Luôn giữ thái độ khiêm tốn, biết lắng nghe, tôn trọng người khác thì vạn sự hanh thông.' },
  'Thuần Khôn': { nature: 'Nhu thuận bao dung, đất mẹ chở che muôn loài', omen: 'đại_cát', coreMeaning: 'Đức dày nâng đỡ vạn vật, thuận theo lẽ tự nhiên, thành công nhờ sự bền bỉ âm thầm.', advice: 'Dùng đức độ để cảm hóa lòng người, không tranh giành ngôi vị, kiên nhẫn bồi đắp.' },
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
    subject: string;
    targetName: string;
    state: string;
    explanation: string;
  };
  directConclusion: string;
  dichLyDetails: string;
  diseaseAnalysis?: {
    involvedOrgan: string;
    involvedElement: string;
    details: string;
  };
  thayPhan: string;
  ungKy: string;
}

/**
 * Tính toán Tuần Không (Xun Kong) dựa vào Can Chi ngày
 */
export function calculateXunKong(ganZhiDay: string): string {
  const STEMS_LIST = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
  const BRANCHES_LIST = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  const parts = ganZhiDay.split(' ');
  const stem = parts[0];
  const branch = parts[1];

  const stemIdx = STEMS_LIST.indexOf(stem);
  const branchIdx = BRANCHES_LIST.indexOf(branch);

  if (stemIdx === -1 || branchIdx === -1) return 'Thìn Tị';

  const xunStartBranchIdx = (branchIdx - stemIdx + 12) % 12;
  const kong1Idx = (xunStartBranchIdx + 10) % 12;
  const kong2Idx = (xunStartBranchIdx + 11) % 12;

  return `${BRANCHES_LIST[kong1Idx]} ${BRANCHES_LIST[kong2Idx]}`;
}

/**
 * Hàm phân tích động thái câu hỏi tổng quát theo dạng câu hỏi (Có/Không, Khi nào, Thế nào, Nên làm gì)
 * Luận giải khách quan, nói đúng sự thật, có tốt có xấu, phân định rạch ròi điềm Cát / Hung / Thận trọng.
 */
function synthesizeGeneralVerdict(
  q: string,
  origName: string,
  origInfo: HexagramKnowledge,
  changedName: string,
  changedInfo: HexagramKnowledge,
  movingLine: number,
  ungKy: string
): { directConclusion: string; dichLyDetails: string } {
  const isQuantity = /(nhiều không|ít không|đông không|vắng không|bao nhiêu|được mấy)/i.test(q);
  const isYesNo = /(có nên|liệu có|có được|thành công không|được không|có sao không|tốt không|được hay không|ổn không|được chăng|có thể|thành không|nhiều không|ít không|đúng không|có\s+.*không|liệu\s+.*không|\bkhông\s*\??$)/i.test(q.trim());
  const isTiming = /(bao giờ|khi nào|bao lâu|mấy giờ|năm nay|tháng mấy|sắp tới|gần đây|thời điểm nào|chừng nào)/i.test(q);
  const isActionAdvice = /(nên làm gì|phải làm sao|làm sao|cách nào|hướng giải quyết|hành động ra sao|xử lý thế nào)/i.test(q);

  const isHung = changedInfo.omen === 'hung';
  const isCaution = changedInfo.omen === 'thận_trọng';
  const isBalance = changedInfo.omen === 'bình_hòa';
  const isAuspicious = changedInfo.omen === 'đại_cát' || changedInfo.omen === 'cát';

  if (isQuantity) {
    if (isHung) {
      return {
        directConclusion: `Về thắc mắc "${q.trim()}": TRẢ LỜI LÀ RẤT ÍT HOẶC HOÀN TOÀN KHÔNG CÓ; TÌNH HÌNH BẾ TẮC HOẶC ĐỐI TƯỢNG ĐANG CỐ TÌNH LẨN TRÁNH.`,
        dichLyDetails: `Quẻ biến ${changedName} (${changedInfo.nature}) lâm Điềm Hung. Dòng khí bị tắc nghẽn nghiêm trọng, lượng tương tác tụt dốc, đề phòng sự việc bị đóng băng hoàn toàn.`
      };
    }
    if (isCaution) {
      return {
        directConclusion: `Về thắc mắc "${q.trim()}": TRẢ LỜI LÀ CHƯA NHIỀU, ĐẾN RẢI RÁC VÀ KHÔNG ĐỀU; HIỆU SUẤT ĐANG Ở MỨC THẤP.`,
        dichLyDetails: `Quẻ biến ${changedName} (${changedInfo.nature}) mang tính trì trệ. Cần xem lại phương pháp tiếp cận vì kết quả hiện tại chưa đạt kỳ vọng.`
      };
    }
    if (isAuspicious) {
      return {
        directConclusion: `Về thắc mắc "${q.trim()}": TRẢ LỜI LÀ CÓ VÀ KHÁ NHIỀU. Tượng quẻ biến ${changedName} (${changedInfo.nature}) mang lại sinh khí tốt đẹp, số lượng tương tác dồi dào; nhưng cần chuẩn bị năng lực đón tiếp để tránh quá tải.`,
        dichLyDetails: `Quẻ gốc ${origName} động hào ${movingLine} chuyển hóa sang ${changedName} (${changedInfo.nature}). Năng lượng quẻ biến vượng tướng báo hiệu số lượng và quy mô sự việc sẽ khởi sắc rõ nét.`
      };
    }
    return {
      directConclusion: `Về thắc mắc "${q.trim()}": TRẢ LỜI LÀ Ở MỨC TRUNG BÌNH, VỪA PHẢI; KHÔNG QUÁ ĐÔNG CŨNG KHÔNG QUÁ Ế ẨM.`,
      dichLyDetails: `Quẻ biến ${changedName} (${changedInfo.nature}) giữ thế bình hòa. Sự việc diễn ra bình thường, cần chủ động xúc tiến thêm.`
    };
  }

  if (isYesNo) {
    if (changedName === 'Trạch Hỏa Cách') {
      return {
        directConclusion: `Về câu hỏi "${q.trim()}": TRẢ LỜI LÀ NÊN VÀ RẤT KHẢ QUAN, NHƯNG BẮT BUỘC PHẢI ĐỔI MỚI PHƯƠNG THỨC TIẾP CẬN, KHÔNG NÊN ĐI THEO LỐI MÒN CŨ. NẾU BẢO THỦ GIỮ CÁCH CŨ ẮT SẼ THẤT BẠI.`,
        dichLyDetails: `Quẻ biến Trạch Hỏa Cách (Canh tân đổi mới) ủng hộ sự thay đổi táo bạo. Nếu dũng cảm bứt phá và rũ bỏ cách làm cũ thì ắt thành công; nếu sợ hãi do dự sẽ chuốc lấy bế tắc.`
      };
    }
    if (isHung) {
      return {
        directConclusion: `Về câu hỏi "${q.trim()}": TRẢ LỜI DỨT KHOÁT LÀ KHÔNG / RẤT XẤU VÀ NGUY HIỂM. Tượng quẻ lâm Điềm Hung, mưu sự dễ gặp thất bại ê chề, hao tài tốn của hoặc vướng thị phi đố kỵ. Tuyệt đối KHÔNG NÊN tiến hành lúc này.`,
        dichLyDetails: `Quẻ ${origName} động hào ${movingLine} biến ${changedName} (${changedInfo.nature}). Điềm quẻ cảnh báo sự gãy đổ hoặc bị tiểu nhân phản trắc. Lời khuyên của Dịch: Dừng lại ngay lập tức để bảo toàn lực lượng.`
      };
    }
    if (isCaution) {
      return {
        directConclusion: `Về câu hỏi "${q.trim()}": TRẢ LỜI LÀ CHƯA NÊN / KHÔNG THUẬN LỢI. Đang bị kìm hãm, nội bộ bất hòa hoặc thời cơ chưa chín muồi. Cố chấp tiến lên sẽ chịu thiệt thòi lớn.`,
        dichLyDetails: `Quẻ biến ${changedName} (${changedInfo.nature}) khuyên đương số: ${changedInfo.advice}. Cần quan sát thêm, không được hành động theo cảm tính.`
      };
    }
    if (isBalance) {
      return {
        directConclusion: `Về câu hỏi "${q.trim()}": TRẢ LỜI LÀ CÁT HUNG TƯƠNG BÁN (50/50). Có cơ hội nhưng rủi ro đi kèm cũng ngang ngửa. Được cái này ắt phải mất cái kia; chỉ nên làm thăm dò, không được dốc hết vốn liếng.`,
        dichLyDetails: `Quẻ biến ${changedName} (${changedInfo.nature}) báo hiệu cục diện giằng co. Phải tự lượng sức mình và chuẩn bị sẵn phương án dự phòng.`
      };
    }
    if (isAuspicious) {
      return {
        directConclusion: `Về câu hỏi "${q.trim()}": TRẢ LỜI LÀ CÓ / THUẬN LỢI. Thời vận đang chuyển biến tích cực, sự việc có cơ hội thành công; TUY NHIÊN CẦN ĐỀ PHÒNG TIỂU NHÂN GANH GHÉT VÀ TRÁNH TỰ CAO TỰ ĐẠI KẺO "TRÈO CAO NGÃ ĐAU".`,
        dichLyDetails: `Quẻ biến ${changedName} (${changedInfo.nature}) mang lại sinh khí tốt đẹp, nhưng luật Âm Dương nhắc nhở khi đắc thế phải biết khiêm nhường để giữ phúc lâu dài.`
      };
    }
    return {
      directConclusion: `Về câu hỏi "${q.trim()}": TRẢ LỜI LÀ CẦN TÍNH TOÁN KỸ LƯỠNG, CHƯA THỂ KHẲNG ĐỊNH NGAY VÌ PHỤ THUỘC VÀO SỰ TỈNH TÁO CỦA BẠN.`,
      dichLyDetails: `Quẻ biến ${changedName} (${changedInfo.nature}) khuyên đương số: ${changedInfo.advice}`
    };
  }

  if (isTiming) {
    if (isHung) {
      return {
        directConclusion: `Về mốc thời gian "${q.trim()}": GIAI ĐOẠN HIỆN TẠI VÀ SẮP TỚI ĐANG LÀ THỜI ĐIỂM BẤT LỢI NHẤT; TRÁNH KHỞI SỰ HOẶC ĐƯA RA QUYẾT ĐỊNH QUAN TRỌNG TRONG VÒNG 1 THÁNG TỚI.`,
        dichLyDetails: `Quẻ ${origName} biến ${changedName} (${changedInfo.nature}) cảnh báo thời vận chưa tới, nóng vội ắt chuốc lấy tai họa.`
      };
    }
    return {
      directConclusion: `Về mốc thời gian "${q.trim()}": THỜI CƠ ĐANG DẦN CHUYỂN BIẾN, DỰ BÁO BƯỚC NGOẶT RÕ RÀNG NHẤT VÀO: ${ungKy.toUpperCase()}.`,
      dichLyDetails: `Quẻ gốc ${origName} (${origInfo.nature}) qua hào động ${movingLine} chuyển hóa sang ${changedName} (${changedInfo.nature}). Cần kiên nhẫn tích lũy nội lực đón thời điểm này.`
    };
  }

  if (isActionAdvice) {
    if (isHung) {
      return {
        directConclusion: `Về hướng giải quyết cho "${q.trim()}": DỪNG NGAY HÀNH ĐỘNG LIỀU LĨNH, RÚT LUI BẢO TOÀN LỰC LƯỢNG: ${changedInfo.advice.toUpperCase()}.`,
        dichLyDetails: `Quẻ biến ${changedName} lâm hung tượng. Lúc này tiến là nguy, thoái là an. Phải giữ tâm bình tĩnh, không manh động đôi co.`
      };
    }
    return {
      directConclusion: `Về hướng giải quyết cho "${q.trim()}": BẠN NÊN DỰA TRÊN NGUYÊN TẮC: ${changedInfo.advice.toUpperCase()}.`,
      dichLyDetails: `Quẻ biến ${changedName} khuyên bạn giữ vững đạo trung chính, phát huy ${origInfo.nature} của quẻ gốc để tháo gỡ vấn đề.`
    };
  }

  // Câu hỏi thế nào / ra sao / diễn tiến
  if (changedName === 'Trạch Hỏa Cách') {
    return {
      directConclusion: `Về vấn đề "${q.trim()}": THỜI VẬN ĐANG ĐÒI HỎI MỘT SỰ CANH TÂN, ĐỔI MỚI HOẶC LỘT XÁC MẠNH MẼ ĐỂ THOÁT KHỎI BẾ TẮC. NẾU DO DỰ KHÔNG DÁM THAY ĐỔI THÌ TÌNH HÌNH SẼ CÀNG XẤU ĐI.`,
      dichLyDetails: `Quẻ gốc ${origName} (${origInfo.nature}) động hào ${movingLine} biến sang Trạch Hỏa Cách (${changedInfo.nature}). Điềm quẻ khẳng định sự việc của bạn sắp có bước ngoặt lớn; cần mạnh dạn thay đổi phương thức tiếp cận, dứt bỏ thói quen cũ.`
    };
  }

  if (isHung) {
    return {
      directConclusion: `Về tình hình "${q.trim()}": THỜI VẬN ĐANG VÀO ĐIỀM HUNG HIỂM BẾ TẮC. Nguy cơ bị tiểu nhân lừa gạt, gãy gánh giữa đường hoặc hao tổn nặng nề. Phải dừng ngay mọi hành động liều lĩnh để phòng ngừa rủi ro lớn.`,
      dichLyDetails: `Quẻ gốc ${origName} biến ${changedName} (${changedInfo.nature}). Tượng quẻ hiểm trở, khuyên đương số: ${changedInfo.advice}`
    };
  }

  if (isCaution) {
    return {
      directConclusion: `Về tình hình "${q.trim()}": ĐANG GẶP TRẮC TRỞ VÀ ÁP LỰC ĐÈ NẶNG. Môi trường có sự nghi kỵ, việc tiến hành gặp cản trở lớn; cần bình tâm chờ thời cơ thuận lợi hơn.`,
      dichLyDetails: `Quẻ biến ${changedName} (${changedInfo.nature}) báo hiệu trở ngại. Dịch lý chỉ dẫn: ${changedInfo.advice}`
    };
  }

  if (isBalance) {
    return {
      directConclusion: `Về tình hình "${q.trim()}": CÁT HUNG ĐAN XEN, ĐƯỢC MẤT SONG HÀNH. Không có chuyện toàn màu hồng, muốn đạt được kết quả phải chấp nhận đánh đổi công sức và thời gian tương xứng.`,
      dichLyDetails: `Quẻ biến ${changedName} (${changedInfo.nature}) khuyên giữ thái độ trung dung, không quá lạc quan cũng không bi quan.`
    };
  }

  if (isAuspicious) {
    return {
      directConclusion: `Về diễn biến "${q.trim()}": KẾT QUẢ ĐANG CHUYỂN HƯỚNG TÍCH CỰC, NHƯNG BẮT BUỘC PHẢI TRẢ GIÁ BẰNG SỰ LAO LỰC NGHIÊM TÚC; CẦN ĐỀ PHÒNG THỊ PHI GHEN GHÉT SAU KHI ĐẠT ĐƯỢC MỤC TIÊU.`,
      dichLyDetails: `Quẻ gốc ${origName} (${origInfo.nature}) động hào ${movingLine} biến ${changedName} (${changedInfo.nature}). Lời khuyên của Dịch: ${changedInfo.advice}`
    };
  }

  return {
    directConclusion: `Về tình hình "${q.trim()}": HIỆN TẠI ĐANG TRONG GIAI ĐOẠN CHUYỂN TIẾP, CẦN SỰ KIÊN TRÌ VÀ THÍCH ỨNG LINH HOẠT.`,
    dichLyDetails: `Quẻ gốc ${origName} biến ${changedName} (${changedInfo.nature}). Dịch lý chỉ dẫn: ${changedInfo.advice}`
  };
}

/**
 * THUẬT TOÁN KHỞI QUẺ MAI HOA & LỤC HÀO CHIÊM ĐOÁN THEO GIỜ ĐỘNG TÂM
 */
export function castDongTam(
  question: string,
  dateStr: string, // YYYY-MM-DD
  timeStr: string  // HH:mm
): DongTamResult {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hour, minute] = timeStr.split(':').map(Number);

  const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
  const lunar = solar.getLunar();
  const eightChar = lunar.getEightChar();

  const ganZhiYear = eightChar.getYear();
  const ganZhiMonth = eightChar.getMonth();
  const ganZhiDay = eightChar.getDay();
  const ganZhiHour = eightChar.getTime();

  const BRANCH_NUM: Record<string, number> = {
    'Tý': 1, 'Sửu': 2, 'Dần': 3, 'Mão': 4, 'Thìn': 5, 'Tị': 6,
    'Ngọ': 7, 'Mùi': 8, 'Thân': 9, 'Dậu': 10, 'Tuất': 11, 'Hợi': 12
  };

  const yearBranchStr = ganZhiYear.split(' ')[1] || 'Ngọ';
  const hourBranchStr = ganZhiHour.split(' ')[1] || 'Tý';

  const yearBranchNum = BRANCH_NUM[yearBranchStr] || 7;
  const hourBranchNum = BRANCH_NUM[hourBranchStr] || 1;

  const lunarMonth = Math.abs(lunar.getMonth());
  const lunarDay = lunar.getDay();

  // 1. Thượng Quái = (Năm + Tháng + Ngày) % 8 (dư 0 lấy 8 - Khôn)
  const upperSum = yearBranchNum + lunarMonth + lunarDay;
  const upperNum = (upperSum % 8 === 0) ? 8 : (upperSum % 8);

  // 2. Hạ Quái = (Năm + Tháng + Ngày + Giờ) % 8 (dư 0 lấy 8 - Khôn)
  const lowerSum = upperSum + hourBranchNum;
  const lowerNum = (lowerSum % 8 === 0) ? 8 : (lowerSum % 8);

  // 3. Hào Động = (Năm + Tháng + Ngày + Giờ) % 6 (dư 0 lấy 6)
  const movingLine = (lowerSum % 6 === 0) ? 6 : (lowerSum % 6);

  const upperTrigram = MAIHUA_TRIGRAMS[upperNum] || MAIHUA_TRIGRAMS[1];
  const lowerTrigram = MAIHUA_TRIGRAMS[lowerNum] || MAIHUA_TRIGRAMS[1];

  const origKey = `${upperNum === 8 ? 0 : upperNum}-${lowerNum === 8 ? 0 : lowerNum}`;
  const originalName = HEXAGRAM_NAMES_64[origKey] || `${upperTrigram.vi} ${lowerTrigram.vi}`;

  const TRIGRAM_LINES: Record<number, [number, number, number]> = {
    1: [1, 1, 1],
    2: [0, 1, 1],
    3: [1, 0, 1],
    4: [0, 0, 1],
    5: [1, 1, 0],
    6: [0, 1, 0],
    7: [1, 0, 0],
    8: [0, 0, 0],
  };

  const origSixLines: number[] = [
    ...TRIGRAM_LINES[lowerNum],
    ...TRIGRAM_LINES[upperNum],
  ];

  const changedSixLines = [...origSixLines];
  changedSixLines[movingLine - 1] = changedSixLines[movingLine - 1] === 1 ? 0 : 1;

  const findTrigramNum = (lines: [number, number, number]): number => {
    for (let k = 1; k <= 8; k++) {
      const t = TRIGRAM_LINES[k];
      if (t[0] === lines[0] && t[1] === lines[1] && t[2] === lines[2]) return k;
    }
    return 1;
  };

  const changedLowerNum = findTrigramNum([changedSixLines[0], changedSixLines[1], changedSixLines[2]]);
  const changedUpperNum = findTrigramNum([changedSixLines[3], changedSixLines[4], changedSixLines[5]]);

  const changedUpperTrigram = MAIHUA_TRIGRAMS[changedUpperNum] || MAIHUA_TRIGRAMS[4];
  const changedLowerTrigram = MAIHUA_TRIGRAMS[changedLowerNum] || MAIHUA_TRIGRAMS[7];
  const changedKey = `${changedUpperNum === 8 ? 0 : changedUpperNum}-${changedLowerNum === 8 ? 0 : changedLowerNum}`;
  const changedName = HEXAGRAM_NAMES_64[changedKey] || `${changedUpperTrigram.vi} ${changedLowerTrigram.vi}`;

  const origInfo = HEXAGRAM_KNOWLEDGE_64[originalName] || {
    nature: `${upperTrigram.vi} phối ${lowerTrigram.vi}`,
    omen: 'bình_hòa',
    coreMeaning: 'Quẻ tượng trưng cho sự vận động âm dương tương tác.',
    advice: 'Giữ tâm định tĩnh, quan sát diễn biến và tùy cơ ứng biến.',
  };

  const changedInfo = HEXAGRAM_KNOWLEDGE_64[changedName] || {
    nature: `${changedUpperTrigram.vi} phối ${changedLowerTrigram.vi}`,
    omen: 'bình_hòa',
    coreMeaning: 'Quẻ biến báo hiệu xu hướng chuyển hóa sau hào động.',
    advice: 'Nắm bắt thời cơ, thận trọng hành sự theo chính đạo.',
  };

  // --- PHÂN TÍCH Ý ĐỊNH CÂU HỎI THÔNG MINH ---
  const qClean = question.trim().toLowerCase();

  const isPastLife = /(kiếp trước|tiền kiếp|kiếp sau|tiền duyên|luân hồi|linh hồn|sứ mệnh|túc mệnh|túc nghiệp|căn duyên|tâm linh|chân ngã|nhân quả|đầu thai|nghiệp duyên|tu tập|kiếp xưa|túc duyên)/i.test(qClean);
  const isWeather = /(thời tiết|trời mưa|trời nắng|mưa to|mưa rào|nắng gắt|dự báo thời tiết|bão|gió bão|khí hậu|dông bão|áp thấp|ngập lụt|trời lạnh|trời nóng|nhiệt độ|không khí|mưa không|nắng không|\bmưa\b|\bnắng\b|\bbão\b)/i.test(qClean);
  const isContactOrNews = /(hotline|gọi|cuộc gọi|điện thoại|alo|nhắn tin|tin nhắn|sms|zalo|inbox|chat|email|gửi thư|thư từ|tin tức|thông báo|kết quả|phản hồi|hồi âm|liên lạc|liên hệ|gọi điện|nghe máy|bắt máy|trả lời tin|ai gọi)/i.test(qClean);
  const isBusinessCustomers = /(khách|khách hàng|khách mua|đơn hàng|chốt đơn|bán hàng|đông khách|vắng khách|ế ẩm|đắt khách|lượng khách|doanh số|mua hàng|order)/i.test(qClean);
  const isDailyLuck = /(hôm nay|ngày nay|nay|ngày mai|hôm nay thế nào|may mắn không|vận may|vận khí ngày|ngày tốt|ngày xấu)/i.test(qClean);
  const isLostItem = /(mất|tìm|thất lạc|ở đâu|đánh rơi|rơi đồ|để quên|tìm thấy|đồ mất)/i.test(qClean);
  const isProperty = /(nhà đất|bất động sản|mua nhà|bán nhà|mua đất|bán đất|thuê nhà|thuê phòng|mặt bằng|chung cư|phong thủy nhà|căn hộ|đất đai)/i.test(qClean);
  const isCareer = /(công việc|đi làm|xin việc|phỏng vấn|thăng chức|tăng lương|đổi việc|nhảy việc|nghỉ việc|chuyển việc|bỏ việc|sếp|đồng nghiệp|công ty|dự án|chức vụ|tuyển dụng|hồ sơ|thi cử|kỳ thi|đi thi|thi đỗ|thi đậu|thi rớt|bằng lái|bằng cấp|học hành|điểm thi|đậu đại học|thi qua|thi tuyển|deal lương)/i.test(qClean);
  const isWealth = /(tiền|tài chính|tài lộc|kinh doanh|làm ăn|buôn bán|đầu tư|chứng khoán|đòi nợ|vay tiền|mượn tiền|lãi suất|lời lỗ|hợp đồng kinh tế|giàu|có giàu không|trúng số|vé số|tiền bạc|kiếm tiền|phát tài|nợ nần|trả nợ|đầu tư đất|coin|crypto)/i.test(qClean);
  const isLove = /(tình duyên|tình cảm|yêu đương|\byêu\b|người yêu|hẹn hò|kết hôn|cưới xin|\bcưới\b|lấy chồng|lấy vợ|ly hôn|chia tay|quay lại|tỏ tình|bạn gái|bạn trai|crush|thích tôi|người ấy|\bbồ\b|vợ chồng|hôn nhân|gia đạo|bị ế|thoát ế|ở vậy|\bế\b|độc thân|tương tư)/i.test(qClean);
  const isHealth = /(sức khỏe|bệnh tật|ốm đau|nằm viện|nhập viện|đi khám|khám bệnh|mổ|phẫu thuật|thuốc|bác sĩ|ung thư|viêm|phổi|tim|sốt|đau|khỏi bệnh|suy nhược|mệt mỏi|người già|người lớn tuổi)/i.test(qClean);
  const isTravel = /(xuất hành|đi lại|lộ trình|xe cộ|tàu xe|máy bay|du lịch|du học|đi xa|về quê|chuyển nhà|chuyển chỗ|chuyến đi|lên đường|đường sá|an toàn giao thông)/i.test(qClean);
  const isLawsuit = /(kiện|kiện cáo|tranh chấp|tòa án|pháp luật|công an|thưa gửi|bồi thường|tranh giành|chia tài sản)/i.test(qClean);
  const isPartnership = /(hợp tác|làm chung|góp vốn|chung vốn|đối tác|hợp tác làm ăn|hùn hạp|bạn bè làm ăn)/i.test(qClean);

  // Quan hệ thân nhân
  const isElder = /(ông|bà|cha|mẹ|bố|bác|chú|cô|dì|phụ mẫu|người già|người lớn tuổi)/i.test(qClean);
  const isChild = /(con|cháu|bé|tử tức)/i.test(qClean);

  const xunKong = calculateXunKong(ganZhiDay);

  let subject = 'Thế Hào (Bản Thân Người Hỏi)';
  let targetName = 'Bản thân & Sự việc người hỏi';
  let state = changedInfo.omen === 'đại_cát' || changedInfo.omen === 'cát' ? 'Cát Khí Hanh Thông' : 'Cần Thận Trọng Tùy Thời';
  let explanation = '';
  let directConclusion = '';
  let dichLyDetails = '';
  let ungKy = 'Trong thời gian ngắn sắp tới (từ 3 đến 7 ngày tới)';
  let diseaseAnalysis: DongTamResult['diseaseAnalysis'] = undefined;

  const isChangedAuspicious = changedInfo.omen === 'đại_cát' || changedInfo.omen === 'cát';

  // --- TỔNG HỢP LỜI PHÁN THEO TỪNG MIỀN CÂU HỎI & CẶP QUẺ ---
  if (isPastLife) {
    subject = 'Thần Hồn & Tiền Thân (Gốc Rễ Túc Nghiệp Luân Hồi)';
    targetName = 'Túc duyên & Bản thể linh hồn tiền kiếp';
    state = isChangedAuspicious ? 'Túc Thiện Căn Khởi Sắc, Linh Giác Tỏ Rõ' : 'Đang Chuyển Hóa Nghiệp Lực Tiền Kiếp';
    explanation = 'Chiêm bốc về tiền kiếp và linh hồn: Lấy Thế hào làm Chân linh kiếp này, Hào Ứng & Quẻ Nội làm Túc duyên tiền kiếp, Quẻ Biến làm Bài học giác ngộ của linh hồn.';
    ungKy = 'Hiện tiền kiếp này là thời điểm vàng để thức tỉnh và tu dưỡng tâm thức';

    if (isChangedAuspicious) {
      directConclusion = `Về câu hỏi "${question.trim()}": BẠN MANG TÚC DUYÊN THIỆN LÀNH TỪ NHIỀU ĐỜI TRƯỚC, TỪNG LÀ BẬC TRÍ THỨC, NGƯỜI HÀNH THIỆN HOẶC CÓ DUYÊN TU TẬP; KIẾP NÀY ĐẾN ĐỂ TIẾP TỤC KHAI MỞ TRÍ TUỆ VÀ GIÚP ĐỠ MỌI NGƯỜI.`;
      dichLyDetails = `Quẻ gốc ${originalName} (${origInfo.nature}) động hào ${movingLine} biến ${changedName} (${changedInfo.nature}). Tượng quẻ cho thấy tiền kiếp bạn gieo nhiều hạt mầm phước báu. Kiếp này sinh ra với trực giác nhạy bén, sâu sắc và nhiều trăn trở với ý nghĩa nhân sinh.`;
    } else {
      directConclusion = `Về câu hỏi "${question.trim()}": TIỀN THÂN CỦA BẠN TỪNG LÀ NGƯỜI GÁNH VÁC TRỌNG TRÁCH LỚN HOẶC TRẢI QUA NHIỀU BIẾN ĐỘNG TÌNH CẢM; KIẾP NÀY BÀI HỌC CỐT LÕI LÀ BUÔNG BỎ ÁP LỰC, CHỮA LÀNH TÂM HỒN VÀ SỐNG VÌ CHÍNH MÌNH.`;
      dichLyDetails = `Quẻ ${originalName} chuyển hóa sang ${changedName} là biểu tượng của sự thanh lọc và giải nghiệp. Dư âm tiền kiếp mách bảo bạn hãy sống vị tha, lắng nghe nội tâm và hướng thiện để mở ra vận trình tươi sáng.`;
    }

  } else if (isWeather) {
    subject = 'Phụ Mẫu (Mây Mưa, Sương Tuyết) phối Hào Thế (Khí Quyển Xung Quanh)';
    targetName = 'Khí hậu / Thời tiết / Mây mưa sấm chớp';
    ungKy = 'Trong các khung giờ tiếp theo của ngày hôm nay';

    const isWater = changedUpperTrigram.vi === 'Thủy' || changedUpperTrigram.vi === 'Trạch' || changedLowerTrigram.vi === 'Thủy' || changedLowerTrigram.vi === 'Trạch';
    const isFire = changedUpperTrigram.vi === 'Hỏa' || changedLowerTrigram.vi === 'Hỏa';
    const isThunderWind = changedUpperTrigram.vi === 'Lôi' || changedUpperTrigram.vi === 'Phong' || changedLowerTrigram.vi === 'Lôi' || changedLowerTrigram.vi === 'Phong';

    if (isWater) {
      state = 'Thủy Khí Dồi Dào, Mây Mù Kéo Đến, Dễ Có Mưa';
      explanation = 'Chiêm thời tiết lấy hào Phụ Mẫu làm mây mưa sương tuyết. Quẻ có Khảm Thủy hoặc Đoài Trạch chủ về mưa ẩm.';
      directConclusion = `Về thời tiết "${question.trim()}": TRỜI NHIỀU MÂY, KHẢ NĂNG CAO CÓ MƯA (HOẶC MƯA RÀO RẢI RÁC), ĐỘ ẨM KHÔNG KHÍ TĂNG; NÊN MANG THEO ÁO MƯA HAY DÙ KHI RA NGOÀI.`;
      dichLyDetails = `Quẻ gốc ${originalName} động hào ${movingLine} biến ${changedName}. Tượng Thủy/Trạch ngưng tụ thành mây và dễ sinh mưa gió trong ngày.`;
    } else if (isThunderWind) {
      state = 'Phong Lôi Giao Động, Gió Lớn & Dông Sét';
      explanation = 'Chiêm thời tiết gặp quẻ có Chấn Lôi và Tốn Phong chủ về sấm sét, dông gió hoặc thời tiết chuyển biến đột ngột.';
      directConclusion = `Về thời tiết "${question.trim()}": THỜI TIẾT BIẾN ĐỘNG MẠNH, DỄ CÓ GIÓ TO, DÔNG GIẬT HOẶC SẤM CHỚP ĐỘT NGỘT; SAU CƠN DÔNG TRỜI SẼ RÁO DẦN.`;
      dichLyDetails = `Quẻ gốc ${originalName} (${origInfo.nature}) động hào ${movingLine} biến ${changedName} (${changedInfo.nature}). Tượng Chấn Lôi phối Tốn Phong cho thấy không khí đối lưu mạnh mẽ, đề phòng gió giật khi đi đường.`;
    } else if (isFire) {
      state = 'Dương Khí Vượng Thịnh, Nhật Chiếu Quang Minh, Nắng Ráo';
      explanation = 'Chiêm thời tiết gặp Ly Hỏa tượng trưng cho Mặt Trời tỏa sáng rực rỡ, trời tạnh ráo không mưa.';
      directConclusion = `Về thời tiết "${question.trim()}": TRỜI NẮNG RÁO, QUANG ĐÃNG, KHÍ HẬU KHÔ RÁO VÀ ẤM ÁP; RẤT THUẬN LỢI CHO CÔNG VIỆC NGOÀI TRỜI VÀ LỘ TRÌNH ĐI LẠI.`;
      dichLyDetails = `Quẻ biến ${changedName} mang tượng Hỏa minh sáng sủa, xua tan mây mù, trời tạnh ráo và có nắng.`;
    } else {
      state = 'Thiên Địa Bình Hòa, Trời Râm Mát Tạnh Ráo';
      explanation = 'Gặp quẻ Càn Khôn Cấn chủ về thời tiết ôn hòa, mây che râm mát.';
      directConclusion = `Về thời tiết "${question.trim()}": KHÍ TRỜI ÔN HÒA, RÂM MÁT, TẠM THỜI KHÔNG CÓ MƯA LỚN HAY THỜI TIẾT CỰC ĐOAN; THỜI TIẾT DỄ CHỊU VÀ THUẬN LỢI.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} báo hiệu trường khí ổn định, thời tiết mát mẻ êm dịu.`;
    }

  } else if (isLostItem) {
    subject = 'Thê Tài (Tài Vật Thất Lạc)';
    targetName = 'Đồ vật / Tài sản bị mất';
    state = isChangedAuspicious ? 'Đồ Vật Còn Nguyên, Chưa Bị Mất Hẳn' : 'Khó Tìm, Đã Bị Di Dời Hoặc Che Khuất';
    explanation = 'Chiêm tìm đồ thất lạc lấy hào Thê Tài làm Dụng Thần, phối hào Phụ Mẫu xem nơi cất giấu.';
    ungKy = 'Trong vòng 1-3 ngày tới hoặc tìm vào hướng quẻ chỉ dẫn';

    if (changedInfo.omen === 'hung') {
      directConclusion = `Về việc tìm kiếm "${question.trim()}": KHẢ NĂNG TÌM LẠI CỰC KỲ THẤP, ĐỒ VẬT RẤT DỄ ĐÃ BỊ MẤT CẮP HOẶC BỊ TẨU TÁN ĐI RẤT XA; NÊN CHUẨN BỊ TÂM LÝ CHẤP NHẬN BUÔNG BỎ.`;
      dichLyDetails = `Quẻ ${originalName} động hào ${movingLine} biến ${changedName} lâm Điềm Hung. Hào Thê Tài suy bại, tài vật bị tổn hại nghiêm trọng.`;
    } else if (isChangedAuspicious) {
      directConclusion = `Về việc tìm kiếm "${question.trim()}": CƠ HỘI TÌM LẠI RẤT CAO, ĐỒ VẬT CHƯA HỀ BỊ MẤT MÀ ĐANG BỊ BỎ QUÊN HOẶC ĐỒ VẬT KHÁC CHE KHUẤT.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} cho thấy tài vật vẫn còn ở trong phạm vi quen thuộc (nhà ở, nơi làm việc hoặc phương tiện đi lại). Hãy tìm ở các góc khuất, hộc tủ hoặc hỏi người thân gần gũi.`;
    } else {
      directConclusion = `Về việc "${question.trim()}": TẠM THỜI CHƯA THỂ TÌM THẤY NGAY, CÓ DẤU HIỆU ĐÃ BỊ DI DỜI HOẶC ĐỂ QUÊN Ở NƠI CÔNG CỘNG.`;
      dichLyDetails = `Quẻ ${originalName} động hào ${movingLine} biến ${changedName} cảnh báo tài khí phân tán. Cần bình tĩnh nhớ lại từng bước lộ trình di chuyển và nhờ người hỗ trợ trích xuất camera.`;
    }

  } else if (isProperty) {
    subject = 'Phụ Mẫu (Nhà Cửa, Đất Đai, Khế Ước)';
    targetName = 'Bất động sản / Nhà đất';
    state = isChangedAuspicious ? 'Địa Khí Vượng Tướng, Giấy Tờ Hợp Cách' : 'Có Vướng Mắc Thủ Tục Hoặc Tranh Giá';
    explanation = 'Chiêm nhà đất lấy hào Phụ Mẫu làm Dụng Thần (tượng trưng cho đất đai, nhà cửa, sổ đỏ), hào Thê Tài làm giá cả giao dịch.';
    ungKy = 'Trong vòng 1-3 tháng tới hoặc vào các tháng tứ quý (Thìn, Tuất, Sửu, Mùi)';

    if (changedInfo.omen === 'hung') {
      directConclusion = `Về việc nhà đất "${question.trim()}": CỰC KỲ NGUY HIỂM / DỄ DÍNH TRANH CHẤP, QUY HOẠCH TREO HOẶC LỪA ĐẢO SỔ ĐỎ GIẢ. Tuyệt đối không đặt cọc lúc này!`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} (${changedInfo.nature}) lâm Điềm Hung. Đất đai phong thủy có hung khí hoặc vướng mắc pháp lý nghiêm trọng.`;
    } else if (isChangedAuspicious) {
      directConclusion = `Về việc nhà đất "${question.trim()}": RẤT CÁT LỢI VÀ HANH THÔNG, GIAO DỊCH DỄ THÀNH CÔNG, ĐẤT ĐAI CÓ ĐỊA KHÍ TỐT ĐEM LẠI AN CƯ HOẶC SINH LỜI.`;
      dichLyDetails = `Quẻ gốc ${originalName} (${origInfo.nature}) biến sang ${changedName} (${changedInfo.nature}) là điềm cát cho điền trạch. Giấy tờ pháp lý minh bạch, có thể tự tin tiến hành.`;
    } else {
      directConclusion = `Về việc nhà đất "${question.trim()}": CẦN RÀ SOÁT KỸ LƯỠNG PHÁP LÝ, GIẤY TỜ VÀ QUY HOẠCH TRƯỚC KHI XUỐNG TIỀN.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} nhắc nhở cần chú ý các điều khoản hợp đồng cọc, phong thủy hướng nhà hoặc thủ tục chuyển nhượng để tránh phát sinh phiền toái.`;
    }

  } else if (isCareer) {
    subject = 'Quan Quỷ (Sự Nghiệp & Công Danh)';
    targetName = 'Công việc / Chức vị / Dự án / Thi cử';
    state = isChangedAuspicious ? 'Quan Tinh Sinh Hóa, Đắc Thời Đắc Lợi' : 'Chờ Thời Cơ Chuyển Biến';
    explanation = 'Hỏi về công danh sự nghiệp, thi cử, dự án, thăng chức lấy hào Quan Quỷ làm Dụng Thần.';
    ungKy = 'Trong vòng 1 đến 3 tháng tới';

    if (changedName === 'Trạch Hỏa Cách') {
      directConclusion = `Về công việc / thi cử "${question.trim()}": CẦN MẠNH DẠN ĐỔI MỚI, THAY ĐỔI CHIẾN LƯỢC HOẶC TƯ DUY CŨ ĐỂ TẠO RA BƯỚC NGOẶT THÀNH CÔNG VƯỢT BẬC. NẾU CỐ CHẤP GIỮ LỐI MÒN CŨ ẮT THẤT BẠI.`;
      dichLyDetails = `Quẻ khởi ${originalName} (${origInfo.nature}) động hào ${movingLine} biến Trạch Hỏa Cách (Canh tân đổi mới). Thời điểm này nếu bạn dám thay đổi phương thức làm việc hoặc nắm bắt hướng đi mới thì sự nghiệp và học vấn sẽ bước sang một trang rực rỡ.`;
    } else if (changedInfo.omen === 'hung') {
      state = 'Quan Tinh Lâm Hung Địa, Tiểu Nhân Hãm Hại';
      directConclusion = `Về công việc / thi cử "${question.trim()}": ĐIỀM BÁO RẤT BẤT LỢI VÀ NGUY CƠ THẤT BẠI CAO. Đang có tiểu nhân đố kỵ ngáng đường, thi cử dễ trượt điểm hoặc công việc có nguy cơ bị kỷ luật, đình trệ dự án hay mất việc. Tuyệt đối không nên manh động mạo hiểm lúc này.`;
      dichLyDetails = `Quẻ gốc ${originalName} biến thành ${changedName} (${changedInfo.nature}) lâm Điềm Hung. Khí vận công danh bị bế tắc nặng nề. Lời khuyên: Thu mình phòng thủ, cẩn trọng lời ăn tiếng nói kẻo vướng họa thị phi pháp lý.`;
    } else if (changedInfo.omen === 'thận_trọng') {
      state = 'Quan Tinh Bị Kìm Hãm, Trở Ngại Rình Rập';
      directConclusion = `Về công việc / thi cử "${question.trim()}": CHƯA THUẬN LỢI, ĐANG BỊ KÌM HÃM VÀ CẢN TRỞ LỚN. Cấp trên chưa công nhận, đồng nghiệp nghi kỵ, tiến lên lúc này sẽ chuốc lấy thất bại ê chề.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} cho thấy môi trường đang có sự tái cơ cấu hoặc đối kháng ngầm. Hãy tập trung củng cố chuyên môn và giữ hòa khí, tránh tranh chấp quyền lực.`;
    } else if (isChangedAuspicious) {
      directConclusion = `Về công việc / thi cử "${question.trim()}": RẤT CÓ TRIỂN VỌNG VÀ DỄ ĐẠT THÀNH TỰU; NHƯNG PHẢI ĐÁNH ĐỔI BẰNG SỰ LAO LỰC CỰC NHỌC VÀ ĐỀ PHÒNG ĐỒNG NGHIỆP GHEN GHÉT SAU LƯNG.`;
      dichLyDetails = `Quẻ gốc ${originalName} biến thành ${changedName} (${changedInfo.nature}) là điềm báo công việc có sự mở mang. Cứ tự tin thể hiện năng lực nhưng phải khiêm nhường để tránh bị dòm ngó.`;
    } else {
      directConclusion = `Về công việc / thi cử "${question.trim()}": CÁT HUNG ĐAN XEN, THÀNH BẠI PHỤ THUỘC VÀO NỖ LỰC TỰ THÂN; CHƯA THỂ CÓ BƯỚC NHẢY VỌT LỚN.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} khuyên kiên nhẫn tích lũy kinh nghiệm, làm tốt từng việc nhỏ.`;
    }

  } else if (isWealth) {
    subject = 'Thê Tài (Tài Bạch & Dòng Tiền)';
    targetName = 'Tài lộc / Kinh tế / Tiền của';
    state = isChangedAuspicious ? 'Thê Tài Lâm Vượng Địa' : 'Tài Khí Cần Tích Lũy, Đề Phòng Hao Tán';
    explanation = 'Hỏi về tiền bạc, kinh doanh làm ăn, đầu tư lấy hào Thê Tài làm Dụng Thần.';
    ungKy = 'Trong vòng tháng sau hoặc vào các ngày Tý, Thìn, Thân';

    if (changedName === 'Trạch Hỏa Cách') {
      directConclusion = `Về tài chính / tiền bạc "${question.trim()}": DÒNG TIỀN SẮP CÓ SỰ THAY ĐỔI LỚN, CẦN LINH HOẠT CHUYỂN HƯỚNG MÔ HÌNH KIẾM TIỀN HOẶC ĐỔI MỚI KÊNH ĐẦU TƯ.`;
      dichLyDetails = `Quẻ khởi ${originalName} biến Trạch Hỏa Cách chỉ ra rằng tiền tài trong giai đoạn này không đến từ việc an phận, mà đến từ sự nhạy bén nắm bắt xu hướng mới và dám đổi mới phương thức sinh lời.`;
    } else if (changedInfo.omen === 'hung') {
      state = 'Thê Tài Tuyệt Khí, Cảnh Báo Phá Sản & Hao Hụt';
      directConclusion = `Về tài chính / tiền bạc "${question.trim()}": ĐIỀM BÁO CỰC KỲ XẤU / CẢNH BÁO HAO TÀI, PHÁ SẢN HOẶC BỊ LỪA GẠT TRẮNG TAY. Tuyệt đối không rót vốn, không cho vay mượn và không tham gia các kênh đầu tư mạo hiểm kẻo vướng nợ nần không lối thoát.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} (${changedInfo.nature}) lâm Điềm Hung. Dòng tiền cạn kiệt, tài khí phân tán tan nát. Lời khuyên: Phải siết chặt chi tiêu và cắt lỗ khẩn cấp.`;
    } else if (changedInfo.omen === 'thận_trọng') {
      state = 'Tài Khí Tắc Nghẽn, Chi Phí Phát Sinh Vượt Tầm Kiểm Soát';
      directConclusion = `Về tiền tài "${question.trim()}": DÒNG TIỀN ĐANG BẾ TẮC VÀ DỄ BỊ HAO HỤT. Các khoản thu bị chậm trễ, chi phí phát sinh ngoài ý muốn; nên thắt chặt chi tiêu tối đa, chưa nên đầu tư mới.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} cảnh báo nguy cơ hao tán. Cần quản lý chặt chẽ dòng tiền và xem xét kỹ các điều khoản tài chính trước khi xuống tiền.`;
    } else if (isChangedAuspicious) {
      directConclusion = `Về tiền tài "${question.trim()}": TÀI LỘC KHỞI SẮC, CÓ CƠ HỘI SINH LỜI NHƯNG KHÔNG ĐƯỢC THAM LAM; CẦN CẨN TRỌNG ĐIỀU KHOẢN HỢP ĐỒNG KẺO ĐƯỢC TIỀN MẤT TÌNH HOẶC VƯỚNG THỊ PHI PHÁP LÝ.`;
      dichLyDetails = `Quẻ ${originalName} biến sang ${changedName} (${changedInfo.nature}) mang lại vượng khí tài lộc. Thích hợp mở rộng giao thương, thu hồi công nợ hoặc triển khai kế hoạch mới.`;
    } else {
      directConclusion = `Về tiền bạc "${question.trim()}": TÀI CHÍNH Ở MỨC CÂN BẰNG, TIỀN VÀO ĐẾN ĐÂU RA ĐẾN ĐÓ, CHƯA THỂ DƯ DẢ LỚN; NÊN TIẾT KIỆM TÍCH LŨY.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} cho thấy tài vận bình ổn, cần tránh xa cờ bạc hay các lời mời gọi làm giàu nhanh.`;
    }

  } else if (isLove) {
    subject = 'Thê Tài / Quan Quỷ & Hào Ứng (Đối Phương)';
    targetName = 'Nhân duyên / Tình cảm đôi bên';
    state = isChangedAuspicious ? 'Thế Ứng Tương Hợp, Duyên Lành Hội Tụ' : 'Đang Có Chuyển Hóa Cần Thấu Hiểu';
    explanation = 'Hỏi về tình duyên, lấy Hào Ứng đại diện cho đối phương, Thế hào làm bản thân.';
    ungKy = 'Trong vòng vài tuần tới hoặc vào tiết tháng tới';

    if (changedName === 'Trạch Hỏa Cách') {
      directConclusion = `Về tình duyên "${question.trim()}": MỐI QUAN HỆ SẮP BƯỚC SANG MỘT TRANG MỚI VỚI BƯỚC NGOẶT CHUYỂN DỊCH RÕ RÀNG. NẾU KHÔNG DÁM THAY ĐỔI CÁCH ĐỐI XỬ THÌ ĐỔ VỠ LÀ ĐIỀU CHẮC CHẮN.`;
      dichLyDetails = `Quẻ ${originalName} biến Trạch Hỏa Cách tượng trưng cho sự lột xác, đổi mới. Cả hai cần thẳng thắn buông bỏ những hiểu lầm hay bất đồng cũ để cùng nhau tái tạo một sự gắn kết chân thành hơn.`;
    } else if (changedInfo.omen === 'hung') {
      state = 'Thế Ứng Tương Xung Tương Khắc, Điềm Báo Đổ Vỡ';
      directConclusion = `Về tình duyên / hôn nhân "${question.trim()}": NGUY CƠ ĐỔ VỠ RẤT LỚN HOẶC ĐANG CÓ SỰ DỐI LỪA, PHẢN BỘI ĐAU ĐỚN. Mối quan hệ chứa đựng nhiều mâu thuẫn độc hại hoặc có sự can thiệp của người thứ ba; nếu cố chấp níu kéo chỉ chuốc lấy tổn thương kéo dài.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} (${changedInfo.nature}) lâm Điềm Hung. Lời khuyên của Dịch: Hãy dũng cảm nhìn thẳng vào sự thật, chấm dứt sự phụ thuộc cảm xúc độc hại.`;
    } else if (changedInfo.omen === 'thận_trọng') {
      state = 'Thế Ứng Bất Hòa, Chiến Tranh Lạnh Kéo Dài';
      directConclusion = `Về tình cảm "${question.trim()}": TÌNH CẢM RẠN NỨT NẶNG NỀ, "BẰNG MẶT KHÔNG BẰNG LÒNG". Đôi bên thiếu sự tin tưởng, chiến tranh lạnh triền miên và bất đồng quan điểm sống sâu sắc; cần hạ bớt cái tôi nếu còn muốn hàn gắn.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} cho thấy cả hai đang phòng thủ lẫn nhau. Cần đối thoại chân thành thay vì trách móc.`;
    } else if (isChangedAuspicious) {
      directConclusion = `Về nhân duyên "${question.trim()}": DUYÊN LÀNH GẮN KẾT, TRIỂN VỌNG RẤT TỐT ĐẸP NHƯNG ĐỪNG MƠ MỘNG HOÀN HẢO; CẦN HẠ BỚT CÁI TÔI VÀ THẤU HIỂU KHUYẾT ĐIỂM CỦA ĐỐI PHƯƠNG THÌ MỚI BỀN VỮNG.`;
      dichLyDetails = `Quẻ ${originalName} chuyển hóa sang ${changedName} (${changedInfo.nature}) tượng trưng cho sự thấu hiểu và gắn bó. Hãy chân thành chia sẻ để duyên lành đơm hoa kết trái.`;
    } else {
      directConclusion = `Về tình duyên "${question.trim()}": TÌNH CẢM BÌNH THẢN ĐỜI THƯỜNG, THIẾU CHÚT LÃNG MẠN NHƯNG AN TOÀN; CẦN HÂM NÓNG LẠI CẢM XÚC.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} khuyên cả hai dành thêm thời gian quan tâm nhau.`;
    }

  } else if (isHealth) {
    if (isElder) {
      subject = 'Phụ Mẫu (Trưởng Bối & Che Chở)';
      targetName = 'Trưởng bối / Người thân lớn tuổi';
      state = 'Cần Bồi Đắp Nguyên Khí & Chăm Sóc Chu Đáo';
      explanation = `Hỏi bệnh cho ${targetName}, lấy hào Phụ Mẫu làm Dụng Thần.`;
      ungKy = 'Thời điểm chuyển biến then chốt: Trong vòng 1-2 tuần tới';
    } else if (isChild) {
      subject = 'Tử Tôn (Phúc Đức & Giải Tai)';
      targetName = 'Con cháu / Hậu bối';
      state = 'Tử Tôn Trì Thế, Được Phúc Thần Che Chở';
      explanation = 'Hỏi cho con cái, lấy hào Tử Tôn làm Dụng Thần. Tử Tôn là phúc thần hóa giải tai ương.';
      ungKy = 'Chuyển biến tích cực trong vòng 3-7 ngày tới';
    } else {
      subject = 'Thế Hào (Bản Thân Người Bệnh)';
      targetName = 'Bản thân';
      state = 'Cần Điều Dưỡng Thân Tâm';
      explanation = 'Hỏi về sức khỏe bản thân, lấy Thế hào làm Dụng Thần.';
      ungKy = 'Cần kiên trì điều dưỡng và nghỉ ngơi';
    }

    let organ = 'Hệ Thần Kinh & Hô Hấp';
    let element = 'Kim phối Mộc';
    let detail = 'Cần chú ý giữ ấm cơ thể, ngủ đủ giấc, tránh làm việc quá sức gây suy nhược tinh thần.';

    if (qClean.includes('tim') || qClean.includes('máu') || qClean.includes('huyết')) {
      organ = 'Hệ Tim Mạch & Huyết Áp (Tâm Hỏa)';
      element = 'Hỏa';
      detail = 'Tâm chủ huyết mạch. Cần giữ tâm trạng thư thái, tránh xúc động mạnh hay thức khuya.';
    } else if (qClean.includes('dạ dày') || qClean.includes('bụng') || qClean.includes('tiêu hóa')) {
      organ = 'Hệ Tiêu Hóa & Dạ Dày (Tỳ Vị Thổ)';
      element = 'Thổ';
      detail = 'Cần ăn uống đúng giờ, hạn chế đồ cay nóng và giảm căng thẳng kéo dài.';
    }

    diseaseAnalysis = { involvedOrgan: organ, involvedElement: element, details: detail };
    if (isChangedAuspicious) {
      directConclusion = `Về sức khỏe "${question.trim()}": BỆNH TÌNH CÓ DẤU HIỆU THUYÊN GIẢM TỐT, GẶP THẦY GẶP THUỐC, NGUYÊN KHÍ ĐANG DẦN BÌNH PHỤC.`;
    } else {
      directConclusion = `Về tình hình sức khỏe "${question.trim()}": CẦN THEO DÕI SÁT SAO, TUÂN THỦ ĐÚNG PHÁC ĐỒ Y BÁC SĨ VÀ NGHỈ NGƠI TĨNH DƯỠNG.`;
    }
    dichLyDetails = `Quẻ ${originalName} động hào ${movingLine} biến ${changedName}. Xét ngũ hành tạng phủ: ${organ}. Cần giữ tinh thần lạc quan, đây là yếu tố cốt tử giúp cơ thể mau chóng hồi phục.`;

  } else if (isTravel) {
    subject = 'Thế Hào & Hào Ứng (Lộ Trình & Điểm Đến)';
    targetName = 'Chuyến đi / Việc xuất hành trở về';
    state = isChangedAuspicious ? 'Thế Ứng Tương Sinh, Lộ Trình Bình An' : 'Hào Lâm Động Biến, Có Chút Chậm Trễ';
    explanation = 'Hỏi về việc đi lại, lấy Thế hào làm bản thân người đi, Ứng hào làm điểm đến hoặc cung đường; hào Phụ Mẫu làm xe cộ giấy tờ.';
    ungKy = 'Ngay trong ngày hôm nay; khung giờ cát lợi: giờ Thìn (07-09h), Tị (09-11h), Thân (15-17h)';

    if (isChangedAuspicious) {
      directConclusion = `Về việc đi lại "${question.trim()}": HOÀN TOÀN BÌNH AN VÀ THUẬN LỢI, KHÔNG GẶP TRẮC TRỞ NGUY HIỂM. Chuyến đi diễn ra suôn sẻ, đúng như dự định.`;
      dichLyDetails = `Quẻ gốc ${originalName} gặp hào động ${movingLine} biến hóa thành ${changedName} (${changedInfo.nature}). Hào thế được trợ lực, quẻ biến ngụ ý thông suốt, bạn có thể an tâm lên đường.`;
    } else {
      directConclusion = `Về việc đi lại "${question.trim()}": CẦN CHÚ Ý THẬN TRỌNG VỀ GIỜ GIẤC VÀ PHƯƠNG TIỆN XE CỘ, CÓ THỂ GẶP CHÚT CHẬM TRỄ NHẸ.`;
      dichLyDetails = `Quẻ ${originalName} biến thành ${changedName} khuyên bạn nên kiểm tra kỹ xe cộ, xăng xe, tư trang và giữ tốc độ an toàn khi tham gia giao thông.`;
    }

  } else if (isLawsuit) {
    subject = 'Quan Quỷ (Tranh Chấp, Pháp Lý & Công Quyền)';
    targetName = 'Tranh chấp pháp lý / Thủ tục thưa gửi';
    state = isChangedAuspicious ? 'Hòa Giải Hanh Thông, Chiếm Lợi Thế' : 'Cần Chuẩn Bị Chứng Cứ Kỹ Càng';
    explanation = 'Chiêm kiện tụng tranh chấp, lấy hào Quan Quỷ làm cơ quan pháp luật, Thế hào làm bản thân, Ứng hào làm đối phương.';
    ungKy = 'Trong vòng 1-2 tháng tới';

    if (changedInfo.omen === 'hung') {
      directConclusion = `Về việc tranh chấp "${question.trim()}": CỰC KỲ BẤT LỢI, NGUY CƠ THUA KIỆN HOẶC BỊ PHẠT NẶNG. Nên chủ động tìm đường hòa giải và chấp nhận nhún nhường để giảm thiểu tổn thất.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} lâm Điềm Hung. Quan Quỷ khắc Thế, đối phương chiếm ưu thế pháp lý hoặc có yếu tố bất lợi khó lường.`;
    } else if (isChangedAuspicious) {
      directConclusion = `Về việc tranh chấp "${question.trim()}": KẾT QUẢ KHẢ QUAN, CÓ KHẢ NĂNG HÒA GIẢI HOẶC BẠN CHIẾM ĐƯỢC LỢI THẾ HỢP PHÁP RÕ RÀNG.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} cho thấy mâu thuẫn sẽ từng bước được tháo gỡ ôn hòa dựa trên lý lẽ công bằng.`;
    } else {
      directConclusion = `Về việc tranh chấp "${question.trim()}": CẦN HẾT SỨC CẨN TRỌNG, CHUẨN BỊ KỸ CÀNG VĂN BẢN VÀ CHỨNG CỨ HỢP PHÁP.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} nhắc nhở quá trình giải quyết có thể kéo dài, nên tìm luật sư hoặc người có chuyên môn hỗ trợ.`;
    }

  } else if (isPartnership) {
    subject = 'Hào Ứng & Huynh Đệ (Đối Tác & Cộng Sự)';
    targetName = 'Đối tác hợp tác / Người cùng làm ăn';
    state = isChangedAuspicious ? 'Thế Ứng Đồng Tâm, Tương Trợ Đôi Bên' : 'Khác Biệt Quan Điểm, Cần Rõ Ràng';
    explanation = 'Chiêm hợp tác lấy Thế hào làm mình, Ứng hào làm đối tác, Huynh Đệ làm người cộng sự.';
    ungKy = 'Trong vòng 1-3 tháng tới';

    if (changedInfo.omen === 'hung') {
      directConclusion = `Về việc hợp tác "${question.trim()}": TUYỆT ĐỐI KHÔNG NÊN HỢP TÁC LÚC NÀY! TƯỢNG QUẺ BÁO HIỆU SỰ LỪA ĐẢO, PHẢN PHÚC HOẶC TRANH CHẤP CHIA RẼ NẶNG NỀ DẪN TỚI MẤT CẢ TIỀN LẪN BẠN BÈ.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} lâm hung tượng. Huynh Đệ khắc Thê Tài, đối tác có toan tính riêng mờ ám, hợp tác sẽ chuốc lấy thua lỗ.`;
    } else if (isChangedAuspicious) {
      directConclusion = `Về việc hợp tác "${question.trim()}": ĐỐI TÁC CÓ THIỆN CHÍ, ĐÔI BÊN HỢP TÁC RẤT DỄ ĐẠT ĐƯỢC THÀNH CÔNG VÀ LỢI NHUẬN TỐT; NHƯNG PHẢI MINH BẠCH TÀI CHÍNH TỪ ĐẦU.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} là tượng đồng tâm hiệp lực, có thể triển khai kế hoạch và ký kết hợp đồng.`;
    } else {
      directConclusion = `Về việc hợp tác "${question.trim()}": CẦN PHÂN ĐỊNH RÕ RÀNG QUYỀN LỢI, TRÁCH NHIỆM VÀ TÀI CHÍNH TRÊN GIẤY TỜ TRƯỚC KHI BẮT ĐẦU.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} cảnh báo nguy cơ bất đồng quan điểm về sau, minh bạch tài chính là yếu tố quyết định.`;
    }

  } else if (isContactOrNews) {
    subject = 'Phụ Mẫu (Tin Tức, Sóng Điện Thoại & Văn Thư) phối Hào Ứng (Khách Hàng)';
    targetName = 'Thông tin liên lạc / Cuộc gọi Hotline / Phản hồi';
    state = isChangedAuspicious ? 'Phụ Mẫu Vượng Tướng, Hào Ứng Tương Sinh, Tin Tức & Cuộc Gọi Dồn Dập' : 'Tin Tức Đến Chậm Rải Rác, Cần Chủ Động Trực Kênh';
    explanation = 'Trong Lục Hào: Hào Phụ Mẫu đại diện cho thư tín, sóng điện thoại, tin tức và liên lạc; Hào Ứng đại diện cho người gọi/khách hàng đối phương.';
    ungKy = 'Ngay trong ngày hôm nay; đặc biệt nhộn nhịp vào các khung giờ Thìn (07-09h), Tị (09-11h), Thân (15-17h), Dậu (17-19h)';

    const isAskingAmount = /(nhiều không|ít không|đông không|mấy cuộc|bao nhiêu)/i.test(qClean);

    if (changedName === 'Trạch Hỏa Cách') {
      directConclusion = `Về việc liên lạc / hotline "${question.trim()}": CÓ SỰ THAY ĐỔI LỚN VỀ PHƯƠNG THỨC LIÊN HỆ, SẼ CÓ NHỮNG CUỘC GỌI BẤT NGỜ HOẶC ĐỐI TÁC MỚI CHỦ ĐỘNG KẾT NỐI.`;
      dichLyDetails = `Quẻ gốc ${originalName} biến Trạch Hỏa Cách (Canh tân đổi mới) cho thấy kênh liên lạc sẽ có làn gió mới. Cần chuẩn bị kịch bản đón tiếp chu đáo để nắm bắt cơ hội.`;
    } else if (changedInfo.omen === 'hung') {
      directConclusion = `Về việc liên lạc / hotline "${question.trim()}": TRẢ LỜI LÀ KHÔNG / RẤT ÍT. ĐỐI PHƯƠNG ĐANG CỐ TÌNH NÉ TRÁNH HOẶC KÊNH LIÊN LẠC BỊ GIÁN ĐOẠN, KHÔNG NÊN MẤT CÔNG CHỜ ĐỢI.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} lâm Điềm Hung. Phụ Mẫu suy bại, Ứng Hào tương khắc, báo hiệu tin tức bị đình trệ hoặc nhận tin xấu không vui.`;
    } else if (isChangedAuspicious) {
      if (isAskingAmount) {
        directConclusion = `Về việc hotline / cuộc gọi "${question.trim()}": TRẢ LỜI LÀ CÓ VÀ SẼ KHÁ NHIỀU. Lượng cuộc gọi, tin nhắn và yêu cầu liên hệ hôm nay sẽ dồn dập, khởi sắc vượt mức thường lệ.`;
      } else {
        directConclusion = `Về việc hotline / cuộc gọi "${question.trim()}": CÓ PHẢN HỒI RẤT TÍCH CỰC, NGƯỜI CẦN TÌM HOẶC KHÁCH HÀNG SẼ CHỦ ĐỘNG GỌI ĐIỆN VÀ TRAO ĐỔI THUẬN LỢI.`;
      }
      dichLyDetails = `Quẻ gốc ${originalName} động hào ${movingLine} biến sang ${changedName} (${changedInfo.nature}). Hào Phụ Mẫu (tin tức) đắc lệnh, Hào Ứng (người gọi) có thiện cảm sinh trợ Thế Hào, báo hiệu các cuộc gọi và kênh hotline hôm nay tương tác rất thuận lợi, mang lại cơ hội tốt.`;
    } else {
      directConclusion = `Về việc hotline / cuộc gọi "${question.trim()}": LƯỢNG CUỘC GỌI HÔM NAY CÓ THỂ ĐẾN RẢI RÁC HOẶC ĐẾN CHẬM VÀO CUỐI NGÀY; NÊN CHỦ ĐỘNG KIỂM TRA MÁY VÀ GỌI LẠI NẾU CẦN.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} cho thấy thông tin chưa dồn dập ngay buổi sớm. Hãy chủ động rà soát danh sách liên hệ để tạo thêm kết nối.`;
    }

  } else if (isBusinessCustomers) {
    subject = 'Tử Tôn (Nguồn Khách & Sinh Tài) phối Thê Tài (Doanh Số)';
    targetName = 'Lượng khách hàng / Đơn hàng / Sức mua';
    state = isChangedAuspicious ? 'Tử Tôn Trì Thế, Khách Hàng Nườm Nượp, Đơn Hàng Hanh Thông' : 'Sức Mua Chậm Lại, Cần Tăng Cường Tiếp Thị';
    explanation = 'Trong Lục Hào: Tử Tôn là nguồn sinh ra Tài lộc (chính là khách hàng), Thê Tài là doanh thu và tiền hàng.';
    ungKy = 'Trong ngày hôm nay hoặc các ngày tới vào giờ Thìn, Thân, Dậu';

    if (changedInfo.omen === 'hung') {
      directConclusion = `Về lượng khách / bán hàng "${question.trim()}": BUÔN BÁN Ế ẨM, KHÁCH HÀNG VẮNG VẺ HOẶC BỊ HỦY ĐƠN HÀNG HÀNG LOẠT; CẦN RÀ SOÁT LẠI CHẤT LƯỢNG SẢN PHẨM VÀ DỊCH VỤ.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} (${changedInfo.nature}) lâm Điềm Hung. Tử Tôn tuyệt khí, nguồn khách bị đóng băng.`;
    } else if (isChangedAuspicious) {
      directConclusion = `Về lượng khách / bán hàng "${question.trim()}": KHÁCH HÀNG SẼ ĐÔNG ĐÚC VÀ TƯƠNG TÁC TỐT, ĐƠN HÀNG VÀ DOANH THU CÓ CHIỀU HƯỚNG TĂNG TRƯỞNG RÕ RỆT.`;
      dichLyDetails = `Quẻ gốc ${originalName} biến ${changedName} (${changedInfo.nature}) mang lại sinh khí tốt đẹp cho việc kinh doanh, buôn may bán đắt.`;
    } else {
      directConclusion = `Về lượng khách "${question.trim()}": KHÁCH CÓ THỂ ĐẾN CHẬM HOẶC XEM NHIỀU HƠN MUA; NÊN CHĂM SÓC KHÁCH HÀNG NHIỆT TÌNH ĐỂ TẠO THIỆN CẢM.`;
      dichLyDetails = `Quẻ biến ${changedName} khuyên kiên nhẫn, tối ưu dịch vụ và giữ thái độ niềm nở.`;
    }

  } else if (isDailyLuck) {
    subject = 'Nhật Thần & Thế Hào (Vận Khí Bản Thân Trong Ngày)';
    targetName = 'Vận may & Năng lượng hôm nay';
    state = isChangedAuspicious ? 'Nhật Thần Tương Trợ, Vận Khí Sáng Sủa' : 'Khí Thế Cần Cân Bằng, Tránh Nóng Vội';
    explanation = 'Chiêm vận khí ngày lấy Nhật Thần phối hợp cùng Thế hào để thẩm định sinh khắc.';
    ungKy = 'Trong suốt ngày hôm nay từ sáng đến tối';

    if (changedInfo.omen === 'hung') {
      directConclusion = `Về ngày hôm nay "${question.trim()}": CẢNH BÁO MỘT NGÀY DỄ GẶP TRẮC TRỞ, BẤT HÒA HOẶC HAO TÀI TỐN CỦA; HẾT SỨC CẨN THẬN ĐI LẠI VÀ TRÁNH TRANH CÃI VỚI NGƯỜI KHÁC.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} lâm hung tượng. Trường khí trong ngày xung khắc Thế Hào. Lời khuyên: Giữ mình an phận, tránh xa thị phi.`;
    } else if (isChangedAuspicious) {
      directConclusion = `Về vận may hôm nay "${question.trim()}": HÔM NAY LÀ MỘT NGÀY THUẬN LỢI, NĂNG LƯỢNG TÍCH CỰC, NHIỀU VIỆC HANH THÔNG NHƯ Ý NGUYỆN.`;
      dichLyDetails = `Quẻ ${originalName} biến ${changedName} (${changedInfo.nature}) mang lại vận may và tinh thần phấn chấn.`;
    } else {
      directConclusion = `Về ngày hôm nay "${question.trim()}": NÊN GIỮ TÂM BÌNH THẢN, LÀM VIỆC CẨN THẬN THEO KẾ HOẠCH, TRÁNH ĐƯA RA QUYẾT ĐỊNH NÓNG VỘI.`;
      dichLyDetails = `Quẻ biến ${changedName} nhắc nhở giữ gìn năng lượng và điều hòa thân tâm.`;
    }

  } else {
    // CÁC CÂU HỎI TỔNG QUÁT KHÁC (LUẬN GIẢI CHUYÊN BIỆT THEO DẠNG CÂU HỎI VÀ CẶP QUẺ)
    subject = 'Thế Hào (Chủ Thể Vấn Đề)';
    targetName = `Sự việc "${question.trim()}"`;
    state = isChangedAuspicious ? 'Thời Vận Khởi Sắc, Lâm Cát Địa' : 'Thời Vận Đang Chuyển Hóa, Cần Linh Hoạt';
    explanation = `Lấy Thế hào làm trung tâm xem xét sự tương tác giữa quẻ Chủ (${originalName}) và quẻ Biến (${changedName}).`;
    ungKy = 'Trong vòng tuần tới hoặc vào tiết khí tiếp theo';

    const generalResult = synthesizeGeneralVerdict(question, originalName, origInfo, changedName, changedInfo, movingLine, ungKy);
    directConclusion = generalResult.directConclusion;
    dichLyDetails = generalResult.dichLyDetails;
  }

  // Tạo đoạn văn phán của Thầy đầy đủ, trang trọng, 100% tiếng Việt chuẩn
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
