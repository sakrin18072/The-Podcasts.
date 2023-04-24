import React, { useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdContentPaste } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { HiSpeakerWave } from "react-icons/hi2";
import { categories } from "../constants/constants";
import { useAuth } from "../Contexts/AuthorizationContext";
import Footer from "./Footer/Footer";
const Podcast = () => {
  const [pods, setPods] = useState([]);
  const [auth, setAuth] = useAuth();
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
  useEffect(() => {
    if(auth?.user)fetchPodcasts();
  }, [auth?.user]);
  return (
    <Layout>
      <div className=" container d-flex flex-wrap justify-content-around">
        {pods?.map((pod) => {
          return (
            <Link
              className="nav-link"
              to={`/podcast/${
                      auth?.user?.role === 0 ? "user" : "admin"
                    }/${pod._id}`}
            >
              <div
                className="card m-2 rounded shadow text-decoration-none c1"
                style={{
                  width: "18rem",
                  border: "0px",
                  borderRadius: "20px",
                }}
              >
                <img
                  src={pod?.thumbnail}
                  className="card-img-top p-2 c2"
                  style={{ width: "auto", height: "18rem" }}
                  alt="..."
                />
                <div className="card-body c2">
                  <h5 className="card-title text-decoration-none c2 b3">
                    {pod.name.substr(0, 20) + "..."}
                  </h5>
                  <p className="card-text c2 b3">
                    {pod.desc.substr(0, 40) + "..."}
                  </p>
                  <p className="card-text b3 c2">
                    <MdContentPaste /> {pod.type === false ? "Audio" : "Video"}
                  </p>
                  <p className="card-text b3 c2">
                    <TbCategory /> {categories[pod.category]}
                  </p>
                  <p className="card-text b3 c2">
                    <HiSpeakerWave /> {pod.speaker}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
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
    </Layout>
  );
};

export default Podcast;
