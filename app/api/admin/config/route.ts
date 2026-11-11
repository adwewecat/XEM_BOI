import { NextRequest, NextResponse } from 'next/server';
import { getAdminConfig, saveAdminConfig, verifyAdminPassword } from '@/lib/server/adminConfig';

/**
 * API QUẢN TRỊ VIÊN: XEM VÀ CẬP NHẬT CẤU HÌNH GEMINI DÙNG CHUNG
 * Toàn bộ yêu cầu bắt buộc phải có mật khẩu Admin hợp lệ.
 */

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    const queryPass = req.nextUrl.searchParams.get('password') || '';
    const pass = token || queryPass;

    if (!verifyAdminPassword(pass)) {
      return NextResponse.json(
        { success: false, error: 'UNAUTHORIZED', message: 'Mật khẩu quản trị viên không chính xác.' },
        { status: 401 }
      );
    }

    const config = getAdminConfig();
    const hasKey = !!(config.geminiApiKey && config.geminiApiKey.trim().length > 0);
    const maskedKey = hasKey
      ? `${config.geminiApiKey.slice(0, 6)}••••••••${config.geminiApiKey.slice(-4)}`
      : '';

    return NextResponse.json({
      success: true,
      isConfigured: hasKey,
      maskedKey,
      geminiModel: config.geminiModel || 'gemini-1.5-flash',
      updatedAt: config.updatedAt || '',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: 'SERVER_ERROR', message: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, geminiApiKey, geminiModel, newPassword } = body;

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'UNAUTHORIZED', message: 'Mật khẩu quản trị viên hiện tại không chính xác.' },
        { status: 401 }
      );
    }

    const updates: Record<string, string> = {};

    if (typeof geminiApiKey === 'string' && geminiApiKey.trim().length > 0) {
      updates.geminiApiKey = geminiApiKey.trim();
    }

    if (typeof geminiModel === 'string' && geminiModel.trim().length > 0) {
      updates.geminiModel = geminiModel.trim();
    }

    if (typeof newPassword === 'string' && newPassword.trim().length >= 6) {
      updates.adminPassword = newPassword.trim();
    }

    const ok = saveAdminConfig(updates);
    if (!ok) {
      return NextResponse.json(
        { success: false, error: 'SAVE_FAILED', message: 'Không thể ghi tệp cấu hình trên máy chủ.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Đã lưu cấu hình Gemini AI thành công! Toàn bộ người dùng trên website sẽ được dùng chung cấu hình này.',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: 'SERVER_ERROR', message: msg }, { status: 500 });
  }
}
