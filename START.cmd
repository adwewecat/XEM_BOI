@echo off
chcp 65001 >nul
title XEM BÓI TỬ VI ĐẨU SỐ - KHỞI ĐỘNG
cd /d "%~dp0"

cls
echo =====================================================================
echo    🔮  HỆ THỐNG XEM BÓI TỬ VI ĐẨU SỐ (紫微斗数) - AN SAO & LẬP LÁ SỐ
echo        Trường phái Thiên Kỷ (Ni Haixia) & Tử Vi Đẩu Số Toàn Thư
echo =====================================================================
echo.

:: 1. Kiểm tra môi trường Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [LỖI] Không tìm thấy Node.js trên máy tính của bạn!
    echo Vui lòng cài đặt Node.js từ: https://nodejs.org/ (bản LTS khuyên dùng)
    echo Sau đó bấm lại vào file START.cmd này nhé.
    echo.
    pause
    exit /b 1
)

:: 2. Kiểm tra thư viện node_modules
if not exist "node_modules" (
    echo [*] Lần đầu chạy: Đang tự động cài đặt thư viện cần thiết...
    call npm.cmd install
    if %errorlevel% neq 0 (
        echo [LỖI] Cài đặt thư viện thất bại! Vui lòng kiểm tra kết nối mạng.
        pause
        exit /b 1
    )
    echo [OK] Đã cài đặt xong thư viện!
    echo.
)

:: 3. Mở trình duyệt sau 3 giây
echo [*] Đang khởi động máy chủ ứng dụng web tại: http://localhost:3000/chart ...
start "" cmd /c "timeout /t 3 >nul & start http://localhost:3000/chart"

:: 4. Khởi chạy máy chủ phát triển Next.js
echo.
echo =====================================================================
echo    ỨNG DỤNG ĐANG CHẠY! TRÌNH DUYỆT SẼ TỰ ĐỘNG MỞ TRONG GIÂY LÁT...
echo    Địa chỉ web: http://localhost:3000/chart
echo    (Để dừng ứng dụng, bạn chỉ cần đóng cửa sổ đen này lại)
echo =====================================================================
echo.

call npm.cmd run dev

if %errorlevel% neq 0 (
    echo.
    echo [LƯU Ý] Máy chủ đã dừng lại.
    pause
)

