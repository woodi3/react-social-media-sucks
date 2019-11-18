import React, {useState, useEffect} from 'react';
import autosize from 'autosize';
import { Button, TextArea } from '../../components';
import { IUser, IPost } from '../../models';
import './AddPost.css';

export interface IAddPostProps {
    user: IUser;
    createPost: (post: IPost) => Promise<void>;
}

const MAX_POST_LENGTH = 500;

export const AddPost: React.FC<IAddPostProps> = ({user, createPost}: IAddPostProps) => {
    let newPost: IPost = {
        content: "",
        userID: user.id || "",
        comments: [],
        createdAt: undefined
    };
    const [content, setContent] = useState("");

    const handleNewPost = () => {
        newPost.content = content;
        createPost(newPost);
        setContent("");
    }

    const isDisabled = () => content.trim() === "";

    const textareaRef = React.createRef<HTMLTextAreaElement>();

    useEffect(() => {
        if(textareaRef.current) {
            autosize(textareaRef.current);
        }
    }, [])

    return (
        <div>
            <TextArea 
                ref={textareaRef}
                autoFocus
                minLength={0}
                maxLength={MAX_POST_LENGTH} 
                name="addPostTextArea" 
                spellCheck
                value={content}
                onChange={(evt) => setContent(evt.target.value)}
                placeholder="Enter some stuff no one cares about...">
            </TextArea>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className="AddPostLimitText">{content.length} / {MAX_POST_LENGTH}</p>
                <Button size="lg" disabled={isDisabled()} onClick={handleNewPost}>Post</Button>
            </div>
        </div>
    )
}