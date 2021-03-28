import styled from 'styled-components';



const Container = styled.div`
    margin: 0 auto;
    max-width: 100%;


    @media only screen and (min-width: 576px){
        max-width: 520px;
    }
    @media only screen and (min-width: 768px){
        max-width: 700px
    }
    @media only screen and (min-width: 992px){
        max-width: 940px
    }
    @media only screen and (min-width: 1200px){
        max-width: 1120px;
    }
    @media only screen and (min-width: 1400px){
        max-width: 1300px
    }
`

export default Container;