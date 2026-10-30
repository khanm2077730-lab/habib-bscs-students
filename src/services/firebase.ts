import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDoHk0kE0GJ-0lr2Lskp5lq0DyI9zyB6Wk",
  authDomain: "habib-bscs-students.firebaseapp.com",
  projectId: "habib-bscs-students",
  storageBucket: "habib-bscs-students.firebasestorage.app",
  messagingSenderId: "275019448352",
  appId: "1:275019448352:web:d9101379f6460ff2417c45"
};

// Initialize Firebase once
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * Maps Firebase Auth error codes to helpful, user-friendly messages
 */
export function getAuthErrorMessage(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Please sign in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/operation-not-allowed':
      return 'Email/Password authentication is not yet enabled in your Firebase Console. Go to Firebase Console -> Authentication -> Sign-in method and enable "Email/Password".';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/user-disabled':
      return 'This user account has been disabled. Please contact support.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please verify your credentials.';
    case 'auth/too-many-requests':
      return 'Access to this account has been temporarily disabled due to many failed login attempts. Please reset your password or try again later.';
    case 'auth/network-request-failed':
      return 'Network error occurred. Please check your internet connection.';
    default:
      return 'An error occurred during authentication. Please try again.';
  }
}
