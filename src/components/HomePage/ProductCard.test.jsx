import { ProductCard } from "./ProductCard";
import { describe, it , expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";


vi.mock("axios")

describe("ProductCard", () => {
    
    let product;
    let loadCart;
    let userSelect;

    beforeEach(() => {
        product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "/images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
            stars: 4.5,
            count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        }
        loadCart = vi.fn();
        userSelect = userEvent.setup();
    })
    
    it("check if product details display correctly", () => {
        
        render(<ProductCard product={product} loadCart={loadCart}/>)

        expect(
            screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
        ).toBeInTheDocument()

        expect(
            screen.getByTestId("product-image")
        ).toHaveAttribute("src", "/images/products/athletic-cotton-socks-6-pairs.jpg")

        expect(
            screen.getByTestId("stars-image")
        ).toHaveAttribute("src", "/images/ratings/rating-45.png")
    })

    // it("check if the button add to cart correctly", async () => {
    //     const product = {
    //         id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    //         image: "/images/products/athletic-cotton-socks-6-pairs.jpg",
    //         name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    //         rating: {
    //         stars: 4.5,
    //         count: 87
    //         },
    //         priceCents: 1090,
    //         keywords: ["socks", "sports", "apparel"]
    //     }
    //     const loadCart = vi.fn();
    //     render(<ProductCard product={product} loadCart={loadCart}/>)

    //     const user = userEvent.setup()
    //     const addToCartButton = screen.getByTestId("add-to-cart-button")
    //     await user.click(addToCartButton)

    //     expect(axios.post).toHaveBeenCalledWith(
    //         "/api/cart-items",
    //         {
    //             productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    //             quantity: 1
    //         }
    //     )
    //     expect(loadCart).toHaveBeenCalled();
    // })

    it("check if the button works correctly", async () => {

        render(<ProductCard product={product} loadCart={loadCart}/>)

        const addToCartButton = screen.getByTestId("add-to-cart-button")
        await userSelect.click(addToCartButton)

        expect(axios.post).toHaveBeenCalledWith(
            "/api/cart-items",
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1
            }
        )
        expect(loadCart).toHaveBeenCalled()
    })

    it("check if can select the quantity", async () => {
        render(<ProductCard product={product} loadCart={loadCart}/>)

        
        const quantitySelector = screen.getByTestId("quantity-selector")
        expect(quantitySelector).toHaveValue("1")

        
        await userSelect.selectOptions(quantitySelector, "3")
        expect(quantitySelector).toHaveValue("3")

        const addToCartButton = screen.getByTestId("add-to-cart-button")
        await userEvent.click(addToCartButton)

        expect(axios.post).toHaveBeenCalledWith(
            "/api/cart-items",
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 3
            }
        )
        expect(loadCart).toHaveBeenCalled()
    })
})
