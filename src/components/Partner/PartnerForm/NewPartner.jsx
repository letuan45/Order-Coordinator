import React, { useEffect } from "react";
import { useFormik } from "formik";
import { NewPartnerSchema } from "@/utils/ValidationSchema";
import { Input, Button } from "@material-tailwind/react";
import ErrorInputMessage from "@/components/UI/ErrorInputMessage";
import { CreatePartnerService } from "@/service/PartnerService";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  phone: "",
};

const NewPartner = ({ afterCreateAction }) => {
  const {
    createPartnerResponse,
    createPartnerError,
    createPartnerIsLoading,
    createPartnerAction,
  } = CreatePartnerService();

  useEffect(() => {
    if (createPartnerResponse) {
      toast.success("Tạo mới đối tác thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterCreateAction();
    } else if (createPartnerError) {
      toast.error("Tạo mới đối tác thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [createPartnerResponse, createPartnerError]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: NewPartnerSchema,
    onSubmit: (values) => {
      console.log(values);
      createPartnerAction(values);
    },
  });

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="my-3">
        <Input
          type="text"
          label="Tên đối tác"
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
      <div className="flex w-full justify-end">
        <Button type="submit">
          {createPartnerIsLoading ? "Loading..." : "Xác nhận"}
        </Button>
      </div>
    </form>
  );
};

export default NewPartner;
