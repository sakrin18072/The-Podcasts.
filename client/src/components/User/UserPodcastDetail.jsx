import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../Contexts/AuthorizationContext";
import { AiFillPlayCircle } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import UserPanel from "./UserPanel";
import Footer from "../Footer/Footer";
const UserPodcastDetail = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [id, setId] = useState("");
  const [likes,setLikes] = useState([]);
  const [editID, setEditID] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const { pid } = useParams();
  const [podcast, setPodcast] = useState({});
  const [auth, setAuth] = useAuth();
  const getFavs = async ()=>{
    try {
      const {data} = await axios.get('/api/v1/podcast/get-likes');
      if(data?.success){
        setLikes(data?.favs?.favourites);
      }
      else{
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  const setFavs = async (id)=>{
    try {
      const {data} = await axios.post('/api/v1/podcast/set-like',{id});
      if(data?.success){
        getFavs();
      }
      else{
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  const removeFavs = async (id)=>{
    try {
      const {data} = await axios.post('/api/v1/podcast/remove-like',{id});
      if(data?.success){
        getFavs()
      }
      else{
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  const handleEdit = async () => {
    try {
      const id = editID
      const {data} = await axios.put('/api/v1/podcast/update-episode',{id,name,desc});
      if(data?.success){
        toast.success(data?.message);
        handleClose1();
        getPodcast();
      }
      else{
        toast.error(data?.message)
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleDelete = async(pid,id)=>{
    try {
      const {data} = await axios.delete(`/api/v1/podcast/delete-episode/${pid}/${id}`)
      if(data?.success){
        toast.success("Episode deleted successfully");
        getPodcast();
      }
      else{
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  const fetchEp = async (epID) => {
    try {
      const { data } = await axios.post(`/api/v1/podcast/get-episode`, {
        epID,
      });
      if (data?.success) {
        setName(data.ep.name);
        setDesc(data.ep.desc);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const getPodcast = async () => {
    try {
      const { data } = await axios.get(`/api/v1/podcast/get-podcast/${pid}`);
      if (data?.success) {
        setPodcast(data.podcast);
        
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    if (auth?.user) {getPodcast();getFavs();}
  }, [auth?.user]);
  return (
    <Layout>
      <div
        className="d-flex flex-md-row flex-column b3"
        style={{ flexBasis: "20%" }}
      >
        <div className="flex-no-wrap m-3" style={{ minWidth: "15%" }}>
          <UserPanel />
        </div>
        <div
          className=" m-3 rounded flex-lg-row flex-col "
          style={{ flexGrow: "2" }}
        >
          <div
            className="c0 container d-flex align-items-center p-2 rounded shadow flex-lg-row flex-column"
            style={{ borderRadius: "30px" }}
          >
            <img
              src={podcast?.thumbnail}
              style={{
                maxWidth: "100%",
                width: "18rem",
                borderRadius: "20px",
                objectFit: "contain",
              }}
              alt=""
              className="shadow"
            />
            <div className="container c0">
              <h6 className="fw-bolder c0 b3">Podcast</h6>
              <h1 className="fs-1 fw-bolder c0 b3">{podcast.name}</h1>
              <h4 className="fw-bolder c0 b3">{auth?.user?.name}</h4>
              {
                !likes.find(i=>i._id===pid) ?
                <button className="btn btn-dark b2 w-25" style={{ backgroundColor: "#dbd8e3", border: "0" }} onClick={(e)=>{
                  e.preventDefault();
                  setFavs(pid)
                }}>Like</button>:
                <button className="btn btn-dark b2 w-25"
                style={{ backgroundColor: "#dbd8e3", border: "0" }}
                onClick={(e)=>{e.preventDefault();removeFavs(pid)}}
                >Remove from Liked</button>
              }
            </div>
          </div>
          <div className="mt-3  d-flex rounded flex-lg-row flex-column-reverse">
            <div className="container rounded ">
              <h1>All Episodes</h1>
              {podcast?.episodes?.map((ep) => {
                return (
                  <>
                    <div className="c2 d-flex align-items-center p-2 rounded shadow mb-3 flex-lg-row flex-column">
                      <img
                        style={{
                          maxWidth: "100%",
                          width: "10rem",
                          objectFit: "contain",
                          borderRadius: "20px",
                        }}
                        src={podcast?.thumbnail}
                        alt=""
                      />
                      <div className="container  c2">
                        <h5 className="c2">{ep.name}</h5>
                        <p className="c2">{ep.desc}</p>

                        {podcast.type === false ? (
                          <audio
                            src={ep.episode}
                            controls
                            className="c3 b0 "
                            style={{
                              borderRadius: "20px",
                              backgroundColor: "#5c5470",
                              maxWidth: "100%",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <button
                            className="btn"
                            onClick={(e) => {
                              e.preventDefault();
                              setId(ep.episode);
                              handleShow();
                            }}
                          >
                            <AiFillPlayCircle size={30} />
                          </button>
                        )}
                        {
                            podcast.uploadedBy===auth.user._id?(
                                <div className=" ms-auto">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              fetchEp(ep._id);
                              setEditID(ep._id)
                              handleShow1();
                            }}
                            className="btn btn-dark c3 b0 ms-1 me-1"
                            style={{ backgroundColor: "#dbd8e3", border: "0" }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn b3 ms-1 me-1"
                            style={{ backgroundColor: "#352f44" }}
                            onClick={(e)=>{
                              e.preventDefault();
                              handleDelete(podcast._id,ep._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                            ):(<></>)
                        }
                        
                      </div>
                    </div>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton className="c2"></Modal.Header>
                      <Modal.Body className="mx-auto d-flex justify-content-center c1">
                        <video
                          src={id}
                          controls
                          style={{
                            maxWidth: "80%",
                            maxHeight: "100%",
                            borderRadius: "20px",
                          }}
                        />
                      </Modal.Body>
                    </Modal>
                    <Modal
                      show={show1}
                      onHide={handleClose1}
                      backdrop="static"
                      keyboard={false}
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton className="b2">
                        Update Episode
                      </Modal.Header>
                      <Modal.Body className="mx-auto d-flex justify-content-center w-100 c1">
                        <form>
                          <div className="b3 p-3">
                            <div className="mb-3">
                              <label htmlFor="name" className="form-label">
                                * Name of the episode
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                              />
                              
                            </div>
                            <div className="mb-3">
                              <label htmlFor="desc" className="form-label">
                                * Episode Description ?
                              </label>
                              <input
                                type="text"
                                className="form-control "
                                value={desc}
                                onChange={e=>setDesc(e.target.value)}
                              />
                              
                            </div>

                            <button
                              type="submit"
                              className="btn btn-dark border shadow mb-5 w-100 text-light"
                              onClick={(e)=>{e.preventDefault();handleEdit()}}
                            >
                              Update Episode
                            </button>
                          </div>
                        </form>
                      </Modal.Body>
                    </Modal>
                  </>
                );
              })}
            </div>
            <div className="container">
              <h4 className="fw-bolder mb-3">About.</h4>
              <p>{podcast.desc}</p>
            </div>
          </div>
        </div>
      </div>
      
    </Layout>
  );
};

export default UserPodcastDetail;
