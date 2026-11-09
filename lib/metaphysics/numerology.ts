/**
 * THẦN SỐ HỌC PITAGO & CHIÊM TINH PHƯƠNG TÂY (ZODIAC)
 * Tính toán Con Số Chủ Đạo (Life Path), Số Sứ Mệnh, Năm Cá Nhân
 * Phân tích 12 Cung Hoàng Đạo phương Tây (Nguyên tố, Tính chất, Điểm mạnh, Lời khuyên)
 * 100% Tiếng Việt chuẩn mực.
 */

// Bảng số Pitago theo chữ cái tiếng Anh / tiếng Việt Latinh
const PYTHAGOREAN_LETTER_MAP: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

// Loại bỏ dấu tiếng Việt để tính tên chính xác
function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

export interface LifePathDetail {
  number: number;
  title: string;
  keyword: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careerPath: string[];
  lifeLesson: string;
}

export const LIFE_PATH_MAP: Record<number, LifePathDetail> = {
  10: {
    number: 10,
    title: 'Số 10 (Số 1) - Nhà Tiên Phong Độc Lập',
    keyword: 'Tự chủ · Tiên phong · Quyết đoán · Bản lĩnh',
    description: 'Bạn sinh ra để mở đường, dẫn dắt và thiết lập tiêu chuẩn mới. Bạn sở hữu lòng can đảm to lớn và khả năng thích ứng linh hoạt trước mọi đổi thay.',
    strengths: ['Tự tin, độc lập, không ngại khó khăn', 'Khả năng lãnh đạo bẩm sinh', 'Quyết đoán, hành động nhanh'],
    weaknesses: ['Đôi khi độc đoán, bảo thủ', 'Thiếu kiên nhẫn với người chậm chạp'],
    careerPath: ['Chủ doanh nghiệp, Quản lý điều hành', 'Nhà khởi nghiệp, Nhà sáng lập', 'Chuyên gia độc lập'],
    lifeLesson: 'Học cách lắng nghe ý kiến tập thể và dung hòa giữa ý chí cá nhân với quyền lợi cộng đồng.',
  },
  2: {
    number: 2,
    title: 'Số 2 - Nhà Hòa Giải & Trực Giác Tinh Tế',
    keyword: 'Lắng nghe · Đồng cảm · Ngoại giao · Hòa bình',
    description: 'Bạn là chiếc cầu nối tuyệt vời giữa con người với con người. Bạn có trực giác nhạy bén, tâm hồn nhạy cảm và sự tận tụy đáng quý.',
    strengths: ['Khéo léo trong giao tiếp và ngoại giao', 'Trực giác mạnh mẽ, thấu hiểu lòng người', 'Trung thành, biết quan tâm'],
    weaknesses: ['Dễ xúc động, nhạy cảm quá mức', 'Dễ bị tổn thương hoặc lưỡng lự thiếu quyết đoán'],
    careerPath: ['Nhà ngoại giao, Tâm lý học, Tư vấn viên', 'Nhân sự, Chăm sóc khách hàng', 'Nghệ thuật, Hòa giải viên'],
    lifeLesson: 'Học cách bảo vệ ranh giới cảm xúc của bản thân và tự tin nói lên quan điểm của chính mình.',
  },
  3: {
    number: 3,
    title: 'Số 3 - Người Truyền Cảm Hứng & Sáng Tạo',
    keyword: 'Lạc quan · Hoạt ngôn · Nghệ thuật · Tỏa sáng',
    description: 'Bạn mang đến tiếng cười, niềm vui và nguồn cảm hứng bất tận cho những người xung quanh. Tư duy nhạy bén và khiếu hài hước giúp bạn tỏa sáng mọi nơi.',
    strengths: ['Tài hùng biện và giao tiếp xuất chúng', 'Sáng tạo dồi dào, tư duy linh hoạt', 'Năng lượng tích cực, truyền lửa'],
    weaknesses: ['Dễ mất tập trung, hay thay đổi mục tiêu', 'Đôi khi lời nói thiếu suy nghĩ thấu đáo'],
    careerPath: ['MC, Diễn giả, Truyền thông, Marketing', 'Nghệ sĩ, Biên kịch, Sáng tạo nội dung', 'Giáo dục, Thiết kế'],
    lifeLesson: 'Rèn luyện tính kỷ luật và sự kiên trì để biến những ý tưởng sáng tạo thành thành quả cụ thể.',
  },
  4: {
    number: 4,
    title: 'Số 4 - Người Kiến Tạo Vững Chãi',
    keyword: 'Thực tế · Kỷ luật · Tỉ mỉ · Trách nhiệm',
    description: 'Bạn là trụ cột đáng tin cậy nhất trong mọi tổ chức và gia đình. Bạn yêu thích sự rõ ràng, ngăn nắp và luôn xây dựng mọi thứ trên nền tảng vững chắc.',
    strengths: ['Kỷ luật cao, kiên trì phi thường', 'Tư duy logic, quản lý thời gian và tài chính tốt', 'Đáng tin cậy, làm việc chu đáo'],
    weaknesses: ['Quá cứng nhắc, nguyên tắc, khó thay đổi', 'Hay lo lắng về sự an toàn tài chính'],
    careerPath: ['Kỹ sư, Kiến trúc sư, Xây dựng', 'Kế toán, Tài chính, Kiểm toán', 'Chuyên viên kỹ thuật, Quản lý dự án'],
    lifeLesson: 'Mở rộng góc nhìn và học cách đón nhận những thay đổi bất ngờ của cuộc sống với tinh thần cởi mở.',
  },
  5: {
    number: 5,
    title: 'Số 5 - Kẻ Phiêu Lưu Tự Do',
    keyword: 'Tự do · Đổi mới · Thích nghi · Trải nghiệm',
    description: 'Bạn ghét sự gò bó và khuôn mẫu sáo rỗng. Tâm hồn bạn khao khát tự do, luôn muốn khám phá thế giới rộng lớn và kết nối với những chân trời mới.',
    strengths: ['Thích ứng siêu nhanh với hoàn cảnh mới', 'Dám dấn thân thử thách, tư duy hiện đại', 'Cuốn hút, quảng giao, nhiều tài lẻ'],
    weaknesses: ['Dễ cả thèm chóng chán', 'Thiếu kiên nhẫn khi phải làm việc lặp đi lặp lại'],
    careerPath: ['Du lịch, Hàng không, Hướng dẫn viên', 'Nhà báo, Phóng viên, Nhiếp ảnh gia', 'Kinh doanh quốc tế, Tiếp thị số'],
    lifeLesson: 'Tự do chân chính chỉ đến khi ta có sự tự kỷ luật; hãy tìm thấy mục tiêu dài hạn để tập trung sức lực.',
  },
  6: {
    number: 6,
    title: 'Số 6 - Người Chăm Sóc & Yêu Thương',
    keyword: 'Bao dung · Trách nhiệm · Gia đình · Chữa lành',
    description: 'Bạn là người có trái tim ấm áp, sẵn sàng chở che và chăm sóc cho người thân và cộng đồng. Bạn yêu cái đẹp và luôn vun đắp tổ ấm bình yên.',
    strengths: ['Giàu lòng trắc ẩn, chu đáo, vị tha', 'Có mắt thẩm mỹ tinh tế về không gian sống', 'Tận tụy với gia đình và bạn bè'],
    weaknesses: ['Hay ôm đồm lo lắng thái quá', 'Dễ bị lợi dụng bởi lòng tốt của mình'],
    careerPath: ['Bác sĩ, Y tá, Giáo viên mầm non', 'Thiết kế nội thất, Thời trang, Nghệ thuật', 'Công tác xã hội, Tư vấn viên'],
    lifeLesson: 'Học cách yêu thương bản thân trước khi chăm sóc người khác; buông bỏ gánh nặng kiểm soát.',
  },
  7: {
    number: 7,
    title: 'Số 7 - Nhà Triết Gia & Khám Phá Chân Lý',
    keyword: 'Trí tuệ · Trải nghiệm · Triết lý · Trực giác',
    description: 'Bạn có bộ óc sâu sắc, thích chiêm nghiệm và tìm hiểu bản chất của vạn vật. Bạn thích những khoảng lặng để tự học hỏi và kết nối với chiều sâu tâm linh.',
    strengths: ['Tư duy phản biện và nghiên cứu sâu sắc', 'Trực giác và khả năng đúc kết quy luật xuất sắc', 'Độc lập, điềm tĩnh, tự chủ'],
    weaknesses: ['Khép kín, khó mở lòng chia sẻ', 'Đôi khi đa nghi, cô độc'],
    careerPath: ['Nhà khoa học, Nhà nghiên cứu, Giảng viên đại học', 'Lập trình viên, Chuyên gia phân tích dữ liệu', 'Triết gia, Nhà tâm lý, Huyền học'],
    lifeLesson: 'Học cách chia sẻ tri thức và mở lòng đón nhận tình cảm ấm áp từ mọi người xung quanh.',
  },
  8: {
    number: 8,
    title: 'Số 8 - Nhà Điều Hành & Quyền Lực Tài Chính',
    keyword: 'Bản lĩnh · Tài chính · Quản trị · Thành tựu',
    description: 'Bạn sinh ra để chinh phục những mục tiêu lớn về vật chất và sự nghiệp. Bạn sở hữu cái nhìn thực tế, sắc sảo về kinh doanh và khả năng điều hành xuất sắc.',
    strengths: ['Năng lực kinh doanh và nhạy bén tài chính vượt trội', 'Ý chí sắt đá, chịu được áp lực khổng lồ', 'Tầm nhìn chiến lược dài hạn'],
    weaknesses: ['Dễ thực dụng, lạnh lùng trong các mối quan hệ', 'Ham công tiếc việc, bỏ quên cảm xúc gia đình'],
    careerPath: ['Chủ doanh nghiệp, Giám đốc điều hành (CEO)', 'Đầu tư tài chính, Ngân hàng, Bất động sản', 'Thương gia, Chính khách'],
    lifeLesson: 'Cân bằng giữa thành công vật chất và đời sống tinh thần; dùng của cải để kiến tạo giá trị nhân văn.',
  },
  9: {
    number: 9,
    title: 'Số 9 - Người Phụng Sự & Trách Nhiệm Xã Hội',
    keyword: 'Lý tưởng · Nhân đạo · Từ bi · Cống hiến',
    description: 'Bạn mang tâm hồn cao thượng, luôn trăn trở về những điều tốt đẹp cho xã hội và nhân loại. Bạn có sức hút tự nhiên và lòng vị tha lớn lao.',
    strengths: ['Lòng nhân ái bao la, sẵn sàng cống hiến', 'Tầm nhìn rộng mở, bao dung mọi khác biệt', 'Uy tín cao, được mọi người kính trọng'],
    weaknesses: ['Đôi khi quá lý tưởng hóa thực tế', 'Dễ thất vọng khi lòng tốt không được đền đáp'],
    careerPath: ['Tổ chức phi chính phủ, Hoạt động xã hội', 'Bác sĩ, Nhà giáo, Luật sư nhân quyền', 'Nghệ thuật, Văn hóa, Môi trường'],
    lifeLesson: 'Học cách thực tế trong từng bước đi và chấp nhận sự bất toàn của thế giới xung quanh.',
  },
  11: {
    number: 11,
    title: 'Số 11 (Master Number) - Bậc Thầy Trực Giác & Khai Sáng',
    keyword: 'Tâm linh · Khai sáng · Trực giác đỉnh cao · Nhạy cảm',
    description: 'Con số Master mang nguồn năng lượng tâm linh và trực giác siêu việt. Bạn là ngọn hải đăng soi đường, truyền cảm hứng và đánh thức tiềm năng trong người khác.',
    strengths: ['Trực giác tâm linh cực kỳ chuẩn xác', 'Tâm hồn thanh khiết, lý tưởng sống cao đẹp', 'Khả năng kết nối tinh tế ở tầm vóc tâm hồn'],
    weaknesses: ['Dễ căng thẳng thần kinh trước nguồn năng lượng quá lớn', 'Đôi khi lạc lõng giữa đời thường'],
    careerPath: ['Nhà lãnh đạo tinh thần, Chuyên gia tâm lý', 'Diễn giả truyền cảm hứng, Nhà văn hóa', 'Nghệ sĩ xuất chúng, Nhà giáo dục nhân bản'],
    lifeLesson: 'Giữ cho bản thân luôn kết nối với thực tại (grounding), rèn luyện thân thể để chuyên chở nguồn năng lượng lớn.',
  },
  22: {
    number: 22,
    title: 'Số 22 (Master Number) - Bậc Thầy Kiến Tạo Vĩ Đại',
    keyword: 'Kiến tạo · Thực thi · Tầm vóc · Di sản',
    description: 'Con số quyền năng nhất trong Thần số học. Bạn kết hợp hoàn hảo giữa trực giác sâu sắc của số 11 và sự thực tế bền bỉ của số 4 để kiến tạo nên những công trình để đời.',
    strengths: ['Khả năng hiện thực hóa những giấc mơ vĩ đại', 'Tầm nhìn vượt thời đại và năng lực thực thi siêu đẳng', 'Khí chất của người định hình tương lai'],
    weaknesses: ['Áp lực trách nhiệm khổng lồ đè nặng lên vai', 'Dễ kiệt sức nếu không biết chia sẻ công việc'],
    careerPath: ['Lãnh đạo quốc gia, Nhà sáng lập tập đoàn đa quốc gia', 'Kiến trúc sư trưởng các đại dự án thế giới', 'Nhà cải cách xã hội vĩ đại'],
    lifeLesson: 'Học cách tin tưởng và trao quyền cho cộng sự; giữ gìn sức khỏe để đi đường dài.',
  },
  33: {
    number: 33,
    title: 'Số 33 (Master Number) - Bậc Thầy Chữa Lành & Từ Bi Vô Lượng',
    keyword: 'Đại từ bi · Chữa lành · Hy sinh · Phụng sự thế gian',
    description: 'Năng lượng của tình yêu thương thuần khiết và sự chữa lành toàn diện. Bạn bước vào cuộc đời này để xoa dịu nỗi đau và nâng tầm ý thức của con người.',
    strengths: ['Tình yêu thương vô điều kiện và năng lượng chữa lành mạnh mẽ', 'Tấm gương sáng về đức hy sinh và lòng nhân từ', 'Trí tuệ minh triết'],
    weaknesses: ['Dễ gánh vác nỗi đau của cả thế gian lên mình', 'Quên đi nhu cầu cơ bản của chính bản thân'],
    careerPath: ['Bậc thầy tâm linh, Chuyên gia chữa lành (Healer)', 'Bác sĩ không biên giới, Nhà hoạt động từ thiện toàn cầu', 'Nhà giáo dục tâm hồn'],
    lifeLesson: 'Yêu thương thế gian nhưng không quên chăm sóc chính ngôi đền thân xác và tâm hồn của mình.',
  },
};

