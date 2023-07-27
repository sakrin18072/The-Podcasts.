import React from 'react'
import { useAuth } from '../../Contexts/AuthorizationContext';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';
const PrivateRoute = () => {
    const [auth] = useAuth();
  return (
    auth?.user?<Outlet/>:<Spinner/>
      
  )
}

export default PrivateRoute