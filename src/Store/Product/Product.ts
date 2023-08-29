import { ActionReducerMapBuilder, CaseReducer, createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../Models/Product";
import { ReducerWithInitialState } from "@reduxjs/toolkit/dist/createReducer";

//State
export type IProductWithAmount = IProduct & {amount: number}
export interface ProductState{
    products:Array<IProductWithAmount>;
}
const initState:ProductState = {
    products: []
}

/*  +-------------------+
    | 1) DEFINE ACTIONS |
    +-------------------+  */

export enum ProductsActionNames {
    ADD_UNIT_TO_CART = "products/ADD_UNIT_TO_CART",
    REMOVE_UNIT_FROM_CART = "products/REMOVE_UNIT_FROM_CART"
};

//Define Redux Action creators to set <TPayload,TAction> for each action:
export const ADD_UNIT_TO_CART = createAction<IProduct,string>(ProductsActionNames.ADD_UNIT_TO_CART);
export const REMOVE_UNIT_FROM_CART = createAction<IProduct,string>(ProductsActionNames.REMOVE_UNIT_FROM_CART);

/*  +------------------------------------------+
    | 1) DEFINE A CASE REDUCER FOR EACH ACTION |
    +------------------------------------------+  */

//ADD_ARTICLE
const addUnitToCart:CaseReducer<ProductState, PayloadAction<IProduct,string>> = 
    (state:ProductState, action:PayloadAction<IProduct,string>) => {
        const entry = state.products.find(product => product.id === action.payload.id);
        if(entry === undefined){ state.products.push({...action.payload, amount: 1}) } 
        else { entry.amount+=1; }
        return state;
    };
    
//REMOVE_ARTICLE
const removeUnitFromCart:CaseReducer<ProductState, PayloadAction<IProduct,string>> = 
    (state:ProductState, action:PayloadAction<IProduct,string>) => {
        const entry = state.products.find(product => product.id === action.payload.id);
        if(entry === undefined){ return state; } 
        if(entry.amount===1){
            state.products = state.products.filter(product => product !== entry);
            return state;
        }
        entry.amount-=1;
        return state;
    };

/*  +-----------------------------------------+
    | 3) MAP ACTION TYPES WITH CASE REDUCERS  |
    +-----------------------------------------+  */
const reducerBuilder = (builder:ActionReducerMapBuilder<ProductState>) => {
    builder.addCase(ADD_UNIT_TO_CART, addUnitToCart);
    builder.addCase(REMOVE_UNIT_FROM_CART, removeUnitFromCart);
};
    
/*  +-----------------------+
    | 4) BUILD THE REDUCER  |
    +-----------------------+  */
export const ProductReducer: ReducerWithInitialState<ProductState> = 
    createReducer<ProductState>(initState,reducerBuilder);