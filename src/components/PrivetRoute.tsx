import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const PrivetRoute = ({ children }: { children: any }) => {
  const user = useSelector((state: RootState) => state.userSlice.user);
  if (!user) {
    // user is not authenticated
    return <Navigate to='/' />;
  }

  return children;
};

export default PrivetRoute;
