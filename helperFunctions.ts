import {
  User,
  Upvote,
  Tag,
  Thumbdown,
  Thumbup,
  Post,
  Comment,
} from "./interfaces";
import {
  postsApi,
  commentsApi,
  upvoteApi,
  thumbupApi,
  thumbdownApi,
  viewsApi,
  deleteThumbsUpApi,
  deleteThumbsDownApi,
} from "./env_variables";

export const getAuthorName = (
  postId: number,
  users: { name: string; posts: { id: number }[] }[]
): string | undefined => {
  for (let user of users) {
    for (let post of user.posts) {
      if (post.id == postId) {
        return user.name;
      }
    }
  }
};

export const getAuthorAvatar = (
  postId: number,
  users: { posts: { id: number }[]; image: string }[]
): string | undefined => {
  for (let user of users) {
    for (let post of user.posts) {
      if (post.id == postId) {
        return user.image;
      }
    }
  }
};

export const getTeaserText = (text: string, windowSize: number): string => {
  let maxLengthOfTeaserText: number;

  if (windowSize < 400) {
    maxLengthOfTeaserText = 40;
  } else if (windowSize > 400 && windowSize < 600) {
    maxLengthOfTeaserText = 45;
  } else if (windowSize > 600 && windowSize < 720) {
    maxLengthOfTeaserText = 65;
  } else if (windowSize >= 720 && windowSize < 900) {
    maxLengthOfTeaserText = 55;
  } else if (windowSize >= 900 && windowSize < 960) {
    maxLengthOfTeaserText = 70;
  } else if (windowSize >= 960 && windowSize < 1035) {
    maxLengthOfTeaserText = 60;
  } else if (windowSize >= 1035 && windowSize < 1200) {
    maxLengthOfTeaserText = 70;
  } else if (windowSize >= 1200 && windowSize < 1400) {
    maxLengthOfTeaserText = 85;
  } else if (windowSize >= 1400) {
    maxLengthOfTeaserText = 90;
  }

  return text.length > maxLengthOfTeaserText
    ? text.slice(0, maxLengthOfTeaserText) + "..."
    : text;
};

//in Schema.Prisma POST table has a field 'tags' which is an array of objects {name: tagName},the function below lets us
//transform it to an array of strings as we need it to map
export const getTags = (tagsArrayOfObjects: Tag[]): string[] => {
  const tagsArray = [];
  for (let tag of tagsArrayOfObjects) {
    tagsArray.push(tag.name);
  }
  return tagsArray;
};

export const tags: string[] = [
  "Javascript",
  "C++",
  "Ruby",
  "Python",
  "Typescript",
  "HTML",
  "CSS",
  "Angular",
  "Vue",
  "Git",
  "Array",
  "Function",
  "Object",
  "Variables",
  "Scope",
  "Github",
  "Next.js",
  "Node.js",
  "SCSS",
  "JSON",
  "React",
  "PostgreSql",
  "Prisma",
  "Hooks",
  "Java",
  "PHP",
  "Django",
];

export const postAlreadyUpvotedByUser = (
  upvotes: Thumbup[],
  user: string
): boolean => {
  for (let upvote of upvotes) {
    if (upvote.votedBy == user) {
      return true;
    }
  }
  return false;
};

export const commentAlreadyVotedByUser = (
  votes: Thumbup[],
  user: string,
  commentId: number
): boolean => {
  for (let vote of votes) {
    if (vote.commentId == commentId && vote.votedBy == user) {
      return true;
    }
  }
  return false;
};

export const getSinglePost = (
  posts: Post[],
  postId: number
): Post | undefined => {
  for (let post of posts) {
    if (post.id == postId) {
      return post;
    }
  }
};

export const getUserPostsQuantity = (
  users: User[],
  authorName: string
): number | undefined => {
  for (let user of users) {
    if (user.name === authorName) {
      return user.posts.length;
    }
  }
};

export const findPostsByTag = (tags: Tag[], tagName: string): Post[] | null => {
  for (let tag of tags) {
    if (tag.name === tagName) {
      return tag.posts;
    }
  }
  return null;
};

