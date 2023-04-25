import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import AdminPanel from './AdminPanel'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdContentPaste } from 'react-icons/md'
import { TbCategory } from 'react-icons/tb'
import { HiSpeakerWave } from 'react-icons/hi2'
import { categories } from '../../constants/constants'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { useAuth } from '../../Contexts/AuthorizationContext'
const AdminFavourites = () => {
  const [pods,setPods] = useState([]);
  const getFavs = async ()=>{
    try {
      const {data} = await axios.get('/api/v1/podcast/get-likes');
      if(data?.success){
        setPods(data?.favs?.favourites);
      }
      else{
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  const [auth,setAuth] = useAuth();
  useEffect(()=>{getFavs()},[])
  return (
    <Layout>
        <div className="container-fluid" style={{marginTop:'-100px',minHeight:'100vh'}}>
        <div className="row">
          <div className="col-12 col-lg-2 m-3">
            <AdminPanel/>
          </div>
          <div className="col-12 col-lg-8 m-3">
            <div className=" container d-flex flex-wrap justify-content-around">
              {
                pods.length===0 && <h1 className='b3 display-1 fw-bolder'>You haven't added any yet, go search for one :)</h1>
              }
              {pods?.map((pod) => {
                return (
                  <Link className="nav-link" to={auth?.user.role===1?`/podcast/admin/${pod._id}`:`/podcast/user/${pod._id}`}>
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
                        <p className="card-text b3 c2"><MdContentPaste/> {pod.type===false?"Audio":"Video"}</p>
                      <p className="card-text b3 c2"><TbCategory/> {categories[pod.category]}</p>
                      <p className="card-text b3 c2"><HiSpeakerWave/> {pod.speaker}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            </div>
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
  )
}

export default AdminFavourites;