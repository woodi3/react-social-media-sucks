import { IPost } from "../../models";
import { PostActionTypes, ADD_POST, REFRESH_POSTS } from "./types";


export function addPost(newPost: IPost): PostActionTypes {
    return {
        type: ADD_POST,
        payload: newPost
    }
}

export function refreshPosts(newPosts: IPost[]): PostActionTypes {
    return {
        type: REFRESH_POSTS,
        payload: newPosts
    }
}