import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import crypto from 'crypto';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
let serviceAccount;
try {
  // Check if service account path is provided in env or default to service-account.json
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || './service-account.json';
  if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  } else {
    console.warn(`Service account file not found at ${serviceAccountPath}. Using default credentials or environment variables if available.`);
  }
} catch (error) {
  console.error("Error loading service account:", error);
}

const firebaseConfig = {
  credential: serviceAccount ? cert(serviceAccount) : undefined,
  // If not using service account file, it will fall back to Google Application Default Credentials
};

try {
  initializeApp(firebaseConfig);
  console.log("Firebase Admin initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase Admin:", error);
}


// Verify Telegram login data
const verifyTelegramLogin = (telegramData) => {
  const { hash, ...data } = telegramData;
  
  if (!hash || !process.env.TELEGRAM_BOT_TOKEN) {
    console.error('Missing hash or bot token');
    return false;
  }

  // check if auth_date is recent
  const authTimestamp = data.auth_date * 1000;
  const now = Date.now();
  const oneDay = 86400 * 1000;
  if (now - authTimestamp > oneDay) {
     console.error('Auth date is too old');
     return false;
  }

  // Create the data-check-string
  const dataCheckString = Object.keys(data)
    .sort()
    .map(key => `${key}=${data[key]}`)
    .join('\n');

  // Compute the HMAC-SHA-256 signature
  const secretKey = crypto.createHash('sha256')
    .update(process.env.TELEGRAM_BOT_TOKEN)
    .digest();
  
  const hmac = crypto.createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  return hmac === hash;
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
    
    // Create custom token
    const customToken = await getAuth().createCustomToken(uid);
    
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