import React from 'react';

interface ProfileSectionProps {
  name: string;
  username: string;
  photoUrl?: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ name, username, photoUrl }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        {photoUrl ? (
          <img 
            src={photoUrl} 
            alt={name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-900 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="absolute bottom-0 right-0 bg-emerald-500 h-5 w-5 rounded-full border-2 border-white"></div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600 mb-4">@{username}</p>
      <a 
        href={`https://t.me/${username}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        View Telegram Profile
      </a>
    </div>
  );
};

export default ProfileSection;