import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function ProductForm({ currentProduct, onSubmit }) {
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: currentProduct,
  });

  const submit = (formValue) => {
    onSubmit({ ...formValue, image: formValue.images[0] });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Form className="mb-3" onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3">
          <Form.Label>SKU</Form.Label>
          <Form.Control
            placeholder="Enter SKU"
            isInvalid={!!errors.sku}
            {...register("sku", { required: "SKU is a required field." })}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.sku?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Enter Name"
            isInvalid={!!errors.name}
            {...register("name", { required: "Name is a required field." })}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            placeholder="Enter Price"
            isInvalid={!!errors.price}
            {...register("price", {
              required: "Price is a required field.",
              validate: (v) =>
                parseInt(v) !== 0 || "Price must be greater than 0.",
            })}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.price?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            isInvalid={!!errors.status}
            {...register("status", {
              validate: (v) =>
                v !== "Select Status" || "Status is a required field. ",
            })}
          >
            <option value={null}>Select Status</option>
            <option value={1}>In Stock</option>
            <option value={2}>Out of Stock</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.status?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            isInvalid={!!errors.categoryId}
            {...register("categoryId", {
              validate: (v) =>
                v !== "Select Category" || "Category is a required field. ",
            })}
          >
            <option value={null}>Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.categoryId?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Detail</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter desc"
            isInvalid={!!errors.desc}
            {...register("desc", { required: "Desc is a required field." })}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.desc?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            isInvalid={!!errors.images}
            {...register(
              "images",
              currentProduct ? {} : { required: "Images is a required field." }
            )}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.images?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          {currentProduct ? "Update" : "Create"}
        </Button>
      </Form>
    </>
  );
}

export default ProductForm;
