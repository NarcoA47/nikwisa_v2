// import { links } from "@/data";
// import Link from "next/link";

// const Navlinks = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
//   return (
//     <nav className="flex flex-col space-y-4">
//       {links.map(({ text, path, id }) => (
//         <Link
//           key={id}
//           href={path}
//           onClick={toggleSidebar}
//           className="text-gray-700 hover:text-gray-900 transition"
//         >
//           {text}
//         </Link>
//       ))}
//     </nav>
//   );
// };

// export default Navlinks;

// import { links } from "@/data"; // Importing links array
import Link from "next/link";
import { usePathname } from "next/navigation"; // To track the active route
import { AiOutlineHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { MdQueryStats } from "react-icons/md";
import { RiGitClosePullRequestFill, RiStore2Fill } from "react-icons/ri";

export const links = [
  { id: 1, text: "Home", path: "/dashboard", icon: <AiOutlineHome /> },
  {
    id: 2,
    text: "Profile",
    path: "/dashboard/profile",
    icon: <RiGitClosePullRequestFill />,
  },
  {
    id: 3,
    text: "Create Store",
    path: "/dashboard/create-store",
    icon: <RiStore2Fill />,
  },
  {
    id: 4,
    text: "Create Product",
    path: "/dashboard/create-product",
    icon: <MdQueryStats />,
  },
  {
    id: 5,
    text: "Edit Store",
    path: "/dashboard/edit-store",
    icon: <FiSettings />,
  },
];

const Navlinks = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
  const pathname = usePathname(); // Get the current active path

  return (
    <nav className="flex flex-col space-y-4">
      {links.map(({ text, path, id, icon }) => (
        <Link
          key={id}
          href={path}
          onClick={toggleSidebar}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition ${
            pathname === path
              ? "bg-gray-200 text-gray-900 font-semibold"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          {icon && <span className="text-xl">{icon}</span>}{" "}
          {/* Icon if available */}
          <span>{text}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navlinks;
