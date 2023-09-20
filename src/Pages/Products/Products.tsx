import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Store/store";
import { IProduct } from "../../Models/Product";
import { Box, Button, Divider, LinearProgress, Typography } from "@mui/material";
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
import { ProductsHttpService } from "../../Shared/Services/ProductsHttpService";
import { GenericChipList } from "../../Shared/Components/GenericChipList";

export interface IProductsProps {
}

const Products:FC<IProductsProps> = (props:IProductsProps) => {

    // Routes Navigator
    const navigate = useNavigate();

    //Store Subscriptions
    const dispatch  = useDispatch<AppDispatch>();
    const isLoading = useSelector<RootState,boolean>((state) => state.LoadingReducer.isOnHttpAwait);
    const cartProducts:Array<IProductWithAmount> = useSelector<RootState,Array<IProductWithAmount>>((state) => state.ProductReducer.products);
    
    // Refs
    const httpServiceRef = useRef<ProductsHttpService>(new ProductsHttpService());
    // Http Fetched Products
    const [products,setProducts] = useState<Array<IProduct>>(new Array<IProduct>());

    // Execute this code after render
    useEffect(()=>{
        // Make an http call
        dispatch<PayloadAction<boolean,string>>(SET_HTTP_AWAIT_ACTION(true));
        httpServiceRef.current.getProductsHttpCallAsync()
        .then((products:Array<IProduct>) => { 
            setProducts(products); 
        })
        .catch((error:Error) => { 
            console.error(error); setProducts(new Array<IProduct>()); 
        })
        .finally(() => { 
            dispatch<PayloadAction<boolean,string>>(SET_HTTP_AWAIT_ACTION(false)); 
        })
    },[dispatch])


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
                                <GenericChipList<IUser> 
                                    list={product.users} 
                                    icon={<AccountCircleIcon/>}
                                    getLabel={(user:IUser)=>user.name+" "+user.surname+" | Rating: "+user.rating}
                                />  
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
                                <GenericChipList<IProductWithAmount> 
                                    list={cartProducts} 
                                    icon={<AccountCircleIcon/>}
                                    getLabel={(product:IProductWithAmount)=>product.name+" | Amount: "+product.amount}
                                    onDelete={(elementToDelete:IProductWithAmount)=>dispatch<PayloadAction<IProduct,string>>(REMOVE_UNIT_FROM_CART(elementToDelete))}
                                />
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