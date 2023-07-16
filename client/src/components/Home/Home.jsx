import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthorizationContext";
import { MdContentPaste } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { categories } from "../../constants/constants";
import { HiSpeakerWave } from "react-icons/hi2";
import Footer from "../Footer/Footer";
const Home = () => {
  const [pods, setPods] = useState([]);
  const [auth, setAuth] = useAuth();
  const [podsByAdmin, setPodsByAdmin] = useState([]);
  const [podsByArtists,setPodsByArtists] = useState([]);
  const fetchPodcasts = async () => {
    try {
      const { data } = await axios.get("/api/v1/podcast/get-all-podcasts");
      if (data?.success) {
        setPodsByAdmin(data.podcasts.filter((i) => i.isAdmin > 0));
        setPodsByArtists(data.podcasts.filter((i) => i.isAdmin === 0));
        setPods(data.podcasts);
      } else {
        toast.error("Error in fetching podcasts");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchPodcasts();
    
  }, []);
  return (
    <Layout>
  
      <div className="d-flex flex-column mx-auto container">
        <h1 className="text-center display-1 fw-bold b3">The OG's</h1>
        <div className=" container d-flex flex-wrap justify-content-around">
          {pods?.slice(0, 8)?.map((pod) => {
            return (
              <Link
                to={
                  auth?.user?.role === 0
                    ? `/podcast/user/${pod._id}`
                    : `/podcast/admin/${pod._id}`
                }
                className="nav-link"
                style={{ borderRadius: "20px" }}
              >
                <div
                  className="card m-2 rounded shadow b0 c2"
                  style={{ width: "18rem", border: "0", borderRadius: "20px" }}
                >
                  <img
                    src={pod?.thumbnail}
                    className="card-img-top p-2 c2"
                    style={{ width: "auto", height: "18rem" }}
                    alt="..."
                  />
                  <div className="card-body c2">
                    <h5 className="card-title c3">
                      {pod.name.substr(0, 20) + "..."}
                    </h5>
                    <p className="card-text c3">
                      {pod.desc.substr(0, 40) + "..."}
                    </p>
                    <p className="card-text b3 c2">
                      <MdContentPaste />{" "}
                      {pod.type === false ? "Audio" : "Video"}
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
        <h1 className="text-center display-1 fw-bold b3 mt-5">From The Podcasts.</h1>
        <div className=" container d-flex flex-wrap justify-content-around">
          {podsByAdmin?.slice(0, 8)?.map((pod) => {
            return (
              <Link
                to={
                  auth?.user?.role === 0
                    ? `/podcast/user/${pod._id}`
                    : `/podcast/admin/${pod._id}`
                }
                className="nav-link"
                style={{ borderRadius: "20px" }}
              >
                <div
                  className="card m-2 rounded shadow b0 c2"
                  style={{ width: "18rem", border: "0", borderRadius: "20px" }}
                >
                  <img
                    src={pod?.thumbnail}
                    className="card-img-top p-2 c2"
                    style={{ width: "auto", height: "18rem" }}
                    alt="..."
                  />
                  <div className="card-body c2">
                    <h5 className="card-title c3">
                      {pod.name.substr(0, 20) + "..."}
                    </h5>
                    <p className="card-text c3">
                      {pod.desc.substr(0, 40) + "..."}
                    </p>
                    <p className="card-text b3 c2">
                      <MdContentPaste />{" "}
                      {pod.type === false ? "Audio" : "Video"}
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
        <h1 className="text-center display-1 fw-bold b3 mt-5">Top Podcasts From The Users</h1>
        <div className=" container d-flex flex-wrap justify-content-around mb-3">
          {podsByArtists?.slice(0, 8)?.map((pod) => {
            return (
              <Link
                to={
                  auth?.user?.role === 0
                    ? `/podcast/user/${pod._id}`
                    : `/podcast/admin/${pod._id}`
                }
                className="nav-link"
                style={{ borderRadius: "20px" }}
              >
                <div
                  className="card m-2 rounded shadow b0 c2"
                  style={{ width: "18rem", border: "0", borderRadius: "20px" }}
                >
                  <img
                    src={pod?.thumbnail}
                    className="card-img-top p-2 c2"
                    style={{ width: "auto", height: "18rem" }}
                    alt="..."
                  />
                  <div className="card-body c2">
                    <h5 className="card-title c3">
                      {pod.name.substr(0, 20) + "..."}
                    </h5>
                    <p className="card-text c3">
                      {pod.desc.substr(0, 40) + "..."}
                    </p>
                    <p className="card-text b3 c2">
                      <MdContentPaste />{" "}
                      {pod.type === false ? "Audio" : "Video"}
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

export default Home;
