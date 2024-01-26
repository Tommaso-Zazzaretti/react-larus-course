import React, { FC, useEffect, useState } from 'react'
import { render, screen } from '@testing-library/react'
import Products from '../../../Pages/Products/Products'
import { customRender } from '../../customRender'

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
        const products = await screen.findAllByTestId((id:string) => id.startsWith("product_"), undefined, {timeout: 2100});
        expect<number>(products.length).toBe(3);

        products.forEach(product => expect<HTMLElement>(product).toBeInTheDocument())

        const progressbar = screen.queryByRole("progressbar");
        expect<HTMLElement | null>(progressbar).not.toBeInTheDocument();
    })
})
