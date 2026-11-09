/**
 * /library/[book] — Đọc Cổ Thư Kinh Điển theo từng bộ
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_BOOKS, getBookBySlug } from '@/lib/classics';

export async function generateStaticParams() {
  return ALL_BOOKS.map(b => ({ book: b.slug }));
}

const BOOK_TRANSLATIONS: Record<string, {
  titleVi: string;
  dynastyVi: string;
  authorVi: string;
  introVi: string;
}> = {
  gusuifu: {
    titleVi: 'Cốt Tủy Phú (骨髓赋)',
    dynastyVi: 'Thời Minh',
    authorVi: 'Di sản Cổ Tịch Tử Vi Đẩu Số',
    introVi: 'Khẩu quyết cốt lõi cô đọng bậc nhất của Tử Vi Đẩu Số, toàn văn ước chừng 1500 chữ. Danh sư Nghê Hải Hà trong giáo trình 《Thiên Kỷ》 đã nhiều lần trích dẫn phú này, là tác phẩm kinh điển gối đầu giường bắt buộc đối với người học mệnh lý.',
  },
  quanji: {
    titleVi: 'Tử Vi Đẩu Số Toàn Tập (紫微斗数全集)',
    dynastyVi: 'Thời Minh',
    authorVi: 'Tổ sư Trần Đoàn truyền thụ',
    introVi: 'Một trong những bộ cổ tịch uy quyền nhất của Tử Vi Đẩu Số, tương truyền do tổ sư Trần Đoàn thời Tống truyền lại. Là cội nguồn trích dẫn trọng tâm trong toàn bộ hệ thống giáo trình 《Thiên Kỷ》 của phái Thiên Kỷ.',
  },
  quanshu: {
    titleVi: 'Tử Vi Đẩu Số Toàn Thư (紫微斗数全书)',
    dynastyVi: 'Thời Minh',
    authorVi: 'La Hồng Tiên biên soạn',
    introVi: 'Bộ cổ tịch có hệ thống toàn diện nhất của Tử Vi Đẩu Số, do La Hồng Tiên thời Minh san định. Nhấn mạnh mối quan hệ tương hỗ giữa 12 cung và Tứ Hóa, là giáo trình căn bản truyền đời qua nhiều thế kỷ.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ book: string }> }) {
  const { book: slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};
  const tr = BOOK_TRANSLATIONS[slug] || {
    titleVi: book.title,
    dynastyVi: book.dynasty,
    authorVi: book.author,
    introVi: book.intro,
  };
  return {
    title: `《${tr.titleVi}》· ${tr.dynastyVi} · Tàng Kinh Các Cổ Tịch Tử Vi Đẩu Số`,
    description: tr.introVi,
  };
}

export default async function BookPage({ params }: { params: Promise<{ book: string }> }) {
  const { book: slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const tr = BOOK_TRANSLATIONS[slug] || {
    titleVi: book.title,
    dynastyVi: book.dynasty,
    authorVi: book.author,
    introVi: book.intro,
  };

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(184,146,42,0.15)', background: 'var(--bg-page)' }}>
        <Link href="/library" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: 600 }}>
          ← Tàng Kinh Các
        </Link>
        <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.15em', fontWeight: 700 }}>
          《{tr.titleVi}》
        </div>
        <Link href="/" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: 600 }}>
          Trang Chủ →
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* 书名信息 */}
        <div className="text-center mb-12">
          <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.15em', marginBottom: '8px', fontWeight: 600 }}>
            {tr.dynastyVi} · {tr.authorVi}
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--tx-0)', letterSpacing: '0.08em', marginBottom: '14px' }}>
            《{tr.titleVi}》
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--tx-2)', lineHeight: 1.8, maxWidth: '620px', margin: '0 auto' }}>
            {tr.introVi}
          </p>
        </div>

        {/* 章节目录 */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid rgba(184,146,42,0.2)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(184,146,42,0.15)', fontSize: '11px', color: 'var(--ac)', letterSpacing: '0.2em', fontWeight: 700 }}>
            MỤC LỤC CHƯƠNG · CỔ THƯ NGUYÊN BẢN
          </div>
          {book.chapters.map((chapter, i) => (
            <Link
              key={i}
              href={`/library/${book.slug}/${i}`}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '14px',
                padding: '14px 20px',
                borderBottom: i === book.chapters.length - 1 ? 'none' : '1px dashed rgba(184,146,42,0.15)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'background 0.15s',
              }}
              className="hover:bg-amber-500/10"
            >
              <div style={{ fontSize: '12px', color: 'var(--ac)', fontWeight: 700, minWidth: '40px', letterSpacing: '0.1em' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '15px', color: 'var(--tx-0)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '2px' }}>
                  {chapter.title}
                </div>
                {chapter.subtitle && (
                  <div style={{ fontSize: '12px', color: 'var(--tx-3)' }}>
                    {chapter.subtitle}
                  </div>
                )}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--tx-3)', letterSpacing: '0.05em' }}>
                {chapter.paragraphs.length} Đoạn Tinh Hoa
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ac)', fontWeight: 700 }}>→</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
