# 📜 SỔ TAY DỰ ÁN VÀ QUY TẮC PHÁT TRIỂN (GEMINI.MD)
> **Tài liệu bàn giao bắt buộc cho AI Agents (Gemini, Claude, GPT, Antigravity) và Developers.**  
> *Khi cài lại Windows hoặc chuyển môi trường, AI hoặc Dev tiếp quản BẮT BUỘC phải đọc tài liệu này trước tiên để hiểu toàn bộ hệ thống và nhiệm vụ tiếp theo.*

---

## 📌 1. QUY TẮC BẤT DI BẤT DỊCH CỦA DỰ ÁN (CORE RULES)

1. **QUY TẮC GHI CHÚ (NOTE & LOGGING):**
   - Trước và sau khi thực hiện bất kỳ thay đổi nào (thêm tính năng, sửa lỗi, dọn dẹp code), bắt buộc phải ghi chép lại đầy đủ vào file `gemini.md` (mục Nhật ký phát triển).
   - Mọi đoạn code logic quan trọng đều phải có ghi chú (comment) tiếng Việt rõ ràng, giải thích tính năng để người khác đọc vào là hiểu ngay.

2. **QUY TẮC CODE SẠCH (CLEAN CODE & ZERO DEAD CODE):**
   - Build code phải tuyệt đối sạch sẽ.
   - Loại bỏ triệt để các package dư thừa, code không dùng, console log rác, biến không sử dụng.
   - Luôn kiểm tra `npm test` và `npm run typecheck` đảm bảo không có lỗi trước khi hoàn tất.

3. **QUY TẮC ĐẨY CODE LÊN GITHUB (AUTO PUSH GITHUB):**
   - Kho chứa chính thức: **`https://github.com/adwewecat/XEM_BOI.git`**
   - **BẤT KỲ LÚC NÀO** thêm tính năng, chỉnh sửa hoặc tối ưu code, **PHẢI COMMIT VÀ PUSH NGAY LẬP TỨC** lên remote GitHub nhánh `main`. Không được để dồn nhiều thay đổi mà chưa đẩy lên git.

---

## 🔮 2. TỔNG QUAN DỰ ÁN & PHÂN TÍCH BẢN CHẤT

### 2.1. Dự án này là gì? Có phải là "Xem Bói" không?
- **CHÍNH XÁC 100% LÀ XEM BÓI (TỬ VI ĐẨU SỐ - 紫微斗数):**
  - Đây là hệ thống lập lá số và giải đoán vận mệnh cổ truyền Đông Phương theo trường phái **Tử Vi Đẩu Số Thiên Kỷ** (dựa trên giáo trình *Thiên Kỷ - Ni Haixia / Nghê Hải Hà* và *Tử Vi Đẩu Số Toàn Thư / Toàn Tập* của tổ sư Trần Đoàn).
  - **Khả năng của hệ thống:**
    - Lập lá số Tử Vi 12 cung (Mệnh, Phụ mẫu, Phúc đức, Điền trạch, Quan lộc, Nô bộc/Giao hữu, Thiên di, Tật ách, Tài bạch, Tử tức, Phu thê, Huynh đệ).
    - An 14 Chính tinh (Tử Vi, Thiên Phủ, Thiên Cơ, Thái Dương, Vũ Khúc, Thiên Đồng, Liêm Trinh, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương, Thất Sát, Phá Quân) và các phụ tinh, Lục sát tinh, Tứ hoá.
    - Hiệu chỉnh độ sáng đắc hãm của các sao theo đúng cổ tịch chuẩn.
    - Tính toán giờ sinh theo **Giờ Chân Thái Dương (True Solar Time)**: Bù trừ kinh độ nơi sinh và phương trình thời gian (EoT - Equation of Time) chuẩn NOAA, xử lý Dạ Tý (23h-24h).
    - Tính Vận hạn: Đại Hạn (10 năm), Lưu Niên, Lưu Nguyệt, Lưu Nhật, Lưu Thời.
    - Nhận diện 50+ cách cục kinh điển (Tử Phủ đồng cung, Sát Phá Tham, Nhật Nguyệt tịnh minh, Thạch trung ẩn ngọc, v.v.).
    - Giao diện trực quan xem lá số, tra cứu cổ thư, trích lục bài giảng.

