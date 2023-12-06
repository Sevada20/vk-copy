import React from "react";
import styles from "./PostsExample.module.css";

const postsData: {
  id: number;
  imageLink: string;
}[] = [
  {
    id: 1,
    imageLink:
      "https://mixnews.lv/wp-content/uploads/2020/09/18/2020-09-18-mixnews-1594705838_krasota-prirody-na-fotografiyax-14.jpg",
  },
  {
    id: 2,
    imageLink:
      "https://severnykavkaz.ru/wp-content/uploads/2019/02/priroda-ingushetii.jpg",
  },
  {
    id: 3,
    imageLink:
      "https://avatars.mds.yandex.net/i?id=08f9ed5b84e0d11fcb5fb88a9775c2c99a8f770d-8253146-images-thumbs&n=13",
  },
  {
    id: 4,
    imageLink:
      "https://n1s1.hsmedia.ru/7d/f4/65/7df465013dd467c13ab94d0ff1c2cd4d/1000x600_0xac120003_8887241501666366066.jpeg",
  },
  {
    id: 5,
    imageLink: "https://media.rmk.ee/photos/i-MtS3g3M-X3_block.jpg",
  },
  {
    id: 6,
    imageLink: "https://azbyka.ru/wp-content/uploads/2016/07/priroda.jpg",
  },
];

const PostsExample: React.FC = () => {
  return (
    <div className={styles.postsExampleContainer}>
      <div className={styles.spansContainer}>
        <span>National Geographic</span>
        <span>10 minut ago</span>
      </div>
      <div className={styles.imgContainer}>
        {postsData.map((postItem) => (
          <img
            src={postItem.imageLink}
            key={postItem.id}
            alt="no img"
            width="29%"
            height="29%"
          />
        ))}
      </div>
    </div>
  );
};
export default PostsExample;
