import axios from 'axios';
import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom'
import UserContext, {ErrorContext, SuccessContext} from '../Context'
import {FormContainer, Form, Input, LoginBtn} from '../Styled-Utilities/Styles';

const Login = (props) => {
    
    const { user } = useContext(UserContext);
    const { handleError } = useContext(ErrorContext);
    const { handleSuccess } = useContext(SuccessContext);
    const history  = useHistory();
    const handleLogin = async (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;

        if(email==='' || password===''){
            handleError('All fields are required!!');
        }else{
            try{
                let res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/user/login', {
                    "email" : email,
                    "password" : password
                });
                localStorage.setItem('token', res.data.jwt_token);
                handleSuccess('Logged In successfully!');
                props.setTimeToChangeUser(prev=> !prev)
                if(history.location.state){
                    history.push(history.location.state.from);
                }else{
                    history.push('/');
                }
            }catch(err){
                handleError(err.response.data.message);
            }
        }
    }

    if(user){
        return <Redirect to='/'/>
    }

    return (
        <FormContainer>
            <img src="/images/cats.png" alt="welcome"/>
            <Form onSubmit={handleLogin}>
                <Input type="email" name="email" placeholder="Email"/>
                <Input type="password" name="password" placeholder="password"/>
                <LoginBtn type="submit">Login</LoginBtn>
            </Form>
        </FormContainer>
    );
};

export default Login;