import { AppState } from '../../store'
import { connect } from 'react-redux';
import { HomeScreen } from '../../screens';
import { Dispatch } from 'redux';
import { refreshPosts, addPost } from '../../store/posts';
import { IPost } from '../../models';

interface DispatchFromProps {
    refreshPosts: (newPosts: IPost[]) => void
    addPost: (newPost: IPost) => void
}

const orderPostsByDateCreated = (posts: IPost[]) => {
    posts.sort((a, b) => {
        if(!a.createdAt || !b.createdAt) {
            return 0;
        }
        const d = new Date(a.createdAt);
        const e = new Date(b.createdAt);
        return d > e ? -1 : (
            a < b ? 1 : 0
        );
    });
    return posts;
}

const mapStateToProps = (state: AppState): AppState => {
    return {
        postState: {
            posts: orderPostsByDateCreated(state.postState.posts)
        },
        ...state
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps => ({
    refreshPosts: (newPosts: IPost[]) => dispatch(refreshPosts(newPosts)),
    addPost: (newPost: IPost) => dispatch(addPost(newPost))
});

export const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);