### 2.2. Nguồn gốc mã nguồn (Original Repo)
- Fork/nhận từ repo mã nguồn mở: `https://github.com/Renhuai123/ziwei-doushu.git`.
- Tác giả gốc xây dựng bản mã nguồn mở này làm engine tính toán công khai của dịch vụ `ouranic.cn`.

---

## 🛡️ 3. KẾT QUẢ PHÂN TÍCH AN NINH & MÃ ĐỘC (SECURITY AUDIT)

Sau khi quét toàn bộ mã nguồn, cấu hình và tệp phụ thuộc:
1. **Virus / Malware / Backdoor:**
   - **HOÀN TOÀN SẠCH (100% CLEAN).**
   - Không có backdoor, không có trojan, không đào coin (crypto miner), không đánh cắp cookie hay token.
   - Không chứa bất kỳ câu lệnh thực thi mã độc hại ngầm nào (`eval`, reverse shell, remote code execution).
2. **Vấn đề bảo mật & rác code đã phát hiện và xử lý:**
   - **Gói phụ thuộc dư thừa (Dead Dependencies):** Tác giả gốc để sót `@anthropic-ai/sdk`, `pg`, `@types/pg`, `ioredis` trong `package.json` dù code frontend không hề sử dụng. Đã gỡ bỏ toàn bộ 4 gói này (giảm 57 gói rác trong `node_modules`).
   - **Mã theo dõi thứ ba (Third-party tracking key):** Trong `app/layout.tsx` có hardcode Bing verification key của tác giả cũ (`808FFC6023A2C359B375DD860FEDA856`). Đã gỡ bỏ về biến môi trường `NEXT_PUBLIC_BING_VERIFICATION`.
   - **Dọn dẹp rác:** Xóa file nén zip thừa `ziwei-doushu-main.zip` và dọn sạch cây thư mục dự án về gốc workspace `D:\LAPTRINH\1CanPhanTich_Xemlagi`.

---

## 🏗️ 4. KIẾN TRÚC KỸ THUẬT (TECH STACK)

- **Framework:** Next.js 16 (App Router, Turbopack) + React 19.
- **Language:** TypeScript 5.
- **Styling:** Tailwind CSS + Framer Motion.
- **Core Astrology Engine:** `iztro` (thuật toán an sao nền tảng) + `lunar-javascript` (âm dương lịch).
- **Cấu trúc thư mục:**
  - `app/`: Next.js App Router (trang chủ, lập lá số `/chart`, xem hợp mệnh `/heming`, thư viện `/library`, tra cứu sao `/knowledge`).
  - `components/`: Các React component hiển thị lá số (PalaceCell, ChartBoard, BirthForm, v.v.).
  - `lib/ziwei/`: Lõi thuật toán Tử Vi (algorithm, sihua, true-solar-time, patterns, constants, v.v.).
  - `lib/classics/`: Dữ liệu cổ thư kinh điển (Tử Vi Đẩu Số Toàn Thư, Cốt Tủy Phú).
  - `docs/tianji-ziwei/`: Dữ liệu bài giảng trích dẫn Thiên Kỷ của Ni Haixia.
  - `scripts/regression/`: Hệ thống 17 bài test hồi quy tính toán lá số cực kỳ nghiêm ngặt.

---

## 📋 5. NHẬT KÝ THỰC HIỆN & TIẾP QUẢN (CHANGELOG)

