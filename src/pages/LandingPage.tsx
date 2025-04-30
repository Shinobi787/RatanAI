import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TelegramLoginButton from '../components/auth/TelegramLoginButton';
import DiscordButton from '../components/ui/DiscordButton';
import { ArrowRight, DollarSign, BarChart2, MessageSquareText, Zap } from 'lucide-react';
import HeroImage from '../components/ui/HeroImage';
import FeatureCard from '../components/ui/FeatureCard';
import { useAuth } from '../contexts/AuthContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const discordWebhookUrl = "https://discord.com/api/webhooks/1366968571883946007/onT9EA4dajbASPb7Jb3FritPyeR-d8s073HYVe89cY3A6LM8mrNDyGCXfIFx-4BP5mwM";

  // Redirect if already logged in
  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <DollarSign className="w-8 h-8 text-emerald-500" />,
      title: "Expense Tracking",
      description: "Automatically extract and categorize expenses from UPI screenshots and bank statements."
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-emerald-500" />,
      title: "Financial Insights",
      description: "Get personalized insights and analytics on your spending habits and patterns."
    },
    {
      icon: <MessageSquareText className="w-8 h-8 text-emerald-500" />,
      title: "Daily Tips",
      description: "Receive daily financial tips and advice tailored to your spending habits."
    },
    {
      icon: <Zap className="w-8 h-8 text-emerald-500" />,
      title: "No App Needed",
      description: "All features are available directly in Telegram. No need to install another app."
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container-custom">
          <motion.div 
            ref={heroRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div>
              <motion.span 
                className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-900 font-medium text-sm mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Financial Management Made Simple
              </motion.span>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Track Expenses <span className="gradient-text">Effortlessly</span> in Telegram
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-700 mb-8"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                RatanAI analyzes your UPI screenshots & bank statements to provide personalized financial insights—directly in Telegram. No extra apps needed.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <TelegramLoginButton />
                <DiscordButton webhookUrl={discordWebhookUrl} />
                <a 
                  href="#features" 
                  className="btn-outline"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <HeroImage />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div 
            ref={featuresRef}
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Why Choose RatanAI?</h2>
            <p className="text-lg text-gray-700">
              Our AI-powered financial assistant helps you manage your finances without the hassle of complicated apps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              >
                <FeatureCard 
                  icon={feature.icon} 
                  title={feature.title} 
                  description={feature.description} 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-indigo-900 text-white">
        <div className="container-custom">
          <motion.div 
            ref={ctaRef}
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Ready to Take Control of Your Finances?</h2>
            <p className="text-lg text-indigo-100 mb-8">
              Join thousands of users who are tracking their expenses and gaining financial insights with RatanAI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <TelegramLoginButton className="btn-secondary" />
              <a 
                href="https://t.me/RatanAI_Bot"
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-indigo-900 hover:bg-indigo-50 py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                Open Bot on Telegram <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;