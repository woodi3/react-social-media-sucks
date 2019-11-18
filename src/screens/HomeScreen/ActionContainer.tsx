import React from 'react';
import { Input, Col, Row, Button } from '../../components';
import './HomeScreen.css';

export interface IActionContainerProps {
    handleSearch: (searchVal: string) => void;
    searchVal: string;
    openAddPostModal: () => void;
}
export const ActionContainer: React.FC<IActionContainerProps> = ({handleSearch, searchVal, openAddPostModal} : IActionContainerProps) => {
    return (
        <Row className="Home-ActionBar">
            <Col size={3}>
                <Input className="Home-ActionBar-Search" type="search" value={searchVal} placeholder="Search for posts..." onChange={(evt) => handleSearch(evt.target.value)}/>
            </Col>
            <Col size={3} push={6}>
                <Button onClick={openAddPostModal}>Add Post</Button>
            </Col>
        </Row>
        
    )
}