"use client";

import AdminNav from "@/components/Navigation/AdminNav";
import BigSidebar from "@/components/Navigation/BigSidebar";
import SmallSidebar from "@/components/Navigation/SmallSidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/reducers/store";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showSidebar = useSelector(
    (state: RootState) => state.sidebar.showSidebar
  );
  return (
    <main className="relative h-full">
      {/* Sidebar components */}
      <BigSidebar />
      <SmallSidebar />

      {/* Main content area */}
      <div
        className={`transition-all duration-300 ${
          showSidebar ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        {/* Navbar */}
        <AdminNav />

        {/* Page content */}
        <div className="w-[90%] mx-auto py-8">{children}</div>
      </div>
    </main>
  );
}
