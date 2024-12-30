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

  // Check if the current route is part of the dashboard or authentication pages
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname === "/signup" || pathname === "/signin";

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfairDisplay.variable}`}
    >
      <body className="antialiased">
        <Provider store={store}>
          {/* Conditionally render Navbar and BottomNavigation */}
          {!isDashboardRoute && <Navbar />}
          {!isDashboardRoute && !isAuthRoute && (
            <div className="w-11/12 md:w-10/12 mx-auto">
              <SearchBar />
            </div>
          )}
          <div
            className={`${
              isDashboardRoute ? "w-full h-full" : "w-11/12 lg:w-10/12 mx-auto"
            }`}
          >
            {children}
          </div>
          {!isDashboardRoute && <BottomNavigation />}
        </Provider>
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
//         <Provider store={store}>
//           {/* Conditionally render Navbar, SearchBar, and BottomNavigation */}
//           {!isDashboardRoute && <Navbar />}
//           {!isDashboardRoute && (
//             <div className="w-11/12 md:w-10/12 mx-auto">
//               <SearchBar />
//             </div>
//           )}
//           <div
//             className={`${
//               isDashboardRoute ? "w-full h-full" : "w-11/12 lg:w-10/12 mx-auto"
//             }`}
//           >
//             {children}
//           </div>
//           {!isDashboardRoute && <BottomNavigation />}
//         </Provider>
//       </body>
//     </html>
//   );
// }

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
//         <Provider store={store}>
//           {/* Conditionally render Navbar, SearchBar, and BottomNavigation */}
//           {!isDashboardRoute && <Navbar />}
//           {!isDashboardRoute && (
//             <div className="w-11/12 md:w-10/12 mx-auto">
//               <SearchBar />
//             </div>
//           )}
//           <div
//             className={`${
//               isDashboardRoute ? "w-full h-full" : "w-11/12 lg:w-10/12 mx-auto"
//             }`}
//           >
//             {children}
//           </div>
// <<<<<<< Updated upstream
//           {!isDashboardRoute && <BottomNavigation />}
//         </Provider>
// =======
//         )}
//         <div
//           className={`${
//             isDashboardRoute ? "w-full h-full" : "w-11/12 lg:w-10/12 mx-auto"
//           }`}
//         >
//           <Provider store={store}>
//             <BrowserRouter>{children}</BrowserRouter>
//           </Provider>
//         </div>
//         {!isDashboardRoute && <BottomNavigation />}
// >>>>>>> Stashed changes
//       </body>
//     </html>
//   );
// }
