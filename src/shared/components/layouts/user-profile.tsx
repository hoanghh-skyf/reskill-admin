"use client";

import Image from "next/image";

interface UserProfileProps {
  name: string;
  userRole: string;
  avatarUrl: string;
}

const UserProfile = ({ name, userRole, avatarUrl }: UserProfileProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:flex flex-col items-end">
        <span className="text-sm font-semibold text-gray-900 leading-none">
          {name}
        </span>
        <span className="text-xs text-gray-500 mt-1">{userRole}</span>
      </div>
      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 shadow-sm">
        <Image src={avatarUrl} alt={name} fill className="object-cover" />
      </div>
    </div>
  );
};

export default UserProfile;
