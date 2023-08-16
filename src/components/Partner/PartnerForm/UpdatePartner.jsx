import React, { useState, useEffect } from "react";
import { UpdatePartnerService } from "@/service/PartnerService";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { NewPartnerSchema } from "@/utils/ValidationSchema";
import { Input, Checkbox, Button } from "@material-tailwind/react";

const UpdatePartner = ({ partner, afterUpdatePartner }) => {
  const [partnerIsAcitve, setPartnerIsActive] = useState(partner.active);
  let initialValues = {
    name: partner.name,
    phone: partner.phone,
  };

  const {
    updatePartnerResponse,
    updatePartnerError,
    updatePartnerIsLoading,
    updatePartnerAction,
  } = UpdatePartnerService();

  useEffect(() => {
    if (updatePartnerResponse) {
      toast.success("Cập nhật thông tin đối tác vận chuyển thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterUpdatePartner();
    } else if (updatePartnerError) {
      toast.error(updatePartnerError.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [updatePartnerResponse, updatePartnerError]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: NewPartnerSchema,
    onSubmit: (values) => {
      const data = { ...values, active: partnerIsAcitve };
      updatePartnerAction({ data, partnerId: partner.id });
    },
  });

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="my-3">
        <Input
          type="text"
          label="Tên đối tác vận chuyển"
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
      <div className="my-3">
        <Checkbox
          label="Đang hoạt động"
          checked={partnerIsAcitve}
          onChange={() => {
            setPartnerIsActive((oldState) => !oldState);
          }}
        />
      </div>
      <div className="my-3 flex w-full justify-end">
        <Button type="submit" disabled={updatePartnerIsLoading}>
          {updatePartnerIsLoading ? "Loading..." : "Xác nhận"}
        </Button>
      </div>
    </form>
  );
};

export default UpdatePartner;
