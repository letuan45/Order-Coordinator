import React, { useEffect, useState } from "react";
import Datepicker from "../UI/Datepicker";
import { useFormik } from "formik";
import { NewEmployeeSchema } from "@/utils/ValidationSchema";
import { Input, Radio, Checkbox, Button, Typography } from "@material-tailwind/react";
import ErrorInputMessage from "../UI/ErrorInputMessage";
import { toast } from "react-toastify";
import {
  GetSingleEmployee,
  UpdateEmployeeService,
} from "@/service/EmployeeService";

let initialValues = {
  fullName: "",
  email: "",
};

const EditEmployeeForm = ({ item, afterUpdateAction}) => {
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const { employeeResponse, employeeError } = GetSingleEmployee({
    employeeId: item.id,
  });
  const {
    updateEmployeeResponse,
    updateEmployeeError,
    updateEmployeeIsLoading,
    updateEmployeeAction,
  } = UpdateEmployeeService();

  useEffect(() => {
    if (updateEmployeeResponse) {
      toast.success("Cập nhật thông tin nhân viên thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterUpdateAction();
    } else if (updateEmployeeError) {
      toast.error("Cập nhật thông tin nhân viên thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [updateEmployeeResponse, updateEmployeeError]);

  useEffect(() => {
    if (employeeResponse) {
      initialValues.fullName = employeeResponse.fullName;
      initialValues.email = employeeResponse.email;
      let date = new Date(employeeResponse.dateOfBirth);
      date = date.setDate(date.getDate() + 1);
      setDate(new Date(date));
      setGender(employeeResponse.gender);
      setIsActive(employeeResponse.active);
    } else if (employeeError) {
      toast.error("Không tải được thông tin nhân viên", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [employeeResponse, employeeError]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: NewEmployeeSchema,
    onSubmit: (values) => {
      const dateData = date.toISOString().split("T")[0];
      const data = {
        ...values,
        dateOfBirth: dateData,
        gender: gender,
        active: isActive,
      };
      updateEmployeeAction({ data: data, employeeId: item.id });
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
          checked={gender}
        />
        <Radio
          id="female"
          name="type"
          label="Nữ"
          onChange={() => {
            setGender(false);
          }}
          checked={!gender}
        />
      </div>
      <div className="my-2">
        <Checkbox
          label="Đang làm việc"
          checked={isActive}
          onChange={() => {
            setIsActive((state) => !state);
          }}
        />
        <Typography className="text-sm italic font-semibold">
          Chú ý: Khi chuyển về trạng thái "Nghỉ làm" mọi chức năng thuộc về nhân viên này sẽ vô hiệu
        </Typography>
      </div>
      <div className="flex w-full justify-end">
        <Button type="submit" disabled={updateEmployeeIsLoading}>
          {updateEmployeeIsLoading ? "Loading..." : "Xác nhận"}
        </Button>
      </div>
    </form>
  );
};

export default EditEmployeeForm;
