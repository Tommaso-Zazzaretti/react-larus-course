import { CaseReducer, createSlice, PayloadAction, Slice, SliceCaseReducers, ThunkAction, ValidateSliceCaseReducers } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProduct } from "../../Models/Product";
import { IUser } from "../../Models/User";

//State
export interface ProductState{
    products:Array<IProduct>;
}
const initState:ProductState = {
    products: Array<IProduct>(
        {
            id:'0',
            name:'NN Deep Tensor',
            url: 'https://cdn.vectorstock.com/i/1000x1000/39/60/neural-net-neuron-network-vector-10723960.webp',
            price:152001.99,
            amount:0,
            users: new Array<IUser>(
                {name: 'Marco'  , surname: 'Petrini' , rating: 5},
                {name: 'Roberto', surname: 'Sannino' , rating: 5},
                {name: 'Daniele', surname: 'Vendrame', rating: 5}
            )
        },
        {
            id:'1',
            name:'Maglietta Scudetto Inter',
            url: 'https://www.picclickimg.com/xt0AAOSwJTRhUvAd/Maglia-INTER-2021-2022-maglietta-con-patch-scudetto.webp',
            price:98.99,
            amount:0,
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
            price:548.99,
            amount:0,
            users: new Array<IUser>(
                {name: 'Tommaso', surname: 'Zazzaretti' , rating: 5}
            )
        }
    ) 
}

/*  +------------------------------------------+
    | 1) DEFINE A CASE REDUCER FOR EACH ACTION |
    +------------------------------------------+  */

//ADD_ARTICLE
const AddProductHandler:CaseReducer<ProductState, PayloadAction<IProduct,string>> = 
    (state:ProductState, action:PayloadAction<IProduct,string>) => {
        state.products.push(action.payload);
        return state;
    };
    
//REMOVE_ARTICLE
const RemoveProductHandler:CaseReducer<ProductState, PayloadAction<IProduct,string>> = 
    (state:ProductState, action:PayloadAction<IProduct,string>) => {
        const index:number = state.products.findIndex(article => article===action.payload);
        if(index!==-1){ state.products.splice(index,1); }
    };

//REMOVE_ARTICLE_BY_ID
const RemoveProductByIdHandler:CaseReducer<ProductState, PayloadAction<string,string>> = 
    (state:ProductState, action:PayloadAction<string,string>) => {
        const index:number = state.products.findIndex(article => article.id===action.payload);
        if(index!==-1){ state.products.splice(index,1); }
    };

/*  +-------------------+
    | 2) BUILD A SLICE  |
    +-------------------+  */
//Case reducers: 
const sliceCaseReducer: ValidateSliceCaseReducers<ProductState, SliceCaseReducers<ProductState>> = {
    "ADD_PRODUCT"          : AddProductHandler,
    "REMOVE_PRODUCT"       : RemoveProductHandler,
    "REMOVE_PRODUCT_BY_ID" : RemoveProductByIdHandler,
}

//Slice
type ProductSlice = Slice<ProductState, SliceCaseReducers<ProductState>, "products">;

const productSlice:ProductSlice = createSlice<ProductState,SliceCaseReducers<ProductState>,"products">({
    name: "products",
    initialState: initState,
    reducers: sliceCaseReducer,
})

/*  +-----------------------+
    | 2) EXPORT THE REDUCER |
    +-----------------------+  */
export const ProductReducer = productSlice.reducer

/*  +----------------------------------------+
    | 2) EXPORT THE ACTION CREATOR FUNCTIONS |
    +----------------------------------------+  */
export const PRODUCT_ACTIONS      = productSlice.actions;
export const ADD_PRODUCT          = productSlice.actions.ADD_PRODUCT;
export const REMOVE_PRODUCT       = productSlice.actions.REMOVE_PRODUCT;
export const REMOVE_PRODUCT_BY_ID = productSlice.actions.REMOVE_PRODUCT_BY_ID;

/*  +----------------------------------------+
    | 2) EXPORT THE ACTION CREATOR FUNCTIONS |
    +----------------------------------------+  */
    
export const thunkSendMessageExample = (message: string): ThunkAction<void, RootState, unknown, PayloadAction<IProduct,string>> =>
  async dispatch => {

    function exampleAPI() {
        return Promise.resolve('Async Chat Bot')
    }
    const asyncResp = await exampleAPI();

    const action = ADD_PRODUCT({message, user: asyncResp, timestamp: new Date().getTime()})
    dispatch(action)
}