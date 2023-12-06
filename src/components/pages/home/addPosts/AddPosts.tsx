import React from "react";
import styles from "./AddPosts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../../../redux/slices/postSlice/postSlice";
import { AppDispatch, RootState } from "../../../../redux/store";

const AddPosts: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch: AppDispatch = useDispatch();
  console.log(user, "user");
  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addPostHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
