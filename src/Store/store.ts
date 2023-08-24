import { Action, applyMiddleware, combineReducers, configureStore, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'

import {ProductReducer} from './Product/Product';

//Build the root reducer
const rootReducer = combineReducers({
    ProductReducer
    //... other reducers
})
export type RootState = ReturnType<typeof rootReducer>

//MIDDLEWARES => ARE 3° ORDER FUNCTION COMPOSITIONS
/*
    Consist of 3 function :

    * OuterFunction: The outer function is actually the "middleware" itself. It will be called by applyMiddleware, and receives
                     a storeAPI object containing the store's {dispatch, getState} functions. These are the same dispatch and 
                     getState functions that are actually part of the store. If you call this dispatch function, it will send 
                     the action to the start of the middleware pipeline. This is only called once.
    * WrapDispatch:  The middle function receives a function called next as its argument. This function is actually the next 
                     middleware in the pipeline. If this middleware is the last one in the sequence, then next is actually the 
                     original dispatch call.
    * InnerFunction: Contains the middleware adding logic and call next(action) passes the action to the next middleware 
                     in the pipeline. This is also only called once-
*/
const loggerMiddleware: Middleware<{},RootState,Dispatch<Action<any>>> = 
    (storeAPI: MiddlewareAPI< Dispatch<Action<any>>, RootState>) => {
        return (next: Dispatch<Action<any>>) => { //WrapDispatch function
            return <A extends Action>(action: A) => {  //MiddlewareDispatch function
            console.group('Dispatched Action', action);
            const returnValue = next(action); // Call the next dispatch method in the middleware chain.
            console.log('State after dispatch: ',storeAPI.getState());
            console.groupEnd();
            return returnValue;
        }
    }
}

//MIDDLEWARE STORE ENHANCER
const storeMiddlewares = [loggerMiddleware]
const middlewareEnhancer = applyMiddleware<{},RootState>(...storeMiddlewares)

//Build the store
export const store = configureStore({
    reducer: rootReducer,
    enhancers:[middlewareEnhancer]
})

/*
//Build the store =====> **** DEPRECATED ****
import {createStore} from 'redux';
export const storeDeprecated = createStore(rootReducer,middlewareEnhancer)
*/

export type AppDispatch = typeof store.dispatch
