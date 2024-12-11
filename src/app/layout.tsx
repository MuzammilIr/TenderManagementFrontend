import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tender Management System",
  description: "Efficiently manage and bid on tenders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full font-sans antialiased text-gray-800">
        {children}
      </body>
    </html>
  );
}
