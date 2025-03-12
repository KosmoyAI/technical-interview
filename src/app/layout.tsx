import Layout from "@/components/Layout";
import "./globals.css";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          {children}
        </Layout>
      </Suspense>
      </body>
    </html>
  );
}
