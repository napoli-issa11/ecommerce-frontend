import { ProductCard } from "./ProductCard";
export function ProductsGrid({ products, loadCart }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <ProductCard key={product.id} product={product} loadCart={loadCart} />
        );
      })}
    </div>
  );
}
