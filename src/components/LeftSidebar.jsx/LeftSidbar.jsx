import React, { useState } from "react";
import { useSelector } from "react-redux";

const LeftSidebar = ({ menuItems }) => {

  return (
    <nav
    >
      <div className="left_section menu_left">
        <div className="left_section">
          <ul id="js-menu">
            {menuItems.map((item, index) => (
              <li className="menu--item" key={index}>
                <a
                  href={item.link}
                  onClick={() => toggleSubMenu(index)}
                  title={item.title}
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                >
                  <i className={`fa-solid ${item.icon} menu--icon`}></i>
                  <span className="menu--label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};


export default LeftSidebar;