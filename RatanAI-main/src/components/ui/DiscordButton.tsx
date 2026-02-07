import React from 'react';
import { MessageSquare } from 'lucide-react';

interface DiscordButtonProps {
  className?: string;
  webhookUrl: string;
}

const DiscordButton: React.FC<DiscordButtonProps> = ({ 
  className = 'btn-secondary', 
  webhookUrl 
}) => {
  const handleDiscordClick = () => {
    window.open(webhookUrl, '_blank');
  };

  return (
    <button 
      onClick={handleDiscordClick}
      className={className}
    >
      <MessageSquare className="w-5 h-5" /> Join on Discord
    </button>
  );
};

export default DiscordButton;