export interface ZodiacSignDetail {
  name: string;        // Tên tiếng Việt
  latinName: string;   // Aries, Taurus...
  dates: string;       // Khoảng ngày sinh
  element: 'Lửa' | 'Đất' | 'Khí' | 'Nước';
  modality: 'Tiên phong (Cardinal)' | 'Kiên định (Fixed)' | 'Linh hoạt (Mutable)';
  rulerPlanet: string; // Sao chiếu mệnh
  symbol: string;      // ♈, ♉...
  strengths: string;
  weaknesses: string;
  advice: string;
}

export const ZODIAC_SIGNS: ZodiacSignDetail[] = [
  {
    name: 'Bạch Dương',
    latinName: 'Aries',
    dates: '21/03 - 19/04',
    element: 'Lửa',
    modality: 'Tiên phong (Cardinal)',
    rulerPlanet: 'Hỏa Tinh (Mars)',
    symbol: '♈',
    strengths: 'Nhiệt huyết, dũng cảm, thẳng thắn, tràn đầy năng lượng lãnh đạo.',
    weaknesses: 'Nóng nảy, thiếu kiên nhẫn, đôi khi bốc đồng hành động.',
    advice: 'Học cách chậm lại một nhịp trước khi ra quyết định lớn; kiên trì đi tới đích cuối cùng.',
  },
  {
    name: 'Kim Ngưu',
    latinName: 'Taurus',
    dates: '20/04 - 20/05',
    element: 'Đất',
    modality: 'Kiên định (Fixed)',
    rulerPlanet: 'Kim Tinh (Venus)',
    symbol: '♉',
    strengths: 'Kiên định, đáng tin cậy, thực tế, gu thẩm mỹ và tài chính tuyệt vời.',
    weaknesses: 'Bướng bỉnh, khó thích nghi với sự thay đổi đột ngột.',
    advice: 'Mở lòng đón nhận cái mới, cuộc sống không chỉ có sự an toàn mà còn có những chân trời kỳ thú.',
  },
  {
    name: 'Song Tử',
    latinName: 'Gemini',
    dates: '21/05 - 20/06',
    element: 'Khí',
    modality: 'Linh hoạt (Mutable)',
    rulerPlanet: 'Thủy Tinh (Mercury)',
    symbol: '♊',
    strengths: 'Thông minh, hoạt ngôn, thích ứng nhanh, tò mò và giàu ý tưởng.',
    weaknesses: 'Dễ phân tâm, thiếu tập trung sâu vào một mục tiêu duy nhất.',
    advice: 'Chọn lọc những ý tưởng giá trị nhất để theo đuổi đến cùng, chất lượng hơn số lượng.',
  },
  {
    name: 'Cự Giải',
    latinName: 'Cancer',
    dates: '21/06 - 22/07',
    element: 'Nước',
    modality: 'Tiên phong (Cardinal)',
    rulerPlanet: 'Mặt Trăng (Moon)',
    symbol: '♋',
    strengths: 'Giàu cảm xúc, giàu lòng trắc ẩn, yêu gia đình, trực giác bén nhạy.',
    weaknesses: 'Dễ nhạy cảm, hay che giấu cảm xúc sau lớp vỏ tự vệ.',
    advice: 'Hãy tin tưởng vào sức mạnh nội tâm của mình; buông bỏ những nỗi buồn quá khứ.',
  },
  {
    name: 'Sư Tử',
    latinName: 'Leo',
    dates: '23/07 - 22/08',
    element: 'Lửa',
    modality: 'Kiên định (Fixed)',
    rulerPlanet: 'Mặt Trời (Sun)',
    symbol: '♌',
    strengths: 'Tự tin, hào phóng, có sức hút tự nhiên, tinh thần trượng nghĩa.',
    weaknesses: 'Cái tôi lớn, dễ tổn thương khi không nhận được sự tán thưởng.',
    advice: 'Lắng nghe chân thành người khác sẽ khiến vầng hào quang của bạn thêm phần lấp lánh và được yêu mến.',
  },
  {
    name: 'Xử Nữ',
    latinName: 'Virgo',
    dates: '23/08 - 22/09',
    element: 'Đất',
    modality: 'Linh hoạt (Mutable)',
    rulerPlanet: 'Thủy Tinh (Mercury)',
    symbol: '♍',
    strengths: 'Tỉ mỉ, chu đáo, làm việc có hệ thống, cầu tiến và cống hiến hết mình.',
    weaknesses: 'Cầu toàn quá mức, hay tự trách bản thân và săm soi chi tiết nhỏ.',
    advice: 'Chấp nhận sự bất toàn như một phần tất yếu của cuộc sống để tâm hồn được nhẹ nhõm.',
  },
  {
    name: 'Thiên Bình',
    latinName: 'Libra',
    dates: '23/09 - 22/10',
    element: 'Khí',
    modality: 'Tiên phong (Cardinal)',
    rulerPlanet: 'Kim Tinh (Venus)',
    symbol: '♎',
    strengths: 'Công bằng, thanh lịch, duyên dáng, khả năng hòa giải và tạo dựng hòa khí.',
    weaknesses: 'Do dự, khó đưa ra quyết định dứt khoát vì sợ mất lòng.',
    advice: 'Hãy dũng cảm đứng về phía quan điểm của mình, sự rõ ràng chính là lòng tốt lớn nhất.',
  },
  {
    name: 'Bọ Cạp (Thiên Yết)',
    latinName: 'Scorpio',
    dates: '23/10 - 21/11',
    element: 'Nước',
    modality: 'Kiên định (Fixed)',
    rulerPlanet: 'Diêm Vương Tinh (Pluto) & Hỏa Tinh',
    symbol: '♏',
    strengths: 'Ý chí kiên cường, sắc sảo, trực giác nhìn thấu bản chất, trung thành tuyệt đối.',
    weaknesses: 'Hay đa nghi, giữ kín tâm sự, khó tha thứ khi bị phản bội.',
    advice: 'Học cách tha thứ để giải phóng năng lượng cho chính mình; niềm tin là cây cầu dẫn đến hạnh phúc.',
  },
  {
    name: 'Nhân Mã',
    latinName: 'Sagittarius',
    dates: '22/11 - 21/12',
    element: 'Lửa',
    modality: 'Linh hoạt (Mutable)',
    rulerPlanet: 'Mộc Tinh (Jupiter)',
    symbol: '♐',
    strengths: 'Lạc quan, yêu tự do, tầm nhìn xa rộng, thẳng thắn và chân thành.',
    weaknesses: 'Đôi khi thiếu tế nhị, lời nói bộc trực làm người khác bất ngờ.',
    advice: 'Thêm một chút cẩn trọng trong lời nói và cam kết trách nhiệm sẽ giúp bạn gặt hái thành công trọn vẹn.',
  },
  {
    name: 'Ma Kết',
    latinName: 'Capricorn',
    dates: '22/12 - 19/01',
    element: 'Đất',
    modality: 'Tiên phong (Cardinal)',
    rulerPlanet: 'Thổ Tinh (Saturn)',
    symbol: '♑',
    strengths: 'Kiên định, kỷ luật thép, có tầm nhìn chiến lược, tinh thần trách nhiệm cao.',
    weaknesses: 'Quá nghiêm khắc với bản thân, dễ căng thẳng vì công việc.',
    advice: 'Cho phép bản thân thư giãn và tận hưởng niềm vui giản dị bên cạnh những đỉnh cao danh vọng.',
  },
  {
    name: 'Bảo Bình',
    latinName: 'Aquarius',
    dates: '20/01 - 18/02',
    element: 'Khí',
    modality: 'Kiên định (Fixed)',
    rulerPlanet: 'Thiên Vương Tinh (Uranus) & Thổ Tinh',
    symbol: '♒',
    strengths: 'Tư duy độc đáo, sáng tạo đột phá, nhân đạo, tinh thần tự do bác ái.',
    weaknesses: 'Lập dị, đôi khi xa cách về mặt cảm xúc.',
    advice: 'Đừng ngại chia sẻ cảm xúc chân thật của trái tim; kết nối cảm xúc sẽ giúp lý tưởng của bạn lan tỏa sâu rộng hơn.',
  },
  {
    name: 'Song Ngư',
    latinName: 'Pisces',
    dates: '19/02 - 20/03',
    element: 'Nước',
    modality: 'Linh hoạt (Mutable)',
    rulerPlanet: 'Hải Vương Tinh (Neptune) & Mộc Tinh',
    symbol: '♓',
    strengths: 'Giàu lòng vị tha, tâm hồn nghệ sĩ lãng mạn, trực giác tâm linh phong phú.',
    weaknesses: 'Dễ mơ mộng xa rời thực tế, cả nể khó từ chối người khác.',
    advice: 'Thiết lập ranh giới rõ ràng và biến những giấc mơ tuyệt đẹp thành hiện thực bằng hành động cụ thể.',
  },
];

