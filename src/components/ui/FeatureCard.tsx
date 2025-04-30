import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="card hover:border-l-4 hover:border-l-emerald-500 group"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="mb-4 p-3 rounded-full bg-emerald-50 inline-block">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-indigo-900 group-hover:text-emerald-500 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;