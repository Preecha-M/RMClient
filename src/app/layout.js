import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rice Disease",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <nav className="w-full flex justify-center space-x-8 py-4 bg-white shadow-md fixed top-0">
          <Link href="/" className="text-lg font-semibold hover:text-yellow-500">Home</Link>
          <Link href="/detect" className="text-lg font-semibold hover:text-yellow-500">Detect Here!!</Link>
          <Link href="/diseases" className="text-lg font-semibold hover:text-yellow-500">Rice Diseases</Link>
          <Link href="/about" className="text-lg font-semibold hover:text-yellow-500">About Us</Link>
          <Link href="/history" className="text-lg font-semibold hover:text-yellow-500">History</Link>
        </nav>
        
        <main className="mt-16">{children}</main>
      </body>
    </html>
  );
}