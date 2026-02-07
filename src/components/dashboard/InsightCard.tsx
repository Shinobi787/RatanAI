import React from 'react';
import { motion } from 'framer-motion';

interface InsightCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
  icon: React.ReactNode;
}

const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  value, 
  change, 
  trend, 
  description,
  icon
}) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-600 font-medium text-sm">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="bg-indigo-50 p-3 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="flex items-center">
        <span className={`text-sm font-medium mr-2 ${
          trend === 'up' 
            ? 'text-red-600' 
            : trend === 'down' 
              ? 'text-emerald-600' 
              : 'text-gray-600'
        }`}>
          {change}
        </span>
        {trend !== 'neutral' && (
          <svg 
            className={`w-3 h-3 ${
              trend === 'up' ? 'text-red-600' : 'text-emerald-600'
            }`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={trend === 'up' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} 
            />
          </svg>
        )}
        <span className="text-xs text-gray-500 ml-2">{description}</span>
      </div>
    </motion.div>
  );
};

export default InsightCard;