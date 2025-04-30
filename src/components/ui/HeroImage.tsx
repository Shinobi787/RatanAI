import React from 'react';
import { motion } from 'framer-motion';

const HeroImage: React.FC = () => {
  return (
    <div className="relative">
      {/* Main phone mockup */}
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 5,
          ease: "easeInOut" 
        }}
      >
        <div className="bg-indigo-900 rounded-3xl overflow-hidden shadow-2xl border-8 border-indigo-950">
          <img 
            src="https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="RatanAI Bot in Telegram"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent flex items-end p-6">
            <div className="w-full">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">R</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 w-full">
                  <p className="text-white text-sm font-medium">RatanAI</p>
                  <p className="text-white/80 text-xs">You spent ₹3,240 on food this month, which is 15% less than last month. Great job! 🎉</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">R</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 w-full">
                  <p className="text-white text-sm font-medium">RatanAI</p>
                  <p className="text-white/80 text-xs">Here's your daily tip: Setting aside just ₹100 per day can add up to ₹36,500 in a year! 💡</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-500 rounded-full opacity-30 blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 8,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute top-1/4 -right-4 w-24 h-24 bg-indigo-600 rounded-full opacity-20 blur-xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 7,
          ease: "easeInOut",
          delay: 1 
        }}
      />
    </div>
  );
};

export default HeroImage;