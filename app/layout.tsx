import type { Viewport } from "next";
import "@/app/globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { AppProviders } from "@/providers/app-providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F6F1E8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="base:app_id" content="69c63965638fc70642e549cd" />
        <meta name="talentapp:project_verification" content="841b5a0971bc3ce4408043e42d52e63e562b7e3e13074e8f9c7159d800a575c4167df4e5cb39ebecd78a24ec8b5dff09f33b9fb2d7bd66be54f6b5808c0bdcd8" />
        <title>bookmark-box</title>
        <meta name="description" content="链上收藏 / Bookmark" />
      </head>
      <body>
        <AppProviders>
          <div className="app-shell">
            <div className="app-frame">
              {children}
              <BottomNav />
            </div>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}

