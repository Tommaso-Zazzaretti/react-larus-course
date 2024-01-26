import React, { FC, useEffect, useState } from 'react'
import { act, render, screen } from '@testing-library/react'
import Products from '../../../Pages/Products/Products'
import { customRender } from '../../customRender'
import userEvent from '@testing-library/user-event'

describe( "Product Page Test Suite", () => {
    test("Product.tsx render correctly", () => {
        customRender(<Products/>)
    })

    test("Product content before http call", async () => {
        customRender(<Products/>)
        const progressbar = screen.getByRole("progressbar");
        expect<HTMLElement>(progressbar).toBeInTheDocument();

        const products = screen.queryAllByTestId((id:string) => id.startsWith("product_"));
        expect<number>(products.length).toBe(0);
    })

    test("Product content after http call", async () => {
        customRender(<Products/>)
        const products = await screen.findAllByTestId((id:string) => id.startsWith("product_"), undefined, {timeout: 210});
        expect<number>(products.length).toBe(3);

        products.forEach(product => expect<HTMLElement>(product).toBeInTheDocument())

        const progressbar = screen.queryByRole("progressbar");
        expect<HTMLElement | null>(progressbar).not.toBeInTheDocument();
    })

    test("Product total check before time 0", async () => {
        customRender(<Products/>)
        const total = screen.getByTestId('totale');
        expect<HTMLElement>(total).toBeInTheDocument();
        expect<string>(total.innerHTML).toBe("0.00$")
    })

    test("Product total check after the data are rendered", async () => {
        customRender(<Products/>)
        const addToCartButton = await screen.findAllByRole('button', {name: /add to cart/i }, {timeout: 210});
        const removeFromCart = screen.getAllByRole('button', {name: /remove from cart/i})
        act(()=>userEvent.click(addToCartButton[0]));
        const total = screen.getByTestId('totale');
        expect<string>(total.innerHTML).toBe("1500.00$")
        

    })
})
