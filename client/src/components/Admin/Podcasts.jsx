import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Carousel from "react-bootstrap/Carousel";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import { MdContentPaste } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { HiSpeakerWave } from "react-icons/hi2";
import { categories } from "../../constants/constants";
import Footer from "../Footer/Footer";
const Podcasts = () => {
  const [pods, setPods] = useState([]);
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
    fetchPodcasts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-2 m-3">
            <AdminPanel />
          </div>
          <div className="col-12 col-lg-8 m-3">
            <div className=" container d-flex flex-wrap justify-content-around">
              {pods?.map((pod) => {
                return (
                  <Link className="nav-link" to={`/podcast/admin/${pod._id}`}>
                    <div
                      className="card m-2 rounded shadow text-decoration-none c1 hover:scale-105 transition"
                      style={{ width: "18rem" ,border:'0px'}}
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
                        <p className="card-text b3 c2 flex"><MdContentPaste className="my-auto mr-1"/> {pod.type===false?"Audio":"Video"}</p>
                      <p className="card-text b3 c2 flex"><TbCategory className="my-auto mr-1"/> {categories[pod.category]}</p>
                      <p className="card-text b3 c2 flex"><HiSpeakerWave className="my-auto mr-1"/> {pod.speaker}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
    </Layout>
  );
};

export default Podcasts;
