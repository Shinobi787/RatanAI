import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../contexts/AuthContext';

interface UserData {
  telegramId: number;
  firstName: string;
  username?: string;
  photoUrl?: string;
  lastLogin: Date;
}

/**
 * Save or update a Telegram user's information in Firestore
 */
export const saveTelegramUser = async (userData: UserData): Promise<void> => {
  try {
    // Check if user already exists by Telegram ID
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('telegramId', '==', userData.telegramId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Create new user
      const newUserRef = doc(collection(db, 'users'));
      await setDoc(newUserRef, {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('New user created with ID:', newUserRef.id);
    } else {
      // Update existing user
      const userDoc = querySnapshot.docs[0];
      await updateDoc(userDoc.ref, {
        ...userData,
        updatedAt: new Date()
      });
      console.log('User updated with ID:', userDoc.id);
    }
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

/**
 * Get Telegram user data by Firebase user ID
 */
export const getTelegramUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

/**
 * Get a user's financial data (mock data for demonstration)
 */
export const getUserFinancialData = async (userId: string) => {
  // In a real application, this would fetch actual data from Firestore
  // For demo purposes, we'll return mock data
  
  return {
    monthlySpending: 24560,
    previousMonthSpending: 27890,
    categories: [
      { name: 'Food', amount: 8245 },
      { name: 'Transport', amount: 3500 },
      { name: 'Shopping', amount: 6800 },
      { name: 'Entertainment', amount: 2100 },
      { name: 'Others', amount: 3915 }
    ],
    recentTransactions: [
      { 
        id: '1', 
        title: 'Amazon',
        amount: 1299,
        category: 'Shopping',
        date: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      { 
        id: '2', 
        title: 'Uber', 
        amount: 450,
        category: 'Transport',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago 
      },
      { 
        id: '3', 
        title: 'Zomato', 
        amount: 845,
        category: 'Food',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      }
    ]
  };
};