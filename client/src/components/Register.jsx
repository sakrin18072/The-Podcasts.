import React from "react";
import Layout from "./Layout/Layout";
import { useForm } from "react-hook-form";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
const Register = () => {
    const navigate = useNavigate(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit =async (dat) => {
    try {
        const {data} =await axios.post('/api/v1/auth/register',dat);
        if(data?.success){

            toast.success("Registered successfully");
            navigate('/login')
        }
        else{
            toast.error(data?.message)
        }
    } catch (error) {
        toast.error(error.message);
    }
  };
  return (
    <Layout>
      <div className="container b1">
        <form onSubmit={handleSubmit(formSubmit)} className="text-light col-12 col-lg-3 col-md-5 d-flex aliign-items-center justify-content-center flex-column mx-auto">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              * Name
            </label>
            <input
              type="text"
              className="form-control "
              style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
              {...register('name',{required:true})}
            />
            {errors.name && <p className="text-danger">* This field is required</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              * Email address
            </label>
            <input
              type="email"
              className="form-control "
              style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
              {...register('email',{required:true})}
            />
            {errors.email && <p className="text-danger">* This field is required</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              * Password
            </label>
            <input
              type="password"
              className="form-control"
              style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
              {...register('password',{required:true})}
            />
            {errors.password && <p className="text-danger">* This field is required</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              * Phone
            </label>
            <input
              type="text"
              className="form-control "
              style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
              {...register('phone',{required:true})}
            />
            {errors.phone && <p className="text-danger">* This field is required</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              * Address
            </label>
            <input
              type="text"
              className="form-control"
              style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
              {...register('address',{required:true})}
            />
            {errors.address && <p className="text-danger">* This field is required</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="answer" className="form-label">
              * What is your favourite sport?
            </label>
            <input
              type="text"
              className="form-control b1"
              style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
              {...register('answer',{required:true})}
            />
            {errors.answer && <p className="text-danger">* This field is required</p>}
          </div>
          
          <button type="submit" className="btn btn-light mb-5"
          style={{backgroundColor:'#352f44',color:'#dbd8e3'}}
          >
            Get In !
          </button>
        </form>
      </div>
      
    </Layout>
  );
};

export default Register;
