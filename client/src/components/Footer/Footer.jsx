import React from "react";
import {AiFillInstagram,AiFillTwitterCircle,AiFillFacebook} from 'react-icons/ai'
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="container d-flex flex-column flex-lg-row justify-content-around c0 b3 w-100 mx-auto" style={{padding:'100px'}}>
      <div className="first p-2">
        <p><Link to="/" className="nav-link fw-bold fs-5">The Podcast.</Link></p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur tempora dolorum numquam quos fugiat dignissimos quaerat dolor cumque reiciendis culpa!</p>
      </div>
      <div className="second p-3">
        <p className="fw-bold fs-5">About us</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi vero saepe molestiae sapiente facilis aut officia. Consequuntur quidem dicta cum.</p>
      </div>
      <div className="third p-2">
        <p className="fw-bold fs-5">Connect with us</p>
        <div className="d-flex">
          <div className="p-3"><AiFillInstagram size={25}/></div>
          <div className="p-3"><AiFillTwitterCircle size={25}/></div>
          <div className="p-3"><AiFillFacebook size={25}/></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
