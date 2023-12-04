import React from "react";
import styles from "./AddPosts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../../../redux/slices/postSlice/postSlice";

const AddPosts = () => {
  const [inputValue, setInputValue] = React.useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const changeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const addPostHandler = (e) => {
    if (e.key === "Enter") {
      dispatch(addPost({ user, content: inputValue }));
      setInputValue("");
    }
  };

  return (
    <div className={styles.addPostContainer}>
      <input
        type="text"
        placeholder="tell me what's new with you"
        value={inputValue}
        onChange={changeInputValue}
        onKeyPress={addPostHandler}
      />
    </div>
  );
};

export default AddPosts;
