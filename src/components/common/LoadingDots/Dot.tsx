import styled, { keyframes } from "styled-components";

interface IDotProps {
    delay: string,
    dotColor?: string,
}

const BounceAnimation = keyframes`
  0%, 60%, 100% { transform: initial; }
  30% { transform: translateY(-15px); }
`;

export const Dot = styled.div<IDotProps>`
    background-color: ${props =>
    props.dotColor ? props.dotColor : "black"};
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin: 0 5px;
    /* Animation */
    animation: ${BounceAnimation} 1s linear infinite;
    animation-delay: ${props => props.delay};
`;
