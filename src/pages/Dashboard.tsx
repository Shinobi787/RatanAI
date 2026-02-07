import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { ArrowUpRight, FilePieChart, MessagesSquare, Settings, TrendingUp } from 'lucide-react';
import ProfileSection from '../components/dashboard/ProfileSection';
import InsightCard from '../components/dashboard/InsightCard';
import ActivityCard from '../components/dashboard/ActivityCard';

// Dashboard Tab Components
const Overview = () => {
  const { userData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const insights = [
    {
      title: "Monthly Spending",
      value: "₹24,560",
      change: "-12%",
      trend: "down",
      description: "vs. last month",
      icon: <FilePieChart className="h-6 w-6 text-emerald-500" />
    },
    {
      title: "Largest Category",
      value: "Food",
      change: "₹8,245",
      trend: "neutral",
      description: "32% of total",
      icon: <TrendingUp className="h-6 w-6 text-indigo-500" />
    }
  ];

  const activities = [
    {
      title: "UPI Transaction Analyzed",
      description: "Payment to Amazon of ₹1,299 categorized as Shopping",
      time: "2 hours ago"
    },
    {
      title: "Financial Tip",
      description: "Try the 50/30/20 budget rule for better financial planning",
      time: "Yesterday"
    },
    {
      title: "Bank Statement Analyzed",
      description: "HDFC statement for April analyzed successfully",
      time: "3 days ago"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Welcome back, {userData?.firstName || 'User'}!</h2>
        <p className="text-gray-600">Here's a summary of your financial activities.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <InsightCard key={index} {...insight} />
        ))}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
          <button className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:text-indigo-800 transition-colors">
            View All <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <ActivityCard key={index} {...activity} />
          ))}
        </div>
      </div>
      
      <div className="bg-indigo-50 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-100 p-3 rounded-lg">
            <MessagesSquare className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Continue on Telegram</h3>
            <p className="text-gray-600 mb-4">
              For the best experience, continue tracking your expenses and receiving insights directly in Telegram.
            </p>
            <a 
              href={`https://t.me/RatanAI_Bot?start=user_${userData?.telegramId}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              Open Bot on Telegram <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsComponent = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Account Settings</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Daily Tips</p>
              <p className="text-sm text-gray-600">Receive daily financial tips in Telegram</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-900"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Spending Alerts</p>
              <p className="text-sm text-gray-600">Get notified when you exceed category budgets</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-900"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Monthly Reports</p>
              <p className="text-sm text-gray-600">Receive monthly spending summary</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-900"></div>
            </label>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Privacy</h3>
        <p className="text-gray-600 mb-4">
          Control how your financial data is stored and used.
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Data Anonymization</p>
              <p className="text-sm text-gray-600">Anonymize personal details in financial data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-900"></div>
            </label>
          </div>
          
          <button className="text-red-500 font-medium hover:text-red-700 transition-colors text-sm">
            Delete All My Data
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Navigate to the overview on first render
    navigate('/dashboard/overview', { replace: true });
  }, []);
  
  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <ProfileSection 
                name={userData?.firstName || 'User'}
                username={userData?.username || 'user'} 
                photoUrl={userData?.photoUrl}
              />
            </div>
            
            <nav className="bg-white rounded-xl shadow-sm p-4">
              <ul className="space-y-1">
                <li>
                  <NavLink
                    to="/dashboard/overview"
                    className={({ isActive }) => 
                      `flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-indigo-50 text-indigo-900' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span>Overview</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/settings"
                    className={({ isActive }) => 
                      `flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-indigo-50 text-indigo-900' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </NavLink>
                </li>
                <li>
                  <a
                    href={`https://t.me/RatanAI_Bot?start=user_${userData?.telegramId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <MessagesSquare className="h-5 w-5" />
                    <span>Open in Telegram</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Routes>
              <Route path="/overview" element={<Overview />} />
              <Route path="/settings" element={<SettingsComponent />} />
              <Route path="*" element={<Overview />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;