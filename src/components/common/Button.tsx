import styled from 'styled-components';

interface IButtonProps {
    readonly primary?: boolean;
    readonly width?: string | number;
    readonly size?: 'sm' | 'lg';
}

const getBtnPadding = (size: 'sm' | 'lg' | undefined) => {
    if(!size)
        return '.375rem .75rem';
    else if(size === 'sm')
        return '.25rem .5rem';
    else if(size === 'lg')
        return '.5rem 1rem';
    else 
        return '.375rem .75rem';
};

const getBtnFontSize = (size: 'sm' | 'lg' | undefined) => {
    if(!size)
        return '1rem';
    else if(size === 'sm')
        return '.875rem';
    else if(size === 'lg')
        return '1.25rem';
    else 
        return '1rem';
};

const getBtnBorderRadius = (size: 'sm' | 'lg' | undefined) => {
    if(!size)
        return '.25rem';
    else if(size === 'sm')
        return '.2rem';
    else if(size === 'lg')
        return '.3rem';
    else 
        return '.25rem';
};

export const Button = styled.button<IButtonProps>`
    background: ${props => props.primary ? "#0099ff" : "white"};
    color: ${props => props.primary ? "white" : "#0099ff"};
    width: ${props => props.width ? props.width : "auto"};
    font-size: ${props => getBtnFontSize(props.size)};
    margin: 1em;
    padding: ${props => getBtnPadding(props.size)};
    border: 2px solid #0099ff;
    border-radius: ${props => getBtnBorderRadius(props.size)};

    :hover:not(:disabled) {
        color: white;
        background-color: ${props => props.primary ? "#006bb2" : "#0099ff"};
        border-color: ${props => props.primary ? "#006bb2" : "#0099ff"};
    }
    :disabled {
        opacity: .65;
    }
`;
