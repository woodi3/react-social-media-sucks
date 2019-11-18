import React, {useEffect} from 'react';
import { PostDetail, Row, Col } from '../../components';
import { Post } from '../../models';
import './PostContainer.css';
import './HomeScreen.css';
import { useListenOnWindowChange } from '../../hooks';
import { LoadingDots } from '../../components';


interface IPostListProps {
    posts: Post[];
    addPostRef: (node: HTMLDivElement) => void;
    gridRef: React.RefObject<HTMLDivElement>;
}
const PostList: React.FC<IPostListProps> = ({posts, gridRef, addPostRef}: IPostListProps) => {
    if(posts.length > 0) {
        const postList = posts.map(post => 
            (
                <div className="Post-Div" key={post.id} ref={addPostRef}>
                    <PostDetail post={post}/>
                </div>
            )
        )
        return (
            <div className="Post-Container" ref={gridRef} style={{marginLeft: 15, marginRight: 15}}>
                {postList}
            </div>
        );
    }
    return (
        <Row>
            <Col size={8} push={2}>
                <h3 style={{textAlign: "center"}}>No Posts To Show</h3>
            </Col>
        </Row>
    )
}

export interface IPostContainerProps {
    posts: Post[],
    loadingPosts: boolean,
}
export const PostContainer: React.FC<IPostContainerProps> = ({posts, loadingPosts}: IPostContainerProps) => {
    let postRefs: HTMLDivElement[] = [];

    const addPostRef = (node: HTMLDivElement) => {
        postRefs = [...postRefs, node];
    }
    let gridRef = React.createRef<HTMLDivElement>();

    const resizeGridItem = (node: HTMLElement) => {
        const rowHeight = parseInt(window.getComputedStyle(gridRef.current as Element).getPropertyValue('grid-auto-rows'));
        const rowGap = parseInt(window.getComputedStyle(gridRef.current as Element).getPropertyValue('grid-row-gap'));
        const contentEl = node.querySelector('.content');
        let rowSpan;
        if (contentEl) {
            rowSpan = Math.ceil((contentEl.getBoundingClientRect().height + rowGap) / (rowHeight+rowGap));
        }
        else {
            rowSpan = 0;
        }
        node.style.gridRowEnd = `span ${rowSpan}`;
    }

    const resizeAllGridItems = () => {
        for(let i =0; i<postRefs.length; i++){
            resizeGridItem(postRefs[i]);
        }
    }
    
    useEffect(() => {
        resizeAllGridItems();
    }, [posts]);

    useListenOnWindowChange(resizeAllGridItems);

    const toggleRender = () => {
        if(loadingPosts) {
            // show loader
            return <LoadingDots dotColor="#0099ff"/>;
        }
        else {
            return (
              <PostList
                gridRef={gridRef}
                addPostRef={addPostRef}
                posts={posts}
              />
            );
        }
    }
    
    return (
        <div className="container">
            <h2 className="Post-Feed-Title">Feed</h2>
            {toggleRender()}
        </div>
    )
}