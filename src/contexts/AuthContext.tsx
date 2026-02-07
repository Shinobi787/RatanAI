import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithCustomToken, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { verifyTelegramLogin } from '../utils/telegramAuth';
import { getTelegramUserData, saveTelegramUser } from '../services/userService';

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-auth-domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-storage-bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "your-messaging-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

interface TelegramUserData {
  id: number;
  first_name: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface UserData {
  telegramId: number;
  firstName: string;
  username?: string;
  photoUrl?: string;
  lastLogin: Date;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  isInitialized: boolean;
  loginWithTelegram: (telegramAuthData: TelegramUserData) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const userData = await getTelegramUserData(user.uid);
          setUserData(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData(null);
      }
      
      setIsInitialized(true);
    });

    return unsubscribe;
  }, []);

  const loginWithTelegram = async (telegramAuthData: TelegramUserData) => {
    try {
      // Verify Telegram auth data
      const isValid = verifyTelegramLogin(telegramAuthData);
      
      if (!isValid) {
        throw new Error('Invalid Telegram authentication data');
      }
      
      // Get JWT token from backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/telegram`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(telegramAuthData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to authenticate with backend');
      }
      
      const { token } = await response.json();
      
      // Sign in with custom token
      await signInWithCustomToken(auth, token);
      
      // Save user data
      await saveTelegramUser({
        telegramId: telegramAuthData.id,
        firstName: telegramAuthData.first_name,
        username: telegramAuthData.username,
        photoUrl: telegramAuthData.photo_url,
        lastLogin: new Date(),
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    currentUser,
    userData,
    isInitialized,
    loginWithTelegram,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};