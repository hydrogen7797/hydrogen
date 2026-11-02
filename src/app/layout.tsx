import type { Metadata, Viewport } from "next";
import { Google_Sans_Flex, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  adjustFontFallback: false,
});

// Stand-in for the original "ryo-gothic-plusn" (Adobe Fonts).
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Goodpatch グッドパッチ｜デザインの力を証明する",
  description:
    "グッドパッチは、デザインの力で事業・プロダクト・ブランド・組織の未来を構想し、変革をリードするデザインカンパニーです。",
  openGraph: {
    images: ["/ogp.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#096fc8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${googleSansFlex.variable} ${notoSansJP.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