### [2026-11-09] - Đợt 5: Tối Ưu Triệt Để Hiển Thị Tiếng Việt (To Rõ, Đậm Nét) & Xóa Bỏ Hoàn Toàn Tình Trạng Chữ Trung Quốc Lấp Mất
- **Người thực hiện:** Antigravity AI Assistant & Developer.
- **Vấn đề người dùng phản hồi:** "ĐANG BỊ ngược, chữ trung quốc quá nhiều, bạn dịch sang tiếng việt, và tiếng việt phải to, chứ nó đang bị chữ trung quốc lấp mất" (kèm ảnh chụp lá số bị rối rắm bởi chữ Hán chen chúc trong từng ô cung và phần luận giải cách cục vẫn là tiếng Trung).
- **Các giải pháp & nâng cấp đột phá đã thực hiện:**
  1. **Tối ưu triệt để 12 ô cung Tử Vi (`PalaceCell.tsx`):**
     - **Bỏ hoàn toàn chữ Hán rác đi kèm ở 50+ phụ tinh, cát tinh, sát tinh:** Trước đây mỗi ô cung nhồi nhét tới 30-40 chữ Hán (`Tam Thai 三台`, `Thiên Tài 天才`, `Kình Dương 擎羊`...) làm ô cung bị bóp nghẹt. Nay đã gỡ bỏ hoàn toàn chữ Hán trong ô, chuyển sang **100% TIẾNG VIỆT TO RÕ, ĐẬM ĐÀ** (`text-[10.5px] font-semibold`), màu sắc phân định rõ rệt (Cát tinh xanh trời `sky-300`, Sát tinh đỏ hồng `rose-300`).
     - **Chính Tinh to vượt trội:** Tên 14 chính tinh nâng lên cỡ `text-[15px] font-black text-amber-300 drop-shadow-sm`, độ sáng `[Miếu]`, `[Vượng]`, `[Đắc]`, `[Hãm]` vàng rực rõ nét, huy hiệu Tứ Hóa `(Lộc)`, `(Quyền)`, `(Khoa)`, `(Kỵ)` to rõ.
     - **Tên Cung vị & Can Chi:** Nâng lên `text-[13.5px] font-black text-amber-200`, Can chi `Nhâm Ngọ`, `Quý Mùi` to rõ, xóa bỏ sự lấn át của chữ Hán.
  2. **Việt hóa toàn diện Bộ Nhận Diện Cách Cục (`PatternsCard.tsx` & `ChartSummary.tsx`):**
     - Xây dựng từ điển diễn giải `PATTERN_DESCRIPTIONS_VI` và hàm `getPatternDescriptionVi`: Chuyển ngữ 100% diễn giải của hơn 50 cách cục kinh điển (Cơ Nguyệt Đồng Lương, Sát Phá Tham, Vũ Khúc Thất Sát, v.v.) từ tiếng Trung sang Tiếng Việt chuẩn mực mệnh lý, hành văn sâu sắc.
     - Viết bộ lọc dịch tự động `translateCondition`: Dịch toàn bộ các điều kiện *Bắt buộc*, *Gia cát*, *Phá cách* từ chữ Hán sang Tiếng Việt thuần túy.
     - Dịch toàn bộ nguồn gốc xuất xứ cổ thư sang Tiếng Việt (`Tử Vi Đẩu Số Toàn Thư`, `Tử Vi Cốt Tủy Phú`...).
  3. **Làm sạch Thiên Bàn và Chú Thích Bàn Cờ (`ChartBoard.tsx`):**
     - Xóa bỏ chữ Hán rác `紫微斗数` và dòng lịch âm tiếng Trung `农历: 1995年...` ở Thiên Bàn trung tâm.
     - Mệnh cư, Thân cư, Ngũ hành cục, Đại hạn hiển thị 100% Tiếng Việt to đẹp.
     - Dưới chân bàn cờ: Dịch sạch thanh Tứ Hóa sang `Hóa Lộc (禄)`, `Hóa Quyền (权)`, `Hóa Khoa (科)`, `Hóa Kỵ (忌)` và dòng hướng dẫn `👉 Nhấp vào ô cung để xem Tam Phương Tứ Chính`.
  4. **Khắc phục lỗi trùng lặp thanh điều hướng thời gian:**
     - Xóa bỏ thẻ `<TimeNav>` bị lặp 2 lần trên trang `/chart`.
  5. **Tích hợp Bộ máy luận giải bản mệnh Tiếng Việt tự động (`generateLocalInsight`):**
     - Luận giải chuyên sâu 6 phương diện: Mệnh Cách, Tình Duyên, Sự Nghiệp, Tài Lộc, Sức Khỏe, Tính Cách theo giáo trình Thiên Kỷ Nghê Hải Hà, hoạt động 100% offline không cần API AI ngoài.
  6. **Kiểm tra chất lượng & Build:**
     - `npm run typecheck`: 0 lỗi TypeScript.
     - `npm test`: 17/17 bài test hồi quy vượt qua 100%.
     - `next build`: Biên dịch production thành công 37 trang tĩnh.
     - Đẩy mã nguồn mới nhất lên GitHub `https://github.com/adwewecat/XEM_BOI.git`.

