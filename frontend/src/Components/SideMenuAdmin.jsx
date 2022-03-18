import React from "react";
import { Link } from "react-router-dom";

const SideMenuAdmin = () => {
  return (
    <div className="sidebar">
      <div className="logo-content">
        <div className="logo">
          <i class="bx bx-dumbbell"></i>
          <div className="logo-name">Fit</div>
        </div>{" "}
      </div>
      <ul className="nav_list">
        <li>
          <Link to="/admin-dashboard">
            <i class="bx bxs-home-circle">
              <span className="links_name">Home</span>
            </i>
          </Link>
        </li>
        <li>
          <a href="#gym-reqs">
            <i class="bx bx-dumbbell">
              <span className="links_name">Gym Profiles</span>
            </i>
          </a>
        </li>
        <li>
          <a href="#trainer-reqs">
            <i class="bx bxs-user">
              <span className="links_name">Trainer Profiles</span>
            </i>
          </a>
        </li>
        <li>
          <a href="#queries">
            <i class="bx bxs-message-rounded-dots">
              <span className="links_name">Queries</span>
            </i>
          </a>
        </li>
        <li>
          <a href="#payment">
            <i class="bx bxs-bank">
              <span className="links_name">Payment Reqs</span>
            </i>
          </a>
        </li>
      </ul>

      <div className="profile_content">
        <div className="profile">
          <div className="profile-details">
            <div className="name_job">
              <div className="name"></div>
              <div className="job"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenuAdmin;
