"use client";

import { useRouter } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const router = useRouter();
  const profileData = {
    profileImage: "/ExpI1.jpg", // Replace with actual path
    firstName: "Jeremy",
    lastName: "Rose",
    email: "hello@jeremyrose.com",
    dob: "June 5, 1992",
    gender: "Male",
    address: "525 E 68th Street, New York, NY 10065",
    phone: "+1 123 456 7890",
  };

  const handleEditProfileClick = () => {
    router.push("/dashboard/edit-profile"); // Navigate to the dashboard/create-store page
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">My Stores</h1>
        <button
          className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4"
          onClick={handleEditProfileClick}
        >
          Edit Profile
        </button>
      </div>
      <div className="bg-[#FAF4EB] p-4 sm:p-6 shadow-lg max-w-4xl mx-auto flex flex-row items-center text-lg rounded-lg">
        {/* Profile Image */}
        <img
          src={profileData.profileImage}
          alt={`${profileData.firstName} ${profileData.lastName}`}
          className="w-32 h-32 sm:w-48 sm:h-48 object-cover mr-6 rounded-full"
        />

        {/* Profile Info */}
        <div className="flex flex-col justify-center text-left">
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-black">
            {profileData.firstName} {profileData.lastName}
          </h3>

          {/* Contact and Basic Info */}
          <div>
            <p className="text-sm sm:text-base text-gray-700 mb-1">
              <strong>Phone:</strong> {profileData.phone}
            </p>
            <p className="text-sm sm:text-base text-gray-700 mb-1">
              <strong>Address:</strong> {profileData.address}
            </p>
            <p className="text-sm sm:text-base text-gray-700 mb-1">
              <strong>Email:</strong> {profileData.email}
            </p>
            <p className="text-sm sm:text-base text-gray-700 mb-1">
              <strong>Date of Birth:</strong> {profileData.dob}
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              <strong>Gender:</strong> {profileData.gender}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

// "use client";

// import React from "react";

// const ProfilePage = () => {
//   const profileData = {
//     profileImage: "/ExpI1.jpg", // Replace with actual path
//     firstName: "Jeremy",
//     lastName: "Rose",
//     email: "hello@jeremyrose.com",
//     dob: "June 5, 1992",
//     gender: "Male",
//     address: "525 E 68th Street, New York, NY 10065",
//     phone: "+1 123 456 7890",
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 py-10">
//       <div className="bg-white max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
//         {/* Profile Section */}
//         <div className="p-6">
//           <div className="flex items-center space-x-6">
//             {/* Profile Image */}
//             <div className="flex-shrink-0">
//               <img
//                 src={profileData.profileImage}
//                 alt={`${profileData.firstName} ${profileData.lastName}`}
//                 className="w-32 h-32 sm:w-48 sm:h-48 object-cover mr-6"
//               />
//             </div>

//             {/* Profile Info */}
//             <div>
//               <h2 className="text-2xl font-bold">
//                 {profileData.firstName} {profileData.lastName}
//               </h2>
//               <div>
//                 <h4 className="text-gray-600 font-semibold">
//                   Contact Information
//                 </h4>
//                 <p className="mt-2 text-gray-700">
//                   <strong>Phone:</strong> {profileData.phone}
//                 </p>
//                 <p className="mt-2 text-gray-700">
//                   <strong>Address:</strong> {profileData.address}
//                 </p>
//                 <p className="mt-2 text-gray-700">
//                   <strong>Email:</strong> {profileData.email}
//                 </p>
//               </div>
//               <div>
//                 <h4 className="text-gray-600 font-semibold">
//                   Basic Information
//                 </h4>
//                 <p className="mt-2 text-gray-700">
//                   <strong>Date of Birth:</strong> {profileData.dob}
//                 </p>
//                 <p className="mt-2 text-gray-700">
//                   <strong>Gender:</strong> {profileData.gender}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
