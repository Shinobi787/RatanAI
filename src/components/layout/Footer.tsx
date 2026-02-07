import React from 'react';
import { NavLink } from 'react-router-dom';
import { Send, Twitter, Facebook, Instagram, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-indigo-950 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - Logo and Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-500 p-2 rounded">
                <Send className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">RatanAI</span>
            </div>
            <p className="text-indigo-200 mb-4">
              RatanAI helps you track expenses and gain financial insights directly through Telegram. No extra apps needed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-indigo-200 hover:text-white transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/#features" className="text-indigo-200 hover:text-white transition-colors">
                  Features
                </NavLink>
              </li>
              <li>
                <a href="https://t.me/RatanAI_Bot" className="text-indigo-200 hover:text-white transition-colors">
                  Telegram Bot
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/privacy" className="text-indigo-200 hover:text-white transition-colors">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms" className="text-indigo-200 hover:text-white transition-colors">
                  Terms of Service
                </NavLink>
              </li>
              <li>
                <NavLink to="/cookies" className="text-indigo-200 hover:text-white transition-colors">
                  Cookie Policy
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-indigo-200 mb-2">
              Have questions or feedback? Reach out to us!
            </p>
            <a 
              href="mailto:support@ratanai.com" 
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              support@ratanai.com
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-indigo-900 text-indigo-300 text-sm text-center">
          <p>
            © {currentYear} RatanAI. All rights reserved. Made with <Heart className="h-4 w-4 inline text-red-400" /> in India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;