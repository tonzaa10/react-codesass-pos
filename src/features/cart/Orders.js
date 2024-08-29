import axios from "axios";
import { isEmpty } from "lodash";
import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "react-bootstrap";
import OrderDetails from "./OrderDetails";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get("/orders");
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  if (isEmpty(orders)) {
    return <p className="text-center my-4">No orders found.</p>;
  }

  return (
    <>
      <Row xs={1} md={2} className="g-4 my-2">
        {orders.map((order) => (
          <Col key={order.id}>
            <Card>
              <Card.Header>
                {order.name || "N/A"},{order.email || "N/A"},
                {order.tel || "N/A"}
              </Card.Header>
              <CardBody>
                <OrderDetails
                  products={order.products}
                  editable={false}
                ></OrderDetails>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Orders;
