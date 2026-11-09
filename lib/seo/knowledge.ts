/**
 * SEO 知识页 — 数据 helper
 *
 * 14 主星 × 13 topic = 182 个独立 SEO URL
 * 每页都是 STAR_DB 中对应字段的 4 段 markers（一句话定调/核心论断/命盘依据/经典出处）
 */

import { STAR_DB } from '@/lib/ziwei/db-analysis';
import type { TopicKey } from '@/lib/ziwei/db-analysis';
import { TOPIC_PALACE_NAME, TOPIC_LABEL } from '@/lib/ziwei/db-analysis';

export const ALL_STARS = [
  '紫微', '天机', '太阳', '武曲', '天同', '廉贞', '天府',
  '太阴', '贪狼', '巨门', '天相', '天梁', '七杀', '破军',
];

// 主星名 ↔ 拼音 slug 映射（URL 用 slug，避免中文 URL 在 Vercel/CDN 上的边界问题）
export const STAR_TO_SLUG: Record<string, string> = {
  '紫微': 'ziwei',
  '天机': 'tianji',
  '太阳': 'taiyang',
  '武曲': 'wuqu',
  '天同': 'tiantong',
  '廉贞': 'lianzhen',
  '天府': 'tianfu',
  '太阴': 'taiyin',
  '贪狼': 'tanlang',
  '巨门': 'jumen',
  '天相': 'tianxiang',
  '天梁': 'tianliang',
  '七杀': 'qisha',
  '破军': 'pojun',
};

export const SLUG_TO_STAR: Record<string, string> = Object.fromEntries(
  Object.entries(STAR_TO_SLUG).map(([k, v]) => [v, k])
);

export const ALL_TOPICS: TopicKey[] = [
  'overview', 'personality', 'love', 'career', 'wealth', 'health',
  'family', 'children', 'move', 'friends', 'home', 'spirit', 'parents',
];

interface StarContent {
  mingGong: string;
  personality: string;
  xiongDi?: string;
  fuQi: string;
  ziNv?: string;
  caiBo: string;
  jiE: string;
  qianYi?: string;
  jiaoYou?: string;
  guanLu: string;
  tianZhai?: string;
  fuDe?: string;
  fuMu?: string;
}

const TOPIC_TO_FIELD: Record<TopicKey, keyof StarContent> = {
  overview:    'mingGong',
  personality: 'personality',
  love:        'fuQi',
  career:      'guanLu',
  wealth:      'caiBo',
  health:      'jiE',
  family:      'xiongDi' as keyof StarContent,
  children:    'ziNv' as keyof StarContent,
  move:        'qianYi' as keyof StarContent,
  friends:     'jiaoYou' as keyof StarContent,
  home:        'tianZhai' as keyof StarContent,
  spirit:      'fuDe' as keyof StarContent,
  parents:     'fuMu' as keyof StarContent,
};

interface ParsedContent {
  dingdiao: string;
  lundian: string;
  yiju: string;
  chuchu: string;
  raw: string;
  hasMarkers: boolean;
}

function parseStarContent(content: string): ParsedContent {
  const out: ParsedContent = { dingdiao: '', lundian: '', yiju: '', chuchu: '', raw: content, hasMarkers: false };
  if (!content) return out;
  if (!content.includes('**【一句话定调】**') && !content.includes('**【核心论断】**')) {
    out.lundian = content;
    return out;
  }
  out.hasMarkers = true;
  const re = /\*\*【([^】]+)】\*\*/g;
  const parts: { name: string; markerEnd: number; start: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    parts.push({ name: m[1], start: m.index, markerEnd: m.index + m[0].length });
  }
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    const end = i + 1 < parts.length ? parts[i + 1].start : content.length;
    const text = content.slice(p.markerEnd, end).trim();
    if (p.name === '一句话定调') out.dingdiao = text;
    else if (p.name === '核心论断') out.lundian = text;
    else if (p.name === '命盘依据') out.yiju = text;
    else if (p.name === '经典出处') out.chuchu = text;
  }
  return out;
}

export interface KnowledgeData {
  star: string;
  topic: TopicKey;
  topicLabel: string;
  palaceName: string;
  parsed: ParsedContent;
  exists: boolean;
}

export function getKnowledge(star: string, topic: TopicKey): KnowledgeData {
  const profile = (STAR_DB[star] as unknown) as StarContent | undefined;
  const field = TOPIC_TO_FIELD[topic];
  const content = profile && field ? (profile[field] as string | undefined) ?? '' : '';
  return {
    star,
    topic,
    topicLabel: TOPIC_LABEL[topic],
    palaceName: TOPIC_PALACE_NAME[topic],
    parsed: parseStarContent(content),
    exists: Boolean(content),
  };
}

