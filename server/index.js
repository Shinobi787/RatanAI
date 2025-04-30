import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { initializeApp } from 'firebase/app';
import { getAuth, createCustomToken } from 'firebase/auth';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Firebase config
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Verify Telegram login data
const verifyTelegramLogin = (telegramData) => {
  // This is a placeholder - in production, implement proper verification
  // as described in the TelegramAuth.ts file
  
  // Check if auth_date is recent
  const authTimestamp = telegramData.auth_date * 1000; // Convert to milliseconds
  const now = Date.now();
  const oneDay = 86400 * 1000; // 24 hours in milliseconds
  
  if (now - authTimestamp > oneDay) {
    console.error('Auth date is too old');
    return false;
  }
  
  // For demo purposes, we'll just return true
  return true;
};

// Routes
app.post('/auth/telegram', async (req, res) => {
  try {
    const telegramData = req.body;
    
    // Verify Telegram auth data
    const isValid = verifyTelegramLogin(telegramData);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid authentication data' });
    }
    
    // Generate a custom Firebase token using the Telegram ID as the UID
    const uid = `telegram:${telegramData.id}`;
    const customToken = await createCustomToken(auth, uid);
    
    return res.status(200).json({ token: customToken });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});