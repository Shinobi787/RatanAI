import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface TelegramLoginButtonProps {
  className?: string;
}

interface TelegramAuthData {
  id: number;
  first_name: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

declare global {
  interface Window {
    onTelegramAuth: (user: TelegramAuthData) => void;
  }
}

const TelegramLoginButton: React.FC<TelegramLoginButtonProps> = ({ className = 'btn-primary' }) => {
  const navigate = useNavigate();
  const { loginWithTelegram } = useAuth();
  const telegramButtonRef = React.useRef<HTMLDivElement>(null);
  
  const handleTelegramClick = () => {
    window.open('https://t.me/RatanAI_Bot', '_blank');
  };
  
  return (
    <button 
      onClick={handleTelegramClick}
      className={className}
    >
      <Send className="w-5 h-5" /> Open Bot on Telegram
    </button>
  );
};

export default TelegramLoginButton;