import { PostState, PostActionTypes, ADD_POST, REFRESH_POSTS } from "./types";

const initialState: PostState = {
    posts: []
}

export function postReducer(state = initialState, action: PostActionTypes): PostState {
    switch(action.type){
        case ADD_POST: {
            return {
                posts: [...state.posts, action.payload]
            }
        }
        case REFRESH_POSTS: {
            return {
                posts: [...action.payload]
            }
        }
        default:
            return state
    }
}