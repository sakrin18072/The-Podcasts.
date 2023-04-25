import React from "react";
import Layout from "../Layout/Layout";
import { storage } from "../config/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useForm } from "react-hook-form";
import { categories } from "../../constants/constants";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { v4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserPanel from "./UserPanel";
import Footer from "../Footer/Footer";
const CreateUserPodcast = () => {
  const navigate = useNavigate();
  const [cat, setCat] = useState("");
  const [type, setType] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formSubmit = async (dat) => {
    toast.loading(
      "Your file is being uploaded, please do not close the page, once uploaded you will be redirected to podcasts"
    );
    const imgName = thumbnail.name + v4();
    const imageRef = ref(storage, `thumbnails/${imgName}`);
    uploadBytes(imageRef, thumbnail).then((resp) => {
      getDownloadURL(resp?.ref)
        .then(async (res) => {
          dat.thumbnail = res;
          dat.thumbName = imgName;
          dat.isAdmin=0;
          dat.category = categories.findIndex((i) => i === cat);
          try {
            const { data } = await axios.post(
              "/api/v1/podcast/create-podcast",
              dat
            );
            if (data?.success) {
              navigate("/dashboard/user");
            }
          } catch (error) {}
        })
        .catch((e) => console.log(e.message));
    });
  };
  return (
    <Layout>
      <div className="container-fluid" style={{minHeight:'100vh'}}>
        <div className="row">
          <div className="col-12 col-lg-2 col-md-5 m-3">
            <UserPanel />
          </div>
          <div className="col-12 col-lg-8 col-md-5 ">
            <div className="container">
              <div>
                <form
                  className=" "
                  onSubmit={handleSubmit(formSubmit)}
                  style={{ height: "80vh" }}
                >
                  <div className=" p-3">
                    <h1 className="b3">Create a podcast.</h1>
                    <div className="mb-3 c3">
                      <label htmlFor="name" className="form-label b3">
                        * Name of the podcast
                      </label>
                      <input
                        type="text"
                        style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
                        className="form-control b0"
                        {...register("name", { required: true })}
                      />
                      {errors.name && (
                        <p className="text-danger">* This field is required</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="desc" className="form-label b3">
                        * What is this podcast about ?
                      </label>
                      <input
                        type="text"
                        style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
                        className="form-control b0"
                        {...register("desc", { required: true })}
                      />
                      {errors.desc && (
                        <p className="text-danger">* This field is required</p>
                      )}
                    </div>
                    <div className="mb-3 ">
                      <label htmlFor="category" className="form-label b3">
                        * Category
                      </label>
                      <Autocomplete
                        disablePortal
                        autoHighlight
                        id="combo-box-demo"
                        options={categories}
                        size="small"
                        className=" border rounded w-100 bg-light"
                        style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
                        onChange={(eve, val) => setCat(val)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="type" className="form-label b3">
                        * Type
                      </label>
                      <input
                        type="text"
                        className="form-control b0"
                        style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
                        placeholder="Enter 0 for audio and 1 for video"
                        onChange={(val) => setType(val.target.value)}
                        {...register("type", { required: true })}
                      />
                      {errors.type && (
                        <p className="text-danger">* This field is required</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="speaker" className="form-label b3">
                        * Speaker
                      </label>
                      <input
                        type="text"
                        style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
                        className="form-control b0"
                        {...register("speaker", { required: true })}
                      />
                      {errors.speaker && (
                        <p className="text-danger">* This field is required</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="thumbnail" className="form-label b3">
                        * Thumbnail
                      </label>
                      <input
                        type="file"
                        className="form-control b0"
                        style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
                        onChange={(value) => {
                          setThumbnail(value.target.files[0]);
                        }}
                        accept="image/*"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn border shadow mb-5 w-100 text-light c0 b2"
                    >
                      Create Podcast
                    </button>
                    {/* <p>Or</p>

              <Link
                class="btn btn-lg btn-google btn-block text-light border w-100"
                onClick={loginWithGoogle}
              >
                <img src="https://img.icons8.com/color/16/000000/google-logo.png" />{" "}
                Signin Using Google
              </Link> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </Layout>
  );
};

export default CreateUserPodcast;
