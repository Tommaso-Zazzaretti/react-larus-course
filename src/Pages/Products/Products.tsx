import { FC, MouseEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Store/store";
import { IProduct } from "../../Models/Product";
import { Box, Button, Chip, Divider, LinearProgress, Typography } from "@mui/material";
import css from './Products.module.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IUser } from "../../Models/User";
import { SET_HTTP_AWAIT_ACTION } from "../../Store/Loading/Loading";
import { PayloadAction } from "@reduxjs/toolkit";
import { ADD_UNIT_TO_CART, IProductWithAmount, REMOVE_UNIT_FROM_CART } from "../../Store/Product/Product";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";

export interface IProductsProps {
}

const Products:FC<IProductsProps> = (props:IProductsProps) => {

    // Routes Navigator
    const navigate = useNavigate();

    //Store Subscriptions
    const dispatch  = useDispatch<AppDispatch>();
    const isLoading = useSelector<RootState,boolean>((state) => state.LoadingReducer.isOnHttpAwait);
    const cartProducts:Array<IProductWithAmount> = useSelector<RootState,Array<IProductWithAmount>>((state) => state.ProductReducer.products);
    
    // Http Fetched Products
    const [products,setProducts] = useState<Array<IProduct>>(new Array<IProduct>());

    // Execute this code after render
    useEffect(()=>{
        dispatch<PayloadAction<boolean,string>>(SET_HTTP_AWAIT_ACTION(true));
        getProductsHttpCallAsync()
        .then((products:Array<IProduct>) => { setProducts(products); })
        .catch((error:Error)             => { setProducts(new Array<IProduct>()); })
        .finally(() => { dispatch<PayloadAction<boolean,string>>(SET_HTTP_AWAIT_ACTION(false)); })
    },[dispatch])

    // Logic
    const getProductsHttpCallAsync = ():Promise<Array<IProduct>> => {
        // More Logic.........
        return new Promise((resolve,reject)=>{
            const backendProducts:Array<IProduct> = Array<IProduct>(
                {
                    id:'0',
                    name:'NN Deep Tensor',
                    url: 'https://cdn.vectorstock.com/i/1000x1000/39/60/neural-net-neuron-network-vector-10723960.webp',
                    price: 152001.99,
                    users: new Array<IUser>(
                        {name: 'Marco'  , surname: 'Petrini' , rating: 5},
                        {name: 'Roberto', surname: 'Sannino' , rating: 5},
                        {name: 'Daniele', surname: 'Vendrame', rating: 5}
                    )
                },
                {
                    id:'1',
                    name:'Maglietta Inter',
                    url: 'https://www.picclickimg.com/xt0AAOSwJTRhUvAd/Maglia-INTER-2021-2022-maglietta-con-patch-scudetto.webp',
                    price: 98.99,
                    users: new Array<IUser>(
                        {name: 'Leonardo', surname: 'Marrancone', rating: 5},
                        {name: 'Rosario' , surname: 'Borgesi'   , rating: 5},
                        {name: 'Luca'    , surname: 'Marignati' , rating: 5},
                    )
                },
                {
                    id:'2',
                    name:'Ibanez Guitar',
                    url: 'https://cdn.shopify.com/s/files/1/0573/5386/3220/files/IBANEZ-RGR221PA--GIO---Aqua-Burst-2_1000x_5ee7151a-c390-464e-880b-b1d59b7b2458_480x480.jpg?v=1683603938',
                    price: 548.99,
                    users: new Array<IUser>(
                        {name: 'Tommaso', surname: 'Zazzaretti' , rating: 5}
                    )
                }
            ) 
            setTimeout(()=>{resolve(backendProducts)},2*1000);
        })
    }

    // Event Handlers
    const addButtonClickHandler = (event:MouseEvent<HTMLButtonElement>,product:IProduct) => {
        dispatch<PayloadAction<IProduct,string>>(ADD_UNIT_TO_CART(product))
    }
    const removeButtonClickHandler = (event:MouseEvent<HTMLButtonElement>,product:IProduct) => {
        dispatch<PayloadAction<IProduct,string>>(REMOVE_UNIT_FROM_CART(product))
    }
    const paymentButtonClickHandler = (event:MouseEvent<HTMLButtonElement>) => {
        navigate("/pagamento")
    }

    return <Box className={css.wrapper}>
        <Box className={css.leftSection}>
            {isLoading ? 
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box> : 
                products.map<JSX.Element>((product:IProduct,index:number)=>{
                    return <Box key={index} className={css.articleWrapper}>
                        <Typography>{product.name}</Typography>

                        <Box className={css.articleBody}>
                            <img src={product.url} className={css.articleImage} alt=""></img>
                            <Box className={css.articleInfo}>
                                <Box className={css.articleFirstLineItems}>
                                    <Typography className={css.articlePrice}>{product.price.toString()+"$"}</Typography>
                                </Box>

                                <Box className={css.articleFirstLineItems}>
                                    <Button className={css.articleButton} startIcon={<AddIcon />} variant="contained" onClick={(e)=>addButtonClickHandler(e,product)} >Add to Cart</Button>
                                </Box>

                                <Box className={css.articleFirstLineItems}>
                                    <Button className={css.articleButton} startIcon={<RemoveIcon />} variant="contained" onClick={(e)=>removeButtonClickHandler(e,product)}>Remove from Cart</Button>
                                </Box>

                                {/* Users List */}
                                <Box className={css.articleSecondLineItems}>
                                    {product.users.map<JSX.Element>((user:IUser,index:number)=>{
                                        return <Chip key={index} icon={<AccountCircleIcon/>} label={user.name+" "+user.surname+" | Rating: "+user.rating} variant="outlined"/>
                                        })
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Box>
            })}
        </Box>

        <Box className={css.rightSection}>
                <Box className={css.rightWrapper}>
                    <Box className={css.cartTitleWrapper}>
                        <Typography className={css.cartText}>Carrello</Typography>
                        <ShoppingCartIcon fontSize={"large"} className={css.cartImg}/>
                    </Box>

                    <Box className={css.cartProductListWrapper}>
                        {cartProducts.length === 0 
                            ? <Typography>Non sono presenti articoli nel carrello.</Typography> 
                            : /* CartProducts List */
                            <Box className={css.articleSecondLineItems}>
                                {cartProducts.map<JSX.Element>((product:IProductWithAmount,index:number)=>{
                                    return <Chip key={index} icon={<AccountCircleIcon/>} label={product.name+" | Amount: "+product.amount} variant="outlined" 
                                        onDelete={()=>dispatch<PayloadAction<IProduct,string>>(REMOVE_UNIT_FROM_CART(product))                                                }/>
                                })}
                            </Box>
                        }
                    </Box>
                    <Divider textAlign="left">Totale: </Divider>
                    <Typography className={css.totalText}>
                        {
                            cartProducts.reduce<number>((acc:number,current:IProductWithAmount) => { 
                                return acc+current.amount*current.price;
                            },0).toFixed(2) + "$"
                        }
                    </Typography>

                    <Box className={css.cartButton}>
                        <Button variant="contained" disabled={cartProducts.length===0} onClick={paymentButtonClickHandler}>
                            Vai al Pagamento
                        </Button>
                    </Box>

                </Box>
                
        </Box>
    </Box>
}

export default Products;