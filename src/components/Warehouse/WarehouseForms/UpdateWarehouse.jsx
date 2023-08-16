import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { NewWarehouseSchema } from "@/utils/ValidationSchema";
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import ErrorInputMessage from "@/components/UI/ErrorInputMessage";
import { UpdateWarehouseService } from "@/service/WarehouseService";
import { toast } from "react-toastify";

const UpdateWarehouse = ({ warehouse, afterUpdateWarehouse }) => {
  const [warehouseIsActive, setWarehouseIsActive] = useState(warehouse.active);
  let initialValues = {
    name: warehouse.name,
    additionAddress: warehouse.additionAddress,
  };
  const {
    updateWarehouseRes,
    updateWarehouseIsLoading,
    updateWarehouseErr,
    updateWarehouseAction,
  } = UpdateWarehouseService();

  useEffect(() => {
    if (updateWarehouseRes) {
      toast.success("Cập nhật kho thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterUpdateWarehouse();
    } else if (updateWarehouseErr) {
      toast.error(updateWarehouseErr.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [updateWarehouseRes, updateWarehouseErr]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: NewWarehouseSchema,
    onSubmit: (values) => {
      const data = { ...values, active: warehouseIsActive };
      updateWarehouseAction({ data, warehouseId: warehouse.id});
    },
  });

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="my-3">
        <Input
          type="text"
          label="Tên kho"
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
          label="Địa chỉ chi tiết"
          size="lg"
          id="additionAddress"
          name="additionAddress"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.additionAddress}
        />
        {formik.touched.additionAddress && formik.errors.additionAddress ? (
          <ErrorInputMessage value={formik.errors.additionAddress} />
        ) : null}
      </div>
      <div className="my-3">
        <Checkbox
          label="Đang hoạt động"
          checked={warehouseIsActive}
          onChange={() => {
            setWarehouseIsActive((oldState) => !oldState);
          }}
        />
      </div>
      <Typography className="text-sm font-semibold italic">
        Chú ý: khi chỉnh sửa kho về trạng thái "ngừng hoạt động", bạn sẽ không
        thể thay đổi dữ liệu nữa.
      </Typography>
      <div className="my-3 flex w-full justify-end">
        <Button type="submit" disabled={updateWarehouseIsLoading}>
          {updateWarehouseIsLoading ? "Loading..." : "Xác nhận"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateWarehouse;
