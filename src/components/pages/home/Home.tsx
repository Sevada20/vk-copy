import React from "react";
import AddPosts from "./addPosts/AddPosts";
import Posts from "./posts/Posts";
import PostsExample from "./postsExample/PostsExample";

const Home: React.FC = () => {
  return (
    <div>
      <AddPosts />
      <Posts />
      <PostsExample />
    </div>
  );
};

export default Home;
