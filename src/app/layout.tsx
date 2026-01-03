import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: 'Your Time Demo',
  description: 'Your Time Demo',
  icons: {
    icon: '/clock-check.svg',
  }
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* PWA関連のメタデータ */}
        <meta name="application-name" content="Your Time Clone" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Your Time Clone" />
        <meta name="description" content="あなたの時間管理をサポートするアプリ" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" /> {/* 任意で設定 */}
        <meta name="msapplication-TileColor" content="#2B5797" /> {/* Windowsタイル用の色 */}
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#2563eb" /> {/* manifest.jsonと合わせる */}

        <link rel="apple-touch-icon" href="/icons/apple-icon-180x180.png" /> {/* Appleデバイス用アイコン */}
        <link rel="manifest" href="/manifest.json" /> {/* manifest.jsonをリンク */}
      </head>
      <body >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
