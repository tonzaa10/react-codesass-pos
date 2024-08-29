import React from "react";
import { isEmpty } from "lodash";
import { Accordion, ButtonGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import OrderDetails from "./OrderDetails";
import CustomerInfo from "./CustomerInfo";
import axios from "axios";
import { clear } from "./CartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.cart.products);
  const customerInfo = useSelector((state) => state.cart.customerInfo);
  const productsItem = Object.values(products);

  const save = async () => {
    const payload = { ...customerInfo, products: productsItem };
    await axios.post("/orders", payload);
    dispatch(clear());
    navigate("/orders");
  };

  if (isEmpty(products)) {
    return <p className="text-center my-4">Your cart is empty</p>;
  }

  return (
    <>
      <h1 className="text-center my-4">Order Summary</h1>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Title</Accordion.Header>
          <Accordion.Body>
            <OrderDetails products={productsItem}></OrderDetails>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Customer Info</Accordion.Header>
          <Accordion.Body>
            <CustomerInfo></CustomerInfo>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <hr />
      <ButtonGroup>
        <Button onClick={() => save()}>Save</Button>
        <Button variant="danger" onClick={() => dispatch(clear())}>
          Clear
        </Button>
      </ButtonGroup>
    </>
  );
}

export default Cart;
