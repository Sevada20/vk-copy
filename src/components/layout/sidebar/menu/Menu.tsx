import React from "react";
import { dataMenu } from "./dataMenu";
import styles from "./Menu.module.css";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.menuContainer}>
      {dataMenu.map((menuItem) => {
        return (
          <div
            key={menuItem.link}
            onClick={() => navigate(menuItem.link)}
            className={styles.menuItemContainer}
          >
            <menuItem.icon />
            <span>{menuItem.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
