import {BASE_URL} from "@/api/endpoints.ts";
import {IPost} from "@/types/PostTypes.ts";

export const formatAvatarPath = (path: string) => {
    return `${BASE_URL}/api${[path]}`;
}

export const formatPostImagesPath = (post: IPost[]) => {
    const posts = post.map(post => {
        const comments = post.comments.map(comment => ({...comment, author: {...comment.author, avatarPath: formatAvatarPath(comment.author.avatarPath)}}))
        return {...post, author: {...post.author, avatarPath: formatAvatarPath(post.author.avatarPath)},
            comments: [...comments],
            imagePath: formatAvatarPath(post.imagePath)};
    })
    return posts;
}