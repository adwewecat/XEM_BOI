/**
 * BỘ BÀI TAROT PHƯƠNG TÂY (RIDER-WAITE-SMITH 22 ẨN CHÍNH - MAJOR ARCANA)
 * Hệ thống chiêm đoán Tarot chuẩn quốc tế kết hợp Chiêm Tinh & Biểu tượng học.
 * Hỗ trợ trải bài 1 lá (Quick Draw) và trải bài 3 lá (Quá khứ - Hiện tại - Tương lai / Tình yêu).
 * 100% Tiếng Việt chuẩn mực, chi tiết từng phương diện cuộc đời.
 */

export interface TarotCardData {
  id: number;
  name: string;        // Tên tiếng Anh (The Fool, The Magician...)
  nameVi: string;      // Tên tiếng Việt (Chàng Khờ, Pháp Sư...)
  roman: string;       // 0, I, II, III...
  element: 'Khí' | 'Lửa' | 'Nước' | 'Đất';
  planetOrZodiac: string; // Sao Thiên Vương, Bạch Dương, Cự Giải...
  symbol: string;      // Biểu tượng nghệ thuật (🌟, 🧙, 👑...)
  colorTheme: string;  // Màu sắc chủ đạo (from-amber-500, from-indigo-500...)
  keywordsUpright: string[];
  keywordsReversed: string[];
  upright: {
    summary: string;
    career: string;
    love: string;
    finance: string;
    advice: string;
  };
  reversed: {
    summary: string;
    career: string;
    love: string;
    finance: string;
    advice: string;
  };
}

