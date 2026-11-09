# 🔮 XEM BÓI TỬ VI ĐẨU SỐ (紫微斗数 · 开源排盘引擎)

<div align="center">

### Hệ thống lập lá số và giải đoán Tử Vi Đẩu Số chuẩn phái Thiên Kỷ (Ni Haixia)
*Thuật toán là trí tuệ truyền thống công khai, không nên bị đóng khung sau những bức tường.*

[![CI](https://github.com/Renhuai123/ziwei-doushu/actions/workflows/ci.yml/badge.svg)](https://github.com/Renhuai123/ziwei-doushu/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](./LICENSE)
[![GitHub Repository](https://img.shields.io/badge/GitHub-adwewecat%2FXEM__BOI-blue.svg)](https://github.com/adwewecat/XEM_BOI.git)

[Tiếng Việt](#-tiếng-việt) · [English](#-english) · [中文 (README gốc)](./README.en.md)

</div>

---

## 🇻🇳 TIẾNG VIỆT

### 1. Giới thiệu dự án
Đây là hệ thống **Xem Bói / Lập lá số Tử Vi Đẩu Số** chuyên sâu, kế thừa nguyên bản hệ thống lý số trong giáo trình **《Thiên Kỷ》** của danh sư **Nghê Hải Hà (Ni Haixia)** và các tác phẩm kinh điển như *Tử Vi Đẩu Số Toàn Thư*, *Cốt Tủy Phú*.

Hệ thống cung cấp:
- **Lập lá số 12 Cung**: Mệnh, Phụ mẫu, Phúc đức, Điền trạch, Quan lộc, Nô bộc, Thiên di, Tật ách, Tài bạch, Tử tức, Phu thê, Huynh đệ.
- **An 14 Chính tinh & Phụ tinh**: Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Thiên Đồng, Liêm Trinh, Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương, Thất Sát, Phá Quân; Lục sát tinh, Tứ hoá, Thập nhị thần.
- **Giờ Chân Thái Dương (True Solar Time)**: Bù trừ kinh độ địa lý và phương trình thời gian (NOAA approximation), xử lý ranh giới Dạ Tý (23:00 - 24:00) chuẩn xác.
- **Nhận diện Cách cục Tử Vi**: Hơn 50+ cách cục (Tử Phủ đồng cung, Sát Phá Tham, Nhật Nguyệt tịnh minh, Thạch trung ẩn ngọc, v.v.).
- **Vận hạn đa tầng**: Bản mệnh, Đại Hạn (10 năm), Lưu Niên, Lưu Nguyệt, Lưu Nhật, Lưu Thời.
- **Kho dữ liệu luận giải đồ sộ**: Dữ liệu mẫu hơn 67.5 vạn lá số và hàng triệu đoạn luận giải.

---

### 2. Báo cáo kiểm định an ninh & mã độc
- **Mã độc & Virus**: **100% SẠCH SẼ**. Đã kiểm tra toàn bộ mã nguồn, không có backdoor, trojan, miner, hoặc mã độc ngầm.
- **Tối ưu hóa mã nguồn**:
  - Đã loại bỏ hoàn toàn các package không sử dụng (`@anthropic-ai/sdk`, `pg`, `@types/pg`, `ioredis`) giúp giảm 57 packages dư thừa.
  - Đã gỡ bỏ key theo dõi của bên thứ ba hardcode trong layout.
  - Đã bổ sung chú thích tiếng Việt rõ ràng cho toàn bộ các module thuật toán cốt lõi.
  - Vượt qua 100% 17 bài kiểm tra hồi quy khắt khe (`pan-integrity`, `dst-cn`, `clock-adjust`, `patterns-sihua`, v.v.).

---

### 3. Quy tắc phát triển (Bất di bất dịch)
1. **Ghi chú & Nhật ký**: Luôn cập nhật [gemini.md](file:///d:/LAPTRINH/1CanPhanTich_Xemlagi/gemini.md) trước và sau khi thêm/sửa bất kỳ tính năng nào.
2. **Code sạch**: Build code sạch sẽ, không có mã dư thừa. Mọi tính năng đều phải có chú thích tiếng Việt dễ đọc, dễ hiểu.
3. **Đẩy code lên GitHub**: Bất kỳ khi nào hoàn thành hoặc sửa đổi tính năng, **đẩy code ngay lập tức** lên:
   ```bash
   https://github.com/adwewecat/XEM_BOI.git
   ```

---

### 4. Hướng dẫn cài đặt & Khởi chạy

```bash
# Cài đặt thư viện (trên Windows dùng npm.cmd)
npm.cmd install

# Chạy kiểm thử hồi quy (17 bài test)
npm.cmd test

# Kiểm tra kiểu dữ liệu TypeScript
npm.cmd run typecheck

# Khởi chạy máy chủ phát triển
npm.cmd run dev
# Mở trình duyệt tại: http://localhost:3000/chart

# Đóng gói sản phẩm (Production build)
npm.cmd run build
```

---

## 🇬🇧 ENGLISH

### About Zi Wei Dou Shu Charting Engine
This project is an open-source **Zi Wei Dou Shu (Purple Star Astrology / Chinese Fortune Telling)** charting system based on the teaching system of **Ni Haixia's *Tian Ji* (倪海厦《天纪》)**.

### Features
- Complete charting algorithm covering 12 Palaces, 14 Major Stars, Assistant Stars, and Minor Stars.
- Star brightness adjusted according to classical sources (*Zi Wei Dou Shu Quan Shu*).
- True Solar Time calculation (longitude offset + NOAA Equation of Time).
- Pattern recognition (50+ classic patterns such as Zi Fu Tong Gong, Sha Po Lang, Ri Yue Bing Ming).
- Four Transformations (Si Hua) across natal, decade, annual, and daily charts.
- Zero vulnerabilities, cleaned of unused packages, passing all regression tests.

### Remote Repository
- Production Git Repository: `https://github.com/adwewecat/XEM_BOI.git`
