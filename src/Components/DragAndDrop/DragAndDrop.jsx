import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ErrorContext } from '../Context';

const DropZone = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 20px;
    opacity: ${props=> props.dragging ? 0.5 : 1};
`

const PreviewImg = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
`


const DragAndDrop = ({file, setFile}) => {

    const [dragging, setDragging] = useState(false);
    const {handleError} = useContext(ErrorContext);
    const handleDropZoneClick = () =>{
        console.log("hello world");
        let fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('style', 'visibility: hidden');

        fileInput.addEventListener('change', ()=>{
            setFile(fileInput.files[0]);
        })

        fileInput.click();
    }

    const handleDragEnter = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
        
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    }
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    }

    const handleDrop = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        let file = e.dataTransfer.files[0];
        console.log(file);
        let type = file && file.type.substring(0, file.type.indexOf('/'));
        if(type === 'image' || type === 'video'){
            setFile(file);
        }else{
            handleError('Only Image and Video Files are allowed');
        }
    }

    


    return (
        <DropZone onClick={handleDropZoneClick} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} dragging={dragging}>
                {  file ? <PreviewImg src={URL.createObjectURL(file)}/> : 
                    <>
                        <img src="/images/upload.png" alt=""/>
                        <p>{dragging ? 'Release to drop your file' : 'Drag image here or click to upload image.'}</p>
                    </>
                }
        </DropZone>
    );
};

export default DragAndDrop;