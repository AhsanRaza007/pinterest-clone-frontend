import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import UserContext, { ErrorContext, SuccessContext } from '../Context';
import styled from 'styled-components';
import Container from '../Styled-Utilities/Container';


const PinContainer = styled.div`
    display: flex;
    height: fit-content;
    margin: 10px auto;
    width: 100%;
    box-shadow: -5px 5px 3px #9C23F8;
    border: 1px solid #9C23F8;
    @media (min-width: 1px) and (max-width: 576px){
        flex-direction: column;
        box-shadow: none;
        border: none;
        margin: 0;
    }
`


const PinImage = styled.img`
    width: 50%;
    height: auto;
    object-fit: cover;
    @media (min-width: 1px) and (max-width: 576px){
        width: 100%;
    }
    
`

const PinBody = styled.div`
    width: 50%;
    display: flex;
    padding: 20px;
    flex-direction: column;
    @media (min-width: 1px) and (max-width: 576px){
        width: 100%;
        text-align: center;
    }
`
const PinUser = styled.div`
    display: flex;
    flex-direction: column;
    span{
        font-size: 0.8rem;
        color: #4e4e4e;
        @media (min-width: 1px) and (max-width: 576px){
            font-size: 0.7rem;
        }
    }
    
    div{
        display: flex;
        align-items: baseline;
        h3{
            color: #9C23F8;
        }
    }
    @media (min-width: 1px) and (max-width: 576px){
        
    }
`

const PinDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    a{
        font-weight: bolder;
        color: black;
    }
    *{
        margin: 20px 0px;
    }
`

const PinHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const SaveBtn = styled.button`
    width: fit-content;
    padding: 0.5rem 1rem;
    color: white;
    height: 2rem;
    background-color: #9C23F8;
    border: 0;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin: 10px 0;
    &:hover{
        background-color:#6800b8;
    }
    &:active{
        transform: scale(0.6);
    }
    &:focus{
        outline: none;
    }
    &:disabled{
        text-decoration: line-through;
        background-color: #cba6e7;
    }
`

const PinView = () => {
    let [pin, setPin] = useState(null);
    const {pinId} = useParams();
    const history = useHistory();
    const {user} = useContext(UserContext);
    const {handleError} = useContext(ErrorContext);
    const {handleSuccess} = useContext(SuccessContext);

    useEffect(()=>{
        console.log('in pin view')
        let fetchPin = async ()=>{
            try{
                let res = await axios.get((process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_DEV_BACKEND_URL)+`/pin/${pinId}`);
                setPin(res.data);
            }catch(err){
                console.log(err);
                handleError(err.response.data.message);
            }
        }
        fetchPin();
    }, [pinId,handleError])


    const handleSave = async () =>{
        try{
            let res = await axios.get((process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_DEV_BACKEND_URL)+`/pin/save/${pinId}`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            handleSuccess(res.data.message);
            history.push(`/pin/${res.data.savedPinId}`);
        }catch(err){
            handleError(err.response.data.message);
        }
    }

    const handleSaveLoggedOut = () => {
        history.push('/login',{from: `/pin/${pinId}`});
    }

    return (
        <Container>
            { pin ?
                <PinContainer>
                    
                    <PinImage src={pin.file_uri} />
                    
                    <PinBody>
                        <PinHeader>
                            <PinUser>
                                <div><span>Pin by @</span><h3>{pin.user.name}</h3></div>
                                <span>{pin.user.email}</span>
                            </PinUser>
                            {
                                user ? <SaveBtn onClick={handleSave} disabled={pin.user._id === user._id}>{pin.user._id === user._id ? 'Saved' : 'Save'}</SaveBtn> :
                                <SaveBtn onClick={handleSaveLoggedOut}>Save</SaveBtn>
                            }
                            
                        </PinHeader>
                        <PinDetails>
                            <h1>{pin.title}</h1>
                            <p>{pin.description}</p>
                            <a href={pin.destination} target="_blank" rel="noreferrer" title={new URL(pin.destination).hostname}>&#8599; {new URL(pin.destination).hostname}</a>
                        </PinDetails>
                    </PinBody>
                </PinContainer> : 
                <PinContainer>
                    <p>Loading...</p>
                </PinContainer>
            }
        </Container>
    );
};

export default PinView;