"use client";

import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import Navlinks from "./Navlinks";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/reducers/sidebarSlice";
import { RootState } from "@/reducers/store";

const SmallSidebar = () => {
  const dispatch = useDispatch();
  const showSidebar = useSelector(
    (state: RootState) => state.sidebar.showSidebar
  );

  return (
    <aside
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity lg:hidden ${
        showSidebar
          ? "bg-black/70 opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white w-11/12 max-w-sm h-[95vh] rounded-lg p-6 transition-transform ${
          showSidebar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-red-600 text-2xl"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaTimes />
        </button>
        <header>
          <Link href="/" className="flex items-center ">
            <Image src="/logo.png" alt="Company Logo" width={180} height={50} />
          </Link>
        </header>
        <Navlinks toggleSidebar={() => dispatch(toggleSidebar())} />
      </div>
    </aside>
  );
};

export default SmallSidebar;
