import React from "react";
import { Link } from "react-router-dom";
import {Gi3DHammer} from 'react-icons/gi'
import {HiUsers} from 'react-icons/hi'
import { FaPodcast } from "react-icons/fa";

const AdminPanel = () => {
  return (
    <div className="c1 align-items-stretch b3" >
      <h4 className="p-2">Admin Panel</h4>
      <div className="">
        <div className="p-2">
          <Link
            to="/dashboard/admin/create-podcast"
            className="list-group-item class-1"
          >
            <Gi3DHammer/> Create Podcast
          </Link>
        </div>
        <div className="p-2">
          <Link
            to="/dashboard/admin/create-episode"
            className="list-group-item class-1"
          >
            <Gi3DHammer/> Create Episode
          </Link>
        </div>
        <div className="p-2">
          <Link to="/dashboard/admin/podcasts" className="list-group-item class-1">
            <FaPodcast/> Podcasts
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default AdminPanel;
