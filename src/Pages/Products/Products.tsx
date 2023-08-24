import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Store/store";
import { IProduct } from "../../Models/Product";
import { Box, Button, Chip, Typography } from "@mui/material";
import css from './Products.module.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IUser } from "../../Models/User";

export interface IProductsListProps {
}

const ProductsList:FC<IProductsListProps> = (props:IProductsListProps) => {

    //Store Subscription. This component will receive the article update automatically
    const products:Array<IProduct> = useSelector<RootState,Array<IProduct>>((state) => state.ProductReducer.products);
    const dispatch = useDispatch<AppDispatch>();
    
    return <Box className={css.wrapper}>

        <Box className={css.leftSection}>
            {products.map<JSX.Element>((product:IProduct,index:number)=>{
                return <Box key={index} className={css.articleWrapper}>
                    <Typography>{product.name}</Typography>
                    <Box className={css.articleBody}>
                        <img src={product.url} className={css.articleImage} alt=""></img>
                        <Box className={css.articleInfo}>
                            <Box className={css.articleFirstLineItems}>
                                <Typography className={css.articlePrice}>{product.price.toString()+"$"}</Typography>
                            </Box>

                            <Box className={css.articleFirstLineItems}>
                                <Button className={css.articleButton} startIcon={<AddIcon />} variant="contained" >Add to Cart</Button>
                            </Box>

                            <Box className={css.articleFirstLineItems}>
                                <Button className={css.articleButton} startIcon={<RemoveIcon />} variant="contained" >Remove from Cart</Button>
                            </Box>

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
            {products.map<JSX.Element>((product:IProduct,index:number)=>{
                return <div key={index}>{product.id}</div>
            })}
        </Box>
    </Box>
}

export default ProductsList;