### [2026-11-09] - Đợt 4: Sửa triệt để lỗi "Bấm Start là tự tắt", Hoàn thiện toàn bộ Song Ngữ Tiếng Việt
- **Người thực hiện:** Antigravity AI Assistant & Developer.
- **Vấn đề người dùng phản hồi:** "Bấm start là tự tắt" khi nhấp đúp vào `START.bat` hoặc `START.cmd`.
- **Nguyên nhân kỹ thuật đã tìm ra và xử lý triệt để:**
  1. *Lỗi xung đột mã hóa UTF-8 trong Windows cmd.exe:* Trước đây các file `.bat` và `.cmd` chứa ký tự tiếng Việt có dấu dạng đa byte (multi-byte UTF-8 như `ỘNG`, `đầu`, `ại!`, `🔮`, `·`). Khi `cmd.exe` trên Windows đọc file theo ANSI/OEM code page, các byte này vô tình trùng với các ký tự điều khiển lệnh batch (`&`, `|`, `(`, `)`), dẫn đến việc batch parser tự ngắt dòng lệnh thành các lệnh rác không tồn tại (như `'ỘNG' is not recognized as an internal or external command`) và thoát tiến trình đột ngột.
  2. *Lỗi ngắt khối lệnh `if (...)`:* Ký tự ngoặc đơn `)` trong các chuỗi chú thích bên trong block `if (...)` khiến block đóng sớm và gây lỗi cú pháp `The syntax of the command is incorrect`.
  3. *Lệnh `timeout`:* Lệnh `timeout /t 3` trên một số phiên bản Windows khi bị redirect hoặc click từ Explorer sẽ báo lỗi `ERROR: Input redirection is not supported` và dừng script.
- **Giải pháp & Các việc đã thực hiện:**
  1. **Viết lại hoàn toàn `START.bat` & `START.cmd`:**
     - Sử dụng tiếng Việt không dấu chuẩn 100% mã ASCII an toàn cho mọi phiên bản Windows (`Windows 7, 10, 11`).
     - Tự động bổ sung các đường dẫn cài đặt Node.js mặc định vào biến môi trường `PATH` cục bộ (`C:\Program Files\nodejs`, `C:\Program Files (x86)\nodejs`, `%APPDATA%\npm`) phòng trường hợp người dùng chưa gán biến môi trường hệ thống.
     - Thay thế lệnh `timeout` bằng `ping 127.0.0.1 -n 4 >nul` để chờ an toàn tuyệt đối mà không sợ lỗi redirection.
     - Luôn giữ lệnh `pause` ở cuối cùng để cửa sổ lệnh không bao giờ tự đóng, cho phép người dùng đọc toàn bộ log chi tiết nếu có thông báo.
     - Tự động mở trình duyệt tại `http://localhost:3000/chart`.
  2. **Tạo thêm trình khởi động dự phòng `START_POWERSHELL.ps1`:**
     - Cho phép người dùng thích PowerShell chỉ cần chuột phải chọn "Run with PowerShell" là khởi chạy mượt mà.
  3. **Hoàn thiện song ngữ Việt - Hán cho toàn bộ các component còn lại:**
     - `components/StarDetailPanel.tsx`: Dịch toàn bộ thông tin chi tiết của 14 chính tinh và lục sát tinh, lục cát tinh, tứ hóa, độ sáng miếu hãm, các cung vị đắc lợi/lưu ý, danh ngôn cổ thư và luận giải của thầy Nghê Hải Hà.
     - `components/ChartSummary.tsx`: Bản địa hóa thẻ tổng quan lá số, tứ hóa bản mệnh, danh sách cách cục với các điều kiện: Bắt buộc, Gia cát, Phá cách.
     - `components/FamousPersonCard.tsx`: Dịch phân loại lá số danh nhân mẫu và hướng dẫn tham khảo.
     - `components/AnnouncementModal.tsx`: Bản địa hóa thư ngỏ và triết lý lập trình Thiên Kỷ.
     - `components/TimeNav.tsx`: Chuyển đổi các mốc thời gian: Bản Mệnh, Đại Hạn, Lưu Niên.
  4. **Kiểm tra chất lượng & Build:**
     - `npm run typecheck`: 0 lỗi TypeScript.
     - `npm test`: 17/17 bài kiểm tra hồi quy vượt qua 100%.
     - `next build`: Biên dịch production thành công 37 trang tĩnh.
     - Đẩy mã nguồn mới nhất lên GitHub `https://github.com/adwewecat/XEM_BOI.git`.

