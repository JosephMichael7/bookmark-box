import type { Viewport } from "next";
import "@/app/globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { AppProviders } from "@/providers/app-providers";
import { APP_DESCRIPTION, APP_NAME, APP_URL, APP_ID, TALENT_VERIFICATION } from "@/lib/app-constants";

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
        <meta name="base:app_id" content={APP_ID} />
        <meta name="talentapp:project_verification" content={TALENT_VERIFICATION} />
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <link rel="canonical" href={APP_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={APP_NAME} />
        <meta property="og:description" content={APP_DESCRIPTION} />
        <meta property="og:url" content={APP_URL} />
        <meta property="og:image" content={`${APP_URL}/icon.svg`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={APP_NAME} />
        <meta name="twitter:description" content={APP_DESCRIPTION} />
        <meta name="twitter:image" content={`${APP_URL}/icon.svg`} />
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
