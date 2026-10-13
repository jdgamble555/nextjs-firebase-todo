import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js Firebase Todo App",
  description: "Sign in with Google and manage your realtime Firebase todo list with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <nav className="flex gap-3 justify-center mt-5">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
      </body>
    </html>
  );
}

