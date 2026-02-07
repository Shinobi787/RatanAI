import React from 'react';

interface ActivityCardProps {
  title: string;
  description: string;
  time: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, description, time }) => {
  return (
    <div className="border-l-2 border-indigo-200 pl-4 pb-1 relative hover:border-indigo-500 transition-colors">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-200 border-2 border-white"></div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      <p className="text-xs text-gray-500 mt-2">{time}</p>
    </div>
  );
};

export default ActivityCard;