### [2026-11-09] - Đợt 3: Bản Địa Hóa Tiếng Việt Toàn Diện (Song Ngữ Hán - Việt Chuẩn Thuật Ngữ Tử Vi)
- **Người thực hiện:** Antigravity AI Assistant & Developer.
- **Yêu cầu:** Dịch toàn bộ giao diện và dữ liệu sang Tiếng Việt chuẩn mực thuật ngữ mệnh lý Tử Vi Đẩu Số phương Đông; tiếng Việt làm ngôn ngữ chính (to rõ), tiếng Trung làm phụ đề nhỏ bên dưới để đối chiếu nguyên bản cổ tịch.
- **Các việc đã làm:**
  1. **Xây dựng từ điển chuyển ngữ toàn diện `lib/ziwei/vietnamese.ts`:**
     - 12 Cung vị (`PALACE_VI`: Mệnh, Huynh Đệ, Phu Thê, Tử Tức, Tài Bạch, Tật Ách, Thiên Di, Nô Bộc, Quan Lộc, Điền Trạch, Phúc Đức, Phụ Mẫu, Thân Cung).
     - 14 Chính tinh (`MAJOR_STARS_VI`: Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Thiên Đồng, Liêm Trinh, Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương, Thất Sát, Phá Quân).
     - 50+ Phụ tinh, Lục cát, Lục sát, Tạp diệu (`MINOR_STARS_VI`: Tả Phụ, Hữu Bật, Văn Xương, Văn Khúc, Khôi, Việt, Lộc Tồn, Thiên Mã, Kình Dương, Đà La, Hỏa Tinh, Linh Tinh, Không, Kiếp...).
     - Tứ Hóa (`SIHUA_VI`: Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ).
     - Độ sáng miếu hãm (`BRIGHTNESS_VI`: Miếu, Vượng, Đắc, Lợi, Bình, Bất, Nhàn, Hãm).
     - Thiên Can & Địa Chi (`STEMS_VI`, `BRANCHES_VI`), Ngũ Hành Cục (`JU_VI`).
     - 34+ Cách cục kinh điển Tử Vi (`PATTERN_VI`: Quân Thần Khánh Hội, Tử Phủ Đồng Cung, Phủ Tướng Triều Viên, Sát Phá Tham, Cơ Nguyệt Đồng Lương, Thạch Trung Ẩn Ngọc, Dương Lương Xương Lộc...).
     - 13 Phương diện luận giải cuộc đời (`TOPIC_VI`: Mệnh cách, Tính cách, Tình duyên, Sự nghiệp, Tài vận, Sức khỏe, v.v.).
  2. **Bản địa hóa `components/PalaceCell.tsx` & `components/ChartBoard.tsx`:**
     - Tên cung to rõ tiếng Việt kèm tên gốc tiếng Trung nhỏ bên dưới.
     - Sao chính tinh, phụ tinh, tứ hóa, độ sáng hiển thị song ngữ trực quan.
     - Ô trung tâm (Thiên Bàn) hiển thị Ngũ Hành Cục, Cung Mệnh, Cung Thân song ngữ.
  3. **Bản địa hóa `components/BirthForm.tsx`:**
     - Chuyển toàn bộ form nhập liệu sang tiếng Việt: Họ tên, Ngày sinh Dương Lịch, Năm sinh, Tháng sinh, Ngày sinh.
     - Hiển thị Giờ Chân Thái Dương (True Solar Time) theo 12 Địa Chi Việt Nam (Giờ Tý, Sửu, Dần, Mão...).
     - Checkbox "Không rõ giờ sinh (lấy giờ Tý)", chọn giới tính Nam/Nữ, nút khởi tạo lá số "🔮 KHỞI TẠO LÁ SỐ · GIẢI MÃ VẬN MỆNH".
  4. **Bản địa hóa `components/PatternsCard.tsx`:**
     - Hiển thị tên cách cục tiếng Việt to rõ kèm Hán tự gốc và câu phú tóm lược.
     - Nhãn điều kiện: Bắt buộc (必须), Gia cát (加分), Phá cách (破格), Xuất xứ cổ tịch.
  5. **Bản địa hóa `components/InsightPanel.tsx`:**
     - 6 Tab luận giải: Mệnh Cách, Tình Duyên, Sự Nghiệp, Tài Lộc, Sức Khỏe, Tính Cách.
     - Khung nhập câu hỏi chiêm nghiệm và nút "Hỏi Tiếp (追问)".
  6. **Bản địa hóa `components/ShareModal.tsx` & `components/ShareCardCanvas.tsx`:**
     - Thiết kế lại ảnh xuất PNG 680x420 chuẩn đẹp với 12 cung tiếng Việt, sao chính tinh, đại hạn và triết lý Thiên Kỷ.
  7. **Bản địa hóa các trang vệ tinh:**
     - Trang chủ `/` (`app/page.tsx`), So hợp mệnh `/heming` (`app/heming/page.tsx`), Vạn Tinh Các `/knowledge` (`app/knowledge/page.tsx`), Tàng Kinh Các `/library` (`app/library/page.tsx`).
  8. **Kiểm tra chất lượng & Build:**
     - `npm run typecheck`: 0 lỗi TypeScript.
     - `npm test`: 17/17 suite bài kiểm tra hồi quy vượt qua 100%.
     - `next build`: Biên dịch production thành công 37 trang tĩnh.
     - Đẩy mã nguồn lên kho Git remote `https://github.com/adwewecat/XEM_BOI.git`.

