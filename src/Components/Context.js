import React from 'react'

let UserContext = React.createContext({});

let ErrorContext = React.createContext({});

let SuccessContext = React.createContext({});

export default UserContext;
export {ErrorContext, SuccessContext}