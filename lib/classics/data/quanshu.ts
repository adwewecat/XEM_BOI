/**
 * 《紫微斗数全书》— Tử Vi Đẩu Số Toàn Thư (Trích lục tinh hoa cốt lõi)
 *
 * Bản in thời Minh (Do La Hồng Tiên thời Minh san định)
 * Là bộ cổ tịch có tính hệ thống cao nhất của Tử Vi Đẩu Số, nhấn mạnh mối quan hệ tương hỗ giữa 12 cung và Tứ Hóa, toàn bộ khoảng 10 vạn chữ.
 */

import type { Book } from '../types';

export const ziWeiQuanShu: Book = {
  title: 'Tử Vi Đẩu Số Toàn Thư (紫微斗数全书)',
  slug: 'quanshu',
  dynasty: 'Thời Minh (明代)',
  author: 'La Hồng Tiên (罗洪先) san định',
  intro: 'Bộ cổ tịch có hệ thống toàn diện nhất của Tử Vi Đẩu Số, do La Hồng Tiên thời Minh san định. Nhấn mạnh mối quan hệ tương hỗ giữa 12 cung và Tứ Hóa, là giáo trình căn bản truyền đời qua nhiều thế kỷ.',
  wordCount: 100000,
  chapters: [
    {
      title: 'Chương 1: Thập Nhị Cung Luận · Cung Mệnh (十二宫论·命宫)',
      subtitle: 'Gốc Rễ Tiên Thiên Định Cách Cục Cuộc Đời (看命之根本)',
      paragraphs: [
        {
          id: 'qs-1-1',
          idx: 1,
          text: '命宫者，一身之根本，万事之枢纽。命宫定，则一生格局定。看命宫先看主星，次看辅煞，再看四化与三方四正之会照。',
          translation: 'Cung Mệnh chính là gốc rễ của cả một đời người, là trục xoay then chốt của muôn sự muôn việc. Cung Mệnh đã định, thì khuôn khổ cách cục cả đời đã thành hình. Khán cung Mệnh trước tiên phải xét chính tinh tọa thủ, thứ hai xét các sao phụ tá và sát tinh vây quanh, sau đó mới tường khán Tứ Hóa cùng sự hội chiếu từ tam phương tứ chính.',
          niNote: 'Thầy Nghê Hải Hà giảng: Mệnh cung là linh hồn của lá số. Một cung Mệnh vững vàng có thể chịu đựng được sóng gió vận hạn; ngược lại nếu cung Mệnh bạc nhược thì gặp vận tốt cũng khó bề gánh vác nổi.',
        },
        {
          id: 'qs-1-2',
          idx: 2,
          text: '命宫主星庙旺，主先天优势，做事事半功倍；落陷则主先天劣势，但反主大成——落陷之人有"不甘"二字推动，反能爆发出庙旺命格做不到的逆袭。',
          translation: 'Chính tinh tại cung Mệnh nếu Miếu Vượng thì chủ có ưu thế thiên bẩm thuận lợi, làm việc thường được nửa công mà gấp đôi kết quả; nếu Lạc Hãm thì chủ xuất phát điểm ban đầu gặp nhiều bất lợi khó khăn. Nhưng chớ vội chê hãm địa: Người có sao hãm địa mang trong lòng hai chữ "bất cam" (không cam chịu), từ đó bộc phát ý chí quật cường tạo nên những cuộc lội ngược dòng ngoạn mục mà người có sao miếu vượng êm ấm không làm nổi.',
          niNote: 'Thầy Nghê nhấn mạnh: Đừng bao giờ sợ sao Lạc Hãm. Người có sao hãm địa trải qua gian truân tôi luyện, một khi phá cách vươn lên thì thành tựu kinh thiên động địa.',
        },
        {
          id: 'qs-1-3',
          idx: 3,
          text: '命宫见六吉星（左辅右弼文昌文曲天魁天钺），主一生贵人不绝；命宫见六煞星（擎羊陀罗火星铃星地空地劫），主多波折磨砺，但若能忍过，反成大器。',
          translation: 'Cung Mệnh hội tụ Lục Cát Tinh (Tả Phụ, Hữu Bật, Văn Xương, Văn Khúc, Thiên Khôi, Thiên Việt), chủ suốt đời quý nhân nâng đỡ không dứt, hành sự thuận lợi; cung Mệnh gặp Lục Sát Tinh (Kình Dương, Đà La, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp), chủ cuộc đời nhiều phen sóng gió tôi luyện, song nếu có ý chí kiên định vượt qua được thử thách thì ắt đúc nên khí phách bậc đại trượng phu.',
          niNote: 'Thầy Nghê dạy: Cát tinh cho ta sự êm ấm, sát tinh cho ta năng lực chiến đấu. Người làm nên việc lớn thời loạn xưa nay không ai là không có sát tinh thủ mệnh.',
        },
      ],
    },
    {
      title: 'Chương 2: Thập Nhị Cung Luận · Cung Tài Bạch (十二宫论·财帛宫)',
      subtitle: 'Cội Nguồn Dòng Tiền & Phương Thức Quản Lý Tài Chính (财源所在)',
      paragraphs: [
        {
          id: 'qs-2-1',
          idx: 1,
          text: '财帛宫主一生之财源、收入、理财方式。财帛宫主星不同，赚钱方式各异：紫微在财主官财，武曲在财主商财，太阴在财主田宅财，巨门在财主口才财。',
          translation: 'Cung Tài Bạch chủ về nguồn tiền của, thu nhập và phong cách quản lý tài chính trong cả đời. Tùy theo chính tinh tọa thủ mà phương thức kiếm tiền khác nhau: Tử Vi tại Tài chủ tiền tài từ chức vụ bổng lộc quản lý; Vũ Khúc tại Tài chủ tiền từ kinh doanh buôn bán tài chính; Thái Âm tại Tài chủ tiền tích lũy từ nhà đất điền sản; Cự Môn tại Tài chủ dùng miệng lưỡi, hùng biện, tư vấn mà sinh tài.',
          niNote: 'Thầy Nghê giảng: Biết sao ở cung Tài sẽ biết định hướng nghề nghiệp kiếm tiền chuẩn xác nhất, tránh việc mang tính cách thích hợp công chức lại đi đầu cơ rủi ro.',
        },
        {
          id: 'qs-2-2',
          idx: 2,
          text: '财帛宫化禄入命，主财源广进；财帛宫化忌，主财来财去；财帛宫见禄存，主稳定积累；财帛宫遇空劫，主财耗虚名。',
          translation: 'Cung Tài Bạch có Hóa Lộc chiếu Mệnh, chủ tài vận dồi dào tự nhiên đến tay; Tài Bạch Hóa Kỵ, chủ tiền vào tay trái ra tay phải, khó giữ được vốn; Tài Bạch gặp Lộc Tồn, chủ tích lũy vững chắc như hũ bạc chôn dưới đất; Tài Bạch gặp Địa Không Địa Kiếp, chủ hao tài tốn của, danh nghĩa bề ngoài có tiền nhưng thực chất rỗng túi.',
          niNote: 'Thầy Nghê dạy: Người có Không Kiếp ở Tài Bạch thì tiền bạc chỉ là phù du. Thay vì giữ tiền mặt thì nên chuyển hóa thành tri thức hoặc công đức xã hội.',
        },
      ],
    },
    {
      title: 'Chương 3: Thập Nhị Cung Luận · Cung Quan Lộc (十二宫论·官禄宫)',
      subtitle: 'Gốc Rễ Chức Nghiệp & Thành Tựu Xã Hội (事业之根)',
      paragraphs: [
        {
          id: 'qs-3-1',
          idx: 1,
          text: '官禄宫主事业、地位、社会成就。官禄宫主星不同，事业方向各异：紫微在官宜大平台高位，太阳在官宜公务名声，武曲在官宜金融实业，廉贞在官宜文武兼备。',
          translation: 'Cung Quan Lộc (hay Sự Nghiệp Cung) chủ về chức vụ, danh thế và thành tựu xã hội của đương số. Chính tinh khác nhau chỉ ra lộ trình phát triển nghề nghiệp khác nhau: Tử Vi cư Quan thích hợp làm việc trong các tổ chức quy mô lớn, nắm giữ vị trí quản lý then chốt; Thái Dương cư Quan thích hợp phụng sự cơ quan nhà nước, ngoại giao và hướng đến danh tiếng quang minh; Vũ Khúc cư Quan thích hợp ngành tài chính ngân hàng, thương mại thực nghiệp; Liêm Trinh cư Quan thích hợp công tác đòi hỏi tính kỷ luật cao, tư pháp hoặc công nghệ kỹ thuật.',
          niNote: 'Thầy Nghê giảng: Quan Lộc cung cho biết đương số phù hợp làm chủ hay làm thuê, làm quan văn hay quan võ, làm chuyên môn hay làm quản lý điều hành.',
        },
        {
          id: 'qs-3-2',
          idx: 2,
          text: '官禄宫化权入命，主能独当一面；化禄入官，主财从职业来；化忌入官，主职场波折。',
          translation: 'Quan Lộc cung có Hóa Quyền chiếu Mệnh, chủ có năng lực tự thân gánh vác độc lập tác chiến, được cấp trên trao trọn quyền hành; Hóa Lộc nhập Quan Lộc, chủ tiền tài phát sinh dồi dào chính từ công việc chuyên môn; Hóa Kỵ nhập Quan Lộc, chủ bước đường thăng tiến gặp nhiều phen trắc trở, cần kiên nhẫn tích lũy kinh nghiệm không nên manh động nhảy việc.',
          niNote: 'Thầy Nghê nhấn mạnh: Khi Quan Lộc gặp Hóa Kỵ thì nên tập trung trau dồi chuyên môn cho thật vững chắc, lấy thực học để vượt qua phong ba chốn công sở.',
        },
      ],
    },
    {
      title: 'Chương 4: Thập Nhị Cung Luận · Cung Phu Thê (十二宫论·夫妻宫)',
      subtitle: 'Khí Trường Bạn Đời & Tình Trạng Hôn Nhân (配偶气场)',
      paragraphs: [
        {
          id: 'qs-4-1',
          idx: 1,
          text: '夫妻宫主配偶气质、婚姻状态。夫妻宫紫微主配偶端庄威权，宜迟婚；夫妻宫贪狼主配偶多情，桃花重；夫妻宫天梁主配偶成熟稳重，年长。',
          translation: 'Cung Phu Thê chủ về khí chất của người bạn đời và trạng thái tình cảm lứa đôi. Cung Phu Thê có Tử Vi tọa thủ chủ người phối ngẫu đoan trang, có uy quyền và lòng tự trọng cao, nên kết hôn muộn; cung Phu Thê có Tham Lang chủ người bạn đời đa tình, duyên dáng, sức hút đào hoa lớn; cung Phu Thê có Thiên Lương chủ người bạn đời chín chắn, đĩnh đạc, tính tình như bậc trưởng bối hoặc chênh lệch tuổi tác rõ nét.',
          niNote: 'Thầy Nghê dạy: Xem cung Phu Thê không chỉ để biết tướng mạo tính tình bạn đời, mà quan trọng là biết cách ứng xử, nhường nhịn và thấu hiểu để giữ gìn mái ấm gia đình.',
        },
        {
          id: 'qs-4-2',
          idx: 2,
          text: '夫妻宫化忌冲命，主婚姻多波折。夫妻宫见六煞，需特别注意感情之磨砺。夫妻宫见六吉，主配偶贵人。',
          translation: 'Cung Phu Thê có Hóa Kỵ xung chiếu về cung Mệnh, chủ tình duyên nhiều khúc quanh trắc trở, vợ chồng dễ có những bất đồng sâu sắc về quan điểm sống; cung Phu Thê hội họp Lục Sát Tinh thì hôn nhân phải trải qua nhiều phen tôi luyện thử thách; cung Phu Thê gặp Lục Cát Tinh hội tụ thì người bạn đời chính là quý nhân lớn nhất trong cuộc đời nâng đỡ bản thân.',
          niNote: 'Thầy Nghê nhắc nhở: Hôn nhân là sự tu dưỡng đôi bên. Thấy Phu Thê có sát tinh hay Hóa Kỵ thì nên lấy sự bao dung, lắng nghe và nhẫn nại làm đầu, kết hôn muộn cũng là một cách hóa giải tuyệt vời.',
        },
      ],
    },
    {
      title: 'Chương 5: Tứ Hóa Luận (四化论)',
      subtitle: 'Bản Chất Lộc Quyền Khoa Kỵ & Quy Luật Bất Biến (化禄化权化科化忌)',
      paragraphs: [
        {
          id: 'qs-5-1',
          idx: 1,
          text: '四化为命盘之精华——化禄主财、化权主势、化科主名、化忌主病。四化所在宫位，决定一生重大事件之节点。',
          translation: 'Tứ Hóa chính là tinh hoa cốt tủy của lá số Tử Vi Đẩu Số: Hóa Lộc chủ tài lộc sung túc, Hóa Quyền chủ quyền thế ý chí, Hóa Khoa chủ thanh danh học vấn, Hóa Kỵ chủ chướng ngại bài học rèn luyện. Vị trí cung vị mà Tứ Hóa an tọa sẽ quyết định then chốt những cột mốc sự kiện trọng đại nhất của một kiếp nhân sinh.',
          niNote: 'Thầy Nghê giảng: 14 chính tinh là thân thể, còn Tứ Hóa chính là thần khí và năng lượng chuyển động. Không nắm vững Tứ Hóa thì không thể nắm bắt được biến dịch của vận mệnh.',
        },
        {
          id: 'qs-5-2',
          idx: 2,
          text: '生年四化为本命四化，永远固定；倪师强调四化星不动，只看大限流年走到何处。北派飞星派之自化、宫干飞化、来因宫等，倪师不主张使用。',
          translation: 'Sinh Niên Tứ Hóa là Tứ Hóa của bản mệnh tiên thiên, vĩnh viễn cố định bất biến trên lá số; Danh sư Nghê Hải Hà đặc biệt nhấn mạnh rằng Tứ Hóa tinh an vị tại cung nào thì giữ nguyên ở cung đó, chỉ cần quan sát Đại Hạn 10 năm và Lưu Niên từng năm bước vào cung vị nào để kích hoạt cát hung. Các quan điểm phi tinh phức tạp của Bắc Phái (như tự hóa, cung can phi hóa, lai nhân cung...) thầy Nghê kiên quyết không áp dụng nhằm giữ vững sự thuần khiết chuẩn mực của Đẩu Số.',
          niNote: 'Thầy Nghê dạy: Đạo lớn chí giản (Đại đạo chí giản). Đừng làm rối rắm lá số bằng hàng trăm đường phi tinh vẽ chằng chịt. Cứ nắm chắc Sinh Niên Tứ Hóa và Đại Hạn là bách phát bách trúng.',
        },
        {
          id: 'qs-5-3',
          idx: 3,
          text: '化禄入命三方四正：财源稳定，缘分广，能力可变现。化禄入夫妻：婚姻甜蜜。化禄入官禄：事业财源相应。',
          translation: 'Hóa Lộc nhập tam phương tứ chính của cung Mệnh: Nguồn tiền của phát triển ổn định, nhân duyên xã hội rộng mở, có năng lực biến đổi tài nghệ thành của cải thực tế; Hóa Lộc nhập cung Phu Thê: Hôn nhân ngọt ngào đầm ấm, vợ chồng hòa thuận tương trợ; Hóa Lộc nhập cung Quan Lộc: Sự nghiệp và tiền tài tương hỗ lẫn nhau, làm việc gì cũng sinh lợi.',
          niNote: 'Thầy Nghê giảng: Hóa Lộc ở đâu thì mùa xuân và sự hoan hỷ ở đó. Đó là nơi được trời ban phước lành và sự suôn sẻ trong đời sống.',
        },
        {
          id: 'qs-5-4',
          idx: 4,
          text: '化忌入命三方四正：一生有深刻功课，宜面对而非逃避。化忌入夫妻：婚姻多磨砺。化忌入官禄：事业多波折，但磨练后反成专业人才。',
          translation: 'Hóa Kỵ nhập tam phương tứ chính của cung Mệnh: Cả đời có một bài học rèn luyện sâu sắc, cần dũng cảm đối diện thẳng thắn thay vì lẩn tránh; Hóa Kỵ nhập cung Phu Thê: Đời sống hôn nhân nhiều phen va chạm thử thách lòng kiên nhẫn; Hóa Kỵ nhập cung Quan Lộc: Bước đường công danh sự nghiệp nhiều thăng trầm, song chính sự cọ xát đó lại trui rèn bản thân thành chuyên gia hàng đầu tinh thông nghiệp vụ.',
          niNote: 'Thầy Nghê khuyên răn: Hóa Kỵ là người thầy nghiêm khắc nhất của cuộc đời. Kẻ biết học hỏi từ thất bại của Hóa Kỵ ắt sẽ bước lên đỉnh cao vinh quang.',
        },
      ],
    },
    {
      title: 'Chương 6: Cơ Nguyệt Đồng Lương Cách (机月同梁格)',
      subtitle: 'Bản Mệnh Tích Lũy Vững Bền · Thanh Liêm Hanh Thông (稳定累积之命)',
      paragraphs: [
        {
          id: 'qs-6-1',
          idx: 1,
          text: '天机太阴天同天梁四星齐入命三方四正，称机月同梁格。文质彬彬、聪慧善谋，最适合公职、学术、文艺、医疗、服务等需稳定累积的行业。',
          translation: 'Bốn sao Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương cùng hội tụ tại tam phương tứ chính của cung Mệnh, xưng là Cơ Nguyệt Đồng Lương cách. Chủ phong cách nho nhã lịch thiệp, tâm trí thông minh giỏi mưu lược, thích hợp nhất làm việc trong cơ quan nhà nước, nghiên cứu học thuật, giáo dục đào tạo, y tế sức khỏe, văn học nghệ thuật và các ngành nghề tích lũy bền bỉ.',
          niNote: 'Thầy Nghê dạy: Cơ Nguyệt Đồng Lương là dòng nước chảy êm đềm, không nên gượng ép theo đuổi những phi vụ làm ăn may rủi đầu cơ.',
        },
        {
          id: 'qs-6-2',
          idx: 2,
          text: '机月同梁作吏人——古云此格者宜担任公职、行政文书工作，安稳一生。再会昌曲化科，主名声远播。最忌煞星过多，则反主多变难安。',
          translation: 'Cổ nhân đúc kết: "Cơ Nguyệt Đồng Lương tác lại nhân" - người mang cách cục này làm cán bộ công chức, quản lý văn thư hành chính thì trọn đời an khang vinh hiển. Nếu hội tụ thêm Văn Xương Văn Khúc và Hóa Khoa thì danh tiếng học thuật lẫy lừng. Kỵ nhất gặp quá nhiều sát tinh xâm phạm, sẽ khiến tâm trí bất định, hay lo âu và công việc dễ bị xáo trộn.',
          niNote: 'Thầy Nghê giảng: Nếu có sát tinh thì nên dùng tài năng chuyên môn kỹ thuật để giải tỏa, biến năng lượng sát tinh thành sự tỉ mỉ sắc bén trong công việc.',
        },
      ],
    },
    {
      title: 'Chương 7: Song Lộc Triều Viên Cách (双禄朝垣格)',
      subtitle: 'Phú Tỷ Đào Chu · Tiền Tài Dồi Dào Sung Mãn (富比陶朱)',
      paragraphs: [
        {
          id: 'qs-7-1',
          idx: 1,
          text: '化禄与禄存同会命宫三方四正，称双禄朝垣格。古云"双禄朝垣，富比陶朱"，主一生不愁财，多有正财横财兼得。',
          translation: 'Hóa Lộc cùng Lộc Tồn cùng tề tựu hội chiếu về tam phương tứ chính của cung Mệnh, xưng là cách Song Lộc Triều Viên. Cổ thư ca ngợi: "Song Lộc triều viên, phú bỉ Đào Chu", chủ suốt một đời tiền tài sung túc dư dả không lo thiếu thốn, thường được cả nguồn thu chính nghiệp vững chắc lẫn những cơ hội tài lộc bất ngờ.',
          niNote: 'Thầy Nghê nhấn mạnh: Đào Chu Công Phạm Lãi là bậc thương nhân kỳ tài biết tích tài và cũng biết tán tài giúp đỡ người nghèo. Người đắc Song Lộc cần noi theo đạo lý đó mới giữ được phúc lộc bền lâu.',
        },
        {
          id: 'qs-7-2',
          idx: 2,
          text: '双禄朝垣最忌空劫——空劫一冲，则双禄成虚名。需见左辅右弼或文昌文曲，方为正格。',
          translation: 'Cách Song Lộc Triều Viên kỵ nhất bị Địa Không Địa Kiếp xung phá - Địa Không Địa Kiếp mà xung vào thì hai chữ Song Lộc dễ trở thành hư danh, tiền bạc tụ rồi lại tán. Cần phải hội kiến Tả Phụ Hữu Bật hoặc Văn Xương Văn Khúc phò tá che chắn thì mới chân chính là thượng cách đại phú đại quý.',
          niNote: 'Thầy Nghê dạy: Không Kiếp ví như đáy túi bị thủng. Có Lộc mà gặp Không Kiếp thì kiếm được mười tiêu chín, cần biết nhờ người thân cẩn trọng giữ gìn tài sản giùm.',
        },
      ],
    },
  ],
};
