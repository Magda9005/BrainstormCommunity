interface TagName {
  id:number;
  tagName:string;
}


export interface Thumbup{
  id:number;
  commentId:number;
  votedBy:string
}

export interface Thumbdown{
  id:number;
  commentId:number;
  votedBy:string
}

export interface Comment {
  id:number;
  createdAt:string;
  postId:number;
  content:string;
  author:string;
  authorImage:string;
  upvotesCount:number;
  downvotesCount:number;
  thumbsUp: Thumbup[]
  thumbsDown: Thumbdown[]
}

export interface Upvote{
  id:number;
  postId:number;
  votedBy:string
}

export interface Post {
    id:number;
    title:string;
    content: string;
    authorId: string;
    viewCount: number;
    likeCount:number;
    upvotesCount:number;
    commentsCount:number;
    createdAt:string;
    tags:Tag[];
    comments:Comment[];
    upvotes:Upvote[]
  }
  
  export interface User{
    id:number;
    name:string;
    email:string;
    image:string;
    posts:Post[]
  }
  
export interface Tag{
  name:string;
  posts: Post[]
}

