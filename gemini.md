# 📜 SỔ TAY DỰ ÁN VÀ QUY TẮC PHÁT TRIỂN (GEMINI.MD)

> **Quy tắc đọc phân tầng bắt buộc:** Khi mở đầu mỗi phiên làm việc, AI Agents **CHỈ ĐƯỢC ĐỌC DUY NHẤT 2 TỆP: `GEMINI.MD` VÀ `PROGRESS.MD`**. Tuyệt đối không tự ý đọc lan man `ARCHIVE.md` hay các tệp `.md` khác trừ khi nhiệm vụ nêu đích danh. File này phải giữ **dưới 300 dòng**.

---

## 🏗️ 1. KIẾN TRÚC CỐT LÕI (CORE ARCHITECTURE)

- **Bản chất dự án:** Hệ thống lập lá số và giải đoán vận mệnh cổ truyền Đông Phương chuẩn phái **Tử Vi Đẩu Số Thiên Kỷ** (danh sư Nghê Hải Hà / Ni Haixia & Trần Đoàn tổ sư) kết hợp siêu module huyền học **Kim Cổ Đông Tây** (Bói Chỉ Tay Palmistry, Kinh Dịch Lục Hào Động Tâm, Tarot 22 Ẩn Chính, Trạch Nhật, Thần Số Học Pitago, Bát Tự Hà Lạc).
- **Cấu trúc thư mục trọng tâm:**
  - `app/`: Next.js App Router (lập lá số `/chart`, hợp mệnh `/heming`, thư viện `/library`, tra cứu `/knowledge`, bói tổng hợp `/metaphysics`, quản trị `/admin`, API AI `/api/ai/divine`, API admin `/api/admin/config`).
  - `components/`: React component hiển thị lá số (`PalaceCell`, `ChartBoard`, `BirthForm`), overlay nét vẽ chỉ tay neon (`PalmLinesOverlay`, `PalmPhotoUploader`), modal cẩm nang luận giải.
  - `lib/ziwei/`: Lõi thuật toán Tử Vi (an sao 12 cung, 14 chính tinh, Tứ Hóa, Giờ Chân Thái Dương bù trừ kinh độ & phương trình thời gian EoT chuẩn NOAA, xử lý Dạ Tý 23h-24h, nhận diện 50+ cách cục cổ tịch).
  - `lib/metaphysics/`: Các engine chiêm đoán độc lập (`palmistry.ts`, `dongtam.ts`, `tarot.ts`, `almanac.ts`, `bazi.ts`, `numerology.ts`).
  - `lib/classics/`: Cổ thư kinh điển (Tử Vi Đẩu Số Toàn Thư, Toàn Tập, Cốt Tủy Phú).
  - `lib/server/`: Quản lý cấu hình máy chủ & Gemini API Key dùng chung (`adminConfig.ts`).
  - `scripts/regression/`: Hệ thống 18 test suite hồi quy nghiêm ngặt (768 lá số mẫu, ranh giới Lập Xuân, Chân Thái Dương, Intent Dịch lý...).
  - `data/`: Tệp cấu hình bảo mật của Admin (`admin_config.json`, luôn được gitignore).

---

## 💻 2. TECH STACK & MÔI TRƯỜNG

- **Ngôn ngữ & Runtime:** TypeScript 5, Node.js (hỗ trợ `npx`).
- **Framework & UI:** Next.js 16.4.3 (Turbopack, App Router) + React 19.2.5, Tailwind CSS 3.4, Framer Motion 11.
- **Engine Lý Số:** `iztro` 2.5 (an sao cơ sở), `lunar-javascript` 1.7 (âm dương lịch cổ truyền).
- **AI Engine:** Google Gemini API (`gemini-3.6-flash` siêu tốc độ, danh sách fallback 2026: `gemini-3.8-flash`, `gemini-2.5-flash`).

---

## ⚙️ 3. LỆNH BUILD, TEST & KIỂM TRA

```bash
# Khởi chạy máy chủ phát triển:
npm.cmd run dev

# Kiểm tra kiểu dữ liệu TypeScript (0 lỗi):
npm.cmd run typecheck

# Chạy toàn bộ 18 test suite hồi quy nghiêm ngặt:
npm.cmd test

# Đóng gói sản phẩm (Production build - 238 routes tĩnh):
npm.cmd run build

# Khởi chạy production server:
npm.cmd start
```

---

## 📌 4. QUY TẮC BẤT DI BẤT DỊCH CỦA DỰ ÁN (CORE RULES)

