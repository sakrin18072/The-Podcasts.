import React from "react";
import { Link } from "react-router-dom";
import { Gi3DHammer } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { FaPodcast } from "react-icons/fa";
const UserPanel = () => {
  return (
    <div className="c1 align-items-stretch b3">
      <h4 className="p-2">User Panel</h4>
      <div className="">
        <div className="p-2">
          <Link
            to="/dashboard/user/create-podcast"
            className="no-underline text-white class-1 flex min-w-fit "
          >
            <Gi3DHammer className="my-auto mr-1"/> Create Podcast
          </Link>
        </div>
        <div className="p-2">
          <Link
            to="/dashboard/user/create-episode"
            className="no-underline text-white class-1 flex min-w-fit "
          >
            <Gi3DHammer className="my-auto mr-1"/> Create Episode
          </Link>
        </div>
        <div className="p-2">
          <Link
            to="/dashboard/user/podcasts"
            className="no-underline text-white class-1 flex min-w-fit "
          >
            <FaPodcast className="my-auto mr-1"/> My Podcasts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
