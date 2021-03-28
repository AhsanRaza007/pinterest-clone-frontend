import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import styled from 'styled-components';
import UserContext, { ErrorContext, SuccessContext } from '../Context';
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import Container from '../Styled-Utilities/Container'
import {Input} from '../Styled-Utilities/Styles'

const PinContainer = styled.div`
    margin: 40px auto;
    border: 1px solid #9C23F8;
    padding: 20px;
    box-shadow: -5px 5px 3px #9C23F8;
    width: 95%;
    display: flex;
    gap: 20px;
    height: 400px;
    @media (min-width: 1px) and (max-width: 576px){
        flex-direction: column;
        height: 100vh;
    }
`

const DropZoneContainer = styled.div`
    width: 50%;
    border: 5px dotted #d49dff;
    border-radius: 10px;
    @media (min-width: 1px) and (max-width: 576px){
        width: 100%;
        text-align: center;
    }
`

const FormBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
`
const SubmitBtn = styled.button`
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
        background-color:#6800b8
    }
    &:active{
        transform: scale(0.6);
    }
    &:focus{
        outline: none;
    }
`

const SelectSaveContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
`

const Select = styled.select`
  width: 150px;
  padding: 5px 35px 5px 5px;
  font-size: 16px;
  border: 1px solid #CCC;
  padding: 5px;
  height: 2rem;
  font-size: 0.8rem;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url('/images/down_arrow.ico') 96% / 15% no-repeat white;
`

const CreatePin = () => {

    let [file, setFile]  = useState(null);
    const { user } = useContext(UserContext);
    const { handleError } = useContext(ErrorContext);
    const { handleSuccess } = useContext(SuccessContext);
    const history = useHistory();
    // console.log(file);
    if(!user){
        return <Redirect to='/login'/>
    }

    const handlePinUpload = async (e) =>{
        e.preventDefault();
        let size = e.target.pinSize.value;
        let title = e.target.title.value;
        let description = e.target.description.value;
        let destination  = e.target.destination.value;
        console.log(size);
        if(!file || title === '' || description === '' || destination === ''){
            if(!file ){
                handleError('Please provide pin Image');
            }else{
                handleError('All fields are required!!');
            }
        }else{
            try{
                let formdata = new FormData();
                formdata.append('file', file, file.name);
                formdata.append("title", title);
                formdata.append("description", description);
                formdata.append("destination", destination);
                formdata.append("size", size);
                let res = await axios.post(process.env.REACT_APP_BACKEND_URL+'/pin/create', formdata, {
                    headers: {
                        'authorization': 'Bearer ' + localStorage.getItem('token')
                        // 'Content-Type': 'multipart/form-data'
                    },
                });
                handleSuccess(res.data.message);
                history.push(`/pin/${res.data.pinId}`)
            }catch(err){
                handleError(err.response.data.message)
            }
        }
    }

    return (
        <Container>
            <form onSubmit={handlePinUpload}>
                <PinContainer>
                        <DropZoneContainer>
                            <DragAndDrop file={file} setFile={setFile}>
                            </DragAndDrop>
                        </DropZoneContainer>
                        
                        <FormBody>
                            <SelectSaveContainer>
                                <Select name="pinSize">
                                    <option value="large">Large</option>
                                    <option value="medium">Medium</option>
                                    <option value="small">Small</option>
                                </Select>
                                <SubmitBtn type="submit">Create Pin</SubmitBtn>

                            </SelectSaveContainer>
                            
                            <Input type="text" name="title" placeholder="Enter Pin title" />
                            <Input type="text" name="description" placeholder="Enter Description"/>
                            <Input type="url" name="destination" placeholder="Enter destination URL"/>
                            
                        </FormBody>
                </PinContainer>
            </form>
        </Container>
    );
};

export default CreatePin;