1. **QUY TẮC GHI CHÚ (NOTE & LOGGING):**
   - Trước và sau khi thực hiện thay đổi, bắt buộc ghi chép ngắn gọn vào đầu mục Recent Milestones của `PROGRESS.md`. Giữ tối đa 10 mốc gần nhất; các mốc cũ hơn (#11+) tự động xoay vòng sang `ARCHIVE.md`.
   - Comment code tiếng Việt rõ ràng giải thích **LÝ DO (WHY)** cho các đoạn logic nghiệp vụ phức tạp, bất biến hoặc xử lý biên.

2. **QUY TẮC CODE SẠCH (CLEAN CODE & ZERO DEAD CODE):**
   - Tuyệt đối không để mã chết, package dư thừa, biến không dùng, console log rác.
   - Luôn chạy `npm.cmd run typecheck` và `npm.cmd test` đạt 100% trước khi kết thúc công việc.

3. **QUY TẮC ĐẨY CODE LÊN GITHUB (AUTO PUSH GITHUB):**
   - Kho chứa chính thức: **`https://github.com/adwewecat/XEM_BOI.git`**
   - **BẤT KỲ LÚC NÀO** hoàn thành tính năng, sửa lỗi hoặc tối ưu code, **PHẢI COMMIT VÀ PUSH NGAY LẬP TỨC** lên remote GitHub nhánh `main`. Không được để dồn nhiều thay đổi mà chưa đẩy lên git. Tuyệt đối không commit file bí mật (`.env`, `data/admin_config.json`, `.private-journal/`).

---

<!-- skill-workflow-ai:start -->
## Workflow & Memory Rules (Skill_Workflow_A.I)

### 1. Memory & Auto-Init (Context Budget Protection)
- **Layered Session Startup:** At the start of every session, read **ONLY `GEMINI.md` and `PROGRESS.md`**. Do NOT bulk-read `ARCHIVE.md` or other `.md` files unless a path is explicitly named in the current task or loaded as an active skill (`SKILL.md`).
- **Auto-Initialization:** Before writing or modifying code, verify all 4 root files exist: `.gitignore`, `README.md`, `GEMINI.md` (< 300 lines), `PROGRESS.md`. Create any missing file immediately; leave existing ones intact.
- **History Rotation (`PROGRESS.md`):** After each verified change or bugfix, prepend a brief entry at the top of `PROGRESS.md`. Keep **at most 10 recent entries**; move older entries (#11+) into `ARCHIVE.md`.
- **Cross-Project Memory (`private-journal` MCP):** Before debugging unfamiliar issues or making architectural decisions, query `private-journal` (`search_journal`) for reusable environment fixes and patterns from past projects. After solving non-obvious issues, save generalizable takeaways via `process_thoughts` (`technical_insights` / `world_knowledge`). Keep `.private-journal/` gitignored.

### 2. Execution Workflow & MCP Standards
- **Main Backbone (`obra/superpowers` — Auto-On):** Follow for every task: load `using-superpowers` -> `brainstorming` / `writing-plans` -> split work into independent tasks -> dispatch fresh-context subagents per task (`subagent-driven-development` / `dispatching-parallel-agents`) -> strict RED-GREEN-REFACTOR `test-driven-development` -> run `verification-before-completion` with real command output before claiming success.
- **Up-to-Date Library Docs (`context7` MCP):** *"Luôn gọi Context7 để tra cứu API trước khi viết code tích hợp thư viện ngoài"* — always call `context7` (`resolve-library-id` -> `query-docs`) for current API docs and examples before writing third-party library or SDK integration code.
- **Browser UI Verification (`playwright` MCP):** When changes touch web/frontend UI, include `playwright` MCP in `verification-before-completion`: open the localhost URL, inspect the Accessibility snapshot, test core interactions, and check browser console/runtime errors before `git commit`.
- **Manual / Milestone Tools (`mattpocock/skills` — Manual Only):** Never auto-trigger on routine tasks. Run ONLY when the user chats one of these exact trigger phrases (or invokes the matching slash command):
  - **`quy trinh moi`** *(skill `grill-with-docs` — use when initializing a project or adding a major feature)*: Act as a strict reviewer, ask one question at a time on business logic and input/output until zero ambiguity remains, then lock canonical terms in `GLOSSARY.md` and decisions in `docs/adr/`. Never auto-trigger on routine bugfixes.
  - **`nghi ngoi`** *(skill `handoff` — use at end of workday or when chat gets long)*: Summarize completed work at the top of `PROGRESS.md` (keep max 10 entries; move older entries #11+ to `ARCHIVE.md`) and write clear handoff instructions for the next session.
  - **`cau hinh`** *(skill `wizard` — use for off-code manual setup)*: Generate an interactive terminal bash script guiding the user step-by-step to configure `.env`, API keys, GitHub Secrets, or environment setup.

### 3. Clean Code & Git / GitHub Standards
- **Clean Code:** Immediately delete unused variables, functions, imports, and dead files. Comment only **WHY** (non-obvious invariants, edge cases, special error handling); never comment obvious code.
- **Git & GitHub:**
  - Never push failing, untested, or unverified code.
  - `git commit` locally only after finishing and verifying each task.
  - `git push` to GitHub right after completing a full feature, a complete bugfix, or before ending a session — always inspect `git status` and staged diff first to ensure no `.env`, secrets, keys, or credentials are included.
<!-- skill-workflow-ai:end -->
