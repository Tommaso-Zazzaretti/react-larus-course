import React, { FC, useEffect, useState } from 'react'
import { act, render, screen } from '@testing-library/react'
import Products from '../../../Pages/Products/Products'
import { customRender } from '../../customRender'
import userEvent from '@testing-library/user-event'
import Payment from '../../../Pages/Payments/Payment'
import { assert } from 'console'

describe( "Payments Page Test Suite", () => {

    test("Credit Card Number Validation", () => {
        customRender(<Payment/>)
        const numberCardRendered = screen.getByPlaceholderText(/\*\*\*\* \*\*\*\* \*\*\*\* \*\*\*\*/i)
        expect(numberCardRendered).toBeInTheDocument()
        act(() => {
            userEvent.type(numberCardRendered, "A", {delay: 0})
        })
        let emptyFields = screen.queryByDisplayValue("A");
        expect(emptyFields).toBeNull()

        act(() => {
            userEvent.type(numberCardRendered, "3", {delay: 0})
        })
        let typedCardNumber = screen.getByDisplayValue("3");
        expect(typedCardNumber).toBeInTheDocument();

        act(() => {
            userEvent.type(numberCardRendered, "4B", {delay: 0})
        })
        typedCardNumber = screen.getByDisplayValue("34");
        expect(typedCardNumber).toBeInTheDocument();

        act(() => {
            userEvent.clear(numberCardRendered)
        })
        expect(screen.queryAllByDisplayValue("").length === 3).toBeTruthy()

        act(() => {
            userEvent.paste(numberCardRendered, "4B")
        })
        expect(screen.queryAllByDisplayValue("").length === 3).toBeTruthy()
    })
})
