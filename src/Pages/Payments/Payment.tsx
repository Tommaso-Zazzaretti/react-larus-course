import { FC, useEffect, useState } from "react";
import css from './Payment.module.css';
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { IProductWithAmount } from "../../Store/Product/Product";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

export interface IPaymentProps {

}

const Payment:FC<IPaymentProps> = (props:IPaymentProps) => {

    const cartProducts:Array<IProductWithAmount> = useSelector<RootState,Array<IProductWithAmount>>((state) => state.ProductReducer.products);

    const [cardNumber,setCardNumber] = useState<string>("");
    const [cardNumberSpinner,setCardNumberSpinner] = useState<boolean>(false);
    const [validThru ,setValidThru]  = useState<string>("");
    const [validThruSpinner,setValidThruSpinner] = useState<boolean>(false);
    const [securityId,setSecurityId] = useState<string>("");
    const [securityIdSpinner,setSecurityIdSpinner] = useState<boolean>(false);

    const [total,setTotal] = useState<number>(0.0);
    const [valid,setValid] = useState<boolean>(false);

    // Card Number Spinner
    useEffect(() =>{
        const timer:NodeJS.Timeout = setTimeout(() =>{ 
            setCardNumberSpinner(false)
        },1000);
        return () => {
            clearTimeout(timer); 
        }
    },[cardNumber]); 

    // Valid Thru Spinner
    useEffect(() =>{
        const timer:NodeJS.Timeout = setTimeout(() =>{ 
            setValidThruSpinner(false)
        },2000);
        return () => { 
            clearTimeout(timer); 
        }
    },[validThru]); 

    // Valid Thru Spinner
    useEffect(() =>{
        const timer:NodeJS.Timeout = setTimeout(() =>{ 
            setSecurityIdSpinner(false)
        },2000);
        return () => { 
            clearTimeout(timer); 
        }
    },[securityId]); 

    // Validate the form
    useEffect(() =>{
        const timer:NodeJS.Timeout = setTimeout(() =>{ 
            const validateForm = ():boolean => {
                return cardNumber.length===19 && (/^\d+$/.test(cardNumber.replaceAll(" ",""))) &&
                    securityId.length===3 && (/^\d+$/.test(securityId)) &&
                    validThru.length===7 && (/^\d+$/.test(validThru.replace("/","")))
            }
            setValid(validateForm());
        },100);
        return () => { 
            clearTimeout(timer); 
        }
    },[cardNumber,validThru,securityId]); 

    useEffect(()=>{
        setTotal(cartProducts.reduce<number>((acc:number,current:IProductWithAmount) => { 
            return acc+current.amount*current.price;
        },0))
    },[cartProducts])

    // useEffect(()=>console.log(cardNumberSpinner),[cardNumberSpinner]);


    // Event handlers
    const cardNumberChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        const newCardNumber:string = event.target.value.replaceAll(" ","");
        // Validation
        if(newCardNumber.length>16){ return; }
        if(newCardNumber.length>0 && !(/^\d+$/.test(newCardNumber))){ return;}
        // Rendering States Changes
        setCardNumber(newCardNumber.match(/.{1,4}/g)?.join(' ') ?? newCardNumber);
        if(!cardNumberSpinner){ setCardNumberSpinner(true);}
    }

    const validThruChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        const newValidThru:string = event.target.value.replaceAll(" ","").replace("/","");
        // Validation
        if(newValidThru.length>6 || newValidThru.includes("/")){ return; }
        if(newValidThru.length>0 && !(/^\d+$/.test(newValidThru))){ return;}
        // Rendering States Changes
        setValidThru(newValidThru.match(/.{1,4}/g)?.join('/') ?? newValidThru);
        if(!cardNumberSpinner){ setValidThruSpinner(true);}
    }

    const securityIdSpinnerChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        const newSecurityId:string = event.target.value.replaceAll(" ","");
        // Validation
        if(newSecurityId.length>3){ return; }
        if(newSecurityId.length>0 && !(/^\d+$/.test(newSecurityId))){ return;}
        // Rendering States Changes
        setSecurityId(newSecurityId);
        if(!cardNumberSpinner){ setSecurityIdSpinner(true);}
    }
    
    const resetButtonClickHandler = (event:React.MouseEvent<HTMLButtonElement>)=>{
        setCardNumber("");
        setSecurityId("");
        setValidThru("");
        setCardNumberSpinner(false);
        setSecurityIdSpinner(false);
        setValidThruSpinner(false);
    }

    useEffect(()=>{
        console.log("USE EFFECT")
    },[cardNumber,cardNumberSpinner,validThru,validThruSpinner,securityId,securityIdSpinner])

    return <Box className={css.wrapper}>
        <Box className={css.paymentBox}>
            <Typography>Dati pagamento: 
                {" "+ total.toFixed(2) + "$"}
            </Typography>

            <Box className={css.inputBox}>
                <TextField placeholder="**** **** **** ****" className={css.input} label="Numero Carta" value={cardNumber} onChange={cardNumberChangeHandler}/>
                {cardNumberSpinner && <CircularProgress size={25} className={css.spinner}/>}
            </Box>

            <Box className={css.inputBox}>
                <TextField placeholder="YYYY/MM" className={css.input} label="Data Scadenza" value={validThru} onChange={validThruChangeHandler}/>
                {validThruSpinner && <CircularProgress size={25} className={css.spinner}/>}
            </Box>

            <Box className={css.inputBox}>
                <TextField placeholder="***" className={css.input} label="Codice Sicurezza" value={securityId} onChange={securityIdSpinnerChangeHandler}/>
                {securityIdSpinner && <CircularProgress size={25} className={css.spinner}/>}
            </Box>

            <Box className={css.buttonsWrapper}>
                <Button variant="contained" onClick={resetButtonClickHandler}>Reset</Button>
                <Button variant="contained" disabled={!valid}>Conferma</Button>
            </Box>
        </Box>
    </Box>
}

export default Payment;