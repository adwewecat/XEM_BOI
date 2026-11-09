/**
 * /library/search?q=xxx — 搜索结果页
 */

import Link from 'next/link';
import { searchClassics, getParagraphById } from '@/lib/classics';

export const metadata = {
  title: '搜索 · 古籍原典库',
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const sp = await searchParams;
  const q = sp.q?.trim() || '';
  const hits = q ? searchClassics(q, 50) : [];

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(184,146,42,0.15)', background: 'var(--bg-page)' }}>
        <Link href="/library" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: 600 }}>
          ← Tàng Kinh Các (古籍库)
        </Link>
        <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.15em', fontWeight: 700 }}>
          KẾT QUẢ TÌM KIẾM ĐIỂN TÍCH
        </div>
        <Link href="/" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.1em', textDecoration: 'none', fontWeight: 600 }}>
          Trang Chủ (首页) →
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.15em', marginBottom: '6px', fontWeight: 600 }}>
            TỪ KHÓA TÌM KIẾM
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: 'var(--tx-0)', letterSpacing: '0.05em' }}>
            「{q || '（Trống）'}」
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--tx-3)', marginTop: '8px' }}>
            Tìm thấy <strong style={{ color: 'var(--ac)' }}>{hits.length}</strong> đoạn trích dẫn đối ứng trong cổ thư
          </div>
        </div>

        {hits.length === 0 ? (
          <div style={{
            background: 'var(--bg-card)',
            padding: '40px 20px',
            borderRadius: '16px',
            textAlign: 'center',
            color: 'var(--tx-2)',
            border: '1px solid rgba(184,146,42,0.2)',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.5 }}>📜</div>
            {q ? (
              <>
                <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: 'var(--tx-0)' }}>Chưa tìm thấy đoạn trích chứa từ khóa này</div>
                <div style={{ fontSize: '12px', color: 'var(--tx-3)', lineHeight: 1.8 }}>
                  Nội dung đang tiếp tục được bổ sung thêm. Bạn có thể thử tìm kiếm:<br />
                  <span style={{ color: 'var(--ac)', fontWeight: 600 }}>七杀朝斗 / 双禄朝垣 / 化忌 / 紫微 / 命宫 / 机月同梁</span>
                </div>
              </>
            ) : (
              <div style={{ fontSize: '13px' }}>Vui lòng nhập từ khóa bạn muốn tìm kiếm</div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {hits.map((hit, i) => {
              const ctx = getParagraphById(hit.paragraphId);
              const chapterIdx = ctx?.chapterIdx ?? 0;
              return (
                <Link
                  key={i}
                  href={`/library/${hit.bookSlug}/${chapterIdx}#${hit.paragraphId}`}
                  style={{
                    display: 'block',
                    background: 'var(--bg-card)',
                    padding: '18px 22px',
                    borderRadius: '12px',
                    border: '1px solid rgba(184,146,42,0.2)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.2s',
                  }}
                  className="hover:border-amber-400 hover:shadow-md"
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: 'var(--tx-3)',
                    marginBottom: '8px',
                    letterSpacing: '0.05em',
                  }}>
                    <span style={{ color: 'var(--ac)', fontWeight: 700 }}>《{hit.bookTitle}》</span>
                    <span style={{ opacity: 0.5 }}>·</span>
                    <span style={{ fontWeight: 600 }}>{hit.chapterTitle}</span>
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: 'var(--tx-0)',
                      lineHeight: 1.9,
                      letterSpacing: '0.02em',
                    }}
                    dangerouslySetInnerHTML={{ __html: hit.snippet }}
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        mark { background: rgba(184,146,42,0.3); color: #8b6a14; padding: 0 2px; border-radius: 2px; font-weight: 600; }
      `}</style>
    </div>
  );
}