### [2026-11-09] - Đợt 2: Nâng cấp UI/UX Huyền Ảo, Thêm 63 Tỉnh Thành VN, Tích Hợp 1-Click START & Toàn Bộ Tính Năng
- **Người thực hiện:** Antigravity AI Assistant & Developer.
- **Các việc đã làm:**
  1. **Đo đạc dung lượng dự án chính xác:**
     - Mã nguồn thuần (Source Code): **~3.6 MB** (siêu nhẹ, tối ưu).
     - Git Repository (.git): **~2.1 MB**.
     - Thư viện đã dọn dẹp (node_modules): **~385 MB**.
     - Cache biên dịch (.next): **~57.8 MB**.
     - Tổng dung lượng trên đĩa cứng: **~448 MB**.
  2. **Tạo file khởi động 1-click cho người dùng Windows (`START.bat` & `START.cmd`):**
     - Tự động kiểm tra Node.js, tự động `npm install` nếu thiếu thư viện, tự khởi động server phát triển và tự động mở trình duyệt web tại `http://localhost:3000/chart`.
  3. **Bổ sung 63 tỉnh/thành phố Việt Nam vào `lib/ziwei/cities.ts`:**
     - Tích hợp kinh độ chuẩn của Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng, Cần Thơ, v.v., giúp tính Giờ Chân Thái Dương và đổi ngày Dạ Tý cho người sinh tại Việt Nam chuẩn xác 100%.
  4. **Thiết kế UI/UX Huyền Bí, Phương Đông Đẳng Cấp:**
     - Tích hợp nền sao trời chuyển động ánh vàng/xanh lấp lánh (`StarField`).
     - Xây dựng thanh điều hướng toàn diện (`components/Navbar.tsx`) kết nối các chức năng: Lập Lá Số (`/chart`), So Hợp Mệnh (`/heming`), Vạn Tinh Các (`/knowledge`), Tàng Kinh Các (`/library`).
     - Bổ sung hiệu ứng kính mờ huyền thuật (`.card-glass`), viền ánh vàng kim (`mystic-border-glow`).
  5. **Show toàn bộ tính năng chuyên sâu trên giao diện `/chart`:**
     - Tích hợp danh sách chọn nhanh lá số danh nhân (`FAMOUS_PERSONS`: Jack Ma, Lý Gia Thành, Đặng Lệ Quân, v.v.) để chiêm nghiệm lá số mẫu chỉ với 1 click.
     - Tích hợp bộ nhận diện 50+ cách cục kinh điển (`PatternsCard`: Tử Phủ đồng cung, Sát Phá Tham, Nhật Nguyệt tịnh minh, Thạch trung ẩn ngọc...).
     - Tích hợp bảng chi tiết cung vị toạ thủ (chính tinh, phụ tinh, tứ hóa, miếu hãm, đại hạn).
     - Tích hợp modal xuất ảnh lá số PNG (`ShareModal`) để tải ảnh lá số chất lượng cao về máy.
  6. **Kiểm tra chất lượng & Build:**
     - Vượt qua toàn bộ 17 bài regression tests (`npm test`).
     - TypeScript typecheck 0 lỗi.
     - Production build `next build` 37 trang thành công 100%.

