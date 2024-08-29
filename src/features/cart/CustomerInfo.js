import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerInfo } from "./CartSlice";

function CustomerInfo() {
  const dispatch = useDispatch();
  const customerInfo = useSelector((state) => state.cart.customerInfo);
  const setField = (field, e) =>
    dispatch(setCustomerInfo({ field, value: e.target.value }));

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={customerInfo?.name ?? ""}
            placeholder="Enter name"
            onChange={(e) => setField("name", e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={customerInfo?.email ?? ""}
            placeholder="Enter Email"
            onChange={(e) => setField("email", e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tel</Form.Label>
          <Form.Control
            value={customerInfo?.tel ?? ""}
            placeholder="Enter Tel"
            onChange={(e) => setField("tel", e)}
          ></Form.Control>
        </Form.Group>
      </Form>
    </>
  );
}

export default CustomerInfo;
