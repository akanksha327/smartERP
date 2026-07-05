'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  signInWithPopup,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  bypassLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isConfigError = (error: any) => {
    const code = error?.code || '';
    return [
      'auth/operation-not-allowed',
      'auth/configuration-not-found',
      'auth/invalid-api-key',
      'auth/api-key-not-valid',
      'auth/unauthorized-domain'
    ].includes(code);
  };

  const login = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      if (isConfigError(error)) {
        console.warn('Firebase login failed due to config. Falling back to local mode.', error);
        setUser({
          uid: 'local-bypass-user',
          email: email,
          displayName: email.split('@')[0],
          emailVerified: true
        } as any);
        return;
      }
      throw error;
    }
  };

  const register = async (email: string, pass: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
        setUser({ ...userCredential.user, displayName: name });
      }
    } catch (error: any) {
      if (isConfigError(error)) {
        console.warn('Firebase registration failed due to config. Falling back to local mode.', error);
        setUser({
          uid: 'local-bypass-user',
          email: email,
          displayName: name,
          emailVerified: true
        } as any);
        return;
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.warn('Firebase logout failed, signing out locally.', error);
    }
    setUser(null);
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (isConfigError(error)) {
        console.warn('Firebase Google login failed due to config. Falling back to local mode.', error);
        setUser({
          uid: 'local-bypass-user',
          email: 'google.user@smarterp.com',
          displayName: 'Google User (Local)',
          emailVerified: true
        } as any);
        return;
      }
      throw error;
    }
  };

  const bypassLogin = () => {
    setUser({
      uid: 'bypass-user',
      email: 'admin@smarterp.com',
      displayName: 'Admin (Demo Mode)',
      emailVerified: true
    } as any);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loginWithGoogle, bypassLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