/**
 * Lấy Cung Hoàng Đạo từ ngày và tháng sinh
 */
export function getZodiacSign(day: number, month: number): ZodiacSignDetail {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZODIAC_SIGNS[0];
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZODIAC_SIGNS[1];
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZODIAC_SIGNS[2];
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZODIAC_SIGNS[3];
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZODIAC_SIGNS[4];
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZODIAC_SIGNS[5];
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZODIAC_SIGNS[6];
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZODIAC_SIGNS[7];
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZODIAC_SIGNS[8];
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZODIAC_SIGNS[9];
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZODIAC_SIGNS[10];
  return ZODIAC_SIGNS[11];
}

/**
 * Tính Con Số Chủ Đạo (Life Path Number)
 * Cộng các chữ số ngày, tháng, năm sinh
 * Giữ nguyên các số Master: 11, 22, 33; hoặc số 10
 */
export function calculateLifePath(year: number, month: number, day: number): LifePathDetail {
  const sumDigits = (num: number): number => {
    let s = 0;
    while (num > 0) {
      s += num % 10;
      num = Math.floor(num / 10);
    }
    return s;
  };

  const reduceNumber = (val: number): number => {
    let current = val;
    while (current > 9 && current !== 10 && current !== 11 && current !== 22 && current !== 33) {
      current = sumDigits(current);
    }
    return current;
  };

  const rDay = reduceNumber(day);
  const rMonth = reduceNumber(month);
  const rYear = reduceNumber(sumDigits(year));

  const total = rDay + rMonth + rYear;
  let finalNum = total;

  if (finalNum !== 10 && finalNum !== 11 && finalNum !== 22 && finalNum !== 33) {
    while (finalNum > 9 && finalNum !== 10 && finalNum !== 11 && finalNum !== 22 && finalNum !== 33) {
      finalNum = sumDigits(finalNum);
    }
  }

  // Fallback map
  if (!LIFE_PATH_MAP[finalNum]) {
    finalNum = sumDigits(finalNum);
    if (!LIFE_PATH_MAP[finalNum]) finalNum = 10;
  }

  return LIFE_PATH_MAP[finalNum];
}

