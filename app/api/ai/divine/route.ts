import { NextRequest, NextResponse } from 'next/server';
import { getAdminConfig } from '@/lib/server/adminConfig';

/**
 * API LUẬN GIẢI CHIÊM BỐC & VẬN MỆNH BẰNG GEMINI AI
 * Tương thích Google Gemini 1.5 Flash / 2.0 Flash / Pro
 * Cấu hình tập trung một lần bởi Quản trị viên (Admin) và dùng chung cho toàn bộ hệ thống.
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, question, contextData } = body;

    const config = getAdminConfig();
    const apiKey = config.geminiApiKey?.trim();

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'NO_API_KEY',
          message:
            'Hệ thống AI hiện chưa được cấu hình bởi Quản trị viên.',
        },
        { status: 503 }
      );
    }

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'MISSING_QUESTION',
          message: 'Vui lòng cung cấp câu hỏi hoặc vấn đề bạn muốn chiêm bốc.',
        },
        { status: 400 }
      );
    }

    // Xây dựng System Instruction & Context tùy theo môn bói
    let systemInstruction = `Bạn là một Đạo sư Chiêm Tinh Học & Dịch Lý Đông Tây uyên bác, thấu suốt Kinh Dịch (Mai Hoa Dịch Số, Lục Hào Quẻ), Tử Vi Đẩu Số (hệ phái Thiên Kỷ của danh sư Nghê Hải Hà) và Tarot Biểu tượng học phương Tây.
NGUYÊN TẮC LUẬN ĐOÁN BẤT DI BẤT DỊCH (ĐẠO TRUNG CHÍNH & KHÁCH QUAN):
1. NÓI ĐÚNG SỰ THẬT, CÔNG TÂM, TUYỆT ĐỐI KHÔNG NỊNH BỢ, KHÔNG KHEN LẤY ĐƯỢC, KHÔNG TÔ HỒNG SỐ PHẬN. Người đi xem bói cần sự thật để phòng họa đón phúc, không cần lời khen giả tạo ru ngủ.
2. NGUYÊN LÝ ÂM DƯƠNG CÂN BẰNG: CÓ TỐT PHẢI CÓ XẤU, CÓ TÍCH CỰC PHẢI CÓ TIÊU CỰC. Bất kỳ lá số, quẻ Dịch, tướng tay hay trải bài Tarot nào cũng luôn có hai mặt đối lập:
   - Mặt Cát / Thuận lợi: Nêu rõ thế mạnh, cơ hội và thành tựu có thể đạt được.
   - Mặt Hung / Nguy cơ: Vạch trần điểm mù, tật xấu tính cách (tự phụ, bảo thủ, cả tin, lười biếng, nóng nảy, hoang phí...), cạm bẫy tiểu nhân, nguy cơ phá sản, đổ vỡ tình cảm hoặc tai nạn bệnh tật.
   - Cái giá phải trả: Thành công luôn đi kèm sự đánh đổi (cô độc, lao tâm khổ tứ, thị phi đố kỵ).
3. PHÁN QUYẾT DỨT KHOÁT VÀ MINH BẠCH:
   - Gặp quẻ Hung (Thuần Khảm, Kiển, Khốn, Bĩ, Tụng, Cách, Quy Muội...), lá Tarot tiêu cực (The Tower, Devil, Death, 3 Kiếm, 9 Kiếm, 10 Kiếm...), sao Sát tinh (Không Kiếp, Kình Đà, Hỏa Linh, Hóa Kỵ): PHẢI NÓI THẲNG LÀ XẤU, BẾ TẮC HOẶC NGUY CƠ THẤT BẠI. Cảnh báo nghiêm khắc, không được biến quẻ hung thành điềm cát hay dùng lời xoa dịu vô nghĩa.
   - Khi hỏi việc cụ thể (Được hay Không, Đi hay Ở, Có hay Không): Phải đưa ra kết luận rõ ràng, sau đó lập luận biện chứng theo Dịch lý/Tử Vi/Tarot.
4. Khi người dùng hỏi các câu hỏi tâm linh như "kiếp trước tôi là ai", "sứ mệnh linh hồn", "căn duyên tiền kiếp": Dùng biểu tượng hình quẻ/lá bài để phân tích cả phước báu lẫn nghiệp duyên tiền kiếp, bài học khảo nghiệm cay đắng kiếp này phải vượt qua.
5. Văn phong: Trang nghiêm, sắc bén, công tâm, lập luận chặt chẽ logic, 100% Tiếng Việt chuẩn mực, không hoa mỹ rỗng tuếch.`;

    let promptContent = '';

    if (type === 'tarot') {
      const cards = contextData?.cards || [];
      const spreadTitle = contextData?.spreadTitle || 'Trải bài Tarot';
      const cardsDesc = cards
        .map(
          (c: { positionName: string; card: { nameVi: string; name: string }; isReversed: boolean }, idx: number) =>
            `${idx + 1}. Vị trí [${c.positionName}]: Lá **${c.card.nameVi} (${c.card.name})** - Trạng thái: ${
              c.isReversed ? 'Ngược (Reversed)' : 'Xuôi (Upright)'
            }`
        )
        .join('\n');

      promptContent = `[BỐI CẢNH CHIÊM ĐOÁN TAROT]
Phương thức trải bài: ${spreadTitle}
Câu hỏi của đương số: "${question.trim()}"

Các lá bài đã rút được từ vũ trụ:
${cardsDesc}

YÊU CẦU BẠN LUẬN GIẢI THEO CẤU TRÚC 3 PHẦN:
1. 🎯 **TRẢ LỜI TRỰC DIỆN CHO CÂU HỎI**: Đi thẳng vào câu trả lời giải đáp thắc mắc của đương số dựa trên năng lượng tổng hòa các lá bài.
2. 🔮 **GIẢI MÃ NĂNG LƯỢNG CHI TIẾT**: Kết nối ý nghĩa của từng lá bài ở từng vị trí với vấn đề người hỏi đang quan tâm.
3. 🌟 **THÔNG ĐIỆP CHỈ DẪN & CHUYỂN HÓA CỦA VŨ TRỤ**: Lời khuyên cụ thể, thực tế để đương số làm chủ vận mệnh và an lạc tinh thần.`;
    } else if (type === 'iching') {
      const originalName = contextData?.originalName || '';
      const changedName = contextData?.changedName || '';
      const movingLine = contextData?.movingLine || 1;
      const dungThan = contextData?.dungThan || {};
      const solarDate = contextData?.solarDate || '';
      const lunarDate = contextData?.lunarDate || '';
      const ganZhiDay = contextData?.ganZhiDay || '';
      const xunKong = contextData?.xunKong || '';

      promptContent = `[BỐI CẢNH MAI HOA DỊCH SỐ & LỤC HÀO CHIÊM ĐOÁN THEO GIỜ ĐỘNG TÂM]
Thời khắc khởi quẻ: Ngày ${solarDate} (${lunarDate}), Nhật Can Chi: ${ganZhiDay}, Tuần Không: [${xunKong}]
Quẻ Dịch: Khởi quẻ **${originalName}** động hào ${movingLine} biến quẻ **${changedName}**.
Dụng Thần xác định: ${dungThan.subject || 'Thế Hào'} (${dungThan.targetName || 'Sự việc'})
Câu hỏi của người hỏi: "${question.trim()}"

YÊU CẦU BẠN LUẬN GIẢI THEO CẤU TRÚC:
1. 🎯 **LỜI PHÁN TRỰC TIẾP CỦA THẦY**: Trả lời dứt khoát, đi thẳng vào câu hỏi (Được hay Không, Tốt hay Xấu, diễn biến ra sao, nếu hỏi tiền kiếp/tâm linh thì phân tích túc duyên tiền kiếp qua tượng quẻ).
2. ☯️ **DỊCH LÝ THÂU SUỐT**: Phân tích thể hiện của quẻ Chủ (${originalName}) sang quẻ Biến (${changedName}), hào động ${movingLine} mang thông điệp chuyển hóa gì.
3. ⏳ **ỨNG KỲ THỜI GIAN & LỜI KHUYÊN HÀNH SỰ**: Thời điểm then chốt sự việc ứng nghiệm và thái độ ứng xử đúng đạo quân tử.`;
    } else if (type === 'ziwei') {
      const pData = contextData || {};
      promptContent = `[BỐI CẢNH LUẬN GIẢI TỬ VI ĐẨU SỐ CHUẨN PHÁI THIÊN KỶ NGHÊ HẢI HÀ]
- Đương số: ${pData.name || 'Đương số'} (${pData.gender || 'Nam'} Mệnh, ${pData.currentAge || ''} tuổi)
- Thời khắc sinh: Dương lịch ${pData.solarDate || ''} · Âm lịch ${pData.lunarDate || ''} · Cục: ${pData.wuxingJu || ''}
- Cung Mệnh (Tiên thiên): Cung ${pData.mingGong?.stem || ''} ${pData.mingGong?.branch || ''} - Chính tinh toạ thủ: ${pData.mingGong?.majors || ''} - Toàn bộ tinh diệu: ${pData.mingGong?.allStars || ''}
- Cung Thân (Hậu vận): Thân cư Cung ${pData.shenGong?.palace || ''} (${pData.shenGong?.branch || ''})
- Đại Hạn Hiện Tại: Cung ${pData.currentDaXian?.palace || ''} (${pData.currentDaXian?.ageRange || ''}, ${pData.currentDaXian?.branch || ''})
- Cung vị đang khảo sát chi tiết: Cung ${pData.selectedPalace?.name || 'Mệnh'} (${pData.selectedPalace?.stem || ''} ${pData.selectedPalace?.branch || ''}, Chính tinh: ${pData.selectedPalace?.majors || ''})

CÂU HỎI / VẤN ĐỀ ĐƯƠNG SỐ MUỐN HỎI THẦY:
"${question.trim()}"

YÊU CẦU BẠN LUẬN GIẢI THEO CẤU TRÚC 3 PHẦN:
1. 🎯 **LỜI GIẢI ĐOÁN TRỰC DIỆN CHO CÂU HỎI**: Trả lời thẳng thắn, chính xác 100% vào điều đương số đang hỏi. Đưa ra phán quyết rõ ràng, không vòng vo né tránh.
2. 🌟 **BẢN MỆNH & CƠ CHẾ TINH DIỆU TỬ VI**: Phân tích vì sao các sao tọa thủ (Chính tinh, Cát/Sát tinh, Tứ Hóa, Tam phương tứ chính) và thời vận (Đại hạn hiện tại / Cung đang xem) lại tạo nên kết quả và diễn biến đó.
3. 🧭 **HƯỚNG DẪN HÀNH ĐỘNG & BÀI HỌC DƯỠNG TÂM LẬP MỆNH**: Lời khuyên thiết thực theo tinh thần danh sư Nghê Hải Hà: Cần phát huy sở trường gì, khắc phục điểm yếu nào, giải hạn thị phi/trắc trở ra sao để chuyển nguy thành an, tự tay làm chủ số mệnh.`;
    } else {
      promptContent = `Câu hỏi chiêm bốc vận mệnh của đương số: "${question.trim()}"
Dữ liệu kèm theo: ${JSON.stringify(contextData || {})}`;
    }

    // Thử gọi các model của Gemini API theo thứ tự ưu tiên (ưu tiên model quản trị viên đã chọn)
    const preferredModel = config.geminiModel || 'gemini-3.6-flash';
    // Danh sách các model chính thức 2026 hỗ trợ sinh nội dung cho API key này
    const VALID_FALLBACK_MODELS = [
      'gemini-3.6-flash',
      'gemini-3.8-flash',
      'gemini-3.7-flash',
      'gemini-flash-latest',
      'gemini-2.5-flash',
    ];
    const modelsToTry = [preferredModel, ...VALID_FALLBACK_MODELS.filter((m) => m !== preferredModel)];
    let lastError = '';
    let responseText = '';

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemInstruction}\n\n---\n\n${promptContent}` }],
              },
            ],
            generationConfig: {
              temperature: 0.75,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          const errMsg = errData?.error?.message || `HTTP ${res.status} ${res.statusText}`;
          // Lưu lỗi của preferredModel làm ưu tiên hiển thị nếu thất bại
          if (!lastError || model === preferredModel) {
            lastError = `[${model}] ${errMsg}`;
          }
          continue; // thử model tiếp theo nếu có lỗi
        }

        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim().length > 0) {
          responseText = text.trim();
          break; // thành công
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        if (!lastError || model === preferredModel) {
          lastError = `[${model}] ${errMsg}`;
        }
      }
    }

    if (!responseText) {
      return NextResponse.json(
        {
          success: false,
          error: 'AI_CALL_FAILED',
          message: `Không thể kết nối đến Gemini AI (${lastError}). Vui lòng kiểm tra lại API Key hoặc đường truyền mạng.`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      answer: responseText,
      timestamp: new Date().toLocaleString('vi-VN'),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'SERVER_ERROR', message: msg },
      { status: 500 }
    );
  }
}

