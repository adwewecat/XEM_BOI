/**
 * 古籍原典查询库 · 主页
 *
 * 列出所有收录古籍 + 全局搜索入口
 */

import Link from 'next/link';
import { ALL_BOOKS, TOTAL_PARAGRAPHS } from '@/lib/classics';
import LibrarySearch from './LibrarySearch';

export const metadata = {
  title: 'Tàng Kinh Các · Cổ Tịch Nguyên Bản Tử Vi Đẩu Số · Phái Thiên Kỷ',
  description: 'Tra cứu toàn văn cổ tịch kinh điển Tử Vi Đẩu Số: Tử Vi Đẩu Số Toàn Tập, Tử Vi Đẩu Số Toàn Thư, Cốt Tủy Phú theo hệ thống dẫn chứng của danh sư Nghê Hải Hà.',
};

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

export default function LibraryHomePage() {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      {/* 顶栏 */}
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(184,146,42,0.15)', background: 'var(--bg-page)' }}>
        <Link href="/" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: 600 }}>
          ← Trang Chủ
        </Link>
        <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.15em', fontWeight: 700 }}>
          TÀNG KINH CÁC · CỔ TỊCH KINH ĐIỂN
        </div>
        <Link href="/chart" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: 600 }}>
          Lập Lá Số →
        </Link>
      </div>

      {/* Hero */}
      <div className="text-center px-6 py-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, rgba(184,146,42,0.4))' }} />
          <span style={{ fontSize: '11px', color: 'var(--ac)', letterSpacing: '0.4em', fontWeight: 700 }}>NGHÊ HẢI HÀ · CỔ THƯ NGUYÊN BẢN</span>
          <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, rgba(184,146,42,0.4))' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--tx-0)', letterSpacing: '0.05em', marginBottom: '8px' }}>
          TÀNG KINH CÁC · CỔ TỊCH KINH ĐIỂN
        </h1>
        <div style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.2em', marginBottom: '12px', opacity: 0.9, fontWeight: 600 }}>
          HỆ THỐNG PHÁI THIÊN KỶ · KHO TÀNG CỔ TỊCH NGUYÊN BẢN
        </div>
        <p style={{ fontSize: '14px', color: 'var(--tx-2)', letterSpacing: '0.02em', maxWidth: '680px', margin: '0 auto', lineHeight: 1.8 }}>
          Tra cứu toàn văn điển tích nguyên bản Tử Vi Đẩu Số: 《Tử Vi Đẩu Số Toàn Thư》《Tử Vi Đẩu Số Toàn Tập》《Cốt Tủy Phú》<br />
          Thu thập <strong style={{ color: 'var(--ac)' }}>{ALL_BOOKS.length}</strong> Bộ Cổ Thư · Gồm <strong style={{ color: 'var(--ac)' }}>{TOTAL_PARAGRAPHS}</strong> Đoạn Trích Dẫn Tinh Hoa
        </p>
      </div>

      {/* 搜索 */}
      <div className="max-w-2xl mx-auto px-6 mb-12">
        <LibrarySearch />
      </div>

      {/* 古籍列表 */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_BOOKS.map(book => {
            const tr = BOOK_TRANSLATIONS[book.slug] || {
              titleVi: `《${book.title}》`,
              dynastyVi: book.dynasty,
              authorVi: book.author,
              introVi: book.intro,
            };

            return (
              <Link
                key={book.slug}
                href={`/library/${book.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(184,146,42,0.25)',
                  borderRadius: '16px',
                  padding: '24px',
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                }}
                className="hover:shadow-xl hover:border-amber-400"
              >
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--tx-3)', letterSpacing: '0.15em', marginBottom: '8px', fontWeight: 600 }}>
                    {tr.dynastyVi} · {tr.authorVi}
                  </div>
                  <div style={{ fontSize: '19px', fontWeight: 800, color: 'var(--tx-0)', marginBottom: '12px', letterSpacing: '0.05em' }}>
                    《{tr.titleVi}》
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--tx-2)', lineHeight: 1.7, marginBottom: '18px' }}>
                    {tr.introVi}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--tx-3)', fontWeight: 500 }}>
                    <span>{book.chapters.length} Chương</span>
                    <span style={{ color: 'rgba(184,146,42,0.4)' }}>·</span>
                    <span>{book.chapters.reduce((s, c) => s + c.paragraphs.length, 0)} Đoạn Tinh Hoa</span>
                  </div>
                  <div style={{
                    display: 'inline-flex',
                    marginTop: '16px',
                    fontSize: '12px',
                    color: 'var(--ac)',
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                  }}>
                    Vào Đọc Cổ Tịch →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 底部说明 */}
        <div style={{ marginTop: '60px', padding: '24px', background: 'rgba(184,146,42,0.06)', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(184,146,42,0.18)' }}>
          <div style={{ fontSize: '12px', color: 'var(--ac)', fontWeight: 800, letterSpacing: '0.2em', marginBottom: '10px' }}>
            VỀ KHO TÀNG KINH ĐIỂN
          </div>
          <div style={{ fontSize: '13px', color: 'var(--tx-2)', lineHeight: 1.8, maxWidth: '640px', margin: '0 auto' }}>
            Toàn bộ thư tịch cổ được thu thập đều thuộc bản in khắc thời Minh công khai (Minh Đại San Bản).<br />
            Nội dung liên tục được hiệu đính và bổ sung mục lục dẫn chứng song ngữ chuẩn xác theo giáo trình 《Thiên Kỷ》 của danh sư Nghê Hải Hà.<br />
            Nếu phát hiện thiếu sót xin vui lòng liên hệ đóng góp.
          </div>
        </div>
      </div>
    </div>
  );
}
