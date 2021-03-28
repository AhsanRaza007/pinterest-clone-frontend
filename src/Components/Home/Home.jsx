import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { ErrorContext } from '../Context';
import Masonry from 'react-masonry-component'
import Pin from '../Pin/Pin';

import { GalleryContainer } from '../Styled-Utilities/Styles';







const Home = () => {

    const masonryOptions = {
        transitionDuration: 0,
        fitWidth: true
    };


    const { handleError } = useContext(ErrorContext);
    // const history = useHistory();

    const [pins, setPins] = useState(null);

    useEffect(() => {
        let fetchPins = async () => {
            try {
                let res = await axios.get(process.env.REACT_APP_BACKEND_URL+'/pin');
                console.log('in useeffect')
                setPins(res.data);
            } catch (err) {
                handleError(err.response.data.message);
            }
        }
        fetchPins();
    }, [handleError])


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
                    ))
                }
            </Masonry>
        </GalleryContainer>
    );
};

export default Home;