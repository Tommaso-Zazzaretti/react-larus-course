import { CaseReducer, createSlice, PayloadAction, Slice, SliceCaseReducers, ThunkAction, ValidateSliceCaseReducers } from "@reduxjs/toolkit";
import { RootState } from "../store";

//Model
export interface IProduct{
    id:string;
    name:string
    price:number;
    amount:number;
}

//State
export interface ProductState{
    products:Array<IProduct>;
}
const initState:ProductState = {
    products: Array<IProduct>() 
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