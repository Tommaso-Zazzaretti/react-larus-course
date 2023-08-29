import { ActionReducerMapBuilder, CaseReducer, createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { ReducerWithInitialState } from "@reduxjs/toolkit/dist/createReducer";

//State
export interface LoadingState {
    isOnHttpAwait:boolean;
}
const initState:LoadingState = {
    isOnHttpAwait: false
}

/*  +-------------------+
    | 1) DEFINE ACTIONS |
    +-------------------+  */

export enum LoadingActionsNames {
    SET_HTTP_AWAIT = "loading/SET_HTTP_AWAIT"
};

//Define Redux Action creators to set <TPayload,TAction> for each action:
export const SET_HTTP_AWAIT_ACTION = createAction<boolean,string>(LoadingActionsNames.SET_HTTP_AWAIT);


/*  +------------------------------------------+
    | 2) DEFINE A CASE REDUCER FOR EACH ACTION |
    +------------------------------------------+  */

const setHttpAwaitState:CaseReducer<LoadingState, PayloadAction<boolean,string>> = 
    (state:LoadingState, action:PayloadAction<boolean,string>) => {
        state.isOnHttpAwait = action.payload;
        return state;
    };
    
/*  +-----------------------------------------+
    | 3) MAP ACTION TYPES WITH CASE REDUCERS  |
    +-----------------------------------------+  */
const reducerBuilder = (builder:ActionReducerMapBuilder<LoadingState>) => {
    builder.addCase(SET_HTTP_AWAIT_ACTION, setHttpAwaitState);
};
    
/*  +-----------------------+
    | 4) BUILD THE REDUCER  |
    +-----------------------+  */
export const LoadingReducer: ReducerWithInitialState<LoadingState> = 
    createReducer<LoadingState>(initState,reducerBuilder);