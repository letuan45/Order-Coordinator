import { NewProductSchema } from "@/utils/ValidationSchema";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Button, Input } from "@material-tailwind/react";
import ErrorInputMessage from "@/components/UI/ErrorInputMessage";
import { NewProductService } from "@/service/ProductService";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  weight: "",
  price: "",
};

const AddNewProduct = ({ afterAddNewProduct }) => {
  const {
    newProductRespone,
    newProductErr,
    newProductIsLoading,
    newProductAction,
  } = NewProductService();

  useEffect(() => {
    if (newProductRespone) {
      toast.success("Thêm sản phẩm thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterAddNewProduct();
    } else if (newProductErr) {
      toast.error("Thêm sản phẩm thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [newProductRespone, newProductErr]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: NewProductSchema,
    onSubmit: (values) => {
      newProductAction(values);
    },
  });

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="my-3">
        <Input
          type="text"
          label="Tên sản phẩm"
          size="lg"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <ErrorInputMessage value={formik.errors.name} />
        ) : null}
      </div>
      <div className="my-3">
        <Input
          type="text"
          label="Cân nặng"
          size="lg"
          id="weight"
          name="weight"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.weight}
        />
        {formik.touched.weight && formik.errors.weight ? (
          <ErrorInputMessage value={formik.errors.weight} />
        ) : null}
      </div>
      <div className="my-3">
        <Input
          type="text"
          label="Giá"
          size="lg"
          id="price"
          name="price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.touched.price && formik.errors.price ? (
          <ErrorInputMessage value={formik.errors.price} />
        ) : null}
        <div className="my-3 flex justify-end">
          <Button type="submit" disabled={newProductIsLoading}>
            {newProductIsLoading ? "Loading..." : "Xác nhận"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddNewProduct;
