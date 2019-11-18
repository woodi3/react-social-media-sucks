import { IPost } from "../../models";

export interface PostState {
    posts: IPost[]
}

export const ADD_POST = 'ADD_POST';
export const REFRESH_POSTS = 'REFRESH_POSTS';

interface AddPostAction {
    type: typeof ADD_POST;
    payload: IPost;
}

interface RefreshPostsAction {
    type: typeof REFRESH_POSTS;
    payload: IPost[];
}


export type PostActionTypes = AddPostAction | RefreshPostsAction;