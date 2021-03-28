import axios from 'axios';
import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import UserContext, {ErrorContext, SuccessContext} from '../Context'
import {FormContainer, Form, Input, LoginBtn} from '../Styled-Utilities/Styles';



const Signup = () => {

    const {user} = useContext(UserContext);
    const { handleError} = useContext(ErrorContext);
    const { handleSuccess} = useContext(SuccessContext);

    const history = useHistory();

    const handleSignUp = async (e) =>{
        e.preventDefault();
        let email = e.target.email.value;
        let username = e.target.username.value;
        let password = e.target.password.value;
        let passwordConfirm = e.target.passwordConfirm.value;
        if(email==='' || username==='' || password==='' || passwordConfirm===''){
            handleError('All fields are required!!')
        }
        else if(password !== passwordConfirm){
            handleError('passwords do not match!!');
        }
        else{
            try{
                let res = await axios.post(process.env.REACT_APP_BACKEND_URL+'/user/register', {
                    "email": email,
                    "name": username,
                    "password": password
                });
                // console.log(res.data);
                handleSuccess(res.data.message);
                e.target.email.value = '';
                e.target.username.value = '';
                e.target.password.value = '';
                e.target.passwordConfirm.value = '';
                history.push('/login');
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
            <Form onSubmit={handleSignUp}>
                <Input type="email" name="email" placeholder="Enter Email" />
                <Input type="text" name="username" placeholder="Enter User Name" />
                <Input type="password" name="password" placeholder="Enter Password" />
                <Input type="password" name="passwordConfirm" placeholder="Confirm Password" />
                <LoginBtn>Sign Up</LoginBtn>
            </Form>
        </FormContainer>
    );
};

export default Signup;