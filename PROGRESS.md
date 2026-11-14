# Project Progress

> **Rotation Rule:** Prepend new entries to the top of **Recent Milestones**. Keep at most **10 entries** here; move older entries (#11+) to `ARCHIVE.md`.

## Recent Milestones

- **[2026-11-14] Đợt 32: Nâng Cấp Bói Chỉ Tay Hỗ Trợ 2 Tay (Song Thủ) Hoặc 1 Tay Tùy Ý & Chụp Ảnh Trực Tiếp Trên Điện Thoại**
  - **Done:** Cập nhật `PalmPhotoUploader.tsx` với 3 chế độ chọn (`Cả 2 Tay (Song Thủ)`, `Chỉ Tay Trái`, `Chỉ Tay Phải`), tách riêng 2 nút `📷 Chụp Ảnh` (`capture="environment"`) và `🖼️ Chọn Ảnh` (thư viện/tệp) để điện thoại vừa chụp trực tiếp vừa chọn ảnh có sẵn. Bổ sung `analyzeDualPalms` trong `lib/metaphysics/palmistry.ts` và hiển thị khối **Song Thủ Hợp Tham** đối chiếu Tiên Thiên — Hậu Thiên kèm vẽ nét Neon đồng thời 2 bàn tay trong `app/metaphysics/page.tsx`.
  - **Verified:** Kiểm tra Playwright trên viewport `390x844` tại `/metaphysics` (0 lỗi/cảnh báo console), `npm.cmd run typecheck` và `npm.cmd test` đạt 100% (19/19 bộ test).

- **[2026-11-14] Đợt 31: Tối Ưu Giao Diện & Trải Nghiệm Di Động (Mobile Responsive UI/UX)**
  - **Done:** Tinh chỉnh `Navbar.tsx` (thu gọn header `< sm`, bỏ nút trùng với `MobileBottomNav`), `SpiritualManifestationOverlay.tsx` (thu nhỏ nút nổi mobile `bottom-[70px]` tránh che form/modal), `AnnouncementModal.tsx` (`maxHeight: min(78vh, 720px)`), `BirthForm.tsx` (padding responsive, grid nơi sinh 1 cột trên mobile, tinh chỉnh padding/cỡ chữ 3 ô ngày sinh), `ChartBoard.tsx` (thêm chế độ `Thẻ 12 Cung` 2 cột mặc định trên mobile kèm nút chuyển đổi sang lưới `4×4`), `app/metaphysics/page.tsx` (lưới tab 2 cột trên mobile), và `app/heming/page.tsx` (layout 1 cột `< lg`).
  - **Verified:** Kiểm tra Playwright trên viewport `390x844` tại `/`, `/chart`, `/metaphysics`, `/heming` (0 lỗi/cảnh báo console), `npm.cmd run typecheck` và `npm.cmd test` đạt 100%.

- **[2026-11-13] Đợt 30: Hệ Thống Linh Tượng Tâm Linh Hiển Linh Định Kỳ (60s Bung Ấn Random Không Trùng Lặp)**
  - **Done:**
    - Xây dựng engine `lib/metaphysics/spiritualManifestations.ts` với **30 linh tượng tâm linh** chia làm 6 nhóm: Đạo Bùa Cổ Truyền (Linh Phù), Các Sao Tinh Tú (Bắc Đẩu, Tử Vi, Nam Đẩu, Nhị Thập Bát Tú, Nhật Nguyệt), 12 Con Giáp Địa Chi Linh Thú, Bát Quái & Thái Cực Trận Đồ, Tứ Linh Thần Thú & Bảo Ấn, Ngũ Hành Tương Sinh & Kim Liên Pháp Trận.
    - Áp dụng thuật toán **Shuffle Bag (Fisher-Yates kết hợp phân tách nhóm)** đảm bảo rút 30 lần liên tiếp không bao giờ trùng lặp bất kỳ linh tượng nào, kể cả tại ranh giới xáo bài chu kỳ mới.
    - Xây dựng `components/SpiritualManifestationOverlay.tsx` đặt chu kỳ mặc định **60 giây (`SPIRITUAL_INTERVAL_MS = 60000`)** mỗi lần bung ấn (có nút chuyển đổi 1-click `⚡60s ➔ ⚡240s ➔ ⏸Tắt`), kèm hiệu ứng SVG vẽ bùa chu sa, đóng ấn triện, nối sao thiên văn, xoay vòng Bát Quái / 12 Địa Chi và nút pháp khí nổi `🧧 Linh Phù Hiển Linh` góc dưới phải.
    - Viết bộ test TDD `scripts/regression/spiritual-manifestations.test.ts` (19/19 test suites PASS) và xác minh bằng Playwright MCP (0 Errors, 0 Warnings).
  - **Issues Fixed:**
    - Khắc phục triệt để lỗi Hydration Mismatch (`bis_skin_checked="1"` do browser extension tự chèn vào DOM trước khi React hydrate) bằng cơ chế client-mount (`mounted`) cho `SideCouplets` / `SpiritualManifestationOverlay`, khởi tạo `deckRef` thuần client và bộ lọc `MutationObserver` dọn sạch thuộc tính rác trước khi hydrate trong `app/layout.tsx`.
    - Khắc phục cảnh báo container `useScroll` bằng `className="relative"` trên thẻ `<html>`, bổ sung `app/icon.svg` (biểu tượng Thái Cực) và tắt `devIndicators` gây vướng giao diện.
  - **Next:** Tiếp tục tối ưu trải nghiệm huyền học theo yêu cầu người dùng.

- **[2026-11-13] Tích hợp Skill_Workflow_A.I + 3 MCP Servers (Playwright, Private-Journal, Context7)**
  - **Done:**
    - Cài đặt toàn bộ 42 workflow skills (`obra/superpowers` + `mattpocock/skills`) vào `.agents/skills/` và `.claude/skills/`.
    - Hợp nhất không ghi đè 3 MCP servers (`playwright`, `private-journal`, `context7`) vào MCP config toàn cục `~/.gemini/config/mcp_config.json` (giữ nguyên server `rea`) và `.mcp.json`.
    - Chuẩn hóa 4 file cốt lõi: `.gitignore` (chặn `.env*`, `.private-journal/`, `data/admin_config.json`), `README.md`, `GEMINI.md` (< 300 dòng), `PROGRESS.md` (tối đa 10 mốc xoay vòng sang `ARCHIVE.md`).
    - Thiết lập quy trình đọc phân tầng (chỉ đọc `GEMINI.md` + `PROGRESS.md` khi mở phiên), tra cứu Context7 trước khi viết code tích hợp thư viện ngoài, TDD, subagents độc lập, kiểm thử giao diện bằng Playwright MCP.
  - **Issues Fixed:** Không có.
  - **Next:** Tiếp tục phát triển các tính năng theo quy trình Superpowers + Context7 + TDD.

- **[2026-11-11] Đợt 29: Luận Đoán Chân Thực Biện Chứng Âm Dương · Xóa Bỏ Khen Nịnh Một Chiều**
  - **Done:**
    - Nâng cấp System Prompt Gemini AI: Đạo trung chính & khách quan tuyệt đối, cấm nịnh bợ, mổ xẻ 2 mặt cát/hung, phán quyết dứt khoát khi gặp quẻ/sao/bài hung hiểm.
    - Tái cấu trúc Bói Chỉ Tay: Thêm 6 cấp độ `DestinyGrade`, thang điểm thực tế (50–88), 2 phần `positives` và `negatives`, cảnh báo tật xấu chí mạng (`criticalFlaws`) và cạm bẫy định mệnh (`majorRisks`).
    - Nâng cấp Kinh Dịch Lục Hào: Quẻ hung phán thẳng THẤT BẠI / NGUY HIỂM / HAO TÀI / ĐỔ VỠ.
    - Cân bằng Tarot: Cảnh báo bài ngược (Reversed) và các lá bài thử thách (Death, Devil, Tower, Moon).

- **[2026-11-11] Đợt 28: Vẽ Trực Tiếp Các Đường Chỉ Tay Neon Phát Sáng Lên Ảnh Bàn Tay Thật**
  - **Done:** Tạo component `PalmLinesOverlay` vẽ trực tiếp 4 tuyến chỉ tay neon phát sáng (Sinh Đạo, Trí Đạo, Tâm Đạo, Định Mệnh) và các gò lên ảnh chụp bàn tay thật của người dùng. Có thanh công cụ tinh chỉnh: xoay 90°, lật tay, thu phóng, dịch chuyển và click vào từng nét vẽ.

- **[2026-11-11] Đợt 27: Sửa Triệt Để Lỗi Gemini AI Fallback, Sửa Regex Tiếng Việt & Thêm Chiêm Thiên Thời**
  - **Done:** Cập nhật danh sách model fallback 2026 (`gemini-3.6-flash`, `gemini-3.8-flash`, `gemini-2.5-flash`), loại bỏ vĩnh viễn các model cũ đã bị khai tử (`1.5-pro`, `1.5-flash`, `2.0-flash`). Sửa lỗi regex tiếng Việt `isLove` nhận nhầm từ "thời tiết". Bổ sung intent Chiêm Thiên Thời (mưa, nắng, dông bão).

- **[2026-11-11] Đợt 26: Khắc Phục Triệt Để Trùng Dụng Thần & Đưa Khối AI Gemini Lên Vị Trí Trung Tâm**
  - **Done:** Bổ sung intent chuyên sâu cho hotline, cuộc gọi, tin tức, liên lạc (`isContactOrNews`), khách hàng & đơn hàng (`isBusinessCustomers`), vận khí ngày (`isDailyLuck`). Nhận diện câu hỏi Có/Không toàn diện. Đưa khối AI Gemini lên vị trí danh dự trung tâm trên giao diện.

- **[2026-11-11] Đợt 25: Nạp API Key Dùng Chung & Cấu Hình Model Gemini 3.6 Flash Siêu Tốc Độ**
  - **Done:** Lưu trữ API Key dùng chung và model `gemini-3.6-flash` trong `data/admin_config.json` bảo mật. Tích hợp tùy chọn Gemini 3.6 Flash và kiểm tra kết nối 1-click trong trang Admin.

- **[2026-11-11] Đợt 24: Bổ Sung Kết Luận Cốt Lõi Từng Cung Vị & Trợ Lý Tử Vi AI Đặt Câu Hỏi**
  - **Done:** Xây dựng engine luận đoán cốt lõi 5 tầng cho từng cung vị (`synthesizePalaceVerdict`). Tích hợp trợ lý Tử Vi AI hỏi đáp chuyên sâu trực tiếp trên lá số kèm 5 gợi ý câu hỏi 1-click. Cung cấp cẩm nang 3 tab phân biệt Bản Mệnh vs Cung Mệnh vs Cung Thân vs Đại Hạn.

