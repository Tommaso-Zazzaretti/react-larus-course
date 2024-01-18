import { RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../Store/store";

const wrapper: React.JSXElementConstructor<{children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;}> = 
    ({children})=>{
        return <BrowserRouter>
            <Provider store={store}>
                    {children}
            </Provider>
        </BrowserRouter>
}

export const customRender = (ui:ReactElement, opts?: Omit<RenderOptions,'wrapper'>) => {
    return render(ui, {...opts, wrapper})
}