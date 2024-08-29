import React from "react";
import { Stack, Badge, ButtonGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "features/cart/CartSlice";

function QuantityControl({ product }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const orderProduct = products[product.sku];

  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <span>Qty: </span>
        <Badge>{orderProduct?.quantity ?? 0}</Badge>
        <ButtonGroup size="sm" className="ms-auto">
          <Button
            variant="secondary"
            onClick={() => dispatch(addToCart(product))}
          >
            +
          </Button>
          <Button
            variant="secondary"
            onClick={() => dispatch(removeFromCart(product))}
          >
            -
          </Button>
        </ButtonGroup>
      </Stack>
    </>
  );
}

export default QuantityControl;
