import React from 'react';
import { Post } from '../../models';
import { Row, Col, Card } from '../common';
import './PostDetail.css';

interface PostDetailProps {
    post: Post
    // add some functions to manipulate the post
}


export const PostDetail: React.FC<PostDetailProps> = ({ post }: PostDetailProps) => {
    return (
        <Card className="content" rounded hover onClick={() => console.log(post)}>
            <Row>
                <Col size={4}>
                    <img className="post-avatar" src="https://via.placeholder.com/100x100" alt="Post detail"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>
                        {post.content}
                    </p>
                </Col>
            </Row>
        </Card>
    )
}