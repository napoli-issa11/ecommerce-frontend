export function formatMoney(moneyAmount) {
    if (moneyAmount >= 0) {
        return `$${(moneyAmount / 100).toFixed(2)}`;
    }
    
    return `-$${(-moneyAmount / 100).toFixed(2)}`;
    
    
    
}