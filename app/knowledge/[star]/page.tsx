import { redirect } from 'next/navigation';
import { ALL_STARS, STAR_TO_SLUG } from '@/lib/seo/knowledge';

export async function generateStaticParams() {
  return ALL_STARS.map(star => ({ star: STAR_TO_SLUG[star] }));
}

export default async function StarIndexPage({ params }: { params: Promise<{ star: string }> }) {
  const { star } = await params;
  redirect(`/knowledge/${star}/overview`);
}