### [2026-11-09] - Thiết lập dự án, Audit mã độc, Clean code & Đồng bộ Git
- **Người thực hiện:** Antigravity AI Assistant & Developer.
- **Các việc đã làm:**
  1. Kiểm tra và đọc tất cả các file markdown (`New Text Document.md`, `README.md`, `README.en.md`, `CONTRIBUTING.md`, v.v.).
  2. Xác định bản chất: Dự án là công cụ lập lá số & giải đoán **Tử Vi Đẩu Số (Xem bói / Mệnh lý học)**.
  3. Phân tích an ninh: Xác nhận an toàn 100%, không virus/mã độc.
  4. Đưa toàn bộ mã nguồn từ thư mục con ra thư mục gốc dự án; xóa file zip và file tạm thừa.
  5. Gỡ bỏ 4 gói phụ thuộc chết (`@anthropic-ai/sdk`, `pg`, `@types/pg`, `ioredis`), loại bỏ 57 packages thừa.
  6. Xóa hardcoded Bing tracking key trong `app/layout.tsx`.
  7. Thêm chú thích tiếng Việt chi tiết cho các thuật toán lõi (`algorithm.ts`, `sihua.ts`, `true-solar-time.ts`, `patterns.ts`).
  8. Khởi tạo Git repository, cấu hình remote `https://github.com/adwewecat/XEM_BOI.git`.
  9. Chạy thành công toàn bộ 17 bài regression test (`npm test`) và kiểm tra kiểu (`npm run typecheck`).
  10. Build thử nghiệm bản production (`npm run build`) thành công 100% với 37 trang tĩnh.
  11. Tạo `README.md` và `gemini.md` chuẩn chỉnh.
  12. Đẩy code lên GitHub `https://github.com/adwewecat/XEM_BOI.git`.

---

## 🚀 6. HƯỚNG DẪN DÀNH CHO DEV / AI TIẾP THEO

Khi bắt đầu làm việc trên dự án này:
1. Chạy lệnh cài thư viện nếu chưa có: `npm.cmd install` (trên Windows dùng `npm.cmd`).
2. Chạy test kiểm tra: `npm.cmd test`.
3. Khởi động môi trường phát triển: `npm.cmd run dev` (truy cập `http://localhost:3000/chart`).
4. **Trước khi thêm/sửa gì:** Đọc `gemini.md`, ghi lại kế hoạch vào mục Nhật ký.
5. **Sau khi thêm/sửa gì:** Chạy `npm.cmd test`, bổ sung ghi chú trong code, cập nhật `gemini.md` và chạy:
   ```bash
   git add -A
   git commit -m "feat/fix: mô tả thay đổi"
   git push origin main
   ```

