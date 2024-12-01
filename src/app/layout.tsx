"use client";

import { usePathname } from "next/navigation"; // Import for route-specific logic
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNavigation from "@/components/BottomNavigation";
import SearchBar from "@/components/SearchBar";
import { Provider } from "react-redux";
import { store } from "@/reducers/store";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname(); // Get the current path

  // Check if the current route is part of the dashboard
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfairDisplay.variable}`}
    >
      <body className="antialiased">
        {/* Conditionally render Navbar, SearchBar, and BottomNavigation */}
        {!isDashboardRoute && <Navbar />}
        {!isDashboardRoute && (
          <div className="w-11/12 md:w-10/12 mx-auto">
            <SearchBar />
          </div>
        )}
        <div
          className={`${
            isDashboardRoute ? "w-full h-full" : "w-11/12 lg:w-10/12 mx-auto"
          }`}
        >
          <Provider store={store}>{children}</Provider>
        </div>
        {!isDashboardRoute && <BottomNavigation />}
      </body>
    </html>
  );
}

// "use client";

// import { usePathname } from "next/navigation"; // Import for route-specific logic
// import { Poppins, Playfair_Display } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import BottomNavigation from "@/components/BottomNavigation";
// import SearchBar from "@/components/SearchBar";
// import { Provider } from "react-redux";
// import { store } from "@/reducers/store";

// const poppins = Poppins({
//   subsets: ["latin"],
//   variable: "--font-poppins",
//   weight: ["300", "400", "500", "600", "700"],
// });

// const playfairDisplay = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-playfair",
//   weight: ["400", "500", "600", "700"],
// });

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   const pathname = usePathname(); // Get the current path

//   // Check if the current route is part of the dashboard
//   const isDashboardRoute = pathname.startsWith("/dashboard");

//   return (
//     <html
//       lang="en"
//       className={`${poppins.variable} ${playfairDisplay.variable}`}
//     >
//       <body className="antialiased">
//         {/* Conditionally render Navbar, SearchBar, and BottomNavigation */}
//         {!isDashboardRoute && <Navbar />}
//         {!isDashboardRoute && (
//           <div className="w-11/12 md:w-10/12 mx-auto">
//             <SearchBar />
//           </div>
//         )}
//         <div
//           className={`w-11/12 lg:w-10/12 mx-auto ${
//             isDashboardRoute ? "h-full" : ""
//           }`}
//         >
//           <Provider store={store}>{children}</Provider>
//         </div>
//         {!isDashboardRoute && <BottomNavigation />}
//       </body>
//     </html>
//   );
// }

// "use client";
// import { Poppins, Playfair_Display } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import BottomNavigation from "@/components/BottomNavigation";
// import SearchBar from "@/components/SearchBar";
// import { Provider } from "react-redux";
// import { store } from "@/reducers/store";

// // Load Google Fonts using next/font/google
// const poppins = Poppins({
//   subsets: ["latin"],
//   variable: "--font-poppins",
//   weight: ["300", "400", "500", "600", "700"], // Add weights as needed
// });
// const playfairDisplay = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-playfair",
//   weight: ["400", "500", "600", "700"], // Add weights as needed
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`${poppins.variable} ${playfairDisplay.variable}`}
//     >
//       <body className="antialiased">
//         <Navbar />
//         <div className="w-11/12 md:w-10/12 mx-auto">
//           <SearchBar />
//         </div>
//         <div className="w-11/12 lg:w-10/12 mx-auto">
//           <Provider store={store}>{children}</Provider>
//         </div>
//         <BottomNavigation />
//       </body>
//     </html>
//   );
// }

// "use client";
// import type { Metadata } from "next";
// import { Poppins, Playfair_Display } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import BottomNavigation from "@/components/BottomNavigation";
// import SearchBar from "@/components/SearchBar";
// import { Provider } from "react-redux";
// import { store } from "@/reducers/store";

// // Load Google Fonts using next/font/google
// const poppins = Poppins({
//   subsets: ["latin"],
//   variable: "--font-poppins",
//   weight: ["300", "400", "500", "600", "700"], // Add weights as needed
// });
// const playfairDisplay = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-playfair",
//   weight: ["400", "500", "600", "700"], // Add weights as needed
// });

// // Metadata can be uncommented if needed
// // export const metadata: Metadata = {
// //   title: "Nikwisa",
// //   description: "Your business local directory",
// // };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${poppins.variable} ${playfairDisplay.variable} antialiased`}
//       >
//         <Navbar />
//         <div className="w-11/12 md:w-10/12 mx-auto">
//           <SearchBar />
//         </div>
//         <div className="w-11/12 lg:w-10/12 mx-auto">
//           <Provider store={store}>{children}</Provider>
//         </div>
//         <BottomNavigation />
//       </body>
//     </html>
//   );
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" className={`${poppins.variable} ${playfairDisplay.variable}`}>
//       <body className="antialiased">{children}</body>
//     </html>
//   );
// }
