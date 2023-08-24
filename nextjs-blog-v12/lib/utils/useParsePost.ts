import dayjs from "dayjs";
import readingTime from "reading-time";
import { Post } from "contentlayer/generated";

export const parsePost = (post: Post): Post | undefined => {
  try {
    if (post.draft) {
      return;
    }

    return {
      ...post,
      tags: post.tags.filter(Boolean),
      date: dayjs(post.date).format("YY.MM.DD"),
      body: post.body,
      readingTime,
    };
  } catch (e) {
    console.error(e);
  }
};
