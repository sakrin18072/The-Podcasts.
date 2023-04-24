import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import UserPanel from "./UserPanel";
import {MdContentPaste} from 'react-icons/md'
import {TbCategory} from 'react-icons/tb'
import {HiSpeakerWave} from 'react-icons/hi2'
import {categories} from '../../constants/constants'
import Footer from "../Footer/Footer";
const MyPodcasts = () => {
  const [pods, setPods] = useState([]);
  const fetchPodcasts = async () => {
    try {
      const { data } = await axios.get("/api/v1/podcast/get-podcasts-by-id");
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
            <UserPanel />
          </div>
          <div className="col-12 col-lg-8 m-3">
            <div className=" container d-flex flex-wrap justify-content-around">
              {pods?.map((pod) => {
                return (
                  <Link className="nav-link" to={`/podcast/user/${pod._id}`}>
                    <div
                      className="card m-2 rounded shadow text-decoration-none c1"
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
          </div>
        </div>
      </div>
      
    </Layout>
  );
};

export default MyPodcasts;
