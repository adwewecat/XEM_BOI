@echo off
title XEM BOI TU VI DAU SO - KHOI DONG SERVER
cd /d "%~dp0"

REM 0. Tu dong them duong dan Node.js neu chua co trong PATH
if exist "C:\Program Files\nodejs" set "PATH=%PATH%;C:\Program Files\nodejs"
if exist "C:\Program Files (x86)\nodejs" set "PATH=%PATH%;C:\Program Files (x86)\nodejs"
if exist "%APPDATA%\npm" set "PATH=%PATH%;%APPDATA%\npm"

cls
echo =====================================================================
echo    TU VI DAU SO (PHAI THIEN KY) - HE THONG AN SAO VA LAP LA SO
echo    Truong phai Thien Ky (Ni Haixia) - Tu Vi Dau So Toan Thu
echo =====================================================================
echo.

REM 1. Kiem tra Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [LOI] Khong tim thay Node.js tren may tinh cua ban!
    echo Vui long cai dat Node.js tu: https://nodejs.org/
    echo Sau khi cai xong, hay mo lai file START.bat nay nhe.
    echo.
    pause
    exit /b 1
)

REM 2. Kiem tra thu vien node_modules
if not exist "node_modules\" (
    echo [*] Phat hien chay lan dau: Dang tu dong cai dat thu vien...
    echo     (Qua trinh nay chi dien ra 1 lan, vui long cho trong giay lat)
    call npm.cmd install
    if %errorlevel% neq 0 (
        echo [LOI] Cai dat thu vien that bai! Vui long kiem tra ket noi mang.
        echo.
        pause
        exit /b 1
    )
    echo [OK] Da cai dat xong thu vien!
    echo.
)

REM 3. Tu dong mo trinh duyet web den trang xem la so sau 3 giay
echo [*] Dang khoi dong may chu web tai: http://localhost:3000/chart ...
start "" cmd /c "ping 127.0.0.1 -n 4 >nul & start http://localhost:3000/chart"

REM 4. Khoi chay may chu Next.js
echo.
echo =====================================================================
echo    UNG DUNG DANG CHAY! TRINH DUYET SE TU DONG MO TRONG GIAY LAT...
echo    Dia chi web: http://localhost:3000/chart
echo.
echo    [Luu y]: Giu nguyen cua so den nay trong suot qua trinh su dung.
echo             De tat web, ban chi can dong cua so nay lai.
echo =====================================================================
echo.

call npm.cmd run dev

echo.
echo =====================================================================
echo    [THONG BAO] May chu da dung lai.
echo =====================================================================
echo.
pause