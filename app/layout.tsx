import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import StarField from '@/components/StarField';
import SideCouplets from '@/components/SideCouplets';
import SpiritualManifestationOverlay from '@/components/SpiritualManifestationOverlay';
import MobileBottomNav from '@/components/MobileBottomNav';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'XEM BÓI TỬ VI ĐẨU SỐ · Hệ Thống An Sao & Giải Đoán Mệnh Bàn',
  description: 'Hệ thống lập lá số Tử Vi Đẩu Số 12 Cung, 14 Chính Tinh, Tứ Hóa, Giờ Chân Thái Dương theo chuẩn lý số phái Thiên Kỷ (Ni Haixia) & Tử Vi Đẩu Số Toàn Thư.',
  keywords: 'xem bói, tử vi, tử vi đẩu số, lập lá số tử vi, an sao tử vi, 14 chính tinh, 12 cung, tứ hóa, giờ chân thái dương',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'XEM BÓI TỬ VI ĐẨU SỐ · Hệ Thống An Sao & Giải Đoán Mệnh Bàn',
    description: 'Hệ thống lập lá số Tử Vi Đẩu Số 12 Cung, 14 Chính Tinh, Tứ Hóa, Giờ Chân Thái Dương theo chuẩn lý số phái Thiên Kỷ.',
    url: SITE_URL,
    siteName: 'Xem Bói Tử Vi',
    locale: 'vi_VN',
    type: 'website',
  },
  // 站长平台验证
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
      'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || '',
      '360-site-verification': process.env.NEXT_PUBLIC_360_VERIFICATION || '',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="relative" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ziwei-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);else document.documentElement.setAttribute('data-theme','dark');var clean=function(root){var els=(root||document).querySelectorAll('[bis_skin_checked],[bis_register],[data-bis-config]');for(var i=0;i<els.length;i++){els[i].removeAttribute('bis_skin_checked');els[i].removeAttribute('bis_register');els[i].removeAttribute('data-bis-config');}};clean(document);if(typeof MutationObserver!=='undefined'){var obs=new MutationObserver(function(muts){for(var i=0;i<muts.length;i++){var m=muts[i];if(m.type==='attributes'&&m.target&&m.target.removeAttribute){m.target.removeAttribute('bis_skin_checked');m.target.removeAttribute('bis_register');m.target.removeAttribute('data-bis-config');}else if(m.addedNodes&&m.addedNodes.length){for(var j=0;j<m.addedNodes.length;j++){var n=m.addedNodes[j];if(n.nodeType===1){if(n.removeAttribute){n.removeAttribute('bis_skin_checked');n.removeAttribute('bis_register');}if(n.querySelectorAll)clean(n);}}}}});obs.observe(document.documentElement,{attributes:true,childList:true,subtree:true,attributeFilter:['bis_skin_checked','bis_register','data-bis-config']});setTimeout(function(){obs.disconnect();},5000);}}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen relative overflow-x-hidden flex flex-col">
        <ThemeProvider>
          <StarField />
          <Navbar />
          <SideCouplets />
          <div suppressHydrationWarning className="relative z-10 flex-1 pb-16 md:pb-0">
            {children}
          </div>
          <MobileBottomNav />
          <SpiritualManifestationOverlay />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
