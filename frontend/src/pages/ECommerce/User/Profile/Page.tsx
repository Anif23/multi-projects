// src/pages/User/Profile/index.tsx

import { useEffect, useState, type ChangeEvent } from "react";
import {
  User,
  Heart,
  ShoppingCart,
  Package,
  Lock,
  Save,
} from "lucide-react";

import {
  useProfile,
  useUpdateProfile,
  useChangePassword,
} from "../../../../hooks/user/useProfile";

import StatsCard from "../../../../components/Ecommerce/StatsCard";
import InputField from "../../../../components/Ecommerce/Forms/InputField";
import toast from "react-hot-toast";

const UserProfile = () => {
  const {
    data: user,
    isLoading,
  } = useProfile();

  const updateProfile =
    useUpdateProfile();

  const changePassword =
    useChangePassword();

  const [profile, setProfile] =
    useState({
      username: "",
      email: "",
    });

  const [password, setPassword] =
    useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  useEffect(() => {
    if (user) {
      setProfile({
        username:
          user.username || "",
        email:
          user.email || "",
      });
    }
  }, [user]);

  const handleProfile = () => {
    if (!profile.username || !profile.email) {
      return toast.error(
        "Username and email are required"
      );
    }

    updateProfile.mutate(
      profile
    );
  };

  const handlePassword = () => {
    if (
      !password.oldPassword ||
      !password.newPassword ||
      !password.confirmPassword
    ) {
      return toast.error(
        "All fields are required"
      );
    }

    if (
      password.newPassword.length < 6
    ) {
      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    if (
      password.newPassword !==
      password.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match"
      );
    }

    changePassword.mutate(
      {
        oldPassword:
          password.oldPassword,
        newPassword:
          password.newPassword,
      },
      {
        onSuccess: () => {
          setPassword({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        },
      }
    );
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="space-y-6">

          <div className="bg-white rounded-3xl border shadow-sm p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-black text-white text-3xl font-bold flex items-center justify-center mx-auto">
              {user.username
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              {user.username}
            </h2>

            <p className="text-gray-500">
              {user.email}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              {user.role}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <StatsCard
              title="Cart"
              value={
                user.cartCount || 0
              }
              icon={
                <ShoppingCart size={18} />
              }
            />

            <StatsCard
              title="Wishlist"
              value={
                user.wishlistCount ||
                0
              }
              icon={
                <Heart size={18} />
              }
            />

            <StatsCard
              title="Orders"
              value={
                user.orderCount || 0
              }
              icon={
                <Package size={18} />
              }
            />
          </div>

          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <p className="text-sm text-gray-500">
              Member Since
            </p>

            <h3 className="font-bold mt-2">
              {new Date(
                user.createdAt
              ).toLocaleDateString()}
            </h3>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6">

          {/* PROFILE */}
          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <User size={18} />
              <h2 className="text-xl font-bold">
                Update Profile
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Username"
                value={
                  profile.username
                }
                onChange={(
                  e: ChangeEvent<HTMLInputElement>
                ) =>
                  setProfile({
                    ...profile,
                    username:
                      e.target.value,
                  })
                }
              />

              <InputField
                label="Email"
                type="email"
                value={
                  profile.email
                }
                onChange={(
                  e: ChangeEvent<HTMLInputElement>
                ) =>
                  setProfile({
                    ...profile,
                    email:
                      e.target.value,
                  })
                }
              />
            </div>

            <button
              onClick={
                handleProfile
              }
              disabled={
                updateProfile.isPending
              }
              className="mt-5 h-12 px-6 rounded-2xl bg-black text-white flex items-center gap-2"
            >
              <Save size={16} />
              {updateProfile.isPending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>

          {/* PASSWORD */}
          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Lock size={18} />
              <h2 className="text-xl font-bold">
                Change Password
              </h2>
            </div>

            <div className="grid gap-4">
              <InputField
                label="Old Password"
                type="password"
                value={
                  password.oldPassword
                }
                onChange={(e) =>
                  setPassword({
                    ...password,
                    oldPassword:
                      e.target.value,
                  })
                }
              />

              <InputField
                label="New Password"
                type="password"
                value={
                  password.newPassword
                }
                onChange={(e) =>
                  setPassword({
                    ...password,
                    newPassword:
                      e.target.value,
                  })
                }
              />

              <InputField
                label="Confirm Password"
                type="password"
                value={
                  password.confirmPassword
                }
                onChange={(e) =>
                  setPassword({
                    ...password,
                    confirmPassword:
                      e.target.value,
                  })
                }
              />
            </div>

            <button
              onClick={
                handlePassword
              }
              disabled={
                changePassword.isPending
              }
              className="mt-5 h-12 px-6 rounded-2xl bg-black text-white"
            >
              {changePassword.isPending
                ? "Updating..."
                : "Update Password"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;