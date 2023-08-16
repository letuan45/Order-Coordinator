import React, { useEffect, useRef, useState } from "react";
import Datepicker from "../UI/Datepicker";
import { useFormik } from "formik";
import { NewEmployeeSchema } from "@/utils/ValidationSchema";
import { Input, Radio, Select, Option, Button } from "@material-tailwind/react";
import ErrorInputMessage from "../UI/ErrorInputMessage";
import { GetAllWarehouse } from "@/service/WarehouseService";
import { toast } from "react-toastify";
import { CreateEmployeeService } from "@/service/EmployeeService";

const initialValues = {
  fullName: "",
  email: "",
};

const NewEmployeeForm = ({createEmployeeAfterAction}) => {
  const [date, setDate] = useState(new Date());
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const { getAllWarehouseRes, getAllWarehouseErr } =
    GetAllWarehouse();
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [gender, setGender] = useState(true);
  const {
    createEmployeeResponse,
    createEmployeeError,
    createEmployeeIsLoading,
    createEmployeeAction,
  } = CreateEmployeeService();

  useEffect(() => {
    if (createEmployeeResponse) {
      toast.success("Tạo nhân viên thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      createEmployeeAfterAction();
    } else if (createEmployeeError) {
      toast.error("Tạo nhân viên thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [createEmployeeResponse, createEmployeeError]);

  useEffect(() => {
    if (getAllWarehouseRes) {
      setWarehouseOptions(getAllWarehouseRes.filter((item) => item.active));
    } else if (getAllWarehouseErr) {
      toast.error("Không tải được danh sách kho!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getAllWarehouseRes, getAllWarehouseErr]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: NewEmployeeSchema,
    onSubmit: (values) => {
      if (!selectedWarehouse) {
        toast.error("Hãy chọn kho nhân viên làm!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      const dateData = date.toISOString().split("T")[0];
      const data = { ...values, dateOfBirth: dateData, gender: gender };
      createEmployeeAction({data: data, warehouseId: selectedWarehouse});
    },
  });

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="my-2">
        <Input
          type="text"
          label="Tên nhân viên"
          size="lg"
          id="fullName"
          name="fullName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
        />
        {formik.touched.fullName && formik.errors.fullName ? (
          <ErrorInputMessage value={formik.errors.fullName} />
        ) : null}
      </div>
      <div className="my-2">
        <Input
          type="text"
          label="Email nhân viên"
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
      <Datepicker
        label="Ngày sinh"
        date={date}
        onDateChange={(data) => {
          setDate(data);
        }}
      />
      <div className="my-2 flex gap-10">
        <p>Giới tính</p>
        <Radio
          id="male"
          name="type"
          label="Nam"
          onChange={() => {
            setGender(true);
          }}
          defaultChecked
        />
        <Radio
          id="female"
          name="type"
          label="Nữ"
          onChange={() => {
            setGender(false);
          }}
        />
      </div>
      {warehouseOptions.length > 0 && (
        <div className="my-2 w-full">
          <Select
            label="Chọn kho"
            onChange={(e) => {
              setSelectedWarehouse(e);
            }}
          >
            {warehouseOptions.map((item) => (
              <Option key={item.id} value={item.id + ""}>
                {item.name}
                <i className="text-sm text-gray-500"> {item.district.name}</i>,
                <i className="text-sm text-gray-500"> {item.district.province.name}</i>
              </Option>
            ))}
          </Select>
        </div>
      )}
      <div className="flex w-full justify-end">
        <Button type="submit" disabled={createEmployeeIsLoading}>
          {createEmployeeIsLoading ? "Loading..." : "Xác nhận"}
        </Button>
      </div>
    </form>
  );
};

export default NewEmployeeForm;