/**
 * Tính Số Sứ Mệnh từ Họ và Tên (Destiny Number)
 */
export function calculateDestinyNumber(fullName: string): { number: number; meaning: string } {
  const clean = removeVietnameseTones(fullName);
  let sum = 0;

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    if (PYTHAGOREAN_LETTER_MAP[char]) {
      sum += PYTHAGOREAN_LETTER_MAP[char];
    }
  }

  if (sum === 0) return { number: 1, meaning: 'Số sứ mệnh tiên phong kiến tạo.' };

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    let temp = 0;
    while (sum > 0) {
      temp += sum % 10;
      sum = Math.floor(sum / 10);
    }
    sum = temp;
  }

  const destinyMap: Record<number, string> = {
    1: 'Sứ mệnh dẫn đầu, kiến tạo lối đi riêng và truyền động lực cho người khác.',
    2: 'Sứ mệnh mang lại sự hòa hợp, hòa bình và gắn kết cộng đồng.',
    3: 'Sứ mệnh truyền cảm hứng, lan tỏa niềm vui và làm đẹp cho đời bằng sự sáng tạo.',
    4: 'Sứ mệnh xây dựng nền móng vững chắc, tổ chức và duy trì trật tự bền vững.',
    5: 'Sứ mệnh phá vỡ giới hạn cũ, mở đường cho những trải nghiệm đổi mới tiến bộ.',
    6: 'Sứ mệnh chăm sóc, yêu thương và bảo vệ mái ấm gia đình cùng xã hội.',
    7: 'Sứ mệnh tìm kiếm chân lý, khai sáng tri thức và chia sẻ hiểu biết sâu sắc.',
    8: 'Sứ mệnh tạo lập thịnh vượng tài chính và điều hành những hệ thống quy mô lớn.',
    9: 'Sứ mệnh phụng sự nhân loại, nâng cao giá trị đạo đức và nhân văn.',
    11: 'Sứ mệnh bậc thầy tinh thần, thắp sáng tâm thức và thức tỉnh trực giác.',
    22: 'Sứ mệnh bậc thầy kiến tạo, xây đắp những công trình và giá trị trường tồn.',
    33: 'Sứ mệnh bậc thầy chữa lành, ban phát tình thương vô điều kiện cho thế gian.',
  };

  return {
    number: sum,
    meaning: destinyMap[sum] || 'Sứ mệnh cống hiến và hoàn thiện bản thân không ngừng.',
  };
}

