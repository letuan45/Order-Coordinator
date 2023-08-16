import React, { useEffect } from "react";
import { useFormik } from "formik";
import { NewSupplierSchema } from "@/utils/ValidationSchema";
import { Button, Input } from "@material-tailwind/react";
import ErrorInputMessage from "@/components/UI/ErrorInputMessage";
import { NewSupplierService } from "@/service/SupplierService";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  phone: "",
};

const AddSupplierForm = ({afterAddSupplier}) => {
  const {
    newSupplierRes,
    newSupplierError,
    newSupplierIsLoading,
    newSupplierAction,
  } = NewSupplierService();

  useEffect(() => {
    if (newSupplierRes) {
      toast.success("Tạo nhà cung cấp thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterAddSupplier();
    } else if (newSupplierError) {
      toast.success("Tạo nhà cung cấp thất bại", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [newSupplierRes, newSupplierError]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: NewSupplierSchema,
    onSubmit: (values) => {
      newSupplierAction(values)
    },
  });

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="my-3">
        <Input
          type="text"
          label="Tên nhà cung cấp"
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
          label="Số điện thoại"
          size="lg"
          id="phone"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <ErrorInputMessage value={formik.errors.phone} />
        ) : null}
      </div>
      <div className="flex justify-end">
        <Button type="submit">{newSupplierIsLoading ? "Loading..." : "Xác nhận"}</Button>
      </div>
    </form>
  );
};

export default AddSupplierForm;
