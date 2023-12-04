import React from "react";
import AddPosts from "./addPosts/AddPosts";
import Posts from "./posts/Posts";

const Home = () => {
  return (
    <div>
      <AddPosts />
      <Posts />
    </div>
  );
};

export default Home;
