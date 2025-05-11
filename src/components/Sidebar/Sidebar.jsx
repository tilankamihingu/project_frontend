import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import logo from '../../assets/sales.png';
import user from '../../assets/user.jpg';
import logOut from '../../assets/log-out.png';
import Sales from '../../assets/sales.png';
import Waste from '../../assets/waste.png';
import Dashboard from '../../assets/dashboard.png';
import FoodItem from '../../assets/food-item.png';

const Sidebar = () => {
  return (
    <div className="sidebar-main-wrapper">
      <div className="top-section">
        <div className="logo-section">
          <img src={Dashboard} alt="" />
          <div className="title-wrapper">AI Dashboard</div>
        </div>
        <div className="items-section">
          <div className="sidebar-items-wrapper">
            <div className="sidebar-item-wrapper">
              <img src={Dashboard} alt="" />
              <Link to="/">Dashboard</Link>
            </div>
            <div className="sidebar-item-wrapper">
              <img src={Sales} alt="" />
              <Link to="/sales">Sales</Link>
            </div>
            <div className="sidebar-item-wrapper">
              <img src={Waste} alt="" />
              <Link to="/waste">Waste</Link>
            </div>
            <div className="sidebar-item-wrapper">
              <img src={FoodItem} alt="" />
              <Link to="/food-item">Food Item</Link>
            </div>
            <div className="sidebar-item-wrapper">
              <img src={logo} alt="" />
              <Link to="/staff">Staff</Link>
            </div>
              {/* <Link to="/inventory">Dashboard</Link>
              
              
              <Link to="/insights">Dashboard</Link>
              <Link to="/reports">Dashboard</Link>
              <Link to="/settings">Dashboard</Link> */}
              
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <div className="bottom-user-wrapper">
          <div className="user-image">
            <img src={user} alt="" />
          </div>
          <div className="user-details-wrapper">
            <div className="user-name">Tilanka Mihingu</div>
            <div className="user-role">Admin</div>
          </div>
        </div>
        <div className="bottom-logout-wrapper">
          <img src={logOut} alt="" />
          <div className="logout-text">Log out</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar