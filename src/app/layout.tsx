"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNavigation from "@/components/BottomNavigation";
import SearchBar from "@/components/SearchBar";
import { Provider } from "react-redux";
import { store } from "@/reducers/store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Nikwisa",
//   description: "Your business local directory",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="w-11/12 md:w-10/12 mx-auto">
          {" "}
          <SearchBar />
        </div>

        <div className="w-11/12 lg:w-10/12 mx-auto ">
          <Provider store={store}>{children}</Provider>
        </div>
        <BottomNavigation />
      </body>
    </html>
  );
}
