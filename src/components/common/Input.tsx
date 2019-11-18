import styled from 'styled-components';

export const Input = styled.input`
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #000f19;
    background-color: #fff;
    background-clip: padding-box;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #ced4da;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

    :focus {
        background-color: #fff;
        border-bottom-width: 2px;
        border-bottom-color: #7fccff;
        outline: 0;
    }
    :required:invalid:focus {
        border-bottom-color: #ff4444;
    }
    :required:valid:focus {
        border-bottom-color: #00C851 !important;
    }
`;