export const MAJOR_ARCANA: TarotCardData[] = [
  {
    id: 0,
    name: 'The Fool',
    nameVi: 'Chàng Khờ',
    roman: '0',
    element: 'Khí',
    planetOrZodiac: 'Sao Thiên Vương (Uranus)',
    symbol: '🎒',
    colorTheme: 'from-amber-400 via-yellow-300 to-amber-500',
    keywordsUpright: ['Khởi đầu mới', 'Ngây thơ', 'Tự do', 'Dấn thân', 'Tiềm năng vô hạn'],
    keywordsReversed: ['Liều lĩnh', 'Bất cẩn', 'Nông nổi', 'Do dự', 'Thiếu chuẩn bị'],
    upright: {
      summary: 'Khởi đầu một hành trình mới đầy hứng khởi. Hãy tin vào tiếng gọi của trực giác và dũng cảm bước qua vùng an toàn.',
      career: 'Cơ hội việc làm mới hoặc dự án mạo hiểm đầy hứa hẹn. Đừng ngại học hỏi từ con số 0.',
      love: 'Một mối quan hệ mới tự phát, lãng mạn và ngập tràn niềm vui tươi trẻ.',
      finance: 'Thời điểm thuận lợi để bắt đầu kế hoạch tài chính mới, nhưng cần chi tiêu có ý thức.',
      advice: 'Hãy giữ tâm thế cởi mở như một đứa trẻ, vũ trụ luôn che chở cho những bước chân dũng cảm.',
    },
    reversed: {
      summary: 'Hành động bốc đồng thiếu tính toán, hoặc ngược lại là sự ngần ngại không dám nắm bắt cơ hội.',
      career: 'Đề phòng những quyết định nhảy việc vội vàng hoặc ký kết hợp đồng khi chưa hiểu rõ điều khoản.',
      love: 'Mối quan hệ thiếu cam kết, một trong hai bên còn ham vui và chưa sẵn sàng cho tương lai.',
      finance: 'Chi tiêu bốc đồng cho những sở thích nhất thời gây hao hụt ngân sách.',
      advice: 'Hãy chậm lại một nhịp, nhìn kỹ mặt đất dưới chân trước khi nhảy qua vực thẳm.',
    },
  },
  {
    id: 1,
    name: 'The Magician',
    nameVi: 'Pháp Sư',
    roman: 'I',
    element: 'Khí',
    planetOrZodiac: 'Sao Thủy (Mercury)',
    symbol: '🪄',
    colorTheme: 'from-yellow-500 via-amber-400 to-rose-500',
    keywordsUpright: ['Biến hóa', 'Ý chí mạnh mẽ', 'Tài năng xuất chúng', 'Hành động', 'Hiện thực hóa'],
    keywordsReversed: ['Thao túng', 'Lãng phí tài năng', 'Ảo tưởng', 'Gian dối', 'Tắc nghẽn ý tưởng'],
    upright: {
      summary: 'Bạn nắm trong tay mọi công cụ và nguồn lực cần thiết để biến ước mơ thành hiện thực.',
      career: 'Kỹ năng chuyên môn và tài ăn nói giúp bạn chinh phục mọi đối tác và thăng tiến vượt bậc.',
      love: 'Sức hút cá nhân mãnh liệt, chủ động bày tỏ tình cảm và tạo dựng mối quan hệ hòa hợp.',
      finance: 'Khả năng kiếm tiền nhạy bén, biến ý tưởng sáng tạo thành lợi nhuận thực tế.',
      advice: 'Tập trung toàn bộ ý chí và tài năng vào mục tiêu trọng tâm; bạn chính là người tạo ra phép màu cho đời mình.',
    },
    reversed: {
      summary: 'Đang có sự lãng phí tiềm năng hoặc dùng trí thông minh sai mục đích.',
      career: 'Cẩn thận với những lời hứa hẹn suông của đối tác hoặc đồng nghiệp có ý đồ thao túng.',
      love: 'Thiếu sự chân thành, có dấu hiệu che giấu cảm xúc thật hoặc lừa dối đối phương.',
      finance: 'Tránh xa các chiêu trò kiếm tiền mờ ám hoặc các khóa học làm giàu cấp tốc không rõ ràng.',
      advice: 'Hãy tự vấn lương tâm và đưa năng lượng sáng tạo trở về với con đường chính đạo.',
    },
  },
  {
    id: 2,
    name: 'The High Priestess',
    nameVi: 'Nữ Tư Tế',
    roman: 'II',
    element: 'Nước',
    planetOrZodiac: 'Mặt Trăng (Moon)',
    symbol: '🌙',
    colorTheme: 'from-blue-600 via-indigo-500 to-sky-400',
    keywordsUpright: ['Trực giác', 'Bí ẩn', 'Tiềm thức', 'Minh triết nội tâm', 'Tĩnh lặng'],
    keywordsReversed: ['Che giấu', 'Nghi ngờ trực giác', 'Hời hợt', 'Bất an', 'Bí mật lộ tẩy'],
    upright: {
      summary: 'Thời điểm lắng nghe tiếng nói tĩnh lặng bên trong. Trực giác của bạn đang ở đỉnh cao của sự chuẩn xác.',
      career: 'Nên quan sát và phân tích ngầm thay vì hành động phô trương; giữ kín kế hoạch chiến lược.',
      love: 'Mối liên kết tâm hồn sâu sắc, tình cảm kín đáo nhưng mãnh liệt và thấu hiểu không cần lời nói.',
      finance: 'Không nên vội vàng đầu tư; hãy tìm hiểu kỹ các chi tiết ẩn đằng sau hợp đồng.',
      advice: 'Tĩnh tâm thiền định và tin tưởng vào linh cảm đầu tiên của bạn; câu trả lời đã có sẵn trong tâm.',
    },
    reversed: {
      summary: 'Bỏ qua trực giác hoặc bị cuốn vào những tin đồn, thị phi giấu mặt.',
      career: 'Có những thông tin quan trọng đang bị cấp trên hoặc đối tác giữ kín chưa công bố.',
      love: 'Khoảng cách cảm xúc, thiếu cởi mở khiến hai người ngày càng xa cách.',
      finance: 'Cẩn trọng với những điều khoản ẩn trong các giao dịch tài chính.',
      advice: 'Đừng để tiếng ồn bên ngoài làm lu mờ sự sáng suốt của lương tri bên trong.',
    },
  },
  {
    id: 3,
    name: 'The Empress',
    nameVi: 'Nữ Hoàng',
    roman: 'III',
    element: 'Đất',
    planetOrZodiac: 'Sao Kim (Venus)',
    symbol: '👑',
    colorTheme: 'from-emerald-500 via-teal-400 to-amber-400',
    keywordsUpright: ['Trù phú', 'Sinh sôi', 'Nuôi dưỡng', 'Cái đẹp', 'Tình mẫu tử'],
    keywordsReversed: ['Nuông chiều thái quá', 'Tắc nghẽn sáng tạo', 'Phụ thuộc', 'Bỏ bê bản thân'],
    upright: {
      summary: 'Thời kỳ bội thu, sung túc và tràn đầy năng lượng nuôi dưỡng yêu thương.',
      career: 'Các dự án đơm hoa kết trái, môi trường làm việc hài hòa và giàu tính thẩm mỹ.',
      love: 'Tình yêu viên mãn, ngọt ngào, có tin vui về hôn nhân hoặc chào đón thành viên mới.',
      finance: 'Tài chính dồi dào, thu nhập tăng trưởng ổn định từ những nỗ lực đã vun trồng.',
      advice: 'Hãy chăm sóc bản thân và kết nối với thiên nhiên; lòng biết ơn sẽ mang lại thêm nhiều phúc lành.',
    },
    reversed: {
      summary: 'Cảm giác kiệt sức vì lo lắng cho người khác quá nhiều mà bỏ quên chính mình.',
      career: 'Ý tưởng sáng tạo bị bế tắc, môi trường công việc thiếu sự nâng đỡ tương trợ.',
      love: 'Kiểm soát đối phương quá mức hoặc cảm thấy thiếu thốn sự quan tâm chăm sóc.',
      finance: 'Mua sắm giải tỏa cảm xúc gây thâm hụt tài chính gia đình.',
      advice: 'Học cách yêu lấy chính mình trước tiên; bạn không thể rót nước từ một chiếc bình rỗng.',
    },
  },
  {
    id: 4,
    name: 'The Emperor',
    nameVi: 'Hoàng Đế',
    roman: 'IV',
    element: 'Lửa',
    planetOrZodiac: 'Bạch Dương (Aries)',
    symbol: '🏛️',
    colorTheme: 'from-red-600 via-orange-500 to-amber-600',
    keywordsUpright: ['Quyền lực', 'Trật tự', 'Kỷ luật', 'Bảo vệ', 'Cấu trúc vững chãi'],
    keywordsReversed: ['Độc đoán', 'Bảo thủ', 'Cứng nhắc', 'Mất kiểm soát', 'Lạm quyền'],
    upright: {
      summary: 'Thiết lập trật tự, kỷ cương và làm chủ hoàn toàn vận mệnh của mình bằng lý trí vững vàng.',
      career: 'Vị thế lãnh đạo vững chắc, được cấp trên tín nhiệm giao quyền điều hành dự án lớn.',
      love: 'Mối quan hệ nghiêm túc, an toàn, đối phương là điểm tựa vững chãi và đáng tin cậy.',
      finance: 'Quản lý tài chính bài bản, xây dựng ngân sách dự phòng an toàn tuyệt đối.',
      advice: 'Lấy kỷ luật làm sức mạnh; sự quyết đoán và tinh thần trách nhiệm sẽ đưa bạn lên đỉnh cao.',
    },
    reversed: {
      summary: 'Sự kiểm soát ngột ngạt hoặc cảm giác bất lực trước sự xáo trộn xung quanh.',
      career: 'Mâu thuẫn với cấp trên độc đoán hoặc bản thân quá cứng nhắc không chịu đổi mới quy trình.',
      love: 'Mối quan hệ ngột ngạt vì sự gia trưởng và áp đặt quan điểm.',
      finance: 'Quản lý tiền bạc quá hà khắc hoặc bị người khác thâu tóm quyền lợi tài chính.',
      advice: 'Lắng nghe ý kiến người khác; người lãnh đạo vĩ đại dùng sự công tâm chứ không dùng áp chế.',
    },
  },
  {
    id: 5,
    name: 'The Hierophant',
    nameVi: 'Giáo Hoàng',
    roman: 'V',
    element: 'Đất',
    planetOrZodiac: 'Kim Ngưu (Taurus)',
    symbol: '📜',
    colorTheme: 'from-amber-600 via-yellow-600 to-stone-700',
    keywordsUpright: ['Truyền thống', 'Trí tuệ cổ xưa', 'Đạo đức', 'Học hỏi', 'Người dẫn dắt'],
    keywordsReversed: ['Nổi loạn', 'Giáo điều', 'Mù quáng', 'Phá vỡ quy chuẩn', 'Mất niềm tin'],
    upright: {
      summary: 'Tìm về các giá trị truyền thống, tìm kiếm lời khuyên từ người thầy hoặc cố vấn giàu kinh nghiệm.',
      career: 'Thành công khi tuân thủ đúng quy trình chuẩn hóa của tổ chức lớn, tập đoàn uy tín.',
      love: 'Tình cảm hướng đến cam kết hôn nhân truyền thống, hai bên gia đình đồng thuận ủng hộ.',
      finance: 'Đầu tư an toàn vào các kênh chính thống, ngân hàng và tài sản có giá trị bảo tồn lâu dài.',
      advice: 'Tôn trọng truyền thống và tìm cho mình một người thầy minh triết để dẫn đường mở lối.',
    },
    reversed: {
      summary: 'Cảm giác bị trói buộc bởi những giáo điều lỗi thời, mong muốn phá cách.',
      career: 'Môi trường làm việc bảo thủ kìm hãm sự sáng tạo; cần tìm cách linh hoạt vượt rào.',
      love: 'Bất đồng quan điểm về định kiến xã hội hoặc áp lực từ gia đình hai bên.',
      finance: 'Cẩn trọng với những lời khuyên tài chính từ những "chuyên gia" tự xưng.',
      advice: 'Giữ lại cốt lõi đạo đức nhưng dũng cảm đổi mới phương pháp để phù hợp với thời đại.',
    },
  },
  {
    id: 6,
    name: 'The Lovers',
    nameVi: 'Người Yêu',
    roman: 'VI',
    element: 'Khí',
    planetOrZodiac: 'Song Tử (Gemini)',
    symbol: '💑',
    colorTheme: 'from-pink-500 via-rose-400 to-amber-300',
    keywordsUpright: ['Tình yêu sâu sắc', 'Hòa hợp', 'Lựa chọn đạo đức', 'Gắn kết tri kỷ', 'Đồng điệu'],
    keywordsReversed: ['Bất hòa', 'Lựa chọn sai lầm', 'Mâu thuẫn giá trị', 'Mất kết nối', 'Rạn nứt'],
    upright: {
      summary: 'Sự hòa hợp tuyệt đối giữa hai tâm hồn, hoặc một ngã rẽ cuộc đời đòi hỏi sự lựa chọn theo tiếng gọi con tim.',
      career: 'Hợp tác làm ăn ăn ý, tìm được cộng sự có cùng chí hướng và bổ trợ hoàn hảo cho nhau.',
      love: 'Tình yêu thăng hoa, gặp được tri kỷ đích thực, cảm xúc gắn bó keo sơn.',
      finance: 'Cân bằng tài chính tốt, có thể cùng đối tác hoặc bạn đời chung vốn phát triển.',
      advice: 'Hãy lựa chọn bằng cả trái tim và lý trí; sự trung thực là nền móng cho mọi gắn kết bền lâu.',
    },
    reversed: {
      summary: 'Đứng trước ngã ba đường mà tâm trí phân vân, hoặc mâu thuẫn trong các mối quan hệ thân cận.',
      career: 'Bất đồng quan điểm sâu sắc với đối tác kinh doanh khiến dự án bị ngưng trệ.',
      love: 'Giao tiếp thiếu thấu hiểu dẫn đến hiểu lầm, rạn nứt cảm xúc.',
      finance: 'Bất đồng về việc phân chia chi tiêu hoặc lợi nhuận trong hợp tác.',
      advice: 'Hãy thẳng thắn đối thoại để tìm lại tiếng nói chung; đừng trốn tránh quyết định quan trọng.',
    },
  },
  {
    id: 7,
    name: 'The Chariot',
    nameVi: 'Cỗ Xe Chiến Thắng',
    roman: 'VII',
    element: 'Nước',
    planetOrZodiac: 'Cự Giải (Cancer)',
    symbol: '🛡️',
    colorTheme: 'from-amber-500 via-yellow-500 to-blue-600',
    keywordsUpright: ['Ý chí sắt đá', 'Chiến thắng', 'Tiến về phía trước', 'Tự chủ', 'Vượt chướng ngại'],
    keywordsReversed: ['Mất phương hướng', 'Hung hăng', 'Bế tắc', 'Nóng vội', 'Thiếu kiểm soát'],
    upright: {
      summary: 'Vượt qua mọi thử thách bằng ý chí phi thường và sự tập trung cao độ; chiến thắng đang trong tầm tay.',
      career: 'Bứt phá mạnh mẽ trong công việc, đánh bại đối thủ cạnh tranh và khẳng định vị thế dẫn đầu.',
      love: 'Chủ động chinh phục người mình yêu bằng sự kiên trì và bản lĩnh chân thành.',
      finance: 'Kiểm soát dòng tiền chặt chẽ, thu hoạch thành quả từ sự quyết đoán đầu tư.',
      advice: 'Giữ vững tay lái; đừng để cảm xúc nhất thời làm chệch hướng mục tiêu vĩ đại của bạn.',
    },
    reversed: {
      summary: 'Cảm giác mất kiểm soát hoặc đang dùng quá nhiều sức lực vào việc không mang lại kết quả.',
      career: 'Nóng vội đốt cháy giai đoạn dẫn đến sai sót kỹ thuật hoặc xung đột gay gắt.',
      love: 'Áp đảo đối phương bằng cái tôi quá lớn khiến người ấy cảm thấy bị tổn thương.',
      finance: 'Chi tiêu vượt tầm kiểm soát hoặc đầu tư mạo hiểm khi chưa nắm chắc thời cơ.',
      advice: 'Dừng lại hít một hơi thật sâu, chấn chỉnh nội bộ trước khi tiếp tục xuất trận.',
    },
  },
  {
    id: 8,
    name: 'Strength',
    nameVi: 'Sức Mạnh Nội Tâm',
    roman: 'VIII',
    element: 'Lửa',
    planetOrZodiac: 'Sư Tử (Leo)',
    symbol: '🦁',
    colorTheme: 'from-amber-400 via-orange-400 to-yellow-500',
    keywordsUpright: ['Lòng can đảm', 'Nhu thắng cương', 'Kiên nhẫn', 'Từ bi', 'Thu phục thú dữ'],
    keywordsReversed: ['Tự ti', 'Yếu lòng', 'Nóng giận mất khôn', 'Mất kiên nhẫn', 'Kiệt sức'],
    upright: {
      summary: 'Sức mạnh đích thực không nằm ở bạo lực mà ở sự bao dung, điềm tĩnh và lòng kiên nhẫn thuần hóa nghịch cảnh.',
      career: 'Xử lý các tình huống khó khăn bằng sự khéo léo và điềm đạm, được đồng nghiệp nể phục.',
      love: 'Tình cảm sâu sắc, dùng sự dịu dàng và lòng vị tha để hóa giải mọi khúc mắc.',
      finance: 'Kỷ luật tài chính tốt, kiểm soát được lòng tham và sự nôn nóng làm giàu nhanh.',
      advice: 'Lấy nhu thắng cương, lấy đức phục người; bạn mạnh mẽ hơn bạn tưởng rất nhiều.',
    },
    reversed: {
      summary: 'Nỗi sợ hãi và tự ti làm xói mòn niềm tin vào năng lực của bản thân.',
      career: 'Dễ nản lòng trước áp lực hoặc để cơn giận bộc phát làm hỏng việc lớn.',
      love: 'Nghi ngờ giá trị bản thân, để cảm xúc bất an chi phối hành động.',
      finance: 'Thiếu kiên nhẫn trong việc tích lũy tài chính, dễ vung tay quá trán.',
      advice: 'Học cách tha thứ cho chính mình; hãy đánh thức ngọn lửa can đảm đang ngủ yên trong tim.',
    },
  },
  {
    id: 9,
    name: 'The Hermit',
    nameVi: 'Ẩn Sĩ',
    roman: 'IX',
    element: 'Đất',
    planetOrZodiac: 'Xử Nữ (Virgo)',
    symbol: '🏮',
    colorTheme: 'from-slate-600 via-indigo-900 to-amber-300',
    keywordsUpright: ['Chiêm nghiệm', 'Tìm kiếm chân lý', 'Tĩnh lặng', 'Soi sáng nội tâm', 'Minh triết'],
    keywordsReversed: ['Cô độc', 'Lập dị', 'Tách biệt', 'Cố chấp', 'Khép kín quá mức'],
    upright: {
      summary: 'Khoảng lặng cần thiết để soi rọi nội tâm, tự học hỏi và tìm ra chân lý cho cuộc đời.',
      career: 'Thời kỳ nghiên cứu chuyên sâu, nâng cao trình độ chuyên môn, làm việc độc lập đạt hiệu quả cao.',
      love: 'Cần không gian riêng để suy ngẫm về giá trị thực sự của mối quan hệ; người độc thân trân trọng sự tự do.',
      finance: 'Chi tiêu giản dị, tiết kiệm, tập trung đầu tư cho tri thức và chiều sâu tâm hồn.',
      advice: 'Ánh sáng ngọn đèn trí tuệ của bạn sẽ soi đường cho chính bạn và những người hữu duyên.',
    },
    reversed: {
      summary: 'Thu mình quá mức thành cô độc, từ chối sự giúp đỡ chân tình của người khác.',
      career: 'Tự cô lập bản thân trong tập thể, ngại giao tiếp và chia sẻ công việc.',
      love: 'Khép chặt cánh cửa trái tim, không cho người khác cơ hội thấu hiểu.',
      finance: 'Quá tằn tiện hoặc lo lắng thái quá về sự an toàn tiền bạc trong tương lai.',
      advice: 'Bước ra ngoài ánh sáng mặt trời; chia sẻ sự thông tuệ của bạn với thế giới.',
    },
  },
  {
    id: 10,
    name: 'Wheel of Fortune',
    nameVi: 'Bánh Xe Số Phận',
    roman: 'X',
    element: 'Lửa',
    planetOrZodiac: 'Sao Mộc (Jupiter)',
    symbol: '☸️',
    colorTheme: 'from-amber-500 via-yellow-400 to-purple-600',
    keywordsUpright: ['Bước ngoặt vận mệnh', 'May mắn', 'Chu kỳ đổi thay', 'Nhân quả', 'Thời cơ chín muồi'],
    keywordsReversed: ['Vận rủi tạm thời', 'Chống cự đổi thay', 'Bỏ lỡ thời cơ', 'Vòng luẩn quẩn'],
    upright: {
      summary: 'Thời vận xoay chuyển bất ngờ theo chiều hướng tích cực; cơ hội vàng sắp gõ cửa.',
      career: 'Bước ngoặt thăng tiến vượt bậc, gặp được quý nhân phù trợ mang đến cơ hội ngàn vàng.',
      love: 'Duyên phận tiền định, gặp gỡ tình cờ nhưng gắn kết sâu sắc như đã hẹn từ trước.',
      finance: 'Tài lộc bất ngờ, các khoản đầu tư trước đây bắt đầu sinh lời mạnh mẽ.',
      advice: 'Thuận theo dòng chảy của vũ trụ; nắm bắt ngay khi thời cơ xuất hiện vì bánh xe luôn quay không ngừng.',
    },
    reversed: {
      summary: 'Gặp phải một khúc quanh trắc trở tạm thời; cần kiên nhẫn chờ thời vận tốt quay trở lại.',
      career: 'Dự án gặp trở ngại bất ngờ do yếu tố khách quan ngoài tầm kiểm soát.',
      love: 'Thời điểm chưa thích hợp để đưa ra các quyết định hệ trọng; hãy để thời gian thử thách.',
      finance: 'Tránh mạo hiểm tài chính trong lúc này; giữ chặt ngân sách dự phòng.',
      advice: 'Họa là chỗ dựa của phúc, phúc là chỗ nấp của họa; giữ tâm an định giữa mọi thăng trầm.',
    },
  },
  {
    id: 11,
    name: 'Justice',
    nameVi: 'Công Lý',
    roman: 'XI',
    element: 'Khí',
    planetOrZodiac: 'Thiên Bình (Libra)',
    symbol: '⚖️',
    colorTheme: 'from-sky-500 via-indigo-600 to-amber-400',
    keywordsUpright: ['Công bằng', 'Sự thật', 'Nhân quả', 'Quyết định sáng suốt', 'Chính trực'],
    keywordsReversed: ['Bất công', 'Thiên vị', 'Trốn tránh trách nhiệm', 'Phán xét sai lầm'],
    upright: {
      summary: 'Mọi sự thật sẽ được phơi bày dưới ánh sáng công lý; hành động ngay thẳng sẽ được đền đáp xứng đáng.',
      career: 'Hợp đồng pháp lý minh bạch, kết quả đánh giá năng lực công tâm và xứng đáng.',
      love: 'Mối quan hệ bình đẳng, tôn trọng lẫn nhau, giải quyết mọi hiểu lầm bằng sự chân thành.',
      finance: 'Các tranh chấp tài chính hoặc nợ nần được giải quyết êm đẹp và công bằng.',
      advice: 'Cân nhắc kỹ lưỡng mọi hệ quả trước khi quyết định; sự thật và chính đạo là kim chỉ nam tối thượng.',
    },
    reversed: {
      summary: 'Cảm giác bị đối xử thiếu công bằng hoặc đang tự dối lòng mình.',
      career: 'Đề phòng rủi ro pháp lý, tranh chấp hợp đồng hoặc sự thiếu minh bạch trong cơ quan.',
      love: 'Một bên cảm thấy cho đi quá nhiều mà không nhận lại sự trân trọng xứng đáng.',
      finance: 'Kiểm tra kỹ lưỡng các hóa đơn, giấy tờ kế toán để tránh thất thoát oan uổng.',
      advice: 'Dũng cảm nhận trách nhiệm về phần lỗi của mình; sự trung thực là cách duy nhất để tái lập cân bằng.',
    },
  },
  {
    id: 12,
    name: 'The Hanged Man',
    nameVi: 'Kẻ Treo Ngược',
    roman: 'XII',
    element: 'Nước',
    planetOrZodiac: 'Sao Hải Vương (Neptune)',
    symbol: '🙃',
    colorTheme: 'from-teal-600 via-cyan-500 to-indigo-800',
    keywordsUpright: ['Buông bỏ', 'Đổi góc nhìn', 'Tạm ngưng', 'Hiến dâng', 'Giác ngộ mới'],
    keywordsReversed: ['Hy sinh vô ích', 'Bế tắc', 'Trì hoãn', 'Cố chấp níu kéo'],
    upright: {
      summary: 'Dừng lại để nhìn thế giới theo một góc độ hoàn toàn mới; buông bỏ chấp niệm để giải phóng tâm hồn.',
      career: 'Dự án tạm thời đình trệ để hoàn thiện chất lượng; cơ hội tái cấu trúc tư duy chiến lược.',
      love: 'Chấp nhận hy sinh cái tôi nhỏ nhen để cứu vãn và nâng tầm mối quan hệ.',
      finance: 'Tạm thời kiềm chế việc mở rộng tài chính; đây là lúc tái cơ cấu dòng tiền.',
      advice: 'Đôi khi lùi một bước là để tiến ba bước; hãy nhìn nhận vấn đề từ góc nhìn ngược lại.',
    },
    reversed: {
      summary: 'Cảm thấy mình là nạn nhân hoặc đang hy sinh vì những điều không xứng đáng.',
      career: 'Dậm chân tại chỗ vì sợ hãi sự thay đổi; trì hoãn các quyết định dứt khoát.',
      love: 'Mối quan hệ độc hại kéo dài mà không bên nào dám dũng cảm buông tay.',
      finance: 'Đổ tiền vào những dự án không còn triển vọng chỉ vì tiếc vốn đã bỏ ra.',
      advice: 'Tự cởi bỏ sợi dây trói buộc chính mình; bạn hoàn toàn có quyền đứng dậy và bước tiếp.',
    },
  },
  {
    id: 13,
    name: 'Death',
    nameVi: 'Cái Chết & Tái Sinh',
    roman: 'XIII',
    element: 'Nước',
    planetOrZodiac: 'Bọ Cạp (Scorpio)',
    symbol: '💀',
    colorTheme: 'from-zinc-900 via-purple-950 to-amber-500',
    keywordsUpright: ['Kết thúc chu kỳ cũ', 'Tái sinh', 'Lột xác', 'Chuyển hóa sâu sắc', 'Mở ra cánh cửa mới'],
    keywordsReversed: ['Chống cự đổi thay', 'Bám víu quá khứ', 'Sợ hãi chia ly', 'Trì trệ bế tắc'],
    upright: {
      summary: 'Một cánh cửa cũ khép lại để mở ra một khởi đầu mới rực rỡ hơn; sự lột xác hoàn toàn để bước sang chương mới.',
      career: 'Chấm dứt công việc cũ không còn phù hợp để chuyển hướng sang lĩnh vực mới đầy tiềm năng.',
      love: 'Buông bỏ những tổn thương quá khứ hoặc kết thúc êm đẹp mối quan hệ không còn tương lai để đón nhận duyên lành mới.',
      finance: 'Thanh lý các khoản đầu tư cũ kém hiệu quả, tái thiết lập nền tảng tài chính hoàn toàn mới.',
      advice: 'Đừng sợ hãi sự kết thúc; cái chết của chiếc kén chính là ngày sinh ra cánh bướm xinh đẹp.',
    },
    reversed: {
      summary: 'Cố chấp bám víu vào những thứ đã tàn lụi khiến bản thân đau khổ dai dẳng.',
      career: 'Ở lại một môi trường độc hại chỉ vì sợ cảm giác bất an khi bắt đầu lại.',
      love: 'Dằn vặt vì một mối tình đã qua, không chịu mở lòng đón nhận hạnh phúc mới.',
      finance: 'Kéo dài những thói quen tài chính sai lầm khiến nợ nần chồng chất.',
      advice: 'Hãy can đảm mở rộng bàn tay; buông bỏ những thứ không thuộc về mình là cách yêu thương bản thân tốt nhất.',
    },
  },
  {
    id: 14,
    name: 'Temperance',
    nameVi: 'Tiết Chế & Dung Hòa',
    roman: 'XIV',
    element: 'Lửa',
    planetOrZodiac: 'Nhân Mã (Sagittarius)',
    symbol: '🏺',
    colorTheme: 'from-sky-400 via-indigo-400 to-amber-300',
    keywordsUpright: ['Cân bằng', 'Tiết chế', 'Hòa hợp', 'Kiên nhẫn', 'Chữa lành toàn diện'],
    keywordsReversed: ['Mất cân bằng', 'Thái quá', 'Bất hòa', 'Thiếu kiên nhẫn', 'Xung đột'],
    upright: {
      summary: 'Nghệ thuật pha trộn hài hòa giữa hai thái cực; sự bình yên, chữa lành và kiên nhẫn tuyệt vời.',
      career: 'Khả năng dung hòa các ý kiến trái chiều trong nhóm, làm việc nhịp nhàng và bền bỉ.',
      love: 'Tình yêu êm dịu, bao dung, hai bên biết nhường nhịn và hòa hợp trong từng chi tiết nhỏ.',
      finance: 'Chi tiêu và tích lũy cân đối hoàn hảo, dòng tiền lưu thông êm ả vững chắc.',
      advice: 'Giữ tâm ở thế trung đạo; sự điều độ và hòa ái sẽ hàn gắn mọi vết thương và hóa giải nghịch cảnh.',
    },
    reversed: {
      summary: 'Sự thái quá hoặc mất cân bằng trong lối sống, công việc và cảm xúc.',
      career: 'Làm việc kiệt sức hoặc xung đột gay gắt vì không chịu lắng nghe đối phương.',
      love: 'Bất đồng quan điểm về phong cách sống, cảm xúc lúc nồng nhiệt lúc lạnh nhạt thất thường.',
      finance: 'Chi tiêu vượt thu nhập hoặc mất kiểm soát trong việc mua sắm xa xỉ.',
      advice: 'Tìm lại sự cân bằng trong nhịp sống hằng ngày; ăn ngủ điều độ và giảm bớt các áp lực không cần thiết.',
    },
  },
  {
    id: 15,
    name: 'The Devil',
    nameVi: 'Ác Quỷ & Ràng Buộc',
    roman: 'XV',
    element: 'Đất',
    planetOrZodiac: 'Ma Kết (Capricorn)',
    symbol: '⛓️',
    colorTheme: 'from-stone-900 via-red-950 to-amber-600',
    keywordsUpright: ['Ràng buộc', 'Cám dỗ', 'Ám ảnh vật chất', 'Thao túng', 'Ảo tưởng tự do'],
    keywordsReversed: ['Giải thoát', 'Thức tỉnh', 'Chặt đứt xiềng xích', 'Lấy lại quyền tự chủ'],
    upright: {
      summary: 'Nhận diện những xiềng xích vô hình do chính lòng tham, nỗi sợ hãi hoặc thói quen xấu trói buộc bạn.',
      career: 'Cảm giác bị giam cầm trong công việc vì thu nhập cao nhưng đánh mất tự do và đạo đức.',
      love: 'Mối quan hệ mang tính ám ảnh, ghen tuông mù quáng hoặc phụ thuộc cảm xúc độc hại.',
      finance: 'Bị cám dỗ vào các canh bạc tài chính, nợ nần vì chạy theo hào nhoáng bên ngoài.',
      advice: 'Chiếc xiềng xích quanh cổ bạn thực ra rất lỏng; chỉ cần bạn muốn, bạn có thể tự tháo bỏ nó ngay lập tức.',
    },
    reversed: {
      summary: 'Thời khắc thức tỉnh, nhận ra chân tướng sự việc và can đảm bước ra khỏi vòng kiềm tỏa.',
      career: 'Từ bỏ môi trường độc hại để tìm lại tự do và lý tưởng làm việc chân chính.',
      love: 'Chấm dứt mối quan hệ thao túng, giải thoát cho bản thân khỏi những đau khổ dằn vặt.',
      finance: 'Quyết tâm trả hết nợ nần và cắt đứt những khoản chi tiêu độc hại.',
      advice: 'Chúc mừng bạn đã giành lại quyền làm chủ cuộc đời mình; hãy bước tiếp với tâm thế kiêu hãnh.',
    },
  },
  {
    id: 16,
    name: 'The Tower',
    nameVi: 'Tòa Tháp Đổ',
    roman: 'XVI',
    element: 'Lửa',
    planetOrZodiac: 'Sao Hỏa (Mars)',
    symbol: '⚡',
    colorTheme: 'from-red-600 via-orange-600 to-stone-900',
    keywordsUpright: ['Sụp đổ bất ngờ', 'Giải phóng chấn động', 'Thức tỉnh đột ngột', 'Đập vỡ ảo tưởng'],
    keywordsReversed: ['Tránh được đại họa', 'Nấn ná trì hoãn', 'Sợ sụp đổ', 'Khủng hoảng âm ỉ'],
    upright: {
      summary: 'Một cú sốc bất ngờ phá tan những nền tảng giả tạo để bạn xây dựng lại trên sự thật vững chắc hơn.',
      career: 'Biến động lớn về cơ cấu công ty hoặc dự án đổ vỡ bất ngờ; cơ hội để làm lại từ đầu.',
      love: 'Sự thật vỡ lở làm thay đổi hoàn toàn cục diện mối quan hệ; giải thoát khỏi sự dối trá.',
      finance: 'Tổn thất tài chính đột ngột; cần bình tĩnh tái cấu trúc lại toàn bộ tài sản.',
      advice: 'Tòa tháp xây trên nền cát sụp đổ là điều tất yếu; hãy dọn dẹp đống đổ nát để dựng lên lâu đài kiên cố mới.',
    },
    reversed: {
      summary: 'Cố gắng giữ lại một cấu trúc đang rạn nứt hoặc né tránh một cuộc đối thoại không thể tránh khỏi.',
      career: 'Biết trước nguy cơ nhưng chần chừ không chịu chuẩn bị phương án dự phòng.',
      love: 'Duy trì một mối quan hệ trên danh nghĩa vì sợ hãi miệng đời.',
      finance: 'Trì hoãn giải quyết nợ nần khiến vấn đề ngày càng tích tụ nghiêm trọng.',
      advice: 'Đừng sợ hãi cơn giông bão; giông bão quét sạch bụi bặm để bầu trời trở nên trong xanh.',
    },
  },
  {
    id: 17,
    name: 'The Star',
    nameVi: 'Ngôi Sao Hy Vọng',
    roman: 'XVII',
    element: 'Khí',
    planetOrZodiac: 'Bảo Bình (Aquarius)',
    symbol: '⭐',
    colorTheme: 'from-sky-400 via-blue-500 to-amber-300',
    keywordsUpright: ['Hy vọng', 'Chữa lành', 'Cảm hứng dồi dào', 'Phúc lành', 'Niềm tin tái sinh'],
    keywordsReversed: ['Mất niềm tin', 'Thất vọng', 'Tuyệt vọng tạm thời', 'Bỏ cuộc quá sớm'],
    upright: {
      summary: 'Ngọn hải đăng của niềm tin và sự hy vọng; sau cơn mưa trời lại sáng, phúc lành đang tràn ngập đời bạn.',
      career: 'Tìm lại nguồn cảm hứng sáng tạo dồi dào, tương lai sự nghiệp rộng mở với nhiều triển vọng.',
      love: 'Tình cảm trong sáng, bình yên, sự kết nối tâm hồn chân thành và tràn đầy tin tưởng.',
      finance: 'Tài chính dần khởi sắc sau thời gian khó khăn, những khoản tiền mong đợi đang trở về.',
      advice: 'Hãy giữ vững niềm tin; vũ trụ đang mỉm cười và chuẩn bị trao tặng cho bạn những điều tuyệt vời nhất.',
    },
    reversed: {
      summary: 'Cảm giác mệt mỏi, bi quan, tạm thời đánh mất niềm tin vào bản thân và tương lai.',
      career: 'Mất phương hướng trong công việc, cảm thấy những cố gắng của mình không ai ghi nhận.',
      love: 'Thất vọng vì đối phương không hoàn hảo như kỳ vọng ban đầu.',
      finance: 'Chậm trễ trong các khoản thu nhập khiến tâm lý lo lắng bất an.',
      advice: 'Ngay trong đêm tối mịt mù nhất, những ngôi sao vẫn luôn tỏa sáng; đừng đánh mất ngọn lửa hy vọng trong tim.',
    },
  },
  {
    id: 18,
    name: 'The Moon',
    nameVi: 'Mặt Trăng & Ảo Ảnh',
    roman: 'XVIII',
    element: 'Nước',
    planetOrZodiac: 'Song Ngư (Pisces)',
    symbol: '🌕',
    colorTheme: 'from-indigo-950 via-purple-900 to-sky-400',
    keywordsUpright: ['Ảo mộng', 'Bất an', 'Nỗi sợ tiềm thức', 'Mơ hồ', 'Trực giác nhìn xuyên bóng tối'],
    keywordsReversed: ['Vén màn bí mật', 'Vượt qua nỗi sợ', 'Tỉnh ngộ', 'Sự thật sáng tỏ'],
    upright: {
      summary: 'Mọi thứ còn đang trong sương mù mờ ảo; chớ vội đưa ra quyết định hệ trọng khi chưa nhìn rõ sự thật.',
      career: 'Môi trường làm việc có nhiều thông tin nhiễu loạn hoặc sự cạnh tranh ngầm khó lường.',
      love: 'Cảm giác nghi ngờ, ghen tuông mơ hồ do trí tưởng tượng thêu dệt nên nỗi sợ.',
      finance: 'Tuyệt đối không tham gia các thương vụ mờ ám hoặc ký kết hợp đồng khi còn nhiều khúc mắc.',
      advice: 'Đừng để nỗi sợ hãi phóng đại của tâm trí dẫn dắt; hãy chờ bình minh lên khi mọi việc sáng rõ.',
    },
    reversed: {
      summary: 'Màn sương mù tan biến, sự thật được đưa ra ánh sáng và nỗi sợ hãi dần lắng dịu.',
      career: 'Nhận diện được ai là bạn ai là thù trong công việc, sáng tỏ hướng đi chiến lược.',
      love: 'Giải tỏa được những nghi kỵ, đối thoại chân thành để thấu hiểu nhau sâu sắc hơn.',
      finance: 'Phát hiện kịp thời sai sót tài chính để ngăn chặn nguy cơ tổn thất.',
      advice: 'Chào đón ánh sáng chân lý; nỗi sợ chỉ có sức mạnh khi bạn cho phép nó kiểm soát mình.',
    },
  },
  {
    id: 19,
    name: 'The Sun',
    nameVi: 'Mặt Trời Rực Rỡ',
    roman: 'XIX',
    element: 'Lửa',
    planetOrZodiac: 'Mặt Trời (Sun)',
    symbol: '☀️',
    colorTheme: 'from-amber-400 via-yellow-300 to-orange-500',
    keywordsUpright: ['Niềm vui', 'Thành công vang dội', 'Rạng rỡ', 'Sức sống mãnh liệt', 'Chân lý sáng ngời'],
    keywordsReversed: ['Kém vui tạm thời', 'Chậm trễ thành công', 'Kiêu ngạo', 'Cháy máy kiệt sức'],
    upright: {
      summary: 'Lá bài tích cực nhất trong bộ Tarot; ánh thái dương rực rỡ mang đến may mắn, thành công và niềm vui tột bậc.',
      career: 'Sự nghiệp thăng hoa rực rỡ, được vinh danh, gặt hái thành tựu lớn được mọi người công nhận.',
      love: 'Tình yêu tràn ngập tiếng cười, sự thấu hiểu tuyệt đối, hôn nhân ấm êm hạnh phúc.',
      finance: 'Tài chính thịnh vượng, kinh doanh phát đạt, dòng tiền dồi dào và minh bạch.',
      advice: 'Hãy tỏa sáng và lan tỏa năng lượng tích cực này đến tất cả mọi người xung quanh!',
    },
    reversed: {
      summary: 'Ánh mặt trời bị mây che mờ tạm thời; thành công có thể đến chậm hơn dự kiến một chút.',
      career: 'Đạt được kết quả tốt nhưng bản thân chưa thực sự thỏa mãn với chính mình.',
      love: 'Có chút hiểu lầm nhỏ làm giảm bớt không khí vui vẻ nhưng sẽ nhanh chóng qua đi.',
      finance: 'Thu nhập khả quan nhưng chi tiêu liên hoan chúc mừng hơi quá đà.',
      advice: 'Đừng nóng vội; mây đen sẽ sớm tan để ánh mặt trời ấm áp sưởi ấm cho bạn.',
    },
  },
  {
    id: 20,
    name: 'Judgement',
    nameVi: 'Phán Xét & Tái Sinh',
    roman: 'XX',
    element: 'Lửa',
    planetOrZodiac: 'Sao Diêm Vương (Pluto)',
    symbol: '🎺',
    colorTheme: 'from-sky-500 via-indigo-500 to-amber-300',
    keywordsUpright: ['Tiếng gọi sứ mệnh', 'Tái sinh', 'Đánh thức tiềm năng', 'Tha thứ', 'Bước ngoặt lớn'],
    keywordsReversed: ['Tự trách móc', 'Trốn tránh tiếng gọi', 'Do dự', 'Chậm chạp hối cải'],
    upright: {
      summary: 'Tiếng kèn thức tỉnh của định mệnh; bạn được kêu gọi bước lên một tầm cao mới của nhận thức và cuộc đời.',
      career: 'Tìm thấy tiếng gọi sứ mệnh đích thực của nghề nghiệp, được đền đáp xứng đáng cho những nỗ lực trong quá khứ.',
      love: 'Hàn gắn những rạn nứt bằng sự tha thứ chân thành, hoặc bước sang một chương mới của tình cảm.',
      finance: 'Giải quyết triệt để các vấn đề tài chính tồn đọng lâu năm, tái sinh dòng tiền mạnh mẽ.',
      advice: 'Hãy buông bỏ mặc cảm quá khứ và lắng nghe tiếng gọi từ tận sâu tâm hồn bạn; thời khắc tái sinh đã đến.',
    },
    reversed: {
      summary: 'Nghi ngờ bản thân, dằn vặt vì những sai lầm cũ và ngần ngại không dám trả lời tiếng gọi sứ mệnh.',
      career: 'Bỏ lỡ cơ hội thăng tiến vì đánh giá thấp năng lực của chính mình.',
      love: 'Nhắc lại chuyện cũ để chỉ trích đối phương khiến mối quan hệ thêm bế tắc.',
      finance: 'Chần chừ trong các quyết định thanh toán nợ nần khiến vấn đề dây dưa kéo dài.',
      advice: 'Tha thứ cho chính mình là bước đầu tiên để tiến lên; quá khứ không định nghĩa con người bạn.',
    },
  },
  {
    id: 21,
    name: 'The World',
    nameVi: 'Thế Giới Viên Mãn',
    roman: 'XXI',
    element: 'Đất',
    planetOrZodiac: 'Sao Thổ (Saturn)',
    symbol: '🌍',
    colorTheme: 'from-emerald-500 via-indigo-600 to-amber-400',
    keywordsUpright: ['Viên mãn', 'Hoàn tất trọn vẹn', 'Đỉnh cao thành tựu', 'Hòa hợp vũ trụ', 'Du ngoạn'],
    keywordsReversed: ['Chưa trọn vẹn', 'Thiếu bước cuối cùng', 'Trì hoãn hoàn thành', 'Nuối tiếc'],
    upright: {
      summary: 'Chuyến hành trình vĩ đại đã về đích vẻ vang; sự hoàn hảo, viên mãn và hòa hợp tuyệt đối với vũ trụ.',
      career: 'Dự án thành công rực rỡ, chạm tới đỉnh cao danh vọng, mở rộng tầm ảnh hưởng ra quốc tế.',
      love: 'Hôn nhân viên mãn, tình yêu bền chặt cùng nhau đi du lịch khám phá thế giới.',
      finance: 'Tài chính dồi dào, tự do tài chính trọn vẹn sau nhiều năm nỗ lực kiên trì.',
      advice: 'Tận hưởng niềm vui chiến thắng và chuẩn bị cho một vòng quay tiến hóa mới cao hơn của cuộc đời.',
    },
    reversed: {
      summary: 'Chỉ còn một bước cuối cùng để về đích nhưng gặp trở ngại hoặc cảm giác còn thiếu sót điều gì đó.',
      career: 'Dự án gần hoàn thành nhưng bị chậm trễ khâu nghiệm thu hoặc bàn giao cuối cùng.',
      love: 'Cần một cuộc đối thoại dứt khoát để khép lại những nghi vấn trước khi bước vào cam kết lâu dài.',
      finance: 'Các khoản thu nhập lớn đang trên đường về nhưng còn chờ thủ tục giấy tờ.',
      advice: 'Kiên trì thêm một chút nữa thôi; sự kiên nhẫn ở những mét cuối cùng sẽ mang lại chiến thắng trọn vẹn.',
    },
  },
];

