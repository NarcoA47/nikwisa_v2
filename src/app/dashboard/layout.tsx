"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/reducers/store";
import { setAuth, logout } from "@/reducers/authSlice";
import {jwtDecode} from "jwt-decode"; // Assuming you're using jwt-decode

import AdminNav from "@/components/Navigation/AdminNav";
import BigSidebar from "@/components/Navigation/BigSidebar";
import SmallSidebar from "@/components/Navigation/SmallSidebar";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    if (accessToken && refreshToken && !isAuthenticated) {
      try {
        // Decode the access token to extract user information
        const decodedToken: any = jwtDecode(accessToken);

        // Dispatch action to set authentication and user details
        dispatch(
          setAuth({
            tokens: {
              access: accessToken,
              refresh: refreshToken,
            },
            user: {
              id: decodedToken?.user_id || null,
              username: decodedToken?.username || "Guest",
              email: decodedToken?.email || null,
            },
            isAuthenticated: true,
          })
        );
      } catch (error) {
        console.error("Error decoding token:", error);
        dispatch(logout()); // Logout if the token is invalid
      }
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
      <div
        
      >
        {/* Navbar */}
        <AdminNav />

        {/* Page content */}
        <div className="w-[90%] mx-auto py-8">{children}</div>
      </div>
    </main>
  );
}
