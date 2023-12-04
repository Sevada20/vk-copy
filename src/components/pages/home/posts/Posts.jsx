import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../../redux/slices/postSlice/postSlice";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import styles from "./Posts.module.css";

const Posts = () => {
  const dispatch = useDispatch();
  const db = getFirestore();
  const posts = useSelector((state) => state.posts.posts);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (doc) => {
      const newPosts = doc.docs.map((d) => d.data());
      dispatch(setPosts(newPosts));
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
