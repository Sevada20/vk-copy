import React from "react";
import Menu from "./menu/Menu";
import Users from "./users/Users";
import styles from "./Sidebar.module.css";
import AuthorizedUser from "./authorizedUser/AuthorizedUser";

const Sidebar:React.FC = () => {
  return (
    <div className={styles.sidebarContainer}>
      <AuthorizedUser />
      <Users />
      <Menu />
    </div>
  );
};

export default Sidebar;
