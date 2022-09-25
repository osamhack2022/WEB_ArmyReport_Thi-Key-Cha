import React, {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn : false,
    Login : (token) => {},
    Logout : () => {}
});

export const AuthContextProvider = (props) =>{
    const [token, setToken] = useState(null);

    const userIsLoggedIn = !!token; // 문자열이 비었으면 false 반환

    const loginHandler = (token) => {
        setToken(token)
    };

    const logoutHandler = () => {
        setToken(null)
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    }

    return (
        <AuthContext.Provider value = {contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext