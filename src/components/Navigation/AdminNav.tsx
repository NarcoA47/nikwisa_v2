import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { toggleSidebar } from "@/reducers/sidebarSlice";
import { logout } from "@/reducers/authSlice";
import { RootState } from "@/reducers/store";
import { useRouter } from "next/navigation";

const AdminNav = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  // Access user data from Redux store
  const user = useSelector((state: RootState) => state.auth.user);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    router.push("/signin"); // Redirect to the login page
  };

  return (
    <nav className="h-16 bg-white shadow-md flex items-center justify-between transition-all duration-300">
      <div className="w-[90%] flex justify-between items-center mx-auto">
        {/* Toggle Sidebar */}
        <button
          className="text-xl text-[#B8902E]"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>

        {/* Logo Text */}
        <h3 className="hidden lg:block font-semibold text-gray-800">
          Dashboard
        </h3>

        {/* User Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-[#B8902E] text-white px-4 py-2 rounded-md shadow-md"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.user_type || "Guest"} {/* Display username from the user data */}
            <FaCaretDown />
          </button>

          {/* Dropdown Menu */}
          {showLogout && (
            <div className="absolute left-0 top-full mt-2 w-full bg-blue-100 shadow-lg text-center rounded-md py-2">
              <button
                className="text-[#B8902E] capitalize px-4 py-2 w-full text-sm hover:bg-blue-200 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
