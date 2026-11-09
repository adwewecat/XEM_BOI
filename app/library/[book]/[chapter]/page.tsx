/**
 * /library/[book]/[chapter] — Trang Đọc Chi Tiết Từng Chương Cổ Tịch
 * Hiển thị song ngữ: Tiếng Việt to rõ, nổi bật hàng đầu; Nguyên văn chữ Hán & Lời bình thầy Nghê Hải Hà chi tiết.
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_BOOKS, getChapter } from '@/lib/classics';

export async function generateStaticParams() {
  return ALL_BOOKS.flatMap(b =>
    b.chapters.map((_, i) => ({ book: b.slug, chapter: String(i) }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ book: string; chapter: string }> }) {
  const { book: bookSlug, chapter: chIdx } = await params;
  const result = getChapter(bookSlug, parseInt(chIdx));
  if (!result) return {};
  return {
    title: `${result.chapter.title} · 《${result.book.title}》· Cổ Tịch Kinh Điển Tử Vi`,
    description: result.chapter.subtitle || `《${result.book.title}》${result.chapter.title} trích dẫn nguyên bản và dịch nghĩa tiếng Việt`,
  };
}

export default async function ChapterPage({ params }: { params: Promise<{ book: string; chapter: string }> }) {
  const { book: bookSlug, chapter: chIdx } = await params;
  const result = getChapter(bookSlug, parseInt(chIdx));
  if (!result) notFound();

  const { book, chapter, chapterIdx } = result;
  const prevIdx = chapterIdx - 1;
  const nextIdx = chapterIdx + 1;

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      {/* Thanh điều hướng trên cùng */}
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(184,146,42,0.15)', background: 'var(--bg-page)' }}>
        <Link href={`/library/${book.slug}`} style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: 600 }}>
          ← Mục Lục 《{book.title}》
        </Link>
        <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.15em', fontWeight: 700 }}>
          {chapter.title}
        </div>
        <Link href="/library" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: 600 }}>
          Tàng Kinh Các →
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Tiêu đề chương */}
        <div className="text-center mb-10">
          <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.2em', marginBottom: '8px', fontWeight: 600 }}>
            《{book.title}》· {book.dynasty}
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: 'var(--tx-0)', letterSpacing: '0.05em', marginBottom: '10px' }}>
            {chapter.title}
          </h1>
          {chapter.subtitle && (
            <div style={{ fontSize: '14px', color: 'var(--ac)', letterSpacing: '0.08em', fontWeight: 600 }}>
              {chapter.subtitle}
            </div>
          )}
        </div>

        {/* Nội dung từng đoạn */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid rgba(184,146,42,0.25)', padding: '32px 28px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          {chapter.paragraphs.map((p, i) => (
            <div
              key={p.id}
              id={p.id}
              style={{
                marginBottom: i === chapter.paragraphs.length - 1 ? 0 : '28px',
                paddingBottom: i === chapter.paragraphs.length - 1 ? 0 : '28px',
                borderBottom: i === chapter.paragraphs.length - 1 ? 'none' : '1px dashed rgba(184,146,42,0.2)',
                scrollMarginTop: '80px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                <span style={{
                  fontSize: '13px',
                  color: 'var(--ac)',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  minWidth: '28px',
                }}>
                  {String(p.idx).padStart(2, '0')}.
                </span>
                
                <div style={{ flex: 1 }}>
                  {/* Bản dịch nghĩa tiếng Việt: To rõ, nổi bật hàng đầu */}
                  {p.translation ? (
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: 'var(--tx-0)',
                      lineHeight: 1.85,
                      letterSpacing: '0.02em',
                      marginBottom: '12px',
                    }}>
                      {p.translation}
                    </div>
                  ) : (
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: 'var(--tx-0)',
                      lineHeight: 1.85,
                      letterSpacing: '0.02em',
                      marginBottom: '12px',
                    }}>
                      {p.text}
                    </div>
                  )}

                  {/* Nguyên văn cổ thư chữ Hán: Nhỏ hơn bên dưới làm đối chiếu */}
                  <div style={{
                    padding: '8px 12px',
                    background: 'rgba(255,255,255,0.02)',
                    borderLeft: '2px solid rgba(184,146,42,0.4)',
                    borderRadius: '4px',
                    fontSize: '13px',
                    color: 'var(--tx-3)',
                    lineHeight: 1.8,
                    fontFamily: '"PingFang SC", "Hiragino Sans GB", serif',
                    marginBottom: p.niNote ? '10px' : 0,
                  }}>
                    <span style={{ fontSize: '10px', color: 'var(--ac)', marginRight: '8px', fontWeight: 700, letterSpacing: '0.05em' }}>
                      【NGUYÊN VĂN CỔ TỊCH】
                    </span>
                    {p.text}
                  </div>

                  {/* Lời giảng chuyên sâu của Thầy Nghê Hải Hà */}
                  {p.niNote && (
                    <div style={{
                      padding: '10px 14px',
                      background: 'rgba(184,146,42,0.07)',
                      border: '1px solid rgba(184,146,42,0.2)',
                      borderRadius: '8px',
                      fontSize: '13.5px',
                      color: 'var(--tx-1)',
                      lineHeight: 1.8,
                    }}>
                      <span style={{ fontSize: '10.5px', color: '#f59e0b', marginRight: '6px', fontWeight: 800, letterSpacing: '0.05em' }}>
                        ★ LỜI GIẢNG DANH SƯ NGHÊ HẢI HÀ:
                      </span>
                      {p.niNote}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Thanh chuyển chương Trước / Sau */}
        <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between', gap: '14px' }}>
          {prevIdx >= 0 ? (
            <Link
              href={`/library/${book.slug}/${prevIdx}`}
              style={{
                flex: 1,
                padding: '14px 18px',
                background: 'var(--bg-card)',
                border: '1px solid rgba(184,146,42,0.25)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'var(--tx-0)',
                transition: 'all 0.2s',
              }}
              className="hover:border-amber-400"
            >
              <div style={{ fontSize: '10px', color: 'var(--tx-3)', letterSpacing: '0.1em', marginBottom: '3px', fontWeight: 600 }}>← CHƯƠNG TRƯỚC</div>
              <div style={{ fontSize: '13.5px', fontWeight: 700 }}>{book.chapters[prevIdx].title}</div>
            </Link>
          ) : <div style={{ flex: 1 }} />}
          {nextIdx < book.chapters.length ? (
            <Link
              href={`/library/${book.slug}/${nextIdx}`}
              style={{
                flex: 1,
                padding: '14px 18px',
                background: 'var(--bg-card)',
                border: '1px solid rgba(184,146,42,0.25)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'var(--tx-0)',
                textAlign: 'right',
                transition: 'all 0.2s',
              }}
              className="hover:border-amber-400"
            >
              <div style={{ fontSize: '10px', color: 'var(--tx-3)', letterSpacing: '0.1em', marginBottom: '3px', fontWeight: 600 }}>CHƯƠNG TIẾP THEO →</div>
              <div style={{ fontSize: '13.5px', fontWeight: 700 }}>{book.chapters[nextIdx].title}</div>
            </Link>
          ) : <div style={{ flex: 1 }} />}
        </div>
      </article>
    </div>
  );
}
