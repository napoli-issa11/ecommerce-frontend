import { ProductOrder } from "./ProductOrder";
export function OrderDetails({ order, loadCart }) {
  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        return (
          <ProductOrder
            key={orderProduct.product.id}
            order={order}
            orderProduct={orderProduct}
            loadCart={loadCart}
          />
        );
      })}
    </div>
  );
}
