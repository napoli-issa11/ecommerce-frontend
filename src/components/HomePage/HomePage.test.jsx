import { HomePage } from "./HomePage";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router"
import { render, screen, within } from "@testing-library/react";
import axios from "axios";

vi.mock("axios");

describe("HomePage", () => {
  let loadCart;
  let user;
  // let userSelect;
  beforeEach(() => {
    loadCart = vi.fn();
    user = userEvent.setup()
    // userSelect = userEvent.setup()
    axios.get.mockImplementation((urlPath) => {
      if (urlPath === "/api/products") {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "/images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "/images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
          ]
        }
      }
    });
  });
  it("check if home page display correctly", async () => {
    render(
        <MemoryRouter>
            <HomePage cartItems={[]} loadCart={loadCart} />
        </MemoryRouter>
    );
    const productContainer = await screen.findAllByTestId("product-container")

    expect(productContainer.length).toBe(2)

    expect(
        within(productContainer[0]).getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
    ).toBeInTheDocument()

    expect(
        within(productContainer[1]).getByText("Intermediate Size Basketball")
    ).toBeInTheDocument()
    
    // const productContainer = await screen.findByTestId("product-container")
    const userSelect1 = within(productContainer[0]).getByTestId("quantity-selector")
    await user.selectOptions(userSelect1, "2")

    const userSelect2 = within(productContainer[1]).getByTestId("quantity-selector")
    await user.selectOptions(userSelect2, "3")

    const addToCartButton1 = within(productContainer[0]).getByTestId("add-to-cart-button")
    await user.click(addToCartButton1)

    const addToCartButton2 = within(productContainer[1]).getByTestId("add-to-cart-button")
    await user.click(addToCartButton2)

    expect(axios.post).toHaveBeenNthCalledWith(
      1,
      "/api/cart-items",
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
      }
    )

    expect(axios.post).toHaveBeenNthCalledWith(
      2,
      "/api/cart-items",
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 3
      }
    )
    expect(loadCart).toHaveBeenCalled
  });
});
