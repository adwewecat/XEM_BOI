/**
 * 《紫微斗数全集》— Tử Vi Đẩu Số Toàn Tập (Tuyển tập chương cốt lõi)
 *
 * Bản in thời Minh (Tương truyền do Trần Đoàn Lão Tổ truyền thụ)
 * Là một trong những bộ cổ tịch uy quyền và quy mô nhất của Tử Vi Đẩu Số, toàn bộ khoảng 8 vạn chữ.
 * Danh sư Nghê Hải Hà lấy đây làm cội nguồn trích dẫn trọng tâm trong hệ thống 《Thiên Kỷ》.
 */

import type { Book } from '../types';

export const ziWeiQuanJi: Book = {
  title: 'Tử Vi Đẩu Số Toàn Tập (紫微斗数全集)',
  slug: 'quanji',
  dynasty: 'Thời Minh (明代)',
  author: 'Tương truyền do Trần Đoàn Tổ Sư truyền thụ',
  intro: 'Một trong những bộ cổ tịch uy quyền nhất của Tử Vi Đẩu Số, tương truyền do tổ sư Trần Đoàn thời Tống truyền lại. Là cội nguồn trích dẫn trọng tâm trong toàn bộ hệ thống giáo trình 《Thiên Kỷ》 của phái Thiên Kỷ.',
  wordCount: 80000,
  chapters: [
    {
      title: 'Quyển 1: Tổng Luận (卷一·总论)',
      subtitle: 'Cơ Sở Lập Pháp Của Tử Vi Đẩu Số (紫微斗数基本立法)',
      paragraphs: [
        {
          id: 'qj-1-1',
          idx: 1,
          text: '夫紫微斗数者，乃陈抟祖师所传，原以紫微为帝座，统御百星。星曜各有所主，各有庙旺利陷之分，会照吉凶之别。看命者，必先安星，次定命宫身宫，三看十二宫吉凶，四参大限流年之飞化。',
          translation: 'Phàm thuật Tử Vi Đẩu Số do Trần Đoàn Lão Tổ tương truyền, vốn lấy sao Tử Vi làm Đế Tòa chí tôn, thống ngự trăm sao. Mỗi tinh diệu đều có chủ quản riêng biệt, đều có độ sáng Miếu Vượng Lợi Hãm khác nhau, hội chiếu sinh ra muôn vàn cát hung biến ảo. Người xem mệnh, trước tiên phải an sao chuẩn xác, thứ hai định vị cung Mệnh và cung Thân, thứ ba khán tường tận cát hung 12 cung, thứ tư tham chiếu phi hóa của Đại Hạn và Lưu Niên.',
          niNote: 'Thầy Nghê Hải Hà giảng: Xem mệnh không được nhìn một sao đơn lẻ mà phán ngay. Phải an đúng lá số theo Giờ Chân Thái Dương, xem Mệnh Thân làm gốc, rồi phối hợp Tam Phương Tứ Chính và vận hạn mới chuẩn xác.',
        },
        {
          id: 'qj-1-2',
          idx: 2,
          text: '安星之法：先以年干起紫微，紫微所在宫位定，则诸星皆按其法位列十二宫。十四主星各居其位，六吉六煞辅而行之。一盘既定，万象皆现。',
          translation: 'Phương pháp an sao: Trước tiên lấy Cục số và ngày sinh để định vị sao Tử Vi. Khi cung vị của Tử Vi đã định, thì toàn bộ các sao Bắc Đẩu và Nam Đẩu theo quy luật mà an bài khắp 12 cung. Thập Tứ Chính Tinh an vị, Lục Cát Lục Sát phò tá vận hành theo quỹ đạo. Một lá số lập xong, muôn hình vạn trạng của kiếp nhân sinh đều hiển hiện rõ ràng.',
          niNote: 'Thầy Nghê dạy: Vị trí của Tử Vi quyết định toàn bộ cấu trúc bàn cờ tử vi. Tử Vi đi đâu thì Thiên Phủ, Thái Dương, Thái Âm lập tức đối ứng theo trục âm dương đối xứng.',
        },
        {
          id: 'qj-1-3',
          idx: 3,
          text: '命宫为本，主一生格局；身宫为辅，主三十后归向。命身分明，方知一人之进退。三方四正会照，方知一人之用武之地。十二宫各有所主，方知人生之全图。',
          translation: 'Cung Mệnh là gốc rễ, chủ về cách cục nền tảng cả đời; cung Thân là trợ lực, chủ về xu hướng hành động và đích đến sau tuổi 30. Mệnh và Thân phân định rạch ròi, mới hiểu được đường lối tiến thoái của một con người. Tam phương tứ chính hội chiếu, mới rõ đất dụng võ của người đó ở đâu. 12 cung đều có lĩnh vực chủ quản, mới thấy trọn vẹn bức tranh đời người.',
          niNote: 'Thầy Nghê nhấn mạnh: Người Mệnh yếu mà Thân vượng thì tiền vận vất vả nhưng hậu vận rực rỡ; ngược lại Mệnh vượng mà Thân suy thì tuổi trẻ kiêu hãnh nhưng về già dễ sa sút. Phải xem cả hai.',
        },
      ],
    },
    {
      title: 'Quyển 2: Tử Vi Tinh Luận (卷二·紫微星论)',
      subtitle: 'Đế Tòa Tôn Quý · Thống Lĩnh Vạn Tinh (帝座之尊)',
      paragraphs: [
        {
          id: 'qj-2-1',
          idx: 1,
          text: '紫微为北斗之主，统辖众星。紫微属土，乃尊贵之星。在数为帝座，化气为尊，主忠厚有威仪，独行其道。男命女命皆喜紫微守命，但需有左辅右弼来朝，方为正格。',
          translation: 'Tử Vi là chủ tinh của Bắc Đẩu, thống lĩnh muôn ngàn tinh tú. Về ngũ hành thuộc Âm Thổ, là ngôi sao chí tôn quyền quý. Trong thuật số xưng là Đế Tòa, hóa khí là Tôn (tôn quý), tính tình trung hậu bao dung, có uy nghi đường bệ, có phong thái độc lập tự chủ. Nam mệnh nữ mệnh đều mừng khi có Tử Vi thủ Mệnh, song cần có Tả Phụ Hữu Bật lai triều mới thành chân chính đại cách.',
          niNote: 'Thầy Nghê giảng: Bản chất của Tử Vi là trung hậu, bao dung và có tinh thần trách nhiệm. Nhưng nếu không có bề tôi phò trợ thì trở thành độc tài, tự phụ và cô độc.',
        },
        {
          id: 'qj-2-2',
          idx: 2,
          text: '紫微独坐，需有左右昌曲魁钺夹持方能为用——单身无依的紫微，纵贵不久；得三方四正之吉星会照，方为君臣庆会大格。',
          translation: 'Tử Vi độc tọa một mình, rất cần có Tả Hữu, Xương Khúc, Khôi Việt giáp mệnh hoặc hội chiếu mới có thể phát huy trọn vẹn uy lực. Một ngôi sao Tử Vi trơ trọi không ai phò trợ dẫu có hiển quý nhất thời cũng khó bền; chỉ khi tam phương tứ chính có chư cát tinh hội tụ mới chính là Quân Thần Khánh Hội đại cách.',
          niNote: 'Thầy Nghê lưu ý: Tử Vi độc thủ mà gặp toàn sát tinh Kình Đà Không Kiếp ví như ông vua thất thế gặp phường gian thần, dễ sinh tâm tính bực dọc, hoài tài bất ngộ.',
        },
        {
          id: 'qj-2-3',
          idx: 3,
          text: '紫微入命，兄弟有贵气，独立挺秀，多得长兄之助；紫微在子女，子女有贵气，但管教需平等；紫微在夫妻，配偶端庄，但宜迟婚不宜早。',
          translation: 'Tử Vi nhập cung Huynh Đệ, anh chị em có khí chất quý phái, độc lập tài ba, bản thân thường được anh cả giúp đỡ; Tử Vi tại cung Tử Tức, con cái sinh ra có tư chất xuất chúng nhưng cha mẹ cần tôn trọng, dạy dỗ trên tinh thần bình đẳng; Tử Vi tại cung Phu Thê, người bạn đời đoan trang quý phái, có địa vị xã hội, nhưng nên kết hôn muộn.',
          niNote: 'Thầy Nghê giảng: Tử Vi ở cung nào thì cung đó có lòng tự tôn rất cao. Ở cung Con Cái thì con có cá tính độc lập sớm; ở cung Phu Thê thì người phối ngẫu nắm quyền trong gia đình.',
        },
        {
          id: 'qj-2-4',
          idx: 4,
          text: '紫微在田宅，主有祖业又能自置，房产可作为致富之主轴；紫微在福德，精神层面追求格调、自尊感强；紫微在官禄，主大富贵，宜居高位。',
          translation: 'Tử Vi tọa thủ cung Điền Trạch, chủ được kế thừa sản nghiệp tổ tiên để lại, lại có năng lực tự tay mua sắm tích lũy nhiều bất động sản, nhà đất chính là trục xoay làm giàu bền vững; Tử Vi cư cung Phúc Đức, đời sống tinh thần theo đuổi phong thái thanh cao, lòng tự trọng sâu sắc; Tử Vi cư cung Quan Lộc, sự nghiệp hanh thông đại quý, thích hợp giữ vị trí lãnh đạo cao cấp.',
          niNote: 'Thầy Nghê dạy: Tử Vi ở Điền Trạch là nơi giữ tài sản kiên cố nhất. Người có cách này nên đầu tư vào đất đai, nhà cửa lâu dài thì tài sản ngày một gia tăng vững chắc.',
        },
      ],
    },
    {
      title: 'Quyển 3: Nam Đẩu Lục Tinh Luận (卷三·南斗六星论)',
      subtitle: 'Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương',
      paragraphs: [
        {
          id: 'qj-3-1',
          idx: 1,
          text: '天府属土，南斗令星，乃禄库之主。天府独坐主品行端正、衣食无忧。天府与紫微同宫名"紫府同宫"，主尊贵。天府最喜见禄存，称"双禄朝垣"，主大富。',
          translation: 'Thiên Phủ thuộc Dương Thổ, là lệnh tinh đứng đầu Nam Đẩu, chưởng quản kho tàng tài lộc quốc gia. Thiên Phủ độc tọa chủ nhân phẩm đoan chính, cẩn trọng, cả đời áo cơm đủ đầy không lo thiếu thốn. Thiên Phủ đồng cung với Tử Vi xưng là Tử Phủ Đồng Cung cách, chủ tôn quý tột bậc. Thiên Phủ mừng nhất khi hội kiến Lộc Tồn, hợp thành Song Lộc Triều Viên, chủ đại phú gia tài bạc triệu.',
          niNote: 'Thầy Nghê giảng: Thiên Phủ là sao giữ của, tính tình điềm đạm, chu đáo, không ưa mạo hiểm. Thiên Phủ giữ kho thì cần có Lộc trong kho, nếu gặp Không Kiếp thì kho trống rỗng.',
        },
        {
          id: 'qj-3-2',
          idx: 2,
          text: '太阴为中天主星，属水。太阴庙旺主田宅、富贵，落陷主劳碌、奔波。女命太阴最吉，主貌美贤淑。太阴在亥子主大富，太阴在午未则减力。',
          translation: 'Thái Âm là đại tinh chủ quản Trung Thiên, ngũ hành thuộc Âm Thủy, tượng trưng cho mặt trăng và phái nữ. Thái Âm Miếu Vượng chủ điền sản dồi dào, thanh nhã phú quý; Lạc Hãm chủ bôn ba vất vả, tâm trí lo âu. Nữ mệnh có Thái Âm tọa Mệnh Miếu Vượng là đệ nhất cát cách, dung mạo xinh đẹp hiền thục. Thái Âm ở Hợi Tý xưng là Nguyệt Lãng Thiên Môn, chủ đại phú; ở Tỵ Ngọ thì ánh sáng mờ nhạt, lực giảm phân nửa.',
          niNote: 'Thầy Nghê dạy: Thái Âm ở Hợi là trăng rằm giữa đêm thu, đẹp đẽ và giàu có vô cùng. Thái Âm là sao âm nhu, chủ tình cảm sâu kín và sự mềm mỏng uyển chuyển.',
        },
        {
          id: 'qj-3-3',
          idx: 3,
          text: '贪狼为桃花欲望之星，属木属水。贪狼主多才艺、社交广。贪狼逢火星称"火贪格"，逢铃星称"铃贪格"，皆主偏财横发。但贪狼忌空劫，主华而不实。',
          translation: 'Tham Lang là ngôi sao dục vọng và đào hoa số một, ngũ hành vừa thuộc Dương Mộc vừa thuộc Âm Thủy. Tham Lang chủ đa tài đa nghệ, khéo léo trong quan hệ xã tế. Tham Lang gặp Hỏa Tinh xưng là Hỏa Tham cách, gặp Linh Tinh xưng là Linh Tham cách, đều chủ bộc phát tiền tài bất ngờ (hoạnh phát danh tài). Song Tham Lang tối kỵ gặp Không Kiếp, chủ hào nhoáng bề ngoài mà rỗng ruột bên trong.',
          niNote: 'Thầy Nghê giảng: Hỏa Tham và Linh Tham là cách phát tài nhanh nhất trong Tử Vi Đẩu Số. Tuy nhiên sau khi phát đạt phải biết tích đức hành thiện, nếu kiêu ngạo hoang phí thì của thiên trả địa.',
        },
        {
          id: 'qj-3-4',
          idx: 4,
          text: '巨门属水，化气为暗，主口舌是非。巨门为口才之星，宜律师、教师、传媒。巨门化禄主"以口生财"，化忌则口舌官非不断。巨门最忌与太阳同宫的丑未两宫，称"日月反背"。',
          translation: 'Cự Môn thuộc Âm Thủy, hóa khí là Ám (che khuất), chủ về khẩu thiệt thị phi và nghi ngờ trắc trở. Song Cự Môn cũng là ngôi sao của tài năng hùng biện khẩu tài, rất thích hợp làm luật sư, giáo viên, diễn giả, truyền thông ngoại giao. Cự Môn đắc Hóa Lộc chủ "dĩ khẩu sinh tài" (dùng lời ăn tiếng nói kiếm ra tiền bạc); Cự Môn Hóa Kỵ thì thị phi tranh cãi kiện tụng liên miên.',
          niNote: 'Thầy Nghê nhấn mạnh: Cự Môn cần có Thái Dương Miếu Vượng chiếu rọi để xua tan ám khí. Khi Cự Môn được ánh dương soi sáng thì trí tuệ và tài ăn nói sẽ trở thành vũ khí vô song.',
        },
        {
          id: 'qj-3-5',
          idx: 5,
          text: '天相属水，化气为印，乃辅佐之星。天相忠厚老实，宜行政秘书法务。天相不喜独坐，最宜与紫微或廉贞同宫，借其威仪而成事。',
          translation: 'Thiên Tướng thuộc Dương Thủy, hóa khí là Ấn (con dấu quyền lực), là ngôi sao phụ tá thừa hành đắc lực. Thiên Tướng tính tình trung hậu, thành thật, trọng chữ tín, thích hợp công tác hành chính, thư ký lãnh đạo, trợ lý pháp lý. Thiên Tướng không ưa độc tọa, thích hợp nhất là đồng cung với Tử Vi (Tử Tướng) hoặc Liêm Trinh (Liêm Tướng), nhờ mượn uy nghi của đế tinh mà lập nên công trạng.',
          niNote: 'Thầy Nghê giảng: Thiên Tướng là con dấu, phụ thuộc vào người cầm ấn là minh quân hay bạo chúa. Nếu giáp cung có Hóa Lộc và Thiên Lương (Tài Ấm Giáp Ấn) thì cực kỳ cát lợi.',
        },
        {
          id: 'qj-3-6',
          idx: 6,
          text: '天梁属土，化气为荫，乃老人之星。天梁主善良、慈悲、孤克、化解。天梁宜法律、医学、教育、宗教。天梁化科主名声，化禄反而虚浮。',
          translation: 'Thiên Lương thuộc Dương Thổ, hóa khí là Ấm (che chở, phúc ấm), là ngôi sao tượng trưng cho bậc trưởng thượng, bô lão. Thiên Lương chủ tâm tính lương thiện, từ bi bác ái, có năng lực hóa giải tai ách gặp nguy hóa an, song cũng mang chút tính cách cô độc, nguyên tắc. Rất thích hợp theo ngành tư pháp luật pháp, y dược cứu người, giáo dục và tôn giáo. Thiên Lương Hóa Khoa chủ danh tiếng lẫy lừng, Hóa Lộc ngược lại dễ bị điều tiếng tiền bạc.',
          niNote: 'Thầy Nghê dạy: Thiên Lương là sao giải ách, nghĩa là phải gặp nạn trước rồi mới giải được sau. Do đó đời người Thiên Lương thường nếm trải thử thách trước khi đón nhận quả ngọt.',
        },
      ],
    },
    {
      title: 'Quyển 4: Bắc Đẩu Lục Tinh Luận (卷四·北斗六星论)',
      subtitle: 'Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Liêm Trinh, Phá Quân',
      paragraphs: [
        {
          id: 'qj-4-1',
          idx: 1,
          text: '紫微属土，已论于卷二。',
          translation: 'Tử Vi ngũ hành thuộc Âm Thổ, là Đế Tòa chí tôn, yếu quyết giải đoán toàn diện đã được trình bày chi tiết tại Quyển Hai.',
          niNote: 'Thầy Nghê nhắc: Cần ôn lại Quyển Hai để nắm vững các thế đứng của Tử Vi ở Tý Ngọ, Sửu Mùi, Dần Thân, Mão Dậu, Thìn Tuất, Tỵ Hợi.',
        },
        {
          id: 'qj-4-2',
          idx: 2,
          text: '天机属木，化气为善，乃智慧之星。天机主聪明、机变、好动。天机入命，思维敏捷，宜咨询、策划、文教。天机最忌善变无主，需文昌文曲会照方能成器。',
          translation: 'Thiên Cơ thuộc Âm Mộc, hóa khí là Thiện (thiện lành), là ngôi sao của trí tuệ, cơ mưu và sách lược. Thiên Cơ chủ tư duy mẫn tiệp, linh hoạt ứng biến, thích vận động đổi mới. Thiên Cơ nhập cung Mệnh, đầu óc nhanh nhạy xuất chúng, rất thích hợp làm tham mưu, cố vấn chiến lược, kế hoạch kinh doanh, lập trình công nghệ hoặc giáo dục. Kỵ nhất là tâm tính nông nổi hay đổi thay, rất cần Xương Khúc hội tụ để định hình tài năng.',
          niNote: 'Thầy Nghê giảng: Thiên Cơ là bộ não, suy nghĩ không ngừng nghỉ. Người mệnh Thiên Cơ dễ bị mất ngủ vì nghĩ ngợi quá nhiều. Cần rèn luyện tính kiên định và tập trung sâu.',
        },
        {
          id: 'qj-4-3',
          idx: 3,
          text: '太阳属火，化气为贵，乃男贵之星。太阳主名誉、公务、社交。太阳庙旺主大贵，落陷则劳而无获。太阳最宜在卯辰巳午之地，落于戌亥子丑则减力。',
          translation: 'Thái Dương thuộc Dương Hỏa, hóa khí là Quý (quý phái), là ngôi sao tượng trưng cho ánh sáng mặt trời, cha, chồng và người nam giới quyền quý. Thái Dương chủ về danh tiếng, công vụ quốc gia và ngoại giao quang minh chính đại. Thái Dương Miếu Vượng chủ đại phú đại quý quang mang rực rỡ; Lạc Hãm thì vất vả bôn ba mà thành quả bị chia sẻ. Thích hợp nhất tại Mão Thìn Tỵ Ngọ (ban ngày), hãm tại Tuất Hợi Tý Sửu (ban đêm).',
          niNote: 'Thầy Nghê dạy: Thái Dương như mặt trời soi sáng muôn loài, tính hào sảng không tính toán thiệt hơn. Ở cung ban ngày thì ban phát quang minh; ở cung ban đêm thì vất vả tha hương.',
        },
        {
          id: 'qj-4-4',
          idx: 4,
          text: '武曲属金，化气为财，乃财星之主。武曲主刚毅果决，善理财经营。武曲化忌主手术血光、金属意外。武曲在丑未与七杀同宫，称"武曲七杀"格，主刚直武贵。',
          translation: 'Vũ Khúc thuộc Âm Kim, hóa khí là Tài (tiền tài), là chủ tinh chưởng quản tài lộc kim ngân thực tế. Vũ Khúc chủ tính tình cương nghị, quả đoán, làm việc dứt khoát, có năng khiếu đặc biệt về quản lý tài chính và kinh doanh thương mại. Vũ Khúc Hóa Kỵ chủ phẫu thuật thương tích kim khí hoặc tổn thất tiền nong nặng nề. Vũ Khúc đồng cung với Thất Sát tại Sửu Mùi thành cách Vũ Khúc Thất Sát, chủ cương trực võ quý uy dũng.',
          niNote: 'Thầy Nghê nhấn mạnh: Vũ Khúc là tiền tươi thóc thật kiếm được từ lao động và kinh doanh thực tế. Vũ Khúc sợ nhất Hóa Kỵ vì dễ gây mất tiền và đụng chạm dao kéo kim loại.',
        },
        {
          id: 'qj-4-5',
          idx: 5,
          text: '廉贞属火属木，化气为囚，乃次桃花之星。廉贞文武兼备，多才艺。廉贞化忌主血光官非、感情纠纷。廉贞与天相同宫为"廉相格"，主清廉之名。',
          translation: 'Liêm Trinh ngũ hành thuộc Âm Hỏa mang đới Mộc, hóa khí là Tù (giam giữ, quy củ), là ngôi sao Thứ Đào Hoa. Liêm Trinh văn võ song toàn, thông minh quyết đoán, đa tài đa nghệ. Liêm Trinh Hóa Kỵ chủ họa huyết quang, kiện tụng quan ty hoặc vướng mắc tình ái phức tạp. Liêm Trinh đồng cung với Thiên Tướng tại Tý Ngọ thành cách Liêm Tướng, chủ phẩm cách thanh liêm chính trực, tiếng thơm lưu truyền.',
          niNote: 'Thầy Nghê giảng: Liêm Trinh là ngọn lửa âm ỉ. Khi cát hóa thì làm việc cực kỳ kỷ luật và sắc sảo; khi Hóa Kỵ thì tính khí bốc đồng, dễ vi phạm pháp luật hoặc vướng lưới tình.',
        },
        {
          id: 'qj-4-6',
          idx: 6,
          text: '破军属水，化气为耗，乃破坏创新之星。破军主开创、变动、六亲缘薄。破军宜技术专长走天下。破军化禄称"破而后立"，主先散后聚。',
          translation: 'Phá Quân thuộc Âm Thủy, hóa khí là Hao (hao tán, tiên phong), là ngôi sao của sự phá vỡ trật tự cũ để kiến tạo trật tự mới. Phá Quân chủ khai phá dũng cảm, biến động không ngừng, tình cảm lục thân thường xa cách độc lập. Rất thích hợp học một nghề tinh thông chuyên môn đi khắp thiên hạ. Phá Quân Hóa Lộc gọi là "phá nhi hậu lập", trước hao tán gian nan nhưng sau lại tụ hội cơ đồ rực rỡ.',
          niNote: 'Thầy Nghê dạy: Phá Quân đi đầu xung phong phá trận. Không có Phá Quân thì không có đổi mới sáng tạo; người Phá Quân làm việc gì cũng dốc hết tâm lực, không chịu đi theo lối mòn.',
        },
      ],
    },
    {
      title: 'Quyển 5: Tứ Hóa & Các Cục Luận (卷五·四化与格局论)',
      subtitle: 'Năng Lực Tứ Hóa & Thập Đại Cách Cục Kinh Điển (四化之力与重要格局)',
      paragraphs: [
        {
          id: 'qj-5-1',
          idx: 1,
          text: '化禄主财源，主缘分，主能力变现。化禄入命三方，主财源广进；化禄入财帛，主财来财往，正财稳定。',
          translation: 'Hóa Lộc chủ nguồn tài nguyên của cải dồi dào, chủ thiện duyên tốt đẹp và năng lực biến đổi tri thức kỹ năng thành giá trị kinh tế thực tế. Hóa Lộc nhập tam phương cung Mệnh chủ tài vận hanh thông; nhập cung Tài Bạch chủ chính tài ổn định, nguồn thu nhập phát triển vững chắc.',
          niNote: 'Thầy Nghê giảng: Hóa Lộc là sự trù phú và suôn sẻ, tượng trưng cho mùa xuân đâm chồi nảy lộc. Có Hóa Lộc thì làm việc gì cũng dễ gặp người ủng hộ.',
        },
        {
          id: 'qj-5-2',
          idx: 2,
          text: '化权主权力，主决断，主担当。化权入命，主能独当一面；化权入官禄，主事业有掌控力，宜走管理或技术权威路线。',
          translation: 'Hóa Quyền chủ quyền bính, ý chí kiên định, tính quyết đoán cao và năng lực gánh vác trọng trách lớn. Hóa Quyền nhập cung Mệnh chủ phong thái tự tin độc lập, có thể một mình đảm đương việc khó; nhập cung Quan Lộc chủ nắm quyền kiểm soát công việc thực chất, rất hợp làm quản lý điều hành hoặc chuyên gia đầu ngành.',
          niNote: 'Thầy Nghê nhấn mạnh: Quyền là năng lực thực thi. Người có Hóa Quyền không nói suông, nói là làm, hành động dứt khoát và có uy lực chi phối người khác.',
        },
        {
          id: 'qj-5-3',
          idx: 3,
          text: '化科主名声，主文书，主贵人。化科入命，主名声远播；化科入身，主以名取利，宜文教、研究、咨询。',
          translation: 'Hóa Khoa chủ danh thơm tiếng tốt, bằng cấp văn thư thi cử đỗ đạt và quý nhân tương trợ đúng lúc. Hóa Khoa nhập cung Mệnh chủ trí tuệ thanh cao, học hành giỏi giang, được xã hội nể trọng; nhập cung Thân chủ dùng danh tiếng và uy tín chuyên môn để gây dựng sự nghiệp, thích hợp làm giáo dục, y tế, nghiên cứu khoa học và tư vấn.',
          niNote: 'Thầy Nghê giảng: Khoa là tấm bình phong thanh nhã và chiếc phao cứu sinh khi gặp hoạn nạn. Khi gặp sát tinh, Hóa Khoa có năng lực hóa hung thành cát rất lớn.',
        },
        {
          id: 'qj-5-4',
          idx: 4,
          text: '化忌主病，主煞，主深刻功课。化忌入命三方，主一生有"钝点"——这是命格里最深的功课，过得了就是大智慧。三十岁前后是化忌最锋利的时候。',
          translation: 'Hóa Kỵ chủ trở ngại, bệnh tật, lo toan và bài học khắc cốt ghi tâm. Hóa Kỵ nhập tam phương cung Mệnh chủ cuộc đời luôn có một điểm nghẽn (độn điểm) thử thách tâm can - đây chính là bài thi lớn nhất trời trao cho bản mệnh, nếu kiên cường vượt qua sẽ đúc kết thành đại trí tuệ phi phàm. Giai đoạn trước và sau 30 tuổi chính là lúc Hóa Kỵ bộc lộ sắc bén nhất.',
          niNote: 'Thầy Nghê khuyên bảo: Nhìn thấy Hóa Kỵ chớ nên bi quan. Hóa Kỵ là nơi chỉ dẫn bạn cần phải hoàn thiện bản thân ở phương diện nào để trưởng thành viên mãn.',
        },
        {
          id: 'qj-5-5',
          idx: 5,
          text: '紫府同宫格：紫微天府同入命宫，主品行端正、衣食无忧、有领导才能。需要左右辅弼来配合方为完整大格。',
          translation: 'Tử Phủ Đồng Cung cách: Hai đế tinh Tử Vi và Thiên Phủ cùng an tọa tại cung Mệnh (ở Dần hoặc Thân), chủ nhân phẩm đoan chính cao quý, cả đời không lo thiếu thốn cơm áo, bẩm sinh có phong thái lãnh đạo quần chúng. Cần phải có Tả Phụ Hữu Bật hội chiếu phò tá mới hoàn thiện thành toàn diện đại cách.',
          niNote: 'Thầy Nghê dạy: Tử Phủ ở Dần Thân là phú quý song toàn. Người cách này tâm tính hòa nhã nhưng có nguyên tắc ngầm, làm việc quang minh chính đại.',
        },
        {
          id: 'qj-5-6',
          idx: 6,
          text: '七杀朝斗格：七杀居子午寅申宫坐命，对宫紫微天府相照，主爵禄荣昌——武职大贵，最宜军警政界或企业高管。',
          translation: 'Thất Sát Triều Đẩu cách: Thất Sát an tọa tại bốn cung Tý, Ngọ, Dần, Thân, đối cung có Tử Vi Thiên Phủ chiếu về rực rỡ, chủ tước lộc vinh hoa bền vững - đường võ chức đại quý, thích hợp nhất làm việc trong lực lượng vũ trang, tư pháp, y khoa ngoại khoa hoặc lãnh đạo cấp cao trong tập đoàn lớn.',
          niNote: 'Thầy Nghê giảng: Đây là cách cục của tướng soái cầm quân lập đại nghiệp. Cung đối diện là Tử Phủ làm chỗ dựa vững như bàn thạch.',
        },
        {
          id: 'qj-5-7',
          idx: 7,
          text: '双禄朝垣格：化禄、禄存同会命宫三方四正，财源涌动、衣食丰足。古云"双禄朝垣，富比陶朱"，主一生不愁财。',
          translation: 'Song Lộc Triều Viên cách: Hóa Lộc và Lộc Tồn cùng hội chiếu về tam phương tứ chính của cung Mệnh, tài nguyên cuồn cuộn không ngừng, ăn mặc sung túc dư dả. Cổ thư ca ngợi: "Song Lộc triều viên, phú bỉ Đào Chu", chủ trọn một đời tiền bạc hưng vượng không bao giờ túng thiếu.',
          niNote: 'Thầy Nghê nhấn mạnh: Người đắc Song Lộc kinh doanh buôn bán rất mát tay, buôn may bán đắt, tài lộc tích lũy ngày một dồi dào vững bền.',
        },
        {
          id: 'qj-5-8',
          idx: 8,
          text: '机月同梁格：天机、太阴、天同、天梁四星齐入命迁财官，主文质彬彬、聪慧善谋。最适合公职、学术、文艺、医疗、服务等需稳定累积的行业。',
          translation: 'Cơ Nguyệt Đồng Lương cách: Bốn sao Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương cùng hội tụ tại Mệnh, Di, Tài, Quan, chủ phong thái văn nhã nho phong, trí tuệ mẫn tiệp và giàu tài mưu lược. Thích hợp nhất làm việc trong bộ máy công quyền nhà nước, nghiên cứu học thuật, giáo dục y tế, văn hóa nghệ thuật và các ngành dịch vụ tích lũy ổn định.',
          niNote: 'Thầy Nghê giảng: Đây là cách của bậc quân tử thanh liêm trí thức. Tránh đầu cơ chớp nhoáng, cứ đi theo con đường chuyên môn tích lũy lâu dài ắt đại thành.',
        },
        {
          id: 'qj-5-9',
          idx: 9,
          text: '杀破狼格：七杀、破军、贪狼三星会命，主一生变动多、不甘平凡，宜创业、军警、业务、销售。中年后才能稳定守成。',
          translation: 'Sát Phá Tham cách: Ba ngôi sao Thất Sát, Phá Quân, Tham Lang hội họp tại cung Mệnh tam phương, chủ cả đời nhiều phen biến động thăng trầm, không chấp nhận cuộc đời tẻ nhạt, rất thích hợp xông pha khởi nghiệp, quân đội công an, kinh doanh đối ngoại. Sau tuổi trung niên tích lũy đủ kinh nghiệm mới vững vàng giữ gìn thành quả.',
          niNote: 'Thầy Nghê dạy: Người Sát Phá Tham càng gặp hoàn cảnh thử thách nghịch cảnh lại càng bộc phát sức chiến đấu mạnh mẽ phi thường.',
        },
        {
          id: 'qj-5-10',
          idx: 10,
          text: '日月同宫格：太阳太阴同入丑宫或未宫，主异性缘佳、事业顺遂、名声远播。丑宫力较平，未宫力略减。',
          translation: 'Nhật Nguyệt Đồng Cung cách: Thái Dương và Thái Âm cùng đồng tọa tại cung Sửu hoặc cung Mùi, chủ nhân duyên khác giới tuyệt vời, bước đường công danh thuận buồm xuôi gió, danh tiếng lan xa. Ở Sửu cung lực phát huy tương đối cân bằng, ở Mùi cung lực hơi suy giảm nhẹ.',
          niNote: 'Thầy Nghê phân tích: Nhật Nguyệt đồng cung là sự giao thoa giữa ngày và đêm, âm và dương cùng tụ hội. Người mang cách này trong nhu có cương, trong cương có nhu, xử thế rất khéo léo.',
        },
      ],
    },
  ],
};
