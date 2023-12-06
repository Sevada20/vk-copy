import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import styles from "./Layout.module.css";
import Sidebar from "./sidebar/Sidebar";

const Layout: React.FC = () => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <div className={styles.sidebarOutletContainer}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
