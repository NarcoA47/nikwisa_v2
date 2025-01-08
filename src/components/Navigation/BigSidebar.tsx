"use client";

import Link from "next/link";
import Navlinks from "./Navlinks";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/reducers/store";

const BigSidebar = () => {
  const showSidebar = useSelector(
    (state: RootState) => state.sidebar.showSidebar
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white shadow-md w-64 transition-transform duration-300 ${
        showSidebar ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      <div className="sticky top-0 h-full">
        <header className="p-6 pt-2">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Company Logo" width={180} height={50} />
          </Link>
        </header>
        <Navlinks />
      </div>
    </aside>
  );
};

export default BigSidebar;

// "use client";

// import Link from "next/link";
// import Navlinks from "./Navlinks";
// import Image from "next/image";
// import { useSelector } from "react-redux";
// import { RootState } from "@/reducers/store";

// const BigSidebar = () => {
//   const showSidebar = useSelector(
//     (state: RootState) => state.sidebar.showSidebar
//   );

//   return (
//     <aside
//       className={`fixed top-0 left-0   h-full bg-white shadow-md w-64 transition-transform duration-300 ${
//         showSidebar ? "translate-x-0" : "-translate-x-64"
//       }`}
//     >
//       <div className="sticky top-0 h-full">
//         <header className="p-6 pt-2">
//           <Link href="/" className="flex items-center">
//             <Image src="/logo.png" alt="Company Logo" width={180} height={50} />
//           </Link>
//         </header>
//         <Navlinks />
//       </div>
//     </aside>
//   );
// };

// export default BigSidebar;
