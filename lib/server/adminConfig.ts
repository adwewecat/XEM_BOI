import fs from 'fs';
import path from 'path';

/**
 * QUẢN LÝ CẤU HÌNH HỆ THỐNG DÙNG CHUNG DÀNH CHO QUẢN TRỊ VIÊN (ADMIN)
 * - Cấu hình 1 lần, lưu trữ an toàn trên máy chủ và dùng chung cho toàn bộ người dùng.
 * - Chỉ Quản trị viên (Admin) có mật khẩu mới có quyền truy cập và thay đổi.
 * - Ưu tiên đọc cấu hình từ file data/admin_config.json, sau đó fallback sang biến môi trường GEMINI_API_KEY.
 */

export interface AdminConfig {
  geminiApiKey: string;
  geminiModel: string;
  adminPassword?: string;
  updatedAt?: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const CONFIG_PATH = path.join(DATA_DIR, 'admin_config.json');

// Mật khẩu quản trị viên mặc định ban đầu nếu chưa đổi
export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin@2026';

export function getAdminConfig(): AdminConfig {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const content = fs.readFileSync(CONFIG_PATH, 'utf-8');
      const parsed = JSON.parse(content);
      return {
        geminiApiKey: parsed.geminiApiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '',
        geminiModel: parsed.geminiModel || 'gemini-1.5-flash',
        adminPassword: parsed.adminPassword || DEFAULT_ADMIN_PASSWORD,
        updatedAt: parsed.updatedAt || '',
      };
    }
  } catch (err) {
    console.error('Lỗi khi đọc file admin_config.json:', err);
  }

  return {
    geminiApiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '',
    geminiModel: 'gemini-1.5-flash',
    adminPassword: DEFAULT_ADMIN_PASSWORD,
  };
}

export function saveAdminConfig(config: Partial<AdminConfig>): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const current = getAdminConfig();
    const updated: AdminConfig = {
      ...current,
      ...config,
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(updated, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Lỗi khi lưu file admin_config.json:', err);
    return false;
  }
}

export function verifyAdminPassword(inputPass: string): boolean {
  if (!inputPass || typeof inputPass !== 'string') return false;
  const current = getAdminConfig();
  const validPass = current.adminPassword || DEFAULT_ADMIN_PASSWORD;
  return inputPass.trim() === validPass.trim();
}

