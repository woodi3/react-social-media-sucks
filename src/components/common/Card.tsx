import styled from 'styled-components';

interface CardProps {
    width?: string | number;
    rounded?: boolean;
    hover?: boolean;
}

export const Card = styled.div<CardProps>`
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 
                0 1px 1px 0 rgba(0,0,0,.14), 
                0 1px 3px 0 rgba(0,0,0,.12);
    transition: box-shadow 280ms cubic-bezier(.4,0,.2,1), transform 280ms cubic-bezier(.4,0,.2,1);
    display: block;
    position: relative;
    padding: 16px;
    border-radius: ${props => props.rounded ? "16px" : "4px"};
    background: #fff;
    width: ${props => props.width ? props.width : "auto"};

    :hover {
        transform: ${props => props.hover ? "scale(1.03)" : "none"};
    }
`;
