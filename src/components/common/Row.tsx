import styled from 'styled-components';

interface IRowProps {
    justifyContent?: string;
    alignItems?: string;
}

export const Row = styled.div<IRowProps>`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    margin-bottom: 15px;
    justify-content: ${props => props.justifyContent ? props.justifyContent : "initial"};
    alignItems: ${props => props.alignItems ? props.alignItems : "initial"};
`;
