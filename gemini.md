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
