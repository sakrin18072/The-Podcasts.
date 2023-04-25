import React from 'react'
import Layout from '../Layout/Layout'
import { useAuth } from '../../Contexts/AuthorizationContext';
import { Outlet } from 'react-router-dom';
import Login from '../Login';
import Footer from '../Footer/Footer';
import {useNavigate} from 'react-router-dom'
import Spinner from '../Spinner';
const PrivateRoute = () => {
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();
  return (
    <div>
        {
            auth?.user?<Outlet/>:<Spinner/>
        }
      <div
        style={{
          position: "static",
          bottom: "0",
          width: "100vw",
          margin:'0'
        }}
        className="c0"
      >
        <Footer />
      </div>
    </div>
  )
}

export default PrivateRoute