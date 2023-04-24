import React from "react";
import {AiFillInstagram,AiFillTwitterCircle,AiFillFacebook} from 'react-icons/ai'
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="container d-flex justify-content-around c0 b3 w-100" style={{padding:'100px'}}>
      <div className="first col-3">
        <p><Link to="/" className="nav-link fw-bold fs-5">The Podcast.</Link></p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur tempora dolorum numquam quos fugiat dignissimos quaerat dolor cumque reiciendis culpa!</p>
      </div>
      <div className="second col-3">
        <p className="fw-bold fs-5">About us</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi vero saepe molestiae sapiente facilis aut officia. Consequuntur quidem dicta cum.</p>
      </div>
      <div className="third">
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
