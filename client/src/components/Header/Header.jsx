import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../Contexts/AuthorizationContext";
import { toast } from "react-toastify";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import {FcLike} from 'react-icons/fc'
import axios from "axios";
import { Select } from "antd";
import Login from "../Login";
const { Option } = Select;
const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [pods, setPods] = useState([]);
  const [pod, setPod] = useState(null);
  const fetchPodcasts = async () => {
    try {
      const { data } = await axios.get("/api/v1/podcast/get-all-podcasts");
      if (data?.success) {
        setPods(data.podcasts);
      } else {
        toast.error("Error in fetching podcasts");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleSearch = ()=>{
    if(pod!=null){navigate(auth?.user.type===0?`/podcast/user/${pod}`:`/podcast/admin/${pod}`);window.location.reload()}
  }
  useEffect(() => {
    fetchPodcasts();
  }, []);
  useEffect(()=>{
    handleSearch();
  },[pod])
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    navigate("/logout");
    toast.success("Logout successful");
  };
  return (
    <nav className="navbar navbar-default navbar-fixed-top navbar-expand-lg c0">
      <div className="container-fluid ">
        <Link className="navbar-brand fw-bold fs-3 text-light b1" to="/">
          The Podcasts.
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse text-light"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
            <li className="nav-item me-5">
              <Link
                className="nav-link active text-light"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link
                className="nav-link active text-light"
                aria-current="page"
                to={auth?.user?`/dashboard/podcasts`:'/login'}
              >
                Podcasts
              </Link>
            </li>
            {!auth?.user ? (
              <>
                <li className="nav-item me-5">
                  <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    to="/login"
                  >
                    Login&nbsp;
                    <AiOutlineLogin />
                  </Link>
                </li>
                <li className="nav-item me-5">
                  <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-5">
                  <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    to="/"
                  >
                    Logout&nbsp;
                    <AiOutlineLogout />
                  </Link>
                </li>

                <li className="nav-item me-5">
                  <Link
                    className="nav-link active text-light"
                    to={`/dashboard/${
                      auth?.user?.role === 0 ? "user" : "admin"
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item ms-auto">
              <Select
                bordered={false}
                optionFilterProp="key"
                placeholder="Find a podcast"
                size="small"
                style={{ width: "300px",backgroundColor:'#5c5470',color:'#dbd8e3',margin:'0px' }}
                showSearch
                showArrow={false}
                className="form-select"
                onChange={(value) => {setPod(value)}}
              >
                {pods?.map((cat) => (
                  <Option key={cat.name} value={cat._id} style={{backgroundColor:'#5c5470',color:'#dbd8e3', margin:'0px',borderRadius:'0px'}}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </li>
            <li className="nav-item me-auto ms-4">
            <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    to={auth?.user?.type===0?`/dashboard/user/favourites`:`/dashboard/admin/favourites`}
                  >
                    <FcLike size={25}/> Favs
                  </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
