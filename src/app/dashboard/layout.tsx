"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/reducers/store";
import { setAuth, logout } from "@/reducers/authSlice";

import AdminNav from "@/components/Navigation/AdminNav";
import BigSidebar from "@/components/Navigation/BigSidebar";
import SmallSidebar from "@/components/Navigation/SmallSidebar";

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // Check if user is authenticated based on tokens in localStorage
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (accessToken && refreshToken && !isAuthenticated) {
      dispatch(setAuth({ access: accessToken, refresh: refreshToken }));
    } else if (!accessToken || !refreshToken) {
      dispatch(logout());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <main className="relative h-full">
      {/* Sidebar components */}
      <BigSidebar />
      <SmallSidebar />

      {/* Main content area */}
      <div className={`transition-all duration-300 ${isAuthenticated ? "lg:ml-64" : "lg:ml-0"}`}>
        {/* Navbar */}
        <AdminNav />

        {/* Page content */}
        <div className="w-[90%] mx-auto py-8">{children}</div>
      </div>
    </main>
  );
}
