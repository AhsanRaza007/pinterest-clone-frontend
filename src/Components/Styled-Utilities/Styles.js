import styled from 'styled-components';



const GalleryContainer = styled.div`
    max-width: 1300px;
    margin: 20px auto;
`


const FormContainer = styled.div`
    padding: 20px;
    width: 300px;
    height: fit-content;
    margin: 20px auto;
    box-shadow: -5px 5px 3px #9C23F8;
    border: 1px solid #9C23F8;
    img{
        width: 100%;
        height: auto;
    }

`


const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Input = styled.input`
    outline: none;
    background-color: #F3F5F9;
    width: 100%;
    font-size: 0.8rem;
    border: 1px solid #d49dff;
    margin: 5px 0;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease-in-out;
    &:focus{
        border: 1px solid #9C23F8;
    }

    &::placeholder{
        color: #d49dff;
    }

`

const LoginBtn = styled.button`
    width: 100%;
    padding: 0.5rem 1rem;
    color: white;
    background-color: #9C23F8;
    border: 0;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin: 10px 0;
    &:hover{
        background-color:#6800b8
    }
    &:active{
        transform: scale(0.6);
    }
    &:focus{
        outline: none;
    }
`

const ErrorAlert = styled.p`
    padding:  1rem 2rem;
    color: white;
    position: fixed;
    right: 10px;
    top: 80px;
    background-color: #ff1744;
    width: 200px;
    font-size: 0.7rem;
    transition: all 0.6s ease-in-out;
    z-index: 100;
    box-shadow: -3px 3px 2px #febebe;
    transform: ${props => props.open ? '' : 'translate(150%, 0)'};

`
const SuccessAlert = styled.p`
    padding:  1rem 2rem;
    color: white;
    position: fixed;
    right: 10px;
    top: 80px;
    background-color: #80CBC4;
    width: 200px;
    font-size: 0.7rem;
    transition: all 0.6s ease-in-out;
    z-index: 100;
    box-shadow: -3px 3px 2px #cefffa;
    transform: ${props => props.open ? '' : 'translate(150%, 0)'};

`





export { FormContainer, Form, ErrorAlert, Input, LoginBtn, SuccessAlert, GalleryContainer};