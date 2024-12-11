import React, { useEffect, useState } from "react";
import LineChart from "../../components/LineChart/LineChart";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import CircleChart from "../../components/CircleChart/CircleChart";
import { useNavigate } from "react-router-dom";


export default function ManagerDashboardPage() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const navigate = useNavigate();
  return (
    <div>
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <div className={`left-sidebar ${isSidebarExpanded ? "expanded" : "collapsed"}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarExpanded ? "⟨" : "⟩"}
        </button>
        <h3 className="sidebar-title">Menu</h3>
        <ul className="sidebar-list">
          <li className="sidebar-item">Dashboard</li>
          <li className="sidebar-item" onClick={() => navigate("/managephone")}>Products</li>

        </ul>
      </div>
    
      <div className="dashboard-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="d-main-title">
                <h3>
                  <i className="fa-solid fa-user me-3"></i>Manager Dashboard
                </h3>
              </div>
              <div className="col-md-12">
                <div className="main-card mt-5">
                  <div className="dashboard-wrap-content p-4">
                    <div className="row statistic">
                      <div className="col-md-2 statistic-box">
                        <div className="statistic-box-content">
                          <div className="statistic-box-content_text">
                            <div className="statistic-box-content_description">
                              Month Revenues
                            </div>
                            <div className="statistic-box-content_money">
                              <div className="statistic-box-content_money">
                                {formatCurrency(20000000)}
                              </div>
                            </div>
                            <div className="flex">
                              <img
                                width="16"
                                height="16"
                                src="https://img.icons8.com/office/16/up--v1.png"
                                alt="up--v1"
                              />
                              <span className="icon-increasing statistic-box-content_linedown">
                                Increasing {formatCurrency(20000000)} than
                                last month*
                              </span>
                              <br />
                              <span className="icon-increasing statistic-box-content_linedown">
                                (*)10% revenue of all orders.
                              </span>
                            </div>
                          </div>
                          <div className="statistic-box-img">
                            <svg
                              width="60"
                              height="60"
                              viewBox="0 0 60 60"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.21"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
                                fill="#4AD991"
                              />
                              <path
                                d="M19.1111 40.8889H42.4444C43.3036 40.8889 44 41.5853 44 42.4444C44 43.3036 43.3036 44 42.4444 44H17.5556C16.6964 44 16 43.3036 16 42.4444V17.5556C16 16.6964 16.6964 16 17.5556 16C18.4147 16 19.1111 16.6964 19.1111 17.5556V40.8889Z"
                                fill="#4AD991"
                              />
                              <path
                                opacity="0.5"
                                d="M24.9131 34.176C24.3255 34.8027 23.3411 34.8345 22.7143 34.2469C22.0876 33.6593 22.0558 32.6749 22.6434 32.0481L28.4767 25.8259C29.045 25.2198 29.9893 25.1672 30.6213 25.7065L35.2253 29.6353L41.224 22.037C41.7563 21.3627 42.7345 21.2477 43.4088 21.78C44.0831 22.3123 44.1982 23.2905 43.6658 23.9648L36.6658 32.8315C36.1191 33.524 35.1063 33.6237 34.4351 33.0509L29.7311 29.0367L24.9131 34.176Z"
                                fill="#4AD991"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 statistic-box">
                        <div className="statistic-box-content">
                          <div className="statistic-box-content_text">
                            <div className="statistic-box-content_description">
                              Total Orders
                            </div>
                            <div className="statistic-box-content_money">
                              {100}
                            </div>
                          </div>
                          <div className="statistic-box-icon">
                            <div className="booking-icon">
                              <svg
                                width="60"
                                height="60"
                                viewBox="0 0 60 60"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  opacity="0.21"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
                                  fill="#8280FF"
                                />
                                <path
                                  opacity="0.587821"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M20.666 23.3333C20.666 26.2789 23.0538 28.6667 25.9993 28.6667C28.9449 28.6667 31.3327 26.2789 31.3327 23.3333C31.3327 20.3878 28.9449 18 25.9993 18C23.0538 18 20.666 20.3878 20.666 23.3333ZM33.9993 28.6667C33.9993 30.8758 35.7902 32.6667 37.9993 32.6667C40.2085 32.6667 41.9993 30.8758 41.9993 28.6667C41.9993 26.4575 40.2085 24.6667 37.9993 24.6667C35.7902 24.6667 33.9993 26.4575 33.9993 28.6667Z"
                                  fill="#8280FF"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M25.9778 31.334C19.6826 31.334 14.5177 34.5693 14.0009 40.9329C13.9727 41.2796 14.6356 42.0007 14.97 42.0007H36.9956C37.9972 42.0007 38.0128 41.1946 37.9972 40.934C37.6065 34.3916 32.3616 31.334 25.9778 31.334ZM45.2746 42.0007L40.1333 42.0007C40.1333 38.9994 39.1417 36.2298 37.4683 34.0015C42.0103 34.0511 45.7189 36.3475 45.998 41.2007C46.0092 41.3961 45.998 42.0007 45.2746 42.0007Z"
                                  fill="#8280FF"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 statistic-box">
                        <div className="statistic-box-content">
                          <div className="statistic-box-content_text">
                            <div className="statistic-box-content_description">
                              Today Revenues
                            </div>
                            {2 === 0 ? (
                              <div>
                                <p className="statistic-box-content_linedown">
                                  No orders today
                                </p>
                              </div>
                            ) : (
                              <div>
                                <p className="statistic-box-content_money">
                                  {formatCurrency(1000000)}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="statistic-box-img">
                            <svg
                              width="60"
                              height="60"
                              viewBox="0 0 60 60"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.21"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0.0878906 30V37C0.0878906 49.7025 10.3853 60 23.0879 60H30.0879H37.0879C49.7904 60 60.0879 49.7025 60.0879 37V30V23C60.0879 10.2975 49.7904 0 37.0879 0H30.0879H23.0879C10.3853 0 0.0878906 10.2975 0.0878906 23V30Z"
                                fill="#FEC53D"
                              />
                              <rect
                                x="11.752"
                                y="15.3672"
                                width="36.5831"
                                height="29.2665"
                                rx="5"
                                fill="#FFD600"
                              />
                              <rect
                                x="29.3125"
                                y="15.3672"
                                width="1.46331"
                                height="29.2662"
                                fill="#F7ECD2"
                              />
                              <mask id="path-4-inside-1_845_604" fill="white">
                                <path d="M11.7056 41.707C13.243 41.707 14.7652 41.4042 16.1855 40.8159C17.6058 40.2276 18.8963 39.3653 19.9834 38.2783C21.0704 37.1912 21.9327 35.9007 22.521 34.4804C23.1093 33.0601 23.4121 31.5379 23.4121 30.0006C23.4121 28.4632 23.1093 26.941 22.521 25.5207C21.9327 24.1004 21.0704 22.8099 19.9834 21.7228C18.8963 20.6358 17.6058 19.7735 16.1855 19.1852C14.7652 18.5969 13.243 18.2941 11.7056 18.2941L11.7056 30.0006L11.7056 41.707Z" />
                              </mask>
                              <path
                                d="M11.7056 41.707C13.243 41.707 14.7652 41.4042 16.1855 40.8159C17.6058 40.2276 18.8963 39.3653 19.9834 38.2783C21.0704 37.1912 21.9327 35.9007 22.521 34.4804C23.1093 33.0601 23.4121 31.5379 23.4121 30.0006C23.4121 28.4632 23.1093 26.941 22.521 25.5207C21.9327 24.1004 21.0704 22.8099 19.9834 21.7228C18.8963 20.6358 17.6058 19.7735 16.1855 19.1852C14.7652 18.5969 13.243 18.2941 11.7056 18.2941L11.7056 30.0006L11.7056 41.707Z"
                                stroke="#F7ECD2"
                                stroke-width="3"
                                mask="url(#path-4-inside-1_845_604)"
                              />
                              <mask id="path-5-inside-2_845_604" fill="white">
                                <path d="M48.3823 18.293C46.8449 18.293 45.3227 18.5958 43.9024 19.1841C42.4821 19.7724 41.1916 20.6347 40.1045 21.7217C39.0175 22.8088 38.1552 24.0993 37.5669 25.5196C36.9786 26.9399 36.6758 28.4621 36.6758 29.9994C36.6758 31.5368 36.9786 33.059 37.5669 34.4793C38.1552 35.8996 39.0175 37.1901 40.1045 38.2772C41.1916 39.3642 42.4821 40.2265 43.9024 40.8148C45.3227 41.4031 46.8449 41.7059 48.3823 41.7059L48.3823 29.9994V18.293Z" />
                              </mask>
                              <path
                                d="M48.3823 18.293C46.8449 18.293 45.3227 18.5958 43.9024 19.1841C42.4821 19.7724 41.1916 20.6347 40.1045 21.7217C39.0175 22.8088 38.1552 24.0993 37.5669 25.5196C36.9786 26.9399 36.6758 28.4621 36.6758 29.9994C36.6758 31.5368 36.9786 33.059 37.5669 34.4793C38.1552 35.8996 39.0175 37.1901 40.1045 38.2772C41.1916 39.3642 42.4821 40.2265 43.9024 40.8148C45.3227 41.4031 46.8449 41.7059 48.3823 41.7059L48.3823 29.9994V18.293Z"
                                stroke="#F7ECD2"
                                stroke-width="3"
                                mask="url(#path-5-inside-2_845_604)"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 statistic-box">
                        <div className="statistic-box-content">
                          <div className="statistic-box-content_text">
                            <div className="statistic-box-content_description">
                              Today Orders
                            </div>
                            {2 === 0 ? (
                              <div>
                                <p className="statistic-box-content_linedown">
                                  No orders today
                                </p>
                              </div>
                            ) : (
                              <div>
                                <p className="statistic-box-content_money">
                                  {100}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="statistic-box-icon">
                            <div className="person-icon">
                              <svg
                                width="60"
                                height="60"
                                viewBox="0 0 60 60"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  opacity="0.3"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
                                  fill="#FF9066"
                                />
                                <path
                                  opacity="0.78"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M28.6319 23.8074C28.6519 23.5469 28.8692 23.3457 29.1304 23.3457H29.5482C29.8051 23.3457 30.0202 23.5404 30.0458 23.796L30.6674 30.0124L35.0821 32.5351C35.2379 32.6241 35.3341 32.7898 35.3341 32.9692V33.3577C35.3341 33.6874 35.0206 33.9269 34.7025 33.8401L28.3994 32.1211C28.168 32.058 28.014 31.8395 28.0324 31.6004L28.6319 23.8074Z"
                                  fill="#FF9066"
                                />
                                <path
                                  opacity="0.901274"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M22.7224 14.9836C22.4583 14.6689 21.9483 14.7893 21.853 15.189L20.2195 22.0371C20.1419 22.3628 20.3999 22.6713 20.7342 22.6523L27.7789 22.2531C28.1898 22.2298 28.3982 21.7478 28.1337 21.4325L26.332 19.2853C27.4967 18.8874 28.7318 18.6795 30 18.6795C36.2592 18.6795 41.3333 23.7536 41.3333 30.0128C41.3333 36.2721 36.2592 41.3462 30 41.3462C23.7408 41.3462 18.6667 36.2721 18.6667 30.0128C18.6667 28.9621 18.809 27.9329 19.0864 26.9438L16.5188 26.2236C16.1808 27.4288 16 28.6997 16 30.0128C16 37.7448 22.268 44.0128 30 44.0128C37.732 44.0128 44 37.7448 44 30.0128C44 22.2809 37.732 16.0128 30 16.0128C28.0553 16.0128 26.2031 16.4094 24.52 17.126L22.7224 14.9836Z"
                                  fill="#FF9066"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 statistic-box">
                        <div className="statistic-box-content">
                          <div className="statistic-box-content_text">
                            <div className="statistic-box-content_description">
                              Total Users
                            </div>
                            <div>
                              <p className="statistic-box-content_money">
                                {123}
                              </p>
                            </div>
                          </div>
                          <div className="statistic-box-icon">
                            <div className="booking-icon">
                              <svg
                                width="60"
                                height="60"
                                viewBox="0 0 60 60"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  opacity="0.21"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
                                  fill="#8280FF"
                                />
                                <path
                                  opacity="0.587821"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M20.666 23.3333C20.666 26.2789 23.0538 28.6667 25.9993 28.6667C28.9449 28.6667 31.3327 26.2789 31.3327 23.3333C31.3327 20.3878 28.9449 18 25.9993 18C23.0538 18 20.666 20.3878 20.666 23.3333ZM33.9993 28.6667C33.9993 30.8758 35.7902 32.6667 37.9993 32.6667C40.2085 32.6667 41.9993 30.8758 41.9993 28.6667C41.9993 26.4575 40.2085 24.6667 37.9993 24.6667C35.7902 24.6667 33.9993 26.4575 33.9993 28.6667Z"
                                  fill="#8280FF"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M25.9778 31.334C19.6826 31.334 14.5177 34.5693 14.0009 40.9329C13.9727 41.2796 14.6356 42.0007 14.97 42.0007H36.9956C37.9972 42.0007 38.0128 41.1946 37.9972 40.934C37.6065 34.3916 32.3616 31.334 25.9778 31.334ZM45.2746 42.0007L40.1333 42.0007C40.1333 38.9994 39.1417 36.2298 37.4683 34.0015C42.0103 34.0511 45.7189 36.3475 45.998 41.2007C46.0092 41.3961 45.998 42.0007 45.2746 42.0007Z"
                                  fill="#8280FF"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <LineChart />
                      <CircleChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>
    </div>
  );
  
}