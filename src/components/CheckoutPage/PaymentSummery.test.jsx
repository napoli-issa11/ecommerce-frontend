import { PaymentSummary } from "./PaymentSummary";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router"
import { render, screen, within } from "@testing-library/react";
import axios from "axios";

vi.mock("axios")
describe("payment summary", () => {
    let user;
    let loadCart;
    let payment;
    let mockCartItems;
    beforeEach(() => {
        user = userEvent.setup()
        loadCart = vi.fn()
        payment = {
            "totalItems": 2,
            "productCostCents": 2180,
            "shippingCostCents": 499,
            "totalCostBeforeTaxCents": 2679,
            "taxCents": 268,
            "totalCostCents": 2947
        }
        mockCartItems = [
            {
                id: "p1",
                name: "test product"
            }
        ]
    })
    it("check if paymentsummery display correctly", () => {
        
        render(
            <MemoryRouter>
                <PaymentSummary payment={payment} loadCart={loadCart} cartItems={mockCartItems}/>
            </MemoryRouter>
        )

        expect(
            within(screen.getByTestId("payment-summary-money1"))
                .getByText("$21.80")
        ).toBeInTheDocument()

        expect(
            within(screen.getByTestId("payment-summary-money2"))
                .getByText("$4.99")
        ).toBeInTheDocument()
        expect(
            screen.getByTestId("payment-summary-money3")
                // .getByText("$26.79")
        ).toHaveTextContent("$26.79")
        expect(
            within(screen.getByTestId("payment-summary-money4"))
                .getByText("$2.68")
        ).toBeInTheDocument()
        expect(
            screen.getByTestId("payment-summary-money5")
                // .getByText("$29.47")
        ).toHaveTextContent("$29.47")
    })

    it("check if the buyyon place order work correct", async () => {
        function Location() {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>
        }
        render(
            <MemoryRouter>
                <PaymentSummary payment={payment} loadCart={loadCart} cartItems={mockCartItems}/>
                <Location />
            </MemoryRouter>
        )
        const placeOrderButton = screen.getByTestId("place-order-button")
        await user.click(placeOrderButton)


        expect(axios.post).toHaveBeenCalledWith("/api/orders")
        expect(loadCart).toHaveBeenCalled()

        expect(
            screen.getByTestId("url-path")
        ).toHaveTextContent("/orders")
    })
})