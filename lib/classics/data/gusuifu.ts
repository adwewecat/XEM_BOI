/**
 * 《骨髓赋》— Cốt Tủy Phú (Khẩu quyết cốt lõi Tử Vi Đẩu Số)
 *
 * Bản in thời Minh (Minh Đại San Bản)
 * Là khẩu quyết tinh hoa và cô đọng nhất của Tử Vi Đẩu Số, toàn văn khoảng 1500 chữ.
 * Danh sư Nghê Hải Hà trong giáo trình 《Thiên Kỷ》 đã nhiều lần trích dẫn phân tích.
 */

import type { Book } from '../types';

export const guSuiFu: Book = {
  title: 'Cốt Tủy Phú (骨髓赋)',
  slug: 'gusuifu',
  dynasty: 'Thời Minh (明代)',
  author: 'Di sản Cổ Tịch Tử Vi Đẩu Số (Truyền Thừa Trần Đoàn)',
  intro: 'Khẩu quyết cốt lõi cô đọng bậc nhất của Tử Vi Đẩu Số, toàn văn ước chừng 1500 chữ. Danh sư Nghê Hải Hà trong giáo trình 《Thiên Kỷ》 đã nhiều lần trích dẫn phú này, là tác phẩm kinh điển gối đầu giường bắt buộc đối với người học mệnh lý.',
  wordCount: 1500,
  chapters: [
    {
      title: 'Chương 1: Tổng Luận Thiên (总论篇)',
      subtitle: 'Lập Luận Căn Bản Của Tử Vi Đẩu Số (紫微斗数基本立论)',
      paragraphs: [
        {
          id: 'gsf-1-1',
          idx: 1,
          text: '太极星曜，乃群星之主。紫微帝座，为众星之尊。天府令星，南北斗化禄、化权、令星；左辅右弼，主祭祀之星。',
          translation: 'Các vì tinh tú khởi nguồn từ Thái Cực, là chúa tể muôn sao. Tinh diệu Tử Vi ngôi vị Đế Tòa, chính là bậc chí tôn đứng đầu vạn tinh. Thiên Phủ là lệnh tinh của Nam Bắc Đẩu, chưởng quản hóa khí tài lộc và quyền lệnh; Tả Phụ Hữu Bật là bề tôi đắc lực, chủ phụ tá và thừa hành quyền bính.',
          niNote: 'Thầy Nghê Hải Hà giảng: Trong Tử Vi Đẩu Số, Tử Vi ví như ông vua, Thiên Phủ ví như vị quan thủ kho quốc gia. Vua muốn trị vì thiên hạ thì bắt buộc phải có quan văn tướng võ phò tá, do đó Tử Vi rất cần Tả Phụ Hữu Bật đồng hội.',
        },
        {
          id: 'gsf-1-2',
          idx: 2,
          text: '紫微为君，以左辅右弼为相。天府为臣，以禄存为府库。天机为善，天梁为荫，遇之则吉；廉贞为囚，破军为耗，逢之则凶。',
          translation: 'Tử Vi là bậc đế vương, lấy Tả Phụ Hữu Bật làm tể tướng phụ tá. Thiên Phủ là bậc đại thần coi sóc kho tàng, lấy Lộc Tồn làm ngân khố tích trữ. Thiên Cơ chủ thiện lành trí tuệ, Thiên Lương chủ ấm che chở chở che, hội họp ắt cát lợi; Liêm Trinh hóa khí là tù, Phá Quân hóa khí là hao tán, gặp phải dễ sinh sóng gió trắc trở.',
          niNote: 'Thầy Nghê nhấn mạnh: Xem số phải nắm chắc hóa khí bản chất của từng tinh diệu. Thiên Lương là sao che chở, lâm nạn hóa cát; còn Liêm Trinh gặp Hóa Kỵ thì dễ dính vòng lao lý; Phá Quân chủ tiên phá hậu thành, biến động khôn lường.',
        },
        {
          id: 'gsf-1-3',
          idx: 3,
          text: '看命之要，先看命宫。命宫主星定其格局，三方四正定其用武。次看身宫，身宫定其晚景与依归。再看大限流年，定其一生进退之节。',
          translation: 'Yếu quyết xem mệnh: Trước tiên phải tường khán cung Mệnh. Chính tinh tại cung Mệnh định rõ khuôn khổ cách cục tiên thiên, tam phương tứ chính định rõ môi trường phát huy tài năng và nơi thi thố. Tiếp theo xem cung Thân để biết hậu vận từ trung niên trở đi và chốn quy tụ tinh thần. Sau đó mới tham chiếu Đại Hạn 10 năm và Lưu Niên từng năm để định rõ nhịp điệu tiến thoái trong đời.',
          niNote: 'Thầy Nghê dạy: Mệnh là gốc rễ tiên thiên (trước 30 tuổi), Thân là hành động thực tế hậu thiên (sau 30 tuổi). Muốn biết cả đời hưng suy, phải phối hợp nhịp nhàng giữa Đại Hạn và cung Mệnh Thân.',
        },
      ],
    },
    {
      title: 'Chương 2: Tử Vi Tinh Luận (紫微星论)',
      subtitle: 'Đế Tòa Tôn Quý · Đắc Phụ Bật Mới Quý Hiển (帝座之尊 得辅则贵)',
      paragraphs: [
        {
          id: 'gsf-2-1',
          idx: 1,
          text: '紫微为帝座之星，得辅弼则贵，得昌曲则秀，得魁钺则贵人扶持。紫微独坐无辅，纵贵不久；得三方四正之吉星会照，方为正宗大格。',
          translation: 'Tử Vi là sao Đế Tòa, hội được Tả Phụ Hữu Bật thì quyền quý tột bậc, gặp Văn Xương Văn Khúc thì nho nhã thanh tú, gặp Thiên Khôi Thiên Việt thì có quý nhân quyền thế nâng đỡ. Nếu Tử Vi độc tọa mà không có cát tinh phò tá, gọi là cô quân, dẫu có quý hiển cũng chẳng bền; chỉ khi tam phương tứ chính có chư cát tinh hội chiếu mới thành đại cách chính tông.',
          niNote: 'Thầy Nghê giảng: Tử Vi đứng một mình không có Tả Hữu, Xương Khúc giống như vị vua trơ trọi, dễ sinh tính tự phụ, cô độc, ý chí lớn nhưng khó bề thành việc lớn. Gặp cát tinh hội mới chân chính là bậc lãnh đạo.',
        },
        {
          id: 'gsf-2-2',
          idx: 2,
          text: '紫微在子午为「面南背北」之贵，主大富大贵；紫微在丑未与破军同宫，主刚毅果决；紫微在寅申与天府同宫，称「紫府同宫」格，主品端衣食丰足。',
          translation: 'Tử Vi tọa thủ hai cung Tý Ngọ xưng là cách Cực Hướng Ly Minh (ngoảnh mặt về phương Nam xưng đế), chủ đại phú đại quý; Tử Vi tại Sửu Mùi đồng cung với Phá Quân, chủ tính tình cương nghị, quả quyết, dám nghĩ dám làm; Tử Vi tại Dần Thân đồng cung với Thiên Phủ, gọi là Tử Phủ Đồng Cung cách, chủ nhân cách đoan chính, phúc lộc áo cơm sung túc vẹn toàn.',
          niNote: 'Thầy Nghê dạy: Tử Phủ ở Dần Thân là hai đại đế tinh cùng hội tụ, phúc trạch sâu dày. Nhưng cần chú ý Tử Vi độc đoán còn Thiên Phủ cẩn trọng, nếu không có cát tinh nâng đỡ thì trong lòng hay do dự mâu thuẫn.',
        },
        {
          id: 'gsf-2-3',
          idx: 3,
          text: '紫微居官禄，无煞冲破，必为高官；紫微居田宅，主有祖业，又能自置；紫微居夫妻，主配偶端庄，气质不凡，但宜迟婚不宜早。',
          translation: 'Tử Vi cư cung Quan Lộc, nếu không bị lục sát tinh xung phá, ắt nắm giữ chức vụ cao trong chính quyền hoặc lãnh đạo doanh nghiệp; Tử Vi cư cung Điền Trạch, chủ được thừa kế điền sản tổ nghiệp, lại có năng lực tự tay gầy dựng thêm gia sản; Tử Vi cư cung Phu Thê, chủ người bạn đời đoan trang quý phái, khí chất hơn người, nhưng nên kết hôn muộn mới bền đẹp.',
          niNote: 'Thầy Nghê nhắc nhở: Tử Vi ở cung Thê/Phu thì bạn đời có lòng tự trọng và tính khí áp đảo, kết hôn sớm dễ tranh giành quyền lãnh đạo trong gia đình gây sứt mẻ.',
        },
        {
          id: 'gsf-2-4',
          idx: 4,
          text: '紫微忌空劫，主有位无禄。紫微忌孤君无辅，主孤峰独峙，难成大事。紫微化权主独断，紫微化科主名声，紫微化忌主受制于人。',
          translation: 'Tử Vi tối kỵ gặp Địa Không Địa Kiếp, chủ có danh vị quyền tước nhưng tài lộc hư hao (hữu vị vô lộc). Tử Vi kỵ nhất là thế cô quân vô phụ, ví như đỉnh núi chơ vơ một mình, khó thành tựu nghiệp lớn. Tử Vi Hóa Quyền chủ độc đoán quyết đoán mạnh mẽ; Tử Vi Hóa Khoa chủ danh tiếng lẫy lừng; Tử Vi Hóa Kỵ chủ bị cấp trên hay thời thế kìm kẹp, trói buộc.',
          niNote: 'Thầy Nghê giảng: Tử Vi gặp Không Kiếp tâm tính hướng thượng nhưng lý tưởng viển vông, thích hợp làm nghiên cứu học thuật hoặc tôn giáo, không nên dấn thân vào thương trường.',
        },
      ],
    },
    {
      title: 'Chương 3: Thất Sát Tinh Luận (七杀星论)',
      subtitle: 'Tướng Tinh Cô Độc · Thích Hợp Nghiệp Võ (将星孤独 宜武职)',
      paragraphs: [
        {
          id: 'gsf-3-1',
          idx: 1,
          text: '七杀为将星，性刚毅果决。七杀守命，不喜与诸吉同宫，独行其道方为本格。七杀逢空劫，主孤独漂泊，事业难成。',
          translation: 'Thất Sát là sao Thượng Tướng dũng mãnh, tâm tính cương nghị, quả đoán phi thường. Thất Sát thủ cung Mệnh có khí phách độc lập tác chiến, không ỷ lại vào người khác. Nếu Thất Sát ngộ Không Kiếp thì cuộc đời trôi nổi phiêu bạt, sự nghiệp dễ dang dở nửa chừng.',
          niNote: 'Thầy Nghê nhấn mạnh: Thất Sát là thanh gươm báu nơi sa trường. Người mệnh Thất Sát có dũng khí đối đầu hiểm nguy, lập nghiệp từ bàn tay trắng, nhưng cần tôi luyện qua gian khổ mới phát huy trọn vẹn sức mạnh.',
        },
        {
          id: 'gsf-3-2',
          idx: 2,
          text: '七杀朝斗格：七杀居子午、寅申，对宫紫微天府相照，主爵禄荣昌。最宜军警武职、开疆拓土。一生贵气难挡，但需经磨炼方成大器。',
          translation: 'Thất Sát Triều Đẩu cách: Thất Sát an tại bốn cung Tý, Ngọ, Dần, Thân, đối cung có Tử Vi Thiên Phủ chiếu về, chủ tước lộc vinh hoa, công danh hiển hách. Rất thích hợp theo ngành quân cảnh, tư pháp, y khoa ngoại khoa hoặc tiên phong khai phá thị trường mới. Cả đời quý khí dồi dào, song phải qua bão táp tôi luyện mới thành đại khí.',
          niNote: 'Thầy Nghê giảng: Thất Sát Triều Đẩu là đại cách của bậc dũng tướng lập chiến công hiển hách. Cung đối diện là Tử Phủ cung cấp hậu phương vững chắc và uy quyền tối cao.',
        },
        {
          id: 'gsf-3-3',
          idx: 3,
          text: '七杀逢羊陀，主刑伤血光；七杀逢火铃，主威武刚烈；七杀逢化禄，主一身武贵；七杀逢化忌，反主消沉，事业多败。',
          translation: 'Thất Sát hội Kình Dương Đà La, chủ thương tích huyết quang hình pháp; Thất Sát hội Hỏa Tinh Linh Tinh, tăng thêm vẻ uy vũ cương liệt nhưng tính khí nóng nảy; Thất Sát đắc Lộc thì một đời võ quý, nắm binh quyền và tài chính dồi dào; Thất Sát gặp Hóa Kỵ xung chiếu thì dễ chán nản tiêu trầm, sự nghiệp gặp nhiều phen đổ vỡ.',
          niNote: 'Thầy Nghê dạy: Thất Sát bản thân mang tính sát phạt, nếu gặp thêm Kình Dương thì lưỡi gươm quá bén nhọn, dễ làm tổn thương chính mình và người khác. Cần có Lộc hoặc Khoa chế giảm bớt sát khí.',
        },
      ],
    },
    {
      title: 'Chương 4: Sát Phá Tham Cách (杀破狼格)',
      subtitle: 'Khai Sáng Xung Trận · Vận Mệnh Biến Động (开创闯荡 变动之命)',
      paragraphs: [
        {
          id: 'gsf-4-1',
          idx: 1,
          text: '七杀、破军、贪狼三星会命迁财官，称「杀破狼格」。主一生变动多、不甘平凡，宜创业、军警、业务。年轻易冲动失利，中年后方能稳定守成。',
          translation: 'Ba sao Thất Sát, Phá Quân, Tham Lang luôn luôn tam hợp chiếu về cung Mệnh, Thiên Di, Tài Bạch, Quan Lộc, gọi là cách Sát Phá Tham. Chủ cuộc đời nhiều phen biến động, không cam chịu cuộc sống an phận thủ thường, rất thích hợp khởi nghiệp, làm kinh doanh, quân cảnh, đối ngoại. Tuổi trẻ dễ vì bốc đồng mà va vấp, qua tuổi trung niên mới vững vàng gặt hái thành công.',
          niNote: 'Thầy Nghê giảng: Sát Phá Tham là biểu tượng của tinh thần đổi mới và khai phá. Người mang cách này không bao giờ chịu ngồi yên một chỗ, sóng gió càng lớn thì ý chí vươn lên càng mạnh.',
        },
        {
          id: 'gsf-4-2',
          idx: 2,
          text: '杀破狼三方有化禄或化权，主动得有力，可成大事；若三方煞星过重（羊陀火铃齐照），主动而无成，宜静守。',
          translation: 'Bộ Sát Phá Tham trong tam phương nếu hội được Hóa Lộc hoặc Hóa Quyền, chủ hành động quyết liệt, có nội lực dồi dào để kiến tạo đại nghiệp; ngược lại nếu tam phương tụ tập quá nhiều sát tinh (Kình Đà Hỏa Linh hội tụ), chủ bôn ba vất vả mà công dã tràng, lúc này nên an tĩnh tu dưỡng, giữ gìn sự ổn định.',
          niNote: 'Thầy Nghê nhấn mạnh: Động phải có mưu trí và lực đỡ. Sát Phá Tham có Hóa Quyền là hành động có định hướng chiến lược; nếu toàn sát tinh mà không có cát hóa thì chỉ là liều lĩnh mù quáng.',
        },
      ],
    },
    {
      title: 'Chương 5: Cơ Nguyệt Đồng Lương Cách (机月同梁)',
      subtitle: 'Tích Lũy Vững Bền · Thích Hợp Nghiệp Công Chức (稳定累积 宜公职)',
      paragraphs: [
        {
          id: 'gsf-5-1',
          idx: 1,
          text: '天机、太阴、天同、天梁四星齐入命迁财官，称「机月同梁格」。主文质彬彬、聪慧善谋。最适合公职、学术、文艺、医疗、服务等需稳定累积的行业，不宜大冒险大投机。',
          translation: 'Bốn sao Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương cùng hội hợp tại cung Mệnh, Di, Tài, Quan xưng là cách Cơ Nguyệt Đồng Lương. Chủ tâm tính nho nhã, văn chất phong lưu, thông tuệ và giỏi mưu lược. Thích hợp nhất làm việc trong cơ quan nhà nước, nghiên cứu học thuật, giáo dục y tế, văn hóa nghệ thuật và các ngành dịch vụ tích lũy lâu dài, không nên đầu cơ mạo hiểm.',
          niNote: 'Thầy Nghê giảng: Cơ Nguyệt Đồng Lương là mẫu người tham mưu, trí thức chuẩn mực. Họ giỏi lên kế hoạch, quản lý hành chính và nghiên cứu chuyên sâu, nhưng thiếu tính liều lĩnh xông pha của Sát Phá Tham.',
        },
        {
          id: 'gsf-5-2',
          idx: 2,
          text: '机月同梁作吏人——古云此格者宜担任公职、行政文书工作，安稳一生。再会昌曲化科，主名声远播。最忌煞星过多，则反主多变难安。',
          translation: 'Cổ nhân có câu: "Cơ Nguyệt Đồng Lương tác lại nhân" - người mang cách cục này giữ các chức việc hành chính, thư ký, tư vấn pháp lý thì trọn đời an ổn vinh hiển. Nếu hội thêm Xương Khúc, Hóa Khoa thì danh tiếng học vấn vang xa. Kỵ nhất gặp nhiều sát tinh xung phá, sẽ biến thành tâm trí lo toan, bất an và hay đổi dời công việc.',
          niNote: 'Thầy Nghê dạy: Người xưa gọi "lại nhân" tức là quan chức hành chính văn phòng. Ngày nay chính là cán bộ công chức, kỹ sư phần mềm, giảng viên đại học, chuyên gia tài chính kế toán.',
        },
      ],
    },
    {
      title: 'Chương 6: Tứ Hóa Tinh Luận (四化星论)',
      subtitle: 'Cát Hung Biến Hóa · Lộc Quyền Khoa Kỵ (化禄化权化科化忌之吉凶)',
      paragraphs: [
        {
          id: 'gsf-6-1',
          idx: 1,
          text: '化禄主财、主缘、主能力变现；化权主权、主决断、主独当一面；化科主名、主贵人、主文书；化忌主病、主煞、主深刻功课。',
          translation: 'Hóa Lộc chủ nguồn tài lộc, chủ nhân duyên tốt đẹp và năng lực biến đổi tri thức thành của cải; Hóa Quyền chủ quyền uy, năng lực quyết đoán và phong thái gánh vác việc lớn; Hóa Khoa chủ thanh danh, quý nhân nâng đỡ và bằng cấp thi cử; Hóa Kỵ chủ chướng ngại, hình khắc và bài học rèn luyện sâu sắc nhất trong kiếp nhân sinh.',
          niNote: 'Thầy Nghê giảng: Tứ Hóa là linh hồn của lá số Tử Vi, là động cơ thúc đẩy số mệnh xoay vần. Không có Tứ Hóa thì tinh diệu chỉ là tĩnh tại, có Tứ Hóa mới hiển hiện sinh động họa phúc.',
        },
        {
          id: 'gsf-6-2',
          idx: 2,
          text: '化禄入命，财源广进；化权入命，能担大任；化科入命，名声远播；化忌入命，须经磨炼方能成器。',
          translation: 'Hóa Lộc nhập cung Mệnh, tài nguyên cuồn cuộn đổ về, cuộc sống hanh thông sung túc; Hóa Quyền nhập cung Mệnh, có phong thái lãnh đạo, đủ sức đảm đương trọng trách quốc gia doanh nghiệp; Hóa Khoa nhập cung Mệnh, tiếng thơm lưu truyền, được xã hội kính trọng; Hóa Kỵ nhập cung Mệnh, phải trải qua nhiều phen thăng trầm thử thách mới rèn đúc nên bản lĩnh phi thường.',
          niNote: 'Thầy Nghê dạy: Hóa Kỵ nhập Mệnh không phải là tận thế, mà là lò luyện kim cương. Người vượt qua được Hóa Kỵ tuổi trẻ thì trung hậu vận sẽ có trí tuệ và sự thấu suốt vượt xa người thường.',
        },
        {
          id: 'gsf-6-3',
          idx: 3,
          text: '化忌入财，主财来财去；化忌入官，主事业受挫；化忌入夫妻，主婚姻多波折；化忌入子女，主子女缘薄或亲子摩擦。',
          translation: 'Hóa Kỵ nhập cung Tài Bạch, chủ tiền vào tay này ra tay kia, kinh doanh khó giữ vốn; Hóa Kỵ nhập cung Quan Lộc, chủ bước đường sự nghiệp trắc trở, hay bị tiểu nhân dèm pha; Hóa Kỵ nhập cung Phu Thê, chủ tình duyên lận đận, hôn nhân nhiều sóng gió bất đồng; Hóa Kỵ nhập cung Tử Tức, chủ muộn con hoặc tình cảm giữa cha mẹ và con cái có khoảng cách thế hệ.',
          niNote: 'Thầy Nghê nhắc nhở: Hóa Kỵ ở cung nào thì đó là nơi đương số phải dành nhiều tâm sức nhất để tu dưỡng, nhẫn nhịn và bù đắp, chớ nên cưỡng cầu thái quá.',
        },
        {
          id: 'gsf-6-4',
          idx: 4,
          text: '禄存与化禄同会命三方，称「双禄朝垣」，主富比陶朱；化科与化权同会，称「科权双会」，主名权双美。',
          translation: 'Lộc Tồn cùng với Hóa Lộc hội chiếu về tam phương cung Mệnh, gọi là cách Song Lộc Triều Viên, chủ giàu có ngang bậc Đào Chu Công (Phạm Lãi), tiền bạc dồi dào sung túc; Hóa Khoa cùng Hóa Quyền đồng hội tam phương, gọi là Khoa Quyền Song Hội, chủ danh tiếng vang xa mà quyền lực trong tay cũng vững chắc vẹn toàn.',
          niNote: 'Thầy Nghê giảng: Song Lộc là cách kiếm tiền chân chính từ thực lực kết hợp cơ hội trời cho. Khoa Quyền là vừa có thực tài vừa có quyền lực thực chất, là đỉnh cao danh vọng.',
        },
      ],
    },
    {
      title: 'Chương 7: Phụ Bật Khôi Việt Luận (辅弼魁钺论)',
      subtitle: 'Quý Khí Của Lục Cát Tinh (六吉星之贵)',
      paragraphs: [
        {
          id: 'gsf-7-1',
          idx: 1,
          text: '左辅右弼为「相星」，主助力贵人；文昌文曲为「文星」，主聪明俊秀；天魁天钺为「贵人星」，主关键时刻有人扶持。',
          translation: 'Tả Phụ Hữu Bật là Tướng Tinh, chủ trợ lực đắc lực và bạn bè đồng nghiệp hết lòng tương trợ; Văn Xương Văn Khúc là Văn Tinh, chủ tư chất thông tuệ, học rộng tài cao, thanh lịch nho nhã; Thiên Khôi Thiên Việt là Quý Nhân Tinh, chủ vào những thời khắc bước ngoặt sinh tử của đời người luôn có quý nhân quyền cao chức trọng ra tay cứu giúp.',
          niNote: 'Thầy Nghê giảng: Khôi Việt là quý nhân trực tiếp, Tả Hữu là trợ lực bình đẳng từ bạn bè cấp dưới, Xương Khúc là tài hoa học vấn của chính bản thân. Thiếu cát tinh thì hành sự đơn độc vất vả.',
        },
        {
          id: 'gsf-7-2',
          idx: 2,
          text: '六吉星齐会命宫三方四正，主一生贵人不绝、人缘极佳。即使命格平常，亦能借六吉之力达成不凡之业。',
          translation: 'Lục Cát Tinh tề tựu tại tam phương tứ chính của cung Mệnh, chủ suốt một đời quý nhân không dứt, nhân duyên xã hội vô cùng tốt đẹp. Dẫu cho chính tinh cung Mệnh ở mức bình hòa, vẫn có thể nhờ mượn sức mạnh và trợ lực của Lục Cát Tinh mà gầy dựng nên cơ đồ sự nghiệp phi thường.',
          niNote: 'Thầy Nghê nhấn mạnh: Người có Lục Cát Tinh chiếu Mệnh đi đâu cũng được người yêu mến, gặp hoạn nạn hóa giải thành bình an, đó là phúc báo tích lũy từ nhân phẩm thiện lương.',
        },
        {
          id: 'gsf-7-3',
          idx: 3,
          text: '辅弼夹命：左辅右弼夹于命宫前后两宫，主一生贵人扶持，遇困有助。最宜与紫微同宫，称「君臣庆会」格。',
          translation: 'Tả Phụ Hữu Bật Giáp Mệnh cách: Tả Phụ và Hữu Bật nằm kẹp ở hai cung liền kề trước và sau cung Mệnh, chủ trọn đời được quý nhân nâng đỡ, khi sa cơ lỡ bước ắt có người giang tay cứu viện. Cát lợi nhất là khi cung Mệnh có Tử Vi tọa thủ, gọi là Quân Thần Khánh Hội cách, vua tôi sum họp thái bình thịnh trị.',
          niNote: 'Thầy Nghê giảng: Giáp Mệnh giống như đi ra ngoài luôn có hai vị cận vệ tài ba hộ tống hai bên, bảo vệ che chở cho bản thân trước mọi hiểm nguy phong ba.',
        },
      ],
    },
    {
      title: 'Chương 8: Lục Sát Tinh Luận (六煞星论)',
      subtitle: 'Hung Ách Của Kình Đà Hỏa Linh Không Kiếp (羊陀火铃空劫之凶)',
      paragraphs: [
        {
          id: 'gsf-8-1',
          idx: 1,
          text: '擎羊陀罗为「煞星」，主血光、是非、阻碍；火星铃星为「燥星」，主冲动、急躁、伤灾；地空地劫为「空亡」，主财耗、虚名、不实。',
          translation: 'Kình Dương Đà La là hung sát tinh, chủ hình thương huyết quang, thị phi tranh chấp và chông gai trở ngại; Hỏa Tinh Linh Tinh là táo sát tinh, chủ tâm tính bốc đồng, nóng nảy cấp bách và tai họa bất ngờ; Địa Không Địa Kiếp là sao không vong, chủ hao tán tài sản, danh hão hư vô và việc đời không thực chất.',
          niNote: 'Thầy Nghê phân tích: Kình Dương như mũi dao đâm trước mặt (dễ thấy), Đà La như mũi tên bắn lén sau lưng (dây dưa ngấm ngầm). Hỏa Linh bộc phát dữ dội; Không Kiếp cuốn trôi vật chất.',
        },
        {
          id: 'gsf-8-2',
          idx: 2,
          text: '煞星不全是凶——煞星犹如磨刀石，能炼出常人没有的破局力。年轻时易冲动伤己，中年后方能化煞为权。',
          translation: 'Sát tinh không hoàn toàn là hung ác - sát tinh ví như hòn đá mài dao sắc bén, có thể rèn luyện cho đương số năng lực phá vỡ bế tắc mà người thường không thể có được. Lúc trẻ tuổi dễ vì sốc nổi mà làm tổn thương chính mình, nhưng sau tuổi trung niên nếu tôi luyện chín chắn ắt có thể hóa sát thành quyền uy dũng mãnh.',
          niNote: 'Thầy Nghê khuyên răn: Đừng thấy sát tinh mà hoảng sợ. Bậc đại tướng hay vĩ nhân lập quốc xưa nay trong mệnh đều có sát tinh tôi luyện mới thành gang thép.',
        },
        {
          id: 'gsf-8-3',
          idx: 3,
          text: '羊陀夹忌：擎羊陀罗夹于化忌星所在宫，主大凶。其年其大限须特别警觉血光、官非、重大变故。',
          translation: 'Dương Đà Giáp Kỵ cách: Kình Dương và Đà La kẹp hai bên cung có sao Hóa Kỵ tọa thủ, chủ đại hung. Vào năm hạn hoặc Đại Hạn 10 năm đi qua cung vị này, đương số bắt buộc phải hết sức cẩn trọng trước tai ương huyết quang, tranh chấp kiện tụng hình pháp hoặc những biến cố rung chuyển gia đình sự nghiệp.',
          niNote: 'Thầy Nghê cảnh báo: Dương Đà Giáp Kỵ là một trong những thế cục hiểm trở nhất trong Tử Vi. Gặp hạn này tuyệt đối không được đầu tư lớn, không đứng tên bảo lãnh và nên tích cực làm việc thiện để tích đức giải hạn.',
        },
        {
          id: 'gsf-8-4',
          idx: 4,
          text: '空劫夹命：地空地劫夹于命宫前后两宫，主一生宜务虚不务实，宜从事文艺、宗教、玄学等"非实"行业，不宜经商投资。',
          translation: 'Không Kiếp Giáp Mệnh cách: Địa Không và Địa Kiếp kẹp hai bên cung Mệnh, chủ cuộc đời nên theo đuổi con đường tinh thần tư tưởng thay vì mải miết chạy theo vật chất thực dụng. Rất thích hợp dấn thân vào văn học nghệ thuật, triết học, tôn giáo, huyền học hoặc nghiên cứu thuần túy, tối kỵ kinh doanh thương trường và đầu cơ tài chính.',
          niNote: 'Thầy Nghê dạy: Người bị Không Kiếp giáp Mệnh có tư tưởng thanh thoát khác người, không màng danh lợi thì tâm hồn thanh thản; nếu cố lao vào kiếm tiền thì tiền vào nhà trước ra nhà sau.',
        },
      ],
    },
    {
      title: 'Chương 9: Thập Nhị Cung Luận (十二宫论)',
      subtitle: 'Ý Tượng Cung Vị & Quy Luật Cát Hung (各宫主象与吉凶)',
      paragraphs: [
        {
          id: 'gsf-9-1',
          idx: 1,
          text: '命宫为本，三方为用：财帛主财源、官禄主事业、迁移主外缘。三方四正吉星会照，命格方能完整发用。',
          translation: 'Cung Mệnh là gốc rễ nền tảng, tam phương là phương tiện phát huy: Cung Tài Bạch chủ nguồn tiền của tích lũy, cung Quan Lộc chủ chức vụ sự nghiệp, cung Thiên Di chủ môi trường đối ngoại giao tế xã hội. Chỉ khi tam phương tứ chính có nhiều cát tinh tụ hội thì năng lực bản mệnh mới được khai phóng trọn vẹn.',
          niNote: 'Thầy Nghê giảng: Thể và Dụng phải đi đôi. Mệnh tốt mà cung Tài Quan Di suy tàn thì anh hùng không có đất dụng võ; Mệnh bình thường mà Tam Phương rực rỡ thì nhờ thời thế mà nên việc lớn.',
        },
        {
          id: 'gsf-9-2',
          idx: 2,
          text: '夫妻宫看配偶气质，子女宫看子女缘分，疾厄宫看身体罩门，迁移宫看外出运势。各宫主星与四化决定该领域之吉凶进退。',
          translation: 'Cung Phu Thê phản ánh khí chất và tính cách của người bạn đời; cung Tử Tức phản ánh duyên phận và sự thành đạt của con cái; cung Tật Ách chỉ ra điểm yếu tạng phủ và sức khỏe thể chất; cung Thiên Di cho biết vận may khi xuất hành xa xứ. Chính tinh và Tứ Hóa an tại mỗi cung quyết định xu thế cát hung và tiến thoái tại lĩnh vực đó.',
          niNote: 'Thầy Nghê dạy: Xem lá số là xem bức tranh toàn cảnh đời người. Mọi mối quan hệ gia đạo, sức khỏe và sự nghiệp đều phản ánh mật thiết trên 12 cung vị.',
        },
        {
          id: 'gsf-9-3',
          idx: 3,
          text: '田宅宫为命盘财库，正财能否守住看此宫；福德宫为精神享受，心安与否看此宫；父母宫为长辈关系，亦主文书契约。',
          translation: 'Cung Điền Trạch chính là kho tài sản thực sự của cả lá số, muốn biết tiền bạc kiếm được có tích tụ bền lâu thành nhà đất điền sản hay không phải khán tường tận cung này; cung Phúc Đức đại diện cho thế giới tinh thần, hạnh phúc nội tâm và tuổi thọ; cung Phụ Mẫu thể hiện ân tình với các bậc trưởng bối, đồng thời chưởng quản giấy tờ văn thư pháp lý.',
          niNote: 'Thầy Nghê nhấn mạnh: Cung Tài Bạch chỉ biểu thị dòng tiền lưu chuyển hàng ngày, còn Điền Trạch mới là nơi cất giữ tài sản thực. Phúc Đức tốt thì dù sóng gió tâm hồn vẫn an nhiên tự tại.',
        },
        {
          id: 'gsf-9-4',
          idx: 4,
          text: '空宫借对宫论事——某宫无主星时，借其对宫主星论该宫之事。如命宫空宫，借迁移宫主星定命格。',
          translation: 'Quy tắc Mượn Cung khi Vô Chính Diệu: Khi một cung vị không có chính tinh tọa thủ, bắt buộc phải mượn chính tinh của cung đối diện (chính xung) để luận giải cát hung cho cung đó. Ví như cung Mệnh vô chính diệu thì mượn chính tinh cung Thiên Di chiếu về để định cách cục bản mệnh.',
          niNote: 'Thầy Nghê giảng: Cung vô chính diệu giống như ngôi nhà không có chủ tọa trấn, rất dễ bị hoàn cảnh bên ngoài và cung đối diện tác động mạnh mẽ, tâm lý linh hoạt uyển chuyển thích nghi cao.',
        },
      ],
    },
  ],
};