/**
 * Tính Năm Cá Nhân (Personal Year) theo chu kỳ 9 năm Pitago
 */
export function calculatePersonalYear(day: number, month: number, targetYear: number = new Date().getFullYear()): { yearNum: number; theme: string; advice: string } {
  const sumDigits = (num: number): number => {
    let s = 0;
    while (num > 0) {
      s += num % 10;
      num = Math.floor(num / 10);
    }
    return s;
  };

  const total = sumDigits(day) + sumDigits(month) + sumDigits(targetYear);
  let yearNum = total;
  while (yearNum > 9) {
    yearNum = sumDigits(yearNum);
  }

  const themes: Record<number, { theme: string; advice: string }> = {
    1: { theme: 'Năm Khởi Đầu & Gieo Hạt Mới', advice: 'Thời điểm vàng để bắt đầu dự án mới, học tập kỹ năng mới, đặt mục tiêu dài hạn.' },
    2: { theme: 'Năm Hợp Tác & Nuôi Dưỡng', advice: 'Tập trung vào các mối quan hệ, lắng nghe, kiên nhẫn tích lũy nội lực, tránh vội vã.' },
    3: { theme: 'Năm Mở Rộng & Sáng Tạo', advice: 'Tự tin thể hiện bản thân, giao lưu mở rộng quan hệ xã hội, đón nhận cơ hội mới.' },
    4: { theme: 'Năm Củng Cố & Kỷ Luật', advice: 'Siết chặt quy trình, chăm sóc sức khỏe, củng cố tài chính và hoàn thiện nền tảng.' },
    5: { theme: 'Năm Đổi Mới & Bứt Phá', advice: 'Sẵn sàng đón nhận thay đổi, đi xa, học hỏi cái mới, thoát khỏi vùng an toàn.' },
    6: { theme: 'Năm Gia Đình & Yêu Thương', advice: 'Dành nhiều thời gian chăm sóc người thân, tổ ấm gia đình, giải quyết việc nội bộ.' },
    7: { theme: 'Năm Chiêm Nghiệm & Tri Thức', advice: 'Tĩnh tâm đọc sách, học hỏi chuyên sâu, nâng cao trí tuệ, tránh đầu tư mạo hiểm.' },
    8: { theme: 'Năm Gặt Hái & Độc Lập Tài Chính', advice: 'Thời điểm thu hoạch thành quả tài chính và quyền lực từ những nỗ lực nhiều năm qua.' },
    9: { theme: 'Năm Hoàn Tất & Dọn Dẹp Chu Kỳ Cũ', advice: 'Buông bỏ những điều không còn phù hợp, tha thứ, dọn dẹp tâm trí sẵn sàng đón chu kỳ 9 năm mới.' },
  };

  return {
    yearNum,
    theme: themes[yearNum]?.theme || 'Năm phát triển toàn diện',
    advice: themes[yearNum]?.advice || 'Kiên trì theo đuổi ước mơ.',
  };
}

