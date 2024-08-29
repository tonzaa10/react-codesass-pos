import React from "react";
import ProductForm from "./ProductForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "features/ui/uiSlice";

function NewProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createProduct = async (product) => {
    try {
      await axios.post("/products", product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/products");
      dispatch(
        setAlert({ type: "success", message: "The product hs already created" })
      );
    } catch (ex) {
      dispatch(setAlert({ type: "danger", message: ex.response.data.error }));
    }
  };

  return (
    <>
      <h1 className="text-center fs-3">Create Products</h1>
      <ProductForm onSubmit={createProduct}> </ProductForm>
    </>
  );
}

export default NewProduct;
