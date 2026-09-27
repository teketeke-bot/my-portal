import type { Metadata } from "next";
// 1. Noto Sans JP をインポートする
import { Noto_Sans_JP } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

// 2. フォントの太さなどを設定する
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "外国人美容師支援ポータル",
  description: "外国人美容師のためのポータルサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 言語設定を ja に変更
    <html lang="ja" className="scroll-smooth">
      {/* 3. bodyタグにフォントを適用する */}
      <body className={notoSansJP.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}