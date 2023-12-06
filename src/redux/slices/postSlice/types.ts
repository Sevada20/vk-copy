export interface IAuthor {
  avatar: string;
  id: string;
  name: string;
}
export interface IPostItem {
  author: IAuthor;
  content: string;
  createdAt: string;
}
export interface IPostsState {
  posts: IPostItem[] | [];
  status: string;
  error: null | string;
}

export interface IUser {
  id: string;
  avatar: string;
  name: string | null;
}

export interface IPostData {
  user: IUser | null;
  content: string;
}
