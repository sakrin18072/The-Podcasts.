import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useAuth } from "../../Contexts/AuthorizationContext";
import { RiAdminLine } from "react-icons/ri";
import { MdContentPaste } from "react-icons/md";
import { HiSpeakerWave } from "react-icons/hi2";
import { TbCategory } from "react-icons/tb";
import { FaPodcast } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Autocomplete, TextField } from "@mui/material";
import { categories } from "../../constants/constants";
import { deleteObject, getStorage, ref } from "firebase/storage";
import UserPanel from "./UserPanel";
import Footer from "../Footer/Footer";
const UserDashboard = () => {
  const [auth, setAuth] = useAuth();
  const [pods, setPods] = useState([]);
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [type, setType] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState(null);
  const [thumbName,setThumbname] = useState("");
  const [fileName,setFilename] = useState("");
  const handleDelete = async (pid)=>{
    try {
      const {data} = await axios.delete(`/api/v1/podcast/delete-podcast/${pid}`)
      if(data?.success){
        const storage = getStorage();
        const imgRef = ref(storage,`thumbnails/${thumbName}`);
        const fileRef = ref(storage,`podcasts/${fileName}`);
        deleteObject(imgRef).then((resp)=>{
          deleteObject(fileRef).then(res=>{
            fetchPodcasts();

          }).catch(e=>console.log(e))
        }).catch(e=>console.log(e));
      }
      else{ 
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  const handleEdit = async () => {
    try {
      const dat = {}
      dat.name = name;
      dat.desc=desc;
      dat.type=type;
      dat.speaker=speaker;
      dat.category = categories.findIndex(i=>i===cat);
      dat.thumbnail = thumbnail;
      dat.file = content;
      dat.pid = id;
      const {data} = await axios.put(`/api/v1/podcast/update-podcast`,dat);
      if(dat?.success){
        handleShow();
        fetchPodcasts();
        toast.success("Podcast updated successfully");

      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const getPodcast = async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/podcast/get-podcast/${id}`);
      if (data?.success) {
        setName(data.podcast.name);
        setDesc(data.podcast.desc);
        setCat(data.podcast.category);
        setType(data.podcast.type);
        setSpeaker(data.podcast.speaker);
        setThumbnail(data.podcast.thumbnail);
        setContent(data.podcast.file);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchPodcasts = async () => {
    try {
      const { data } = await axios.get("/api/v1/podcast/get-podcasts-by-id");
      if (data?.success) {
        setPods(data.podcasts);
        toast.success("Podcasts fetched successfully");
      } else {
        toast.error("Error in fetching podcasts");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (auth?.user) {
      fetchPodcasts();
    }
  }, [auth?.user]);
  return (
    <Layout>
      <div >
        <div className="d-flex flex-lg-row flex-column" style={{minHeight:'100vh'}}>
          <div className=" m-3">
            <UserPanel />
          </div>
          <div className="col-9 b3 mx-auto m-3 p-3 class-2">
            <h4 className="fw-bold b3">
              <RiAdminLine style={{color:'#dbd8e3'}} size={25} /> {auth?.user?.name}
            </h4>
            <h5>
              <FaPodcast /> My Podcasts Online.
            </h5>
            <div className=" container d-flex flex-wrap">
              {pods?.map((pod) => {
                return (
                  <div className="card m-2 rounded shadow c2 b0" style={{ width: "18rem" ,border:'0'}}>
                    <img
                      src={pod?.thumbnail}
                      className="card-img-top p-2 c2"
                      style={{ width: "auto", height: "18rem" }}
                      alt="..."
                    />
                    <div className="card-body c2 b3" style={{border:'0'}}>
                      <h5 className="card-title">
                        {pod.name.substr(0, 20) + "..."}
                      </h5>
                      <p className="card-text b3 c2">{pod.desc.substr(0,40)+"..."}</p>
                      <p className="card-text b3 c2"><MdContentPaste/> {pod.type===false?"Audio":"Video"}</p>
                      <p className="card-text b3 c2"><TbCategory/> {categories[pod.category]}</p>
                      <p className="card-text b3 c2"><HiSpeakerWave/> {pod.speaker}</p>
                      <div className="container d-flex justify-content-around">
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            getPodcast(pod._id);
                            setId(pod._id);
                            handleShow();
                          }}
                          className="btn c3 b0 w-50 ms-1 me-1"
                          style={{backgroundColor:'#dbd8e3'}}
                        >
                          Edit
                        </Link>
                        <Link onClick={(e)=>{
                          e.preventDefault();
                          setThumbname(pod.thumbName)
                          setFilename(pod.fileName)
                          handleDelete(pod._id)
                        }} className="btn b3 w-50 ms-1 me-1"
                        style={{backgroundColor:'#352f44'}}
                        >
                          Delete
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <>
            <Modal show={show} onHide={handleClose} >
              <Modal.Header className="c1 b3" closeButton>
                <Modal.Title>Update The Podcast.</Modal.Title>
              </Modal.Header>
              <Modal.Body className="c2 b3">
                <form
                >
                  <div className=" p-3">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        * Name of the podcast
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
                        * What is this podcast about ?
                      </label>
                      <input
                        type="text"
                        value={desc}
                        onChange={(e)=>setDesc(e.target.value)}
                        className="form-control "
                        
                      />
                      
                    </div>
                    <div className="mb-3 ">
                      <label htmlFor="category" className="form-label">
                        * Category
                      </label>
                      <Autocomplete
                        disablePortal
                        autoHighlight
                        value={categories[cat]}
                        id="combo-box-demo"
                        options={categories}
                        size="small"
                        className=" border rounded w-100"
                        onChange={(eve, val) => setCat(val)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="type" className="form-label">
                        * Type
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        onChange={(e)=>setType(e.target.value)}
                        placeholder="Enter 0 for audio and 1 for video"
                        
                        
                      />
                      
                    </div>
                    <div className="mb-3">
                      <label htmlFor="speaker" className="form-label">
                        * Speaker
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        value={speaker}
                        onChange={(e)=>setSpeaker(e.target.value)}
                        
                      />
                      
                    </div>
                    
                    

                    <button
                      type="submit"
                      className="btn btn-dark border shadow mb-5 w-100 text-light"
                      onClick={(e)=>{e.preventDefault();handleEdit();}}
                    >
                      Update Podcast
                    </button>
                    
                  </div>
                </form>
              </Modal.Body>
              
            </Modal>
          </>
        </div>
      </div>
      
    </Layout>
  );
};

export default UserDashboard;
