import { useFormik } from "formik";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import ErrorInputMessage from "@/components/UI/ErrorInputMessage";
import { Input, Button } from "@material-tailwind/react";
import { NewCustomerSchema } from "@/utils/ValidationSchema";
import { UpdateCustomerService } from "@/service/CustomerService";

const UpdateCustomer = ({ item, afterUpdateAction}) => {
  const initialValues = {
    name: item.name,
    phone: item.phone,
    email: item.email,
  };

  const {
    updateCustomerRes,
    updateCustomerErr,
    updateCustomerIsLoading,
    updateCustomerAction,
  } = UpdateCustomerService();

  useEffect(() => {
    if (updateCustomerRes) {
      toast.success("Cập nhật khách hàng thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterUpdateAction();
    } else if (updateCustomerErr) {
      toast.error("Cập nhật khách hàng thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [updateCustomerRes, updateCustomerErr]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: NewCustomerSchema,
    onSubmit: (values) => {
      updateCustomerAction({ customerId: item.id, data: values });
    },
  });

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="my-3">
        <Input
          type="text"
          label="Tên khách hàng"
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
          label="Email khách hàng"
          size="lg"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <ErrorInputMessage value={formik.errors.email} />
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
      <div className="flex w-full justify-end">
        <Button type="submit">
          {updateCustomerIsLoading ? "Loading..." : "Xác nhận"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateCustomer;
