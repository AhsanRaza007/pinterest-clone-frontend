import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
// import UserContext, { ErrorContext } from '../Context';


const OverallPin = styled.div`
    width: 236px;
    margin: 0px 5px;
    @media (min-width: 1px) and (max-width: 321px){
        width: 147px;
    }
    @media (min-width: 322px) and (max-width: 376px){
        width: 175px;
    }
    @media (min-width: 377px) and (max-width: 577px){
        width: 200px;
    }
`


const PinContainer = styled.div`
    position: relative;
    width: inherit;
    box-shadow: -5px 5px 3px #9C23F8;
    /* border: 1px solid #9C23F8; */
    
    cursor: pointer;
    &:hover a{
        display: block;
    }
`

const PinImage = styled.img`

    height: 100%;
    width: 100%;
    object-fit: cover;
    vertical-align: middle;

    

`
const PinDestination = styled.a`
        white-space: nowrap;
        z-index: 10;
        text-decoration: none;
        background-color:#9c23f8;
        bottom: 10px;
        left: 10px;
        overflow: hidden;
        color:white;
        padding: 0.5rem 1rem;
        border-radius: 50px;
        font-size: 0.7rem;
        width: 120px;
        position: absolute;
        font-weight: lighter;
        text-align:center;
        text-overflow: ellipsis;
        transition: background-color 0.3s ease-in-out; 
        display: none;
        &:hover{
            background-color: #4d0286;

        }
        
`


const PinUserName = styled.p`
    font-size: 0.7rem;
    font-weight: bolder;
    color: #9c23f8;
    margin: 10px 0px;
`
const Pin = ({ pin }) => {

    // const { user } = useContext(UserContext);
    // const { handleError } = useContext(ErrorContext);
    const history = useHistory();
    const openPin = () => {
        history.push(`/pin/${pin._id}`)
    }
    return (
        <OverallPin >
            <PinContainer className={pin.size} onClick={openPin} title="Open Pin">
                <PinImage src={pin.file_uri} alt="" />
                <PinDestination onClick={(e) => { e.stopPropagation() }} href={pin.destination} target="_blank">&#8599; {new URL(pin.destination).hostname}</PinDestination>
            </PinContainer>
            <PinUserName>
                Pin by {pin.user.name}
            </PinUserName>
        </OverallPin>

    );
};

export default Pin;