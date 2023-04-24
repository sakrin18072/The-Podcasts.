import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.css";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
injectStyle();
const Layout = ({ children }) => {
  window.scrollTo(0, 0);
  return (
    <div>
      <div
        className="border-bottom"
        style={{
          position: "fixed",
          top: "0",
          width: "100vw",
          background: "white",
          zIndex: "99",
        }}
      >
        <Header />
      </div>
      <ToastContainer
        className="w-25"
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover
        hideProgressBar={false}
        theme="dark"
      />
      <div
        style={{ paddingTop: "100px", minHeight: "80vh" }}
        className="c1"
      >
        {children}
      </div>
      {/* <div
        style={{
          position: "static",
          bottom: "0",
          width: "100vw",
          margin:'0'
        }}
        className="c0"
      >
        <Footer />
      </div> */}
    </div>
  );
};

export default Layout;
