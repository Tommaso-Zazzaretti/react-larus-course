import { FC, Fragment, useEffect, useRef, useState } from "react";
import css from './Login.module.css';
import { Backdrop, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { UserCredentials } from "../../Models/Credentials";
import { useDispatch, useSelector } from "react-redux";
import { PayloadAction } from "@reduxjs/toolkit";
import { SET_HTTP_AWAIT_ACTION } from "../../Store/Loading/Loading";
import { AppDispatch, RootState } from "../../Store/store";

export interface ILoginProps {
}

const Login:FC<ILoginProps> = (props:ILoginProps) => {

    const dispatch  = useDispatch<AppDispatch>();
    const isLoading = useSelector<RootState,boolean>((state) => state.LoadingReducer.isOnHttpAwait);
    
    // UserName
    const [username,setUsername] = useState<string>("");
    const [userNameSpinner,setUsernameSpinner] = useState<boolean>(false);
    // Password
    const [password ,setPassword]  = useState<string>("");
    const [passwordSpinner,setPasswordSpinner] = useState<boolean>(false);
    // Form Validation
    const [valid,setValid] = useState<boolean>(false);
    // Login State
    const [isLogged,setIsLogged] = useState<boolean>(false)
    const loggedStore = useRef<UserCredentials|null>(null);

    useEffect(()=>{
        setIsLogged(loggedStore.current!==null);
    },[])

    // Username Spinner
    useEffect(() =>{
        const timer:NodeJS.Timeout = setTimeout(() =>{ 
            setUsernameSpinner(false)
        },500);
        return () => {
            clearTimeout(timer); 
        }
    },[username]); 

    // Password Spinner
    useEffect(() =>{
        const timer:NodeJS.Timeout = setTimeout(() =>{ 
            setPasswordSpinner(false)
        },500);
        return () => { 
            clearTimeout(timer); 
        }
    },[password]); 

    // Validate the form
    useEffect(() =>{
        const timer:NodeJS.Timeout = setTimeout(() =>{ 
            const validateForm = ():boolean => {
                return username.replaceAll(" ","").length>0 
                    && password.replaceAll(" ","").length>0
            }
            setValid(validateForm());
        },100);
        return () => { 
            clearTimeout(timer); 
        }
    },[username,password]); 

    // Event handlers
    const usernameChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        const newUserName:string = event.target.value.trim();
        // Rendering States Changes
        setUsername(newUserName.trim());
        if(!userNameSpinner){ setUsernameSpinner(true);}
    }

    const passwordChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        const newPassword:string = event.target.value.trim();
        // Rendering States Changes
        setPassword(newPassword.match(/.{1,4}/g)?.join('/') ?? newPassword);
        if(!userNameSpinner){ setPasswordSpinner(true);}
    }

    const loginButtonClickHandler = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Make an http call
        dispatch<PayloadAction<boolean,string>>(SET_HTTP_AWAIT_ACTION(true));
        const SIMULATE_HTTP_CALL_MSEC = 1*1000; // 2 Sec
        return new Promise<void>((resolve,reject)=>{ setTimeout(()=>{resolve()},SIMULATE_HTTP_CALL_MSEC); })
        .then(() => { 
            loggedStore.current = { username, password }
            setIsLogged(true);
        })
        .catch((error:Error) => { 
            console.error(error); 
        })
        .finally(() => { 
            dispatch<PayloadAction<boolean,string>>(SET_HTTP_AWAIT_ACTION(false)); 
        })
        
    }

    const logoutButtonClickHandler = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        loggedStore.current = null
        setIsLogged(false);
    }

    return <Fragment>
        <Box className={css.wrapper}>
            <Box className={css.loginBox}>

            <Typography>Login/Logout</Typography>

            {!isLogged &&
                <Box className={css.inputBox}>
                    <TextField className={css.input} label="Username" value={username} onChange={usernameChangeHandler}/>
                    {userNameSpinner && <CircularProgress size={25} className={css.spinner}/>}
                </Box>
            }
            {!isLogged &&
                <Box className={css.inputBox}>
                    <TextField className={css.input} label="Password" value={password} onChange={passwordChangeHandler}/>
                    {passwordSpinner && <CircularProgress size={25} className={css.spinner}/>}
                </Box>
            }       

            <Box className={css.buttonsWrapper}>
                    {isLogged 
                        ? <Button variant="contained" onClick={logoutButtonClickHandler}>Logout</Button>
                        : <Button variant="contained" disabled={!valid} onClick={loginButtonClickHandler}>Login</Button>
                    }
                </Box>
            </Box>
        </Box>

        <Backdrop open={isLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </Fragment>
}

export default Login;