export const jsonFetch = async (URL: RequestInfo | URL) => {
  return await fetch(URL).then((response) => response.json());
};

export const handleSubmitVote = async (
  id: number,
  user: string,
  upvotes: Upvote[]
) => {
  if (postAlreadyUpvotedByUser(upvotes, user)) {
    return;
  }

  const response = await fetch(`${upvoteApi}`, {
    method: "POST",
    body: JSON.stringify({ id, user }),
    headers: {
      "Content-type": "application/json",
    },
  });
  return response;
};

export const addPostToDb = async (
  title: string,
  content: string,
  author: User,
  tags: string[]
) => {
  const response = await fetch(`${postsApi}`, {
    method: "POST",
    body: JSON.stringify({ title, content, author, tags }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const handleIncreaseViews = async (id: number) => {
  const response = await fetch(`${viewsApi}`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const getCommentsIdsUnlikedByUser = (
  comments: Comment[],
  userEmail: string
): number[] => {
  const unlikes = [];
  const commentsUnlikedByUser = [];

  for (let comment of comments) {
    unlikes.push(...comment.thumbsDown);
  }
  for (let unlike of unlikes) {
    if (unlike.votedBy == userEmail) {
      commentsUnlikedByUser.push(unlike.commentId);
    }
  }
  return commentsUnlikedByUser;
};

export const getCommentsIdsLikedByUser = (
  comments: Comment[],
  userEmail: string
): number[] => {
  const likes = [];
  const commentsLikedByUser = [];

  for (let comment of comments) {
    likes.push(...comment.thumbsUp);
  }
  for (let like of likes) {
    if (like.votedBy == userEmail) {
      commentsLikedByUser.push(like.commentId);
    }
  }
  return commentsLikedByUser;
};

export const checkIfAlreadyLiked = (
  commentsIdsLikedByUser: number[],
  commentId: number
): boolean => {
  if (commentsIdsLikedByUser.includes(commentId)) {
    return true;
  } else {
    return false;
  }
};

export const checkIfAlreadyUnliked = (
  commentsIdsUnlikedByUser: number[],
  commentId: number
): boolean => {
  if (commentsIdsUnlikedByUser.includes(commentId)) {
    return true;
  } else {
    return false;
  }
};

export const removeThumbUp = async (
  commentId: number,
  userEmail: string,
  refresh: () => void
) => {
  const response = await fetch(`${deleteThumbsUpApi}`, {
    method: "POST",
    body: JSON.stringify({ commentId, userEmail }),
    headers: {
      "Content-type": "application-json",
    },
  });

  if (response.status < 300) {
    refresh();
  }

  return response;
};

export const removeThumbDown = async (
  commentId: number,
  userEmail: string,
  refresh: () => void
) => {
  const response = await fetch(`${deleteThumbsDownApi}`, {
    method: "POST",
    body: JSON.stringify({ commentId, userEmail }),
    headers: {
      "Content-type": "application-json",
    },
  });

  if (response.status < 300) {
    refresh();
  }

  return response;
};

export const handleUpdateThumbsUp = async (
  commentId: number,
  user: string,
  refresh: () => void
) => {
  const thumbsUp = await jsonFetch(`${thumbupApi}`);

  if (commentAlreadyVotedByUser(thumbsUp, user, commentId)) {
    return;
  }

  const response = await fetch(`${thumbupApi}`, {
    method: "POST",
    body: JSON.stringify({ commentId, user }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (response.status < 300) {
    refresh();
  }

  return response;
};

export const handleUpdateThumbsDown = async (
  commentId: number,
  user: string,
  refresh: () => void
) => {
  const thumbsDown = await jsonFetch(`${thumbdownApi}`);
  if (commentAlreadyVotedByUser(thumbsDown, user, commentId)) {
    return;
  }
  const response = await fetch(`${thumbdownApi}`, {
    method: "POST",
    body: JSON.stringify({ commentId, user }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (response.status < 300) {
    refresh();
  }

  return response;
};
