import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import UserPanel from './UserPanel'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdContentPaste } from 'react-icons/md'
import { TbCategory } from 'react-icons/tb'
import { categories } from '../../constants/constants'
import { HiSpeakerWave } from 'react-icons/hi2'
import { Link } from 'react-router-dom'


const UserFavourites = () => {
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
    useEffect(()=>{
        getFavs();
    },[]);
  return (
    <Layout>
        <div className="container" style={{marginTop:'-100px',minHeight:'100vh'}}>
        <div className="">
          <div className="">
          <div className=" container d-flex flex-wrap justify-content-center mt-3">
              {
                pods.length===0 && <h1 className='b3 display-1 fw-bolder'>You haven't added any yet, go search for one :)</h1>
              }
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
                        <p className="card-text b3 c2 flex"><MdContentPaste className='my-auto mr-1'/> {pod.type===false?"Audio":"Video"}</p>
                      <p className="card-text b3 c2 flex"><TbCategory className='my-auto mr-1'/> {categories[pod.category]}</p>
                      <p className="card-text b3 c2 flex"><HiSpeakerWave className='my-auto mr-1'/> {pod.speaker}</p>
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
  )
}

export default UserFavourites;