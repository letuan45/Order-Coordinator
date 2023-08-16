import React, { useEffect, useState } from "react";
import { Input, Select, Option, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import { UpdateAccountSchema } from "@/utils/ValidationSchema";
import ErrorInputMessage from "@/components/UI/ErrorInputMessage";
import { toast } from "react-toastify";
import { CheckHasAccountService } from "@/service/EmployeeService";
import { ChangePasswordService } from "@/service/AccountService";

const initialValues = {
  re_password: "",
  re_password2: "",
};

const UpdateAccountForm = ({ employeeId, afterChangePassAction }) => {
  const { checkHasAccountResponse, checkHasAccountAction } =
    CheckHasAccountService();
  const {
    changePasswordResponse,
    changePasswordError,
    changePassowordIsLoading,
    changePasswordAction,
  } = ChangePasswordService();

  useEffect(() => {
    if (changePasswordResponse) {
      toast.success("Đổi mật khẩu thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterChangePassAction();
    } else if (changePasswordError) {
      toast.error(changePasswordError.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [changePasswordResponse, changePasswordError]);

  useEffect(() => {
    checkHasAccountAction(employeeId);
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdateAccountSchema,
    onSubmit: (values) => {
      const data = {
        oldPassword: values.re_password,
        newPassword: values.re_password2,
        employeeId: employeeId,
      };
      changePasswordAction(data);
    },
  });

  if (checkHasAccountResponse === false) {
    return <p className="text-center">Nhân viên không có tài khoản</p>;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="my-2">
        <Input
          type="password"
          label="Mật khẩu"
          size="lg"
          id="re_password"
          name="re_password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.re_password}
        />
        {formik.touched.re_password && formik.errors.re_password ? (
          <ErrorInputMessage value={formik.errors.re_password} />
        ) : null}
      </div>
      <div className="my-2">
        <Input
          type="password"
          label="Mật khẩu mới"
          size="lg"
          id="re_password2"
          name="re_password2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.re_password2}
        />
        {formik.touched.re_password2 && formik.errors.re_password2 ? (
          <ErrorInputMessage value={formik.errors.re_password2} />
        ) : null}
      </div>
      <div className="flex w-full justify-center">
        <Button type="submit">
          {changePassowordIsLoading ? "Loading..." : "Xác nhận"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateAccountForm;
