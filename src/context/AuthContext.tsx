import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, getAuthErrorMessage } from '../services/firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  rollNumber?: string;
  createdAt?: string;
  lastLoginAt?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  authError: string | null;
  authErrorCode: string | null;
  signUp: (email: string, password: string, fullName: string, rollNumber?: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authErrorCode, setAuthErrorCode] = useState<string | null>(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch or create profile doc in Firestore
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            const fallbackProfile: UserProfile = {
              uid: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'BSCS Student',
              createdAt: new Date().toISOString()
            };
            setUserProfile(fallbackProfile);
            // Save to Firestore
            await setDoc(userDocRef, {
              ...fallbackProfile,
              lastLoginAt: serverTimestamp()
            }, { merge: true });
          }
        } catch (err) {
          console.warn('Could not read user profile from Firestore:', err);
          setUserProfile({
            uid: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'BSCS Student',
            createdAt: new Date().toISOString()
          });
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearAuthError = () => {
    setAuthError(null);
    setAuthErrorCode(null);
  };

  // Sign Up
  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    rollNumber?: string
  ): Promise<boolean> => {
    clearAuthError();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const newUser = userCredential.user;

      // Update auth profile display name
      await updateProfile(newUser, {
        displayName: fullName.trim()
      });

      const profileData: UserProfile = {
        uid: newUser.uid,
        email: newUser.email || email.trim(),
        displayName: fullName.trim(),
        rollNumber: rollNumber?.trim() || '',
        createdAt: new Date().toISOString()
      };

      setUserProfile(profileData);

      // Persist to Firestore
      try {
        await setDoc(doc(db, 'users', newUser.uid), {
          ...profileData,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp()
        });
      } catch (e) {
        console.warn('Failed saving initial profile to Firestore:', e);
      }

      return true;
    } catch (err: any) {
      const code = err?.code || 'auth/unknown';
      setAuthErrorCode(code);
      setAuthError(getAuthErrorMessage(code));
      return false;
    }
  };

  // Sign In
  const signIn = async (email: string, password: string): Promise<boolean> => {
    clearAuthError();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      // Update last login
      try {
        await setDoc(
          doc(db, 'users', userCredential.user.uid),
          { lastLoginAt: serverTimestamp() },
          { merge: true }
        );
      } catch (e) {
        // ignore non-critical update errors
      }
      return true;
    } catch (err: any) {
      const code = err?.code || 'auth/unknown';
      setAuthErrorCode(code);
      setAuthError(getAuthErrorMessage(code));
      return false;
    }
  };

  // Sign Out
  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
      clearAuthError();
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  // Password Reset
  const resetPassword = async (
    email: string
  ): Promise<{ success: boolean; message: string }> => {
    clearAuthError();
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return {
        success: true,
        message: 'Password reset link sent! Please check your email inbox and spam folder.'
      };
    } catch (err: any) {
      const code = err?.code || 'auth/unknown';
      setAuthErrorCode(code);
      const friendly = getAuthErrorMessage(code);
      setAuthError(friendly);
      return {
        success: false,
        message: friendly
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        authError,
        authErrorCode,
        signUp,
        signIn,
        signOut,
        resetPassword,
        clearAuthError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