/** 生成所有 14×13 组合（用于 generateStaticParams） */
export function getAllKnowledgeRoutes() {
  const routes: { star: string; slug: string; topic: TopicKey }[] = [];
  for (const star of ALL_STARS) {
    for (const topic of ALL_TOPICS) {
      const data = getKnowledge(star, topic);
      if (data.exists) routes.push({ star, slug: STAR_TO_SLUG[star], topic });
    }
  }
  return routes;
}

/** Chủ tinh thuộc tính tóm tắt tiếng Việt (hiển thị tại trang Vạn Tinh Các và SEO) */
export const STAR_BRIEF_SEO: Record<string, string> = {
  '紫微': 'Tử Vi là Đế Tinh, chủ tôn quý, hóa khí vi Tôn. Tọa Mệnh chủ về phong thái lãnh đạo uy nghi, thích hợp giữ vị trí quản lý cao trong tổ chức lớn.',
  '天机': 'Thiên Cơ là Trí Tuệ Tinh, chủ linh hoạt mưu trí, hóa khí vi Thiện. Tọa Mệnh chủ về thông minh cơ biến, mưu lược tham mưu đại tài.',
  '太阳': 'Thái Dương là Nhật Tinh, chủ công danh danh dự, hóa khí vi Quý. Tọa Mệnh chủ về quang minh lỗi lạc, khẳng khái trượng nghĩa, hợp công chức.',
  '武曲': 'Vũ Khúc là Tài Tinh, chủ cương nghị quả quyết, hóa khí vi Tài. Tọa Mệnh chủ về năng lực quản lý tài chính xuất sắc, hợp thực nghiệp ngân hàng.',
  '天同': 'Thiên Đồng là Phúc Tinh, chủ ôn hòa an lạc, hóa khí vi Phúc. Tọa Mệnh chủ về tính tình nhân hậu, biến nguy thành an, cuộc đời nhiều phúc báo.',
  '廉贞': 'Liêm Trinh là Thứ Đào Hoa, văn võ kiêm toàn, hóa khí vi Tù. Tọa Mệnh chủ về đa tài đa nghệ, lòng tự tôn cao, tình cảm nồng nhiệt sâu sắc.',
  '天府': 'Thiên Phủ là Nam Đế Tinh thủ tài khố, chủ ổn định bảo trọng, hóa khí vi Lệnh. Tọa Mệnh chủ về tính tình khoan dung, giữ tài khố vững như bàn thạch.',
  '太阴': 'Thái Âm là Nguyệt Tinh phú quý, chủ điền trạch và tình cảm, hóa khí vi Phú. Tọa Mệnh chủ về ôn nhu tinh tế, giỏi tích lũy của cải, nữ mệnh đại cát.',
  '贪狼': 'Tham Lang là Đào Hoa và Dục Vọng Tinh, chủ phong lưu nghệ thuật, hóa khí vi Đào Hoa. Tọa Mệnh chủ về đa tài đa nghệ, giỏi giao tế xã hội rộng rãi.',
  '巨门': 'Cự Môn là Khẩu Tài Tinh, chủ biện luận truyền thông, hóa khí vi Ám. Tọa Mệnh chủ về tài ăn nói hùng biện, tư duy phản biện sắc bén, hợp luật sư giáo dục.',
  '天相': 'Thiên Tướng là Ấn Tinh phụ tá, chủ trung hậu thành tín, hóa khí vi Ấn. Tọa Mệnh chủ về hành sự cẩn trọng, công minh chính trực, hợp hành chính quản lý.',
  '天梁': 'Thiên Lương là Lão Nhân Tinh che chở, chủ tiêu tai giải ách, hóa khí vi Ấm. Tọa Mệnh chủ về từ bi nhân hậu, tâm hồn thanh cao, hợp y dược tư pháp.',
  '七杀': 'Thất Sát là Tướng Tinh dũng mãnh, chủ độc lập quyết đoán, hóa khí vi Túc Sát. Tọa Mệnh chủ về cương nghị dũng cảm, tự lực cánh sinh khai sáng cơ đồ.',
  '破军': 'Phá Quân là Dũng Tướng tiên phong cải cách, chủ phá cũ lập mới, hóa khí vi Hao. Tọa Mệnh chủ về dám nghĩ dám làm, khai mở cục diện mới trong gian khó.',
};
