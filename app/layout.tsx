import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ["latin"], variable: '--font-orbitron' });

export const metadata: Metadata = {
  title: "Number Bomb",
  description: "A thrilling digital version of the classic Number Bomb game. Guess the number within the shrinking range without triggering the explosion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable} font-sans bg-slate-100 dark:bg-slate-900 antialiased transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}