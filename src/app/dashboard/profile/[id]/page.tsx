"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/reducers/store";
import { fetchUserById, updateProfile } from "@/reducers/authSlice"; // Import the updateProfile action
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Image from "next/image";

type UserProfileData = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone_number: string | null;
  username: string;
  address_line: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  date_of_birth: string | null;
  gender: string | null;
  profile_image: string | null; // Allowing null for profile_image and File type
  role: string;
  user_type: string | null;
  profile_completion: number;
  last_login: string | null;
  is_verified: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  is_active: boolean;
  alternate_phone: string | null;
  emergency_contact: string | null;
  landmark: string | null;
  pincode: string | null;
  notification_preferences: Record<string, unknown>; // Changed to non-optional
  facebook_profile: string | null;
  instagram_handle: string | null;
  twitter_handle: string | null;
  linkedin_profile: string | null;
  last_login_ip: string | null;
  last_updated: string;
  created_at: string;
  last_password_change: string | null;
  id_proof_type: string | null;
  id_proof_number: string | null;
  failed_login_attempts: number;
};

const EditProfilePage = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { user, loading: userLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const [profileData, setProfileData] = useState<UserProfileData>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    username: "",
    address_line: "",
    city: "",
    state: "",
    country: "",
    date_of_birth: "",
    gender: "",
    profile_image: null,
    role: "",
    user_type: "",
    profile_completion: 0,
    last_login: "",
    is_verified: false,
    email_verified: true,
    phone_verified: true,
    is_active: true,
    alternate_phone: "",
    emergency_contact: "",
    landmark: "",
    pincode: "",
    notification_preferences: {}, // Ensure this is always initialized
    facebook_profile: "",
    instagram_handle: "",
    twitter_handle: "",
    linkedin_profile: "",
    last_login_ip: "",
    last_updated: "",
    created_at: "",
    last_password_change: "",
    id_proof_type: "",
    id_proof_number: "",
    failed_login_attempts: 0,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  // Fetch user data on component mount
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      fetchUserData(token);
    }
  });

  const fetchUserData = (token: string) => {
    try {
      const decoded: { user_id: string } = jwtDecode(token);
      if (decoded?.user_id) {
        dispatch(fetchUserById(Number(decoded.user_id))); // Dispatch action to fetch user
      }
    } catch (err) {
      console.error("Failed to decode token", err);
    }
  };

  // Update form data when user data is fetched
  useEffect(() => {
    if (user) {
      setProfileData({
        id: user.id,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        username: user.username || "",
        address_line: user.address_line || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
        date_of_birth: user.date_of_birth || "",
        gender: user.gender || "",
        profile_image: null,
        role: user.role || "",
        user_type: user.user_type || "",
        profile_completion: user.profile_completion || 0,
        last_login: user.last_login ? new Date(user.last_login).toISOString() : new Date().toISOString(),
        is_verified: user.is_verified || false,
        email_verified: user.email_verified || false,
        phone_verified: user.phone_verified || false,
        is_active: user.is_active || false,
        alternate_phone: user.alternate_phone || "",
        emergency_contact: user.emergency_contact || "",
        landmark: user.landmark || "",
        pincode: user.pincode || "",
        notification_preferences: typeof user.notification_preferences === 'string' ? JSON.parse(user.notification_preferences) : user.notification_preferences || {}, // Ensure this is always initialized
        facebook_profile: user.facebook_profile || "",
        instagram_handle: user.instagram_handle || "",
        twitter_handle: user.twitter_handle || "",
        linkedin_profile: user.linkedin_profile || "",
        last_login_ip: user.last_login_ip || "",
        last_updated: user.last_updated ? new Date(user.last_updated).toISOString() : new Date().toISOString(),
        created_at: user.created_at ? new Date(user.created_at).toISOString() : new Date().toISOString(),
        last_password_change: user.last_password_change ? new Date(user.last_password_change).toISOString() : new Date().toISOString(),
        id_proof_type: user.id_proof_type || "",
        id_proof_number: user.id_proof_number || "",
        failed_login_attempts: user.failed_login_attempts
      });
      if (user.profile_image) {
        setImagePreview(user.profile_image);
      }
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          profile_image: reader.result as string,
        }));
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field: keyof UserProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      console.error("User ID is missing");
      return;
    }

    const updatedProfileData = { ...profileData };

    if (profileImageFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        updatedProfileData.profile_image = reader.result as string;

        try {
          console.log("profileData", updatedProfileData);
          await dispatch(updateProfile({ userId: user.id, userData: updatedProfileData })); // Ensure user.id is passed
          router.push("/dashboard/profile");
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      };
      reader.readAsDataURL(profileImageFile);
    } else {
      try {
        console.log("profileData", updatedProfileData);
        await dispatch(updateProfile({ userId: user.id, userData: updatedProfileData })); // Ensure user.id is passed
        router.push("/dashboard/profile");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const formFields = [
    { label: "First Name", id: "first_name", type: "text" },
    { label: "Last Name", id: "last_name", type: "text" },
    { label: "Email", id: "email", type: "email" },
    { label: "Phone Number", id: "phone_number", type: "tel" },
    { label: "Username", id: "username", type: "text" },
    { label: "Address", id: "address_line", type: "text" },
    { label: "City", id: "city", type: "text" },
    { label: "State", id: "state", type: "text" },
    { label: "Country", id: "country", type: "text" },
    { label: "Date of Birth", id: "date_of_birth", type: "date" },
    {
      label: "Gender",
      id: "gender",
      type: "select",
      options: ["Male", "Female"],
    },
    {
      label: "User Role",
      id: "role",
      type: "select",
      options: ["Merchant", "client"],
    },
    {
      label: "User Type",
      id: "user_type",
      type: "select",
      options: ["Merchant", "client"],
    },
  ];

  if (userLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit}>
        {/* Profile Image Upload */}
        <div className="mb-6">
          <label className="block text-base font-medium text-gray-700">
            Profile Image
          </label>
          <div className="mt-2 flex items-center gap-4">
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full"
                width={128}
                height={128}
              />
            )}
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2  focus:ring-customGold"
            
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map(({ label, id, type, options }) => (
            <div key={id} className="mb-4">
              <label
                htmlFor={id}
                className="block text-base font-medium text-gray-700 "
              >
                {label}
              </label>
              {type === "select" ? (
                <select
                  id={id}
                  value={profileData[id as keyof UserProfileData]}
                  onChange={(e) =>
                    handleChange(id as keyof UserProfileData, e.target.value)
                  }
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2  focus:ring-customGold"
                >
                  <option value="">Select {label}</option>
                  {options?.map((option) => (
                    <option key={option} value={option.toLowerCase()}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  id={id}
                  value={profileData[id as keyof UserProfileData]}
                  onChange={(e) =>
                    handleChange(id as keyof UserProfileData, e.target.value)
                  }
                  className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-customGold"
                />
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mt-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#B8902E] text-white py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
