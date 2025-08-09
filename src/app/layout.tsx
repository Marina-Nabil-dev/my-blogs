import "./globals.css";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import clsx from "clsx";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Providers } from "@/app/providers";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

function getLocaleFromPath(pathname: string): string {
  const path = pathname.split("/")[1];
  return path || "en"; // default fallback
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-next-url") || "/";
  const locale = getLocaleFromPath(pathname);

  return (
    <html
      lang={locale}
      dir={locale === "en" ? "ltr" : "rtl"}
      className="h-full"
    >
      <head>
        <title>My Blog</title>
      </head>
      <body className={clsx(inter.className, "flex h-full flex-col")}>
        <NextIntlClientProvider locale={locale}>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
