import styled from 'styled-components';

export interface ModalContainerProps {
    isVisible: boolean;
    hasBackdrop?: boolean;
}

export const ModalContainer = styled.div<ModalContainerProps>`
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: ${props => {
        if(props.hasBackdrop !== undefined){
            return props.hasBackdrop ? "rgba(0, 0, 0, 0.6)" : "none";
        }
        return "rgba(0, 0, 0, 0.6)";
    }};
    display: ${props => props.isVisible ? 'block' : 'none'};
`;