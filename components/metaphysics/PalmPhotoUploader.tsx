'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HandSide, PalmistryResult } from '@/lib/metaphysics/palmistry';
import PalmLinesOverlay from '@/components/metaphysics/PalmLinesOverlay';

interface UserProfileData {
  name?: string;
  gender?: string;
  year?: number;
  month?: number;
  day?: number;
  clockHour?: number;
  clockMinute?: number;
  province?: string;
  city?: string;
}

interface PalmPhotoUploaderProps {
  userProfile: UserProfileData | null;
  onSaveUserProfile: (profile: { name: string; gender: 'male' | 'female'; year: number; month?: number; day?: number }) => void;
  side: HandSide;
  onChangeSide: (side: HandSide) => void;
  onAnalyzeImage: (imageData: string) => void;
  isAnalyzing: boolean;
  currentResult: PalmistryResult | null;
  onSwitchToManual: () => void;
}

// 3 ảnh mẫu bàn tay chất lượng cao (dạng SVG Data URI siêu nhẹ) để trải nghiệm nhanh 1-click
const SAMPLE_PALM_IMAGES = [
  {
    id: 'sample_right',
    label: 'Ảnh mẫu Tay Phải (Rõ Nét)',
    side: 'right' as HandSide,
    svgColor: '#e0a96d',
    dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="360" height="480" viewBox="0 0 360 480"><rect width="360" height="480" fill="%2312131a"/><path d="M120 440 C90 420 70 360 75 300 C65 270 50 220 60 170 C68 130 95 140 110 180 C112 150 115 90 135 60 C150 40 170 50 170 100 C175 70 185 20 205 10 C225 5 235 40 230 95 C240 65 255 45 275 40 C290 40 295 70 285 125 C300 105 320 100 335 110 C345 125 340 160 325 220 C335 280 330 360 310 410 C290 440 250 460 200 460 Z" fill="%23241b14" stroke="%23f59e0b" stroke-width="2"/><path d="M110 200 Q150 290 145 390" stroke="%2310b981" stroke-width="3" fill="none"/><path d="M110 200 Q200 240 270 270" stroke="%2306b6d4" stroke-width="3" fill="none"/><path d="M130 240 Q180 230 285 210" stroke="%23f43f5e" stroke-width="3" fill="none"/><path d="M200 420 L200 230" stroke="%23a855f7" stroke-width="3" fill="none"/></svg>',
  },
  {
    id: 'sample_left',
    label: 'Ảnh mẫu Tay Trái (Chữ M)',
    side: 'left' as HandSide,
    svgColor: '#d4a373',
    dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="360" height="480" viewBox="0 0 360 480"><rect width="360" height="480" fill="%2312131a"/><g transform="translate(360,0) scale(-1,1)"><path d="M120 440 C90 420 70 360 75 300 C65 270 50 220 60 170 C68 130 95 140 110 180 C112 150 115 90 135 60 C150 40 170 50 170 100 C175 70 185 20 205 10 C225 5 235 40 230 95 C240 65 255 45 275 40 C290 40 295 70 285 125 C300 105 320 100 335 110 C345 125 340 160 325 220 C335 280 330 360 310 410 C290 440 250 460 200 460 Z" fill="%23241b14" stroke="%23f59e0b" stroke-width="2"/><path d="M110 200 Q150 290 145 390" stroke="%2310b981" stroke-width="3" fill="none"/><path d="M110 200 Q200 240 270 270" stroke="%2306b6d4" stroke-width="3" fill="none"/><path d="M130 240 Q180 230 285 210" stroke="%23f43f5e" stroke-width="3" fill="none"/><path d="M200 420 L200 230" stroke="%23a855f7" stroke-width="3" fill="none"/></g></svg>',
  },
];

