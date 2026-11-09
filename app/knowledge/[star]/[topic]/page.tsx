/**
 * /knowledge/[star]/[topic] — SEO 落地页
 *
 * 14 主星 × 13 topic = 182 个独立 URL
 * 每页含完整的 STAR_DB 4 段论断（一句话定调/核心论断/命盘依据/经典出处）
 *
 * SEO 要点：
 *  - title 含主关键词（如"紫微入命宫·倪海厦体系详解"）
 *  - description 用 dingdiao（一句话定调）
 *  - JSON-LD Article 结构化数据
 *  - 内链：同主星其他 12 宫 + 同宫其他 13 主星
 *  - generateStaticParams 静态生成，零运行时开销
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { TopicKey } from '@/lib/ziwei/db-analysis';
import {
  ALL_STARS,
  ALL_TOPICS,
  getKnowledge,
  getAllKnowledgeRoutes,
  STAR_BRIEF_SEO,
  STAR_TO_SLUG,
  SLUG_TO_STAR,
} from '@/lib/seo/knowledge';
import { SITE_URL } from '@/lib/site';
import { getStarName, PALACE_VI, TOPIC_VI } from '@/lib/ziwei/vietnamese';

export const dynamicParams = true;

export async function generateStaticParams() {
  const routes = getAllKnowledgeRoutes();
  return routes.map(r => ({ star: r.slug, topic: r.topic }));
}

export async function generateMetadata({ params }: { params: Promise<{ star: string; topic: string }> }) {
  const { star: slug, topic } = await params;
  const star = SLUG_TO_STAR[slug];
  if (!star) return {};
  const data = getKnowledge(star, topic as TopicKey);
  if (!data.exists) return {};

  const starVi = getStarName(star);
  const pName = PALACE_VI[data.palaceName]?.vi || data.palaceName;
  const tName = TOPIC_VI[topic as TopicKey]?.title || data.topicLabel;

  const title = `Sao ${starVi.vi} ngự tại ${pName} · ${tName} · Phái Thiên Kỷ Nghê Hải Hà`;
  const description = data.parsed.dingdiao
    || `Luận giải chuyên sâu sao ${starVi.vi} ngự tại ${pName} — Giáo trình Thiên Kỷ Nghê Hải Hà & Cổ tịch Tử Vi Đẩu Số.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/knowledge/${slug}/${topic}`,
    },
    alternates: {
      canonical: `${SITE_URL}/knowledge/${slug}/${topic}`,
    },
  };
}

export default async function KnowledgePage({ params }: { params: Promise<{ star: string; topic: string }> }) {
  const { star: slug, topic } = await params;
  const star = SLUG_TO_STAR[slug];
  if (!star) notFound();
  const data = getKnowledge(star, topic as TopicKey);
  if (!data.exists) notFound();

  const starVi = getStarName(star);
  const pName = PALACE_VI[data.palaceName]?.vi || data.palaceName;
  const pShort = PALACE_VI[data.palaceName]?.short || data.palaceName;
  const tName = TOPIC_VI[topic as TopicKey]?.title || data.topicLabel;

  // Đồng chủ tinh các topic khác
  const otherTopicsForStar = ALL_TOPICS.filter(t => t !== topic && getKnowledge(star, t).exists);
  // Đồng topic các chủ tinh khác
  const otherStarsForTopic = ALL_STARS.filter(s => s !== star && getKnowledge(s, topic as TopicKey).exists);

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      {/* 顶栏 */}
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(184,146,42,0.15)', background: 'var(--bg-page)' }}>
        <Link href="/knowledge" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.15em', textDecoration: 'none', fontWeight: 600 }}>
          ← Vạn Tinh Các (知识库)
        </Link>
        <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.15em', fontWeight: 700 }}>
          KHO TRI THỨC TINH DIỆU THIÊN KỶ
        </div>
        <Link href="/chart" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.15em', textDecoration: 'none', fontWeight: 600 }}>
          Lập Lá Số (起盘) →
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* 面包屑 */}
        <nav style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.05em', marginBottom: '20px', fontWeight: 500 }}>
          <Link href="/" style={{ color: 'var(--tx-3)', textDecoration: 'none' }}>Trang Chủ</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <Link href="/knowledge" style={{ color: 'var(--tx-3)', textDecoration: 'none' }}>Vạn Tinh Các</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--tx-0)', fontWeight: 700 }}>Sao {starVi.vi}</span>
          <span style={{ margin: '0 8px' }}>·</span>
          <span style={{ color: 'var(--ac)', fontWeight: 700 }}>{pName}</span>
        </nav>

        {/* 标题区 */}
        <header style={{ marginBottom: '36px' }}>
          <div style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.2em', marginBottom: '8px', fontWeight: 700, textTransform: 'uppercase' }}>
            {tName} · GIÁO TRÌNH THIÊN KỶ NGHÊ HẢI HÀ
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: 'var(--tx-0)', letterSpacing: '0.05em', lineHeight: 1.25 }}>
            Sao {starVi.vi} ngự tại {pName}
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--tx-3)', marginTop: '4px', fontStyle: 'italic' }}>
            ({starVi.zh} nhập {data.palaceName} cung · Chuyên đề {tName})
          </div>
          {STAR_BRIEF_SEO[star] && (
            <p style={{ fontSize: '14px', color: 'var(--tx-2)', marginTop: '16px', lineHeight: 1.8 }}>
              {STAR_BRIEF_SEO[star]}
            </p>
          )}
        </header>

        {/* 内容 4 段 */}
        {data.parsed.dingdiao && (
          <Section title="ĐỊNH HƯỚNG TỔNG QUÁT" gradient>
            <p style={{ fontSize: '17px', color: 'var(--tx-0)', lineHeight: 1.9, fontWeight: 600, letterSpacing: '0.02em' }}>
              {data.parsed.dingdiao}
            </p>
          </Section>
        )}

        {data.parsed.lundian && (
          <Section title="LUẬN ĐIỂM TRỌNG TÂM">
            <div style={{ fontSize: '15px', color: 'var(--tx-0)', lineHeight: 2, letterSpacing: '0.01em', whiteSpace: 'pre-wrap' }}>
              {data.parsed.lundian}
            </div>
          </Section>
        )}

        {data.parsed.yiju && (
          <Section title="CĂN CỨ TINH DIỆU & TAM PHƯƠNG">
            <div style={{ fontSize: '14px', color: 'var(--tx-0)', lineHeight: 2, letterSpacing: '0.01em', whiteSpace: 'pre-wrap' }}>
              {data.parsed.yiju}
            </div>
          </Section>
        )}

        {data.parsed.chuchu && (
          <Section title="XUẤT XỨ CỔ TỊCH & LỜI GIẢNG DANH SƯ" minimal>
            <div style={{ fontSize: '13px', color: 'var(--tx-2)', lineHeight: 2, letterSpacing: '0.01em', whiteSpace: 'pre-wrap' }}>
              {data.parsed.chuchu}
            </div>
          </Section>
        )}

        {/* CTA */}
        <div style={{
          margin: '40px 0 30px',
          padding: '28px 24px',
          background: 'linear-gradient(135deg, rgba(212,169,72,0.18) 0%, rgba(184,146,42,0.08) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(184,146,42,0.35)',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}>
          <div style={{ fontSize: '16px', color: 'var(--tx-0)', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '8px' }}>
            Bạn muốn xem {pName} trên lá số của chính mình?
          </div>
          <div style={{ fontSize: '13px', color: 'var(--tx-2)', marginBottom: '18px', lineHeight: 1.6 }}>
            Nhập ngày giờ sinh để an lá số Tử Vi trọn vẹn · Luận giải chuyên sâu theo phái Thiên Kỷ · 100% Tiếng Việt
          </div>
          <Link href="/chart" style={{
            display: 'inline-block',
            padding: '12px 32px',
            background: 'linear-gradient(135deg, #d4a948 0%, #b8922a 100%)',
            color: '#0a0a0c',
            borderRadius: '999px',
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(184,146,42,0.4)',
          }}>
            LẬP LÁ SỐ MIỄN PHÍ NGAY →
          </Link>
        </div>

        {/* 内链：同主星其他 topic */}
        <Section title={`CÁC CUNG VỊ KHÁC CỦA SAO ${starVi.vi.toUpperCase()}`} minimal>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {otherTopicsForStar.map(t => {
              const d = getKnowledge(star, t);
              const pTName = PALACE_VI[d.palaceName]?.short || d.palaceName;
              const tTName = TOPIC_VI[t]?.title || d.topicLabel;
              return (
                <Link
                  key={t}
                  href={`/knowledge/${slug}/${t}`}
                  style={{
                    fontSize: '12px',
                    padding: '6px 14px',
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(184,146,42,0.25)',
                    borderRadius: '999px',
                    color: 'var(--tx-2)',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                  className="hover:border-amber-400 hover:text-amber-400 transition-colors"
                >
                  Cung {pTName} · {tTName}
                </Link>
              );
            })}
          </div>
        </Section>

        {/* 内链：同 topic 其他主星 */}
        <Section title={`CÁC SAO KHÁC CHIẾU VÀO ${pName.toUpperCase()}`} minimal>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {otherStarsForTopic.slice(0, 13).map(s => {
              const oStarVi = getStarName(s);
              return (
                <Link
                  key={s}
                  href={`/knowledge/${STAR_TO_SLUG[s]}/${topic}`}
                  style={{
                    fontSize: '12px',
                    padding: '6px 14px',
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(184,146,42,0.25)',
                    borderRadius: '999px',
                    color: 'var(--tx-2)',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                  className="hover:border-amber-400 hover:text-amber-400 transition-colors"
                >
                  Sao {oStarVi.vi} ngự tại {pShort}
                </Link>
              );
            })}
          </div>
        </Section>

        {/* 古籍库链接 */}
        <div style={{
          marginTop: '40px',
          padding: '18px 20px',
          background: 'rgba(184,146,42,0.06)',
          border: '1px dashed rgba(184,146,42,0.3)',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', color: 'var(--ac)', letterSpacing: '0.15em', marginBottom: '6px', fontWeight: 700 }}>
            TRA CỨU ĐIỂN TÍCH GỐC
          </div>
          <Link href="/library" style={{ fontSize: '13px', color: 'var(--ac)', fontWeight: 600, letterSpacing: '0.05em', textDecoration: 'none' }}>
            📜 Tra Cứu Tàng Kinh Các — 《Tử Vi Đẩu Số Toàn Thư》《Cốt Tủy Phú》 →
          </Link>
        </div>
      </article>

      {/* 页脚 */}
      <footer style={{ borderTop: '1px solid rgba(184,146,42,0.15)', padding: '24px', textAlign: 'center', fontSize: '11px', color: 'var(--tx-3)', letterSpacing: '0.05em' }}>
        <div style={{ marginBottom: '6px', fontWeight: 600 }}>Tử Vi Đẩu Số Thiên Kỷ · Dựa trên giáo trình chính tông của danh sư Nghê Hải Hà</div>
        <div style={{ opacity: 0.85 }}>Mục đích nghiên cứu văn hóa truyền thống Á Đông, không cấu thành các khuyến nghị y tế, tài chính hay pháp lý.</div>
      </footer>
    </div>
  );
}

function Section({ title, children, gradient, minimal }: { title: string; children: React.ReactNode; gradient?: boolean; minimal?: boolean }) {
  return (
    <section style={{ marginBottom: minimal ? '24px' : '32px' }}>
      <h2 style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        color: 'var(--ac)',
        fontWeight: 600,
        letterSpacing: '0.2em',
        marginBottom: '12px',
      }}>
        <span style={{ width: '4px', height: '14px', background: 'var(--ac)', borderRadius: '2px' }} />
        {title}
      </h2>
      <div style={{
        background: gradient
          ? 'linear-gradient(135deg, rgba(212,169,72,0.12) 0%, rgba(184,146,42,0.04) 100%)'
          : 'white',
        border: '1px solid rgba(184,146,42,0.15)',
        borderRadius: '10px',
        padding: minimal ? '14px 18px' : '20px 22px',
      }}>
        {children}
      </div>
    </section>
  );
}
