import React from "react";
import styles from "./Header.module.css";
import { IoSearchOutline } from "react-icons/io5";

const Header: React.FC = () => {
  const [isFocusedInput, setIsFocusedInput] = React.useState<boolean>(true);

  const handleFocusChange = (focused: boolean) => {
    setIsFocusedInput(focused);
  };

  return (
    <div className={styles.headerContainer}>
      <img
        className={styles.headerIcon}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/1200px-VK_Compact_Logo_%282021-present%29.svg.png"
        alt="vk icon"
        width="30px"
        height="30px"
      />
      {isFocusedInput && <IoSearchOutline className={styles.searchIcon} />}
      <input
        type="text"
        placeholder="search"
        onFocus={() => handleFocusChange(false)}
        onBlur={() => handleFocusChange(true)}
      />
    </div>
  );
};
export default Header;
