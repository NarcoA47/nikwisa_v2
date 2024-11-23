"use client";
import RegistrationForm from "@/components/Authentication/RegistrationForm";
import React from "react";

const page = () => {
  return (
    <div className="grid bg-white mt-8 items-center justify-items-center min-h-screen p-1 pb-20  md:p-20 font-[family-name:var(--font-geist-sans)]">
      <RegistrationForm />
    </div>
  );
};

export default page;