export interface DrawnCard {
  card: TarotCardData;
  isReversed: boolean;
  positionName: string; // "Lá 1: Quá Khứ", "Lá 2: Hiện Tại", "Lá 3: Tương Lai"
}

export interface TarotSpreadResult {
  spreadType: 'single' | 'three_cards' | 'love';
  spreadTitle: string;
  question?: string;
  cards: DrawnCard[];
  overallSynthesis: string;
  timestamp: string;
}

/**
 * Rút ngẫu nhiên các lá bài từ bộ 22 Ẩn Chính (kèm trạng thái Xuôi / Ngược)
 */
export function drawTarotSpread(spreadType: 'single' | 'three_cards' | 'love', question?: string): TarotSpreadResult {
  // Trộn ngẫu nhiên
  const deck = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);

  let drawn: DrawnCard[] = [];
  let spreadTitle = '';
  let overallSynthesis = '';

  const qText = (question || 'Thông điệp vũ trụ').trim();
  const qClean = qText.toLowerCase();
  const isPastLife = /(?:^|\s|[.,?!])(kiếp trước|tiền kiếp|kiếp sau|tiền duyên|luân hồi|linh hồn|sứ mệnh|nghiệp|túc mệnh|túc duyên|quá khứ vô lượng|nhân quả|đầu thai)(?:\s|$|[.,?!])/i.test(qClean);
  const isLoveQuestion = /(?:^|\s|[.,?!])(yêu|tình cảm|tình duyên|người yêu|crush|kết hôn|chia tay|quay lại|cưới|bạn gái|bạn trai)(?:\s|$|[.,?!])/i.test(qClean);
  const isCareerQuestion = /(?:^|\s|[.,?!])(việc|công việc|sự nghiệp|xin việc|phỏng vấn|thăng chức|lương|tiền|tài chính|đầu tư|kinh doanh|sếp|thi cử)(?:\s|$|[.,?!])/i.test(qClean);

  if (spreadType === 'single') {
    spreadTitle = 'Trải Bài 1 Lá · Vấn Đáp & Thông Điệp Ngày Mới';
    const card = deck[0];
    const isReversed = Math.random() > 0.65; // ~35% tỷ lệ ngược
    drawn = [
      {
        card,
        isReversed,
        positionName: isPastLife ? 'Lá Bài Thức Tỉnh Linh Hồn' : 'Lá Bài Chủ Quản',
      },
    ];

    const reading = isReversed ? card.reversed : card.upright;
    if (isPastLife) {
      overallSynthesis = `Đối với câu hỏi về tiền kiếp & linh hồn "${qText}": Vũ trụ hồi đáp qua lá bài **${card.nameVi} (${card.name})** (${isReversed ? 'Ngược' : 'Xuôi'}). Biểu tượng này phản chiếu tiền thân của bạn từng trải qua những trải nghiệm tâm thức sâu sắc: ${reading.summary} Thông điệp giác ngộ gửi đến bạn trong kiếp này: ${reading.advice}`;
    } else if (isLoveQuestion) {
      overallSynthesis = `Về thắc mắc tình cảm "${qText}": Lá bài chủ quản là **${card.nameVi} (${card.name})** (${isReversed ? 'Ngược' : 'Xuôi'}). Thông điệp dành cho bạn: ${reading.love} Lời khuyên của vũ trụ: ${reading.advice}`;
    } else if (isCareerQuestion) {
      overallSynthesis = `Về câu hỏi sự nghiệp "${qText}": Lá bài chủ quản là **${card.nameVi} (${card.name})** (${isReversed ? 'Ngược' : 'Xuôi'}). Năng lượng thời vận: ${reading.career} Lời khuyên hành động: ${reading.advice}`;
    } else {
      overallSynthesis = `Lá bài **${card.nameVi} (${card.name})** ở vị trí **${isReversed ? 'Ngược (Reversed)' : 'Xuôi (Upright)'}** mang đến thông điệp trọng tâm cho câu hỏi của bạn: ${reading.summary} Lời khuyên dành cho bạn: ${reading.advice}`;
    }
  } else if (spreadType === 'three_cards') {
    spreadTitle = 'Trải Bài 3 Lá · Quá Khứ - Hiện Tại - Tương Lai';
    const c1 = deck[0];
    const c2 = deck[1];
    const c3 = deck[2];

    const r1 = Math.random() > 0.65;
    const r2 = Math.random() > 0.65;
    const r3 = Math.random() > 0.65;

    drawn = [
      {
        card: c1,
        isReversed: r1,
        positionName: isPastLife
          ? 'Tiền Thân & Túc Duyên (Hình bóng kiếp trước)'
          : 'Quá Khứ (Gốc Rễ Nguồn Cơn)',
      },
      {
        card: c2,
        isReversed: r2,
        positionName: isPastLife
          ? 'Dấu Ấn Linh Hồn (Tiềm thức kiếp này)'
          : 'Hiện Tại (Thực Trạng Đương Thời)',
      },
      {
        card: c3,
        isReversed: r3,
        positionName: isPastLife
          ? 'Bài Học Nghiệp Quả & Giác Ngộ (Sứ mệnh kiếp này)'
          : 'Tương Lai (Xu Hướng & Kết Quả)',
      },
    ];

    const read1 = r1 ? c1.reversed : c1.upright;
    const read2 = r2 ? c2.reversed : c2.upright;
    const read3 = r3 ? c3.reversed : c3.upright;

    const isDifficultFuture = r3 || [13, 15, 16, 18].includes(c3.id);
    const futureTone = isDifficultFuture
      ? `CẢNH BÁO KHẢO NGHIỆM TƯƠNG LAI: Xu hướng tới sẽ gặp phải nhiều cản trở, bế tắc hoặc cú sốc chuyển hóa mang sắc thái **${c3.nameVi}** (${r3 ? 'Ngược' : 'Xuôi'}): ${read3.summary}`
      : `Xu hướng tương lai mở ra cơ hội tích cực theo năng lượng **${c3.nameVi}** (${r3 ? 'Ngược' : 'Xuôi'}): ${read3.summary}`;

    if (isPastLife) {
      overallSynthesis = `Giải mã câu hỏi tiền kiếp "${qText}": Lá bài tiền thân **${c1.nameVi}** (${r1 ? 'Ngược' : 'Xuôi'}) cho thấy ở tiền thân bạn từng gánh vác bài học nghiệp duyên: ${read1.summary} Dấu ấn đó nay tiếp tục phản chiếu trong tâm thức hiện tại qua lá **${c2.nameVi}** (${r2 ? 'Ngược' : 'Xuôi'}): ${read2.summary} Bài học túc nghiệp cốt tử kiếp này qua lá **${c3.nameVi}** (${r3 ? 'Ngược' : 'Xuôi'}): ${read3.advice} Đừng trốn tránh sự thật mà hãy dũng cảm chuyển hóa để giải tỏa nghiệp cũ.`;
    } else if (isLoveQuestion) {
      overallSynthesis = `Về vấn đề tình duyên "${qText}": Gốc rễ bắt nguồn từ nền tảng **${c1.nameVi}** (${r1 ? 'Ngược' : 'Xuôi'}): ${read1.love} Thực trạng hiện tại dưới tác động của **${c2.nameVi}** (${r2 ? 'Ngược' : 'Xuôi'}): ${read2.love} ${futureTone} Lời khuyên cảnh tỉnh: ${read3.advice}`;
    } else if (isCareerQuestion) {
      overallSynthesis = `Về câu hỏi sự nghiệp & tài chính "${qText}": Quá trình vừa qua dựa trên tiền đề **${c1.nameVi}** (${r1 ? 'Ngược' : 'Xuôi'}): ${read1.career} Hiện tại bạn đang chịu chi phối của **${c2.nameVi}** (${r2 ? 'Ngược' : 'Xuôi'}): ${read2.career} ${futureTone} Lời khuyên chiến lược: ${read3.advice}`;
    } else {
      overallSynthesis = `Đối với câu hỏi "${qText}": Hành trình vận mệnh chuyển dịch từ gốc rễ **${c1.nameVi}** (${read1.summary}) sang trạng thái hiện tại dưới tác động của **${c2.nameVi}** (${read2.summary}). ${futureTone} Lời khuyên của vũ trụ: ${read3.advice}`;
    }
  } else {
    // love spread
    spreadTitle = 'Trải Bài Tình Duyên · Bản Thân - Đối Phương - Tương Lai';
    const c1 = deck[0];
    const c2 = deck[1];
    const c3 = deck[2];

    const r1 = Math.random() > 0.65;
    const r2 = Math.random() > 0.65;
    const r3 = Math.random() > 0.65;

    drawn = [
      { card: c1, isReversed: r1, positionName: 'Bạn (Tâm Thế & Cảm Xúc Bản Thân)' },
      { card: c2, isReversed: r2, positionName: 'Đối Phương (Tâm Tư & Năng Lượng Của Người Ấy)' },
      { card: c3, isReversed: r3, positionName: 'Tương Lai (Xu Hướng Mối Quan Hệ)' },
    ];

    const read3 = r3 ? c3.reversed : c3.upright;
    const isTension = r1 || r2 || r3 || [13, 15, 16].includes(c3.id);
    const relationshipAssessment = isTension
      ? `CẢNH BÁO XUNG ĐỘT: Mối quan hệ đang tồn tại bất đồng ngầm hoặc sự thiếu trung thực giữa hai tâm thế **${c1.nameVi}** (${r1 ? 'Ngược' : 'Xuôi'}) và **${c2.nameVi}** (${r2 ? 'Ngược' : 'Xuôi'}). Tương lai mối quan hệ đối mặt với thử thách mang sắc thái **${c3.nameVi}**: ${read3.love}`
      : `Mối lương duyên này đang có sự tương tác năng lượng sâu sắc giữa **${c1.nameVi}** và **${c2.nameVi}**. Tương lai của mối quan hệ hướng về **${c3.nameVi}**: ${read3.love}`;

    overallSynthesis = `${relationshipAssessment} Lời khuyên chân thực: ${read3.advice}`;
  }

  return {
    spreadType,
    spreadTitle,
    question,
    cards: drawn,
    overallSynthesis,
    timestamp: new Date().toLocaleString('vi-VN'),
  };
}

