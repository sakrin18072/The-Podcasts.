import React from "react";
import { Link } from "react-router-dom";
import {Gi3DHammer} from 'react-icons/gi'
import {HiUsers} from 'react-icons/hi'
import { FaPodcast } from "react-icons/fa";

const AdminPanel = () => {
  return (
    <div className="c1 b3" >
      <h4 className="p-2">Admin Panel</h4>
      <div className="">
        <div className="p-2">
          <Link
            to="/dashboard/admin/create-podcast"
            className="no-underline text-white class-1 flex min-w-fit "
          >
            <Gi3DHammer className="my-auto"/>&nbsp; Create Podcast
          </Link>
        </div>
        <div className="p-2">
          <Link
            to="/dashboard/admin/create-episode"
            className="no-underline text-white class-1 flex min-w-fit "
          >
            <Gi3DHammer className="my-auto"/>&nbsp; Create Episode
          </Link>
        </div>
        <div className="p-2">
          <Link to="/dashboard/admin/podcasts" className="no-underline text-white class-1 flex min-w-fit ">
            <FaPodcast className="my-auto"/>&nbsp; Podcasts
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default AdminPanel;
