import React from 'react';
import styled from 'styled-components';


const NotfoundContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins';
    img{
        max-width: 300px;
        height: auto;

    }
   
    
`


const NotFound = () => {
    return (
        <NotfoundContainer>
            <h3>Seems you have Drifted away..</h3>
            <img src="/images/404.png" alt="Not Found"/>
        </NotfoundContainer>
    );
};

export default NotFound;