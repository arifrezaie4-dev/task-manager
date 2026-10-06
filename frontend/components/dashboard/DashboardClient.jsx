"use client";

import { useRef } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MainContent from "../MainContent";

export default function DashboardClient() {

  const tasksRef = useRef(null);

  return (
    <>
      <Navbar />

      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 id="sidebarMenuLabel">Menu</h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <Sidebar tasksRef={tasksRef} />
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 d-none d-md-block">
            <Sidebar tasksRef={tasksRef} />
          </div>

          <div className="col-md-9 col-lg-10">
            <MainContent tasksRef={tasksRef} />
          </div>
        </div>
      </div>
    </>
  );
}
