import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthorizationContext";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserPanel from "./UserPanel";
import Footer from "../Footer/Footer";

const { Option } = Select;

const CreateUserEpisode = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [pods, setPods] = useState([]);
  const [content, setContent] = useState(null);
  const [pod, setPod] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const fetchPodcasts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/podcast/get-podcasts-by-id`);
      if (data?.success) {
        setPods(data.podcasts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.user) fetchPodcasts();
  }, [auth?.user]);
  const formSubmit = (dat) => {
    toast.loading(
      "Your episode is being uploaded, please do not close the page, once uploaded you will be redirected to dashboard"
    );
    let episodeName = "";
    episodeName = content.name + v4();
    const storage = getStorage();
    const Ref = ref(storage, `podcasts/${episodeName}`);
    uploadBytes(Ref, content).then((resp) => {
      getDownloadURL(resp?.ref).then(async (resp) => {
        dat.episode = resp;
        dat.pod = pod;
        
        try {
          const { data } = await axios.post(
            "/api/v1/podcast/create-episode",
            dat
          );
          if (data?.success) {
            navigate("/dashboard/user");
          }
        } catch (error) {}
      });
    });
  };
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-2 m-3">
            <UserPanel />
          </div>
          <div className="col-12 col-lg-8 m-3">
            <div className="container">
              <div>
                <form
                  className=" "
                  onSubmit={handleSubmit(formSubmit)}
                  style={{ height: "80vh" }}
                >
                  <div className="b3 p-3">
                    <h1>Create an episode.</h1>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        * Name of the episode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("name", { required: true })}
                        style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
                      />
                      {errors.name && (
                        <p className="text-danger">* This field is required</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="desc" className="form-label">
                        * Episode Description ?
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        {...register("desc", { required: true })}
                        style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
                      />
                      {errors.desc && (
                        <p className="text-danger">* This field is required</p>
                      )}
                    </div>
                    <div className="mb-3 ">
                      <label htmlFor="podcast" className="form-label">
                        * Podcast
                      </label>
                      <Select
                        bordered={false}
                        placeholder="Select a podcast"
                        size="small"
                        showSearch
                        showArrow={false}
                        className="form-select mb-3"
                        onChange={(value) => setPod(value)}
                        style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
                      >
                        {pods?.map((cat) => (
                          <Option key={cat.name} value={cat._id}>
                            {cat.name}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="podcast" className="form-label">
                        * Upload episode
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        required
                        onChange={(value) => {
                          setContent(value.target.files[0]);
                        }}
                        style={{backgroundColor:'#5c5470',color:'#dbd8e3'}}
                      />
                      {errors.speaker && (
                        <p className="text-danger">* This field is required</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn border shadow mb-5 w-100 text-light c0 b2"
                    >
                      Create Episode
                    </button>
                    
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

export default CreateUserEpisode;
