export interface PostData {
  body: string;
  author: string;
  created: number;
  edited: number;
  postId: string;
}

export interface Post {
  data: PostData;
  id: number;
}

export interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
