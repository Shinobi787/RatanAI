# RatanAI - Financial Assistant for Telegram

RatanAI is a powerful financial assistant that helps users track expenses from UPI screenshots and bank statements directly through Telegram.

![RatanAI Preview](https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=600)

## Features

- **Telegram Integration**: Seamless login using Telegram credentials
- **Expense Tracking**: Automatically extract and categorize expenses from UPI screenshots and bank statements
- **Financial Insights**: Get personalized insights and analytics on spending habits
- **Daily Tips**: Receive daily financial tips tailored to spending patterns
- **No Extra Apps**: All features available directly in Telegram

## Tech Stack

- **Frontend**: React (Vite), TypeScript, TailwindCSS, Framer Motion
- **Backend**: Express, Firebase Authentication, Firestore
- **Authentication**: Telegram Login Widget, JWT
- **Deployment**: Frontend on Vercel/Netlify, Backend on AWS Lightsail/Render

## Getting Started

### Prerequisites

- Node.js 16+
- A Telegram Bot (for authentication)
- Firebase project

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ratanai.git
cd ratanai
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example` and fill in your configuration

4. Start the development server
```bash
npm run dev
```

5. In a separate terminal, start the backend server
```bash
npm run server
```

## Telegram Login Configuration

1. Create a Telegram bot using [BotFather](https://t.me/botfather)
2. Configure your bot and obtain the bot token
3. Add the domain of your website to the allowed domains in BotFather using the `/setdomain` command
4. Set up the Telegram Login Widget in your application (already implemented)

## Firebase Setup

1. Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication (custom authentication)
3. Create a Firestore database
4. Add your Firebase configuration to the `.env` file

## Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend
```bash
npm run build
```

2. Deploy to Vercel or Netlify (manual or CI/CD)

### Backend (AWS Lightsail/Render)

1. Set up your AWS Lightsail instance or Render service
2. Deploy the backend server
3. Configure environment variables on your hosting platform

## Security Considerations

- Always validate Telegram authentication data on the server side
- Use HTTPS everywhere
- Implement proper error handling and logging
- Regularly update dependencies

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Telegram Login Widget](https://core.telegram.org/widgets/login)
- [Firebase](https://firebase.google.com)
- [React](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com)