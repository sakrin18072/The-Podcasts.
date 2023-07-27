import React from "react";
import Layout from "./Layout/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthorizationContext";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from "./config/firebase.config";
import Footer from "./Footer/Footer";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formSubmit = async (dat) => {
    try {
      const { data } = await axios.post("/api/v1/auth/login", dat);
      if (data?.success) {
        toast.success("Login successful");
        setAuth({
          ...auth,
          user: data?.user,
          token: data?.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        navigate("/");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Layout>
      <div className="container c3">
        <div>
          <form
            onSubmit={handleSubmit(formSubmit)}
            className=" col-12 col-lg-6 col-md-3 d-flex align-items-center justify-content-center flex-column mx-auto"
            style={{ height: "80vh" }}
          >
            <div className="border p-3" style={{ borderRadius: "10px" }}>
              <h1>Login.</h1>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  * Email address
                </label>
                <input
                  type="email"
                  className="form-control "
                  style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-danger">* This field is required</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  * Password
                </label>
                <input
                  type="password"
                  className="form-control "
                  style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-danger">* This field is required</p>
                )}
              </div>

              <button type="submit" className="btn btn-light w-100 mb-5" style={{backgroundColor:'#352f44',color:'#dbd8e3'}}>
                Get In !
              </button>
              {/* <p>Or</p>

              <Link
                class="btn btn-lg btn-google btn-block text-light border w-100"
                onClick={loginWithGoogle}
              >
                <img src="https://img.icons8.com/color/16/000000/google-logo.png" />{" "}
                Signin Using Google
              </Link> */}
            </div>
          </form>
        </div>
      </div>
      
    </Layout>
  );
};

export default Login;
