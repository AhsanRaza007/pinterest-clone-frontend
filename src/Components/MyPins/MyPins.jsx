import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ErrorContext } from '../Context';
import {GalleryContainer} from '../Styled-Utilities/Styles';
import Masonry from 'react-masonry-component'
import Pin from '../Pin/Pin';




const MyPins = () => {

    const masonryOptions = {
        transitionDuration: 0,
        fitWidth: true,
    };

    // const { user } = useContext(UserContext);
    const { handleError } = useContext(ErrorContext);
    const history = useHistory();

    const [pins, setPins] = useState(null);

    useEffect(() => {
        let fetchPins = async () => {
            try {
                let res = await axios.get(process.env.REACT_APP_BACKEND_URL+'/pin/user', {
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });
                console.log('in my pin')
                setPins(res.data);
            } catch (err) {
                if (err.responsev && err.response.status && err.response.status === 403) {
                    handleError('Token Expired Login Again');
                    history.push('/login');
                }
            }
        }
        fetchPins();
    }, [handleError, history])

    if (!pins) {
        return <div>Loading...</div>
    }

    if(pins.length === 0){
        return <GalleryContainer style={{padding: '50px', textAlign: 'center'}}>
            wow!! such empty!!
        </GalleryContainer>
    }
    
    return (
        <GalleryContainer>
            <Masonry options={masonryOptions} className='grid'>
                {
                    pins.map(pin => (
                        <Pin pin={pin} key={pin._id} />
                    )
                    )
                }
            </Masonry>

        </GalleryContainer>

    );
};

export default MyPins;