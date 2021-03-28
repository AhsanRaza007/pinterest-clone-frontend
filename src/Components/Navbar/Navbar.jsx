import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../Context';

const Nav = styled.nav`
    background-color: #9c23f8;
    a{
        color: white;
        text-decoration: none;
    }
   
`

const NavBrand = styled.div`
    font-weight: 500;
    color: white;

`
const NavContainer = styled.div`
    max-width:100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
    margin: 0 auto;

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
    @media (min-width: 1px) and (max-width: 769px){
        flex-direction: column;
    }
`;


const Links = styled.div`
    display: flex;
    justify-content: space-evenly;
    @media (min-width: 1px) and (max-width: 769px){
       justify-content: center;
        overflow-x: scroll;
        width: 100vw;
    }
`

const StyledNavLink = styled(NavLink)`
    padding: 1rem 1.4rem;
    transition: background-color 0.3s ease-in-out;
    white-space: nowrap;
    @media (min-width: 1px) and (max-width: 577px){
        padding: 0.5rem 1rem;
        font-size: 0.5rem;
    }
    &:hover{
        background-color: #9c23f8;
    }
    &.active{
        border-bottom: 5px solid white;
        background-color: #9c23f8;
    }
`
const NavBtn = styled.button`
    
    margin: 5px 10px;
    outline: 0;
    border: 0;
    border-radius: 50px;
    color: white;
    background-color: #232327;
    transition: all 0.3s ease-in-out;
    display: block;
    cursor: pointer;
    &:hover{
        background-color: #000;
    }
    &:active{
        transform: scale(0.7);
    }
    @media (min-width: 1px) and (max-width: 577px){
        font-size: 0.5rem;
    }
`
const NewPinBtn = styled(NavBtn)`
    margin-left: 0;
    margin-right: 0;
    padding: 0;
    a{
        padding: 0.5rem 1rem;
        display: block;
    }
`

const Logoutbtn = styled(NavBtn)`
    padding: 0.5rem 1rem;
    margin-right: 5px;
    background-color: red;
`


const Navbar = () => {

    let {user, logout} = useContext(UserContext);
    console.log(user)
    return(
        <Nav>
            <NavContainer>
                <NavBrand>
                    <h3><Link to='/'>Mynterest!</Link></h3>
                </NavBrand>
                <Links>
                        <StyledNavLink to='/' exact>Home</StyledNavLink>
                        {
                            user ? <StyledNavLink to='/pins'>My Pins</StyledNavLink> : null
                        }
                        {
                            user ? <NewPinBtn><Link to='/createpin'>+ new pin</Link></NewPinBtn> : null
                        }
                        {
                            user ?
                                <Logoutbtn onClick={()=>logout()}>logout</Logoutbtn>
                                :
                                <StyledNavLink to='/login'>Login</StyledNavLink>
                        }
                        {
                            user ? null : <StyledNavLink to='/signup'>Sign Up</StyledNavLink>
                        }
                        
                </Links>

            </NavContainer>
            
        </Nav>
    )
}

export default Navbar;
