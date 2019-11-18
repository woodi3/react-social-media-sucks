import React, {useState, useEffect} from 'react';
import { Row, Modal } from '../../components';
import { RouteComponentProps } from 'react-router-dom';
import { IPost, Post } from '../../models';
import { UserState } from '../../store/user';
import { PostState } from '../../store/posts';
import './HomeScreen.css';
import { PostContainer } from './PostContainer';
import { ActionContainer } from './ActionContainer';
import { AddPost } from './AddPost';

interface HomeScreenProps extends RouteComponentProps {
    userState: UserState
    postState: PostState
    refreshPosts: (newPosts: IPost[]) => void
    addPost: (newPost: IPost) => void
}

// TODO
// - Before implementing components, finish api side with:
//      - Creating posts
//      - Deleting posts
//      - Getting posts
//      - Getting post by Id

export const HomeScreen: React.FC<HomeScreenProps> = (props: HomeScreenProps) => {
    const { userState, postState, refreshPosts, addPost } = props;
    const [searchVal, setSearchVal] = useState("");

    const [addModalIsOpen, setIsAddModalOpen] = useState(false);

    const [loadingPosts, setPostLoader] = useState(true);

    const refresh = async () => {
      try {
        setPostLoader(true);
        const newPosts = await Post.loadAll();
        refreshPosts(newPosts);
        setPostLoader(false);
      } catch (e) {
        console.log(e);
      }
    };

    const getPostObjects = (posts: IPost[]): Post[] => {
      return posts.map(
        (post: IPost) =>
          new Post(
            post.content,
            post.userID,
            post.id,
            post.comments,
            post.createdAt
          )
      );
    };

    const searchPosts = (val: string): Post[] => {
      const matches = postState.posts.filter(p =>
        p.content.toLowerCase().includes(val.toLowerCase())
      );
      return getPostObjects(matches);
    };

    const createPost = async (newPost: IPost) => {
      const post = await Post.create(newPost);
      addPost(post);
      closeAddPostModal();
    };

    // modal handlers
    const openAddPostmodal = () => {
      setIsAddModalOpen(true);
    };
    const closeAddPostModal = () => {
      setIsAddModalOpen(false);
    };
    
    let addModalRef = React.createRef<HTMLDivElement>();

    window.onclick = (evt: MouseEvent) => {
      if (evt.target === addModalRef.current) {
        closeAddPostModal();
      }
    };

    useEffect(() => {
      refresh();
    }, []);

    return (
      <div className="container">
        <ActionContainer
          handleSearch={setSearchVal}
          searchVal={searchVal}
          openAddPostModal={openAddPostmodal}
        />
        <Row justifyContent="center">
          <PostContainer
            posts={searchPosts(searchVal)}
            loadingPosts={loadingPosts}
          />
        </Row>
        <Modal isVisible={addModalIsOpen} width="50%" ref={addModalRef}>
          <AddPost user={userState.user} createPost={createPost} />
        </Modal>
      </div>
    );
}