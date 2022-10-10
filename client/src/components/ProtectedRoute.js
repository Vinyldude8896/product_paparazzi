import React from 'react'
import Auth from '../utils/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const loggedIn = Auth.loggedIn();
  if (!loggedIn) { // when not logged in redirect to login page
    return <Navigate to="/login"/>
  }
  // otherwise when logged in, proceed to your route
  return children;
}

export default ProtectedRoute;
