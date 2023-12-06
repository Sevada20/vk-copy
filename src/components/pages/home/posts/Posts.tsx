import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../../redux/slices/postSlice/postSlice";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import styles from "./Posts.module.css";
import { AppDispatch, RootState } from "../../../../redux/store";
import { IPostItem } from "../../../../redux/slices/postSlice/types";

const Posts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);

  const db = getFirestore();
  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (doc) => {
      const newPosts = doc.docs.map((d) => d.data());
      dispatch(setPosts(newPosts as IPostItem[] | []));
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      {posts.map((postItem) => {
        return (
          <div className={styles.postsContainer}>
            <div className={styles.postAvatarContainer}>
              <img src={postItem.author.avatar} width="40px" height="40px" />
              <span>{postItem.author.name}</span>
            </div>
            <span className={styles.contentSpan}>{postItem.content}</span>
          </div>
        );
      })}
    </>
  );
};

export default Posts;