export default function PalmPhotoUploader({
  userProfile,
  onSaveUserProfile,
  side,
  onChangeSide,
  onAnalyzeImage,
  isAnalyzing,
  currentResult,
  onSwitchToManual,
}: PalmPhotoUploaderProps) {
  // Quản lý ảnh tải lên
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quản lý form nhập thông tin đương số (khi chưa có)
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [inputName, setInputName] = useState(userProfile?.name || '');
  const [inputGender, setInputGender] = useState<'male' | 'female'>(
    userProfile?.gender === 'female' ? 'female' : 'male'
  );
  const [inputYear, setInputYear] = useState<number>(userProfile?.year || 1995);

  // Hiệu ứng các bước quét AI
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const scanSteps = [
    'Đang tải hình ảnh và cân chỉnh góc chụp bàn tay...',
    'Đang định vị gò Kim Tinh & 4 đốt ngón tay...',
    'Đang trích xuất đường Sinh Đạo (Thể chất & Thọ mạng)...',
    'Đang phân tích đường Trí Đạo (Tư duy & Học vấn)...',
    'Đang đo đạc đường Tâm Đạo & Định Mệnh...',
    'Đang truy tìm dấu ấn quý tướng (Chữ M, Tam Giác Vàng, Mắt Phật)...',
    'Đang tổng hợp luận giải nhân tướng học Đông Tây...',
  ];

  useEffect(() => {
    if (userProfile) {
      if (userProfile.name) setInputName(userProfile.name);
      if (userProfile.gender) setInputGender(userProfile.gender === 'female' ? 'female' : 'male');
      if (userProfile.year) setInputYear(userProfile.year);
    }
  }, [userProfile]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnalyzing) {
      setScanStepIndex(0);
      timer = setInterval(() => {
        setScanStepIndex((prev) => (prev + 1) % scanSteps.length);
      }, 350);
    }
    return () => clearInterval(timer);
  }, [isAnalyzing]);

  // Kiểm tra xem đã có thông tin cá nhân hợp lệ chưa
  const hasProfile = Boolean(userProfile && (userProfile.year || userProfile.name));

  // Lưu thông tin cá nhân
  const handleSaveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = inputName.trim() || (inputGender === 'female' ? 'Nữ Đương Số' : 'Nam Đương Số');
    const finalYear = Number(inputYear) || 1995;
    onSaveUserProfile({
      name: finalName,
      gender: inputGender,
      year: finalYear,
    });
    setIsEditingProfile(false);
  };

  // Xử lý khi chọn file ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processSelectedFile(file);
  };

  const processSelectedFile = (file: File) => {
    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setSelectedImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  // Kéo thả file
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processSelectedFile(file);
    }
  };

  // Kích hoạt phân tích ảnh
  const handleTriggerAnalysis = () => {
    if (!hasProfile && !inputYear) {
      setIsEditingProfile(true);
      return;
    }
    if (!hasProfile) {
      handleSaveProfile();
    }
    // Nếu chưa có ảnh, dùng mẫu mặc định để người dùng xem luôn
    const imageToAnalyze = selectedImage || (side === 'left' ? SAMPLE_PALM_IMAGES[1].dataUrl : SAMPLE_PALM_IMAGES[0].dataUrl);
    if (!selectedImage) {
      setSelectedImage(imageToAnalyze);
      setImageFileName('Ảnh mẫu bàn tay tiêu chuẩn');
    }
    onAnalyzeImage(imageToAnalyze);
  };

  const currentGender = userProfile?.gender === 'female' ? 'female' : inputGender;
  const isFemale = currentGender === 'female';

  return (
    <div className="space-y-6">
      {/* ─── KHỐI 1: THÔNG TIN ĐƯƠNG SỐ (TỰ LẤY TỪ ĐẦU HOẶC NHẬP NHANH) ─── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-amber-500/30 backdrop-blur-md shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300">
            <span>👤</span> THÔNG TIN ĐƯƠNG SỐ (BẢN MỆNH & GIỚI TÍNH)
          </div>
          {hasProfile && !isEditingProfile && (
            <button
              type="button"
              onClick={() => setIsEditingProfile(true)}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer transition-all hover:underline"
            >
              <span>✏️</span> Thay đổi thông tin
            </button>
          )}
        </div>

        {/* Trạng thái 1: Đã có thông tin sẵn từ lá số/lần nhập trước */}
        {hasProfile && !isEditingProfile ? (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-950/70 p-3.5 rounded-xl border border-zinc-800">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <span className="font-bold text-amber-200">
                {userProfile?.name || 'Đương Số'}
              </span>
              <span className="text-zinc-600">•</span>
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                isFemale ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              }`}>
                {isFemale ? 'Nữ Mạng ♀' : 'Nam Mạng ♂'}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">
                Sinh năm: <strong className="text-amber-400">{userProfile?.year || '1995'}</strong>
              </span>
              {userProfile?.city && (
                <>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400">{userProfile.city}</span>
                </>
              )}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              <span>✓</span> Tự động đồng bộ từ hồ sơ
            </div>
          </div>
        ) : (
          /* Trạng thái 2: Chưa có thông tin -> Form nhập nhanh gọn gàng */
          <form onSubmit={handleSaveProfile} className="space-y-3.5">
            <p className="text-xs text-zinc-400 italic">
              Vui lòng cung cấp giới tính và năm sinh để áp dụng chính xác thuật cổ <strong>"Nam Tả Nữ Hữu"</strong> và phân tích cung mạng.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Họ tên */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Họ và tên:</label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-amber-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Giới tính */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Giới tính:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setInputGender('male')}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      inputGender === 'male'
                        ? 'bg-cyan-500 text-zinc-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                        : 'bg-zinc-950 border-zinc-700 text-zinc-400 hover:border-zinc-500'
                    }`}
                  >
                    Nam ♂
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputGender('female')}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      inputGender === 'female'
                        ? 'bg-rose-500 text-zinc-950 border-rose-400 shadow-md shadow-rose-500/20'
                        : 'bg-zinc-950 border-zinc-700 text-zinc-400 hover:border-zinc-500'
                    }`}
                  >
                    Nữ ♀
                  </button>
                </div>
              </div>

              {/* Năm sinh */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Năm sinh (Dương lịch):</label>
                <input
                  type="number"
                  min="1920"
                  max="2030"
                  value={inputYear}
                  onChange={(e) => setInputYear(Number(e.target.value))}
                  placeholder="1995"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-amber-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              {hasProfile && (
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs font-semibold"
                >
                  Hủy
                </button>
              )}
              <button
                type="button"
                onClick={() => handleSaveProfile()}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                Xác Nhận Thông Tin
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ─── KHỐI 2: CHỌN TAY XEM (CHỈ CẦN CHỌN TAY TRÁI HOẶC TAY PHẢI) ─── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-amber-500/30 backdrop-blur-md shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2.5">
          <label className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1.5">
            <span>✋</span> CHỌN BÀN TAY BẠN MUỐN XEM:
          </label>
          <span className="text-[11px] text-zinc-400">
            Khuyên dùng theo cổ pháp: <strong className="text-amber-400">{isFemale ? 'Nữ xem Tay Phải trước' : 'Nam xem Tay Trái trước'}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Nút Tay Trái */}
          <button
            type="button"
            onClick={() => onChangeSide('left')}
            className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
              side === 'left'
                ? 'bg-gradient-to-br from-amber-500/20 to-amber-950/40 border-amber-400 shadow-lg shadow-amber-500/25 ring-1 ring-amber-400'
                : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-base sm:text-lg font-black text-amber-200 flex items-center gap-2">
                <span>✋</span> TAY TRÁI
              </span>
              {side === 'left' && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center text-xs font-black">
                  ✓
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-300">
              {isFemale
                ? 'Hậu Thiên Vận Trình (Sự nghiệp thực tế, nỗ lực tự thân và thành tựu sau 30 tuổi)'
                : 'Tiên Thiên Bản Mệnh (Căn cơ bẩm sinh trời ban, tính cách gốc rễ và phúc ấm tổ tiên)'}
            </p>
          </button>

          {/* Nút Tay Phải */}
          <button
            type="button"
            onClick={() => onChangeSide('right')}
            className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
              side === 'right'
                ? 'bg-gradient-to-br from-amber-500/20 to-amber-950/40 border-amber-400 shadow-lg shadow-amber-500/25 ring-1 ring-amber-400'
                : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-base sm:text-lg font-black text-amber-200 flex items-center gap-2">
                <span>🤚</span> TAY PHẢI
              </span>
              {side === 'right' && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center text-xs font-black">
                  ✓
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-300">
              {isFemale
                ? 'Tiên Thiên Bản Mệnh (Cốt cách căn nguyên, trực giác và vận số bẩm sinh)'
                : 'Hậu Thiên Vận Trình (Công danh xã hội, tài vận tích lũy và nỗ lực đời người)'}
            </p>
          </button>
        </div>
      </div>

      {/* ─── KHỐI 3: UPLOAD HÌNH ẢNH BÀN TAY (HOẶC CHỤP TRỰC TIẾP TỪ ĐIỆN THOẠI) ─── */}
      <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/90 border border-amber-500/30 backdrop-blur-md shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <div className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-2">
              <span>📸</span> TẢI LÊN HOẶC CHỤP ẢNH BÀN TAY
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Chụp thẳng lòng bàn tay rõ nét dưới ánh sáng tự nhiên. Hệ thống AI sẽ tự động dò tìm các đường chỉ tay.
            </p>
          </div>
          <button
            type="button"
            onClick={onSwitchToManual}
            className="text-xs text-zinc-400 hover:text-amber-300 font-medium transition-all cursor-pointer underline flex items-center gap-1"
          >
            <span>⚙️</span> Tuỳ chọn thủ công các đường chỉ tay
          </button>
        </div>

        {/* Khung Upload / Preview */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        {!selectedImage ? (
          /* Trạng thái chưa có ảnh: Vùng kéo thả hoặc bấm để chọn */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
              isDragOver
                ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                : 'border-zinc-700 hover:border-amber-500/60 bg-zinc-950/60 hover:bg-zinc-950/90'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/10">
              🖐️
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-amber-200">
                Nhấn để chụp ảnh hoặc chọn ảnh từ thiết bị
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Hỗ trợ định dạng JPG, PNG, WEBP. Trên điện thoại hỗ trợ mở trực tiếp camera.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <span>📷</span> Chọn Tệp / Chụp Ảnh Bàn Tay
            </div>
          </div>
        ) : (
          /* Trạng thái đã chọn ảnh: HIỂN THỊ NÉT VẼ CHỈ TAY PHÁT SÁNG TRỰC TIẾP TRÊN ẢNH ĐÃ ĐĂNG */
          <div className="space-y-3">
            <PalmLinesOverlay
              imageUrl={selectedImage}
              side={side}
              result={currentResult}
              isAnalyzing={isAnalyzing}
              allowCalibration={true}
              showLabels={true}
            />

            {/* Thông tin file & nút thao tác */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs">
              <span className="text-zinc-300 truncate max-w-[240px] flex items-center gap-1.5 font-medium">
                <span>📸</span> {imageFileName || 'Ảnh bàn tay đã tải lên'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold cursor-pointer transition-all flex items-center gap-1"
                >
                  <span>📷</span> Đổi ảnh khác
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(null);
                    setImageFileName('');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800/40 text-rose-300 text-xs font-semibold cursor-pointer transition-all"
                >
                  ✕ Gỡ ảnh
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Khối ảnh mẫu thử nghiệm nhanh 1-click */}
        <div className="pt-1">
          <div className="text-[11px] text-zinc-400 mb-2 flex items-center gap-1">
            <span>💡</span> Hoặc dùng nhanh ảnh mẫu bàn tay tiêu chuẩn để kiểm nghiệm:
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {SAMPLE_PALM_IMAGES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => {
                  setSelectedImage(sample.dataUrl);
                  setImageFileName(sample.label);
                  onChangeSide(sample.side);
                }}
                className="p-2 sm:p-2.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-800/60 border border-zinc-800 hover:border-amber-500/40 text-left transition-all cursor-pointer flex items-center gap-2"
              >
                <span className="text-lg">🖐️</span>
                <span className="text-xs font-semibold text-zinc-300 truncate">{sample.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── NÚT KÍCH HOẠT LUẬN GIẢI CHỈ TAY ─── */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleTriggerAnalysis}
            disabled={isAnalyzing}
            className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 active:scale-[0.99] text-zinc-950 font-black text-sm sm:text-base tracking-widest shadow-2xl shadow-amber-500/30 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{isAnalyzing ? '⏳' : '🔮'}</span>
              <span>{isAnalyzing ? 'HỆ THỐNG AI ĐANG QUÉT CHỈ TAY...' : 'LUẬN GIẢI CHỈ TAY BẰNG AI →'}</span>
            </div>
            {isAnalyzing && (
              <span className="text-xs font-semibold text-zinc-900 animate-pulse">
                {scanSteps[scanStepIndex]}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

