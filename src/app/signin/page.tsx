"use client";
import LoginForm from "@/components/Authentication/Login";
import React from "react";

const page = () => {
  return (
    <div className="grid bg-white items-center justify-items-center min-h-screen p-1 pb-20  md:p-20 font-[family-name:var(--font-geist-sans)] mt-8">
      <LoginForm />
    </div>
  );
};

export default page;
