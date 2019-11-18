import React from 'react';
import styled from 'styled-components';
import { ModalContainer, ModalContainerProps } from './ModalContainer';

interface ModalProps extends ModalContainerProps {
    children: React.ReactNode;
    width?: string | number;
}

interface ModalContentProps {
    width?: string | number;
}

const ModalContent = styled.div<ModalContentProps>`
    position:fixed;
    background: white;
    width: ${props => props.width ? props.width : "80%"};
    height: auto;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
`;

export const Modal = React.forwardRef(
    ({isVisible, hasBackdrop, children, width}: ModalProps, ref?: React.Ref<HTMLDivElement>) => {
        return (
            <ModalContainer isVisible={isVisible} hasBackdrop={hasBackdrop} ref={ref}>
                <ModalContent width={width}>
                    {children}
                </ModalContent>
            </ModalContainer>
        )
    }
);