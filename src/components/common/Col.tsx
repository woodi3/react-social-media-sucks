import styled from 'styled-components';

interface ColProps {
    size?: number | string;
    pull?: number | string;
    push?: number | string;
}

const isValidSize = (num: number|string) => {
    return num > 0 && num <= 12;
}
const getColSize = (input: number|string) => {
    let num = parseInt(input.toString());
    if(isNaN(num))
        num = 0;
    return `${(num/12) * 100}%`;
}

export const Col = styled.div<ColProps>`
    -webkit-box-flex: ${props => props.size ? "0" : "1" };
    -ms-flex: 0 0 ${props => props.size ? isValidSize(props.size) ? getColSize(props.size) : "100%" : "100%"};
    flex: 0 0 ${props => props.size ? isValidSize(props.size) ? getColSize(props.size) : "100%" : "100%"};
    max-width: ${props => props.size ? isValidSize(props.size) ? getColSize(props.size) : "100%" : "100%"};
    flex-basis: ${props => props.size ? "" : "0" };
    -ms-flex-positive: ${props => props.size ? "" : "1" };
    flex-grow: ${props => props.size ? "" : "1" };
    padding-left: .5rem;
    padding-right: .5rem;
    margin-right: ${props => props.pull ? (isValidSize(props.pull) ? getColSize(props.pull) : "0px") : "0px" };
    margin-left: ${props => props.push ? (isValidSize(props.push) ? getColSize(props.push) : "0px") : "0px" };
`;
