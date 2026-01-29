import React, { createContext, useContext, useState, useEffect } from 'react';
import { signIn, signUp, signOut, getCurrentUser, confirmSignUp, fetchUserAttributes } from 'aws-amplify/auth';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      setUser({
        username: currentUser.username,
        userId: currentUser.userId,
        email: attributes.email,
        name: attributes.name || attributes.email
      });
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  // Sign up new user
  async function signup(email, password, name) {
    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name
          }
        }
      });
      return { success: true };
    } catch (err) {
      throw new Error(err.message || 'Failed to create account');
    }
  }

  // Confirm sign up with verification code
  async function confirmSignup(email, code) {
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code
      });
      return { success: true };
    } catch (err) {
      throw new Error(err.message || 'Invalid verification code');
    }
  }

  // Sign in existing user
  async function login(email, password) {
    try {
      // Check if there's already a signed-in user and sign them out first
      try {
        await getCurrentUser();
        // If we get here, a user is already signed in - sign them out
        await signOut();
        setUser(null);
      } catch {
        // No user signed in, continue with login
      }

      await signIn({
        username: email,
        password
      });

      // Fetch user info after successful login
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      setUser({
        username: currentUser.username,
        userId: currentUser.userId,
        email: attributes.email,
        name: attributes.name || attributes.email
      });

      return { success: true };
    } catch (err) {
      throw new Error(err.message || 'Failed to login');
    }
  }

  // Sign out user
  async function logout() {
    try {
      await signOut();
      setUser(null);
      window.location.href = '/';
      return { success: true };
    } catch (err) {
      throw new Error(err.message || 'Failed to logout');
    }
  }

  const value = {
    user,
    loading,
    signup,
    confirmSignup,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
