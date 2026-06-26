import { formatMoney } from "./formatMoney";
import { describe, it , expect } from "vitest"

describe("formatmoney", () => {
    it("check if formatmoney works correctly", () => {
        expect(formatMoney(1999)).toBe("$19.99")
    })
    it("check if display desimals correctly", () => {
        expect(formatMoney(1000)).toBe("$10.00")
    })
    it("check if it display the result $0.00 if the the price 0", () => {
        expect(formatMoney(0)).toBe("$0.00")
    })
    it("check if it display negative numbers", () => {
        expect(formatMoney(-100)).toBe("-$1.00")
    })
    it("check if the result -$999", () => {
        expect(formatMoney(-999)).toBe("-$9.99")
    })
})