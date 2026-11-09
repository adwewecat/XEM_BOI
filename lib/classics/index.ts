/**
 * 古籍原典查询库 — 入口
 *
 * 加载所有古籍数据 + 提供查询/搜索 API
 * 数据为 JSON 静态打包，零 DB 依赖、零网络请求
 */

import type { Book, Paragraph, SearchHit } from './types';
import { guSuiFu } from './data/gusuifu';
import { ziWeiQuanJi } from './data/quanji';
import { ziWeiQuanShu } from './data/quanshu';

/** 所有已收录古籍 */
export const ALL_BOOKS: Book[] = [
  guSuiFu,
  ziWeiQuanJi,
  ziWeiQuanShu,
];

/** 总段落数（用于首页统计） */
export const TOTAL_PARAGRAPHS = ALL_BOOKS.reduce(
  (sum, b) => sum + b.chapters.reduce((s, c) => s + c.paragraphs.length, 0),
  0,
);

/** 按 slug 取书 */
export function getBookBySlug(slug: string): Book | null {
  return ALL_BOOKS.find(b => b.slug === slug) ?? null;
}

/** 按章节序号取章节 */
export function getChapter(bookSlug: string, chapterIdx: number) {
  const book = getBookBySlug(bookSlug);
  if (!book) return null;
  const chapter = book.chapters[chapterIdx];
  if (!chapter) return null;
  return { book, chapter, chapterIdx };
}

/** 按段落 id 取段落（含书与章节信息）*/
export function getParagraphById(id: string) {
  for (const book of ALL_BOOKS) {
    for (let i = 0; i < book.chapters.length; i++) {
      const ch = book.chapters[i];
      const p = ch.paragraphs.find(p => p.id === id);
      if (p) {
        return { book, chapter: ch, chapterIdx: i, paragraph: p };
      }
    }
  }
  return null;
}

/**
 * 全文搜索 (Hỗ trợ tìm kiếm song ngữ: Tiếng Việt hoặc chữ Hán)
 */
export function searchClassics(query: string, limit = 30): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];

  const hits: SearchHit[] = [];
  for (const book of ALL_BOOKS) {
    for (const chapter of book.chapters) {
      for (const p of chapter.paragraphs) {
        let idx = p.text.toLowerCase().indexOf(q);
        let targetStr = p.text;

        // Nếu không khớp chữ Hán, tìm tiếp trong bản dịch Tiếng Việt
        if (idx < 0 && p.translation) {
          idx = p.translation.toLowerCase().indexOf(q);
          targetStr = p.translation;
        }

        if (idx < 0) continue;

        // Trích xuất ngữ cảnh xung quanh từ khóa
        const start = Math.max(0, idx - 45);
        const end = Math.min(targetStr.length, idx + q.length + 45);
        const before = targetStr.slice(start, idx);
        const matched = targetStr.slice(idx, idx + q.length);
        const after = targetStr.slice(idx + q.length, end);

        const snippet = (start > 0 ? '…' : '')
          + escapeHtml(before)
          + `<mark>${escapeHtml(matched)}</mark>`
          + escapeHtml(after)
          + (end < targetStr.length ? '…' : '');

        hits.push({
          bookSlug: book.slug,
          bookTitle: book.title,
          chapterTitle: chapter.title,
          paragraphId: p.id,
          snippet,
          text: p.text,
        });

        if (hits.length >= limit) return hits;
      }
    }
  }
  return hits;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export type { Book, Chapter, Paragraph, SearchHit } from './types';
