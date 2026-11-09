Set-Location $PSScriptRoot
Write-Host "=====================================================================" -ForegroundColor Yellow
Write-Host "   🔮 TU VI DAU SO (PHAI THIEN KY) - HE THONG AN SAO VA LAP LA SO" -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Yellow
Write-Host ""

# 1. Kiem tra Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[LOI] Khong tim thay Node.js tren may tinh cua ban!" -ForegroundColor Red
    Write-Host "Vui long cai dat Node.js tu: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Nhan phim Enter de thoat..."
    exit 1
}

# 2. Kiem tra thu vien node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "[*] Dang tu dong cai dat thu vien... Vui long cho trong giay lat..." -ForegroundColor Yellow
    npm.cmd install
}

# 3. Tu dong mo trinh duyet
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 3
    Start-Process "http://localhost:3000/chart"
} | Out-Null

Write-Host "=====================================================================" -ForegroundColor Yellow
Write-Host "   UNG DUNG DANG CHAY! TRINH DUYET SE TU DONG MO TRONG GIAY LAT..." -ForegroundColor Green
Write-Host "   Dia chi web: http://localhost:3000/chart" -ForegroundColor Cyan
Write-Host "   (Giu nguyen cua so nay de su dung, dong cua so de tat web)" -ForegroundColor Gray
Write-Host "=====================================================================" -ForegroundColor Yellow
Write-Host ""

npm.cmd run dev
Read-Host "May chu da dung lai. Nhan Enter de thoat..."
