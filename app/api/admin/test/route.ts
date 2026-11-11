import { NextRequest, NextResponse } from 'next/server';
import { getAdminConfig, verifyAdminPassword } from '@/lib/server/adminConfig';

/**
 * API QUẢN TRỊ VIÊN: KIỂM TRA KẾT NỐI GEMINI API THỰC TẾ
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, apiKeyToTest, modelToTest } = body;

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'UNAUTHORIZED', message: 'Mật khẩu quản trị viên không chính xác.' },
        { status: 401 }
      );
    }

    const config = getAdminConfig();
    const key = (typeof apiKeyToTest === 'string' && apiKeyToTest.trim().length > 0)
      ? apiKeyToTest.trim()
      : config.geminiApiKey?.trim();

    if (!key) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập API Key để kiểm tra kết nối.' },
        { status: 400 }
      );
    }

    const model = (typeof modelToTest === 'string' && modelToTest.trim().length > 0)
      ? modelToTest.trim()
      : (config.geminiModel || 'gemini-1.5-flash');

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: 'Trả lời đúng 1 từ "CHÀO_BẠN" để xác thực kết nối API thành công.' }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 20,
        },
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const errMsg = errData?.error?.message || `HTTP ${res.status} ${res.statusText}`;
      return NextResponse.json(
        { success: false, message: `Kết nối thất bại: ${errMsg}` },
        { status: 400 }
      );
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({
      success: true,
      message: `Kết nối thành công rực rỡ! Model [${model}] đã phản hồi: "${text?.trim() || 'OK'}". API Key hoàn toàn hợp lệ.`,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message: `Lỗi kết nối máy chủ Google: ${msg}` }, { status: 500 });
  }
}

